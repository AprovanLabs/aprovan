/**
 * Session streaming routes on the tools surface.
 *
 * Wire (under `/tools`):
 *   POST /:ns/:proc          → SessionManager.open when the op is registered
 *   GET  /:ns/sessions/:id   → text/event-stream of SessionEvent
 *   POST /:ns/sessions/:id/push  → 202 empty
 *   POST /:ns/sessions/:id/close → { data: terminal result }
 *
 * Drivers are registered per namespace/operation until a real session contract
 * (e.g. stt) ships and wires its provider module here.
 */

import {
  SessionError,
  SessionManager,
  type OpenSessionResult,
  type SessionEvent,
  type StreamingCapabilities,
  type StreamingSessionDriver,
} from "@utdk/common/streaming";
import type { Context, Hono } from "hono";
import { rateLimitByUserId } from "../middleware/rateLimitMiddleware.js";

// ---------------------------------------------------------------------------
// Registry + manager
// ---------------------------------------------------------------------------

type SessionOpKey = `${string}/${string}`;

interface SessionOpRegistration {
  driver: StreamingSessionDriver;
}

const registrations = new Map<SessionOpKey, SessionOpRegistration>();

/** Interfaces whose contract declares at least one session-mode operation. */
const sessionInterfaces = new Set<string>();

/** Per-provider streaming descriptors for bind-time checks (D4). */
const providerCapabilities = new Map<string, StreamingCapabilities>();

let manager: SessionManager | null = null;

function opKey(namespace: string, operation: string): SessionOpKey {
  return `${namespace}/${operation}`;
}

/** Process-local session manager (node-local sessions; D5). */
export function getSessionManager(): SessionManager {
  manager ??= new SessionManager();
  return manager;
}

/** True when POST /tools/:ns/:proc should open a session instead of dispatching. */
export function isSessionOperation(namespace: string, operation: string): boolean {
  return registrations.has(opKey(namespace, operation));
}

export function getSessionDriver(
  namespace: string,
  operation: string,
): StreamingSessionDriver | undefined {
  return registrations.get(opKey(namespace, operation))?.driver;
}

/**
 * Register a session-mode operation. Tests and future contract wiring use this
 * seam; discovery still comes from each tool entry's `streaming: "session"`.
 * Also marks the namespace as requiring streaming at bind time.
 */
export function registerSessionOperation(
  namespace: string,
  operation: string,
  driver: StreamingSessionDriver,
): void {
  registrations.set(opKey(namespace, operation), { driver });
  sessionInterfaces.add(namespace);
}

/**
 * Declare that a contract exposes session operations (bind-time D4) without
 * registering a driver yet — used when discovery knows the mode before a
 * provider module is wired.
 */
export function registerSessionInterface(interfaceId: string): void {
  sessionInterfaces.add(interfaceId);
}

/** Record a provider's streaming capability descriptor for bind-time checks. */
export function registerProviderStreamingCapabilities(
  provider: string,
  capabilities: StreamingCapabilities,
): void {
  providerCapabilities.set(provider, capabilities);
}

export function getProviderStreamingCapabilities(
  provider: string,
): StreamingCapabilities | undefined {
  return providerCapabilities.get(provider);
}

/** True when the interface/contract declares any session-mode operation. */
export function interfaceRequiresStreaming(interfaceId: string): boolean {
  if (sessionInterfaces.has(interfaceId)) return true;
  for (const key of registrations.keys()) {
    if (key.startsWith(`${interfaceId}/`)) return true;
  }
  return false;
}

/**
 * Bind-time D4: reject a provider that does not advertise streaming when the
 * target contract declares session operations. Fail here, not at call time.
 */
export function assertStreamingBindAllowed(interfaceId: string, provider: string): void {
  if (!interfaceRequiresStreaming(interfaceId)) return;
  const capabilities = getProviderStreamingCapabilities(provider);
  if (capabilities?.streaming === true) return;
  throw new SessionError(
    "streaming-unsupported",
    `${provider} does not support "streaming"`,
  );
}

/** Drop manager + registrations (tests). */
export function resetSessionStreaming(): void {
  manager = null;
  registrations.clear();
  sessionInterfaces.clear();
  providerCapabilities.clear();
}

