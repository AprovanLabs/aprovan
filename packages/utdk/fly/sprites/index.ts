/**
 * `utdk/fly/sprites` — sandboxes on fly.io Sprites.
 *
 * A Sprite is a persistent, hardware-isolated Linux environment: a dedicated
 * microVM with an ext4 filesystem that survives between runs, hibernates when
 * idle, and carries its own URL. That persistence is why a sandbox can be a
 * durable workspace record rather than a request-scoped job.
 *
 * Written against the published machine-readable schema
 * (`sprites-binaries.t3.storage.dev/api/v0.0.1-rc46/api_schema.json`, the file
 * that generates docs.sprites.dev/api) cross-checked against the official Go
 * and JS SDKs. Four things about that contract shape this module, and each is
 * a place a reasonable guess would have been wrong:
 *
 * 1. **Sprites are addressed by name, not id**, and there is no image or
 *    machine config to choose — one managed base image, fixed 8 vCPU / 100 GB,
 *    platform-managed memory, no TTL field. An image's `base` is therefore
 *    advisory here; its `tools` list still gates whether the image may run,
 *    but nothing is pulled.
 * 2. **Exec is query parameters, not a JSON body**, and its output is a
 *    single-byte-prefixed binary frame stream (`0x01` stdout, `0x02` stderr,
 *    `0x03` exit code) over either a WebSocket or a chunked POST. There is no
 *    `{exitCode, stdout, stderr}` object to parse; it has to be assembled.
 * 3. **There is no `exposePort`.** Every sprite permanently has one URL that
 *    routes to port 8080 (or the first HTTP port opened); the only control is
 *    `url_settings.auth`, org-only or public.
 * 4. **Nothing returns a content hash** — listings carry size/mode/mtime only.
 *    So the manifest is computed *inside* the sprite with `sha256sum`
 *    (`@utdk/sandbox`'s shared helper): one call instead of one read per file.
 *
 * Cold sprites block rather than erroring — a request to a hibernated sprite
 * is held while the VM resumes (100–500ms warm, 1–2s cold), so the deadlines
 * here clear the wake rather than just the operation.
 *
 * Credential: a `bearer_token` holding a Sprites API token.
 */

import {
  NO_CAPABILITIES,
  SandboxError,
  clampOutput,
  execTimeout,
  parseShellManifest,
  sandboxRequest,
  sandboxToolEntries,
  secretFromHeaders,
  shellManifestCommand,
  shellQuote,
  validateExecArgs,
  type CreateSandboxArgs,
  type ExecArgs,
  type ExecResult,
  type SandboxCapabilities,
  type SandboxClientOptions,
  type SandboxDriver,
  type SandboxFile,
  type SandboxFileEntry,
  type SandboxInstance,
} from "@utdk/sandbox";
import { createLazyClient } from "../../client.js";

const PROVIDER = "fly/sprites";
const DEFAULT_BASE_URL = "https://api.sprites.dev/v1";

/** The base image's home directory; relative paths resolve against it. */
const DEFAULT_WORKDIR = "/home/sprite";

/** Every vendor path in one place. */
const ROUTES = {
  sprites: "/sprites",
  sprite: (name: string) => `/sprites/${encodeURIComponent(name)}`,
  exec: (name: string) => `/sprites/${encodeURIComponent(name)}/exec`,
  fsRead: (name: string) => `/sprites/${encodeURIComponent(name)}/fs/read`,
  fsWrite: (name: string) => `/sprites/${encodeURIComponent(name)}/fs/write`,
  fsDelete: (name: string) => `/sprites/${encodeURIComponent(name)}/fs/delete`,
} as const;

/**
 * Persistence and a per-sprite URL are the headline features. `ports: false`
 * is not a gap in this client — the platform has no expose call at all.
 * Filesystem and port *watching* and long-lived services do exist, and are
 * why those flags are in the contract at all.
 */
export const FLY_SPRITES_CAPABILITIES: SandboxCapabilities = {
  ...NO_CAPABILITIES,
  persist: true,
  services: true,
  watch: true,
  // Real sha256 — computed inside the sprite. See listFiles.
  hashes: true,
};

export type FlySpritesClient = SandboxDriver;

interface SpriteBody {
  name?: string;
  id?: string;
  status?: string;
  url?: string;
  created_at?: string;
  [field: string]: unknown;
}

function toInstance(raw: SpriteBody, workdir = DEFAULT_WORKDIR): SandboxInstance {
  // The *name* is the handle every other route takes, so it is the id here.
  const name = String(raw["name"] ?? raw["id"] ?? "");
  return {
    id: name,
    status: spriteStatus(raw["status"]),
    workdir,
    ...(typeof raw["url"] === "string" ? { url: raw["url"] } : {}),
    createdAt: typeof raw["created_at"] === "string" ? raw["created_at"] : new Date().toISOString(),
    meta: raw,
  };
}

