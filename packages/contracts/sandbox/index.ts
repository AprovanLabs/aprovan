/**
 * @utdk/sandbox — the shared contract for UTDK sandbox providers.
 *
 * A sandbox is an execution environment somebody else operates: a filesystem
 * plus a shell, hardware-isolated, reachable over an API. Vendors differ
 * wildly in their REST surfaces (fly.io Sprites, Cloudflare Sandbox, Deno
 * Deploy Sandbox) and one of them is a laptop dialing out through the
 * gateway's relay — so provider modules are handwritten, exactly like the
 * database providers on `@utdk/sql`, and all of them speak this contract:
 *
 *   - the operation surface is `create / get / list / destroy / exec /
 *     readFile / writeFile / deleteFile / listFiles / exposePort`;
 *   - `listFiles` returns content hashes, which is what makes mounting the
 *     workspace VFS cheap: the gateway diffs two `{path → sha256}` manifests
 *     and moves only the bodies that actually changed;
 *   - every backend resolves to the same `ExecResult` / `SandboxFile` shapes;
 *   - the secret arrives as the standard UTDK `Authorization: Bearer …`
 *     header injection;
 *   - non-secret config (host id, region, default image) rides the `sandbox`
 *     interface binding.
 *
 * What a provider does *not* decide: which workspace paths a sandbox sees or
 * what happens to the bytes it changes. That is workspace domain and lives in
 * the gateway's `sandboxes` core service — see docs/sandboxes.md.
 *
 * Capabilities are declared, not assumed. Hosts vary in what they support
 * (persistence across sleeps, port exposure, filesystem watch, host-scoped
 * secrets); a caller reads {@link SandboxCapabilities} and a provider that is
 * asked for something it lacks fails loudly rather than degrading in silence.
 */

export { DEFAULT_IMAGE_WORKDIR, parseImageSpec, parseSandboxImage, resolveSandboxImage, sandboxImageBase, assertImageTools, type ResolvedSandboxImage, type SandboxImageConfig, type SandboxImageTool, type ResolveImageOptions } from "./image.js";

/** Default per-exec deadline; override per call with `timeoutMs`. */
export const DEFAULT_EXEC_TIMEOUT_MS = 120_000;

/** Default sandbox lifetime when the caller names none. */
export const DEFAULT_TTL_SECONDS = 3_600;

/** Cap on captured stdout/stderr per exec; the result reports the cut. */
export const MAX_OUTPUT_BYTES = 1_000_000;

/** Cap on a single file body moved through the contract. */
export const MAX_FILE_BYTES = 8_000_000;

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

/** Error with an HTTP-ish status for hosts that map errors onto responses. */
export class SandboxError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "SandboxError";
    this.status = status;
  }
}

// ---------------------------------------------------------------------------
// Capabilities
// ---------------------------------------------------------------------------

/**
 * What a host can actually do. The gateway reads this before promising a
 * caller something the backend cannot deliver — a `session`-bound sandbox on
 * a host without `persist` would silently lose work between execs, and an
 * `expose` on a host without `ports` should be a 501 with the provider named,
 * not an undefined URL.
 */
export interface SandboxCapabilities {
  /** Filesystem survives between execs and across idle/sleep. */
  persist: boolean;
  /** `exposePort` yields a reachable URL. */
  ports: boolean;
  /** `listFiles` returns real content hashes (not size/mtime surrogates). */
  hashes: boolean;
  /** Host-scoped secrets that never materialize inside the environment. */
  scopedSecrets: boolean;
  /** Long-lived processes with start/stop/logs. */
  services: boolean;
  /** Filesystem change notification. */
  watch: boolean;
}

export const NO_CAPABILITIES: SandboxCapabilities = {
  persist: false,
  ports: false,
  hashes: false,
  scopedSecrets: false,
  services: false,
  watch: false,
};

// ---------------------------------------------------------------------------
// Instances
// ---------------------------------------------------------------------------

export type SandboxStatus = "starting" | "running" | "stopped" | "destroyed";

