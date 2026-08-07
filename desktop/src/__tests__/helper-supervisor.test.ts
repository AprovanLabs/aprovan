import { EventEmitter } from "node:events";
import { PassThrough } from "node:stream";
import { describe, expect, it } from "vitest";
import { LOOPBACK_HOST } from "../gateway-supervisor.js";
import {
  buildHelperSpawnPlan,
  createHelperSupervisor,
  type HelperStatus,
  type SpawnFn,
} from "../helper-supervisor.js";

class FakeChild extends EventEmitter {
  pid = 62_001;
  killed = false;
  exitCode: number | null = null;
  signalCode: NodeJS.Signals | null = null;
  stdin = null;
  stdout = new PassThrough();
  stderr = new PassThrough();
  stdio: Array<null | PassThrough> = [];
  lastSignal: NodeJS.Signals | undefined;

  constructor() {
    super();
    this.stdio = [null, this.stdout, this.stderr];
  }

  kill(signal?: NodeJS.Signals | number): boolean {
    const sig =
      typeof signal === "string" ? signal : ("SIGTERM" as NodeJS.Signals);
    this.lastSignal = sig;
    this.killed = true;
    if (this.exitCode != null || this.signalCode != null) return true;
    this.signalCode = this.lastSignal;
    this.exitCode = null;
    queueMicrotask(() => this.emit("exit", this.exitCode, this.signalCode));
    return true;
  }

  crash(code = 1): void {
    this.exitCode = code;
    this.signalCode = null;
    this.emit("exit", code, null);
  }
}

function collectStatuses(): {
  statuses: HelperStatus[];
  onStatus: (s: HelperStatus) => void;
} {
  const statuses: HelperStatus[] = [];
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
  return new Promise((resolve) => setTimeout(resolve, Math.min(ms, 5)));
}

describe("buildHelperSpawnPlan", () => {
  it("binds loopback host/port so other hosts cannot reach the helper", () => {
    const plan = buildHelperSpawnPlan({
      helperBinary: "/Resources/macos-helper/macos-helper",
      port: 51_234,
    });
    expect(plan.host).toBe(LOOPBACK_HOST);
    expect(plan.args).toEqual([
      "--host",
      LOOPBACK_HOST,
      "--port",
      "51234",
    ]);
    expect(plan.url).toBe("http://127.0.0.1:51234");
  });
});

