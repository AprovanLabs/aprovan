/**
 * Groups + grants admin routes.
 *
 * All routes require admin role (requireAuth + requireAdmin).
 * No response ever includes a credential payload.
 *
 * POST   /groups                         — create a workspace group
 * GET    /groups                         — list workspace groups
 * GET    /groups/:id                     — get a single group
 * PATCH  /groups/:id                     — update group name / description
 * DELETE /groups/:id                     — delete group (cascades grants)
 *
 * GET    /groups/:id/users               — list users in a group
 * POST   /groups/:id/users               — add a user to a group
 * DELETE /groups/:id/users               — remove a user from a group
 *
 * GET    /groups/:id/profiles            — profiles attached to a group
 * POST   /groups/:id/profiles            — attach a profile (idempotent)
 * DELETE /groups/:id/profiles            — detach a profile
 *
 * Workspace profile CRUD lives in `routes/profiles.ts` (mounted at /profiles).
 */

import { Hono, type Context } from "hono";
import { z } from "zod";
import { listGroupUserIds,
  addUserToGroup,
  createGroup,
  deleteGroup,
  getGroup,
  listGroups,
  removeUserFromGroup,
  updateGroup,
} from "../groups.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import {
  attachProfileToGroup,
  detachProfileFromGroup,
  listGroupProfiles,
} from "../profile-grants.js";
import { ServiceError } from "../service-kernel.js";

export const groupsRouter = new Hono();

groupsRouter.use("*", requireAuth, requireAdmin);

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const createGroupSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().optional(),
});

const patchGroupSchema = z.object({
  name: z.string().trim().min(1).optional(),
  description: z.string().optional(),
});

const userSubSchema = z.object({ userId: z.string().min(1) });

/** Profile reference: a profile id, or a name unique in the workspace. */
const profileRefSchema = z.object({ profile: z.string().trim().min(1) });

// ---------------------------------------------------------------------------
// POST /groups
// ---------------------------------------------------------------------------

groupsRouter.post("/", validateBody(createGroupSchema), async (c) => {
  const { workspaceId } = c.get("principal");
  const { name, description } = c.req.valid("json");
  const group = await createGroup(workspaceId, name, description);
  return c.json(group, 201);
});

// ---------------------------------------------------------------------------
// GET /groups
// ---------------------------------------------------------------------------

groupsRouter.get("/", async (c) => {
  const { workspaceId } = c.get("principal");

  const groups = await listGroups(workspaceId);
  return c.json({ groups });
});

// ---------------------------------------------------------------------------
// GET /groups/:id
// ---------------------------------------------------------------------------

groupsRouter.get("/:id", async (c) => {
  const principal = c.get("principal");
  const workspaceId = principal.workspaceId;
  const groupId = c.req.param("id");

  const group = await getGroup(workspaceId, groupId);
  if (!group) return c.json({ error: "Group not found" }, 404);
  return c.json(group);
});

// ---------------------------------------------------------------------------
// PATCH /groups/:id
// ---------------------------------------------------------------------------

groupsRouter.patch("/:id", validateBody(patchGroupSchema), async (c) => {
  const { workspaceId } = c.get("principal");
  const groupId = c.req.param("id");
  const { name, description } = c.req.valid("json");
  const updated = await updateGroup(workspaceId, groupId, { name, description });
  if (!updated) {
    return c.json({ error: "Group not found" }, 404);
  }
  return c.json(updated);
});

// ---------------------------------------------------------------------------
// DELETE /groups/:id
// ---------------------------------------------------------------------------

groupsRouter.delete("/:id", async (c) => {
  const { workspaceId } = c.get("principal");
  const groupId = c.req.param("id");

  const deleted = await deleteGroup(workspaceId, groupId);
  if (!deleted) {
    return c.json({ error: "Group not found" }, 404);
  }
  return c.json({ deleted: true });
});

// ---------------------------------------------------------------------------
// GET /groups/:id/users — list members of a group
// ---------------------------------------------------------------------------

groupsRouter.get("/:id/users", async (c) => {
  const principal = c.get("principal");
  const workspaceId = principal.workspaceId;
  const groupId = c.req.param("id");

  const group = await getGroup(workspaceId, groupId);
  if (!group) return c.json({ error: "Group not found" }, 404);

  const userIds = await listGroupUserIds(workspaceId, groupId);
  return c.json({ groupId, userIds });
});

// ---------------------------------------------------------------------------
// POST /groups/:id/users
// ---------------------------------------------------------------------------

groupsRouter.post("/:id/users", validateBody(userSubSchema), async (c) => {
  const { workspaceId } = c.get("principal");
  const groupId = c.req.param("id");
  const { userId } = c.req.valid("json");

  const group = await getGroup(workspaceId, groupId);
  if (!group) return c.json({ error: "Group not found" }, 404);

  await addUserToGroup(workspaceId, groupId, userId);
  return c.json({ workspaceId, groupId, userId }, 201);
});

// ---------------------------------------------------------------------------
// DELETE /groups/:id/users
// ---------------------------------------------------------------------------

groupsRouter.delete("/:id/users", validateBody(userSubSchema), async (c) => {
  const { workspaceId } = c.get("principal");
  const groupId = c.req.param("id");
  const { userId } = c.req.valid("json");
  const removed = await removeUserFromGroup(workspaceId, groupId, userId);
  if (!removed) {
    return c.json({ error: "User not found in group" }, 404);
  }
  return c.json({ removed: true });
});

// ---------------------------------------------------------------------------
// Group ↔ profile membership (specs group-profile-grants) — thin HTTP over
// profile-grants.ts; failures surface as their ServiceError status.
// ---------------------------------------------------------------------------

function profileErrorResponse(c: Context, err: unknown): Response {
  if (err instanceof ServiceError) {
    return c.json({ error: err.message }, err.status as 400);
  }
  throw err;
}

// GET /groups/:id/profiles — profiles attached to the group.
groupsRouter.get("/:id/profiles", async (c) => {
  const { workspaceId } = c.get("principal");
  const groupId = c.req.param("id");

  const group = await getGroup(workspaceId, groupId);
  if (!group) return c.json({ error: "Group not found" }, 404);

  try {
    return c.json({ profiles: await listGroupProfiles(workspaceId, groupId) });
  } catch (err) {
    return profileErrorResponse(c, err);
  }
});

// POST /groups/:id/profiles — attach (idempotent; 404 on unknown profile).
groupsRouter.post("/:id/profiles", validateBody(profileRefSchema), async (c) => {
  const principal = c.get("principal");
  const workspaceId = principal.workspaceId;
  const groupId = c.req.param("id");
  const { profile } = c.req.valid("json");

  const group = await getGroup(workspaceId, groupId);
  if (!group) return c.json({ error: "Group not found" }, 404);

  try {
    const attached = await attachProfileToGroup(workspaceId, groupId, profile, principal.sub);
    return c.json(attached, 201);
  } catch (err) {
    return profileErrorResponse(c, err);
  }
});

// DELETE /groups/:id/profiles — detach.
groupsRouter.delete("/:id/profiles", validateBody(profileRefSchema), async (c) => {
  const { workspaceId } = c.get("principal");
  const groupId = c.req.param("id");
  const { profile } = c.req.valid("json");

  const group = await getGroup(workspaceId, groupId);
  if (!group) return c.json({ error: "Group not found" }, 404);

  try {
    const removed = await detachProfileFromGroup(workspaceId, groupId, profile);
    if (!removed) return c.json({ error: "Profile not attached to this group" }, 404);
    return c.json({ removed: true });
  } catch (err) {
    return profileErrorResponse(c, err);
  }
});
