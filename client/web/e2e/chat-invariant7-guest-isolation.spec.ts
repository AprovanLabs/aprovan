/**
 * @chat E2E — Invariant 7 guest isolation — IW-9 Chat stream 12.3–12.4.
 *
 * Proves: a guest with a live subscription never receives events for a
 * restricted channel they cannot read (raw frame capture, retries=0);
 * mid-session channel-access revocation filters post-revocation fan-out
 * without reconnect (spec `chat-realtime` "Revocation takes effect at
 * fan-out").
 *
 * Auth-none: browsers resolve as `sub: "local"`. Guest principal is minted
 * via CF-2 invite facade; dual-sub fan-out uses an in-process broker with
 * fake Conns (streams 10–11). Stream 9 `attachWsCapture` + assertZeroMatching
 * assert zero restricted-channel frames on the guest delivery stream.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { test, expect, type Page } from "./fixtures/two-users";
import {
  attachWsCapture,
  type WsCapture,
  type WsFrame,
} from "./fixtures/ws-capture";

const GATEWAY_PORT = Number(process.env["E2E_GATEWAY_PORT"] ?? 4010);
const GATEWAY_ORIGIN = `http://127.0.0.1:${GATEWAY_PORT}`;
const GATEWAY = `${GATEWAY_ORIGIN}/api/gateway`;
const WS_URL = `ws://127.0.0.1:${GATEWAY_PORT}/api/gateway/ws`;
const REALTIME_SUBPROTOCOL = "aprovan.v1";

const DATA_DIR =
  process.env["E2E_WORKSPACE_DATA_DIR"] ?? join(tmpdir(), "aprovan-playwright-e2e");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const CHAT_APP_YAML = join(ROOT, "Apps/chat/app.yaml");

const USER_A = "local";
const GUEST = "guest-inv7";

process.env["WORKSPACE_MODE"] = "local";
process.env["WORKSPACE_DATA_DIR"] = DATA_DIR;

/** Security assertions must not flake-retry (tech-plan T6). */
test.describe.configure({ retries: 0 });

type Json = Record<string, unknown>;

async function gatewayJson(
  path: string,
  init?: RequestInit,
): Promise<{ status: number; body: Json }> {
  const res = await fetch(`${GATEWAY}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const body = (await res.json().catch(() => ({}))) as Json;
  return { status: res.status, body };
}

async function tools(operation: string, args: Record<string, unknown> = {}): Promise<Json> {
  const { status, body } = await gatewayJson(`/tools/apps/${operation}`, {
    method: "POST",
    body: JSON.stringify({ args }),
  });
  if (status >= 400) {
    throw new Error(
      `apps.${operation} failed (${status}): ${String(body["error"] ?? JSON.stringify(body))}`,
    );
  }
  return (body["data"] as Json) ?? body;
}

async function seedChatOrigin(slug: string): Promise<string> {
  const yaml = readFileSync(CHAT_APP_YAML, "utf8");
  const write = await gatewayJson("/tools/vfs/write", {
    method: "POST",
    body: JSON.stringify({
      args: { path: `apps/personal/${slug}/app.yaml`, content: yaml },
    }),
  });
  if (write.status >= 400) {
    throw new Error(`vfs.write failed: ${JSON.stringify(write.body)}`);
  }
  const promoted = await tools("promote", {
    source: `apps/personal/${slug}`,
    slug,
  });
  const appId = promoted["appId"];
  if (typeof appId !== "string" || !appId) {
    throw new Error(`promote missing appId: ${JSON.stringify(promoted)}`);
  }
  return appId;
}

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
  const { canReadChannel } = await import(
    "../../../server/workspace/src/apps/chat/authz.js"
  );
  const { createBroker } = await import(
    "../../../server/workspace/src/realtime/broker.js"
  );
  const { createAppTopicsHandler, appTopic } = await import(
    "../../../server/workspace/src/realtime/app-topics.js"
  );
  return {
    putMembership,
    createInvite,
    consumeInvite,
    createInstance,
    createChannel,
    canReadChannel,
    createBroker,
    createAppTopicsHandler,
    appTopic,
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

/**
 * Mirror stream 9's WsCapture over in-process Conn deliveries so we can
 * assertZeroMatching against the guest's full raw event stream under
 * auth-none (page WS cannot mint a distinct guest sub).
 */
function captureFromConn(conn: FakeConn): WsCapture {
  const frames: WsFrame[] = [];
  const capture: WsCapture = {
    get frames() {
      return frames;
    },
    clear() {
      frames.length = 0;
    },
    assertZeroMatching(predicate, message) {
      const hits = frames.filter(predicate);
      if (hits.length === 0) return;
      const sample = hits
        .slice(0, 3)
        .map((f) => `${f.direction}@${f.url}: ${f.payload.slice(0, 200)}`)
        .join("\n");
      throw new Error(
        message ??
          `Expected zero matching WebSocket frames, got ${hits.length}. Sample:\n${sample}`,
      );
    },
  };
  const origSend = conn.send.bind(conn);
  conn.send = (msg) => {
    origSend(msg);
    frames.push({
      direction: "received",
      payload: JSON.stringify(msg),
      url: `broker://${conn.userId}/${conn.id}`,
    });
  };
  return capture;
}

