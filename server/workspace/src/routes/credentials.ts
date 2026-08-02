/**
 * Credential CRUD routes.
 *
 * All routes require JWT authentication (requireAuth middleware).
 * Admin role required for credential management.
 *
 * POST   /credentials          — store a new credential
 * GET    /credentials          — list credentials for the workspace
 * DELETE /credentials/:id      — delete a credential
 */

import { Hono } from "hono";
import { z } from "zod";
import { getCredentialStore, type CredentialInput } from "../credentials.js";
import { isInterface } from "../interfaces.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { exchangeAuthorizationCode, OAuthExchangeError } from "../oauthTokens.js";
import { invalidateToolListCache, shouldListCredentialAsProvider } from "./tools.js";

export const credentialsRouter = new Hono();

const credentialSchema = z.object({
  provider: z.string().min(1),
  label: z.string().optional(),
  payload: z.discriminatedUnion("type", [
    z.object({ type: z.literal("bearer_token"), token: z.string() }),
    z.object({ type: z.literal("api_key"), value: z.string(), headerName: z.string().optional() }),
    z.object({
      type: z.literal("oauth2_client"),
      clientId: z.string(),
      clientSecret: z.string(),
      tokenUrl: z.string(),
      scopes: z.array(z.string()).optional(),
    }),
    z.object({
      type: z.literal("oauth2_authcode"),
      clientId: z.string(),
      clientSecret: z.string(),
      tokenUrl: z.string(),
      code: z.string(),
      redirectUri: z.string(),
      codeVerifier: z.string().optional(),
      scopes: z.array(z.string()).optional(),
    }),
  ]),
});

// All credential routes require auth
credentialsRouter.use("*", requireAuth);
// Credential write operations require admin role
credentialsRouter.use("POST", requireAdmin);
credentialsRouter.use("DELETE", requireAdmin);

// ---------------------------------------------------------------------------
// POST /credentials
// ---------------------------------------------------------------------------

credentialsRouter.post("/", requireAdmin, validateBody(credentialSchema), async (c) => {
  const principal = c.get("principal");
  const workspaceId = principal.workspaceId;

  const input: CredentialInput = c.req.valid("json");

  // Interface ids (`llm`, `agent`, …) and interface-only implementations
  // (`machine`, …) are not registry providers — storing a credential under
  // those names makes discovery treat the interface as a SaaS provider.
  // (`machine` credentials are created by sandboxes.registerHost, not this form.)
  if (isInterface(input.provider) || !shouldListCredentialAsProvider(input.provider)) {
    return c.json(
      {
        error: isInterface(input.provider)
          ? `Provider "${input.provider}" is an interface, not a credential provider. Use the concrete provider id (e.g. openrouter, anthropic, github).`
          : `Provider "${input.provider}" is a built-in interface implementation and cannot be added as a credential.`,
      },
      400,
    );
  }

  // Authorization codes are single-use and expire within minutes — exchange
  // for tokens now and store the token set instead of the dead code.
  if (input.payload.type === "oauth2_authcode") {
    try {
      const tokens = await exchangeAuthorizationCode(input.payload);
      input.payload = {
        ...input.payload,
        code: "",
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: tokens.expiresAt,
      };
    } catch (err) {
      const message =
        err instanceof OAuthExchangeError ? err.message : "OAuth token exchange failed";
      return c.json({ error: message }, 400);
    }
  }

  const store = getCredentialStore();
  // `createdBy` is the user dimension WS-3's Profiles reference (tech-plan
  // D5) — stamped from the authenticated principal on every create path.
  const record = await store.create(workspaceId, { ...input, createdBy: principal.sub });
  // A new credential may unlock a provider's tools for this workspace.
  invalidateToolListCache(workspaceId);
  return c.json(record, 201);
});

// ---------------------------------------------------------------------------
// GET /credentials
// ---------------------------------------------------------------------------

credentialsRouter.get("/", async (c) => {
  const principal = c.get("principal");
  const workspaceId = principal.workspaceId;

  const store = getCredentialStore();
  const records = await store.list(workspaceId);
  return c.json({ credentials: records });
});

// ---------------------------------------------------------------------------
// DELETE /credentials/:id
// ---------------------------------------------------------------------------

credentialsRouter.delete("/:id", requireAdmin, async (c) => {
  const principal = c.get("principal");
  const workspaceId = principal.workspaceId;
  const id = c.req.param("id") ?? "";

  if (!id) {
    return c.json({ error: "Missing credential id" }, 400);
  }

  const store = getCredentialStore();
  const deleted = await store.delete(workspaceId, id);

  if (!deleted) {
    return c.json({ error: "Credential not found" }, 404);
  }
  // A removed credential may remove a provider's tools from this workspace.
  invalidateToolListCache(workspaceId);
  return c.json({ deleted: true });
});
