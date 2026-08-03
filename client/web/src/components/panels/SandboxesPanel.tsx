/**
 * SandboxesPanel — execution environments mounted from the workspace
 * ("Sandboxes"). Spec: registry `docs/sandboxes.md`, "The Sandboxes native
 * surface".
 *
 * A sandbox is a filesystem plus a shell on some host — a laptop, a Sprite, a
 * container — with workspace prefixes mounted into it. Nothing it writes
 * reaches the workspace until someone commits, so this panel exists to answer
 * three questions the API can only answer if you ask it:
 *
 *   1. **What is uncommitted right now?** Change counts are on the row, not
 *      behind an expand, because "this sandbox has 3 uncommitted files" is the
 *      one thing you need before closing a laptop.
 *   2. **Did the command work?** The Console is the "did the tests pass" view.
 *   3. **Why is nothing running?** A machine that lost its toolchain silently
 *      stops taking scheduled work, and the only symptom is a queue that never
 *      drains. Hosts makes the declared-vs-verified gap visible.
 *
 * Change counts cost a real round trip each (the host hashes its own tree), so
 * the list renders immediately and the counts fill in per row. One asleep host
 * must not blank the panel — every check is isolated.
 */

import { AlertTriangle, Box, ChevronRight, Play, Upload } from "lucide-react";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArmedButton,
  PanelEmpty,
  PanelErrorWithRetry,
  PanelLoading,
  PanelShell,
  PanelTabs,
  relativeTime,
  usePanelData,
  useScopeFilter,
  type NativePanelProps,
} from "./shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { invokeNamespaceTool } from "@/lib/tools";

// ---------------------------------------------------------------------------
// Service shapes (gateway `sandboxes` namespace)
// ---------------------------------------------------------------------------

interface MountSummary {
  path: string;
  /** Workspace prefix, or null for scratch space that never comes back. */
  source: string | null;
  mode: "ro" | "rw";
  track: boolean;
  files: number;
  syncedAt: string;
}

interface Sandbox {
  id: string;
  name: string;
  provider: string;
  hostId?: string;
  image?: string;
  workdir: string;
  status: "running" | "stopped" | "destroyed";
  mounts: MountSummary[];
  sessionId?: string;
  agent?: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
}

interface MountChanges {
  mount: string;
  source: string | null;
  /** Scratch mounts report this instead of counts — nothing to commit. */
  scratch?: boolean;
  track?: boolean;
  total?: number;
  added?: string[];
  modified?: string[];
  removed?: string[];
}

interface ExecResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
  truncated: boolean;
}

interface CommitResult {
  written: string[];
  removed: string[];
  conflicts: string[];
  skipped: string[];
  session?: string;
  commit?: { id: string; message: string };
}

interface ScheduledRun {
  id: string;
  image: string;
  workflow: string;
  status: "pending" | "claimed" | "running" | "succeeded" | "failed" | "cancelled";
  hostId?: string;
  sandboxId?: string;
  sessionId?: string;
  workflowRunId?: string;
  agent?: string;
  error?: string;
  createdAt: string;
  claimedAt?: string;
  finishedAt?: string;
}

interface Host {
  id: string;
  name: string;
  provider: string;
  root?: string;
  images?: string[];
  verifiedImages?: string[];
  tools?: string[];
  platform?: string;
  createdAt: string;
  lastSeenAt?: string;
}

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

const statusDot: Record<string, string> = {
  running: "bg-emerald-500",
  succeeded: "bg-emerald-500",
  stopped: "bg-muted-foreground",
  cancelled: "bg-muted-foreground",
  destroyed: "bg-muted-foreground",
  failed: "bg-red-500",
  pending: "bg-amber-500",
  claimed: "bg-amber-500",
};

/** An agent that has not leased in this long is probably asleep or gone. */
const STALE_HOST_MS = 2 * 60 * 1000;

/**
 * Deadline for the per-row change check. Hashing a mount is fast when the host
 * is awake; when it is not, the point is to say "unknown" quickly rather than
 * hold the row for the service's build-sized default.
 */
