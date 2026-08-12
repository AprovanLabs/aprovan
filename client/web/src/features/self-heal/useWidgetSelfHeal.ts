import { useCallback, useEffect, useRef, useState } from "react";
import type { UIMessage } from "ai";
import { readUIMessageStream } from "ai";
import {
  MAX_WIDGET_AUTOFIXES,
  type WidgetFailure,
} from "@/contexts/widget-error-reporter-context";
import { startChatTurnStream } from "@/features/chat/run-transport";
import { loadActiveSessionId } from "@/lib/chat-sessions";
import { ACTIVE_WORKSPACE_KEY } from "@/features/tabs/useTabs";
import { recentProblemsDigest } from "@/lib/telemetry";

// ---------------------------------------------------------------------------
// Widget self-heal state. Failures arrive keyed by the message that rendered
// the widget; the orchestrator effect below turns a failure in the newest
// assistant turn into one fix request.
// Bounds: one auto-fix per assistant message id, at most
// MAX_WIDGET_AUTOFIXES consecutive auto-fixes since the user last typed, and
// nothing at all until the user has sent a message in this window — widgets
// re-rendered from persisted history must never talk to the model.
// ---------------------------------------------------------------------------

/** Compose the heal-turn user text (same copy as the pre-stream-7 prompt). */
export function composeHealText(failure: WidgetFailure): string {
  const target = failure.path ?? "the widget in your last message";
  const digest = failure.path ? recentProblemsDigest(failure.path) : undefined;
  return (
    `The widget at ${target} failed to render with:\n` +
    `\`\`\`\n${failure.error}\n\`\`\`\n` +
    (digest ? `Recent runtime problems for it:\n\`\`\`\n${digest}\n\`\`\`\n` : "") +
    `Please fix it — emit a patch fence (or corrected full file) for ${
      failure.path ?? "the widget"
    }.`
  );
}

/** Resolve the active chat session id for a heal POST (lazy-create path). */
export function resolveHealSessionId(sessionChat: unknown): string | undefined {
  if (typeof window !== "undefined") {
    try {
      const workspaceId = localStorage.getItem(ACTIVE_WORKSPACE_KEY);
      const stored = loadActiveSessionId(workspaceId);
      if (stored) return stored;
    } catch {
      // Best-effort — fall through to Chat id.
    }
  }
  if (sessionChat && typeof sessionChat === "object" && "id" in sessionChat) {
    const id = (sessionChat as { id: unknown }).id;
    if (typeof id === "string" && id.length >= 8) return id;
  }
  return undefined;
}

type ChatLike = {
  id?: string;
  messages: UIMessage[];
};

/**
 * Pure gate used by the orchestrator effect — exported so arming rules can be
 * unit-tested without a DOM. Returns the heal payload when armed, else null.
 */
export function decideWidgetSelfHeal(args: {
  status: string;
  userSentThisWindow: boolean;
  sessionReadOnly: boolean;
  providerConnected: boolean;
  messages: UIMessage[];
  failures: Map<string, WidgetFailure>;
  responded: Set<string>;
  chainCount: number;
}): { messageId: string; failure: WidgetFailure; text: string } | null {
  if (args.status !== "ready") return null;
  // Only turns produced in this window — never history rendered on load.
  if (!args.userSentThisWindow) return null;
  if (args.sessionReadOnly || !args.providerConnected) return null;
  const last = args.messages[args.messages.length - 1];
  if (!last || last.role !== "assistant") return null;
  const failure = args.failures.get(last.id);
  if (!failure) return null;
  if (args.responded.has(last.id)) return null;
  if (args.chainCount >= MAX_WIDGET_AUTOFIXES) return null;
  return { messageId: last.id, failure, text: composeHealText(failure) };
}

