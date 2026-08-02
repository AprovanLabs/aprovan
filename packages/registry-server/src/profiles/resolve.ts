/**
 * `resolveProfile()` — the normative resolution algorithm (tech-plan
 * "Profile resolution algorithm", steps 1–6). This is the ONLY place a
 * namespace turns into (provider, credential, options, limits):
 *
 * 1. classify the namespace (native handled by dispatch before this runs)
 * 2. name = profileName ?? "default"
 * 3. look up the stored profile row
 * 4. row present → authorize (grants; admin passes; auth-none passes),
 *    validate compat, resolve the pinned credential LOUDLY
 * 5. row absent + default name → zero-config fallback (credentialless compat
 *    entry first, else first compat provider with a tenant credential;
 *    provider targets: first tenant credential) — NOT grant-checked
 * 6. row absent + named → 404 listing the names that DO exist. No fallback,
 *    ever.
 */

import { ServiceError } from "../kernel/index.js";
import {
  findInterface,
  findLlmAlias,
  type InterfaceCatalog,
  type InterfaceCompat,
} from "../catalog/types.js";
import { CredentialResolutionError, type CredentialService } from "../credentials/service.js";
import { ProfileService } from "./service.js";
import type { CallContext } from "../config/types.js";
import type { CredentialPayload } from "../credentials/types.js";
import type { ProfileLimits, ProfileStore } from "../storage/types.js";

export interface ResolveDeps {
  catalog: InterfaceCatalog;
  profiles: ProfileStore;
  profileService: ProfileService;
  credentials: CredentialService;
  /** Catalogue guard — is this a known utdk provider id? */
  isKnownProvider: (id: string) => boolean;
  /** Whether grants are enforced ("none" skips enforcement). */
  authMode: "oidc" | "api-key" | "none";
}

export interface ResolvedTarget {
  kind: "interface" | "provider";
  id: string;
}

export interface ResolvedProfile {
  target: ResolvedTarget;
  /** Interface targets: the compat entry that executes. */
  compat?: InterfaceCompat;
  /** Concrete executing provider id (also the credential-store key). */
  provider: string;
  /** Module name for the executor (names the client factory). */
  module: string;
  /** Import specifier when the module is not in the utdk catalogue. */
  moduleSpecifier?: string;
  /** API root override (transport, split out of options). */
  baseUrl?: string;
  credential?: { id: string; payload: CredentialPayload };
  options: Record<string, unknown>;
  limits?: ProfileLimits;
  profileId?: string;
  /** The resolved profile name ("default" for bare dispatch; undefined for pure fallback). */
  profileName?: string;
  /** Interface dispatch timeout. */
  timeoutMs?: number;
  /** Operations that receive option defaults as missing args. */
  defaultsFor: string[];
  /** True when the compat entry needs no credential (dispatch short-circuits). */
  credentialless?: boolean;
}

const targetLabel = (target: ResolvedTarget): string => target.id;

/**
 * Split the merged option bag into the API root and the option defaults that
 * get folded into call arguments — `baseUrl` is transport, not an argument.
 */
function splitOptions(
  merged: Record<string, unknown>,
  compatBaseUrl?: string,
): { options: Record<string, unknown>; baseUrl?: string } {
  const { baseUrl, ...options } = merged;
  const resolved = typeof baseUrl === "string" && baseUrl ? baseUrl : compatBaseUrl;
  return { options, ...(resolved ? { baseUrl: resolved } : {}) };
}

