import { useChat } from "@ai-sdk/react";
import { AppsCatalogProvider } from "@aprovan/registry-ui/apps-panel";
import "@aprovan/registry-ui/tailor";
import { AppHeader, aprovanApps } from "@aprovan/ui/shell";
import { PanelLeft } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NotificationsBell } from "@/components/NotificationsBell";
import { PanelHostProvider } from "@/components/panels/shell";
import { ServicesMenu } from "@/components/ServicesMenu";
import SessionControls from "@/components/SessionControls";
import { PatchworkCtx, SharedEditSessionCtx, WidgetErrorReporterCtx } from "@/contexts";
import { ChatDock, useChatPanelLayout } from "@/features/chat/ChatDock";
import { useChatTransport, useEditTransport } from "@/features/chat/chat-transport";
import { APROVAN_LOGO } from "@/features/chat/MessageParts";
import { useChatProviders, useChatSubmit } from "@/features/chat/useChatSubmit";
import { EditModalHost } from "@/features/edit-modal/EditModalHost";
import { useWidgetSelfHeal } from "@/features/self-heal/useWidgetSelfHeal";
import { useDraftSync } from "@/features/sessions/useDraftSync";
import { useEditDraft } from "@/features/sessions/useEditDraft";
import { useSessionChatSync } from "@/features/sessions/useSessionChatSync";
import { useSessionOrchestration } from "@/features/sessions/useSessionOrchestration";
import { useWorkspaceExplorer, type ExplorerPageBridge } from "@/features/sidebar/useWorkspaceExplorer";
import { WorkspaceSidebar } from "@/features/sidebar/WorkspaceSidebar";
import { TabContent } from "@/features/tabs/TabContent";
import { TabStrip } from "@/features/tabs/TabStrip";
import { useTabs } from "@/features/tabs/useTabs";
import { loadWorkflowScript, workflowCustomPreview } from "@/features/widgets/ChatWorkflowPreview";
import { NotificationPathWidget } from "@/features/widgets/NotificationPathWidget";
import { useCompilerBootstrap } from "@/features/widgets/useCompilerBootstrap";
import { stashCredentialsPrefill } from "@/lib/credentials";
import { invokeAppsTool, invokeWorkflowsTool } from "@/lib/tools";

/** Composition root: wires the feature hooks together, provides the shared
 *  contexts, and renders the shell layout. No business logic of its own. */
