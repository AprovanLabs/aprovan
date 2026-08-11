import type {
  AgentRunStatus,
  AgentStopReason,
  AgentUsage,
} from "@utdk/agent";
import { z } from "zod";

/** Mirrors `@utdk/agent`'s `AgentRunStatus` for zod validation. */
export const agentRunStatusSchema = z.enum([
  "queued",
  "running",
  "awaiting_tools",
  "suspended",
  "succeeded",
  "failed",
  "cancelled",
]) satisfies z.ZodType<AgentRunStatus>;

/** Mirrors `@utdk/agent`'s `AgentStopReason` for zod validation. */
export const agentStopReasonSchema = z.enum([
  "completed",
  "max_turns",
  "max_tokens",
  "max_tool_calls",
  "wall_clock",
  "cancelled",
  "tool_denied",
  "error",
]) satisfies z.ZodType<AgentStopReason>;

/** Mirrors `@utdk/agent`'s `AgentUsage` for zod validation. */
export const agentUsageSchema = z
  .object({
    inputTokens: z.number().optional(),
    outputTokens: z.number().optional(),
    reasoningTokens: z.number().optional(),
    totalTokens: z.number().optional(),
    turns: z.number().optional(),
    toolCalls: z.number().optional(),
    costUsd: z.number().optional(),
  })
  .strict() satisfies z.ZodType<AgentUsage>;

const seq = z.number();

export const runStartedEventSchema = z.object({
  type: z.literal("run_started"),
  seq,
  runId: z.string(),
  at: z.string(),
  agent: z.string().optional(),
  model: z.string().optional(),
  sessionId: z.string().optional(),
});

export const turnStartedEventSchema = z.object({
  type: z.literal("turn_started"),
  seq,
  turn: z.number(),
  at: z.string(),
});

export const assistantDeltaEventSchema = z.object({
  type: z.literal("assistant_delta"),
  seq,
  turn: z.number(),
  text: z.string(),
});

export const toolCallStartedEventSchema = z.object({
  type: z.literal("tool_call_started"),
  seq,
  turn: z.number(),
  callId: z.string(),
  namespace: z.string(),
  operation: z.string(),
  args: z.record(z.unknown()),
});

export const toolCallFinishedEventSchema = z.object({
  type: z.literal("tool_call_finished"),
  seq,
  turn: z.number(),
  callId: z.string(),
  ok: z.boolean(),
  resultPreview: z.string().optional(),
  error: z.string().optional(),
  durationMs: z.number(),
});

export const turnFinishedEventSchema = z.object({
  type: z.literal("turn_finished"),
  seq,
  turn: z.number(),
});

export const runFinishedEventSchema = z.object({
  type: z.literal("run_finished"),
  seq,
  status: agentRunStatusSchema,
  stopReason: agentStopReasonSchema,
  usage: agentUsageSchema,
  output: z.string().optional(),
});

export const errorEventSchema = z.object({
  type: z.literal("error"),
  seq,
  message: z.string(),
});

/** Reserved for iw9-c — registered here; no producer in this change emits it. */
export const pendingActionEventSchema = z.object({
  type: z.literal("pending_action"),
  seq,
  turn: z.number(),
  actionId: z.string(),
  capability: z.string(),
  resource: z.string().optional(),
  payload: z.unknown().optional(),
});

export const runEventSchema = z.discriminatedUnion("type", [
  runStartedEventSchema,
  turnStartedEventSchema,
  assistantDeltaEventSchema,
  toolCallStartedEventSchema,
  toolCallFinishedEventSchema,
  turnFinishedEventSchema,
  runFinishedEventSchema,
  errorEventSchema,
  pendingActionEventSchema,
]);

export type RunEvent = z.infer<typeof runEventSchema>;

/**
 * Parse a run event. Returns `undefined` (never throws) when the payload's
 * `type` is outside the union or the shape fails validation — clients must
 * ignore unrecognized event types.
 */
export function parseRunEvent(json: unknown): RunEvent | undefined {
  const result = runEventSchema.safeParse(json);
  return result.success ? result.data : undefined;
}

/** SSE wire frame: `data: <json>\n\n`. */
export function encodeRunEventFrame(event: RunEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

/**
 * Decode one SSE data line (or a full frame) into a RunEvent. Unknown or
 * malformed payloads yield `undefined`.
 */
export function decodeRunEventFrame(line: string): RunEvent | undefined {
  const trimmed = line.replace(/\r?\n$/, "").trimEnd();
  if (!trimmed.startsWith("data:")) return undefined;
  const payload = trimmed.slice("data:".length).trimStart();
  if (!payload) return undefined;
  let json: unknown;
  try {
    json = JSON.parse(payload);
  } catch {
    return undefined;
  }
  return parseRunEvent(json);
}
