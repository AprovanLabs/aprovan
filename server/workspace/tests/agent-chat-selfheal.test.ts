/**
 * Widget self-heal as a traced server-side turn
 * (openspec iw9-d stream 7 / widget-self-heal-turn).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import {
  chatTurnPath,
  decodeRunEventFrame,
  type ChatTurnResponse,
  type RunEvent,
} from "@aprovan/agent-protocol";
import { createApp } from "../src/app.js";
import {
  resetExecutor,
  setExecutor,
  type IsolateExecuteOptions,
  type IsolateResult,
} from "../src/isolate.js";
import {
  SELF_HEAL_CAP_EXCEEDED,
  SELF_HEAL_LIMITS,
} from "../src/routes/agent-chat.js";
import {
  consecutiveHealCount,
  MAX_WIDGET_AUTOFIXES,
} from "../src/vcs/chat-sessions.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-agent-chat-selfheal-"));
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

function scriptLlm(turns: Array<{ content?: string | null; tool_calls?: unknown[] }>): IsolateExecuteOptions[] {
  const calls: IsolateExecuteOptions[] = [];
  let i = 0;
  setExecutor({
    async execute(options): Promise<IsolateResult> {
      calls.push(options);
      if (options.operation === "createChatCompletion") {
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
      return { success: true, data: { ok: true }, durationMs: 1 };
    },
  });
  return calls;
}

async function readSseEvents(response: Response): Promise<RunEvent[]> {
  if (!response.body) throw new Error("missing body");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  const events: RunEvent[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let sep: number;
      while ((sep = buffer.indexOf("\n\n")) >= 0) {
        const chunk = buffer.slice(0, sep);
        buffer = buffer.slice(sep + 2);
        const trimmed = chunk.trimEnd();
        if (!trimmed || trimmed.startsWith(":")) continue;
        const dataLine =
          trimmed.split(/\r?\n/).find((line) => line.startsWith("data:")) ?? trimmed;
        const decoded = decodeRunEventFrame(dataLine);
        if (!decoded) continue;
        events.push(decoded);
        if (decoded.type === "run_finished" || decoded.type === "error") {
          await reader.cancel();
          return events;
        }
      }
    }
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // released
    }
  }
  return events;
}

async function chatTurn(body: Record<string, unknown>): Promise<Response> {
  return createApp().request(chatTurnPath(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function waitRun(runId: string): Promise<{
  id: string;
  status: string;
  stopReason?: string;
  origin?: string;
  sessionId?: string;
  usage?: Record<string, unknown>;
  output?: string;
}> {
  let last: {
    id: string;
    status: string;
    stopReason?: string;
    origin?: string;
    sessionId?: string;
    usage?: Record<string, unknown>;
    output?: string;
  } = { id: runId, status: "running" };
  for (let i = 0; i < 80; i += 1) {
    last = await data(await manage("agents/getRun", { id: runId }));
    if (last.status !== "running") return last;
    await new Promise((r) => setTimeout(r, 20));
  }
  return last;
}

beforeEach(async () => {
  expect((await saveCredential("openai", "sk-test")).status).toBeLessThan(300);
});

describe("widget-self-heal-turn", () => {
  it("Failure becomes a traced turn", async () => {
    scriptLlm([{ content: "```tsx\nexport default () => null\n```" }]);

    const seeded = await chatTurn({
      text: "build a widget",
      provider: "openai",
      model: "gpt-4.1",
    });
    expect(seeded.status).toBe(200);
    const seed = (await seeded.json()) as ChatTurnResponse;
    await waitRun(seed.runId);

    const heal = await chatTurn({
      sessionId: seed.sessionId,
      text: "The widget at w.tsx failed…",
      provider: "openai",
      model: "gpt-4.1",
      origin: "self-heal",
      failure: {
        messageId: `assistant-${seed.runId}`,
        path: "w.tsx",
        error: "ReferenceError: x is not defined",
      },
    });
    expect(heal.status).toBe(200);
    const body = (await heal.json()) as ChatTurnResponse;
    expect(body.runId).toMatch(/^agr-/);
    expect(body.sessionId).toBe(seed.sessionId);
    expect(body.streamUrl).toContain(body.runId);

    const run = await waitRun(body.runId);
    expect(run.origin).toBe("self-heal");
    expect(run.sessionId).toBe(seed.sessionId);
    expect(run.status).toBe("succeeded");

    const streamRes = await createApp().request(body.streamUrl);
    expect(streamRes.status).toBe(200);
    const events = await readSseEvents(streamRes);
    expect(events.some((e) => e.type === "run_started")).toBe(true);
    expect(events.some((e) => e.type === "assistant_delta")).toBe(true);
    expect(events[events.length - 1]!.type).toBe("run_finished");
  });

  it("Heal turns are attributable", async () => {
    scriptLlm([{ content: "fixed" }]);

    const seeded = await chatTurn({
      text: "seed",
      provider: "openai",
      model: "gpt-4.1",
    });
    const seed = (await seeded.json()) as ChatTurnResponse;
    await waitRun(seed.runId);

    const heal = await chatTurn({
      sessionId: seed.sessionId,
      text: "heal please",
      provider: "openai",
      model: "gpt-4.1",
      origin: "self-heal",
      failure: { messageId: `assistant-${seed.runId}`, error: "mount failed" },
    });
    const body = (await heal.json()) as ChatTurnResponse;
    const run = await waitRun(body.runId);

    expect(run.origin).toBe("self-heal");
    expect(run.sessionId).toBe(seed.sessionId);
    expect(run.usage).toBeTruthy();

    const listed = await data<{
      runs: Array<{ id: string; agent?: string }>;
    }>(await manage("agents/runs", { limit: 50 }));
    expect(listed.runs.some((r) => r.id === body.runId)).toBe(true);
  });

  it("Budget exhaustion ends the heal quietly", async () => {
    // Seed with a normal completion, then heal under a zero tool-call budget.
    // (@utdk/agent's maxTurns ignores 0 — use maxToolCalls: 0 + a tool_calls
    // response so the runner hits the limit stop reason before a fix.)
    scriptLlm([
      { content: "seed-assistant" },
      {
        content: null,
        tool_calls: [
          {
            id: "call-1",
            type: "function",
            function: {
              name: "call_tool",
              arguments: JSON.stringify({
                namespace: "fs",
                operation: "read",
                args: { path: "w.tsx" },
              }),
            },
          },
        ],
      },
    ]);

    const seeded = await chatTurn({
      text: "seed",
      provider: "openai",
      model: "gpt-4.1",
    });
    const seed = (await seeded.json()) as ChatTurnResponse;
    await waitRun(seed.runId);

    const savedToolCalls = SELF_HEAL_LIMITS.maxToolCalls;
    SELF_HEAL_LIMITS.maxToolCalls = 0;
    try {
      const heal = await chatTurn({
        sessionId: seed.sessionId,
        text: "heal under zero tool-call budget",
        provider: "openai",
        model: "gpt-4.1",
        origin: "self-heal",
        failure: {
          messageId: `assistant-${seed.runId}`,
          path: "w.tsx",
          error: "still broken",
        },
      });
      expect(heal.status).toBe(200);
      const body = (await heal.json()) as ChatTurnResponse;
      const run = await waitRun(body.runId);
      expect(run.origin).toBe("self-heal");
      expect(run.stopReason).toBe("max_tool_calls");
      // No automatic retry from the server — a second heal for the same
      // assistant message is refused by the per-message cap.
      const retry = await chatTurn({
        sessionId: seed.sessionId,
        text: "heal again",
        provider: "openai",
        model: "gpt-4.1",
        origin: "self-heal",
        failure: {
          messageId: `assistant-${seed.runId}`,
          path: "w.tsx",
          error: "still broken",
        },
      });
      expect(retry.status).toBe(429);
      expect(await retry.json()).toEqual(SELF_HEAL_CAP_EXCEEDED);
    } finally {
      SELF_HEAL_LIMITS.maxToolCalls = savedToolCalls;
    }
  });

  it("History never triggers a heal (client arming — route not called)", () => {
    // Arming (`userSentThisWindowRef`) is client-only; the server has no
    // "armed" concept and does not detect widget failures. This scenario is
    // the client history guard in useWidgetSelfHeal — verified there — plus
    // the invariant that an unarmed client never POSTs. Reconstructing the
    // consecutive count from an empty / history-only transcript yields 0.
    expect(consecutiveHealCount([])).toBe(0);
    expect(consecutiveHealCount([{ role: "assistant", id: "a1" }])).toBe(0);
  });

  it("Consecutive cap is enforced server-side", async () => {
    expect(MAX_WIDGET_AUTOFIXES).toBe(2);
    scriptLlm([
      { content: "seed-assistant" },
      { content: "heal-1" },
      { content: "heal-2" },
      { content: "heal-3-should-not-run" },
    ]);

    const seeded = await chatTurn({
      text: "user seed",
      provider: "openai",
      model: "gpt-4.1",
    });
    const seed = (await seeded.json()) as ChatTurnResponse;
    await waitRun(seed.runId);

    const first = await chatTurn({
      sessionId: seed.sessionId,
      text: "heal 1",
      provider: "openai",
      model: "gpt-4.1",
      origin: "self-heal",
      failure: { messageId: "asst-a", error: "e1" },
    });
    expect(first.status).toBe(200);
    await waitRun(((await first.json()) as ChatTurnResponse).runId);

    const second = await chatTurn({
      sessionId: seed.sessionId,
      text: "heal 2",
      provider: "openai",
      model: "gpt-4.1",
      origin: "self-heal",
      failure: { messageId: "asst-b", error: "e2" },
    });
    expect(second.status).toBe(200);
    await waitRun(((await second.json()) as ChatTurnResponse).runId);

    // Third heal without an intervening non-heal user message — refused
    // even though the client was bypassed.
    const third = await chatTurn({
      sessionId: seed.sessionId,
      text: "heal 3",
      provider: "openai",
      model: "gpt-4.1",
      origin: "self-heal",
      failure: { messageId: "asst-c", error: "e3" },
    });
    expect(third.status).toBe(429);
    expect(await third.json()).toEqual(SELF_HEAL_CAP_EXCEEDED);

    // Per-message cap: repeating a prior failure messageId is also refused.
    const dup = await chatTurn({
      sessionId: seed.sessionId,
      text: "heal dup",
      provider: "openai",
      model: "gpt-4.1",
      origin: "self-heal",
      failure: { messageId: "asst-a", error: "e1-again" },
    });
    expect(dup.status).toBe(429);
  });
});

describe("SELF_HEAL_LIMITS", () => {
  it("configures maxTurns, maxToolCalls, wallClockMs, and maxTokens", () => {
    expect(SELF_HEAL_LIMITS.maxTurns).toBeGreaterThan(0);
    expect(SELF_HEAL_LIMITS.maxToolCalls).toBeGreaterThan(0);
    expect(SELF_HEAL_LIMITS.wallClockMs).toBeGreaterThan(0);
    expect(SELF_HEAL_LIMITS.maxTokens).toBeGreaterThan(0);
  });
});
