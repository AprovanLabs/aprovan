import { describe, expect, it } from "vitest";
import { listInterfaces } from "../src/interfaces.js";
import { getProviderModule } from "../src/isolate.js";

describe("sql interface", () => {
  it("is listed with module-backed compat providers", () => {
    const sql = listInterfaces().find((def) => def.id === "sql");
    expect(sql).toBeDefined();
    expect(sql!.compat.map((c) => c.provider)).toEqual(["postgres", "snowflake", "databricks"]);
    expect(sql!.compat.map((c) => c.module)).toEqual(["postgres", "snowflake", "databricks"]);
    expect(sql!.defaultsFor).toContain("query");
  });

  it("resolves each backend to a UTDK provider module with a client factory and query op", async () => {
    for (const [module, factoryName] of [
      ["postgres", "createPostgresClient"],
      ["snowflake", "createSnowflakeClient"],
      ["databricks", "createDatabricksClient"],
    ] as const) {
      const mod = await getProviderModule(module);
      const factory = mod[factoryName] as (options?: {
        headers?: Record<string, string>;
      }) => Promise<Record<string, unknown>>;
      expect(typeof factory).toBe("function");
      const client = await factory({ headers: { Authorization: "Bearer test" } });
      expect(typeof client["query"]).toBe("function");
    }
  });

  it("demands a credential at query time, not construction time", async () => {
    const mod = await getProviderModule("postgres");
    const factory = mod["createPostgresClient"] as (options?: object) => Promise<{
      query: (args: object) => Promise<unknown>;
    }>;
    const client = await factory({});
    await expect(client.query({ sql: "select 1" })).rejects.toThrow(/credential/u);
  });
});
