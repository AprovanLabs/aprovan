/**
 * The sandbox host relay — the only way a machine that cannot be dialed still
 * acts as a sandbox host.
 *
 *   POST /sandbox-hosts/:workspaceId/:hostId/rpc      client token → enqueue
 *   POST /sandbox-hosts/:workspaceId/:hostId/lease    host token   → long-poll
 *   POST /sandbox-hosts/:workspaceId/:hostId/result   host token   → answer
 *   POST /sandbox-hosts/:workspaceId/:hostId/advert   host token   → capabilities
 *   POST /sandbox-hosts/:workspaceId/:hostId/claim    host token   → take a run
 *
 * Mounted ahead of Cognito auth, like `/hooks`, and authenticated the same
 * way: per-registration tokens minted by `sandboxes.registerHost`, stored as
 * digests, compared in constant time. The workspace is in the path rather
 * than inside the token so there is no global index to keep — exactly the
 * shape the provider-webhook routes already use.
 *
 * The two tokens are two principals, and keeping them apart is the security
 * property that matters: the **client** token can only ask for work, and it
 * is what a workspace stores as its `machine` provider credential; the **host**
 * token can only take and answer work, and it lives on the machine. A leaked
 * workspace credential therefore cannot impersonate the machine, and a leaked
 * machine token cannot enqueue commands for other hosts.
 *
 * `/rpc` is the shape `@utdk/sandbox/rpc` speaks, so from the provider
 * module's side this relay simply *is* the host's REST API.
 */

import { DEFAULT_EXEC_TIMEOUT_MS, resolveSandboxImage } from "@utdk/sandbox";
import { Hono } from "hono";
import { MAX_CLAIM_WAIT_MS } from "../sandboxes/queue.js";
import { completeOp, dispatchToHost, leaseOps, MAX_LEASE_WAIT_MS } from "../sandboxes/relay.js";
import { claimRunForHost } from "../sandboxes/service.js";
import { readHost, saveHost, tokenMatches, type SandboxHostRecord } from "../sandboxes/store.js";

/**
 * What a machine must have on PATH to run an image, read from the image's own
 * `base.machine.require`.
 *
 * `null` means the descriptor could not be resolved, and that is deliberately
 * *not* the same as "requires nothing". An unresolvable image must fail
 * closed: an empty requirement list is vacuously satisfied by every machine,
 * so treating a 404 as "no requirements" would have a typo'd image name
 * verify everywhere and then fail at provision time — the exact class of
 * silent mismatch this handshake exists to prevent.
 */
const requirementCache = new Map<string, unknown>();

async function imageRequirements(spec: string): Promise<string[] | null> {
  try {
    const image = await resolveSandboxImage(spec, {
      provider: "machine",
      cache: requirementCache,
      ...(process.env["SANDBOX_IMAGE_CDN"] ? { cdnBaseUrl: process.env["SANDBOX_IMAGE_CDN"] } : {}),
    });
    const base = image.base as { require?: unknown } | undefined;
    if (Array.isArray(base?.require)) {
      // `node>=20` carries a version constraint a PATH probe cannot answer;
      // the binary name is the part a machine can actually check.
      return base.require.map((entry) => String(entry).split(/[<>=@\s]/u)[0]!).filter(Boolean);
    }
    return image.tools.map((tool) => tool.name);
  } catch {
    return null;
  }
}

export const sandboxHostsRouter = new Hono();

type Principal = "host" | "client";

function bearer(header: string | undefined): string | undefined {
  const match = /^Bearer\s+(.+)$/iu.exec(header ?? "");
  return match?.[1];
}

/**
 * Resolve the registration and check the token for the principal this route
 * serves. Returns undefined rather than a reason: a caller with the wrong
 * token learns only that it was rejected.
 */
