/**
 * Floating-panel ↔ chat continuity (voice stream 6 / D5).
 *
 * Panel and chat are separate renderer realms with separate bridges. Shared
 * conversation state lives only in a gateway session addressed by id — never
 * on `PanelBridge`, never over IPC between bridges.
 *
 * Dismiss keeps the warm window; re-summon re-attaches by id via the gateway
 * (resume). Explicit "New" starts a fresh gateway session.
 */

import {
  appendSessionMessages,
  createPanelChatSession,
  fetchSessionMessages,
  getChatSession,
  isPanelOriginatedSession,
  sessionWindowUrl,
  type ChatSessionInfo,
} from "@/lib/chat-sessions";

/** Panel-local pointer only — the transcript itself is always gateway-owned. */
let rememberedSessionId: string | null = null;

export function getRememberedPanelSessionId(): string | null {
  return rememberedSessionId;
}

export function rememberPanelSessionId(id: string | null): void {
  rememberedSessionId = id;
}

/** Reset module state (tests). */
export function resetPanelSessionMemory(): void {
  rememberedSessionId = null;
}

export type PanelSessionAttach = {
  session: ChatSessionInfo;
  messages: unknown[];
  /** True when resuming an existing open session after dismiss / prior ask. */
  continuing: boolean;
  /** True when the remembered session was gone/closed and a new one was opened. */
  expired: boolean;
  notice: string | null;
};

export type AttachPanelSessionOptions = {
  /** Prefer this id (e.g. after an ask). Defaults to the remembered id. */
  preferredId?: string | null;
  /** Force a fresh gateway session (UX "start a new one"). */
  forceNew?: boolean;
};

async function openFresh(notice: string | null, expired: boolean): Promise<PanelSessionAttach> {
  const session = await createPanelChatSession();
  rememberPanelSessionId(session.id);
  return {
    session,
    messages: [],
    continuing: false,
    expired,
    notice,
  };
}

/**
 * Open or resume the panel's gateway session. Source of truth is always the
 * gateway — this only remembers an id for the warm panel window.
 */
export async function attachPanelSession(
  options: AttachPanelSessionOptions = {},
): Promise<PanelSessionAttach> {
  if (options.forceNew) {
    return openFresh(null, false);
  }

  const candidateId =
    options.preferredId !== undefined ? options.preferredId : rememberedSessionId;
  if (!candidateId) {
    return openFresh(null, false);
  }

  try {
    const session = await getChatSession(candidateId);
    if (session.status !== "open") {
      return openFresh("Earlier session ended — starting a new exchange.", true);
    }
    const messages = await fetchSessionMessages(session.id);
    rememberPanelSessionId(session.id);
    return {
      session,
      messages,
      continuing: messages.length > 0,
      expired: false,
      notice: messages.length > 0 ? "Continuing previous exchange" : null,
    };
  } catch {
    return openFresh("Earlier session expired — starting a new exchange.", true);
  }
}

/** Append a user turn (and optional assistant reply) to the gateway transcript. */
export async function appendPanelExchange(
  sessionId: string,
  userText: string,
  assistantText?: string,
): Promise<{ session: ChatSessionInfo; messages: unknown[] }> {
  const userId = crypto.randomUUID();
  const batch: unknown[] = [
    {
      id: userId,
      role: "user",
      parts: [{ type: "text", text: userText }],
    },
  ];
  if (assistantText !== undefined) {
    batch.push({
      id: crypto.randomUUID(),
      role: "assistant",
      parts: [{ type: "text", text: assistantText }],
    });
  }
  const session = await appendSessionMessages(sessionId, batch);
  rememberPanelSessionId(session.id);
  const messages = await fetchSessionMessages(session.id);
  return { session, messages };
}

/** URL that opens this panel session in the chat surface (`?session=`). */
export function panelSessionChatUrl(sessionId: string): string {
  return sessionWindowUrl(sessionId);
}

export { isPanelOriginatedSession };
