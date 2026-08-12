/**
 * @doc E2E — Agent (vfs.write) merge with concurrent human typing — IW-9 Doc 11.2.
 *
 * Proves: a user has the document open and types in one region while a
 * `vfs.write` (agent-shaped, with `base` + `agentProfile`) edits another;
 * both edits survive and the session never shows reconnect/clobber
 * (PRD Goal 2).
 *
 * Stream 10 `document/fix-typos` is on main; this spec uses direct
 * `vfs.write` through the reconcile choke (same path agents.run → vfs.write
 * hits) to avoid LLM flake. See briefs/11-report.md.
 *
 * Auth-none: browser is `sub: "local"`. Invite facade seeds peer membership
 * for parity with Chat E2E (not required for single-browser merge).
 */
import { join } from "node:path";
import { tmpdir } from "node:os";
import { test, expect, type BrowserContext, type Page } from "./fixtures/two-users";

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

/** Trigger path: gateway vfs.write → reconcileOrPassThrough (not agents.run). */
const AGENT_PROFILE = "document/fix-typos";

type Json = Record<string, unknown>;

const BASE = [
  "# Title",
  "",
  "Paragraph one.",
  "",
  "Paragraph two with a typo.",
  "",
  "Paragraph three.",
  "",
  "Paragraph four.",
  "",
  "Paragraph five.",
  "",
].join("\n");

const FIXED = [
  "# Title",
  "",
  "Paragraph one.",
  "",
  "Paragraph two with a fix.",
  "",
  "Paragraph three.",
  "",
  "Paragraph four.",
  "",
  "Paragraph five.",
  "",
].join("\n");

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

async function vfsWrite(
  path: string,
  content: string,
  opts?: { base?: string; agentProfile?: string },
): Promise<Json> {
  const args: Record<string, unknown> = { path, content };
  if (opts?.base !== undefined) args["base"] = opts.base;
  if (opts?.agentProfile) args["agentProfile"] = opts.agentProfile;
  const { status, body } = await gatewayJson("/tools/vfs/write", {
    method: "POST",
    body: JSON.stringify({ args }),
  });
  if (status >= 400) {
    throw new Error(`vfs.write failed (${status}): ${JSON.stringify(body)}`);
  }
  return (body["data"] as Json) ?? body;
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
    "bob-merge@example.com",
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

test("@doc agent vfs.write merges with concurrent human typing", async ({
  twoUsers,
}) => {
  test.setTimeout(180_000);

  await seedMemberships();

  const path = `notes/e2e-merge-${twoUsers.testId.slice(0, 8)}.md`;
  await vfsWrite(path, BASE);

  // Single viewer — dual open races CollabMarkdownEditor seed vs server sync.
  await seedOpenDoc(twoUsers.userA.context, path);
  await twoUsers.userA.page.goto("./");
  // Fixture contract: touch peer context without joining the live doc.
  await twoUsers.userB.page.goto("./").catch(() => undefined);

  await waitForCollabEditor(twoUsers.userA.page);
  await normalizeEditor(twoUsers.userA.page, BASE);

  const page = twoUsers.userA.page;
  const editor = page.locator("[data-collab-markdown-editor] .cm-content");

  // Human types in paragraph 5 while agent will fix paragraph 2.
  await editor.click();
  const humanMarker = ` Human-${twoUsers.testId.slice(0, 8)}.`;
  await editor.getByText("Paragraph five.").first().click();
  await page.keyboard.press("End");
  await page.keyboard.type(humanMarker, { delay: 15 });

  await expect(editor).toContainText(humanMarker, { timeout: 15_000 });
  await expect(editor).toContainText("typo");
  await expect(page.getByTestId("doc-reconnecting")).toHaveCount(0);

  // Agent-shaped write against another region (stream 10 path via vfs.write).
  // Note: reconcile applies on the server live Y.Doc but does not publish a
  // sync frame to WS subscribers (stream 5 gap) — assert merge via quiesce
  // materialize + remount rather than live CM6 observation.
  const result = await vfsWrite(path, FIXED, {
    base: BASE,
    agentProfile: AGENT_PROFILE,
  });

  expect(result["reconciled"]).toBe(true);
  expect(result["conflict"]).toBeUndefined();
  expect(Number(result["appliedBlocks"] ?? 0)).toBeGreaterThanOrEqual(1);
  await expect(page.getByTestId("doc-reconnecting")).toHaveCount(0);
  await expect(page.getByTestId("doc-draft-banner")).toHaveCount(0);

  // Idle quiesce materializes the live doc (human + agent) to FS.
  await expect
    .poll(
      async () => {
        const { status, body } = await gatewayJson("/tools/vfs/read", {
          method: "POST",
          body: JSON.stringify({ args: { path } }),
        });
        if (status >= 400) return "";
        const data = (body["data"] as Json) ?? body;
        return String(data["content"] ?? "");
      },
      { timeout: 20_000, intervals: [500, 1000, 2000] },
    )
    .toEqual(expect.stringContaining("Paragraph two with a fix."));

  const { body: readBody } = await gatewayJson("/tools/vfs/read", {
    method: "POST",
    body: JSON.stringify({ args: { path } }),
  });
  const fsContent = String(
    ((readBody["data"] as Json) ?? readBody)["content"] ?? "",
  );
  expect(fsContent).toContain(humanMarker);
  expect(fsContent).not.toContain("typo");

  // Remount to load materialized merge into the editor (no live WS fan-out).
  await page.reload();
  await waitForCollabEditor(page);
  const editorAfter = page.locator("[data-collab-markdown-editor] .cm-content");
  await expect(editorAfter).toContainText("Paragraph two with a fix.", {
    timeout: 30_000,
  });
  await expect(editorAfter).toContainText(humanMarker);
  await expect(editorAfter).not.toContainText("typo");
  await expect(page.getByTestId("doc-reconnecting")).toHaveCount(0);
});
