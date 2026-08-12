/**
 * MergeDialog — plain-language conflict resolution for draft chats.
 *
 * When a draft is applied (or refreshed) and the workspace has moved under
 * one of its files, each file gets one human question — "Both you and the
 * workspace changed this. Which should win?" — with three answers:
 *
 *   Keep my draft        → the draft's version overwrites on apply
 *   Keep workspace       → the draft drops its change
 *   Combine with AI      → the model merges both versions; anything it had
 *                          to decide is surfaced as short plain notes
 *
 * Both versions are visible via DiffViewer before choosing. Confirm submits
 * through `sessions.resolve` (server applies atomically). No Git vocabulary.
 */

import { DiffViewer } from "@aprovan/editor";
import { AlertCircle, Check, ChevronDown, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  discardSessionChanges,
  resolveChatSession,
  syncChatSession,
} from "@/lib/chat-sessions";
import { readFile, readWorkspaceFileUnscoped, writeFile } from "@/lib/workspace-vfs";
import type { ChatCompletionMessage } from "@/lib/llm";

type Choice = "draft" | "workspace" | "ai";

interface FileResolution {
  choice: Choice;
  aiContent?: string;
  aiNotes?: string;
  aiBusy?: boolean;
  aiError?: string;
}

type PaneLoad =
  | { status: "loading" }
  | { status: "ready"; content: string }
  | { status: "missing" }
  | { status: "error"; error: string };

interface MergeDialogProps {
  open: boolean;
  sessionId: string;
  /** Paths where both the draft and the workspace changed. */
  conflicts: string[];
  /** What happens after resolutions land ("apply" continues the apply). */
  finalizeLabel: string;
  /** When true, `sessions.resolve` applies the draft after settling. */
  applyOnConfirm: boolean;
  busy: boolean;
  runCompletion: (messages: ChatCompletionMessage[]) => Promise<string>;
  onCancel: () => void;
  /** Fired after resolve succeeds. `applied` mirrors applyOnConfirm. */
  onResolved: (result: { applied: boolean }) => void;
}

function extractFencedBlock(text: string): { content: string; notes: string } | null {
  const match = text.match(/```[^\n]*\n([\s\S]*?)```/);
  if (!match || match[1] === undefined) return null;
  const notes = text
    .slice((match.index ?? 0) + match[0].length)
    .trim()
    .replace(/^no questions\.?$/i, "");
  return { content: match[1], notes };
}

function ConflictDiff({
  path,
  afterContent,
  afterLabel,
}: {
  path: string;
  afterContent?: string;
  afterLabel: string;
}) {
  const [draft, setDraft] = useState<PaneLoad>({ status: "loading" });
  const [workspace, setWorkspace] = useState<PaneLoad>({ status: "loading" });
  const [tick, setTick] = useState(0);

  const load = useCallback(() => {
    setDraft({ status: "loading" });
    setWorkspace({ status: "loading" });
    void readFile(path)
      .then((content) => setDraft({ status: "ready", content }))
      .catch((err) =>
        setDraft({
          status: "error",
          error: err instanceof Error ? err.message : "Couldn't load this version.",
        }),
      );
    void readWorkspaceFileUnscoped(path)
      .then((content) => setWorkspace({ status: "ready", content }))
      .catch((err) =>
        setWorkspace({
          status: "error",
          error: err instanceof Error ? err.message : "Couldn't load this version.",
        }),
      );
  }, [path]);

  useEffect(() => {
    load();
  }, [load, tick]);

  const before =
    workspace.status === "ready"
      ? { label: "Workspace version", content: workspace.content, status: "ready" as const }
      : workspace.status === "loading"
        ? { label: "Workspace version", status: "loading" as const }
        : workspace.status === "error"
          ? {
              label: "Workspace version",
              status: "error" as const,
              error: workspace.error,
              onRetry: () => setTick((n) => n + 1),
            }
          : { label: "Workspace version", status: "missing" as const };

  const after =
    afterContent !== undefined
      ? { label: afterLabel, content: afterContent, status: "ready" as const }
      : draft.status === "ready"
        ? { label: afterLabel, content: draft.content, status: "ready" as const }
        : draft.status === "loading"
          ? { label: afterLabel, status: "loading" as const }
          : draft.status === "error"
            ? {
                label: afterLabel,
                status: "error" as const,
                error: draft.error,
                onRetry: () => setTick((n) => n + 1),
              }
            : { label: afterLabel, status: "missing" as const };

  return <DiffViewer before={before} after={after} className="mt-1" />;
}

