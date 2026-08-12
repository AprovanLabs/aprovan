/**
 * Post-migration coverage for completion helpers after llm-jobs was removed
 * from the widget-edit / leftover completion path (IW-9 D stream 9).
 *
 * `runChatCompletionJob` is now a thin alias of `streamChatCompletion`
 * (tools-proxy stream). It must not open `/llm/.../completions` or poll
 * `/llm/jobs/:id`.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { gatewayFetch } from "./gateway-fetch";
import { runChatCompletionJob, streamChatCompletion } from "./llm";

vi.mock("./gateway-fetch", () => ({ gatewayFetch: vi.fn() }));
vi.mock("./gateway", () => ({
  GATEWAY_BASE: "http://gateway.test",
  getGatewayBase: () => "http://gateway.test",
}));

const mockFetch = vi.mocked(gatewayFetch);

afterEach(() => {
  mockFetch.mockReset();
  vi.useRealTimers();
});

function sse(dataObj: unknown): string {
  return `data: ${JSON.stringify(dataObj)}\n\n`;
}

/** A clean SSE body: every event delivered immediately, then closed. */
function sseBody(chunks: string[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });
}

/** Delivers `events` then hangs forever — simulates a dropped connection. */
function stalledSseBody(events: unknown[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let i = 0;
  return new ReadableStream({
    pull(controller) {
      if (i < events.length) {
        controller.enqueue(encoder.encode(sse(events[i])));
        i++;
        return;
      }
      return new Promise(() => {}); // never resolves — stalled connection
    },
  });
}

function streamResponse(body: ReadableStream<Uint8Array>): Response {
  return new Response(body, { status: 200, headers: { "content-type": "text/event-stream" } });
}

describe("streamChatCompletion / runChatCompletionJob (post llm-jobs)", () => {
  it("resolves from the tools-proxy stream alone", async () => {
    mockFetch.mockResolvedValueOnce(
      streamResponse(
        sseBody([
          sse({ choices: [{ delta: { content: "Hel" } }] }),
          sse({ choices: [{ delta: { content: "lo" } }] }),
          "data: [DONE]\n\n",
        ]),
      ),
    );

    const deltas: string[] = [];
    const text = await runChatCompletionJob("openai", { messages: [] }, (d) => deltas.push(d));

    expect(text).toBe("Hello");
    expect(deltas).toEqual(["Hel", "lo"]);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(String(mockFetch.mock.calls[0]?.[0])).toContain(
      "/tools/openai/createChatCompletion",
    );
    expect(String(mockFetch.mock.calls[0]?.[0])).not.toContain("/llm/");
  });

  it("forwards onReasoning deltas without including them in the result", async () => {
    mockFetch.mockResolvedValueOnce(
      streamResponse(
        sseBody([
          sse({ choices: [{ delta: { reasoning_content: "plan…" } }] }),
          sse({ choices: [{ delta: { content: "done" } }] }),
          "data: [DONE]\n\n",
        ]),
      ),
    );

    const reasoning: string[] = [];
    const text = await streamChatCompletion(
      "openai",
      { messages: [] },
      undefined,
      { onReasoning: (d) => reasoning.push(d) },
    );

    expect(text).toBe("done");
    expect(reasoning).toEqual(["plan…"]);
  });

  it("rejects on mid-stream stall instead of polling /llm/jobs/:id", async () => {
    vi.useFakeTimers();
    mockFetch.mockResolvedValueOnce(
      streamResponse(stalledSseBody([{ choices: [{ delta: { content: "Once " } }] }])),
    );

    const promise = runChatCompletionJob("openai", { messages: [] }, undefined, {
      idleTimeoutMs: 50,
    });
    const assertion = expect(promise).rejects.toThrow(/stalled/i);

    await vi.advanceTimersByTimeAsync(60);
    await assertion;
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(String(mockFetch.mock.calls[0]?.[0])).not.toContain("/llm/jobs/");
  });

  it("does not fall back to job polling when the connect request fails", async () => {
    mockFetch.mockRejectedValueOnce(new Error("network down"));

    await expect(runChatCompletionJob("openai", { messages: [] })).rejects.toThrow("network down");
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
