/**
 * `workflows` core service — registration and operation of workspace
 * workflows as ordinary gateway tools. Because it is a core service, the
 * whole surface appears in tool discovery automatically: the chat model,
 * widgets, and scripts can register, inspect, trigger, and trace workflows
 * with no bespoke client code.
 *
 * The script a workflow points at is content-versioned by the workspace FS,
 * so `workflows.versions/version/restore` expose that history: enumerate a
 * script's versions, read one back, or non-destructively restore an old one
 * as the new latest.
 */

import { ServiceError, type CoreService } from "../service-kernel.js";
import { parseCron } from "./cron.js";
import { runWorkflowByName } from "./runner.js";
import {
  listVisibleRegistrations,
  listRuns,
  listScriptVersions,
  readRegistration,
  readRun,
  readScriptVersion,
  readTrace,
  removeRegistration,
  requireVisibleRegistration,
  restoreScriptVersion,
  saveRegistration,
  updateCronIndex,
  workflowName,
  type WorkflowRegistration,
  type WorkflowTriggers,
} from "./store.js";

/**
 * A declared JSON Schema (`input`/`output`). Kept as an opaque object: it is
 * consumed by the SDK generator and the run form, not interpreted here.
 */
function parseSchema(raw: unknown, label: string): Record<string, unknown> | undefined {
  if (raw === undefined || raw === null) return undefined;
  if (typeof raw !== "object" || Array.isArray(raw)) {
    throw new ServiceError(`${label} must be a JSON Schema object`, 400);
  }
  return raw as Record<string, unknown>;
}

function parseTriggers(raw: unknown): WorkflowTriggers {
  if (raw === undefined || raw === null) return { manual: true };
  if (typeof raw !== "object" || Array.isArray(raw)) {
    throw new ServiceError("triggers must be an object", 400);
  }
  const value = raw as Record<string, unknown>;
  const triggers: WorkflowTriggers = { manual: true };
  if (typeof value["cron"] === "string" && value["cron"].trim()) {
    parseCron(value["cron"]); // validates
    triggers.cron = value["cron"].trim();
  }
  if (value["webhook"] === true) triggers.webhook = true;
  if (Array.isArray(value["events"])) {
    const channels = value["events"].filter(
      (channel): channel is string => typeof channel === "string" && channel.length > 0,
    );
    if (channels.length > 0) triggers.events = channels;
  }
  return triggers;
}

/** Public webhook URL path for a registered workflow. */
export function hookPath(workspaceId: string, name: string): string {
  return `/hooks/${workspaceId}/${name}`;
}

export function summarizeWorkflow(
  registration: WorkflowRegistration,
  workspaceId: string,
  exportedBy: string[] = [],
) {
  return {
    name: registration.name,
    description: registration.description,
    scriptPath: registration.scriptPath,
    triggers: registration.triggers,
    bindings: registration.bindings,
    /** Declared JSON Schemas — the workflow's signature (undeclared = unknown). */
    input: registration.input,
    output: registration.output,
    webhookPath: registration.triggers.webhook ? hookPath(workspaceId, registration.name) : undefined,
    createdBy: registration.createdBy,
    updatedAt: registration.updatedAt,
    /** App ids that export this workflow; empty ⇒ creator-private. */
    exportedBy,
  };
}

