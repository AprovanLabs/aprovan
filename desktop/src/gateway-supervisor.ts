/**
 * GatewaySupervisor — keep one loopback gateway process alive and addressable.
 *
 * Spawns the vendored gateway on an ephemeral 127.0.0.1 port with
 * WORKSPACE_MODE=local and the Application Support data directory, polls
 * /health, restarts with exponential backoff up to a retry ceiling, and
 * drains cleanly on quit (tech-plan D5 + specs/gateway-supervision).
 */

import { type ChildProcess, spawn, type SpawnOptions } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { type GatewayStatus } from "./bridge.js";

export const LOOPBACK_HOST = "127.0.0.1";
export const HEALTH_PATH = "/health";
/** Conventional local-dev port — supervisor must never require this free. */
export const DEVELOPMENT_GATEWAY_PORT = 4000;

export const DEFAULT_MAX_ATTEMPTS = 5;
export const DEFAULT_INITIAL_BACKOFF_MS = 500;
export const DEFAULT_MAX_BACKOFF_MS = 8_000;
export const DEFAULT_HEALTH_TIMEOUT_MS = 15_000;
export const DEFAULT_HEALTH_INTERVAL_MS = 200;
export const DEFAULT_SHUTDOWN_TIMEOUT_MS = 10_000;

/** Child stdio index for the inherited workspace-key pipe (fd 3). */
export const WORKSPACE_KEY_STDIO_FD = 3;
export const WORKSPACE_KEY_FD_ENV = "WORKSPACE_KEY_FD";
export const WORKSPACE_KEY_BYTES = 32;

export type SpawnFn = (
  command: string,
  args: readonly string[],
  options: SpawnOptions,
) => ChildProcess;

export type FetchFn = (
  input: string,
  init?: { signal?: AbortSignal },
) => Promise<{ ok: boolean; status: number }>;

export type GatewaySupervisorOptions = {
  nodeBinary: string;
  /** Vendored gateway deploy directory (contains dist/cli.js). */
  gatewayDir: string;
  /** WORKSPACE_DATA_DIR — Application Support gateway-data/. */
  dataDir: string;
  onStatus: (status: GatewayStatus) => void;
  /** Total spawn attempts before holding at `failed`. */
  maxAttempts?: number;
  initialBackoffMs?: number;
  maxBackoffMs?: number;
  healthTimeoutMs?: number;
  healthIntervalMs?: number;
  shutdownTimeoutMs?: number;
  spawn?: SpawnFn;
  fetch?: FetchFn;
  reservePort?: () => Promise<number>;
  sleep?: (ms: number) => Promise<void>;
  now?: () => number;
  /**
   * Resolve the 32-byte workspace cipher key for each spawn. Delivered to the
   * child via an inherited pipe + WORKSPACE_KEY_FD=<n> (never in argv/env).
   */
  resolveWorkspaceKey?: () => Promise<Buffer>;
  /**
   * Extra child env evaluated at each spawn (e.g. `LLM_APPLE_BASE_URL` when the
   * macOS helper is ready). Merged over `process.env` / baseEnv.
   */
  extraEnv?: () => NodeJS.ProcessEnv;
};

export type GatewaySpawnPlan = {
  command: string;
  args: string[];
  env: NodeJS.ProcessEnv;
  cwd: string;
  url: string;
  port: number;
  host: string;
  /** Raw key bytes written once on stdio[WORKSPACE_KEY_STDIO_FD] after spawn. */
  workspaceKey?: Buffer;
};

/**
 * Reserve an ephemeral TCP port on loopback and release it so the child can
 * bind the same port. Avoids the fixed development port (4000).
 */
export async function reserveLoopbackPort(
  host: string = LOOPBACK_HOST,
): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, host, () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        server.close();
        reject(new Error("Failed to reserve a loopback port"));
        return;
      }
      const { port } = address;
      server.close((err) => {
        if (err) reject(err);
        else resolve(port);
      });
    });
  });
}

export function backoffMs(
  attempt: number,
  initialMs: number,
  maxMs: number,
): number {
  const exp = Math.max(0, attempt - 1);
  return Math.min(maxMs, initialMs * 2 ** exp);
}

