/**
 * Workspace file tree built on `@pierre/trees`. Path-first: hand it a flat path
 * list and the library owns expansion, selection, and virtualization inside a
 * shadow root. We theme it through `--trees-*-override` custom properties that
 * alias the app's shadcn tokens — custom properties inherit across the shadow
 * boundary, so the tree tracks the `.dark` root class for free without any
 * JS theme wiring.
 *
 * The model is constructed once (useFileTree captures its options at mount), so
 * everything dynamic — callbacks, pinned set — is read through refs. Path-set
 * changes flow through `model.resetPaths`; a pin toggle only re-runs the row
 * decorator, which reads the same ref.
 */
import {
  FileTree as PierreTree,
  useFileTree,
  type UseFileTreeResult,
} from '@pierre/trees/react';
import { Check, FilePlus, ImageUp, Pencil, Pin, RefreshCw, Trash2, X } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCallbackRef } from './useCallbackRef';
import type {
  ContextMenuAnchorRect,
  ContextMenuItem,
  ContextMenuOpenContext,
  FileTreeDirectoryHandle,
  FileTreeOptions,
  FileTreeRowDecoration,
} from '@pierre/trees';

type PierreModel = UseFileTreeResult['model'];

export interface WorkspaceTreeProps {
  /** Full flat list of workspace paths (files and, implicitly, directories). */
  paths: string[];
  /** Externally selected path — mirrored into the tree's highlight. */
  activePath?: string;
  title?: string;
  className?: string;
  onSelectFile: (path: string) => void;
  onSelectDirectory?: (path: string) => void;
  /** The pencil / "Edit" action — opens the path in the editor session. */
  onOpenInEditor?: (path: string, isDir: boolean) => void;
  openInEditorTitle?: string;
  pinnedPaths?: Map<string, boolean>;
  onTogglePin?: (path: string, isDir: boolean) => void;
  onDeletePath?: (path: string, isDir: boolean) => void;
  /** Swap a media file's bytes in place (keeps the path + version history). */
  onReplaceFile?: (path: string, file: File) => void;
  /** Reload the path list from the source; shows a spinner while `refreshing`. */
  onRefresh?: () => void;
  refreshing?: boolean;
  /**
   * Create a new empty file at `path`. Return a validation message (e.g.
   * "already exists") to keep the inline input open and show it; return
   * nothing on success and the tree closes the input. Omit this prop
   * entirely to hide the "new file" affordance (header button + directory
   * context-menu entry).
   */
  onCreateFile?: (path: string) => string | void;
  /** Lazy tree: fetch paths under a directory when it is expanded. */
  onExpandDirectory?: (path: string) => void;
  /**
   * Presence tooltips keyed by tree path (display path). When set for a row,
   * a small green dot decoration is shown after the name (pierre trees only
   * support text decorations inside the shadow host).
   */
  presenceTitles?: ReadonlyMap<string, string>;
}

const MEDIA_RE = /\.(png|jpe?g|gif|webp|avif|svg|bmp|ico|mp4|webm|mov|m4v|mp3|wav|ogg)$/i;

// Alias the app's shadcn tokens onto the tree's override variables. The tokens
// are full `oklch(…)` colors (Tailwind v4), so reference them directly and mint
// alpha tints with color-mix. Custom properties inherit across the shadow
// boundary and re-resolve there, so the tree swaps automatically when `.dark`
// flips on the root — no JS theme wiring.
const TREE_THEME_STYLE = {
  '--trees-bg-override': 'transparent',
  '--trees-fg-override': 'var(--foreground)',
  '--trees-fg-muted-override': 'var(--muted-foreground)',
  '--trees-bg-muted-override': 'color-mix(in oklch, var(--muted) 60%, transparent)',
  '--trees-selected-bg-override': 'color-mix(in oklch, var(--primary) 16%, transparent)',
  '--trees-selected-fg-override': 'var(--foreground)',
  '--trees-selected-focused-border-color-override':
    'color-mix(in oklch, var(--primary) 50%, transparent)',
  '--trees-accent-override': 'var(--primary)',
  '--trees-border-color-override': 'var(--border)',
  '--trees-indent-guide-bg-override': 'var(--border)',
  '--trees-focus-ring-color-override': 'var(--ring)',
  '--trees-scrollbar-thumb-override': 'color-mix(in oklch, var(--muted-foreground) 30%, transparent)',
  '--trees-input-bg-override': 'var(--background)',
  '--trees-search-bg-override': 'var(--background)',
  '--trees-search-fg-override': 'var(--foreground)',
  height: '100%',
  width: '100%',
} as React.CSSProperties;

