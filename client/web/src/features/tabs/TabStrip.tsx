import { ChevronDown, LayoutGrid, Minus, RotateCcw, Workflow, X } from "lucide-react";
import { parseNativeTabPath } from "@/lib/native-surfaces";
import { parseAppsTabPath, tabLabel, type OpenTab } from "./tab-routing";

/** The preview pane's tab bar — pure presentation over `useTabs`' state. */
export function TabStrip({
  openTabs,
  activeTabPath,
  previewCollapsed,
  onSelectTab,
  onCloseTab,
  onCloseAllTabs,
  onReloadStaleTab,
  onTogglePreviewCollapsed,
}: {
  openTabs: Map<string, OpenTab>;
  activeTabPath: string | null;
  previewCollapsed: boolean;
  onSelectTab: (path: string) => void;
  onCloseTab: (path: string) => void;
  onCloseAllTabs: () => void;
  onReloadStaleTab: (path: string) => void;
  onTogglePreviewCollapsed: () => void;
}) {
  return (
    <div className="flex items-center border-b bg-muted/30 shrink-0">
      <div className="flex-1 flex items-center overflow-x-auto min-w-0">
        {[...openTabs.entries()].map(([path, tab]) => {
          const appsSelection = parseAppsTabPath(path);
          const nativeSurface = parseNativeTabPath(path);
          const isActive = path === activeTabPath;
          const isStale = tab.stale ?? false;
          return (
            <button
              key={path}
              onClick={() => onSelectTab(path)}
              className={`group relative flex items-center gap-1.5 px-3 py-1.5 text-xs border-r shrink-0 max-w-[200px] ${
                isActive
                  ? "bg-background text-foreground border-b-2 border-b-primary"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
              title={isStale ? `${path} — modified externally` : path}
            >
              {isStale && (
                <span
                  className="shrink-0 h-1.5 w-1.5 rounded-full bg-orange-400"
                  title="Modified externally"
                />
              )}
              {nativeSurface && (
                <nativeSurface.icon className="h-3 w-3 shrink-0 text-muted-foreground" />
              )}
              {appsSelection &&
                (appsSelection.kind === "app" ? (
                  <LayoutGrid className="h-3 w-3 shrink-0 text-muted-foreground" />
                ) : (
                  <Workflow className="h-3 w-3 shrink-0 text-muted-foreground" />
                ))}
              <span
                className={`truncate ${isStale ? "text-orange-600 dark:text-orange-400" : ""}`}
              >
                {tabLabel(path)}
              </span>
              {isStale && (
                <span
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onReloadStaleTab(path);
                  }}
                  className="shrink-0 p-0.5 rounded hover:bg-muted-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Reload from server"
                >
                  <RotateCcw className="h-3 w-3" />
                </span>
              )}
              {/* Hover-only visibility (the old default) is
                  invisible on touch — there's no hover state
                  to reveal it. Always show it on the active
                  tab, and unconditionally under
                  `(hover: none)` (touch/coarse pointers),
                  where "hover to discover it" isn't a thing. */}
              <span
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(path);
                }}
                className={`shrink-0 p-0.5 rounded hover:bg-muted-foreground/20 transition-opacity [@media(hover:none)]:opacity-100! ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
                title="Close tab"
              >
                <X className="h-3 w-3" />
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-0.5 px-1 shrink-0">
        <button
          onClick={onTogglePreviewCollapsed}
          className="p-1 rounded hover:bg-muted"
          title={previewCollapsed ? "Expand preview" : "Collapse preview"}
        >
          {previewCollapsed ? (
            <ChevronDown className="h-3.5 w-3.5" />
          ) : (
            <Minus className="h-3.5 w-3.5" />
          )}
        </button>
        <button onClick={onCloseAllTabs} className="p-1 rounded hover:bg-muted" title="Close all tabs">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
