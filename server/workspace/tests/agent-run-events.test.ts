/**
 * Native agent run-event log: gapless seq, persistence, and subscriber
 * independence (openspec iw9-d stream 2 / agent-run-stream).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { RunEvent } from "@aprovan/agent-protocol";
import { NATIVE_AGENT_CAPABILITIES } from "../src/agents/runner.js";
import { readRunEvents, subscribeRunEvents } from "../src/agents/run-events.js";
import { createApp } from "../src/app.js";
import {
  resetExecutor,
  setExecutor,
  type IsolateResult,
} from "../src/isolate.js";

const WORKSPACE_ID = "local";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-agent-run-events-"));
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
  stopReason?: string;
  turns?: unknown[];
  events?: RunEvent[];
  lastSeq?: number;
  origin?: string;
  error?: { message: string };
};

beforeEach(async () => {
  expect((await saveCredential("anthropic", "sk-test")).status).toBeLessThan(300);
  expect((await saveCredential("github", "gh-test")).status).toBeLessThan(300);
  // Named llm profiles live in the unified profile store (not interfaces.bind).
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

describe("agent run events", () => {
  it("declares streaming capability once the event log exists", () => {
    expect(NATIVE_AGENT_CAPABILITIES.streaming).toBe(true);
  });

  it("emits consecutive gapless seq matching the persisted record (two turns, one tool each)", async () => {
    await data(
      await manage("agents/create", {
        name: "evented",
        llm: "llm:fast",
        prompt: "Use tools then answer.",
        grants: { tools: ["vcs.*", "llm.*"] },
      }),
    );

    const live: RunEvent[] = [];
    let release!: () => void;
    const gateFirst = new Promise<void>((resolve) => {
      release = resolve;
    });

    scriptLlm(
      [
        {
          content: "looking up",
          tool_calls: [
            {
              id: "c1",
              type: "function",
              function: {
                name: "call_tool",
                arguments: JSON.stringify({
                  namespace: "vcs",
                  operation: "log",
                  args: { limit: 1 },
                }),
              },
            },
          ],
        },
        {
          content: "second look",
          tool_calls: [
            {
              id: "c2",
              type: "function",
              function: {
                name: "call_tool",
                arguments: JSON.stringify({
                  namespace: "vcs",
                  operation: "log",
                  args: { limit: 2 },
                }),
              },
            },
          ],
        },
        { content: "```widget\n{\"type\":\"note\"}\n```\ndone" },
      ],
      { gateFirst },
    );

    // Start the run without awaiting so we can subscribe while it is gated
    // on the first LLM call. `createApp().request` returns a Promise<Response>.
    const runPromise = createApp()
      .request("/tools/agents/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ args: { agent: "evented", input: "go" } }),
      })
      .then((res) => data<StoredRun>(res));

    // Poll for the running record, subscribe, then release the LLM gate.
    let runId: string | undefined;
    for (let attempt = 0; attempt < 50 && !runId; attempt += 1) {
      const listed = await data<{ runs?: Array<{ id: string; status: string }> }>(
        await manage("agents/runs", { limit: 5 }),
      );
      const asArray = Array.isArray(listed.runs) ? listed.runs : [];
      const hit = asArray.find((r) => r.status === "running");
      if (hit) {
        runId = hit.id;
        break;
      }
      await new Promise((r) => setTimeout(r, 10));
    }

    let unsub: (() => void) | undefined;
    if (runId) unsub = subscribeRunEvents(runId, (e) => live.push(e));
    release();
    const run = await runPromise;
    unsub?.();

    expect(run.status).toBe("succeeded");
    expect(run.origin).toBe("api");
    expect(run.events).toBeDefined();
    const events = run.events!;
    expect(events.map((e) => e.seq)).toEqual(events.map((_, i) => i));
    expect(run.lastSeq).toBe(events[events.length - 1]!.seq);

    // Live fan-out (when we caught the run mid-flight) matches persist order.
    expect(runId).toBeDefined();
    expect(live.length).toBeGreaterThan(0);
    expect(live.map((e) => e.seq)).toEqual(events.slice(-live.length).map((e) => e.seq));
    expect(live.map((e) => e.type)).toEqual(events.slice(-live.length).map((e) => e.type));

    const types = events.map((e) => e.type);
    expect(types[0]).toBe("run_started");
    expect(types).toContain("tool_call_started");
    expect(types).toContain("tool_call_finished");
    expect(types[types.length - 1]).toBe("run_finished");

    // Two tool turns + final assistant turn.
    expect(types.filter((t) => t === "turn_started")).toHaveLength(3);
    expect(types.filter((t) => t === "tool_call_started")).toHaveLength(2);
    expect(types.filter((t) => t === "tool_call_finished")).toHaveLength(2);

    const deltas = events.filter((e) => e.type === "assistant_delta");
    expect(deltas.some((e) => e.type === "assistant_delta" && e.text.includes("```widget"))).toBe(
      true,
    );

    const started = events.find((e) => e.type === "tool_call_started" && e.callId === "c1");
    expect(started).toMatchObject({
      type: "tool_call_started",
      namespace: "vcs",
      operation: "log",
    });
    const finished = events.find((e) => e.type === "tool_call_finished" && e.callId === "c1");
    expect(finished).toMatchObject({ type: "tool_call_finished", ok: true });
    expect(finished && "resultPreview" in finished && finished.resultPreview).toBeTruthy();
  });

  it("replays the full event log after the run is terminal (survives the run)", async () => {
    await data(
      await manage("agents/create", {
        name: "durable",
        llm: "llm:fast",
        grants: { tools: ["vcs.*"] },
      }),
    );
    scriptLlm([{ content: "hello from the past" }]);

    const run = await data<StoredRun>(
      await manage("agents/run", { agent: "durable", input: "hi" }),
    );
    expect(run.status).toBe("succeeded");

    // "An hour later" — the log is on the run record; readRunEvents is the
    // replay surface stream 3 will call. No clock mock needed.
    const replayed = await readRunEvents(WORKSPACE_ID, run.id, 0);
    expect(replayed.length).toBeGreaterThan(0);
    expect(replayed.map((e) => e.seq)).toEqual(replayed.map((_, i) => i));
    expect(replayed[replayed.length - 1]!.type).toBe("run_finished");

    const fromGet = await data<StoredRun>(await manage("agents/getRun", { id: run.id }));
    expect(fromGet.events?.map((e) => e.seq)).toEqual(replayed.map((e) => e.seq));
  });

  it("reaches a terminal state with zero subscribers (disconnect does not cancel)", async () => {
    await data(
      await manage("agents/create", {
        name: "lonely",
        llm: "llm:fast",
        grants: { tools: ["vcs.*"] },
      }),
    );
    scriptLlm([
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
      { content: "all three done" },
    ]);

    // No subscribeRunEvents — zero clients attached.
    const run = await data<StoredRun>(
      await manage("agents/run", { agent: "lonely", input: "work" }),
    );
    expect(run.status).toBe("succeeded");
    expect(run.turns).toHaveLength(4);

    const got = await data<StoredRun>(await manage("agents/getRun", { id: run.id }));
    expect(got.status).toBe("succeeded");
    expect(got.turns).toHaveLength(4);
    expect(got.events?.some((e) => e.type === "run_finished")).toBe(true);
    expect(got.events?.filter((e) => e.type === "turn_started")).toHaveLength(4);
  });

  it("preserves tool_denied: emits tool_call_started then ends without changing the grant boundary", async () => {
    await data(
      await manage("agents/create", {
        name: "locked-events",
        llm: "llm:fast",
        grants: { tools: ["vcs.*"] },
      }),
    );

    scriptLlm([
      {
        tool_calls: [
          {
            id: "deny-1",
            type: "function",
            function: {
              name: "call_tool",
              arguments: JSON.stringify({
                namespace: "keyvalue",
                operation: "set",
                args: { key: "nope", value: 1 },
              }),
            },
          },
        ],
      },
    ]);

    const run = await data<StoredRun>(
      await manage("agents/run", { agent: "locked-events", input: "go" }),
    );
    expect(run.status).toBe("failed");
    expect(run.stopReason).toBe("tool_denied");
    expect(run.error?.message).toMatch(/keyvalue\.set/);

    const events = run.events ?? [];
    const started = events.find((e) => e.type === "tool_call_started");
    expect(started).toMatchObject({
      type: "tool_call_started",
      callId: "deny-1",
      namespace: "keyvalue",
      operation: "set",
    });
    const finished = events.find((e) => e.type === "tool_call_finished");
    expect(finished).toMatchObject({
      type: "tool_call_finished",
      callId: "deny-1",
      ok: false,
      error: "denied",
    });
    expect(events.some((e) => e.type === "run_finished")).toBe(true);
    const finishedRun = events.find((e) => e.type === "run_finished");
    expect(finishedRun).toMatchObject({
      type: "run_finished",
      stopReason: "tool_denied",
      status: "failed",
    });
  });
});
