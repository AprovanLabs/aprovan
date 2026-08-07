import { EventEmitter } from "node:events";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { PassThrough } from "node:stream";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type GatewayStatus } from "../src/bridge.js";
import { createInitialBridgeState, publishGatewayStatus } from "../src/bridge-handlers.js";
import {
  DEVELOPMENT_GATEWAY_PORT,
  LOOPBACK_HOST,
  WORKSPACE_KEY_BYTES,
  WORKSPACE_KEY_FD_ENV,
  WORKSPACE_KEY_STDIO_FD,
  backoffMs,
  buildGatewaySpawnPlan,
  createGatewaySupervisor,
  deliverWorkspaceKey,
  reserveLoopbackPort,
  type SpawnFn,
} from "../src/gateway-supervisor.js";

class FakeChild extends EventEmitter {
  pid = 42_001;
  killed = false;
  exitCode: number | null = null;
  signalCode: NodeJS.Signals | null = null;
  stdin = null;
  stdout = new PassThrough();
  stderr = new PassThrough();
  /** Extra stdio slot for WORKSPACE_KEY_FD delivery (fd 3). */
  keyPipe = new PassThrough();
  stdio: Array<null | PassThrough> = [];
  lastSignal: NodeJS.Signals | undefined;

  constructor() {
    super();
    this.stdio = [null, this.stdout, this.stderr, this.keyPipe];
  }

  kill(signal?: NodeJS.Signals | number): boolean {
    const sig =
      typeof signal === "string" ? signal : signal === undefined ? "SIGTERM" : "SIGTERM";
    this.lastSignal = sig as NodeJS.Signals;
    this.killed = true;
    if (this.exitCode != null || this.signalCode != null) return true;
    this.signalCode = this.lastSignal;
    this.exitCode = null;
    queueMicrotask(() => this.emit("exit", this.exitCode, this.signalCode));
    return true;
  }

  /** Crash without going through kill(). */
  crash(code = 1): void {
    this.exitCode = code;
    this.signalCode = null;
    this.emit("exit", code, null);
  }
}

function collectStatuses(): {
  statuses: GatewayStatus[];
  onStatus: (s: GatewayStatus) => void;
} {
  const statuses: GatewayStatus[] = [];
  return {
    statuses,
    onStatus: (s) => {
      statuses.push(s);
    },
  };
}

function waitFor(
  predicate: () => boolean,
  timeoutMs = 2_000,
): Promise<void> {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      if (predicate()) {
        resolve();
        return;
      }
      if (Date.now() - start > timeoutMs) {
        reject(new Error("waitFor timed out"));
        return;
      }
      setTimeout(tick, 5);
    };
    tick();
  });
}

function immediateSleep(ms: number): Promise<void> {
  // Yield to the event loop so status polls and timers can run; keep tests fast.
  return new Promise((resolve) => setTimeout(resolve, Math.min(ms, 5)));
}

describe("reserveLoopbackPort", () => {
  it("binds an ephemeral port on loopback only", async () => {
    const port = await reserveLoopbackPort();
    expect(port).toBeGreaterThan(0);
    expect(port).not.toBe(DEVELOPMENT_GATEWAY_PORT);

    // The reservation is released; we can bind the same host:port ourselves.
    await new Promise<void>((resolve, reject) => {
      const server = net.createServer();
      server.once("error", reject);
      server.listen(port, LOOPBACK_HOST, () => {
        const addr = server.address();
        expect(addr && typeof addr !== "string" && addr.address).toBe(
          LOOPBACK_HOST,
        );
        server.close((err) => (err ? reject(err) : resolve()));
      });
    });
  });

  it("selects a free port even when the development port is occupied", async () => {
    const blocker = net.createServer();
    await new Promise<void>((resolve, reject) => {
      blocker.once("error", reject);
      blocker.listen(DEVELOPMENT_GATEWAY_PORT, LOOPBACK_HOST, () => resolve());
    });

    try {
      const port = await reserveLoopbackPort();
      expect(port).not.toBe(DEVELOPMENT_GATEWAY_PORT);
      expect(port).toBeGreaterThan(0);
    } finally {
      await new Promise<void>((resolve, reject) => {
        blocker.close((err) => (err ? reject(err) : resolve()));
      });
    }
  });
});

