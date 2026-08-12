/**
 * Chat data model + canReadChannel (iw9-chat-flagship stream 1).
 *
 * Covers: attributed writes, thread nesting bound, restricted-channel
 * hide, non-participant deny-as-404, canReadChannel matrix including
 * guest-with-partial-grant.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { isValid } from "ulid";
import { canReadChannel } from "../src/apps/chat/authz.js";
import {
  createChannel,
  fetchOlder,
  fetchWindow,
  listChannels,
  postMessage,
  type ChatScope,
} from "../src/apps/chat/service.js";
import { channelKey, messageKey } from "../src/apps/chat/schema.js";
import {
  createInstance,
  sharedRecordScope,
  type HostingMode,
} from "../src/apps/instances.js";
import { putMembership } from "../src/memberships.js";
import { getRecordStore } from "../src/records.js";
import { ServiceError } from "../src/service-kernel.js";
import { svcScope, writeSvcRecord } from "../src/svc-records.js";

let dataDir: string;

const WS = "ws-chat-dm";
const INSTALL = "01CHATINSTALL0000000000000";
const INSTALL_HOSTED = "01CHATHOSTED00000000000000";
const ALICE = "alice";
const BOB = "bob";
const CAROL = "carol";
const GUEST = "guest-user";
const OUTSIDER = "outsider";

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-chat-data-model-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(async () => {
  await putMembership({ workspaceId: WS, userId: ALICE, role: "admin" });
  await putMembership({ workspaceId: WS, userId: BOB, role: "member" });
  await putMembership({ workspaceId: WS, userId: CAROL, role: "member" });
});

async function seedInstall(installId: string, hosting: HostingMode): Promise<void> {
  await writeSvcRecord(WS, svcScope("installs"), installId, {
    installId,
    originAppId: "01ORIGINCHAT000000000000000",
    originWorkspaceId: WS,
    pin: { channel: "latest" },
    resolvedRelease: null,
    bindings: {},
    config: {},
    editing: false,
    installedBy: ALICE,
    installedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hosting,
  });
}

async function seedManaged(): Promise<{ instanceId: string; alice: ChatScope; bob: ChatScope }> {
  await seedInstall(INSTALL, "managed");
  const instance = await createInstance({
    workspaceId: WS,
    appId: INSTALL,
    createdBy: ALICE,
    participants: [ALICE, BOB, CAROL],
  });
  const base = { workspaceId: WS, installId: INSTALL, instanceId: instance.instanceId };
  return {
    instanceId: instance.instanceId,
    alice: { ...base, userId: ALICE },
    bob: { ...base, userId: BOB },
  };
}

async function seedHostedWithGuest(): Promise<{
  instanceId: string;
  alice: ChatScope;
  guest: ChatScope;
}> {
  await seedInstall(INSTALL_HOSTED, "hosted");
  const instance = await createInstance({
    workspaceId: WS,
    appId: INSTALL_HOSTED,
    createdBy: ALICE,
    participants: [ALICE, GUEST],
  });
  const base = {
    workspaceId: WS,
    installId: INSTALL_HOSTED,
    instanceId: instance.instanceId,
  };
  return {
    instanceId: instance.instanceId,
    alice: { ...base, userId: ALICE },
    guest: { ...base, userId: GUEST },
  };
}

describe("Message write is attributed and partition-scoped", () => {
  it("participant post writes author + shared partition; peer can read", async () => {
    const { alice, bob, instanceId } = await seedManaged();
    const channel = await createChannel(alice, { name: "general", kind: "public" });
    const posted = await postMessage(alice, {
      channelId: channel.id,
      body: "hello from alice",
    });

    expect(isValid(posted.id)).toBe(true);
    expect(posted.author).toBe(ALICE);
    expect(posted.channelId).toBe(channel.id);

    const scope = sharedRecordScope(INSTALL, instanceId);
    const hit = await getRecordStore().get(
      WS,
      scope,
      messageKey(channel.id, posted.id),
    );
    expect(hit?.updatedBy).toBe(ALICE);
    expect(hit?.value).toMatchObject({ author: ALICE, body: "hello from alice" });

    const window = await fetchWindow(bob, channel.id, { limit: 10 });
    expect(window).toHaveLength(1);
    expect(window[0]?.author).toBe(ALICE);
  });
});

describe("Thread nesting is bounded", () => {
  it("rejects reply-of-reply with validation error", async () => {
    const { alice } = await seedManaged();
    const channel = await createChannel(alice, { name: "threads", kind: "public" });
    const root = await postMessage(alice, { channelId: channel.id, body: "root" });
    const reply = await postMessage(alice, {
      channelId: channel.id,
      body: "reply",
      parentId: root.id,
    });

    await expect(
      postMessage(alice, {
        channelId: channel.id,
        body: "nested",
        parentId: reply.id,
      }),
    ).rejects.toMatchObject({
      status: 400,
      message: expect.stringMatching(/Thread nesting is bounded/i),
    } satisfies Partial<ServiceError>);
  });
});

describe("Restricted channel hides from non-members", () => {
  it("omits from list and 404s message fetch for non-members", async () => {
    const { alice, bob } = await seedManaged();
    const publicCh = await createChannel(alice, { name: "lobby", kind: "public" });
    const restricted = await createChannel(alice, {
      name: "private",
      kind: "restricted",
      members: [ALICE],
    });
    await postMessage(alice, { channelId: restricted.id, body: "secret" });

    const bobList = await listChannels(bob);
    expect(bobList.map((c) => c.id)).toContain(publicCh.id);
    expect(bobList.map((c) => c.id)).not.toContain(restricted.id);

    await expect(fetchWindow(bob, restricted.id, { limit: 10 })).rejects.toMatchObject({
      status: 404,
    } satisfies Partial<ServiceError>);
    await expect(fetchOlder(bob, restricted.id, "01Z", 10)).rejects.toMatchObject({
      status: 404,
    } satisfies Partial<ServiceError>);
    await expect(
      postMessage(bob, { channelId: restricted.id, body: "nope" }),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
  });
});

describe("Non-participant cannot read instance data", () => {
  it("404s every read/write surface", async () => {
    const { alice, instanceId } = await seedManaged();
    const channel = await createChannel(alice, { name: "general", kind: "public" });
    await postMessage(alice, { channelId: channel.id, body: "hi" });

    const outsider: ChatScope = {
      workspaceId: WS,
      installId: INSTALL,
      instanceId,
      userId: OUTSIDER,
    };

    await expect(
      createChannel(outsider, { name: "x", kind: "public" }),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
    await expect(listChannels(outsider)).rejects.toMatchObject({
      status: 404,
    } satisfies Partial<ServiceError>);
    await expect(fetchWindow(outsider, channel.id, { limit: 5 })).rejects.toMatchObject({
      status: 404,
    } satisfies Partial<ServiceError>);
    await expect(fetchOlder(outsider, channel.id, "01Z", 5)).rejects.toMatchObject({
      status: 404,
    } satisfies Partial<ServiceError>);
    await expect(
      postMessage(outsider, { channelId: channel.id, body: "x" }),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
  });
});

describe("fetchWindow / fetchOlder ordering", () => {
  it("returns ascending windows by id and pages older", async () => {
    const { alice } = await seedManaged();
    const channel = await createChannel(alice, { name: "ordered", kind: "public" });
    const a = await postMessage(alice, { channelId: channel.id, body: "1" });
    const b = await postMessage(alice, { channelId: channel.id, body: "2" });
    const c = await postMessage(alice, { channelId: channel.id, body: "3" });

    const latestTwo = await fetchWindow(alice, channel.id, { limit: 2 });
    expect(latestTwo.map((m) => m.id)).toEqual([b.id, c.id]);

    const older = await fetchOlder(alice, channel.id, b.id, 10);
    expect(older.map((m) => m.id)).toEqual([a.id]);

    const beforeC = await fetchWindow(alice, channel.id, { before: c.id, limit: 1 });
    expect(beforeC.map((m) => m.id)).toEqual([b.id]);
  });
});

describe("canReadChannel", () => {
  it("public / restricted / non-member / non-participant / guest partial grant", async () => {
    const { alice, bob, instanceId } = await seedManaged();
    const publicCh = await createChannel(alice, { name: "pub", kind: "public" });
    const restricted = await createChannel(alice, {
      name: "res",
      kind: "restricted",
      members: [ALICE, BOB],
    });
    const scope = { workspaceId: WS, instanceId };

    expect(await canReadChannel(ALICE, INSTALL, publicCh.id, scope)).toBe(true);
    expect(await canReadChannel(BOB, INSTALL, publicCh.id, scope)).toBe(true);
    expect(await canReadChannel(CAROL, INSTALL, publicCh.id, scope)).toBe(true);

    expect(await canReadChannel(ALICE, INSTALL, restricted.id, scope)).toBe(true);
    expect(await canReadChannel(BOB, INSTALL, restricted.id, scope)).toBe(true);
    expect(await canReadChannel(CAROL, INSTALL, restricted.id, scope)).toBe(false);

    expect(await canReadChannel(OUTSIDER, INSTALL, publicCh.id, scope)).toBe(false);
    expect(await canReadChannel(OUTSIDER, INSTALL, restricted.id, scope)).toBe(false);
    expect(await canReadChannel(ALICE, INSTALL, "01MISSINGCHANNEL0000000000", scope)).toBe(
      false,
    );

    // Guest with partial grant: participant of a hosted instance, listed
    // only on the granted restricted channel (CF-2 / CF-4 interim).
    const hosted = await seedHostedWithGuest();
    const hostedPublic = await createChannel(hosted.alice, {
      name: "hosted-pub",
      kind: "public",
    });
    const granted = await createChannel(hosted.alice, {
      name: "guest-ok",
      kind: "restricted",
      members: [ALICE, GUEST],
    });
    const ungranted = await createChannel(hosted.alice, {
      name: "guest-no",
      kind: "restricted",
      members: [ALICE],
    });
    const guestScope = {
      workspaceId: WS,
      instanceId: hosted.instanceId,
    };
    // Public ⇒ any participant (including guest).
    expect(
      await canReadChannel(GUEST, INSTALL_HOSTED, hostedPublic.id, guestScope),
    ).toBe(true);
    // Partial grant: only listed restricted channels.
    expect(
      await canReadChannel(GUEST, INSTALL_HOSTED, granted.id, guestScope),
    ).toBe(true);
    expect(
      await canReadChannel(GUEST, INSTALL_HOSTED, ungranted.id, guestScope),
    ).toBe(false);

    // Channel record key shape sanity.
    const hit = await getRecordStore().get(
      WS,
      sharedRecordScope(INSTALL, instanceId),
      channelKey(publicCh.id),
    );
    expect(hit?.value).toMatchObject({ id: publicCh.id, kind: "public" });
  });
});
