/**
 * RunTransport mapping + reconnect coverage (IW-9 D stream 6).
 *
 * Asserts each RunEvent → UIMessageChunk mapping, unknown-type skip,
 * mid-stream reconnect without gaps/dupes, and partial tool state = running.
 */
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/gateway-fetch", () => ({ gatewayFetch: vi.fn() }));
vi.mock("@/lib/gateway", () => ({
  GATEWAY_BASE: "http://gateway.test",
  getGatewayBase: () => "http://gateway.test",
}));

import {
  encodeRunEventFrame,
  parseRunEvent,
  runStreamPath,
  type RunEvent,
} from "@aprovan/agent-protocol";
import type { UIMessage, UIMessageChunk } from "ai";
import {
  createRunEventMappingState,
  createRunUIMessageStream,
  mapRunEventToChunks,
  RunTransport,
  startChatTurnStream,
  textFromMessages,
} from "../run-transport";

function collectChunks(stream: ReadableStream<UIMessageChunk>): Promise<UIMessageChunk[]> {
  return new Promise((resolve, reject) => {
    const out: UIMessageChunk[] = [];
    stream
      .pipeTo(
        new WritableStream({
          write(chunk) {
            out.push(chunk);
          },
        }),
      )
      .then(() => resolve(out))
      .catch(reject);
  });
}

function sseFrames(events: RunEvent[]): string {
  return events.map((e) => encodeRunEventFrame(e)).join("");
}

function bodyFromEvents(events: RunEvent[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const payload = sseFrames(events);
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(payload));
      controller.close();
    },
  });
}

/** Split events across two connections to simulate a mid-run drop. */
function openStreamWithDrop(
  beforeDrop: RunEvent[],
  afterDrop: RunEvent[],
): {
  openStream: (from: number) => Promise<ReadableStream<Uint8Array>>;
  opens: number[];
} {
  const opens: number[] = [];
  let first = true;
  return {
    opens,
    openStream: async (from: number) => {
      opens.push(from);
      if (first) {
        first = false;
        // Deliver prefix then close without terminal — forces reconnect.
        const filtered = beforeDrop.filter((e) => e.seq >= from);
        return bodyFromEvents(filtered);
      }
      const filtered = afterDrop.filter((e) => e.seq >= from);
      return bodyFromEvents(filtered);
    },
  };
}

const baseEvents = {
  runStarted: {
    type: "run_started" as const,
    seq: 0,
    runId: "agr-1",
    at: "2026-01-01T00:00:00.000Z",
  },
  turnStarted: { type: "turn_started" as const, seq: 1, turn: 1, at: "2026-01-01T00:00:01.000Z" },
  delta: {
    type: "assistant_delta" as const,
    seq: 2,
    turn: 1,
    text: "Hello ```tsx\nexport default function W(){}\n```",
  },
  toolStart: {
    type: "tool_call_started" as const,
    seq: 3,
    turn: 1,
    callId: "call-1",
    namespace: "fs",
    operation: "read",
    args: { path: "a.ts" },
  },
  toolFinish: {
    type: "tool_call_finished" as const,
    seq: 4,
    turn: 1,
    callId: "call-1",
    ok: true,
    resultPreview: '{"ok":true}',
    durationMs: 12,
  },
  turnFinished: { type: "turn_finished" as const, seq: 5, turn: 1 },
  runFinished: {
    type: "run_finished" as const,
    seq: 6,
    status: "succeeded" as const,
    stopReason: "completed" as const,
    usage: {},
  },
};

