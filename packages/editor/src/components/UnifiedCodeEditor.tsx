import { AlertCircle, FileCode, Pencil } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import type { Checker, Compiler } from "@aprovan/patchwork";
import { MarkdownPreview } from "./MarkdownPreview";
import { SaveAffordance, type SaveAffordanceState } from "./SaveAffordance";
import { ViewModeToggle } from "./ViewModeToggle";
import { WidgetPreview } from "./WidgetPreview";
import { CodeBlockView, MediaPreview, getFileType, type DefaultView } from "./edit";
import { markdownRoundTrips } from "./markdownRoundTrip";
import { staleFileAction } from "./staleFile";

export function initialUnifiedView(
  path: string,
  code: string,
): { view: DefaultView; richNotice: boolean } {
  const info = getFileType(path);
  if (info.defaultView === "rich" && !markdownRoundTrips(code)) {
    return { view: "code", richNotice: true };
  }
  return { view: info.defaultView, richNotice: false };
}

export interface UnifiedCodeEditorProps {
  path: string;
  /** Current buffer (host-owned). */
  content: string;
  /** External file contents used for fidelity probe / view reset when path changes. */
  code: string;
  stale?: boolean;
  /** Host-computed dirty flag for stale-file handling. */
  dirty?: boolean;
  /** When false, surfaces stay read-only. */
  editable?: boolean;
  compiler?: Compiler | null;
  services?: string[];
  language?: string;
  fill?: boolean;
  className?: string;
  saveState?: SaveAffordanceState;
  headerLeading?: ReactNode;
  headerExtra?: ReactNode;
  /** Rendered under the toolbar (e.g. path prompt, host banners). */
  belowHeader?: ReactNode;
  customPreview?: (args: {
    code: string;
    filePath?: string;
  }) => React.ReactNode | null | undefined;
  onChange?: (next: string) => void;
  onReload?: () => void;
  onKeepLocal?: () => void;
  onOpenEditor?: () => void;
  onWidgetError?: (error: string) => void;
  previewEnabled?: boolean;
  /** Injected typechecker for compile-before-preview. */
  checker?: Checker;
}

/**
 * One editor composition parameterised by whether editing is permitted.
 * Write-policy and buffer ownership stay with the host; this owns view-mode,
 * fidelity notice, stale banner, and body rendering.
 */
export function UnifiedCodeEditor({
  path,
  content,
  code,
  stale = false,
  dirty = false,
  editable = true,
  compiler = null,
  services = [],
  language,
  fill = true,
  className,
  saveState,
  headerLeading,
  headerExtra,
  belowHeader,
  customPreview,
  onChange,
  onReload,
  onKeepLocal,
  onOpenEditor,
  onWidgetError,
  previewEnabled = true,
  checker,
}: UnifiedCodeEditorProps) {
  const fileType = getFileType(path);
  const boot = initialUnifiedView(path, code);
  const [view, setView] = useState<DefaultView>(boot.view);
  const [richNotice, setRichNotice] = useState(boot.richNotice);

  useEffect(() => {
    const next = initialUnifiedView(path, code);
    setView(next.view);
    setRichNotice(next.richNotice);
  }, [path, code]);

  const staleAction = staleFileAction(stale, dirty);

  useEffect(() => {
    if (staleAction === "silent-reload") onReload?.();
  }, [staleAction, onReload]);

  const canEdit =
    editable &&
    view !== "preview" &&
    view !== "media" &&
    saveState?.kind !== "readonly";

  const toggleView = () => {
    if (!fileType.canToggleView) return;
    if (fileType.category === "compilable") {
      setView((v) => (v === "preview" ? "code" : "preview"));
      return;
    }
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

  const displayLanguage = language ?? fileType.language;
  const showBanner = staleAction === "offer-choice";

  const custom = customPreview?.({ code: content, filePath: path });

  let body: ReactNode;
  if (custom) {
    body = custom;
  } else if (view === "rich") {
    body = (
      <div className="p-4 prose prose-sm dark:prose-invert max-w-none">
        <MarkdownPreview
          value={content}
          editable={canEdit}
          onChange={canEdit ? onChange : undefined}
        />
      </div>
    );
  } else if (view === "preview") {
    body = (
      <div
        className={
          fill
            ? "flex flex-col flex-1 min-h-0 overflow-y-auto p-3"
            : `flex flex-col overflow-y-auto p-3${className ? ` ${className}` : ""}`
        }
      >
        <WidgetPreview
          code={content}
          compiler={compiler}
          services={services}
          enabled={previewEnabled}
          sourcePath={path}
          onError={onWidgetError}
          checker={checker}
        />
      </div>
    );
  } else if (view === "media") {
    body = (
      <MediaPreview content={content} mimeType={fileType.mimeType} fileName={path} />
    );
  } else {
    body = (
      <div
        className={
          fill
            ? "flex-1 min-h-0 overflow-auto bg-muted/30 h-full"
            : `bg-muted/30 overflow-auto${className ? ` ${className}` : ""}`
        }
      >
        <CodeBlockView
          content={content}
          language={displayLanguage}
          editable={canEdit}
          onChange={canEdit ? onChange : undefined}
        />
      </div>
    );
  }

  const shellClass = fill
    ? "flex flex-col h-full min-h-0 min-w-0"
    : "border rounded-lg overflow-hidden min-w-0";

  const bodyClass = fill
    ? "flex-1 min-h-0 overflow-y-auto bg-card"
    : `overflow-y-auto bg-card${className ? ` ${className}` : ""}`;

  return (
    <div className={shellClass}>
      <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b shrink-0">
        <FileCode className="h-4 w-4 text-muted-foreground shrink-0" />
        {headerLeading}
        <div className="ml-auto flex items-center gap-1">
          {saveState && <SaveAffordance state={saveState} />}
          {fileType.canToggleView && (
            <ViewModeToggle
              active={view === "preview" || view === "rich"}
              label={toggleLabel}
              onClick={toggleView}
            />
          )}
          {onOpenEditor && (
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
          {headerExtra}
        </div>
      </div>

      {belowHeader}

      {showBanner && (
        <div className="shrink-0 px-3 py-1.5 text-xs bg-orange-50 dark:bg-orange-950/40 border-b border-orange-200 dark:border-orange-800 flex items-center gap-2 text-orange-700 dark:text-orange-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>This file changed elsewhere.</span>
          <button
            type="button"
            onClick={onReload}
            className="ml-auto underline hover:no-underline"
          >
            Reload
          </button>
          <button
            type="button"
            onClick={onKeepLocal}
            className="underline hover:no-underline"
          >
            Keep mine
          </button>
        </div>
      )}

      {richNotice && (
        <div className="shrink-0 px-3 py-1.5 text-xs bg-muted/60 border-b text-muted-foreground">
          Shown as source — rich view can&apos;t represent this file exactly.
        </div>
      )}

      <div className={bodyClass}>{body}</div>
    </div>
  );
}