/**
 * Fixed-position placement for the portaled context menu (see `RowContextMenu`
 * below). The tree virtualizes its rows behind `overflow: hidden` on its
 * shadow host — anything positioned inside that boundary (the library's own
 * default) gets hard-clipped the moment it would render past the host's own
 * box, which is exactly what happens when the tree sits in a narrow sidebar
 * next to a wide preview pane: the menu has nowhere to grow inside the host,
 * so it's cut off instead of overlapping the pane. Rendering into
 * `document.body` with `position: fixed` sidesteps that clip entirely; this
 * hook just works out where that fixed box should sit, flipping to the left
 * of the anchor (and, symmetrically, upward) when the default placement would
 * run off the viewport.
 */
function useMenuPlacement(anchorRect: ContextMenuAnchorRect) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    top: anchorRect.bottom,
    left: anchorRect.left,
    visibility: 'hidden',
  });

  // No dependency array: re-measure on every render, not just the first —
  // the delete button's confirm-step label ("Really delete folder?") is
  // wider than "Delete", so a re-render mid-open can change the menu's size.
  // The functional update below bails out (returns the same object) once the
  // numbers stop moving, so this converges in at most one extra render
  // instead of looping forever.
  useLayoutEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const margin = 8;
    const { width, height } = el.getBoundingClientRect();
    const left = anchorRect.left + width + margin > window.innerWidth
      ? anchorRect.right - width
      : anchorRect.left;
    const top = anchorRect.bottom + height + margin > window.innerHeight
      ? anchorRect.top - height
      : anchorRect.bottom;
    const next: React.CSSProperties = {
      position: 'fixed',
      left: Math.max(margin, Math.min(left, window.innerWidth - width - margin)),
      top: Math.max(margin, Math.min(top, window.innerHeight - height - margin)),
      visibility: 'visible',
    };
    setStyle((prev) =>
      prev.left === next.left && prev.top === next.top && prev.visibility === next.visibility
        ? prev
        : next,
    );
  });

  return { menuRef, style };
}

/**
 * Portaled to `document.body` (see `useMenuPlacement`'s doc comment for why)
 * rather than rendered where `@pierre/trees` slots it. `data-file-tree-
 * context-menu-root="true"` is the library's own escape hatch for this exact
 * case — its outside-click handler walks `event.composedPath()` looking for
 * that attribute, so a portaled menu is still recognized as "inside" even
 * though it is no longer a DOM descendant of the tree's slot.
 */
