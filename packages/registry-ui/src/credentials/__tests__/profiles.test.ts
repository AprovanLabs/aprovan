import { createElement, type ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GatewayClient } from "@aprovan/registry-main";
import {
  createWorkspaceProfile,
  isUnavailable,
  listWorkspaceProfiles,
  parseGatewayStatus,
} from "../api";
import {
  ProfilesListView,
  ProfilesUnavailableCard,
  formatLimitsSummary,
  formatTarget,
} from "../ProfilesSection";
import type { ProfileWire } from "../types";

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

function collectText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(collectText).join("");
  if (typeof node === "object" && "props" in node) {
    const el = node as {
      type: unknown;
      props: { children?: ReactNode; label?: string; armedLabel?: string };
    };
    // ArmedButton (and similar) use hooks — collect labels without invoking.
    if (
      typeof el.type === "function" &&
      typeof el.props.label === "string" &&
      typeof el.props.armedLabel === "string"
    ) {
      return `${el.props.label} ${el.props.armedLabel}`;
    }
    if (typeof el.type === "function") {
      const rendered = (el.type as (props: typeof el.props) => ReactNode)(el.props);
      return collectText(rendered);
    }
    return collectText(el.props.children);
  }
  return "";
}

const sampleProfile: ProfileWire = {
  id: "prof-1",
  name: "Prod GitHub",
  targetKind: "provider",
  targetId: "github",
  credentialId: "cred-1",
  credentialLabel: "Work GitHub",
  options: {},
  limits: { rps: 10, burst: 20 },
  createdBy: "admin",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

describe("isUnavailable", () => {
  it("detects 501 gateway errors", () => {
    expect(isUnavailable(new Error("Gateway request failed (501): unavailable"))).toBe(true);
    expect(isUnavailable(new Error("Gateway request failed (403): Forbidden"))).toBe(false);
    expect(isUnavailable("nope")).toBe(false);
  });
});

describe("profile helpers", () => {
  it("formats target and limits", () => {
    expect(formatTarget(sampleProfile)).toBe("provider:github");
    expect(formatLimitsSummary(sampleProfile.limits)).toBe("10 rps · burst 20");
    expect(
      formatTarget({ ...sampleProfile, targetKind: "interface", targetId: "llm", provider: "openrouter" }),
    ).toBe("interface:llm via openrouter");
  });
});

describe("ProfilesListView", () => {
  it("member sees read-only list without manage affordances", () => {
    const tree = createElement(ProfilesListView, {
      profiles: [sampleProfile],
      canManage: false,
    });
    const text = collectText(tree);
    expect(text).toContain("Prod GitHub");
    expect(text).toContain("Work GitHub");
    expect(text).not.toContain("Edit");
    expect(text).not.toContain("Delete");
    expect(text).not.toContain("New profile");
  });

  it("admin list exposes edit and delete actions", () => {
    const tree = createElement(ProfilesListView, {
      profiles: [sampleProfile],
      canManage: true,
      onEdit: () => undefined,
      onDelete: () => undefined,
    });
    const text = collectText(tree);
    expect(text).toContain("Edit");
    expect(text).toContain("Delete");
  });
});

describe("ProfilesUnavailableCard", () => {
  it("renders the unavailable capability-gap copy", () => {
    const text = collectText(createElement(ProfilesUnavailableCard));
    expect(text).toContain("aren't available on this deployment yet");
    expect(text).toContain("Credentials still work");
  });
});

describe("workspace profile api", () => {
  const client = new GatewayClient({
    baseUrl: BASE,
    getToken: () => "test-token",
  });

  it("admin create round-trip lists the new profile with credential label", async () => {
    const created: ProfileWire = {
      ...sampleProfile,
      id: "prof-new",
      name: "CI GitHub",
    };
    mockFetch((url, init) => {
      if (url === `${BASE}/profiles` && init?.method === "POST") {
        const body = JSON.parse(String(init.body)) as {
          name: string;
          targetKind: string;
          targetId: string;
          credentialId?: string;
        };
        expect(body.name).toBe("CI GitHub");
        expect(body.targetKind).toBe("provider");
        expect(body.targetId).toBe("github");
        expect(body.credentialId).toBe("cred-1");
        expect(JSON.stringify(body)).not.toMatch(/"payload"/);
        return new Response(JSON.stringify({ profile: created }), { status: 201 });
      }
      if (url === `${BASE}/profiles`) {
        return new Response(JSON.stringify({ profiles: [created] }), { status: 200 });
      }
      return new Response(JSON.stringify({ error: "unexpected" }), { status: 500 });
    });

    const profile = await createWorkspaceProfile(client, {
      name: "CI GitHub",
      targetKind: "provider",
      targetId: "github",
      credentialId: "cred-1",
    });
    expect(profile.credentialLabel).toBe("Work GitHub");
    expect(JSON.stringify(profile)).not.toMatch(/"payload"/);

    const listed = await listWorkspaceProfiles(client);
    expect(listed).toHaveLength(1);
    expect(listed[0]?.name).toBe("CI GitHub");
  });

  it("surfaces 501 via isUnavailable", async () => {
    mockFetch(
      () =>
        new Response(
          JSON.stringify({
            error:
              "Profiles need the relational store backend (sqlite/dsql) — the interim dynamo backend has no profile storage",
          }),
          { status: 501 },
        ),
    );

    let caught: unknown;
    try {
      await listWorkspaceProfiles(client);
    } catch (err) {
      caught = err;
    }
    expect(parseGatewayStatus(caught)).toBe(501);
    expect(isUnavailable(caught)).toBe(true);
  });
});
