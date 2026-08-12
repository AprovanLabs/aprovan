/**
 * Agent chat HTTP surface (iw9-d).
 *
 * Stream 3: `GET /runs/:id/stream?from=<seq>` — SSE replay of persisted run
 * events then live tail until terminal. Stream 5 will add `POST /chat-turn`
 * to this same router.
 *
 * Disconnect never cancels a run; only `agents.cancel` does.
 */

import {
  encodeRunEventFrame,
  type RunEvent,
} from "@aprovan/agent-protocol";
import { Hono } from "hono";
import { readNativeAgentRun } from "../agents/runner.js";
import { readRunEvents, subscribeRunEvents } from "../agents/run-events.js";
import { requireAuth } from "../middleware/auth.js";

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
