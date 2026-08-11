/**
 * App roots + overlap validation (iw9-b stream 1).
 *
 * Covers the four app-roots scenarios: single-root publish binding, nested
 * publish 409 (both containment directions), extra-paths 400, and invalid
 * app.yaml retaining last-good derived state.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";
import { appPathAllowed } from "../src/apps/store.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-apps-roots-"));
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

async function errorBody(res: Response): Promise<{ error?: string; message?: string }> {
  return (await res.json()) as { error?: string; message?: string };
}

describe("app roots — publish binds the root, nothing else", () => {
  it("publishes with a single root and stores no multi-prefix paths binding", async () => {
    await putFile("apps/tasks/index.tsx", "export default () => null;");
    await putFile(
      "apps/tasks/app.yaml",
      "title: Tasks\ndescription: Task tracker\n",
    );
    const res = await manage("apps/publish", {
      name: "tasks",
      dir: "apps/tasks",
      allowed_tools: ["keyvalue.*", "vfs.*"],
    });
    expect(res.status).toBe(200);
    const published = await data<{
      root: string;
      paths: string[];
      entry: string;
      title?: string;
      reconcile?: { status: string };
    }>(res);
    expect(published.root).toBe("apps/tasks");
    expect(published.paths).toEqual(["apps/tasks"]);
    expect(published.entry).toBe("apps/tasks/index.tsx");
    expect(published.title).toBe("Tasks");
    expect(published.reconcile?.status).toBe("ok");

    // Sessions authorize against the root alone.
    const scope = { id: "x", name: "tasks", root: "apps/tasks", paths: ["apps/tasks"] };
    expect(appPathAllowed(scope, "apps/tasks/index.tsx")).toBe(true);
    expect(appPathAllowed(scope, "apps/other/secret.txt")).toBe(false);
  });
});

describe("app roots — never overlap", () => {
  it("rejects a nested publish with 409 naming the conflicting app", async () => {
    await putFile("apps/crm/index.tsx", "export default () => null;");
    expect(
      (
        await manage("apps/publish", {
          name: "crm",
          dir: "apps/crm",
          allowed_tools: ["keyvalue.*"],
        })
      ).status,
    ).toBe(200);

    await putFile("apps/crm/reports/index.tsx", "export default () => null;");
    const nested = await manage("apps/publish", {
      name: "crm-reports",
      dir: "apps/crm/reports",
      allowed_tools: ["keyvalue.*"],
    });
    expect(nested.status).toBe(409);
    const body = await errorBody(nested);
    const message = body.error ?? body.message ?? "";
    expect(message).toMatch(/crm/i);
    expect(message).toMatch(/overlap|contain/i);
  });

  it("rejects a containing publish with 409 (both-directions check)", async () => {
    await putFile("apps/nest/reports/index.tsx", "export default () => null;");
    expect(
      (
        await manage("apps/publish", {
          name: "nest-reports",
          dir: "apps/nest/reports",
          allowed_tools: ["keyvalue.*"],
        })
      ).status,
    ).toBe(200);

    await putFile("apps/nest/index.tsx", "export default () => null;");
    const containing = await manage("apps/publish", {
      name: "nest",
      dir: "apps/nest",
      allowed_tools: ["keyvalue.*"],
    });
    expect(containing.status).toBe(409);
    const body = await errorBody(containing);
    const message = body.error ?? body.message ?? "";
    expect(message).toMatch(/nest-reports|overlap|contain/i);
  });
});

describe("app roots — paths[] extras retired", () => {
  it("rejects publish with extra path prefixes (400 pointing at mounts)", async () => {
    await putFile("apps/charts/index.tsx", "export default () => null;");
    const res = await manage("apps/publish", {
      name: "charts",
      dir: "apps/charts",
      paths: ["lib/shared"],
      allowed_tools: ["keyvalue.*"],
    });
    expect(res.status).toBe(400);
    const body = await errorBody(res);
    const message = body.error ?? body.message ?? "";
    expect(message.toLowerCase()).toMatch(/mount/);
  });
});

describe("app roots — invalid app.yaml keeps last-good", () => {
  it("retains last-good derived state and surfaces reconcile error without throwing", async () => {
    await putFile("apps/ledger/index.tsx", "export default () => null;");
    await putFile("apps/ledger/app.yaml", "title: Ledger\n");
    const first = await manage("apps/publish", {
      name: "ledger",
      dir: "apps/ledger",
      allowed_tools: ["keyvalue.*"],
    });
    expect(first.status).toBe(200);
    const good = await data<{ title?: string; reconcile?: { status: string } }>(first);
    expect(good.title).toBe("Ledger");
    expect(good.reconcile?.status).toBe("ok");

    // Schema violation in app.yaml
    await putFile("apps/ledger/app.yaml", "title: Broken\nbogusField: nope\n");
    const second = await manage("apps/publish", {
      name: "ledger",
      dir: "apps/ledger",
      allowed_tools: ["keyvalue.*"],
    });
    expect(second.status).toBe(200);
    const kept = await data<{
      title?: string;
      reconcile?: { status: string; issues?: Array<{ path: string; message: string }> };
    }>(second);
    // Last-good title retained — not overwritten by the invalid file.
    expect(kept.title).toBe("Ledger");
    expect(kept.reconcile?.status).toBe("error");
    expect(kept.reconcile?.issues?.length).toBeGreaterThan(0);
  });
});
