/**
 * In-process embed of `@aprovan/registry-server` — the WS-3/WS-4 composition
 * root. Booted once per process; product routes call `dispatch()` for
 * contract-addressed tool execution instead of loopback HTTP.
 */

import {
  createRegistryServer,
  defaultCatalog,
  ProviderExecutor,
  type CallContext,
  type RegistryServer,
} from "@aprovan/registry-server";
import { dispatchNativeAgentOp } from "./agents/runner.js";
import { dispatchAprovanNativeOp } from "./native-dispatch.js";
import { getExecutor } from "./isolate.js";
import { getAuthMode } from "./middleware/auth.js";
import { getRegistryStorage } from "./registry-storage.js";
import {
  CORE_SERVICE_NAMES,
  getCoreService,
  type CoreService,
} from "./service-kernel.js";
import { ensureTenantForWorkspace, tenantIdForWorkspace } from "./tenant-registry.js";
import type { ServiceContext } from "./service-kernel.js";

let _server: Promise<RegistryServer> | undefined;

/** Route embed execution through the workspace executor (shared test seams). */
class WorkspaceBackedExecutor extends ProviderExecutor {
  override async execute(
    options: Parameters<ProviderExecutor["execute"]>[0],
  ): Promise<Awaited<ReturnType<ProviderExecutor["execute"]>>> {
    const workspace = await getExecutor();
    return workspace.execute({
      provider: options.provider,
      ...(options.module ? { module: options.module } : {}),
      operation: options.operation,
      args: options.args,
      credentials: options.credentials,
      ...(options.baseUrl ? { baseUrl: options.baseUrl } : {}),
      ...(options.timeout !== undefined ? { timeout: options.timeout } : {}),
    });
  }
}

const embedExecutor = new WorkspaceBackedExecutor();

/** Lazily construct and memoize the embedded registry server. */
export function getRegistryServer(): Promise<RegistryServer> {
  _server ??= bootRegistryServer();
  return _server;
}

async function bootRegistryServer(): Promise<RegistryServer> {
  // Product core services must be registered before dispatch routes through the package.
  await import("./services.js");
  const nativeServices: Record<string, CoreService> = {};
  for (const name of CORE_SERVICE_NAMES) {
    const svc = getCoreService(name);
    if (svc) nativeServices[name] = svc;
  }

  const storage = await getRegistryStorage();
  const authMode = getAuthMode();
  const server = await createRegistryServer({
    storage,
    catalog: defaultCatalog(),
    nativeServices,
    executorInstance: embedExecutor,
    ...(authMode === "none" ? { allowInsecure: true } : {}),
    auth:
      authMode === "none"
        ? { mode: "none" }
        : { mode: "oidc", issuer: process.env["COGNITO_AUTHORITY"]!, audience: process.env["COGNITO_CLIENT_ID"]! },
    tenancy: {
      mode: "external",
      resolve: async (authn) => {
        const workspaceId =
          (authn.claims?.["workspaceId"] as string | undefined) ??
          (authn.claims?.["custom:workspaceId"] as string | undefined);
        if (!workspaceId) {
          throw new Error("No workspace id in auth context for tenant resolution");
        }
        await ensureTenantForWorkspace(workspaceId);
        return {
          tenantId: tenantIdForWorkspace(workspaceId),
          role: "admin" as const,
          groupIds: [] as string[],
        };
      },
    },
    compatDispatch: {
      agent: async (ctx, operation, args) =>
        dispatchNativeAgentOp(ctx, operation, args as Record<string, unknown>),
      vfs: async (ctx, operation, args) =>
        dispatchAprovanNativeOp(ctx, "vfs", operation, args as Record<string, unknown>),
      vcs: async (ctx, operation, args) =>
        dispatchAprovanNativeOp(ctx, "vcs", operation, args as Record<string, unknown>),
      keyvalue: async (ctx, operation, args) =>
        dispatchAprovanNativeOp(ctx, "keyvalue", operation, args as Record<string, unknown>),
      events: async (ctx, operation, args) =>
        dispatchAprovanNativeOp(ctx, "events", operation, args as Record<string, unknown>),
      telemetry: async (ctx, operation, args) =>
        dispatchAprovanNativeOp(ctx, "telemetry", operation, args as Record<string, unknown>),
    },
    telemetry: {
      otlpEndpoint: process.env["OTEL_EXPORTER_OTLP_ENDPOINT"],
      serviceName: "aprovan-registry-embed",
    },
  });
  return server;
}

/** Reset the memoized server (tests). */
export async function resetRegistryServer(): Promise<void> {
  const pending = _server;
  _server = undefined;
  if (pending) {
    await pending.then((s) => s.close()).catch(() => undefined);
  }
}

/** Build a registry CallContext from a product ServiceContext. */
export function callContextFromService(ctx: ServiceContext): CallContext {
  return {
    tenantId: tenantIdForWorkspace(ctx.workspaceId),
    principal: ctx.userId,
    role: "admin",
    groupIds: [],
    source: { type: "tool" },
  };
}

function serviceContextFromCall(ctx: CallContext): ServiceContext {
  return {
    workspaceId: ctx.tenantId,
    userId: ctx.principal,
  };
}

/** Dispatch one namespaced operation through the embedded registry server. */
export async function registryDispatch(
  ctx: ServiceContext,
  namespace: string,
  operation: string,
  args: Record<string, unknown>,
  opts?: { profile?: string },
): Promise<unknown> {
  const server = await getRegistryServer();
  const result = await server.dispatch(
    callContextFromService(ctx),
    namespace,
    operation,
    args,
    opts,
  );
  if (result.kind === "stream") {
    return new Response(result.stream).text();
  }
  return result.data;
}
