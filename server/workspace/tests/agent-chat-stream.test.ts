/**
 * Agent run stream endpoint: reattach/replay SSE
 * (openspec iw9-d stream 3 / agent-run-stream).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import {
  AGENTS_ROUTE_PREFIX,
  decodeRunEventFrame,
  encodeRunEventFrame,
  runStreamPath,
  type RunEvent,
} from "@aprovan/agent-protocol";
import {
  appendRunEvents,
  type RunEventInput,
} from "../src/agents/run-events.js";
import { createApp } from "../src/app.js";
import {
  resetExecutor,
  setExecutor,
  type IsolateResult,
} from "../src/isolate.js";
import { svcScope, writeSvcRecord } from "../src/svc-records.js";

const WORKSPACE_ID = "local";
const RUNS_SCOPE = svcScope("agents", "runs");

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-agent-chat-stream-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  process.env["GATEWAY_RATE_LIMIT_RPS"] = "1000";
  process.env["GATEWAY_RATE_LIMIT_BURST"] = "2000";
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["GATEWAY_RATE_LIMIT_RPS"];
  delete process.env["GATEWAY_RATE_LIMIT_BURST"];
  rmSync(dataDir, { recursive: true, force: true });
});

afterEach(() => {
  resetExecutor();
});

const manage = (path: string, args: Record<string, unknown>) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T; error?: string };
  if (!res.ok) throw new Error(body.error ?? `HTTP ${res.status}`);
  return body.data;
}

const saveCredential = (provider: string, token: string) =>
  createApp().request("/credentials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      provider,
      payload: { type: "bearer_token", token },
    }),
  });

interface ChatTurn {
  content?: string | null;
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: { name: string; arguments: string };
  }>;
}

function scriptLlm(turns: ChatTurn[], opts?: { gateFirst?: Promise<void> }): void {
  let i = 0;
  setExecutor({
    async execute(options): Promise<IsolateResult> {
      if (options.operation === "createChatCompletion") {
        if (i === 0 && opts?.gateFirst) await opts.gateFirst;
        const turn = turns[i++] ?? { content: "{}" };
        return {
          success: true,
          data: {
            choices: [{ message: { role: "assistant", ...turn } }],
            usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
          },
          durationMs: 1,
        };
      }
      if (options.operation === "log") {
        return { success: true, data: [{ sha: "abc", message: "hi" }], durationMs: 1 };
      }
      return { success: true, data: { ok: true }, durationMs: 1 };
    },
  });
}

type StoredRun = {
  id: string;
  status: string;
  events?: RunEvent[];
  lastSeq?: number;
  turns?: unknown[];
};

/** Seed a running record so tests can append precise seq ranges. */
async function seedRunningRecord(runId: string): Promise<void> {
  await writeSvcRecord(WORKSPACE_ID, RUNS_SCOPE, runId, {
    id: runId,
    status: "running",
    startedAt: new Date().toISOString(),
    origin: "api",
  });
}

async function seedEvents(
  runId: string,
  count: number,
  base: Omit<RunEventInput, never> = {
    type: "turn_started",
    turn: 0,
    at: new Date().toISOString(),
  },
): Promise<RunEvent[]> {
  const inputs: RunEventInput[] = [];
  for (let i = 0; i < count; i += 1) {
    if (i === 0 && base.type === "run_started") {
      inputs.push(base);
    } else if (base.type === "run_started") {
      inputs.push({
        type: "turn_started",
        turn: i,
        at: new Date().toISOString(),
      });
    } else {
      inputs.push({
        type: "turn_started",
        turn: i,
        at: new Date().toISOString(),
      });
    }
  }
  return appendRunEvents(WORKSPACE_ID, runId, inputs);
}

