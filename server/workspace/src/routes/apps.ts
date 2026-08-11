/**
 * Public app surface — how OTHER users consume a workspace's published apps.
 *
 *   GET  /apps/:workspaceId/:name              — manifest (public metadata)
 *   GET  /apps/id/:appId                       — same, by durable id
 *   POST /apps/:workspaceId/:name/tools/:namespace/:procedure
 *   POST /apps/id/:appId/tools/:namespace/:procedure
 *   POST /apps/:workspaceId/:name/workflows/:workflow/run
 *
 * The live page surface (aprovan.com/apps/...) lives in routes/live-apps.ts;
 * this router is the authenticated API the pages call back into.
 *
 * Auth: any valid Cognito token — membership in the owning workspace is NOT
 * required. The owner workspace is the app's "account" (its data, credentials,
 * and controls), and outside callers reach it only through this surface.
 * Alias resolution happens at the route edge; sessions carry `appId`.
 */

import { RateLimiter } from "@utdk/common/rateLimit";
import { Hono } from "hono";
import {
  contractGrantCallable,
  isNativeNamespace,
  isWorkflowNamespace,
  providerGrantCallable,
  resolveExportedWorkflow,
  workflowCallable,
} from "../apps/capabilities.js";
import {
  findInstallByOrigin,
  installServingManifest,
  installedScope,
  installRoot,
  readInstall,
  type AppInstallation,
} from "../apps/install.js";
import { isAppId, resolveAppLocation, resolveAppRef } from "../apps/identity.js";
import { callerRole, readApp, toolAllowed, type AppManifest, type AppPaths } from "../apps/store.js";
import { countDailyCall } from "../apps/usage.js";
import { getAuditStore } from "../audit.js";
import { isInterface } from "../interfaces.js";
import { getAuthMode, readBearerToken, verifyAccessToken } from "../middleware/auth.js";
import { installGrantHolds } from "../profile-grants.js";
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
  /** Workspace the session's tool calls execute in (installer's when installed). */
  executionWorkspaceId: string;
  /** Install record when the caller runs an installed copy. */
  install?: AppInstallation;
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
 * Resolve an app session from either `/apps/:workspaceId/:name` (alias) or
 * `/apps/id/:appId` (permalink). When the caller's workspace holds an
 * install of the origin app, execution and partitions switch to the install.
 */
async function resolveAppSession(c: HonoCtx): Promise<AppSession> {
  const sub = await callerSub(c);
  const appIdParam = c.req.param("appId");
  const workspaceIdParam = c.req.param("workspaceId");
  const nameParam = c.req.param("name");

  let workspaceId: string;
  let manifest: AppManifest | undefined;

  if (appIdParam) {
    const loc = await resolveAppLocation(appIdParam).catch(() => undefined);
    if (!loc) throw new ServiceError("Not found", 404);
    workspaceId = loc.workspaceId;
    manifest = await readApp(workspaceId, appIdParam).catch(() => undefined);
  } else {
    if (!workspaceIdParam || !nameParam) throw new ServiceError("Not found", 404);
    workspaceId = workspaceIdParam;
    // Install-id address: /apps/:ws/:installId — local copy only (D8).
    if (isAppId(nameParam)) {
      const install = await readInstall(workspaceId, nameParam);
      if (install) {
        const localManifest = installServingManifest(install);
        if (!localManifest) throw new ServiceError("Not found", 404);
        const role = callerRole(localManifest, sub);
        if (!role) throw new ServiceError("You do not have access to this app", 403);
        const scope = installedScope(localManifest, install);
        const interfaceInstances: Record<string, string> = {};
        for (const [contract, profileId] of Object.entries(install.bindings)) {
          interfaceInstances[contract] = `${contract}`; // profile pin applied at dispatch
          void profileId;
        }
        return {
          manifest: localManifest,
          // Code lives in the installer's copy; credentials still resolve via
          // originAppId lineage when grants need the publisher workspace.
          workspaceId,
          executionWorkspaceId: workspaceId,
          install,
          sub,
          role,
          ctx: {
            workspaceId,
            userId: sub,
            appScope: { ...scope, userId: sub, role },
            traceId: newTraceId(),
          },
        };
      }
    }
    const appId = await resolveAppRef(workspaceId, nameParam).catch(() => undefined);
    manifest = appId ? await readApp(workspaceId, appId).catch(() => undefined) : undefined;
  }

  if (!manifest) throw new ServiceError("Not found", 404);

  const role = callerRole(manifest, sub);
  if (!role) throw new ServiceError("You do not have access to this app", 403);

  const callerWs =
    getAuthMode() === "none"
      ? (c.req.header("X-Aprovan-Workspace") ?? "local")
      : await getCurrentWorkspace(sub).catch(() => undefined);

  // Prefer an install in the caller's workspace of this origin app.
  const install = callerWs
    ? await findInstallByOrigin(callerWs, manifest.appId).catch(() => undefined)
    : undefined;

  if (install && callerWs) {
    // Serve the installer's local copy manifest — never re-read origin.
    const effective = installServingManifest(install, manifest) ?? manifest;
    const scope = installedScope(effective, install);
    return {
      manifest: effective,
      workspaceId: callerWs,
      executionWorkspaceId: callerWs,
      install,
      sub,
      role,
      ctx: {
        workspaceId: callerWs,
        userId: sub,
        appScope: { ...scope, userId: sub, role },
        traceId: newTraceId(),
      },
    };
  }

  const scope: AppPaths = { id: manifest.appId, name: manifest.name, paths: manifest.paths };
  return {
    manifest,
    workspaceId,
    executionWorkspaceId: workspaceId,
    install: undefined,
    sub,
    role,
    ctx: {
      workspaceId,
      userId: sub,
      appScope: { ...scope, userId: sub, role },
      traceId: newTraceId(),
    },
  };
}

