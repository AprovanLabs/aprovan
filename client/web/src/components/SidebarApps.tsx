/**
 * SidebarApps — the chat sidebar's second explorer, below the file tree.
 *
 * The content is the shared `AppsExplorer` (`AppsPanel variant="sidebar"` from
 * `@aprovan/registry-ui`): apps grouped over the workflows they export, with a
 * trailing "Workspace" group for workflows no app bundles. Depth plus search
 * plus a capped window is what makes it survive a workspace with hundreds of
 * entries — the flat list it replaces did not.
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
import { ChevronDown, ChevronRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { AppsSelection } from "@aprovan/registry-ui/apps-panel";
import { invokeAppsTool, invokeWorkflowsTool } from "@/lib/tools";
import { readFile } from "@/lib/workspace-vfs";

const LAYOUT_KEY = "patchwork:sidebar-apps";
const DEFAULT_HEIGHT = 240;
const MIN_HEIGHT = 120;
/** Pixels of file tree that must survive any drag. */
const MIN_TREE_HEIGHT = 140;

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
}

function loadLayout(): SidebarAppsLayout {
  try {
    const raw = localStorage.getItem(LAYOUT_KEY);
    if (!raw) return { height: DEFAULT_HEIGHT, collapsed: false };
    const parsed = JSON.parse(raw) as Partial<SidebarAppsLayout>;
    return {
      height:
        typeof parsed.height === "number" && parsed.height >= MIN_HEIGHT
          ? parsed.height
          : DEFAULT_HEIGHT,
      collapsed: parsed.collapsed === true,
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
}: {
  /** Selection mirrored from the open apps tab, so the two stay in sync. */
  selection: AppsSelection | null;
  /** Fired when a row is picked — the host opens it as a main-pane tab. */
  onSelectionChange: (selection: AppsSelection | null) => void;
  /** Open a workflow's script as a file preview tab (TailorFlow). */
  onOpenScript: (path: string) => void;
  /** Empty states funnel here: prefill chat to describe a new workflow. */
  onCreateWorkflow?: (appName?: string) => void;
}) {
  const [layout, setLayout] = useState<SidebarAppsLayout>(loadLayout);
  const [dragging, setDragging] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const heightRef = useRef(layout.height);
  heightRef.current = layout.height;

  const setCollapsed = useCallback((collapsed: boolean) => {
    setLayout((prev) => {
      const next = { ...prev, collapsed };
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

      // Dragging up grows the apps pane; the tree keeps the remainder.
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
        saveLayout({ height: heightRef.current, collapsed: false });
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [layout.collapsed, maxHeight]
  );

  return (
    <section
      ref={sectionRef}
      className="shrink-0 flex flex-col min-h-0 border-t"
      style={layout.collapsed ? undefined : { height: layout.height }}
    >
      <div
        role="separator"
        aria-orientation="horizontal"
        aria-label="Resize apps section"
        tabIndex={layout.collapsed ? -1 : 0}
        onPointerDown={startDrag}
        onKeyDown={(event) => {
          if (event.key === "ArrowUp") resizeBy(16);
          else if (event.key === "ArrowDown") resizeBy(-16);
          else return;
          event.preventDefault();
          saveLayout({ height: heightRef.current, collapsed: layout.collapsed });
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
        title={layout.collapsed ? "Expand apps" : "Collapse apps"}
      >
        {layout.collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )}
        <span>Apps</span>
      </button>

      {!layout.collapsed && (
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
          className="flex-1 min-h-0 px-2 pb-2"
        />
      )}
    </section>
  );
}
