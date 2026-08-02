/**
 * Public workflow entry points that don't ride Cognito auth:
 *
 *   POST /hooks/:workspaceId/webhooks/:id — provider webhook delivery
 *     (GitHub, Figma, Stripe, …). Authenticated by the registration's HMAC
 *     signature config when present, else by the inbound token
 *     (X-Hook-Token / ?token=). Fans out to the registration's workflows
 *     with { provider, event, payload } as `input`.
 *
 *   POST /hooks/:workspaceId/:name        — per-workflow webhook trigger.
 *     Callers authenticate with the per-workflow hook token (X-Hook-Token
 *     header or ?token=), minted at registration. The request body becomes
 *     the run's `input`.
 *
 *   POST /hooks/cron/tick                 — scheduler tick: runs every cron
 *     workflow whose expression matches the current UTC minute, across all
 *     workspaces that have registrations. The workspace ticks itself (see
 *     runtime/cron.ts); this route exists to force a tick by hand, and is
 *     therefore gated by `WORKSPACE_CRON_SECRET` wherever auth is on.
 */

import { createHmac, timingSafeEqual } from "node:crypto";
import { Hono } from "hono";
import { getAuthMode } from "../middleware/auth.js";
import { readWebhook, saveWebhook, type WebhookRegistration } from "../webhooks/store.js";
import { cronMatches } from "../workflows/cron.js";
import { runWorkflow } from "../workflows/runner.js";
import {
  listRegistrations,
  readRegistration,
  workspacesWithCronWorkflows,
} from "../workflows/store.js";

export const hooksRouter = new Hono();

// ---------------------------------------------------------------------------
// Cron tick
// ---------------------------------------------------------------------------

export async function runCronTick(now = new Date()): Promise<{ ran: string[] }> {
  const ran: string[] = [];
  for (const workspaceId of await workspacesWithCronWorkflows()) {
    let registrations;
    try {
      registrations = await listRegistrations(workspaceId);
    } catch {
      continue;
    }
    for (const registration of registrations) {
      const cron = registration.triggers.cron;
      if (!cron) continue;
      let matches = false;
      try {
        matches = cronMatches(cron, now);
      } catch {
        continue; // invalid expression — registration validated it, but stay safe
      }
      if (!matches) continue;
      ran.push(`${workspaceId}/${registration.name}`);
      void runWorkflow({
        workspaceId,
        userId: registration.createdBy,
        registration,
        trigger: "cron",
        triggerDetail: cron,
        input: { firedAt: now.toISOString() },
      }).catch(() => undefined);
    }
  }
  return { ran };
}

hooksRouter.post("/cron/tick", async (c) => {
  const secret = process.env["WORKSPACE_CRON_SECRET"];
  // This route runs every cron workflow in every workspace, and it is mounted
  // ahead of requireAuth. Leaving it open is only acceptable where nothing
  // else is authenticated either; anywhere auth is on, a missing secret is a
  // misconfiguration and must fail closed rather than fail open.
  if (getAuthMode() !== "none" && !secret) {
    return c.json({ error: "Forbidden" }, 403);
  }
  if (secret && c.req.header("x-cron-secret") !== secret) {
    return c.json({ error: "Forbidden" }, 403);
  }
  const result = await runCronTick();
  return c.json(result);
});

// ---------------------------------------------------------------------------
// Provider webhook delivery
// ---------------------------------------------------------------------------

/**
 * Verify a provider HMAC signature over the raw body. Accepts both bare hex
 * digests and the common "<scheme>=<hex>" form (GitHub's
 * `sha256=<hex>`), compared timing-safely.
 */
function signatureValid(
  registration: WebhookRegistration,
  rawBody: string,
  header: string | undefined,
): boolean {
  const signature = registration.signature;
  if (!signature || !header) return false;
  const algorithm = signature.scheme === "hmac-sha1" ? "sha1" : "sha256";
  const digest = createHmac(algorithm, signature.secret).update(rawBody).digest("hex");
  const presented = header.includes("=") ? header.slice(header.indexOf("=") + 1) : header;
  try {
    return timingSafeEqual(Buffer.from(digest, "hex"), Buffer.from(presented, "hex"));
  } catch {
    return false;
  }
}

