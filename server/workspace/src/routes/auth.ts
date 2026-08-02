/**
 * Workspace picker route (legacy alias).
 *
 * POST /auth/sessions  — select the caller's active workspace.
 *
 * The gateway authenticates every request with a Cognito access token and
 * scopes it to the user's *active* workspace, read from
 * `Sessions[sub].currentWorkspaceId` (see `middleware/auth.ts`). When that is
 * unset the middleware returns 400 `workspace_not_selected` and the client
 * sends the user through this picker: the caller presents their Cognito
 * access token plus a chosen `workspace_id`, the gateway validates membership
 * and persists the choice.
 *
 * `POST /session/workspace` (see `routes/session.ts`) is the canonical
 * registry-UI endpoint and shares `selectActiveWorkspace` with this alias.
 * `workspace_id` (snake_case) is preserved here for backward compatibility with
 * existing callers/tests; new callers should prefer `POST /session/workspace`.
 *
 * The legacy `POST /auth/token` and `POST /auth/token/apikey` token-issuance
 * endpoints were removed — the gateway no longer mints its own JWTs.
 */

import { Hono } from "hono";
import { readBearerToken, verifyAccessToken } from "../middleware/auth.js";
import { selectActiveWorkspace } from "./session.js";

export const authRouter = new Hono();

// ---------------------------------------------------------------------------
// POST /auth/sessions — set the active workspace (the picker)
// ---------------------------------------------------------------------------

authRouter.post("/sessions", async (c) => {
  const accessToken = readBearerToken(c);
  if (!accessToken) {
    return c.json({ error: "Missing or invalid Authorization header" }, 401);
  }

  let userId: string;
  try {
    userId = await verifyAccessToken(accessToken);
  } catch {
    return c.json({ error: "Invalid or expired Cognito token" }, 401);
  }

  let preferredWorkspaceId: string | undefined;
  try {
    const body = await c.req.json<{ workspace_id?: string }>();
    if (typeof body?.workspace_id === "string" && body.workspace_id.length > 0) {
      preferredWorkspaceId = body.workspace_id;
    }
  } catch {
    // empty body is fine
  }

  if (!preferredWorkspaceId) {
    return c.json(
      { error: "workspace_id is required", code: "workspace_not_selected" },
      400,
    );
  }

  const result = await selectActiveWorkspace(userId, preferredWorkspaceId);
  if (!result.ok) {
    return c.json(result.body, result.status);
  }
  return c.json({ workspace_id: result.workspaceId });
});
