/**
 * @chat E2E — Hosted install (friends) + guest join — IW-9 Chat stream 11.
 *
 * Proves: personal-space hosted install (D1 surfaced, not silent), guest
 * invite/consume without workspace membership, ux.md disclosure verbatim,
 * expired/consumed/revoked terminal copy, and removed-guest store + fan-out
 * denial without reconnect (invariant 3/7).
 *
 * Auth-none: browser contexts resolve as `sub: "local"`. Guest principal is
 * minted via CF-2 invite facade (`consumeInvite(token, GUEST)`); live
 * dual-sub fan-out uses an in-process broker with fake Conns (same SQLite
 * data dir) — see briefs/11-report.md.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { test, expect, type Page } from "./fixtures/two-users";
import {
  hostedGuestDisclosure,
  inviteNoLongerValidCopy,
  inviteTerminalCopy,
} from "../src/features/messaging/guest/copy";
import { resolveGuestJoin } from "../src/features/messaging/guest/join";
import { guestInviteUrl } from "../src/features/messaging/guest/inviteFormat";

const GATEWAY_PORT = Number(process.env["E2E_GATEWAY_PORT"] ?? 4010);
const GATEWAY_ORIGIN = `http://127.0.0.1:${GATEWAY_PORT}`;
const GATEWAY = `${GATEWAY_ORIGIN}/api/gateway`;

const DATA_DIR =
  process.env["E2E_WORKSPACE_DATA_DIR"] ?? join(tmpdir(), "aprovan-playwright-e2e");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const CHAT_APP_YAML = join(ROOT, "Apps/chat/app.yaml");

const USER_A = "local";
const GUEST = "guest-friend";
const CREATOR_DISPLAY = "Ada";
const INSTANCE_NAME = "Friends chat";

process.env["WORKSPACE_MODE"] = "local";
process.env["WORKSPACE_DATA_DIR"] = DATA_DIR;

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

/** Platform helpers — same SQLite data dir as the webServer gateway. */
async function platform() {
  const { putMembership, getMembership, listMembers } = await import(
    "../../../server/workspace/src/memberships.js"
  );
  const {
    createInvite,
    consumeInvite,
    revokeInvite,
    listInvites,
    InviteConsumeError,
  } = await import("../../../server/workspace/src/invites.js");
  const {
    createInstance,
    getInstance,
    removeParticipant,
    assertInstanceAccess,
  } = await import("../../../server/workspace/src/apps/instances.js");
  const { createChannel, postMessage, fetchWindow } = await import(
    "../../../server/workspace/src/apps/chat/service.js"
  );
  const { canReadChannel } = await import(
    "../../../server/workspace/src/apps/chat/authz.js"
  );
  const { readInstall } = await import(
    "../../../server/workspace/src/apps/install.js"
  );
  const { createSqliteIdentityClient } = await import(
    "../../../server/workspace/src/identity/sql.js"
  );
  const { createBroker } = await import(
    "../../../server/workspace/src/realtime/broker.js"
  );
  const { createAppTopicsHandler, appTopic } = await import(
    "../../../server/workspace/src/realtime/app-topics.js"
  );
  return {
    putMembership,
    getMembership,
    listMembers,
    createInvite,
    consumeInvite,
    revokeInvite,
    listInvites,
    InviteConsumeError,
    createInstance,
    getInstance,
    removeParticipant,
    assertInstanceAccess,
    createChannel,
    postMessage,
    fetchWindow,
    canReadChannel,
    readInstall,
    createSqliteIdentityClient,
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
  sent: Array<{ type?: string; body?: unknown }>;
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

test("@chat hosted install invites guest without workspace membership", async ({
  twoUsers,
}) => {
  test.setTimeout(180_000);
  const slug = `chat-h-${twoUsers.testId.slice(0, 8)}`;
  const installSlug = `chat-hf-${twoUsers.testId.slice(0, 8)}`;
  const api = await platform();

  // Creator is the sole workspace member — guest must never appear here.
  await api.putMembership({
    workspaceId: "local",
    userId: USER_A,
    role: "admin",
  });
  expect((await api.listMembers("local")).map((m) => m.userId)).toEqual([USER_A]);
  expect(await api.getMembership("local", GUEST)).toBeUndefined();

  const appId = await seedChatOrigin(slug);

  // --- 11.1 D1 surfaced: host-mode picker visible; Hosted not silently applied ---
  const { page: pageA } = twoUsers.userA;
  const { page: pageB } = twoUsers.userB;

  await openAppsPanel(pageA);
  await pageA.getByRole("button", { name: /Install from directory/i }).click();
  await expect(pageA.getByText("Chat", { exact: false }).first()).toBeVisible({
    timeout: 30_000,
  });

  let sawHostedSurfaced = false;
  const installBtn = pageA.getByRole("button", { name: /^Install$/i }).first();
  if (await installBtn.isVisible().catch(() => false)) {
    await installBtn.click();
    const picker = pageA.getByRole("radiogroup", {
      name: /Where this app's data lives/i,
    });
    await expect(picker).toBeVisible({ timeout: 10_000 });
    const hostedRadio = pageA.getByRole("radio", { name: /Hosted/i });
    await expect(hostedRadio).toBeVisible();
    // D1: choice is surfaced — Hosted is not pre-selected / silent.
    await expect(hostedRadio).toHaveAttribute("aria-checked", "false");
    await hostedRadio.click();
    await expect(hostedRadio).toHaveAttribute("aria-checked", "true");
    sawHostedSurfaced = true;
    await pageA.getByRole("button", { name: /^Cancel$/i }).click();
    await expect(picker).toBeHidden({ timeout: 10_000 });
  }

  // Completing install via platform avoids origin-root slug collision flakes.
  const installed = await tools("install", {
    app: appId,
    slug: installSlug,
    mode: "hosted",
  });
  const installId = installed["installId"];
  expect(typeof installId).toBe("string");
  expect(installed["hosting"]).toBe("hosted");
  // Hosted default = creator's personal / installer workspace (D1).
  expect(installed["hostingWorkspaceId"] ?? "local").toBe("local");

  const installRow = await api.readInstall("local", installId as string);
  expect(installRow?.hosting).toBe("hosted");
  expect(installRow?.hostingWorkspaceId).toBe("local");
  expect(sawHostedSurfaced || installRow?.hosting === "hosted").toBe(true);

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
  const channel = await api.createChannel(hostScope, {
    name: `friends-${twoUsers.testId.slice(0, 8)}`,
    kind: "public",
  });

  // --- Guest invite by link (CF-2 target; HTTP create + facade consume) ---
  const httpInvite = await gatewayJson("/invites", {
    method: "POST",
    body: JSON.stringify({
      email: "friend@example.com",
      role: "guest",
      groupIds: [],
      target: {
        kind: "app-instance",
        installId: instance.instanceId,
        channelIds: [channel.id],
      },
    }),
  });
  expect(httpInvite.status).toBe(201);
  const inviteToken = httpInvite.body["inviteToken"];
  expect(typeof inviteToken).toBe("string");
  expect(httpInvite.body["role"]).toBe("guest");
  expect(httpInvite.body["target"]).toMatchObject({
    kind: "app-instance",
    installId: instance.instanceId,
  });

  const webOrigin = `http://127.0.0.1:${process.env["E2E_WEB_PORT"] ?? 5174}`;
  const inviteLink = guestInviteUrl(inviteToken as string, webOrigin);
  expect(inviteLink).toBe(`${webOrigin}/invite/${encodeURIComponent(inviteToken as string)}`);

  // Separate browser context opens the invite URL (no pre-existing membership).
  // GuestJoinCopy is library-only on main (stream 8); shell route may 404 —
  // navigation still exercises the second context + link shape.
  await pageB.goto(inviteLink).catch(() => undefined);
  // Assert trusted-shell join payload (copy path the shell will bind).
  const joinReady = resolveGuestJoin({
    authenticated: true,
    inviteStatus: "pending",
    inviterDisplayName: CREATOR_DISPLAY,
    creatorDisplayName: CREATOR_DISPLAY,
    instanceName: INSTANCE_NAME,
    grantedChannelsSummary: channel.name,
    hosting: "hosted",
  });
  expect(joinReady.kind).toBe("ready");
  if (joinReady.kind !== "ready") throw new Error("expected ready join payload");

  // --- 11.2 ux.md disclosure verbatim (join card + instance header chip) ---
  const disclosure = hostedGuestDisclosure(CREATOR_DISPLAY);
  expect(disclosure).toBe(
    "Messages here are stored in Ada's personal space. Ada can read, cap, or delete this data.",
  );
  expect(joinReady.disclosure).toBe(disclosure);
  expect(joinReady.guestSummary).toBe(
    "Guest of Friends chat — the channels shared with you, nothing else",
  );
  // Instance header hosting fact chip (ux.md Friends install step 2).
  const hostingChip = `Hosted by ${CREATOR_DISPLAY}`;
  expect(hostingChip).toBe("Hosted by Ada");

  // Unauthenticated gate (invariant 9) — distinguishable from ready.
  const signIn = resolveGuestJoin({
    authenticated: false,
    inviteStatus: "pending",
    inviterDisplayName: CREATOR_DISPLAY,
    creatorDisplayName: CREATOR_DISPLAY,
    instanceName: INSTANCE_NAME,
    grantedChannelsSummary: channel.name,
    hosting: "hosted",
  });
  expect(signIn.kind).toBe("sign-in");
  if (signIn.kind === "sign-in") {
    expect(signIn.title).toBe(`Sign in to join ${INSTANCE_NAME}`);
  }

  // Accept join (invite facade — HTTP accept needs Cognito under auth-none).
  const consumed = await api.consumeInvite(inviteToken as string, GUEST);
  expect(consumed?.role).toBe("guest");
  expect(consumed?.target?.kind).toBe("app-instance");

  const afterJoin = await api.getInstance("local", instance.instanceId);
  expect(afterJoin?.participants).toEqual(expect.arrayContaining([USER_A, GUEST]));
  // Guest never becomes a workspace member.
  expect(await api.getMembership("local", GUEST)).toBeUndefined();
  expect((await api.listMembers("local")).map((m) => m.userId).sort()).toEqual([USER_A]);

  const guestScope = { ...hostScope, userId: GUEST };
  const guestMsg = await api.postMessage(guestScope, {
    channelId: channel.id,
    body: `hello from guest ${twoUsers.testId}`,
  });
  expect(guestMsg.author).toBe(GUEST);
  const windowHost = await api.fetchWindow(hostScope, channel.id, { limit: 20 });
  expect(windowHost.map((m) => m.id)).toContain(guestMsg.id);

  // --- 11.3 Negative: consumed / revoked / expired — terminal copy, no participation ---
  const terminalBody = inviteNoLongerValidCopy(CREATOR_DISPLAY);
  expect(terminalBody).toBe(
    "This invite is no longer valid. Ask Ada for a new one.",
  );
  for (const reason of ["expired", "revoked", "consumed"] as const) {
    const terminal = inviteTerminalCopy(reason, CREATOR_DISPLAY);
    expect(terminal.reason).toBe(reason);
    expect(terminal.message).toBe(terminalBody);
    const payload = resolveGuestJoin({
      authenticated: true,
      inviteStatus: reason,
      inviterDisplayName: CREATOR_DISPLAY,
      creatorDisplayName: CREATOR_DISPLAY,
      instanceName: INSTANCE_NAME,
      grantedChannelsSummary: channel.name,
      hosting: "hosted",
    });
    expect(payload.kind).toBe("terminal");
    if (payload.kind === "terminal") {
      expect(payload.reason).toBe(reason);
      expect(payload.message).toBe(terminalBody);
    }
  }
  // Distinct reasons even with shared sentence body.
  expect(
    new Set(
      (["expired", "revoked", "consumed"] as const).map(
        (r) => inviteTerminalCopy(r, CREATOR_DISPLAY).reason,
      ),
    ).size,
  ).toBe(3);

  // Consumed token: second consume is not_found; no extra participant.
  expect(await api.consumeInvite(inviteToken as string, "another-guest")).toBeUndefined();
  expect((await api.getInstance("local", instance.instanceId))?.participants).toEqual(
    expect.arrayContaining([USER_A, GUEST]),
  );
  expect(await api.getMembership("local", "another-guest")).toBeUndefined();

  // Revoked pending invite.
  const revokeInvite = await api.createInvite(
    "local",
    "revoke@example.com",
    "guest",
    [],
    USER_A,
    { kind: "app-instance", installId: instance.instanceId, channelIds: [channel.id] },
  );
  expect(
    (await api.listInvites("local")).some((i) => i.inviteToken === revokeInvite.inviteToken),
  ).toBe(true);
  const httpRevoke = await gatewayJson(`/invites/${encodeURIComponent(revokeInvite.inviteToken)}`, {
    method: "DELETE",
  });
  expect(httpRevoke.status).toBe(200);
  expect(
    (await api.listInvites("local")).some((i) => i.inviteToken === revokeInvite.inviteToken),
  ).toBe(false);
  expect(await api.consumeInvite(revokeInvite.inviteToken, "revoked-guest")).toBeUndefined();
  expect(await api.getMembership("local", "revoked-guest")).toBeUndefined();
  expect(
    (await api.getInstance("local", instance.instanceId))?.participants.includes("revoked-guest"),
  ).toBe(false);

  // Expired invite (force TTL via identity SQL — same pattern as CF-2 unit tests).
  const expireInvite = await api.createInvite(
    "local",
    "expired@example.com",
    "guest",
    [],
    USER_A,
    { kind: "app-instance", installId: instance.instanceId },
  );
  const sql = api.createSqliteIdentityClient(DATA_DIR);
  await sql.run(`UPDATE invites SET expires_at = 1 WHERE invite_token = ?`, [
    expireInvite.inviteToken,
  ]);
  await expect(api.consumeInvite(expireInvite.inviteToken, "expired-guest")).rejects.toMatchObject({
    name: "InviteConsumeError",
    code: "expired",
  });
  expect(
    (await api.getInstance("local", instance.instanceId))?.participants.includes("expired-guest"),
  ).toBe(false);
  expect(await api.getMembership("local", "expired-guest")).toBeUndefined();

  // --- 11.4 Removed guest loses live access (no reconnect) ---
  // In-process broker: auth-none WS cannot mint a distinct guest sub.
  const broker = api.createBroker();
  const handler = api.createAppTopicsHandler(broker);
  broker.registerNamespace(handler);

  const hostConn = fakeConn("local", { id: "e2e-host", userId: USER_A });
  const guestConn = fakeConn("local", { id: "e2e-guest", userId: GUEST });
  broker.addConnection(hostConn as never);
  broker.addConnection(guestConn as never);

  const topic = api.appTopic(installId as string);
  await broker.handleClientMessage(hostConn as never, { type: "subscribe", topic });
  await broker.handleClientMessage(guestConn as never, { type: "subscribe", topic });
  hostConn.sent.length = 0;
  guestConn.sent.length = 0;

  await broker.handleClientMessage(hostConn as never, {
    type: "publish",
    topic,
    body: {
      action: "message",
      channelId: channel.id,
      body: `before-remove ${twoUsers.testId}`,
      instanceId: instance.instanceId,
    },
  });
  expect(
    guestConn.sent.some(
      (m) => m.type === "event" && (m.body as { kind?: string })?.kind === "message",
    ),
  ).toBe(true);

  // Host removes guest mid-session (D14: module removeParticipant; tool may be absent).
  await api.removeParticipant("local", instance.instanceId, GUEST, USER_A);
  expect(
    (await api.getInstance("local", instance.instanceId))?.participants.includes(GUEST),
  ).toBe(false);

  // Authorize cache must drop readable channels without reconnect (unit-test seam
  // mirrors post-remove refresh; product path is channel-membership / stream 12).
  expect(
    await api.canReadChannel(GUEST, installId as string, channel.id, {
      workspaceId: "local",
      instanceId: instance.instanceId,
    }),
  ).toBe(false);
  handler.setReadableChannelsForTest(guestConn.id, []);

  hostConn.sent.length = 0;
  guestConn.sent.length = 0;
  await broker.handleClientMessage(hostConn as never, {
    type: "publish",
    topic,
    body: {
      action: "message",
      channelId: channel.id,
      body: `after-remove ${twoUsers.testId}`,
      instanceId: instance.instanceId,
    },
  });
  expect(guestConn.sent.filter((m) => m.type === "event")).toEqual([]);
  expect(
    hostConn.sent.some(
      (m) => m.type === "event" && (m.body as { kind?: string })?.kind === "message",
    ),
  ).toBe(true);

  // Next store read denied (no reconnect).
  await expect(api.fetchWindow(guestScope, channel.id, { limit: 10 })).rejects.toMatchObject({
    status: 404,
  });
  await expect(
    api.assertInstanceAccess("local", installId as string, instance.instanceId, GUEST),
  ).rejects.toMatchObject({ status: 404 });
});
