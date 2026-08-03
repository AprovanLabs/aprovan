/**
 * SessionsPanel — native surface over the gateway `sessions` namespace.
 *
 * A chat session is a branch (docs/vcs-and-sessions.md): staged sessions keep
 * their file edits in an overlay until someone applies them, auto sessions
 * write through. The session bar drives *the one you are in*; this panel is
 * the log of every other one — what they staged, whether anyone applied it,
 * what is still open.
 *
 * Rows are dense on purpose: a session's title, status and freshness fit on
 * one line, and the destructive/plain-language actions (see SessionBar's
 * vocabulary — no Git words) only show once a row is opened. `delete` is
 * deliberately absent — throwing away someone's transcript should not be a
 * stray click in a list view.
 *
 * Presence is deliberately NOT shown here: it is file-scoped over the
 * realtime socket (`presence:<path>`), not session-scoped. Avatars live on
 * file tabs / tree rows for the focused workspace file — never in this list.
 */

import { Check, ChevronDown, ChevronRight, ExternalLink, GitBranch, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  ArmedButton,
  PanelEmpty,
  PanelErrorWithRetry,
  PanelLoading,
  PanelShell,
  PanelTabs,
  relativeTime,
  usePanelHostActions,
  type NativePanelProps,
  type PanelHostActions,
  usePanelData,
} from "./shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sessionWindowUrl } from "@/lib/chat-sessions";
import { invokeNamespaceTool } from "@/lib/tools";

type SessionStatus = "open" | "merged" | "closed";

interface SessionChanges {
  added: string[];
  modified: string[];
  removed: string[];
}

interface SessionRecord {
  id: string;
  title: string;
  status: SessionStatus;
  mode: "auto" | "staged";
  base: string;
  /** When the base snapshot was taken — rendered as "workspace as of …". */
  baseAt?: string;
  messageCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  mergeCommit?: string;
  changes?: SessionChanges;
}

const invokeSessions = invokeNamespaceTool("sessions");

const STATUS_TABS = [
  { id: "open", label: "Open" },
  { id: "merged", label: "Merged" },
  { id: "closed", label: "Closed" },
] as const;

type TabId = (typeof STATUS_TABS)[number]["id"];

const STATUS_DOT: Record<SessionStatus, string> = {
  open: "bg-emerald-500",
  merged: "bg-primary",
  closed: "bg-muted-foreground",
};

const EMPTY_COPY: Record<TabId, string> = {
  open: "Open chats appear here. Start one from the chat pane.",
  merged: "Chats you've applied to the workspace appear here.",
  closed: "Archived chats appear here.",
};

function changeCount(changes: SessionChanges | undefined): number {
  if (!changes) return 0;
  return changes.added.length + changes.modified.length + changes.removed.length;
}

/** +added ~modified −removed, compact enough for the collapsed row. */
function ChangeSummary({ changes }: { changes: SessionChanges }) {
  return (
    <span className="flex shrink-0 items-center gap-1 font-mono text-[11px] text-muted-foreground">
      {changes.added.length > 0 && (
        <span className="text-emerald-600 dark:text-emerald-400">+{changes.added.length}</span>
      )}
      {changes.modified.length > 0 && (
        <span className="text-amber-600 dark:text-amber-400">~{changes.modified.length}</span>
      )}
      {changes.removed.length > 0 && (
        <span className="text-destructive">−{changes.removed.length}</span>
      )}
    </span>
  );
}

/** The changed-file list shown in the expanded row. Opens a file through the
 *  host's `onOpenFile` when threaded (SessionBar's pattern); otherwise it's
 *  a plain, non-interactive list. */
function ChangeList({
  changes,
  onOpenFile,
}: {
  changes: SessionChanges;
  onOpenFile?: (path: string) => void;
}) {
  const groups: Array<[string, string[], string]> = [
    ["+", changes.added, "text-emerald-600 dark:text-emerald-400"],
    ["~", changes.modified, "text-amber-600 dark:text-amber-400"],
    ["−", changes.removed, "text-destructive"],
  ];
  return (
    <div className="space-y-0.5">
      {groups.map(([mark, paths, className]) =>
        paths.map((path) =>
          onOpenFile ? (
            <button
              key={`${mark}${path}`}
              type="button"
              onClick={() => onOpenFile(path)}
              className="flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left font-mono text-[11px] hover:bg-muted"
              title={`Open ${path}`}
            >
              <span className={`shrink-0 ${className}`}>{mark}</span>
              <span className="truncate text-muted-foreground">{path}</span>
            </button>
          ) : (
            <div key={`${mark}${path}`} className="flex items-center gap-1.5 px-1 font-mono text-[11px]">
              <span className={`shrink-0 ${className}`}>{mark}</span>
              <span className="truncate text-muted-foreground" title={path}>
                {path}
              </span>
            </div>
          ),
        ),
      )}
    </div>
  );
}

