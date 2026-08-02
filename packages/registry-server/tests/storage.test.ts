import { describe, expect, it } from "vitest";
import { createStorage } from "../src/storage/index.js";
import { runStorageConformance } from "./conformance.js";

// The one conformance suite, per driver (registry-server spec "Driver
// conformance"). sqlite always; dsql when a connection string is provided.
runStorageConformance("sqlite", () =>
  createStorage({ driver: "sqlite", url: "file::memory:" }),
);

const dsqlUrl = process.env["REGISTRY_TEST_DSQL_URL"];
runStorageConformance(
  "dsql",
  () => createStorage({ driver: "dsql", url: dsqlUrl ?? "" }),
  { skip: !dsqlUrl },
);

// ---------------------------------------------------------------------------
// Tenant isolation (multi-tenancy spec "Cross-tenant reads are impossible")
// ---------------------------------------------------------------------------

describe("tenant isolation", () => {
  it("two tenants' credentials/profiles/grants/audit are mutually invisible through every store method", async () => {
    const storage = await createStorage({ driver: "sqlite", url: "file::memory:" });
    try {
      await storage.tenants.ensure("tenant-a");
      await storage.tenants.ensure("tenant-b");

      const credA = await storage.credentials.create("tenant-a", {
        provider: "github",
        type: "bearer_token",
        payload: "secret-a",
        createdBy: "alice",
      });
      const profileA = await storage.profiles.create("tenant-a", {
        name: "default",
        targetKind: "provider",
        targetId: "github",
        credentialId: credA.id,
        options: {},
        createdBy: "alice",
      });
      await storage.grants.grant("tenant-a", profileA.id, { kind: "user", id: "alice" }, "alice");
      await storage.audit.append({
        requestId: "req-a",
        tenantId: "tenant-a",
        principal: "alice",
        namespace: "github",
        operation: "repos.get",
        status: 200,
      });

      // Tenant B observes NONE of tenant A's rows through any method.
      expect(await storage.credentials.list("tenant-b")).toEqual([]);
      expect(await storage.credentials.get("tenant-b", credA.id)).toBeUndefined();
      expect(await storage.credentials.getWithPayload("tenant-b", credA.id)).toBeUndefined();
      expect(await storage.credentials.firstForProvider("tenant-b", "github")).toBeUndefined();
      expect(await storage.profiles.list("tenant-b")).toEqual([]);
      expect(await storage.profiles.getById("tenant-b", profileA.id)).toBeUndefined();
      expect(
        await storage.profiles.getByName("tenant-b", "provider", "github", "default"),
      ).toBeUndefined();
      expect(await storage.profiles.namesForTarget("tenant-b", "provider", "github")).toEqual([]);
      expect(
        (await storage.grants.grantedProfileIds("tenant-b", [{ kind: "user", id: "alice" }])).size,
      ).toBe(0);
      expect(await storage.audit.query("tenant-b")).toEqual([]);

      // And tenant B cannot mutate tenant A's rows.
      expect(await storage.credentials.delete("tenant-b", credA.id)).toBe(false);
      expect(await storage.profiles.delete("tenant-b", profileA.id)).toBe(false);
      await storage.credentials.updatePayload("tenant-b", credA.id, "overwritten");
      expect((await storage.credentials.getWithPayload("tenant-a", credA.id))?.payload).toBe(
        "secret-a",
      );
    } finally {
      await storage.close();
    }
  });

  it("same-named profiles coexist per tenant (unique keys are tenant-scoped)", async () => {
    const storage = await createStorage({ driver: "sqlite", url: "file::memory:" });
    try {
      await storage.profiles.create("tenant-a", {
        name: "docs",
        targetKind: "interface",
        targetId: "sql",
        provider: "postgres",
        options: {},
        createdBy: "a",
      });
      await storage.profiles.create("tenant-b", {
        name: "docs",
        targetKind: "interface",
        targetId: "sql",
        provider: "snowflake",
        options: {},
        createdBy: "b",
      });
      expect(
        (await storage.profiles.getByName("tenant-a", "interface", "sql", "docs"))?.provider,
      ).toBe("postgres");
      expect(
        (await storage.profiles.getByName("tenant-b", "interface", "sql", "docs"))?.provider,
      ).toBe("snowflake");
    } finally {
      await storage.close();
    }
  });
});
