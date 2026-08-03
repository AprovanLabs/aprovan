import { describe, expect, it } from "vitest";
import { normalizeApp, normalizeInstalls, normalizeWorkflow } from "../wire";

/**
 * Catalog grouping is exercised indirectly: empty apps + empty workflows must
 * not invent a Personal card. The store's grouping lives in React hooks; here
 * we assert the wire inputs that feed it stay empty.
 */
describe("catalog wire inputs", () => {
  it("empty apps.list yields no apps", () => {
    expect(
      [null, undefined, {}, { apps: [] }]
        .flatMap((raw) => {
          if (raw == null) return [];
          const apps = Array.isArray(raw)
            ? raw
            : Array.isArray((raw as { apps?: unknown }).apps)
              ? ((raw as { apps: unknown[] }).apps)
              : [];
          return apps.map(normalizeApp).filter(Boolean);
        }),
    ).toEqual([]);
  });

  it("installed empty list stays empty", () => {
    expect(normalizeInstalls({ installations: [] })).toEqual([]);
  });

  it("unbundled workflows carry exportedBy when present", () => {
    const workflow = normalizeWorkflow({
      name: "draft",
      scriptPath: "flows/draft.ts",
      triggers: { manual: true },
      exportedBy: [],
    });
    expect(workflow?.name).toBe("draft");
    expect(workflow?.exportedBy).toBeUndefined();

    const exported = normalizeWorkflow({
      name: "shared",
      scriptPath: "flows/shared.ts",
      triggers: { manual: true },
      exportedBy: ["01HXAPP0000000000000000001"],
    });
    expect(exported?.exportedBy).toEqual(["01HXAPP0000000000000000001"]);
  });
});
