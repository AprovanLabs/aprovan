import { describe, expect, it } from "vitest";
import { createGatewayClient } from "../client";
import { createGatewayResolver } from "../resolver";

const FALLBACK = "https://aprovan.com/api/gateway";

describe("createGatewayResolver", () => {
  it("falls back to the build-time URL when no workspace record is present", () => {
    const resolver = createGatewayResolver({
      defaultBaseUrl: FALLBACK,
      getActiveWorkspaceId: () => null,
      getSources: () => [],
    });

    expect(resolver.active()).toBeUndefined();
    expect(resolver.list()).toEqual([]);
    // Callers treat a missing active endpoint as the build-time default.
    expect(resolver.active()?.baseUrl ?? FALLBACK).toBe(FALLBACK);
  });

  it("defaults locus to cloud when the source omits it", () => {
    const resolver = createGatewayResolver({
      defaultBaseUrl: FALLBACK,
      getActiveWorkspaceId: () => "ws-1",
      getSources: () => [{ workspaceId: "ws-1" }],
    });

    expect(resolver.active()?.locus).toBe("cloud");
    expect(resolver.active()?.baseUrl).toBe(FALLBACK);
  });

  it("synthesizes a cloud endpoint with the build-time URL for an active id with no source", () => {
    const resolver = createGatewayResolver({
      defaultBaseUrl: FALLBACK,
      getActiveWorkspaceId: () => "orphan",
      getSources: () => [],
    });

    const active = resolver.active();
    expect(active).toEqual(
      expect.objectContaining({
        workspaceId: "orphan",
        locus: "cloud",
        baseUrl: FALLBACK,
      }),
    );
  });

  it("switches base URL when the active workspace changes (no reload)", () => {
    let activeId = "local-1";
    const resolver = createGatewayResolver({
      defaultBaseUrl: FALLBACK,
      getActiveWorkspaceId: () => activeId,
      getSources: () => [
        {
          workspaceId: "local-1",
          locus: "local",
          baseUrl: "http://127.0.0.1:4000/api/gateway",
          getToken: () => "local-token",
        },
        {
          workspaceId: "cloud-1",
          locus: "cloud",
          baseUrl: "https://aprovan.com/api/gateway",
          getToken: () => "cloud-token",
        },
      ],
    });

    expect(resolver.active()?.baseUrl).toBe("http://127.0.0.1:4000/api/gateway");
    expect(resolver.active()?.getToken()).toBe("local-token");

    activeId = "cloud-1";
    expect(resolver.active()?.baseUrl).toBe("https://aprovan.com/api/gateway");
    expect(resolver.active()?.getToken()).toBe("cloud-token");
  });

  it("keeps two workspaces of different loci on distinct URLs and tokens", () => {
    const resolver = createGatewayResolver({
      defaultBaseUrl: FALLBACK,
      getActiveWorkspaceId: () => "local-1",
      getSources: () => [
        {
          workspaceId: "local-1",
          locus: "local",
          baseUrl: "http://127.0.0.1:4000/api/gateway",
          getToken: () => "local-token",
        },
        {
          workspaceId: "cloud-1",
          locus: "cloud",
          baseUrl: "https://aprovan.com/api/gateway",
          getToken: () => "cloud-token",
        },
      ],
    });

    const local = resolver.forWorkspace("local-1");
    const cloud = resolver.forWorkspace("cloud-1");
    expect(local?.baseUrl).toBe("http://127.0.0.1:4000/api/gateway");
    expect(cloud?.baseUrl).toBe("https://aprovan.com/api/gateway");
    expect(local?.getToken()).toBe("local-token");
    expect(cloud?.getToken()).toBe("cloud-token");
    expect(local?.baseUrl).not.toBe(cloud?.baseUrl);

    const listed = resolver.list();
    expect(listed).toHaveLength(2);
    expect(listed.map((e) => e.locus).sort()).toEqual(["cloud", "local"]);
  });

  it("strips trailing slashes from base URLs", () => {
    const resolver = createGatewayResolver({
      defaultBaseUrl: `${FALLBACK}/`,
      getActiveWorkspaceId: () => "ws",
      getSources: () => [
        { workspaceId: "ws", baseUrl: "http://localhost:4000/api/gateway/" },
      ],
    });

    expect(resolver.active()?.baseUrl).toBe("http://localhost:4000/api/gateway");
  });
});

describe("createGatewayClient runtime baseUrl", () => {
  it("addresses the active workspace base URL on each request", async () => {
    let baseUrl = "http://local.test/api/gateway";
    const fetches: string[] = [];
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      fetches.push(String(input));
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }) as typeof fetch;

    try {
      const client = createGatewayClient({
        get baseUrl() {
          return baseUrl;
        },
        getToken: () => undefined,
      });

      await client.request("/session");
      expect(fetches[0]).toBe("http://local.test/api/gateway/session");

      baseUrl = "https://aprovan.com/api/gateway";
      await client.request("/session");
      expect(fetches[1]).toBe("https://aprovan.com/api/gateway/session");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("re-resolves defaultBaseUrl when it is a getter", () => {
    let fallback = "https://aprovan.com/api/gateway";
    const resolver = createGatewayResolver({
      defaultBaseUrl: () => fallback,
      getActiveWorkspaceId: () => "ws-1",
      getSources: () => [{ workspaceId: "ws-1" }],
    });

    expect(resolver.active()?.baseUrl).toBe("https://aprovan.com/api/gateway");
    fallback = "http://127.0.0.1:4242/api/gateway";
    expect(resolver.active()?.baseUrl).toBe("http://127.0.0.1:4242/api/gateway");
  });
});
