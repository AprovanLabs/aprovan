/**
 * Chat Channel / Message record shapes — tech-plan "Interfaces & Data".
 * Stored in the F2 shared partition under `ch#…` / `msg#…` keys.
 */

import { z } from "zod";

/** ULID string (26 Crockford base32 chars). */
const Ulid = z.string().length(26);

/** ISO-8601 timestamp string. */
const Iso = z.string().datetime({ offset: true });

/** User subject (Cognito sub / local user id). */
const UserSub = z.string().min(1);

export const ChannelKindSchema = z.enum(["public", "restricted"]);
export type ChannelKind = z.infer<typeof ChannelKindSchema>;

/** Agent-produced message marker (`chat/summarize`). */
export const MessageAgentSchema = z.object({
  profile: z.literal("chat/summarize"),
  invoker: UserSub,
});
export type MessageAgent = z.infer<typeof MessageAgentSchema>;

/** key: `ch#<channelId>` */
export const ChannelSchema = z.object({
  id: Ulid,
  name: z.string().min(1),
  kind: ChannelKindSchema,
  /** Restricted only; public ⇒ all instance participants. */
  members: z.array(UserSub).optional(),
  createdBy: UserSub,
  createdAt: Iso,
});
export type Channel = z.infer<typeof ChannelSchema>;

/** key: `msg#<channelId>#<messageId>` (ULID ⇒ sortable window reads) */
export const MessageSchema = z.object({
  id: Ulid,
  channelId: Ulid,
  /** Set ⇒ thread reply; server rejects replies-to-replies. */
  parentId: Ulid.optional(),
  author: UserSub,
  agent: MessageAgentSchema.optional(),
  /** Markdown-lite; sanitized at render. */
  body: z.string(),
  createdAt: Iso,
});
export type Message = z.infer<typeof MessageSchema>;

export function channelKey(channelId: string): string {
  return `ch#${channelId}`;
}

export function messageKey(channelId: string, messageId: string): string {
  return `msg#${channelId}#${messageId}`;
}

export function messageKeyPrefix(channelId: string): string {
  return `msg#${channelId}#`;
}
