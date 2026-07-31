/**
 * SidebarApps — the chat sidebar's second explorer, below the file tree:
 * the WORKSPACE section.
 *
 * The section's primary content is the workspace's native surfaces (Data,
 * Agents, Webhooks, Notifications, Sessions, Interfaces, Sync, Sandboxes,
 * Activity — see lib/native-surfaces.tsx), one row each, opening `native://`
 * content tabs. Beneath them sits the "Apps" sub-group: the shared
 * `AppsExplorer` (`AppsPanel variant="sidebar"` from `@aprovan/registry-ui`),
 * apps grouped over the workflows they export. Depth plus search plus a
 * capped window is what makes the explorer survive a workspace with hundreds
 * of entries — the flat list it replaced did not.
 *
 * What this file actually owns is the *column geometry*, which the shared
 * panel deliberately does not: a sidebar holding two long lists needs a split,
 * not two lists fighting for the same overflow. So the section is a fixed-
 * height, independently scrolling pane with a drag handle above it (the file
 * tree takes the remainder), collapsible to its header, and both the height
 * and the collapsed flag are persisted so a reload doesn't undo the user's
 * layout.
 *
 * Transports are injected, never fetched here — see lib/tools.ts.
 */

import { AppsExplorer } from "@aprovan/registry-ui/apps-panel";
import { useSharedAppsCatalog } from "@aprovan/ui/apps-store";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { AppsSelection } from "@aprovan/registry-ui/apps-panel";
import { NATIVE_SURFACES } from "@/lib/native-surfaces";
import { invokeAppsTool, invokeWorkflowsTool } from "@/lib/tools";
import { readFile } from "@/lib/workspace-vfs";

const LAYOUT_KEY = "patchwork:sidebar-apps";
/** Tall enough for native surfaces + a usable Apps list at first paint. */
const DEFAULT_HEIGHT = 320;
/** Resize floor — both sub-groups need header + at least one row each. */
const MIN_HEIGHT = 200;
/**
 * Persisted heights below this were saved before the layout fix that
 * guaranteed Apps visibility; bump them on load.
 */
const MIN_PERSISTED_HEIGHT = 280;
/** Pixels of file tree that must survive any drag. */
const MIN_TREE_HEIGHT = 140;
/** Apps sub-group needs header + one row even when the section is short. */
const MIN_APPS_VISIBLE_HEIGHT = 72;

interface SidebarAppsLayout {
  height: number;
  collapsed: boolean;
  /**
   * Which app groups are open. Left `undefined` until the user touches one,
   * because the panel's own default is size-aware (a short list starts
   * expanded) — persisting `[]` on first render would force everything shut
   * and hand back the empty-looking widget this explorer replaced.
   */
  expanded?: string[];
  /**
   * Whether the Apps sub-group (the explorer) is open. Absent means open —
   * the explorer is the section's long tail, but hiding it by default would
   * make a fresh workspace's sidebar read as empty. (An older `workspaceOpen`
   * key may linger in storage from when the native surfaces were the
   * sub-group; it is simply ignored.)
   */
  appsOpen?: boolean;
}

function normalizeHeight(height: number | undefined): number {
  if (typeof height !== "number" || height < MIN_HEIGHT) return DEFAULT_HEIGHT;
  if (height < MIN_PERSISTED_HEIGHT) return DEFAULT_HEIGHT;
  return height;
}

function loadLayout(): SidebarAppsLayout {
  try {
    const raw = localStorage.getItem(LAYOUT_KEY);
    if (!raw) return { height: DEFAULT_HEIGHT, collapsed: false };
    const parsed = JSON.parse(raw) as Partial<SidebarAppsLayout>;
    return {
      height: normalizeHeight(parsed.height),
      collapsed: parsed.collapsed === true,
      appsOpen: parsed.appsOpen !== false,
      ...(Array.isArray(parsed.expanded)
        ? { expanded: parsed.expanded.filter((id): id is string => typeof id === "string") }
        : {}),
    };
  } catch {
    return { height: DEFAULT_HEIGHT, collapsed: false };
  }
}

