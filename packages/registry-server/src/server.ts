/**
 * `createRegistryServer(options)` — the composition root and the ONLY
 * constructor (registry-server spec "Library-first construction"). The
 * standalone entrypoint and Docker image are thin wrappers over this; the
 * embedded host calls it directly and mounts `router` / calls `dispatch`.
 */

import { createAuthAdapter } from "./auth/adapters.js";
import { createOAuthTokenCache } from "./credentials/oauth.js";
import { CredentialService } from "./credentials/service.js";
import { Dispatcher } from "./dispatch/index.js";
import { RateLimiter } from "./dispatch/limits.js";
import { ProviderExecutor, isCatalogueProvider } from "./executor/index.js";
import { DiscoveryService } from "./http/discovery.js";
import { buildRouter } from "./http/router.js";
import { NativeServiceRegistry, ServiceError } from "./kernel/index.js";
import { createMcpHandler } from "./mcp/server.js";
import { ProfileService } from "./profiles/service.js";
import { configureSandbox, runScriptInSandbox } from "./sandbox/quickjs.js";
import { createStorage } from "./storage/index.js";
import { TenantService } from "./tenancy/index.js";
import { RegistryTelemetry } from "./telemetry/index.js";
import type {
  CallContext,
  DispatchResult,
  RegistryServer,
  RegistryServerOptions,
  RunScriptOptions,
} from "./config/types.js";
import type { ResolveDeps } from "./profiles/resolve.js";

export async function createRegistryServer(
  options: RegistryServerOptions,
): Promise<RegistryServer> {
  // The insecure-boot guard, generalized from the aws-mode check: a
  // multi-tenant (external-tenancy) server that authenticates nobody exposes
  // every tenant's credentials to anyone who can reach it.
  const authMode =
    "mode" in options.auth ? options.auth.mode : (options.auth as { mode?: string }).mode ?? "custom";
  if (options.tenancy.mode === "external" && authMode === "none" && !options.allowInsecure) {
    throw new Error(
      "Refusing to start: external (multi-tenant) tenancy with auth mode \"none\" would expose " +
        "every tenant to every caller. Configure auth (oidc, api-key, or an AuthAdapter), or set " +
        "allowInsecure: true if you genuinely intend an unauthenticated multi-tenant server.",
    );
  }

  const storage = await createStorage(options.storage);
  const tenancy = new TenantService(
    storage.tenants,
    options.tenancy.mode === "external"
      ? { mode: "external", resolve: options.tenancy.resolve }
      : { mode: "single" },
  );
  await tenancy.init();

  const adapter = createAuthAdapter(options.auth, storage.apiKeys);
  await adapter.init();

  const telemetry = new RegistryTelemetry(options.telemetry ?? {});
  const credentials = new CredentialService(storage.credentials);
  const profileService = new ProfileService(
    storage.profiles,
    storage.grants,
    credentials,
    options.catalog,
  );
  const resolveDeps: ResolveDeps = {
    catalog: options.catalog,
    profiles: storage.profiles,
    profileService,
    credentials,
    isKnownProvider: isCatalogueProvider,
    authMode: adapter.mode,
  };
  const executor = new ProviderExecutor(options.executor ?? {});
  configureSandbox(options.sandbox ?? {});
  const limiter = new RateLimiter(options.limits ?? {});
  const natives = new NativeServiceRegistry(options.nativeServices);
  const dispatcher = new Dispatcher({
    catalog: options.catalog,
    natives,
    credentials,
    resolveDeps,
    executor,
    limiter,
    telemetry,
    audit: storage.audit,
    oauthCache: createOAuthTokenCache(),
    ...(options.compatDispatch ? { compatDispatch: options.compatDispatch } : {}),
  });
  const discovery = new DiscoveryService({
    catalog: options.catalog,
    natives,
    credentials,
    profiles: storage.profiles,
    executor,
    resolveDeps,
  });
  const mcpHandler = createMcpHandler({
    dispatcher,
    resolveDeps,
    ...(options.mcp?.extensions ? { extensions: options.mcp.extensions } : {}),
  });

  const router = buildRouter({
    adapter,
    tenancy,
    dispatcher,
    discovery,
    credentials,
    profiles: profileService,
    apiKeys: storage.apiKeys,
    audit: storage.audit,
    mcpHandler,
  });

  const dispatch = async (
    ctx: CallContext,
    namespace: string,
    operation: string,
    args: Record<string, unknown>,
    opts?: { profile?: string; stream?: boolean },
  ): Promise<DispatchResult> => {
    // Embedded hosts assert tenants; rows auto-provision on first use.
    await tenancy.ensureTenant(ctx.tenantId);
    return dispatcher.dispatch(ctx, namespace, operation, args, opts ?? {});
  };

  const runScript = async (ctx: CallContext, opts: RunScriptOptions): Promise<unknown> => {
    await tenancy.ensureTenant(ctx.tenantId);
    return runScriptInSandbox({
      source: opts.source,
      ...(opts.filename !== undefined ? { filename: opts.filename } : {}),
      input: opts.input ?? null,
      namespaces: opts.namespaces,
      timeoutMs: opts.timeoutMs ?? 30_000,
      ...(opts.agent !== undefined ? { agent: opts.agent } : {}),
      log: opts.log ?? (() => undefined),
      dispatch: async (namespace, path, args, profile) => {
        // Positional args follow the SDK call convention: a single object
        // argument is the operation's named args.
        const argObject =
          args.length === 1 && typeof args[0] === "object" && args[0] !== null
            ? (args[0] as Record<string, unknown>)
            : args.length === 0
              ? {}
              : { args };
        const result = await dispatcher.dispatch(
          ctx,
          namespace,
          path,
          argObject,
          profile !== undefined ? { profile } : {},
        );
        if (result.kind === "stream") {
          // The guest boundary is JSON strings; buffer stream results.
          return new Response(result.stream).text();
        }
        return result.data;
      },
    });
  };

  return {
    router,
    dispatch,
    runScript,
    stores: storage,
    telemetry,
    executor,
    async close() {
      await telemetry.shutdown();
      await storage.close();
    },
  };
}

export { ServiceError };
