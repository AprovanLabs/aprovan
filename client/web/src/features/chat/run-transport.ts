/**
 * AI SDK ChatTransport over the server-owned run protocol (IW-9 D stream 6).
 *
 * Posts `POST /agents/chat-turn`, attaches to `GET /agents/runs/:id/stream`,
 * and translates `RunEvent`s into `UIMessageChunk`s. This is the only file
 * that speaks both vocabularies (D2). Legacy `chat-transport.ts` stays the
 * default until stream 8 flips {@link USE_RUN_TRANSPORT}.
 */
import { useMemo, useRef, type MutableRefObject } from "react";
import type { ChatTransport, UIMessage, UIMessageChunk } from "ai";
import {
  chatTurnPath,
  chatTurnResponseSchema,
  decodeRunEventFrame,
  runStreamPath,
  type ChatTurnRequest,
  type ChatTurnResponse,
  type RunEvent,
} from "@aprovan/agent-protocol";
import { GATEWAY_BASE } from "@/lib/gateway";
import { gatewayFetch } from "@/lib/gateway-fetch";

/**
 * Dev-only toggle. Default off so production keeps the legacy transport.
 * Set `VITE_USE_RUN_TRANSPORT=1` (or flip this constant) to exercise the
 * run protocol. Stream 8 flips the default and deletes the toggle.
 */
export const USE_RUN_TRANSPORT =
  (typeof import.meta !== "undefined" &&
    // Vite injects string env vars; treat any truthy "1"/"true" as on.
    ["1", "true"].includes(
      String(
        (import.meta as ImportMeta & { env?: Record<string, string> }).env?.[
          "VITE_USE_RUN_TRANSPORT"
        ] ?? "",
      ).toLowerCase(),
    )) ||
  false;

/** Stable text-part id for one assistant message stream. */
const TEXT_PART_ID = "text-0";

export type RunEventMappingState = {
  textOpen: boolean;
  /** toolCallId → tool display name (namespace.operation) */
  tools: Map<string, string>;
  started: boolean;
  finished: boolean;
};

export function createRunEventMappingState(): RunEventMappingState {
  return {
    textOpen: false,
    tools: new Map(),
    started: false,
    finished: false,
  };
}

function toolName(namespace: string, operation: string): string {
  return `${namespace}.${operation}`;
}

function closeTextIfOpen(state: RunEventMappingState): UIMessageChunk[] {
  if (!state.textOpen) return [];
  state.textOpen = false;
  return [{ type: "text-end", id: TEXT_PART_ID }];
}

/**
 * Map one recognized `RunEvent` into zero or more AI SDK `UIMessageChunk`s.
 * Unknown / unhandled event types return `[]` (never throw).
 */