export function buildGatewaySpawnPlan(input: {
  nodeBinary: string;
  gatewayDir: string;
  dataDir: string;
  port: number;
  host?: string;
  baseEnv?: NodeJS.ProcessEnv;
  /** When set, child env gets WORKSPACE_KEY_FD only (fd number, not key bytes). */
  workspaceKey?: Buffer;
}): GatewaySpawnPlan {
  const host = input.host ?? LOOPBACK_HOST;
  const cwd = path.resolve(input.gatewayDir);
  const url = `http://${host}:${input.port}`;
  const env: NodeJS.ProcessEnv = {
    ...input.baseEnv,
    WORKSPACE_MODE: "local",
    WORKSPACE_PORT: String(input.port),
    WORKSPACE_DATA_DIR: path.resolve(input.dataDir),
    WORKSPACE_HOST: host,
    // Desktop owns scheduling; avoid a background cron lease in the child.
    WORKSPACE_CRON: "0",
  };
  if (input.workspaceKey) {
    if (input.workspaceKey.length !== WORKSPACE_KEY_BYTES) {
      throw new Error(
        `workspaceKey must be ${WORKSPACE_KEY_BYTES} bytes, got ${input.workspaceKey.length}`,
      );
    }
    env[WORKSPACE_KEY_FD_ENV] = String(WORKSPACE_KEY_STDIO_FD);
  }
  return {
    command: input.nodeBinary,
    args: ["dist/cli.js", "start", "--mode", "local", "--port", String(input.port), "--data-dir", path.resolve(input.dataDir), "--host", host],
    env,
    cwd,
    url,
    port: input.port,
    host,
    ...(input.workspaceKey ? { workspaceKey: input.workspaceKey } : {}),
  };
}

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    const t = setTimeout(resolve, ms);
    t.unref?.();
  });
}

/** Write 32 raw key bytes once on the inherited pipe, then close the write end. */
export function deliverWorkspaceKey(
  child: Pick<ChildProcess, "stdio">,
  key: Buffer,
): void {
  const sink = child.stdio[WORKSPACE_KEY_STDIO_FD];
  if (!sink || typeof (sink as NodeJS.WritableStream).write !== "function") {
    throw new Error(
      `Gateway child missing writable stdio[${WORKSPACE_KEY_STDIO_FD}] for workspace key`,
    );
  }
  const writable = sink as NodeJS.WritableStream;
  writable.write(key);
  writable.end();
}

function defaultFetch(
  input: string,
  init?: { signal?: AbortSignal },
): Promise<{ ok: boolean; status: number }> {
  return fetch(input, init).then((res) => ({ ok: res.ok, status: res.status }));
}

export class GatewaySupervisor {
  private readonly opts: Required<
    Pick<
      GatewaySupervisorOptions,
      | "maxAttempts"
      | "initialBackoffMs"
      | "maxBackoffMs"
      | "healthTimeoutMs"
      | "healthIntervalMs"
      | "shutdownTimeoutMs"
    >
  > &
    GatewaySupervisorOptions;

  private status: GatewayStatus = { state: "starting" };
  private child: ChildProcess | undefined;
  private url: string | undefined;
  private attempt = 0;
  private stopping = false;
  /** Intentional config reload — skip failure accounting / scary restart copy. */
  private reloading = false;
  private runLoop: Promise<void> | undefined;
  private wake: (() => void) | undefined;

  constructor(options: GatewaySupervisorOptions) {
    this.opts = {
      maxAttempts: options.maxAttempts ?? DEFAULT_MAX_ATTEMPTS,
      initialBackoffMs: options.initialBackoffMs ?? DEFAULT_INITIAL_BACKOFF_MS,
      maxBackoffMs: options.maxBackoffMs ?? DEFAULT_MAX_BACKOFF_MS,
      healthTimeoutMs: options.healthTimeoutMs ?? DEFAULT_HEALTH_TIMEOUT_MS,
      healthIntervalMs: options.healthIntervalMs ?? DEFAULT_HEALTH_INTERVAL_MS,
      shutdownTimeoutMs:
        options.shutdownTimeoutMs ?? DEFAULT_SHUTDOWN_TIMEOUT_MS,
      ...options,
    };
  }

  getStatus(): GatewayStatus {
    return this.status;
  }

