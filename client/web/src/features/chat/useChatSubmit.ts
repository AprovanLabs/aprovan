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
  /** Active file the dock is scoped to — carried into the first message. */
  filePath?: string | null;
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
    filePath,
  } = args;

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!input.trim() || !providerConnected || sessionReadOnly) return;
      // Lazy history: the main state has no session record — the first real
      // message creates one (title = the message, refined by the model once
      // the first reply lands). Chat-driven file edits always use a staged
      // overlay (D5) regardless of the target path's write policy.
      if (!activeSession && !pendingCreateRef.current && GATEWAY_BASE) {
        pendingCreateRef.current = true;
        const seedTitle = input.trim().replace(/\s+/g, " ").slice(0, 48);
        createChatSession({ mode: "staged", title: seedTitle })
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
      const text =
        filePath && !input.includes(filePath)
          ? `Regarding \`${filePath}\`:\n\n${input}`
          : input;
      sendMessage({ text });
      setInput("");
      // Sending while the dock is closed would hide the streaming reply —
      // open it so the turn is visible as it lands.
      setChatPanel((prev) => {
        if (prev.open) return prev;
        const next = { ...prev, open: true };
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
      filePath,
    ]
  );

  // The apps pane's empty states funnel here instead of showing dev jargon:
  // "create a workflow" means "describe it to chat" on this surface, so
  // prefill the composer, surface the chat (it may be docked behind an open
  // tab), and let the user finish the sentence.
  const createWorkflowInChat = useCallback(
    (appName?: string) => {
      closeSidebar();
      setChatPanel((prev) => (prev.open ? prev : { ...prev, open: true }));
      setInput(
        appName
          ? `Create a new workflow for the ${appName} app that `
          : "Create a new workflow that "
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [closeSidebar]
  );

  // Your-flows share path: publishing is the only way to make a private flow
  // visible to others — prefill an apps.publish prompt and open the composer.
  const publishFlowInChat = useCallback(
    (workflowName: string) => {
      closeSidebar();
      setChatPanel((prev) => (prev.open ? prev : { ...prev, open: true }));
      setInput(
        workflowName
          ? `Publish an app that exports the workflow "${workflowName}" (apps.publish)`
          : "Publish an app that exports this workflow (apps.publish)"
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [closeSidebar]
  );

  return { handleSubmit, createWorkflowInChat, publishFlowInChat };
}
