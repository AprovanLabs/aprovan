/**
 * @chat E2E — Presence + typing (ephemeral) — IW-9 Chat stream 12.1.
 *
 * Proves: two connected participants see each other online, typing
 * round-trips with ~4s TTL, and disconnect clears presence for viewers
 * (spec `chat-realtime` "Presence and typing are ephemeral").
 *
 * Auth-none: browser contexts resolve as `sub: "local"`. Distinct
 * principals are exercised via workspace invite + in-process broker fake
 * Conns against the shared E2E SQLite data dir (streams 10–11 pattern).
 * Install is seeded via svc records (no `apps.promote`) so the suite does
 * not trip promote rate limits when run after other @chat specs.
 */
import { randomUUID } from "node:crypto";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { test, expect } from "./fixtures/two-users";

const DATA_DIR =
  process.env["E2E_WORKSPACE_DATA_DIR"] ?? join(tmpdir(), "aprovan-playwright-e2e");

const USER_A = "local";
const USER_B = "user-b";

process.env["WORKSPACE_MODE"] = "local";
process.env["WORKSPACE_DATA_DIR"] = DATA_DIR;

/** Platform helpers — same SQLite data dir as the webServer gateway. */
async function platform() {
  const { putMembership } = await import(
    "../../../server/workspace/src/memberships.js"
  );
  const { createInvite, consumeInvite } = await import(
    "../../../server/workspace/src/invites.js"
  );
  const { createInstance } = await import(
    "../../../server/workspace/src/apps/instances.js"
  );
  const { createChannel } = await import(
    "../../../server/workspace/src/apps/chat/service.js"
  );
  const { createBroker } = await import(
    "../../../server/workspace/src/realtime/broker.js"
  );
  const { createAppTopicsHandler, appTopic } = await import(
    "../../../server/workspace/src/realtime/app-topics.js"
  );
  const { writeSvcRecord, svcScope } = await import(
    "../../../server/workspace/src/svc-records.js"
  );
  return {
    putMembership,
    createInvite,
    consumeInvite,
    createInstance,
    createChannel,
    createBroker,
    createAppTopicsHandler,
    appTopic,
    writeSvcRecord,
    svcScope,
  };
}

type FakeConn = {
  id: string;
  userId: string;
  workspaceId: string;
  send: (msg: { type?: string; body?: unknown }) => void;
  sent: Array<{ type?: string; body?: unknown; topic?: string }>;
};

function fakeConn(
  workspaceId: string,
  overrides: Partial<FakeConn> & { id: string; userId: string },
): FakeConn {
  const sent: FakeConn["sent"] = [];
  return {
    workspaceId,
    send(msg) {
      sent.push(msg);
    },
    sent,
    ...overrides,
  };
}

function presenceRoster(
  msgs: FakeConn["sent"],
): Array<{ sub: string; lastActive: string }> | undefined {
  for (let i = msgs.length - 1; i >= 0; i--) {
    const m = msgs[i];
    if (m?.type === "event") {
      const body = m.body as { kind?: string; roster?: Array<{ sub: string; lastActive: string }> };
      if (body?.kind === "presence" && Array.isArray(body.roster)) return body.roster;
    }
    if (m?.type === "subscribed") {
      const body = m.body as { presence?: Array<{ sub: string; lastActive: string }> };
      if (Array.isArray(body?.presence)) return body.presence;
    }
  }
  return undefined;
}

async function waitForRoster(
  msgs: FakeConn["sent"],
  predicate: (roster: Array<{ sub: string }>) => boolean,
  timeoutMs = 5_000,
): Promise<Array<{ sub: string; lastActive: string }>> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const roster = presenceRoster(msgs);
    if (roster && predicate(roster)) return roster;
    await new Promise((r) => setTimeout(r, 50));
  }
  throw new Error("Timed out waiting for presence roster update");
}

