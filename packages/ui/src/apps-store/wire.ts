/**
 * Wire types and defensive normalisers for the Apps / Workflows surfaces —
 * the data plane shared by every host that renders an apps panel (the
 * registry web app, patchwork chat, and whatever mounts one next).
 *
 * Everything the panels render comes from two gateway tool namespaces —
 * `apps` and `workflows` — reached through a host-supplied
 * `invoke(operation, args)`. The gateway grows new procedures
 * (`capabilities`, `channels`, `releases`, `promote`, `rollback`, `tree`) on
 * its own schedule, and older deployments simply don't have them. So nothing
 * in this module trusts a response shape: every value is read through a
 * coercion helper, every field is optional until proven present, and a
 * procedure that 404s is classified as *missing* rather than *broken* so the
 * UI can hide the section instead of shouting an error at the user.
 *
 * The one piece of real domain logic here is {@link deriveCapabilities}: the
 * "three ways data is reached" model from docs/apps-and-workflows.md, computed
 * locally from the manifest so an Access pane says something true even when
 * `apps.capabilities` doesn't exist yet, and merged with the gateway's answer
 * when it does. {@link classifyToolEntry} is the same tier model applied to a
 * single allow-list entry, which is what an allow-list *editor* needs.
 */

// ---------------------------------------------------------------------------
// Transport
// ---------------------------------------------------------------------------

/** A single tool namespace's dispatch: POST /tools/<namespace>/<operation>. */
export type ToolsInvoke = (
  operation: string,
  args: Record<string, unknown>,
) => Promise<unknown>;

/** Result of a guarded call: never throws, always classifies. */
export interface Attempt<T> {
  ok: boolean;
  value?: T;
  error?: string;
  /** The procedure doesn't exist on this gateway — degrade, don't complain. */
  missing?: boolean;
}

const MISSING_PATTERN =
  /\b(404|not found|unknown (procedure|operation|tool|method)|unsupported operation|no such)\b/i;

/** Run a transport call, mapping every failure into a classified result. */
export async function attempt<T>(run: () => Promise<T>): Promise<Attempt<T>> {
  try {
    return { ok: true, value: await run() };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, error: message, missing: MISSING_PATTERN.test(message) };
  }
}

// ---------------------------------------------------------------------------
// Coercion primitives
// ---------------------------------------------------------------------------

