/**
 * The bashkit executor — Aprovan sandboxes as in-process WASM interpreters.
 *
 * Each sandbox is one `Bash` instance from `@everruns/bashkit-wasm`: a real
 * bash interpreter with its own private virtual filesystem, compiled to
 * single-threaded WebAssembly. No container, no host process, no
 * SharedArrayBuffer — which is what lets the *same driver* run inside the
 * gateway, a worker, or a browser tab.
 *
 * Where this sits among the providers is worth stating, because it is the
 * inverse of the machine host: a registered machine has a real toolchain and
 * weak isolation; bashkit has *perfect* isolation (the "filesystem" is a data
 * structure owned by this instance — there is no disk to escape to) and a
 * deliberately small toolchain (bash, grep, sed, awk, find, jq, …; no node,
 * no git, no network). The right tool for text-shaped build work over a
 * mount, the wrong one for `pnpm test`.
 *
 * Three properties of the WASM build shape the implementation:
 *
 *   - **State lives at module scope.** The isolate re-invokes the client
 *     factory on every dispatched operation, so instances must survive the
 *     factory — the ESM module cache is the registry. The trade is honest:
 *     a gateway restart loses every sandbox, which is why the capability
 *     descriptor says `persist: false`.
 *   - **There is no wall clock.** `wasm32-unknown-unknown` has no timer, so a
 *     per-exec `timeoutMs` cannot be enforced and is accepted-but-ignored
 *     rather than half-honored. Runaway scripts are still bounded — the
 *     interpreter's command/loop/parser fuel budgets throw a resource-limit
 *     error instead of hanging, which exec maps to exit code 124.
 *   - **The VFS stores strings.** Binary bodies are not representable, so a
 *     base64 write is refused loudly rather than decoded into mojibake. The
 *     workspace mounts layer only ever moves text, so this never bites the
 *     path it was built for.
 */

import {
  Bash,
  initBashkit,
  type ExecResult as BashkitExecResult,
} from "@everruns/bashkit-wasm";
import {
  clampOutput,
  DEFAULT_TTL_SECONDS,
  hashContent,
  MANIFEST_EXCLUDES,
  MAX_FILE_BYTES,
  SandboxError,
  shellQuote,
  validateExecArgs,
  type CreateSandboxArgs,
  type ExecArgs,
  type ExecResult,
  type SandboxFile,
  type SandboxFileEntry,
  type SandboxInstance,
} from "@utdk/sandbox";

/** Default working directory when neither the caller nor an image names one. */
const DEFAULT_WORKDIR = "/work";

/** Exit code for a script the interpreter's fuel budget cut off. */
const RESOURCE_LIMIT_EXIT_CODE = 124;

// ---------------------------------------------------------------------------
// WASM initialization
// ---------------------------------------------------------------------------

let ready: Promise<void> | undefined;

/**
 * Load the interpreter binary once per process. Idempotent, and reset on
 * failure so a transient error (a half-installed dependency, say) does not
 * poison every later call.
 *
 * The package's own `initBashkit()` resolves the `.wasm` with `fetch()`
 * against an `import.meta.url`-relative URL — exactly right in a browser or
 * an edge runtime, where the module was served over HTTP. Under Node the
 * module URL is `file://`, which `fetch` refuses, so the bytes are read off
 * disk and handed over explicitly. The Node-only imports are dynamic and
 * behind a runtime check, which is what keeps this module loadable in a
 * browser bundle: the branch never executes there, so `node:*` never
 * resolves.
 */
export function ensureBashkit(): Promise<void> {
  if (!ready) {
    ready = loadWasm().catch((err: unknown) => {
      ready = undefined;
      throw err;
    });
  }
  return ready;
}

async function loadWasm(): Promise<void> {
  const isNode =
    typeof process !== "undefined" && Boolean(process.versions?.node);
  if (!isNode) {
    await initBashkit();
    return;
  }
  const [{ createRequire }, { readFile }] = await Promise.all([
    import(/* @vite-ignore */ "node:module"),
    import(/* @vite-ignore */ "node:fs/promises"),
  ]);
  const wasmPath = createRequire(import.meta.url).resolve(
    "@everruns/bashkit-wasm/bashkit_wasm_bg.wasm",
  );
  await initBashkit(await readFile(wasmPath));
}