export function useWidgetSelfHeal(args: {
  messages: UIMessage[];
  status: string;
  /** Kept for ChatPage API compatibility; heal turns use startChatTurnStream. */
  sendMessage: (message: { text: string }) => unknown;
  /** Closed/merged sessions are a peek surface — never auto-fix into them. */
  sessionReadOnly: boolean;
  providerConnected: boolean;
  /** Switching (or opening) a session resets the loop. */
  sessionChat: unknown;
  /** Test seam — defaults to {@link startChatTurnStream}. */
  startHealTurn?: typeof startChatTurnStream;
}): {
  reportWidgetError: (messageId: string, failure: WidgetFailure) => void;
  armSendWindow: () => void;
} {
  const {
    messages,
    status,
    sessionReadOnly,
    providerConnected,
    sessionChat,
    startHealTurn = startChatTurnStream,
  } = args;
  // sendMessage retained on the args object so ChatPage's call site is unchanged.
  void args.sendMessage;

  const widgetFailuresRef = useRef(new Map<string, WidgetFailure>());
  const autoFixRespondedRef = useRef(new Set<string>());
  const autoFixChainRef = useRef(0);
  const userSentThisWindowRef = useRef(false);
  // Failures land asynchronously (compile + iframe mount), often after the
  // stream has already settled — the tick re-runs the orchestrator then.
  const [widgetFailureTick, setWidgetFailureTick] = useState(0);

  const reportWidgetError = useCallback((messageId: string, failure: WidgetFailure) => {
    // First failure per message wins — one fix request covers the turn.
    if (!widgetFailuresRef.current.has(messageId)) {
      widgetFailuresRef.current.set(messageId, failure);
    }
    setWidgetFailureTick((tick) => tick + 1);
  }, []);

  // Switching (or opening) a session resets the loop.
  useEffect(() => {
    widgetFailuresRef.current.clear();
    autoFixRespondedRef.current.clear();
    autoFixChainRef.current = 0;
    userSentThisWindowRef.current = false;
  }, [sessionChat]);

  // Widget self-heal orchestrator: once the turn settles, if a widget in the
  // newest assistant message failed, send one follow-up asking for a fix.
  useEffect(() => {
    const decision = decideWidgetSelfHeal({
      status,
      userSentThisWindow: userSentThisWindowRef.current,
      sessionReadOnly,
      providerConnected,
      messages,
      failures: widgetFailuresRef.current,
      responded: autoFixRespondedRef.current,
      chainCount: autoFixChainRef.current,
    });
    if (!decision) return;

    autoFixRespondedRef.current.add(decision.messageId);
    autoFixChainRef.current += 1;

    const sessionId = resolveHealSessionId(sessionChat);
    if (!sessionId) return;

    const chat = sessionChat as ChatLike | null;
    void startHealTurn({
      sessionId,
      text: decision.text,
      origin: "self-heal",
      failure: {
        messageId: decision.messageId,
        ...(decision.failure.path ? { path: decision.failure.path } : {}),
        error: decision.failure.error,
      },
    })
      .then(async ({ response, stream }) => {
        // Visible turn: append the heal user row and stream the assistant
        // reply into the live Chat instance (same surface as any other turn).
        if (chat && Array.isArray(chat.messages)) {
          const userMsg: UIMessage = {
            id: crypto.randomUUID(),
            role: "user",
            parts: [{ type: "text", text: decision.text }],
          };
          chat.messages = [...chat.messages, userMsg];
          const assistantId = `assistant-${response.runId}`;
          for await (const msg of readUIMessageStream({
            message: { id: assistantId, role: "assistant", parts: [] },
            stream,
          })) {
            const withoutAssistant = chat.messages.filter((m) => m.id !== assistantId);
            chat.messages = [...withoutAssistant, msg as UIMessage];
          }
        } else {
          // No live Chat — still drain so the fetch/stream completes.
          await stream.pipeTo(new WritableStream({ write() {} })).catch(() => undefined);
        }
      })
      .catch(() => {
        // Cap / budget / network failures stay quiet — the widget error
        // state remains visible and this message id will not auto-retry.
      });
  }, [
    status,
    messages,
    widgetFailureTick,
    sessionReadOnly,
    providerConnected,
    sessionChat,
    startHealTurn,
  ]);

  // A real user message arms the self-heal loop for the replies that
  // follow, and resets its consecutive-auto-fix budget.
  const armSendWindow = useCallback(() => {
    userSentThisWindowRef.current = true;
    autoFixChainRef.current = 0;
  }, []);

  return { reportWidgetError, armSendWindow };
}
