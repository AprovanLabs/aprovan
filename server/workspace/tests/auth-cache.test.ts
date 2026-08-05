/**
 * Phase A / stream 3: the per-token auth resolution cache
 * (specs/identity-store "Per-token auth resolution cache"; tech-plan D6) and
 * the per-workspace mounts cache (specs/record-store "Cached mounts read").
 *
 * The principal-cache tests mock the three identity reads directly
 * (memberships/sessions/userGroups) and drive `resolvePrincipal` in
 * isolation — a precise, deterministic way to assert "reads occur at most
 * once" and "revocation takes effect immediately" without fighting the
 * shared DDB-mock fixture's static membership snapshot (see tests/helpers.ts,
 * which is built for route-level tests, not for reactively mutating
 * membership state mid-test).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { Context } from "hono";

const getMembership = vi.fn();
const getCurrentWorkspace = vi.fn();
const listUserGroupIds = vi.fn();
const getActiveWorkspaceId = vi.fn();

vi.mock("../src/memberships.js", () => ({
  getMembership: (...args: unknown[]) => getMembership(...args),
}));
vi.mock("../src/sessions.js", () => ({
  getCurrentWorkspace: (...args: unknown[]) => getCurrentWorkspace(...args),
  setCurrentWorkspace: vi.fn(),
}));
vi.mock("../src/userGroups.js", () => ({
  listUserGroupIds: (...args: unknown[]) => listUserGroupIds(...args),
}));
vi.mock("../src/users.js", () => ({
  getActiveWorkspaceId: (...args: unknown[]) => getActiveWorkspaceId(...args),
  setActiveWorkspaceId: vi.fn(),
}));

const { invalidatePrincipal, resetAuthCache } = await import("../src/auth-cache.js");
const { resetCognitoVerifier, resolvePrincipal, setCognitoVerifier } = await import(
  "../src/middleware/auth.js"
);

function fakeContext(headers: Record<string, string>): Context {
  return {
    req: { header: (name: string) => headers[name] },
  } as unknown as Context;
}

describe("auth principal cache", () => {
  beforeEach(() => {
    resetAuthCache();
    getMembership.mockReset().mockResolvedValue({ role: "member" });
    getCurrentWorkspace.mockReset().mockResolvedValue("ws-default");
    getActiveWorkspaceId.mockReset().mockResolvedValue(undefined);
    listUserGroupIds.mockReset().mockResolvedValue([]);
    process.env["OIDC_ISSUER"] = "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_authcache";
    process.env["OIDCAUDIENCE"] = "auth-cache-test";
    setCognitoVerifier({
      verify: vi.fn(async (token: string) => ({ sub: token === "tok-a" ? "user-a" : "user-b" })),
      hydrate: vi.fn(async () => undefined),
    });
  });

  afterEach(() => {
    resetCognitoVerifier();
    delete process.env["OIDC_ISSUER"];
    delete process.env["OIDCAUDIENCE"];
    delete process.env["AUTH_CACHE_TTL_MS"];
    resetAuthCache();
  });

  it("repeat requests hit the cache: reads occur at most once", async () => {
    const c = fakeContext({ Authorization: "Bearer tok-a" });
    for (let i = 0; i < 20; i += 1) {
      const principal = await resolvePrincipal(c);
      expect(principal.sub).toBe("user-a");
      expect(principal.workspaceId).toBe("ws-default");
    }
    expect(getCurrentWorkspace).toHaveBeenCalledTimes(1);
    expect(getMembership).toHaveBeenCalledTimes(1);
    expect(listUserGroupIds).toHaveBeenCalledTimes(1);
  });

  it("falls back to durable users.active_workspace_id when session row is empty", async () => {
    getCurrentWorkspace.mockResolvedValue(undefined);
    getActiveWorkspaceId.mockResolvedValue("ws-durable");
    const c = fakeContext({ Authorization: "Bearer tok-a" });
    const principal = await resolvePrincipal(c);
    expect(principal.workspaceId).toBe("ws-durable");
    expect(getActiveWorkspaceId).toHaveBeenCalledWith("user-a");
    expect(getMembership).toHaveBeenCalledWith("ws-durable", "user-a");
  });

  it("revocation takes effect immediately, no TTL wait", async () => {
    const c = fakeContext({ Authorization: "Bearer tok-a" });
    const before = await resolvePrincipal(c);
    expect(before.sub).toBe("user-a");

    // What memberships.ts' removeMember() does after deleting the row.
    getMembership.mockResolvedValue(undefined);
    invalidatePrincipal("user-a");

    await expect(resolvePrincipal(c)).rejects.toThrow("workspace_forbidden");
    // The miss re-read the store — not served from a stale cache entry.
    expect(getMembership).toHaveBeenCalledTimes(2);
  });

  it("keys per (token, requested workspace) — a workspace switch isn't poisoned", async () => {
    getMembership.mockImplementation((workspaceId: string) =>
      Promise.resolve({ role: workspaceId === "ws-1" ? "admin" : "member" }),
    );
    const cA = fakeContext({ Authorization: "Bearer tok-a", "X-Aprovan-Workspace": "ws-1" });
    const cB = fakeContext({ Authorization: "Bearer tok-a", "X-Aprovan-Workspace": "ws-2" });

    const p1 = await resolvePrincipal(cA);
    const p2 = await resolvePrincipal(cB);
    expect(p1).toMatchObject({ workspaceId: "ws-1", role: "admin" });
    expect(p2).toMatchObject({ workspaceId: "ws-2", role: "member" });
    expect(getMembership).toHaveBeenCalledTimes(2);
    // getCurrentWorkspace is only consulted when no header is sent.
    expect(getCurrentWorkspace).not.toHaveBeenCalled();

    // Both workspaces are now cached independently.
    await resolvePrincipal(cA);
    await resolvePrincipal(cB);
    expect(getMembership).toHaveBeenCalledTimes(2);
  });

  it("expires after the configured TTL", async () => {
    process.env["AUTH_CACHE_TTL_MS"] = "30";
    resetAuthCache();
    const c = fakeContext({ Authorization: "Bearer tok-a" });
    await resolvePrincipal(c);
    expect(getMembership).toHaveBeenCalledTimes(1);
    await new Promise((resolve) => setTimeout(resolve, 60));
    await resolvePrincipal(c);
    expect(getMembership).toHaveBeenCalledTimes(2);
  });
});

// ---------------------------------------------------------------------------
// Mounts cache (specs/record-store "Cached mounts read")
// ---------------------------------------------------------------------------

describe("mounts cache", () => {
  let dataDir: string;

  beforeAll(async () => {
    dataDir = mkdtempSync(join(tmpdir(), "gateway-mounts-cache-"));
    process.env["WORKSPACE_DATA_DIR"] = dataDir;
  });

  afterAll(() => {
    delete process.env["WORKSPACE_DATA_DIR"];
    rmSync(dataDir, { recursive: true, force: true });
  });

  afterEach(async () => {
    const { resetMountsCache } = await import("../src/vcs/mounts.js");
    resetMountsCache();
    vi.restoreAllMocks();
  });

  it("hot path performs at most one backing read per TTL window", async () => {
    const { readMounts } = await import("../src/vcs/mounts.js");
    const { getFsStore } = await import("../src/fs-store.js");
    await readMounts("mountscache-hot"); // warm the cache
    const readSpy = vi.spyOn(getFsStore(), "read");
    for (let i = 0; i < 10; i += 1) await readMounts("mountscache-hot");
    expect(readSpy).not.toHaveBeenCalled();
  });

  it("invalidates synchronously on addMount and removeMount", async () => {
    const { addMount, readMounts, removeMount } = await import("../src/vcs/mounts.js");
    const workspaceId = "mountscache-crud";
    expect(await readMounts(workspaceId)).toEqual([]); // warm an empty entry

    await addMount(workspaceId, "user1", {
      prefix: "vendor/x",
      type: "s3",
      config: { bucket: "b" },
    });
    const afterAdd = await readMounts(workspaceId);
    expect(afterAdd.map((m) => m.prefix)).toContain("vendor/x");

    await removeMount(workspaceId, "vendor/x");
    const afterRemove = await readMounts(workspaceId);
    expect(afterRemove.map((m) => m.prefix)).not.toContain("vendor/x");
  });
});
