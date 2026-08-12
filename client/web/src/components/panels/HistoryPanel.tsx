/**
 * History view — workspace or app timeline over `vcs.log` / `vcs.branches` /
 * `vcs.show` / `vcs.diff`, with one-click restore (`vcs.restore` + snapshot
 * via `vcs.commit`) and manual "Save a version now".
 *
 * Vocabulary: time + author + message — never hashes, "commit", or Git chrome.
 */

import {
  DiffViewer,
  type DiffPane,
} from "@aprovan/editor";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  History,
  Loader2,
  RotateCcw,
  Save,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ChangeList } from "@/components/ChangeList";
import { CommitMountedContent } from "@/components/CommitMountedContent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  PanelEmpty,
  PanelErrorWithRetry,
  PanelLoading,
  PanelShell,
  relativeTime,
  usePanelData,
  usePanelHostActions,
  useScopeFilter,
  type NativePanelProps,
} from "./shell";
import {
  changeCountLabel,
  changeListBag,
  commitVersion,
  draftChatTitleFromCommit,
  fetchCommitDetail,
  fetchCommitDiff,
  fetchCommitLog,
  fetchVcsBranches,
  hashesForPath,
  readFileAtHash,
  restoreVersion,
  type VcsChangeSummary,
  type VcsCommitSummary,
  type VcsScope,
} from "@/lib/vfs-commits";

const LOG_PAGE = 40;
const OVERSIZE_BYTES = 512 * 1024;

type HistoryBundle = {
  commits: VcsCommitSummary[];
  branches: Array<{ name: string; commit: string }>;
};

type DiffTarget = {
  path: string;
  commit: VcsCommitSummary;
  parentId: string | undefined;
  changes: VcsChangeSummary;
};

function scopeFromApp(name: string | undefined): VcsScope | undefined {
  const trimmed = name?.trim();
  return trimmed ? { app: trimmed } : undefined;
}

function whenLabel(iso: string): string {
  return relativeTime(iso) || new Date(iso).toLocaleString();
}

function isTextMime(mime: string): boolean {
  if (mime.startsWith("text/")) return true;
  return (
    mime.includes("json") ||
    mime.includes("javascript") ||
    mime.includes("typescript") ||
    mime.includes("xml") ||
    mime.includes("svg") ||
    mime === "application/x-yaml" ||
    mime === "application/toml"
  );
}

function paneFromLoad(
  label: string,
  status: DiffPane["status"],
  content?: string | null,
  extra?: Partial<DiffPane>,
): DiffPane {
  return { label, status, content, ...extra };
}