function saveLayout(layout: SidebarAppsLayout) {
  try {
    localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout));
  } catch {
    // Private-mode / quota: the layout is a nicety, never a failure mode.
  }
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

/** The panel reads workflow scripts through the workspace FS, not the gateway
 *  tool namespace — that is what upgrades a run form into the flow graph. */
const loadScript = async (path: string): Promise<string | null> => readFile(path).catch(() => null);

export function SidebarApps({
  selection,
  onSelectionChange,
  onOpenScript,
  onCreateWorkflow,
  activeSurfaceId,
  onSelectSurface,
}: {
  /** Selection mirrored from the open apps tab, so the two stay in sync. */
  selection: AppsSelection | null;
  /** Fired when a row is picked — the host opens it as a main-pane tab. */
  onSelectionChange: (selection: AppsSelection | null) => void;
  /** Open a workflow's script as a file preview tab (TailorFlow). */
  onOpenScript: (path: string) => void;
  /** Empty states funnel here: prefill chat to describe a new workflow. */
  onCreateWorkflow?: (appName?: string) => void;
  /** Native surface shown in the main pane, mirrored like `selection`. */
  activeSurfaceId?: string | null;
  /** Fired when a surface row is picked — the host opens a `native://` tab. */
  onSelectSurface?: (surfaceId: string) => void;
}) {
  const [layout, setLayout] = useState<SidebarAppsLayout>(loadLayout);
  const [dragging, setDragging] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  // Mirrors `layout` for the drag/keyboard handlers, which persist mid-gesture
  // and must not drop the fields they don't touch (expanded, appsOpen).
  const layoutRef = useRef(layout);
  layoutRef.current = layout;
  const heightRef = useRef(layout.height);
  heightRef.current = layout.height;

  // The Apps sub-group's count badge: how many app groups the shared catalog
  // holds (the provider sits above this component in ChatPage). Null outside
  // a provider — the badge simply doesn't render then.
  const catalog = useSharedAppsCatalog();
  const appCount = catalog && !catalog.loading ? catalog.groups.length : null;

  const setCollapsed = useCallback((collapsed: boolean) => {
    setLayout((prev) => {
      const next = { ...prev, collapsed };
      saveLayout(next);
      return next;
    });
  }, []);

  const setAppsOpen = useCallback((appsOpen: boolean) => {
    setLayout((prev) => {
      const next = { ...prev, appsOpen };
      saveLayout(next);
      return next;
    });
  }, []);

  /** Upper bound for the section: whatever leaves the tree usably tall. */
  const maxHeight = useCallback(() => {
    const column = sectionRef.current?.parentElement;
    return Math.max(MIN_HEIGHT, (column?.clientHeight ?? 640) - MIN_TREE_HEIGHT);
  }, []);

  const resizeBy = useCallback(
    (delta: number) => {
      setLayout((prev) => ({
        ...prev,
        height: clamp(prev.height + delta, MIN_HEIGHT, maxHeight()),
      }));
    },
    [maxHeight]
  );

  const startDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (layout.collapsed) return;
      event.preventDefault();
      const startY = event.clientY;
      const startHeight = heightRef.current;
      const max = maxHeight();
      setDragging(true);

      // Dragging up grows the workspace pane; the tree keeps the remainder.
      const onMove = (moveEvent: PointerEvent) => {
        setLayout((prev) => ({
          ...prev,
          height: clamp(startHeight + (startY - moveEvent.clientY), MIN_HEIGHT, max),
        }));
      };
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        setDragging(false);
        // One write at the end of the gesture, not one per pointer move.
        saveLayout({ ...layoutRef.current, height: heightRef.current, collapsed: false });
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [layout.collapsed, maxHeight]
  );

  const appsOpen = layout.appsOpen !== false;

  return (
    <section
      ref={sectionRef}
      className="flex min-h-0 shrink-0 flex-col overflow-hidden border-t"
      style={layout.collapsed ? undefined : { height: layout.height }}
    >
      <div
        role="separator"
        aria-orientation="horizontal"
        aria-label="Resize workspace section"
        tabIndex={layout.collapsed ? -1 : 0}
        onPointerDown={startDrag}
        onKeyDown={(event) => {
          if (event.key === "ArrowUp") resizeBy(16);
          else if (event.key === "ArrowDown") resizeBy(-16);
          else return;
          event.preventDefault();
          saveLayout({ ...layoutRef.current, height: heightRef.current });
        }}
        className={`h-1 shrink-0 -mt-px transition-colors ${
          layout.collapsed
            ? "pointer-events-none"
            : `cursor-row-resize hover:bg-primary/40 focus-visible:bg-primary/40 focus-visible:outline-none ${
                dragging ? "bg-primary/60" : ""
              }`
        }`}
      />

      <button
        type="button"
        onClick={() => setCollapsed(!layout.collapsed)}
        className="shrink-0 flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground"
        title={layout.collapsed ? "Expand workspace" : "Collapse workspace"}
      >
        {layout.collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )}
        <span>Workspace</span>
      </button>

      {!layout.collapsed && (
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {onSelectSurface && (
            <WorkspaceSurfaces
              activeSurfaceId={activeSurfaceId ?? null}
              onSelect={onSelectSurface}
            />
          )}

          <div
            className={`flex min-h-0 flex-col px-2 pb-2 ${appsOpen ? "flex-1" : "shrink-0"}`}
            style={appsOpen ? { minHeight: MIN_APPS_VISIBLE_HEIGHT } : undefined}
          >
            <button
              type="button"
              aria-expanded={appsOpen}
              onClick={() => setAppsOpen(!appsOpen)}
              className="flex w-full shrink-0 items-center gap-1.5 rounded px-1 py-1 text-left transition-colors hover:bg-muted/60"
              title={appsOpen ? "Collapse apps" : "Expand apps"}
            >
              {appsOpen ? (
                <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />
              )}
              <span className="truncate text-xs font-medium">Apps</span>
              {appCount !== null && (
                <span className="shrink-0 text-[0.65rem] tabular-nums text-muted-foreground">
                  {appCount}
                </span>
              )}
            </button>

            {appsOpen && (
              <AppsExplorer
                invoke={invokeWorkflowsTool}
                invokeApps={invokeAppsTool}
                loadScript={loadScript}
                onOpenScript={onOpenScript}
                selection={selection}
                onSelectionChange={onSelectionChange}
                {...(onCreateWorkflow ? { onCreateWorkflow } : {})}
                {...(layout.expanded ? { expandedGroups: layout.expanded } : {})}
                onExpandedGroupsChange={(ids) =>
                  setLayout((prev) => {
                    const next = { ...prev, expanded: ids };
                    saveLayout(next);
                    return next;
                  })
                }
                title={null}
                className="min-h-0 flex-1 overflow-y-auto pl-3"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * The WORKSPACE section's primary rows: one per native surface (Data, Agents,
 * Webhooks, Notifications, Sessions, Interfaces, Sync, Sandboxes, Activity),
 * each opening a `native://` content tab.
 *
 * Capped height so the Apps sub-group always gets room; scrolls independently
 * when the native surface list outgrows its allotment.
 */
function WorkspaceSurfaces({
  activeSurfaceId,
  onSelect,
}: {
  activeSurfaceId: string | null;
  onSelect: (surfaceId: string) => void;
}) {
  return (
    <div className="max-h-36 shrink space-y-0.5 overflow-y-auto px-2 pb-1">
      {NATIVE_SURFACES.map((surface) => (
        <button
          key={surface.id}
          type="button"
          onClick={() => onSelect(surface.id)}
          title={surface.description}
          className={`flex w-full items-center gap-1.5 rounded px-2 py-1 text-left transition-colors ${
            surface.id === activeSurfaceId ? "bg-muted" : "hover:bg-muted/60"
          }`}
        >
          <surface.icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate text-xs">{surface.title}</span>
        </button>
      ))}
    </div>
  );
}