/**
 * A secret the sandbox may *use* without being able to *read* — substituted
 * into outbound requests to the listed hosts by backends that support it
 * (Deno Deploy's model). Providers without `scopedSecrets` reject these
 * rather than downgrading them to plain environment variables.
 */
export interface SandboxSecret {
  hosts: string[];
  value: string;
}

export interface SandboxResources {
  cpus?: number;
  memoryMb?: number;
  diskMb?: number;
}

/** Arguments for `create`. */
export interface CreateSandboxArgs {
  /** Resolved image base for this provider (see `@utdk/sandbox/image`). */
  base?: unknown;
  /** Human label; hosts that address sandboxes by name use it as the key. */
  name?: string;
  workdir?: string;
  /**
   * Directories to create under the workdir before anything else runs.
   *
   * Every mount needs to exist as a directory even when nothing is written
   * into it: a scratch mount is materialized from nothing, so without this
   * the first `cd tmp` or `> tmp/build.log` inside the sandbox fails with a
   * confusing "No such file or directory" for a mount the caller explicitly
   * asked for.
   */
  mounts?: string[];
  env?: Record<string, string>;
  secrets?: Record<string, SandboxSecret>;
  resources?: SandboxResources;
  ttlSeconds?: number;
  region?: string;
  [option: string]: unknown;
}

export interface SandboxInstance {
  id: string;
  status: SandboxStatus;
  workdir: string;
  /** Base URL for exposed ports, when the host serves one per sandbox. */
  url?: string;
  createdAt: string;
  /** Provider-native identifiers a caller may need for support escalation. */
  meta?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Operations
// ---------------------------------------------------------------------------

export interface ExecArgs {
  id: string;
  /** A command line, run through the host's shell. */
  command: string;
  /** Working directory, relative to the sandbox workdir unless absolute. */
  cwd?: string;
  env?: Record<string, string>;
  stdin?: string;
  timeoutMs?: number;
}

export interface ExecResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
  /** Output exceeded {@link MAX_OUTPUT_BYTES} and was cut. */
  truncated: boolean;
}

/** Listing entry — the unit the gateway diffs. `hash` is sha256 hex. */
export interface SandboxFileEntry {
  path: string;
  hash: string;
  size: number;
  mode?: number;
  updatedAt?: string;
}

export interface SandboxFile extends SandboxFileEntry {
  content: string;
  /** `utf8` unless the body was not valid text. */
  encoding: "utf8" | "base64";
}

