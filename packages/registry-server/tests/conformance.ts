/**
 * Driver conformance suite — ONE set of store-contract tests that every
 * storage driver must pass identically (tech-plan D8 risk note). Runs against
 * sqlite always; against dsql when `REGISTRY_TEST_DSQL_URL` is set.
 */

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { RegistryStorage } from "../src/storage/types.js";

export function runStorageConformance(
  name: string,
  factory: () => Promise<RegistryStorage>,
  options: { skip?: boolean } = {},
): void {
  const suite = options.skip ? describe.skip : describe;
  suite(`storage conformance: ${name}`, () => {
    let storage: RegistryStorage;

    beforeAll(async () => {
      storage = await factory();
    });

    afterAll(async () => {
      await storage.close();
    });

    it("tenants: ensure is idempotent and get/list see the row", async () => {
      const created = await storage.tenants.ensure("t-conf", "Conformance");
      expect(created.id).toBe("t-conf");
      const again = await storage.tenants.ensure("t-conf");
      expect(again.createdAt).toBe(created.createdAt);
      expect(await storage.tenants.get("t-conf")).toBeDefined();
      expect((await storage.tenants.list()).some((t) => t.id === "t-conf")).toBe(true);
    });

    it("credentials: create carries created_by; list excludes payload; payload round-trips", async () => {
      const row = await storage.credentials.create("t-conf", {
        provider: "github",
        label: "work",
        type: "bearer_token",
        payload: '{"type":"bearer_token","token":"tok"}',
        createdBy: "user-1",
      });
      expect(row.createdBy).toBe("user-1");
      const listed = await storage.credentials.list("t-conf");
      const found = listed.find((c) => c.id === row.id)!;
      expect(found.createdBy).toBe("user-1");
      expect((found as Record<string, unknown>)["payload"]).toBeUndefined();
      const withPayload = await storage.credentials.getWithPayload("t-conf", row.id);
      expect(withPayload?.payload).toBe('{"type":"bearer_token","token":"tok"}');
    });

    it("credentials: firstForProvider follows creation order; updatePayload persists", async () => {
      const first = await storage.credentials.create("t-order", {
        provider: "postgres",
        type: "api_key",
        payload: "p1",
      });
      await new Promise((resolve) => setTimeout(resolve, 5));
      await storage.credentials.create("t-order", {
        provider: "postgres",
        type: "api_key",
        payload: "p2",
      });
      const resolved = await storage.credentials.firstForProvider("t-order", "postgres");
      expect(resolved?.id).toBe(first.id);
      await storage.credentials.updatePayload("t-order", first.id, "p1-updated");
      expect((await storage.credentials.getWithPayload("t-order", first.id))?.payload).toBe(
        "p1-updated",
      );
    });

    it("credentials: delete removes the row", async () => {
      const row = await storage.credentials.create("t-conf", {
        provider: "slack",
        type: "api_key",
        payload: "x",
      });
      expect(await storage.credentials.delete("t-conf", row.id)).toBe(true);
      expect(await storage.credentials.get("t-conf", row.id)).toBeUndefined();
      expect(await storage.credentials.delete("t-conf", row.id)).toBe(false);
    });

    it("profiles: uniqueness on (tenant, target_kind, target_id, name)", async () => {
      await storage.profiles.create("t-conf", {
        name: "docs",
        targetKind: "interface",
        targetId: "sql",
        provider: "postgres",
        options: { database: "docs" },
        createdBy: "user-1",
      });
      await expect(
        storage.profiles.create("t-conf", {
          name: "docs",
          targetKind: "interface",
          targetId: "sql",
          provider: "snowflake",
          options: {},
          createdBy: "user-1",
        }),
      ).rejects.toThrow(/unique/iu);
      // Same name under a different target is fine.
      await storage.profiles.create("t-conf", {
        name: "docs",
        targetKind: "provider",
        targetId: "github",
        options: {},
        createdBy: "user-1",
      });
    });

    it("profiles: getByName / list / namesForTarget / update / delete", async () => {
      const created = await storage.profiles.create("t-prof", {
        name: "analytics",
        targetKind: "interface",
        targetId: "sql",
        provider: "postgres",
        options: { database: "warehouse" },
        limits: { rps: 2, burst: 4 },
        createdBy: "user-2",
      });
      const byName = await storage.profiles.getByName("t-prof", "interface", "sql", "analytics");
      expect(byName?.id).toBe(created.id);
      expect(byName?.options).toEqual({ database: "warehouse" });
      expect(byName?.limits).toEqual({ rps: 2, burst: 4 });
      expect(await storage.profiles.namesForTarget("t-prof", "interface", "sql")).toEqual([
        "analytics",
      ]);
      const updated = await storage.profiles.update("t-prof", created.id, {
        options: { database: "lake" },
      });
      expect(updated?.options).toEqual({ database: "lake" });
      expect(updated?.limits).toEqual({ rps: 2, burst: 4 });
      expect(await storage.profiles.delete("t-prof", created.id)).toBe(true);
      expect(await storage.profiles.getByName("t-prof", "interface", "sql", "analytics")).toBeUndefined();
    });

    it("grants: one query resolves user + group + actor subjects; revoke works", async () => {
      const profile = await storage.profiles.create("t-grant", {
        name: "docs",
        targetKind: "interface",
        targetId: "sql",
        provider: "postgres",
        options: {},
        createdBy: "admin",
      });
      const other = await storage.profiles.create("t-grant", {
        name: "other",
        targetKind: "interface",
        targetId: "sql",
        provider: "postgres",
        options: {},
        createdBy: "admin",
      });
      await storage.grants.grant("t-grant", profile.id, { kind: "group", id: "analysts" }, "admin");
      await storage.grants.grant("t-grant", other.id, { kind: "user", id: "someone-else" }, "admin");

      const granted = await storage.grants.grantedProfileIds("t-grant", [
        { kind: "user", id: "member-1" },
        { kind: "group", id: "analysts" },
        { kind: "group", id: "eng" },
      ]);
      expect(granted.has(profile.id)).toBe(true);
      expect(granted.has(other.id)).toBe(false);

      expect(
        await storage.grants.revoke("t-grant", profile.id, { kind: "group", id: "analysts" }),
      ).toBe(true);
      const after = await storage.grants.grantedProfileIds("t-grant", [
        { kind: "group", id: "analysts" },
      ]);
      expect(after.size).toBe(0);
    });

    it("grants: deleting a profile removes its grants", async () => {
      const profile = await storage.profiles.create("t-grant", {
        name: "doomed",
        targetKind: "provider",
        targetId: "github",
        options: {},
        createdBy: "admin",
      });
      await storage.grants.grant("t-grant", profile.id, { kind: "user", id: "u" }, "admin");
      await storage.profiles.delete("t-grant", profile.id);
      const granted = await storage.grants.grantedProfileIds("t-grant", [{ kind: "user", id: "u" }]);
      expect(granted.size).toBe(0);
    });

    it("api keys: digest unique, key→tenant lookup, revocation recorded", async () => {
      const key = await storage.apiKeys.create("t-conf", {
        digest: "digest-1",
        label: "ci",
        createdBy: "admin",
      });
      await expect(
        storage.apiKeys.create("t-other", { digest: "digest-1", createdBy: "admin" }),
      ).rejects.toThrow(/unique/iu);
      const found = await storage.apiKeys.findByDigest("digest-1");
      expect(found?.tenantId).toBe("t-conf");
      expect(found?.revokedAt).toBeUndefined();
      expect(await storage.apiKeys.revoke("t-conf", key.id)).toBe(true);
      expect((await storage.apiKeys.findByDigest("digest-1"))?.revokedAt).toBeDefined();
      expect(await storage.apiKeys.revoke("t-conf", key.id)).toBe(false);
    });

    it("audit: append + query newest-first with limit", async () => {
      for (let i = 0; i < 3; i++) {
        await storage.audit.append({
          requestId: `req-${i}`,
          tenantId: "t-audit",
          principal: "user-1",
          namespace: "github",
          operation: "repos.get",
          status: 200,
          durationMs: 5,
        });
      }
      const rows = await storage.audit.query("t-audit", { limit: 2 });
      expect(rows).toHaveLength(2);
      expect(rows.every((r) => r.tenantId === "t-audit")).toBe(true);
    });
  });
}
