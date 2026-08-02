/**
 * Tenancy (tech-plan D2): explicit `TenantContext` threaded through every
 * call; nothing below this layer ever reads a tenant from env.
 *
 * - single mode (standalone): the tenant literally named `default` is
 *   auto-provisioned at boot; every request routes to it; a request naming a
 *   different tenant is refused.
 * - external mode (embedded): the host's `TenantResolver` maps
 *   `(authn, requested tenant)` → tenant/role/groups; tenant rows are
 *   created on first use, so the host never performs tenant CRUD.
 */

import { AuthError, type Authn, type TenantResolver } from "../auth/types.js";
import type { TenantStore } from "../storage/types.js";

export const DEFAULT_TENANT_ID = "default";

export interface TenancyOptions {
  mode: "single" | "external";
  resolve?: TenantResolver;
}

export class TenantService {
  private readonly ensured = new Set<string>();

  constructor(
    private readonly store: TenantStore,
    private readonly options: TenancyOptions,
  ) {
    if (options.mode === "external" && !options.resolve) {
      throw new Error('tenancy mode "external" requires a resolve function');
    }
  }

  get mode(): "single" | "external" {
    return this.options.mode;
  }

  /** Boot step: standalone auto-provisions the default tenant. */
  async init(): Promise<void> {
    if (this.options.mode === "single") {
      await this.ensureTenant(DEFAULT_TENANT_ID);
    }
  }

  /**
   * Auto-provision-on-first-use. Memoized per id — the row is create-if-absent
   * so a stale memo can never resurrect a truly deleted tenant mid-process.
   */
  async ensureTenant(tenantId: string): Promise<void> {
    if (this.ensured.has(tenantId)) return;
    await this.store.ensure(tenantId);
    this.ensured.add(tenantId);
  }

  /**
   * Resolve the tenant for an authenticated HTTP request. `requestedTenant`
   * is the X-Registry-Tenant header (or undefined for the sole tenant).
   */
  async resolve(
    authn: Authn,
    requestedTenant: string | undefined,
  ): Promise<{ tenantId: string; role: "admin" | "member"; groupIds: string[] }> {
    if (this.options.mode === "single") {
      // Claims may pin the tenant (api-key auth resolves the key's tenant).
      const claimTenant =
        typeof authn.claims["tenantId"] === "string" ? (authn.claims["tenantId"] as string) : undefined;
      const tenantId = claimTenant ?? DEFAULT_TENANT_ID;
      if (requestedTenant !== undefined && requestedTenant !== tenantId) {
        throw new AuthError(
          `This caller is not a member of tenant "${requestedTenant}".`,
          403,
        );
      }
      await this.ensureTenant(tenantId);
      const role =
        authn.claims["role"] === "member" ? ("member" as const) : ("admin" as const);
      const groupIds = Array.isArray(authn.claims["groupIds"])
        ? (authn.claims["groupIds"] as string[])
        : [];
      return { tenantId, role, groupIds };
    }
    const resolved = await this.options.resolve!(authn, requestedTenant);
    await this.ensureTenant(resolved.tenantId);
    return resolved;
  }
}
