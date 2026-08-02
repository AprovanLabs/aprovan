/**
 * Session routes — the registry UI's auth entry point.
 *
 *   GET  /session           — `{ activeWorkspaceId, workspaces: [{ id, name, role }] }`
 *   POST /session/workspace — select the active workspace (`{ workspaceId }`)
 *
 * These run *before* `requireAuth` resolves a workspace: the client calls them
 * with a bare Cognito access token to discover its workspaces and pick one. The
 * auth middleware (`middleware/auth.ts`) then scopes every subsequent request
 * to `Sessions[sub].currentWorkspaceId`.
 *
 * `POST /auth/sessions` (APR-280) is the legacy alias of `POST /session/workspace`
 * and shares `selectActiveWorkspace` below.
 */

import { Hono } from "hono";
import { getMembership, listMembershipsForUser } from "../memberships.js";
import { getAuthMode, readBearerToken, verifyAccessToken } from "../middleware/auth.js";
import { getCurrentWorkspace, setCurrentWorkspace } from "../sessions.js";
import { getActiveWorkspaceId, setActiveWorkspaceId } from "../users.js";
import { getWorkspaces } from "../workspaces.js";

export const sessionRouter = new Hono();

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/** Authenticate via a bare Cognito access token, returning the user sub. */
async function requireCognitoSub(c: ContextLike): Promise<string | Response> {
  // Local mode (auth "none"): one implicit user. The whole session surface
  // short-circuits to the "local" identity — no Cognito, no DynamoDB.
  if (getAuthMode() === "none") return "local";
  const accessToken = readBearerToken(c);
  if (!accessToken) {
    return c.json({ error: "Missing or invalid Authorization header" }, 401);
  }
  try {
    return await verifyAccessToken(accessToken);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    process.stderr.write(`[gateway] cognito verify failed: ${detail}\n`);
    return c.json({ error: "Invalid or expired Cognito token", detail }, 401);
  }
}

export interface SelectResult {
  ok: true;
  workspaceId: string;
}
export interface SelectError {
  ok: false;
  status: 403 | 500;
  body: Record<string, unknown>;
}

/**
 * Validate that `userId` is a member of `workspaceId` and persist it as the
 * active workspace. Shared by `POST /session/workspace` and the legacy
 * `POST /auth/sessions` alias.
 */
export async function selectActiveWorkspace(
  userId: string,
  workspaceId: string,
): Promise<SelectResult | SelectError> {
  // Local mode: the only workspace is "local" and it's always selected —
  // nothing to validate, nothing to persist.
  if (getAuthMode() === "none") {
    return workspaceId === "local"
      ? { ok: true, workspaceId }
      : { ok: false, status: 403, body: { error: "Local mode has one workspace: local" } };
  }
  let membership;
  try {
    membership = await getMembership(workspaceId, userId);
  } catch (err) {
    process.stderr.write(
      `[gateway] membership read failed: ${err instanceof Error ? err.message : String(err)}\n`,
    );
    return { ok: false, status: 500, body: { error: "Failed to resolve membership" } };
  }
  if (!membership) {
    return { ok: false, status: 403, body: { error: "No membership in that workspace" } };
  }
  try {
    await setActiveWorkspaceId(userId, workspaceId);
    await setCurrentWorkspace(userId, workspaceId);
  } catch (err) {
    process.stderr.write(
      `[gateway] session write failed: ${err instanceof Error ? err.message : String(err)}\n`,
    );
    return { ok: false, status: 500, body: { error: "Failed to persist workspace selection" } };
  }
  return { ok: true, workspaceId };
}

// Minimal Hono context shape (avoids importing `Context` for the helper).
interface ContextLike {
  req: {
    header(name: string): string | undefined;
  };
  json(body: unknown, status?: number): Response;
}

// ---------------------------------------------------------------------------
// GET /session — active workspace + workspace list for the picker
// ---------------------------------------------------------------------------

sessionRouter.get("/", async (c) => {
  const sub = await requireCognitoSub(c);
  if (sub instanceof Response) return sub;

  if (getAuthMode() === "none") {
    return c.json({
      activeWorkspaceId: "local",
      workspaces: [{ id: "local", name: "Local workspace", role: "admin" }],
    });
  }

  let activeWorkspaceId: string | undefined;
  try {
    // Prefer the durable Users row; fall back to the ephemeral Sessions row
    // for users who selected a workspace before activeWorkspaceId existed.
    activeWorkspaceId = await getActiveWorkspaceId(sub);
    if (!activeWorkspaceId) {
      activeWorkspaceId = await getCurrentWorkspace(sub);
    }
  } catch (err) {
    process.stderr.write(
      `[gateway] session read failed: ${err instanceof Error ? err.message : String(err)}\n`,
    );
    return c.json({ error: "Failed to read session" }, 500);
  }

  let memberships;
  try {
    memberships = await listMembershipsForUser(sub);
  } catch (err) {
    process.stderr.write(
      `[gateway] listMembershipsForUser failed: ${err instanceof Error ? err.message : String(err)}\n`,
    );
    return c.json({ error: "Failed to load memberships" }, 500);
  }

  // Resolve a name for each workspace in one fan-out.
  const workspaceIds = memberships.map((m) => m.workspaceId);
  let workspaces: { id: string; name: string; role: string }[] = [];
  if (workspaceIds.length > 0) {
    try {
      const rows = await getWorkspaces(workspaceIds);
      const nameById = new Map(rows.map((r) => [r.workspaceId, r.name]));
      workspaces = memberships.map((m) => ({
        id: m.workspaceId,
        name: nameById.get(m.workspaceId) ?? m.workspaceId,
        role: m.role ?? "member",
      }));
    } catch (err) {
      process.stderr.write(
        `[gateway] getWorkspaces failed: ${err instanceof Error ? err.message : String(err)}\n`,
      );
      return c.json({ error: "Failed to load workspaces" }, 500);
    }
  }

  return c.json({
    activeWorkspaceId: activeWorkspaceId ?? null,
    workspaces,
  });
});

// ---------------------------------------------------------------------------
// POST /session/workspace — select the active workspace
// ---------------------------------------------------------------------------

sessionRouter.post("/workspace", async (c) => {
  const sub = await requireCognitoSub(c);
  if (sub instanceof Response) return sub;

  let workspaceId: string | undefined;
  try {
    const body = await c.req.json<{ workspaceId?: string }>();
    if (typeof body?.workspaceId === "string" && body.workspaceId.length > 0) {
      workspaceId = body.workspaceId;
    }
  } catch {
    // empty body is fine
  }

  if (!workspaceId) {
    return c.json(
      { error: "workspaceId is required", code: "workspace_not_selected" },
      400,
    );
  }

  const result = await selectActiveWorkspace(sub, workspaceId);
  if (!result.ok) {
    return c.json(result.body, result.status);
  }
  return c.json({ activeWorkspaceId: result.workspaceId });
});
