/**
 * `sessions` core service — chat sessions as a tool namespace
 * (docs/vcs-and-sessions.md). The PR-shaped surface: create/list/peek,
 * transcript append, rebase onto main, and close-with-stage.
 *
 * Member-only end to end: app sessions never see workspace chat history or
 * the VCS (`requireWorkspaceCaller` mirror in every op).
 */

import { getRecordStore } from "../records.js";
import { ServiceError, type CoreService, type ServiceContext } from "../service-kernel.js";
import {
  appendMessages,
  changeSummary,
  closeSession,
  createSession,
  deleteSession,
  discardChanges,
  listSessions,
  readMessages,
  requireSession,
  resolveSessionMerge,
  sessionId,
  syncSession,
  updateSession,
  type ChatSessionRecord,
  type SessionMode,
  type SessionStatus,
} from "./chat-sessions.js";
import { readCommit } from "./store.js";

function memberOnly(ctx: ServiceContext): void {
  if (ctx.appScope) throw new ServiceError("Chat sessions are workspace-only", 403);
}

function sessionMode(value: unknown): SessionMode | undefined {
  if (value === undefined) return undefined;
  if (value === "auto" || value === "staged") return value;
  throw new ServiceError('mode must be "auto" or "staged"', 400);
}

async function withChanges(
  workspaceId: string,
  session: ChatSessionRecord,
): Promise<Record<string, unknown>> {
  const [changes, base] = await Promise.all([
    changeSummary(workspaceId, session),
    readCommit(workspaceId, session.base),
  ]);
  // `baseAt` lets clients render the base as a moment in time ("workspace
  // as of 2h ago") instead of a hash — users never see hex.
  return { ...session, changes, ...(base ? { baseAt: base.createdAt } : {}) };
}

// ---------------------------------------------------------------------------
// Presence — who has which chat open right now.
//
// Heartbeats land in the record store (unversioned, invisible to the file
// plane — see docs/app-data.md) keyed per (user, window). A peer is "live"
// while its heartbeat is fresher than PRESENCE_TTL_MS; stale rows are
// best-effort garbage-collected as they're encountered. This is the
// backend-facilitated half of live collaboration; a CRDT transport can
// replace the polling without changing the surface.
// ---------------------------------------------------------------------------

const PRESENCE_PREFIX = "presence:";
const PRESENCE_TTL_MS = 30_000;

interface PresenceRecord {
  userId: string;
  window: string;
  sessionId?: string;
  sessionTitle?: string;
  mode?: string;
  lastSeen: string;
}

async function heartbeatPresence(
  ctx: ServiceContext,
  args: Record<string, unknown>,
): Promise<{ peers: PresenceRecord[] }> {
  const records = getRecordStore();
  const window =
    typeof args["window"] === "string" && args["window"]
      ? args["window"].slice(0, 64)
      : "default";
  const record: PresenceRecord = {
    userId: ctx.userId,
    window,
    ...(typeof args["id"] === "string" && args["id"] ? { sessionId: args["id"] } : {}),
    ...(typeof args["title"] === "string" && args["title"]
      ? { sessionTitle: args["title"].slice(0, 120) }
      : {}),
    ...(typeof args["mode"] === "string" ? { mode: args["mode"] } : {}),
    lastSeen: new Date().toISOString(),
  };
  const selfKey = `${PRESENCE_PREFIX}${ctx.userId}:${window}`;
  await records.set(ctx.workspaceId, "ws", selfKey, record, ctx.userId);

  const keys = await records.list(ctx.workspaceId, "ws", PRESENCE_PREFIX);
  const now = Date.now();
  const peers: PresenceRecord[] = [];
  for (const key of keys) {
    if (key === selfKey) continue;
    const hit = await records.get(ctx.workspaceId, "ws", key).catch(() => undefined);
    const peer = hit?.value as PresenceRecord | undefined;
    if (!peer || typeof peer.lastSeen !== "string") continue;
    if (now - Date.parse(peer.lastSeen) > PRESENCE_TTL_MS) {
      void records.delete(ctx.workspaceId, "ws", key).catch(() => undefined);
      continue;
    }
    peers.push(peer);
  }
  return { peers };
}

