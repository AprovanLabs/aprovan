/**
 * SessionsPanel — native surface over the gateway `sessions` namespace.
 *
 * A chat session is a branch (docs/vcs-and-sessions.md): staged sessions keep
 * their file edits in an overlay until someone applies them, auto sessions
 * write through. The session bar drives *the one you are in*; twelve of the
 * namespace's operations had no UI at all, so the workspace's other sessions
 * — what they staged, whether anyone is in them, what is still open — were
 * invisible.
 *
 * This is the PR-style log: one row per session with its staged diff and the
 * actions that settle it (sync, apply, archive). Destructive ones are
 * two-click; `delete` is deliberately absent — throwing away someone's
 * transcript should not be a stray click in a list view.
 *
 * Presence is deliberately NOT shown here even though `sessions.presence`
 * would supply it: that operation is a heartbeat-and-fetch, so reading it
 * writes a presence record, and the session bar renders every peer it sees
 * without filtering by session — an inspector polling for "who is where"
 * would put a phantom participant in every other window's presence chip.
 * Presence belongs to the window that is actually in a chat.
 */

import { GitBranch, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import {
  PanelEmpty,
  PanelError,
  PanelLoading,
  PanelShell,
  PanelTabs,
  relativeTime,
  type NativePanelProps,
  usePanelData,
} from "./shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { invokeNamespaceTool } from "@/lib/tools";

type SessionStatus = "open" | "merged" | "closed";

interface SessionChanges {
  added: string[];
  modified: string[];
  removed: string[];
}

interface SessionRow {
  id: string;
  title: string;
  status: SessionStatus;
  mode: "auto" | "staged";
  base: string;
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

function changeCount(changes: SessionChanges | undefined): number {
  if (!changes) return 0;
  return changes.added.length + changes.modified.length + changes.removed.length;
}

/** Two-click destructive confirm: first click arms for 3s. */
function ConfirmButton({
  label,
  onConfirm,
  disabled,
}: {
  label: string;
  onConfirm: () => void;
  disabled?: boolean;
}) {
  const [arming, setArming] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  return (
    <Button
      variant={arming ? "destructive" : "ghost"}
      size="sm"
      disabled={disabled}
      className="h-7 px-2 text-xs"
      onClick={() => {
        if (arming) {
          window.clearTimeout(timer.current);
          setArming(false);
          onConfirm();
          return;
        }
        setArming(true);
        timer.current = window.setTimeout(() => setArming(false), 3000);
      }}
    >
      {arming ? "Confirm?" : label}
    </Button>
  );
}

function ChangeList({ changes }: { changes: SessionChanges }) {
  const groups: Array<[string, string[], string]> = [
    ["+", changes.added, "text-emerald-600"],
    ["~", changes.modified, "text-amber-600"],
    ["−", changes.removed, "text-destructive"],
  ];
  return (
    <div className="mt-2 space-y-0.5">
      {groups.map(([mark, paths, className]) =>
        paths.map((path) => (
          <div key={`${mark}${path}`} className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className={`shrink-0 ${className}`}>{mark}</span>
            <span className="truncate text-muted-foreground" title={path}>
              {path}
            </span>
          </div>
        )),
      )}
    </div>
  );
}

function SessionCard({
  session,
  onChanged,
}: {
  session: SessionRow;
  onChanged: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const staged = changeCount(session.changes);

  const run = (operation: string, args: Record<string, unknown>) => {
    setBusy(operation);
    setActionError(null);
    invokeSessions(operation, { id: session.id, ...args })
      .then(onChanged)
      .catch((err) => setActionError(err instanceof Error ? err.message : String(err)))
      .finally(() => setBusy(null));
  };

  return (
    <div className="rounded-md border bg-card p-3 text-sm">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT[session.status]}`} />
        <span className="font-medium">{session.title || session.id}</span>
        <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
          {session.mode}
        </Badge>
        <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
          {relativeTime(session.updatedAt)}
        </span>
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
        <span>{session.messageCount} messages</span>
        <span className="font-mono">base {session.base.slice(0, 8)}</span>
        {session.mergeCommit && (
          <span className="font-mono">merged {session.mergeCommit.slice(0, 8)}</span>
        )}
        {staged > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="underline hover:text-foreground"
          >
            {staged} staged {staged === 1 ? "change" : "changes"}
          </button>
        )}
      </div>

      {expanded && session.changes && <ChangeList changes={session.changes} />}
      {actionError && <div className="mt-1 text-xs text-destructive">{actionError}</div>}

      {session.status === "open" && (
        <div className="mt-2 flex flex-wrap items-center gap-2 border-t pt-2">
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 text-xs"
            disabled={busy !== null}
            onClick={() => run("sync", {})}
            title="Rebase this session's base onto the current main head"
          >
            {busy === "sync" && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
            Sync
          </Button>
          {staged > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs"
              disabled={busy !== null}
              onClick={() => run("close", { stage: true })}
              title="Apply the staged overlay to main as a merge commit"
            >
              {busy === "close" && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
              Apply &amp; close
            </Button>
          )}
          <ConfirmButton
            label="Archive"
            disabled={busy !== null}
            onConfirm={() => run("close", { stage: false })}
          />
        </div>
      )}
    </div>
  );
}

export function SessionsPanel({ scope: _scope }: NativePanelProps) {
  const [tab, setTab] = useState<TabId>("open");
  const { data, error, loading, refresh } = usePanelData(
    async () => (await invokeSessions("list", {})) as { sessions: SessionRow[] },
  );

  const sessions = data?.sessions ?? [];
  const rows = sessions.filter((session) => session.status === tab);

  return (
    <PanelShell
      icon={GitBranch}
      title="Sessions"
      description="Chat sessions as branches — staged diffs and merges"
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
        <PanelError message={error} />
      ) : loading && !data ? (
        <PanelLoading />
      ) : rows.length === 0 ? (
        <PanelEmpty>No {tab} sessions.</PanelEmpty>
      ) : (
        <div className="flex flex-col gap-2 p-3">
          {rows.map((session) => (
            <SessionCard key={session.id} session={session} onChanged={refresh} />
          ))}
        </div>
      )}
    </PanelShell>
  );
}