export function MergeDialog({
  open,
  sessionId,
  conflicts: conflictsProp,
  finalizeLabel,
  applyOnConfirm,
  busy,
  runCompletion,
  onCancel,
  onResolved,
}: MergeDialogProps) {
  const [conflicts, setConflicts] = useState(conflictsProp);
  const [resolutions, setResolutions] = useState<Map<string, FileResolution>>(new Map());
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(conflictsProp));
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [staleBanner, setStaleBanner] = useState(false);

  useEffect(() => {
    if (!open) return;
    setConflicts(conflictsProp);
    setExpanded(new Set(conflictsProp));
    setStaleBanner(false);
    setError(null);
  }, [open, conflictsProp]);

  const setResolution = useCallback((path: string, patch: Partial<FileResolution>) => {
    setResolutions((prev) => {
      const next = new Map(prev);
      next.set(path, { choice: "draft", ...prev.get(path), ...patch });
      return next;
    });
  }, []);

  const toggleExpanded = useCallback((path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  const combineWithAI = useCallback(
    async (path: string) => {
      setResolution(path, { choice: "ai", aiBusy: true, aiError: undefined });
      setExpanded((prev) => new Set(prev).add(path));
      try {
        // Active VFS scope is this draft → plain read is draft; unscoped is workspace.
        const [draft, workspace] = await Promise.all([
          readFile(path).catch(() => ""),
          readWorkspaceFileUnscoped(path).catch(() => ""),
        ]);
        const reply = await runCompletion([
          {
            role: "user",
            content: [
              `Two people edited the same file and both versions matter. Combine them into one file that keeps the intent of both.`,
              ``,
              `File: ${path}`,
              ``,
              `VERSION A (from a draft chat):`,
              "```",
              draft,
              "```",
              ``,
              `VERSION B (the current workspace):`,
              "```",
              workspace,
              "```",
              ``,
              `Reply with the combined file in ONE fenced code block. After the block, write "No questions." — or, if you had to make a judgment call a person should double-check, list at most 3 short notes in everyday language (no jargon).`,
            ].join("\n"),
          },
        ]);
        const parsed = extractFencedBlock(reply);
        if (!parsed) throw new Error("The model didn't return a combined file — try again or pick a version.");
        setResolution(path, {
          choice: "ai",
          aiBusy: false,
          aiContent: parsed.content,
          aiNotes: parsed.notes,
        });
      } catch (err) {
        setResolution(path, {
          choice: "ai",
          aiBusy: false,
          aiError: err instanceof Error ? err.message : String(err),
        });
      }
    },
    [runCompletion, setResolution],
  );

  const applyResolutions = useCallback(
    async (choices: Map<string, FileResolution>, paths: string[]) => {
      setApplying(true);
      setError(null);
      try {
        // Re-sync: if the workspace moved again, refresh the conflict set.
        const { conflicts: fresh } = await syncChatSession(sessionId);
        const freshPaths = fresh.map((c) => c.path).sort();
        const prior = [...paths].sort();
        const same =
          freshPaths.length === prior.length &&
          freshPaths.every((path, i) => path === prior[i]);
        if (!same) {
          setConflicts(freshPaths);
          setExpanded((prev) => {
            const next = new Set(prev);
            for (const path of freshPaths) next.add(path);
            return next;
          });
          setStaleBanner(true);
          setResolutions((prev) => {
            const next = new Map<string, FileResolution>();
            for (const path of freshPaths) {
              const kept = prev.get(path);
              if (kept) next.set(path, kept);
            }
            return next;
          });
          return;
        }

        const keepWorkspace: string[] = [];
        let anyAiOrDraft = false;
        for (const path of paths) {
          const resolution = choices.get(path) ?? { choice: "draft" as const };
          if (resolution.choice === "workspace") keepWorkspace.push(path);
          else {
            anyAiOrDraft = true;
            if (resolution.choice === "ai") {
              if (resolution.aiContent === undefined) {
                throw new Error(`“${path}” is set to Combine but hasn't been combined yet.`);
              }
              await writeFile(path, resolution.aiContent);
            }
          }
        }

        // Server resolve is bulk-strategy today (stream 1); prepare the overlay
        // for mixed/AI choices, then settle via keep-draft / keep-workspace.
        if (keepWorkspace.length > 0 && keepWorkspace.length === paths.length) {
          await resolveChatSession(sessionId, {
            strategy: "keep-workspace",
            apply: applyOnConfirm,
          });
        } else {
          if (keepWorkspace.length > 0) {
            await discardSessionChanges(sessionId, keepWorkspace);
          }
          if (anyAiOrDraft || keepWorkspace.length < paths.length) {
            await resolveChatSession(sessionId, {
              strategy: "keep-draft",
              apply: applyOnConfirm,
            });
          } else if (applyOnConfirm) {
            await resolveChatSession(sessionId, {
              strategy: "keep-draft",
              apply: true,
            });
          }
        }

        onResolved({ applied: applyOnConfirm });
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setApplying(false);
      }
    },
    [sessionId, applyOnConfirm, onResolved],
  );

  const confirm = useCallback(async () => {
    await applyResolutions(resolutions, conflicts);
  }, [applyResolutions, resolutions, conflicts]);

  /** Bulk keep-all — only surface that executes bulk resolutions (tech-plan D6). */
  const resolveAll = useCallback(
    async (choice: "draft" | "workspace") => {
      const next = new Map<string, FileResolution>();
      for (const path of conflicts) next.set(path, { choice });
      setResolutions(next);
      await applyResolutions(next, conflicts);
    },
    [conflicts, applyResolutions],
  );

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onCancel()}>
      <DialogHeader>
        <DialogTitle>
          <span className="text-base">Some files changed in two places</span>
        </DialogTitle>
        <DialogClose onClose={onCancel} />
      </DialogHeader>
      <DialogContent className="space-y-4 max-h-[85vh] overflow-y-auto">
        <p className="text-sm text-muted-foreground">
          While this draft was open, your workspace changed too. For each file, choose which
          version to keep — or let AI combine them and tell you what it decided.
        </p>

        {staleBanner && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-900 dark:text-amber-200"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <span>
              The workspace changed while you were deciding — review again. Prior choices are
              kept where paths still conflict.
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs"
            disabled={applying || busy}
            onClick={() => void resolveAll("draft")}
          >
            Keep all mine
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs"
            disabled={applying || busy}
            onClick={() => void resolveAll("workspace")}
          >
            Keep all workspace
          </Button>
        </div>

        {conflicts.map((path) => {
          const resolution = resolutions.get(path) ?? { choice: "draft" as const };
          const isOpen = expanded.has(path);
          const afterLabel =
            resolution.choice === "ai" && resolution.aiContent !== undefined
              ? "Combined version"
              : "This draft's version";
          return (
            <div key={path} className="rounded-md border p-3 space-y-2">
              <button
                type="button"
                onClick={() => toggleExpanded(path)}
                className="flex w-full items-center gap-1.5 text-left"
              >
                {isOpen ? (
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                )}
                <span className="font-mono text-xs truncate" title={path}>
                  {path}
                </span>
              </button>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={resolution.choice === "draft" ? "default" : "outline"}
                  className="h-7 text-xs"
                  disabled={applying || busy || resolution.aiBusy}
                  onClick={() => setResolution(path, { choice: "draft" })}
                >
                  Keep my draft's version
                </Button>
                <Button
                  size="sm"
                  variant={resolution.choice === "workspace" ? "default" : "outline"}
                  className="h-7 text-xs"
                  disabled={applying || busy || resolution.aiBusy}
                  onClick={() => setResolution(path, { choice: "workspace" })}
                >
                  Keep the workspace version
                </Button>
                <Button
                  size="sm"
                  variant={resolution.choice === "ai" ? "default" : "outline"}
                  className="h-7 text-xs gap-1"
                  disabled={applying || busy || resolution.aiBusy}
                  onClick={() => void combineWithAI(path)}
                >
                  {resolution.aiBusy ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Sparkles className="h-3 w-3" />
                  )}
                  Combine with AI
                </Button>
              </div>
              {resolution.choice === "ai" && resolution.aiError && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 shrink-0" /> {resolution.aiError}
                </p>
              )}
              {resolution.choice === "ai" && resolution.aiContent !== undefined && (
                <div className="space-y-1">
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Combined and ready.
                  </p>
                  {resolution.aiNotes && (
                    <div className="text-xs text-muted-foreground whitespace-pre-wrap border-l-2 pl-2">
                      {resolution.aiNotes}
                    </div>
                  )}
                </div>
              )}
              {isOpen && (
                <ConflictDiff
                  path={path}
                  afterLabel={afterLabel}
                  afterContent={
                    resolution.choice === "ai" ? resolution.aiContent : undefined
                  }
                />
              )}
            </div>
          );
        })}

        {error && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onCancel} disabled={applying}>
            Not now
          </Button>
          <Button size="sm" onClick={() => void confirm()} disabled={applying || busy}>
            {applying ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : finalizeLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
