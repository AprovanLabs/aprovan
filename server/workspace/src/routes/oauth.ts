/**
 * OAuth 2.0 Dynamic Client Registration (RFC 7591)
 *
 * POST /oauth/register
 *
 * Provisions a per-install Cognito app client via the Cognito Admin API
 * (CreateUserPoolClient) and returns client_id + client_secret. The standard
 * /authorize and /token endpoints continue to be served by the Cognito Hosted
 * UI — this gateway does not implement its own OAuth server.
 *
 * Required env vars:
 *   COGNITO_USER_POOL_ID   — Cognito user pool to register clients in
 *   COGNITO_REGION         — AWS region (falls back to AWS_REGION)
 *   COGNITO_DOMAIN         — Cognito hosted UI domain (e.g. auth.example.com)
 *                            Used only for documentation purposes in the response.
 */

import { RateLimiter } from "@utdk/common/rateLimit";
import { Hono } from "hono";
import { z } from "zod";

export const oauthRouter = new Hono();

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const dcrRequestSchema = z.object({
  redirect_uris: z.array(z.string()).min(1),
  client_name: z.string().optional(),
  grant_types: z.array(z.string()).optional(),
  response_types: z.array(z.string()).optional(),
  token_endpoint_auth_method: z.string().optional(),
  scope: z.string().optional(),
});

// ---------------------------------------------------------------------------
// Cognito helpers
// ---------------------------------------------------------------------------

/**
 * The Cognito SDK loads with the first registration, not with this router:
 * DCR only works in `aws` mode (it needs COGNITO_USER_POOL_ID), and local mode
 * must not pay for the AWS SDK at boot — see ../db/client.ts.
 */
async function loadCognito(): Promise<
  typeof import("@aws-sdk/client-cognito-identity-provider") & {
    client: import("@aws-sdk/client-cognito-identity-provider").CognitoIdentityProviderClient;
  }
> {
  const mod = await import("@aws-sdk/client-cognito-identity-provider");
  const region =
    process.env["COGNITO_REGION"] ?? process.env["AWS_REGION"] ?? "us-east-1";
  return { ...mod, client: new mod.CognitoIdentityProviderClient({ region }) };
}

function getUserPoolId(): string | undefined {
  return process.env["COGNITO_USER_POOL_ID"];
}

// ---------------------------------------------------------------------------
// POST /oauth/register — RFC 7591
// ---------------------------------------------------------------------------

// DCR is unauthenticated by design (RFC 7591), which makes it a Cognito
// app-client-creation primitive for anyone on the internet. Throttle hard
// per source IP and allow disabling outright.
const dcrLimiters = new Map<string, RateLimiter>();

function dcrRateLimited(sourceIp: string): boolean {
  let limiter = dcrLimiters.get(sourceIp);
  if (!limiter) {
    // A legitimate MCP client registers once; 3 burst / one every 30s is
    // generous for humans and hostile to sprawl.
    limiter = new RateLimiter({ requestsPerSecond: 1 / 30, burst: 3 });
    if (dcrLimiters.size > 10_000) dcrLimiters.clear();
    dcrLimiters.set(sourceIp, limiter);
  }
  return !limiter.tryAcquire();
}

oauthRouter.post("/register", async (c) => {
  if (process.env["GATEWAY_DISABLE_DCR"] === "1") {
    return c.json(
      { error: "access_denied", error_description: "Dynamic client registration is disabled" },
      403,
    );
  }
  const sourceIp =
    c.req.header("cloudfront-viewer-address")?.split(":")[0] ??
    c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  if (dcrRateLimited(sourceIp)) {
    return c.json(
      { error: "slow_down", error_description: "Too many registration attempts" },
      429,
    );
  }

  const userPoolId = getUserPoolId();
  if (!userPoolId) {
    return c.json(
      { error: "server_error", error_description: "COGNITO_USER_POOL_ID is not configured" },
      500,
    );
  }

  let raw: unknown;
  try {
    raw = await c.req.json();
  } catch {
    return c.json(
      { error: "invalid_client_metadata", error_description: "Request body must be valid JSON" },
      400,
    );
  }

  const parsed = dcrRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return c.json(
      {
        error: "invalid_redirect_uri",
        error_description: "redirect_uris is required and must be a non-empty array of strings",
      },
      400,
    );
  }
  const body = parsed.data;

  // Normalise optional fields
  const grantTypes = body.grant_types ?? ["authorization_code", "refresh_token"];
  const responseTypes = body.response_types ?? ["code"];
  const clientName =
    body.client_name ?? `mcp-client-${Date.now()}`;
  const scopes = body.scope
    ? body.scope.split(" ")
    : ["openid", "email", "profile"];

  // Validate grant types — we only support auth-code + refresh-token
  const unsupportedGrants = grantTypes.filter(
    (g) => g !== "authorization_code" && g !== "refresh_token",
  );
  if (unsupportedGrants.length > 0) {
    return c.json(
      {
        error: "invalid_client_metadata",
        error_description: `Unsupported grant_types: ${unsupportedGrants.join(", ")}. Supported: authorization_code, refresh_token`,
      },
      400,
    );
  }

  // Validate redirect URIs (must be HTTPS in production; allow http://localhost for dev)
  const invalidUris = body.redirect_uris.filter((uri) => {
    try {
      const u = new URL(uri);
      const isLocalhost =
        u.hostname === "localhost" || u.hostname === "127.0.0.1";
      return u.protocol !== "https:" && !isLocalhost;
    } catch {
      return true;
    }
  });
  if (invalidUris.length > 0) {
    return c.json(
      {
        error: "invalid_redirect_uri",
        error_description: `Redirect URIs must use HTTPS (or http://localhost for development): ${invalidUris.join(", ")}`,
      },
      400,
    );
  }

  try {
    const { client: cognito, CreateUserPoolClientCommand } = await loadCognito();
    const cmd = new CreateUserPoolClientCommand({
      UserPoolId: userPoolId,
      ClientName: clientName,
      GenerateSecret: true,
      AllowedOAuthFlows: ["code"],
      AllowedOAuthFlowsUserPoolClient: true,
      AllowedOAuthScopes: scopes,
      CallbackURLs: body.redirect_uris,
      ExplicitAuthFlows: ["ALLOW_REFRESH_TOKEN_AUTH"],
      SupportedIdentityProviders: ["COGNITO"],
      PreventUserExistenceErrors: "ENABLED",
    });

    const result = await cognito.send(cmd);
    const client = result.UserPoolClient;

    if (!client?.ClientId) {
      return c.json(
        { error: "server_error", error_description: "Cognito did not return a client ID" },
        500,
      );
    }

    const issuedAt = Math.floor(Date.now() / 1000);

    return c.json(
      {
        client_id: client.ClientId,
        client_secret: client.ClientSecret ?? undefined,
        client_id_issued_at: issuedAt,
        client_secret_expires_at: 0, // non-expiring
        redirect_uris: body.redirect_uris,
        grant_types: grantTypes,
        response_types: responseTypes,
        token_endpoint_auth_method: body.token_endpoint_auth_method ?? "client_secret_basic",
        client_name: clientName,
        scope: scopes.join(" "),
      },
      201,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return c.json(
      { error: "server_error", error_description: message },
      500,
    );
  }
});
