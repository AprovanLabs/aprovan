/**
 * Stream 13 — review surface / install / JIT / credential badges / bulk.
 */

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { matchesResourcePattern } from "@/features/capability-cards/matches-resource-pattern";
import { InstallCard } from "@/features/capability-cards/InstallCard";
import { PayloadWidgetHost } from "@/features/notifications/PayloadWidgetHost";
import {
  CREDENTIAL_COPY,
  CREDENTIAL_NOT_CONNECTED_PROMPT,
  applyClientPayloadEdit,
  canBulkAct,
  bulkGroupKey,
  type ReviewItem,
} from "./types";
import {
  CredentialLevelBadge,
  CredentialNotConnectedPrompt,
} from "./CredentialLevelBadge";
import { ReviewItemShell } from "./ReviewItemShell";
import { ReviewSurfacePanel } from "./ReviewSurfacePanel";
import { ResourcePatternInput } from "./ResourcePatternInput";

function baseItem(overrides: Partial<ReviewItem> = {}): ReviewItem {
  return {
    id: "queued-action:1",
    kind: "queued-action",
    sourceId: "1",
    shell: {
      who: { user: "alice", app: "mail" },
      capability: "gmail.send",
      resource: "bob@example.org",
      effect: "action",
      credential: { level: "user-oauth", label: "Your account" },
      decisions: ["release", "discard"],
    },
    payloadFallback: { resource: "bob@example.org", body: "hi" },
    authority: { holder: "invoker", invokerId: "alice" },
    ...overrides,
  };
}

describe("invariant 6 — shell re-render before approve", () => {
  it("applyClientPayloadEdit updates shell resource without taking capability from payload", () => {
    const item = baseItem();
    const edited = applyClientPayloadEdit(item, {
      resource: "carol@example.org",
      capability: "evil.spoof",
      body: "edited",
    });
    expect(edited.shell.resource).toBe("carol@example.org");
    expect(edited.shell.capability).toBe("gmail.send");
    expect(edited.shell.who).toEqual(item.shell.who);
    expect(edited.shell.credential).toEqual(item.shell.credential);
    expect(edited.shell.decisions).toEqual(item.shell.decisions);
    expect(edited.payloadFallback).toEqual({
      resource: "carol@example.org",
      capability: "evil.spoof",
      body: "edited",
    });
  });

  it("decision buttons stay disabled while shellStale (pre-rerender gate)", () => {
    const html = renderToStaticMarkup(
      createElement(ReviewItemShell, {
        shell: baseItem().shell,
        shellStale: true,
      }),
    );
    expect(html).toContain('data-shell-stale="true"');
    expect(html).toMatch(/\sdisabled(?:=""|\s)[^>]*data-decision="release"/);
    expect(html).toContain("bob@example.org");
  });

  it("shell summary shows the edited resource after applyClientPayloadEdit", () => {
    const edited = applyClientPayloadEdit(baseItem(), {
      resource: "carol@example.org",
    });
    const html = renderToStaticMarkup(
      createElement(ReviewItemShell, {
        shell: edited.shell,
        shellStale: false,
      }),
    );
    expect(html).toContain("carol@example.org");
    expect(html).toContain("gmail.send");
    expect(html).toContain('data-shell-stale="false"');
    expect(html).not.toMatch(/\sdisabled(?:=""|\s)[^>]*data-decision="release"/);
  });
});

describe("PayloadWidgetHost — generic fallback on widget failure", () => {
  it("falls back to the generic payload card when there is no compiler", () => {
    const html = renderToStaticMarkup(
      createElement(PayloadWidgetHost, {
        widget: { path: "widgets/preview.tsx", data: { x: 1 } },
        payloadFallback: { resource: "bob@example.org", args: { n: 2 } },
        compiler: null,
      }),
    );
    expect(html).toContain('data-testid="generic-payload-card"');
    expect(html).toContain("bob@example.org");
    expect(html).not.toContain('data-sandbox="true"');
  });

  it("falls back when forceGeneric is set (mount/compile failure path)", () => {
    const html = renderToStaticMarkup(
      createElement(PayloadWidgetHost, {
        widget: { path: "widgets/broken.tsx" },
        payloadFallback: { target: "x" },
        forceGeneric: true,
      }),
    );
    expect(html).toContain('data-testid="generic-payload-card"');
    expect(html).toContain("target");
  });
});

