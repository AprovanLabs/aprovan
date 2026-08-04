/**
 * Server-side workflow script runner — the gateway twin of the registry
 * playground's browser sandbox. The script runs inside a QuickJS WASM
 * isolate (see sandbox.ts) where the only capabilities are:
 *
 *   - namespace proxies (core services + every credentialed provider), each
 *     call dispatched through {@link invokeTool} and recorded as a span
 *   - `console.*`, captured into the run record
 *   - `input` — the trigger payload (webhook body, event payload, manual args)
 *
 * No `require`, `process`, `fetch`, or host globals — the WASM boundary
 * makes that a guarantee rather than a convention: all effects ride the
 * same tool-dispatch path widgets use, so tracing, credentials, and authz
 * are uniform. Scripts are plain async JavaScript
 * (`await github.repos.get(...)`) with an optional trailing `return`.
 *
 * Event emissions from inside a run trigger subscribed workflows with an
 * incremented depth; MAX_EVENT_DEPTH caps cascades to prevent loops.
 */

import { readAgentProfile } from "../agents/service.js";
import { getFsStore } from "../fs-store.js";
import { ServiceError, type ServiceContext } from "../service-kernel.js";
import type { TelemetryExportResult } from "@utdk/telemetry";
import { recordTelemetry, type TelemetryEventInput } from "../telemetry/service.js";
import { invokeTool } from "./invoke.js";
import { buildWorkflowNamespaceSet } from "./namespace-set.js";
import { runScriptInSandbox } from "./sandbox.js";
import {
  createWorkflowTelemetryFacade,
  TELEMETRY_SDK_GUEST_BIND,
} from "./telemetry-sdk.js";
import {
  newRunId,
  newTraceId,
  readRegistration,
  saveRun,
  type WorkflowLogLine,
  type WorkflowRegistration,
  type WorkflowRun,
  type WorkflowSpan,
} from "./store.js";

export const MAX_EVENT_DEPTH = 2;

// Generous enough for a couple of LLM calls (chat-provider dispatch allows
// 120s per call); the sync spin-loop guard below stays tight.
const SCRIPT_TIMEOUT_MS = 180_000;