/**
 * The schema documents no closed status enum; `cold`, `warm` and `running`
 * are the observed values. Anything unrecognized maps to `running` rather
 * than to an error — a sprite that answered a request is up.
 */
function spriteStatus(raw: unknown): SandboxInstance["status"] {
  const value = String(raw ?? "").toLowerCase();
  if (value.includes("destroy") || value.includes("delete")) return "destroyed";
  if (value === "cold" || value.includes("stop") || value.includes("suspend")) return "stopped";
  if (value === "warm" || value.includes("start") || value.includes("creat")) return "starting";
  return "running";
}

/**
 * Assemble the framed exec stream: `0x01` stdout, `0x02` stderr, `0x03` exit
 * code (one byte). Frames carry no length, so this relies on the response's
 * chunk boundaries being preserved — the official JS SDK carries the same
 * caveat and prefers WebSocket for large output. The gateway talks to the API
 * directly, with no buffering proxy in between.
 */
async function readExecFrames(
  response: Response,
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const decoder = new TextDecoder();
  let stdout = "";
  let stderr = "";
  let exitCode = 0;
  const reader = response.body?.getReader();
  if (!reader) return { stdout, stderr, exitCode };
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    if (!value || value.length === 0) continue;
    const kind = value[0];
    const payload = value.subarray(1);
    if (kind === 0x01) stdout += decoder.decode(payload, { stream: true });
    else if (kind === 0x02) stderr += decoder.decode(payload, { stream: true });
    else if (kind === 0x03) exitCode = payload[0] ?? 0;
  }
  return { stdout, stderr, exitCode };
}

const absolute = (path: string): string =>
  path.startsWith("/") ? path : `${DEFAULT_WORKDIR}/${path}`;