  getUrl(): string | undefined {
    return this.url;
  }

  /** Start supervision. Idempotent while a run loop is already active. */
  start(): Promise<void> {
    if (this.runLoop) return this.runLoop;
    this.stopping = false;
    this.runLoop = this.supervise().finally(() => {
      this.runLoop = undefined;
    });
    return this.runLoop;
  }

  /**
   * Explicit retry from `failed` (UX: failed panel retry). No-op unless failed
   * or not yet started.
   */
  retry(): Promise<void> {
    if (this.status.state !== "failed" && this.runLoop) {
      return this.runLoop;
    }
    this.attempt = 0;
    this.stopping = false;
    this.setStatus({ state: "starting" });
    return this.start();
  }

  /**
   * Respawn the gateway child so a fresh `extraEnv()` applies (e.g. helper port
   * changed). No-op when supervision is not running. Resets the failure budget.
   */
  async reload(): Promise<void> {
    if (this.stopping || !this.runLoop) return;
    this.reloading = true;
    this.attempt = 0;
    await this.terminateChild("reload");
    this.wake?.();
  }

  /**
   * Signal → await → terminate. Leaves no orphan. Safe to call repeatedly.
   */
  async stop(): Promise<void> {
    this.stopping = true;
    this.reloading = false;
    this.wake?.();
    await this.terminateChild("shutdown");
    if (this.runLoop) {
      await this.runLoop.catch(() => undefined);
    }
  }

  private setStatus(status: GatewayStatus): void {
    this.status = status;
    if (status.state === "ready") {
      this.url = status.url;
    }
    this.opts.onStatus(status);
  }

  private async supervise(): Promise<void> {
    this.setStatus({ state: "starting" });

    while (!this.stopping) {
      this.attempt += 1;
      let lastError = "Gateway failed to start";

      try {
        const port = await (
          this.opts.reservePort ?? (() => reserveLoopbackPort(LOOPBACK_HOST))
        )();

        const workspaceKey = this.opts.resolveWorkspaceKey
          ? await this.opts.resolveWorkspaceKey()
          : undefined;

        const plan = buildGatewaySpawnPlan({
          nodeBinary: this.opts.nodeBinary,
          gatewayDir: this.opts.gatewayDir,
          dataDir: this.opts.dataDir,
          port,
          host: LOOPBACK_HOST,
          baseEnv: {
            ...process.env,
            ...(this.opts.extraEnv?.() ?? {}),
          },
          workspaceKey,
        });

        await this.spawnChild(plan);
        await this.waitUntilHealthy(plan.url);
        if (this.stopping) break;

        this.setStatus({ state: "ready", url: plan.url });
        const exit = await this.waitForChildExit();
        if (this.stopping) break;

        if (this.reloading) {
          this.reloading = false;
          this.setStatus({ state: "starting" });
          continue;
        }

        lastError =
          exit.signal != null
            ? `Gateway exited on ${exit.signal}`
            : `Gateway exited with code ${exit.code ?? "unknown"}`;
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
        await this.terminateChild("spawn-error");
        if (this.reloading && !this.stopping) {
          this.reloading = false;
          this.setStatus({ state: "starting" });
          continue;
        }
      }

      if (this.stopping) break;

      if (this.attempt >= this.opts.maxAttempts) {
        this.setStatus({ state: "failed", error: lastError });
        return;
      }

      this.setStatus({
        state: "restarting",
        attempt: this.attempt,
        lastError,
      });

      const delay = backoffMs(
        this.attempt,
        this.opts.initialBackoffMs,
        this.opts.maxBackoffMs,
      );
      await this.sleepInterruptible(delay);
    }
  }