// ---------------------------------------------------------------------------
// Per-(app, user) rate limiting
// ---------------------------------------------------------------------------

const appLimiters = new Map<string, RateLimiter>();

function checkAppRateLimit(session: AppSession): boolean {
  const key = `${session.workspaceId}/${session.manifest.appId}:${session.sub}`;
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
// GET — public manifest (alias + id permalink)
// ---------------------------------------------------------------------------

async function handleGetManifest(c: {
  json: (body: unknown, status?: number) => Response;
  req: HonoCtx["req"];
}): Promise<Response> {
  try {
    const session = await resolveAppSession(c);
    const { manifest, workspaceId } = session;
    return c.json({
      appId: manifest.appId,
      name: manifest.name,
      title: manifest.title,
      description: manifest.description,
      visibility: manifest.visibility ?? "private",
      workflows: manifest.workflows ?? [],
      allowedTools: manifest.allowedTools,
      channels: manifest.channels ?? {},
      role: session.role,
      url: `/apps/${workspaceId}/${manifest.name}`,
      liveUrl: `/apps/${workspaceId}/${manifest.name}`,
      permalink: `/apps/id/${manifest.appId}`,
      apiBase: `/api/gateway/apps/${workspaceId}/${manifest.name}`,
      install: session.install
        ? {
            installId: session.install.installId,
            workspaceId: session.executionWorkspaceId,
            root: installRoot(session.install),
            pin: session.install.pin,
            hosting: session.install.hosting,
            hostingWorkspaceId: session.install.hostingWorkspaceId,
            bindings: session.install.bindings,
            config: session.install.config,
          }
        : null,
    });
  } catch (err) {
    return errorResponse(c, err);
  }
}

appsRouter.get("/id/:appId", handleGetManifest);
appsRouter.get("/:workspaceId/:name", handleGetManifest);

// ---------------------------------------------------------------------------
// POST /apps/:workspaceId/:name/tools/:namespace/:procedure
// ---------------------------------------------------------------------------

const handleToolCall = async (c: any) => {
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

    // Declared interface-contract grant: dispatch through the install binding
    // (or tenant default for origin-hosted use). Revoked grants deny.
    if (contractGrantCallable(session.manifest, namespace, procedure) || isInterface(namespace)) {
      if (!contractGrantCallable(session.manifest, namespace, procedure)) {
        recordDispatch(403, `Tool ${namespace}.${procedure} is not allowed for this app`);
        return c.json({ error: `Tool ${namespace}.${procedure} is not allowed for this app` }, 403);
      }
      const profileId = session.install?.bindings[namespace];
      if (session.install && profileId) {
        const holds = await installGrantHolds(
          session.executionWorkspaceId,
          session.install.installId,
          profileId,
        );
        if (holds === false) {
          recordDispatch(403, `Profile grant for ${namespace} was revoked`);
          return c.json({ error: `Profile grant for ${namespace} was revoked` }, 403);
        }
      }
      let data: unknown;
      try {
        // Pin the bound profile when we have an id; invokeTool accepts a
        // profile *name*, so pass the profile id via interfaceInstances as
        // contract → contract (default) and rely on binding resolution — or
        // pass profile id as the profile argument when ungated.
        data = await invokeTool(
          session.ctx,
          namespace,
          procedure,
          await readArgs(c),
          profileId,
        );
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
};

appsRouter.post("/id/:appId/tools/:namespace/:procedure{.*}", handleToolCall);
appsRouter.post("/:workspaceId/:name/tools/:namespace/:procedure{.*}", handleToolCall);

// ---------------------------------------------------------------------------
// POST — workflow run (alias + id permalink)
// ---------------------------------------------------------------------------

const handleWorkflowRun = async (c: any) => {
  try {
    const session = await resolveAppSession(c);
    const requested = c.req.param("workflow")!;
    const workflowName = resolveExportedWorkflow(session.manifest.workflows ?? [], requested);
    if (!workflowName || !workflowCallable(session.manifest, workflowName)) {
      return c.json({ error: `Workflow ${requested} is not exposed by this app` }, 404);
    }
    const rejected = await enforceBudgets(c, session);
    if (rejected) return rejected;

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
};

appsRouter.post("/id/:appId/workflows/:workflow/run", handleWorkflowRun);
appsRouter.post("/:workspaceId/:name/workflows/:workflow/run", handleWorkflowRun);