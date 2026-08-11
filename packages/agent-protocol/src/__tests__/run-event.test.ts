import { describe, expect, it } from "vitest";
import {
  AGENTS_ROUTE_PREFIX,
  chatTurnPath,
  decodeRunEventFrame,
  encodeRunEventFrame,
  parseRunEvent,
  runEventSchema,
  runStreamPath,
  type RunEvent,
} from "../index.js";

const samples: RunEvent[] = [
  {
    type: "run_started",
    seq: 0,
    runId: "agr-1",
    at: "2026-08-11T12:00:00.000Z",
    agent: "chat",
    model: "gpt-4o-mini",
    sessionId: "sess-1",
  },
  {
    type: "turn_started",
    seq: 1,
    turn: 0,
    at: "2026-08-11T12:00:00.100Z",
  },
  {
    type: "assistant_delta",
    seq: 2,
    turn: 0,
    text: "Hello ```widget\n{}\n```",
  },
  {
    type: "tool_call_started",
    seq: 3,
    turn: 0,
    callId: "call-1",
    namespace: "vcs",
    operation: "log",
    args: { limit: 5 },
  },
  {
    type: "tool_call_finished",
    seq: 4,
    turn: 0,
    callId: "call-1",
    ok: true,
    resultPreview: "ok",
    durationMs: 12,
  },
  {
    type: "turn_finished",
    seq: 5,
    turn: 0,
  },
  {
    type: "run_finished",
    seq: 6,
    status: "succeeded",
    stopReason: "completed",
    usage: { turns: 1, toolCalls: 1 },
    output: "done",
  },
  {
    type: "error",
    seq: 7,
    message: "boom",
  },
  {
    type: "pending_action",
    seq: 8,
    turn: 0,
    actionId: "act-1",
    capability: "tools.invoke",
    resource: "vcs.log",
    payload: { reason: "approval" },
  },
];

describe("RunEvent protocol", () => {
  it("round-trips encode/decode for each of the nine event types", () => {
    expect(samples).toHaveLength(9);
    for (const event of samples) {
      const frame = encodeRunEventFrame(event);
      expect(frame).toBe(`data: ${JSON.stringify(event)}\n\n`);
      expect(decodeRunEventFrame(frame)).toEqual(event);
      expect(parseRunEvent(event)).toEqual(event);
    }
  });

  it("decodes an unrecognized type to undefined without throwing", () => {
    const unknown = { type: "future_event", seq: 99 };
    expect(parseRunEvent(unknown)).toBeUndefined();
    expect(() => parseRunEvent(unknown)).not.toThrow();
    expect(
      decodeRunEventFrame(`data: ${JSON.stringify(unknown)}\n\n`),
    ).toBeUndefined();
  });

  it("requires seq as a number on every member", () => {
    expect(new Set(samples.map((e) => e.type)).size).toBe(9);
    for (const event of samples) {
      const withoutSeq = { ...event } as Record<string, unknown>;
      delete withoutSeq.seq;
      expect(parseRunEvent(withoutSeq)).toBeUndefined();

      const stringSeq = { ...event, seq: "0" };
      expect(parseRunEvent(stringSeq)).toBeUndefined();

      expect(typeof event.seq).toBe("number");
      expect(runEventSchema.safeParse(event).success).toBe(true);
    }
  });

  it("exports frozen URL helpers", () => {
    expect(AGENTS_ROUTE_PREFIX).toBe("/agents");
    expect(chatTurnPath()).toBe("/agents/chat-turn");
    expect(runStreamPath("agr-1", 0)).toBe("/agents/runs/agr-1/stream?from=0");
    expect(runStreamPath("agr-1", 42)).toBe(
      "/agents/runs/agr-1/stream?from=42",
    );
  });
});
