/**
 * The local sandbox executor — the half of `aprovan sandbox host run` that
 * actually touches the machine.
 *
 * It implements the `@utdk/sandbox` driver surface against real directories
 * under one registered **root**. That root is the containment boundary and
 * the only one that exists: a local host is not a microVM, and pretending
 * otherwise would be worse than saying so. Every path in every operation is
 * resolved and asserted to stay inside the sandbox's own directory, and the
 * sandbox directory is asserted to stay inside the root — so `..`, absolute
 * paths, and symlinks that escape all fail rather than reaching the rest of
 * the disk.
 *
 * Listings carry sha256 hashes computed here, on the machine. That is what
 * makes this the cheap host for large mounts: the gateway diffs two manifests
 * and only the bodies that actually changed ever cross the wire.
 */

import { spawn } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import {
  mkdir,
  readdir,
  readFile,
  realpath,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { isAbsolute, join, relative, resolve, sep } from "node:path";

/** Directories never listed or carried into the workspace. */
const IGNORED = new Set([".git", "node_modules", ".venv", "__pycache__", ".DS_Store"]);

/** Captured output cap, matching the contract. */
const MAX_OUTPUT_BYTES = 1_000_000;

/**
 * POSIX single-quoting for the `shell: true` command strings this executor
 * composes itself (cloneRepo). User-supplied `exec` commands are passed
 * through untouched, as ever — this is only for arguments we interpolate.
 */
const shq = (value: string): string => `'${value.replaceAll("'", "'\\''")}'`;

const MAX_FILE_BYTES = 8_000_000;

export interface ExecutorOptions {
  /** Directory every sandbox lives under. Created if missing. */
  root: string;
  /** Emitted for each op; the agent prints them. */
  log?: (message: string) => void;
}

export class ExecutorError extends Error {}

interface Instance {
  id: string;
  status: "running";
  workdir: string;
  createdAt: string;
}

export class LocalExecutor {
  private readonly root: string;
  private readonly log: (message: string) => void;

  constructor(options: ExecutorOptions) {
    this.root = resolve(options.root);
    this.log = options.log ?? (() => {});
  }

  async init(): Promise<void> {
    await mkdir(this.root, { recursive: true });
  }

  /**
   * Dispatch one driver operation. The agent hands ops straight through, so
   * this switch *is* the host's implementation of the contract.
   */
  async run(op: string, args: Record<string, unknown>): Promise<unknown> {
    switch (op) {
      case "create":
        return this.create(args);
      case "get":
        return this.get(this.id(args));
      case "list":
        return this.list();
      case "destroy":
        return this.destroy(this.id(args));
      case "exec":
        return this.exec(args);
      case "readFile":
        return this.readFile(this.id(args), this.path(args));
      case "writeFile":
        return this.writeFile(args);
      case "deleteFile":
        return this.deleteFile(args);
      case "listFiles":
        return this.listFiles(this.id(args), typeof args["path"] === "string" ? args["path"] : "");
      case "cloneRepo":
        return this.cloneRepo(args);
      default:
        throw new ExecutorError(`Unsupported operation: ${op}`);
    }
  }

  // -------------------------------------------------------------------------
  // Containment
  // -------------------------------------------------------------------------

  private id(args: Record<string, unknown>): string {
    const id = args["id"];
    if (typeof id !== "string" || !/^[\w-]{1,64}$/u.test(id)) {
      throw new ExecutorError("id must be a sandbox id");
    }
    return id;
  }

  private path(args: Record<string, unknown>): string {
    const path = args["path"];
    if (typeof path !== "string" || !path.trim()) {
      throw new ExecutorError("path is required");
    }
    return path;
  }

  private workdir(id: string): string {
    const dir = join(this.root, id);
    if (!existsSync(dir)) throw new ExecutorError(`Unknown sandbox: ${id}`);
    return dir;
  }

  /**
   * Resolve a sandbox-relative path and prove it stays inside the sandbox.
   *
   * The lexical check rejects `..` and absolute escapes; the realpath check
   * (when the target exists) rejects symlinks pointing out of the tree. Both
   * are needed — a symlink is lexically innocent.
   */
  private contain(id: string, path: string): Promise<string> {
    return this.containIn(this.workdir(id), path);
  }

  /** The same check against an explicit base — used before the id exists. */
  private async containIn(base: string, path: string): Promise<string> {
    if (isAbsolute(path)) throw new ExecutorError(`path must be relative: ${path}`);
    const target = resolve(base, path);
    const within = (candidate: string, root: string): boolean =>
      candidate === root || candidate.startsWith(root + sep);
    if (!within(target, base)) {
      throw new ExecutorError(`path escapes the sandbox: ${path}`);
    }
    if (existsSync(target)) {
      const real = await realpath(target);
      const realBase = await realpath(base);
      if (!within(real, realBase)) {
        throw new ExecutorError(`path resolves outside the sandbox: ${path}`);
      }
    }
    return target;
  }

  // -------------------------------------------------------------------------
  // Lifecycle
  // -------------------------------------------------------------------------

  private async create(args: Record<string, unknown>): Promise<Instance> {
    const base = args["base"];
    // A local host cannot pull an image; it can only verify that what the
    // image promised is actually installed. Failing here — before any work is
    // scheduled — is the whole value of declaring `tools` in the descriptor.
    const require_ = (base as { require?: unknown } | undefined)?.require;
    if (Array.isArray(require_)) {
      for (const entry of require_) {
        const name = String(entry).split(/[<>=@]/u)[0]!;
        if (!(await this.hasBinary(name))) {
          throw new ExecutorError(
            `This machine does not have "${name}" on PATH, which the sandbox image requires`,
          );
        }
      }
    }

    const id = `sbx-${randomUUID().slice(0, 8)}`;
    const workdir = join(this.root, id);
    await mkdir(workdir, { recursive: true });
    // Mount directories exist from the start. A scratch mount has no files to
    // bring it into being, and a caller that asked for `tmp/` should not have
    // to `mkdir` it before the first redirect into it works.
    for (const mount of Array.isArray(args["mounts"]) ? args["mounts"] : []) {
      if (typeof mount !== "string" || !mount) continue;
      await mkdir(await this.containIn(workdir, mount), { recursive: true });
    }
    this.log(`created ${id} at ${workdir}`);
    return { id, status: "running", workdir, createdAt: new Date().toISOString() };
  }

  /**
   * Is this binary on PATH? Public because the capability handshake needs it:
   * the gateway sends a probe list, the machine answers with what it found.
   */
  async hasBinary(name: string): Promise<boolean> {
    const probe = process.platform === "win32" ? `where ${name}` : `command -v ${name}`;
    const result = await this.spawn({ cwd: this.root, timeoutMs: 5_000, command: probe });
    return result.exitCode === 0;
  }

  private async get(id: string): Promise<Instance | undefined> {
    const dir = join(this.root, id);
    if (!existsSync(dir)) return undefined;
    const info = await stat(dir);
    return {
      id,
      status: "running",
      workdir: dir,
      createdAt: info.birthtime.toISOString(),
    };
  }

  private async list(): Promise<Instance[]> {
    const entries = await readdir(this.root, { withFileTypes: true }).catch(() => []);
    const instances: Instance[] = [];
    for (const entry of entries) {
      if (!entry.isDirectory() || !entry.name.startsWith("sbx-")) continue;
      const instance = await this.get(entry.name);
      if (instance) instances.push(instance);
    }
    return instances;
  }

  private async destroy(id: string): Promise<{ destroyed: boolean }> {
    const dir = join(this.root, id);
    if (!existsSync(dir)) return { destroyed: false };
    // `dir` is `root/<validated id>` by construction, so this can only ever
    // remove one sandbox directory.
    await rm(dir, { recursive: true, force: true });
    this.log(`destroyed ${id}`);
    return { destroyed: true };
  }

  // -------------------------------------------------------------------------
  // Exec
  // -------------------------------------------------------------------------

  private async exec(args: Record<string, unknown>): Promise<{
    exitCode: number;
    stdout: string;
    stderr: string;
    durationMs: number;
    truncated: boolean;
  }> {
    const id = this.id(args);
    const command = args["command"];
    if (typeof command !== "string" || !command.trim()) {
      throw new ExecutorError("command is required");
    }
    const cwd =
      typeof args["cwd"] === "string" && args["cwd"]
        ? await this.contain(id, args["cwd"])
        : this.workdir(id);
    const startedAt = Date.now();
    this.log(`exec ${id}: ${command}`);
    const result = await this.spawn({
      cwd,
      timeoutMs: typeof args["timeoutMs"] === "number" ? args["timeoutMs"] : 120_000,
      command,
      env: (args["env"] as Record<string, string>) ?? {},
      ...(typeof args["stdin"] === "string" ? { stdin: args["stdin"] } : {}),
    });
    return { ...result, durationMs: Date.now() - startedAt };
  }

  private spawn(options: {
    cwd: string;
    timeoutMs: number;
    command: string;
    env?: Record<string, string>;
    stdin?: string;
  }): Promise<{ exitCode: number; stdout: string; stderr: string; truncated: boolean }> {
    return new Promise((resolvePromise) => {
      const child = spawn(options.command, {
        cwd: options.cwd,
        shell: true,
        env: { ...process.env, ...options.env },
      });
      let stdout = "";
      let stderr = "";
      let truncated = false;
      const append = (target: "out" | "err", chunk: Buffer): void => {
        const text = chunk.toString("utf8");
        if (target === "out") {
          if (stdout.length >= MAX_OUTPUT_BYTES) truncated = true;
          else stdout += text;
        } else if (stderr.length >= MAX_OUTPUT_BYTES) truncated = true;
        else stderr += text;
      };
      child.stdout?.on("data", (chunk: Buffer) => append("out", chunk));
      child.stderr?.on("data", (chunk: Buffer) => append("err", chunk));
      if (options.stdin !== undefined) {
        child.stdin?.write(options.stdin);
        child.stdin?.end();
      }

      const timer = setTimeout(() => {
        child.kill("SIGKILL");
        stderr += `\naprovan: killed after ${options.timeoutMs}ms`;
      }, options.timeoutMs);

      child.on("error", (err) => {
        clearTimeout(timer);
        resolvePromise({
          exitCode: 127,
          stdout,
          stderr: `${stderr}${err.message}`,
          truncated,
        });
      });
      child.on("close", (code) => {
        clearTimeout(timer);
        resolvePromise({
          exitCode: code ?? 1,
          stdout: stdout.slice(0, MAX_OUTPUT_BYTES),
          stderr: stderr.slice(0, MAX_OUTPUT_BYTES),
          truncated,
        });
      });
    });
  }

  // -------------------------------------------------------------------------
  // Git
  // -------------------------------------------------------------------------

  /**
   * Materialize a repo mount as a real git checkout inside the sandbox.
   *
   * This is the machine host's half of the sandbox repo-mount feature: the
   * gateway asks for `{ repo, ref?, subPath?, token?, remote? }` and this op
   * clones the repository at the ref into the mount directory, then answers
   * with a `{path → sha256}` manifest of the checkout (paths relative to the
   * mount) so the workspace can diff later listings against it.
   *
   * The token is embedded in the clone remote (`x-access-token:<token>@`) on
   * purpose: the checkout must stay pushable so an agent inside the sandbox
   * can branch, commit, and push. That puts the token in `.git/config` of a
   * directory under this machine's own root — the same trust the operator
   * already extended by registering the machine against the workspace.
   *
   * `subPath` narrows to a sparse checkout (blobless clone + sparse-checkout
   * set), keeping git semantics intact: content lands at its full repo path
   * under the mount, and the working copy remains branch/commit/push-able.
   */
  private async cloneRepo(args: Record<string, unknown>): Promise<{
    path: string;
    files: Array<{ path: string; hash: string; size: number; updatedAt: string }>;
  }> {
    const id = this.id(args);
    const path = this.path(args);
    const repo = args["repo"];
    if (typeof repo !== "string" || !/^[\w.-]+\/[\w.-]+$/u.test(repo)) {
      throw new ExecutorError('cloneRepo requires { repo: "owner/name" }');
    }
    const ref = typeof args["ref"] === "string" && args["ref"] ? args["ref"] : undefined;
    const subPath =
      typeof args["subPath"] === "string" && args["subPath"] ? args["subPath"] : undefined;
    const token = typeof args["token"] === "string" && args["token"] ? args["token"] : undefined;
    if (subPath && (isAbsolute(subPath) || subPath.split("/").some((s) => s === ".."))) {
      throw new ExecutorError(`cloneRepo subPath must be repo-relative: ${subPath}`);
    }

    // `remote` is a test/enterprise seam (a file:// fixture, a GHES root);
    // the default is github.com because the repo spec is a GitHub reference.
    let remote =
      typeof args["remote"] === "string" && args["remote"]
        ? args["remote"]
        : `https://github.com/${repo}.git`;
    if (token && remote.startsWith("https://")) {
      remote = `https://x-access-token:${encodeURIComponent(token)}@${remote.slice("https://".length)}`;
    }

    const target = await this.contain(id, path);
    await mkdir(target, { recursive: true });
    const timeoutMs = typeof args["timeoutMs"] === "number" ? args["timeoutMs"] : 300_000;

    const steps = subPath
      ? [
          `git clone --filter=blob:none --no-checkout ${shq(remote)} ${shq(target)}`,
          `git -C ${shq(target)} sparse-checkout set ${shq(subPath)}`,
          `git -C ${shq(target)} checkout ${shq(ref ?? "HEAD")}`,
        ]
      : [
          `git clone ${shq(remote)} ${shq(target)}`,
          ...(ref ? [`git -C ${shq(target)} checkout ${shq(ref)}`] : []),
        ];

    this.log(`cloneRepo ${id}: ${repo}${ref ? `#${ref}` : ""} → ${path}`);
    for (const command of steps) {
      const result = await this.spawn({ cwd: this.workdir(id), timeoutMs, command });
      if (result.exitCode !== 0) {
        // Never echo the command — the remote may carry the token.
        const step = command.split(" ").slice(0, 2).join(" ");
        throw new ExecutorError(
          `${step} failed (${result.exitCode}): ${result.stderr.replaceAll(
            token ?? "\u0000",
            "***",
          ).slice(-2_000)}`,
        );
      }
    }

    // The manifest the workspace diffs against, mount-relative. `.git` is in
    // IGNORED, so the walk sees only the working tree.
    const listed = await this.listFiles(id, path);
    const prefix = `${path.replace(/\/+$/u, "")}/`;
    return {
      path,
      files: listed
        .filter((entry) => entry.path.startsWith(prefix))
        .map((entry) => ({ ...entry, path: entry.path.slice(prefix.length) })),
    };
  }

  // -------------------------------------------------------------------------
  // Files
  // -------------------------------------------------------------------------

  private async readFile(
    id: string,
    path: string,
  ): Promise<{ path: string; content: string; encoding: "utf8" | "base64"; hash: string; size: number }> {
    const target = await this.contain(id, path);
    const buffer = await readFile(target);
    if (buffer.length > MAX_FILE_BYTES) {
      throw new ExecutorError(`${path} is ${buffer.length} bytes — over the ${MAX_FILE_BYTES} limit`);
    }
    const text = buffer.toString("utf8");
    // A round-trip mismatch means the bytes are not text; say so rather than
    // handing back mojibake the workspace would store as a file.
    const isText = Buffer.from(text, "utf8").equals(buffer);
    return {
      path,
      content: isText ? text : buffer.toString("base64"),
      encoding: isText ? "utf8" : "base64",
      hash: createHash("sha256").update(buffer).digest("hex"),
      size: buffer.length,
    };
  }

  private async writeFile(
    args: Record<string, unknown>,
  ): Promise<{ path: string; hash: string; size: number }> {
    const id = this.id(args);
    const path = this.path(args);
    const content = args["content"];
    if (typeof content !== "string") throw new ExecutorError("content must be a string");
    const target = await this.contain(id, path);
    await mkdir(resolve(target, ".."), { recursive: true });
    const buffer =
      args["encoding"] === "base64"
        ? Buffer.from(content, "base64")
        : Buffer.from(content, "utf8");
    await writeFile(target, buffer);
    return {
      path,
      hash: createHash("sha256").update(buffer).digest("hex"),
      size: buffer.length,
    };
  }

  private async deleteFile(args: Record<string, unknown>): Promise<{ deleted: boolean }> {
    const target = await this.contain(this.id(args), this.path(args));
    if (!existsSync(target)) return { deleted: false };
    await rm(target, { recursive: args["recursive"] === true, force: true });
    return { deleted: true };
  }

  /**
   * Recursive listing with content hashes — the manifest the workspace diffs
   * against. Hashing happens here so a mount of thousands of files costs one
   * local walk instead of thousands of round trips.
   */
  private async listFiles(
    id: string,
    path: string,
  ): Promise<Array<{ path: string; hash: string; size: number; updatedAt: string }>> {
    const base = this.workdir(id);
    const start = path ? await this.contain(id, path) : base;
    if (!existsSync(start)) return [];
    const entries: Array<{ path: string; hash: string; size: number; updatedAt: string }> = [];

    const walk = async (dir: string): Promise<void> => {
      for (const entry of await readdir(dir, { withFileTypes: true })) {
        if (IGNORED.has(entry.name)) continue;
        const full = join(dir, entry.name);
        if (entry.isSymbolicLink()) continue; // never follow out of the tree
        if (entry.isDirectory()) {
          await walk(full);
          continue;
        }
        if (!entry.isFile()) continue;
        const buffer = await readFile(full).catch(() => undefined);
        if (!buffer || buffer.length > MAX_FILE_BYTES) continue;
        const info = await stat(full);
        entries.push({
          path: relative(base, full).split(sep).join("/"),
          hash: createHash("sha256").update(buffer).digest("hex"),
          size: buffer.length,
          updatedAt: info.mtime.toISOString(),
        });
      }
    };

    await walk(start);
    return entries.sort((a, b) => a.path.localeCompare(b.path));
  }
}
