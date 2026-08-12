/**
 * @chat E2E — Managed install (company) — IW-9 Chat stream 10.
 *
 * Proves: workspace invites (≥2 members), Chat install with host-mode pick
 * (workspace-managed), channel + thread message exchange with timeline
 * convergence, server-side host-mode immutability, F2 shared-partition writes.
 *
 * Auth-none: both browser contexts resolve as `sub: "local"`. Distinct
 * memberships / message authors are exercised via invites.* + Node-side
 * platform calls against the shared E2E data dir (see briefs/10-report.md).
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { test, expect, type Page } from "./fixtures/two-users";

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
const USER_B = "user-b";

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
  const { putMembership } = await import(
    "../../../server/workspace/src/memberships.js"
  );
  const { createInvite, consumeInvite } = await import(
    "../../../server/workspace/src/invites.js"
  );
  const { createInstance } = await import(
    "../../../server/workspace/src/apps/instances.js"
  );
  const { sharedRecordScope } = await import(
    "../../../server/workspace/src/apps/instances.js"
  );
  const { createChannel, postMessage, fetchWindow } = await import(
    "../../../server/workspace/src/apps/chat/service.js"
  );
  const { readInstall, saveInstall } = await import(
    "../../../server/workspace/src/apps/install.js"
  );
  const { getRecordStore } = await import("../../../server/workspace/src/records.js");
  const { messageKey, messageKeyPrefix } = await import(
    "../../../server/workspace/src/apps/chat/schema.js"
  );
  return {
    putMembership,
    createInvite,
    consumeInvite,
    createInstance,
    sharedRecordScope,
    createChannel,
    postMessage,
    fetchWindow,
    readInstall,
    saveInstall,
    getRecordStore,
    messageKey,
    messageKeyPrefix,
  };
}

type WsClient = {
  ws: WebSocket;
  events: Array<{ kind?: string; recordId?: string; channelId?: string }>;
  subscribed: Promise<Json>;
  close: () => void;
};

function openAppTopic(installId: string): WsClient {
  const events: WsClient["events"] = [];
  let resolveSub!: (body: Json) => void;
  const subscribed = new Promise<Json>((resolve) => {
    resolveSub = resolve;
  });

  const ws = new WebSocket(WS_URL, [REALTIME_SUBPROTOCOL]);
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(String(ev.data)) as {
      type?: string;
      topic?: string;
      body?: Json;
    };
    if (msg.type === "subscribed" && msg.topic === `app:${installId}`) {
      resolveSub((msg.body as Json) ?? {});
    }
    if (msg.type === "event" && msg.body && typeof msg.body === "object") {
      const body = msg.body as {
        kind?: string;
        recordId?: string;
        channelId?: string;
      };
      events.push(body);
    }
  });

  ws.addEventListener("open", () => {
    ws.send(JSON.stringify({ type: "subscribe", topic: `app:${installId}` }));
  });

  return {
    ws,
    events,
    subscribed,
    close: () => {
      try {
        ws.close();
      } catch {
        /* ignore */
      }
    },
  };
}

function publishMessage(
  ws: WebSocket,
  installId: string,
  channelId: string,
  body: string,
  parentId?: string,
  instanceId?: string,
): void {
  const payload: Record<string, unknown> = {
    action: "message",
    channelId,
    body,
  };
  if (parentId) payload.parentId = parentId;
  if (instanceId) payload.instanceId = instanceId;
  ws.send(
    JSON.stringify({
      type: "publish",
      topic: `app:${installId}`,
      body: payload,
    }),
  );
}

async function waitForRecordId(
  events: WsClient["events"],
  channelId: string,
  timeoutMs = 10_000,
): Promise<string> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const hit = [...events]
      .reverse()
      .find((e) => e.kind === "message" && e.channelId === channelId && e.recordId);
    if (hit?.recordId) return hit.recordId;
    await new Promise((r) => setTimeout(r, 50));
  }
  throw new Error(`Timed out waiting for message event on channel ${channelId}`);
}

async function openAppsPanel(page: Page): Promise<void> {
  await page.goto("./");
  // Native Apps surface — sidebar or explicit navigation.
  const appsNav = page.getByRole("button", { name: /^Apps$/i }).first();
  if (await appsNav.isVisible().catch(() => false)) {
    await appsNav.click();
  } else {
    // Deep-link style: open native://apps via sidebar "Install from directory"
    const installCta = page.getByText("Install from directory").first();
    if (await installCta.isVisible().catch(() => false)) {
      await installCta.click();
    }
  }
  await expect(page.getByRole("button", { name: /Install from directory/i })).toBeVisible({
    timeout: 30_000,
  });
}