export const sessionsService: CoreService = {
  meta: {
    label: "Sessions",
    blurb: "Chat sessions as branches: staged diffs, presence, resolve",
    icon: "git-branch",
  },
  tools: [
    {
      name: "sessions.create",
      operation: "create",
      description:
        "Open a chat session. Auto-snapshots main as the session's base; mode 'staged' keeps file edits in a session overlay until staged to main, 'auto' (default) writes through.",
      inputSchema: {
        type: "object",
        properties: { title: { type: "string" }, mode: { type: "string", enum: ["auto", "staged"] } },
      },
    },
    {
      name: "sessions.list",
      operation: "list",
      description:
        "Chat sessions, newest first — the PR-style log: title, status (open|merged|closed), mode, base commit, staged-change summary, message count.",
      inputSchema: {
        type: "object",
        properties: { status: { type: "string", enum: ["open", "merged", "closed"] } },
      },
    },
    {
      name: "sessions.get",
      operation: "get",
      description: "One session with its staged-change summary vs base.",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
    {
      name: "sessions.messages",
      operation: "messages",
      description: "The session's full transcript.",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
    {
      name: "sessions.append",
      operation: "append",
      description:
        "Append transcript messages (idempotent per message id — re-sending a tail upserts).",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" }, messages: { type: "array" } },
        required: ["id", "messages"],
      },
    },
    {
      name: "sessions.update",
      operation: "update",
      description: "Update a session's title, mode, or saved tab layout.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          mode: { type: "string", enum: ["auto", "staged"] },
          tabs: {},
        },
        required: ["id"],
      },
    },
    {
      name: "sessions.sync",
      operation: "sync",
      description:
        "Rebase the session's base onto the current main head. Overlay is preserved; paths where main moved under a staged edit are returned as conflicts.",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
    {
      name: "sessions.delete",
      operation: "delete",
      description:
        "Permanently delete a chat session: its transcript, record, and any unapplied staged changes. The workspace itself is untouched.",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
    {
      name: "sessions.discard",
      operation: "discard",
      description:
        "Drop staged changes for specific paths (the 'keep the workspace version' conflict resolution) — the draft stops claiming them.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string" },
          paths: { type: "array", items: { type: "string" } },
        },
        required: ["id", "paths"],
      },
    },
    {
      name: "sessions.presence",
      operation: "presence",
      description:
        "Heartbeat this window's presence (optionally with the open session) and get back the workspace's other live windows — who's in which chat right now.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string" },
          window: { type: "string" },
          title: { type: "string" },
          mode: { type: "string" },
        },
        required: ["window"],
      },
    },
    {
      name: "sessions.resolve",
      operation: "resolve",
      description:
        'One-call merge completion: sync the draft, settle every conflicted file by strategy ("keep-draft" or "keep-workspace"), and apply to the workspace (apply=false to only settle). The native function merge-conflict notification choices invoke.',
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string" },
          strategy: { type: "string", enum: ["keep-draft", "keep-workspace"] },
          apply: { type: "boolean" },
          message: { type: "string" },
        },
        required: ["id", "strategy"],
      },
    },
    {
      name: "sessions.close",
      operation: "close",
      description:
        "Close a session. stage=true applies its staged overlay to main as a merge commit; otherwise the session is archived (overlay stays peekable).",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string" },
          stage: { type: "boolean" },
          message: { type: "string" },
        },
        required: ["id"],
      },
    },
  ],

  async call(ctx, procedure, args) {
    memberOnly(ctx);
    switch (procedure) {
      case "create": {
        const session = await createSession(ctx.workspaceId, ctx.userId, {
          title: typeof args["title"] === "string" ? args["title"] : undefined,
          mode: sessionMode(args["mode"]),
        });
        return { session };
      }
      case "list": {
        const status =
          args["status"] === "open" || args["status"] === "merged" || args["status"] === "closed"
            ? (args["status"] as SessionStatus)
            : undefined;
        const sessions = await listSessions(ctx.workspaceId, status);
        return {
          sessions: await Promise.all(
            sessions.map((session) => withChanges(ctx.workspaceId, session)),
          ),
        };
      }
      case "get": {
        const session = await requireSession(ctx.workspaceId, sessionId(args["id"]));
        return { session: await withChanges(ctx.workspaceId, session) };
      }
      case "messages": {
        const id = sessionId(args["id"]);
        await requireSession(ctx.workspaceId, id);
        return { messages: await readMessages(ctx.workspaceId, id) };
      }
      case "append": {
        if (!Array.isArray(args["messages"])) {
          throw new ServiceError("messages must be an array", 400);
        }
        const session = await appendMessages(
          ctx.workspaceId,
          sessionId(args["id"]),
          args["messages"],
        );
        return { session };
      }
      case "update": {
        const session = await updateSession(ctx.workspaceId, sessionId(args["id"]), {
          title: typeof args["title"] === "string" ? args["title"] : undefined,
          mode: sessionMode(args["mode"]),
          tabs: args["tabs"],
        });
        return { session };
      }
      case "sync": {
        const { session, conflicts } = await syncSession(
          ctx.workspaceId,
          sessionId(args["id"]),
          ctx.userId,
        );
        return { session: await withChanges(ctx.workspaceId, session), conflicts };
      }
      case "delete": {
        const id = sessionId(args["id"]);
        await deleteSession(ctx.workspaceId, id);
        return { deleted: id };
      }
      case "discard": {
        if (!Array.isArray(args["paths"])) {
          throw new ServiceError("paths must be an array", 400);
        }
        const dropped = await discardChanges(
          ctx.workspaceId,
          sessionId(args["id"]),
          args["paths"].filter((p): p is string => typeof p === "string"),
        );
        const session = await requireSession(ctx.workspaceId, sessionId(args["id"]));
        return { dropped, session: await withChanges(ctx.workspaceId, session) };
      }
      case "presence":
        return heartbeatPresence(ctx, args);
      case "resolve": {
        const strategy = args["strategy"];
        if (strategy !== "keep-draft" && strategy !== "keep-workspace") {
          throw new ServiceError('strategy must be "keep-draft" or "keep-workspace"', 400);
        }
        const { session, commit, resolved } = await resolveSessionMerge(
          ctx.workspaceId,
          sessionId(args["id"]),
          ctx.userId,
          {
            strategy,
            apply: args["apply"] !== false,
            message: typeof args["message"] === "string" ? args["message"] : undefined,
          },
        );
        return { session, resolved, ...(commit ? { commit } : {}) };
      }
      case "close": {
        const { session, commit } = await closeSession(
          ctx.workspaceId,
          sessionId(args["id"]),
          ctx.userId,
          {
            stage: args["stage"] === true,
            message: typeof args["message"] === "string" ? args["message"] : undefined,
          },
        );
        return { session, ...(commit ? { commit } : {}) };
      }
      default:
        throw new ServiceError(`Unknown sessions procedure: ${procedure}`, 404);
    }
  },
};
