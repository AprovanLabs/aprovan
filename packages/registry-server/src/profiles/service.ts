/**
 * Profile domain service — CRUD with write-time validation (tech-plan D3),
 * grants (D12), and the caller-facing error copy the UX doc makes normative.
 *
 * Validation happens at write time, not first dispatch: an interface profile
 * must name a compat provider that implements the interface; a pinned
 * credential must exist in the tenant and belong to the executing provider.
 */

import { ServiceError } from "../kernel/index.js";
import { UniqueConstraintError } from "../storage/sql-client.js";
import { findInterface, type InterfaceCatalog } from "../catalog/types.js";
import type { CredentialService } from "../credentials/service.js";
import type { CallContext } from "../config/types.js";
import type {
  GrantStore,
  GrantSubject,
  ProfileGrantRow,
  ProfileLimits,
  ProfileRow,
  ProfileStore,
  ProfileTargetKind,
} from "../storage/types.js";

/** Same shape as an agent or workflow name; `default` is the reserved name. */
const NAME_RE = /^[a-z0-9][a-z0-9-]{0,63}$/u;

export interface ProfileCreateInput {
  name: string;
  target: { kind: "interface"; interface: string } | { kind: "provider"; provider: string };
  /** Interface targets: the executing compat provider. */
  provider?: string;
  credentialId?: string;
  options?: Record<string, unknown>;
  limits?: ProfileLimits;
}

export interface ProfileUpdateInput {
  name?: string;
  provider?: string;
  /** `null` clears the pin. */
  credentialId?: string | null;
  options?: Record<string, unknown>;
  limits?: ProfileLimits | null;
}

export class ProfileService {
  constructor(
    private readonly store: ProfileStore,
    private readonly grantStore: GrantStore,
    private readonly credentials: CredentialService,
    private readonly catalog: InterfaceCatalog,
  ) {}

  // -------------------------------------------------------------------------
  // CRUD
  // -------------------------------------------------------------------------

