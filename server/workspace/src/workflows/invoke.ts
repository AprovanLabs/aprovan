/**
 * In-process tool dispatch for workflow scripts — the server-side twin of
 * `POST /tools/:provider/:operation`, minus HTTP. On durable backends
 * (sqlite locally, dsql in cloud) contract-addressed calls route through the
 * embedded `@aprovan/registry-server` dispatch pipeline; the interim dynamo
 * backend keeps the legacy bespoke path until `STORE_BACKEND=dsql`.
 */

import { mayInvokeTool } from "../authorize.js";
import { assertToolGranted } from "../grants.js";
import {
  getCredentialStore,
  resolveCredentialRecord,
  type CredentialPayload,
} from "../credentials.js";
import { parseInterfaceNamespace, resolveInterfaceForWorkspace } from "../interfaces.js";
import { getExecutor } from "../isolate.js";
import { isLlmProvider, resolveLlmProvider } from "../llm.js";
import { getMembership } from "../memberships.js";
import { getAuthMode } from "../middleware/auth.js";
import { OAuthExchangeError, resolveToInjectable } from "../oauthTokens.js";
import { registryDispatch } from "../registry-embed.js";
import { storeBackend } from "../runtime/config.js";
import { getCoreService, ServiceError } from "../service-kernel.js";
import { ensureTenantForWorkspace } from "../tenant-registry.js";
import { listUserGroupIds } from "../userGroups.js";
import type { ServiceContext } from "../service-kernel.js";

/** Interface dispatch routes through the embed on dsql (unified credential/profile store). */
function usesEmbedInterfaceDispatch(): boolean {
  return storeBackend() === "dsql";
}

/**
 * Per-user tool authorization for in-process dispatch — the same gate the
 * HTTP tools route applies (`mayInvokeTool`), so a workflow script cannot
 * exercise provider credentials its runner's user was never granted. App
 * sessions skip this: the app manifest's role model + workflow allow-list
 * are their boundary, and executions deliberately run with the owning
 * workspace's reach (the owner audited the workflow when publishing).
 */
async function assertProviderAllowed(
  ctx: ServiceContext,
  provider: string,
  operation: string,
): Promise<void> {
  if (getAuthMode() !== "oidc" || ctx.appScope) return;
  const membership = await getMembership(ctx.workspaceId, ctx.userId).catch(() => undefined);
  const principal = {
    sub: ctx.userId,
    workspaceId: ctx.workspaceId,
    role: membership?.role ?? "member",
    groupIds: await listUserGroupIds(ctx.workspaceId, ctx.userId).catch(() => []),
  };
  if (!(await mayInvokeTool(principal, provider, operation))) {
    throw new ServiceError(
      `Forbidden: ${ctx.userId} has no grant for ${provider}.${operation}`,
      403,
    );
  }
}

/**
 * Map product interface namespaces (per-run redirects) to the embed API's
 * base namespace + profile pin.
 */
function resolveEmbedTarget(
  ctx: ServiceContext,
  namespace: string,
  profile?: string,
  overrideProvider?: string,
): { namespace: string; profile?: string } {
  if (overrideProvider) {
    return { namespace: overrideProvider };
  }

  const parsed = parseInterfaceNamespace(namespace);
  if (!parsed) {
    return { namespace, profile };
  }

  const { interfaceId } = parsed;

  const bindingOverride = ctx.interfaceBindings?.[interfaceId];
  if (bindingOverride) {
    return { namespace: bindingOverride, profile };
  }

  if (profile !== undefined) {
    return { namespace: interfaceId, profile };
  }

  const redirected = ctx.interfaceInstances?.[interfaceId];
  if (redirected && typeof redirected === "object" && redirected !== null) {
    const pin = redirected as { interface?: string; profile?: string };
    return {
      namespace: typeof pin.interface === "string" ? pin.interface : interfaceId,
      ...(typeof pin.profile === "string" ? { profile: pin.profile } : {}),
    };
  }
  if (typeof redirected === "string") {
    if (!redirected.includes(":")) {
      return { namespace: interfaceId, profile: redirected };
    }
    const sep = redirected.indexOf(":");
    return {
      namespace: redirected.slice(0, sep) || interfaceId,
      profile: redirected.slice(sep + 1) || undefined,
    };
  }

  return { namespace: interfaceId, profile };
}

async function dispatchThroughEmbed(
  ctx: ServiceContext,
  namespace: string,
  operation: string,
  args: Record<string, unknown>,
  opts?: { profile?: string },
): Promise<unknown> {
  await ensureTenantForWorkspace(ctx.workspaceId);
  return registryDispatch(ctx, namespace, operation, args, opts);
}

