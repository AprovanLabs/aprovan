import { useChat } from "@ai-sdk/react";
import { AppsCatalogProvider } from "@aprovan/registry-ui/apps-panel";
import "@aprovan/registry-ui/tailor";
import { AppHeader, aprovanApps } from "@aprovan/ui/shell";
import { MessageSquare, PanelLeft } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NotificationsBell } from "@/components/NotificationsBell";
import { PanelHostProvider } from "@/components/panels/shell";
import { ServicesMenu } from "@/components/ServicesMenu";
import SessionControls from "@/components/SessionControls";
import { PatchworkCtx, SharedEditSessionCtx, WidgetErrorReporterCtx } from "@/contexts";
import { ChatDock, useChatPanelLayout } from "@/features/chat/ChatDock";
import { useChatFileContext } from "@/features/chat/chat-file-context";
import { useChatTransport, useEditTransport } from "@/features/chat/chat-transport";
import {
  USE_RUN_TRANSPORT,
  useRunTransport,
} from "@/features/chat/run-transport";
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
import { isVirtualTabPath } from "@/features/tabs/tab-routing";
import { useTabs } from "@/features/tabs/useTabs";
import { isDesktopBridgeAvailable } from "@/features/workspaces/desktop";
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
  const contextFilesRef = useRef<string[]>([]);
  // Session id for RunTransport chat-turn posts (server lazy-creates when unset).
  // Kept in sync below once orchestration has an active session.
  const sessionIdRef = useRef<string | undefined>(undefined);
  // Dev-only: both transports stay constructed; USE_RUN_TRANSPORT (default off)
  // selects the run-protocol path. Stream 8 flips the default and deletes legacy.
  const legacyTransport = useChatTransport({
    chatProviderRef: providers.chatProviderRef,
    chatModelRef: providers.chatModelRef,
    imagePromptsRef: bootstrap.imagePromptsRef,
    namespaces: bootstrap.namespaces,
    services: bootstrap.services,
    contextFilesRef,
  });
  const runTransport = useRunTransport({
    chatProviderRef: providers.chatProviderRef,
    chatModelRef: providers.chatModelRef,
    contextFilesRef,
    sessionIdRef,
  });
  const transport = USE_RUN_TRANSPORT ? runTransport : legacyTransport;
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
    sessionIdRef,
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

  const splitRowRef = useRef<HTMLDivElement>(null);
  const getSplitRowWidth = useCallback(
    () => splitRowRef.current?.clientWidth ?? 960,
    []
  );
  const layout = useChatPanelLayout(getSplitRowWidth);

  const dockFilePath =
    tabs.activeTabPath && !isVirtualTabPath(tabs.activeTabPath) ? tabs.activeTabPath : null;

  const chatFileContext = useChatFileContext(dockFilePath);

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
    filePath: dockFilePath,
    pinnedPaths: chatFileContext.pinnedPaths,
    contextFilesRef,
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

  const hasContentTab = tabs.hasContentTab;
  const chatDockOpen = !hasContentTab || layout.chatPanel.open;

  // One ChatDock instance: desktop side column vs mobile bottom sheet.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const chatDockProps = {
    hasContentTab,
    layout,
    filePath: dockFilePath,
    workspacePaths: explorer.workspaceFiles,
    pinnedPaths: chatFileContext.pinnedPaths,
    onTogglePin: chatFileContext.togglePin,
    onUnpin: chatFileContext.unpin,
    isPinned: chatFileContext.isPinned,
    onClose: hasContentTab ? layout.closeChat : undefined,
    session,
    providers,
    messages,
    status,
    error,
    compilerError: bootstrap.compilerError,
    input,
    setInput,
    handleSubmit,
    openWorkspacePreview: tabs.openWorkspacePreview,
    onOpenCredentials: (provider?: string) =>
      tabs.openNativeTab("credentials", provider ? { provider } : undefined),
  };

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
            name="Aprovan"
            homeHref={isDesktopBridgeAvailable() ? "#" : "https://aprovan.com/chat"}
            leading={
              <button
                onClick={() => setSidebarOpen((open) => !open)}
                className="md:hidden p-1.5 -ml-1 rounded hover:bg-muted"
                title="Toggle workspace files"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            }
            // Destinations you are not already on. Desktop keeps credentials
            // and catalog in-chat — no outbound Registry / web links.
            links={
              isDesktopBridgeAvailable()
                ? []
                : aprovanApps("Chat").filter(
                    (link) => link.label === "Apps" || link.label === "Registry",
                  )
            }
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
            {/* Global chat entry when a content tab is open and the dock is closed. */}
            {hasContentTab && !layout.chatPanel.open && (
              <button
                type="button"
                onClick={layout.openChat}
                className="p-1.5 rounded hover:bg-muted"
                title="Open chat"
              >
                <MessageSquare className="h-4 w-4" />
              </button>
            )}
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
                expandWorkspaceDirectory={
                  explorer.lazyTree ? explorer.expandWorkspaceDirectory : undefined
                }
                activeSurfaceId={tabs.activeSurfaceId}
                openNativeTab={tabs.openNativeTab}
                activeAppKey={
                  tabs.activeAppsSelection?.kind === "app"
                    ? (tabs.activeAppsSelection.appId ?? tabs.activeAppsSelection.name)
                    : null
                }
                openAppTab={(app) =>
                  tabs.openAppsTab({
                    kind: "app",
                    name: app.name,
                    ...(app.appId ? { appId: app.appId } : {}),
                  })
                }
              />

              <div ref={splitRowRef} className="flex-1 min-w-0 min-h-0 flex relative">
                {/* File / tab pane — stays editable while the chat dock is open. */}
                <div
                  className={`min-w-0 min-h-0 flex flex-col ${
                    hasContentTab ? "flex-1" : chatDockOpen ? "hidden" : "flex-1"
                  }`}
                >
                  {tabs.openTabs.size > 0 && (
                    <div
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
                        customPreview={workflowCustomPreview}
                        loadScript={loadWorkflowScript}
                      />
                    </div>
                  )}
                </div>

                {/* Opt-in chat dock beside the file pane (side column / bottom sheet). */}
                {hasContentTab && layout.chatPanel.open && (
                  <>
                    {isMobile && (
                      <div
                        className="absolute inset-0 z-20 bg-black/40"
                        onClick={layout.closeChat}
                      />
                    )}
                    <div
                      className={
                        isMobile
                          ? "absolute inset-x-0 bottom-0 z-30 flex flex-col min-h-0 h-[min(60vh,32rem)] border-t bg-background rounded-t-lg shadow-lg"
                          : "relative shrink-0 flex flex-col border-l min-h-0"
                      }
                      style={isMobile ? undefined : { width: layout.chatPanel.splitWidth }}
                    >
                      <ChatDock {...chatDockProps} />
                    </div>
                  </>
                )}

                {/* No content tab: chat fills the main column (workspace-wide). */}
                {!hasContentTab && <ChatDock {...chatDockProps} />}
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
