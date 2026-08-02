/**
 * RFC 9728 — OAuth Protected Resource Metadata
 *
 * GET /.well-known/oauth-protected-resource/mcp
 *
 * Unauthenticated endpoint that returns a metadata document describing the
 * Cognito authorization server backing a given MCP workspace endpoint. MCP
 * clients use this to auto-discover the OAuth issuer and complete the flow
 * without a hand-fed token.
 *
 * Required env var (shared with requireAuth):
 *   COGNITO_USER_POOL_ID — Cognito user pool id (format: <region>_<id>)
 */

import { Hono } from "hono";

export const wellKnownRouter = new Hono();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Derive the Cognito issuer URL from COGNITO_USER_POOL_ID.
 * Pool ID format: `<region>_<id>` (e.g. `us-east-1_ABC123`).
 * Issuer URL:     `https://cognito-idp.<region>.amazonaws.com/<poolId>`
 */
function getCognitoIssuer(): string | null {
  const configured = process.env["OIDC_ISSUER"];
  if (configured) return configured;
  const poolId = process.env["COGNITO_USER_POOL_ID"];
  if (!poolId) return null;
  const region = poolId.split("_")[0];
  if (!region) return null;
  return `https://cognito-idp.${region}.amazonaws.com/${poolId}`;
}

/**
 * Return the public gateway host for building resource URLs.
 * Prefers X-Forwarded-Host (set by the load balancer) then Host.
 */
function getGatewayHost(
  forwardedHost: string | undefined,
  host: string | undefined,
): string {
  return forwardedHost ?? host ?? "aprovan.com";
}

// ---------------------------------------------------------------------------
// GET /.well-known/oauth-protected-resource/api/mcp
// ---------------------------------------------------------------------------
//
// RFC 9728: clients derive this path from the MCP resource URL
// (`https://aprovan.com/api/mcp` → `/.well-known/oauth-protected-resource/api/mcp`).

wellKnownRouter.get("/oauth-protected-resource/api/mcp", (c) => {
  const host = getGatewayHost(
    c.req.header("x-forwarded-host"),
    c.req.header("host"),
  );

  const resource = `https://${host}/api/mcp`;
  const issuer = getCognitoIssuer();

  return c.json({
    resource,
    authorization_servers: issuer ? [issuer] : [],
    bearer_methods_supported: ["header"],
    resource_name: "Aprovan Gateway",
    resource_documentation: "https://aprovan.com/registry/docs/mcp",
  });
});

// ---------------------------------------------------------------------------
// Exports used by tests
// ---------------------------------------------------------------------------

export { getCognitoIssuer, getGatewayHost };
