import { z } from "zod";

/** Frozen gateway mount prefix for agent chat/stream routes. */
export const AGENTS_ROUTE_PREFIX = "/agents" as const;

export function chatTurnPath(): string {
  return `${AGENTS_ROUTE_PREFIX}/chat-turn`;
}

export function runStreamPath(runId: string, from: number): string {
  return `${AGENTS_ROUTE_PREFIX}/runs/${runId}/stream?from=${from}`;
}

export const chatTurnFailureSchema = z.object({
  messageId: z.string(),
  path: z.string().optional(),
  error: z.string(),
});

export const chatTurnRequestSchema = z.object({
  sessionId: z.string().optional(),
  text: z.string(),
  provider: z.string().optional(),
  model: z.string().optional(),
  contextFiles: z.array(z.string()).optional(),
  origin: z.enum(["user", "self-heal"]).optional(),
  failure: chatTurnFailureSchema.optional(),
});

export const chatTurnResponseSchema = z.object({
  runId: z.string(),
  sessionId: z.string(),
  streamUrl: z.string(),
});

export type ChatTurnRequest = z.infer<typeof chatTurnRequestSchema>;
export type ChatTurnResponse = z.infer<typeof chatTurnResponseSchema>;
export type ChatTurnFailure = z.infer<typeof chatTurnFailureSchema>;
