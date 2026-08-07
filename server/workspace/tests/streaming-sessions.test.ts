/**
 * Integration tests for streaming session routes on the tools surface
 * (openspec utdk-streaming-sessions §3 / specs Session lifecycle + ownership).
 *
 * Path: tests/ (vitest include) rather than src/__tests__ so the verify command runs.
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { SessionEvent, StreamingSessionDriver } from "@utdk/common/streaming";
import { createApp } from "../src/app.js";
import { resetIdentityStore } from "../src/identity/store.js";
import {
  resetCognitoVerifier,
  setCognitoVerifier,
} from "../src/middleware/auth.js";
import { putMembership } from "../src/memberships.js";
import {
  registerSessionOperation,
  resetSessionStreaming,
} from "../src/routes/sessions-streaming.js";
import { setCurrentWorkspace } from "../src/sessions.js";
import { setActiveWorkspaceId } from "../src/users.js";

const NS = "session-test";
const OP = "transcribe";

function createMockDriver(): {
  driver: StreamingSessionDriver;
  emit: (event: Omit<SessionEvent, "seq"> & { seq?: number }) => void;
  pushed: Array<{ id: string; message: Record<string, unknown> }>;
  closed: string[];
} {
  const sinks = new Map<string, (event: SessionEvent) => void>();
  const pushed: Array<{ id: string; message: Record<string, unknown> }> = [];
  const closed: string[] = [];
  let n = 0;

  const driver: StreamingSessionDriver = {
    capabilities: { streaming: true, encodings: ["json"] },
    async openSession() {
      return { providerSessionId: `prov-${++n}` };
    },
    async push(providerSessionId, message) {
      pushed.push({ id: providerSessionId, message });
    },
    async close(providerSessionId) {
      closed.push(providerSessionId);
      return { transcript: "done", providerSessionId };
    },
    subscribe(providerSessionId, sink) {
      sinks.set(providerSessionId, sink);
      return () => {
        sinks.delete(providerSessionId);
      };
    },
  };

  return {
    driver,
    emit(event) {
      for (const sink of sinks.values()) {
        sink({ type: event.type, seq: event.seq ?? 0, data: event.data });
      }
    },
    pushed,
    closed,
  };
}

function app() {
  return createApp();
}

async function openSession(
  args: Record<string, unknown> = {},
  headers: HeadersInit = {},
): Promise<Response> {
  return app().request(`/tools/${NS}/${OP}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify({ args }),
  });
}

/** Read SSE `data:` JSON lines until `count` events or the stream ends. */
async function readSseEvents(
  response: Response,
  count: number,
  timeoutMs = 2_000,
): Promise<SessionEvent[]> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  const events: SessionEvent[] = [];
  let buffer = "";
  const deadline = Date.now() + timeoutMs;

  while (events.length < count && Date.now() < deadline) {
    const remaining = deadline - Date.now();
    const timed = await Promise.race([
      reader.read().then((r) => ({ kind: "read" as const, r })),
      new Promise<{ kind: "timeout" }>((resolve) =>
        setTimeout(() => resolve({ kind: "timeout" }), Math.max(1, remaining)),
      ),
    ]);
    if (timed.kind === "timeout") break;
    const { value, done } = timed.r;
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";
    for (const part of parts) {
      const line = part.split("\n").find((l) => l.startsWith("data: "));
      if (!line) continue;
      events.push(JSON.parse(line.slice(6)) as SessionEvent);
      if (events.length >= count) break;
    }
  }
  try {
    await reader.cancel();
  } catch {
    // ignore
  }
  return events;
}