describe("buildGatewaySpawnPlan", () => {
  it("spawns local mode with app data dir and loopback host/port", () => {
    const plan = buildGatewaySpawnPlan({
      nodeBinary: "/runtime/node",
      gatewayDir: "/vendor/gateway",
      dataDir: "/app-support/gateway-data",
      port: 52_431,
    });

    expect(plan.host).toBe(LOOPBACK_HOST);
    expect(plan.port).toBe(52_431);
    expect(plan.url).toBe("http://127.0.0.1:52431");
    expect(plan.command).toBe("/runtime/node");
    expect(plan.cwd).toBe(path.resolve("/vendor/gateway"));
    expect(plan.args).toEqual([
      "dist/cli.js",
      "start",
      "--mode",
      "local",
      "--port",
      "52431",
      "--data-dir",
      path.resolve("/app-support/gateway-data"),
      "--host",
      LOOPBACK_HOST,
    ]);
    expect(plan.env.WORKSPACE_MODE).toBe("local");
    expect(plan.env.WORKSPACE_PORT).toBe("52431");
    expect(plan.env.WORKSPACE_HOST).toBe(LOOPBACK_HOST);
    expect(plan.env.WORKSPACE_DATA_DIR).toBe(
      path.resolve("/app-support/gateway-data"),
    );
    expect(plan.env[WORKSPACE_KEY_FD_ENV]).toBeUndefined();
    expect(plan.workspaceKey).toBeUndefined();
  });

  it("sets WORKSPACE_KEY_FD to the stdio fd number without putting key bytes in env", () => {
    const key = Buffer.alloc(WORKSPACE_KEY_BYTES, 0x11);
    const plan = buildGatewaySpawnPlan({
      nodeBinary: "/runtime/node",
      gatewayDir: "/vendor/gateway",
      dataDir: "/data",
      port: 52_431,
      workspaceKey: key,
    });

    expect(plan.env[WORKSPACE_KEY_FD_ENV]).toBe(String(WORKSPACE_KEY_STDIO_FD));
    expect(plan.workspaceKey?.equals(key)).toBe(true);
    // Key material must not appear in env values.
    for (const value of Object.values(plan.env)) {
      if (typeof value !== "string") continue;
      expect(value).not.toContain(key.toString("base64"));
      expect(value).not.toContain(key.toString("hex"));
      expect(Buffer.from(value, "utf8").equals(key)).toBe(false);
    }
  });
});

describe("deliverWorkspaceKey", () => {
  it("writes exactly 32 bytes on stdio[3] and ends the stream", async () => {
    const child = new FakeChild();
    const key = Buffer.alloc(WORKSPACE_KEY_BYTES, 0x5a);
    const chunks: Buffer[] = [];
    child.keyPipe.on("data", (c: Buffer) => chunks.push(Buffer.from(c)));
    const ended = new Promise<void>((resolve) => child.keyPipe.on("end", resolve));

    deliverWorkspaceKey(child, key);
    await ended;
    expect(Buffer.concat(chunks).equals(key)).toBe(true);
  });
});

describe("backoffMs", () => {
  it("grows exponentially then caps", () => {
    expect(backoffMs(1, 500, 8_000)).toBe(500);
    expect(backoffMs(2, 500, 8_000)).toBe(1_000);
    expect(backoffMs(3, 500, 8_000)).toBe(2_000);
    expect(backoffMs(5, 500, 8_000)).toBe(8_000);
    expect(backoffMs(10, 500, 8_000)).toBe(8_000);
  });
});

