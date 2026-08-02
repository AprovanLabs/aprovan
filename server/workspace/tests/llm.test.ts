import { afterEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import {
  resetExecutor,
  setExecutor,
  type IsolateExecuteOptions,
  type IsolateResult,
} from "../src/isolate.js";
import { toOpenAiMessages } from "../src/llm.js";

afterEach(() => {
  resetExecutor();
});

function stubExecutor(
  execute: (options: IsolateExecuteOptions) => Promise<IsolateResult>,
): IsolateExecuteOptions[] {
  const calls: IsolateExecuteOptions[] = [];
  setExecutor({
    execute(options) {
      calls.push(options);
      return execute(options);
    },
  });
  return calls;
}

function sseStream(events: string[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const event of events) {
        controller.enqueue(encoder.encode(`data: ${event}\n\n`));
      }
      controller.close();
    },
  });
}

/**
 * Drain a streaming response body via its reader. `response.text()` on a
 * pull-driven stream deadlocks under vitest's fetch internals; real SSE
 * consumers (AI SDK, the node server adapter) read incrementally like this.
 */
async function readAll(response: Response): Promise<string> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let text = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) return text;
    text += decoder.decode(value, { stream: true });
  }
}

function chat(provider: string, body: Record<string, unknown>): Promise<Response> {
  return createApp().request(`/llm/${provider}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      credential: { type: "bearer_token", token: "test-token" },
      ...body,
    }),
  });
}

const uiMessages = [
  { id: "1", role: "user", parts: [{ type: "text", text: "hello" }] },
];

describe("llm chat providers", () => {
  it("lists every chat provider with a connected flag", async () => {
    const response = await createApp().request("/llm/providers");
    expect(response.status).toBe(200);
    const { providers } = (await response.json()) as {
      providers: Array<{ id: string; connected: boolean; defaultModel: string }>;
    };
    const ids = providers.map((provider) => provider.id);
    expect(ids).toContain("openai");
    expect(ids).toContain("anthropic");
    expect(ids).toContain("synthetic.new");
  });

  it("rejects unknown providers", async () => {
    const response = await chat("nonsense", { messages: uiMessages });
    expect(response.status).toBe(404);
  });

  it("aliases chat providers onto the openai module with a baseUrl override", async () => {
    const calls = stubExecutor(async () => ({
      success: true,
      data: sseStream(['{"choices":[{"delta":{"content":"hi"}}]}', "[DONE]"]),
      durationMs: 1,
    }));

    const response = await chat("synthetic.new", { messages: uiMessages });
    expect(response.status).toBe(200);

    expect(calls[0]?.provider).toBe("openai");
    expect(calls[0]?.operation).toBe("createChatCompletion");
    expect(calls[0]?.baseUrl).toContain("api.synthetic.new");
    expect(calls[0]?.args["model"]).toBe("hf:zai-org/GLM-5.2");
    expect(calls[0]?.args["stream"]).toBe(true);
    expect(calls[0]?.args["messages"]).toEqual([{ role: "user", content: "hello" }]);
  });

  it("adapts OpenAI SSE to the AI SDK UI message stream protocol", async () => {
    stubExecutor(async () => ({
      success: true,
      data: sseStream([
        '{"choices":[{"delta":{"reasoning_content":"thinking"}}]}',
        '{"choices":[{"delta":{"content":"hel"}}]}',
        '{"choices":[{"delta":{"content":"lo"}}]}',
        "[DONE]",
      ]),
      durationMs: 1,
    }));

    const response = await chat("openai", { messages: uiMessages, model: "gpt-x" });
    expect(response.status).toBe(200);
    expect(response.headers.get("x-vercel-ai-ui-message-stream")).toBe("v1");

    const text = await readAll(response);
    expect(text).toContain('"type":"start"');
    expect(text).toContain('"type":"reasoning-delta"');
    expect(text).toContain('"delta":"thinking"');
    expect(text).toContain('"type":"text-delta"');
    expect(text).toContain('"delta":"hel"');
    expect(text).toContain('"type":"finish"');
    expect(text.trimEnd().endsWith("data: [DONE]")).toBe(true);
  });

  it("wraps non-streaming completions as a single-shot UI message stream", async () => {
    stubExecutor(async () => ({
      success: true,
      data: { choices: [{ message: { content: "plain result" } }] },
      durationMs: 1,
    }));

    const response = await chat("openai", { messages: uiMessages });
    expect(response.status).toBe(200);
    const text = await readAll(response);
    expect(text).toContain('"delta":"plain result"');
    expect(text.trimEnd().endsWith("data: [DONE]")).toBe(true);
  });

  it("streams the upstream error as an error frame when execution fails", async () => {
    // The executor runs inside the response stream (first byte goes out
    // before the provider answers — the CloudFront-timeout fix), so an
    // upstream failure surfaces as an in-stream `error` frame, not a 502.
    stubExecutor(async () => ({ success: false, error: "boom", durationMs: 1 }));
    const response = await chat("openai", { messages: uiMessages });
    expect(response.status).toBe(200);
    const text = await readAll(response);
    expect(text).toContain('"type":"error"');
    expect(text).toContain('"errorText":"boom"');
    expect(text.trimEnd().endsWith("data: [DONE]")).toBe(true);
  });

  it("exposes the backing job id and persists the text for resume", async () => {
    stubExecutor(async () => ({
      success: true,
      data: sseStream([
        '{"choices":[{"delta":{"content":"hello"}}]}',
        "[DONE]",
      ]),
      durationMs: 1,
    }));

    const response = await chat("openai", { messages: uiMessages });
    expect(response.status).toBe(200);
    const jobId = response.headers.get("x-llm-job");
    expect(jobId).toBeTruthy();
    await readAll(response);

    const job = await createApp().request(`/llm/jobs/${jobId}`);
    expect(job.status).toBe(200);
    expect(await job.json()).toMatchObject({ status: "succeeded", text: "hello" });
  });
});

describe("toOpenAiMessages", () => {
  it("flattens UI message parts and drops non-text parts", () => {
    expect(
      toOpenAiMessages([
        { role: "user", parts: [{ type: "text", text: "a" }, { type: "file" }, { type: "text", text: "b" }] },
        { role: "assistant", content: "done" },
        { role: "tool", content: "ignored" },
      ]),
    ).toEqual([
      { role: "user", content: "ab" },
      { role: "assistant", content: "done" },
    ]);
  });
});
