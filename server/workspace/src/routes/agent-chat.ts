/**
 * Agent chat HTTP surface (iw9-d).
 *
 * - `GET /runs/:id/stream?from=<seq>` — SSE replay of persisted run events
 *   then live tail until terminal (stream 3).
 * - `POST /chat-turn` — session resolve/lazy-create, server-owned transcript
 *   write, run start via `renderAgentRun`, `{ runId, sessionId, streamUrl }`
 *   (stream 5).
 *
 * Disconnect never cancels a run; only `agents.cancel` does.
 *
 * Transcript ownership (stream 5 / chat-agent-transport): for run-driven
 * turns the **server owns the write** — this route persists the user message
 * at run start and the completed assistant transcript at the run's terminal
 * event, so a run reconstructs from the session record alone even with no
 * client attached. The legacy client writer in `useSessionChatSync.ts`
 * coexists until stream 8.10; append is idempotent per `(sessionId, messageId)`.
 */

import {
  chatTurnRequestSchema,
  encodeRunEventFrame,
  runStreamPath,
  type ChatTurnResponse,
  type RunEvent,
} from "@aprovan/agent-protocol";
import { Hono } from "hono";
import {
  buildEphemeralChatProfile,
  readAgentProfile,
  startChatAgentRun,
} from "../agents/service.js";
import { readNativeAgentRun } from "../agents/runner.js";
import { readRunEvents, subscribeRunEvents } from "../agents/run-events.js";
import { requireAuth } from "../middleware/auth.js";
import { ServiceError } from "../service-kernel.js";
import {
  appendMessages,
  createSession,
  readMessages,
  requireSession,
  setSessionActiveRun,
  type ChatSessionRecord,
} from "../vcs/chat-sessions.js";

export const agentChatRouter = new Hono();

agentChatRouter.use("*", requireAuth);

const SSE_HEADERS: Record<string, string> = {
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
};

/** CloudFront origin-read timeout is 60s — keep comments under that. */
const KEEPALIVE_MS = 15_000;

const TERMINAL_STATUSES = new Set([
  "succeeded",
  "failed",
  "cancelled",
]);

/**
 * Reserved 429 body for stream 7 (self-heal cap). Not wired here — callers
 * that need to refuse a heal turn should return this shape.
 */
export const SELF_HEAL_CAP_EXCEEDED = {
  error: "self-heal cap exceeded",
  code: "self_heal_cap",
} as const;

/** Byte-stable with client `formatContextFilesPrefix` (chat-file-context.ts). */
function formatContextFilesPrefix(contextFiles: string[]): string {
  if (contextFiles.length === 0) return "";
  return `Context files: ${contextFiles.join(", ")}\n\n`;
}

function seedTitleFromText(text: string): string {
  return text.trim().replace(/\s+/g, " ").slice(0, 48) || "New chat";
}

function uiMessageText(raw: unknown): string {
  if (!raw || typeof raw !== "object") return "";
  const msg = raw as { content?: unknown; parts?: unknown };
  if (typeof msg.content === "string") return msg.content;
  if (!Array.isArray(msg.parts)) return "";
  const chunks: string[] = [];
  for (const part of msg.parts) {
    if (
      part &&
      typeof part === "object" &&
      (part as { type?: unknown }).type === "text" &&
      typeof (part as { text?: unknown }).text === "string"
    ) {
      chunks.push((part as { text: string }).text);
    }
  }
  return chunks.join("");
}

function historyToInputMessages(
  stored: unknown[],
): Array<{ role: "user" | "assistant" | "system"; content: string }> {
  const out: Array<{ role: "user" | "assistant" | "system"; content: string }> = [];
  for (const raw of stored) {
    if (!raw || typeof raw !== "object") continue;
    const role = (raw as { role?: unknown }).role;
    if (role !== "user" && role !== "assistant" && role !== "system") continue;
    const content = uiMessageText(raw);
    if (!content) continue;
    out.push({ role, content });
  }
  return out;
}

function isTerminalEvent(event: RunEvent): boolean {
  return event.type === "run_finished" || event.type === "error";
}

/**
 * Replay `seq >= from` from the run record, then tail live emission until a
 * terminal event. Each connection is independent (concurrent reattach OK).
 */
function createRunEventStream(
  workspaceId: string,
  runId: string,
  from: number,
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let closed = false;
  let unsub: (() => void) | null = null;
  let keepalive: ReturnType<typeof setInterval> | null = null;

  const cleanup = (): void => {
    if (keepalive) {
      clearInterval(keepalive);
      keepalive = null;
    }
    unsub?.();
    unsub = null;
  };

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let lastSeq = from - 1;

      const close = (): void => {
        if (closed) return;
        closed = true;
        cleanup();
        try {
          controller.close();
        } catch {
          // Already closed.
        }
      };

      const safeEnqueue = (bytes: Uint8Array): void => {
        if (closed) return;
        try {
          controller.enqueue(bytes);
        } catch {
          closed = true;
          cleanup();
        }
      };

      // First byte immediately so CloudFront's 60s origin-read timeout cannot
      // kill a long-silent run before its first event (same lesson as llm.ts).
      safeEnqueue(encoder.encode(": keepalive\n\n"));
      keepalive = setInterval(
        () => safeEnqueue(encoder.encode(": keepalive\n\n")),
        KEEPALIVE_MS,
      );

      const deliver = (event: RunEvent): void => {
        if (closed) return;
        if (event.seq < from || event.seq <= lastSeq) return;
        lastSeq = event.seq;
        safeEnqueue(encoder.encode(encodeRunEventFrame(event)));
        if (isTerminalEvent(event)) close();
      };

      // Subscribe before replay so live events that land during the read are
      // buffered rather than lost; dedupe by seq when draining.
      const pending: RunEvent[] = [];
      let live = false;
      unsub = subscribeRunEvents(runId, (event) => {
        if (!live) {
          pending.push(event);
          return;
        }
        deliver(event);
      });

      try {
        const persisted = await readRunEvents(workspaceId, runId, from);
        for (const event of persisted) {
          deliver(event);
          if (closed) return;
        }

        live = true;
        while (pending.length > 0) {
          const event = pending.shift()!;
          deliver(event);
          if (closed) return;
        }

        // Terminal run with nothing left to wait for: close after a final
        // catch-up read in case the terminal event raced the subscribe.
        if (!closed) {
          const current = await readNativeAgentRun(workspaceId, runId);
          if (current && TERMINAL_STATUSES.has(current.status)) {
            const more = await readRunEvents(workspaceId, runId, lastSeq + 1);
            for (const event of more) {
              deliver(event);
              if (closed) return;
            }
            if (!closed) close();
          }
        }
      } catch {
        close();
      }
    },
    cancel() {
      // Client disconnect tears down this tap only — the run keeps going.
      closed = true;
      cleanup();
    },
  });
}

