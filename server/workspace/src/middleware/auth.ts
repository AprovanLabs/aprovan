import { CognitoJwtVerifier } from "aws-jwt-verify";
import { getCachedPrincipal, hashToken, setCachedPrincipal } from "../auth-cache.js";
import { getMembership } from "../memberships.js";
import { getWorkspaceConfig, resolveAuthMode } from "../runtime/config.js";
import { getCurrentWorkspace } from "../sessions.js";
import { listUserGroupIds } from "../userGroups.js";
import { getActiveWorkspaceId } from "../users.js";
import type { Context, Next } from "hono";

export type AuthMode = "none" | "oidc";

export interface Principal {
  sub: string;
  workspaceId: string;
  role: string;
  groupIds: string[];
}

interface TokenVerifier {
  verify(token: string): Promise<Record<string, unknown>>;
  hydrate(): Promise<void>;
}

declare module "hono" {
  interface ContextVariableMap {
    principal: Principal;
  }
}

let verifierOverride: TokenVerifier | null | undefined;
let verifier: TokenVerifier | undefined;

export function getAuthMode(): AuthMode {
  return resolveAuthMode();
}

/**
 * Legacy header carrying the caller's bearer token.
 *
 * The workspace used to sit behind a CloudFront Origin Access Control whose
 * SigV4 signing overwrote `Authorization`, so clients sent the user token
 * here instead. Nothing signs anything now and `Authorization` arrives intact,
 * but this is still accepted: browsers hold cached bundles, and installed MCP
 * clients pin older versions of `@aprovan/ui`. Remove it once no client in the
 * wild still sends it — the fallback in {@link readBearerToken} is the only
 * thing keeping it alive.
 */
export const ACCESS_TOKEN_HEADER = "X-Aprovan-Authorization";

interface HeaderCarrier {
  req: { header(name: string): string | undefined };
}

/**
 * Extract the caller's bearer token from the standard `Authorization` header,
 * falling back to the legacy {@link ACCESS_TOKEN_HEADER} for clients that
 * predate the container cutover. Returns the bare token (no `Bearer ` prefix),
 * or null when absent or malformed.
 */
export function readBearerToken(c: HeaderCarrier): string | null {
  const raw = c.req.header("Authorization") ?? c.req.header(ACCESS_TOKEN_HEADER);
  if (!raw?.startsWith("Bearer ")) return null;
  return raw.slice("Bearer ".length).trim();
}

function createVerifier(): TokenVerifier {
  if (verifierOverride !== undefined) {
    if (!verifierOverride) throw new Error("OIDC verifier is unavailable");
    return verifierOverride;
  }
  if (verifier) return verifier;
  const issuer = process.env["OIDC_ISSUER"];
  const audience = process.env["OIDCAUDIENCE"];
  if (!issuer || !audience) throw new Error("OIDC configuration is incomplete");
  const match = issuer.match(/cognito-idp\.[^/]+\.amazonaws\.com\/([^/]+)$/);
  if (!match?.[1]) throw new Error("OIDC_ISSUER is not a Cognito issuer");
  verifier = CognitoJwtVerifier.create({
    userPoolId: match[1],
    clientId: audience,
    tokenUse: "access",
  }) as unknown as TokenVerifier;
  return verifier;
}

export async function verifyAccessToken(token: string): Promise<string> {
  const payload = await createVerifier().verify(token);
  const sub = payload["sub"];
  if (typeof sub !== "string" || !sub) throw new Error("Invalid token subject");
  return sub;
}

export function setCognitoVerifier(value: TokenVerifier | null): void {
  verifierOverride = value;
}

export function resetCognitoVerifier(): void {
  verifierOverride = undefined;
  verifier = undefined;
}

export async function initAuth(): Promise<void> {
  const config = getWorkspaceConfig();
  // What makes auth-none dangerous is not `NODE_ENV`, it is being backed by
  // shared multi-tenant infrastructure: an aws-mode workspace that
  // authenticates nobody exposes every workspace's credentials and files to
  // anyone who can reach it. A local-mode workspace is single-user by
  // definition and has nothing to expose, which is why `docker run` works
  // out of the box while the same image in aws mode refuses to start.
  if (config.mode === "aws" && getAuthMode() === "none" && !config.allowInsecure) {
    throw new Error(
      "WORKSPACE_MODE=aws requires OIDC (OIDC_ISSUER + OIDCAUDIENCE, normally " +
        "supplied by /aprovan/<env>/env in SSM). Set WORKSPACE_ALLOW_INSECURE=1 " +
        "only if you genuinely intend an unauthenticated AWS-backed workspace.",
    );
  }
  if (getAuthMode() === "oidc") await createVerifier().hydrate();
}

/**
 * The per-(token, requested-workspace) cache lives in front of the three
 * store reads below (Sessions → Memberships → UserGroups). A hit skips
 * straight to the cached principal without touching any of them — including
 * skipping token re-verification, which is the accepted trade for a 60s-
 * default TTL cache (see specs/identity-store "Per-token auth resolution
 * cache" and tech-plan D6's staleness-window risk note).
 */
async function oidcPrincipal(c: Context): Promise<Principal> {
  const token = readBearerToken(c);
  if (!token) throw new Error("missing_token");
  const requestedHeader = c.req.header("X-Aprovan-Workspace") ?? "";
  const tokenHash = hashToken(token);
  const cached = getCachedPrincipal(tokenHash, requestedHeader);
  if (cached) return cached;

  const sub = await verifyAccessToken(token);
  // Prefer the per-request header, then the TTL'd session row, then the durable
  // Users.active_workspace_id preference (survives session expiry / cutover
  // reseed which deliberately drops login sessions).
  const workspaceId =
    requestedHeader ||
    (await getCurrentWorkspace(sub)) ||
    (await getActiveWorkspaceId(sub));
  if (!workspaceId) throw new Error("workspace_not_selected");
  const membership = await getMembership(workspaceId, sub);
  if (!membership) throw new Error("workspace_forbidden");
  const principal: Principal = {
    sub,
    workspaceId,
    role: membership.role ?? "member",
    groupIds: await listUserGroupIds(workspaceId, sub),
  };
  setCachedPrincipal(tokenHash, requestedHeader, principal);
  return principal;
}

export async function resolvePrincipal(c: Context): Promise<Principal> {
  if (getAuthMode() === "none") {
    return {
      sub: "local",
      workspaceId: "local",
      role: "admin",
      groupIds: [],
    };
  }
  return oidcPrincipal(c);
}

export async function requireAuth(
  c: Context,
  next: Next,
): Promise<Response | void> {
  try {
    c.set("principal", await resolvePrincipal(c));
    await next();
  } catch (error) {
    const code = error instanceof Error ? error.message : "invalid_token";
    if (code === "workspace_forbidden") {
      return c.json({ error: "Workspace is not allowed" }, 403);
    }
    if (code === "workspace_not_selected") {
      return c.json({ error: "No workspace selected", code }, 400);
    }
    if (code !== "missing_token") {
      const detail = error instanceof Error ? error.message : String(error);
      process.stderr.write(`[gateway] requireAuth failed: ${detail}\n`);
    }
    return c.json({ error: "Invalid or expired token" }, 401);
  }
}

export async function requireAdmin(
  c: Context,
  next: Next,
): Promise<Response | void> {
  if (c.get("principal")?.role !== "admin") {
    return c.json({ error: "Admin role required" }, 403);
  }
  await next();
}