function stringify(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export interface RunWorkflowOptions {
  workspaceId: string;
  userId: string;
  registration: WorkflowRegistration;
  trigger: WorkflowRun["trigger"];
  triggerDetail?: string;
  input?: unknown;
  /** Event-cascade depth (0 = user/API initiated). */
  depth?: number;
  /**
   * App session running this workflow (routes/apps.ts): tool calls made by
   * the script inherit the per-(app, user) data partitioning.
   */
  appScope?: ServiceContext["appScope"];
  /**
   * Where the script SOURCE is read from, when that differs from the
   * workspace the run executes in — a `dataScope: "workspace"` app publishes
   * its code from the owner workspace but runs against the caller's.
   */
  scriptWorkspaceId?: string;
  /** Trace this run belongs to (a new trace is started when absent). */
  traceId?: string;
  /** Run that caused this one (event cascade, workflow→workflow, app call). */
  parentRunId?: string;
  /** App this run was started through, for the trace tree. */
  app?: string;
  /**
   * Agent profile to run as (docs/telemetry-and-agents.md): the profile's
   * grants bound the run's tool + vfs reach, and the profile itself is
   * exposed to the script as the `agent` global.
   */
  agent?: string;
}

export async function runWorkflow(options: RunWorkflowOptions): Promise<WorkflowRun> {
  const {
    workspaceId,
    userId,
    registration,
    trigger,
    triggerDetail,
    input,
    depth = 0,
    appScope,
    scriptWorkspaceId,
    parentRunId,
    app,
  } = options;

  const traceId = options.traceId ?? newTraceId();
  // Agent attribution: a run-level agent wins over the registration's.
  const agentName = options.agent ?? registration.agent;
  const agentProfile = agentName
    ? await readAgentProfile(workspaceId, agentName)
    : undefined;
  if (agentName && !agentProfile) {
    throw new ServiceError(`Unknown agent: ${agentName}`, 404);
  }
  const run: WorkflowRun = {
    id: newRunId(),
    workflow: registration.name,
    trigger,
    triggerDetail,
    status: "running",
    startedAt: new Date().toISOString(),
    input: input ?? null,
    logs: [],
    spans: [],
    traceId,
    parentRunId,
    app,
    ...(agentName ? { agent: agentName } : {}),
  };
  const startMs = performance.now();

  const scriptFile =
    registration.script !== undefined
      ? { content: registration.script }
      : await getFsStore().read(scriptWorkspaceId ?? workspaceId, registration.scriptPath);
  if (!scriptFile) {
    run.status = "failed";
    run.error = `Script not found: ${registration.scriptPath}`;
    run.durationMs = Math.round(performance.now() - startMs);
    await saveRun(workspaceId, run);
    return run;
  }

  // workflowDepth marks tool calls from this run as workflow-context, so
  // `events.emit` cascades subscribed workflows with an incremented depth
  // (capped at MAX_EVENT_DEPTH in triggerEventWorkflows).
  const ctx: ServiceContext = {
    workspaceId,
    userId,
    workflowDepth: depth + 1,
    appScope,
    // Registration-level interface bindings pin e.g. `llm` to a specific
    // provider for this workflow's runs.
    interfaceBindings: registration.bindings,
    // An agent profile bound to an llm instance redirects its runs' plain
    // `llm.*` calls there, so the script stays written against the generic
    // namespace while the agent chooses the implementation.
    ...(agentProfile?.llm ? { interfaceInstances: { llm: agentProfile.llm } } : {}),
    // Anything this run causes (an emit that fires a workflow, a nested
    // workflows.run) inherits the trace and names THIS run as its parent.
    traceId,
    parentRunId: run.id,
    // The profile's grants bound every dispatch (invoke.ts) and vfs path.
    ...(agentProfile?.grants ? { grants: agentProfile.grants } : {}),
    // Native export flattening stamps this on every SDK-flushed event.
    telemetrySource: {
      type: "workflow",
      path: registration.scriptPath,
      runId: run.id,
    },
  };

  const telemetryFacade = createWorkflowTelemetryFacade({
    path: registration.scriptPath,
    runId: run.id,
    exportArgs: async (args) =>
      (await invokeTool(
        ctx,
        "telemetry",
        "export",
        args as unknown as Record<string, unknown>,
      )) as TelemetryExportResult,
  });

  const pushLog = (level: WorkflowLogLine["level"], parts: unknown[]) => {
    if (run.logs.length >= 500) return;
    run.logs.push({
      level,
      message: parts.map(stringify).join(" "),
      ts: new Date().toISOString(),
    });
  };

  const dispatchFor =
    (namespace: string) =>
    async (path: string, args: unknown[], profile?: string): Promise<unknown> => {
      // SDK helpers on the telemetry namespace — host-side createTelemetry,
      // reached via the same proxy scripts already use for emit/query/export.
      if (telemetryFacade.handles(namespace, path)) {
        return telemetryFacade.dispatch(path, args);
      }
      const span: WorkflowSpan = {
        namespace,
        procedure: path,
        startedAt: new Date().toISOString(),
        durationMs: 0,
        ok: false,
      };
      const spanStart = performance.now();
      try {
        // Positional args follow the SDK call convention: a single object
        // argument is the operation's named args.
        const argObject =
          args.length === 1 && typeof args[0] === "object" && args[0] !== null
            ? (args[0] as Record<string, unknown>)
            : args.length === 0
              ? {}
              : { args };
        const result = await invokeTool(ctx, namespace, path, argObject, profile);
        span.ok = true;
        return result;
      } catch (err) {
        span.error = err instanceof Error ? err.message : String(err);
        throw err;
      } finally {
        span.durationMs = Math.round(performance.now() - spanStart);
        if (run.spans.length < 500) run.spans.push(span);
      }
    };

  const namespaces = await buildWorkflowNamespaceSet(workspaceId, scriptFile.content);

  try {
    run.result =
      (await runScriptInSandbox({
        // Guest bind overlays SDK helpers on the telemetry namespace proxy
        // before the script body runs (withSpan stays guest-local).
        source: `${TELEMETRY_SDK_GUEST_BIND}\n${scriptFile.content}`,
        filename: registration.scriptPath,
        input: input ?? null,
        namespaces,
        dispatch: (namespace, path, args, profile) => dispatchFor(namespace)(path, args, profile),
        log: pushLog,
        timeoutMs: SCRIPT_TIMEOUT_MS,
        agent: agentProfile
          ? {
              name: agentProfile.name,
              llm: agentProfile.llm ?? null,
              provider: agentProfile.provider ?? null,
              model: agentProfile.model ?? null,
              prompt: agentProfile.prompt ?? null,
            }
          : null,
      })) ?? null;
    run.status = "succeeded";
  } catch (err) {
    run.status = "failed";
    run.error = err instanceof Error ? err.message : String(err);
  } finally {
    // Spec: failed runs still flush. Bounded so a hung export cannot stall
    // the run record.
    await telemetryFacade.flushBounded();
  }

  run.durationMs = Math.round(performance.now() - startMs);
  await saveRun(workspaceId, run);
  await mirrorRunTelemetry(workspaceId, userId, registration, run);
  if (run.status === "failed") {
    await notifyRunFailure(workspaceId, userId, registration, run);
  }
  return run;
}

/**
 * Mirror a run's *outcome* into the workspace telemetry store: root span +
 * error logs + failed tool spans. The full record (all logs, all spans)
 * stays on the run itself (`workflows.trace {run}`); telemetry carries the
 * cross-cutting index — "what failed lately, and why" — next to widget and
 * dispatch events. Never throws.
 */
async function mirrorRunTelemetry(
  workspaceId: string,
  userId: string,
  registration: WorkflowRegistration,
  run: WorkflowRun,
): Promise<void> {
  const source = {
    type: "workflow" as const,
    path: registration.scriptPath,
    runId: run.id,
    ...(run.app ? { app: run.app } : {}),
  };
  const events: TelemetryEventInput[] = [
    {
      kind: "span",
      traceId: run.traceId,
      spanId: run.id,
      name: `workflow ${registration.name}`,
      source,
      at: run.startedAt,
      durationMs: run.durationMs ?? 0,
      status: run.status === "failed" ? "error" : "ok",
      ...(run.error ? { error: { message: run.error } } : {}),
      attributes: {
        workflow: registration.name,
        trigger: run.trigger,
        ...(run.triggerDetail ? { triggerDetail: run.triggerDetail } : {}),
      },
    },
  ];
  for (const span of run.spans.filter((s) => !s.ok).slice(0, 20)) {
    events.push({
      kind: "span",
      traceId: run.traceId,
      parentSpanId: run.id,
      name: `${span.namespace}.${span.procedure}`,
      source,
      at: span.startedAt,
      durationMs: span.durationMs,
      status: "error",
      error: { message: span.error ?? "error" },
      attributes: { namespace: span.namespace, procedure: span.procedure },
    });
  }
  for (const line of run.logs.filter((l) => l.level === "error" || l.level === "warn").slice(0, 20)) {
    events.push({
      kind: "log",
      traceId: run.traceId,
      source,
      at: line.ts,
      level: line.level === "warn" ? "warn" : "error",
      message: line.message,
    });
  }
  await recordTelemetry(workspaceId, userId, events);
}

/**
 * A failed run raises a `warning` notification carrying the run/trace ids —
 * the hook for "an agent investigates and fixes it". Only on the transition
 * into failure (the previous run succeeded or there is none): a cron
 * failing every 15 minutes must not fill the drawer. Never throws.
 */
async function notifyRunFailure(
  workspaceId: string,
  userId: string,
  registration: WorkflowRegistration,
  run: WorkflowRun,
): Promise<void> {
  try {
    const { listRuns } = await import("./store.js");
    const runs = await listRuns(workspaceId, registration.name, 2);
    const previous = runs.filter((r) => r.id !== run.id)[0];
    if (previous && previous.status === "failed") return;
    const { getCoreService } = await import("../service-kernel.js");
    const notifications = getCoreService("notifications");
    if (!notifications) return;
    await notifications.call({ workspaceId, userId }, "emit", {
      category: "warning",
      title: `Workflow "${registration.name}" failed`,
      body: `${run.error ?? "Unknown error"}\n\nTrigger: ${run.trigger}${run.triggerDetail ? ` (${run.triggerDetail})` : ""} · Run ${run.id}`,
      audience: "workspace",
      link: {
        kind: "debug-workflow",
        workflow: registration.name,
        scriptPath: registration.scriptPath,
        runId: run.id,
        traceId: run.traceId,
      },
    });
  } catch {
    // Failure notification is best-effort; the run record is the truth.
  }
}

/**
 * Fire every workflow subscribed to `channel`. Called after an event lands —
 * from the events core service (user/API emissions, depth 0) and from the
 * runner's emit hook (workflow emissions, depth+1). Runs are fire-and-forget;
 * failures land in their own run records.
 */
export async function triggerEventWorkflows(
  ctx: ServiceContext,
  channel: string,
  payload: unknown,
  depth: number,
): Promise<void> {
  if (depth > MAX_EVENT_DEPTH) return;
  const { listRegistrations } = await import("./store.js");
  let registrations;
  try {
    registrations = await listRegistrations(ctx.workspaceId);
  } catch {
    return;
  }
  for (const registration of registrations) {
    if (!registration.triggers.events?.includes(channel)) continue;
    void runWorkflow({
      workspaceId: ctx.workspaceId,
      userId: ctx.userId,
      registration,
      trigger: "event",
      triggerDetail: channel,
      input: { channel, payload: payload ?? null },
      depth,
      // The emitting run (or app call) is this run's parent in the trace.
      // The app scope deliberately does NOT propagate: an event-subscribed
      // workflow is the workspace's own automation, not part of the app
      // session, and must keep the workspace's data view.
      traceId: ctx.traceId,
      parentRunId: ctx.parentRunId,
    }).catch(() => undefined);
  }
}

/**
 * Convenience: run by name (manual/API trigger). A workflow→workflow call
 * lands here with the caller's context, so the child run joins the caller's
 * trace and names it as parent; the depth cap still applies through
 * `workflowDepth`.
 */
export async function runWorkflowByName(
  ctx: ServiceContext,
  name: string,
  trigger: WorkflowRun["trigger"],
  input?: unknown,
  triggerDetail?: string,
  agent?: string,
): Promise<WorkflowRun> {
  if ((ctx.workflowDepth ?? 0) > MAX_EVENT_DEPTH) {
    throw new ServiceError(
      `Workflow cascade depth exceeded (${MAX_EVENT_DEPTH}) running ${name}`,
      429,
    );
  }
  const registration = await readRegistration(ctx.workspaceId, name);
  if (!registration) throw new ServiceError(`Unknown workflow: ${name}`, 404);
  return runWorkflow({
    workspaceId: ctx.workspaceId,
    userId: ctx.userId,
    registration,
    trigger,
    triggerDetail,
    input,
    depth: ctx.workflowDepth ?? 0,
    appScope: ctx.appScope,
    traceId: ctx.traceId,
    parentRunId: ctx.parentRunId,
    app: ctx.appScope?.name,
    agent,
  });
}