export function mapRunEventToChunks(
  event: RunEvent,
  state: RunEventMappingState,
  options: { messageId?: string } = {},
): UIMessageChunk[] {
  if (state.finished) return [];

  const out: UIMessageChunk[] = [];

  if (!state.started && event.type !== "error") {
    state.started = true;
    out.push({
      type: "start",
      ...(options.messageId ? { messageId: options.messageId } : {}),
    });
  }

  switch (event.type) {
    case "run_started":
    case "turn_started":
    case "turn_finished":
    case "pending_action":
      // Lifecycle / reserved — no UI parts. turn_finished closes open text
      // so a later turn's deltas start a fresh text part.
      if (event.type === "turn_finished") {
        out.push(...closeTextIfOpen(state));
      }
      return out;

    case "assistant_delta": {
      if (!state.textOpen) {
        state.textOpen = true;
        out.push({ type: "text-start", id: TEXT_PART_ID });
      }
      out.push({ type: "text-delta", id: TEXT_PART_ID, delta: event.text });
      return out;
    }

    case "tool_call_started": {
      out.push(...closeTextIfOpen(state));
      const name = toolName(event.namespace, event.operation);
      state.tools.set(event.callId, name);
      // providerExecuted: tools run on the server; don't invoke client onToolCall.
      // dynamic: MessageParts renders `dynamic-tool` with toolName.
      out.push({
        type: "tool-input-start",
        toolCallId: event.callId,
        toolName: name,
        dynamic: true,
        providerExecuted: true,
      });
      out.push({
        type: "tool-input-available",
        toolCallId: event.callId,
        toolName: name,
        input: event.args,
        dynamic: true,
        providerExecuted: true,
      });
      return out;
    }

    case "tool_call_finished": {
      const name = state.tools.get(event.callId) ?? "tool";
      if (event.ok) {
        let output: unknown = event.resultPreview ?? "";
        if (typeof event.resultPreview === "string") {
          try {
            output = JSON.parse(event.resultPreview) as unknown;
          } catch {
            output = event.resultPreview;
          }
        }
        out.push({
          type: "tool-output-available",
          toolCallId: event.callId,
          output,
          dynamic: true,
          providerExecuted: true,
        });
      } else {
        out.push({
          type: "tool-output-error",
          toolCallId: event.callId,
          errorText: event.error ?? "Tool call failed",
          dynamic: true,
          providerExecuted: true,
        });
      }
      // Ensure the tool name stayed registered for mid-replay partials.
      if (!state.tools.has(event.callId)) state.tools.set(event.callId, name);
      return out;
    }

    case "run_finished": {
      out.push(...closeTextIfOpen(state));
      state.finished = true;
      out.push({
        type: "finish",
        finishReason: event.status === "failed" ? "error" : "stop",
      });
      return out;
    }

    case "error": {
      out.push(...closeTextIfOpen(state));
      state.finished = true;
      out.push({ type: "error", errorText: event.message });
      out.push({ type: "finish", finishReason: "error" });
      return out;
    }

    default:
      return out;
  }
}

/** Pull plain text from the latest user UIMessage (AI SDK parts shape). */
export function textFromMessages(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg?.role !== "user") continue;
    const chunks: string[] = [];
    for (const part of msg.parts ?? []) {
      if (part.type === "text" && typeof part.text === "string") {
        chunks.push(part.text);
      }
    }
    if (chunks.length > 0) return chunks.join("");
  }
  return "";
}

export type ChatTurnFetch = typeof gatewayFetch;