/** Inject a manager (tests: fake clock / mintId). */
export function setSessionManager(next: SessionManager): void {
  manager = next;
}

// ---------------------------------------------------------------------------
// Open / error helpers
// ---------------------------------------------------------------------------

export async function openStreamingSession(
  namespace: string,
  operation: string,
  principal: string,
  args: Record<string, unknown>,
): Promise<OpenSessionResult> {
  const driver = getSessionDriver(namespace, operation);
  if (!driver) {
    throw new SessionError(
      "session-not-found",
      `no session driver registered for ${namespace}.${operation}`,
    );
  }
  return getSessionManager().open(driver, principal, args);
}

export function sessionErrorResponse(c: Context, err: unknown): Response | null {
  if (!(err instanceof SessionError)) return null;
  return c.json({ error: err.message, code: err.code }, err.status as 400);
}

// ---------------------------------------------------------------------------
// SSE channel
// ---------------------------------------------------------------------------

function sseStreamForSession(
  sessionId: string,
  principal: string,
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let unsubscribe: (() => void) | null = null;

  return new ReadableStream<Uint8Array>({
    start(controller) {
      const sink = (event: SessionEvent) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        } catch {
          unsubscribe?.();
          unsubscribe = null;
          return;
        }
        if (event.type === "end") {
          unsubscribe?.();
          unsubscribe = null;
          try {
            controller.close();
          } catch {
            // Already closed.
          }
        }
      };

      try {
        unsubscribe = getSessionManager().subscribe(sessionId, principal, sink);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "error", seq: -1, data: { message } })}\n\n`,
          ),
        );
        controller.close();
      }
    },
    cancel() {
      unsubscribe?.();
      unsubscribe = null;
    },
  });
}

// ---------------------------------------------------------------------------
// Route mount (must run before POST /:provider/:operation{.*})
// ---------------------------------------------------------------------------

/**
 * Mount session event / push / close routes on the tools router.
 * Call before the catch-all procedure POST so `sessions/...` is not eaten.
 * Pass the existing `SSE_HEADERS` from tools.ts (do not mint a second set).
 */
export function mountSessionRoutes(
  router: Hono,
  sseHeaders: Record<string, string>,
): void {
  router.get("/:provider/sessions/:sessionId", async (c) => {
    const principal = c.get("principal").sub;
    const sessionId = c.req.param("sessionId");
    if (!sessionId) return c.json({ error: "Missing sessionId", code: "session-not-found" }, 404);
    try {
      // Ownership / existence check before opening the SSE body.
      const unsub = getSessionManager().subscribe(sessionId, principal, () => {});
      unsub();
    } catch (err) {
      const mapped = sessionErrorResponse(c, err);
      if (mapped) return mapped;
      throw err;
    }
    return c.newResponse(sseStreamForSession(sessionId, principal), 200, {
      ...sseHeaders,
    });
  });

  router.post("/:provider/sessions/:sessionId/push", rateLimitByUserId, async (c) => {
    const principal = c.get("principal").sub;
    const sessionId = c.req.param("sessionId");
    if (!sessionId) return c.json({ error: "Missing sessionId", code: "session-not-found" }, 404);
    let body: { message?: unknown };
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "Expected { message }" }, 400);
    }
    if (
      !body.message ||
      typeof body.message !== "object" ||
      Array.isArray(body.message)
    ) {
      return c.json({ error: "message must be an object" }, 400);
    }
    try {
      await getSessionManager().push(
        sessionId,
        principal,
        body.message as Record<string, unknown>,
      );
      return c.body(null, 202);
    } catch (err) {
      const mapped = sessionErrorResponse(c, err);
      if (mapped) return mapped;
      throw err;
    }
  });

  router.post("/:provider/sessions/:sessionId/close", rateLimitByUserId, async (c) => {
    const principal = c.get("principal").sub;
    const sessionId = c.req.param("sessionId");
    if (!sessionId) return c.json({ error: "Missing sessionId", code: "session-not-found" }, 404);
    try {
      const data = await getSessionManager().close(sessionId, principal);
      return c.json({ data });
    } catch (err) {
      const mapped = sessionErrorResponse(c, err);
      if (mapped) return mapped;
      throw err;
    }
  });
}
