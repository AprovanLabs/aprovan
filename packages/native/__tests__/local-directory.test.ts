/**
 * Local-directory VFS backend — disk-backed NativeVfsBackend with containPath.
 */

import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { VfsError } from "@utdk/vfs";
import { createLocalDirectoryBackend } from "../src/local-directory.js";
import { createNativeVfs } from "../src/vfs.js";

let root: string;
let outside: string;

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "aprovan-vfs-root-"));
  outside = mkdtempSync(join(tmpdir(), "aprovan-vfs-outside-"));
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
  rmSync(outside, { recursive: true, force: true });
});

describe("createLocalDirectoryBackend", () => {
  it("round-trips a write through a real directory", async () => {
    const backend = createLocalDirectoryBackend({ root });
    const vfs = createNativeVfs({ backend });

    const written = await vfs.write({ path: "notes/hello.txt", content: "hello" });
    expect(written).toMatchObject({ path: "notes/hello.txt", kind: "file", size: 5 });
    expect(typeof written.etag).toBe("string");
    expect(typeof written.modifiedAt).toBe("string");

    expect(readFileSync(join(root, "notes/hello.txt"), "utf8")).toBe("hello");

    const read = await vfs.read({ path: "notes/hello.txt" });
    expect(read).toMatchObject({
      path: "notes/hello.txt",
      encoding: "utf8",
      content: "hello",
      size: 5,
      etag: written.etag,
    });
  });

  it("derives etag from content hash and modifiedAt from mtime", async () => {
    const backend = createLocalDirectoryBackend({ root });
    const first = await backend.write("a.txt", "same", "utf8");
    const second = await backend.write("b.txt", "same", "utf8");
    expect(first.etag).toBe(second.etag);

    const changed = await backend.write("a.txt", "different", "utf8");
    expect(changed.etag).not.toBe(first.etag);
    expect(changed.modifiedAt).toBeTruthy();
  });

  it("honours ifMatch against the content-hash etag", async () => {
    const backend = createLocalDirectoryBackend({ root });
    const written = await backend.write("a.txt", "v1", "utf8");

    await expect(backend.write("a.txt", "v2", "utf8", "stale")).rejects.toSatisfy(
      (err: unknown) => err instanceof VfsError && err.status === 409,
    );

    const updated = await backend.write("a.txt", "v2", "utf8", written.etag);
    expect(updated.etag).not.toBe(written.etag);

    await expect(backend.write("missing.txt", "x", "utf8", "*")).rejects.toSatisfy(
      (err: unknown) => err instanceof VfsError && err.status === 409,
    );
  });

  it("lists a prefix with recursive, delimiter, cursor, and limit", async () => {
    const backend = createLocalDirectoryBackend({ root });
    await backend.write("a/one.txt", "1", "utf8");
    await backend.write("a/two.txt", "2", "utf8");
    await backend.write("a/nested/deep.txt", "3", "utf8");
    await backend.write("b/other.txt", "4", "utf8");
    mkdirSync(join(root, "a/empty"), { recursive: true });

    const recursive = await backend.list({ prefix: "a", recursive: true, limit: 100 });
    expect(recursive.entries.map((e) => e.path)).toEqual([
      "a/nested/deep.txt",
      "a/one.txt",
      "a/two.txt",
    ]);

    const delimited = await backend.list({ prefix: "a", recursive: false, limit: 100 });
    expect(delimited.entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "a/one.txt", kind: "file" }),
        expect.objectContaining({ path: "a/two.txt", kind: "file" }),
        expect.objectContaining({ path: "a/nested", kind: "directory" }),
        expect.objectContaining({ path: "a/empty", kind: "directory" }),
      ]),
    );
    expect(delimited.entries.some((e) => e.path === "a/nested/deep.txt")).toBe(false);

    const page1 = await backend.list({ prefix: "a", recursive: true, limit: 2 });
    expect(page1.entries).toHaveLength(2);
    expect(page1.cursor).toBe(page1.entries[1]?.path);

    const page2 = await backend.list({
      prefix: "a",
      recursive: true,
      limit: 2,
      cursor: page1.cursor,
    });
    expect(page2.entries).toHaveLength(1);
    expect(page2.cursor).toBeUndefined();
  });

  it("stats files and directories; delete is idempotent for files", async () => {
    const backend = createLocalDirectoryBackend({ root });
    const written = await backend.write("dir/file.txt", "x", "utf8");

    expect(await backend.stat("dir/file.txt")).toMatchObject({
      path: "dir/file.txt",
      kind: "file",
      etag: written.etag,
    });
    expect(await backend.stat("dir")).toMatchObject({ path: "dir", kind: "directory" });
    expect(await backend.stat("missing")).toBeUndefined();

    expect(await backend.delete("dir/file.txt")).toBe(true);
    expect(await backend.delete("dir/file.txt")).toBe(false);
  });

  it("rejects relative escape, absolute paths, and symlink escape", async () => {
    const backend = createLocalDirectoryBackend({ root });

    await expect(backend.read("../escape.txt")).rejects.toThrow(/escapes the sandbox/u);
    await expect(backend.write("../escape.txt", "no", "utf8")).rejects.toThrow(
      /escapes the sandbox/u,
    );
    await expect(backend.read("/etc/hosts")).rejects.toThrow(/must be relative/u);

    writeFileSync(join(outside, "secret.txt"), "classified");
    symlinkSync(join(outside, "secret.txt"), join(root, "link.txt"));
    await expect(backend.read("link.txt")).rejects.toThrow(/resolves outside the sandbox/u);

    // Write outside creates nothing.
    await expect(backend.write("../out.txt", "no", "utf8")).rejects.toThrow();
    expect(() => readFileSync(join(outside, "out.txt"))).toThrow();
  });

  it("skips escaping symlinks when listing", async () => {
    const backend = createLocalDirectoryBackend({ root });
    writeFileSync(join(root, "real.txt"), "mine");
    writeFileSync(join(outside, "secret.txt"), "classified");
    symlinkSync(outside, join(root, "peek"));

    const listed = await backend.list({ prefix: "", recursive: true, limit: 100 });
    expect(listed.entries.map((e) => e.path)).toEqual(["real.txt"]);
  });
});

