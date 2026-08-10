/**
 * Workspace shares key on durable appId (tech-plan D5 / app-share-identity).
 * Renaming an app must not change what its shares allow; pre-D5 name-keyed
 * shares keep working via readWorkspaceConfig's alias-index fallback.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { mintAppId, setAlias } from "../src/apps/identity.js";
import {
  appFsAllowed,
  readWorkspaceConfig,
  shareAllows,
  type AppPaths,
  type WorkspaceConfig,
} from "../src/apps/store.js";
import { svcScope, writeSvcRecord } from "../src/svc-records.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-app-share-identity-"));
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

describe("app-share-identity", () => {
  it("renaming an app does not change what its shares allow", () => {
    const appId = mintAppId();
    const config: WorkspaceConfig = {
      shares: [{ prefix: "shared/recipes", apps: [appId], mode: "read" }],
    };
    const before: AppPaths = {
      id: appId,
      name: "notes-app",
      paths: ["apps/notes-app"],
    };
    const after: AppPaths = {
      id: appId,
      name: "renamed-notes",
      paths: ["apps/renamed-notes"],
    };

    expect(shareAllows(config, appId, "shared/recipes/a.md", false)).toBe(true);
    expect(appFsAllowed(before, config, "shared/recipes/a.md", false)).toBe(true);
    expect(appFsAllowed(after, config, "shared/recipes/a.md", false)).toBe(true);
    expect(shareAllows(config, appId, "shared/recipes/a.md", true)).toBe(false);
  });

  it("an existing name-keyed share keeps working after upgrade", async () => {
    const workspaceId = "share-legacy-ws";
    const appId = mintAppId();
    await setAlias(workspaceId, "notes-app", appId);

    // Write a pre-D5 (name-keyed) record directly — bypasses any write-time
    // normalization so the stored value is still the mutable name.
    await writeSvcRecord(workspaceId, svcScope("workspace"), "config", {
      shares: [{ prefix: "shared/recipes", apps: ["notes-app"], mode: "read" }],
    } satisfies WorkspaceConfig);

    const config = await readWorkspaceConfig(workspaceId);
    expect(config.shares?.[0]?.apps).toEqual([appId]);

    const app: AppPaths = {
      id: appId,
      name: "notes-app",
      paths: ["apps/notes-app"],
    };
    expect(shareAllows(config, appId, "shared/recipes/a.md", false)).toBe(true);
    expect(appFsAllowed(app, config, "shared/recipes/a.md", false)).toBe(true);
  });
});