export async function resolveProfile(
  deps: ResolveDeps,
  ctx: CallContext,
  namespace: string,
  profileName?: string,
): Promise<ResolvedProfile> {
  // Step 1 — classify. (Native services never reach here; dispatch stops first.)
  if (namespace.includes(":")) {
    throw new ServiceError(
      `Unknown tool namespace "${namespace}": instance-namespace colon syntax is gone — ` +
        `dispatch with the base namespace and a profile (the "profile" field on the wire, ` +
        `or client("${namespace.slice(namespace.indexOf(":") + 1)}") in scripts).`,
      404,
    );
  }
  const interfaceDef = findInterface(deps.catalog, namespace);
  const llmAlias = interfaceDef ? undefined : findLlmAlias(deps.catalog, namespace);
  let target: ResolvedTarget;
  if (interfaceDef) {
    target = { kind: "interface", id: namespace };
  } else if (llmAlias || deps.isKnownProvider(namespace)) {
    target = { kind: "provider", id: namespace };
  } else {
    throw new ServiceError(
      `Unknown tool namespace "${namespace}": not a registered native service, a cataloged ` +
        `interface, an LLM alias, or a provider in the UTDK catalogue.`,
      404,
    );
  }

  // Step 2 — the default name is the only implicit one.
  const name = profileName ?? "default";

  // Step 3
  const row = await deps.profiles.getByName(ctx.tenantId, target.kind, target.id, name);

  const aliasBase = llmAlias
    ? {
        module: llmAlias.module,
        ...(llmAlias.baseUrl ? { baseUrl: llmAlias.baseUrl } : {}),
      }
    : { module: target.id };

  // Step 4 — stored profile.
  if (row) {
    // 4a. AUTHORIZE. Skipped when auth mode is "none"; admins pass. An
    // explicit stored `default` profile is grant-checked like any other.
    if (deps.authMode !== "none" && ctx.role !== "admin") {
      const granted = await deps.profileService.resolveGrantedProfileIds(ctx);
      if (!granted.has(row.id)) {
        throw new ServiceError(
          `Profile "${name}" (${targetLabel(target)}) is not granted to this caller. ` +
            `Ask a workspace admin to grant it.`,
          403,
        );
      }
    }

    // 4b. Interface target: find the executing compat entry.
    let compat: InterfaceCompat | undefined;
    if (target.kind === "interface") {
      compat = interfaceDef!.compat.find((entry) => entry.provider === row.provider);
      if (!compat) {
        throw new ServiceError(
          `${name} is bound to ${row.provider ?? "(no provider)"}, which does not implement ${target.id}`,
          400,
        );
      }
      if (compat.unavailable) {
        throw new ServiceError(
          `${target.id} resolves to ${compat.provider}: ${compat.unavailable}`,
          501,
        );
      }
    }

    const executingProvider = target.kind === "interface" ? compat!.provider : target.id;

    // 4c. Credential — pinned id resolves loudly; never falls back.
    let credential: { id: string; payload: CredentialPayload } | undefined;
    if (row.credentialId) {
      try {
        const resolved = await deps.credentials.resolveById(
          ctx.tenantId,
          row.credentialId,
          executingProvider,
        );
        credential = { id: resolved.id, payload: resolved.payload };
      } catch (err) {
        const detail =
          err instanceof CredentialResolutionError ? err.message : String(err);
        throw new ServiceError(
          `Profile "${name}" (${targetLabel(target)}) pins credential ${row.credentialId}, which cannot be used: ` +
            `${detail}. Re-link a credential on the profile.`,
          400,
        );
      }
    } else if (compat?.credentialless) {
      credential = undefined;
    } else {
      credential = await deps.credentials.firstForProvider(ctx.tenantId, executingProvider);
    }

    // 4d. options = compat.defaults ⊕ row.options (row wins); baseUrl split out.
    const merged = { ...(compat?.defaults ?? {}), ...row.options };
    const { options, baseUrl } = splitOptions(merged, compat?.baseUrl ?? aliasBase.baseUrl);

    return {
      target,
      ...(compat ? { compat } : {}),
      provider: executingProvider,
      module: target.kind === "interface" ? compat!.module : aliasBase.module,
      ...(target.kind === "interface" && compat!.moduleSpecifier
        ? { moduleSpecifier: compat!.moduleSpecifier }
        : {}),
      ...(baseUrl ? { baseUrl } : {}),
      ...(credential ? { credential } : {}),
      options,
      ...(row.limits ? { limits: row.limits } : {}),
      profileId: row.id,
      profileName: name,
      ...(target.kind === "interface" ? { timeoutMs: interfaceDef!.timeoutMs } : {}),
      defaultsFor: target.kind === "interface" ? interfaceDef!.defaultsFor : [],
      ...(compat?.credentialless ? { credentialless: true } : {}),
    };
  }

  // Step 6 — a named miss is loud and lists what exists. No fallback, ever.
  if (name !== "default") {
    const names = await deps.profiles.namesForTarget(ctx.tenantId, target.kind, target.id);
    const listing =
      names.length > 0
        ? `Profiles for ${targetLabel(target)}: ${names.map((n) => `"${n}"`).join(", ")}.`
        : `No profiles exist for ${targetLabel(target)} — create one with profiles.create.`;
    throw new ServiceError(
      `No ${targetLabel(target)} profile named "${name}". ${listing}`,
      404,
    );
  }

  // Step 5 — zero-config fallback for the default name only. NOT grant-checked
  // (it exists precisely for ungoverned tenants).
  if (target.kind === "interface") {
    const def = interfaceDef!;
    let compat = def.compat.find((entry) => entry.credentialless);
    let credential: { id: string; payload: CredentialPayload } | undefined;
    if (!compat) {
      // First compat entry with a tenant credential, in catalog order.
      const credentials = await deps.credentials.list(ctx.tenantId);
      const connected = new Set(credentials.map((row) => row.provider));
      compat = def.compat.find((entry) => connected.has(entry.provider));
    }
    if (!compat) {
      throw new ServiceError(
        `Interface ${target.id} has no "default" profile and no connected compatible provider. ` +
          `Connect a credential for one of: ${def.compat.map((c) => c.provider).join(", ")} — ` +
          `or create a profile with profiles.create { name: "default", target: { kind: "interface", interface: "${target.id}" }, provider: … }.`,
        400,
      );
    }
    if (compat.unavailable) {
      throw new ServiceError(
        `${target.id} resolves to ${compat.provider}: ${compat.unavailable}`,
        501,
      );
    }
    if (!compat.credentialless) {
      credential = await deps.credentials.firstForProvider(ctx.tenantId, compat.provider);
    }
    const { options, baseUrl } = splitOptions({ ...(compat.defaults ?? {}) }, compat.baseUrl);
    return {
      target,
      compat,
      provider: compat.provider,
      module: compat.module,
      ...(compat.moduleSpecifier ? { moduleSpecifier: compat.moduleSpecifier } : {}),
      ...(baseUrl ? { baseUrl } : {}),
      ...(credential ? { credential } : {}),
      options,
      timeoutMs: def.timeoutMs,
      defaultsFor: def.defaultsFor,
      ...(compat.credentialless ? { credentialless: true } : {}),
    };
  }

  // Provider target: first tenant credential (may be none — ephemeral
  // request-supplied credentials remain legal on the HTTP surface).
  const credential = await deps.credentials.firstForProvider(ctx.tenantId, target.id);
  const { options, baseUrl } = splitOptions({}, aliasBase.baseUrl);
  return {
    target,
    provider: target.id,
    module: aliasBase.module,
    ...(baseUrl ? { baseUrl } : {}),
    ...(credential ? { credential } : {}),
    options,
    defaultsFor: [],
  };
}
