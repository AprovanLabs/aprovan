import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { CHAT_PROVIDERS } from "@/components/ProviderPicker";
import { GATEWAY_BASE } from "@/lib/gateway";
import {
  fetchLlmProviders,
  loadModelPreference,
  saveModelPreference,
  type LlmProviderInfo,
} from "@/lib/llm";
import {
  createChatSession,
  saveActiveSessionId,
  type ChatSessionInfo,
} from "@/lib/chat-sessions";
import { saveChatPanelLayout, type ChatPanelLayout } from "./ChatDock";

// Chat rides the gateway's `tools/:provider/createChatCompletion` operation.
// A provider is usable once a credential for it exists in the active
// workspace (the gateway's GET /tools only lists credentialed providers).
export const CHAT_PROVIDER_KEY = "patchwork:chat-provider";

/**
 * Chat provider/model selection: persisted preference, the gateway's
 * connected-provider list (with fall-over to the first connected provider
 * when the stored one has no credential), and the send-time refs the
 * transport reads.
 */
export function useChatProviders() {
  const [chatProvider, setChatProvider] = useState<string>(
    () => localStorage.getItem(CHAT_PROVIDER_KEY) ?? "openai"
  );
  const [chatModel, setChatModel] = useState<string>(() =>
    loadModelPreference(localStorage.getItem(CHAT_PROVIDER_KEY) ?? "openai")
  );
  // Gateway chat provider list (connected state + default models); null while
  // loading or when the gateway is unreachable (static fallback list).
  const [llmProviders, setLlmProviders] = useState<LlmProviderInfo[] | null>(null);
  // Providers with a credential in the active workspace; null until the
  // gateway tool list has loaded (unknown → don't block sending).
  const [connectedProviders, setConnectedProviders] = useState<string[] | null>(null);

  // Read via refs inside prepareSendMessagesRequest so provider/model
  // switches apply to the next send even though useChat holds on to the
  // transport instance.
  const chatProviderRef = useRef(chatProvider);
  chatProviderRef.current = chatProvider;
  const chatModelRef = useRef(chatModel);
  chatModelRef.current = chatModel;

  // Chat provider list — connected flags drive the provider picker. When
  // the stored/default provider has no credential, fall over to the first
  // connected one instead of blocking the composer.
  useEffect(() => {
    void fetchLlmProviders().then((providers) => {
      setLlmProviders(providers);
      if (providers) {
        const connected = providers
          .filter((provider) => provider.connected)
          .map((provider) => provider.id);
        setConnectedProviders(connected);
        setChatProvider((current) => {
          if (connected.length === 0 || connected.includes(current)) return current;
          const fallback = connected[0];
          localStorage.setItem(CHAT_PROVIDER_KEY, fallback);
          setChatModel(loadModelPreference(fallback));
          return fallback;
        });
      }
    });
  }, []);

  const handleProviderChange = useCallback((provider: string) => {
    localStorage.setItem(CHAT_PROVIDER_KEY, provider);
    setChatProvider(provider);
    setChatModel(loadModelPreference(provider));
  }, []);

  const handleModelChange = useCallback(
    (model: string) => {
      saveModelPreference(chatProvider, model);
      setChatModel(model);
    },
    [chatProvider]
  );

  const providerConnected =
    connectedProviders === null || connectedProviders.includes(chatProvider);
  const chatProviderLabel =
    CHAT_PROVIDERS.find((p) => p.id === chatProvider)?.label ?? chatProvider;

  return {
    chatProvider,
    chatModel,
    llmProviders,
    chatProviderRef,
    chatModelRef,
    handleProviderChange,
    handleModelChange,
    providerConnected,
    chatProviderLabel,
  };
}

/** The composer's submit path plus the apps explorer's "create a workflow" funnel. */
export function useChatSubmit(args: {
  input: string;
  setInput: (value: string) => void;
  sendMessage: (message: { text: string }) => unknown;
  providerConnected: boolean;
  sessionReadOnly: boolean;
  activeSession: ChatSessionInfo | null;
  applySession: (session: ChatSessionInfo | null) => void;
  activeWorkspaceId: string | null;
  refreshSessions: () => void;
  /** Guards double-creation while the first send's lazy record is in flight. */
  pendingCreateRef: React.MutableRefObject<boolean>;
  /** Arms the self-heal send window on a real user send. */
  armSendWindow: () => void;
  setChatPanel: Dispatch<SetStateAction<ChatPanelLayout>>;
  closeSidebar: () => void;
}) {
  const {
    input,
    setInput,
    sendMessage,
    providerConnected,
    sessionReadOnly,
    activeSession,
    applySession,
    activeWorkspaceId,
    refreshSessions,
    pendingCreateRef,
    armSendWindow,
    setChatPanel,
    closeSidebar,
  } = args;

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!input.trim() || !providerConnected || sessionReadOnly) return;
      // Lazy history: the main state has no session record — the first real
      // message creates one (title = the message, refined by the model once
      // the first reply lands). The stream starts immediately; the record
      // catches up in parallel and the persistence effect backfills.
      if (!activeSession && !pendingCreateRef.current && GATEWAY_BASE) {
        pendingCreateRef.current = true;
        const seedTitle = input.trim().replace(/\s+/g, " ").slice(0, 48);
        createChatSession({ mode: "auto", title: seedTitle })
          .then((record) => {
            applySession(record);
            saveActiveSessionId(activeWorkspaceId, record.id);
            refreshSessions();
          })
          .catch(() => {})
          .finally(() => {
            pendingCreateRef.current = false;
          });
      }
      // A real user message arms the self-heal loop for the replies that
      // follow, and resets its consecutive-auto-fix budget.
      armSendWindow();
      sendMessage({ text: input });
      setInput("");
      // Sending while the chat is collapsed to a strip would hide the
      // streaming reply entirely — auto-expand so it's visible as it lands.
      setChatPanel((prev) => {
        if (prev.expanded) return prev;
        const next = { ...prev, expanded: true };
        saveChatPanelLayout(next);
        return next;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      input,
      sendMessage,
      providerConnected,
      sessionReadOnly,
      activeSession,
      applySession,
      activeWorkspaceId,
      refreshSessions,
      armSendWindow,
    ]
  );

  // The apps explorer's empty states funnel here instead of showing dev
  // jargon: "create a workflow" means "describe it to chat" on this surface,
  // so prefill the composer, surface the chat (it may be docked behind an
  // open tab), and let the user finish the sentence.
  const createWorkflowInChat = useCallback(
    (appName?: string) => {
      closeSidebar();
      setChatPanel((prev) => (prev.expanded ? prev : { ...prev, expanded: true }));
      setInput(
        appName && appName !== "personal"
          ? `Create a new workflow for the ${appName} app that `
          : "Create a new workflow that "
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [closeSidebar]
  );

  return { handleSubmit, createWorkflowInChat };
}
