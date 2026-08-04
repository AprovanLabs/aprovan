/**
 * The machine path: the relay, the capability handshake, and the scheduler.
 *
 * This is the half `sandboxes.test.ts` deliberately cannot reach. A machine
 * provider does not go through the isolate at all — it talks to the in-process
 * relay — so the only honest way to test it is to be the agent: lease ops,
 * answer them, advertise capabilities, claim runs.
 *
 * The property under test is the one the whole scheduler exists for: **a run
 * is only ever offered to a host that can actually run it.** A Node workload
 * must be invisible to a box without Node, not merely rejected by it.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

let dataDir: string;

/**
 * A stand-in image registry. Image descriptors normally come from a CDN;
 * pointing `SANDBOX_IMAGE_CDN` at a local server keeps the handshake honest
 * (it really resolves a descriptor and really reads its `require` list)
 * without a network dependency.
 */
const IMAGES: Record<string, unknown> = {
  "@aprovan/native": {
    name: "@aprovan/native",
    version: "0.1.0",
    sandbox: {
      workdir: "/work",
      base: { machine: { require: ["node", "git"] } },
      tools: [{ name: "node" }, { name: "git" }],
    },
  },
  "@aprovan/sandbox-image-python": {
    name: "@aprovan/sandbox-image-python",
    version: "0.1.0",
    sandbox: {
      workdir: "/work",
      base: { machine: { require: ["python3"] } },
      tools: [{ name: "python3" }],
    },
  },
};

let imageServer: { url: string; close: () => Promise<void> };

