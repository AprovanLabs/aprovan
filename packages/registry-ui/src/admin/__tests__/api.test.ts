import { GatewayClient } from "@aprovan/registry-main";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createProfile,
  listApiKeys,
  listAudit,
  listProfileGrants,
  mintApiKey,
  revokeApiKey,
} from "../api";

const BASE = "http://gateway.test";

function mockFetch(
  handler: (url: string, init?: RequestInit) => Response | Promise<Response>,
): void {
  vi.stubGlobal(
    "fetch",
    vi.fn((input: string | URL | Request, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input.toString();
      return handler(url, init);
    }),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("admin api", () => {
  const client = new GatewayClient({
    baseUrl: BASE,
    getToken: () => "test-token",
  });

  it("lists and mints api keys", async () => {
    mockFetch((url, init) => {
      if (url === `${BASE}/api-keys` && (!init?.method || init.method === "GET")) {
        return new Response(
          JSON.stringify({
            keys: [
              {
                id: "key-1",
                tenantId: "t1",
                label: "ci",
                createdBy: "admin",
                createdAt: "2026-01-01T00:00:00Z",
              },
            ],
          }),
          { status: 200 },
        );
      }
      expect(init?.method).toBe("POST");
      return new Response(
        JSON.stringify({
          key: {
            id: "key-2",
            tenantId: "t1",
            createdBy: "admin",
            createdAt: "2026-01-02T00:00:00Z",
          },
          plaintext: "apr_secret",
        }),
        { status: 201 },
      );
    });

    const keys = await listApiKeys(client);
    expect(keys[0]?.label).toBe("ci");
    const minted = await mintApiKey(client, { label: "bot" });
    expect(minted.plaintext).toBe("apr_secret");
  });

  it("revokes an api key", async () => {
    mockFetch((url, init) => {
      expect(url).toBe(`${BASE}/api-keys/key-1`);
      expect(init?.method).toBe("DELETE");
      return new Response(JSON.stringify({ revoked: true }), { status: 200 });
    });
    await revokeApiKey(client, "key-1");
  });

  it("creates a profile and lists grants", async () => {
    mockFetch((url, init) => {
      if (url === `${BASE}/profiles` && init?.method === "POST") {
        return new Response(
          JSON.stringify({
            profile: {
              id: "p1",
              tenantId: "t1",
              name: "default",
              targetKind: "provider",
              targetId: "github",
              options: {},
              createdBy: "admin",
              createdAt: "2026-01-01T00:00:00Z",
              updatedAt: "2026-01-01T00:00:00Z",
            },
          }),
          { status: 201 },
        );
      }
      expect(url).toBe(`${BASE}/profiles/p1/grants`);
      return new Response(
        JSON.stringify({
          grants: [
            {
              tenantId: "t1",
              profileId: "p1",
              subjectKind: "user",
              subjectId: "u1",
              grantedBy: "admin",
              createdAt: "2026-01-01T00:00:00Z",
            },
          ],
        }),
        { status: 200 },
      );
    });

    const profile = await createProfile(client, {
      name: "default",
      target: { kind: "provider", provider: "github" },
    });
    expect(profile.id).toBe("p1");
    const grants = await listProfileGrants(client, "p1");
    expect(grants[0]?.subjectId).toBe("u1");
  });

  it("lists audit entries with limit", async () => {
    mockFetch((url) => {
      expect(url).toBe(`${BASE}/audit?limit=50`);
      return new Response(JSON.stringify({ audit: [] }), { status: 200 });
    });
    expect(await listAudit(client, { limit: 50 })).toEqual([]);
  });
});
