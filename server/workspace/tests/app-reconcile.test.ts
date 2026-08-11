/**
 * Reconcile entry point + root-binding index (iw9-f4 stream 3).
 * Specs: app-manifest (reconcile), app-slug (rename/collision/unpublish), app-icon.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { isValid } from "ulid";
import {
  bindRoot,
  dropRootBinding,
  mintAppId,
  readAlias,
  readRootBinding,
  resolveAppRef,
  setAlias,
} from "../src/apps/identity.js";
import { loadAppYaml, type AppYaml } from "../src/apps/manifest.js";
import { reconcileApp } from "../src/apps/reconcile.js";
import {
  claimGlobalSlug,
  releaseGlobalSlug,
  resolveGlobalSlug,
} from "../src/apps/slugs.js";
import { readApp, removeApp, saveApp } from "../src/apps/store.js";
import { syncDirectoryEntry, readDirectoryEntry } from "../src/apps/directory.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";
import { ServiceError } from "../src/service-kernel.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-app-reconcile-"));
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

function yaml(raw: string): AppYaml {
  const result = loadAppYaml(raw);
  if (!result.ok) throw new Error(result.issues.map((i) => i.message).join("; "));
  return result.value;
}

describe("root-binding index (3.0)", () => {
  it("bindRoot / readRootBinding / dropRootBinding round-trip", async () => {
    const ws = "root-bind-ws";
    const root = "apps/recipes";
    const appId = mintAppId();
    expect(await readRootBinding(ws, root)).toBeUndefined();
    await bindRoot(ws, root, appId);
    expect(await readRootBinding(ws, root)).toEqual({ appId });
    await dropRootBinding(ws, root);
    expect(await readRootBinding(ws, root)).toBeUndefined();
  });

  it("bindRoot overwrites without self-guard", async () => {
    const ws = "root-overwrite-ws";
    const root = "apps/cookbook";
    const a = mintAppId();
    const b = mintAppId();
    await bindRoot(ws, root, a);
    await bindRoot(ws, root, b);
    expect(await readRootBinding(ws, root)).toEqual({ appId: b });
  });
});

describe("reconcileApp", () => {
  it("first sight mints a ULID and writes record/alias/location/root/directory inputs", async () => {
    const ws = "reconcile-first-ws";
    const root = "apps/recipes";
    const result = await reconcileApp({
      workspaceId: ws,
      root,
      yaml: yaml("title: Recipes\n"),
      actor: "user-1",
    });
    expect(result.created).toBe(true);
    expect(result.changed).toBe(true);
    expect(isValid(result.appId)).toBe(true);

    const record = await readApp(ws, result.appId);
    expect(record).toMatchObject({
      appId: result.appId,
      name: "recipes",
      slug: "recipes",
      root,
      title: "Recipes",
      createdBy: "user-1",
    });
    expect(record?.declared?.title).toBe("Recipes");
    expect(await readRootBinding(ws, root)).toEqual({ appId: result.appId });
    expect(await resolveAppRef(ws, "recipes")).toBe(result.appId);
  });

  it("idempotent re-reconcile performs no writes", async () => {
    const ws = "reconcile-idem-ws";
    const root = "apps/pantry";
    const y = yaml("title: Pantry\ndescription: food\n");
    const first = await reconcileApp({
      workspaceId: ws,
      root,
      yaml: y,
      actor: "user-1",
    });
    const before = await readApp(ws, first.appId);
    const second = await reconcileApp({
      workspaceId: ws,
      root,
      yaml: y,
      actor: "user-1",
      expectedAppId: first.appId,
    });
    expect(second).toEqual({
      appId: first.appId,
      created: false,
      changed: false,
    });
    const after = await readApp(ws, first.appId);
    expect(after?.updatedAt).toBe(before?.updatedAt);
  });

  it("authored-field edit updates declared and bumps updatedAt", async () => {
    const ws = "reconcile-edit-ws";
    const root = "apps/notes";
    const first = await reconcileApp({
      workspaceId: ws,
      root,
      yaml: yaml("title: Notes\n"),
      actor: "user-1",
    });
    const before = await readApp(ws, first.appId);
    await new Promise((r) => setTimeout(r, 5));
    const second = await reconcileApp({
      workspaceId: ws,
      root,
      yaml: yaml("title: Notes v2\nicon: star\n"),
      actor: "user-1",
      expectedAppId: first.appId,
    });
    expect(second).toEqual({
      appId: first.appId,
      created: false,
      changed: true,
    });
    const after = await readApp(ws, first.appId);
    expect(after?.title).toBe("Notes v2");
    expect(after?.declared?.icon).toBe("star");
    expect(after?.createdAt).toBe(before?.createdAt);
    expect(after?.updatedAt).not.toBe(before?.updatedAt);
  });

  it("rejects mismatched explicit slug (directory name authoritative)", async () => {
    await expect(
      reconcileApp({
        workspaceId: "reconcile-slug-mismatch-ws",
        root: "apps/recipes",
        yaml: yaml("slug: cookbook\ntitle: X\n"),
        actor: "user-1",
      }),
    ).rejects.toMatchObject({
      status: 400,
      message: expect.stringMatching(/directory name is authoritative/i),
    } satisfies Partial<ServiceError>);
  });

  it("rejects ULID-shaped / malformed slugs", async () => {
    await expect(
      reconcileApp({
        workspaceId: "reconcile-bad-slug-ws",
        root: "apps/BadSlug",
        yaml: yaml("title: X\n"),
        actor: "user-1",
      }),
    ).rejects.toMatchObject({ status: 400 } satisfies Partial<ServiceError>);
  });

  it("rejects foreign expectedAppId when root is already bound", async () => {
    const ws = "reconcile-foreign-ws";
    const root = "apps/alpha";
    const first = await reconcileApp({
      workspaceId: ws,
      root,
      yaml: yaml("title: Alpha\n"),
      actor: "user-1",
    });
    const foreign = mintAppId();
    await expect(
      reconcileApp({
        workspaceId: ws,
        root,
        yaml: yaml("title: Alpha\n"),
        actor: "user-1",
        expectedAppId: foreign,
      }),
    ).rejects.toMatchObject({
      status: 400,
      message: expect.stringMatching(new RegExp(`${foreign}.*${root}|${root}.*${foreign}`)),
    } satisfies Partial<ServiceError>);
    expect(await readRootBinding(ws, root)).toEqual({ appId: first.appId });
  });

  it("rejects unknown expectedAppId on a free root as foreign id", async () => {
    const foreign = mintAppId();
    await expect(
      reconcileApp({
        workspaceId: "reconcile-unknown-id-ws",
        root: "apps/orphan",
        yaml: yaml("title: Orphan\n"),
        actor: "user-1",
        expectedAppId: foreign,
      }),
    ).rejects.toMatchObject({
      status: 400,
      message: expect.stringMatching(new RegExp(foreign)),
    } satisfies Partial<ServiceError>);
    expect(await readRootBinding("reconcile-unknown-id-ws", "apps/orphan")).toBeUndefined();
  });

  it("rejects slug collision with 409 naming the holder", async () => {
    const ws = "reconcile-collision-ws";
    const holder = await reconcileApp({
      workspaceId: ws,
      root: "apps/held",
      yaml: yaml("title: Held\n"),
      actor: "user-1",
    });
    // Another root cannot take the same basename/slug via alias.
    // Simulate a different folder that wants slug "held" by pre-binding nothing
    // at apps/other but colliding on alias through setAlias semantics — use a
    // root whose basename collides after we plant the holder alias only.
    // Real collision: two apps, second reconcile at a new root whose basename
    // is already aliased.
    await setAlias(ws, "taken", holder.appId);
    await expect(
      reconcileApp({
        workspaceId: ws,
        root: "apps/taken",
        yaml: yaml("title: Taken\n"),
        actor: "user-1",
      }),
    ).rejects.toMatchObject({
      status: 409,
      message: expect.stringMatching(new RegExp(holder.appId)),
    } satisfies Partial<ServiceError>);
    expect(await readRootBinding(ws, "apps/taken")).toBeUndefined();
    expect(await readAlias(ws, "held")).toEqual({ appId: holder.appId });
  });

  it("rename-as-mv preserves appId and rebinds alias/root", async () => {
    const ws = "reconcile-rename-ws";
    const first = await reconcileApp({
      workspaceId: ws,
      root: "apps/recipes",
      yaml: yaml("title: Recipes\n"),
      actor: "user-1",
    });
    const createdAt = (await readApp(ws, first.appId))!.createdAt;

    const renamed = await reconcileApp({
      workspaceId: ws,
      root: "apps/cookbook",
      yaml: yaml("title: Cookbook\n"),
      actor: "user-1",
      expectedAppId: first.appId,
    });
    expect(renamed).toEqual({
      appId: first.appId,
      created: false,
      changed: true,
    });

    const record = await readApp(ws, first.appId);
    expect(record?.createdAt).toBe(createdAt);
    expect(record?.name).toBe("cookbook");
    expect(record?.slug).toBe("cookbook");
    expect(record?.root).toBe("apps/cookbook");
    expect(record?.title).toBe("Cookbook");

    expect(await readRootBinding(ws, "apps/cookbook")).toEqual({ appId: first.appId });
    expect(await readRootBinding(ws, "apps/recipes")).toBeUndefined();
    expect(await resolveAppRef(ws, "cookbook")).toBe(first.appId);
    await expect(resolveAppRef(ws, "recipes")).rejects.toMatchObject({ status: 404 });
  });

  it("directory projection carries slug and icon", async () => {
    const ws = "reconcile-dir-ws";
    const result = await reconcileApp({
      workspaceId: ws,
      root: "apps/gallery",
      yaml: yaml("title: Gallery\nicon: sparkle\n"),
      actor: "user-1",
    });
    const record = await readApp(ws, result.appId);
    expect(record).toBeDefined();
    // Publish-visible so the deployment index row is written.
    await saveApp(ws, { ...record!, visibility: "public" });
    const entry = await readDirectoryEntry(result.appId);
    expect(entry).toMatchObject({
      appId: result.appId,
      name: "gallery",
      slug: "gallery",
      icon: "sparkle",
      title: "Gallery",
    });
  });

  it("unpublish and remove release the global slug claim", async () => {
    const ws = "reconcile-claim-ws";
    const result = await reconcileApp({
      workspaceId: ws,
      root: "apps/claimed",
      yaml: yaml("title: Claimed\n"),
      actor: "user-1",
    });
    await claimGlobalSlug("claimed", result.appId, ws);
    expect(await resolveGlobalSlug("claimed")).toEqual({
      appId: result.appId,
      workspaceId: ws,
    });

    const record = await readApp(ws, result.appId);
    await syncDirectoryEntry(ws, { ...record!, visibility: "private" });
    expect(await resolveGlobalSlug("claimed")).toBeUndefined();

    // Re-claim, then remove.
    await claimGlobalSlug("claimed", result.appId, ws);
    await removeApp(ws, result.appId);
    expect(await resolveGlobalSlug("claimed")).toBeUndefined();
    expect(await readRootBinding(ws, "apps/claimed")).toBeUndefined();
  });
});

describe("releaseGlobalSlug holder check still holds", () => {
  it("cannot release another app's claim", async () => {
    const holder = mintAppId();
    const other = mintAppId();
    await claimGlobalSlug("locked-slug", holder, "ws-lock");
    await expect(releaseGlobalSlug("locked-slug", other)).rejects.toMatchObject({
      status: 403,
    } satisfies Partial<ServiceError>);
  });
});