describe("GatewaySupervisor", () => {
  it("reaches ready after health passes and exposes the loopback URL", async () => {
    const { statuses, onStatus } = collectStatuses();
    const child = new FakeChild();
    const healthUrl = "http://127.0.0.1:51001/health";

    const supervisor = createGatewaySupervisor({
      nodeBinary: "/node",
      gatewayDir: "/gateway",
      dataDir: "/data",
      onStatus,
      maxAttempts: 3,
      healthIntervalMs: 5,
      healthTimeoutMs: 1_000,
      initialBackoffMs: 1,
      sleep: immediateSleep,
      reservePort: async () => 51_001,
      spawn: ((_cmd, _args, _opts) => child) as SpawnFn,
      fetch: async (url) =>
        url === healthUrl
          ? { ok: true, status: 200 }
          : { ok: false, status: 503 },
    });

    const started = supervisor.start();
    await waitFor(() => supervisor.getStatus().state === "ready");
    expect(supervisor.getStatus()).toEqual({
      state: "ready",
      url: "http://127.0.0.1:51001",
    });
    expect(statuses[0]).toEqual({ state: "starting" });
    expect(statuses.some((s) => s.state === "ready")).toBe(true);

    await supervisor.stop();
    await started;
    expect(child.lastSignal).toBe("SIGTERM");
  });

  it("emits restarting then ready after a transient crash (window stays up)", async () => {
    const { statuses, onStatus } = collectStatuses();
    let generation = 0;
    const children: FakeChild[] = [];
    let allowHealth = true;
    let port = 51_100;

    const supervisor = createGatewaySupervisor({
      nodeBinary: "/node",
      gatewayDir: "/gateway",
      dataDir: "/data",
      onStatus,
      maxAttempts: 5,
      healthIntervalMs: 5,
      healthTimeoutMs: 500,
      initialBackoffMs: 1,
      maxBackoffMs: 1,
      sleep: immediateSleep,
      reservePort: async () => {
        port += 1;
        return port;
      },
      spawn: ((_cmd, _args, _opts) => {
        generation += 1;
        const child = new FakeChild();
        child.pid = 42_000 + generation;
        children.push(child);
        return child;
      }) as SpawnFn,
      fetch: async () =>
        allowHealth
          ? { ok: true, status: 200 }
          : { ok: false, status: 503 },
    });

    const started = supervisor.start();
    await waitFor(() => supervisor.getStatus().state === "ready");

    // Crash while ready — supervisor must restart, not quit the app.
    allowHealth = false;
    children[0]!.crash(1);

    await waitFor(() => statuses.some((s) => s.state === "restarting"));
    allowHealth = true;
    expect(statuses.some((s) => s.state === "restarting")).toBe(true);

    await waitFor(() => {
      const ready = statuses.filter((s) => s.state === "ready");
      return ready.length >= 2;
    });

    expect(supervisor.getStatus().state).toBe("ready");
    // No quit signal exists on the supervisor — crash only changes status.
    expect(statuses.some((s) => s.state === "failed")).toBe(false);

    await supervisor.stop();
    await started;
  });

  it("holds at failed with the last error after the retry ceiling", async () => {
    const { statuses, onStatus } = collectStatuses();
    let n = 0;

    const supervisor = createGatewaySupervisor({
      nodeBinary: "/node",
      gatewayDir: "/gateway",
      dataDir: "/data",
      onStatus,
      maxAttempts: 3,
      healthIntervalMs: 5,
      healthTimeoutMs: 50,
      initialBackoffMs: 1,
      maxBackoffMs: 1,
      sleep: immediateSleep,
      reservePort: async () => 52_000 + n,
      spawn: ((_cmd, _args, _opts) => {
        n += 1;
        const child = new FakeChild();
        child.pid = 50_000 + n;
        // Never becomes healthy; crash immediately after spawn settles.
        queueMicrotask(() => child.crash(1));
        return child;
      }) as SpawnFn,
      fetch: async () => ({ ok: false, status: 503 }),
    });

    await supervisor.start();
    expect(supervisor.getStatus().state).toBe("failed");
    const failed = supervisor.getStatus();
    if (failed.state !== "failed") throw new Error("expected failed");
    expect(failed.error.length).toBeGreaterThan(0);
    expect(statuses.some((s) => s.state === "restarting")).toBe(true);
    expect(statuses.at(-1)).toEqual({ state: "failed", error: failed.error });
    // Does not loop past the ceiling.
    const restarting = statuses.filter((s) => s.state === "restarting");
    expect(restarting.length).toBeLessThan(3);
  });

  it("SIGTERM then SIGKILL on stubborn shutdown (no orphan)", async () => {
    const { onStatus } = collectStatuses();
    const child = new FakeChild();
    // Override kill to ignore SIGTERM once, accept SIGKILL.
    let termCount = 0;
    child.kill = (signal?: NodeJS.Signals | number) => {
      const sig =
        typeof signal === "string" ? signal : ("SIGTERM" as NodeJS.Signals);
      child.lastSignal = sig;
      if (sig === "SIGTERM") {
        termCount += 1;
        return true; // stubborn — do not exit
      }
      child.killed = true;
      child.signalCode = "SIGKILL";
      queueMicrotask(() => child.emit("exit", null, "SIGKILL"));
      return true;
    };

    const supervisor = createGatewaySupervisor({
      nodeBinary: "/node",
      gatewayDir: "/gateway",
      dataDir: "/data",
      onStatus,
      healthIntervalMs: 5,
      healthTimeoutMs: 500,
      shutdownTimeoutMs: 20,
      sleep: immediateSleep,
      reservePort: async () => 53_001,
      spawn: (() => child) as SpawnFn,
      fetch: async () => ({ ok: true, status: 200 }),
    });

    void supervisor.start();
    await waitFor(() => supervisor.getStatus().state === "ready");
    await supervisor.stop();

    expect(termCount).toBeGreaterThanOrEqual(1);
    expect(child.lastSignal).toBe("SIGKILL");
    expect(child.signalCode).toBe("SIGKILL");
  });

  it("publishes status transitions over the bridge host state", async () => {
    const state = createInitialBridgeState();
    const pushed: GatewayStatus[] = [];
    publishGatewayStatus(state, { state: "starting" }, (_ch, payload) => {
      pushed.push(payload);
    });
    publishGatewayStatus(
      state,
      { state: "ready", url: "http://127.0.0.1:1" },
      (_ch, payload) => {
        pushed.push(payload);
      },
    );
    expect(state.status).toEqual({
      state: "ready",
      url: "http://127.0.0.1:1",
    });
    expect(pushed).toHaveLength(2);
  });

  it("delivers the workspace key on stdio[3] with WORKSPACE_KEY_FD only in env", async () => {
    const { onStatus } = collectStatuses();
    const child = new FakeChild();
    const key = Buffer.alloc(WORKSPACE_KEY_BYTES, 0x77);
    const chunks: Buffer[] = [];
    child.keyPipe.on("data", (c: Buffer) => chunks.push(Buffer.from(c)));
    const keyEnded = new Promise<void>((resolve) =>
      child.keyPipe.on("end", resolve),
    );

    let spawnEnv: NodeJS.ProcessEnv | undefined;
    let spawnStdio: unknown;

    const supervisor = createGatewaySupervisor({
      nodeBinary: "/node",
      gatewayDir: "/gateway",
      dataDir: "/data",
      onStatus,
      maxAttempts: 2,
      healthIntervalMs: 5,
      healthTimeoutMs: 1_000,
      sleep: immediateSleep,
      reservePort: async () => 51_777,
      resolveWorkspaceKey: async () => key,
      spawn: ((_cmd, _args, opts) => {
        spawnEnv = opts.env;
        spawnStdio = opts.stdio;
        return child;
      }) as SpawnFn,
      fetch: async () => ({ ok: true, status: 200 }),
    });

    const started = supervisor.start();
    await waitFor(() => supervisor.getStatus().state === "ready");
    await keyEnded;

    expect(spawnStdio).toEqual(["ignore", "pipe", "pipe", "pipe"]);
    expect(spawnEnv?.[WORKSPACE_KEY_FD_ENV]).toBe(String(WORKSPACE_KEY_STDIO_FD));
    for (const value of Object.values(spawnEnv ?? {})) {
      if (typeof value !== "string") continue;
      expect(value).not.toContain(key.toString("hex"));
      expect(value).not.toContain(key.toString("base64"));
    }
    expect(Buffer.concat(chunks).equals(key)).toBe(true);

    await supervisor.stop();
    await started;
  });
});