async function loadPane(
  path: string,
  hash: string | undefined,
  label: string,
  kind: "before" | "after" | "missing",
): Promise<DiffPane> {
  if (kind === "missing" || !hash) {
    return paneFromLoad(label, "missing", null);
  }
  try {
    const file = await readFileAtHash(path, hash);
    if (!isTextMime(file.mimeType)) {
      return paneFromLoad(label, "binary", null, {
        sizeKb: Math.max(1, Math.round(file.size / 1024)),
      });
    }
    if (file.size > OVERSIZE_BYTES) {
      return paneFromLoad(label, "oversize", null, {
        sizeKb: Math.max(1, Math.round(file.size / 1024)),
      });
    }
    return paneFromLoad(label, "ready", file.content);
  } catch (err) {
    return paneFromLoad(label, "error", null, {
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

function RestoreConfirm({
  open,
  when,
  busy,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  when: string;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative z-50 w-full max-w-md rounded-lg border bg-background p-4 shadow-lg space-y-4">
        <h2 className="text-lg font-semibold">Restore this version?</h2>
        <p className="text-sm text-muted-foreground">
          The workspace will look exactly as it did {when}. Nothing is deleted —
          this adds a new entry to history, and you can restore forward again.
        </p>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" disabled={busy} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" disabled={busy} onClick={onConfirm}>
            {busy ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Restoring…
              </>
            ) : (
              "Restore this version"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function HistoryDiffSheet({
  target,
  scope,
  onClose,
  onOpenFile,
}: {
  target: DiffTarget;
  scope?: VcsScope;
  onClose: () => void;
  onOpenFile?: (path: string) => void;
}) {
  const [before, setBefore] = useState<DiffPane>({
    label: "Previous version",
    status: "loading",
  });
  const [after, setAfter] = useState<DiffPane>({
    label: whenLabel(target.commit.createdAt),
    status: "loading",
  });
  const [ticket, setTicket] = useState(0);

  const load = useCallback(async () => {
    const parentId = target.parentId;
    let changes = target.changes;
    // Prefer a fresh `vcs.diff` so the verb stays wired and hashes are current.
    if (parentId) {
      try {
        changes = await fetchCommitDiff(parentId, target.commit.id, scope);
      } catch {
        // Fall back to the show-derived bag already on the entry.
      }
    }
    const hashes = hashesForPath(changes, target.path);
    if (!hashes) {
      setBefore(paneFromLoad("Previous version", "error", null, {
        error: "Couldn't load this version — try again",
        onRetry: () => setTicket((n) => n + 1),
      }));
      setAfter(paneFromLoad(whenLabel(target.commit.createdAt), "error", null, {
        error: "Couldn't load this version — try again",
        onRetry: () => setTicket((n) => n + 1),
      }));
      return;
    }

    const beforeLabel =
      hashes.status === "added"
        ? "Previous version"
        : `Previous version`;
    const afterLabel =
      hashes.status === "removed"
        ? "This file was removed"
        : whenLabel(target.commit.createdAt);

    const [b, a] = await Promise.all([
      loadPane(
        target.path,
        hashes.before,
        beforeLabel,
        hashes.status === "added" ? "missing" : "before",
      ),
      loadPane(
        target.path,
        hashes.after,
        afterLabel,
        hashes.status === "removed" ? "missing" : "after",
      ),
    ]);
    setBefore({
      ...b,
      ...(b.status === "error"
        ? { onRetry: () => setTicket((n) => n + 1) }
        : {}),
    });
    setAfter({
      ...a,
      ...(a.status === "error"
        ? { onRetry: () => setTicket((n) => n + 1) }
        : {}),
      ...(hashes.status === "removed" ? { status: "missing" as const } : {}),
    });
  }, [scope, target]);

  useEffect(() => {
    setBefore({ label: "Previous version", status: "loading" });
    setAfter({ label: whenLabel(target.commit.createdAt), status: "loading" });
    void load();
  }, [load, target, ticket]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 flex w-full max-w-5xl max-h-[90dvh] flex-col overflow-hidden rounded-lg border bg-background shadow-lg">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold">{target.path}</h2>
            <p className="text-xs text-muted-foreground">
              {target.commit.message || "Untitled version"} ·{" "}
              {whenLabel(target.commit.createdAt)}
            </p>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-3">
          <DiffViewer
            before={before}
            after={after}
            onOpenFile={onOpenFile ? () => onOpenFile(target.path) : undefined}
          />
        </div>
      </div>
    </div>
  );
}

function HistoryEntry({
  commit,
  scope,
  restoring,
  onRestore,
  onOpenDiff,
}: {
  commit: VcsCommitSummary;
  scope?: VcsScope;
  restoring: boolean;
  onRestore: (commit: VcsCommitSummary) => void;
  onOpenDiff: (target: DiffTarget) => void;
}) {
  const [open, setOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [changes, setChanges] = useState<VcsChangeSummary | undefined>();

  const draftTitle = draftChatTitleFromCommit(commit);
  const parentId = commit.parents[0];
  const count = changeCountLabel(changes);

  useEffect(() => {
    if (!open || changes) return;
    let cancelled = false;
    setDetailLoading(true);
    setDetailError(null);
    fetchCommitDetail(commit.id, scope)
      .then((detail) => {
        if (cancelled) return;
        setChanges(detail.changes);
      })
      .catch((err) => {
        if (cancelled) return;
        setDetailError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, changes, commit.id, scope]);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div
        className={`rounded-md border px-2 py-1.5 ${
          draftTitle ? "border-l-2 border-l-primary/60" : ""
        }`}
      >
        <div className="flex items-start gap-1.5">
          <CollapsibleTrigger
            className="mt-0.5 rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label={open ? "Collapse" : "Expand"}
          >
            {open ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </CollapsibleTrigger>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
              <span className="font-medium text-foreground">
                {whenLabel(commit.createdAt)}
              </span>
              {commit.author ? (
                <span className="text-muted-foreground">{commit.author}</span>
              ) : null}
              {count ? (
                <Badge variant="outline" className="font-normal text-[10px]">
                  {count}
                </Badge>
              ) : null}
            </div>
            <p className="mt-0.5 truncate text-sm">
              {commit.message || "Untitled version"}
            </p>
            {draftTitle ? (
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3 shrink-0" />
                From draft chat: {draftTitle}
              </p>
            ) : null}
          </div>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-7 shrink-0 px-2 text-xs"
            disabled={restoring}
            onClick={() => onRestore(commit)}
          >
            <RotateCcw className="mr-1 h-3 w-3" />
            Restore
          </Button>
        </div>

        <CollapsibleContent>
          <div className="mt-2 border-t pt-2 pl-6">
            {detailLoading ? (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" /> Loading changes…
              </div>
            ) : null}
            {detailError ? (
              <p className="text-xs text-destructive">{detailError}</p>
            ) : null}
            {!detailLoading && !detailError ? (
              <ChangeList
                changes={changeListBag(changes)}
                onOpen={(path) =>
                  onOpenDiff({
                    path,
                    commit,
                    parentId,
                    changes: changes ?? { added: [], modified: [], removed: [] },
                  })
                }
              />
            ) : null}
            <CommitMountedContent commitId={commit.id} />
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export function HistoryPanel(props: NativePanelProps) {
  const { scope: effective, scopeFilter } = useScopeFilter(props.scope);
  const host = usePanelHostActions();
  const vcsScope = scopeFromApp(effective?.name);
  const scopeKey = vcsScope?.app ?? "";

  const load = useCallback(async (): Promise<HistoryBundle> => {
    const [commits, branches] = await Promise.all([
      fetchCommitLog({ limit: LOG_PAGE, scope: vcsScope }),
      fetchVcsBranches(vcsScope),
    ]);
    return { commits, branches };
  }, [vcsScope]);

  const { data, error, loading, refresh } = usePanelData(load, scopeKey);

  const [saving, setSaving] = useState(false);
  const [restoreTarget, setRestoreTarget] = useState<VcsCommitSummary | null>(null);
  const [restoring, setRestoring] = useState(false);
  const [diffTarget, setDiffTarget] = useState<DiffTarget | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(id);
  }, [toast]);

  const title = effective?.title || effective?.name
    ? `History — ${effective?.title || effective?.name}`
    : "Workspace history";

  const onSaveNow = async () => {
    setSaving(true);
    setActionError(null);
    try {
      await commitVersion("Saved version", vcsScope);
      setToast("Version saved");
      refresh();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  const onConfirmRestore = async () => {
    if (!restoreTarget) return;
    setRestoring(true);
    setActionError(null);
    try {
      await restoreVersion(restoreTarget.id, {
        scope: vcsScope,
        whenLabel: whenLabel(restoreTarget.createdAt),
      });
      setRestoreTarget(null);
      setToast("Restored — view history");
      refresh();
    } catch {
      setActionError("Nothing was changed");
    } finally {
      setRestoring(false);
    }
  };

  return (
    <PanelShell
      icon={History}
      title={title}
      description="Versions of this workspace over time"
      onRefresh={refresh}
      refreshing={loading}
      actions={
        <>
          {scopeFilter}
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-7 px-2 text-xs"
            disabled={saving || restoring}
            onClick={() => void onSaveNow()}
          >
            {saving ? (
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            ) : (
              <Save className="mr-1 h-3 w-3" />
            )}
            Save a version now
          </Button>
        </>
      }
    >
      {toast ? (
        <div className="mx-3 mt-2 rounded-md border bg-muted/40 px-3 py-1.5 text-xs">
          {toast}
        </div>
      ) : null}
      {actionError ? (
        <div className="mx-3 mt-2 flex items-center justify-between gap-2 rounded-md border border-destructive/40 bg-destructive/5 px-3 py-1.5 text-xs text-destructive">
          <span>{actionError}</span>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-xs"
            onClick={() => {
              setActionError(null);
              if (restoreTarget) void onConfirmRestore();
              else void onSaveNow();
            }}
          >
            Retry
          </Button>
        </div>
      ) : null}

      {loading && !data ? <PanelLoading label="Loading history…" /> : null}
      {error && !data ? (
        <PanelErrorWithRetry message={error} onRetry={refresh} />
      ) : null}
      {data && data.commits.length === 0 ? (
        <PanelEmpty>
          No history yet — versions appear when you or a chat save changes.
        </PanelEmpty>
      ) : null}
      {data && data.commits.length > 0 ? (
        <div className="space-y-1.5 p-2">
          {data.commits.map((commit) => (
            <HistoryEntry
              key={commit.id}
              commit={commit}
              scope={vcsScope}
              restoring={restoring}
              onRestore={setRestoreTarget}
              onOpenDiff={setDiffTarget}
            />
          ))}
        </div>
      ) : null}

      <RestoreConfirm
        open={restoreTarget !== null}
        when={restoreTarget ? whenLabel(restoreTarget.createdAt) : ""}
        busy={restoring}
        onCancel={() => setRestoreTarget(null)}
        onConfirm={() => void onConfirmRestore()}
      />

      {diffTarget ? (
        <HistoryDiffSheet
          target={diffTarget}
          scope={vcsScope}
          onClose={() => setDiffTarget(null)}
          onOpenFile={host.onOpenFile}
        />
      ) : null}
    </PanelShell>
  );
}
