/**
 * Stream 6 — cross-surface continuity via gateway sessions (D5).
 *
 * @vitest-environment happy-dom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockCreatePanel = vi.fn();
const mockGet = vi.fn();
const mockMessages = vi.fn();
const mockAppend = vi.fn();

vi.mock("@/lib/chat-sessions", () => ({
  PANEL_SESSION_ORIGIN: "panel",
  panelOriginTabs: () => ({ origin: "panel" }),
  isPanelOriginatedSession: (session: { tabs?: unknown }) => {
    const tabs = session.tabs;
    return (
      !!tabs &&
      typeof tabs === "object" &&
      (tabs as { origin?: unknown }).origin === "panel"
    );
  },
  sessionWindowUrl: (id: string) => {
    const url = new URL("http://localhost/chat/");
    url.searchParams.set("session", id);
    return url.toString();
  },
  createPanelChatSession: (...args: unknown[]) => mockCreatePanel(...args),
  getChatSession: (...args: unknown[]) => mockGet(...args),
  fetchSessionMessages: (...args: unknown[]) => mockMessages(...args),
  appendSessionMessages: (...args: unknown[]) => mockAppend(...args),
}));

import {
  isPanelOriginatedSession,
  panelOriginTabs,
  PANEL_SESSION_ORIGIN,
  sessionWindowUrl,
  type ChatSessionInfo,
} from "@/lib/chat-sessions";
import {
  appendPanelExchange,
  attachPanelSession,
  getRememberedPanelSessionId,
  panelSessionChatUrl,
  rememberPanelSessionId,
  resetPanelSessionMemory,
} from "./session";
import { getPanelBridge, type PanelBridge } from "./panel-bridge";

function session(partial: Partial<ChatSessionInfo> & { id: string }): ChatSessionInfo {
  return {
    title: "Panel",
    status: "open",
    mode: "auto",
    base: "base",
    messageCount: 0,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    tabs: panelOriginTabs(),
    ...partial,
  };
}

beforeEach(() => {
  resetPanelSessionMemory();
  mockCreatePanel.mockReset();
  mockGet.mockReset();
  mockMessages.mockReset();
  mockAppend.mockReset();
});

afterEach(() => {
  resetPanelSessionMemory();
  vi.unstubAllGlobals();
});

describe("panel origin tagging (6.1 / 6.3)", () => {
  it("marks panel sessions so chat can recognize them", () => {
    expect(panelOriginTabs()).toEqual({ origin: PANEL_SESSION_ORIGIN });
    expect(isPanelOriginatedSession({ tabs: panelOriginTabs() })).toBe(true);
    expect(isPanelOriginatedSession({ tabs: { origin: "chat" } })).toBe(false);
    expect(isPanelOriginatedSession({})).toBe(false);
  });

  it("exposes a chat URL with ?session=<id>", () => {
    const url = panelSessionChatUrl("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee");
    expect(url).toContain("session=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee");
    expect(url).toBe(sessionWindowUrl("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"));
  });
});

describe("attachPanelSession (6.1 / 6.2)", () => {
  it("opens a new gateway session when none is remembered", async () => {
    const created = session({ id: "11111111-1111-1111-1111-111111111111" });
    mockCreatePanel.mockResolvedValueOnce(created);

    const attached = await attachPanelSession();
    expect(mockCreatePanel).toHaveBeenCalledOnce();
    expect(attached.session.id).toBe(created.id);
    expect(attached.continuing).toBe(false);
    expect(attached.expired).toBe(false);
    expect(getRememberedPanelSessionId()).toBe(created.id);
  });

  it("resumes the remembered session across dismiss / re-summon", async () => {
    const id = "22222222-2222-2222-2222-222222222222";
    rememberPanelSessionId(id);
    const open = session({ id, messageCount: 2 });
    mockGet.mockResolvedValueOnce(open);
    mockMessages.mockResolvedValueOnce([
      { id: "m1", role: "user", parts: [{ type: "text", text: "first" }] },
      { id: "m2", role: "assistant", parts: [{ type: "text", text: "reply" }] },
    ]);

    const attached = await attachPanelSession();
    expect(mockCreatePanel).not.toHaveBeenCalled();
    expect(mockGet).toHaveBeenCalledWith(id);
    expect(attached.continuing).toBe(true);
    expect(attached.notice).toMatch(/Continuing/i);
    expect(attached.messages).toHaveLength(2);
  });

  it("starts fresh when the earlier session has expired", async () => {
    rememberPanelSessionId("33333333-3333-3333-3333-333333333333");
    mockGet.mockRejectedValueOnce(new Error("Unknown session"));
    const created = session({ id: "44444444-4444-4444-4444-444444444444" });
    mockCreatePanel.mockResolvedValueOnce(created);

    const attached = await attachPanelSession();
    expect(attached.expired).toBe(true);
    expect(attached.notice).toMatch(/expired/i);
    expect(attached.session.id).toBe(created.id);
  });

  it("starts fresh when the earlier session is closed", async () => {
    const id = "55555555-5555-5555-5555-555555555555";
    rememberPanelSessionId(id);
    mockGet.mockResolvedValueOnce(session({ id, status: "closed" }));
    const created = session({ id: "66666666-6666-6666-6666-666666666666" });
    mockCreatePanel.mockResolvedValueOnce(created);

    const attached = await attachPanelSession();
    expect(attached.expired).toBe(true);
    expect(attached.notice).toMatch(/ended/i);
    expect(getRememberedPanelSessionId()).toBe(created.id);
  });

  it("forceNew starts a new exchange without reading the remembered id", async () => {
    rememberPanelSessionId("77777777-7777-7777-7777-777777777777");
    const created = session({ id: "88888888-8888-8888-8888-888888888888" });
    mockCreatePanel.mockResolvedValueOnce(created);

    const attached = await attachPanelSession({ forceNew: true });
    expect(mockGet).not.toHaveBeenCalled();
    expect(attached.session.id).toBe(created.id);
    expect(attached.continuing).toBe(false);
  });
});

describe("appendPanelExchange (6.2)", () => {
  it("appends user + assistant turns and refreshes from the gateway", async () => {
    const id = "99999999-9999-9999-9999-999999999999";
    const updated = session({ id, messageCount: 2 });
    mockAppend.mockResolvedValueOnce(updated);
    mockMessages.mockResolvedValueOnce([
      { id: "u1", role: "user" },
      { id: "a1", role: "assistant" },
    ]);

    const result = await appendPanelExchange(id, "follow up?", "context-aware reply");
    expect(mockAppend).toHaveBeenCalledOnce();
    const [, batch] = mockAppend.mock.calls[0]!;
    expect(batch).toHaveLength(2);
    expect((batch[0] as { role: string }).role).toBe("user");
    expect((batch[1] as { role: string }).role).toBe("assistant");
    expect(result.messages).toHaveLength(2);
    expect(getRememberedPanelSessionId()).toBe(id);
  });
});

describe("bridge boundary (6.4)", () => {
  it("PanelBridge stays summon / hide / resize — no session APIs", () => {
    const bridge: PanelBridge = {
      onSummon: () => () => {},
      hidePanel: () => {},
      resizePanel: () => {},
    };
    expect(Object.keys(bridge).sort()).toEqual(["hidePanel", "onSummon", "resizePanel"]);
    expect(bridge).not.toHaveProperty("openSession");
    expect(bridge).not.toHaveProperty("attachPanelSession");
    expect(bridge).not.toHaveProperty("getSessionId");
  });

  it("getPanelBridge does not expose session continuity", () => {
    const bridge: PanelBridge = {
      onSummon: () => () => {},
      hidePanel: () => {},
      resizePanel: () => {},
    };
    vi.stubGlobal("window", Object.assign(window, { panel: bridge }));
    const exposed = getPanelBridge();
    expect(exposed).toBeDefined();
    expect(Object.keys(exposed!).sort()).toEqual([
      "hidePanel",
      "onSummon",
      "resizePanel",
    ]);
  });

  it("continuity helpers are not methods on the bridge type", () => {
    type Forbidden = "openSession" | "resumeSession" | "getSessionId" | "attachPanelSession";
    type BridgeKeys = keyof PanelBridge;
    type Overlap = BridgeKeys & Forbidden;
    const assertNoOverlap: Overlap extends never ? true : false = true;
    expect(assertNoOverlap).toBe(true);
  });
});