/** POST `/agents/chat-turn` and return the validated response. Exported for stream 7. */
export async function postChatTurn(
  request: ChatTurnRequest,
  options: {
    fetch?: ChatTurnFetch;
    abortSignal?: AbortSignal;
    headers?: HeadersInit;
  } = {},
): Promise<ChatTurnResponse> {
  const fetchImpl = options.fetch ?? gatewayFetch;
  const res = await fetchImpl(`${GATEWAY_BASE}${chatTurnPath()}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...Object.fromEntries(new Headers(options.headers).entries()),
    },
    body: JSON.stringify(request),
    signal: options.abortSignal,
  });
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = (await res.json()) as { error?: string };
      if (body.error) detail = body.error;
    } catch {
      // keep statusText
    }
    throw new Error(`chat-turn failed (${res.status}): ${detail}`);
  }
  const json: unknown = await res.json();
  return chatTurnResponseSchema.parse(json);
}

/**
 * Open the run SSE stream at `from`, decode frames, skip unrecognized
 * events, and yield mapped UI chunks. On a dropped connection before a
 * terminal event, reattach with `from = lastConsumedSeq + 1`.
 */
export function createRunUIMessageStream(args: {
  runId: string;
  from?: number;
  messageId?: string;
  fetch?: ChatTurnFetch;
  abortSignal?: AbortSignal;
  headers?: HeadersInit;
  /** Test seam: replace the network stream opener. */
  openStream?: (from: number) => Promise<ReadableStream<Uint8Array>>;
}): ReadableStream<UIMessageChunk> {
  const fetchImpl = args.fetch ?? gatewayFetch;
  const state = createRunEventMappingState();
  let lastConsumedSeq = (args.from ?? 0) - 1;
  let from = args.from ?? 0;

  const openStream =
    args.openStream ??
    (async (nextFrom: number) => {
      const url = `${GATEWAY_BASE}${runStreamPath(args.runId, nextFrom)}`;
      const res = await fetchImpl(url, {
        method: "GET",
        headers: args.headers,
        signal: args.abortSignal,
      });
      if (!res.ok || !res.body) {
        throw new Error(
          `run stream failed (${res.status}): ${res.statusText || "no body"}`,
        );
      }
      return res.body;
    });

  return new ReadableStream<UIMessageChunk>({
    async start(controller) {
      const decoder = new TextDecoder();
      let consecutiveOpenFailures = 0;
      let emptyReconnects = 0;
      try {
        while (!state.finished) {
          if (args.abortSignal?.aborted) {
            controller.enqueue({ type: "abort" });
            controller.close();
            return;
          }

          let body: ReadableStream<Uint8Array>;
          try {
            body = await openStream(from);
            consecutiveOpenFailures = 0;
          } catch (err) {
            consecutiveOpenFailures += 1;
            // First open (or repeated open failures) — surface the error.
            if (lastConsumedSeq < 0 || consecutiveOpenFailures > 3) {
              throw err;
            }
            from = lastConsumedSeq + 1;
            continue;
          }

          const reader = body.getReader();
          let buffer = "";
          let connectionDropped = false;
          const seqAtOpen = lastConsumedSeq;

          try {
            while (!state.finished) {
              const { done, value } = await reader.read();
              if (value) buffer += decoder.decode(value, { stream: true });

              let sep = buffer.indexOf("\n\n");
              while (sep !== -1) {
                const frame = buffer.slice(0, sep);
                buffer = buffer.slice(sep + 2);
                sep = buffer.indexOf("\n\n");

                // Skip SSE comments (keepalive `: …`) and empty frames.
                const dataLine = frame
                  .split("\n")
                  .find((line) => line.startsWith("data:"));
                if (!dataLine) continue;

                const event = decodeRunEventFrame(dataLine);
                // Unknown / malformed → ignore (spec: never throw).
                if (!event) continue;

                lastConsumedSeq = event.seq;
                const chunks = mapRunEventToChunks(event, state, {
                  messageId: args.messageId,
                });
                for (const chunk of chunks) controller.enqueue(chunk);
              }

              if (done) {
                connectionDropped = !state.finished;
                break;
              }
            }
          } catch (err) {
            if (args.abortSignal?.aborted) {
              controller.enqueue({ type: "abort" });
              controller.close();
              return;
            }
            // Mid-stream network error → reattach.
            connectionDropped = !state.finished;
            if (!connectionDropped) throw err;
          } finally {
            await reader.cancel().catch(() => {});
          }

          if (state.finished) {
            controller.close();
            return;
          }

          // Dropped or clean-close without terminal — reattach at next seq.
          if (connectionDropped || !state.finished) {
            if (lastConsumedSeq === seqAtOpen) {
              emptyReconnects += 1;
              if (emptyReconnects > 5) {
                throw new Error(
                  `run stream stalled: no events after seq ${lastConsumedSeq}`,
                );
              }
            } else {
              emptyReconnects = 0;
            }
            from = lastConsumedSeq + 1;
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });
}

/**
 * Start a chat turn and return the UI message stream. Shared entry point for
 * the ChatTransport and (stream 7) self-heal — heal posts with
 * `origin: "self-heal"` + `failure` through this same path.
 */
export async function startChatTurnStream(
  request: ChatTurnRequest,
  options: {
    fetch?: ChatTurnFetch;
    abortSignal?: AbortSignal;
    headers?: HeadersInit;
    openStream?: (from: number) => Promise<ReadableStream<Uint8Array>>;
  } = {},
): Promise<{ response: ChatTurnResponse; stream: ReadableStream<UIMessageChunk> }> {
  const response = await postChatTurn(request, options);
  const stream = createRunUIMessageStream({
    runId: response.runId,
    from: 0,
    messageId: `assistant-${response.runId}`,
    fetch: options.fetch,
    abortSignal: options.abortSignal,
    headers: options.headers,
    openStream: options.openStream,
  });
  return { response, stream };
}

export type RunTransportOptions = {
  /** Active chat session id, read at send time (may be undefined → server lazy-creates). */
  sessionIdRef: MutableRefObject<string | undefined>;
  chatProviderRef: MutableRefObject<string>;
  chatModelRef: MutableRefObject<string>;
  contextFilesRef: MutableRefObject<string[]>;
  /** Optional override for tests. */
  fetch?: ChatTurnFetch;
};

/** Imperative ChatTransport over the run protocol. */
export class RunTransport implements ChatTransport<UIMessage> {
  private lastRun: { runId: string; sessionId: string } | null = null;

  constructor(private readonly options: RunTransportOptions) {}

  /** Last run started by this transport — useful for reconnect / stream 7. */
  getLastRun(): { runId: string; sessionId: string } | null {
    return this.lastRun;
  }

  async sendMessages(options: {
    trigger: "submit-message" | "regenerate-message";
    chatId: string;
    messageId: string | undefined;
    messages: UIMessage[];
    abortSignal: AbortSignal | undefined;
    headers?: HeadersInit;
    body?: object;
  }): Promise<ReadableStream<UIMessageChunk>> {
    const text = textFromMessages(options.messages);
    if (!text.trim()) {
      throw new Error("RunTransport: no user text to send");
    }

    const provider = this.options.chatProviderRef.current;
    const model = this.options.chatModelRef.current;
    const contextFiles = this.options.contextFilesRef.current;
    const sessionId = this.options.sessionIdRef.current;

    const request: ChatTurnRequest = {
      text,
      origin: "user",
      ...(sessionId ? { sessionId } : {}),
      ...(provider ? { provider } : {}),
      ...(model ? { model } : {}),
      ...(contextFiles.length > 0 ? { contextFiles } : {}),
    };

    const { response, stream } = await startChatTurnStream(request, {
      fetch: this.options.fetch,
      abortSignal: options.abortSignal,
      headers: options.headers,
    });

    this.lastRun = { runId: response.runId, sessionId: response.sessionId };
    // Keep the session ref current when the server lazy-created one.
    if (response.sessionId) {
      this.options.sessionIdRef.current = response.sessionId;
    }

    return stream;
  }

  async reconnectToStream(options: {
    chatId: string;
    headers?: HeadersInit;
    body?: object;
  }): Promise<ReadableStream<UIMessageChunk> | null> {
    const run = this.lastRun;
    if (!run) return null;
    // Reattach from 0 — the AI SDK will merge; for mid-run resume the
    // preferred path is session.activeRunId (stream 8). Here we only recover
    // the in-memory last run from this transport instance.
    return createRunUIMessageStream({
      runId: run.runId,
      from: 0,
      messageId: `assistant-${run.runId}`,
      fetch: this.options.fetch,
      headers: options.headers,
    });
  }
}

/**
 * Hook mirror of `useChatTransport` — stable `RunTransport` instance whose
 * refs are read at send time.
 */
export function useRunTransport(args: {
  chatProviderRef: MutableRefObject<string>;
  chatModelRef: MutableRefObject<string>;
  contextFilesRef: MutableRefObject<string[]>;
  sessionIdRef: MutableRefObject<string | undefined>;
}): ChatTransport<UIMessage> {
  const { chatProviderRef, chatModelRef, contextFilesRef, sessionIdRef } = args;
  const transportRef = useRef<RunTransport | null>(null);

  return useMemo(() => {
    const transport = new RunTransport({
      chatProviderRef,
      chatModelRef,
      contextFilesRef,
      sessionIdRef,
    });
    transportRef.current = transport;
    return transport;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
