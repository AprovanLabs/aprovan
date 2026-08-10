/**
 * VFS mounts: registration/validation, read-only enforcement, and unmount.
 * External read-through (GitHub / S3) is network-dependent and covered by
 * the resolution-order logic here only up to the dispatch boundary.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-vfs-mounts-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

const call = (path: string, args: Record<string, unknown> = {}) =>
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

// Quarantined — no tool-level mount CRUD surface exists
// (`addMount`/`removeMount` have zero non-test callers). Un-skip and
// rename `vfs/mount|mounts|unmount` to whatever verb
// `iw9-b-app-model`'s mounts revival (D19) lands.
describe.skip("vfs mounts", () => {
  it("registers a git mount and lists it", async () => {
    const mounted = await data<{ mount: { prefix: string; type: string; mode: string } }>(
      await call("vfs/mount", {
        prefix: "vendor/charts",
        type: "git",
        config: { repo: "org/charts", ref: "main", path: "src" },
      }),
    );
    expect(mounted.mount).toMatchObject({
      prefix: "vendor/charts",
      type: "git",
      mode: "read",
    });

    const listing = await data<{ mounts: Array<{ prefix: string }> }>(
      await call("vfs/mounts", {}),
    );
    expect(listing.mounts.map((m) => m.prefix)).toEqual(["vendor/charts"]);
  });

  it("rejects writes and deletes under a mounted prefix", async () => {
    const write = await call("vfs/write", {
      path: "vendor/charts/index.ts",
      content: "nope",
    });
    expect(write.status).toBe(403);

    const put = await putFile("vendor/charts/index.ts", "nope");
    expect(put.status).toBe(403);

    const del = await call("vfs/delete", { path: "vendor/charts/index.ts" });
    expect(del.status).toBe(403);
  });

  it("rejects overlapping mounts and mounts over existing files", async () => {
    const overlap = await call("vfs/mount", {
      prefix: "vendor/charts/sub",
      type: "s3",
      config: { bucket: "b" },
    });
    expect(overlap.status).toBe(409);

    await putFile("media/logo.md", "logo");
    const occupied = await call("vfs/mount", {
      prefix: "media",
      type: "s3",
      config: { bucket: "b" },
    });
    expect(occupied.status).toBe(409);
  });

  it("rejects the reserved crdt type with a pointer", async () => {
    const res = await call("vfs/mount", {
      prefix: "live/doc",
      type: "crdt",
      config: { docUrl: "wss://example" },
    });
    expect(res.status).toBe(501);
  });

  it("mount ops are workspace-only concepts (validation errors, not crashes)", async () => {
    const missing = await call("vfs/mount", { prefix: "x", type: "git", config: {} });
    expect(missing.status).toBe(400);
  });

  it("unmounts and frees the prefix", async () => {
    const removed = await data<{ removed: string }>(
      await call("vfs/unmount", { prefix: "vendor/charts" }),
    );
    expect(removed.removed).toBe("vendor/charts");

    const write = await call("vfs/write", {
      path: "vendor/charts/index.ts",
      content: "now fine",
    });
    expect(write.status).toBe(200);

    const again = await call("vfs/unmount", { prefix: "vendor/charts" });
    expect(again.status).toBe(404);
  });
});
