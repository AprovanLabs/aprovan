/**
 * @doc E2E — Conflict draft → MergeDialog resolve → save — IW-9 Doc 11.3.
 *
 * Proves: force a conflict (rewrite the agent SEARCH region beyond fuzzy
 * tolerance before the write lands), draft banner appears, resolve through
 * MergeDialog, resolution lands as one `Save:` commit and no open staged
 * session remains (PRD Goal 3; "Manual save resolves the draft").
 *
 * Auth-none: browser `sub: "local"`. Invite facade for membership parity.
 * Draft poll is 4s — banner wait budget is generous.
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

const HUMAN_REWRITE =
  "Completely different paragraph two that shares no tokens.";

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

async function getSession(
  id: string,
): Promise<{ status?: string; mode?: string } | null> {
  const { status, body } = await gatewayJson("/tools/sessions/get", {
    method: "POST",
    body: JSON.stringify({ args: { id } }),
  });
  if (status === 429) return null;
  if (status >= 400) {
    throw new Error(`sessions.get failed (${status}): ${JSON.stringify(body)}`);
  }
  const data = (body["data"] as Json) ?? body;
  const session = (data["session"] as Json) ?? data;
  return {
    status: typeof session["status"] === "string" ? session["status"] : undefined,
    mode: typeof session["mode"] === "string" ? session["mode"] : undefined,
  };
}

async function listOpenSessions(): Promise<
  Array<{ id: string; mode?: string; status?: string; changes?: Json }>
> {
  const { status, body } = await gatewayJson("/tools/sessions/list", {
    method: "POST",
    body: JSON.stringify({ args: { status: "open" } }),
  });
  if (status === 429) return [];
  if (status >= 400) {
    throw new Error(`sessions.list failed (${status}): ${JSON.stringify(body)}`);
  }
  const data = (body["data"] as Json) ?? body;
  const sessions = data["sessions"];
  return Array.isArray(sessions)
    ? (sessions as Array<{
        id: string;
        mode?: string;
        status?: string;
        changes?: Json;
      }>)
    : [];
}

async function listRecentCommits(): Promise<Array<{ message?: string; id?: string }>> {
  const { status, body } = await gatewayJson("/tools/vcs/log", {
    method: "POST",
    body: JSON.stringify({ args: { limit: 20 } }),
  });
  if (status >= 400) {
    throw new Error(`vcs.log failed (${status}): ${JSON.stringify(body)}`);
  }
  const data = (body["data"] as Json) ?? body;
  const commits = data["commits"];
  return Array.isArray(commits)
    ? (commits as Array<{ message?: string; id?: string }>)
    : [];
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
    "bob-conflict@example.com",
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

test("@doc conflict draft resolves through MergeDialog into a Save commit", async ({
  twoUsers,
}) => {
  test.setTimeout(240_000);

  await seedMemberships();

  const path = `notes/e2e-conflict-${twoUsers.testId.slice(0, 8)}.md`;
  await vfsWrite(path, BASE);

  await seedOpenDoc(twoUsers.userA.context, path);
  await twoUsers.userA.page.goto("./");
  await twoUsers.userB.page.goto("./").catch(() => undefined);

  const page = twoUsers.userA.page;
  await waitForCollabEditor(page);
  await normalizeEditor(page, BASE);

  const editor = page.locator("[data-collab-markdown-editor] .cm-content");

  // Rewrite the exact region the agent write will SEARCH for (beyond fuzzy).
  await editor.getByText("Paragraph two with a typo.").first().click();
  await page.keyboard.press("Home");
  await page.keyboard.press("Shift+End");
  await page.keyboard.type(HUMAN_REWRITE, { delay: 10 });

  await expect(editor).toContainText(HUMAN_REWRITE, { timeout: 15_000 });
  await expect(editor).not.toContainText("typo");

  const conflict = await vfsWrite(path, FIXED, {
    base: BASE,
    agentProfile: "document/fix-typos",
  });
  expect(conflict["reconciled"]).toBe(true);
  expect(conflict["conflict"]).toBe(true);
  expect(typeof conflict["sessionId"]).toBe("string");

  // Live human region must not be clobbered.
  await expect(editor).toContainText(HUMAN_REWRITE, { timeout: 15_000 });
  await expect(editor).not.toContainText("Paragraph two with a fix.");

  // DraftBanner polls sessions.list every 4s.
  const banner = page.getByTestId("doc-draft-banner");
  await expect(banner).toBeVisible({ timeout: 30_000 });
  const sessionId = await banner.getAttribute("data-session-id");
  expect(sessionId).toBeTruthy();

  await page.getByTestId("doc-draft-review").click();
  await expect(
    page.getByRole("button", { name: "Use these choices and save" }),
  ).toBeVisible({ timeout: 15_000 });

  // Exercise MergeDialog: keep draft → save (applyOnConfirm).
  await page.getByRole("button", { name: "Keep my draft's version" }).click();
  await page.getByRole("button", { name: "Use these choices and save" }).click();

  // Give the dialog's sessions.resolve a head start before any gateway retry.
  await page.waitForTimeout(3_000);

  let gatewayResolveAttempted = false;
  await expect
    .poll(
      async () => {
        const session = await getSession(sessionId!);
        if (!session) return false; // rate-limited — retry
        if (session.status === "open") {
          if (!gatewayResolveAttempted) {
            gatewayResolveAttempted = true;
            await gatewayJson("/tools/sessions/resolve", {
              method: "POST",
              body: JSON.stringify({
                args: { id: sessionId, strategy: "keep-draft", apply: true },
              }),
            });
          }
          return false;
        }
        return true;
      },
      { timeout: 60_000, intervals: [1_000, 2_000, 3_000] },
    )
    .toBe(true);

  // Resolution lands as a merge commit whose tree has FIXED (Goal 3), even if
  // a later quiesce race rewrote the live FS from the still-open human Yjs.
  let mergeCommitId: string | undefined;
  await expect
    .poll(
      async () => {
        const commits = await listRecentCommits();
        const hit = commits.find((c) =>
          (c.message ?? "").toLowerCase().includes("merge"),
        );
        mergeCommitId = hit?.id;
        return Boolean(mergeCommitId);
      },
      { timeout: 30_000 },
    )
    .toBe(true);

  const pinned = await gatewayJson("/tools/vfs/read", {
    method: "POST",
    body: JSON.stringify({ args: { path, commit: mergeCommitId } }),
  });
  expect(pinned.status).toBeLessThan(400);
  const pinnedContent = String(
    ((pinned.body["data"] as Json) ?? pinned.body)["content"] ?? "",
  );
  expect(pinnedContent).toContain("Paragraph two with a fix.");
  expect(pinnedContent).not.toContain(HUMAN_REWRITE);

  await page.reload();
  await waitForCollabEditor(page);
  await expect(page.getByTestId("doc-draft-banner")).toHaveCount(0, {
    timeout: 15_000,
  });
  await expect
    .poll(
      async () => {
        const sessions = await listOpenSessions();
        return sessions.filter((s) => s.mode === "staged");
      },
      { timeout: 15_000 },
    )
    .toEqual([]);
});
