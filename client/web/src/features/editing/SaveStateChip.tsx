import { AlertTriangle, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ChatSessionInfo } from "@/lib/chat-sessions";
import type { DraftState } from "./useLazyDraft";
import type { SaveState } from "./useDirectSave";

export type ChipState =
  | { kind: "readonly"; reason?: string }
  | { kind: "direct"; save: SaveState }
  | { kind: "staged"; draft: DraftState };

/**
 * Single save/draft/read-only indicator for the file pane header.
 * Draft state opens Review & apply (changes list + Apply/Discard).
 */
export function SaveStateChip({
  state,
  onApply,
  onDiscard,
  onOpenFile,
}: {
  state: ChipState;
  onApply?: () => Promise<void>;
  onDiscard?: () => Promise<void>;
  onOpenFile?: (path: string) => void;
}) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  if (state.kind === "readonly") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-muted-foreground"
        title={state.reason ?? "Read-only"}
      >
        <Lock className="h-3 w-3" />
        Read-only
      </span>
    );
  }

  if (state.kind === "direct") {
    return <DirectChip save={state.save} />;
  }

  const draft = state.draft;
  if (draft.kind === "none") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-muted-foreground"
        title="Changes to this path are drafted until you apply them"
      >
        Draft
      </span>
    );
  }

  if (draft.kind === "error") {
    return (
      <button
        type="button"
        onClick={() => draft.retry()}
        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-destructive hover:bg-destructive/10 rounded"
        title={draft.message}
      >
        <AlertTriangle className="h-3 w-3" />
        Couldn&apos;t save
      </button>
    );
  }

  const session = draft.session;
  const count = draft.changedFiles;
  const label = count > 0 ? `Draft · ${count} file${count === 1 ? "" : "s"}` : "Draft";

  return (
    <>
      <button
        type="button"
        onClick={() => setReviewOpen(true)}
        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded bg-violet-600/10 text-violet-700 dark:text-violet-300 hover:bg-violet-600/20"
        title="Review & apply drafted changes"
      >
        {label}
      </button>
      <ReviewDialog
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        session={session}
        busy={busy}
        onApply={async () => {
          if (!onApply) return;
          setBusy(true);
          try {
            await onApply();
            setReviewOpen(false);
          } finally {
            setBusy(false);
          }
        }}
        onDiscard={async () => {
          if (!onDiscard) return;
          setBusy(true);
          try {
            await onDiscard();
            setReviewOpen(false);
          } finally {
            setBusy(false);
          }
        }}
        onOpenFile={onOpenFile}
      />
    </>
  );
}

function DirectChip({ save }: { save: SaveState }) {
  if (save.kind === "saved") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs text-muted-foreground"
        title="Saved to your workspace"
      >
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Saved
      </span>
    );
  }
  if (save.kind === "edited") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-muted-foreground">
        Edited
      </span>
    );
  }
  if (save.kind === "saving") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-muted-foreground">
        <Loader2 className="h-3 w-3 animate-spin" />
        Saving…
      </span>
    );
  }
  if (save.kind === "offline") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-amber-600 dark:text-amber-400"
        title="Offline — changes are journaled and will sync when you're back"
      >
        Offline
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={() => save.retry()}
      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-destructive hover:bg-destructive/10 rounded"
      title={save.message}
    >
      <AlertTriangle className="h-3 w-3" />
      Couldn&apos;t save
    </button>
  );
}

function ReviewDialog({
  open,
  onOpenChange,
  session,
  busy,
  onApply,
  onDiscard,
  onOpenFile,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: ChatSessionInfo;
  busy: boolean;
  onApply: () => Promise<void>;
  onDiscard: () => Promise<void>;
  onOpenFile?: (path: string) => void;
}) {
  const changeRows = session.changes
    ? [
        ...session.changes.added.map((path) => ({ path, label: "new" as const })),
        ...session.changes.modified.map((path) => ({ path, label: "edited" as const })),
        ...session.changes.removed.map((path) => ({ path, label: "removed" as const })),
      ].sort((a, b) => a.path.localeCompare(b.path))
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Review &amp; apply</DialogTitle>
        <DialogClose onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          “{session.title}” holds drafted changes. Apply them to your workspace or discard.
        </p>
        {changeRows.length > 0 ? (
          <div className="max-h-40 overflow-y-auto rounded border">
            {changeRows.map((row) => (
              <button
                key={row.path}
                type="button"
                onClick={() => onOpenFile?.(row.path)}
                className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-xs hover:bg-muted"
              >
                <span
                  className={`w-14 shrink-0 text-[10px] uppercase tracking-wide ${
                    row.label === "new"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : row.label === "edited"
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {row.label}
                </span>
                <span className="truncate font-mono">{row.path}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">No listed file changes yet.</p>
        )}
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="secondary" disabled={busy} onClick={() => void onDiscard()}>
            Discard
          </Button>
          <Button size="sm" disabled={busy} onClick={() => void onApply()}>
            Apply to workspace
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
