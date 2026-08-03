/**
 * Realtime topic protocol — the single source of truth for envelope shapes,
 * topic grammar, error codes, and reserved namespaces (tech-plan D5).
 */

import { z } from "zod";

/** `<namespace>:<rest>` where namespace is `[a-z][a-z0-9-]*` and rest is non-empty. */
export type Topic = `${string}:${string}`;

/**
 * Reserved namespace: future Yjs/Loro CRDT document sync (path-keyed like presence).
 * Not implemented in v1 — subscribe/publish → `reserved-namespace`.
 */
export const RESERVED_NAMESPACE_DOC = "doc";

/**
 * Reserved namespace: workspace change feed (post-WS-5 migration off ETag/`?since` poll).
 * Not implemented in v1 — subscribe/publish → `reserved-namespace`.
 * Do not touch `/fs/changes` or `startLiveWorkspaceSync` from this change.
 */
export const RESERVED_NAMESPACE_FS = "fs";

export const RESERVED_NAMESPACES = new Set<string>([
  RESERVED_NAMESPACE_DOC,
  RESERVED_NAMESPACE_FS,
]);

export type ErrorCode =
  | "bad-message"
  | "unknown-namespace"
  | "reserved-namespace"
  | "bad-topic"
  | "bad-body";

const topicSchema = z
  .string()
  .regex(/^[a-z][a-z0-9-]*:.+$/, "topic must match <namespace>:<rest>") as z.ZodType<Topic>;

export const clientMessageSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("subscribe"), topic: topicSchema }),
  z.object({ type: z.literal("unsubscribe"), topic: topicSchema }),
  z.object({ type: z.literal("publish"), topic: topicSchema, body: z.unknown() }),
]);

export type ClientMessage = z.infer<typeof clientMessageSchema>;

export type ServerMessage =
  | { type: "subscribed"; topic: Topic; body?: unknown }
  | { type: "event"; topic: Topic; body: unknown }
  | { type: "error"; code: ErrorCode; message: string; topic?: Topic };

export function parseTopic(topic: string): { namespace: string; rest: string } | null {
  const match = /^([a-z][a-z0-9-]*):(.+)$/.exec(topic);
  if (!match) return null;
  return { namespace: match[1]!, rest: match[2]! };
}

export function parseClientMessage(raw: string): ClientMessage | { error: "bad-message" } {
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return { error: "bad-message" };
  }
  const parsed = clientMessageSchema.safeParse(json);
  if (!parsed.success) return { error: "bad-message" };
  return parsed.data;
}