agentChatRouter.get("/runs/:id/stream", async (c) => {
  const workspaceId = c.get("principal").workspaceId;
  const runId = c.req.param("id") ?? "";
  const fromRaw = c.req.query("from");
  const from =
    fromRaw === undefined || fromRaw === "" ? 0 : Number(fromRaw);
  if (!Number.isInteger(from) || from < 0) {
    return c.json({ error: "from must be a non-negative integer" }, 400);
  }

  const run = await readNativeAgentRun(workspaceId, runId);
  if (!run) {
    return c.json({ error: `Unknown agent run: ${runId}` }, 404);
  }

  return c.newResponse(createRunEventStream(workspaceId, runId, from), 200, {
    ...SSE_HEADERS,
  });
});

agentChatRouter.post("/chat-turn", async (c) => {
  const principal = c.get("principal");
  const workspaceId = principal.workspaceId;
  const userId = principal.sub;

  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Expected JSON body" }, 400);
  }
  const parsed = chatTurnRequestSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.message }, 400);
  }
  const req = parsed.data;

  // Stream 7 owns self-heal cap enforcement; reserve the 429 shape only.
  if (req.origin === "self-heal") {
    // Cap check lands in stream 7 — until then, heal turns proceed like chat.
    void SELF_HEAL_CAP_EXCEEDED;
  }

  let session: ChatSessionRecord;
  try {
    if (req.sessionId) {
      session = await requireSession(workspaceId, req.sessionId);
    } else {
      session = await createSession(workspaceId, userId, {
        mode: "staged",
        title: seedTitleFromText(req.text),
      });
    }
  } catch (err) {
    if (err instanceof ServiceError) {
      return c.json({ error: err.message }, err.status as 400);
    }
    throw err;
  }

  if (session.status === "merged" || session.status === "closed") {
    return c.json({ error: "Session is read-only" }, 409);
  }

  const messageId = crypto.randomUUID();
  const contextFiles = req.contextFiles ?? [];
  const userContent = formatContextFilesPrefix(contextFiles) + req.text;

  // Server-owned transcript write (see file header). Idempotent per message id.
  const prior = await readMessages(workspaceId, session.id);
  await appendMessages(workspaceId, session.id, [
    {
      id: messageId,
      role: "user",
      parts: [{ type: "text", text: req.text }],
    },
  ]);

  let profile;
  if (session.agent) {
    profile = await readAgentProfile(workspaceId, session.agent);
    if (!profile) {
      return c.json({ error: `Unknown agent: ${session.agent}` }, 404);
    }
  } else {
    profile = buildEphemeralChatProfile({
      userId,
      ...(req.provider ? { provider: req.provider } : {}),
      ...(req.model ? { model: req.model } : {}),
    });
  }

  const input = [
    ...historyToInputMessages(prior),
    { role: "user" as const, content: userContent },
  ];

  const origin = req.origin === "self-heal" ? "self-heal" : "chat";
  const ctx = { workspaceId, userId };

  let runId: string;
  let done: Promise<{ id: string; status: string; output?: string }>;
  try {
    const started = await startChatAgentRun(
      ctx,
      profile,
      { input },
      { origin, sessionId: session.id },
    );
    runId = started.runId;
    done = started.done;
  } catch (err) {
    if (err instanceof ServiceError) {
      return c.json({ error: err.message }, err.status as 400);
    }
    throw err;
  }

  await setSessionActiveRun(workspaceId, session.id, runId);

  // Clear activeRunId + append assistant transcript when the run finishes.
  void done
    .then(async (run) => {
      const output = typeof run.output === "string" ? run.output : "";
      if (output) {
        await appendMessages(workspaceId, session.id, [
          {
            id: `assistant-${run.id}`,
            role: "assistant",
            parts: [{ type: "text", text: output }],
          },
        ]);
      }
      await setSessionActiveRun(workspaceId, session.id, null, {
        onlyIfRunId: run.id,
      });
    })
    .catch(async () => {
      await setSessionActiveRun(workspaceId, session.id, null, {
        onlyIfRunId: runId,
      }).catch(() => undefined);
    });

  const response: ChatTurnResponse = {
    runId,
    sessionId: session.id,
    streamUrl: runStreamPath(runId, 0),
  };
  return c.json(response);
});