async function authorize(
  workspaceId: string,
  hostId: string,
  token: string | undefined,
  principal: Principal,
): Promise<SandboxHostRecord | undefined> {
  if (!token) return undefined;
  const host = await readHost(workspaceId, hostId).catch(() => undefined);
  if (!host) return undefined;
  const digest = principal === "host" ? host.hostTokenHash : host.clientTokenHash;
  try {
    return tokenMatches(token, digest) ? host : undefined;
  } catch {
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// Client side — the provider module
// ---------------------------------------------------------------------------

sandboxHostsRouter.post("/:workspaceId/:hostId/rpc", async (c) => {
  const workspaceId = c.req.param("workspaceId");
  const hostId = c.req.param("hostId");
  const host = await authorize(workspaceId, hostId, bearer(c.req.header("Authorization")), "client");
  if (!host) return c.json({ error: "Unauthorized" }, 401);

  let body: { op?: unknown; args?: unknown };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Expected { op, args }" }, 400);
  }
  if (typeof body.op !== "string" || !body.op) {
    return c.json({ error: "op must be a driver operation name" }, 400);
  }
  const args = (body.args ?? {}) as Record<string, unknown>;
  const timeoutMs =
    typeof args["timeoutMs"] === "number" && args["timeoutMs"] > 0
      ? args["timeoutMs"]
      : DEFAULT_EXEC_TIMEOUT_MS;

  try {
    const result = await dispatchToHost(workspaceId, hostId, { op: body.op, args, timeoutMs });
    return c.json(result);
  } catch (err) {
    const status = (err as { status?: number }).status ?? 502;
    return c.json({ error: err instanceof Error ? err.message : String(err) }, status as 502);
  }
});

// ---------------------------------------------------------------------------
// Host side — the `aprovan sandbox host run` agent
// ---------------------------------------------------------------------------

sandboxHostsRouter.post("/:workspaceId/:hostId/lease", async (c) => {
  const workspaceId = c.req.param("workspaceId");
  const hostId = c.req.param("hostId");
  const host = await authorize(workspaceId, hostId, bearer(c.req.header("Authorization")), "host");
  if (!host) return c.json({ error: "Unauthorized" }, 401);

  const body: { maxWaitMs?: number; limit?: number } = await c.req
    .json<{ maxWaitMs?: number; limit?: number }>()
    .catch(() => ({}));
  const ops = await leaseOps(workspaceId, hostId, {
    maxWaitMs: Math.min(body.maxWaitMs ?? MAX_LEASE_WAIT_MS, MAX_LEASE_WAIT_MS),
    ...(body.limit ? { limit: body.limit } : {}),
  });

  // A lease is also the liveness signal — `sandboxes.hosts` shows it, so a
  // silent agent is visible before someone waits 30s for a timeout.
  host.lastSeenAt = new Date().toISOString();
  await saveHost(workspaceId, host).catch(() => undefined);

  return c.json({ ops, root: host.root ?? null });
});

/**
 * The capability handshake, in two steps because neither side can answer
 * alone. The gateway knows which images the host registered and what each one
 * requires of a machine; the machine knows what is actually installed.
 *
 *   POST /advert {}                    → { probe: [...] }  what to look for
 *   POST /advert { tools, platform }   → { images: [...] }  what it may take
 *
 * Only images whose requirements verified are stored, so a box that lost its
 * Node install stops being offered Node work at its next restart rather than
 * failing runs it should never have been given.
 */
sandboxHostsRouter.post("/:workspaceId/:hostId/advert", async (c) => {
  const workspaceId = c.req.param("workspaceId");
  const hostId = c.req.param("hostId");
  const host = await authorize(workspaceId, hostId, bearer(c.req.header("Authorization")), "host");
  if (!host) return c.json({ error: "Unauthorized" }, 401);

  const body: { tools?: unknown; platform?: unknown } = await c.req.json().catch(() => ({}));
  const declared = host.images ?? [];

  if (!Array.isArray(body.tools)) {
    // Step one: what should this machine look for?
    const probe = new Set<string>();
    for (const image of declared) {
      for (const tool of (await imageRequirements(image)) ?? []) probe.add(tool);
    }
    return c.json({ probe: [...probe].sort(), images: declared });
  }

  // Step two: keep the images this machine actually satisfies.
  const tools = body.tools.filter((tool): tool is string => typeof tool === "string");
  const present = new Set(tools);
  const verified: string[] = [];
  const unresolved: string[] = [];
  for (const image of declared) {
    const required = await imageRequirements(image);
    if (required === null) unresolved.push(image);
    else if (required.every((tool) => present.has(tool))) verified.push(image);
  }

  host.tools = tools;
  host.verifiedImages = verified;
  if (typeof body.platform === "string") host.platform = body.platform;
  host.lastSeenAt = new Date().toISOString();
  await saveHost(workspaceId, host);

  return c.json({
    images: verified,
    skipped: declared.filter((image) => !verified.includes(image)),
    // Called out separately: "this machine lacks Node" and "nobody can
    // describe that image" need different fixes.
    unresolved,
  });
});

/**
 * Offer this machine for a scheduled run. Long-polls for the oldest pending
 * run keyed to an image the host verified; the gateway then drives the run
 * down the ordinary path while the agent goes back to polling.
 */
sandboxHostsRouter.post("/:workspaceId/:hostId/claim", async (c) => {
  const workspaceId = c.req.param("workspaceId");
  const hostId = c.req.param("hostId");
  const host = await authorize(workspaceId, hostId, bearer(c.req.header("Authorization")), "host");
  if (!host) return c.json({ error: "Unauthorized" }, 401);

  const body: { maxWaitMs?: number } = await c.req.json().catch(() => ({}));
  const run = await claimRunForHost(workspaceId, host, {
    maxWaitMs: Math.min(body.maxWaitMs ?? MAX_CLAIM_WAIT_MS, MAX_CLAIM_WAIT_MS),
  });

  host.lastSeenAt = new Date().toISOString();
  await saveHost(workspaceId, host).catch(() => undefined);

  return c.json({
    run: run ? { id: run.id, image: run.image, workflow: run.workflow } : null,
  });
});

sandboxHostsRouter.post("/:workspaceId/:hostId/result", async (c) => {
  const workspaceId = c.req.param("workspaceId");
  const hostId = c.req.param("hostId");
  const host = await authorize(workspaceId, hostId, bearer(c.req.header("Authorization")), "host");
  if (!host) return c.json({ error: "Unauthorized" }, 401);

  let body: { id?: unknown; data?: unknown; error?: unknown };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Expected { id, data? , error? }" }, 400);
  }
  if (typeof body.id !== "string" || !body.id) {
    return c.json({ error: "id must be the leased op id" }, 400);
  }
  return c.json(
    await completeOp(workspaceId, hostId, {
      id: body.id,
      ...(body.error !== undefined && body.error !== null
        ? { error: String(body.error) }
        : { data: body.data }),
    }),
  );
});
