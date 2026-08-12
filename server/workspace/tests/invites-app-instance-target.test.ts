/**
 * CF-2 — instance-targeted guest invites: consume mints an F2 participant
 * (role guest) and zero workspace memberships; expired/consumed fail
 * distinguishably; revoke makes the token non-consumable.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import {
  createInstance,
  getInstance,
  type HostingMode,
} from "../src/apps/instances.js";
import { createSqliteIdentityClient } from "../src/identity/sql.js";
import { resetIdentityStore } from "../src/identity/store.js";
import {
  consumeInvite,
  createInvite,
  getInvite,
  InviteConsumeError,
  listInvites,
  revokeInvite,
} from "../src/invites.js";
import { getMembership, listMembers, putMembership } from "../src/memberships.js";
import { svcScope, writeSvcRecord } from "../src/svc-records.js";

let dataDir: string;

const WS = "ws-invite-target";
const APP = "01APPCHATINVITE000000000000";
const INSTALL_HOSTED = "01INSTALLHOSTEDINV000000000";
const HOST = "host-alice";
const GUEST = "guest-bob";

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-invites-target-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  delete process.env["STORE_BACKEND"];
  resetIdentityStore();
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  resetIdentityStore();
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(async () => {
  resetIdentityStore();
  await putMembership({ workspaceId: WS, userId: HOST, role: "admin" });
});

async function seedHostedInstall(installId: string): Promise<void> {
  await writeSvcRecord(WS, svcScope("installs"), installId, {
    installId,
    originAppId: APP,
    originWorkspaceId: WS,
    pin: { channel: "latest" },
    resolvedRelease: null,
    bindings: {},
    config: {},
    editing: false,
    installedBy: HOST,
    installedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hosting: "hosted" satisfies HostingMode,
  });
}

describe("CF-2 app-instance targeted invites", () => {
  it("consume mints exactly one F2 guest participant and zero memberships", async () => {
    await seedHostedInstall(INSTALL_HOSTED);
    const instance = await createInstance({
      workspaceId: WS,
      appId: INSTALL_HOSTED,
      createdBy: HOST,
      participants: [HOST],
    });
    const channelIds = ["01CHANNELPUBLIC000000000000", "01CHANNELRESTRICT0000000000"];

    const invite = await createInvite(
      WS,
      "guest@example.com",
      "guest",
      [],
      HOST,
      { kind: "app-instance", installId: instance.instanceId, channelIds },
    );
    expect(invite.role).toBe("guest");
    expect(invite.target).toEqual({
      kind: "app-instance",
      installId: instance.instanceId,
      channelIds,
    });
    expect((await getInvite(invite.inviteToken))?.target?.channelIds).toEqual(channelIds);

    const membersBefore = await listMembers(WS);
    expect(membersBefore.map((m) => m.userId).sort()).toEqual([HOST]);

    const consumed = await consumeInvite(invite.inviteToken, GUEST);
    expect(consumed?.role).toBe("guest");
    expect(consumed?.target?.kind).toBe("app-instance");
    expect(consumed?.target?.channelIds).toEqual(channelIds);

    const after = await getInstance(WS, instance.instanceId);
    expect(after?.participants).toEqual([HOST, GUEST]);
    expect(await getMembership(WS, GUEST)).toBeUndefined();
    expect((await listMembers(WS)).map((m) => m.userId).sort()).toEqual([HOST]);

    // Single-use: second consume is not_found, no duplicate participation.
    expect(await consumeInvite(invite.inviteToken, GUEST)).toBeUndefined();
    expect((await getInstance(WS, instance.instanceId))?.participants).toEqual([HOST, GUEST]);
  });

  it("expired token fails distinguishably with no participation created", async () => {
    await seedHostedInstall(INSTALL_HOSTED);
    const instance = await createInstance({
      workspaceId: WS,
      appId: INSTALL_HOSTED,
      createdBy: HOST,
      participants: [HOST],
    });

    const invite = await createInvite(
      WS,
      "expired@example.com",
      "guest",
      [],
      HOST,
      { kind: "app-instance", installId: instance.instanceId },
    );

    const client = createSqliteIdentityClient(dataDir);
    await client.run(`UPDATE invites SET expires_at = 1 WHERE invite_token = ?`, [
      invite.inviteToken,
    ]);

    await expect(consumeInvite(invite.inviteToken, GUEST)).rejects.toMatchObject({
      name: "InviteConsumeError",
      code: "expired",
    } satisfies Partial<InviteConsumeError>);

    expect((await getInstance(WS, instance.instanceId))?.participants).toEqual([HOST]);
    expect(await getMembership(WS, GUEST)).toBeUndefined();
  });

  it("consumed token fails as not_found (distinguishable from expired)", async () => {
    await seedHostedInstall(INSTALL_HOSTED);
    const instance = await createInstance({
      workspaceId: WS,
      appId: INSTALL_HOSTED,
      createdBy: HOST,
      participants: [HOST],
    });

    const invite = await createInvite(
      WS,
      "once@example.com",
      "guest",
      [],
      HOST,
      { kind: "app-instance", installId: instance.instanceId },
    );
    await consumeInvite(invite.inviteToken, GUEST);

    const second = await consumeInvite(invite.inviteToken, "another-guest");
    expect(second).toBeUndefined();
    // Expired throws; consumed returns undefined — distinguishable.
    expect((await getInstance(WS, instance.instanceId))?.participants).toEqual([HOST, GUEST]);
    expect(await getMembership(WS, "another-guest")).toBeUndefined();
  });

  it("revoke makes the token non-consumable and drops it from the host list", async () => {
    await seedHostedInstall(INSTALL_HOSTED);
    const instance = await createInstance({
      workspaceId: WS,
      appId: INSTALL_HOSTED,
      createdBy: HOST,
      participants: [HOST],
    });

    const invite = await createInvite(
      WS,
      "revoke@example.com",
      "guest",
      [],
      HOST,
      { kind: "app-instance", installId: instance.instanceId },
    );
    expect((await listInvites(WS)).some((i) => i.inviteToken === invite.inviteToken)).toBe(true);

    expect(await revokeInvite(invite.inviteToken)).toBe(true);
    expect(await getInvite(invite.inviteToken)).toBeUndefined();
    expect((await listInvites(WS)).some((i) => i.inviteToken === invite.inviteToken)).toBe(false);

    expect(await consumeInvite(invite.inviteToken, GUEST)).toBeUndefined();
    expect((await getInstance(WS, instance.instanceId))?.participants).toEqual([HOST]);
    expect(await getMembership(WS, GUEST)).toBeUndefined();
  });
});