function SessionEntry({
  session,
  onChanged,
  hostActions,
}: {
  session: SessionRecord;
  onChanged: () => void;
  hostActions: PanelHostActions;
}) {
  const [expanded, setExpanded] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const staged = changeCount(session.changes);
  const isOpen = session.status === "open";
  const isDraft = session.mode === "staged";

  const run = (operation: string, args: Record<string, unknown>) => {
    setBusy(operation);
    setActionError(null);
    invokeSessions(operation, { id: session.id, ...args })
      .then(onChanged)
      .catch(() => {
        const next =
          operation === "sync"
            ? "Couldn't get the latest changes. Retry, or check your connection."
            : operation === "close" && args.stage
              ? "Couldn't apply this chat to the workspace. Retry, or check your connection."
              : "Couldn't archive this chat. Retry, or check your connection.";
        setActionError(next);
      })
      .finally(() => setBusy(null));
  };

  // Opening a chat: prefer the host's callback (ChatPage switches its own
  // pane to this session); fall back to navigating this window with
  // `?session=` if the panel is ever hosted somewhere that can't wire it.
  const openChat = () => {
    if (hostActions.onOpenSession) hostActions.onOpenSession(session.id);
    else window.location.assign(sessionWindowUrl(session.id));
  };

  const startedFrom = relativeTime(session.baseAt ?? session.createdAt);

  return (
    <div>
      <div className="flex items-center gap-1.5 px-2 py-1.5 text-sm hover:bg-muted/40">
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="shrink-0 rounded p-0.5 text-muted-foreground hover:text-foreground"
          title={expanded ? "Collapse" : "Details and actions"}
        >
          {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
        </button>
        <span
          className={`h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT[session.status]}`}
          title={session.status}
        />
        <button
          type="button"
          onClick={openChat}
          className="min-w-0 flex-1 truncate text-left font-medium hover:underline"
          title="Open this chat"
        >
          {session.title || session.id}
        </button>
        {isDraft && (
          <Badge variant="outline" className="shrink-0 px-1.5 py-0 text-[10px]">
            Draft
          </Badge>
        )}
        {session.changes && staged > 0 && <ChangeSummary changes={session.changes} />}
        <span className="shrink-0 text-[11px] text-muted-foreground">
          {session.messageCount} msg{session.messageCount === 1 ? "" : "s"}
        </span>
        <span className="shrink-0 text-[11px] text-muted-foreground" title={session.updatedAt}>
          {relativeTime(session.updatedAt)}
        </span>
      </div>

      {expanded && (
        <div className="space-y-2 border-t bg-muted/20 px-3 py-2 text-xs">
          <div className="text-muted-foreground">
            {startedFrom ? `Started from workspace as of ${startedFrom}` : "Started from the workspace"}
            {session.mergeCommit && " · applied to the workspace"}
          </div>

          {session.changes && staged > 0 && (
            <ChangeList changes={session.changes} onOpenFile={hostActions.onOpenFile} />
          )}

          {actionError && <div className="text-destructive">{actionError}</div>}

          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {isOpen && (
              <Button
                variant="outline"
                size="sm"
                className="h-6 px-2 text-[11px]"
                disabled={busy !== null}
                onClick={() => run("sync", {})}
                title="Bring this session up to date with the current workspace"
              >
                {busy === "sync" && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
                Get latest changes
              </Button>
            )}
            {isOpen && staged > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="h-6 px-2 text-[11px]"
                disabled={busy !== null}
                onClick={() => run("close", { stage: true })}
                title="Apply this session's changes to your workspace"
              >
                {busy === "close" && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
                <Check className="mr-1 h-3 w-3" />
                Apply to workspace
              </Button>
            )}
            {isOpen && busy === null && (
              <ArmedButton
                label="Archive"
                armedLabel={
                  staged > 0 ? "Archive without applying?" : "Confirm archive?"
                }
                onConfirm={() => run("close", { stage: false })}
              />
            )}
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto h-6 gap-1 px-2 text-[11px]"
              onClick={() => window.open(sessionWindowUrl(session.id), "_blank")}
              title="Open this chat in its own window"
            >
              <ExternalLink className="h-3 w-3" />
              Open in new window
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function SessionsPanel({ scope: _scope }: NativePanelProps) {
  const [tab, setTab] = useState<TabId>("open");
  const hostActions = usePanelHostActions();
  const { data, error, loading, refresh } = usePanelData(
    async () => (await invokeSessions("list", {})) as { sessions: SessionRecord[] },
  );

  const sessions = data?.sessions ?? [];
  const rows = sessions.filter((session) => session.status === tab);

  return (
    <PanelShell
      icon={GitBranch}
      title="Sessions"
      description="Chat history you can stage, apply, and archive"
      onRefresh={refresh}
      refreshing={loading}
    >
      <PanelTabs
        tabs={STATUS_TABS.map((entry) => ({
          id: entry.id,
          label: entry.label,
          badge: sessions.filter((session) => session.status === entry.id).length,
        }))}
        active={tab}
        onChange={setTab}
      />
      {error ? (
        <PanelErrorWithRetry
          message="Couldn't load sessions. Retry, or check your connection."
          onRetry={refresh}
          retrying={loading}
        />
      ) : loading && !data ? (
        <PanelLoading label="Loading sessions…" />
      ) : rows.length === 0 ? (
        <PanelEmpty>{EMPTY_COPY[tab]}</PanelEmpty>
      ) : (
        <div className="divide-y">
          {rows.map((session) => (
            <SessionEntry
              key={session.id}
              session={session}
              onChanged={refresh}
              hostActions={hostActions}
            />
          ))}
        </div>
      )}
    </PanelShell>
  );
}