describe("gateway supervision scenarios (spec coverage notes)", () => {
  it("uses the vendored gateway entry (same artifact as the container deploy)", () => {
    // Stream 2's assert-gateway.sh proves artifact parity. The supervisor
    // always launches dist/cli.js from the vendor directory — no fork.
    const plan = buildGatewaySpawnPlan({
      nodeBinary: "/runtime/node",
      gatewayDir: "/Resources/gateway",
      dataDir: "/gateway-data",
      port: 1,
    });
    expect(plan.args[0]).toBe("dist/cli.js");
    expect(plan.cwd).toContain("gateway");
  });

  it("records loopback-only bind intent for remote refusal", () => {
    const plan = buildGatewaySpawnPlan({
      nodeBinary: "/node",
      gatewayDir: "/g",
      dataDir: "/d",
      port: 9,
    });
    expect(plan.env.WORKSPACE_HOST).toBe("127.0.0.1");
    expect(plan.args).toContain("--host");
    expect(plan.args).toContain("127.0.0.1");
    expect(plan.url.startsWith("http://127.0.0.1:")).toBe(true);
  });

  it("clean stop leaves no live child handle", async () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "gw-sup-"));
    const { onStatus } = collectStatuses();
    const child = new FakeChild();
    const supervisor = createGatewaySupervisor({
      nodeBinary: "/node",
      gatewayDir: "/g",
      dataDir,
      onStatus,
      healthIntervalMs: 5,
      healthTimeoutMs: 500,
      sleep: immediateSleep,
      reservePort: async () => 54_001,
      spawn: (() => child) as SpawnFn,
      fetch: async () => ({ ok: true, status: 200 }),
    });

    void supervisor.start();
    await waitFor(() => supervisor.getStatus().state === "ready");
    await supervisor.stop();
    expect(child.killed || child.signalCode != null).toBe(true);
    fs.rmSync(dataDir, { recursive: true, force: true });
  });
});
