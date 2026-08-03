/**
 * MergeDialog — plain-language conflict resolution for draft chats.
 *
 * When a draft is applied (or refreshed) and the workspace has moved under
 * one of its files, each file gets one human question — "Both you and the
 * workspace changed this. Which should win?" — with three answers:
 *
 *   Keep my draft        → the draft's version overwrites on apply
 *   Keep workspace       → the draft drops its change (sessions.discard)
 *   Combine with AI      → the model merges both versions; anything it had
 *                          to decide is surfaced as short plain notes
 *
 * No Git vocabulary anywhere: no "conflict markers", no ours/theirs, no
 * hashes. Resolutions are written back into the draft's overlay, so the
 * caller can then apply cleanly (or just keep working).
 */

import { AlertCircle, Check, Loader2, Sparkles } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { discardSessionChanges } from "@/lib/chat-sessions";
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

interface MergeDialogProps {
  open: boolean;
  sessionId: string;
  /** Paths where both the draft and the workspace changed. */
  conflicts: string[];
  /** What happens after resolutions land ("apply" continues the apply). */
  finalizeLabel: string;
  busy: boolean;
  runCompletion: (messages: ChatCompletionMessage[]) => Promise<string>;
  onCancel: () => void;
  onResolved: () => void;
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

export function MergeDialog({
  open,
  sessionId,
  conflicts,
  finalizeLabel,
  busy,
  runCompletion,
  onCancel,
  onResolved,
}: MergeDialogProps) {
  const [resolutions, setResolutions] = useState<Map<string, FileResolution>>(new Map());
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setResolution = useCallback((path: string, patch: Partial<FileResolution>) => {
    setResolutions((prev) => {
      const next = new Map(prev);
      next.set(path, { choice: "draft", ...prev.get(path), ...patch });
      return next;
    });
  }, []);

  const combineWithAI = useCallback(
    async (path: string) => {
      setResolution(path, { choice: "ai", aiBusy: true, aiError: undefined });
      try {
        // The active VFS scope is this draft, so a plain read is the draft's
        // version; the unscoped read is what the workspace has now.
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
    async (choices: Map<string, FileResolution>) => {
      setApplying(true);
      setError(null);
      try {
        const keepWorkspace: string[] = [];
        for (const path of conflicts) {
          const resolution = choices.get(path) ?? { choice: "draft" as const };
          if (resolution.choice === "workspace") keepWorkspace.push(path);
          else if (resolution.choice === "ai") {
            if (resolution.aiContent === undefined) {
              throw new Error(`“${path}” is set to Combine but hasn't been combined yet.`);
            }
            await writeFile(path, resolution.aiContent); // session-scoped write
          }
          // "draft" needs nothing — the draft already holds that version.
        }
        if (keepWorkspace.length > 0) {
          await discardSessionChanges(sessionId, keepWorkspace);
        }
        onResolved();
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setApplying(false);
      }
    },
    [conflicts, sessionId, onResolved],
  );

  const confirm = useCallback(async () => {
    await applyResolutions(resolutions);
  }, [applyResolutions, resolutions]);

  /** Bulk keep-all — only surface that executes bulk resolutions (tech-plan D6). */
  const resolveAll = useCallback(
    async (choice: "draft" | "workspace") => {
      const next = new Map<string, FileResolution>();
      for (const path of conflicts) next.set(path, { choice });
      setResolutions(next);
      await applyResolutions(next);
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
      <DialogContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          While this draft was open, your workspace changed too. For each file, choose which
          version to keep — or let AI combine them and tell you what it decided.
        </p>

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
          return (
            <div key={path} className="rounded-md border p-3 space-y-2">
              <div className="font-mono text-xs truncate" title={path}>
                {path}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={resolution.choice === "draft" ? "default" : "outline"}
                  className="h-7 text-xs"
                  onClick={() => setResolution(path, { choice: "draft" })}
                >
                  Keep my draft's version
                </Button>
                <Button
                  size="sm"
                  variant={resolution.choice === "workspace" ? "default" : "outline"}
                  className="h-7 text-xs"
                  onClick={() => setResolution(path, { choice: "workspace" })}
                >
                  Keep the workspace version
                </Button>
                <Button
                  size="sm"
                  variant={resolution.choice === "ai" ? "default" : "outline"}
                  className="h-7 text-xs gap-1"
                  disabled={resolution.aiBusy}
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
                  <pre className="max-h-32 overflow-auto rounded bg-muted p-2 text-[11px]">
                    {resolution.aiContent.slice(0, 2000)}
                    {resolution.aiContent.length > 2000 ? "\n…" : ""}
                  </pre>
                </div>
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