describe("local-directory vfs conformance", () => {
  const ops = ["read", "write", "delete", "list", "stat"] as const;

  it("implements every declared operation", () => {
    const vfs = createNativeVfs({ backend: createLocalDirectoryBackend({ root }) });
    for (const op of ops) {
      expect(typeof vfs[op]).toBe("function");
    }
  });

  it("matches contract shapes: write/stat/list/delete/read", async () => {
    const vfs = createNativeVfs({ backend: createLocalDirectoryBackend({ root }) });
    const written = await vfs.write({ path: "a/b.txt", content: "hi" });
    expect(written).toMatchObject({ path: "a/b.txt", kind: "file" });
    expect(typeof written.etag).toBe("string");
    expect(typeof written.size).toBe("number");
    expect(typeof written.modifiedAt).toBe("string");

    const statted = await vfs.stat({ path: "a/b.txt" });
    expect(statted.kind).toBe("file");
    expect(statted.etag).toBe(written.etag);

    const listed = await vfs.list({ prefix: "a", recursive: true });
    expect(listed.entries.some((e) => e.path === "a/b.txt" && e.kind === "file")).toBe(true);

    const dirs = await vfs.list({ prefix: "", recursive: false });
    expect(dirs.entries.some((e) => e.path === "a" && e.kind === "directory")).toBe(true);

    const read = await vfs.read({ path: "a/b.txt" });
    expect(read).toMatchObject({
      path: "a/b.txt",
      encoding: "utf8",
      content: "hi",
      size: 2,
    });

    const deleted = await vfs.delete({ path: "a/b.txt" });
    expect(deleted).toEqual({ path: "a/b.txt", deleted: true });
    const idempotent = await vfs.delete({ path: "a/b.txt" });
    expect(idempotent.deleted).toBe(false);
  });
});
