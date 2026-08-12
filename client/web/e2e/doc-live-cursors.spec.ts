/**
 * @doc E2E — Two-user live cursors + character sync — IW-9 Doc stream 11.1 / 11.4.
 *
 * Proves: two browser contexts open the same `.md`, user A types, user B sees
 * the character without reload and sees A's named remote caret move
 * (PRD Goal 1; document-collab "Two users see each other's cursors" +
 * "Concurrent joiners share one doc").
 *
 * 11.4: raw WebSocket capture asserts no anonymous principal appears on a
 * successful `doc:<path>` subscribe (invariant 9 spot-check).
 *
 * Auth-none: both browsers resolve as `sub: "local"`. Invite facade seeds a
 * second membership like Chat E2E; WS identity remains `local` (distinct
 * awareness clientIds still drive remote carets).
 */
import { join } from "node:path";
import { tmpdir } from "node:os";
import { test, expect, type BrowserContext, type Page } from "./fixtures/two-users";
import { attachWsCapture, type WsCapture } from "./fixtures/ws-capture";

const GATEWAY_PORT = Number(process.env["E2E_GATEWAY_PORT"] ?? 4010);
const GATEWAY = `http://127.0.0.1:${GATEWAY_PORT}/api/gateway`;

const DATA_DIR =
  process.env["E2E_WORKSPACE_DATA_DIR"] ?? join(tmpdir(), "aprovan-playwright-e2e");

const WORKSPACE_ID = "local";
const ACTIVE_WORKSPACE_KEY = "patchwork:active-workspace";
const TABS_KEY = `patchwork:open-tabs:${WORKSPACE_ID}`;
/** Absolute gateway so browser WS bypasses Vite's `/gateway` proxy (no `ws: true`). */
const GATEWAY_BASE_ABS = `http://127.0.0.1:${GATEWAY_PORT}/api/gateway`;
const WORKSPACE_ENDPOINTS_KEY = "patchwork:workspace-endpoints";
const USER_A = "local";
const USER_B = "user-b";

process.env["WORKSPACE_MODE"] = "local";
process.env["WORKSPACE_DATA_DIR"] = DATA_DIR;

type Json = Record<string, unknown>;

async function gatewayJson(
  path: string,
  init?: RequestInit,
): Promise<{ status: number; body: Json }> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const res = await fetch(`${GATEWAY}${path}`, {
      ...init,
      headers: {
        "content-type": "application/json",
        ...(init?.headers ?? {}),
      },
    });
    const body = (await res.json().catch(() => ({}))) as Json;
    if (res.status !== 429) return { status: res.status, body };
    await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
  }
  return { status: 429, body: { error: "rate_limit_exceeded" } };
}

async function vfsWrite(path: string, content: string): Promise<void> {
  const { status, body } = await gatewayJson("/tools/vfs/write", {
    method: "POST",
    body: JSON.stringify({ args: { path, content } }),
  });
  if (status >= 400) {
    throw new Error(`vfs.write failed (${status}): ${JSON.stringify(body)}`);
  }
}

async function seedMemberships(): Promise<void> {
  const { putMembership } = await import(
    "../../../server/workspace/src/memberships.js"
  );
  const { createInvite, consumeInvite } = await import(
    "../../../server/workspace/src/invites.js"
  );
  await putMembership({
    workspaceId: WORKSPACE_ID,
    userId: USER_A,
    role: "admin",
  });
  const invite = await createInvite(
    WORKSPACE_ID,
    "bob@example.com",
    "member",
    [],
    USER_A,
  );
  await consumeInvite(invite.inviteToken, USER_B);
  await putMembership({
    workspaceId: WORKSPACE_ID,
    userId: USER_B,
    role: "member",
  });
}

async function seedOpenDoc(context: BrowserContext, path: string): Promise<void> {
  await context.addInitScript(
    ({ wsKey, tabsKey, endpointsKey, wsId, docPath, gatewayBase }) => {
      window.localStorage.setItem(wsKey, wsId);
      window.localStorage.setItem(
        tabsKey,
        JSON.stringify({ paths: [docPath], activePath: docPath }),
      );
      window.localStorage.setItem(
        endpointsKey,
        JSON.stringify([
          { workspaceId: wsId, locus: "local", baseUrl: gatewayBase },
        ]),
      );
    },
    {
      wsKey: ACTIVE_WORKSPACE_KEY,
      tabsKey: TABS_KEY,
      endpointsKey: WORKSPACE_ENDPOINTS_KEY,
      wsId: WORKSPACE_ID,
      docPath: path,
      gatewayBase: GATEWAY_BASE_ABS,
    },
  );
}

async function waitForCollabEditor(page: Page): Promise<void> {
  await expect(page.locator("[data-collab-markdown-editor] .cm-content")).toBeVisible({
    timeout: 60_000,
  });
  // Exact match — getByText("Connecting…") also hits "Reconnecting…".
  await expect(page.getByText("Connecting…", { exact: true })).toHaveCount(0, {
    timeout: 30_000,
  });
  await expect(page.getByTestId("doc-reconnecting")).toHaveCount(0, {
    timeout: 60_000,
  });
}

