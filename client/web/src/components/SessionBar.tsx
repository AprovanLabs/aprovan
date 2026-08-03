/**
 * SessionBar — the chat's context strip, in plain language.
 *
 * Users never see Git words here. The vocabulary (see registry
 * docs/vcs-and-sessions.md "The words users see"): a **chat** saves changes
 * straight to the workspace; a **draft chat** keeps its file changes to
 * itself until you **Apply to workspace**; the base is shown as a moment in
 * time ("workspace as of 2h ago"), never a hash; statuses are **Applied** /
 * **Archived**. File presence lives on the tab strip / sidebar tree, not here.
 *
 * Pure presentation — every mutation is a callback into ChatPage, which owns
 * the session state and the VFS scope.
 */

import {
  Check,
  CloudOff,
  ExternalLink,
  FileDiff,
  Loader2,
  MessageSquare,
  MoreHorizontal,
  Plus,
  RefreshCw,
  RotateCcw,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { CommitMountedContent } from "@/components/CommitMountedContent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  changedFileCount,
  relativeTime,
  type ChatSessionInfo,
  type SessionMode,
} from "@/lib/chat-sessions";
import type { WorkspaceSyncState } from "@/lib/workspace-vfs";

interface SessionBarProps {
  /** null = the main state: no record, changes sync directly. */
  session: ChatSessionInfo | null;
  sessions: ChatSessionInfo[];
  syncState: WorkspaceSyncState;
  busy: boolean;
  onNew: (mode: SessionMode) => void;
  onSwitch: (id: string) => void;
  onModeChange: (mode: SessionMode) => void;
  onApply: () => void;
  onArchive: () => void;
  onReset: () => void;
  onSync: () => void;
  onDelete: (id: string) => void;
  onOpenWindow: () => void;
  onOpenFile: (path: string) => void;
  onRefreshSessions: () => void;
}

/** One quiet signal for "is my work saved" — the whole save-state story
 *  a non-draft user ever sees. */
function SyncChip({ state }: { state: WorkspaceSyncState }) {
  if (!state.online) {
    return (
      <span
        className="flex items-center gap-1 text-muted-foreground"
        title="You're offline — changes are kept here and sync when you're back"
      >
        <CloudOff className="h-3 w-3" /> Offline
      </span>
    );
  }
  if (state.pending > 0) {
    return (
      <span
        className="flex items-center gap-1 text-amber-600 dark:text-amber-400"
        title={`${state.pending} change${state.pending === 1 ? "" : "s"} on their way`}
      >
        <Loader2 className="h-3 w-3 animate-spin" /> Syncing…
      </span>
    );
  }
  return (
    <span
      className="flex items-center gap-1 text-muted-foreground"
      title="Everything is saved to your workspace"
    >
      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" /> Synced
    </span>
  );
}

function statusBadge(session: ChatSessionInfo) {
  if (session.status === "merged")
    return (
      <Badge variant="secondary" className="gap-1 text-emerald-700 dark:text-emerald-400">
        <Check className="h-3 w-3" /> Applied
      </Badge>
    );
  if (session.status === "closed") return <Badge variant="outline">Archived</Badge>;
  return null;
}

function changesLabel(session: ChatSessionInfo): string {
  const count = changedFileCount(session);
  return count === 0 ? "" : `${count} file${count === 1 ? "" : "s"} changed`;
}