test("@chat presence and typing are ephemeral across two participants", async ({
  twoUsers,
}) => {
  test.setTimeout(120_000);
  const api = await platform();

  await api.putMembership({
    workspaceId: "local",
    userId: USER_A,
    role: "admin",
  });
  const invite = await api.createInvite(
    "local",
    "bob@example.com",
    "member",
    [],
    USER_A,
  );
  await api.consumeInvite(invite.inviteToken, USER_B);
  await api.putMembership({
    workspaceId: "local",
    userId: USER_B,
    role: "member",
  });

  // Seed managed install via svc records (unit-test shape) — avoids promote
  // rate limits when this spec runs after other @chat E2Es on one gateway.
  const installId = randomUUID();
  const now = new Date().toISOString();
  await api.writeSvcRecord("local", api.svcScope("installs"), installId, {
    installId,
    originAppId: randomUUID(),
    originWorkspaceId: "local",
    pin: { channel: "latest" },
    resolvedRelease: null,
    bindings: {},
    config: {},
    editing: false,
    installedBy: USER_A,
    installedAt: now,
    updatedAt: now,
    hosting: "managed",
  });

  // Touch both browser contexts (fixture contract) even though presence is
  // asserted on the in-process broker (auth-none WS is always `local`).
  await twoUsers.userA.page.goto("./").catch(() => undefined);
  await twoUsers.userB.page.goto("./").catch(() => undefined);

  const instance = await api.createInstance({
    workspaceId: "local",
    appId: installId,
    createdBy: USER_A,
    participants: [USER_A, USER_B],
  });

  const scopeA = {
    workspaceId: "local",
    installId,
    instanceId: instance.instanceId,
    userId: USER_A,
  };
  const channel = await api.createChannel(scopeA, {
    name: `general-${twoUsers.testId.slice(0, 8)}`,
    kind: "public",
  });

  // In-process broker: distinct subs (auth-none WS cannot mint user-b).
  const broker = api.createBroker();
  broker.registerNamespace(api.createAppTopicsHandler(broker));
  const topic = api.appTopic(installId);

  const connA = fakeConn("local", { id: "e2e-presence-a", userId: USER_A });
  const connB = fakeConn("local", { id: "e2e-presence-b", userId: USER_B });
  broker.addConnection(connA as never);
  broker.addConnection(connB as never);

  await broker.handleClientMessage(connA as never, { type: "subscribe", topic });
  await broker.handleClientMessage(connB as never, { type: "subscribe", topic });

  // --- Two connected users see each other online ---
  const rosterAfterSub = presenceRoster(connB.sent);
  expect(rosterAfterSub).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ sub: USER_A }),
      expect.objectContaining({ sub: USER_B }),
    ]),
  );
  expect(rosterAfterSub?.map((r) => r.sub).sort()).toEqual([USER_A, USER_B].sort());

  connA.sent.length = 0;
  connB.sent.length = 0;

  // --- Typing indicator round-trips (~4s TTL) ---
  const beforeTyping = Date.now();
  await broker.handleClientMessage(connA as never, {
    type: "publish",
    topic,
    body: { action: "typing", channelId: channel.id },
  });

  const typingEvt = connB.sent.find(
    (m) => m.type === "event" && (m.body as { kind?: string })?.kind === "typing",
  );
  expect(typingEvt).toMatchObject({
    type: "event",
    body: { kind: "typing", channelId: channel.id, sub: USER_A },
  });
  // Server stores typing with expiresAt = now + 4_000 (T5 / ~4s client TTL).
  const typingKey = `typing:${installId}\0${channel.id}\0${USER_A}`;
  const typingRow = await broker.storeFor("local", "app").get<{
    expiresAt: number;
  }>(typingKey);
  expect(typingRow?.expiresAt).toBeGreaterThan(beforeTyping);
  expect(typingRow?.expiresAt).toBeLessThanOrEqual(beforeTyping + 4_000 + 500);

  connA.sent.length = 0;
  connB.sent.length = 0;

  // Presence refresh still fans out without records writes (ephemeral path).
  await broker.handleClientMessage(connA as never, {
    type: "publish",
    topic,
    body: { action: "presence" },
  });
  expect(
    connB.sent.some(
      (m) => m.type === "event" && (m.body as { kind?: string })?.kind === "presence",
    ),
  ).toBe(true);

  // --- Disconnect clears presence for all viewers ---
  connB.sent.length = 0;
  broker.removeConnection(connA as never);

  const rosterAfterLeave = await waitForRoster(
    connB.sent,
    (r) => !r.some((x) => x.sub === USER_A) && r.some((x) => x.sub === USER_B),
  );
  expect(rosterAfterLeave.some((r) => r.sub === USER_A)).toBe(false);
  expect(rosterAfterLeave.some((r) => r.sub === USER_B)).toBe(true);
  expect(await broker.storeFor("local", "app").get(`focus:${connA.id}`)).toBeUndefined();
  expect(
    await broker.storeFor("local", "app").get(`member:${installId}\0${USER_A}`),
  ).toBeUndefined();
});
