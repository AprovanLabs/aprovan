/**
 * Public app surface — how OTHER users consume a workspace's published apps.
 *
 *   GET  /apps/:workspaceId/:name              — manifest (public metadata)
 *   POST /apps/:workspaceId/:name/tools/:namespace/:procedure
 *   POST /apps/:workspaceId/:name/tools/app/:workflow      — an exported workflow
 *   POST /apps/:workspaceId/:name/workflows/:workflow/run  — the same thing
 *
 * The live page surface (aprovan.com/apps/...) lives in routes/live-apps.ts;
 * this router is the authenticated API the pages call back into.
 *
 * **capability = namespace.** An exported workflow answers on the namespace
 * `app`, so at the call site a workflow and a native procedure are
 * indistinguishable: `app.weeklySummary(input)` is one POST to
 * `/tools/app/weeklySummary` (kebab ids resolve through their camel-case
 * alias). `/workflows/:name/run` is the same dispatch under an older spelling.
 *
 * Auth: any valid Cognito token — membership in the owning workspace is NOT
 * required (the exception is `personal`, see below). That's the point: the
 * owner workspace is the app's "account" (its data, credentials, and
 * controls), and outside callers reach it only through this surface, which
 * enforces:
 *   - the app's role model (admins / listed users / any authenticated user)
 *   - the tool allow-list (`allowedTools` — deny by default): native
 *     namespaces, the app's own workflows, and exact provider procedures
 *     (credential grants, tier 2 — dispatched with the OWNING workspace's
 *     credential regardless of where execution otherwise lands)
 *   - per-(app, user) rate limits and a durable daily budget
 *   - per-(app, user) data partitioning (ServiceContext.appScope)
 *   - prefix-based FS authz: the session carries the manifest's declared
 *     `paths`, and nothing outside them is reachable without a share
 *
 * Where execution lands depends on the manifest's `dataScope`:
 *   - "owner" (default): as the owning workspace (its credentials, its
 *     storage), attributed to the calling user.
 *   - "workspace": if the caller's workspace holds an install record, as
 *     THEIR workspace, under the install prefix, with their credentials. The
 *     app is code; the user brings the workspace.
 *
 * `:name` = "personal" is the one exception: it is synthesized (see
 * apps/personal.ts), never stored, and members-only — the manifest role
 * model doesn't apply, workspace membership does. Execution never leaves the
 * workspace it belongs to.
 */

import { RateLimiter } from "@utdk/common/rateLimit";
import { Hono } from "hono";
import {
  isNativeNamespace,
  isWorkflowNamespace,
  providerGrantCallable,
  resolveExportedWorkflow,
  workflowCallable,
} from "../apps/capabilities.js";
import { installedScope, readInstall, type AppInstall } from "../apps/install.js";
import { isPersonalApp, personalCallerRole, readPersonalManifest } from "../apps/personal.js";
import { callerRole, readApp, toolAllowed, type AppManifest, type AppPaths } from "../apps/store.js";
import { countDailyCall } from "../apps/usage.js";
import { getAuditStore } from "../audit.js";
import { getMembership } from "../memberships.js";
import { getAuthMode, readBearerToken, verifyAccessToken } from "../middleware/auth.js";
import { ServiceError, type ServiceContext } from "../service-kernel.js";
import { parseTelemetrySourceHeader, recordTelemetry } from "../telemetry/service.js";
import { getCurrentWorkspace } from "../sessions.js";
import { invokeTool } from "../workflows/invoke.js";
import { runWorkflow } from "../workflows/runner.js";
import { newTraceId, readRegistration } from "../workflows/store.js";

export const appsRouter = new Hono();

// ---------------------------------------------------------------------------
// App-session auth: verify the token, resolve the app + caller role.
// No workspace membership check — the manifest's role model decides access.
// ---------------------------------------------------------------------------

interface AppSession {
  manifest: AppManifest;
  /** Workspace that published the app (owns the code and the manifest). */
  workspaceId: string;
  /** Workspace the session's tool calls execute in (see `dataScope`). */
  executionWorkspaceId: string;
  /** Install record when the caller runs a workspace-scoped copy. */
  install?: AppInstall;
  sub: string;
  role: "admin" | "user";
  ctx: ServiceContext;
}

type HonoCtx = {
  req: { header(name: string): string | undefined; param(name: string): string | undefined };
};

async function callerSub(c: HonoCtx): Promise<string> {
  if (getAuthMode() === "none") {
    // Test/dev mode: the caller identifies via header (defaults to "local").
    return c.req.header("X-App-User") ?? "local";
  }
  const token = readBearerToken(c);
  if (!token) throw new ServiceError("Missing bearer token", 401);
  try {
    return await verifyAccessToken(token);
  } catch {
    throw new ServiceError("Invalid or expired token", 401);
  }
}