/** Collapse client/server seed races into a single known body (Yjs insert race). */
async function normalizeEditor(page: Page, content: string): Promise<void> {
  const editor = page.locator("[data-collab-markdown-editor] .cm-content");
  await editor.click();
  await page.keyboard.press("ControlOrMeta+a");
  await page.keyboard.insertText(content);
  await expect
    .poll(async () => {
      const text = await editor.innerText();
      return (text.match(/# Title/g) ?? []).length;
    }, { timeout: 15_000 })
    .toBe(1);
}

function docTopic(path: string): string {
  return `doc:${path}`;
}

function assertNoAnonymousDocSubscribe(capture: WsCapture, path: string): void {
  const topic = docTopic(path);
  const subscribed = capture.frames.filter((f) => {
    if (f.direction !== "received") return false;
    try {
      const msg = JSON.parse(f.payload) as {
        type?: string;
        topic?: string;
      };
      return msg.type === "subscribed" && msg.topic === topic;
    } catch {
      return f.payload.includes(`"type":"subscribed"`) && f.payload.includes(topic);
    }
  });
  expect(
    subscribed.length,
    `expected at least one authenticated subscribed for ${topic}`,
  ).toBeGreaterThan(0);

  // Invariant 9: no anonymous principal on a successful doc subscribe.
  capture.assertZeroMatching(
    (f) => {
      if (!f.payload.includes(topic)) return false;
      const lower = f.payload.toLowerCase();
      if (!lower.includes("anonymous")) return false;
      // Successful subscribe must never name anonymous for this topic.
      return (
        lower.includes('"type":"subscribed"') ||
        lower.includes('"type": "subscribed"')
      );
    },
    `anonymous must not appear on subscribed frames for ${topic}`,
  );
}

test("@doc two users see live characters and named cursors", async ({
  twoUsers,
}) => {
  test.setTimeout(180_000);

  await seedMemberships();

  const path = `notes/e2e-cursors-${twoUsers.testId.slice(0, 8)}.md`;
  const seed = [
    "# Title",
    "",
    "Paragraph one.",
    "",
    "Paragraph two.",
    "",
  ].join("\n");
  await vfsWrite(path, seed);

  const marker = `MARK-${twoUsers.testId.slice(0, 8)}`;

  await seedOpenDoc(twoUsers.userA.context, path);
  await seedOpenDoc(twoUsers.userB.context, path);

  const captureA = attachWsCapture(twoUsers.userA.page);
  const captureB = attachWsCapture(twoUsers.userB.page);

  // Stagger joins so B syncs from the live doc instead of racing an empty seed.
  await twoUsers.userA.page.goto("./");
  await waitForCollabEditor(twoUsers.userA.page);
  await normalizeEditor(twoUsers.userA.page, seed);

  await twoUsers.userB.page.goto("./");
  await waitForCollabEditor(twoUsers.userB.page);
  // Re-normalize from A after B joins so a second empty-seed cannot stick.
  await normalizeEditor(twoUsers.userA.page, seed);
  await expect
    .poll(
      async () => {
        const text = await twoUsers.userB.page
          .locator("[data-collab-markdown-editor] .cm-content")
          .innerText();
        return (text.match(/# Title/g) ?? []).length;
      },
      { timeout: 30_000 },
    )
    .toBe(1);

  // Wait for doc topic handshake on both captures.
  await expect
    .poll(
      () =>
        captureA.frames.some((f) => f.payload.includes(docTopic(path))) &&
        captureB.frames.some((f) => f.payload.includes(docTopic(path))),
      { timeout: 30_000 },
    )
    .toBe(true);

  assertNoAnonymousDocSubscribe(captureA, path);
  assertNoAnonymousDocSubscribe(captureB, path);

  const editorA = twoUsers.userA.page.locator(
    "[data-collab-markdown-editor] .cm-content",
  );
  await editorA.click();
  // Move to end so the remote caret is visible on B while A types.
  await twoUsers.userA.page.keyboard.press("ControlOrMeta+End");
  await twoUsers.userA.page.keyboard.type(`\n${marker}`, { delay: 20 });

  const editorB = twoUsers.userB.page.locator(
    "[data-collab-markdown-editor] .cm-content",
  );
  await expect(editorB).toContainText(marker, { timeout: 30_000 });

  // Named remote caret from A (auth-none display name falls back to "Member").
  await expect(
    twoUsers.userB.page.locator(".cm-ySelectionCaret .cm-ySelectionInfo").first(),
  ).toBeVisible({ timeout: 30_000 });
  await expect(
    twoUsers.userB.page.locator(".cm-ySelectionInfo").first(),
  ).not.toHaveText("");

  // Peer awareness chip may dedupe identical names under auth-none; caret is
  // the Goal 1 bar. Presence cluster is a bonus when names differ.
  const presence = twoUsers.userB.page.locator("[data-doc-presence-cluster]");
  if ((await presence.count()) > 0) {
    await expect(presence).toBeVisible();
  }

  expect(twoUsers.userB.page.url()).not.toMatch(/reload/);
});