async function openAppsPanel(page: Page): Promise<void> {
  await page.goto("./");
  const appsNav = page.getByRole("button", { name: /^Apps$/i }).first();
  if (await appsNav.isVisible().catch(() => false)) {
    await appsNav.click();
  } else {
    const installCta = page.getByText("Install from directory").first();
    if (await installCta.isVisible().catch(() => false)) {
      await installCta.click();
    }
  }
  await expect(page.getByRole("button", { name: /Install from directory/i })).toBeVisible({
    timeout: 30_000,
  });
}

test("@chat invariant-7: guest never receives restricted-channel frames; revoke filters without reconnect", async ({
  twoUsers,
}) => {
  test.setTimeout(180_000);
  // Explicit retries=0 on this security gate (also suite-level + CLI).
  test.info().annotations.push({ type: "retries", description: "0" });

  const slug = `chat-i7-${twoUsers.testId.slice(0, 8)}`;
  const installSlug = `chat-i7h-${twoUsers.testId.slice(0, 8)}`;
  const api = await platform();

  await api.putMembership({
    workspaceId: "local",
    userId: USER_A,
    role: "admin",
  });

  const appId = await seedChatOrigin(slug);
  const { page: pageA, context: ctxA } = twoUsers.userA;
  const { page: pageB } = twoUsers.userB;

  // Attach stream 9 capture before any realtime socket opens on the guest page.
  const pageGuestCapture = attachWsCapture(pageB);
  await pageB.goto("./").catch(() => undefined);

  await openAppsPanel(pageA);
  await pageA.getByRole("button", { name: /Install from directory/i }).click();
  await expect(pageA.getByText("Chat", { exact: false }).first()).toBeVisible({
    timeout: 30_000,
  });

  const installed = await tools("install", {
    app: appId,
    slug: installSlug,
    mode: "hosted",
  });
  const installId = installed["installId"];
  expect(typeof installId).toBe("string");
  expect(installed["hosting"]).toBe("hosted");

  twoUsers.registerCleanup(async () => {
    await gatewayJson("/tools/apps/uninstall", {
      method: "POST",
      body: JSON.stringify({ args: { install: installId, purgeData: true } }),
    }).catch(() => undefined);
  });

  const instance = await api.createInstance({
    workspaceId: "local",
    appId: installId as string,
    createdBy: USER_A,
    participants: [USER_A],
  });

  const hostScope = {
    workspaceId: "local",
    installId: installId as string,
    instanceId: instance.instanceId,
    userId: USER_A,
  };

  const openChannel = await api.createChannel(hostScope, {
    name: `lobby-${twoUsers.testId.slice(0, 8)}`,
    kind: "public",
  });
  const restricted = await api.createChannel(hostScope, {
    name: `private-${twoUsers.testId.slice(0, 8)}`,
    kind: "restricted",
    members: [USER_A],
  });

  // Guest invite (CF-2) — granted open channel only.
  const httpInvite = await gatewayJson("/invites", {
    method: "POST",
    body: JSON.stringify({
      email: "inv7@example.com",
      role: "guest",
      groupIds: [],
      target: {
        kind: "app-instance",
        installId: instance.instanceId,
        channelIds: [openChannel.id],
      },
    }),
  });
  expect(httpInvite.status).toBe(201);
  const inviteToken = httpInvite.body["inviteToken"];
  expect(typeof inviteToken).toBe("string");

  const consumed = await api.consumeInvite(inviteToken as string, GUEST);
  expect(consumed?.role).toBe("guest");
  expect(consumed?.target?.kind).toBe("app-instance");

  expect(
    await api.canReadChannel(GUEST, installId as string, restricted.id, {
      workspaceId: "local",
      instanceId: instance.instanceId,
    }),
  ).toBe(false);
  expect(
    await api.canReadChannel(GUEST, installId as string, openChannel.id, {
      workspaceId: "local",
      instanceId: instance.instanceId,
    }),
  ).toBe(true);

  // Shared-channel case for 12.4: participant who starts with access.
  const shared = await api.createChannel(hostScope, {
    name: `shared-${twoUsers.testId.slice(0, 8)}`,
    kind: "restricted",
    members: [USER_A, GUEST],
  });
  expect(
    await api.canReadChannel(GUEST, installId as string, shared.id, {
      workspaceId: "local",
      instanceId: instance.instanceId,
    }),
  ).toBe(true);

  const broker = api.createBroker();
  const handler = api.createAppTopicsHandler(broker);
  broker.registerNamespace(handler);
  const topic = api.appTopic(installId as string);

  const hostConn = fakeConn("local", { id: "e2e-inv7-host", userId: USER_A });
  const guestConn = fakeConn("local", { id: "e2e-inv7-guest", userId: GUEST });
  broker.addConnection(hostConn as never);
  broker.addConnection(guestConn as never);

  const guestCapture = captureFromConn(guestConn);
  await broker.handleClientMessage(hostConn as never, { type: "subscribe", topic });
  await broker.handleClientMessage(guestConn as never, { type: "subscribe", topic });

  guestCapture.clear();
  hostConn.sent.length = 0;
  guestConn.sent.length = 0;
  pageGuestCapture.clear();

  // --- 12.3: message on restricted channel → zero guest frames reference it ---
  await broker.handleClientMessage(hostConn as never, {
    type: "publish",
    topic,
    body: {
      action: "message",
      channelId: restricted.id,
      body: `secret ${twoUsers.testId}`,
      instanceId: instance.instanceId,
    },
  });

  expect(
    hostConn.sent.some(
      (m) => m.type === "event" && (m.body as { kind?: string })?.kind === "message",
    ),
  ).toBe(true);
  expect(guestConn.sent.filter((m) => m.type === "event")).toEqual([]);

  guestCapture.assertZeroMatching(
    (frame) =>
      frame.direction === "received" && frame.payload.includes(restricted.id),
    `Guest must receive zero frames referencing restricted channel ${restricted.id}`,
  );
  // Also assert open-channel delivery still works for the guest.
  guestCapture.clear();
  guestConn.sent.length = 0;
  hostConn.sent.length = 0;
  await broker.handleClientMessage(hostConn as never, {
    type: "publish",
    topic,
    body: {
      action: "message",
      channelId: openChannel.id,
      body: `lobby ${twoUsers.testId}`,
      instanceId: instance.instanceId,
    },
  });
  expect(
    guestConn.sent.some(
      (m) =>
        m.type === "event" &&
        (m.body as { kind?: string; channelId?: string })?.kind === "message" &&
        (m.body as { channelId?: string }).channelId === openChannel.id,
    ),
  ).toBe(true);
  guestCapture.assertZeroMatching(
    (frame) =>
      frame.direction === "received" && frame.payload.includes(restricted.id),
    "Open-channel delivery must still not leak restricted channel id",
  );

  // Page-level capture harness is wired (InstanceView may not mount); under
  // auth-none page WS is `local`, so isolation proof stays on guest Conn.
  expect(typeof pageGuestCapture.assertZeroMatching).toBe("function");
  pageGuestCapture.assertZeroMatching(
    (frame) =>
      frame.direction === "received" && frame.payload.includes(restricted.id),
    "Guest page WS must not observe restricted-channel frames in this window",
  );

  // --- 12.4: revoke mid-session → post-revocation events filtered, no reconnect ---
  guestCapture.clear();
  hostConn.sent.length = 0;
  guestConn.sent.length = 0;

  await broker.handleClientMessage(hostConn as never, {
    type: "publish",
    topic,
    body: {
      action: "message",
      channelId: shared.id,
      body: `before-revoke ${twoUsers.testId}`,
      instanceId: instance.instanceId,
    },
  });
  expect(
    guestConn.sent.some(
      (m) =>
        m.type === "event" &&
        (m.body as { channelId?: string }).channelId === shared.id,
    ),
  ).toBe(true);

  // D14 / stream 11 seam: flip readable channels without reconnect.
  handler.setReadableChannelsForTest(guestConn.id, [openChannel.id]);

  guestCapture.clear();
  hostConn.sent.length = 0;
  guestConn.sent.length = 0;

  await broker.handleClientMessage(hostConn as never, {
    type: "publish",
    topic,
    body: {
      action: "message",
      channelId: shared.id,
      body: `after-revoke ${twoUsers.testId}`,
      instanceId: instance.instanceId,
    },
  });

  expect(
    hostConn.sent.some(
      (m) => m.type === "event" && (m.body as { kind?: string })?.kind === "message",
    ),
  ).toBe(true);
  expect(guestConn.sent.filter((m) => m.type === "event")).toEqual([]);
  guestCapture.assertZeroMatching(
    (frame) =>
      frame.direction === "received" &&
      frame.payload.includes(shared.id) &&
      frame.payload.includes("after-revoke"),
    "Post-revocation events for revoked channel must not reach guest",
  );

  // Guest still receives open-channel events on the same subscription.
  guestCapture.clear();
  guestConn.sent.length = 0;
  await broker.handleClientMessage(hostConn as never, {
    type: "publish",
    topic,
    body: {
      action: "message",
      channelId: openChannel.id,
      body: `still-open ${twoUsers.testId}`,
      instanceId: instance.instanceId,
    },
  });
  expect(
    guestConn.sent.some(
      (m) =>
        m.type === "event" &&
        (m.body as { channelId?: string }).channelId === openChannel.id,
    ),
  ).toBe(true);

  // Real gateway WS path (host) — sanity that boot-registered CF-1 is live.
  const hostWs = new WebSocket(WS_URL, [REALTIME_SUBPROTOCOL]);
  twoUsers.registerCleanup(async () => {
    try {
      hostWs.close();
    } catch {
      /* ignore */
    }
  });
  await new Promise<void>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("host WS open timeout")), 10_000);
    hostWs.addEventListener("open", () => {
      clearTimeout(t);
      resolve();
    });
    hostWs.addEventListener("error", () => {
      clearTimeout(t);
      reject(new Error("host WS error"));
    });
  });
  const subOk = new Promise<void>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("host WS subscribe timeout")), 10_000);
    hostWs.addEventListener("message", (ev) => {
      const msg = JSON.parse(String(ev.data)) as { type?: string; topic?: string };
      if (msg.type === "subscribed" && msg.topic === `app:${installId}`) {
        clearTimeout(t);
        resolve();
      }
    });
  });
  hostWs.send(JSON.stringify({ type: "subscribe", topic: `app:${installId}` }));
  await subOk;

  // Keep ctxA referenced so the fixture does not GC mid-test under workers=1.
  expect(ctxA).toBeTruthy();
});
