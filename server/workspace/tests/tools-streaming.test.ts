import { afterEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import {
  resetExecutor,
  setExecutor,
  type IsolateExecuteOptions,
  type IsolateResult,
} from "../src/isolate.js";

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

function toolCall(body: Record<string, unknown>): Promise<Response> {
  return createApp().request("/tools/openai/chat.completions.create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      credential: { type: "bearer_token", token: "test-token" },
      ...body,
    }),
  });
}

describe("tool call streaming pass-through", () => {
  it("re-encodes async-iterable results as SSE and forwards stream:true", async () => {
    const calls = stubExecutor(async () => {
      async function* chunks() {
        yield { choices: [{ delta: { content: "hel" } }] };
        yield { choices: [{ delta: { content: "lo" } }] };
      }
      return { success: true, data: chunks(), durationMs: 1 };
    });

    const response = await toolCall({ args: { model: "gpt-4o-mini" }, stream: true });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/event-stream");
    expect(calls[0]?.args["stream"]).toBe(true);

    const text = await response.text();
    expect(text).toContain('data: {"choices":[{"delta":{"content":"hel"}}]}');
    expect(text).toContain('data: {"choices":[{"delta":{"content":"lo"}}]}');
    expect(text.trimEnd().endsWith("data: [DONE]")).toBe(true);
  });

  it("passes a ReadableStream result through unchanged", async () => {
    const encoder = new TextEncoder();
    stubExecutor(async () => ({
      success: true,
      data: new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(encoder.encode("data: raw-sse\n\n"));
          controller.close();
        },
      }),
      durationMs: 1,
    }));

    const response = await toolCall({ args: {}, stream: true });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/event-stream");
    expect(await response.text()).toBe("data: raw-sse\n\n");
  });

  it("preserves the upstream content type for Response results", async () => {
    stubExecutor(async () => ({
      success: true,
      data: new Response("data: upstream\n\n", {
        headers: { "Content-Type": "text/event-stream" },
      }),
      durationMs: 1,
    }));

    const response = await toolCall({ args: {}, stream: true });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/event-stream");
    expect(await response.text()).toBe("data: upstream\n\n");
  });

  it("keeps the buffered JSON envelope for plain results", async () => {
    const calls = stubExecutor(async () => ({
      success: true,
      data: { id: "chatcmpl-1" },
      durationMs: 1,
    }));

    const response = await toolCall({ args: { model: "gpt-4o-mini" } });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(calls[0]?.args["stream"]).toBeUndefined();
    expect(await response.json()).toMatchObject({ data: { id: "chatcmpl-1" } });
  });
});
