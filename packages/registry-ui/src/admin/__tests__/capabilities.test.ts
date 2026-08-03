import { GatewayClient } from "@aprovan/registry-main";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  checkAdminAccess,
  DEFAULT_ADMIN_CAPABILITIES,
  tabsForCapabilities,
} from "../capabilities";

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

describe("admin capabilities", () => {
  it("defaults to the hosted members/groups/permissions sections", () => {
    expect(DEFAULT_ADMIN_CAPABILITIES).toEqual(["members", "groups", "permissions"]);
    expect(tabsForCapabilities()).toEqual([
      { id: "members", label: "Members" },
      { id: "groups", label: "Groups" },
      { id: "permissions", label: "Tool grants" },
    ]);
  });

  it("maps the standalone capability set to api-keys/profiles/audit tabs", () => {
    expect(tabsForCapabilities(["api-keys", "profiles", "audit"])).toEqual([
      { id: "api-keys", label: "API keys" },
      { id: "profiles", label: "Profiles" },
      { id: "audit", label: "Audit" },
    ]);
  });

  it("hosted access check hits /members only", async () => {
    const paths: string[] = [];
    mockFetch((url) => {
      paths.push(url.replace(BASE, ""));
      return new Response(JSON.stringify({ members: [] }), { status: 200 });
    });
    const client = new GatewayClient({ baseUrl: BASE, getToken: () => "t" });
    await checkAdminAccess(client, DEFAULT_ADMIN_CAPABILITIES);
    expect(paths).toEqual(["/members"]);
  });

  it("standalone access check never requests /members or /groups", async () => {
    const paths: string[] = [];
    mockFetch((url) => {
      paths.push(url.replace(BASE, ""));
      return new Response(JSON.stringify({ keys: [] }), { status: 200 });
    });
    const client = new GatewayClient({ baseUrl: BASE, getToken: () => "t" });
    await checkAdminAccess(client, ["api-keys", "profiles", "audit"]);
    expect(paths).toEqual(["/api-keys"]);
    expect(paths.some((p) => p.startsWith("/members") || p.startsWith("/groups"))).toBe(
      false,
    );
  });
});