export interface SandboxDriver {
  capabilities: SandboxCapabilities;
  create(args: CreateSandboxArgs): Promise<SandboxInstance>;
  get(args: { id: string }): Promise<SandboxInstance | undefined>;
  list(args?: Record<string, unknown>): Promise<SandboxInstance[]>;
  destroy(args: { id: string }): Promise<{ destroyed: boolean }>;
  exec(args: ExecArgs): Promise<ExecResult>;
  readFile(args: { id: string; path: string }): Promise<SandboxFile>;
  writeFile(args: {
    id: string;
    path: string;
    content: string;
    encoding?: "utf8" | "base64";
    mode?: number;
  }): Promise<SandboxFileEntry>;
  deleteFile(args: { id: string; path: string; recursive?: boolean }): Promise<{ deleted: boolean }>;
  /** Recursive by default — the manifest half of the sync algorithm. */
  listFiles(args: { id: string; path?: string }): Promise<SandboxFileEntry[]>;
  exposePort?(args: { id: string; port: number }): Promise<{ url: string }>;
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/**
 * Pull the provider secret out of the injected headers (the UTDK executor
 * translates a `bearer_token` credential into `Authorization: Bearer …`).
 */
export function secretFromHeaders(
  headers: Record<string, string> | undefined,
  provider: string,
  secretName = "API token",
): string {
  const raw = headers?.["Authorization"] ?? headers?.["authorization"] ?? "";
  const match = /^Bearer\s+(.+)$/iu.exec(raw);
  if (!match?.[1]) {
    throw new SandboxError(
      `${provider} needs a bearer_token credential holding the ${secretName}. Add one for provider "${provider}".`,
      400,
    );
  }
  return match[1];
}

/**
 * sha256 hex of a UTF-8 string — the same identity the workspace FS store
 * computes, so a sandbox manifest and a `vfs.list` manifest are directly
 * comparable without re-reading either side.
 *
 * Uses WebCrypto so the contract stays runtime-neutral (node, workerd, deno,
 * the browser playground all have `crypto.subtle`).
 */
export async function hashContent(content: string): Promise<string> {
  const bytes = new TextEncoder().encode(content);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Reject traversal, absolute paths, and empty segments; normalize to `a/b`. */
export function sandboxRelativePath(raw: unknown, label = "path"): string {
  if (typeof raw !== "string" || !raw.trim()) {
    throw new SandboxError(`${label} must be a non-empty relative path`, 400);
  }
  const path = raw.replace(/\\/gu, "/").replace(/^\/+|\/+$/gu, "");
  if (!path) throw new SandboxError(`${label} must be a non-empty relative path`, 400);
  const segments = path.split("/");
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    throw new SandboxError(`${label} must not contain "." or ".." segments: ${raw}`, 400);
  }
  return segments.join("/");
}

export function validateExecArgs(args: ExecArgs): void {
  if (typeof args.id !== "string" || !args.id) {
    throw new SandboxError("exec requires { id }", 400);
  }
  if (typeof args.command !== "string" || !args.command.trim()) {
    throw new SandboxError('exec requires { command: "npm test" }', 400);
  }
}

export function execTimeout(args: { timeoutMs?: number }): number {
  return typeof args.timeoutMs === "number" && args.timeoutMs > 0
    ? args.timeoutMs
    : DEFAULT_EXEC_TIMEOUT_MS;
}

/** Cut captured output to the contract's cap, reporting whether it was cut. */
export function clampOutput(value: string | undefined): { text: string; truncated: boolean } {
  const text = value ?? "";
  if (text.length <= MAX_OUTPUT_BYTES) return { text, truncated: false };
  return { text: text.slice(0, MAX_OUTPUT_BYTES), truncated: true };
}

// ---------------------------------------------------------------------------
// Manifests without a hash API
// ---------------------------------------------------------------------------
//
// Verified against both vendor contracts (2026-07-28): **no sandbox host
// returns content hashes.** fly.io Sprites' `GET /fs/list` yields
// `{name, path, type, size, mode, modTime}` and nothing else — a grep for
// sha/checksum/etag/digest over its published API schema returns zero hits.
// Cloudflare's `FileInfo` is a parse of a `find -printf` line: path, type,
// size, mtime, mode. Its own file-sync uses inotify plus R2 etags rather than
// digests.
//
// Reading every body to hash client-side would make mounting a repo cost one
// round trip per file, which defeats the entire manifest design. So the
// hashing happens *where the files are*: one `exec` running `sha256sum` over
// the tree, and one parse. A thousand-file mount becomes one call.
//
// This is why `hashes: true` is honest for hosts with no hash API — the
// capability says "this driver can produce a real manifest", not "the vendor
// hands one over".

/** Directories never worth hashing or carrying into a workspace. */
export const MANIFEST_EXCLUDES = [".git", "node_modules", ".venv", "__pycache__"];

/**
 * A POSIX command that prints `<sha256>  <relative path>` per file under
 * `path`. `find -print0 | xargs -0` survives spaces and newlines in names,
 * which a naive `find -exec` loop does not.
 */
export function shellManifestCommand(path: string, excludes = MANIFEST_EXCLUDES): string {
  const prune = excludes.map((dir) => `-name ${shellQuote(dir)} -prune -o`).join(" ");
  return `cd ${shellQuote(path)} && find . ${prune} -type f -print0 | xargs -0 sha256sum 2>/dev/null`;
}

/** Single-quote for `sh`, closing and reopening around any embedded quote. */
export function shellQuote(value: string): string {
  return `'${value.replaceAll("'", `'\\''`)}'`;
}

/**
 * Parse `sha256sum` output into manifest entries with paths relative to the
 * directory the command ran in. Sizes are unknown from this output and come
 * back as 0 — the manifest diff only ever compares hashes.
 */
export function parseShellManifest(stdout: string): SandboxFileEntry[] {
  const entries: SandboxFileEntry[] = [];
  for (const line of stdout.split("\n")) {
    const match = /^([0-9a-f]{64})\s[\s*](.+)$/u.exec(line.trimEnd());
    if (!match) continue;
    const path = match[2]!.replace(/^\.\//u, "");
    if (!path) continue;
    entries.push({ path, hash: match[1]!, size: 0 });
  }
  return entries;
}

export function assertCapability(
  capabilities: SandboxCapabilities,
  capability: keyof SandboxCapabilities,
  provider: string,
): void {
  if (!capabilities[capability]) {
    throw new SandboxError(`${provider} does not support "${capability}"`, 501);
  }
}

// ---------------------------------------------------------------------------
// HTTP engine
// ---------------------------------------------------------------------------

export interface SandboxClientOptions {
  /** Injected headers; the secret rides `Authorization: Bearer …`. */
  headers?: Record<string, string>;
  /** API root override; undefined = the provider module's own default. */
  baseUrl?: string;
  /** Injection point for tests. */
  fetchImpl?: typeof fetch;
}

export interface SandboxRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  timeoutMs?: number;
  /** Treat 404 as "absent" and resolve undefined instead of throwing. */
  absentOn404?: boolean;
}

/**
 * The one HTTP call every provider module is built from: JSON in, JSON out,
 * a deadline, and errors normalized to {@link SandboxError} with the host's
 * own message preserved. Each provider then maps its vendor's routes onto the
 * driver surface in a few dozen lines.
 */
export async function sandboxRequest<T>(
  provider: string,
  options: SandboxClientOptions & { baseUrl: string; secret: string },
  path: string,
  request: SandboxRequestOptions = {},
): Promise<T> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const root = options.baseUrl.replace(/\/+$/u, "");
  const url = new URL(`${root}${path.startsWith("/") ? path : `/${path}`}`);
  for (const [key, value] of Object.entries(request.query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  let response: Response;
  try {
    response = await fetchImpl(url.toString(), {
      method: request.method ?? "GET",
      headers: {
        Authorization: `Bearer ${options.secret}`,
        Accept: "application/json",
        ...(request.body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...request.headers,
      },
      ...(request.body !== undefined ? { body: JSON.stringify(request.body) } : {}),
      signal: AbortSignal.timeout(request.timeoutMs ?? DEFAULT_EXEC_TIMEOUT_MS),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new SandboxError(`${provider} is unreachable: ${message}`, 502);
  }

  if (response.status === 404 && request.absentOn404) {
    return undefined as T;
  }
  if (!response.ok) {
    throw new SandboxError(
      `${provider} request failed (${response.status}): ${await readError(response)}`,
      response.status,
    );
  }
  if (response.status === 204) return undefined as T;
  const text = await response.text();
  if (!text) return undefined as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new SandboxError(`${provider} returned a non-JSON response`, 502);
  }
}

async function readError(response: Response): Promise<string> {
  const raw = await response.text();
  try {
    const parsed = JSON.parse(raw) as { error?: { message?: string } | string; message?: string };
    if (typeof parsed.error === "string") return parsed.error;
    return parsed.error?.message ?? parsed.message ?? raw.slice(0, 300);
  } catch {
    return raw.slice(0, 300);
  }
}

// ---------------------------------------------------------------------------
// Discovery
// ---------------------------------------------------------------------------

const ID = { type: "string", description: "Sandbox id returned by create" } as const;

/**
 * Tool-discovery entries for a sandbox provider — the static `tools` export
 * the gateway's `GET /tools` prefers over runtime metadata.
 *
 * These describe the *raw driver*. The workspace-facing surface (mounts,
 * sync, commit) belongs to the `sandboxes` core service and is advertised
 * there; a caller reaching a provider directly is doing the equivalent of
 * `sql.query` against one warehouse.
 */
export function sandboxToolEntries(
  provider: string,
  details: { label?: string; capabilities: SandboxCapabilities; defaultImage?: string },
): Array<{ name: string; description: string; inputSchema: Record<string, unknown> }> {
  const label = details.label ?? provider;
  const entries: Array<{ name: string; description: string; inputSchema: Record<string, unknown> }> = [
    {
      name: `${provider}.create`,
      description:
        `Start a sandbox on ${label}` +
        (details.defaultImage ? ` (default image: ${details.defaultImage})` : "") +
        ". Returns { id, status, workdir }.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Human label for the sandbox" },
          workdir: { type: "string" },
          env: { type: "object", description: "Environment variables" },
          ttlSeconds: { type: "number", description: `Lifetime (default ${DEFAULT_TTL_SECONDS}s)` },
          resources: {
            type: "object",
            properties: { cpus: { type: "number" }, memoryMb: { type: "number" } },
          },
        },
      },
    },
    {
      name: `${provider}.get`,
      description: `Fetch one ${label} sandbox's status.`,
      inputSchema: { type: "object", properties: { id: ID }, required: ["id"] },
    },
    {
      name: `${provider}.list`,
      description: `List ${label} sandboxes reachable with this credential.`,
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: `${provider}.destroy`,
      description: `Destroy a ${label} sandbox and release its resources.`,
      inputSchema: { type: "object", properties: { id: ID }, required: ["id"] },
    },
    {
      name: `${provider}.exec`,
      description:
        `Run a shell command inside a ${label} sandbox and return ` +
        "{ exitCode, stdout, stderr, durationMs }.",
      inputSchema: {
        type: "object",
        properties: {
          id: ID,
          command: { type: "string", description: 'Command line, e.g. "pnpm test"' },
          cwd: { type: "string", description: "Working directory, relative to the sandbox workdir" },
          env: { type: "object" },
          stdin: { type: "string" },
          timeoutMs: { type: "number", description: `Deadline (default ${DEFAULT_EXEC_TIMEOUT_MS}ms)` },
        },
        required: ["id", "command"],
      },
    },
    {
      name: `${provider}.readFile`,
      description: `Read one file from a ${label} sandbox.`,
      inputSchema: {
        type: "object",
        properties: { id: ID, path: { type: "string" } },
        required: ["id", "path"],
      },
    },
    {
      name: `${provider}.writeFile`,
      description: `Write one file into a ${label} sandbox (parents created).`,
      inputSchema: {
        type: "object",
        properties: {
          id: ID,
          path: { type: "string" },
          content: { type: "string" },
          encoding: { type: "string", enum: ["utf8", "base64"] },
        },
        required: ["id", "path", "content"],
      },
    },
    {
      name: `${provider}.deleteFile`,
      description: `Delete a file (or a subtree with recursive=true) in a ${label} sandbox.`,
      inputSchema: {
        type: "object",
        properties: { id: ID, path: { type: "string" }, recursive: { type: "boolean" } },
        required: ["id", "path"],
      },
    },
    {
      name: `${provider}.listFiles`,
      description:
        `List files under a path in a ${label} sandbox with content hashes ` +
        "— the manifest the workspace diffs against to find what changed.",
      inputSchema: {
        type: "object",
        properties: { id: ID, path: { type: "string" } },
        required: ["id"],
      },
    },
  ];

  if (details.capabilities.ports) {
    entries.push({
      name: `${provider}.exposePort`,
      description: `Expose a port from a ${label} sandbox and return its public URL.`,
      inputSchema: {
        type: "object",
        properties: { id: ID, port: { type: "number" } },
        required: ["id", "port"],
      },
    });
  }

  return entries;
}
