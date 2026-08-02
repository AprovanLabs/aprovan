import { describe, expect, it } from "vitest";
import {
  groupNamespaces,
  namespaceIcon,
  namespaceLabel,
  type NamespaceInfo,
} from "./namespaces";

const catalog = (entries: Array<[string, NamespaceInfo["kind"]]>): NamespaceInfo[] =>
  entries.map(([id, kind]) => ({ id, kind, label: id, description: "" }));

describe("groupNamespaces", () => {
  it("puts core namespaces under Native, not Providers", () => {
    // The regression this exists for: sessions/notifications/telemetry/agents/
    // sandboxes shipped after the client's hardcoded native list was written,
    // so they rendered as connected third-party providers.
    const grouped = groupNamespaces(
      ["vfs", "sessions", "notifications", "telemetry", "agents", "sandboxes", "github"],
      catalog([
        ["vfs", "core"],
        ["sessions", "core"],
        ["notifications", "core"],
        ["telemetry", "core"],
        ["agents", "core"],
        ["sandboxes", "core"],
        ["github", "provider"],
      ]),
    );
    expect(grouped.core).toEqual([
      "vfs",
      "sessions",
      "notifications",
      "telemetry",
      "agents",
      "sandboxes",
    ]);
    expect(grouped.providers).toEqual(["github"]);
  });

  it("separates interfaces and their named instances from providers", () => {
    const grouped = groupNamespaces(
      ["sql", "sql:analytics", "linear"],
      catalog([
        ["sql", "interface"],
        ["sql:analytics", "interface"],
        ["linear", "provider"],
      ]),
    );
    expect(grouped.interfaces).toEqual(["sql", "sql:analytics"]);
    expect(grouped.providers).toEqual(["linear"]);
    expect(grouped.core).toEqual([]);
  });

  it("treats LLM aliases as providers, since that is what they are", () => {
    const grouped = groupNamespaces(["anthropic"], catalog([["anthropic", "llm-alias"]]));
    expect(grouped.providers).toEqual(["anthropic"]);
  });

  it("still groups known natives when the catalog is unreachable", () => {
    // The production regression: the web app shipped ahead of the gateway, so
    // GET /tools/namespaces 404'd, the catalog came back empty, and every
    // native namespace rendered under Providers with a connected dot.
    const grouped = groupNamespaces(["vfs", "agents", "sessions", "github"], null);
    expect(grouped.core).toEqual(["vfs", "agents", "sessions"]);
    expect(grouped.providers).toEqual(["github"]);
  });

  it("still groups known interfaces and their instances when unreachable", () => {
    const grouped = groupNamespaces(
      ["sql", "sql:analytics", "llm", "agent", "vcs", "linear"],
      null,
    );
    expect(grouped.interfaces).toEqual(["agent", "llm", "sql", "sql:analytics", "vcs"]);
    expect(grouped.providers).toEqual(["linear"]);
  });

  it("never claims an unknown namespace is native, catalog or not", () => {
    // The fallback covers what this client already knew; it does not guess.
    // A SaaS rendering as first-party misrepresents where data goes, and that
    // stays true when the gateway is down.
    for (const catalog of [null, [] as NamespaceInfo[]]) {
      const grouped = groupNamespaces(["some-vendor", "acme-crm"], catalog);
      expect(grouped.core).toEqual([]);
      expect(grouped.providers).toEqual(["acme-crm", "some-vendor"]);
    }
  });

  it("lets the catalog override the fallback rather than union with it", () => {
    // A namespace the server reclassifies must move. If `agents` ever stopped
    // being core, a fallback that merged instead of deferring would keep
    // asserting the stale answer forever.
    const grouped = groupNamespaces(["agents"], catalog([["agents", "provider"]]));
    expect(grouped.core).toEqual([]);
    expect(grouped.providers).toEqual(["agents"]);
  });

  it("preserves the gateway's order for native rows but sorts the rest", () => {
    const grouped = groupNamespaces(
      ["zeta", "alpha", "keyvalue", "vfs"],
      catalog([
        ["keyvalue", "core"],
        ["vfs", "core"],
        ["zeta", "provider"],
        ["alpha", "provider"],
      ]),
    );
    expect(grouped.core).toEqual(["keyvalue", "vfs"]);
    expect(grouped.providers).toEqual(["alpha", "zeta"]);
  });
});

describe("namespaceIcon", () => {
  it("maps a known slug", () => {
    expect(namespaceIcon({ icon: "database" })).toBeTypeOf("object");
  });

  it("falls back rather than throwing on a slug this client has never seen", () => {
    expect(namespaceIcon({ icon: "some-future-service" })).toBeTypeOf("object");
    expect(namespaceIcon({})).toBeTypeOf("object");
  });
});

describe("namespaceLabel", () => {
  it("prefers the server's label", () => {
    expect(
      namespaceLabel("keyvalue", {
        id: "keyvalue",
        kind: "core",
        label: "Key value",
        description: "Workspace records",
      }),
    ).toEqual({ label: "Key value", description: "Workspace records" });
  });

  it("falls back to the namespace itself, so a row is never blank", () => {
    expect(namespaceLabel("keyvalue", undefined)).toEqual({
      label: "Keyvalue",
      description: "",
    });
    expect(namespaceLabel("sql:analytics", undefined).label).toBe("Sql");
  });

  it("shows Agent runtime for the agent interface, distinct from core Agents", () => {
    const agentInterface = namespaceLabel("agent", {
      id: "agent",
      kind: "interface",
      label: "Agent runtime",
      description: "The agent loop itself",
    });
    const agentsCore = namespaceLabel("agents", {
      id: "agents",
      kind: "core",
      label: "Agents",
      description: "Profiles and grants",
    });
    expect(agentInterface.label).toBe("Agent runtime");
    expect(agentsCore.label).toBe("Agents");
    expect(agentInterface.label).not.toBe(agentsCore.label);
  });
});