export function asRecord(value: unknown): Record<string, unknown> | undefined {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

export function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

export function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export function asStringList(value: unknown): string[] {
  const out: string[] = [];
  for (const entry of asArray(value)) {
    const direct = asString(entry);
    if (direct) {
      out.push(direct);
      continue;
    }
    // Tolerate [{ name }] where a bare string list was expected.
    const named = asString(asRecord(entry)?.["name"]);
    if (named) out.push(named);
  }
  return out;
}

/**
 * Pull the first present key. The gateway is camelCase today but arguments
 * are snake_case, and a new procedure could answer in either dialect.
 */
function pick(source: Record<string, unknown> | undefined, ...keys: string[]): unknown {
  if (!source) return undefined;
  for (const key of keys) {
    const value = source[key];
    if (value !== undefined && value !== null) return value;
  }
  return undefined;
}

/**
 * Find the list inside a result envelope: `{ apps: [] }`, `{ items: [] }`,
 * or a bare array all mean the same thing to the caller.
 */
export function unwrapList(value: unknown, ...keys: string[]): unknown[] {
  if (Array.isArray(value)) return value;
  const record = asRecord(value);
  if (!record) return [];
  for (const key of [...keys, "items", "results", "data"]) {
    const candidate = record[key];
    if (Array.isArray(candidate)) return candidate;
  }
  return [];
}

// ---------------------------------------------------------------------------
// Workflows
// ---------------------------------------------------------------------------

export type RunStatus = "running" | "succeeded" | "failed";

function asStatus(value: unknown): RunStatus {
  return value === "succeeded" || value === "failed" ? value : "running";
}

export interface WorkflowTriggers {
  manual?: boolean;
  cron?: string;
  webhook?: boolean;
  events?: string[];
}

export interface WorkflowSummary {
  name: string;
  description?: string;
  scriptPath: string;
  triggers: WorkflowTriggers;
  webhookPath?: string;
  updatedAt?: string;
  /** JSON Schema for the manual-run input, when the workflow declares one. */
  input?: unknown;
  /** JSON Schema for the result, when declared. */
  output?: unknown;
  /** Most recent run, when the gateway inlines it on `list`. */
  lastRun?: WorkflowRunSummary;
  /**
   * How the SDK and the app tool proxy spell this workflow —
   * `weekly-summary` is called as `app.weeklySummary`. Present on workflows
   * that arrive inlined on an app.
   */
  procedure?: string;
  /** False when the app exports a name whose registration no longer exists. */
  registered?: boolean;
  /** Apps that export this workflow — filled in by the catalog, not the wire. */
  apps?: string[];
  /** App ids that export this workflow (from workflows.list). */
  exportedBy?: string[];
}

export interface WorkflowRunSummary {
  id: string;
  trigger: string;
  triggerDetail?: string;
  status: RunStatus;
  startedAt: string;
  durationMs?: number;
  error?: string;
  spanCount?: number;
  /** Cascade identity, when the gateway propagates it. */
  traceId?: string;
  parentRunId?: string;
  /** Workflow the run belongs to (present on cross-workflow trace queries). */
  workflow?: string;
}

export interface WorkflowRunTrace extends WorkflowRunSummary {
  input?: unknown;
  result?: unknown;
  logs: Array<{ level: string; message: string; ts: string }>;
  spans: Array<{
    namespace: string;
    procedure: string;
    startedAt: string;
    durationMs: number;
    ok: boolean;
    error?: string;
  }>;
}

export function normalizeWorkflow(raw: unknown): WorkflowSummary | null {
  const record = asRecord(raw);
  const name = asString(pick(record, "name", "id"));
  if (!record || !name) return null;

  const triggersRecord = asRecord(pick(record, "triggers"));
  const triggers: WorkflowTriggers = {
    manual: pick(triggersRecord, "manual") === true,
    ...(asString(pick(triggersRecord, "cron")) ? { cron: asString(pick(triggersRecord, "cron")) } : {}),
    ...(pick(triggersRecord, "webhook") ? { webhook: true } : {}),
  };
  const events = asStringList(pick(triggersRecord, "events"));
  if (events.length) triggers.events = events;

  const workflow: WorkflowSummary = {
    name,
    scriptPath: asString(pick(record, "scriptPath", "script_path", "path")) ?? "",
    triggers,
  };
  const description = asString(pick(record, "description"));
  if (description) workflow.description = description;
  const webhookPath = asString(pick(record, "webhookPath", "webhook_path"));
  if (webhookPath) workflow.webhookPath = webhookPath;
  const updatedAt = asString(pick(record, "updatedAt", "updated_at"));
  if (updatedAt) workflow.updatedAt = updatedAt;
  const input = pick(record, "input", "inputSchema", "input_schema");
  if (input !== undefined) workflow.input = input;
  const output = pick(record, "output", "outputSchema", "output_schema");
  if (output !== undefined) workflow.output = output;
  const lastRun = normalizeRunSummary(pick(record, "lastRun", "last_run"));
  if (lastRun) workflow.lastRun = lastRun;
  const procedure = asString(pick(record, "procedure"));
  if (procedure) workflow.procedure = procedure;
  const registered = pick(record, "registered");
  if (typeof registered === "boolean") workflow.registered = registered;
  const exportedBy = asStringList(pick(record, "exportedBy", "exported_by"));
  if (exportedBy.length) workflow.exportedBy = exportedBy;
  return workflow;
}

export function normalizeRunSummary(raw: unknown): WorkflowRunSummary | null {
  const record = asRecord(raw);
  const id = asString(pick(record, "id", "runId", "run_id"));
  if (!record || !id) return null;
  const run: WorkflowRunSummary = {
    id,
    trigger: asString(pick(record, "trigger")) ?? "manual",
    status: asStatus(pick(record, "status")),
    startedAt: asString(pick(record, "startedAt", "started_at")) ?? "",
  };
  const triggerDetail = asString(pick(record, "triggerDetail", "trigger_detail"));
  if (triggerDetail) run.triggerDetail = triggerDetail;
  const durationMs = asNumber(pick(record, "durationMs", "duration_ms"));
  if (durationMs !== undefined) run.durationMs = durationMs;
  const error = asString(pick(record, "error"));
  if (error) run.error = error;
  const spanCount = asNumber(pick(record, "spanCount", "span_count"));
  if (spanCount !== undefined) run.spanCount = spanCount;
  const traceId = asString(pick(record, "traceId", "trace_id"));
  if (traceId) run.traceId = traceId;
  const parentRunId = asString(pick(record, "parentRunId", "parent_run_id"));
  if (parentRunId) run.parentRunId = parentRunId;
  const workflow = asString(pick(record, "workflow", "workflowName", "workflow_name", "name"));
  if (workflow) run.workflow = workflow;
  return run;
}

export function normalizeRunTrace(raw: unknown): WorkflowRunTrace | null {
  const summary = normalizeRunSummary(raw);
  const record = asRecord(raw);
  if (!summary || !record) return null;
  const trace: WorkflowRunTrace = {
    ...summary,
    logs: asArray(pick(record, "logs")).flatMap((entry) => {
      const log = asRecord(entry);
      if (!log) return [];
      return [
        {
          level: asString(pick(log, "level")) ?? "log",
          message: asString(pick(log, "message", "line")) ?? "",
          ts: asString(pick(log, "ts", "at")) ?? "",
        },
      ];
    }),
    spans: asArray(pick(record, "spans")).flatMap((entry) => {
      const span = asRecord(entry);
      if (!span) return [];
      const error = asString(pick(span, "error"));
      return [
        {
          namespace: asString(pick(span, "namespace")) ?? "?",
          procedure: asString(pick(span, "procedure", "operation")) ?? "?",
          startedAt: asString(pick(span, "startedAt", "started_at")) ?? "",
          durationMs: asNumber(pick(span, "durationMs", "duration_ms")) ?? 0,
          ok: pick(span, "ok") !== false,
          ...(error ? { error } : {}),
        },
      ];
    }),
  };
  const input = pick(record, "input");
  if (input !== undefined) trace.input = input;
  const result = pick(record, "result");
  if (result !== undefined) trace.result = result;
  return trace;
}

// ---------------------------------------------------------------------------
// Cascades (workflows.tree)
// ---------------------------------------------------------------------------

export interface TraceRunNode extends WorkflowRunSummary {
  children: TraceRunNode[];
}

/**
 * Fold a flat list of trace-linked runs into the cascade tree. Runs whose
 * parent isn't in the response (depth truncation, a sibling workspace) become
 * roots so nothing is dropped, and the whole thing is cycle-guarded because a
 * malformed parent chain must not hang the panel.
 */
export function normalizeTraceTree(raw: unknown): TraceRunNode[] {
  const runs = unwrapList(raw, "runs", "tree", "nodes")
    .map(normalizeRunSummary)
    .filter((run): run is WorkflowRunSummary => run !== null);
  if (runs.length === 0) return [];

  const nodes = new Map<string, TraceRunNode>();
  for (const run of runs) nodes.set(run.id, { ...run, children: [] });

  const roots: TraceRunNode[] = [];
  for (const node of nodes.values()) {
    const parent = node.parentRunId ? nodes.get(node.parentRunId) : undefined;
    if (!parent || parent.id === node.id) {
      roots.push(node);
      continue;
    }
    parent.children.push(node);
  }

  // Any node still unreachable from a root (a parent cycle) is promoted.
  const seen = new Set<string>();
  const walk = (node: TraceRunNode, depth: number) => {
    if (seen.has(node.id) || depth > 8) return;
    seen.add(node.id);
    for (const child of node.children) walk(child, depth + 1);
  };
  for (const root of roots) walk(root, 0);
  for (const node of nodes.values()) {
    if (!seen.has(node.id)) {
      seen.add(node.id);
      roots.push(node);
    }
  }
  return roots;
}

// ---------------------------------------------------------------------------
// Apps
// ---------------------------------------------------------------------------

export interface AppRoles {
  access?: "any" | "listed";
  users?: string[];
  admins?: string[];
}

export interface AppRateLimit {
  rps?: number;
  burst?: number;
  daily?: number;
}

export type DataScope = "owner" | "workspace";

/** One declared interface dependency on an app manifest. */
export interface AppRequirement {
  contract: string;
  profileName?: string;
  optional?: boolean;
}

/** Channel pin or exact release pin for an installation. */
export type AppPin = { channel: string } | { release: string };

export interface AppSummary {
  name: string;
  /** Durable ULID identity. Present on gateways that mint ids. */
  appId?: string;
  /** Set when this app was forked from another. */
  originAppId?: string;
  /** Durable live URL that survives renames (`/apps/id/<appId>`). */
  permalink?: string;
  title?: string;
  description?: string;
  /** Workspace path of the UI entrypoint. */
  entry?: string;
  /** Workspace prefixes the app publishes; `paths[0]` is its root. */
  paths?: string[];
  visibility: "public" | "private";
  /** Workflow names this app exports under its namespace. */
  workflows?: string[];
  /**
   * The exported workflows themselves, when the gateway inlines them on
   * `apps.list` (it does, to spare the directory an N+1). The catalog prefers
   * these over cross-referencing `workflows.list` by name, so an app's rows
   * carry their `lastRun` and schemas without a second round-trip.
   */
  exports?: WorkflowSummary[];
  liveUrl?: string;
  appPath?: string;
  updatedAt?: string;
  allowedTools?: string[];
  roles?: AppRoles;
  rateLimit?: AppRateLimit;
  /** Where an app user's data physically lands. Absent once dataScope is gone. */
  dataScope?: DataScope;
  /** Channel the caller is looking at, when the gateway pins one. */
  channel?: string;
  /** Release currently serving the live channel, when known. */
  release?: AppRelease;
  /** Declared interface requirements (contract → profile binding at install). */
  requires?: AppRequirement[];
}

export function normalizeRequirement(raw: unknown): AppRequirement | null {
  const record = asRecord(raw);
  const contract = asString(pick(record, "contract", "interface", "name"));
  if (!record || !contract) return null;
  const req: AppRequirement = { contract };
  const profileName = asString(pick(record, "profileName", "profile_name", "profile"));
  if (profileName) req.profileName = profileName;
  if (pick(record, "optional") === true) req.optional = true;
  return req;
}

export function normalizeRequirements(raw: unknown): AppRequirement[] {
  return asArray(raw)
    .map(normalizeRequirement)
    .filter((req): req is AppRequirement => req !== null);
}

export function normalizePin(raw: unknown): AppPin | undefined {
  const record = asRecord(raw);
  if (!record) {
    const channel = asString(raw);
    return channel ? { channel } : undefined;
  }
  const release = asString(pick(record, "release", "releaseId", "release_id"));
  if (release) return { release };
  const channel = asString(pick(record, "channel")) ?? "live";
  return { channel };
}

export function normalizeApp(raw: unknown): AppSummary | null {
  const record = asRecord(raw);
  const name = asString(pick(record, "name"));
  if (!record || !name) return null;
  const visibility = pick(record, "visibility") === "public" ? "public" : "private";
  const app: AppSummary = { name, visibility };

  const appId = asString(pick(record, "appId", "app_id", "id"));
  if (appId) app.appId = appId;
  const originAppId = asString(pick(record, "originAppId", "origin_app_id"));
  if (originAppId) app.originAppId = originAppId;
  const permalink = asString(pick(record, "permalink", "idUrl", "id_url"));
  if (permalink) app.permalink = permalink;
  else if (appId) app.permalink = `/apps/id/${appId}`;

  const title = asString(pick(record, "title"));
  if (title) app.title = title;
  const description = asString(pick(record, "description"));
  if (description) app.description = description;
  const entry = asString(pick(record, "entry"));
  if (entry) app.entry = entry;
  const paths = asStringList(pick(record, "paths"));
  if (paths.length) app.paths = paths;
  // `workflows` arrives either as bare names (older gateways, and the publish
  // payload) or as full summaries. Normalise to both: names drive grouping,
  // summaries spare the catalog a cross-reference.
  const rawWorkflows = pick(record, "workflows");
  const exports = Array.isArray(rawWorkflows)
    ? rawWorkflows.map(normalizeWorkflow).filter((w): w is WorkflowSummary => w !== null)
    : [];
  const workflowNames = exports.length
    ? exports.map((workflow) => workflow.name)
    : asStringList(rawWorkflows);
  if (workflowNames.length) app.workflows = workflowNames;
  if (exports.length) app.exports = exports;
  const liveUrl = asString(pick(record, "liveUrl", "live_url", "url"));
  if (liveUrl) app.liveUrl = liveUrl;
  const appPath = asString(pick(record, "appPath", "app_path", "apiBase", "api_base"));
  if (appPath) app.appPath = appPath;
  const updatedAt = asString(pick(record, "updatedAt", "updated_at"));
  if (updatedAt) app.updatedAt = updatedAt;
  const allowedTools = asStringList(pick(record, "allowedTools", "allowed_tools"));
  if (allowedTools.length) app.allowedTools = allowedTools;

  const rolesRecord = asRecord(pick(record, "roles"));
  if (rolesRecord) {
    const roles: AppRoles = {};
    const access = pick(rolesRecord, "access");
    if (access === "any" || access === "listed") roles.access = access;
    const users = asStringList(pick(rolesRecord, "users"));
    if (users.length) roles.users = users;
    const admins = asStringList(pick(rolesRecord, "admins"));
    if (admins.length) roles.admins = admins;
    app.roles = roles;
  }

  const rateRecord = asRecord(pick(record, "rateLimit", "rate_limit"));
  if (rateRecord) {
    const rateLimit: AppRateLimit = {};
    const rps = asNumber(pick(rateRecord, "rps"));
    if (rps !== undefined) rateLimit.rps = rps;
    const burst = asNumber(pick(rateRecord, "burst"));
    if (burst !== undefined) rateLimit.burst = burst;
    const daily = asNumber(pick(rateRecord, "daily"));
    if (daily !== undefined) rateLimit.daily = daily;
    app.rateLimit = rateLimit;
  }

  const dataScope = pick(record, "dataScope", "data_scope");
  if (dataScope === "owner" || dataScope === "workspace") app.dataScope = dataScope;
  const channel = asString(pick(record, "channel"));
  if (channel) app.channel = channel;
  const release = normalizeRelease(pick(record, "release"));
  if (release) app.release = release;
  const requires = normalizeRequirements(pick(record, "requires", "requirements"));
  if (requires.length) app.requires = requires;
  return app;
}

// ---------------------------------------------------------------------------
// Installations and directory
// ---------------------------------------------------------------------------

export interface InstallSummary {
  installId: string;
  originAppId: string;
  originWorkspaceId?: string;
  /** Resolved origin app name/title when the gateway inlines them. */
  name?: string;
  title?: string;
  description?: string;
  pin: AppPin;
  resolvedRelease?: string | null;
  bindings: Record<string, string>;
  config: Record<string, unknown>;
  editing: boolean;
  prefix?: string;
  available?: boolean;
  updateAvailable?: boolean;
  requires?: AppRequirement[];
  installedAt?: string;
  updatedAt?: string;
  liveUrl?: string;
  permalink?: string;
}

export interface DirectoryEntry {
  appId: string;
  name: string;
  workspaceId?: string;
  title?: string;
  description?: string;
  requires?: AppRequirement[];
  liveRelease?: string;
  updatedAt?: string;
  /** True when the caller's workspace already has at least one install. */
  installed?: boolean;
}

export function normalizeInstall(raw: unknown): InstallSummary | null {
  const record = asRecord(raw);
  const installId = asString(pick(record, "installId", "install_id", "id"));
  const originAppId = asString(pick(record, "originAppId", "origin_app_id", "appId", "app_id"));
  if (!record || !installId || !originAppId) return null;
  const pin = normalizePin(pick(record, "pin")) ?? { channel: "live" };
  const bindingsRecord = asRecord(pick(record, "bindings")) ?? {};
  const bindings: Record<string, string> = {};
  for (const [contract, profile] of Object.entries(bindingsRecord)) {
    const id = asString(profile);
    if (id) bindings[contract] = id;
  }
  const config = asRecord(pick(record, "config")) ?? {};
  const install: InstallSummary = {
    installId,
    originAppId,
    pin,
    bindings,
    config,
    editing: pick(record, "editing") === true,
  };
  const originWorkspaceId = asString(
    pick(record, "originWorkspaceId", "origin_workspace_id", "workspaceId", "workspace_id"),
  );
  if (originWorkspaceId) install.originWorkspaceId = originWorkspaceId;
  const name = asString(pick(record, "name"));
  if (name) install.name = name;
  const title = asString(pick(record, "title"));
  if (title) install.title = title;
  const description = asString(pick(record, "description"));
  if (description) install.description = description;
  if ("resolvedRelease" in record || "resolved_release" in record) {
    install.resolvedRelease =
      asString(pick(record, "resolvedRelease", "resolved_release")) ?? null;
  }
  const prefix = asString(pick(record, "prefix"));
  if (prefix) install.prefix = prefix;
  if (typeof pick(record, "available") === "boolean") {
    install.available = pick(record, "available") === true;
  }
  if (pick(record, "updateAvailable", "update_available") === true) {
    install.updateAvailable = true;
  }
  const requires = normalizeRequirements(pick(record, "requires", "requirements"));
  if (requires.length) install.requires = requires;
  const installedAt = asString(pick(record, "installedAt", "installed_at"));
  if (installedAt) install.installedAt = installedAt;
  const updatedAt = asString(pick(record, "updatedAt", "updated_at"));
  if (updatedAt) install.updatedAt = updatedAt;
  const liveUrl = asString(pick(record, "liveUrl", "live_url", "url"));
  if (liveUrl) install.liveUrl = liveUrl;
  const permalink = asString(pick(record, "permalink"));
  if (permalink) install.permalink = permalink;
  else install.permalink = `/apps/id/${originAppId}`;
  return install;
}

export function normalizeInstalls(raw: unknown): InstallSummary[] {
  return unwrapList(raw, "installs", "installations", "installed")
    .map(normalizeInstall)
    .filter((item): item is InstallSummary => item !== null);
}

export function normalizeDirectoryEntry(raw: unknown): DirectoryEntry | null {
  const record = asRecord(raw);
  const appId = asString(pick(record, "appId", "app_id", "id"));
  const name = asString(pick(record, "name"));
  if (!record || !appId || !name) return null;
  const entry: DirectoryEntry = { appId, name };
  const workspaceId = asString(pick(record, "workspaceId", "workspace_id", "originWorkspaceId"));
  if (workspaceId) entry.workspaceId = workspaceId;
  const title = asString(pick(record, "title"));
  if (title) entry.title = title;
  const description = asString(pick(record, "description"));
  if (description) entry.description = description;
  const requires = normalizeRequirements(pick(record, "requires", "requirements"));
  if (requires.length) entry.requires = requires;
  const liveRelease = asString(pick(record, "liveRelease", "live_release", "release"));
  if (liveRelease) entry.liveRelease = liveRelease;
  const updatedAt = asString(pick(record, "updatedAt", "updated_at"));
  if (updatedAt) entry.updatedAt = updatedAt;
  if (typeof pick(record, "installed") === "boolean") {
    entry.installed = pick(record, "installed") === true;
  }
  return entry;
}

export function normalizeDirectory(raw: unknown): DirectoryEntry[] {
  return unwrapList(raw, "apps", "directory", "entries")
    .map(normalizeDirectoryEntry)
    .filter((entry): entry is DirectoryEntry => entry !== null);
}

/**
 * Whether an install can proceed given the declared requirements and the
 * caller's chosen bindings (contract → profileId). Non-optional requirements
 * must be bound; optional ones may stay unbound.
 */
export function installBindingsReady(
  requires: AppRequirement[] | undefined,
  bindings: Record<string, string>,
): boolean {
  for (const req of requires ?? []) {
    if (req.optional) continue;
    if (!bindings[req.contract]?.trim()) return false;
  }
  return true;
}

// ---------------------------------------------------------------------------
// Releases and channels
// ---------------------------------------------------------------------------

export interface AppRelease {
  id: string;
  channel?: string;
  createdAt?: string;
  createdBy?: string;
  notes?: string;
  /** Content hashes captured by the snapshot, when the gateway reports them. */
  entryHash?: string;
  manifestHash?: string;
  workflowHashes?: Array<{ name: string; hash: string }>;
}

export interface AppChannel {
  name: string;
  releaseId?: string;
  updatedAt?: string;
  notes?: string;
}

export function normalizeRelease(raw: unknown): AppRelease | null {
  const record = asRecord(raw);
  const id = asString(pick(record, "id", "release", "releaseId", "release_id", "hash"));
  if (!record || !id) return null;
  const release: AppRelease = { id };
  const channel = asString(pick(record, "channel"));
  if (channel) release.channel = channel;
  const createdAt = asString(pick(record, "createdAt", "created_at", "at"));
  if (createdAt) release.createdAt = createdAt;
  const createdBy = asString(pick(record, "createdBy", "created_by"));
  if (createdBy) release.createdBy = createdBy;
  const notes = asString(pick(record, "notes", "note"));
  if (notes) release.notes = notes;
  const entryHash = asString(pick(record, "entryHash", "entry_hash"));
  if (entryHash) release.entryHash = entryHash;
  const manifestHash = asString(pick(record, "manifestHash", "manifest_hash"));
  if (manifestHash) release.manifestHash = manifestHash;

  const workflowsRaw = pick(record, "workflows", "workflowHashes", "workflow_hashes");
  const workflowHashes: Array<{ name: string; hash: string }> = [];
  const mapForm = asRecord(workflowsRaw);
  if (mapForm) {
    for (const [name, hash] of Object.entries(mapForm)) {
      const text = asString(hash);
      if (text) workflowHashes.push({ name, hash: text });
    }
  } else {
    for (const entry of asArray(workflowsRaw)) {
      const item = asRecord(entry);
      const name = asString(pick(item, "name"));
      const hash = asString(pick(item, "hash", "scriptHash", "script_hash"));
      if (name && hash) workflowHashes.push({ name, hash });
    }
  }
  if (workflowHashes.length) release.workflowHashes = workflowHashes;
  return release;
}

export function normalizeReleases(raw: unknown): AppRelease[] {
  return unwrapList(raw, "releases")
    .map(normalizeRelease)
    .filter((release): release is AppRelease => release !== null);
}

/**
 * Channels arrive either as a list of `{ channel, release }` or as a map
 * (`{ live: {...}, preview: "rel_123" }`). Both flatten to the same rows.
 */
export function normalizeChannels(raw: unknown): AppChannel[] {
  const list = unwrapList(raw, "channels");
  if (list.length > 0) {
    return list.flatMap((entry) => {
      const record = asRecord(entry);
      const name = asString(pick(record, "name", "channel"));
      if (!name) return [];
      const channel: AppChannel = { name };
      const releaseId = asString(pick(record, "releaseId", "release_id", "release", "id"));
      if (releaseId) channel.releaseId = releaseId;
      const nested = normalizeRelease(pick(record, "release"));
      if (nested) channel.releaseId = nested.id;
      const updatedAt = asString(pick(record, "updatedAt", "updated_at", "at"));
      if (updatedAt) channel.updatedAt = updatedAt;
      const notes = asString(pick(record, "notes"));
      if (notes) channel.notes = notes;
      return [channel];
    });
  }

  const envelope = asRecord(raw);
  const map = asRecord(envelope?.["channels"]) ?? envelope;
  if (!map) return [];
  const out: AppChannel[] = [];
  for (const [name, value] of Object.entries(map)) {
    if (name === "name" || name === "app") continue;
    const direct = asString(value);
    if (direct) {
      out.push({ name, releaseId: direct });
      continue;
    }
    const record = asRecord(value);
    if (!record) continue;
    const channel: AppChannel = { name };
    const releaseId = asString(pick(record, "releaseId", "release_id", "release", "id"));
    if (releaseId) channel.releaseId = releaseId;
    const updatedAt = asString(pick(record, "updatedAt", "updated_at", "at"));
    if (updatedAt) channel.updatedAt = updatedAt;
    const notes = asString(pick(record, "notes"));
    if (notes) channel.notes = notes;
    out.push(channel);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Capabilities — "three ways data is reached"
// ---------------------------------------------------------------------------

/** The allow-listed first-party namespaces, auto-partitioned per app user. */
export const NATIVE_APP_NAMESPACES = ["vfs", "keyvalue", "events"] as const;

const NATIVE_LABELS: Record<string, { label: string; detail: string }> = {
  vfs: {
    label: "Files",
    detail: "Read and write files inside the app's own folder — nothing else in the workspace.",
  },
  keyvalue: {
    label: "Key–value storage",
    detail: "Per-user records, automatically partitioned so one app user never sees another's.",
  },
  events: {
    label: "Events",
    detail: "Emit and subscribe to workspace event channels; cascades stop at depth 2.",
  },
};

export type ReachKind = "native" | "workflow" | "credentialed";

export interface CapabilityReach {
  kind: ReachKind;
  /** Namespace or workflow name this row is about. */
  id: string;
  /** Plain-language heading. */
  label: string;
  /** Plain-language explanation of what it can touch. */
  detail: string;
  /** Where the data physically lives, when that question has an answer. */
  location?: string;
  /** Allow-list entries that produced this row. */
  entries?: string[];
  /**
   * Provider whose workspace credential executes this reach — set on
   * credential grants, where the entry is an explicit exact-procedure grant.
   */
  credential?: string;
}

/** One row in the capabilities Dependencies section. */
export interface AppDependencyStatus {
  contract: string;
  optional?: boolean;
  boundProfile?: string;
  /** `true` when bound, `false` when missing, `"ungated"` on degraded gateways. */
  fulfilled: boolean | "ungated";
}

export interface CapabilityModel {
  dataScope: DataScope;
  /** Human-readable answer to "where does this app's data live?". */
  dataLocation: string;
  native: CapabilityReach[];
  workflows: CapabilityReach[];
  credentialed: CapabilityReach[];
  /**
   * Allow-list entries that fit no tier — a wildcard on a provider namespace,
   * which the spec says must go through an exported workflow instead.
   */
  rejected: string[];
  /** Declared interface requirements and their fulfillment (from gateway). */
  dependencies: AppDependencyStatus[];
  /** True once a gateway `apps.capabilities` response has been merged in. */
  fromGateway: boolean;
}

function namespaceOf(entry: string): string {
  const dot = entry.indexOf(".");
  return dot === -1 ? entry : entry.slice(0, dot);
}

// ---------------------------------------------------------------------------
// Allow-list entries, classified — the tier model applied to one entry
// ---------------------------------------------------------------------------

/** The three tiers an `allowedTools` entry can resolve to. */
export type ToolEntryTier = "native" | "app" | "provider";

export interface ToolEntryInfo {
  entry: string;
  namespace: string;
  /** Everything after the namespace; `"*"` for a wildcard, `""` for a bare namespace. */
  procedure: string;
  /** `null` when the entry fits no tier (see `reason`). */
  tier: ToolEntryTier | null;
  wildcard: boolean;
  /** Why the entry is invalid, in the user's language. Set iff `tier` is null. */
  reason?: string;
}

/**
 * Classify one allow-list entry against the three-tier rule — the same rule
 * the gateway enforces at publish and at call time, mirrored client-side so
 * an editor can explain a rejection before a round-trip:
 *
 *  1. **native** namespaces (`vfs`, `keyvalue`, `events`) — wildcards allowed;
 *  2. the app's own namespace (`<app>.*`, the literal `app.*`, or `workflow.*`
 *     as a synonym), or an exported workflow named directly;
 *  3. **provider** procedures — allowed since 2026-07-24, but each entry is an
 *     explicit credential grant: *exact* procedures only, never a wildcard.
 */
export function classifyToolEntry(
  entry: string,
  app: Pick<AppSummary, "name" | "workflows">,
): ToolEntryInfo {
  const namespace = namespaceOf(entry);
  const procedure = entry.length > namespace.length ? entry.slice(namespace.length + 1) : "";
  const wildcard = entry.includes("*");
  const base: Omit<ToolEntryInfo, "tier"> = { entry, namespace, procedure, wildcard };

  if ((NATIVE_APP_NAMESPACES as readonly string[]).includes(namespace)) {
    return { ...base, tier: "native" };
  }
  const exported = new Set(app.workflows ?? []);
  if (
    namespace === app.name ||
    namespace === "app" ||
    namespace === "workflow" ||
    exported.has(namespace)
  ) {
    return { ...base, tier: "app" };
  }
  if (!wildcard && procedure.length > 0) {
    return { ...base, tier: "provider" };
  }
  return {
    ...base,
    tier: null,
    reason: wildcard
      ? `Provider grants are credential grants — exact procedures only (${namespace}.some.procedure, never ${namespace}.*). Anything broader belongs in an exported workflow.`
      : `"${entry}" names neither a native namespace, this app's workflows, nor an exact provider procedure.`,
  };
}

/**
 * Compute the capability model from the manifest alone. This is the fallback
 * that keeps the Access pane honest on a gateway with no `apps.capabilities`
 * procedure — the manifest already contains everything the spec's model needs.
 */
export function deriveCapabilities(
  app: AppSummary,
  workflows: WorkflowSummary[] = [],
): CapabilityModel {
  const dataScope: DataScope = app.dataScope === "workspace" ? "workspace" : "owner";
  const root = app.paths?.[0] ?? (app.entry ? app.entry.replace(/\/[^/]*$/, "") : app.name);
  const dataLocation =
    dataScope === "workspace"
      ? "Each caller's own workspace, under <install prefix>/data — the publisher stores nothing and lends no credentials."
      : `The publishing workspace, under ${root}/data/<app user> — one private partition per app user, travelling with the app folder.`;

  const allowed = app.allowedTools ?? [];
  const exported = new Set(app.workflows ?? []);

  const nativeEntries = new Map<string, string[]>();
  const grantEntries: ToolEntryInfo[] = [];
  const rejected: string[] = [];
  for (const entry of allowed) {
    const info = classifyToolEntry(entry, app);
    if (info.tier === "native") {
      nativeEntries.set(info.namespace, [...(nativeEntries.get(info.namespace) ?? []), entry]);
    } else if (info.tier === "app") {
      // The app's own namespace is always reachable; nothing to add.
    } else if (info.tier === "provider") {
      grantEntries.push(info);
    } else {
      rejected.push(entry);
    }
  }

  const native: CapabilityReach[] = [...nativeEntries.entries()].map(([namespace, entries]) => {
    const copy = NATIVE_LABELS[namespace] ?? {
      label: namespace,
      detail: "First-party namespace, partitioned per app user.",
    };
    return {
      kind: "native" as const,
      id: namespace,
      label: copy.label,
      detail: copy.detail,
      location:
        namespace === "events"
          ? "Nothing stored — events are delivered, not retained."
          : dataScope === "workspace"
            ? "<install prefix>/data in the caller's workspace"
            : `${root}/data/<app user>`,
      entries,
    };
  });

  const byName = new Map(workflows.map((workflow) => [workflow.name, workflow]));
  const workflowReaches: CapabilityReach[] = [...exported].map((name) => {
    const workflow = byName.get(name);
    return {
      kind: "workflow" as const,
      id: name,
      label: `${app.name}.${name}`,
      detail:
        workflow?.description ??
        "Exported workflow — runs with the workspace's credentials, so the app never holds a secret.",
      ...(workflow?.scriptPath ? { location: workflow.scriptPath } : {}),
    };
  });

  // Exact provider procedures are explicit credential grants (2026-07-24):
  // each executes with the owning workspace's credential for that provider.
  const credentialed: CapabilityReach[] = grantEntries.map((info) => ({
    kind: "credentialed" as const,
    id: info.entry,
    label: info.entry,
    detail: `Credential grant — this exact procedure executes with the workspace's ${info.namespace} credential.`,
    credential: info.namespace,
    entries: [info.entry],
  }));

  return {
    dataScope,
    dataLocation,
    native,
    workflows: workflowReaches,
    credentialed,
    rejected,
    dependencies: (app.requires ?? []).map((req) => ({
      contract: req.contract,
      optional: req.optional,
      fulfilled: false,
    })),
    fromGateway: false,
  };
}

/**
 * Merge a gateway `apps.capabilities` response over the derived model. The
 * response is treated as additive: anything it doesn't mention keeps the
 * locally derived answer, so a partial implementation can't blank the tab.
 */
export function mergeCapabilities(base: CapabilityModel, raw: unknown): CapabilityModel {
  const record = asRecord(raw);
  if (!record) return base;
  const merged: CapabilityModel = { ...base, fromGateway: true };

  const dataScope = pick(record, "dataScope", "data_scope");
  if (dataScope === "owner" || dataScope === "workspace") merged.dataScope = dataScope;
  const dataLocation = asString(
    pick(record, "dataLocation", "data_location", "dataRoot", "data_root", "storagePath"),
  );
  if (dataLocation) merged.dataLocation = dataLocation;

  const readReaches = (value: unknown, kind: ReachKind): CapabilityReach[] =>
    asArray(value).flatMap((entry) => {
      const item = asRecord(entry);
      const direct = asString(entry);
      if (direct) {
        return [{ kind, id: direct, label: direct, detail: "" }];
      }
      // A native reach is identified by its namespace; a workflow by its own
      // name. Every exported workflow carries `namespace: "app"`, so reading
      // `namespace` first would collapse the whole export list into one row
      // called "app".
      const id =
        kind === "workflow"
          ? asString(pick(item, "name", "procedure", "id"))
          : asString(pick(item, "id", "namespace", "name"));
      if (!id) return [];
      const reach: CapabilityReach = {
        kind,
        id,
        label: asString(pick(item, "label", "title")) ?? id,
        detail: asString(pick(item, "detail", "description", "summary")) ?? "",
      };
      // Where the data physically lands. The gateway nests this under
      // `partitioning`; taking the flat spellings alone silently fell back to
      // the locally derived default, which is exactly the claim this panel
      // must not get wrong.
      const partitioning = asRecord(pick(item, "partitioning"));
      const location =
        asString(pick(partitioning, "path", "location")) ??
        asString(pick(item, "location", "path", "storagePath", "storage_path"));
      if (location) reach.location = location;
      if (!reach.detail) {
        reach.detail = asString(pick(partitioning, "description")) ?? "";
      }
      const entries = asStringList(pick(item, "entries", "procedures", "tools"));
      if (entries.length) reach.entries = entries;
      // The provider whose workspace credential executes a grant — reported
      // per-entry under tier (2) since 2026-07-24; older gateways omit it.
      const credential = asString(
        pick(item, "credential", "provider", "credentialProvider", "credential_provider"),
      );
      if (credential) reach.credential = credential;
      return [reach];
    });

  const native = readReaches(pick(record, "native", "nativeNamespaces"), "native");
  if (native.length) {
    // Keep the locally written plain-language copy where the gateway is terse.
    merged.native = native.map((reach) => {
      const local = base.native.find((candidate) => candidate.id === reach.id);
      return {
        ...reach,
        label: reach.label === reach.id && local ? local.label : reach.label,
        detail: reach.detail || local?.detail || "",
        location: reach.location ?? local?.location,
      };
    });
  }
  const exported = readReaches(pick(record, "workflows", "exportedWorkflows"), "workflow");
  if (exported.length) {
    merged.workflows = exported.map((reach) => {
      const local = base.workflows.find((candidate) => candidate.id === reach.id);
      return { ...reach, detail: reach.detail || local?.detail || "" };
    });
  }
  const credentialed = readReaches(
    pick(record, "credentialed", "workspaceCredentialed", "workspace_credentialed", "grants", "providers"),
    "credentialed",
  );
  if (credentialed.length) {
    merged.credentialed = credentialed.map((reach) => {
      const local = base.credentialed.find((candidate) => candidate.id === reach.id);
      return {
        ...reach,
        credential: reach.credential ?? local?.credential ?? namespaceOf(reach.id),
        detail:
          reach.detail ||
          local?.detail ||
          "Runs with the owning workspace's credential for this provider — an explicit exact-procedure grant.",
      };
    });
  }
  const rejected = asStringList(pick(record, "rejected", "denied", "blocked"));
  if (rejected.length) merged.rejected = rejected;

  const depsRaw = pick(record, "dependencies", "requires");
  if (depsRaw !== undefined) {
    merged.dependencies = asArray(depsRaw).flatMap((entry) => {
      const item = asRecord(entry);
      const contract = asString(pick(item, "contract", "interface", "name"));
      if (!contract) return [];
      const fulfilledRaw = pick(item, "fulfilled");
      let fulfilled: boolean | "ungated" = false;
      if (fulfilledRaw === true || fulfilledRaw === "true") fulfilled = true;
      else if (fulfilledRaw === "ungated") fulfilled = "ungated";
      const dep: AppDependencyStatus = { contract, fulfilled };
      if (pick(item, "optional") === true) dep.optional = true;
      const boundProfile = asString(
        pick(item, "boundProfile", "bound_profile", "profile", "profileId", "profile_id"),
      );
      if (boundProfile) dep.boundProfile = boundProfile;
      return [dep];
    });
  }
  return merged;
}

// ---------------------------------------------------------------------------
// Versions (shared by both namespaces' `versions` / `version` / `restore`)
// ---------------------------------------------------------------------------

/** One entry in a versioned file's history (newest first from the gateway). */
export interface FileVersion {
  hash: string;
  updatedAt: string;
  size: number;
  /** The live version — the one `read()` returns and the row currently serves. */
  current: boolean;
}

export function normalizeVersions(raw: unknown): { path: string; versions: FileVersion[] } {
  const record = asRecord(raw);
  return {
    path: asString(pick(record, "path")) ?? "",
    versions: unwrapList(raw, "versions").flatMap((entry) => {
      const item = asRecord(entry);
      const hash = asString(pick(item, "hash"));
      if (!hash) return [];
      return [
        {
          hash,
          updatedAt: asString(pick(item, "updatedAt", "updated_at")) ?? "",
          size: asNumber(pick(item, "size")) ?? 0,
          current: pick(item, "current") === true,
        },
      ];
    }),
  };
}