// ---------------------------------------------------------------------------
// Instances
// ---------------------------------------------------------------------------

interface Instance {
  id: string;
  workdir: string;
  bash: Bash;
  createdAt: string;
  /** Epoch ms after which the instance is evicted; `undefined` = pinned. */
  expiresAt: number | undefined;
}

/**
 * Every live sandbox in this process. Module scope on purpose: the isolate
 * constructs a fresh client per operation, and a Map any narrower would lose
 * the sandbox between `create` and the first `exec`.
 */
const instances = new Map<string, Instance>();

/**
 * TTL enforcement is lazy — there is no timer to lean on in a browser tab
 * that may be frozen, and an expired sandbox costs nothing until someone
 * asks for it. Every entry point sweeps first, so an expired id fails with
 * "unknown sandbox" rather than answering from beyond its lease.
 */
function sweepExpired(): void {
  const now = Date.now();
  for (const [id, instance] of instances) {
    if (instance.expiresAt !== undefined && instance.expiresAt < now) {
      instances.delete(id);
    }
  }
}

function requireInstance(id: unknown): Instance {
  sweepExpired();
  if (typeof id !== "string" || !id) {
    throw new SandboxError("id must be a sandbox id", 400);
  }
  const instance = instances.get(id);
  if (!instance) throw new SandboxError(`Unknown sandbox: ${id}`, 404);
  return instance;
}

/** Reset all driver state — the test seam, exported for the package's suite. */
export function resetBashkitInstancesForTesting(): void {
  instances.clear();
}

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

/**
 * Resolve a caller path to an absolute VFS path. Relative paths are joined
 * onto the workdir (the shape the workspace mounts layer always sends);
 * absolute ones are taken as-is, because "escaping" is meaningless here —
 * the entire filesystem is a private data structure of this one instance,
 * and `/etc` in it is as empty and as harmless as anywhere else. `..` is
 * still refused: a path that needs it is a caller bug worth naming.
 */
function absolutePath(workdir: string, raw: unknown, label = "path"): string {
  if (typeof raw !== "string" || !raw.trim()) {
    throw new SandboxError(`${label} must be a non-empty path`, 400);
  }
  const joined = raw.startsWith("/") ? raw : `${workdir}/${raw}`;
  const segments: string[] = [];
  for (const segment of joined.replace(/\\/gu, "/").split("/")) {
    if (!segment || segment === ".") continue;
    if (segment === "..") {
      throw new SandboxError(`${label} must not contain ".." segments: ${raw}`, 400);
    }
    segments.push(segment);
  }
  return `/${segments.join("/")}`;
}

/** `<workdir>/a/b` → `a/b`; paths outside the workdir stay absolute. */
function workdirRelative(workdir: string, path: string): string {
  const prefix = `${workdir.replace(/\/+$/u, "")}/`;
  return path.startsWith(prefix) ? path.slice(prefix.length) : path;
}

function parentOf(path: string): string {
  const cut = path.lastIndexOf("/");
  return cut <= 0 ? "/" : path.slice(0, cut);
}

const utf8Bytes = (content: string): number => new TextEncoder().encode(content).length;

// ---------------------------------------------------------------------------
// Operations
// ---------------------------------------------------------------------------

export async function create(args: CreateSandboxArgs = {}): Promise<SandboxInstance> {
  await ensureBashkit();
  sweepExpired();

  const workdir = absolutePath("/", args.workdir ?? DEFAULT_WORKDIR, "workdir");
  if (args.secrets && Object.keys(args.secrets).length > 0) {
    // The Deno-style host-scoped secret contract requires an outbound network
    // path to substitute into; this box has none. Refusing beats downgrading
    // a "never materialize this" secret into a plain env var.
    throw new SandboxError("bashkit does not support scoped secrets", 501);
  }

  const bash = new Bash({
    cwd: workdir,
    env: args.env ?? {},
    ...(args.resources?.memoryMb
      ? { maxMemory: args.resources.memoryMb * 1024 * 1024 }
      : {}),
  });
  bash.mkdir(workdir);
  // Every declared mount exists as a directory before the first command runs
  // — a scratch mount has no files to create it as a side effect, and the
  // first `cd tmp` must not fail for a directory the caller asked for.
  for (const mount of Array.isArray(args.mounts) ? args.mounts : []) {
    if (typeof mount !== "string" || !mount) continue;
    bash.mkdir(absolutePath(workdir, mount, "mount"));
  }

  const ttlSeconds =
    typeof args.ttlSeconds === "number" && args.ttlSeconds > 0
      ? args.ttlSeconds
      : DEFAULT_TTL_SECONDS;
  const id = `sbx-${crypto.randomUUID().slice(0, 8)}`;
  const createdAt = new Date().toISOString();
  instances.set(id, {
    id,
    workdir,
    bash,
    createdAt,
    expiresAt: Date.now() + ttlSeconds * 1_000,
  });
  return { id, status: "running", workdir, createdAt };
}

