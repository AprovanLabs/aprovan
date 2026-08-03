/**
 * Workspace member management routes.
 */

import { Hono } from "hono";
import { getIdentityStore } from "../identity/store.js";
import { listMembers, removeMember } from "../memberships.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

export const membersRouter = new Hono();

membersRouter.use("*", requireAuth, requireAdmin);

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

  const users = await getIdentityStore().users.getMany(members.map((m) => m.userId));
  const userById = new Map(users.map((user) => [user.sub, user]));

  return c.json({
    members: members.map((m) => {
      const user = userById.get(m.userId);
      return {
        userId: m.userId,
        role: m.role ?? "member",
        createdAt: m.createdAt,
        ...(user?.email ? { email: user.email } : {}),
        ...(user?.name ? { name: user.name } : {}),
      };
    }),
  });
});

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
