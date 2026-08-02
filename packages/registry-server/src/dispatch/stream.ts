/**
 * Streaming pass-through helpers, ported from routes/tools.ts: normalize the
 * shapes provider modules hand back (fetch Response, bare ReadableStream,
 * async-iterable SDK stream) into a byte stream + headers.
 */

export const SSE_HEADERS: Record<string, string> = {
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
};

export interface StreamBody {
  stream: ReadableStream<Uint8Array>;
  headers: Record<string, string>;
}

function isAsyncIterable(value: unknown): value is AsyncIterable<unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as AsyncIterable<unknown>)[Symbol.asyncIterator] === "function"
  );
}

/**
 * Detect a streaming execution result and normalize it to a byte stream plus
 * response headers. Returns undefined for plain JSON data.
 */
export function asStreamBody(data: unknown): StreamBody | undefined {
  if (data instanceof Response) {
    if (!data.body) return undefined;
    return {
      stream: data.body,
      headers: {
        ...SSE_HEADERS,
        "Content-Type": data.headers.get("content-type") ?? SSE_HEADERS["Content-Type"]!,
      },
    };
  }
  if (data instanceof ReadableStream) {
    return { stream: data, headers: { ...SSE_HEADERS } };
  }
  if (isAsyncIterable(data)) {
    return { stream: sseFromAsyncIterable(data), headers: { ...SSE_HEADERS } };
  }
  return undefined;
}

/**
 * Encode an async-iterable stream as SSE. String/byte chunks pass through
 * untouched (assumed pre-encoded); object chunks become `data: <json>`
 * events, terminated by `data: [DONE]`.
 */
export function sseFromAsyncIterable(
  iterable: AsyncIterable<unknown>,
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const iterator = iterable[Symbol.asyncIterator]();
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
        return;
      }
      if (value instanceof Uint8Array) {
        controller.enqueue(value);
      } else if (typeof value === "string") {
        controller.enqueue(encoder.encode(value));
      } else {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(value)}\n\n`));
      }
    },
    async cancel(reason) {
      await iterator.return?.(reason);
    },
  });
}