  private spawnChild(plan: GatewaySpawnPlan): Promise<void> {
    const spawnImpl = this.opts.spawn ?? spawn;
    const stdio: SpawnOptions["stdio"] = plan.workspaceKey
      ? ["ignore", "pipe", "pipe", "pipe"]
      : ["ignore", "pipe", "pipe"];
    const child = spawnImpl(plan.command, plan.args, {
      cwd: plan.cwd,
      env: plan.env,
      stdio,
    });
    this.child = child;

    if (plan.workspaceKey) {
      deliverWorkspaceKey(child, plan.workspaceKey);
    }

    return new Promise((resolve, reject) => {
      let settled = false;
      const finish = (fn: () => void) => {
        if (settled) return;
        settled = true;
        cleanup();
        fn();
      };
      const onError = (err: Error) => finish(() => reject(err));
      const onSpawn = () => finish(() => resolve());
      // If the process exits before 'spawn', treat as failure to start.
      const onExit = (code: number | null, signal: NodeJS.Signals | null) => {
        finish(() =>
          reject(
            new Error(
              signal
                ? `Gateway exited on ${signal} before becoming ready`
                : `Gateway exited with code ${code ?? "unknown"} before becoming ready`,
            ),
          ),
        );
      };
      const cleanup = () => {
        child.off("error", onError);
        child.off("spawn", onSpawn);
        child.off("exit", onExit);
      };
      child.once("error", onError);
      child.once("spawn", onSpawn);
      child.once("exit", onExit);

      // Fake/test spawn implementations often omit the 'spawn' event.
      if (child.pid != null) {
        queueMicrotask(() => {
          if (
            !settled &&
            this.child === child &&
            child.exitCode == null &&
            !child.killed
          ) {
            child.emit("spawn");
          }
        });
      }
    });
  }

  private async waitUntilHealthy(url: string): Promise<void> {
    const fetchImpl = this.opts.fetch ?? defaultFetch;
    const now = this.opts.now ?? Date.now;
    const deadline = now() + this.opts.healthTimeoutMs;
    const healthUrl = `${url}${HEALTH_PATH}`;

    while (!this.stopping) {
      if (this.child?.exitCode != null || this.child?.signalCode != null) {
        throw new Error("Gateway process exited before health check passed");
      }
      try {
        const res = await fetchImpl(healthUrl);
        if (res.ok) return;
      } catch {
        // not up yet
      }
      if (now() >= deadline) {
        throw new Error(`Gateway health check timed out at ${healthUrl}`);
      }
      await this.sleepInterruptible(this.opts.healthIntervalMs);
    }
    throw new Error("Supervisor stopped during health check");
  }

  private waitForChildExit(): Promise<{
    code: number | null;
    signal: NodeJS.Signals | null;
  }> {
    const child = this.child;
    if (!child) {
      return Promise.resolve({ code: null, signal: null });
    }
    if (child.exitCode != null || child.signalCode != null) {
      return Promise.resolve({
        code: child.exitCode,
        signal: child.signalCode,
      });
    }
    return new Promise((resolve) => {
      child.once("exit", (code, signal) => {
        resolve({ code, signal });
      });
    });
  }

  private async terminateChild(_reason: string): Promise<void> {
    const child = this.child;
    if (!child) return;
    this.child = undefined;

    if (child.exitCode != null || child.signalCode != null) {
      return;
    }

    const exited = new Promise<void>((resolve) => {
      child.once("exit", () => resolve());
    });

    try {
      child.kill("SIGTERM");
    } catch {
      // already gone
    }

    // Use a non-interruptible sleep so stop()'s wake does not collapse the
    // graceful drain window to zero and skip straight to SIGKILL.
    const sleep = this.opts.sleep ?? defaultSleep;
    const timedOut = await Promise.race([
      exited.then(() => false),
      sleep(this.opts.shutdownTimeoutMs).then(() => true),
    ]);

    if (timedOut && child.exitCode == null && child.signalCode == null) {
      try {
        child.kill("SIGKILL");
      } catch {
        // ignore
      }
      await Promise.race([exited, sleep(1_000)]);
    } else if (!timedOut) {
      await exited;
    }
  }

  private sleepInterruptible(ms: number): Promise<void> {
    if (this.stopping || ms <= 0) return Promise.resolve();
    const sleep = this.opts.sleep ?? defaultSleep;
    return new Promise((resolve) => {
      let settled = false;
      const done = () => {
        if (settled) return;
        settled = true;
        this.wake = undefined;
        resolve();
      };
      this.wake = done;
      void sleep(ms).then(done);
    });
  }
}

export function createGatewaySupervisor(
  options: GatewaySupervisorOptions,
): GatewaySupervisor {
  return new GatewaySupervisor(options);
}