describe("HelperSupervisor", () => {
  it("reaches ready after /health passes and exposes the loopback URL", async () => {
    const { statuses, onStatus } = collectStatuses();
    const child = new FakeChild();
    const healthUrl = "http://127.0.0.1:61001/health";

    const supervisor = createHelperSupervisor({
      helperBinary: "/helper/macos-helper",
      binaryExists: () => true,
      onStatus,
      maxAttempts: 3,
      healthIntervalMs: 5,
      healthTimeoutMs: 1_000,
      initialBackoffMs: 1,
      sleep: immediateSleep,
      reservePort: async () => 61_001,
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
      url: "http://127.0.0.1:61001",
    });
    expect(statuses[0]).toEqual({ state: "starting" });

    await supervisor.stop();
    await started;
    expect(child.lastSignal).toBe("SIGTERM");
  });

  it("helper crash does not stop the application — restarts then ready again", async () => {
    const { statuses, onStatus } = collectStatuses();
    let generation = 0;
    const children: FakeChild[] = [];
    let allowHealth = true;
    let port = 61_100;

    const supervisor = createHelperSupervisor({
      helperBinary: "/helper/macos-helper",
      binaryExists: () => true,
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
        child.pid = 62_000 + generation;
        children.push(child);
        return child;
      }) as SpawnFn,
      fetch: async () =>
        allowHealth ? { ok: true, status: 200 } : { ok: false, status: 503 },
    });

    const started = supervisor.start();
    await waitFor(() => supervisor.getStatus().state === "ready");

    allowHealth = false;
    children[0]!.crash(1);

    await waitFor(() => statuses.some((s) => s.state === "restarting"));
    allowHealth = true;

    await waitFor(() => {
      const ready = statuses.filter((s) => s.state === "ready");
      return ready.length >= 2;
    });

    // Availability would be re-read by consumers after ready — URL is live again.
    expect(supervisor.getStatus().state).toBe("ready");
    expect(supervisor.getUrl()?.startsWith("http://127.0.0.1:")).toBe(true);
    expect(statuses.some((s) => s.state === "failed")).toBe(false);

    await supervisor.stop();
    await started;
  });

  it("missing helper binary degrades to unavailable without failing the shell", async () => {
    const { statuses, onStatus } = collectStatuses();
    const supervisor = createHelperSupervisor({
      helperBinary: "/missing/macos-helper",
      binaryExists: () => false,
      onStatus,
      spawn: (() => {
        throw new Error("spawn must not be called when binary is absent");
      }) as SpawnFn,
    });

    await supervisor.start();
    expect(supervisor.getStatus().state).toBe("unavailable");
    const status = supervisor.getStatus();
    if (status.state !== "unavailable") throw new Error("expected unavailable");
    expect(status.reason).toContain("/missing/macos-helper");
    expect(supervisor.getUrl()).toBeUndefined();
    expect(statuses.at(-1)?.state).toBe("unavailable");
  });

  it("holds at failed after retry ceiling — app continues (native caps down)", async () => {
    const { onStatus } = collectStatuses();
    let n = 0;

    const supervisor = createHelperSupervisor({
      helperBinary: "/helper/macos-helper",
      binaryExists: () => true,
      onStatus,
      maxAttempts: 3,
      healthIntervalMs: 5,
      healthTimeoutMs: 50,
      initialBackoffMs: 1,
      maxBackoffMs: 1,
      sleep: immediateSleep,
      reservePort: async () => 62_000 + n,
      spawn: ((_cmd, _args, _opts) => {
        n += 1;
        const child = new FakeChild();
        child.pid = 70_000 + n;
        queueMicrotask(() => child.crash(1));
        return child;
      }) as SpawnFn,
      fetch: async () => ({ ok: false, status: 503 }),
    });

    await supervisor.start();
    expect(supervisor.getStatus().state).toBe("failed");
    expect(supervisor.getUrl()).toBeUndefined();
  });

  it("SIGTERM then SIGKILL on stubborn shutdown (no orphan after quit)", async () => {
    const { onStatus } = collectStatuses();
    const child = new FakeChild();
    let termCount = 0;
    child.kill = (signal?: NodeJS.Signals | number) => {
      const sig =
        typeof signal === "string" ? signal : ("SIGTERM" as NodeJS.Signals);
      child.lastSignal = sig;
      if (sig === "SIGTERM") {
        termCount += 1;
        return true;
      }
      child.killed = true;
      child.signalCode = "SIGKILL";
      queueMicrotask(() => child.emit("exit", null, "SIGKILL"));
      return true;
    };

    const supervisor = createHelperSupervisor({
      helperBinary: "/helper/macos-helper",
      binaryExists: () => true,
      onStatus,
      healthIntervalMs: 5,
      healthTimeoutMs: 500,
      shutdownTimeoutMs: 20,
      sleep: immediateSleep,
      reservePort: async () => 63_001,
      spawn: (() => child) as SpawnFn,
      fetch: async () => ({ ok: true, status: 200 }),
    });

    void supervisor.start();
    await waitFor(() => supervisor.getStatus().state === "ready");
    await supervisor.stop();

    expect(termCount).toBeGreaterThanOrEqual(1);
    expect(child.lastSignal).toBe("SIGKILL");
  });
});

describe("loopback-provider-host spec coverage", () => {
  it("spawn plan targets loopback only (remote hosts refused by bind)", () => {
    const plan = buildHelperSpawnPlan({
      helperBinary: "/h",
      port: 9,
    });
    expect(plan.host).toBe("127.0.0.1");
    expect(plan.args).toContain("127.0.0.1");
  });

  it("does not require a platform-specific gateway module (portable artifact)", () => {
    // Helper lives outside the gateway; the supervisor never patches gateway code.
    const plan = buildHelperSpawnPlan({
      helperBinary: "/Resources/macos-helper/macos-helper",
      port: 1,
    });
    expect(plan.command).toContain("macos-helper");
    expect(plan.command).not.toContain("gateway");
  });
});
