/**
 * IW-9 C stream 11 — derived authority: runtime resolution + cascading revocation.
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { ResourceGrantRow } from "@aprovan/registry-server";
import {
  OWNER_DEPARTED_REASON,
  canRunStandingAutomation,
  listStandingAutomations,
  onCredentialRevoked,
  onGrantRevoked,
  onMembershipDeparture,
  reassignAutomation,
  registerStandingAutomation,
  resetDerivedAuthorityState,
  resolveAutomationDispatch,
  setToolListCacheInvalidator,
  userLevelCredentialGrantsResolvable,
} from "../src/derived-authority.js";
import type { Principal } from "../src/middleware/auth.js";
import { ServiceError } from "../src/service-kernel.js";

const WS = "ws-derived";

let invalidatedWorkspaces: string[];

beforeEach(() => {
  resetDerivedAuthorityState();
  invalidatedWorkspaces = [];
  setToolListCacheInvalidator((workspaceId) => {
    invalidatedWorkspaces.push(workspaceId);
  });
});

afterEach(() => {
  resetDerivedAuthorityState();
  setToolListCacheInvalidator(() => {});
});

const alice: Principal = {
  sub: "user-alice",
  workspaceId: WS,
  role: "member",
  groupIds: [],
};

const admin: Principal = {
  sub: "user-admin",
  workspaceId: WS,
  role: "admin",
  groupIds: [],
};

function grantRow(
  partial: Pick<ResourceGrantRow, "capability" | "resourcePattern" | "credentialLevel"> & {
    subject?: ResourceGrantRow["subject"];
  },
): ResourceGrantRow {
  return {
    id: `rg-${Math.random().toString(36).slice(2, 10)}`,
    tenantId: WS,
    subject: partial.subject ?? { kind: "user", id: "user-alice" },
    capability: partial.capability,
    resourcePattern: partial.resourcePattern,
    credentialLevel: partial.credentialLevel,
    grantedBy: "user-admin",
    createdAt: new Date().toISOString(),
  };
}

describe("derived authority (IW-9 C stream 11)", () => {
  it("Narrowed owner narrows the automation — next run uses evaluateDispatch, no snapshotted grant", async () => {
    const automation = registerStandingAutomation({
      workspaceId: WS,
      kind: "workflow",
      name: "nightly-slack",
      ownerId: alice.sub,
    });

    // Record holds owner identity only.
    expect(automation.ownerId).toBe(alice.sub);
    expect(automation).not.toHaveProperty("grants");
    expect(Object.keys(automation)).not.toContain("resourceGrants");

    const wide = await resolveAutomationDispatch(
      {
        workspaceId: WS,
        automationId: automation.id,
        tool: { namespace: "slack", operation: "post", effect: "action" },
        resource: "slack://T1/C-general",
        via: { appId: "app-bot" },
      },
      {
        invokerPatterns: ["slack.post"],
        appCeiling: ["slack.post"],
        resourceGrants: [
          grantRow({
            capability: "slack.post",
            resourcePattern: "slack://T1/**",
            credentialLevel: "workspace-oauth",
            subject: { kind: "user", id: alice.sub },
          }),
        ],
      },
    );
    expect(wide).toEqual({ kind: "allow" });

    // Owner grant narrowed after save — next run has no memory of the wider grant.
    const narrowed = await resolveAutomationDispatch(
      {
        workspaceId: WS,
        automationId: automation.id,
        tool: { namespace: "slack", operation: "post", effect: "action" },
        resource: "slack://T1/C-general",
        via: { appId: "app-bot" },
      },
      {
        invokerPatterns: ["slack.post"],
        appCeiling: ["slack.post"],
        resourceGrants: [
          grantRow({
            capability: "slack.post",
            resourcePattern: "slack://T1/C-other",
            credentialLevel: "workspace-oauth",
            subject: { kind: "user", id: alice.sub },
          }),
        ],
      },
    );
    expect(narrowed.kind).toBe("queue");
  });

  it("Owner departs — nightly workflow does not run and is listed deactivated with reason", () => {
    const nightly = registerStandingAutomation({
      workspaceId: WS,
      kind: "workflow",
      name: "nightly-report",
      ownerId: alice.sub,
    });
    registerStandingAutomation({
      workspaceId: WS,
      kind: "schedule",
      name: "other-member-job",
      ownerId: "user-bob",
    });

    expect(canRunStandingAutomation(WS, nightly.id)).toBe(true);
    expect(userLevelCredentialGrantsResolvable(WS, alice.sub)).toBe(true);

    const deactivated = onMembershipDeparture(WS, alice.sub);

    expect(deactivated).toHaveLength(1);
    expect(deactivated[0]?.id).toBe(nightly.id);
    expect(deactivated[0]?.status).toBe("deactivated");
    expect(deactivated[0]?.deactivationReason).toBe(OWNER_DEPARTED_REASON);

    const listed = listStandingAutomations(WS, {
      ownerId: alice.sub,
      status: "deactivated",
    });
    expect(listed).toHaveLength(1);
    expect(listed[0]?.deactivationReason).toBe(OWNER_DEPARTED_REASON);

    expect(canRunStandingAutomation(WS, nightly.id)).toBe(false);
    expect(userLevelCredentialGrantsResolvable(WS, alice.sub)).toBe(false);
    // Other members' automations untouched.
    expect(listStandingAutomations(WS, { ownerId: "user-bob", status: "active" })).toHaveLength(
      1,
    );
  });

  it("Owner departs — next dispatch is skipped (does not run again)", async () => {
    const nightly = registerStandingAutomation({
      workspaceId: WS,
      kind: "workflow",
      name: "nightly-report",
      ownerId: alice.sub,
    });
    onMembershipDeparture(WS, alice.sub);

    const decision = await resolveAutomationDispatch(
      {
        workspaceId: WS,
        automationId: nightly.id,
        tool: { namespace: "slack", operation: "post", effect: "action" },
        resource: "slack://T1/C-general",
      },
      {
        invokerPatterns: ["slack.post"],
        resourceGrants: [
          grantRow({
            capability: "slack.post",
            resourcePattern: null,
            credentialLevel: "workspace-oauth",
          }),
        ],
      },
    );
    expect(decision).toEqual({ kind: "skipped", reason: "deactivated" });
  });

  it("Reassignment re-derives under the new owner's grants (never inherits)", async () => {
    const automation = registerStandingAutomation({
      workspaceId: WS,
      kind: "agent-profile",
      name: "triage-bot",
      ownerId: alice.sub,
    });
    onMembershipDeparture(WS, alice.sub);

    const reassigned = reassignAutomation({
      workspaceId: WS,
      automationId: automation.id,
      newOwnerId: admin.sub,
      actor: admin,
    });
    expect(reassigned.status).toBe("active");
    expect(reassigned.ownerId).toBe(admin.sub);
    expect(reassigned.deactivationReason).toBeUndefined();
    expect(canRunStandingAutomation(WS, automation.id)).toBe(true);

    // Admin has slack.post; run allows under admin identity.
    const asAdmin = await resolveAutomationDispatch(
      {
        workspaceId: WS,
        automationId: automation.id,
        tool: { namespace: "slack", operation: "post", effect: "action" },
        resource: "slack://T1/C-general",
        ownerRole: "admin",
      },
      {
        invokerPatterns: ["slack.post"],
        resourceGrants: [
          grantRow({
            capability: "slack.post",
            resourcePattern: "slack://T1/**",
            credentialLevel: "workspace-oauth",
            subject: { kind: "user", id: admin.sub },
          }),
        ],
      },
    );
    expect(asAdmin).toEqual({ kind: "allow" });

    // Same automation under admin with no matching grant → queue (admin's
    // standing, not Alice's prior wider grant).
    const noGrant = await resolveAutomationDispatch(
      {
        workspaceId: WS,
        automationId: automation.id,
        tool: { namespace: "slack", operation: "post", effect: "action" },
        resource: "slack://T1/C-general",
        ownerRole: "admin",
      },
      {
        invokerPatterns: ["slack.post"],
        resourceGrants: [
          grantRow({
            capability: "slack.post",
            resourcePattern: "slack://T1/C-private",
            credentialLevel: "workspace-oauth",
            subject: { kind: "user", id: admin.sub },
          }),
        ],
      },
    );
    expect(noGrant.kind).toBe("queue");

    // Non-admin cannot reassign.
    expect(() =>
      reassignAutomation({
        workspaceId: WS,
        automationId: automation.id,
        newOwnerId: "user-bob",
        actor: alice,
      }),
    ).toThrow(ServiceError);
  });

  it("Grant revoked mid-standing — next call out-of-grant; tool list cache invalidated", async () => {
    const automation = registerStandingAutomation({
      workspaceId: WS,
      kind: "workflow",
      name: "slack-digest",
      ownerId: alice.sub,
    });

    // App had slack.post; admin revokes the grant → cache invalidation fires.
    onGrantRevoked(WS);
    expect(invalidatedWorkspaces).toEqual([WS]);

    // Next dispatch from any path (here: standing automation) is out-of-grant.
    const decision = await resolveAutomationDispatch(
      {
        workspaceId: WS,
        automationId: automation.id,
        tool: { namespace: "slack", operation: "post", effect: "action" },
        resource: "slack://T1/C-general",
        via: { appId: "app-slack" },
      },
      {
        // Capability revoked — invoker no longer holds slack.post.
        invokerPatterns: [],
        appCeiling: ["slack.post"],
        resourceGrants: [],
      },
    );
    expect(decision).toEqual({ kind: "deny", reason: "capability" });

    // Credential revoke uses the same cache cascade.
    invalidatedWorkspaces = [];
    onCredentialRevoked(WS);
    expect(invalidatedWorkspaces).toEqual([WS]);

    // Departed owner's user-oauth path fails closed immediately.
    onMembershipDeparture(WS, alice.sub);
    const stillOwned = registerStandingAutomation({
      workspaceId: WS,
      kind: "schedule",
      name: "user-oauth-job",
      ownerId: alice.sub,
      id: "fresh-after-depart",
    });
    expect(userLevelCredentialGrantsResolvable(WS, alice.sub)).toBe(false);
    const userOauth = await resolveAutomationDispatch(
      {
        workspaceId: WS,
        automationId: stillOwned.id,
        tool: { namespace: "slack", operation: "post", effect: "action" },
        credential: { level: "user-oauth" },
      },
      { invokerPatterns: ["slack.post"], resourceGrants: [] },
    );
    expect(userOauth).toEqual({ kind: "deny", reason: "credential-unconnected" });
  });
});