export function SessionBar({
  session,
  sessions,
  syncState,
  busy,
  onNew,
  onSwitch,
  onModeChange,
  onApply,
  onArchive,
  onReset,
  onSync,
  onDelete,
  onOpenWindow,
  onOpenFile,
  onRefreshSessions,
}: SessionBarProps) {
  const [listOpen, setListOpen] = useState(false);
  const [changesOpen, setChangesOpen] = useState(false);
  // Applied-chat commit detail (mounted-content lineage), expanded per chat.
  const [expandedCommitId, setExpandedCommitId] = useState<string | null>(null);

  const changed = session ? changedFileCount(session) : 0;
  const isOpen = session?.status === "open";
  const isDraft = session?.mode === "staged";
  // Versioning vocabulary (base-age) is staged-only — never on direct-edit / auto chats.
  const baseAge = isDraft ? relativeTime(session?.baseAt ?? session?.createdAt) : "";

  const changeRows =
    isDraft && session?.changes
      ? [
          ...session.changes.added.map((path) => ({ path, label: "new" as const })),
          ...session.changes.modified.map((path) => ({ path, label: "edited" as const })),
          ...session.changes.removed.map((path) => ({ path, label: "removed" as const })),
        ].sort((a, b) => a.path.localeCompare(b.path))
      : [];

  return (
    <div className="shrink-0 border-b bg-muted/30 text-xs">
      <div className="flex items-center gap-1.5 px-2 py-1 flex-wrap">
        <button
          type="button"
          onClick={() => {
            onRefreshSessions();
            setListOpen(true);
          }}
          className="flex items-center gap-1.5 rounded px-1.5 py-0.5 hover:bg-muted font-medium max-w-[14rem]"
          title="Your chats"
        >
          <MessageSquare className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate">{session?.title ?? "Chat"}</span>
        </button>

        {/* Non-draft: one quiet sync signal. Drafts use versioning affordances below. */}
        {!isDraft && <SyncChip state={syncState} />}

        {session && (
          <>
            {statusBadge(session)}
            {isDraft && (
              <button
                type="button"
                disabled={!isOpen || busy}
                onClick={() => onModeChange("auto")}
                title="Draft: this chat's file changes stay here until you apply them. Click to switch to normal (needs no unapplied changes)."
                className="disabled:opacity-60"
              >
                <Badge className="bg-violet-600 hover:bg-violet-600 text-white">Draft</Badge>
              </button>
            )}
            {isDraft && baseAge && (
              <span
                className="text-muted-foreground"
                title="What this draft is based on. 'Get latest changes' refreshes it."
              >
                workspace as of {baseAge}
              </span>
            )}
            {isDraft && changed > 0 && (
              <span
                className="text-violet-700 dark:text-violet-400"
                title="These file changes are drafts in this chat until you apply them to your workspace"
              >
                Draft changes — apply to publish
              </span>
            )}
            {isDraft && changed > 0 && (
              <button
                type="button"
                onClick={() => setChangesOpen((open) => !open)}
                className="flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-muted text-violet-700 dark:text-violet-400 font-medium"
                title="Files this chat changed — click to see them"
              >
                <FileDiff className="h-3 w-3" />
                {changesLabel(session)}
              </button>
            )}
          </>
        )}

        <span className="ml-auto flex items-center gap-0.5">
          {busy && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
          {isOpen && isDraft && changed > 0 && (
            <Button
              size="sm"
              variant="default"
              className="h-6 px-2 text-xs gap-1"
              disabled={busy}
              onClick={onApply}
              title="Copy this draft's file changes into your workspace"
            >
              <Check className="h-3 w-3" /> Apply to workspace
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                title="More session actions"
                aria-label="More session actions"
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {session && (
                <DropdownMenuItem onSelect={onOpenWindow}>
                  <ExternalLink className="h-3 w-3" /> Open in window
                </DropdownMenuItem>
              )}
              {isOpen && isDraft && (
                <DropdownMenuItem disabled={busy} onSelect={onSync}>
                  <RefreshCw className="h-3 w-3" /> Get latest changes
                </DropdownMenuItem>
              )}
              <DropdownMenuItem disabled={busy} onSelect={onReset}>
                <RotateCcw className="h-3 w-3" /> Start over
              </DropdownMenuItem>
              {isOpen && (
                <DropdownMenuItem disabled={busy} onSelect={onArchive}>
                  <X className="h-3 w-3" /> Archive
                </DropdownMenuItem>
              )}
              {session && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    disabled={busy}
                    destructive
                    onSelect={() => onDelete(session.id)}
                  >
                    <Trash2 className="h-3 w-3" /> Delete chat
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </div>

      {changesOpen && changeRows.length > 0 && (
        <div className="border-t px-2 py-1 max-h-40 overflow-y-auto">
          {changeRows.map((row) => (
            <button
              key={row.path}
              type="button"
              onClick={() => onOpenFile(row.path)}
              className="flex w-full items-center gap-2 rounded px-1.5 py-0.5 text-left hover:bg-muted"
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
      )}

      <Dialog open={listOpen} onOpenChange={setListOpen}>
        <DialogHeader>
          <DialogTitle>
            <span className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4" /> Chats
            </span>
          </DialogTitle>
          <DialogClose onClose={() => setListOpen(false)} />
        </DialogHeader>
        <DialogContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              className="gap-1"
              disabled={busy}
              onClick={() => {
                setListOpen(false);
                onNew("auto");
              }}
              title="A fresh chat — it shows up in history once you send a message"
            >
              <Plus className="h-3.5 w-3.5" /> New chat
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="gap-1"
              disabled={busy}
              onClick={() => {
                setListOpen(false);
                onNew("staged");
              }}
              title="Try things out — nothing touches your workspace until you apply it"
            >
              <Plus className="h-3.5 w-3.5" /> New draft chat
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Chats save straight to your workspace and appear here as history once you've sent
            a message. A <strong>draft chat</strong> keeps its file changes to itself until
            you apply them — good for experiments, agents, and bigger changes you want to
            review first.
          </p>
          <div className="max-h-[50vh] overflow-y-auto -mx-1 px-1 space-y-1">
            {sessions.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">No chats yet.</p>
            )}
            {sessions.map((entry) => {
              const count = changedFileCount(entry);
              return (
                <div
                  key={entry.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setListOpen(false);
                    onSwitch(entry.id);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setListOpen(false);
                      onSwitch(entry.id);
                    }
                  }}
                  className={`w-full cursor-pointer rounded-md border px-3 py-2 text-left hover:bg-muted/60 ${
                    entry.id === session?.id ? "border-primary/50 bg-muted/40" : ""
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">{entry.title}</span>
                    {statusBadge(entry)}
                    {entry.mode === "staged" && entry.status === "open" && (
                      <Badge className="bg-violet-600 hover:bg-violet-600 text-white">Draft</Badge>
                    )}
                    <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                      {relativeTime(entry.updatedAt)}
                    </span>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={(event) => {
                        event.stopPropagation();
                        onDelete(entry.id);
                      }}
                      className="shrink-0 rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      title={
                        count > 0 && entry.status === "open"
                          ? "Delete this chat and its unapplied changes"
                          : "Delete this chat"
                      }
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </span>
                  <span className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>
                      {entry.messageCount} message{entry.messageCount === 1 ? "" : "s"}
                    </span>
                    {count > 0 && (
                      <span className="text-violet-700 dark:text-violet-400">
                        {count} file{count === 1 ? "" : "s"} changed
                      </span>
                    )}
                    {entry.status === "merged" && entry.mergeCommit && (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setExpandedCommitId((current) =>
                            current === entry.mergeCommit ? null : (entry.mergeCommit ?? null),
                          );
                        }}
                        className="rounded px-1 py-0.5 hover:bg-muted"
                        title="What this applied — including the versions of any mounted content at that moment"
                      >
                        {expandedCommitId === entry.mergeCommit ? "Hide details" : "Details"}
                      </button>
                    )}
                  </span>
                  {entry.status === "merged" &&
                    entry.mergeCommit &&
                    expandedCommitId === entry.mergeCommit && (
                      <span onClick={(event) => event.stopPropagation()}>
                        <CommitMountedContent commitId={entry.mergeCommit} />
                      </span>
                    )}
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
