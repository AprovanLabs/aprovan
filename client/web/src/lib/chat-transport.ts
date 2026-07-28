/**
 * Resilient fetch for the main chat's UI message stream.
 *
 * The gateway's /llm/:provider/chat is job-backed: it answers with UI-stream
 * bytes immediately (keepalives while the model thinks) and mirrors the
 * accumulated text into an LLM job record named by the `x-llm-job` response
 * header. This wrapper is the client half of that contract — it passes the
 * stream through untouched while watching it, and if the stream dies before
 * a `finish` frame (network drop, CloudFront cut, backgrounded tab, silent
 * stall), it polls the job to its terminal state and splices the missing
 * tail into the stream as synthesized UI frames. `useChat` never learns the
 * connection broke; it just sees the message complete.
 */

import { gatewayFetch } from "./gateway-fetch";
import { pollJobUntilTerminal } from "./llm";

/** Keepalives arrive every 15s; this much silence means the socket is dead. */
const STREAM_STALL_MS = 45_000;

type UiFrame = {
  type?: string;
  messageId?: string;
  id?: string;
  delta?: string;
};

/**
 * Drop-in replacement for the transport's `fetch`: same signature, same
 * gateway auth headers, but responses carrying an `x-llm-job` header get the
 * resumable wrapper around their body.
 */
export const resilientChatFetch: typeof fetch = async (input, init) => {
  const response = await gatewayFetch(input as RequestInfo, init);
  const jobId = response.headers.get("x-llm-job");
  if (!response.ok || !response.body || !jobId) return response;
  return new Response(resumableUiStream(response.body, jobId), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
};

function resumableUiStream(
  upstream: ReadableStream<Uint8Array>,
  jobId: string,
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  // Observed protocol state, so a resume can pick up mid-message.
  let started = false;
  let textOpen = false;
  let reasoningOpen = false;
  let finished = false; // saw `finish` or `error` — a legitimate end
  let seenText = ""; // accumulated text-delta payload (job.text mirror)
  let lineBuffer = "";

  const observeFrame = (frame: UiFrame): void => {
    switch (frame.type) {
      case "start":
        started = true;
        break;
      case "text-start":
        textOpen = true;
        break;
      case "text-delta":
        if (typeof frame.delta === "string") seenText += frame.delta;
        break;
      case "text-end":
        textOpen = false;
        break;
      case "reasoning-start":
        reasoningOpen = true;
        break;
      case "reasoning-end":
        reasoningOpen = false;
        break;
      case "finish":
      case "error":
        finished = true;
        break;
    }
  };

  const observeBytes = (bytes: Uint8Array): void => {
    lineBuffer += decoder.decode(bytes, { stream: true });
    let newline = lineBuffer.indexOf("\n");
    while (newline !== -1) {
      const line = lineBuffer.slice(0, newline).replace(/\r$/, "");
      lineBuffer = lineBuffer.slice(newline + 1);
      if (line.startsWith("data:")) {
        const data = line.slice(5).trim();
        if (data && data !== "[DONE]") {
          try {
            observeFrame(JSON.parse(data) as UiFrame);
          } catch {
            // Not a JSON frame — ignore.
          }
        }
      }
      newline = lineBuffer.indexOf("\n");
    }
  };

  let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
  let consumerCancelled = false;

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (frame: Record<string, unknown>): void =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(frame)}\n\n`));

      const finishFromJob = async (): Promise<void> => {
        if (consumerCancelled) return;
        // The stream ended without a terminal frame. The job keeps running
        // server-side; poll it out and synthesize the rest of the message.
        let full: string;
        try {
          full = await pollJobUntilTerminal(jobId, seenText);
        } catch (err) {
          emit({
            type: "error",
            errorText: err instanceof Error ? err.message : String(err),
          });
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
          return;
        }
        if (!started) {
          emit({ type: "start", messageId: jobId });
          emit({ type: "start-step" });
        }
        if (reasoningOpen) emit({ type: "reasoning-end", id: `${jobId}-reasoning` });
        const tail = full.slice(seenText.length);
        if (tail || textOpen) {
          if (!textOpen) emit({ type: "text-start", id: `${jobId}-text` });
          if (tail) emit({ type: "text-delta", id: `${jobId}-text`, delta: tail });
          emit({ type: "text-end", id: `${jobId}-text` });
        }
        emit({ type: "finish-step" });
        emit({ type: "finish" });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      };

      reader = upstream.getReader();
      let stallTimer: ReturnType<typeof setTimeout> | undefined;
      const armStall = (): void => {
        if (stallTimer) clearTimeout(stallTimer);
        stallTimer = setTimeout(() => void reader?.cancel("stall"), STREAM_STALL_MS);
      };

      try {
        armStall();
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          armStall();
          observeBytes(value);
          controller.enqueue(value);
        }
        if (stallTimer) clearTimeout(stallTimer);
        if (finished || consumerCancelled) {
          controller.close();
        } else {
          await finishFromJob();
        }
      } catch {
        if (stallTimer) clearTimeout(stallTimer);
        if (finished || consumerCancelled) {
          try {
            controller.close();
          } catch {
            /* consumer already gone */
          }
        } else {
          await finishFromJob();
        }
      }
    },
    cancel(reason) {
      consumerCancelled = true;
      return reader ? reader.cancel(reason) : upstream.cancel(reason);
    },
  });
}