/**
 * `profile` is the depth-0 configure pin (`tools.ns({ name })` / body
 * `{ profile }`). One vocabulary for providers and interfaces: a named
 * profile in the unified store. Missing profiles fail at the first
 * operation with an error naming the profile and listing what exists.
 */
export async function invokeTool(
  ctx: ServiceContext,
  namespace: string,
  procedure: string,
  args: Record<string, unknown>,
  profile?: string,
  callSiteOptions?: Record<string, unknown>,
): Promise<unknown> {
  // Agent-attributed runs are bounded by their profile's tool grants —
  // checked before any dispatch branch so native, interface, and provider
  // calls all answer to the same list.
  assertToolGranted(ctx.grants, namespace, procedure);

  if (callSiteOptions) {
    const { assertCallOptions } = await import("../profiles/types.js");
    try {
      assertCallOptions(callSiteOptions);
    } catch (err) {
      throw new ServiceError(err instanceof Error ? err.message : String(err), 400);
    }
  }

  const core = getCoreService(namespace);
  if (core) {
    if (profile !== undefined) {
      throw new ServiceError(
        `${namespace} is a core service — it has no profiles to pin`,
        400,
      );
    }
    return core.call(ctx, procedure, args);
  }

  const parsed = parseInterfaceNamespace(namespace);
  if (parsed) {
    await assertProviderAllowed(ctx, namespace, procedure);
    return dispatchInterface(ctx, namespace, procedure, args, undefined, profile, callSiteOptions);
  }

  await assertProviderAllowed(ctx, namespace, procedure);

  const llmAlias = isLlmProvider(namespace) ? resolveLlmProvider(namespace) : undefined;
  let finalArgs = args;
  if (llmAlias && procedure === "createChatCompletion" && !("model" in finalArgs)) {
    finalArgs = { ...finalArgs, model: llmAlias.defaultModel };
  }
  if (callSiteOptions) {
    finalArgs = { ...finalArgs, ...callSiteOptions };
  }

  // Provider profile: resolve credential id from the profile store when set.
  let credentialId: string | undefined;
  if (profile !== undefined) {
    const { resolveNamespaceProfile } = await import("../profiles/resolver.js");
    const resolved = await resolveNamespaceProfile(
      ctx.workspaceId,
      namespace,
      profile,
      callSiteOptions,
    );
    if (resolved.record?.credential) credentialId = resolved.record.credential;
    finalArgs = { ...resolved.options, ...args, ...(callSiteOptions ?? {}) };
    if (llmAlias && procedure === "createChatCompletion" && !("model" in finalArgs)) {
      finalArgs = { ...finalArgs, model: llmAlias.defaultModel };
    }
  }

  return dispatchProviderLegacy(ctx, {
    credentialProvider: namespace,
    ...(credentialId ? { credentialId } : {}),
    module: llmAlias?.module ?? namespace,
    baseUrl: llmAlias?.baseUrl,
    procedure,
    args: finalArgs,
    timeout: llmAlias ? 120_000 : 30_000,
    label: namespace,
  });
}

/**
 * Dispatch one operation through a generic interface's bound implementation.
 *
 * Split out of {@link invokeTool} because a core service can *be* the caller:
 * `sandboxes.exec` is authorized as `sandboxes.exec` and then reaches the
 * bound sandbox driver through here. Routing that back through `invokeTool`
 * would demand a second grant on the raw `sandbox.*` namespace for a call the
 * user never made, so the grant check stays with the namespace the caller
 * actually named.
 *
 * `overrideProvider` pins the implementation — a live sandbox must keep
 * talking to the host that created it even if the workspace rebinds.
 */
