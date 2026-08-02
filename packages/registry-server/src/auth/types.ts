/**
 * Auth seams (tech-plan D7): authentication (who) is separate from tenant
 * resolution (which tenant, what role/groups).
 */

export interface AuthAdapter {
  readonly mode: "oidc" | "api-key" | "none";
  /** e.g. hydrate JWKS. */
  init(): Promise<void>;
  authenticate(req: { header(name: string): string | undefined }): Promise<Authn>;
}

export interface Authn {
  sub: string;
  claims: Record<string, unknown>;
}

/** requestedTenant comes from the X-Registry-Tenant header (or the sole tenant). */
export type TenantResolver = (
  authn: Authn,
  requestedTenant?: string,
) => Promise<{ tenantId: string; role: "admin" | "member"; groupIds: string[] }>;

/** Thrown by adapters / resolvers; mapped to 401/403 by the HTTP layer. */
export class AuthError extends Error {
  constructor(
    message: string,
    readonly status: 401 | 403 = 401,
  ) {
    super(message);
    this.name = "AuthError";
  }
}