/**
 * The caller's own workspace — only consulted for `dataScope: "workspace"`
 * apps, where the install record decides where data lands. An explicit
 * `X-Aprovan-Workspace` must still pass a membership check; otherwise the
 * caller's active workspace is used.
 */
async function callerWorkspace(c: HonoCtx, sub: string): Promise<string | undefined> {
  const requested = c.req.header("X-Aprovan-Workspace");
  if (getAuthMode() === "none") return requested ?? "local";
  if (requested) {
    const membership = await getMembership(requested, sub).catch(() => undefined);
    return membership ? requested : undefined;
  }
  return getCurrentWorkspace(sub).catch(() => undefined);
}

async function resolveAppSession(c: HonoCtx): Promise<AppSession> {
  const workspaceId = c.req.param("workspaceId");
  const name = c.req.param("name");
  if (!workspaceId || !name) throw new ServiceError("Not found", 404);

  const sub = await callerSub(c);

  // Personal is synthesized, never stored, and members-only: the manifest
  // role model doesn't apply — the caller's workspace membership is the
  // whole access check. It never installs elsewhere, so execution always
  // stays in this same workspace with this workspace's own credentials.
  if (isPersonalApp(name)) {
    const role = await personalCallerRole(workspaceId, sub);
    if (!role) throw new ServiceError("You do not have access to this app", 403);
    const manifest = await readPersonalManifest(workspaceId);
    return {
      manifest,
      workspaceId,
      executionWorkspaceId: workspaceId,
      sub,
      role,
      ctx: {
        workspaceId,
        userId: sub,
        appScope: { name: manifest.name, paths: manifest.paths, dataScope: manifest.dataScope, userId: sub, role },
        traceId: newTraceId(),
      },
    };
  }

  const manifest = await readApp(workspaceId, name).catch(() => undefined);
  if (!manifest) throw new ServiceError("Not found", 404);

  const role = callerRole(manifest, sub);
  if (!role) throw new ServiceError("You do not have access to this app", 403);

  // dataScope "workspace": the app is a template the caller installed into
  // their own workspace. With an install record, data + native namespaces
  // resolve there under `<prefix>/data` and execution uses the caller's
  // credentials; without one, owner-hosted behaviour is unchanged.
  let executionWorkspaceId = workspaceId;
  let scope: AppPaths = { name: manifest.name, paths: manifest.paths };
  let install: AppInstall | undefined;
  if ((manifest.dataScope ?? "owner") === "workspace") {
    const caller = await callerWorkspace(c, sub);
    install = caller ? await readInstall(caller, workspaceId, name).catch(() => undefined) : undefined;
    if (caller && install) {
      executionWorkspaceId = caller;
      scope = installedScope(manifest, install);
    }
  }

  return {
    manifest,
    workspaceId,
    executionWorkspaceId,
    install,
    sub,
    role,
    ctx: {
      workspaceId: executionWorkspaceId,
      userId: sub,
      appScope: { ...scope, userId: sub, role },
      // One trace per app request: anything the call cascades into (a
      // workflow, its emits) links back to it.
      traceId: newTraceId(),
    },
  };
}

// ---------------------------------------------------------------------------
// Per-(app, user) rate limiting
// ---------------------------------------------------------------------------

const appLimiters = new Map<string, RateLimiter>();

function checkAppRateLimit(session: AppSession): boolean {
  const key = `${session.workspaceId}/${session.manifest.name}:${session.sub}`;
  let limiter = appLimiters.get(key);
  if (!limiter) {
    limiter = new RateLimiter({
      requestsPerSecond: session.manifest.rateLimit?.rps ?? 5,
      burst: session.manifest.rateLimit?.burst ?? 10,
    });
    appLimiters.set(key, limiter);
  }
  return limiter.tryAcquire();
}

/** Tests: drop all app rate-limit buckets. */
export function resetAppRateLimiters(): void {
  appLimiters.clear();
}

type Responder = { json: (body: unknown, status?: number) => Response };

function errorResponse(c: Responder, err: unknown): Response {
  if (err instanceof ServiceError) {
    return c.json({ error: err.message }, err.status as 400);
  }
  return c.json({ error: err instanceof Error ? err.message : "Internal error" }, 500);
}

/**
 * The two per-user budgets every app call passes: the in-process token bucket
 * (burst protection) and the durable daily counter (fairness across Lambda
 * instances). Returns a response when the call must be rejected.
 */