describe("streaming session routes — lifecycle", () => {
  let mock: ReturnType<typeof createMockDriver>;

  beforeEach(() => {
    resetSessionStreaming();
    mock = createMockDriver();
    registerSessionOperation(NS, OP, mock.driver);
  });

  afterEach(() => {
    resetSessionStreaming();
  });

  it("opens a session with id and capabilities (state active)", async () => {
    const res = await openSession({ lang: "en" });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      data: {
        sessionId: string;
        capabilities: { streaming: boolean; encodings: string[] };
      };
    };
    expect(body.data.sessionId).toEqual(expect.any(String));
    expect(body.data.capabilities).toEqual({ streaming: true, encodings: ["json"] });
  });

  it("delivers events on the SSE channel without intervening pushes", async () => {
    const opened = await openSession();
    const { sessionId } = ((await opened.json()) as { data: { sessionId: string } }).data;

    const sse = await app().request(`/tools/${NS}/sessions/${sessionId}`);
    expect(sse.status).toBe(200);
    expect(sse.headers.get("content-type")).toContain("text/event-stream");
    expect(sse.headers.get("cache-control")).toContain("no-cache");

    const eventsPromise = readSseEvents(sse, 2);
    await new Promise((r) => setTimeout(r, 20));
    mock.emit({ type: "partial", data: { text: "hel" } });
    mock.emit({ type: "partial", data: { text: "hello" } });

    const events = await eventsPromise;
    expect(events).toEqual([
      { type: "partial", seq: 0, data: { text: "hel" } },
      { type: "partial", seq: 1, data: { text: "hello" } },
    ]);
  });

  it("accepts push with 202 empty body and delivers to the driver", async () => {
    const opened = await openSession();
    const { sessionId } = ((await opened.json()) as { data: { sessionId: string } }).data;

    const push = await app().request(`/tools/${NS}/sessions/${sessionId}/push`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: { chunk: "abc", encoding: "base64" } }),
    });
    expect(push.status).toBe(202);
    expect(await push.text()).toBe("");
    expect(mock.pushed).toEqual([
      { id: "prov-1", message: { chunk: "abc", encoding: "base64" } },
    ]);
  });

  it("close returns terminal result, emits end frame, and rejects later push", async () => {
    const opened = await openSession();
    const { sessionId } = ((await opened.json()) as { data: { sessionId: string } }).data;

    const sse = await app().request(`/tools/${NS}/sessions/${sessionId}`);
    expect(sse.status).toBe(200);
    const eventsPromise = readSseEvents(sse, 1);
    await new Promise((r) => setTimeout(r, 20));

    const close = await app().request(`/tools/${NS}/sessions/${sessionId}/close`, {
      method: "POST",
    });
    expect(close.status).toBe(200);
    expect(await close.json()).toEqual({
      data: { transcript: "done", providerSessionId: "prov-1" },
    });
    expect(mock.closed).toEqual(["prov-1"]);

    const events = await eventsPromise;
    expect(events.some((e) => e.type === "end")).toBe(true);

    const push = await app().request(`/tools/${NS}/sessions/${sessionId}/push`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: { chunk: "late" } }),
    });
    expect(push.status).toBe(409);
    const err = (await push.json()) as { code: string };
    expect(["session-not-found", "session-expired"]).toContain(err.code);
  });

  it("leaves non-session operations on the existing dispatch path", async () => {
    const res = await app().request(`/tools/${NS}/oneshot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ args: {} }),
    });
    expect(res.status).not.toBe(200);
    const body = (await res.json()) as { data?: { sessionId?: string } };
    expect(body.data?.sessionId).toBeUndefined();
  });
});

describe("streaming session routes — ownership", () => {
  const ALICE = "alice-token";
  const BOB = "bob-token";
  const WS = "local";

  beforeEach(async () => {
    resetSessionStreaming();
    registerSessionOperation(NS, OP, createMockDriver().driver);

    process.env["OIDC_ISSUER"] =
      "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_sessions";
    process.env["OIDCAUDIENCE"] = "sessions-test-client";
    resetIdentityStore();
    setCognitoVerifier({
      async verify(token: string) {
        if (token === ALICE) return { sub: "alice" };
        if (token === BOB) return { sub: "bob" };
        throw new Error("invalid_token");
      },
      async hydrate() {},
    });
    await putMembership({ workspaceId: WS, userId: "alice", role: "admin" });
    await putMembership({ workspaceId: WS, userId: "bob", role: "admin" });
    await setCurrentWorkspace("alice", WS);
    await setCurrentWorkspace("bob", WS);
    await setActiveWorkspaceId("alice", WS);
    await setActiveWorkspaceId("bob", WS);
  });

  afterEach(() => {
    delete process.env["OIDC_ISSUER"];
    delete process.env["OIDCAUDIENCE"];
    resetIdentityStore();
    resetCognitoVerifier();
    resetSessionStreaming();
  });

  it("rejects another principal reading the event channel with session-forbidden", async () => {
    const opened = await openSession({}, { Authorization: `Bearer ${ALICE}` });
    expect(opened.status).toBe(200);
    const { sessionId } = ((await opened.json()) as { data: { sessionId: string } }).data;

    const sse = await app().request(`/tools/${NS}/sessions/${sessionId}`, {
      headers: { Authorization: `Bearer ${BOB}` },
    });
    expect(sse.status).toBe(403);
    expect(await sse.json()).toMatchObject({ code: "session-forbidden" });
  });

  it("rejects an unknown session id with session-not-found (not forbidden)", async () => {
    const sse = await app().request(`/tools/${NS}/sessions/does-not-exist`, {
      headers: { Authorization: `Bearer ${ALICE}` },
    });
    expect(sse.status).toBe(404);
    expect(await sse.json()).toMatchObject({ code: "session-not-found" });
  });
});
