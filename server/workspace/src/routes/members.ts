/**
 * Workspace member management routes.
 *
 * GET    /members         — admin only; list members of the active workspace
 * DELETE /members/:userId — admin only; remove a member from the workspace
 */

import { Hono } from "hono";
import { listMembers, removeMember } from "../memberships.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

export const membersRouter = new Hono();

membersRouter.use("*", requireAuth, requireAdmin);

// ---------------------------------------------------------------------------
// GET /members
// ---------------------------------------------------------------------------

membersRouter.get("/", async (c) => {
  const principal = c.get("principal");

  let members;
  try {
    members = await listMembers(principal.workspaceId);
  } catch (err) {
    process.stderr.write(
      `[gateway] listMembers failed: ${err instanceof Error ? err.message : String(err)}\n`,
    );
    return c.json({ error: "Failed to list members" }, 500);
  }

  return c.json({
    members: members.map((m) => ({
      userId: m.userId,
      role: m.role ?? "member",
      createdAt: m.createdAt,
    })),
  });
});

// ---------------------------------------------------------------------------
// DELETE /members/:userId
// ---------------------------------------------------------------------------

membersRouter.delete("/:userId", async (c) => {
  const principal = c.get("principal");
  const targetSub = c.req.param("userId");

  if (targetSub === principal.sub) {
    return c.json({ error: "Cannot remove yourself from the workspace" }, 400);
  }

  let removed;
  try {
    removed = await removeMember(principal.workspaceId, targetSub);
  } catch (err) {
    process.stderr.write(
      `[gateway] removeMember failed: ${err instanceof Error ? err.message : String(err)}\n`,
    );
    return c.json({ error: "Failed to remove member" }, 500);
  }

  if (!removed) {
    return c.json({ error: "Member not found" }, 404);
  }
  return c.json({ removed: true });
});