export async function createFlySpritesClient(
  options: SandboxClientOptions = {},
): Promise<FlySpritesClient> {
  const secret = secretFromHeaders(options.headers, PROVIDER, "Sprites API token");
  const baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/u, "");
  const fetchImpl = options.fetchImpl ?? fetch;
  const request = { ...options, baseUrl, secret };

  /** Raw (non-JSON) call for the byte-oriented filesystem and exec routes. */
  const raw = async (
    path: string,
    init: {
      method: string;
      query?: Record<string, string | undefined>;
      body?: BodyInit;
      timeoutMs?: number;
    },
  ): Promise<Response> => {
    const url = new URL(`${baseUrl}${path}`);
    for (const [key, value] of Object.entries(init.query ?? {})) {
      if (value !== undefined) url.searchParams.set(key, value);
    }
    let response: Response;
    try {
      response = await fetchImpl(url.toString(), {
        method: init.method,
        headers: { Authorization: `Bearer ${secret}` },
        ...(init.body !== undefined ? { body: init.body } : {}),
        signal: AbortSignal.timeout(init.timeoutMs ?? 120_000),
      });
    } catch (err) {
      throw new SandboxError(
        `${PROVIDER} is unreachable: ${err instanceof Error ? err.message : String(err)}`,
        502,
      );
    }
    if (!response.ok) {
      throw new SandboxError(
        `${PROVIDER} request failed (${response.status}): ${(await response.text()).slice(0, 300)}`,
        response.status,
      );
    }
    return response;
  };

  const exec = async (args: ExecArgs): Promise<ExecResult> => {
    validateExecArgs(args);
    const timeoutMs = execTimeout(args);
    const startedAt = Date.now();
    // `cmd` is repeated and positional, argv[0] first. Routing through the
    // shell is what the contract's single `command` string promises.
    const query = new URLSearchParams();
    query.append("cmd", "/bin/sh");
    query.append("cmd", "-c");
    query.append("cmd", args.command);
    query.set("dir", args.cwd ? absolute(args.cwd) : DEFAULT_WORKDIR);
    if (args.stdin !== undefined) query.set("stdin", "true");
    for (const [key, value] of Object.entries(args.env ?? {})) {
      query.append("env", `${key}=${value}`);
    }

    const response = await raw(`${ROUTES.exec(args.id)}?${query.toString()}`, {
      method: "POST",
      ...(args.stdin !== undefined ? { body: args.stdin } : {}),
      // The API has no exec timeout parameter — the deadline is ours alone.
      timeoutMs: timeoutMs + 15_000,
    });
    const frames = await readExecFrames(response);
    const stdout = clampOutput(frames.stdout);
    const stderr = clampOutput(frames.stderr);
    return {
      exitCode: frames.exitCode,
      stdout: stdout.text,
      stderr: stderr.text,
      durationMs: Date.now() - startedAt,
      truncated: stdout.truncated || stderr.truncated,
    };
  };

  return {
    capabilities: FLY_SPRITES_CAPABILITIES,

    /**
     * `{ name }` is the only create field the docs and the Go SDK agree on,
     * and there is nothing else to configure anyway. The contract's `base`,
     * `resources` and `ttlSeconds` are accepted and ignored rather than sent
     * as fields the API may not know.
     */
    async create(args: CreateSandboxArgs): Promise<SandboxInstance> {
      const body = await sandboxRequest<SpriteBody>(PROVIDER, request, ROUTES.sprites, {
        method: "POST",
        body: { ...(args.name ? { name: args.name } : {}) },
        timeoutMs: 120_000,
      });
      const instance = toInstance(body ?? {}, args.workdir ?? DEFAULT_WORKDIR);
      if (!instance.id) throw new SandboxError(`${PROVIDER} returned no sprite name`, 502);
      // Mount directories must exist before the first command: a scratch
      // mount has no files to bring it into being as a side effect.
      const dirs = (args.mounts ?? []).map((mount) => shellQuote(absolute(mount)));
      if (dirs.length > 0) {
        await exec({ id: instance.id, command: `mkdir -p ${dirs.join(" ")}` });
      }
      return instance;
    },

    async get(args: { id: string }): Promise<SandboxInstance | undefined> {
      const body = await sandboxRequest<SpriteBody | undefined>(
        PROVIDER,
        request,
        ROUTES.sprite(args.id),
        { absentOn404: true },
      );
      return body ? toInstance(body) : undefined;
    },

    async list(): Promise<SandboxInstance[]> {
      const body = await sandboxRequest<{ sprites?: SpriteBody[] }>(
        PROVIDER,
        request,
        ROUTES.sprites,
        { query: { max_results: 50 } },
      );
      return (body?.sprites ?? []).map((entry) => toInstance(entry));
    },

    async destroy(args: { id: string }): Promise<{ destroyed: boolean }> {
      await sandboxRequest<unknown>(PROVIDER, request, ROUTES.sprite(args.id), {
        method: "DELETE",
        absentOn404: true,
      });
      return { destroyed: true };
    },

    exec,

    /** Raw bytes, not JSON — and `workingDir` is required by the API. */
    async readFile(args: { id: string; path: string }): Promise<SandboxFile> {
      const response = await raw(ROUTES.fsRead(args.id), {
        method: "GET",
        query: { path: absolute(args.path), workingDir: DEFAULT_WORKDIR },
      });
      const bytes = new Uint8Array(await response.arrayBuffer());
      const content = new TextDecoder().decode(bytes);
      // A round-trip mismatch means the bytes are not text; say so rather
      // than handing back mojibake the workspace would store as a file.
      const isText = new TextEncoder().encode(content).length === bytes.length;
      return {
        path: args.path,
        content: isText ? content : Buffer.from(bytes).toString("base64"),
        encoding: isText ? "utf8" : "base64",
        // No digest is returned; callers that need one use listFiles.
        hash: "",
        size: bytes.length,
      };
    },

    async writeFile(args): Promise<SandboxFileEntry> {
      await raw(ROUTES.fsWrite(args.id), {
        method: "PUT",
        query: {
          path: absolute(args.path),
          workingDir: DEFAULT_WORKDIR,
          mkdir: "true",
          ...(args.mode !== undefined ? { mode: args.mode.toString(8) } : {}),
        },
        body:
          args.encoding === "base64"
            ? (Buffer.from(args.content, "base64") as unknown as BodyInit)
            : args.content,
      });
      return { path: args.path, hash: "", size: args.content.length };
    },

    async deleteFile(args): Promise<{ deleted: boolean }> {
      await sandboxRequest<unknown>(PROVIDER, request, ROUTES.fsDelete(args.id), {
        method: "DELETE",
        body: {
          path: absolute(args.path),
          workingDir: DEFAULT_WORKDIR,
          recursive: args.recursive === true,
        },
        absentOn404: true,
      });
      return { deleted: true };
    },

    /**
     * The manifest, hashed inside the sprite.
     *
     * `GET /fs/list` exists and returns `{name, path, type, size, mode,
     * modTime}` — no digest of any kind. Reading every body to hash here
     * would cost one round trip per file and defeat the whole manifest
     * design, so one `sha256sum` runs over the tree instead.
     */
    async listFiles(args): Promise<SandboxFileEntry[]> {
      const result = await exec({
        id: args.id,
        command: shellManifestCommand(absolute(args.path ?? ".")),
        timeoutMs: 120_000,
      });
      // An absent directory is an empty listing, not a failure — a scratch
      // mount nothing has written to yet is the ordinary case.
      return result.stdout ? parseShellManifest(result.stdout) : [];
    },
  };
}

const defaultClient = createLazyClient(() => createFlySpritesClient());

export default defaultClient;

/** Discovery entries for GET /tools. */
export const tools = sandboxToolEntries(PROVIDER, {
  label: "fly.io Sprites",
  capabilities: FLY_SPRITES_CAPABILITIES,
});
