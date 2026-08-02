/**
 * In-process tool dispatch for workflow scripts — the server-side twin of
 * `POST /tools/:provider/:operation`, minus HTTP. Core services are called
 * directly; provider operations resolve workspace credentials and execute in
 * the isolate; LLM chat-provider aliases resolve to their OpenAI-compatible
 * module. Used by the workflow runner so a script's `github.repos.get(...)`
 * behaves identically to a widget's proxied call.
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
import { getCoreService, ServiceError } from "../service-kernel.js";
import { listUserGroupIds } from "../userGroups.js";
import type { ServiceContext } from "../service-kernel.js";

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
 * `profile` is the script-side `client(name)` pin (docs/interfaces.md;
 * formerly `getClient({ profile })`). It means two things, by namespace
 * kind, and the two
 * vocabularies are deliberately unified rather than a third being invented:
 *
 *   - provider namespaces (`github`): a credential *label* — resolved to
 *     that exact credential, with misses and ambiguity failing loudly
 *     (see resolveCredentialRecord);
 *   - interface namespaces (`llm`): an *instance* name — `getClient({
 *     profile: "fast" })` dispatches through `llm:fast`, because instances
 *     already are the interface world's profiles (their bindings carry the
 *     credential pin AND the option overrides a bare label never could).
 *
 * Both fail at call time with a ServiceError naming what exists; neither can
 * reach the module loader, whose errors name nothing the caller can act on.
 */
export async function invokeTool(
  ctx: ServiceContext,
  namespace: string,
  procedure: string,
  args: Record<string, unknown>,
  profile?: string,
): Promise<unknown> {
  // Agent-attributed runs are bounded by their profile's tool grants —
  // checked before any dispatch branch so native, interface, and provider
  // calls all answer to the same list.
  assertToolGranted(ctx.grants, namespace, procedure);
  const core = getCoreService(namespace);
  if (core) {
    if (profile !== undefined) {
      throw new ServiceError(
        `${namespace} is a core service — it has no credential profiles to pin with client()`,
        400,
      );
    }
    return core.call(ctx, procedure, args);
  }

  // Generic interfaces (llm, sql, sandbox, …) resolve to their bound
  // implementation and dispatch as that concrete provider — same call,
  // swappable backend.
  const parsed = parseInterfaceNamespace(namespace);
  if (parsed) {
    let target = namespace;
    if (profile !== undefined) {
      target = `${parsed.interfaceId}:${profile}`;
      if (!parseInterfaceNamespace(target)) {
        throw new ServiceError(
          `"${profile}" is not a valid ${parsed.interfaceId} instance name — ` +
            `interface profiles are instance names (lowercase letters, digits, hyphens)`,
          400,
        );
      }
    }
    await assertProviderAllowed(ctx, target, procedure);
    return dispatchInterface(ctx, target, procedure, args);
  }

  await assertProviderAllowed(ctx, namespace, procedure);

  const llmAlias = isLlmProvider(namespace) ? resolveLlmProvider(namespace) : undefined;
  let finalArgs = args;
  if (llmAlias && procedure === "createChatCompletion" && !("model" in finalArgs)) {
    finalArgs = { ...finalArgs, model: llmAlias.defaultModel };
  }

  return dispatchProvider(ctx, {
    credentialProvider: namespace,
    ...(profile !== undefined ? { credentialProfile: profile } : {}),
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
): Promise<unknown> {
  const parsed = parseInterfaceNamespace(namespace);
  const interfaceId = parsed?.interfaceId ?? namespace;
  // An agent's instance redirection applies only to the *default* namespace:
  // a script that explicitly said `llm:billing` meant `llm:billing`.
  const instance =
    parsed && parsed.name === undefined
      ? (ctx.interfaceInstances?.[interfaceId] ?? namespace)
      : namespace;
  const resolved = await resolveInterfaceForWorkspace(
    ctx.workspaceId,
    instance,
    overrideProvider ?? ctx.interfaceBindings?.[interfaceId],
  );
  // A declared-but-unbuilt implementation must not reach the isolate: the
  // loader's error names a package subpath, not the thing that is actually
  // missing. Same guard, same text as the HTTP twin (routes/tools.ts) — a
  // workflow script and a proxied widget call must fail identically.
  if (resolved.compat.unavailable) {
    throw new ServiceError(
      `${resolved.instance} resolves to ${resolved.compat.provider}: ${resolved.compat.unavailable}`,
      501,
    );
  }
  const withDefaults = resolved.def.defaultsFor.includes(procedure)
    ? { ...resolved.options, ...args }
    : args;
  // The gateway's own agent runtime executes in this process, so dispatch
  // short-circuits straight into the loop instead of importing a module —
  // the `machine` sandbox short-circuit (sandboxes/service.ts), for the same
  // reason: the implementation IS this process, and the compat entry's
  // `module: "native"` exists only to complete the resolution tuple.
  // Dynamic import because the runner dispatches its loop's LLM and tool
  // calls back through this module.
  if (resolved.def.id === "agent" && resolved.compat.provider === "native") {
    const { dispatchNativeAgentOp } = await import("../agents/runner.js");
    return dispatchNativeAgentOp(ctx, procedure, withDefaults);
  }
  return dispatchProvider(ctx, {
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
  /** Credential-store key (the concrete provider id). */
  credentialProvider: string;
  /** Pin to one specific credential (an interface instance's binding). */
  credentialId?: string;
  /** Pin by credential label (a script's `client(name)`). */
  credentialProfile?: string;
  /** UTDK module executed in the isolate (also names the client factory). */
  module: string;
  /** Import specifier, when the module is not in the UTDK catalogue. */
  moduleSpecifier?: string;
  baseUrl?: string;
  procedure: string;
  args: Record<string, unknown>;
  timeout: number;
  /** Human-readable name for error messages (e.g. "llm→anthropic"). */
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

async function dispatchProvider(
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