async function enforceBudgets(c: Responder, session: AppSession): Promise<Response | undefined> {
  if (!checkAppRateLimit(session)) {
    return c.json({ error: "rate_limit_exceeded" }, 429);
  }
  const usage = await countDailyCall(session.workspaceId, session.manifest, session.sub);
  if (!usage.allowed) {
    return c.json(
      {
        error: "daily_limit_exceeded",
        used: usage.used,
        limit: usage.limit,
        resetsAfter: usage.date,
      },
      429,
    );
  }
  return undefined;
}

/**
 * Run an exported workflow as the app session. The script is read from the
 * OWNER workspace (that's where the app's code lives) while everything else —
 * data, credentials, the run record — belongs to the execution workspace,
 * which differs only for a workspace-scoped install.
 */
async function runExportedWorkflow(
  session: AppSession,
  workflowName: string,
  input: unknown,
): Promise<Response> {
  const registration = await readRegistration(session.workspaceId, workflowName);
  if (!registration) throw new ServiceError("Workflow registration missing", 404);

  const run = await runWorkflow({
    workspaceId: session.executionWorkspaceId,
    scriptWorkspaceId: session.workspaceId,
    userId: session.sub,
    registration,
    trigger: "manual",
    triggerDetail: `app:${session.manifest.name}`,
    input,
    appScope: session.ctx.appScope,
    traceId: session.ctx.traceId,
    app: session.manifest.name,
  });
  return Response.json(
    {
      runId: run.id,
      traceId: run.traceId,
      status: run.status,
      durationMs: run.durationMs,
      result: run.result ?? null,
      error: run.error,
      // `data` mirrors the tool-proxy envelope so `app.<workflow>()` and
      // `keyvalue.get()` are the same call shape to a client.
      data: run.result ?? null,
    },
    { status: run.status === "failed" ? 500 : 200 },
  );
}

async function readArgs(c: { req: { json<T>(): Promise<T> } }): Promise<Record<string, unknown>> {
  let body: { args?: unknown };
  try {
    body = await c.req.json<{ args?: unknown }>();
  } catch {
    body = {};
  }
  return body.args && typeof body.args === "object" && !Array.isArray(body.args)
    ? (body.args as Record<string, unknown>)
    : {};
}

// ---------------------------------------------------------------------------
// GET /apps/:workspaceId/:name — public manifest
// ---------------------------------------------------------------------------

appsRouter.get("/:workspaceId/:name", async (c) => {
  try {
    const session = await resolveAppSession(c);
    const { manifest, workspaceId } = session;
    return c.json({
      name: manifest.name,
      title: manifest.title,
      description: manifest.description,
      visibility: manifest.visibility ?? "private",
      dataScope: manifest.dataScope ?? "owner",
      workflows: manifest.workflows ?? [],
      allowedTools: manifest.allowedTools,
      channels: manifest.channels ?? {},
      role: session.role,
      url: `/apps/${workspaceId}/${manifest.name}`,
      liveUrl: `/apps/${workspaceId}/${manifest.name}`,
      apiBase: `/api/gateway/apps/${workspaceId}/${manifest.name}`,
      /** Present when this caller runs their own installed copy. */
      install: session.install
        ? {
            workspaceId: session.executionWorkspaceId,
            prefix: session.install.prefix,
            release: session.install.release,
          }
        : null,
    });
  } catch (err) {
    return errorResponse(c, err);
  }
});

// ---------------------------------------------------------------------------
// POST /apps/:workspaceId/:name/tools/:namespace/:procedure
// ---------------------------------------------------------------------------