/** Consume an SSE body into decoded RunEvents (keepalive comments ignored). */
async function readSseEvents(
  response: Response,
  opts?: {
    /** Stop after seeing this many data events (stream may still be open). */
    maxEvents?: number;
    signal?: AbortSignal;
  },
): Promise<{ events: RunEvent[]; frames: string[] }> {
  if (!response.body) throw new Error("missing body");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  const events: RunEvent[] = [];
  const frames: string[] = [];

  const pushFrame = (raw: string): void => {
    const trimmed = raw.trimEnd();
    if (!trimmed || trimmed.startsWith(":")) return;
    const dataLine =
      trimmed.split(/\r?\n/).find((line) => line.startsWith("data:")) ?? trimmed;
    const decoded = decodeRunEventFrame(dataLine);
    if (!decoded) return;
    frames.push(encodeRunEventFrame(decoded));
    events.push(decoded);
  };

  try {
    while (true) {
      if (opts?.signal?.aborted) break;
      if (opts?.maxEvents !== undefined && events.length >= opts.maxEvents) break;
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let sep: number;
      while ((sep = buffer.indexOf("\n\n")) >= 0) {
        const chunk = buffer.slice(0, sep);
        buffer = buffer.slice(sep + 2);
        pushFrame(chunk);
        if (opts?.maxEvents !== undefined && events.length >= opts.maxEvents) {
          await reader.cancel();
          return { events, frames };
        }
        const last = events[events.length - 1];
        if (last && (last.type === "run_finished" || last.type === "error")) {
          await reader.cancel();
          return { events, frames };
        }
      }
    }
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // Already released by cancel.
    }
  }
  return { events, frames };
}

function openStream(runId: string, from: number, init?: RequestInit): Promise<Response> {
  return createApp().request(runStreamPath(runId, from), init);
}

beforeEach(async () => {
  expect((await saveCredential("anthropic", "sk-test")).status).toBeLessThan(300);
  expect((await saveCredential("github", "gh-test")).status).toBeLessThan(300);
  await data(
    await manage("profiles/set", {
      namespace: "llm",
      name: "fast",
      provider: "anthropic",
      options: { model: "model-fast", tier: "fast", costPerMTokUsd: 1 },
    }),
  );
  await data(
    await manage("profiles/set", {
      namespace: "vcs",
      provider: "github",
    }),
  );
});