describe("CredentialLevelBadge — fixed strings", () => {
  it.each([
    ["workspace-token", "Workspace secret"],
    ["workspace-oauth", "Workspace bot"],
    ["user-oauth", "Your account"],
  ] as const)("%s → %s", (level, badge) => {
    expect(CREDENTIAL_COPY[level].badge).toBe(badge);
    const html = renderToStaticMarkup(
      createElement(CredentialLevelBadge, { level }),
    );
    expect(html).toContain(badge);
    expect(html).toContain(`data-credential-level="${level}"`);
  });

  it("CredentialNotConnectedError prompt never says bare connect a credential", () => {
    const html = renderToStaticMarkup(createElement(CredentialNotConnectedPrompt));
    expect(html).toContain(CREDENTIAL_NOT_CONNECTED_PROMPT);
    expect(html.toLowerCase()).not.toContain("connect a credential");
  });
});

describe("bulk actions — single (app, capability) group", () => {
  it("allows bulk within one group and disables across mixed groups", () => {
    const a = baseItem({ id: "a" });
    const b = baseItem({ id: "b", sourceId: "2" });
    const mixed = baseItem({
      id: "c",
      shell: {
        ...baseItem().shell,
        who: { user: "alice", app: "slack" },
        capability: "slack.post",
      },
    });
    expect(bulkGroupKey(a)).toBe(bulkGroupKey(b));
    expect(canBulkAct([a, b])).toBe(true);
    expect(canBulkAct([a, mixed])).toBe(false);

    const html = renderToStaticMarkup(
      createElement(ReviewSurfacePanel, {
        items: [a, mixed],
      }),
    );
    // Panel starts with nothing selected — bulk bar absent.
    expect(html).not.toContain('data-testid="bulk-bar"');
    expect(html).toContain('data-testid="review-surface-panel"');
  });

  it("exposes disabled bulk controls when selection is mixed (helper contract)", () => {
    expect(
      canBulkAct([
        baseItem({ id: "1" }),
        baseItem({
          id: "2",
          shell: {
            ...baseItem().shell,
            capability: "other.op",
          },
        }),
      ]),
    ).toBe(false);
  });
});

describe("Install card + pattern matcher", () => {
  it("renders capability rows, badges, resources-come-later, send-to-admins", () => {
    const html = renderToStaticMarkup(
      createElement(InstallCard, {
        app: { name: "Mail", publisher: "Acme", hosted: true },
        rows: [
          {
            capability: "gmail.*",
            effect: "action",
            credentialLevel: "workspace-oauth",
          },
          {
            capability: "undeclared.ns.*",
            effect: "action",
            flag: "undeclared",
          },
        ],
        needsAdmin: true,
      }),
    );
    expect(html).toContain("Workspace bot");
    expect(html).toContain("undeclared");
    expect(html).toContain("Resources are approved as the app first touches them");
    expect(html).toContain('data-testid="send-to-admins"');
  });

  it("matchesResourcePattern covers opaque and URL patterns", () => {
    // Whole-segment wildcards only (stream 3: no partial-segment mailto globs).
    expect(matchesResourcePattern("*", "bob@example.org")).toBe(true);
    expect(matchesResourcePattern("bob@example.org", "carol@example.org")).toBe(false);
    expect(
      matchesResourcePattern("https://api.example.com/*", "https://api.example.com/v1"),
    ).toBe(true);
    expect(matchesResourcePattern("mailto:*", "mailto:bob@example.org")).toBe(true);
  });

  it("ResourcePatternInput previews coverage count", () => {
    const html = renderToStaticMarkup(
      createElement(ResourcePatternInput, {
        value: "*",
        onChange: () => undefined,
        candidates: ["a@example.org", "b@other.org"],
      }),
    );
    expect(html).toContain("Covers 2 of 2");
  });
});
