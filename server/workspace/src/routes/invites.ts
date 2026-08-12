/**
 * Invite-flow routes.
 *
 * POST   /invites                — admin only; create an invite and email the magic link
 * GET    /invites                — admin only; list pending invites for the workspace
 * DELETE /invites/:token         — admin only; revoke a pending invite
 * POST   /invites/:token/accept  — authenticated user (already signed in) accepts an invite
 *                                  to join a second workspace (or an app-instance as guest)
 */

import { Hono } from "hono";
import { z } from "zod";
import { sendInviteEmail } from "../email.js";
import { addUserToGroup } from "../groups.js";
import {
  consumeInvite,
  createInvite,
  InviteConsumeError,
  listInvites,
  revokeInvite,
} from "../invites.js";
import { putMembership } from "../memberships.js";
import {
  readBearerToken,
  requireAdmin,
  requireAuth,
  verifyAccessToken,
} from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";

export const invitesRouter = new Hono();

const inviteTargetSchema = z.object({
  kind: z.literal("app-instance"),
  installId: z.string().min(1),
  channelIds: z.array(z.string()).optional(),
});

const createInviteSchema = z.object({
  email: z.string().trim().min(1),
  role: z.string().default("member"),
  groupIds: z.array(z.string()).default([]),
  target: inviteTargetSchema.optional(),
});

// ---------------------------------------------------------------------------
// POST /invites — admin creates an invite
// ---------------------------------------------------------------------------

invitesRouter.post("/", requireAuth, requireAdmin, validateBody(createInviteSchema), async (c) => {
  const principal = c.get("principal");
  const { email, role, groupIds, target } = c.req.valid("json");

  let invite;
  try {
    invite = await createInvite(
      principal.workspaceId,
      email,
      role,
      groupIds,
      principal.sub,
      target,
    );
  } catch (err) {
    process.stderr.write(
      `[gateway] createInvite failed: ${err instanceof Error ? err.message : String(err)}\n`,
    );
    return c.json({ error: "Failed to create invite" }, 500);
  }

  try {
    await sendInviteEmail({
      toEmail: email,
      inviteToken: invite.inviteToken,
    });
  } catch (err) {
    process.stderr.write(
      `[gateway] sendInviteEmail failed (non-fatal): ${err instanceof Error ? err.message : String(err)}\n`,
    );
    // Email failure is non-fatal — the admin can resend; return the invite record
    // so they can also share the token out-of-band in dev.
  }

  return c.json(
    {
      inviteToken: invite.inviteToken,
      email: invite.email,
      role: invite.role,
      groupIds: invite.groupIds,
      createdAt: invite.createdAt,
      expiresAt: invite.expiresAt,
      ...(invite.target ? { target: invite.target } : {}),
    },
    201,
  );
});

// ---------------------------------------------------------------------------
// GET /invites — admin lists pending invites
// ---------------------------------------------------------------------------

invitesRouter.get("/", requireAuth, requireAdmin, async (c) => {
  const principal = c.get("principal");

  let invites;
  try {
    invites = await listInvites(principal.workspaceId);
  } catch (err) {
    process.stderr.write(
      `[gateway] listInvites failed: ${err instanceof Error ? err.message : String(err)}\n`,
    );
    return c.json({ error: "Failed to list invites" }, 500);
  }

  return c.json({
    invites: invites.map((i) => ({
      inviteToken: i.inviteToken,
      email: i.email,
      role: i.role,
      groupIds: i.groupIds,
      invitedBy: i.invitedBy,
      createdAt: i.createdAt,
      expiresAt: i.expiresAt,
      ...(i.target ? { target: i.target } : {}),
    })),
  });
});

// ---------------------------------------------------------------------------
// DELETE /invites/:token — admin revokes a pending invite
// ---------------------------------------------------------------------------

invitesRouter.delete("/:token", requireAuth, requireAdmin, async (c) => {
  const principal = c.get("principal");
  const inviteToken = c.req.param("token") ?? "";

  let invite;
  try {
    const invites = await listInvites(principal.workspaceId);
    invite = invites.find((i) => i.inviteToken === inviteToken);
  } catch {
    // fall through — revokeInvite checks existence
  }

  if (!invite) {
    return c.json({ error: "Invite not found" }, 404);
  }

  const revoked = await revokeInvite(inviteToken);
  if (!revoked) {
    return c.json({ error: "Invite not found" }, 404);
  }
  return c.json({ revoked: true });
});

// ---------------------------------------------------------------------------
// POST /invites/:token/accept — signed-in user accepts an invite
//
// Called by the UI when a user who already has an account (and thus an active
// workspace) receives an invite to join a second workspace. The post-confirmation
// Lambda handles the equivalent step for brand-new sign-ups.
// When the invite carries an app-instance target, consume mints an F2 guest
// participant and skips workspace membership (CF-2).
// ---------------------------------------------------------------------------

invitesRouter.post("/:token/accept", async (c) => {
  const accessToken = readBearerToken(c);
  if (!accessToken) {
    return c.json({ error: "Missing or invalid Authorization header" }, 401);
  }

  let userId: string;
  try {
    userId = await verifyAccessToken(accessToken);
  } catch {
    return c.json({ error: "Invalid or expired token" }, 401);
  }

  const inviteToken = c.req.param("token") ?? "";

  let invite;
  try {
    invite = await consumeInvite(inviteToken, userId);
  } catch (err) {
    if (err instanceof InviteConsumeError) {
      if (err.code === "expired") {
        return c.json({ error: "Invite expired", code: "invite_expired" }, 410);
      }
      return c.json({ error: "Invite not found", code: "invite_not_found" }, 404);
    }
    process.stderr.write(
      `[gateway] consumeInvite failed: ${err instanceof Error ? err.message : String(err)}\n`,
    );
    return c.json({ error: "Failed to consume invite" }, 500);
  }

  if (!invite) {
    return c.json({ error: "Invite not found", code: "invite_not_found" }, 404);
  }

  // CF-2: instance-targeted guest invite — participation already minted in
  // consumeInvite; do not create workspace membership.
  if (invite.target?.kind === "app-instance") {
    return c.json({
      workspaceId: invite.workspaceId,
      role: invite.role,
      target: invite.target,
      participation: {
        kind: "app-instance",
        installId: invite.target.installId,
        role: invite.role,
        channelIds: invite.target.channelIds,
      },
    });
  }

  try {
    await putMembership({
      workspaceId: invite.workspaceId,
      userId,
      role: invite.role,
    });
  } catch (err) {
    process.stderr.write(
      `[gateway] putMembership failed: ${err instanceof Error ? err.message : String(err)}\n`,
    );
    return c.json({ error: "Failed to create workspace membership" }, 500);
  }

  for (const groupId of invite.groupIds) {
    try {
      await addUserToGroup(invite.workspaceId, groupId, userId);
    } catch (err) {
      process.stderr.write(
        `[gateway] addUserToGroup(${groupId}) failed (non-fatal): ${err instanceof Error ? err.message : String(err)}\n`,
      );
    }
  }

  return c.json({
    workspaceId: invite.workspaceId,
    role: invite.role,
    groupIds: invite.groupIds,
  });
});