function RowContextMenu({
  item,
  context,
  isPinned,
  openInEditorTitle,
  onOpenInEditor,
  onNewFile,
  onTogglePin,
  onDeletePath,
  onReplaceFile,
}: {
  item: ContextMenuItem;
  context: ContextMenuOpenContext;
  isPinned: boolean;
  openInEditorTitle: string;
  onOpenInEditor?: (path: string, isDir: boolean) => void;
  /** Directory rows only — seeds the header's inline "new file" input with
   *  this directory as the path prefix. */
  onNewFile?: (dirPath: string) => void;
  onTogglePin?: (path: string, isDir: boolean) => void;
  onDeletePath?: (path: string, isDir: boolean) => void;
  onReplaceFile?: (path: string, file: File) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isDir = item.kind === 'directory';
  const isMedia = !isDir && MEDIA_RE.test(item.path);
  const { menuRef, style } = useMenuPlacement(context.anchorRect);

  return createPortal(
    <div
      ref={menuRef}
      data-file-tree-context-menu-root="true"
      style={style}
      className="z-50 min-w-40 rounded-md border bg-popover text-popover-foreground shadow-md py-1 text-sm"
    >
      {onNewFile && isDir && (
        <button
          type="button"
          onClick={() => {
            onNewFile(item.path);
            context.close();
          }}
          className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-muted"
        >
          <FilePlus className="h-3.5 w-3.5" />
          New file
        </button>
      )}
      {onOpenInEditor && (
        <button
          type="button"
          onClick={() => {
            onOpenInEditor(item.path, isDir);
            context.close();
          }}
          className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-muted"
        >
          <Pencil className="h-3.5 w-3.5" />
          {openInEditorTitle}
        </button>
      )}
      {onReplaceFile && isMedia && (
        <label className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-muted cursor-pointer">
          <ImageUp className="h-3.5 w-3.5" />
          Replace…
          <input
            type="file"
            accept="image/*,video/*,audio/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onReplaceFile(item.path, file);
              context.close();
            }}
          />
        </label>
      )}
      {onTogglePin && (
        <button
          type="button"
          onClick={() => {
            onTogglePin(item.path, isDir);
            context.close();
          }}
          className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-muted"
        >
          <Pin className="h-3.5 w-3.5" />
          {isPinned ? 'Unpin' : 'Pin'}
        </button>
      )}
      {onDeletePath && (
        <button
          type="button"
          onClick={() => {
            // Two-step confirm in place — the first click arms the control.
            if (!confirmDelete) {
              setConfirmDelete(true);
              return;
            }
            onDeletePath(item.path, isDir);
            context.close();
          }}
          className={`w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-destructive/10 text-destructive ${
            confirmDelete ? 'bg-destructive/10 font-medium' : ''
          }`}
        >
          <Trash2 className="h-3.5 w-3.5" />
          {confirmDelete ? `Really delete ${isDir ? 'folder' : 'file'}?` : 'Delete'}
        </button>
      )}
    </div>,
    document.body,
  );
}

/**
 * Inline "create a new file" control, slotted into the tree's header (same
 * light-DOM-in-shadow-root treatment as the header itself) rather than a
 * `window.prompt()` or a fake row spliced into the virtualized list. `Enter`
 * submits, `Escape` cancels; a returned validation string (e.g. "already
 * exists") stays inline instead of popping an alert.
 */
