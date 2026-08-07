/**
 * HelperSupervisor — keep the macOS native helper alive on loopback.
 *
 * Mirrors GatewaySupervisor: spawn on an ephemeral 127.0.0.1 port, poll
 * /health, restart with exponential backoff, drain on quit. Helper absence
 * must not take down the application (specs/loopback-provider-host).
 */

import { type ChildProcess, spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {
  backoffMs,
  DEFAULT_HEALTH_INTERVAL_MS,
  DEFAULT_HEALTH_TIMEOUT_MS,
  DEFAULT_INITIAL_BACKOFF_MS,
  DEFAULT_MAX_ATTEMPTS,
  DEFAULT_MAX_BACKOFF_MS,
  DEFAULT_SHUTDOWN_TIMEOUT_MS,
  type FetchFn,
  HEALTH_PATH,
  LOOPBACK_HOST,
  reserveLoopbackPort,
  type SpawnFn,
} from "./gateway-supervisor.js";

export type { SpawnFn };

export type HelperStatus =
  | { state: "starting" }
  | { state: "ready"; url: string }
  | { state: "restarting"; attempt: number; lastError: string }
  | { state: "failed"; error: string }
  /** Binary missing — app continues; native capabilities unavailable. */
  | { state: "unavailable"; reason: string };

export type HelperSupervisorOptions = {
  /** Absolute path to the macos-helper executable. */
  helperBinary: string;
  onStatus: (status: HelperStatus) => void;
  /** Optional seed directory (stream 2 widget dependency cache). */
  seedDir?: string;
  cacheDir?: string;
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
  /** Exists check — injectable for tests. Defaults to fs.existsSync. */
  binaryExists?: (filePath: string) => boolean;
};

export type HelperSpawnPlan = {
  command: string;
  args: string[];
  env: NodeJS.ProcessEnv;
  cwd: string;
  url: string;
  port: number;
  host: string;
};

export function buildHelperSpawnPlan(input: {
  helperBinary: string;
  port: number;
  host?: string;
  baseEnv?: NodeJS.ProcessEnv;
  /** Optional seed directory shipped with the app (stream 2). */
  seedDir?: string;
  cacheDir?: string;
}): HelperSpawnPlan {
  const host = input.host ?? LOOPBACK_HOST;
  const binary = path.resolve(input.helperBinary);
  const url = `http://${host}:${input.port}`;
  const args = ["--host", host, "--port", String(input.port)];
  if (input.seedDir) {
    args.push("--seed-dir", path.resolve(input.seedDir));
  }
  if (input.cacheDir) {
    args.push("--cache-dir", path.resolve(input.cacheDir));
  }
  return {
    command: binary,
    args,
    env: { ...input.baseEnv },
    cwd: path.dirname(binary),
    url,
    port: input.port,
    host,
  };
}

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    const t = setTimeout(resolve, ms);
    t.unref?.();
  });
}

function defaultFetch(
  input: string,
  init?: { signal?: AbortSignal },
): Promise<{ ok: boolean; status: number }> {
  return fetch(input, init).then((res) => ({ ok: res.ok, status: res.status }));
}

export class HelperSupervisor {
  private readonly opts: Required<
    Pick<
      HelperSupervisorOptions,
      | "maxAttempts"
      | "initialBackoffMs"
      | "maxBackoffMs"
      | "healthTimeoutMs"
      | "healthIntervalMs"
      | "shutdownTimeoutMs"
    >
  > &
    HelperSupervisorOptions;

  private status: HelperStatus = { state: "starting" };
  private child: ChildProcess | undefined;
  private url: string | undefined;
  private attempt = 0;
  private stopping = false;
  private runLoop: Promise<void> | undefined;
  private wake: (() => void) | undefined;

  constructor(options: HelperSupervisorOptions) {
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

  getStatus(): HelperStatus {
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

  retry(): Promise<void> {
    if (
      this.status.state !== "failed" &&
      this.status.state !== "unavailable" &&
      this.runLoop
    ) {
      return this.runLoop;
    }
    this.attempt = 0;
    this.stopping = false;
    this.setStatus({ state: "starting" });
    return this.start();
  }

  async stop(): Promise<void> {
    this.stopping = true;
    this.wake?.();
    await this.terminateChild("shutdown");
    if (this.runLoop) {
      await this.runLoop.catch(() => undefined);
    }
  }

  private setStatus(status: HelperStatus): void {
    this.status = status;
    if (status.state === "ready") {
      this.url = status.url;
    } else if (status.state === "unavailable" || status.state === "failed") {
      this.url = undefined;
    }
    this.opts.onStatus(status);
  }

  private async supervise(): Promise<void> {
    const exists = this.opts.binaryExists ?? ((p) => fs.existsSync(p));
    if (!exists(this.opts.helperBinary)) {
      this.setStatus({
        state: "unavailable",
        reason: `Native helper binary not found at ${this.opts.helperBinary}`,
      });
      return;
    }

    this.setStatus({ state: "starting" });

    while (!this.stopping) {
      this.attempt += 1;
      let lastError = "Helper failed to start";

      try {
        const port = await (
          this.opts.reservePort ?? (() => reserveLoopbackPort(LOOPBACK_HOST))
        )();

        const plan = buildHelperSpawnPlan({
          helperBinary: this.opts.helperBinary,
          port,
          host: LOOPBACK_HOST,
          baseEnv: process.env,
          seedDir: this.opts.seedDir,
          cacheDir: this.opts.cacheDir,
        });

        await this.spawnChild(plan);
        await this.waitUntilHealthy(plan.url);
        if (this.stopping) break;

        this.setStatus({ state: "ready", url: plan.url });
        const exit = await this.waitForChildExit();
        if (this.stopping) break;

        lastError =
          exit.signal != null
            ? `Helper exited on ${exit.signal}`
            : `Helper exited with code ${exit.code ?? "unknown"}`;
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
        await this.terminateChild("spawn-error");
      }

      if (this.stopping) break;

      if (this.attempt >= this.opts.maxAttempts) {
        // Exhausted retries — app continues; native caps unavailable.
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

  private spawnChild(plan: HelperSpawnPlan): Promise<void> {
    const spawnImpl = this.opts.spawn ?? spawn;
    const child = spawnImpl(plan.command, plan.args, {
      cwd: plan.cwd,
      env: plan.env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    this.child = child;

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
      const onExit = (code: number | null, signal: NodeJS.Signals | null) => {
        finish(() =>
          reject(
            new Error(
              signal
                ? `Helper exited on ${signal} before becoming ready`
                : `Helper exited with code ${code ?? "unknown"} before becoming ready`,
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
        throw new Error("Helper process exited before health check passed");
      }
      try {
        const res = await fetchImpl(healthUrl);
        if (res.ok) return;
      } catch {
        // not up yet
      }
      if (now() >= deadline) {
        throw new Error(`Helper health check timed out at ${healthUrl}`);
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

export function createHelperSupervisor(
  options: HelperSupervisorOptions,
): HelperSupervisor {
  return new HelperSupervisor(options);
}
