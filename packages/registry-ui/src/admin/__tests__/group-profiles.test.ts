import { createElement, type ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GatewayClient } from "@aprovan/registry-main";
import {
  attachGroupProfile,
  detachGroupProfile,
  listGroupProfiles,
  listWorkspaceProfiles,
} from "../api";
import {
  GroupProfilesUnavailableCard,
  formatGroupProfileTarget,
} from "../GroupProfilesSection";
import { ArmedButton } from "../../credentials/ArmedButton";
import type { GroupProfileSummary } from "../types";

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

const sampleSummary: GroupProfileSummary = {
  id: "prof-1",
  name: "Prod GitHub",
  target: { kind: "provider", id: "github" },
  credentialLabel: "Work GitHub",
};

describe("group profile api", () => {
  const client = new GatewayClient({
    baseUrl: BASE,
    getToken: () => "test-token",
  });

  it("lists workspace profiles for the attach picker", async () => {
    mockFetch((url) => {
      expect(url).toBe(`${BASE}/profiles`);
      return new Response(
        JSON.stringify({
          profiles: [
            {
              id: "prof-1",
              name: "Prod GitHub",
              targetKind: "provider",
              targetId: "github",
              options: {},
              createdBy: "admin",
              createdAt: "2026-01-01T00:00:00Z",
              updatedAt: "2026-01-01T00:00:00Z",
              credentialLabel: "Work GitHub",
            },
          ],
        }),
        { status: 200 },
      );
    });
    const profiles = await listWorkspaceProfiles(client);
    expect(profiles[0]?.credentialLabel).toBe("Work GitHub");
  });

  it("attach → list → detach round-trip", async () => {
    const calls: Array<{ url: string; method: string; body?: string }> = [];
    mockFetch((url, init) => {
      const method = init?.method ?? "GET";
      calls.push({
        url,
        method,
        body: typeof init?.body === "string" ? init.body : undefined,
      });
      if (url === `${BASE}/groups/g1/profiles` && method === "POST") {
        return new Response(JSON.stringify(sampleSummary), { status: 201 });
      }
      if (url === `${BASE}/groups/g1/profiles` && method === "GET") {
        return new Response(JSON.stringify({ profiles: [sampleSummary] }), {
          status: 200,
        });
      }
      if (url === `${BASE}/groups/g1/profiles` && method === "DELETE") {
        return new Response(JSON.stringify({ removed: true }), { status: 200 });
      }
      return new Response("not found", { status: 404 });
    });

    const attached = await attachGroupProfile(client, "g1", "prof-1");
    expect(attached).toMatchObject({
      id: "prof-1",
      name: "Prod GitHub",
      target: { kind: "provider", id: "github" },
      credentialLabel: "Work GitHub",
    });
    expect(JSON.parse(calls[0]!.body!)).toEqual({ profile: "prof-1" });

    const listed = await listGroupProfiles(client, "g1");
    expect(listed).toHaveLength(1);
    expect(listed[0]?.name).toBe("Prod GitHub");

    await detachGroupProfile(client, "g1", "prof-1");
    expect(JSON.parse(calls[2]!.body!)).toEqual({ profile: "prof-1" });
  });

  it("surfaces 501 from group profile routes", async () => {
    mockFetch(() => {
      return new Response(JSON.stringify({ error: "unavailable" }), { status: 501 });
    });
    await expect(listGroupProfiles(client, "g1")).rejects.toThrow(/\(501\)/);
  });
});

describe("group profile presentation", () => {
  it("formats nested target shape", () => {
    expect(formatGroupProfileTarget(sampleSummary)).toBe("provider:github");
    expect(
      formatGroupProfileTarget({
        ...sampleSummary,
        target: { kind: "interface", id: "llm", provider: "openrouter" },
      }),
    ).toBe("interface:llm via openrouter");
  });

  it("renders unavailable card without status codes or attach affordances", () => {
    const text = collectText(createElement(GroupProfilesUnavailableCard, {}));
    expect(text).toContain("Profiles aren't available on this deployment yet");
    expect(text).not.toMatch(/501/);
    expect(text).not.toContain("Attach");
  });

  it("ArmedButton uses arm then confirm labels for revoke", () => {
    const text = collectText(
      createElement(ArmedButton, {
        label: "Revoke",
        armedLabel: "Confirm revoke?",
        onConfirm: () => undefined,
      }),
    );
    expect(text).toContain("Revoke");
    expect(text).toContain("Confirm revoke?");
  });
});
