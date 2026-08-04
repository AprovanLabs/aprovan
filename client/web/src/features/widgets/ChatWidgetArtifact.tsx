import {
  CodeBlockView,
  ViewModeToggle,
  WidgetPreview,
  scanToolsAccess,
} from "@aprovan/patchwork-editor";
import { createSingleFileProject } from "@aprovan/patchwork";
import {
  AlertCircle,
  Check,
  Loader2,
  Pencil,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePanelHostActions } from "@/components/panels/shell";
import { useCompiler, useServices, useSharedEditSession } from "@/contexts";
import { workflowCustomPreview } from "@/features/widgets/ChatWorkflowPreview";
import { saveWorkspaceProject } from "@/lib/workspace-vfs";
import { suggestWidgetPath } from "./suggest-artifact-path";

type SaveState = "preview" | "saving" | "saved" | "error" | "dismissed";

/**
 * Chat transcript widget: live preview while streaming, opt-in save with a
 * suggested `widgets/<slug>/main.tsx` path — never silent writes to root main.
 */
export function ChatWidgetArtifact({
  content,
  language,
  path,
  titleHint,
  isStreaming = false,
  onWidgetError,
}: {
  content: string;
  language?: string;
  path?: string;
  titleHint?: string;
  isStreaming?: boolean;
  onWidgetError?: (error: string) => void;
}) {
  const compiler = useCompiler();
  const services = useServices();
  const openEditSession = useSharedEditSession();
  const { onOpenFile } = usePanelHostActions();

  const scanned = useMemo(() => scanToolsAccess(content), [content]);
  const previewServices =
    scanned.namespaces.length > 0 ? scanned.namespaces : services;

  const suggestedPath = useMemo(
    () =>
      suggestWidgetPath({
        path,
        language,
        content,
        titleHint,
      }),
    [path, language, content, titleHint],
  );

  const [pathDraft, setPathDraft] = useState(suggestedPath);
  const [showCode, setShowCode] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("preview");
  const [savedPath, setSavedPath] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (saveState === "preview" || saveState === "saving") {
      setPathDraft(suggestedPath);
    }
  }, [suggestedPath, saveState]);

  const handleSave = useCallback(async () => {
    const target = pathDraft.replace(/^\/+|\/+$/g, "").trim();
    if (!target) return;
    setSaveState("saving");
    setSaveError(null);
    try {
      const parts = target.split("/").filter(Boolean);
      const entryFile = parts.pop() ?? "main.tsx";
      const projectId = parts.join("/");
      const project = createSingleFileProject(content, entryFile, projectId);
      await saveWorkspaceProject(project);
      setSavedPath(target);
      setSaveState("saved");
    } catch (err) {
      setSaveState("error");
      setSaveError(err instanceof Error ? err.message : "Save failed");
    }
  }, [content, pathDraft]);

  const handleEdit = useCallback(async () => {
    const target = savedPath ?? pathDraft.replace(/^\/+|\/+$/g, "").trim();
    if (!target) return;

    if (onOpenFile) {
      onOpenFile(target);
      return;
    }

    if (!openEditSession) return;
    const parts = target.split("/").filter(Boolean);
    const entryFile = parts.pop() ?? "main.tsx";
    const projectId = parts.join("/");
    const project = createSingleFileProject(content, entryFile, projectId);
    await openEditSession({
      projectId,
      entryFile,
      filePath: target,
      initialCode: content,
      initialProject: project,
    });
  }, [content, onOpenFile, openEditSession, pathDraft, savedPath]);

  if (saveState === "dismissed") return null;

  const showSaveFooter = !isStreaming && saveState !== "saved";

  return (
    <div className="not-prose my-2 border rounded-lg overflow-hidden min-w-0">
      <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b text-xs text-muted-foreground shrink-0">
        {isStreaming ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>Generating widget…</span>
          </>
        ) : saveState === "saved" ? (
          <>
            <Check className="h-3 w-3 text-emerald-600" />
            <span className="font-mono truncate">{savedPath}</span>
          </>
        ) : (
          <span>Widget preview</span>
        )}
        <div className="ml-auto flex gap-1">
          {saveState === "saved" && (
            <button
              type="button"
              onClick={() => void handleEdit()}
              className="px-2 py-1 text-xs rounded flex items-center gap-1 hover:bg-muted"
              title="Open in file pane"
            >
              <Pencil className="h-3 w-3" />
              Edit
            </button>
          )}
          <ViewModeToggle
            active={showCode}
            label={showCode ? "Preview" : "Code"}
            onClick={() => setShowCode((v) => !v)}
          />
        </div>
      </div>

      <div className="bg-muted/30 overflow-auto max-h-[60vh] min-h-[6rem]">
        {showCode ? (
          <CodeBlockView content={content} language={language ?? "tsx"} />
        ) : (
          <div className="p-3">
            {workflowCustomPreview({
              code: content,
              filePath: savedPath ?? path ?? suggestedPath,
            }) ?? (
              <WidgetPreview
                code={content}
                compiler={compiler}
                services={previewServices}
                enabled={!isStreaming}
                sourcePath={savedPath ?? path ?? suggestedPath}
                onError={onWidgetError}
              />
            )}
          </div>
        )}
      </div>

      {showSaveFooter && (
        <div className="border-t bg-muted/20 px-3 py-2 space-y-2">
          <p className="text-xs text-muted-foreground">
            Save to your workspace when you&apos;re ready — nothing is written until you confirm.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground shrink-0">Save to</span>
            <input
              value={pathDraft}
              onChange={(e) => setPathDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void handleSave();
              }}
              spellCheck={false}
              className="flex-1 min-w-[12rem] rounded border bg-background px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              type="button"
              disabled={saveState === "saving" || !pathDraft.trim()}
              onClick={() => void handleSave()}
              className="px-2 py-1 text-xs rounded bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {saveState === "saving" ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                "Save"
              )}
            </button>
            <button
              type="button"
              disabled={saveState === "saving"}
              onClick={() => setSaveState("dismissed")}
              className="px-2 py-1 text-xs rounded hover:bg-muted text-muted-foreground"
            >
              <X className="h-3 w-3 inline" /> Dismiss
            </button>
          </div>
          {saveState === "error" && saveError && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3 shrink-0" />
              {saveError}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