function NewFileRow({
  initialValue,
  onSubmit,
  onCancel,
}: {
  initialValue: string;
  onSubmit: (path: string) => string | void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Autofocus with the caret after the seeded directory prefix (if any) so
  // the user can just start typing the file name.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }, []);

  const submit = () => {
    const path = value.trim();
    if (!path || path.endsWith('/')) {
      setError('Enter a file name');
      return;
    }
    const validationError = onSubmit(path);
    if (validationError) setError(validationError);
  };

  return (
    <div className="px-2 py-1.5 border-b shrink-0">
      <div className="flex items-center gap-1">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={(e) => {
            // Keep @pierre/trees typeahead from treating letter/number keys as
            // "open search" while this header input is focused.
            e.stopPropagation();
            if (e.key === 'Enter') {
              e.preventDefault();
              submit();
            } else if (e.key === 'Escape') {
              e.preventDefault();
              onCancel();
            }
          }}
          placeholder="path/to/file.ts"
          spellCheck={false}
          className="flex-1 min-w-0 h-7 px-2 rounded border bg-background text-foreground text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <button
          type="button"
          onClick={submit}
          title="Create file"
          className="shrink-0 p-1 rounded hover:bg-muted text-emerald-600 dark:text-emerald-400"
        >
          <Check className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={onCancel}
          title="Cancel"
          className="shrink-0 p-1 rounded hover:bg-muted text-muted-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      {error && <p className="mt-1 text-[0.65rem] text-destructive">{error}</p>}
    </div>
  );
}

export function WorkspaceTree({
  paths,
  activePath,
  title = 'Files',
  className,
  onSelectFile,
  onSelectDirectory,
  onOpenInEditor,
  openInEditorTitle = 'Edit',
  pinnedPaths,
  onTogglePin,
  onDeletePath,
  onReplaceFile,
  onRefresh,
  refreshing,
  onCreateFile,
  onExpandDirectory,
  presenceTitles,
}: WorkspaceTreeProps) {
  // Refs keep the once-built model's captured closures pointed at fresh values.
  const modelRef = useRef<PierreModel | null>(null);
  const pinnedRef = useRef(pinnedPaths);
  const presenceRef = useRef(presenceTitles);
  // The inline "new file" input's state. `prefix` is the seeded directory
  // path (with trailing slash) when opened from a directory's context menu,
  // or "" from the header button (root-level). `seq` is bumped on every open
  // (even to the same prefix) so `NewFileRow` always remounts instead of
  // keeping a previous attempt's leftover value/error.
  const [creating, setCreating] = useState<{ prefix: string; seq: number } | null>(null);
  const creatingSeqRef = useRef(0);
  const startCreating = (prefix: string) => {
    creatingSeqRef.current += 1;
    setCreating({ prefix, seq: creatingSeqRef.current });
  };
  const selectFileRef = useCallbackRef(onSelectFile);
  const selectDirRef = useCallbackRef(onSelectDirectory);
  const expandDirRef = useCallbackRef(onExpandDirectory);
  const expandedDirsRef = useRef(new Set<string>());
  // Suppresses the callback when we mirror an external `activePath` selection.
  const suppressRef = useRef(false);
  pinnedRef.current = pinnedPaths;
  presenceRef.current = presenceTitles;

  const options = useRef<FileTreeOptions>({
    paths,
    initialExpansion: 'closed',
    density: 'compact',
    icons: { set: 'standard', colored: true },
    // The library owns the filter box in its own top bar — one less home-rolled
    // control, and it drives expansion/highlighting for free.
    search: true,
    searchBlurBehavior: 'retain',
    composition: {
      contextMenu: { enabled: true, triggerMode: 'both', buttonVisibility: 'when-needed' },
    },
    renderRowDecoration: ({ item }): FileTreeRowDecoration | null => {
      const presenceTitle = presenceRef.current?.get(item.path);
      if (presenceTitle) return { text: '●', title: presenceTitle };
      return pinnedRef.current?.has(item.path) ? { text: '★', title: 'Pinned' } : null;
    },
    onSelectionChange: (selected) => {
      const path = selected[selected.length - 1];
      if (!path || suppressRef.current) return;
      const isDir = modelRef.current?.getItem(path)?.isDirectory() ?? false;
      if (isDir) selectDirRef.current?.(path);
      else selectFileRef.current(path);
    },
  }).current;

  const { model } = useFileTree(options);
  modelRef.current = model;

  const pathsKey = paths.join('\n');

  // Lazy tree: detect directory expansion and ask the host to fetch that prefix.
  useEffect(() => {
    if (!onExpandDirectory) return;
    const knownDirs = () => {
      const dirs = new Set<string>();
      for (const path of paths) {
        const parts = path.split('/');
        for (let depth = 1; depth < parts.length; depth += 1) {
          dirs.add(parts.slice(0, depth).join('/'));
        }
      }
      return dirs;
    };
    return model.subscribe(() => {
      for (const dir of knownDirs()) {
        const item = model.getItem(dir);
        if (!item || !item.isDirectory()) continue;
        const directory = item as FileTreeDirectoryHandle;
        if (!directory.isExpanded() || expandedDirsRef.current.has(dir)) continue;
        expandedDirsRef.current.add(dir);
        expandDirRef.current?.(dir);
      }
    });
  }, [model, pathsKey, onExpandDirectory, expandDirRef, paths]);

  // Rebuild the tree when the path set changes (filter, refresh, delete). Skip
  // the first run — construction already seeded these paths and a reset here
  // would needlessly collapse the tree.
  const firstPathsRun = useRef(true);
  useEffect(() => {
    if (firstPathsRun.current) {
      firstPathsRun.current = false;
      return;
    }
    model.resetPaths(paths);
  }, [pathsKey, model]);

  // Mirror external selection (e.g. a tab opened elsewhere) into the highlight
  // without echoing it back through onSelectionChange.
  useEffect(() => {
    if (!activePath || !model.getItem(activePath)) return;
    const current = model.getSelectedPaths();
    if (current[current.length - 1] === activePath) return;
    suppressRef.current = true;
    model.focusPath(activePath);
    model.scrollToPath(activePath, { focus: false });
    suppressRef.current = false;
  }, [activePath, pathsKey, model]);

  // Submits the inline "new file" input: delegates the actual write to the
  // caller (workspace-vfs lives outside this package) and only closes the
  // input on success — a returned message means "invalid, try again".
  const submitNewFile = (path: string): string | void => {
    const result = onCreateFile?.(path);
    if (!result) setCreating(null);
    return result;
  };

  // The tree's own top bar (library header slot): title + new-file + refresh,
  // plus the inline "new file" row when open, so we don't stack a home-rolled
  // header above the widget. Light-DOM React, so Tailwind applies even though
  // it renders inside the shadow root.
  const header = (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
        <span>{title}</span>
        <span className="ml-auto flex items-center gap-0.5">
          {onCreateFile && (
            <button
              type="button"
              onClick={() => startCreating('')}
              title="New file"
              className="p-1 rounded hover:bg-muted hover:text-foreground"
            >
              <FilePlus className="h-3 w-3" />
            </button>
          )}
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              title="Refresh"
              className="p-1 rounded hover:bg-muted hover:text-foreground"
            >
              <RefreshCw className={`h-3 w-3 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          )}
        </span>
      </div>
      {creating && (
        // Keyed on the prefix so opening "new file" on a *different*
        // directory while the row is already open remounts it — otherwise
        // `NewFileRow`'s internal value/error state (seeded once from
        // `initialValue` at mount) would keep showing the previous attempt.
        <NewFileRow
          key={creating.seq}
          initialValue={creating.prefix}
          onSubmit={submitNewFile}
          onCancel={() => setCreating(null)}
        />
      )}
    </div>
  );

  return (
    // `relative z-10` lifts the whole column above the preview surface
    // painted after it, so any other shadow-root chrome (search overlay, drag
    // preview) that isn't already escaped via a portal stays visible over it.
    // The context menu itself is portaled straight to `document.body` (see
    // `RowContextMenu`) — the tree's own `overflow: hidden` host would clip
    // it otherwise, which `z-index` alone can't fix.
    <div className={`relative z-10 flex flex-col min-h-0 text-foreground ${className ?? ''}`}>
      {pinnedPaths && pinnedPaths.size > 0 && (
        <div className="px-2 py-1 border-b flex flex-wrap gap-1 shrink-0">
          {Array.from(pinnedPaths).map(([p, isDir]) => (
            <button
              key={p}
              type="button"
              onClick={() => (isDir ? onSelectDirectory?.(p) : onSelectFile(p))}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs hover:bg-muted/50 ${
                activePath === p ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
              }`}
            >
              <Pin className="h-2.5 w-2.5 shrink-0" />
              <span className="truncate max-w-[120px]">{p.split('/').pop()}</span>
              {onTogglePin && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePin(p, isDir);
                  }}
                  className="hover:text-destructive"
                >
                  <Trash2 className="h-2.5 w-2.5" />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
      <PierreTree
        model={model}
        header={header}
        style={TREE_THEME_STYLE}
        className="flex-1 min-h-0"
        renderContextMenu={(item, context) => (
          <RowContextMenu
            item={item}
            context={context}
            isPinned={pinnedRef.current?.has(item.path) ?? false}
            openInEditorTitle={openInEditorTitle}
            onOpenInEditor={onOpenInEditor}
            // `dirPath` can arrive with its own trailing slash (the library's
            // internal directory path convention) — strip it before adding
            // ours, or the seeded prefix doubles up to "dir//".
            onNewFile={
              onCreateFile ? (dirPath) => startCreating(`${dirPath.replace(/\/+$/, '')}/`) : undefined
            }
            onTogglePin={onTogglePin}
            onDeletePath={onDeletePath}
            onReplaceFile={onReplaceFile}
          />
        )}
      />
    </div>
  );
}