describe("mapRunEventToChunks", () => {
  it("maps assistant_delta to text-start/delta (and text-end on turn_finished)", () => {
    const state = createRunEventMappingState();
    const start = mapRunEventToChunks(baseEvents.runStarted, state, {
      messageId: "assistant-agr-1",
    });
    expect(start).toEqual([{ type: "start", messageId: "assistant-agr-1" }]);

    expect(mapRunEventToChunks(baseEvents.turnStarted, state)).toEqual([]);

    const deltas = mapRunEventToChunks(baseEvents.delta, state);
    expect(deltas).toEqual([
      { type: "text-start", id: "text-0" },
      {
        type: "text-delta",
        id: "text-0",
        delta: baseEvents.delta.text,
      },
    ]);

    const end = mapRunEventToChunks(baseEvents.turnFinished, state);
    expect(end).toEqual([{ type: "text-end", id: "text-0" }]);
  });

  it("maps tool_call_started to dynamic-tool running parts (input-available)", () => {
    const state = createRunEventMappingState();
    mapRunEventToChunks(baseEvents.runStarted, state);
    const chunks = mapRunEventToChunks(baseEvents.toolStart, state);
    expect(chunks).toEqual([
      {
        type: "tool-input-start",
        toolCallId: "call-1",
        toolName: "fs.read",
        dynamic: true,
        providerExecuted: true,
      },
      {
        type: "tool-input-available",
        toolCallId: "call-1",
        toolName: "fs.read",
        input: { path: "a.ts" },
        dynamic: true,
        providerExecuted: true,
      },
    ]);
    // MessageParts treats input-available as running (spinner).
  });

  it("maps tool_call_finished ok/error to tool-output-*", () => {
    const state = createRunEventMappingState();
    mapRunEventToChunks(baseEvents.runStarted, state);
    mapRunEventToChunks(baseEvents.toolStart, state);
    const ok = mapRunEventToChunks(baseEvents.toolFinish, state);
    expect(ok).toEqual([
      {
        type: "tool-output-available",
        toolCallId: "call-1",
        output: { ok: true },
        dynamic: true,
        providerExecuted: true,
      },
    ]);

    const errState = createRunEventMappingState();
    mapRunEventToChunks(baseEvents.runStarted, errState);
    mapRunEventToChunks(
      { ...baseEvents.toolStart, callId: "call-2", seq: 3 },
      errState,
    );
    const err = mapRunEventToChunks(
      {
        type: "tool_call_finished",
        seq: 4,
        turn: 1,
        callId: "call-2",
        ok: false,
        error: "denied",
        durationMs: 1,
      },
      errState,
    );
    expect(err).toEqual([
      {
        type: "tool-output-error",
        toolCallId: "call-2",
        errorText: "denied",
        dynamic: true,
        providerExecuted: true,
      },
    ]);
  });

  it("maps run_finished / error to finish / error chunks", () => {
    const state = createRunEventMappingState();
    mapRunEventToChunks(baseEvents.runStarted, state);
    mapRunEventToChunks(baseEvents.delta, state);
    const finished = mapRunEventToChunks(baseEvents.runFinished, state);
    expect(finished).toContainEqual({ type: "text-end", id: "text-0" });
    expect(finished).toContainEqual({ type: "finish", finishReason: "stop" });

    const errState = createRunEventMappingState();
    mapRunEventToChunks(baseEvents.runStarted, errState);
    const err = mapRunEventToChunks(
      { type: "error", seq: 9, message: "boom" },
      errState,
    );
    expect(err).toEqual([
      { type: "error", errorText: "boom" },
      { type: "finish", finishReason: "error" },
    ]);
  });

  it("skips unknown event types without throwing (parseRunEvent → undefined)", () => {
    expect(parseRunEvent({ type: "pending_action_v2", seq: 1 })).toBeUndefined();
    const state = createRunEventMappingState();
    // pending_action is schema-known but produces no UI parts.
    const pending = parseRunEvent({
      type: "pending_action",
      seq: 1,
      turn: 1,
      actionId: "a1",
      capability: "fs.write",
    });
    expect(pending).toBeDefined();
    expect(mapRunEventToChunks(pending!, state)).toEqual([
      { type: "start" },
    ]);
  });
});

describe("createRunUIMessageStream reconnect", () => {
  it("reattaches at lastConsumedSeq+1 with no duplicate or missing parts", async () => {
    const before: RunEvent[] = [
      baseEvents.runStarted,
      baseEvents.turnStarted,
      baseEvents.delta,
      baseEvents.toolStart,
    ];
    const after: RunEvent[] = [
      baseEvents.toolFinish,
      baseEvents.turnFinished,
      baseEvents.runFinished,
    ];
    const { openStream, opens } = openStreamWithDrop(before, after);

    const stream = createRunUIMessageStream({
      runId: "agr-1",
      from: 0,
      messageId: "assistant-agr-1",
      openStream,
    });
    const chunks = await collectChunks(stream);

    expect(opens).toEqual([0, 4]); // last consumed was tool_start seq=3 → from=4
    expect(chunks.filter((c) => c.type === "text-delta")).toHaveLength(1);
    expect(chunks.filter((c) => c.type === "tool-input-available")).toHaveLength(1);
    expect(chunks.filter((c) => c.type === "tool-output-available")).toHaveLength(1);
    expect(chunks.filter((c) => c.type === "finish")).toHaveLength(1);
  });

  it("partial tool_call_started (no finish yet) stays in running state", async () => {
    // Mid-replay: only started — maps to input-available (= running in MessageParts).
    const state = createRunEventMappingState();
    mapRunEventToChunks(baseEvents.runStarted, state);
    const running = mapRunEventToChunks(baseEvents.toolStart, state);
    const available = running.find((c) => c.type === "tool-input-available");
    expect(available).toMatchObject({
      type: "tool-input-available",
      toolCallId: "call-1",
      toolName: "fs.read",
    });
    // No output chunk yet — UI shows spinner (input-available / input-streaming).
    expect(running.some((c) => c.type.startsWith("tool-output"))).toBe(false);
  });

  it("ignores unknown SSE data frames and keepalives", async () => {
    const encoder = new TextEncoder();
    const openStream = async () =>
      new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(encoder.encode(": keepalive\n\n"));
          controller.enqueue(
            encoder.encode('data: {"type":"not_a_real_event","seq":99}\n\n'),
          );
          controller.enqueue(encoder.encode(encodeRunEventFrame(baseEvents.runStarted)));
          controller.enqueue(encoder.encode(encodeRunEventFrame(baseEvents.runFinished)));
          controller.close();
        },
      });

    const chunks = await collectChunks(
      createRunUIMessageStream({ runId: "agr-1", openStream }),
    );
    expect(chunks.some((c) => c.type === "start")).toBe(true);
    expect(chunks.some((c) => c.type === "finish")).toBe(true);
  });
});