export async function get(args: { id: string }): Promise<SandboxInstance | undefined> {
  sweepExpired();
  const instance = instances.get(args?.id ?? "");
  if (!instance) return undefined;
  return {
    id: instance.id,
    status: "running",
    workdir: instance.workdir,
    createdAt: instance.createdAt,
  };
}

export async function list(): Promise<SandboxInstance[]> {
  sweepExpired();
  return [...instances.values()].map((instance) => ({
    id: instance.id,
    status: "running" as const,
    workdir: instance.workdir,
    createdAt: instance.createdAt,
  }));
}

export async function destroy(args: { id: string }): Promise<{ destroyed: boolean }> {
  sweepExpired();
  return { destroyed: instances.delete(args?.id ?? "") };
}

/**
 * Run a command line through the sandbox's interpreter.
 *
 * The script is wrapped in a subshell pinned to the requested cwd, so a `cd`
 * inside one exec does not leak into the next — the same per-exec semantics
 * a spawned process gives the machine host. (Bashkit's `export` escapes a
 * subshell, so per-exec `env` may persist; callers that need a clean slate
 * re-set what they pass.) `timeoutMs` is accepted and unenforced: the WASM
 * build has no wall clock, and the interpreter's own fuel budgets are what
 * bound a runaway script — when they fire, the error comes back as exit
 * code 124 rather than as a thrown exception.
 */
export async function exec(args: ExecArgs): Promise<ExecResult> {
  validateExecArgs(args);
  const instance = requireInstance(args.id);
  const cwd = args.cwd ? absolutePath(instance.workdir, args.cwd, "cwd") : instance.workdir;

  const lines = [`cd ${shellQuote(cwd)} || exit 1`];
  for (const [key, value] of Object.entries(args.env ?? {})) {
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/u.test(key)) {
      throw new SandboxError(`Invalid environment variable name: ${key}`, 400);
    }
    lines.push(`export ${key}=${shellQuote(value)}`);
  }
  lines.push(args.command);

  const stdinFile = args.stdin !== undefined ? `/.aprovan-stdin-${instance.id}` : undefined;
  if (stdinFile) instance.bash.writeFile(stdinFile, args.stdin!);
  const script = `(\n${lines.join("\n")}\n)${stdinFile ? ` < ${shellQuote(stdinFile)}` : ""}`;

  const startedAt = Date.now();
  let result: BashkitExecResult;
  try {
    // The async form: it is what supports custom builtins if a host registers
    // any, and it costs nothing when none are.
    result = await instance.bash.execute(script);
  } catch (err) {
    return {
      exitCode: RESOURCE_LIMIT_EXIT_CODE,
      stdout: "",
      stderr: `bashkit: ${err instanceof Error ? err.message : String(err)}`,
      durationMs: Date.now() - startedAt,
      truncated: false,
    };
  } finally {
    if (stdinFile && instance.bash.exists(stdinFile)) instance.bash.remove(stdinFile);
  }

  const stdout = clampOutput(result.stdout);
  const stderr = clampOutput(result.stderr);
  return {
    exitCode: result.exitCode,
    stdout: stdout.text,
    stderr: stderr.text,
    durationMs: Date.now() - startedAt,
    truncated:
      stdout.truncated || stderr.truncated || result.stdoutTruncated || result.stderrTruncated,
  };
}

