/**
 * @vitest-environment happy-dom
 *
 * Runtime gateway resolution wiring in patchwork-web.
 * Covers specs/runtime-gateway-resolution scenarios end-to-end through the
 * module exports (GATEWAY_BASE, MCP_URL, createRegistryGatewayClient).
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ACTIVE_WORKSPACE_KEY = "patchwork:active-workspace";
const WORKSPACE_ENDPOINTS_KEY = "patchwork:workspace-endpoints";

vi.stubEnv("DEV", true);

beforeEach(() => {
  localStorage.clear();
  vi.resetModules();
});

afterEach(() => {
  localStorage.clear();
});

async function loadGateway() {
  return import("../gateway");
}

describe("runtime gateway resolution (patchwork-web)", () => {
  it("addresses the build-time gateway when no workspace record is present", async () => {
    const { GATEWAY_BASE, getGatewayBase, MCP_URL, getMcpUrl } = await loadGateway();
    expect(getGatewayBase()).toBe("/gateway");
    expect(String(GATEWAY_BASE)).toBe("/gateway");
    expect(getMcpUrl()).toBe("/gateway/mcp");
    expect(String(MCP_URL)).toBe("/gateway/mcp");
  });

  it("switches GATEWAY_BASE when the active workspace changes", async () => {
    localStorage.setItem(
      WORKSPACE_ENDPOINTS_KEY,
      JSON.stringify([
        {
          workspaceId: "local-1",
          locus: "local",
          baseUrl: "http://127.0.0.1:4000/api/gateway",
        },
        {
          workspaceId: "cloud-1",
          locus: "cloud",
          baseUrl: "https://aprovan.com/api/gateway",
        },
      ]),
    );
    localStorage.setItem(ACTIVE_WORKSPACE_KEY, "local-1");

    const { GATEWAY_BASE, getGatewayBase, MCP_URL } = await loadGateway();
    expect(getGatewayBase()).toBe("http://127.0.0.1:4000/api/gateway");
    expect(`${GATEWAY_BASE}/session`).toBe(
      "http://127.0.0.1:4000/api/gateway/session",
    );
    expect(String(MCP_URL)).toBe("http://127.0.0.1:4000/api/mcp");

    localStorage.setItem(ACTIVE_WORKSPACE_KEY, "cloud-1");
    expect(getGatewayBase()).toBe("https://aprovan.com/api/gateway");
    expect(`${GATEWAY_BASE}/session`).toBe("https://aprovan.com/api/gateway/session");
    expect(String(MCP_URL)).toBe("https://aprovan.com/api/mcp");
  });

  it("keeps two workspaces of different loci on distinct gateways", async () => {
    localStorage.setItem(
      WORKSPACE_ENDPOINTS_KEY,
      JSON.stringify([
        {
          workspaceId: "local-1",
          locus: "local",
          baseUrl: "http://127.0.0.1:4000/api/gateway",
        },
        {
          workspaceId: "cloud-1",
          locus: "cloud",
          baseUrl: "https://aprovan.com/api/gateway",
        },
      ]),
    );

    const { gatewayResolver } = await loadGateway();
    const local = gatewayResolver.forWorkspace("local-1");
    const cloud = gatewayResolver.forWorkspace("cloud-1");
    expect(local?.locus).toBe("local");
    expect(cloud?.locus).toBe("cloud");
    expect(local?.baseUrl).not.toBe(cloud?.baseUrl);
  });

  it("createRegistryGatewayClient resolves baseUrl per request", async () => {
    localStorage.setItem(
      WORKSPACE_ENDPOINTS_KEY,
      JSON.stringify([
        {
          workspaceId: "local-1",
          locus: "local",
          baseUrl: "http://127.0.0.1:4000/api/gateway",
        },
        {
          workspaceId: "cloud-1",
          locus: "cloud",
          baseUrl: "https://aprovan.com/api/gateway",
        },
      ]),
    );
    localStorage.setItem(ACTIVE_WORKSPACE_KEY, "local-1");

    const fetches: string[] = [];
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      fetches.push(String(input));
      return new Response(JSON.stringify({ version: "test" }), { status: 200 });
    }) as typeof fetch;

    try {
      const { createRegistryGatewayClient } = await loadGateway();
      const client = createRegistryGatewayClient();
      await client.config();
      expect(fetches[0]).toContain("http://127.0.0.1:4000/api/gateway");

      localStorage.setItem(ACTIVE_WORKSPACE_KEY, "cloud-1");
      await client.config();
      expect(fetches[1]).toContain("https://aprovan.com/api/gateway");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("mcpUrlFromGatewayBase maps absolute and relative gateway bases", async () => {
    const { mcpUrlFromGatewayBase } = await loadGateway();
    expect(mcpUrlFromGatewayBase("/gateway")).toBe("/gateway/mcp");
    expect(mcpUrlFromGatewayBase("https://aprovan.com/api/gateway")).toBe(
      "https://aprovan.com/api/mcp",
    );
  });
});
