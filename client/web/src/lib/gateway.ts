/**
 * Workspace API client for patchwork.
 *
 * Gateway base URL resolves at runtime from the active workspace via
 * {@link GatewayResolver}. Build-time `VITE_GATEWAY_URL` remains the fallback
 * when a workspace carries no explicit URL, so the deployed website is unchanged.
 */

import { GatewayClient as RegistryGatewayClient } from "@aprovan/registry-main";
import {
  createGatewayClient,
  createGatewayResolver,
  type GatewayClient,
  type GatewayResolver,
} from "@aprovan/ui/gateway";
import { ACTIVE_WORKSPACE_KEY } from "@/features/tabs/useTabs";
import { listWorkspaceEndpointRecords } from "@/features/tabs/workspace-endpoints";
import { getAccessTokenSync } from "./auth";

const FALLBACK_GATEWAY_BASE =
  (import.meta.env["VITE_GATEWAY_URL"] as string | undefined)?.replace(/\/$/, "") ||
  (import.meta.env.DEV ? "/gateway" : "https://aprovan.com/api/gateway");

const FALLBACK_MCP_URL =
  (import.meta.env["VITE_MCP_URL"] as string | undefined) ||
  (import.meta.env.DEV ? "/gateway/mcp" : "https://aprovan.com/api/mcp");

/**
 * Derive an MCP URL from a gateway base URL.
 * `/gateway` → `/gateway/mcp`; `…/api/gateway` → `…/api/mcp`.
 */
export function mcpUrlFromGatewayBase(base: string): string {
  const trimmed = base.replace(/\/$/, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed.replace(/\/gateway$/, "/mcp");
  }
  if (trimmed.endsWith("/gateway")) return `${trimmed}/mcp`;
  return `${trimmed}/mcp`;
}

export const gatewayResolver: GatewayResolver = createGatewayResolver({
  defaultBaseUrl: FALLBACK_GATEWAY_BASE,
  getActiveWorkspaceId: () => localStorage.getItem(ACTIVE_WORKSPACE_KEY),
  getSources: () =>
    listWorkspaceEndpointRecords().map((r) => ({
      workspaceId: r.workspaceId,
      locus: r.locus,
      baseUrl: r.baseUrl,
    })),
  getToken: () => getAccessTokenSync() ?? undefined,
});

/** Resolve the gateway base URL for the active workspace (build-time fallback). */
export function getGatewayBase(): string {
  return gatewayResolver.active()?.baseUrl ?? FALLBACK_GATEWAY_BASE;
}

/** Resolve the MCP URL for the active workspace (build-time fallback). */
export function getMcpUrl(): string {
  const active = gatewayResolver.active();
  if (!active) return FALLBACK_MCP_URL;
  const record = listWorkspaceEndpointRecords().find(
    (r) => r.workspaceId === active.workspaceId,
  );
  // Only derive MCP from the gateway when the workspace carries an explicit URL.
  if (!record?.baseUrl) return FALLBACK_MCP_URL;
  return mcpUrlFromGatewayBase(active.baseUrl);
}

/**
 * Live string that re-resolves on each access so existing `` `${GATEWAY_BASE}/…` ``
 * call sites track the active workspace without a rebuild.
 */
function liveString(resolve: () => string): string {
  return new Proxy(
    {},
    {
      get(_target, prop) {
        const value = resolve();
        if (prop === Symbol.toPrimitive || prop === "toString" || prop === "valueOf") {
          return () => value;
        }
        const member = (value as unknown as Record<string | symbol, unknown>)[prop];
        return typeof member === "function"
          ? (member as (...args: unknown[]) => unknown).bind(value)
          : member;
      },
    },
  ) as unknown as string;
}

/** Public MCP endpoint (REST and MCP no longer share a prefix). */
export const MCP_URL: string = liveString(getMcpUrl);

/** Gateway REST base URL — resolves from the active workspace at access time. */
export const GATEWAY_BASE: string = liveString(getGatewayBase);

export const gateway: GatewayClient = createGatewayClient({
  get baseUrl() {
    return getGatewayBase();
  },
  getToken: () => getAccessTokenSync() ?? undefined,
  getWorkspaceId: () => localStorage.getItem(ACTIVE_WORKSPACE_KEY) ?? undefined,
});

/** Gateway client for `@aprovan/registry-ui` credential/admin widgets. */
export function createRegistryGatewayClient(): RegistryGatewayClient {
  return new RegistryGatewayClient({
    get baseUrl() {
      return getGatewayBase();
    },
    getToken: () => getAccessTokenSync() ?? undefined,
    getWorkspaceId: () => localStorage.getItem(ACTIVE_WORKSPACE_KEY) ?? undefined,
  });
}
