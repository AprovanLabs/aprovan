import { useCallback, useEffect, useRef, useState } from "react";
import type { UIMessage } from "ai";
import {
  MAX_WIDGET_AUTOFIXES,
  type WidgetFailure,
} from "@/contexts/widget-error-reporter-context";
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

export function useWidgetSelfHeal(args: {
  messages: UIMessage[];
  status: string;
  sendMessage: (message: { text: string }) => unknown;
  /** Closed/merged sessions are a peek surface — never auto-fix into them. */
  sessionReadOnly: boolean;
  providerConnected: boolean;
  /** Switching (or opening) a session resets the loop. */
  sessionChat: unknown;
}): {
  reportWidgetError: (messageId: string, failure: WidgetFailure) => void;
  armSendWindow: () => void;
} {
  const { messages, status, sendMessage, sessionReadOnly, providerConnected, sessionChat } = args;

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
    if (status !== "ready") return;
    // Only turns produced in this window — never history rendered on load.
    if (!userSentThisWindowRef.current) return;
    if (sessionReadOnly || !providerConnected) return;
    const last = messages[messages.length - 1];
    if (!last || last.role !== "assistant") return;
    const failure = widgetFailuresRef.current.get(last.id);
    if (!failure) return;
    if (autoFixRespondedRef.current.has(last.id)) return;
    if (autoFixChainRef.current >= MAX_WIDGET_AUTOFIXES) return;
    autoFixRespondedRef.current.add(last.id);
    autoFixChainRef.current += 1;
    const target = failure.path ?? "the widget in your last message";
    const digest = failure.path ? recentProblemsDigest(failure.path) : undefined;
    sendMessage({
      text:
        `The widget at ${target} failed to render with:\n` +
        `\`\`\`\n${failure.error}\n\`\`\`\n` +
        (digest ? `Recent runtime problems for it:\n\`\`\`\n${digest}\n\`\`\`\n` : "") +
        `Please fix it — emit a patch fence (or corrected full file) for ${
          failure.path ?? "the widget"
        }.`,
    });
  }, [status, messages, widgetFailureTick, sendMessage, sessionReadOnly, providerConnected]);

  // A real user message arms the self-heal loop for the replies that
  // follow, and resets its consecutive-auto-fix budget.
  const armSendWindow = useCallback(() => {
    userSentThisWindowRef.current = true;
    autoFixChainRef.current = 0;
  }, []);

  return { reportWidgetError, armSendWindow };
}
