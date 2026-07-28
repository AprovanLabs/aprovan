/**
 * Stream-reader edge cases for `readChatCompletionStream`. sse.ts is
 * dependency-free by design so these run against nothing but the Streams
 * API — no gateway, no mocked fetch.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { readChatCompletionStream, StreamStallError } from "./sse";

/** Build a ReadableStream that emits each string as its own chunk, with a
 *  delay between chunks so idle-timeout tests can race against them. */
function streamFromChunks(chunks: string[], delayMs = 0): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let i = 0;
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (i >= chunks.length) {
        controller.close();
        return;
      }
      if (delayMs > 0) await new Promise((resolve) => setTimeout(resolve, delayMs));
      controller.enqueue(encoder.encode(chunks[i]));
      i++;
    },
  });
}

/** A stream that emits one chunk, then never resolves again (no close, no
 *  further data) — the "CloudFront dropped the connection" case. */
function stalledStream(firstChunk: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let sent = false;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (!sent) {
        sent = true;
        controller.enqueue(encoder.encode(firstChunk));
      }
      // Never enqueue again and never close — pull() just never gets called
      // again because nothing resolves it; simulate by returning a promise
      // that never settles.
      return new Promise(() => {});
    },
  });
}

function sse(dataObj: unknown): string {
  return `data: ${JSON.stringify(dataObj)}\n\n`;
}

describe("readChatCompletionStream", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("folds delta chunks terminated by [DONE]", async () => {
    const stream = streamFromChunks([
      sse({ choices: [{ delta: { content: "Hel" } }] }),
      sse({ choices: [{ delta: { content: "lo" } }] }),
      "data: [DONE]\n\n",
    ]);
    const deltas: string[] = [];
    const full = await readChatCompletionStream(stream, (d) => deltas.push(d));
    expect(full).toBe("Hello");
    expect(deltas).toEqual(["Hel", "lo"]);
  });

  it("handles a separator split across two network chunks", async () => {
    // The `\n\n` between events is split: first chunk ends with a single
    // `\n`, second chunk starts with the other `\n`. A buffer that only
    // looked at one chunk at a time would never find the separator.
    const whole = sse({ choices: [{ delta: { content: "Hi" } }] }) + "data: [DONE]\n\n";
    const splitAt = whole.indexOf("\n\n") + 1; // split inside the blank-line separator
    const stream = streamFromChunks([whole.slice(0, splitAt), whole.slice(splitAt)]);
    const full = await readChatCompletionStream(stream);
    expect(full).toBe("Hi");
  });

  it("handles a JSON payload split mid-object across chunks", async () => {
    const event = sse({ choices: [{ delta: { content: "abc" } }] });
    const mid = 10;
    const stream = streamFromChunks([event.slice(0, mid), event.slice(mid), "data: [DONE]\n\n"]);
    const full = await readChatCompletionStream(stream);
    expect(full).toBe("abc");
  });

  it("falls back to the final buffered event when the stream closes without a trailing blank line", async () => {
    // No [DONE], no trailing \n\n — just a close after the last event.
    const stream = streamFromChunks([sse({ choices: [{ delta: { content: "tail" } }] }).trimEnd()]);
    const full = await readChatCompletionStream(stream);
    expect(full).toBe("tail");
  });

  it("ignores keepalive / non-JSON frames", async () => {
    const stream = streamFromChunks([
      ": keepalive\n\n",
      sse({ choices: [{ delta: { content: "ok" } }] }),
      "data: [DONE]\n\n",
    ]);
    const full = await readChatCompletionStream(stream);
    expect(full).toBe("ok");
  });

  it("reads a `message` shape (non-streaming compat replay) same as `delta`", async () => {
    const stream = streamFromChunks([
      sse({ choices: [{ message: { content: "compat" } }] }),
      "data: [DONE]\n\n",
    ]);
    const full = await readChatCompletionStream(stream);
    expect(full).toBe("compat");
  });

  it("rejects (does not hang) on a mid-stream error event", async () => {
    const stream = streamFromChunks([
      sse({ choices: [{ delta: { content: "partial" } }] }),
      sse({ error: { message: "upstream exploded" } }),
    ]);
    await expect(readChatCompletionStream(stream)).rejects.toThrow("upstream exploded");
  });

  it("rejects on a string-shaped error event", async () => {
    const stream = streamFromChunks([sse({ error: "boom" })]);
    await expect(readChatCompletionStream(stream)).rejects.toThrow("boom");
  });

  it("settles with a StreamStallError instead of hanging forever when the connection stalls", async () => {
    vi.useFakeTimers();
    const stream = stalledStream(sse({ choices: [{ delta: { content: "first" } }] }));
    const promise = readChatCompletionStream(stream, undefined, { idleTimeoutMs: 1000 });
    // Nothing should settle before the idle window elapses.
    let settled = false;
    promise.then(
      () => (settled = true),
      () => (settled = true),
    );
    await vi.advanceTimersByTimeAsync(500);
    expect(settled).toBe(false);

    await vi.advanceTimersByTimeAsync(600);
    await expect(promise).rejects.toBeInstanceOf(StreamStallError);
  });

  it("resets the idle timer on every chunk, so a slow-but-alive stream is not penalized", async () => {
    vi.useFakeTimers();
    // Three chunks, 700ms apart, with an 1000ms idle timeout — each chunk
    // arrives before the timeout would fire, so the whole thing succeeds.
    const stream = streamFromChunks(
      [
        sse({ choices: [{ delta: { content: "a" } }] }),
        sse({ choices: [{ delta: { content: "b" } }] }),
        "data: [DONE]\n\n",
      ],
      700,
    );
    const promise = readChatCompletionStream(stream, undefined, { idleTimeoutMs: 1000 });
    await vi.advanceTimersByTimeAsync(700 * 3 + 50);
    await expect(promise).resolves.toBe("ab");
  });
});
