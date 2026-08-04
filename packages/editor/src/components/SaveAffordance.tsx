import { AlertTriangle, Loader2, Lock, Save } from "lucide-react";
import { useState, type ReactNode } from "react";

/** Manual save button status (CodePreview / EditModal). */
export type SaveStatus = "unsaved" | "saving" | "saved" | "error";

/** Direct write-through chip status (FileEditorPane). */
export type DirectSaveState =
  | { kind: "saved" }
  | { kind: "edited" }
  | { kind: "saving" }
  | { kind: "error"; message: string; retry: () => void }
  | { kind: "offline" };

/** Staged draft chip status — host maps session info into this shape. */
export type DraftAffordanceState =
  | { kind: "none" }
  | {
      kind: "active";
      title: string;
      changedFiles: number;
      changes?: { added: string[]; modified: string[]; removed: string[] };
    }
  | { kind: "error"; message: string; retry: () => void };

export type SaveAffordanceState =
  | { kind: "readonly"; reason?: string }
  | {
      kind: "button";
      status: SaveStatus;
      onClick: () => void;
      disabled?: boolean;
      tone?: "muted" | "primary";
      target?: string;
    }
  | { kind: "direct"; save: DirectSaveState }
  | {
      kind: "staged";
      draft: DraftAffordanceState;
      onApply?: () => Promise<void>;
      onDiscard?: () => Promise<void>;
      onOpenFile?: (path: string) => void;
    };

export interface SaveConfirmDialogProps {
  isOpen: boolean;
  isSaving: boolean;
  error: string | null;
  onSave: () => void;
  onDiscard: () => void;
  onCancel: () => void;
}

/**
 * One save affordance for direct, staged (debounce + flush), read-only,
 * manual button, and unsaved-close confirmation.
 */
export function SaveAffordance({ state }: { state: SaveAffordanceState }) {
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

  if (state.kind === "button") {
    return (
      <SaveStatusButton
        status={state.status}
        onClick={state.onClick}
        disabled={state.disabled}
        tone={state.tone ?? "muted"}
        target={state.target}
      />
    );
  }

  if (state.kind === "direct") {
    return <DirectChip save={state.save} />;
  }

  return (
    <StagedChip
      draft={state.draft}
      onApply={state.onApply}
      onDiscard={state.onDiscard}
      onOpenFile={state.onOpenFile}
    />
  );
}

function getToneClass(tone: "muted" | "primary", status: SaveStatus): string {
  if (status === "error") {
    return tone === "muted"
      ? "text-destructive hover:bg-muted"
      : "text-destructive hover:bg-destructive/10";
  }
  if (status === "saved") {
    return tone === "muted"
      ? "text-muted-foreground/50 hover:bg-muted"
      : "text-primary/50 hover:bg-primary/10";
  }
  return tone === "muted"
    ? "text-muted-foreground hover:bg-muted"
    : "text-primary hover:bg-primary/20";
}

/** @deprecated Prefer SaveAffordance with kind: "button". Kept as a named export for callers. */
export function SaveStatusButton({
  status,
  onClick,
  disabled = false,
  tone,
  target,
}: {
  status: SaveStatus;
  onClick: () => void;
  disabled?: boolean;
  tone: "muted" | "primary";
  target?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-2 py-1 text-xs rounded flex items-center gap-1 disabled:opacity-50 ${getToneClass(tone, status)}`}
      title={target ? `Save to ${target}` : "Save"}
    >
      <span className="inline-flex h-3 w-3 items-center justify-center shrink-0">
        {status === "saving" ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : status === "error" ? (
          <AlertTriangle className="h-3 w-3" />
        ) : (
          <Save className={`h-3 w-3 ${status === "saved" ? "opacity-60" : "opacity-100"}`} />
        )}
      </span>
      Save
    </button>
  );
}

function DirectChip({ save }: { save: DirectSaveState }) {
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

function StagedChip({
  draft,
  onApply,
  onDiscard,
  onOpenFile,
}: {
  draft: DraftAffordanceState;
  onApply?: () => Promise<void>;
  onDiscard?: () => Promise<void>;
  onOpenFile?: (path: string) => void;
}) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [busy, setBusy] = useState(false);

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
      {reviewOpen && (
        <DraftReviewDialog
          title={draft.title}
          changes={draft.changes}
          busy={busy}
          onClose={() => setReviewOpen(false)}
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
      )}
    </>
  );
}

function DraftReviewDialog({
  title,
  changes,
  busy,
  onClose,
  onApply,
  onDiscard,
  onOpenFile,
}: {
  title: string;
  changes?: { added: string[]; modified: string[]; removed: string[] };
  busy: boolean;
  onClose: () => void;
  onApply: () => Promise<void>;
  onDiscard: () => Promise<void>;
  onOpenFile?: (path: string) => void;
}) {
  const changeRows = changes
    ? [
        ...changes.added.map((path) => ({ path, label: "new" as const })),
        ...changes.modified.map((path) => ({ path, label: "edited" as const })),
        ...changes.removed.map((path) => ({ path, label: "removed" as const })),
      ].sort((a, b) => a.path.localeCompare(b.path))
    : [];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80">
      <div className="bg-background border rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 space-y-3">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            Review &amp; apply
          </h2>
          <p className="text-sm text-muted-foreground">
            “{title}” holds drafted changes. Apply them to your workspace or discard.
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
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => void onDiscard()}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-input bg-background hover:bg-accent disabled:opacity-50"
            >
              Discard
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void onApply()}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              Apply to workspace
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-input bg-background hover:bg-accent disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SaveConfirmDialog({
  isOpen,
  isSaving,
  error,
  onSave,
  onDiscard,
  onCancel,
}: SaveConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80">
      <div className="bg-background border rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            Unsaved Changes
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            You have unsaved changes. Would you like to save them before closing?
          </p>
          {error && (
            <p className="text-sm text-destructive mt-3">Save failed: {error}</p>
          )}
        </div>
        <div className="flex justify-end gap-2 p-6 pt-0">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onDiscard}
            disabled={isSaving}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-input bg-background text-destructive hover:bg-destructive/10 disabled:opacity-50"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Optional header slot helper — hosts may pass arbitrary nodes beside the affordance. */
export function SaveAffordanceSlot({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
