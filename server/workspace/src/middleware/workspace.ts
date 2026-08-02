/**
 * Workspace membership middleware.
 *
 * Validates that the authenticated principal is a member of the workspace
 * identified in the URL path parameter `:workspaceId`. Must run after
 * `requireAuth`.
 *
 * Two 403 cases:
 *   - `workspace_mismatch` — the principal's active workspace differs from the
 *     URL param (defense-in-depth; they should match when tokens are fresh).
 *   - `not_a_member` — the membership row for (workspaceId, sub) is absent.
 */

import { getMembership } from "../memberships.js";
import type { Context, Next } from "hono";

export async function requireWorkspaceMembership(c: Context, next: Next): Promise<Response | void> {
  const urlWorkspaceId = c.req.param("workspaceId");
  const principal = c.get("principal");

  if (principal.workspaceId !== urlWorkspaceId) {
    return c.json({ error: "workspace_mismatch" }, 403);
  }

  const membership = await getMembership(urlWorkspaceId, principal.sub);
  if (!membership) {
    return c.json({ error: "not_a_member" }, 403);
  }

  await next();
}