beforeAll(async () => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-sbx-sched-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  process.env["GATEWAY_RATE_LIMIT_RPS"] = "1000";
  process.env["GATEWAY_RATE_LIMIT_BURST"] = "2000";

  const { createServer } = await import("node:http");
  const server = createServer((req, res) => {
    // esm.sh-shaped: /<name>[@<version>]/package.json
    const path = decodeURIComponent(req.url ?? "").replace(/^\//u, "");
    const name = path.replace(/\/package\.json$/u, "").replace(/@[\d.]+$/u, "");
    const body = IMAGES[name];
    res.writeHead(body ? 200 : 404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(body ?? { error: "not found" }));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = (server.address() as { port: number }).port;
  imageServer = {
    url: `http://127.0.0.1:${port}`,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
  process.env["SANDBOX_IMAGE_CDN"] = imageServer.url;
});

afterAll(async () => {
  await imageServer.close();
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["GATEWAY_RATE_LIMIT_RPS"];
  delete process.env["GATEWAY_RATE_LIMIT_BURST"];
  delete process.env["SANDBOX_IMAGE_CDN"];
  rmSync(dataDir, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------

const call = (path: string, args: Record<string, unknown> = {}) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data?: T; error?: string };
  if (body.error) throw new Error(body.error);
  return body.data as T;
}

interface Registered {
  host: { id: string };
  hostToken: string;
  clientToken: string;
  relayUrl: string;
}

async function registerHost(
  name: string,
  images: string[],
): Promise<Registered> {
  return data<Registered>(
    await call("sandboxes/registerHost", { name, root: "/tmp/work", images }),
  );
}

/** Speak the relay as the agent would. */
const asAgent = (host: Registered, path: string, body: unknown = {}) =>
  createApp().request(`${host.relayUrl}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${host.hostToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

const NODE_IMAGE = "@aprovan/native";
const PYTHON_IMAGE = "@aprovan/sandbox-image-python";

beforeEach(async () => {
  // Registrations and queued runs are workspace state; clear both so each
  // case starts from an empty queue.
  for (const host of await data<{ hosts: Array<{ id: string }> }>(
    await call("sandboxes/hosts", {}),
  ).then((r) => r.hosts)) {
    await call("sandboxes/revokeHost", { id: host.id });
  }
  for (const run of await data<{ runs: Array<{ id: string; status: string }> }>(
    await call("sandboxes/runs", {}),
  ).then((r) => r.runs)) {
    if (run.status === "pending") await call("sandboxes/cancelRun", { id: run.id });
  }
});

// ---------------------------------------------------------------------------

describe("capability handshake", () => {
  it("asks for the binaries its images require, then keeps what verified", async () => {
    const host = await registerHost("laptop", [NODE_IMAGE, PYTHON_IMAGE]);

    // Step one: the gateway knows what to look for; the machine does not.
    const probe = await (await asAgent(host, "advert")).json();
    expect((probe as { probe: string[] }).probe.sort()).toEqual(["git", "node", "python3"]);

    // Step two: this machine has Node but no Python.
    const verified = (await (
      await asAgent(host, "advert", { tools: ["node", "git"], platform: "darwin/arm64" })
    ).json()) as { images: string[]; skipped: string[] };
    expect(verified.images).toEqual([NODE_IMAGE]);
    expect(verified.skipped).toEqual([PYTHON_IMAGE]);

    const hosts = await data<{ hosts: Array<Record<string, unknown>> }>(
      await call("sandboxes/hosts", {}),
    );
    expect(hosts.hosts[0]).toMatchObject({
      verifiedImages: [NODE_IMAGE],
      platform: "darwin/arm64",
    });
  });

  /**
   * An empty requirement list is vacuously satisfied by every machine, so an
   * image nobody can describe must fail closed — otherwise a typo'd image
   * name verifies everywhere and then fails at provision time, which is the
   * exact mismatch this handshake exists to prevent.
   */
  it("refuses to verify an image it cannot resolve", async () => {
    const host = await registerHost("laptop", [NODE_IMAGE, "@aprovan/does-not-exist"]);
    const verified = (await (
      await asAgent(host, "advert", { tools: ["node", "git"] })
    ).json()) as { images: string[]; unresolved: string[] };

    expect(verified.images).toEqual([NODE_IMAGE]);
    expect(verified.unresolved).toEqual(["@aprovan/does-not-exist"]);

    await call("sandboxes/schedule", { image: "@aprovan/does-not-exist", workflow: "ghost" });
    const claim = (await (await asAgent(host, "claim", { maxWaitMs: 60 })).json()) as {
      run: unknown;
    };
    expect(claim.run).toBeNull();
  });

  it("never returns the token digests to a listing", async () => {
    await registerHost("laptop", [NODE_IMAGE]);
    const hosts = await data<{ hosts: Array<Record<string, unknown>> }>(
      await call("sandboxes/hosts", {}),
    );
    expect(hosts.hosts.every((host) => !("hostTokenHash" in host))).toBe(true);
  });
});

describe("scheduling", () => {
  it("offers a run only to a host that verified its image", async () => {
    const nodeBox = await registerHost("node-box", [NODE_IMAGE]);
    const pyBox = await registerHost("py-box", [PYTHON_IMAGE]);
    await asAgent(nodeBox, "advert", { tools: ["node", "git"] });
    await asAgent(pyBox, "advert", { tools: ["python3"] });

    const { run } = await data<{ run: { id: string; status: string } }>(
      await call("sandboxes/schedule", { image: NODE_IMAGE, workflow: "build" }),
    );
    expect(run.status).toBe("pending");

    // The Python box cannot even see it — the queue is keyed by image.
    const pyClaim = (await (
      await asAgent(pyBox, "claim", { maxWaitMs: 60 })
    ).json()) as { run: unknown };
    expect(pyClaim.run).toBeNull();

    const nodeClaim = (await (
      await asAgent(nodeBox, "claim", { maxWaitMs: 60 })
    ).json()) as { run: { id: string; image: string } | null };
    expect(nodeClaim.run).toMatchObject({ id: run.id, image: NODE_IMAGE });
  });

  it("withholds a run whose extra tool requirements the host lacks", async () => {
    const host = await registerHost("node-box", [NODE_IMAGE]);
    await asAgent(host, "advert", { tools: ["node", "git"] });

    await call("sandboxes/schedule", {
      image: NODE_IMAGE,
      workflow: "compile",
      requires: { tools: ["rustc"] },
    });

    const claim = (await (await asAgent(host, "claim", { maxWaitMs: 60 })).json()) as {
      run: unknown;
    };
    expect(claim.run).toBeNull();
  });

  it("hands a claimed run to one host only", async () => {
    const a = await registerHost("box-a", [NODE_IMAGE]);
    const b = await registerHost("box-b", [NODE_IMAGE]);
    await asAgent(a, "advert", { tools: ["node", "git"] });
    await asAgent(b, "advert", { tools: ["node", "git"] });

    await call("sandboxes/schedule", { image: NODE_IMAGE, workflow: "once" });

    const first = (await (await asAgent(a, "claim", { maxWaitMs: 60 })).json()) as {
      run: { id: string } | null;
    };
    const second = (await (await asAgent(b, "claim", { maxWaitMs: 60 })).json()) as {
      run: { id: string } | null;
    };
    expect(first.run).not.toBeNull();
    expect(second.run).toBeNull();
  });

  /**
   * A run whose sandbox mounts nothing tracked has nothing to bring back — a
   * build that only produced logs. `commit` refuses that case on purpose, so
   * the scheduler must not call it; reporting the run as failed would be a lie
   * about the workflow, which is what the Runs view would then show.
   */
  it("does not fail a run that simply had nothing to commit", async () => {
    const host = await registerHost("node-box", [NODE_IMAGE]);
    await asAgent(host, "advert", { tools: ["node", "git"] });

    const scheduled = await data<{ run: { id: string } }>(
      await call("sandboxes/schedule", { image: NODE_IMAGE, workflow: "no-mounts" }),
    );
    await asAgent(host, "claim", { maxWaitMs: 60 });

    // The workflow itself is unregistered here, so the run fails for *that* —
    // what must not appear is the commit complaint.
    for (let attempt = 0; attempt < 40; attempt++) {
      const runs = await data<{ runs: Array<{ id: string; status: string; error?: string }> }>(
        await call("sandboxes/runs", {}),
      );
      const run = runs.runs.find((candidate) => candidate.id === scheduled.run.id);
      if (run && (run.status === "failed" || run.status === "succeeded")) {
        expect(run.error ?? "").not.toMatch(/nothing to commit/u);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    throw new Error("run never reached a terminal state");
  });

  it("refuses a schedule with no image, since nothing could be matched", async () => {
    const response = await call("sandboxes/schedule", { workflow: "build" });
    expect(response.status).toBe(400);
    expect(((await response.json()) as { error: string }).error).toMatch(/image/u);
  });

  it("cancels a pending run", async () => {
    const run = await data<{ run: { id: string } }>(
      await call("sandboxes/schedule", { image: NODE_IMAGE, workflow: "cancel-me" }),
    );
    const cancelled = await data<{ run: { status: string } }>(
      await call("sandboxes/cancelRun", { id: run.run.id }),
    );
    expect(cancelled.run.status).toBe("cancelled");
  });

  /**
   * Once a host has taken a run, cancelling must not rewrite its outcome —
   * the sandbox is already being provisioned somewhere. Asserted on the
   * outcome rather than a status code because the two rejections are a race:
   * a claimed run is 409, and a claimed run that has already finished (this
   * one fails immediately — `claimed` is not a registered workflow) is 404.
   * Either is correct; what must never happen is the run reading "cancelled".
   */
  it("will not cancel a run a host already took", async () => {
    const host = await registerHost("node-box", [NODE_IMAGE]);
    await asAgent(host, "advert", { tools: ["node", "git"] });

    const scheduled = await data<{ run: { id: string } }>(
      await call("sandboxes/schedule", { image: NODE_IMAGE, workflow: "claimed" }),
    );
    await asAgent(host, "claim", { maxWaitMs: 60 });

    const response = await call("sandboxes/cancelRun", { id: scheduled.run.id });
    expect(response.ok).toBe(false);
    expect([404, 409]).toContain(response.status);

    const runs = await data<{ runs: Array<{ id: string; status: string }> }>(
      await call("sandboxes/runs", {}),
    );
    expect(runs.runs.find((run) => run.id === scheduled.run.id)?.status).not.toBe("cancelled");
  });

  it("keeps finished runs as history rather than in the queue", async () => {
    const first = await data<{ run: { id: string } }>(
      await call("sandboxes/schedule", { image: NODE_IMAGE, workflow: "history" }),
    );
    await call("sandboxes/cancelRun", { id: first.run.id });

    const runs = await data<{ runs: Array<{ id: string; status: string }> }>(
      await call("sandboxes/runs", {}),
    );
    expect(runs.runs.find((run) => run.id === first.run.id)?.status).toBe("cancelled");
  });
});

describe("the relay's two principals", () => {
  it("lets the host token lease and the client token dispatch, never the reverse", async () => {
    const host = await registerHost("laptop", [NODE_IMAGE]);

    // The client token cannot lease...
    const badLease = await createApp().request(`${host.relayUrl}/lease`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${host.clientToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ maxWaitMs: 50 }),
    });
    expect(badLease.status).toBe(401);

    // ...and the host token cannot dispatch work to itself.
    const badRpc = await createApp().request(`${host.relayUrl}/rpc`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${host.hostToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ op: "exec", args: {} }),
    });
    expect(badRpc.status).toBe(401);
  });

  it("carries an op from the client through to the agent and back", async () => {
    const host = await registerHost("laptop", [NODE_IMAGE]);

    // The client side blocks until the agent answers, so run both.
    const dispatched = createApp().request(`${host.relayUrl}/rpc`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${host.clientToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ op: "exec", args: { id: "sbx-1", command: "echo hi", timeoutMs: 5000 } }),
    });

    const leased = (await (
      await asAgent(host, "lease", { maxWaitMs: 5_000 })
    ).json()) as { ops: Array<{ id: string; op: string; args: Record<string, unknown> }> };
    expect(leased.ops).toHaveLength(1);
    expect(leased.ops[0]).toMatchObject({ op: "exec" });

    await asAgent(host, "result", {
      id: leased.ops[0]!.id,
      data: { exitCode: 0, stdout: "hi\n", stderr: "", durationMs: 1, truncated: false },
    });

    const answer = (await (await dispatched).json()) as { data: { stdout: string } };
    expect(answer.data.stdout).toBe("hi\n");
  });

  it("reports an agent-side failure instead of timing out", async () => {
    const host = await registerHost("laptop", [NODE_IMAGE]);
    const dispatched = createApp().request(`${host.relayUrl}/rpc`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${host.clientToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ op: "readFile", args: { id: "sbx-1", path: "nope", timeoutMs: 5000 } }),
    });

    const leased = (await (
      await asAgent(host, "lease", { maxWaitMs: 5_000 })
    ).json()) as { ops: Array<{ id: string }> };
    await asAgent(host, "result", { id: leased.ops[0]!.id, error: "no such file: nope" });

    const answer = (await (await dispatched).json()) as { error: string };
    expect(answer.error).toBe("no such file: nope");
  });
});
