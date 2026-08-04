import {
  CodeBlockView,
  MarkdownPreview,
  MediaPreview,
  ViewModeToggle,
  WidgetPreview,
  getFileType,
  markdownRoundTrips,
  type DefaultView,
} from "@aprovan/editor";
import type { Compiler } from "@aprovan/patchwork";
import { AlertCircle, FileCode, Pencil } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SaveStateChip, type ChipState } from "./SaveStateChip";
import { useDirectSave } from "./useDirectSave";
import { useLazyDraft } from "./useLazyDraft";
import {
  getCachedStagedPrefixes,
  loadStagedPrefixes,
  resolveWritePolicy,
  type WritePolicy,
} from "./write-policy";

const STAGED_DEBOUNCE_MS = 1000;

function fileLabel(path: string): string {
  const parts = path.replace(/\/+$/, "").split("/");
  return parts[parts.length - 1] || path;
}

function initialView(path: string, code: string): { view: DefaultView; richNotice: boolean } {
  const info = getFileType(path);
  if (info.defaultView === "rich" && !markdownRoundTrips(code)) {
    return { view: "code", richNotice: true };
  }
  return { view: info.defaultView, richNotice: false };
}

/**
 * In-tab editable surface for markdown/text/compilable files.
 * Composes editor primitives + write-policy save hooks; EditModal stays
 * behind an explicit "Open editor" for compilable widgets.
 */
