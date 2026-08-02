/**
 * `sync` core service — AirByte-style source→transform→sink pipelines over
 * the primitives the platform already has.
 *
 *   source     any tool call (`github.repos.listForOrg`, `sql.query`, …);
 *              the result is normalized into a record array
 *   transform  optional workflow script (WASM-sandboxed, same namespaces as
 *              any workflow) receiving `input.records`, returning the
 *              transformed array
 *   sink       a workspace path + format (json | jsonl | csv), or another
 *              tool call receiving `{ ...args, records }`
 *
 * Scheduling rides the existing workflow cron: registering a sync with
 * `schedule` writes a one-line runner script and registers a companion
 * workflow (`sync--<name>`) with that cron — no second scheduler.
 *
 * Registrations live in the record store under `svc#sync`; each run updates
 * `lastRun` in place. Record normalization understands the common result
 * shapes: arrays, `{ rows, columns }` (the sql interface), and `{ value }` /
 * `{ data }` wrappers.
 */

import { getCredentialStore } from "./credentials.js";
import { getFsStore } from "./fs-store.js";
import {
  CORE_SERVICE_NAMES,
  getCoreService,
  ServiceError,
  type CoreService,
  type ServiceContext,
} from "./service-kernel.js";
import {
  deleteSvcRecord,
  listSvcRecords,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "./svc-records.js";
import { invokeTool } from "./workflows/invoke.js";
import { runScriptInSandbox } from "./workflows/sandbox.js";

const SYNC_SCOPE = svcScope("sync");
const SCRIPT_TIMEOUT_MS = 120_000;
const MAX_RECORDS = 50_000;

// ---------------------------------------------------------------------------
// Registration model
// ---------------------------------------------------------------------------

export interface SyncToolCall {
  /** Full dotted tool, e.g. "github.repos.listForOrg" or "sql.query". */
  tool: string;
  args?: Record<string, unknown>;
}

export interface SyncSink {
  /** Workspace path sink (exclusive with tool). */
  path?: string;
  format?: "json" | "jsonl" | "csv";
  /** Tool sink: called with { ...args, records }. */
  tool?: string;
  args?: Record<string, unknown>;
}

export interface SyncRegistration {
  name: string;
  description?: string;
  source: SyncToolCall;
  /** Workspace path of a transform script (optional). */
  transform?: string;
  sink: SyncSink;
  /** 5-field cron (UTC); scheduling rides a companion workflow. */
  schedule?: string;
  createdAt: string;
  updatedAt: string;
  lastRun?: {
    at: string;
    status: "succeeded" | "failed";
    records?: number;
    error?: string;
    durationMs: number;
  };
}

function syncName(value: unknown): string {
  const name = typeof value === "string" ? value.trim() : "";
  if (!/^[a-z0-9][a-z0-9-]*$/u.test(name)) {
    throw new ServiceError("sync name must be kebab-case (a-z, 0-9, -)", 400);
  }
  return name;
}

function parseToolCall(value: unknown, field: string): SyncToolCall {
  if (typeof value !== "object" || value === null) {
    throw new ServiceError(`${field} must be { tool, args? }`, 400);
  }
  const tool = (value as SyncToolCall).tool;
  if (typeof tool !== "string" || !tool.includes(".")) {
    throw new ServiceError(`${field}.tool must be "namespace.operation"`, 400);
  }
  const args = (value as SyncToolCall).args;
  if (args !== undefined && (typeof args !== "object" || args === null || Array.isArray(args))) {
    throw new ServiceError(`${field}.args must be an object`, 400);
  }
  return { tool, args: args as Record<string, unknown> | undefined };
}

function parseSink(value: unknown): SyncSink {
  if (typeof value !== "object" || value === null) {
    throw new ServiceError("sink must be { path, format? } or { tool, args? }", 400);
  }
  const sink = value as SyncSink;
  if (typeof sink.path === "string" && sink.path) {
    const format = sink.format ?? inferFormat(sink.path);
    if (!["json", "jsonl", "csv"].includes(format)) {
      throw new ServiceError("sink.format must be json, jsonl, or csv", 400);
    }
    return { path: sink.path, format };
  }
  if (typeof sink.tool === "string" && sink.tool.includes(".")) {
    return parseToolCall(sink, "sink") as SyncSink;
  }
  throw new ServiceError("sink needs a workspace path or a tool", 400);
}

function inferFormat(path: string): "json" | "jsonl" | "csv" {
  if (path.endsWith(".jsonl") || path.endsWith(".ndjson")) return "jsonl";
  if (path.endsWith(".csv")) return "csv";
  return "json";
}

// ---------------------------------------------------------------------------
// Record normalization + serialization
// ---------------------------------------------------------------------------

/** Normalize a source result into a record array. */
export function toRecords(result: unknown): unknown[] {
  if (Array.isArray(result)) return result;
  if (typeof result === "object" && result !== null) {
    const shaped = result as {
      rows?: unknown[][];
      columns?: Array<{ name: string }>;
      value?: unknown;
      data?: unknown;
    };
    // sql interface shape → one object per row keyed by column name.
    if (Array.isArray(shaped.rows) && Array.isArray(shaped.columns)) {
      const names = shaped.columns.map((column) => column.name);
      return shaped.rows.map((row) =>
        Object.fromEntries(names.map((name, index) => [name, row[index]])),
      );
    }
    if (Array.isArray(shaped.value)) return shaped.value;
    if (Array.isArray(shaped.data)) return shaped.data;
  }
  return [result];
}

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const text = typeof value === "object" ? JSON.stringify(value) : String(value);
  return /[",\n]/u.test(text) ? `"${text.replace(/"/gu, '""')}"` : text;
}

export function serializeRecords(records: unknown[], format: "json" | "jsonl" | "csv"): string {
  if (format === "json") return JSON.stringify(records, null, 2);
  if (format === "jsonl") return records.map((record) => JSON.stringify(record)).join("\n") + "\n";
  // csv: header = union of keys across object records, insertion-ordered.
  const keys: string[] = [];
  for (const record of records) {
    if (typeof record === "object" && record !== null && !Array.isArray(record)) {
      for (const key of Object.keys(record)) if (!keys.includes(key)) keys.push(key);
    }
  }
  if (keys.length === 0) {
    return records.map((record) => csvCell(record)).join("\n") + "\n";
  }
  const lines = [keys.map(csvCell).join(",")];
  for (const record of records) {
    const row = record as Record<string, unknown>;
    lines.push(keys.map((key) => csvCell(row?.[key])).join(","));
  }
  return lines.join("\n") + "\n";
}

// ---------------------------------------------------------------------------
// Execution
// ---------------------------------------------------------------------------

function splitTool(tool: string): { namespace: string; procedure: string } {
  const dot = tool.indexOf(".");
  return { namespace: tool.slice(0, dot), procedure: tool.slice(dot + 1) };
}

async function runTransform(
  ctx: ServiceContext,
  scriptPath: string,
  records: unknown[],
): Promise<unknown[]> {
  const file = await getFsStore().read(ctx.workspaceId, scriptPath);
  if (!file) throw new ServiceError(`Transform script not found: ${scriptPath}`, 404);

  const namespaces = new Set<string>(CORE_SERVICE_NAMES);
  try {
    for (const credential of await getCredentialStore().list(ctx.workspaceId)) {
      namespaces.add(credential.provider);
    }
  } catch {
    // Core namespaces still work.
  }

  const result = await runScriptInSandbox({
    source: file.content,
    filename: scriptPath,
    input: { records },
    namespaces: [...namespaces],
    dispatch: (namespace, path, callArgs) => {
      const argObject =
        callArgs.length === 1 && typeof callArgs[0] === "object" && callArgs[0] !== null
          ? (callArgs[0] as Record<string, unknown>)
          : callArgs.length === 0
            ? {}
            : { args: callArgs };
      return invokeTool(ctx, namespace, path, argObject);
    },
    log: () => {},
    timeoutMs: SCRIPT_TIMEOUT_MS,
  });
  const transformed = toRecords(result ?? []);
  if (!Array.isArray(transformed)) {
    throw new ServiceError("Transform must return an array of records", 422);
  }
  return transformed;
}

async function executeSync(
  ctx: ServiceContext,
  registration: SyncRegistration,
): Promise<{ records: number; sink: string }> {
  const { namespace, procedure } = splitTool(registration.source.tool);
  const sourceResult = await invokeTool(ctx, namespace, procedure, registration.source.args ?? {});
  let records = toRecords(sourceResult).slice(0, MAX_RECORDS);

  if (registration.transform) {
    records = (await runTransform(ctx, registration.transform, records)).slice(0, MAX_RECORDS);
  }

  if (registration.sink.path) {
    const format = registration.sink.format ?? "json";
    const contentType =
      format === "csv" ? "text/csv" : format === "jsonl" ? "application/x-ndjson" : "application/json";
    await getFsStore().write(
      ctx.workspaceId,
      registration.sink.path,
      serializeRecords(records, format),
      contentType,
    );
    return { records: records.length, sink: registration.sink.path };
  }

  const sinkCall = splitTool(registration.sink.tool!);
  await invokeTool(ctx, sinkCall.namespace, sinkCall.procedure, {
    ...(registration.sink.args ?? {}),
    records,
  });
  return { records: records.length, sink: registration.sink.tool! };
}

// ---------------------------------------------------------------------------
// Store helpers
// ---------------------------------------------------------------------------

async function readSync(workspaceId: string, name: string): Promise<SyncRegistration | undefined> {
  return readSvcRecord<SyncRegistration>(workspaceId, SYNC_SCOPE, name).catch(() => undefined);
}

async function writeSync(workspaceId: string, registration: SyncRegistration): Promise<void> {
  await writeSvcRecord(workspaceId, SYNC_SCOPE, registration.name, registration);
}

/** Companion workflow id for a scheduled sync. */
function companionWorkflow(name: string): string {
  return `sync--${name}`;
}

async function ensureSchedule(
  ctx: ServiceContext,
  registration: SyncRegistration,
): Promise<void> {
  const workflows = getCoreService("workflows")!;
  if (!registration.schedule) return;
  // The one-line runner is platform-generated state, not an authored file —
  // registered inline so no `.services/**` file is ever written for it.
  await workflows.call(ctx, "register", {
    name: companionWorkflow(registration.name),
    script: `// Auto-generated: scheduled runner for the "${registration.name}" sync.\nreturn await sync.run({ name: ${JSON.stringify(registration.name)} });\n`,
    description: `Scheduled runner for the ${registration.name} sync`,
    triggers: { cron: registration.schedule },
  });
}

// ---------------------------------------------------------------------------
// Service surface
// ---------------------------------------------------------------------------

export const syncService: CoreService = {
  meta: {
    label: "Sync",
    blurb: "source → transform → sink lineage, schedules and last runs",
    icon: "refresh-cw",
  },
  tools: [
    {
      name: "sync.register",
      operation: "register",
      description:
        "Register (or update) a data sync: source tool call → optional transform script → sink (workspace path with json/jsonl/csv format, or another tool). With `schedule` (cron), a companion workflow runs it automatically.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Sync id (kebab-case)" },
          description: { type: "string" },
          source: {
            type: "object",
            description: '{ tool: "github.repos.listForOrg", args: {...} }',
          },
          transform: {
            type: "string",
            description:
              "Workspace path of a transform script; receives input.records, returns the transformed array",
          },
          sink: {
            type: "object",
            description:
              '{ path: "data/x.jsonl", format?: "json"|"jsonl"|"csv" } or { tool: "s3.putObject", args: {...} }',
          },
          schedule: { type: "string", description: "5-field cron (UTC)" },
        },
        required: ["name", "source", "sink"],
      },
    },
    {
      name: "sync.run",
      operation: "run",
      description: "Run a registered sync now; returns the record count and sink.",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string" } },
        required: ["name"],
      },
    },
    {
      name: "sync.list",
      operation: "list",
      description: "List registered syncs with sources, sinks, schedules, and last-run status.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "sync.delete",
      operation: "delete",
      description: "Delete a sync registration (and its scheduled companion workflow, if any).",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string" } },
        required: ["name"],
      },
    },
  ],

  async call(ctx, procedure, args) {
    if (ctx.appScope) {
      throw new ServiceError("sync is not available to app sessions", 403);
    }
    switch (procedure) {
      case "register": {
        const name = syncName(args["name"]);
        const existing = await readSync(ctx.workspaceId, name);
        const now = new Date().toISOString();
        const registration: SyncRegistration = {
          name,
          description: typeof args["description"] === "string" ? args["description"] : undefined,
          source: parseToolCall(args["source"], "source"),
          transform: typeof args["transform"] === "string" ? args["transform"] : undefined,
          sink: parseSink(args["sink"]),
          schedule: typeof args["schedule"] === "string" ? args["schedule"] : undefined,
          createdAt: existing?.createdAt ?? now,
          updatedAt: now,
          lastRun: existing?.lastRun,
        };
        await writeSync(ctx.workspaceId, registration);
        await ensureSchedule(ctx, registration);
        return { registered: name, schedule: registration.schedule ?? null };
      }
      case "run": {
        const name = syncName(args["name"]);
        const registration = await readSync(ctx.workspaceId, name);
        if (!registration) throw new ServiceError(`Unknown sync: ${name}`, 404);
        const start = Date.now();
        try {
          const outcome = await executeSync(ctx, registration);
          registration.lastRun = {
            at: new Date().toISOString(),
            status: "succeeded",
            records: outcome.records,
            durationMs: Date.now() - start,
          };
          await writeSync(ctx.workspaceId, registration);
          return { ...outcome, status: "succeeded", durationMs: registration.lastRun.durationMs };
        } catch (err) {
          registration.lastRun = {
            at: new Date().toISOString(),
            status: "failed",
            error: err instanceof Error ? err.message : String(err),
            durationMs: Date.now() - start,
          };
          await writeSync(ctx.workspaceId, registration);
          throw err;
        }
      }
      case "list": {
        const entries = await listSvcRecords<SyncRegistration>(ctx.workspaceId, SYNC_SCOPE);
        return { syncs: entries.map((entry) => entry.value) };
      }
      case "delete": {
        const name = syncName(args["name"]);
        const registration = await readSync(ctx.workspaceId, name);
        if (!registration) throw new ServiceError(`Unknown sync: ${name}`, 404);
        await deleteSvcRecord(ctx.workspaceId, SYNC_SCOPE, name).catch(() => {});
        if (registration.schedule) {
          await getCoreService("workflows")!.call(ctx, "remove", {
            name: companionWorkflow(name),
          }).catch(() => {});
        }
        return { deleted: name };
      }
      default:
        throw new ServiceError(`Unknown sync procedure: ${procedure}`, 404);
    }
  },
};