describe("GET /agents/runs/:id/stream", () => {
  it("mounts at the frozen AGENTS_ROUTE_PREFIX without shadowing /tools/agents", async () => {
    expect(AGENTS_ROUTE_PREFIX).toBe("/agents");
    expect(runStreamPath("agr-x", 0)).toBe("/agents/runs/agr-x/stream?from=0");

    await data(
      await manage("agents/create", {
        name: "tools-alive",
        llm: "llm:fast",
        grants: { tools: ["vcs.*"] },
      }),
    );
    scriptLlm([{ content: "ok" }]);
    const run = await data<StoredRun>(
      await manage("agents/run", { agent: "tools-alive", input: "hi" }),
    );
    expect(run.status).toBe("succeeded");
    // tools-namespace dispatch still answers under /tools, not /agents.
    const got = await data<StoredRun>(await manage("agents/getRun", { id: run.id }));
    expect(got.id).toBe(run.id);
  });

  it("replays a terminal run's full history ending with run_finished", async () => {
    await data(
      await manage("agents/create", {
        name: "terminal-replay",
        llm: "llm:fast",
        grants: { tools: ["vcs.*"] },
      }),
    );
    scriptLlm([{ content: "hello from the past" }]);
    const run = await data<StoredRun>(
      await manage("agents/run", { agent: "terminal-replay", input: "hi" }),
    );
    expect(run.status).toBe("succeeded");

    const res = await openStream(run.id, 0);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/event-stream");

    const { events } = await readSseEvents(res);
    expect(events.length).toBeGreaterThan(0);
    expect(events.map((e) => e.seq)).toEqual(events.map((_, i) => i));
    expect(events[0]!.type).toBe("run_started");
    expect(events[events.length - 1]!.type).toBe("run_finished");
  });

  it("reattaches mid-run from=42 with no gap or duplicate through run_finished", async () => {
    const runId = "agr-reattach-42";
    await seedRunningRecord(runId);
    // Client already consumed 0..41; seed those, then open from=42 before the live tail.
    await seedEvents(runId, 42, {
      type: "run_started",
      runId,
      at: new Date().toISOString(),
    });

    const streamPromise = openStream(runId, 42).then((res) => {
      expect(res.status).toBe(200);
      return readSseEvents(res);
    });

    // Give the handler time to subscribe + replay (empty from 42) before live appends.
    await new Promise((r) => setTimeout(r, 20));

    await appendRunEvents(WORKSPACE_ID, runId, [
      { type: "turn_started", turn: 42, at: new Date().toISOString() },
      { type: "assistant_delta", turn: 42, text: "tail" },
      { type: "turn_finished", turn: 42 },
      {
        type: "run_finished",
        status: "succeeded",
        stopReason: "completed",
        usage: { turns: 1 },
      },
    ]);
    await writeSvcRecord(WORKSPACE_ID, RUNS_SCOPE, runId, {
      ...(await import("../src/agents/runner.js").then((m) =>
        m.readNativeAgentRun(WORKSPACE_ID, runId),
      ))!,
      status: "succeeded",
    });

    const { events } = await streamPromise;
    expect(events.map((e) => e.seq)).toEqual([42, 43, 44, 45]);
    expect(events[0]!.type).toBe("turn_started");
    expect(events[events.length - 1]!.type).toBe("run_finished");
  });

  it("locked-phone reattach yields a byte-identical event sequence to an uninterrupted client", async () => {
    await data(
      await manage("agents/create", {
        name: "locked-phone",
        llm: "llm:fast",
        grants: { tools: ["vcs.*"] },
      }),
    );

    let release!: () => void;
    const gateFirst = new Promise<void>((resolve) => {
      release = resolve;
    });

    scriptLlm(
      [
        {
          content: "looking",
          tool_calls: [
            {
              id: "c1",
              type: "function",
              function: {
                name: "call_tool",
                arguments: JSON.stringify({
                  namespace: "vcs",
                  operation: "log",
                  args: {},
                }),
              },
            },
          ],
        },
        { content: "done after tool" },
      ],
      { gateFirst },
    );

    const runPromise = createApp()
      .request("/tools/agents/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ args: { agent: "locked-phone", input: "go" } }),
      })
      .then((res) => data<StoredRun>(res));

    let runId: string | undefined;
    for (let attempt = 0; attempt < 50 && !runId; attempt += 1) {
      const listed = await data<{ runs?: Array<{ id: string; status: string }> }>(
        await manage("agents/runs", { limit: 5 }),
      );
      const hit = (listed.runs ?? []).find((r) => r.status === "running");
      if (hit) {
        runId = hit.id;
        break;
      }
      await new Promise((r) => setTimeout(r, 10));
    }
    expect(runId).toBeDefined();

    const uninterruptedPromise = openStream(runId!, 0).then((res) => readSseEvents(res));

    // Interrupted client: take a few events, drop the connection, reattach.
    const partialRes = await openStream(runId!, 0);
    const partial = await readSseEvents(partialRes, { maxEvents: 2 });
    expect(partial.events.length).toBe(2);
    const lastSeen = partial.events[partial.events.length - 1]!.seq;

    release();
    const run = await runPromise;
    expect(run.status).toBe("succeeded");

    const resumedRes = await openStream(runId!, lastSeen + 1);
    const resumed = await readSseEvents(resumedRes);

    const uninterrupted = await uninterruptedPromise;
    const reattachedFrames = [...partial.frames, ...resumed.frames];
    expect(reattachedFrames.join("")).toBe(uninterrupted.frames.join(""));
    expect(reattachedFrames.map((f) => decodeRunEventFrame(f.split("\n")[0]!)).map((e) => e?.seq)).toEqual(
      uninterrupted.events.map((e) => e.seq),
    );
  });

  it("supports concurrent reattach at different from values with no cross-talk", async () => {
    const runId = "agr-concurrent";
    await seedRunningRecord(runId);
    await seedEvents(runId, 10, {
      type: "run_started",
      runId,
      at: new Date().toISOString(),
    });

    const from0 = openStream(runId, 0).then((res) => readSseEvents(res));
    const from5 = openStream(runId, 5).then((res) => readSseEvents(res));
    await new Promise((r) => setTimeout(r, 20));

    await appendRunEvents(WORKSPACE_ID, runId, [
      { type: "assistant_delta", turn: 0, text: "live" },
      {
        type: "run_finished",
        status: "succeeded",
        stopReason: "completed",
        usage: {},
      },
    ]);
    const current = await import("../src/agents/runner.js").then((m) =>
      m.readNativeAgentRun(WORKSPACE_ID, runId),
    );
    await writeSvcRecord(WORKSPACE_ID, RUNS_SCOPE, runId, {
      ...current!,
      status: "succeeded",
    });

    const [a, b] = await Promise.all([from0, from5]);
    expect(a.events[0]!.seq).toBe(0);
    expect(b.events[0]!.seq).toBe(5);
    expect(a.events.map((e) => e.seq)).toEqual(a.events.map((_, i) => i));
    expect(b.events.map((e) => e.seq)).toEqual(
      Array.from({ length: b.events.length }, (_, i) => i + 5),
    );
    expect(a.events[a.events.length - 1]!.type).toBe("run_finished");
    expect(b.events[b.events.length - 1]!.type).toBe("run_finished");
    // Shared tail events are byte-identical across clients.
    const aTail = a.frames.slice(-2).join("");
    const bTail = b.frames.slice(-2).join("");
    expect(aTail).toBe(bTail);
  });

  it("disconnect does not cancel the run", async () => {
    await data(
      await manage("agents/create", {
        name: "disconnect-ok",
        llm: "llm:fast",
        grants: { tools: ["vcs.*"] },
      }),
    );

    let release!: () => void;
    const gateFirst = new Promise<void>((resolve) => {
      release = resolve;
    });
    scriptLlm(
      [
        {
          tool_calls: [
            {
              id: "t1",
              type: "function",
              function: {
                name: "call_tool",
                arguments: JSON.stringify({
                  namespace: "vcs",
                  operation: "log",
                  args: {},
                }),
              },
            },
          ],
        },
        {
          tool_calls: [
            {
              id: "t2",
              type: "function",
              function: {
                name: "call_tool",
                arguments: JSON.stringify({
                  namespace: "vcs",
                  operation: "log",
                  args: {},
                }),
              },
            },
          ],
        },
        {
          tool_calls: [
            {
              id: "t3",
              type: "function",
              function: {
                name: "call_tool",
                arguments: JSON.stringify({
                  namespace: "vcs",
                  operation: "log",
                  args: {},
                }),
              },
            },
          ],
        },
        { content: "three turns left done" },
      ],
      { gateFirst },
    );

    const runPromise = createApp()
      .request("/tools/agents/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ args: { agent: "disconnect-ok", input: "work" } }),
      })
      .then((res) => data<StoredRun>(res));

    let runId: string | undefined;
    for (let attempt = 0; attempt < 50 && !runId; attempt += 1) {
      const listed = await data<{ runs?: Array<{ id: string; status: string }> }>(
        await manage("agents/runs", { limit: 5 }),
      );
      const hit = (listed.runs ?? []).find((r) => r.status === "running");
      if (hit) {
        runId = hit.id;
        break;
      }
      await new Promise((r) => setTimeout(r, 10));
    }
    expect(runId).toBeDefined();

    const controller = new AbortController();
    const streamRes = await openStream(runId!, 0, { signal: controller.signal });
    expect(streamRes.status).toBe(200);
    // Drop the only attached client mid-run.
    controller.abort();
    await streamRes.body?.cancel();

    release();
    const run = await runPromise;
    expect(run.status).toBe("succeeded");
    expect(run.turns).toHaveLength(4);

    const got = await data<StoredRun>(await manage("agents/getRun", { id: run.id }));
    expect(got.status).toBe("succeeded");
    expect(got.turns).toHaveLength(4);
  });

  it("sends an immediate keepalive comment before the first event", async () => {
    const runId = "agr-keepalive";
    await seedRunningRecord(runId);
    await seedEvents(runId, 1, {
      type: "run_started",
      runId,
      at: new Date().toISOString(),
    });

    const res = await openStream(runId, 0);
    expect(res.status).toBe(200);
    const reader = res.body!.getReader();
    const { value } = await reader.read();
    const text = new TextDecoder().decode(value);
    expect(text.startsWith(": keepalive")).toBe(true);
    await reader.cancel();

    // Mark terminal so we do not leak a hanging subscribe in later tests.
    await appendRunEvents(WORKSPACE_ID, runId, [
      {
        type: "run_finished",
        status: "succeeded",
        stopReason: "completed",
        usage: {},
      },
    ]);
    const current = await import("../src/agents/runner.js").then((m) =>
      m.readNativeAgentRun(WORKSPACE_ID, runId),
    );
    await writeSvcRecord(WORKSPACE_ID, RUNS_SCOPE, runId, {
      ...current!,
      status: "succeeded",
    });
  });
});
