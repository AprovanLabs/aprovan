/**
 * Workflow registrations + run records, stored in the record store
 * (accumulated state — specs/record-store; tech-plan D3).
 *
 * Layout:
 *   svc#workflows            / <name>  — registration
 *   svc#workflows#runs#<name>/ <id>    — run record (spans, logs, result)
 *
 * A workflow is a workspace script (a VFS path) plus its triggers. The script
 * itself lives wherever the user keeps it (e.g. `workflows/daily-report.js`) —
 * the registration only points at it, so editing the script in chat or the
 * playground immediately affects the next run.
 *
 * Because the script is an ordinary FS file, its content is version history
 * for free (the FS store content-versions every write). The helpers at the
 * bottom of this file surface that history for the `workflows.versions/
 * version/restore` ops — the versioned artifact is the `scriptPath`.
 */

import { getFsStore, type FsEntry, type FsFile } from "../fs-store.js";
import { ServiceError } from "../service-kernel.js";
import {
  deleteSvcRecord,
  deleteSvcScope,
  listSvcKeys,
  listSvcRecords,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "../svc-records.js";
import { listApps } from "../apps/store.js";

const WF_SCOPE = svcScope("workflows");
const RUNS_MAX_RETAINED = 100;

function runsScope(name: string): string {
  return svcScope("workflows", "runs", name);
}

export interface WorkflowTriggers {
  /** Runnable on demand (always true today; recorded for clarity). */
  manual?: boolean;
  /** 5-field cron expression (UTC), e.g. every 5 minutes. */
  cron?: string;
  /** Expose an unauthenticated-but-tokened webhook endpoint. */
  webhook?: boolean;
  /** Event channels whose emissions trigger a run. */
  events?: string[];
}

export interface WorkflowRegistration {
  name: string;
  description?: string;
  /** Workspace VFS path of the script to run. */
  scriptPath: string;
  /**
   * Inline script source — used by platform-generated runners (e.g. the sync
   * service's scheduled companion workflows) whose one-line scripts are state,
   * not authored files. When set, runs execute this source and `scriptPath` is
   * a synthetic label; version-history ops report no versions.
   */
  script?: string;
  triggers: WorkflowTriggers;
  /**
   * Optional JSON Schema for the run's `input` — the workflow's declared
   * signature. It is what makes the generated app SDK typed
   * (`app.weeklySummary({ weeks: 4 })`) and what the panel's run form renders.
   * Undeclared means `unknown`, and the call still works.
   */
  input?: Record<string, unknown>;
  /** Optional JSON Schema for the run's result (same role as `input`). */
  output?: Record<string, unknown>;
  /**
   * Per-workflow interface bindings (interface id → provider id), overriding
   * the workspace binding for this workflow's runs — e.g. { llm: "openai" }
   * pins `llm.createChatCompletion` to OpenAI here while chat and other
   * workflows keep the workspace default.
   */
  bindings?: Record<string, string>;
  /** Bearer token external webhook callers must present. */
  hookToken?: string;
  /**
   * Agent profile every run of this workflow executes as (agents service):
   * its grants bound the run; `workflows.run {agent}` overrides per run.
   */
  agent?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowSpan {
  namespace: string;
  procedure: string;
  startedAt: string;
  durationMs: number;
  ok: boolean;
  error?: string;
}

export interface WorkflowLogLine {
  level: "log" | "info" | "warn" | "error" | "debug";
  message: string;
  ts: string;
}

export interface WorkflowRun {
  id: string;
  workflow: string;
  /** What started the run. */
  trigger: "manual" | "cron" | "webhook" | "event";
  /** Trigger detail: event channel, cron expression, caller id. */
  triggerDetail?: string;
  status: "running" | "succeeded" | "failed";
  startedAt: string;
  durationMs?: number;
  input?: unknown;
  result?: unknown;
  error?: string;
  logs: WorkflowLogLine[];
  spans: WorkflowSpan[];
  /**
   * Trace correlation across instances. Every cascade (`events.emit` →
   * workflow, workflow → workflow, app call → workflow) carries the trace id
   * of the run that caused it and names its parent, so `workflows.tree` can
   * render the whole cascade instead of one run at a time.
   */
  traceId?: string;
  parentRunId?: string;
  /** Set when the run was started through a published app. */
  app?: string;
  /** Agent profile the run executed as (its grants bounded the run). */
  agent?: string;
}

/** One node of a trace, as recorded in the trace index. */
export interface TraceNode {
  traceId: string;
  runId: string;
  workflow: string;
  parentRunId?: string;
  trigger: WorkflowRun["trigger"];
  triggerDetail?: string;
  status: WorkflowRun["status"];
  startedAt: string;
  durationMs?: number;
  error?: string;
  app?: string;
  logCount: number;
  spanCount: number;
}

const NAME_RE = /^[a-z0-9][a-z0-9-]{0,63}$/u;

export function workflowName(value: unknown): string {
  if (typeof value !== "string" || !NAME_RE.test(value)) {
    throw new ServiceError(`workflow name must match ${NAME_RE}`, 400);
  }
  return value;
}

export async function saveRegistration(
  workspaceId: string,
  registration: WorkflowRegistration,
): Promise<void> {
  await writeSvcRecord(
    workspaceId,
    WF_SCOPE,
    registration.name,
    registration,
    registration.createdBy,
  );
}

export async function readRegistration(
  workspaceId: string,
  name: string,
): Promise<WorkflowRegistration | undefined> {
  return readSvcRecord<WorkflowRegistration>(workspaceId, WF_SCOPE, name);
}

export async function listRegistrations(
  workspaceId: string,
): Promise<WorkflowRegistration[]> {
  const entries = await listSvcRecords<WorkflowRegistration>(workspaceId, WF_SCOPE);
  return entries.map((entry) => entry.value);
}

/**
 * Workflow name → appIds that export it. Built from published app manifests
 * (tech-plan D8 — exporting is the only way to share a workflow).
 */
export async function exportedByIndex(
  workspaceId: string,
): Promise<Map<string, string[]>> {
  const index = new Map<string, string[]>();
  for (const app of await listApps(workspaceId)) {
    for (const name of app.workflows ?? []) {
      const list = index.get(name) ?? [];
      list.push(app.appId);
      index.set(name, list);
    }
  }
  return index;
}

/**
 * Unbundled workflows are creator-private; exporting from any app flips them
 * visible to every workspace member.
 */
export function workflowVisibleTo(
  registration: WorkflowRegistration,
  callerSub: string,
  exportedBy: readonly string[],
): boolean {
  return registration.createdBy === callerSub || exportedBy.length > 0;
}

/** Registrations the caller may see, each annotated with exporting app ids. */
export async function listVisibleRegistrations(
  workspaceId: string,
  callerSub: string,
): Promise<Array<WorkflowRegistration & { exportedBy: string[] }>> {
  const [registrations, index] = await Promise.all([
    listRegistrations(workspaceId),
    exportedByIndex(workspaceId),
  ]);
  return registrations
    .map((registration) => ({
      ...registration,
      exportedBy: index.get(registration.name) ?? [],
    }))
    .filter((registration) =>
      workflowVisibleTo(registration, callerSub, registration.exportedBy),
    );
}

/**
 * Load a registration the caller may access; unexported foreign workflows
 * answer not-found (same as missing).
 */
export async function requireVisibleRegistration(
  workspaceId: string,
  name: string,
  callerSub: string,
): Promise<WorkflowRegistration & { exportedBy: string[] }> {
  const registration = await readRegistration(workspaceId, name);
  if (!registration) throw new ServiceError(`Unknown workflow: ${name}`, 404);
  const exportedBy = (await exportedByIndex(workspaceId)).get(name) ?? [];
  if (!workflowVisibleTo(registration, callerSub, exportedBy)) {
    throw new ServiceError(`Unknown workflow: ${name}`, 404);
  }
  return { ...registration, exportedBy };
}

export async function removeRegistration(
  workspaceId: string,
  name: string,
): Promise<boolean> {
  const removed = await deleteSvcRecord(workspaceId, WF_SCOPE, name);
  await deleteSvcScope(workspaceId, runsScope(name));
  return removed;
}

// ---------------------------------------------------------------------------
// Script version history — thin wrappers over the FS store's per-file
// versioning, keyed on a workflow's `scriptPath`.
// ---------------------------------------------------------------------------

/** Every stored version of a workflow's script, newest (live) first. */
export async function listScriptVersions(
  workspaceId: string,
  scriptPath: string,
): Promise<FsEntry[]> {
  return getFsStore().listVersions(workspaceId, scriptPath);
}

/** One pinned version of a workflow's script by content hash. */
export async function readScriptVersion(
  workspaceId: string,
  scriptPath: string,
  hash: string,
): Promise<FsFile | undefined> {
  return getFsStore().read(workspaceId, scriptPath, hash);
}

/**
 * Restore a past script version by re-writing its content as the new latest.
 * Append-only: history is preserved and the old content simply becomes live
 * again. Returns the new latest file, or undefined when `hash` is unknown.
 */
export async function restoreScriptVersion(
  workspaceId: string,
  scriptPath: string,
  hash: string,
): Promise<FsFile | undefined> {
  const version = await getFsStore().read(workspaceId, scriptPath, hash);
  if (!version) return undefined;
  return getFsStore().write(workspaceId, scriptPath, version.content, version.mimeType);
}

export async function saveRun(workspaceId: string, run: WorkflowRun): Promise<void> {
  await writeSvcRecord(workspaceId, runsScope(run.workflow), run.id, run);
  if (run.traceId) await indexTraceNode(workspaceId, run);
}

// ---------------------------------------------------------------------------
// Trace index — `traceId` → the runs that carry it. Kept as its own document
// so `workflows.tree` is one read instead of a scan across every workflow's
// run folder. Best-effort: a lost index entry costs a tree edge, never a run.
// ---------------------------------------------------------------------------

const TRACES_SCOPE = svcScope("workflows", "traces");
const TRACE_MAX_NODES = 200;

function traceNode(run: WorkflowRun): TraceNode {
  return {
    traceId: run.traceId!,
    runId: run.id,
    workflow: run.workflow,
    parentRunId: run.parentRunId,
    trigger: run.trigger,
    triggerDetail: run.triggerDetail,
    status: run.status,
    startedAt: run.startedAt,
    durationMs: run.durationMs,
    error: run.error,
    app: run.app,
    logCount: run.logs.length,
    spanCount: run.spans.length,
  };
}

async function indexTraceNode(workspaceId: string, run: WorkflowRun): Promise<void> {
  try {
    const nodes =
      (await readSvcRecord<TraceNode[]>(workspaceId, TRACES_SCOPE, run.traceId!)) ?? [];
    const next = [...nodes.filter((node) => node.runId !== run.id), traceNode(run)]
      .sort((a, b) => a.startedAt.localeCompare(b.startedAt))
      .slice(0, TRACE_MAX_NODES);
    await writeSvcRecord(workspaceId, TRACES_SCOPE, run.traceId!, next);
  } catch {
    // Tracing must never fail a run.
  }
}

/** Every run recorded under a trace id, oldest first. */
export async function readTrace(
  workspaceId: string,
  traceId: string,
): Promise<TraceNode[]> {
  const nodes = await readSvcRecord<TraceNode[]>(workspaceId, TRACES_SCOPE, traceId).catch(
    () => undefined,
  );
  return Array.isArray(nodes) ? nodes : [];
}

/** Trace ids are opaque correlation ids; keep them path-safe. */
export function newTraceId(): string {
  return crypto.randomUUID().replace(/-/gu, "");
}

export async function readRun(
  workspaceId: string,
  name: string,
  runId: string,
): Promise<WorkflowRun | undefined> {
  return readSvcRecord<WorkflowRun>(workspaceId, runsScope(name), runId);
}

export async function listRuns(
  workspaceId: string,
  name: string,
  limit = 20,
): Promise<WorkflowRun[]> {
  // Run ids are time-prefixed, so a lexical sort is chronological.
  const ids = (await listSvcKeys(workspaceId, runsScope(name))).sort().reverse();

  // Retention: prune old runs past the cap (best-effort).
  for (const stale of ids.slice(RUNS_MAX_RETAINED)) {
    void deleteSvcRecord(workspaceId, runsScope(name), stale);
  }

  const runs = await Promise.all(
    ids.slice(0, limit).map((id) => readRun(workspaceId, name, id)),
  );
  return runs.filter((r): r is WorkflowRun => Boolean(r));
}

/** Time-prefixed id: sortable, unique. */
export function newRunId(): string {
  return `${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}`;
}

// ---------------------------------------------------------------------------
// Cron index — which workspaces have cron workflows. The scheduler tick reads
// this instead of scanning every workspace. Lives in a synthetic "_system"
// tenant of the same record store.
// ---------------------------------------------------------------------------

const CRON_INDEX_WORKSPACE = "_system";
const CRON_SCOPE = svcScope("workflows", "cron");
const CRON_INDEX_KEY = "cron-workspaces";

export async function workspacesWithCronWorkflows(): Promise<string[]> {
  const parsed = await readSvcRecord<unknown>(
    CRON_INDEX_WORKSPACE,
    CRON_SCOPE,
    CRON_INDEX_KEY,
  ).catch(() => undefined);
  return Array.isArray(parsed)
    ? parsed.filter((w): w is string => typeof w === "string")
    : [];
}

/** Keep the cron index in sync after a registration change. */
export async function updateCronIndex(workspaceId: string): Promise<void> {
  const hasCron = (await listRegistrations(workspaceId)).some((r) => r.triggers.cron);
  const workspaces = await workspacesWithCronWorkflows();
  const has = workspaces.includes(workspaceId);
  if (hasCron === has) return;
  const next = hasCron
    ? [...workspaces, workspaceId]
    : workspaces.filter((w) => w !== workspaceId);
  await writeSvcRecord(CRON_INDEX_WORKSPACE, CRON_SCOPE, CRON_INDEX_KEY, next);
}
