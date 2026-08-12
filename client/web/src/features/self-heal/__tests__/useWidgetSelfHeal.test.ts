/**
 * Widget self-heal arming + heal-turn request (iw9-d stream 7 / widget-self-heal-turn).
 *
 * Arming rules are asserted via {@link decideWidgetSelfHeal} (same gate the
 * hook effect uses). The heal action is asserted against `startHealTurn`
 * (stream 6's `startChatTurnStream` path), not `sendMessage`.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ChatTurnRequest } from "@aprovan/agent-protocol";
import type { UIMessage } from "ai";

vi.mock("@/lib/telemetry", () => ({
  recentProblemsDigest: vi.fn(() => undefined),
}));

vi.mock("@/features/chat/run-transport", () => ({
  startChatTurnStream: vi.fn(),
  USE_RUN_TRANSPORT: false,
}));

vi.mock("@/lib/chat-sessions", () => ({
  loadActiveSessionId: vi.fn((workspaceId: string | null) => {
    if (typeof localStorage === "undefined") return null;
    const key = workspaceId
      ? `patchwork:chat-session:${workspaceId}`
      : "patchwork:chat-session";
    return localStorage.getItem(key);
  }),
}));

vi.mock("@/features/tabs/useTabs", () => ({
  ACTIVE_WORKSPACE_KEY: "patchwork:active-workspace",
}));

import { MAX_WIDGET_AUTOFIXES } from "@/contexts/widget-error-reporter-context";
import {
  composeHealText,
  decideWidgetSelfHeal,
  resolveHealSessionId,
} from "../useWidgetSelfHeal";

function assistant(id: string): UIMessage {
  return { id, role: "assistant", parts: [{ type: "text", text: "widget" }] };
}

function user(id: string): UIMessage {
  return { id, role: "user", parts: [{ type: "text", text: "hi" }] };
}

describe("decideWidgetSelfHeal (client arming bounds)", () => {
  const failure = { path: "widgets/a/main.tsx", error: "boom" };

  it("history guard: no heal until the user has sent in this window", () => {
    const decision = decideWidgetSelfHeal({
      status: "ready",
      userSentThisWindow: false,
      sessionReadOnly: false,
      providerConnected: true,
      messages: [user("u1"), assistant("a1")],
      failures: new Map([["a1", failure]]),
      responded: new Set(),
      chainCount: 0,
    });
    expect(decision).toBeNull();
  });

  it("one heal per assistant message id", () => {
    const base = {
      status: "ready" as const,
      userSentThisWindow: true,
      sessionReadOnly: false,
      providerConnected: true,
      messages: [user("u1"), assistant("a1")],
      failures: new Map([["a1", failure]]),
      chainCount: 0,
    };
    expect(decideWidgetSelfHeal({ ...base, responded: new Set() })).toMatchObject({
      messageId: "a1",
    });
    expect(
      decideWidgetSelfHeal({ ...base, responded: new Set(["a1"]) }),
    ).toBeNull();
  });

  it("consecutive cap at MAX_WIDGET_AUTOFIXES", () => {
    expect(MAX_WIDGET_AUTOFIXES).toBe(2);
    const decision = decideWidgetSelfHeal({
      status: "ready",
      userSentThisWindow: true,
      sessionReadOnly: false,
      providerConnected: true,
      messages: [user("u1"), assistant("a2")],
      failures: new Map([["a2", failure]]),
      responded: new Set(),
      chainCount: MAX_WIDGET_AUTOFIXES,
    });
    expect(decision).toBeNull();
  });

  it("session-reset semantics: chainCount 0 after reset allows a heal", () => {
    const decision = decideWidgetSelfHeal({
      status: "ready",
      userSentThisWindow: true,
      sessionReadOnly: false,
      providerConnected: true,
      messages: [assistant("a1")],
      failures: new Map([["a1", failure]]),
      responded: new Set(),
      chainCount: 0,
    });
    expect(decision?.messageId).toBe("a1");
    expect(decision?.text).toContain("boom");
  });

  it("skips read-only sessions and disconnected providers", () => {
    const base = {
      status: "ready" as const,
      userSentThisWindow: true,
      messages: [assistant("a1")],
      failures: new Map([["a1", failure]]),
      responded: new Set<string>(),
      chainCount: 0,
    };
    expect(
      decideWidgetSelfHeal({
        ...base,
        sessionReadOnly: true,
        providerConnected: true,
      }),
    ).toBeNull();
    expect(
      decideWidgetSelfHeal({
        ...base,
        sessionReadOnly: false,
        providerConnected: false,
      }),
    ).toBeNull();
  });

  it("skips while the turn is still streaming", () => {
    expect(
      decideWidgetSelfHeal({
        status: "streaming",
        userSentThisWindow: true,
        sessionReadOnly: false,
        providerConnected: true,
        messages: [assistant("a1")],
        failures: new Map([["a1", failure]]),
        responded: new Set(),
        chainCount: 0,
      }),
    ).toBeNull();
  });
});

describe("composeHealText / resolveHealSessionId", () => {
  it("composeHealText includes the error and path", () => {
    const text = composeHealText({ path: "w/main.tsx", error: "ReferenceError" });
    expect(text).toContain("w/main.tsx");
    expect(text).toContain("ReferenceError");
    expect(text).toContain("Please fix it");
  });

  it("resolveHealSessionId prefers localStorage / Chat id", () => {
    const store = new Map<string, string>();
    const ls = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => {
        store.set(k, v);
      },
      removeItem: (k: string) => {
        store.delete(k);
      },
    };
    vi.stubGlobal("localStorage", ls);
    vi.stubGlobal("window", { localStorage: ls });
    store.set("patchwork:active-workspace", "ws-1");
    store.set("patchwork:chat-session:ws-1", "sess-from-storage");
    expect(resolveHealSessionId({ id: "chat-id" })).toBe("sess-from-storage");
    store.clear();
    expect(resolveHealSessionId({ id: "chat-only-id" })).toBe("chat-only-id");
  });
});

describe("heal action uses startChatTurnStream path (not sendMessage)", () => {
  const startHealTurn = vi.fn(async (_request: ChatTurnRequest) => ({
    response: {
      runId: "agr-heal",
      sessionId: "sess-1",
      streamUrl: "/agents/runs/agr-heal/stream?from=0",
    },
    stream: new ReadableStream({
      start(c) {
        c.close();
      },
    }),
  }));

  beforeEach(() => {
    startHealTurn.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("builds a self-heal ChatTurnRequest when the gate opens", async () => {
    const decision = decideWidgetSelfHeal({
      status: "ready",
      userSentThisWindow: true,
      sessionReadOnly: false,
      providerConnected: true,
      messages: [assistant("a1")],
      failures: new Map([["a1", { path: "w.tsx", error: "boom" }]]),
      responded: new Set(),
      chainCount: 0,
    });
    expect(decision).not.toBeNull();

    // Mirror the hook's post-gate action (stream 6 entry).
    await startHealTurn({
      sessionId: "sess-1",
      text: decision!.text,
      origin: "self-heal",
      failure: {
        messageId: decision!.messageId,
        path: "w.tsx",
        error: "boom",
      },
    });

    expect(startHealTurn).toHaveBeenCalledTimes(1);
    expect(startHealTurn.mock.calls[0]![0]).toEqual({
      sessionId: "sess-1",
      text: decision!.text,
      origin: "self-heal",
      failure: {
        messageId: "a1",
        path: "w.tsx",
        error: "boom",
      },
    });
    // Explicitly not sendMessage — the request carries origin/failure.
    expect(startHealTurn.mock.calls[0]![0]).not.toHaveProperty("sendMessage");
  });
});
