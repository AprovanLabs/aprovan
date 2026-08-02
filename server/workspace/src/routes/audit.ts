/**
 * Audit log route.
 *
 * GET /audit   — list recent tool-call events (admin only)
 *
 * Query params:
 *   limit     — max entries to return (default 100, max 500)
 *   callerId  — filter by caller
 *   provider  — filter by provider
 */

import { Hono } from "hono";
import { getAuditStore } from "../audit.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

export const auditRouter = new Hono();

auditRouter.use("*", requireAuth, requireAdmin);

auditRouter.get("/", async (c) => {
  const principal = c.get("principal");
  const workspaceId = principal.workspaceId;

  const rawLimit = parseInt(c.req.query("limit") ?? "100", 10);
  const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(1, rawLimit), 500) : 100;
  const callerId = c.req.query("callerId");
  const provider = c.req.query("provider");

  const store = getAuditStore();
  const entries = await store.recent({ workspaceId, limit, callerId, provider });

  return c.json({ entries });
});