export default function ChatPage() {
  const [input, setInput] = useState("");
  // Workspace tree: static column on md+, off-canvas drawer below md.
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  // Explorer subscriptions arm once on mount but need the tab/session hooks
  // wired below — late-bound through this ref (the old openTabsRef pattern).
  const pageBridgeRef = useRef<ExplorerPageBridge | null>(null);
  const explorer = useWorkspaceExplorer({ bridgeRef: pageBridgeRef });
  const tabs = useTabs({
    activeWorkspaceId: explorer.activeWorkspaceId,
    onWorkspacePathActivated: explorer.setWorkspaceActivePath,
    closeSidebar,
  });

  // Deep-link boot: `?native=credentials|admin&provider=` opens the matching tab once.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const native = params.get("native");
    if (native !== "credentials" && native !== "admin") return;

    const provider = params.get("provider") ?? undefined;
    if (native === "credentials" && provider) stashCredentialsPrefill(provider);
    tabs.openNativeTab(native, provider ? { provider } : undefined);

    params.delete("native");
    params.delete("provider");
    const query = params.toString();
    const next = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", next);
  }, [tabs.openNativeTab]);

  const bootstrap = useCompilerBootstrap({ refreshWorkspace: explorer.refreshWorkspace });
  const providers = useChatProviders();
  const transport = useChatTransport({
    chatProviderRef: providers.chatProviderRef,
    chatModelRef: providers.chatModelRef,
    imagePromptsRef: bootstrap.imagePromptsRef,
    namespaces: bootstrap.namespaces,
    services: bootstrap.services,
  });
  const editTransport = useEditTransport({
    chatProviderRef: providers.chatProviderRef,
    chatModelRef: providers.chatModelRef,
  });

  const session = useSessionOrchestration({
    transport,
    activeWorkspaceId: explorer.activeWorkspaceId,
    refreshWorkspace: explorer.refreshWorkspace,
    openWorkspacePreview: tabs.openWorkspacePreview,
    setInput,
    chatProviderRef: providers.chatProviderRef,
    chatModelRef: providers.chatModelRef,
  });

  const editDraft = useEditDraft({
    activeSessionRef: session.activeSessionRef,
    refreshSessions: session.refreshSessions,
    setSessionNotice: session.setSessionNotice,
    refreshWorkspace: explorer.refreshWorkspace,
    setWorkspaceActivePath: explorer.setWorkspaceActivePath,
    closeSidebar,
  });

  const { messages, sendMessage, status, error, setMessages } = useChat({
    chat: session.sessionChat ?? session.bootChat,
  });

  useSessionChatSync({
    messages,
    status,
    setMessages,
    activeSession: session.activeSession,
    setActiveSession: session.setActiveSession,
    refreshSessions: session.refreshSessions,
    lastPersistedCountRef: session.lastPersistedCountRef,
    namedSessionsRef: session.namedSessionsRef,
    chatProviderRef: providers.chatProviderRef,
    chatModelRef: providers.chatModelRef,
  });

  useDraftSync({
    activeSession: session.activeSession,
    setActiveSession: session.setActiveSession,
    editSessionOpen: editDraft.editSession !== null,
    setSyncState: session.setSyncState,
  });

  const { reportWidgetError, armSendWindow } = useWidgetSelfHeal({
    messages,
    status,
    sendMessage,
    sessionReadOnly: session.sessionReadOnly,
    providerConnected: providers.providerConnected,
    sessionChat: session.sessionChat,
  });

  const layout = useChatPanelLayout();

  const { handleSubmit, createWorkflowInChat, publishFlowInChat } = useChatSubmit({
    input,
    setInput,
    sendMessage,
    providerConnected: providers.providerConnected,
    sessionReadOnly: session.sessionReadOnly,
    activeSession: session.activeSession,
    applySession: session.applySession,
    activeWorkspaceId: explorer.activeWorkspaceId,
    refreshSessions: session.refreshSessions,
    pendingCreateRef: session.pendingCreateRef,
    armSendWindow,
    setChatPanel: layout.setChatPanel,
    closeSidebar,
  });

  pageBridgeRef.current = {
    isTabOpen: tabs.isTabOpen,
    reloadStaleTab: tabs.reloadStaleTab,
    pruneTabsToExisting: tabs.pruneTabsToExisting,
    openWorkspacePreview: tabs.openWorkspacePreview,
    resetForWorkspaceSwitch: () => {
      tabs.resetTabs();
      session.resetForWorkspaceSwitch();
      editDraft.closeEditSession();
    },
  };

  const patchworkCtx = useMemo(
    () => ({ compiler: bootstrap.compiler, namespaces: bootstrap.namespaces }),
    [bootstrap.compiler, bootstrap.namespaces]
  );

  // Native panels are self-contained; the few page-only actions they need
  // (switch chat, open a file, prefill composer) ride this one additive context.
  const panelHostActions = useMemo(
    () => ({
      onOpenSession: (id: string) => void session.openSession(id),
      onOpenFile: (path: string) => tabs.openWorkspacePreview(path),
      onOpenCredentials: (provider?: string) =>
        tabs.openNativeTab("credentials", provider ? { provider } : undefined),
      onCreateWorkflow: createWorkflowInChat,
      onPublishFlow: publishFlowInChat,
    }),
    [
      session.openSession,
      tabs.openWorkspacePreview,
      tabs.openNativeTab,
      createWorkflowInChat,
      publishFlowInChat,
    ]
  );

  return (
    <PatchworkCtx.Provider value={patchworkCtx}>
      <SharedEditSessionCtx.Provider value={editDraft.openSharedEditSession}>
      <WidgetErrorReporterCtx.Provider value={reportWidgetError}>
      <PanelHostProvider actions={panelHostActions}>
        {/* Full-bleed app shell: the viewport is the frame. Shared AppHeader
            (same as home page/registry) with chat controls in its slots. */}
        <div className="flex flex-col h-dvh overflow-hidden bg-background">
          <AppHeader
            className="static shrink-0 border-b bg-transparent backdrop-blur-none"
            homeHref="https://aprovan.com/chat"
            leading={
              <button
                onClick={() => setSidebarOpen((open) => !open)}
                className="md:hidden p-1.5 -ml-1 rounded hover:bg-muted"
                title="Toggle workspace files"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            }
            // The nav carries destinations, not the places you already are:
            // no aprovan Home, no patchwork self-link — Apps and Registry only.
            links={aprovanApps("Chat").filter(
              (link) => link.label === "Apps" || link.label === "Registry"
            )}
            logo={<img src={APROVAN_LOGO} alt="Aprovan" className="h-7 w-7 rounded-full" />}
          >
            <NotificationsBell
              workspaceId={explorer.activeWorkspaceId}
              onAction={session.handleNotificationAction}
              renderWidget={(path, data) => (
                <NotificationPathWidget path={path} data={data} compiler={bootstrap.compiler} services={bootstrap.namespaces} />
              )}
            />
            <ServicesMenu
              services={bootstrap.services}
              onOpenCredentials={(provider) => tabs.openNativeTab("credentials", { provider })}
            />
            <SessionControls
              onLoad={explorer.handleWorkspaceLoad}
              onSwitch={explorer.handleWorkspaceSwitch}
              onOpenCredentials={() => tabs.openNativeTab("credentials")}
            />
          </AppHeader>

          {/* One catalog for the Apps native surface and any leftover apps://
              tabs: shared apps/workflows list + refresh. */}
          <AppsCatalogProvider invoke={invokeWorkflowsTool} invokeApps={invokeAppsTool}>
            <div className="flex-1 min-h-0 flex relative">
              <WorkspaceSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                workspaceFiles={explorer.workspaceFiles}
                workspaceActivePath={explorer.workspaceActivePath}
                setWorkspaceActivePath={explorer.setWorkspaceActivePath}
                workspaceLoading={explorer.workspaceLoading}
                workspaceError={explorer.workspaceError}
                openWorkspacePreview={tabs.openWorkspacePreview}
                openWorkspaceSession={editDraft.openWorkspaceSession}
                pinnedPaths={explorer.pinnedPaths}
                togglePin={explorer.togglePin}
                deleteWorkspaceEntry={explorer.deleteWorkspaceEntry}
                createWorkspaceFile={explorer.createWorkspaceFile}
                refreshWorkspace={explorer.refreshWorkspace}
                activeSurfaceId={tabs.activeSurfaceId}
                openNativeTab={tabs.openNativeTab}
              />

              <div className="flex-1 min-w-0 min-h-0 flex flex-col">
                {tabs.openTabs.size > 0 && (
                  <div
                    // Fills whatever the chat dock below doesn't claim.
                    className={`flex flex-col border-b bg-muted/10 ${
                      tabs.previewCollapsed ? "shrink-0" : "flex-1 min-h-0"
                    }`}
                  >
                    <TabStrip
                      openTabs={tabs.openTabs}
                      activeTabPath={tabs.activeTabPath}
                      previewCollapsed={tabs.previewCollapsed}
                      onSelectTab={tabs.selectTab}
                      onCloseTab={tabs.closeTab}
                      onCloseAllTabs={tabs.closeAllTabs}
                      onReloadStaleTab={tabs.reloadStaleTab}
                      onTogglePreviewCollapsed={() => tabs.setPreviewCollapsed((p) => !p)}
                    />
                    <TabContent
                      openTabs={tabs.openTabs}
                      setOpenTabs={tabs.setOpenTabs}
                      activeTabPath={tabs.activeTabPath}
                      previewCollapsed={tabs.previewCollapsed}
                      reloadStaleTab={tabs.reloadStaleTab}
                      openWorkspacePreview={tabs.openWorkspacePreview}
                      retitleAppsTab={tabs.retitleAppsTab}
                      closeTab={tabs.closeTab}
                      createWorkflowInChat={createWorkflowInChat}
                      publishFlowInChat={publishFlowInChat}
                      customPreview={workflowCustomPreview} loadScript={loadWorkflowScript}
                    />
                  </div>
                )}

                <ChatDock
                  hasContentTab={tabs.hasContentTab}
                  layout={layout}
                  session={session}
                  providers={providers}
                  messages={messages}
                  status={status}
                  error={error}
                  compilerError={bootstrap.compilerError}
                  input={input}
                  setInput={setInput}
                  handleSubmit={handleSubmit}
                  openWorkspacePreview={tabs.openWorkspacePreview}
                  onOpenCredentials={(provider) =>
                    tabs.openNativeTab("credentials", provider ? { provider } : undefined)
                  }
                />
              </div>
            </div>
          </AppsCatalogProvider>
        </div>
        <EditModalHost
          editSession={editDraft.editSession}
          closeEditSession={editDraft.closeEditSession}
          refreshWorkspace={explorer.refreshWorkspace}
          compiler={bootstrap.compiler}
          namespaces={bootstrap.namespaces}
          editTransport={editTransport}
          providers={providers}
        />
      </PanelHostProvider>
      </WidgetErrorReporterCtx.Provider>
      </SharedEditSessionCtx.Provider>
    </PatchworkCtx.Provider>
  );
}
