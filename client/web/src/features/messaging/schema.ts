/**
 * Chat Channel / Message shapes — tech-plan "Interfaces & Data".
 * Stored in the F2 shared partition under `ch#…` / `msg#…` keys.
 *
 * Zod is not a patchwork-web dependency (Touches forbid package.json); shapes
 * mirror the server zod schemas in `apps/chat/schema.ts` with light parsers.
 */

export type ChannelKind = "public" | "restricted";

export type MessageAgent = {
  profile: "chat/summarize";
  invoker: string;
};

/** key: `ch#<channelId>` */
export type Channel = {
  id: string;
  name: string;
  kind: ChannelKind;
  /** Restricted only; public ⇒ all instance participants. */
  members?: string[];
  createdBy: string;
  createdAt: string;
};

/** key: `msg#<channelId>#<messageId>` (ULID ⇒ sortable window reads) */
export type Message = {
  id: string;
  channelId: string;
  /** Set ⇒ thread reply; server rejects replies-to-replies. */
  parentId?: string;
  author: string;
  agent?: MessageAgent;
  body: string;
  createdAt: string;
};

export type ChatRealtimeEvent =
  | {
      kind: "message";
      channelId: string;
      recordId: string;
      seq: number;
      hint?: { author: string; preview: string };
    }
  | { kind: "channel-membership"; channelId: string }
  | { kind: "presence"; roster: Array<{ sub: string; lastActive: string }> }
  | { kind: "typing"; channelId: string; sub: string };

export type InstancePresence = {
  roster: Array<{ sub: string; lastActive: string }>;
};

export type ConnectionState = "live" | "reconnecting" | "reconciling";

export type Unsubscribe = () => void;

export function channelKey(channelId: string): string {
  return `ch#${channelId}`;
}

export function messageKey(channelId: string, messageId: string): string {
  return `msg#${channelId}#${messageId}`;
}

export function messageKeyPrefix(channelId: string): string {
  return `msg#${channelId}#`;
}

export function parseMessage(value: unknown): Message | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  if (
    typeof v.id !== "string" ||
    typeof v.channelId !== "string" ||
    typeof v.author !== "string" ||
    typeof v.body !== "string" ||
    typeof v.createdAt !== "string"
  ) {
    return null;
  }
  const out: Message = {
    id: v.id,
    channelId: v.channelId,
    author: v.author,
    body: v.body,
    createdAt: v.createdAt,
  };
  if (typeof v.parentId === "string") out.parentId = v.parentId;
  if (v.agent && typeof v.agent === "object") {
    const agent = v.agent as Record<string, unknown>;
    if (agent.profile === "chat/summarize" && typeof agent.invoker === "string") {
      out.agent = { profile: "chat/summarize", invoker: agent.invoker };
    }
  }
  return out;
}

export function parseChannel(value: unknown): Channel | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  if (
    typeof v.id !== "string" ||
    typeof v.name !== "string" ||
    (v.kind !== "public" && v.kind !== "restricted") ||
    typeof v.createdBy !== "string" ||
    typeof v.createdAt !== "string"
  ) {
    return null;
  }
  const out: Channel = {
    id: v.id,
    name: v.name,
    kind: v.kind,
    createdBy: v.createdBy,
    createdAt: v.createdAt,
  };
  if (Array.isArray(v.members)) {
    out.members = v.members.filter((m): m is string => typeof m === "string");
  }
  return out;
}

export function parseChatRealtimeEvent(value: unknown): ChatRealtimeEvent | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  switch (v.kind) {
    case "message": {
      if (
        typeof v.channelId !== "string" ||
        typeof v.recordId !== "string" ||
        typeof v.seq !== "number"
      ) {
        return null;
      }
      const event: ChatRealtimeEvent = {
        kind: "message",
        channelId: v.channelId,
        recordId: v.recordId,
        seq: v.seq,
      };
      if (v.hint && typeof v.hint === "object") {
        const hint = v.hint as Record<string, unknown>;
        if (typeof hint.author === "string" && typeof hint.preview === "string") {
          event.hint = { author: hint.author, preview: hint.preview };
        }
      }
      return event;
    }
    case "channel-membership":
      return typeof v.channelId === "string"
        ? { kind: "channel-membership", channelId: v.channelId }
        : null;
    case "presence": {
      if (!Array.isArray(v.roster)) return null;
      const roster: Array<{ sub: string; lastActive: string }> = [];
      for (const row of v.roster) {
        if (!row || typeof row !== "object") continue;
        const r = row as Record<string, unknown>;
        if (typeof r.sub === "string" && typeof r.lastActive === "string") {
          roster.push({ sub: r.sub, lastActive: r.lastActive });
        }
      }
      return { kind: "presence", roster };
    }
    case "typing":
      return typeof v.channelId === "string" && typeof v.sub === "string"
        ? { kind: "typing", channelId: v.channelId, sub: v.sub }
        : null;
    default:
      return null;
  }
}
