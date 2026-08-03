import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { AppsPanel } from "@aprovan/registry-ui/apps-panel";
import type { AppsSelection } from "@aprovan/registry-ui/apps-panel";
import { CodePreview } from "@aprovan/patchwork-editor";
import { AlertCircle, Loader2 } from "lucide-react";
import { PanelTabs } from "@/components/panels/shell";
import { useCompiler, useServices, useSharedEditSession } from "@/contexts";
import { NATIVE_SURFACES, parseNativeTabPath } from "@/lib/native-surfaces";
import { editorLogsSource } from "@/lib/telemetry";
import { invokeAppsTool, invokeWorkflowsTool } from "@/lib/tools";
import { workspaceWidgetVfs } from "@/lib/workspace-vfs";
import { appsTabPath, parseAppsTabPath, type OpenTab } from "./tab-routing";
import { isNativeTabPath, UnknownNativeSurface } from "./UnknownNativeSurface";

/**
 * Active tab content: dispatches the active tab's pseudo-path to a native
 * surface panel, the shared `AppsPanel`, or a workspace-file `CodePreview`.
 * Owns the app pane's contextual sub-tab state (Details + appTab surfaces).
 */
export function TabContent({
  openTabs,
  setOpenTabs,
  activeTabPath,
  previewCollapsed,
  reloadStaleTab,
  openWorkspacePreview,
  retitleAppsTab,
  closeTab,
  createWorkflowInChat,
  customPreview,
  loadScript,
}: {
  openTabs: Map<string, OpenTab>;
  setOpenTabs: Dispatch<SetStateAction<Map<string, OpenTab>>>;
  activeTabPath: string | null;
  previewCollapsed: boolean;
  reloadStaleTab: (path: string) => void;
  openWorkspacePreview: (path: string) => void;
  retitleAppsTab: (from: string, selection: AppsSelection | null) => void;
  closeTab: (path: string) => void;
  createWorkflowInChat: (appName?: string) => void;
  customPreview: React.ComponentProps<typeof CodePreview>["customPreview"];
  loadScript: (path: string) => Promise<string | null>;
}) {
  const compiler = useCompiler();
  const namespaces = useServices();
  const openSharedEditSession = useSharedEditSession();

  // App panes carry contextual native tabs (Details + appTab surfaces); the
  // active sub-tab resets when the pane shows a different app.
  const [appPaneTab, setAppPaneTab] = useState<string>("details");
  const appPaneNameRef = useRef<string | null>(null);

  // The pane owns the height and the preview scrolls inside it, so a widget
  // taller than the screen is never clipped.
  if (previewCollapsed || !activeTabPath || !openTabs.has(activeTabPath)) return null;

  const tab = openTabs.get(activeTabPath)!;
  const appsSelection = parseAppsTabPath(activeTabPath);
  const nativeSurface = parseNativeTabPath(activeTabPath);
  const unknownNative = !nativeSurface && isNativeTabPath(activeTabPath);
  // App panes get contextual native tabs (Details + the
  // surfaces that declare appTab). Reset on app change.
  const appTabSurfaces =
    appsSelection?.kind === "app" ? NATIVE_SURFACES.filter((surface) => surface.appTab) : [];
  if (appsSelection?.kind === "app" && appPaneNameRef.current !== appsSelection.name) {
    appPaneNameRef.current = appsSelection.name;
    if (appPaneTab !== "details") setAppPaneTab("details");
  }
  const activeAppSurface =
    appsSelection?.kind === "app" && appPaneTab !== "details"
      ? appTabSurfaces.find((surface) => surface.id === appPaneTab)
      : undefined;

  return (
    <div
      // Every apps tab renders the *same* panel instance
      // (only its selection differs), so switching between
      // them keeps the loaded catalog instead of remounting.
      // Native surfaces keep their own stable key so
      // switching between panes doesn't remount them.
      key={nativeSurface ? activeTabPath : appsSelection ? "apps" : activeTabPath}
      className="flex-1 min-h-0 flex flex-col bg-card relative"
    >
      {nativeSurface && <nativeSurface.Panel />}
      {unknownNative && (
        <UnknownNativeSurface path={activeTabPath} onClose={() => closeTab(activeTabPath)} />
      )}
      {appsSelection?.kind === "app" && appTabSurfaces.length > 0 && (
        <PanelTabs
          tabs={[
            { id: "details", label: "Details" },
            ...appTabSurfaces.map((surface) => ({
              id: surface.id,
              label: surface.title,
            })),
          ]}
          active={appPaneTab}
          onChange={setAppPaneTab}
        />
      )}
      {activeAppSurface && appsSelection?.kind === "app" && (
        <activeAppSurface.Panel scope={{ name: appsSelection.name }} />
      )}
      {appsSelection && !activeAppSurface && (
        // `fill` hands the panel this pane's height so its
        // master and detail columns scroll independently,
        // rather than one 70vh block inside a scrolling div.
        <div className="flex-1 min-h-0 flex flex-col p-3">
          <AppsPanel
            variant="full"
            fill
            invoke={invokeWorkflowsTool}
            invokeApps={invokeAppsTool}
            loadScript={loadScript}
            onOpenScript={openWorkspacePreview}
            selection={appsSelection}
            onSelectionChange={(next) => retitleAppsTab(activeTabPath, next)}
            // Deleting the thing a tab is showing should
            // close the tab, not leave it on a placeholder.
            onSelectionRemoved={(gone) => closeTab(appsTabPath(gone))}
            onCreateWorkflow={createWorkflowInChat}
            title={null}
          />
        </div>
      )}
      {/* Only real workspace files reach the preview:
          a native tab renders its Panel above and must
          not also mount CodePreview (whose edit toolbar
          makes no sense on a native surface). */}
      {!appsSelection && !nativeSurface && !unknownNative && (
        <>
          {tab.stale && !tab.loading && (
            <div className="shrink-0 px-3 py-1.5 text-xs bg-orange-50 dark:bg-orange-950/40 border-b border-orange-200 dark:border-orange-800 flex items-center gap-2 text-orange-700 dark:text-orange-400">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>This file was modified externally.</span>
              <button
                onClick={() => reloadStaleTab(activeTabPath)}
                className="ml-auto underline hover:no-underline"
              >
                Reload
              </button>
              <button
                onClick={() =>
                  setOpenTabs((prev) => {
                    const t = prev.get(activeTabPath);
                    if (!t) return prev;
                    const next = new Map(prev);
                    next.set(activeTabPath, { ...t, stale: false });
                    return next;
                  })
                }
                className="underline hover:no-underline"
              >
                Keep local
              </button>
            </div>
          )}
          {tab.loading ? (
            <div className="p-3 flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Loading file preview...</span>
            </div>
          ) : tab.error ? (
            <div className="p-3 text-sm text-destructive flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{tab.error}</span>
            </div>
          ) : (
            <CodePreview
              fill
              code={tab.code}
              compiler={compiler}
              services={namespaces}
              filePath={activeTabPath}
              onOpenEditSession={openSharedEditSession ?? undefined}
              vfs={workspaceWidgetVfs}
              customPreview={customPreview}
              logsSource={editorLogsSource}
            />
          )}
        </>
      )}
    </div>
  );
}