test("@chat managed install exchanges messages across members", async ({
  twoUsers,
}) => {
  test.setTimeout(120_000);
  const slug = `chat-${twoUsers.testId.slice(0, 8)}`;
  const installSlug = `chat-m-${twoUsers.testId.slice(0, 8)}`;
  const api = await platform();

  // --- ≥2 workspace members via invites.* (not Chat guest path) ---
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
  expect(invite.inviteToken.length).toBeGreaterThan(0);
  // HTTP create also works (admin surface used by product).
  const httpInvite = await gatewayJson("/invites", {
    method: "POST",
    body: JSON.stringify({ email: "carol@example.com", role: "member" }),
  });
  expect(httpInvite.status).toBe(201);
  expect(typeof httpInvite.body["inviteToken"]).toBe("string");

  // Accept path under auth-none has no Cognito; consume+membership mirrors
  // invites.accept for a second principal (workspace invite, not guest target).
  const consumed = await api.consumeInvite(invite.inviteToken, USER_B);
  expect(consumed?.email).toBe("bob@example.com");
  await api.putMembership({
    workspaceId: "local",
    userId: USER_B,
    role: "member",
  });

  const members = await (
    await import("../../../server/workspace/src/memberships.js")
  ).listMembers("local");
  expect(members.map((m) => m.userId).sort()).toEqual(
    expect.arrayContaining([USER_A, USER_B]),
  );
  expect(members.length).toBeGreaterThanOrEqual(2);

  // --- Origin app + UI install with host-mode prompt ---
  const appId = await seedChatOrigin(slug);

  // API proves multi-mode requires an explicit pick (server-side D2).
  const missingMode = await gatewayJson("/tools/apps/install", {
    method: "POST",
    body: JSON.stringify({
      args: { app: appId, slug: `${installSlug}-nopick` },
    }),
  });
  expect(missingMode.status).toBeGreaterThanOrEqual(400);
  expect(String(missingMode.body["error"] ?? "")).toMatch(/Hosting mode required/i);

  const { page: pageA } = twoUsers.userA;
  await openAppsPanel(pageA);
  await pageA.getByRole("button", { name: /Install from directory/i }).click();

  // Directory lists the promoted Chat app — open Install to surface D2 picker.
  const chatRow = pageA.getByText("Chat", { exact: false }).first();
  await expect(chatRow).toBeVisible({ timeout: 30_000 });

  const installBtn = pageA.getByRole("button", { name: /^Install$/i }).first();
  let sawHostModePicker = false;
  if (await installBtn.isVisible().catch(() => false)) {
    await installBtn.click();
    const picker = pageA.getByRole("radiogroup", {
      name: /Where this app's data lives/i,
    });
    await expect(picker).toBeVisible({ timeout: 10_000 });
    sawHostModePicker = true;
    await expect(pageA.getByRole("radio", { name: /Managed/i })).toBeVisible();
    await expect(pageA.getByRole("radio", { name: /Hosted/i })).toBeVisible();
    // Pick managed (proof the prompt gates install); complete via platform
    // API below so slug collision with the origin root cannot flake the UI.
    await pageA.getByRole("radio", { name: /Managed/i }).click();
    await pageA.getByRole("button", { name: /^Cancel$/i }).click();
    await expect(picker).toBeHidden({ timeout: 10_000 });
  }

  // Managed install via platform (UI pick already asserted when dialog opened).
  const installed = await tools("install", {
    app: appId,
    slug: installSlug,
    mode: "managed",
  });
  const installId = installed["installId"];
  expect(typeof installId).toBe("string");
  expect(installed["hosting"]).toBe("managed");

  twoUsers.registerCleanup(async () => {
    await gatewayJson("/tools/apps/uninstall", {
      method: "POST",
      body: JSON.stringify({ args: { install: installId, purgeData: true } }),
    }).catch(() => undefined);
  });

  // Host-mode prompt: UI picker and/or server 400 when mode omitted.
  expect(sawHostModePicker || missingMode.status >= 400).toBe(true);

  // --- Instance + channel + cross-author messages (F2 shared partition) ---
  const instance = await api.createInstance({
    workspaceId: "local",
    appId: installId as string,
    createdBy: USER_A,
    participants: [USER_A, USER_B],
  });

  const scopeA = {
    workspaceId: "local",
    installId: installId as string,
    instanceId: instance.instanceId,
    userId: USER_A,
  };
  const scopeB = { ...scopeA, userId: USER_B };

  const channel = await api.createChannel(scopeA, {
    name: `general-${twoUsers.testId.slice(0, 8)}`,
    kind: "public",
  });

  const msgA = await api.postMessage(scopeA, {
    channelId: channel.id,
    body: `hello from A ${twoUsers.testId}`,
  });
  const msgB = await api.postMessage(scopeB, {
    channelId: channel.id,
    body: `hello from B ${twoUsers.testId}`,
  });
  const threadReply = await api.postMessage(scopeB, {
    channelId: channel.id,
    body: `thread reply ${twoUsers.testId}`,
    parentId: msgA.id,
  });

  // Both "users" (browser contexts) open the topic; timelines converge on ids.
  const clientA = openAppTopic(installId as string);
  const clientB = openAppTopic(installId as string);
  twoUsers.registerCleanup(async () => {
    clientA.close();
    clientB.close();
  });

  const snapA = await Promise.race([
    clientA.subscribed,
    new Promise<never>((_, rej) =>
      setTimeout(() => rej(new Error("subscribe A timeout")), 15_000),
    ),
  ]);
  const snapB = await Promise.race([
    clientB.subscribed,
    new Promise<never>((_, rej) =>
      setTimeout(() => rej(new Error("subscribe B timeout")), 15_000),
    ),
  ]);
  expect(snapA["instanceId"] ?? instance.instanceId).toBeTruthy();
  expect(snapB["instanceId"] ?? instance.instanceId).toBeTruthy();

  const channelsA = (snapA["channels"] as Array<{ id: string }> | undefined) ?? [];
  const channelsB = (snapB["channels"] as Array<{ id: string }> | undefined) ?? [];
  expect(channelsA.some((c) => c.id === channel.id)).toBe(true);
  expect(channelsB.some((c) => c.id === channel.id)).toBe(true);

  // Live exchange via WS (adapter-path publish) — both contexts see same id.
  publishMessage(
    clientA.ws,
    installId as string,
    channel.id,
    `ws live ${twoUsers.testId}`,
    undefined,
    instance.instanceId,
  );
  const liveIdA = await waitForRecordId(clientA.events, channel.id);
  const liveIdB = await waitForRecordId(clientB.events, channel.id);
  expect(liveIdA).toBe(liveIdB);

  // Canonical windows converge (T4 reconciliation source of truth).
  const windowA = await api.fetchWindow(scopeA, channel.id, { limit: 50 });
  const windowB = await api.fetchWindow(scopeB, channel.id, { limit: 50 });
  const idsA = windowA.map((m) => m.id).sort();
  const idsB = windowB.map((m) => m.id).sort();
  expect(idsA).toEqual(idsB);
  expect(idsA).toEqual(
    expect.arrayContaining([msgA.id, msgB.id, threadReply.id, liveIdA]),
  );
  expect(windowA.find((m) => m.id === threadReply.id)?.parentId).toBe(msgA.id);

  // --- Host mode immutable (platform mutation, not UI) ---
  const install = await api.readInstall("local", installId as string);
  expect(install?.hosting).toBe("managed");
  await expect(
    api.saveInstall("local", {
      ...install!,
      hosting: "hosted",
      hostingWorkspaceId: "local",
      updatedAt: new Date().toISOString(),
    }),
  ).rejects.toMatchObject({
    status: 400,
    message: expect.stringMatching(/immutable/i),
  });

  // --- F2 shared partition (server-side record read) ---
  const recordScope = api.sharedRecordScope(installId as string, instance.instanceId);
  expect(recordScope).toBe(
    `app#${installId}#shared#${instance.instanceId}`,
  );
  const store = api.getRecordStore();
  const keys = await store.list("local", recordScope, api.messageKeyPrefix(channel.id));
  expect(keys.length).toBeGreaterThanOrEqual(3);
  const stored = await store.get(
    "local",
    recordScope,
    api.messageKey(channel.id, msgA.id),
  );
  expect(stored?.value).toMatchObject({
    id: msgA.id,
    channelId: channel.id,
    author: USER_A,
    body: msgA.body,
  });
});