export async function readFile(args: { id: string; path: string }): Promise<SandboxFile> {
  const instance = requireInstance(args.id);
  const target = absolutePath(instance.workdir, args.path);
  let content: string;
  try {
    content = instance.bash.readFile(target);
  } catch {
    throw new SandboxError(`No such file: ${args.path}`, 404);
  }
  return {
    path: args.path,
    content,
    // Always utf8: the VFS holds strings, so whatever is in there is text by
    // construction — there is no binary body to fall back to base64 for.
    encoding: "utf8",
    hash: await hashContent(content),
    size: utf8Bytes(content),
  };
}

export async function writeFile(args: {
  id: string;
  path: string;
  content: string;
  encoding?: "utf8" | "base64";
}): Promise<SandboxFileEntry> {
  const instance = requireInstance(args.id);
  if (typeof args.content !== "string") {
    throw new SandboxError("content must be a string", 400);
  }
  if (args.encoding === "base64") {
    throw new SandboxError(
      "bashkit's virtual filesystem stores text — a base64 (binary) body cannot round-trip and is refused rather than corrupted",
      400,
    );
  }
  if (utf8Bytes(args.content) > MAX_FILE_BYTES) {
    throw new SandboxError(
      `${args.path} is over the ${MAX_FILE_BYTES}-byte sandbox file limit`,
      413,
    );
  }
  const target = absolutePath(instance.workdir, args.path);
  const parent = parentOf(target);
  // mkdir creates missing ancestors; writeFile does not, and "parent
  // directory not found" for a materializing mount would be a driver bug.
  if (parent !== "/" && !instance.bash.exists(parent)) instance.bash.mkdir(parent);
  instance.bash.writeFile(target, args.content);
  return {
    path: args.path,
    hash: await hashContent(args.content),
    size: utf8Bytes(args.content),
  };
}

export async function deleteFile(args: {
  id: string;
  path: string;
  recursive?: boolean;
}): Promise<{ deleted: boolean }> {
  const instance = requireInstance(args.id);
  const target = absolutePath(instance.workdir, args.path);
  if (!instance.bash.exists(target)) return { deleted: false };
  // The VFS `remove` is recursive by nature; honor the contract's flag by
  // refusing to silently take a subtree the caller thought was one file.
  const isDirectory = instance.bash.executeSync(`test -d ${shellQuote(target)}`).exitCode === 0;
  if (isDirectory && args.recursive !== true) {
    throw new SandboxError(`${args.path} is a directory — pass recursive: true`, 400);
  }
  instance.bash.remove(target);
  return { deleted: true };
}

/**
 * Recursive listing with content hashes — the manifest half of the workspace
 * sync algorithm. `find -type f` walks the tree inside the interpreter; the
 * hashing happens out here in JS with the same sha256-of-UTF-8 identity the
 * workspace FS store uses, so the two manifests are directly comparable.
 * That is a body read per file, which for a real host would be the round-trip
 * disaster the shell-manifest helpers exist to avoid — but this filesystem is
 * a Map in the same process, and reading from it costs a function call.
 */
export async function listFiles(args: {
  id: string;
  path?: string;
}): Promise<SandboxFileEntry[]> {
  const instance = requireInstance(args.id);
  const base = args.path
    ? absolutePath(instance.workdir, args.path)
    : instance.workdir;
  if (!instance.bash.exists(base)) return [];

  const found = instance.bash.executeSync(`find ${shellQuote(base)} -type f`);
  if (found.exitCode !== 0) {
    throw new SandboxError(`listFiles failed: ${found.stderr.trim()}`, 500);
  }

  const excluded = new Set(MANIFEST_EXCLUDES);
  const entries: SandboxFileEntry[] = [];
  for (const line of found.stdout.split("\n")) {
    const path = line.trim();
    if (!path) continue;
    if (path.split("/").some((segment) => excluded.has(segment))) continue;
    const content = instance.bash.readFile(path);
    const size = utf8Bytes(content);
    if (size > MAX_FILE_BYTES) continue;
    entries.push({
      path: workdirRelative(instance.workdir, path),
      hash: await hashContent(content),
      size,
    });
  }
  return entries.sort((a, b) => a.path.localeCompare(b.path));
}
