/**
 * Permission management routes.
 *
 * Only workspace admins may manage permissions.
 *
 * POST   /permissions          — grant a permission
 * GET    /permissions          — list permissions (optionally filter by callerId)
 * DELETE /permissions/:id      — revoke a permission
 */

import { Hono } from "hono";
import { z } from "zod";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { getPermissionStore, type GrantInput } from "../permissions.js";

export const permissionsRouter = new Hono();

permissionsRouter.use("*", requireAuth, requireAdmin);

const grantSchema = z.object({
  callerId: z.string().min(1),
  provider: z.string().min(1),
  operation: z.string().min(1),
});

// ---------------------------------------------------------------------------
// POST /permissions
// ---------------------------------------------------------------------------

permissionsRouter.post("/", validateBody(grantSchema), async (c) => {
  const principal = c.get("principal");
  const workspaceId = principal.workspaceId;

  const input: GrantInput = {
    ...c.req.valid("json"),
    grantedBy: principal.sub,
  };

  const store = getPermissionStore();
  const perm = await store.grant(workspaceId, input);
  return c.json(perm, 201);
});

// ---------------------------------------------------------------------------
// GET /permissions
// ---------------------------------------------------------------------------

permissionsRouter.get("/", async (c) => {
  const principal = c.get("principal");
  const workspaceId = principal.workspaceId;
  const callerId = c.req.query("callerId");

  const store = getPermissionStore();
  const perms = await store.list(workspaceId, callerId);
  return c.json({ permissions: perms });
});

// ---------------------------------------------------------------------------
// DELETE /permissions/:id
// ---------------------------------------------------------------------------

permissionsRouter.delete("/:id", async (c) => {
  const principal = c.get("principal");
  const workspaceId = principal.workspaceId;
  const id = c.req.param("id") ?? "";

  if (!id) {
    return c.json({ error: "Missing permission id" }, 400);
  }

  const store = getPermissionStore();
  const revoked = await store.revoke(workspaceId, id);

  if (!revoked) {
    return c.json({ error: "Permission not found" }, 404);
  }
  return c.json({ revoked: true });
});