/** Best-effort provider event name from common delivery headers/body keys. */
function deliveryEvent(
  headers: { header(name: string): string | undefined },
  payload: unknown,
): string | undefined {
  const fromHeader =
    headers.header("x-github-event") ??
    headers.header("x-event-key") ?? // bitbucket / atlassian
    headers.header("x-figma-event-type") ??
    headers.header("x-webhook-event");
  if (fromHeader) return fromHeader;
  if (payload && typeof payload === "object") {
    const body = payload as Record<string, unknown>;
    for (const key of ["event", "event_type", "type", "action"]) {
      if (typeof body[key] === "string") return body[key] as string;
    }
  }
  return undefined;
}

hooksRouter.post("/:workspaceId/webhooks/:id", async (c) => {
  const workspaceId = c.req.param("workspaceId");
  const id = c.req.param("id");
  if (!workspaceId || !id) return c.json({ error: "Not found" }, 404);

  const registration = await readWebhook(workspaceId, id).catch(() => undefined);
  if (!registration) return c.json({ error: "Not found" }, 404);

  const rawBody = await c.req.text().catch(() => "");

  // Signature verification wins when configured; the inbound token is the
  // fallback for providers without payload signing.
  const signatureHeader = registration.signature
    ? c.req.header(registration.signature.header.toLowerCase())
    : undefined;
  const authorized = registration.signature
    ? signatureValid(registration, rawBody, signatureHeader)
    : (c.req.header("x-hook-token") ?? c.req.query("token")) === registration.token;
  if (!authorized) {
    registration.lastError = "unauthorized delivery rejected";
    await saveWebhook(workspaceId, registration).catch(() => undefined);
    return c.json({ error: "Forbidden" }, 403);
  }

  let payload: unknown = rawBody;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    // keep raw text
  }
  const event = deliveryEvent(c.req, payload);

  // Optional event filter: when the registration lists events, unlisted
  // deliveries are acknowledged but don't run workflows (providers often
  // send pings/unsubscribed events).
  const events = registration.events ?? [];
  const matches = events.length === 0 || (event !== undefined && events.includes(event));

  const runs: Array<{ workflow: string; runId?: string; status: string }> = [];
  if (matches) {
    for (const workflowName of registration.workflows) {
      const workflow = await readRegistration(workspaceId, workflowName).catch(() => undefined);
      if (!workflow) {
        runs.push({ workflow: workflowName, status: "missing" });
        continue;
      }
      const run = await runWorkflow({
        workspaceId,
        userId: registration.userId ?? registration.createdBy,
        registration: workflow,
        trigger: "webhook",
        triggerDetail: `${registration.provider}:${registration.id}${event ? `:${event}` : ""}`,
        input: { provider: registration.provider, event: event ?? null, payload },
      }).catch((err: unknown) => ({
        id: undefined,
        status: "failed" as const,
        error: err instanceof Error ? err.message : String(err),
      }));
      runs.push({ workflow: workflowName, runId: run.id, status: run.status });
    }
  }

  const failed = runs.find((r) => r.status === "failed" || r.status === "missing");
  registration.deliveryCount = (registration.deliveryCount ?? 0) + 1;
  registration.lastDeliveryAt = new Date().toISOString();
  registration.lastEvent = event;
  registration.lastError = failed ? `${failed.workflow}: ${failed.status}` : undefined;
  await saveWebhook(workspaceId, registration).catch(() => undefined);

  return c.json({ id: registration.id, event: event ?? null, matched: matches, runs });
});

// ---------------------------------------------------------------------------
// Webhook trigger
// ---------------------------------------------------------------------------

hooksRouter.post("/:workspaceId/:name", async (c) => {
  const workspaceId = c.req.param("workspaceId");
  const name = c.req.param("name");
  if (!workspaceId || !name) return c.json({ error: "Not found" }, 404);

  const registration = await readRegistration(workspaceId, name).catch(() => undefined);
  if (!registration?.triggers.webhook || !registration.hookToken) {
    return c.json({ error: "Not found" }, 404);
  }

  const token = c.req.header("x-hook-token") ?? c.req.query("token");
  if (token !== registration.hookToken) {
    return c.json({ error: "Forbidden" }, 403);
  }

  let body: unknown = null;
  try {
    body = await c.req.json();
  } catch {
    // Non-JSON bodies arrive as text.
    try {
      body = await c.req.text();
    } catch {
      body = null;
    }
  }

  const run = await runWorkflow({
    workspaceId,
    userId: registration.createdBy,
    registration,
    trigger: "webhook",
    input: body,
  });

  return c.json(
    {
      runId: run.id,
      status: run.status,
      durationMs: run.durationMs,
      result: run.result ?? null,
      error: run.error,
    },
    run.status === "failed" ? 500 : 200,
  );
});

