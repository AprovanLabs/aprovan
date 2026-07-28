/**
 * Workspace API client for patchwork.
 *
 * The shared `createGatewayClient` works unmodified here: it sends the token
 * in the standard `Authorization` header, which reaches the workspace intact
 * now that CloudFront proxies to a container rather than SigV4-signing to a
 * Lambda Function URL. `gatewayFetch` (see ./gateway-fetch) remains as the
 * low-level authorized fetch used by the chat transport.
 */

import { createGatewayClient } from "@aprovan/ui/gateway";
import { getAccessTokenSync } from "./auth";
import type { GatewayClient } from "@aprovan/ui/gateway";

/** Public MCP endpoint (REST and MCP no longer share a prefix). */
export const MCP_URL =
  (import.meta.env["VITE_MCP_URL"] as string | undefined) ||
  (import.meta.env.DEV ? "/gateway/mcp" : "https://aprovan.com/api/mcp");

/** Gateway REST base URL. */
export const GATEWAY_BASE =
  (import.meta.env["VITE_GATEWAY_URL"] as string | undefined)?.replace(/\/$/, "") ||
  (import.meta.env.DEV ? "/gateway" : "https://aprovan.com/api/gateway");

export const gateway: GatewayClient = createGatewayClient({
  baseUrl: GATEWAY_BASE,
  getToken: getAccessTokenSync,
});