export const workflowsService: CoreService = {
  meta: {
    label: "Workflows",
    blurb: "Register, run and trace workspace workflows",
    icon: "workflow",
  },
  tools: [
    {
      name: "workflows.register",
      operation: "register",
      description:
        "Register (or update) a workspace workflow: a script that runs on demand, on a cron schedule, on a webhook, or when events fire. The script is a workspace file of plain async JavaScript with tool namespaces (github, events, keyvalue, …) available as globals and the trigger payload as `input`.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Workflow id (kebab-case)" },
          script_path: { type: "string", description: "Workspace path of the script, e.g. workflows/daily-report.js" },
          description: { type: "string" },
          agent: {
            type: "string",
            description:
              "Agent profile (agents service) every run executes as — its grants bound the run's tools and vfs paths; null clears it",
          },
          triggers: {
            type: "object",
            description: "How the workflow runs",
            properties: {
              cron: { type: "string", description: "5-field cron (UTC), e.g. '0 13 * * 1-5'" },
              webhook: { type: "boolean", description: "Expose a tokened webhook endpoint" },
              events: { type: "array", items: { type: "string" }, description: "Event channels that trigger a run" },
            },
          },
          bindings: {
            type: "object",
            description:
              "Per-workflow interface bindings (interface → provider), e.g. { llm: 'openai' } — this workflow's llm.createChatCompletion uses OpenAI regardless of the workspace binding",
          },
          input: {
            type: "object",
            description:
              "JSON Schema for the run input — the workflow's declared signature. Types the generated app SDK (app.<workflow>(input)) and renders the run form. Undeclared means unknown, and calls still work.",
          },
          output: {
            type: "object",
            description: "JSON Schema for the run result (same role as `input`).",
          },
        },
        required: ["name", "script_path"],
      },
    },
    {
      name: "workflows.list",
      operation: "list",
      description:
        "List registered workflows with their triggers (cron/webhook/events) and declared input/output schemas.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "workflows.get",
      operation: "get",
      description: "Get a workflow's registration, webhook path, and recent runs.",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string" } },
        required: ["name"],
      },
    },
    {
      name: "workflows.remove",
      operation: "remove",
      description: "Delete a workflow registration and its run history.",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string" } },
        required: ["name"],
      },
    },
    {
      name: "workflows.run",
      operation: "run",
      description:
        "Run a workflow now with an optional input payload. Returns the run record: status, result, logs, and one span per tool call. Pass agent to execute as a named agent profile — its grants bound what the run may touch, and the profile is exposed to the script as the `agent` global.",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string" }, input: {}, agent: { type: "string" } },
        required: ["name"],
      },
    },
    {
      name: "workflows.runs",
      operation: "runs",
      description: "List recent runs of a workflow (newest first).",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string" }, limit: { type: "number" } },
        required: ["name"],
      },
    },
    {
      name: "workflows.trace",
      operation: "trace",
      description: "Full trace of one run: input, result, logs, and per-tool-call spans.",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string" }, run_id: { type: "string" } },
        required: ["name", "run_id"],
      },
    },
    {
      name: "workflows.tree",
      operation: "tree",
      description:
        "Every run linked to one trace id, oldest first — the cascade an event emission, an app call, or a workflow→workflow call produced. Each node names its parentRunId; use workflows.trace for a node's logs and spans.",
      inputSchema: {
        type: "object",
        properties: { trace_id: { type: "string" } },
        required: ["trace_id"],
      },
    },
    {
      name: "workflows.versions",
      operation: "versions",
      description:
        "List the content versions of a workflow's script (its scriptPath), newest first. The newest version is the live one (current: true).",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string" } },
        required: ["name"],
      },
    },
    {
      name: "workflows.version",
      operation: "version",
      description: "Read one past version of a workflow's script by content hash.",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string" }, hash: { type: "string" } },
        required: ["name", "hash"],
      },
    },
    {
      name: "workflows.restore",
      operation: "restore",
      description:
        "Restore a past version of a workflow's script: re-writes that version's content as the new latest. Non-destructive — history is preserved and the old content becomes live again. Returns the updated workflow.",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string" }, hash: { type: "string" } },
        required: ["name", "hash"],
      },
    },
  ],

  async call(ctx, procedure, args) {
    switch (procedure) {
      case "register": {
        const name = workflowName(args["name"]);
        const script =
          typeof args["script"] === "string" && args["script"] ? args["script"] : undefined;
        const scriptPath =
          typeof args["script_path"] === "string" && args["script_path"]
            ? args["script_path"]
            : script
              ? `inline:${name}`
              : "";
        if (!scriptPath) throw new ServiceError("script_path is required", 400);
        const existing = await readRegistration(ctx.workspaceId, name);
        const triggers = parseTriggers(args["triggers"]);
        const now = new Date().toISOString();
        const bindings =
          typeof args["bindings"] === "object" &&
          args["bindings"] !== null &&
          !Array.isArray(args["bindings"])
            ? Object.fromEntries(
                Object.entries(args["bindings"] as Record<string, unknown>).filter(
                  (entry): entry is [string, string] => typeof entry[1] === "string",
                ),
              )
            : existing?.bindings;
        const registration: WorkflowRegistration = {
          name,
          description: typeof args["description"] === "string" ? args["description"] : existing?.description,
          scriptPath,
          script,
          triggers,
          bindings,
          agent:
            typeof args["agent"] === "string" && args["agent"]
              ? args["agent"]
              : args["agent"] === null
                ? undefined
                : existing?.agent,
          input: parseSchema(args["input"], "input") ?? existing?.input,
          output: parseSchema(args["output"], "output") ?? existing?.output,
          // Webhook token survives re-registration so external callers keep working.
          hookToken: triggers.webhook
            ? (existing?.hookToken ?? crypto.randomUUID().replace(/-/g, ""))
            : undefined,
          createdBy: existing?.createdBy ?? ctx.userId,
          createdAt: existing?.createdAt ?? now,
          updatedAt: now,
        };
        await saveRegistration(ctx.workspaceId, registration);
        await updateCronIndex(ctx.workspaceId);
        return {
          ...summarizeWorkflow(registration, ctx.workspaceId),
          hookToken: registration.hookToken,
        };
      }
      case "list": {
        const registrations = await listVisibleRegistrations(ctx.workspaceId, ctx.userId);
        return {
          workflows: registrations.map((registration) =>
            summarizeWorkflow(registration, ctx.workspaceId, registration.exportedBy),
          ),
        };
      }
      case "get": {
        const name = workflowName(args["name"]);
        const registration = await requireVisibleRegistration(
          ctx.workspaceId,
          name,
          ctx.userId,
        );
        const runs = await listRuns(ctx.workspaceId, name, 10);
        return {
          ...summarizeWorkflow(registration, ctx.workspaceId, registration.exportedBy),
          hookToken: registration.hookToken,
          runs: runs.map((run) => ({
            id: run.id,
            trigger: run.trigger,
            status: run.status,
            startedAt: run.startedAt,
            durationMs: run.durationMs,
            error: run.error,
          })),
        };
      }
      case "remove": {
        const name = workflowName(args["name"]);
        await requireVisibleRegistration(ctx.workspaceId, name, ctx.userId);
        const removed = await removeRegistration(ctx.workspaceId, name);
        await updateCronIndex(ctx.workspaceId);
        return { name, removed };
      }
      case "run": {
        const name = workflowName(args["name"]);
        await requireVisibleRegistration(ctx.workspaceId, name, ctx.userId);
        const agent =
          typeof args["agent"] === "string" && args["agent"] ? args["agent"] : undefined;
        return runWorkflowByName(ctx, name, "manual", args["input"], ctx.userId, agent);
      }
      case "runs": {
        const name = workflowName(args["name"]);
        await requireVisibleRegistration(ctx.workspaceId, name, ctx.userId);
        const limit = Math.min(Number(args["limit"]) || 20, 100);
        const runs = await listRuns(ctx.workspaceId, name, limit);
        return {
          name,
          runs: runs.map((run) => ({
            id: run.id,
            trigger: run.trigger,
            triggerDetail: run.triggerDetail,
            status: run.status,
            startedAt: run.startedAt,
            durationMs: run.durationMs,
            error: run.error,
            spanCount: run.spans.length,
          })),
        };
      }
      case "trace": {
        const name = workflowName(args["name"]);
        await requireVisibleRegistration(ctx.workspaceId, name, ctx.userId);
        const runId = typeof args["run_id"] === "string" ? args["run_id"] : "";
        const run = await readRun(ctx.workspaceId, name, runId);
        if (!run) throw new ServiceError(`Unknown run: ${name}/${runId}`, 404);
        return run;
      }
      case "tree": {
        const traceId = typeof args["trace_id"] === "string" ? args["trace_id"] : "";
        if (!traceId) throw new ServiceError("trace_id is required", 400);
        const runs = await readTrace(ctx.workspaceId, traceId);
        // The root is whatever has no parent inside this trace — an app call
        // or a user-initiated run — so a client can build the tree directly.
        const ids = new Set(runs.map((run) => run.runId));
        return {
          traceId,
          runs,
          rootRunIds: runs
            .filter((run) => !run.parentRunId || !ids.has(run.parentRunId))
            .map((run) => run.runId),
        };
      }
      case "versions": {
        const name = workflowName(args["name"]);
        const registration = await requireVisibleRegistration(
          ctx.workspaceId,
          name,
          ctx.userId,
        );
        const versions = await listScriptVersions(ctx.workspaceId, registration.scriptPath);
        return {
          path: registration.scriptPath,
          versions: versions.map((version, index) => ({
            hash: version.hash,
            updatedAt: version.updatedAt,
            size: version.size,
            // listVersions is newest-first, so the head is the live version.
            current: index === 0,
          })),
        };
      }
      case "version": {
        const name = workflowName(args["name"]);
        const hash = typeof args["hash"] === "string" ? args["hash"] : "";
        const registration = await requireVisibleRegistration(
          ctx.workspaceId,
          name,
          ctx.userId,
        );
        const file = await readScriptVersion(ctx.workspaceId, registration.scriptPath, hash);
        if (!file) throw new ServiceError(`Unknown version: ${name}@${hash}`, 404);
        return {
          path: file.path,
          hash: file.hash,
          content: file.content,
          mimeType: file.mimeType,
          updatedAt: file.updatedAt,
        };
      }
      case "restore": {
        const name = workflowName(args["name"]);
        const hash = typeof args["hash"] === "string" ? args["hash"] : "";
        const registration = await requireVisibleRegistration(
          ctx.workspaceId,
          name,
          ctx.userId,
        );
        const restored = await restoreScriptVersion(ctx.workspaceId, registration.scriptPath, hash);
        if (!restored) throw new ServiceError(`Unknown version: ${name}@${hash}`, 404);
        return {
          ...summarizeWorkflow(registration, ctx.workspaceId, registration.exportedBy),
          hookToken: registration.hookToken,
        };
      }
      default:
        throw new ServiceError(`Unknown workflows procedure: ${procedure}`, 404);
    }
  },
};