appsRouter.post("/:workspaceId/:name/tools/:namespace/:procedure{.*}", async (c) => {
  const startTime = Date.now();
  try {
    const session = await resolveAppSession(c);
    const namespace = c.req.param("namespace")!;
    const procedure = c.req.param("procedure")!;

    // Dispatch span for the workspace telemetry store; the app is the source
    // (server-stamped — the header only adds widget path/session/trace).
    const attribution = parseTelemetrySourceHeader(c.req.header("x-telemetry-source"));
    const recordDispatch = (status: number, errorMessage?: string): void => {
      if (namespace === "telemetry") return;
      void recordTelemetry(
        session.executionWorkspaceId,
        `app:${session.manifest.name}:${session.sub}`,
        [
          {
            kind: "span",
            name: `${namespace}.${procedure}`,
            source: { ...(attribution?.source ?? { type: "app" }), app: session.manifest.name },
            ...(attribution?.traceId ? { traceId: attribution.traceId } : {}),
            durationMs: Date.now() - startTime,
            status: status < 400 ? "ok" : "error",
            ...(status >= 400 ? { error: { message: errorMessage ?? `HTTP ${status}` } } : {}),
            attributes: { namespace, procedure, "http.status": status },
          },
        ],
      );
    };

    const rejected = await enforceBudgets(c, session);
    if (rejected) return rejected;

    // The app's own workflows answer on the `app` namespace, resolved through
    // their camel-case alias (`weekly-summary` ⇄ `weeklySummary`).
    if (isWorkflowNamespace(namespace)) {
      const workflow = resolveExportedWorkflow(session.manifest.workflows ?? [], procedure);
      if (!workflow || !workflowCallable(session.manifest, workflow)) {
        return c.json({ error: `Workflow ${procedure} is not exposed by this app` }, 404);
      }
      const response = await runExportedWorkflow(session, workflow, await readArgs(c));
      getAuditStore().append({
        requestId: crypto.randomUUID(),
        workspaceId: session.executionWorkspaceId,
        callerId: `app:${session.manifest.name}:${session.sub}`,
        provider: "app",
        operation: workflow,
        status: response.status,
        durationMs: Date.now() - startTime,
      });
      recordDispatch(response.status);
      return response;
    }

    // An allow-listed native namespace runs in the execution workspace (the
    // caller's own for a workspace-scoped install; the owner's otherwise).
    if (isNativeNamespace(namespace)) {
      if (!toolAllowed(session.manifest, namespace, procedure)) {
        recordDispatch(403, `Tool ${namespace}.${procedure} is not allowed for this app`);
        return c.json({ error: `Tool ${namespace}.${procedure} is not allowed for this app` }, 403);
      }
      let data: unknown;
      try {
        data = await invokeTool(session.ctx, namespace, procedure, await readArgs(c));
      } catch (err) {
        recordDispatch(
          err instanceof ServiceError ? err.status : 500,
          err instanceof Error ? err.message : String(err),
        );
        throw err;
      }
      const durationMs = Date.now() - startTime;
      getAuditStore().append({
        requestId: crypto.randomUUID(),
        workspaceId: session.executionWorkspaceId,
        callerId: `app:${session.manifest.name}:${session.sub}`,
        provider: namespace,
        operation: procedure,
        status: 200,
        durationMs,
      });
      recordDispatch(200);
      return c.json({ data, meta: { app: session.manifest.name, durationMs } });
    }

    // A provider entry in `allowedTools` is an explicit credential grant —
    // re-validated here at call time (tier-2 re-check) — and always executes
    // with the OWNING workspace's credential, never the execution workspace's
    // (a workspace-scoped install carries no credentials of its own; the
    // grant was only ever a promise the owner could keep).
    if (providerGrantCallable(session.manifest, namespace, procedure)) {
      const grantCtx = { ...session.ctx, workspaceId: session.workspaceId };
      let data: unknown;
      try {
        data = await invokeTool(grantCtx, namespace, procedure, await readArgs(c));
      } catch (err) {
        recordDispatch(
          err instanceof ServiceError ? err.status : 500,
          err instanceof Error ? err.message : String(err),
        );
        throw err;
      }
      const durationMs = Date.now() - startTime;
      getAuditStore().append({
        requestId: crypto.randomUUID(),
        workspaceId: session.executionWorkspaceId,
        callerId: `app:${session.manifest.name}:${session.sub}`,
        provider: namespace,
        operation: procedure,
        status: 200,
        durationMs,
      });
      recordDispatch(200);
      return c.json({ data, meta: { app: session.manifest.name, durationMs } });
    }

    recordDispatch(403, `Tool ${namespace}.${procedure} is not allowed for this app`);
    return c.json({ error: `Tool ${namespace}.${procedure} is not allowed for this app` }, 403);
  } catch (err) {
    return errorResponse(c, err);
  }
});

// ---------------------------------------------------------------------------
// POST /apps/:workspaceId/:name/workflows/:workflow/run
// ---------------------------------------------------------------------------

appsRouter.post("/:workspaceId/:name/workflows/:workflow/run", async (c) => {
  try {
    const session = await resolveAppSession(c);
    const requested = c.req.param("workflow")!;
    const workflowName = resolveExportedWorkflow(session.manifest.workflows ?? [], requested);
    if (!workflowName || !workflowCallable(session.manifest, workflowName)) {
      return c.json({ error: `Workflow ${requested} is not exposed by this app` }, 404);
    }
    const rejected = await enforceBudgets(c, session);
    if (rejected) return rejected;

    // This surface takes the run input as the raw body (no `args` envelope).
    let input: unknown = null;
    try {
      input = await c.req.json();
    } catch {
      input = null;
    }
    return await runExportedWorkflow(session, workflowName, input);
  } catch (err) {
    return errorResponse(c, err);
  }
});
