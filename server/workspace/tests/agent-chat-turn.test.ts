/**
 * POST /agents/chat-turn — session bookkeeping + run dispatch
 * (openspec iw9-d stream 5 / chat-agent-transport).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import {
  chatTurnPath,
  decodeRunEventFrame,
  runStreamPath,
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

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-agent-chat-turn-"));
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

function scriptLlm(turns: Array<{ content?: string | null }>): IsolateExecuteOptions[] {
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

beforeEach(async () => {
  expect((await saveCredential("openai", "sk-test")).status).toBeLessThan(300);
  expect((await saveCredential("anthropic", "sk-anthropic")).status).toBeLessThan(300);
});

describe("POST /agents/chat-turn", () => {
  it("dispatches a run for provider/model and renders purely from the event stream", async () => {
    const calls = scriptLlm([{ content: "hello from the run" }]);

    const res = await chatTurn({
      text: "say hi",
      provider: "openai",
      model: "gpt-4.1",
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as ChatTurnResponse;
    expect(body.runId).toMatch(/^agr-/);
    expect(body.sessionId).toMatch(/^[0-9a-f-]{8,}$/i);
    expect(body.streamUrl).toBe(runStreamPath(body.runId, 0));

    // Wait for the run to settle via agents.getRun (not agents.get).
    let status = "running";
    for (let i = 0; i < 50 && status === "running"; i += 1) {
      const run = await data<{ status: string; output?: string }>(
        await manage("agents/getRun", { id: body.runId }),
      );
      status = run.status;
      if (status !== "running") break;
      await new Promise((r) => setTimeout(r, 20));
    }
    expect(status).toBe("succeeded");

    const llmCalls = calls.filter((c) => c.operation === "createChatCompletion");
    expect(llmCalls.length).toBeGreaterThanOrEqual(1);
    expect(llmCalls[0]!.provider).toBe("openai");
    const llmArgs = llmCalls[0]!.args as { model?: string };
    expect(llmArgs.model).toBe("gpt-4.1");

    const streamRes = await createApp().request(body.streamUrl);
    expect(streamRes.status).toBe(200);
    const events = await readSseEvents(streamRes);
    expect(events.some((e) => e.type === "run_started")).toBe(true);
    const delta = events.find((e) => e.type === "assistant_delta");
    expect(delta && delta.type === "assistant_delta" ? delta.text : "").toBe(
      "hello from the run",
    );
    expect(events[events.length - 1]!.type).toBe("run_finished");
  });

  it("per-send model selection wins without recreating the session", async () => {
    const calls = scriptLlm([
      { content: "first" },
      { content: "second" },
    ]);

    const first = await chatTurn({
      text: "one",
      provider: "openai",
      model: "gpt-4.1",
    });
    expect(first.status).toBe(200);
    const a = (await first.json()) as ChatTurnResponse;

    for (let i = 0; i < 50; i += 1) {
      const run = await data<{ status: string }>(
        await manage("agents/getRun", { id: a.runId }),
      );
      if (run.status !== "running") break;
      await new Promise((r) => setTimeout(r, 20));
    }

    const second = await chatTurn({
      sessionId: a.sessionId,
      text: "two",
      provider: "openai",
      model: "gpt-4o-mini",
    });
    expect(second.status).toBe(200);
    const b = (await second.json()) as ChatTurnResponse;
    expect(b.sessionId).toBe(a.sessionId);
    expect(b.runId).not.toBe(a.runId);

    for (let i = 0; i < 50; i += 1) {
      const run = await data<{ status: string }>(
        await manage("agents/getRun", { id: b.runId }),
      );
      if (run.status !== "running") break;
      await new Promise((r) => setTimeout(r, 20));
    }

    const llmCalls = calls.filter((c) => c.operation === "createChatCompletion");
    expect(llmCalls.length).toBeGreaterThanOrEqual(2);
    expect((llmCalls[0]!.args as { model?: string }).model).toBe("gpt-4.1");
    expect((llmCalls[1]!.args as { model?: string }).model).toBe("gpt-4o-mini");
  });

  it("lazily creates a staged session with a seeded title when sessionId is absent", async () => {
    scriptLlm([{ content: "ok" }]);
    const text = "Build a kanban board for the launch";
    const res = await chatTurn({ text, provider: "openai", model: "gpt-4.1" });
    expect(res.status).toBe(200);
    const body = (await res.json()) as ChatTurnResponse;

    const got = await data<{
      session: { id: string; title: string; mode: string; status: string };
    }>(await manage("sessions/get", { id: body.sessionId }));
    expect(got.session.id).toBe(body.sessionId);
    expect(got.session.mode).toBe("staged");
    expect(got.session.status).toBe("open");
    expect(got.session.title).toBe(text.slice(0, 48));

    const messages = await data<{ messages: Array<{ role: string }> }>(
      await manage("sessions/messages", { id: body.sessionId }),
    );
    expect(messages.messages.some((m) => m.role === "user")).toBe(true);
  });

  it("returns 409 and starts no run for closed/merged sessions", async () => {
    scriptLlm([{ content: "should not run" }]);
    const created = await data<{ session: { id: string } }>(
      await manage("sessions/create", { mode: "staged", title: "done" }),
    );
    await data(await manage("sessions/close", { id: created.session.id }));

    const before = await data<{ runs: Array<{ id: string }> }>(
      await manage("agents/runs", { limit: 20 }),
    );
    const beforeIds = new Set((before.runs ?? []).map((r) => r.id));

    const res = await chatTurn({
      sessionId: created.session.id,
      text: "ping",
      provider: "openai",
      model: "gpt-4.1",
    });
    expect(res.status).toBe(409);
    const err = (await res.json()) as { error: string };
    expect(err.error).toMatch(/read-only/i);

    const after = await data<{ runs: Array<{ id: string }> }>(
      await manage("agents/runs", { limit: 20 }),
    );
    const newRuns = (after.runs ?? []).filter((r) => !beforeIds.has(r.id));
    expect(newRuns).toEqual([]);
  });

  it("wires contextFiles into the run input with the client prefix format", async () => {
    const calls = scriptLlm([{ content: "noted" }]);
    const res = await chatTurn({
      text: "review these",
      provider: "openai",
      model: "gpt-4.1",
      contextFiles: ["docs/a.md", "src/b.ts"],
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as ChatTurnResponse;
    for (let i = 0; i < 50; i += 1) {
      const run = await data<{ status: string }>(
        await manage("agents/getRun", { id: body.runId }),
      );
      if (run.status !== "running") break;
      await new Promise((r) => setTimeout(r, 20));
    }
    const llmCalls = calls.filter((c) => c.operation === "createChatCompletion");
    expect(llmCalls.length).toBeGreaterThanOrEqual(1);
    const messages = (llmCalls[0]!.args as { messages?: Array<{ role: string; content: string }> })
      .messages ?? [];
    const user = [...messages].reverse().find((m) => m.role === "user");
    expect(user?.content).toBe("Context files: docs/a.md, src/b.ts\n\nreview these");
  });
});