export async function dispatchInterface(
  ctx: ServiceContext,
  namespace: string,
  procedure: string,
  args: Record<string, unknown>,
  overrideProvider?: string,
  profile?: string,
  callSiteOptions?: Record<string, unknown>,
): Promise<unknown> {
  if (usesEmbedInterfaceDispatch()) {
    const { namespace: ns, profile: embedProfile } = resolveEmbedTarget(
      ctx,
      namespace,
      profile,
      overrideProvider,
    );
    return dispatchThroughEmbed(
      ctx,
      ns,
      procedure,
      callSiteOptions ? { ...args, ...callSiteOptions } : args,
      embedProfile ? { profile: embedProfile } : undefined,
    );
  }

  const parsed = parseInterfaceNamespace(namespace);
  const interfaceId = parsed?.interfaceId ?? namespace;
  // Agent profiles may redirect the default interface to a named profile.
  let effectiveProfile = profile;
  if (effectiveProfile === undefined && parsed) {
    const redirected = ctx.interfaceInstances?.[interfaceId];
    if (redirected && typeof redirected === "object" && redirected !== null) {
      const pin = redirected as { interface?: string; profile?: string };
      if (typeof pin.profile === "string") effectiveProfile = pin.profile;
    } else if (typeof redirected === "string" && !redirected.includes(":")) {
      effectiveProfile = redirected;
    } else if (typeof redirected === "string") {
      const sep = redirected.indexOf(":");
      if (sep !== -1) effectiveProfile = redirected.slice(sep + 1);
    }
  }
  const resolved = await resolveInterfaceForWorkspace(
    ctx.workspaceId,
    interfaceId,
    overrideProvider ?? ctx.interfaceBindings?.[interfaceId],
    effectiveProfile,
  );
  if (resolved.compat.unavailable) {
    throw new ServiceError(
      `${resolved.instance} resolves to ${resolved.compat.provider}: ${resolved.compat.unavailable}`,
      501,
    );
  }
  const withDefaults = resolved.def.defaultsFor.includes(procedure)
    ? { ...resolved.options, ...args, ...(callSiteOptions ?? {}) }
    : { ...args, ...(callSiteOptions ?? {}) };
  if (resolved.def.id === "agent" && resolved.compat.provider === "native") {
    const { dispatchNativeAgentOp } = await import("../agents/runner.js");
    return dispatchNativeAgentOp(ctx, procedure, withDefaults);
  }
  if (resolved.compat.provider === "aprovan") {
    const { dispatchAprovanNativeOp, isAprovanNativeBinding } = await import(
      "../native-dispatch.js"
    );
    if (isAprovanNativeBinding(resolved.def.id, resolved.compat.provider)) {
      return dispatchAprovanNativeOp(ctx, resolved.def.id, procedure, withDefaults);
    }
  }
  return dispatchProviderLegacy(ctx, {
    credentialProvider: resolved.compat.provider,
    ...(resolved.credentialId ? { credentialId: resolved.credentialId } : {}),
    module: resolved.compat.module,
    ...(resolved.compat.moduleSpecifier
      ? { moduleSpecifier: resolved.compat.moduleSpecifier }
      : {}),
    baseUrl: resolved.baseUrl,
    procedure,
    args: withDefaults,
    timeout: resolved.def.timeoutMs,
    label: `${resolved.instance}→${resolved.compat.provider}`,
  });
}

interface ProviderDispatch {
  credentialProvider: string;
  credentialId?: string;
  credentialProfile?: string;
  module: string;
  moduleSpecifier?: string;
  baseUrl?: string;
  procedure: string;
  args: Record<string, unknown>;
  timeout: number;
  label: string;
}

/** Resolve a provider's workspace credential to an injectable payload. */
async function resolveProviderCredentials(
  ctx: ServiceContext,
  provider: string,
  label: string,
  credentialId?: string,
  credentialProfile?: string,
): Promise<CredentialPayload | undefined> {
  const store = getCredentialStore();
  let record: { id: string; payload: CredentialPayload } | undefined;
  try {
    record = await resolveCredentialRecord(
      ctx.workspaceId,
      provider,
      credentialId,
      credentialProfile,
    );
  } catch (err) {
    throw new ServiceError(err instanceof Error ? err.message : String(err), 400);
  }
  if (!record) return undefined;
  try {
    return await resolveToInjectable(record.payload, {
      cacheKey: `${ctx.workspaceId}:${provider}:${record.id}`,
      persist: (payload) => store.updatePayload(ctx.workspaceId, record.id, payload),
    });
  } catch (err) {
    throw new ServiceError(
      err instanceof OAuthExchangeError
        ? `OAuth token resolution failed for ${label}: ${err.message}`
        : `OAuth token resolution failed for ${label}`,
      502,
    );
  }
}

/** Interim dynamo-backend provider dispatch (removed at STORE_BACKEND=dsql). */
async function dispatchProviderLegacy(
  ctx: ServiceContext,
  dispatch: ProviderDispatch,
): Promise<unknown> {
  const credentials = await resolveProviderCredentials(
    ctx,
    dispatch.credentialProvider,
    dispatch.label,
    dispatch.credentialId,
    dispatch.credentialProfile,
  );

  const executor = await getExecutor();
  const result = await executor.execute({
    provider: dispatch.module,
    ...(dispatch.moduleSpecifier ? { module: dispatch.moduleSpecifier } : {}),
    operation: dispatch.procedure,
    args: dispatch.args,
    credentials,
    ...(dispatch.baseUrl ? { baseUrl: dispatch.baseUrl } : {}),
    timeout: dispatch.timeout,
  });
  if (!result.success) {
    throw new ServiceError(
      result.error ?? `${dispatch.label}.${dispatch.procedure} failed`,
      502,
    );
  }
  return result.data;
}
