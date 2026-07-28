/**
 * `runChatCompletionJob`'s resume-to-poll fallback.
 *
 * Widget edits are 1-2 minute completions; mobile browsers kill the fetch on
 * screen-lock or backgrounding well before that. These tests exercise the
 * client side of the fix: when the streaming leg drops mid-completion, the
 * call must not fail outright — it should fall back to polling
 * `GET /llm/jobs/:id` and resolve with the eventual result (or the eventual
 * failure), using only the text the job accrues, never re-fetching the
 * stream itself.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { gatewayFetch } from "./gateway-fetch";
import { runChatCompletionJob } from "./llm";

vi.mock("./gateway-fetch", () => ({ gatewayFetch: vi.fn() }));

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

/** Delivers `events` then hangs forever — simulates a dropped connection
 *  (mobile tab backgrounded / screen locked) after those events landed. */
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

function jobResponse(job: Record<string, unknown>): Response {
  return new Response(JSON.stringify(job), { status: 200, headers: { "content-type": "application/json" } });
}

describe("runChatCompletionJob", () => {
  it("resolves from the stream alone when nothing drops", async () => {
    mockFetch.mockResolvedValueOnce(
      streamResponse(
        sseBody([
          sse({ jobId: "job-clean" }),
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
    expect(mockFetch).toHaveBeenCalledTimes(1); // never touched /llm/jobs/:id
  });

  it("falls back to polling when the stream stalls, resuming from the job's accumulated text", async () => {
    vi.useFakeTimers();
    mockFetch
      .mockResolvedValueOnce(
        streamResponse(
          stalledSseBody([{ jobId: "job-2" }, { choices: [{ delta: { content: "Once " } }] }]),
        ),
      )
      .mockResolvedValueOnce(
        jobResponse({
          id: "job-2",
          status: "running",
          provider: "openai",
          text: "Once upon ",
          createdAt: "t0",
          updatedAt: "t1",
        }),
      )
      .mockResolvedValueOnce(
        jobResponse({
          id: "job-2",
          status: "succeeded",
          provider: "openai",
          text: "Once upon a time",
          createdAt: "t0",
          updatedAt: "t2",
        }),
      );

    const deltas: string[] = [];
    const promise = runChatCompletionJob(
      "openai",
      { messages: [] },
      (d) => deltas.push(d),
      { idleTimeoutMs: 50 },
    );

    await vi.advanceTimersByTimeAsync(60); // idle timeout trips -> falls back to polling
    await vi.advanceTimersByTimeAsync(3_000); // first poll (still running)
    await vi.advanceTimersByTimeAsync(3_000); // second poll (terminal)

    await expect(promise).resolves.toBe("Once upon a time");
    // Deltas from the stream, then only the *growth* the job reports —
    // never a re-send of text already seen.
    expect(deltas).toEqual(["Once ", "upon ", "a time"]);
    expect(mockFetch).toHaveBeenCalledTimes(3);
    expect(String(mockFetch.mock.calls[1]?.[0])).toContain("/llm/jobs/job-2");
    expect(String(mockFetch.mock.calls[2]?.[0])).toContain("/llm/jobs/job-2");
  });

  it("rejects with the job's own error once polling reaches a failed terminal state", async () => {
    vi.useFakeTimers();
    mockFetch
      .mockResolvedValueOnce(streamResponse(stalledSseBody([{ jobId: "job-3" }])))
      .mockResolvedValueOnce(
        jobResponse({
          id: "job-3",
          status: "failed",
          provider: "openai",
          text: "",
          error: "upstream disconnected",
          createdAt: "t0",
          updatedAt: "t1",
        }),
      );

    const promise = runChatCompletionJob("openai", { messages: [] }, undefined, { idleTimeoutMs: 50 });
    // Attach the rejection assertion before advancing fake time, so the
    // rejection (which fires mid-advance) never has a tick without a handler.
    const assertion = expect(promise).rejects.toThrow("upstream disconnected");

    await vi.advanceTimersByTimeAsync(60);
    await vi.advanceTimersByTimeAsync(3_000);

    await assertion;
  });

  it("does not fall back to polling when no jobId was ever issued (fails outright)", async () => {
    mockFetch.mockRejectedValueOnce(new Error("network down"));

    await expect(runChatCompletionJob("openai", { messages: [] })).rejects.toThrow("network down");
    expect(mockFetch).toHaveBeenCalledTimes(1); // no poll attempts — nothing to resume
  });
});