const CHANGE_CHECK_TIMEOUT_MS = 15_000;

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.floor(ms / 60_000)}m ${Math.round((ms % 60_000) / 1000)}s`;
}

function Chip({ children, title }: { children: string; title?: string }) {
  return (
    <span
      title={title}
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground"
    >
      {children}
    </span>
  );
}

/** Selectable pill — the same affordance the Activity panel filters with. */
function FilterChip({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title?: string;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`rounded-full border px-2 py-0.5 text-[11px] ${
        active
          ? "border-transparent bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

/** Paths that changed, grouped by what happened to them. */
function DiffList({ changes }: { changes: MountChanges }) {
  const groups: Array<{ label: string; className: string; paths: string[] }> = [
    { label: "+", className: "text-emerald-500", paths: changes.added ?? [] },
    { label: "~", className: "text-amber-500", paths: changes.modified ?? [] },
    { label: "−", className: "text-red-500", paths: changes.removed ?? [] },
  ];
  return (
    <div className="mt-1 space-y-0.5">
      {groups.flatMap((group) =>
        group.paths.map((path) => (
          <div key={`${group.label}${path}`} className="flex items-baseline gap-1.5 text-xs">
            <span className={`w-2 shrink-0 font-mono ${group.className}`}>{group.label}</span>
            <code className="min-w-0 truncate font-mono text-muted-foreground" title={path}>
              {path}
            </code>
          </div>
        )),
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Environments
// ---------------------------------------------------------------------------

type ChangeState =
  | { kind: "checking" }
  | { kind: "ready"; changes: MountChanges[] }
  | { kind: "error"; message: string };

/** Uncommitted files across a sandbox's tracked mounts. */
function pendingCount(state: ChangeState | undefined): number | undefined {
  if (state?.kind !== "ready") return undefined;
  return state.changes.reduce((total, mount) => total + (mount.total ?? 0), 0);
}

function SandboxRow({
  sandbox,
  changes,
  onRecheck,
  onChanged,
  invoke,
}: {
  sandbox: Sandbox;
  changes: ChangeState | undefined;
  onRecheck: () => void;
  onChanged: () => void;
  invoke: ReturnType<typeof invokeNamespaceTool>;
}) {
  const [expanded, setExpanded] = useState(false);
  const [busy, setBusy] = useState<"apply" | "sync" | "destroy" | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [result, setResult] = useState<CommitResult | null>(null);

  const pending = pendingCount(changes);
  const dirty = pending !== undefined && pending > 0;

  const act = async (kind: "apply" | "sync" | "destroy") => {
    setBusy(kind);
    setActionError(null);
    setResult(null);
    try {
      if (kind === "apply") {
        setResult((await invoke("commit", { id: sandbox.id })) as CommitResult);
        onRecheck();
      } else if (kind === "sync") {
        await invoke("sync", { id: sandbox.id });
        onRecheck();
      } else {
        await invoke("destroy", { id: sandbox.id });
        onChanged();
      }
    } catch {
      setActionError(
        kind === "destroy"
          ? "Couldn't destroy this sandbox. Retry, or check your connection."
          : kind === "apply"
            ? "Couldn't apply changes. Retry, or check your connection."
            : "Couldn't reset from the workspace. Retry, or check your connection.",
      );
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="rounded-md border bg-card p-3 text-sm">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className={`h-2 w-2 shrink-0 rounded-full ${statusDot[sandbox.status] ?? "bg-muted"}`} />
        <span className="font-semibold">{sandbox.name}</span>
        <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
          {sandbox.provider}
        </Badge>
        {sandbox.image && (
          <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
            {sandbox.image.replace(/^@aprovan\/sandbox-image-/u, "")}
          </Badge>
        )}
        {sandbox.agent && (
          <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
            {sandbox.agent}
          </Badge>
        )}

        {/* The headline number: what would be lost by walking away. */}
        <span className="ml-auto shrink-0 text-xs">
          {sandbox.status !== "running" ? (
            <span className="text-muted-foreground">{sandbox.status}</span>
          ) : changes === undefined || changes.kind === "checking" ? (
            <span className="text-muted-foreground">checking…</span>
          ) : changes.kind === "error" ? (
            <span
              className="cursor-help text-muted-foreground"
              title={`Could not read this sandbox: ${changes.message}`}
            >
              unknown
            </span>
          ) : dirty ? (
            <span className="font-medium text-amber-500">{pending} uncommitted</span>
          ) : (
            <span className="text-muted-foreground">no changes</span>
          )}
        </span>
      </div>

      <div className="mt-1.5 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        {sandbox.mounts.map((mount) => (
          <Chip
            key={mount.path}
            title={
              mount.source
                ? `${mount.source} → ${mount.path} (${mount.mode}, ${mount.files} files)`
                : `${mount.path} — scratch space, never committed`
            }
          >
            {mount.source ? `${mount.path}←${mount.source}` : `${mount.path} (scratch)`}
          </Chip>
        ))}
      </div>

      <div className="mt-1.5 text-xs text-muted-foreground">
        {sandbox.sessionId ? "commits to a draft chat" : "commits to your workspace"}
        {sandbox.hostId && ` · ${sandbox.hostId}`}
        {` · ${relativeTime(sandbox.updatedAt)}`}
        {sandbox.url && (
          <>
            {" · "}
            <a
              href={sandbox.url}
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-foreground"
            >
              open
            </a>
          </>
        )}
      </div>

      {expanded && changes?.kind === "ready" && (
        <div className="mt-2 space-y-2 border-t pt-2">
          {changes.changes.map((mount) => (
            <div key={mount.mount}>
              <div className="text-xs font-medium">
                {mount.mount}
                {mount.source ? (
                  <span className="ml-1 font-normal text-muted-foreground">→ {mount.source}</span>
                ) : (
                  <span className="ml-1 font-normal text-muted-foreground">
                    scratch — stays in the sandbox
                  </span>
                )}
              </div>
              {mount.scratch ? null : (mount.total ?? 0) === 0 ? (
                <div className="text-xs text-muted-foreground">unchanged</div>
              ) : (
                <DiffList changes={mount} />
              )}
            </div>
          ))}
        </div>
      )}

      {result && (
        <div className="mt-2 space-y-1 border-t pt-2 text-xs">
          <div className="text-muted-foreground">
            {result.written.length} written · {result.removed.length} removed
            {result.commit && " · committed"}
            {result.session && " · kept in the draft chat for review"}
          </div>
          {result.conflicts.length > 0 && (
            <div className="text-destructive">
              Changed in two places, left alone: {result.conflicts.join(", ")}
            </div>
          )}
          {result.skipped.length > 0 && (
            <div className="text-muted-foreground">
              Skipped (binary or too large): {result.skipped.join(", ")}
            </div>
          )}
        </div>
      )}
      {actionError && <div className="mt-1 text-xs text-destructive">{actionError}</div>}

      <div className="mt-2 flex flex-wrap items-center gap-1 border-t pt-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs"
          disabled={changes?.kind !== "ready"}
          onClick={() => setExpanded((open) => !open)}
        >
          <ChevronRight
            className={`mr-1 h-3 w-3 transition-transform ${expanded ? "rotate-90" : ""}`}
          />
          Files
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2 text-xs"
          disabled={!dirty || busy !== null}
          onClick={() => void act("apply")}
        >
          <Upload className="mr-1 h-3 w-3" />
          {busy === "apply" ? "Applying…" : "Apply to workspace"}
        </Button>
        {busy === null && (
          <>
            <ArmedButton
              label="Reset from workspace"
              armedLabel="Discard sandbox changes?"
              onConfirm={() => void act("sync")}
            />
            <ArmedButton
              label="Destroy"
              armedLabel={dirty ? `Destroy? ${pending} file(s) lost` : "Confirm destroy?"}
              onConfirm={() => void act("destroy")}
            />
          </>
        )}
      </div>
    </div>
  );
}

function Environments({
  sandboxes,
  scopedTo,
  onChanged,
  invoke,
}: {
  sandboxes: Sandbox[];
  /** App title/name when the list is narrowed to one app's paths. */
  scopedTo?: string | undefined;
  onChanged: () => void;
  invoke: ReturnType<typeof invokeNamespaceTool>;
}) {
  const [changes, setChanges] = useState<Record<string, ChangeState>>({});

  /**
   * Ask each live sandbox what has changed. One call per sandbox, because the
   * host has to hash its own tree — so this runs *after* the list renders and
   * each result lands on its own. A host that is asleep marks one row unknown
   * rather than failing the panel, and `timeoutMs` is what keeps that quick:
   * the service's default deadline is sized for a build, not for a poll.
   */
  const check = useCallback(
    (targets: Sandbox[]) => {
      for (const sandbox of targets) {
        setChanges((prev) => ({ ...prev, [sandbox.id]: { kind: "checking" } }));
        invoke("tree", { id: sandbox.id, timeoutMs: CHANGE_CHECK_TIMEOUT_MS })
          .then((result) =>
            setChanges((prev) => ({
              ...prev,
              [sandbox.id]: {
                kind: "ready",
                changes: (result as { changes: MountChanges[] }).changes ?? [],
              },
            })),
          )
          .catch((err: unknown) =>
            setChanges((prev) => ({
              ...prev,
              [sandbox.id]: {
                kind: "error",
                message: err instanceof Error ? err.message : String(err),
              },
            })),
          );
      }
    },
    [invoke],
  );

  const liveIds = sandboxes
    .filter((sandbox) => sandbox.status === "running")
    .map((sandbox) => sandbox.id)
    .join(",");

  useEffect(() => {
    if (!liveIds) return;
    check(sandboxes.filter((sandbox) => sandbox.status === "running"));
    // Keyed on the live id set: a refresh that returns the same sandboxes
    // should not re-hash every tree.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveIds]);

  if (sandboxes.length === 0) {
    return (
      <PanelEmpty>
        {scopedTo
          ? `No sandboxes are working on ${scopedTo}'s files.`
          : "Isolated runtimes that can read and write your workspace files appear here. Ask in chat to start one."}
      </PanelEmpty>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-3">
      {sandboxes.map((sandbox) => (
        <SandboxRow
          key={sandbox.id}
          sandbox={sandbox}
          changes={changes[sandbox.id]}
          onRecheck={() => check([sandbox])}
          onChanged={onChanged}
          invoke={invoke}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Console
// ---------------------------------------------------------------------------

interface ConsoleEntry {
  command: string;
  cwd: string;
  result?: ExecResult;
  error?: string;
}

function Console({
  sandboxes,
  invoke,
}: {
  sandboxes: Sandbox[];
  invoke: ReturnType<typeof invokeNamespaceTool>;
}) {
  const live = sandboxes.filter((sandbox) => sandbox.status === "running");
  const [sandboxId, setSandboxId] = useState<string>(live[0]?.id ?? "");
  const [cwd, setCwd] = useState<string>("");
  const [command, setCommand] = useState("");
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState<ConsoleEntry[]>([]);

  const sandbox = live.find((candidate) => candidate.id === sandboxId) ?? live[0];

  // Follow the selection: a mount from the previous sandbox is not a valid cwd.
  useEffect(() => {
    if (sandbox && !sandbox.mounts.some((mount) => mount.path === cwd)) setCwd("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sandbox?.id]);

  const run = async () => {
    if (!sandbox || !command.trim() || running) return;
    const entry: ConsoleEntry = { command: command.trim(), cwd };
    setRunning(true);
    setCommand("");
    try {
      const result = (await invoke("exec", {
        id: sandbox.id,
        command: entry.command,
        ...(cwd ? { cwd } : {}),
      })) as ExecResult;
      setHistory((prev) => [{ ...entry, result }, ...prev].slice(0, 20));
    } catch (err) {
      setHistory((prev) =>
        [{ ...entry, error: err instanceof Error ? err.message : String(err) }, ...prev].slice(0, 20),
      );
    } finally {
      setRunning(false);
    }
  };

  if (live.length === 0) {
    return (
      <PanelEmpty>
        Commands run inside a live sandbox. Start one from Environments, then come back here.
      </PanelEmpty>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-3">
      {live.length > 1 && (
        <div className="flex flex-wrap items-center gap-1">
          {live.map((candidate) => (
            <FilterChip
              key={candidate.id}
              active={candidate.id === sandbox?.id}
              onClick={() => setSandboxId(candidate.id)}
              title={`${candidate.provider}${candidate.hostId ? ` · ${candidate.hostId}` : ""}`}
            >
              {candidate.name}
            </FilterChip>
          ))}
        </div>
      )}
      {/* cwd is relative to the sandbox workdir, so a mount name works
          directly — which is what you almost always want. */}
      <div className="flex flex-wrap items-center gap-1">
        <span className="text-[11px] text-muted-foreground">in</span>
        <FilterChip active={cwd === ""} onClick={() => setCwd("")} title={sandbox?.workdir}>
          workdir
        </FilterChip>
        {sandbox?.mounts.map((mount) => (
          <FilterChip
            key={mount.path}
            active={cwd === mount.path}
            onClick={() => setCwd(mount.path)}
            title={mount.source ? `mounted from ${mount.source}` : "scratch space"}
          >
            {mount.path}
          </FilterChip>
        ))}
      </div>

      <div className="flex items-center gap-1.5">
        <Input
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void run();
            }
          }}
          placeholder="pnpm test"
          className="h-8 font-mono text-xs"
          disabled={running}
        />
        <Button
          size="sm"
          className="h-8 px-2 text-xs"
          disabled={running || !command.trim()}
          onClick={() => void run()}
        >
          <Play className="mr-1 h-3 w-3" />
          {running ? "Running…" : "Run"}
        </Button>
      </div>

      {history.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          Commands run inside the sandbox. Nothing they write reaches the workspace until you
          apply it.
        </p>
      ) : (
        history.map((entry, index) => (
          <div key={`${entry.command}-${index}`} className="rounded-md border bg-card p-2">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-mono text-muted-foreground">
                {entry.cwd ? `${entry.cwd} $` : "$"}
              </span>
              <code className="min-w-0 flex-1 truncate font-mono">{entry.command}</code>
              {entry.result && (
                <span
                  className={`shrink-0 tabular-nums ${
                    entry.result.exitCode === 0 ? "text-emerald-500" : "text-destructive"
                  }`}
                >
                  exit {entry.result.exitCode} · {formatDuration(entry.result.durationMs)}
                </span>
              )}
            </div>
            {entry.error && <div className="mt-1 text-xs text-destructive">{entry.error}</div>}
            {entry.result && (entry.result.stdout || entry.result.stderr) && (
              <pre className="mt-1 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded bg-muted/50 p-2 font-mono text-[11px] leading-relaxed">
                {entry.result.stdout}
                {entry.result.stderr && (
                  <span className="text-destructive">{entry.result.stderr}</span>
                )}
              </pre>
            )}
            {entry.result?.truncated && (
              <div className="mt-1 text-[11px] text-muted-foreground">Output was truncated.</div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Runs
// ---------------------------------------------------------------------------

function Runs({
  runs,
  onChanged,
  invoke,
}: {
  runs: ScheduledRun[];
  onChanged: () => void;
  invoke: ReturnType<typeof invokeNamespaceTool>;
}) {
  const [error, setError] = useState<string | null>(null);

  if (runs.length === 0) {
    return (
      <PanelEmpty>
        Scheduled work waiting for a free machine appears here. Queue a run from chat.
      </PanelEmpty>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 p-3">
      {error && <div className="text-xs text-destructive">{error}</div>}
      {runs.map((run) => (
        <div key={run.id} className="rounded-md border bg-card p-2.5 text-sm">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`h-2 w-2 shrink-0 rounded-full ${statusDot[run.status] ?? "bg-muted"}`} />
            <span className="font-medium">{run.workflow}</span>
            <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
              {run.image.replace(/^@aprovan\/sandbox-image-/u, "")}
            </Badge>
            {run.agent && (
              <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                {run.agent}
              </Badge>
            )}
            <span className="ml-auto shrink-0 text-xs text-muted-foreground">{run.status}</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {/* A pending run has no host yet — that is the interesting state
                when a queue is not draining. */}
            {run.hostId ? `on ${run.hostId}` : "waiting for a capable machine"}
            {` · queued ${relativeTime(run.createdAt)}`}
            {run.finishedAt && ` · finished ${relativeTime(run.finishedAt)}`}
            {run.workflowRunId && ` · run ${run.workflowRunId.slice(0, 8)}`}
          </div>
          {run.sessionId && (
            <div className="mt-1 text-xs text-muted-foreground">
              changes kept in a draft chat for review
            </div>
          )}
          {run.error && <div className="mt-1 text-xs text-destructive">{run.error}</div>}
          {run.status === "pending" && (
            <div className="mt-1.5 border-t pt-1.5">
              <ArmedButton
                label="Cancel"
                armedLabel="Confirm cancel?"
                onConfirm={() => {
                  setError(null);
                  invoke("cancelRun", { id: run.id })
                    .then(onChanged)
                    .catch(() =>
                      setError("Couldn't cancel this run. Retry, or check your connection."),
                    );
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hosts
// ---------------------------------------------------------------------------

function Hosts({
  hosts,
  onChanged,
  invoke,
}: {
  hosts: Host[];
  onChanged: () => void;
  invoke: ReturnType<typeof invokeNamespaceTool>;
}) {
  const [error, setError] = useState<string | null>(null);

  if (hosts.length === 0) {
    return (
      <PanelEmpty>
        Machines that can run sandboxes appear here. Register one with{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
          aprovan sandbox host register --name my-laptop
        </code>
        , then keep{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
          aprovan sandbox host run
        </code>{" "}
        running on it.
      </PanelEmpty>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 p-3">
      {error && <div className="text-xs text-destructive">{error}</div>}
      {hosts.map((host) => {
        const declared = host.images ?? [];
        // The whole reason this view exists: a machine that lost its toolchain
        // stops taking work silently, and the only other symptom is a queue
        // that never drains.
        const verified = host.verifiedImages;
        const unverified = verified ? declared.filter((image) => !verified.includes(image)) : [];
        const neverAdvertised = verified === undefined;
        const stale =
          host.lastSeenAt !== undefined && Date.now() - Date.parse(host.lastSeenAt) > STALE_HOST_MS;
        const offline = host.lastSeenAt === undefined || stale;

        return (
          <div key={host.id} className="rounded-md border bg-card p-2.5 text-sm">
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  offline ? "bg-muted-foreground" : "bg-emerald-500"
                }`}
              />
              <span className="font-medium">{host.name}</span>
              <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                {host.provider}
              </Badge>
              {host.platform && (
                <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
                  {host.platform}
                </Badge>
              )}
              <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                {host.lastSeenAt ? `seen ${relativeTime(host.lastSeenAt)}` : "never connected"}
              </span>
            </div>

            {(verified ?? declared).length > 0 && (
              <div className="mt-1.5 flex flex-wrap items-center gap-1">
                {(verified ?? declared).map((image) => (
                  <Chip key={image} title={neverAdvertised ? "Declared, not yet verified" : "Verified on this machine"}>
                    {image.replace(/^@aprovan\/sandbox-image-/u, "")}
                  </Chip>
                ))}
              </div>
            )}

            {neverAdvertised && (
              <div className="mt-1.5 flex items-start gap-1.5 text-xs text-muted-foreground">
                <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
                <span>
                  Never advertised its capabilities. Until the agent connects, it takes no
                  scheduled runs.
                </span>
              </div>
            )}
            {unverified.length > 0 && (
              <div className="mt-1.5 flex items-start gap-1.5 text-xs text-amber-500">
                <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
                <span>
                  Not runnable here: {unverified.join(", ")} — the machine is missing tools these
                  images need, so runs for them stay queued.
                </span>
              </div>
            )}

            <div className="mt-1.5 text-xs text-muted-foreground">
              {host.root && (
                <code className="font-mono" title="Every sandbox is confined below this">
                  {host.root}
                </code>
              )}
              {host.tools && host.tools.length > 0 && ` · found ${host.tools.join(", ")}`}
            </div>

            <div className="mt-1.5 border-t pt-1.5">
              <ArmedButton
                label="Revoke"
                armedLabel="Confirm revoke? Tokens stop working"
                onConfirm={() => {
                  setError(null);
                  invoke("revokeHost", { id: host.id })
                    .then(onChanged)
                    .catch(() =>
                      setError("Couldn't revoke this host. Retry, or check your connection."),
                    );
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------

type Tab = "environments" | "console" | "runs" | "hosts";

export function SandboxesPanel({ scope: explicitScope }: NativePanelProps) {
  const { scope, scopeFilter } = useScopeFilter(explicitScope);
  const invoke = useMemo(() => invokeNamespaceTool("sandboxes"), []);
  const [tab, setTab] = useState<Tab>("environments");

  const { data, error, loading, refresh } = usePanelData(async () => {
    const [sandboxes, runs, hosts] = await Promise.all([
      invoke("list", {}) as Promise<{ sandboxes: Sandbox[] }>,
      invoke("runs", { limit: 50 }) as Promise<{ runs: ScheduledRun[] }>,
      invoke("hosts", {}) as Promise<{ hosts: Host[] }>,
    ]);
    return {
      sandboxes: sandboxes.sandboxes ?? [],
      runs: runs.runs ?? [],
      hosts: hosts.hosts ?? [],
    };
  });

  /**
   * Scoped to an app — the inspector tab or the header picker — this shows
   * the sandboxes touching that app's own paths. Scoping is a filter, not a
   * fork: the service has no app-scoped listing because a sandbox belongs to
   * the workspace, not to an app.
   */
  const sandboxes = useMemo(() => {
    // A destroyed sandbox is not an environment — the service keeps the record
    // but 410s every operation on it, so a row here would be all dead buttons.
    // Its history lives in Runs.
    const all = (data?.sandboxes ?? []).filter((sandbox) => sandbox.status !== "destroyed");
    if (!scope) return all;
    const prefix = `apps/${scope.name}`;
    return all.filter((sandbox) =>
      sandbox.mounts.some(
        (mount) => mount.source === prefix || mount.source?.startsWith(`${prefix}/`),
      ),
    );
  }, [data?.sandboxes, scope]);

  const live = sandboxes.filter((sandbox) => sandbox.status === "running").length;
  const queued = (data?.runs ?? []).filter((run) => run.status === "pending").length;

  return (
    <PanelShell
      icon={Box}
      title="Sandboxes"
      description="Isolated runtimes that can read and write your workspace files"
      actions={scopeFilter}
      onRefresh={refresh}
      refreshing={loading}
    >
      <PanelTabs
        tabs={[
          { id: "environments" as const, label: "Environments", badge: live },
          { id: "console" as const, label: "Console" },
          { id: "runs" as const, label: "Runs", badge: queued },
          { id: "hosts" as const, label: "Hosts" },
        ]}
        active={tab}
        onChange={setTab}
      />
      {loading && !data ? (
        <PanelLoading label="Loading sandboxes…" />
      ) : error ? (
        <PanelErrorWithRetry
          message="Couldn't load sandboxes. Retry, or check your connection."
          onRetry={refresh}
          retrying={loading}
        />
      ) : tab === "environments" ? (
        <Environments
          sandboxes={sandboxes}
          scopedTo={scope ? (scope.title ?? scope.name) : undefined}
          onChanged={refresh}
          invoke={invoke}
        />
      ) : tab === "console" ? (
        <Console sandboxes={sandboxes} invoke={invoke} />
      ) : tab === "runs" ? (
        <Runs runs={data?.runs ?? []} onChanged={refresh} invoke={invoke} />
      ) : (
        <Hosts hosts={data?.hosts ?? []} onChanged={refresh} invoke={invoke} />
      )}
    </PanelShell>
  );
}
