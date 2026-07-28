/**
 * Server-sent-event reader for OpenAI-compatible chat completion streams.
 *
 * Kept free of app imports so it can be exercised on its own: the tricky part
 * is that network chunks split anywhere — mid-event, mid-JSON, between the
 * two newlines of a separator — so events are only parsed once a blank line
 * has actually arrived.
 */

// No bytes arrive within this window: treat the connection as stalled rather
// than let `await reader.read()` hang forever. CloudFront (or a Lambda that
// crashed mid-stream) can drop a connection without ever closing it or
// emitting a final `[DONE]` event — with no timeout anywhere in this path,
// that left the edit panel's spinner running indefinitely with no way for
// the user to tell a genuine hang from a slow-but-working request. The timer
// resets on every chunk, so a slow-but-alive stream is never penalized.
const DEFAULT_IDLE_TIMEOUT_MS = 45_000;

export class StreamStallError extends Error {
  constructor(ms: number) {
    super(`Stream stalled — no data received for ${Math.round(ms / 1000)}s`);
    this.name = "StreamStallError";
  }
}

/** Race one `reader.read()` against the idle timeout, always clearing the timer. */
function readWithIdleTimeout(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  ms: number,
): Promise<ReadableStreamReadResult<Uint8Array>> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new StreamStallError(ms)), ms);
    reader.read().then(
      (result) => {
        clearTimeout(timer);
        resolve(result);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

interface ChatCompletionChunk {
  choices?: Array<{
    delta?: { content?: string; reasoning_content?: string; reasoning?: string };
    message?: { content?: string };
  }>;
  error?: { message?: string } | string;
  /** Job-backed completions (`/llm/:provider/completions`) lead with this. */
  jobId?: string;
}

/** Fold one SSE event into text. Returns `null` for the `[DONE]` terminator. */
function readEvent(
  event: string,
  onJobId?: (id: string) => void,
  onReasoning?: (delta: string) => void,
): string | null {
  // An event may carry several `data:` lines; SSE concatenates them.
  const data = event
    .split("\n")
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trim())
    .join("");
  if (!data) return "";
  if (data === "[DONE]") return null;

  let chunk: ChatCompletionChunk;
  try {
    chunk = JSON.parse(data) as ChatCompletionChunk;
  } catch {
    // Keepalive or non-JSON frame — nothing to fold in.
    return "";
  }
  if (chunk.error) {
    const message =
      typeof chunk.error === "string" ? chunk.error : chunk.error.message;
    throw new Error(message ?? "Chat completion failed mid-stream");
  }
  if (typeof chunk.jobId === "string" && chunk.jobId) {
    onJobId?.(chunk.jobId);
    return "";
  }
  const choice = chunk.choices?.[0];
  const reasoning = choice?.delta?.reasoning_content ?? choice?.delta?.reasoning;
  if (typeof reasoning === "string" && reasoning.length > 0) onReasoning?.(reasoning);
  // Streaming sends `delta`; a compat server replaying a single completion
  // as one event sends `message`.
  return choice?.delta?.content ?? choice?.message?.content ?? "";
}

/**
 * Consume an SSE body, returning the full assistant text. `onDelta` is called
 * with each new fragment plus the text accumulated so far.
 */
export async function readChatCompletionStream(
  body: ReadableStream<Uint8Array>,
  onDelta?: (delta: string, full: string) => void,
  options: {
    idleTimeoutMs?: number;
    onJobId?: (id: string) => void;
    /** Reasoning-model thinking deltas (never part of the returned text). */
    onReasoning?: (delta: string) => void;
  } = {},
): Promise<string> {
  const idleTimeoutMs = options.idleTimeoutMs ?? DEFAULT_IDLE_TIMEOUT_MS;
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let full = "";
  let finished = false;

  try {
    while (!finished) {
      const result = await readWithIdleTimeout(reader, idleTimeoutMs);
      if (result.value) buffer += decoder.decode(result.value, { stream: true });

      // Events are separated by a blank line; the trailing partial stays in
      // the buffer until its separator arrives.
      let separator = buffer.indexOf("\n\n");
      while (separator !== -1) {
        const delta = readEvent(buffer.slice(0, separator), options.onJobId, options.onReasoning);
        buffer = buffer.slice(separator + 2);
        if (delta === null) {
          finished = true;
          break;
        }
        if (delta) {
          full += delta;
          onDelta?.(delta, full);
        }
        separator = buffer.indexOf("\n\n");
      }

      if (result.done) {
        // A final event with no trailing blank line still counts.
        if (!finished && buffer.trim()) {
          const delta = readEvent(buffer, options.onJobId, options.onReasoning);
          if (delta) {
            full += delta;
            onDelta?.(delta, full);
          }
        }
        finished = true;
      }
    }
  } finally {
    await reader.cancel().catch(() => {});
  }

  return full;
}