  async create(ctx: CallContext, input: ProfileCreateInput): Promise<ProfileRow> {
    if (!NAME_RE.test(input.name)) {
      throw new ServiceError(
        `Invalid profile name "${input.name}" — lowercase letters, digits, and hyphens (max 64).`,
        400,
      );
    }
    const targetKind: ProfileTargetKind = input.target.kind;
    const targetId =
      input.target.kind === "interface" ? input.target.interface : input.target.provider;

    let executingProvider: string;
    if (input.target.kind === "interface") {
      const def = findInterface(this.catalog, targetId);
      if (!def) {
        throw new ServiceError(`Unknown interface: ${targetId}`, 404);
      }
      if (!input.provider) {
        throw new ServiceError(
          `An interface profile must name its executing provider. ${targetId} implementations: ${def.compat.map((c) => c.provider).join(", ")}`,
          400,
        );
      }
      const compat = def.compat.find((entry) => entry.provider === input.provider);
      if (!compat) {
        throw new ServiceError(
          `${input.provider} does not implement ${targetId}. Compatible: ${def.compat.map((c) => c.provider).join(", ")}`,
          400,
        );
      }
      executingProvider = compat.provider;
    } else {
      if (input.provider && input.provider !== targetId) {
        throw new ServiceError(
          `A provider profile's target IS its provider — got target ${targetId} with provider ${input.provider}`,
          400,
        );
      }
      executingProvider = targetId;
    }

    // Credential existence + provider match, at write time (profiles spec
    // "Credential reference validated at write time").
    if (input.credentialId) {
      try {
        await this.credentials.resolveById(ctx.tenantId, input.credentialId, executingProvider);
      } catch (err) {
        throw new ServiceError(err instanceof Error ? err.message : String(err), 400);
      }
    }

    try {
      return await this.store.create(ctx.tenantId, {
        name: input.name,
        targetKind,
        targetId,
        ...(input.target.kind === "interface" ? { provider: executingProvider } : {}),
        ...(input.credentialId ? { credentialId: input.credentialId } : {}),
        options: input.options ?? {},
        ...(input.limits ? { limits: input.limits } : {}),
        createdBy: ctx.principal,
      });
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        throw new ServiceError(
          `A ${targetId} profile named "${input.name}" already exists in this tenant.`,
          409,
        );
      }
      throw err;
    }
  }

  async update(ctx: CallContext, id: string, patch: ProfileUpdateInput): Promise<ProfileRow> {
    const existing = await this.store.getById(ctx.tenantId, id);
    if (!existing) throw new ServiceError(`No profile with id ${id}`, 404);

    if (patch.name !== undefined && !NAME_RE.test(patch.name)) {
      throw new ServiceError(
        `Invalid profile name "${patch.name}" — lowercase letters, digits, and hyphens (max 64).`,
        400,
      );
    }

    let executingProvider =
      existing.targetKind === "interface" ? (existing.provider ?? "") : existing.targetId;
    if (patch.provider !== undefined) {
      if (existing.targetKind !== "interface") {
        throw new ServiceError("Only interface profiles carry an executing provider.", 400);
      }
      const def = findInterface(this.catalog, existing.targetId);
      const compat = def?.compat.find((entry) => entry.provider === patch.provider);
      if (!def || !compat) {
        throw new ServiceError(
          `${patch.provider} does not implement ${existing.targetId}.` +
            (def ? ` Compatible: ${def.compat.map((c) => c.provider).join(", ")}` : ""),
          400,
        );
      }
      executingProvider = compat.provider;
    }

    if (typeof patch.credentialId === "string") {
      try {
        await this.credentials.resolveById(ctx.tenantId, patch.credentialId, executingProvider);
      } catch (err) {
        throw new ServiceError(err instanceof Error ? err.message : String(err), 400);
      }
    }

    try {
      const updated = await this.store.update(ctx.tenantId, id, {
        ...(patch.name !== undefined ? { name: patch.name } : {}),
        ...(patch.provider !== undefined ? { provider: patch.provider } : {}),
        ...(patch.credentialId !== undefined
          ? { credentialId: patch.credentialId ?? undefined }
          : {}),
        ...(patch.options !== undefined ? { options: patch.options } : {}),
        ...(patch.limits !== undefined ? { limits: patch.limits ?? undefined } : {}),
      });
      return updated!;
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        throw new ServiceError(
          `A ${existing.targetId} profile named "${patch.name}" already exists in this tenant.`,
          409,
        );
      }
      throw err;
    }
  }

  async delete(ctx: CallContext, id: string): Promise<void> {
    const deleted = await this.store.delete(ctx.tenantId, id);
    if (!deleted) throw new ServiceError(`No profile with id ${id}`, 404);
  }

  get(ctx: CallContext, id: string): Promise<ProfileRow | undefined> {
    return this.store.getById(ctx.tenantId, id);
  }

  list(
    ctx: CallContext,
    filter?: { targetKind?: ProfileTargetKind; targetId?: string },
  ): Promise<ProfileRow[]> {
    return this.store.list(ctx.tenantId, filter);
  }

  // -------------------------------------------------------------------------
  // Grants
  // -------------------------------------------------------------------------

  async grant(ctx: CallContext, profileId: string, subject: GrantSubject): Promise<ProfileGrantRow> {
    const profile = await this.store.getById(ctx.tenantId, profileId);
    if (!profile) throw new ServiceError(`No profile with id ${profileId}`, 404);
    return this.grantStore.grant(ctx.tenantId, profileId, subject, ctx.principal);
  }

  async revoke(ctx: CallContext, profileId: string, subject: GrantSubject): Promise<boolean> {
    return this.grantStore.revoke(ctx.tenantId, profileId, subject);
  }

  listGrants(ctx: CallContext, profileId: string): Promise<ProfileGrantRow[]> {
    return this.grantStore.listForProfile(ctx.tenantId, profileId);
  }

  /** The caller's subject set: user id, each group, and the actor identity. */
  static subjectsFor(ctx: CallContext): GrantSubject[] {
    const subjects: GrantSubject[] = [{ kind: "user", id: ctx.principal }];
    for (const groupId of ctx.groupIds) subjects.push({ kind: "group", id: groupId });
    if (ctx.actor) subjects.push({ kind: ctx.actor.kind, id: ctx.actor.id });
    return subjects;
  }

  /** One indexed query resolving every profile granted to this caller (D12). */
  resolveGrantedProfileIds(ctx: CallContext): Promise<Set<string>> {
    return this.grantStore.grantedProfileIds(ctx.tenantId, ProfileService.subjectsFor(ctx));
  }
}
