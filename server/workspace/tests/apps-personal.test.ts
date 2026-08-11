/**
 * Personal app + promote-out (iw9-b stream 2).
 *
 * Covers personal-app scenarios: lazy creation on first one-off; promote
 * moves/mints/re-points; promote is atomic under simulated failure before
 * delete; promoted app is independent (no back-link to Personal).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { ensurePersonalApp, promoteApp } from "../src/apps/personal.js";
import { listApps, readApp } from "../src/apps/store.js";
import { getFsStore, listAll } from "../src/fs-store.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";
import { ServiceError } from "../src/service-kernel.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-apps-personal-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetAppRateLimiters();
  resetRateLimiters();
});

const WS = "local";
const ACTOR = "local";

const manage = (path: string, args: Record<string, unknown>) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

const putFile = (path: string, content: string) =>
  createApp().request(`/fs/${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T };
  return body.data;
}

describe("personal-app — lazy creation on first one-off", () => {
  it("creates a Personal row (slug personal, root apps/personal) only once", async () => {
    const before = await listApps(WS);
    expect(before.some((a) => a.slug === "personal" || a.name === "personal")).toBe(
      false,
    );

    // First one-off needs a home — ensurePersonalApp mints the row.
    const created = await ensurePersonalApp(WS, ACTOR);
    expect(created.name).toBe("personal");
    expect(created.slug).toBe("personal");
    expect(created.root).toBe("apps/personal");
    expect(created.appId).toMatch(/^[0-9A-HJKMNP-TV-Z]{26}$/);
    // No special flag on the manifest.
    expect(created).not.toHaveProperty("builtin");
    expect(created).not.toHaveProperty("isPersonal");

    await putFile(
      "apps/personal/scratch/widget.tsx",
      "export default () => null;",
    );

    const again = await ensurePersonalApp(WS, ACTOR);
    expect(again.appId).toBe(created.appId);

    const list = await data<{ apps: Array<{ name: string; root?: string }> }>(
      await manage("apps/list", {}),
    );
    const personal = list.apps.find((a) => a.name === "personal");
    expect(personal).toBeDefined();
    expect(personal?.root).toBe("apps/personal");
  });
});

describe("personal-app — promote moves, mints, and re-points", () => {
  it("copies subtree to apps/<slug>, mints a new appId, deletes the source", async () => {
    await ensurePersonalApp(WS, ACTOR);
    await putFile(
      "apps/personal/budget/index.tsx",
      "export default () => 'budget';",
    );
    await putFile(
      "apps/personal/budget/app.yaml",
      "title: Budget\ndescription: Spending tracker\n",
    );

    const promoted = await promoteApp({
      workspaceId: WS,
      source: "apps/personal/budget",
      slug: "budget",
      actor: ACTOR,
    });

    expect(promoted.name).toBe("budget");
    expect(promoted.slug).toBe("budget");
    expect(promoted.root).toBe("apps/budget");
    expect(promoted.entry).toBe("apps/budget/index.tsx");
    expect(promoted.title).toBe("Budget");
    expect(promoted.originAppId).toBeUndefined();

    const store = getFsStore();
    const moved = await store.read(WS, "apps/budget/index.tsx");
    expect(moved?.content).toBe("export default () => 'budget';");
    expect(await store.read(WS, "apps/personal/budget/index.tsx")).toBeUndefined();
    expect((await listAll(store, WS, "apps/personal/budget")).length).toBe(0);

    const listed = await data<{ apps: Array<{ name: string; root?: string }> }>(
      await manage("apps/list", {}),
    );
    expect(listed.apps.map((a) => a.name)).toContain("budget");
    expect(listed.apps.find((a) => a.name === "budget")?.root).toBe("apps/budget");
  });
});

describe("personal-app — promote is atomic under failure", () => {
  it("keeps source intact and leaves no orphan row when failing before delete", async () => {
    await ensurePersonalApp(WS, ACTOR);
    await putFile(
      "apps/personal/ledger/index.tsx",
      "export default () => 'ledger';",
    );

    const beforeApps = await listApps(WS);
    const beforeIds = new Set(beforeApps.map((a) => a.appId));

    await expect(
      promoteApp({
        workspaceId: WS,
        source: "apps/personal/ledger",
        slug: "ledger",
        actor: ACTOR,
        __beforeDelete: async () => {
          throw new ServiceError("simulated promote failure", 500);
        },
      }),
    ).rejects.toThrow(/simulated promote failure/);

    const store = getFsStore();
    const source = await store.read(WS, "apps/personal/ledger/index.tsx");
    expect(source?.content).toBe("export default () => 'ledger';");
    expect(await store.read(WS, "apps/ledger/index.tsx")).toBeUndefined();

    const afterApps = await listApps(WS);
    expect(afterApps.every((a) => beforeIds.has(a.appId) || a.name === "personal")).toBe(
      true,
    );
    expect(afterApps.some((a) => a.name === "ledger")).toBe(false);
  });
});

describe("personal-app — promoted app is independent", () => {
  it("has no back-link to Personal and behaves like any authored app", async () => {
    await ensurePersonalApp(WS, ACTOR);
    await putFile(
      "apps/personal/notes/index.tsx",
      "export default () => 'notes';",
    );

    const promoted = await promoteApp({
      workspaceId: WS,
      source: "apps/personal/notes",
      slug: "notes",
      actor: ACTOR,
    });

    expect(promoted.originAppId).toBeUndefined();
    const stored = await readApp(WS, promoted.appId);
    expect(stored?.originAppId).toBeUndefined();
    expect(stored?.root).toBe("apps/notes");
    expect(stored?.name).toBe("notes");

    // Rename like any independently-authored app — no Personal coupling.
    const renamed = await manage("apps/rename", { app: "notes", name: "notes-v2" });
    expect(renamed.status).toBe(200);
    const after = await readApp(WS, promoted.appId);
    expect(after?.name).toBe("notes-v2");
    expect(after?.root).toBe("apps/notes");
  });
});
