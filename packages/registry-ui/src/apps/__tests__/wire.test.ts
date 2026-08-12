import { describe, expect, it } from "vitest";
import {
  installBindingsReady,
  normalizeApp,
  normalizeDirectory,
  normalizeInstall,
  normalizeInstalls,
} from "../wire";

describe("normalizeApp identity + requires", () => {
  it("round-trips appId, originAppId, permalink, and requires", () => {
    const app = normalizeApp({
      appId: "01HXAPP0000000000000000001",
      name: "reports",
      title: "Reports",
      visibility: "public",
      originAppId: "01HXAPP0000000000000000000",
      permalink: "/apps/id/01HXAPP0000000000000000001",
      requires: [
        { contract: "sql", optional: false },
        { contract: "llm", optional: true, profileName: "default" },
      ],
    });
    expect(app).toMatchObject({
      appId: "01HXAPP0000000000000000001",
      name: "reports",
      originAppId: "01HXAPP0000000000000000000",
      permalink: "/apps/id/01HXAPP0000000000000000001",
    });
    expect(app?.requires).toEqual([
      { contract: "sql" },
      { contract: "llm", optional: true, profileName: "default" },
    ]);
  });

  it("derives permalink from appId when omitted", () => {
    const app = normalizeApp({
      appId: "01HXAPP0000000000000000002",
      name: "notes",
      visibility: "private",
    });
    expect(app?.permalink).toBe("/apps/id/01HXAPP0000000000000000002");
  });

  it("ignores legacy synthesis flags on the wire", () => {
    const app = normalizeApp({
      name: "personal",
      visibility: "private",
      // Legacy gateways used to send a synthesis flag; the normaliser drops it.
      ["built" + "_in"]: true,
    });
    expect(app).toMatchObject({ name: "personal", visibility: "private" });
    expect(Object.keys(app ?? {})).not.toContain("built" + "_in");
    expect(Object.keys(app ?? {}).some((k) => k.includes("built"))).toBe(false);
  });
});

describe("normalizeInstall pin + bindings", () => {
  it("parses installId, originAppId, pin, and bindings", () => {
    const install = normalizeInstall({
      installId: "01HXINS0000000000000000001",
      originAppId: "01HXAPP0000000000000000001",
      originWorkspaceId: "ws_a",
      pin: { channel: "live" },
      bindings: { sql: "prof_1" },
      config: { limit: 10 },
      editing: false,
      available: true,
    });
    expect(install).toMatchObject({
      installId: "01HXINS0000000000000000001",
      originAppId: "01HXAPP0000000000000000001",
      pin: { channel: "live" },
      bindings: { sql: "prof_1" },
      available: true,
    });
    expect(install?.editing).toBeUndefined();
  });

  it("keeps editing only when true; projects root/hosting for copy installs", () => {
    const legacy = normalizeInstall({
      installId: "01HXINS0000000000000000003",
      originAppId: "01HXAPP0000000000000000001",
      pin: { channel: "live" },
      bindings: {},
      config: {},
      editing: true,
      prefix: "apps/legacy",
    });
    expect(legacy?.editing).toBe(true);
    expect(legacy?.prefix).toBe("apps/legacy");

    const copy = normalizeInstall({
      installId: "01HXINS0000000000000000004",
      originAppId: "01HXAPP0000000000000000001",
      pin: { channel: "live" },
      bindings: {},
      config: {},
      root: "apps/reports",
      hosting: "managed",
    });
    expect(copy?.root).toBe("apps/reports");
    expect(copy?.hosting).toBe("managed");
    expect(copy?.editing).toBeUndefined();
  });

  it("accepts release pins", () => {
    const install = normalizeInstall({
      install_id: "01HXINS0000000000000000002",
      origin_app_id: "01HXAPP0000000000000000001",
      pin: { release: "rel_abc" },
      bindings: {},
      config: {},
    });
    expect(install?.pin).toEqual({ release: "rel_abc" });
  });
});

describe("normalizeDirectory", () => {
  it("parses directory entries with dependency chips", () => {
    const entries = normalizeDirectory({
      apps: [
        {
          appId: "01HXAPP0000000000000000001",
          name: "reports",
          workspaceId: "ws_a",
          requires: [{ contract: "sql" }],
          liveRelease: "rel_1",
        },
      ],
    });
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      appId: "01HXAPP0000000000000000001",
      name: "reports",
      workspaceId: "ws_a",
      requires: [{ contract: "sql" }],
    });
  });
});

describe("normalizeInstalls empty list", () => {
  it("returns no synthesized entries on empty input", () => {
    expect(normalizeInstalls({ installs: [] })).toEqual([]);
    expect(normalizeInstalls([])).toEqual([]);
    expect(normalizeInstalls(null)).toEqual([]);
  });
});

describe("installBindingsReady", () => {
  it("disables until every non-optional requirement is bound", () => {
    const requires = [
      { contract: "sql" },
      { contract: "llm", optional: true },
    ];
    expect(installBindingsReady(requires, {})).toBe(false);
    expect(installBindingsReady(requires, { sql: "" })).toBe(false);
    expect(installBindingsReady(requires, { sql: "prof_sql" })).toBe(true);
    expect(installBindingsReady(requires, { sql: "prof_sql", llm: "prof_llm" })).toBe(true);
  });

  it("is ready when there are no requirements", () => {
    expect(installBindingsReady(undefined, {})).toBe(true);
    expect(installBindingsReady([], {})).toBe(true);
  });
});