export function FileEditorPane({
  path,
  code,
  stale = false,
  compiler,
  services,
  onReload,
  onKeepLocal,
  onOpenEditor,
  onOpenFile,
}: {
  path: string;
  code: string;
  stale?: boolean;
  compiler: Compiler | null;
  services: string[];
  onReload: () => void;
  onKeepLocal: () => void;
  onOpenEditor?: () => void;
  onOpenFile?: (path: string) => void;
}) {
  const fileType = getFileType(path);

  const boot = initialView(path, code);
  const [view, setView] = useState<DefaultView>(boot.view);
  const [richNotice, setRichNotice] = useState(boot.richNotice);
  const [content, setContent] = useState(code);
  const [baseline, setBaseline] = useState(code);

  const [policy, setPolicy] = useState<WritePolicy>(() =>
    resolveWritePolicy(path, getCachedStagedPrefixes()),
  );
  const [policyReady, setPolicyReady] = useState(
    () => getCachedStagedPrefixes().loadedAt > 0,
  );

  const direct = useDirectSave(path);
  const draft = useLazyDraft({ path, label: fileLabel(path) });
  const stagedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentRef = useRef(content);
  contentRef.current = content;
  const pendingStagedRef = useRef<string | null>(null);

  // Path / external code change: reset buffer when the tab reloads clean content.
  useEffect(() => {
    const next = initialView(path, code);
    setView(next.view);
    setRichNotice(next.richNotice);
    setContent(code);
    setBaseline(code);
  }, [path, code]);

  useEffect(() => {
    let cancelled = false;
    void loadStagedPrefixes().then((sets) => {
      if (cancelled) return;
      setPolicy(resolveWritePolicy(path, sets));
      setPolicyReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [path]);

  const dirty = content !== baseline;

  // Clean buffer + external change → silent reload; dirty → banner only.
  useEffect(() => {
    if (!stale) return;
    if (!dirty) onReload();
  }, [stale, dirty, onReload]);

  const scheduleStagedSave = useCallback(
    (next: string) => {
      pendingStagedRef.current = next;
      if (stagedTimerRef.current) clearTimeout(stagedTimerRef.current);
      stagedTimerRef.current = setTimeout(() => {
        const pending = pendingStagedRef.current;
        if (pending === null) return;
        pendingStagedRef.current = null;
        setBaseline(pending);
        void draft.save(path, pending);
      }, STAGED_DEBOUNCE_MS);
    },
    [draft, path],
  );

  const handleChange = useCallback(
    (next: string) => {
      setContent(next);
      if (!policyReady || policy === "readonly") return;
      if (policy === "direct") {
        direct.onChange(next);
        return;
      }
      scheduleStagedSave(next);
    },
    [policy, policyReady, direct, scheduleStagedSave],
  );

  // Advance baseline when a direct save completes.
  const prevDirectKind = useRef(direct.state.kind);
  useEffect(() => {
    const prev = prevDirectKind.current;
    prevDirectKind.current = direct.state.kind;
    if (policy === "direct" && prev !== "saved" && direct.state.kind === "saved") {
      setBaseline(contentRef.current);
    }
  }, [policy, direct.state.kind]);

  useEffect(() => {
    if (policy !== "staged") return;
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault();
        if (stagedTimerRef.current) {
          clearTimeout(stagedTimerRef.current);
          stagedTimerRef.current = null;
        }
        const pending = contentRef.current;
        pendingStagedRef.current = null;
        setBaseline(pending);
        void draft.save(path, pending);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [policy, draft, path]);

  useEffect(() => {
    return () => {
      if (stagedTimerRef.current) clearTimeout(stagedTimerRef.current);
    };
  }, []);
  const chipState: ChipState =
    policy === "readonly"
      ? {
          kind: "readonly",
          reason: "This is a mounted repository — read-only",
        }
      : policy === "staged"
        ? { kind: "staged", draft: draft.state }
        : { kind: "direct", save: direct.state };

  const editable = policy !== "readonly" && view !== "preview" && view !== "media";
  const showBanner = stale && dirty;

  const toggleView = () => {
    if (!fileType.canToggleView) return;
    if (fileType.category === "compilable") {
      setView((v) => (v === "preview" ? "code" : "preview"));
      return;
    }
    // markdown rich ↔ code
    setView((v) => (v === "rich" ? "code" : "rich"));
    setRichNotice(false);
  };

  const toggleLabel =
    fileType.category === "compilable"
      ? view === "preview"
        ? "Preview"
        : "Code"
      : view === "rich"
        ? "Rich text"
        : "Source";

  return (
    <div className="flex flex-col h-full min-h-0 min-w-0">
      <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b shrink-0">
        <FileCode className="h-4 w-4 text-muted-foreground shrink-0" />
        <div className="ml-auto flex items-center gap-1">
          <SaveStateChip
            state={chipState}
            onApply={async () => {
              await draft.apply();
            }}
            onDiscard={async () => {
              await draft.discard();
            }}
            onOpenFile={onOpenFile}
          />
          {fileType.canToggleView && (
            <ViewModeToggle
              active={view === "preview" || view === "rich"}
              label={toggleLabel}
              onClick={toggleView}
            />
          )}
          {fileType.category === "compilable" && onOpenEditor && (
            <button
              type="button"
              onClick={onOpenEditor}
              className="px-2 py-1 text-xs rounded flex items-center gap-1 hover:bg-muted"
              title="Edit"
            >
              <Pencil className="h-3 w-3" />
              Edit
            </button>
          )}
        </div>
      </div>

      {showBanner && (
        <div className="shrink-0 px-3 py-1.5 text-xs bg-orange-50 dark:bg-orange-950/40 border-b border-orange-200 dark:border-orange-800 flex items-center gap-2 text-orange-700 dark:text-orange-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>This file changed elsewhere.</span>
          <button onClick={onReload} className="ml-auto underline hover:no-underline">
            Reload
          </button>
          <button onClick={onKeepLocal} className="underline hover:no-underline">
            Keep mine
          </button>
        </div>
      )}

      {richNotice && (
        <div className="shrink-0 px-3 py-1.5 text-xs bg-muted/60 border-b text-muted-foreground">
          Shown as source — rich view can&apos;t represent this file exactly.
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto bg-card">
        {view === "rich" ? (
          <div className="p-4 prose prose-sm dark:prose-invert max-w-none">
            <MarkdownPreview
              value={content}
              editable={editable}
              onChange={editable ? handleChange : undefined}
            />
          </div>
        ) : view === "preview" ? (
          <div className="flex flex-col flex-1 min-h-0 overflow-y-auto p-3">
            <WidgetPreview
              code={content}
              compiler={compiler}
              services={services}
              sourcePath={path}
            />
          </div>
        ) : view === "media" ? (
          <MediaPreview content={content} mimeType={fileType.mimeType} fileName={path} />
        ) : (
          <div className="flex-1 min-h-0 overflow-auto bg-muted/30 h-full">
            <CodeBlockView
              content={content}
              language={fileType.language}
              editable={editable}
              onChange={editable ? handleChange : undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
}
