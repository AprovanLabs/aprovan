import { GatewayClient } from "@aprovan/registry-main";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  addCredential,
  deleteCredential,
  listCredentials,
  parseGatewayStatus,
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

describe("credentials api", () => {
  const client = new GatewayClient({
    baseUrl: BASE,
    getToken: () => "test-token",
  });

  it("lists credentials", async () => {
    mockFetch((url) => {
      expect(url).toBe(`${BASE}/credentials`);
      return new Response(
        JSON.stringify({
          credentials: [
            {
              id: "cred-1",
              workspaceId: "ws-1",
              provider: "github",
              type: "bearer_token",
              createdAt: "2026-01-01T00:00:00Z",
              updatedAt: "2026-01-01T00:00:00Z",
            },
          ],
        }),
        { status: 200 },
      );
    });

    const records = await listCredentials(client);
    expect(records).toHaveLength(1);
    expect(records[0]?.provider).toBe("github");
  });

  it("adds a credential", async () => {
    mockFetch((url, init) => {
      expect(url).toBe(`${BASE}/credentials`);
      expect(init?.method).toBe("POST");
      const body = JSON.parse(String(init?.body)) as {
        provider: string;
        payload: { type: string };
      };
      expect(body.provider).toBe("openrouter");
      expect(body.payload.type).toBe("api_key");
      return new Response(
        JSON.stringify({
          id: "cred-2",
          workspaceId: "ws-1",
          provider: "openrouter",
          type: "api_key",
          createdAt: "2026-01-02T00:00:00Z",
          updatedAt: "2026-01-02T00:00:00Z",
        }),
        { status: 201 },
      );
    });

    const record = await addCredential(client, {
      provider: "openrouter",
      payload: { type: "api_key", value: "sk-test" },
    });
    expect(record.id).toBe("cred-2");
  });

  it("deletes a credential", async () => {
    mockFetch((url, init) => {
      expect(url).toBe(`${BASE}/credentials/cred-1`);
      expect(init?.method).toBe("DELETE");
      return new Response(JSON.stringify({ deleted: true }), { status: 200 });
    });

    await deleteCredential(client, "cred-1");
  });

  it("parses gateway error status from client errors", async () => {
    mockFetch(() => new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 }));

    let caught: unknown;
    try {
      await listCredentials(client);
    } catch (err) {
      caught = err;
    }
    expect(caught).toBeInstanceOf(Error);
    expect(parseGatewayStatus(caught)).toBe(403);
  });
});