describe("RunTransport sendMessages", () => {
  it("posts ChatTurnRequest then streams from runStreamPath", async () => {
    const fetchImpl = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/agents/chat-turn") && init?.method === "POST") {
        const body = JSON.parse(String(init.body)) as Record<string, unknown>;
        expect(body).toMatchObject({
          text: "hi",
          origin: "user",
          provider: "openai",
          model: "gpt-4o-mini",
          sessionId: "sess-1",
        });
        // No messageId in request (D5 / stream 5 deviation).
        expect(body).not.toHaveProperty("messageId");
        return new Response(
          JSON.stringify({
            runId: "agr-1",
            sessionId: "sess-1",
            streamUrl: runStreamPath("agr-1", 0),
          }),
          { status: 200, headers: { "content-type": "application/json" } },
        );
      }
      if (url.includes(runStreamPath("agr-1", 0))) {
        return new Response(
          bodyFromEvents([
            baseEvents.runStarted,
            baseEvents.turnStarted,
            { ...baseEvents.delta, text: "yo" },
            baseEvents.turnFinished,
            baseEvents.runFinished,
          ]),
          { status: 200, headers: { "content-type": "text/event-stream" } },
        );
      }
      return new Response("not found", { status: 404 });
    });

    const transport = new RunTransport({
      sessionIdRef: { current: "sess-1" },
      chatProviderRef: { current: "openai" },
      chatModelRef: { current: "gpt-4o-mini" },
      contextFilesRef: { current: [] },
      fetch: fetchImpl as unknown as typeof fetch,
    });

    const messages: UIMessage[] = [
      { id: "u1", role: "user", parts: [{ type: "text", text: "hi" }] },
    ];
    const stream = await transport.sendMessages({
      trigger: "submit-message",
      chatId: "c1",
      messageId: undefined,
      messages,
      abortSignal: undefined,
    });
    const chunks = await collectChunks(stream);
    expect(chunks.some((c) => c.type === "text-delta" && "delta" in c && c.delta === "yo")).toBe(
      true,
    );
    expect(transport.getLastRun()).toEqual({ runId: "agr-1", sessionId: "sess-1" });
  });
});

describe("startChatTurnStream (stream 7 entry)", () => {
  it("accepts origin self-heal + failure on the same path", async () => {
    const fetchImpl = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/agents/chat-turn")) {
        const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
        expect(body.origin).toBe("self-heal");
        expect(body.failure).toEqual({
          messageId: "m1",
          path: "widgets/a/main.tsx",
          error: "boom",
        });
        return new Response(
          JSON.stringify({
            runId: "agr-heal",
            sessionId: "sess-1",
            streamUrl: runStreamPath("agr-heal", 0),
          }),
          { status: 200 },
        );
      }
      return new Response(
        bodyFromEvents([
          { ...baseEvents.runStarted, runId: "agr-heal" },
          { ...baseEvents.runFinished, seq: 1 },
        ]),
        { status: 200, headers: { "content-type": "text/event-stream" } },
      );
    });

    const { response, stream } = await startChatTurnStream(
      {
        text: "fix the widget",
        sessionId: "sess-1",
        origin: "self-heal",
        failure: {
          messageId: "m1",
          path: "widgets/a/main.tsx",
          error: "boom",
        },
      },
      { fetch: fetchImpl as unknown as typeof fetch },
    );
    expect(response.runId).toBe("agr-heal");
    const chunks = await collectChunks(stream);
    expect(chunks.some((c) => c.type === "finish")).toBe(true);
  });
});

describe("textFromMessages", () => {
  it("reads the latest user text part", () => {
    expect(
      textFromMessages([
        { id: "a", role: "assistant", parts: [{ type: "text", text: "nope" }] },
        { id: "u", role: "user", parts: [{ type: "text", text: "yes" }] },
      ]),
    ).toBe("yes");
  });
});
