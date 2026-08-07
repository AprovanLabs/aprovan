/**
 * Path containment — the registered root is the only boundary.
 *
 * These cases are load-bearing: if a path can escape, callers hand the whole
 * disk to whatever asks. Exercised through LocalExecutor and directly against
 * {@link containPath}, the shared primitive.
 */

import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { containPath } from "../src/contain.js";
import { LocalExecutor } from "../src/host/executor.js";

let root: string;
let outside: string;
let executor: LocalExecutor;

beforeEach(async () => {
  root = mkdtempSync(join(tmpdir(), "aprovan-root-"));
  outside = mkdtempSync(join(tmpdir(), "aprovan-outside-"));
  executor = new LocalExecutor({ root });
  await executor.init();
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
  rmSync(outside, { recursive: true, force: true });
});

async function newSandbox(): Promise<string> {
  const instance = (await executor.run("create", {})) as { id: string };
  return instance.id;
}

describe("containment", () => {
  it("refuses traversal out of the sandbox", async () => {
    const id = await newSandbox();
    await expect(
      executor.run("writeFile", { id, path: "../escape.txt", content: "no" }),
    ).rejects.toThrow(/escapes the sandbox/u);
    await expect(
      executor.run("readFile", { id, path: "a/../../../etc/hosts" }),
    ).rejects.toThrow(/escapes the sandbox/u);
  });

  it("refuses absolute paths", async () => {
    const id = await newSandbox();
    await expect(
      executor.run("writeFile", { id, path: "/etc/hosts", content: "no" }),
    ).rejects.toThrow(/must be relative/u);
  });

  it("refuses a symlink that resolves outside the sandbox", async () => {
    const id = await newSandbox();
    const secret = join(outside, "secret.txt");
    writeFileSync(secret, "classified");
    symlinkSync(secret, join(root, id, "link.txt"));

    // Lexically innocent, which is exactly why the realpath check exists.
    await expect(executor.run("readFile", { id, path: "link.txt" })).rejects.toThrow(
      /resolves outside the sandbox/u,
    );
  });

  it("never follows a symlink into a listing", async () => {
    const id = await newSandbox();
    writeFileSync(join(outside, "secret.txt"), "classified");
    symlinkSync(outside, join(root, id, "peek"));
    writeFileSync(join(root, id, "real.txt"), "mine");

    const entries = (await executor.run("listFiles", { id })) as Array<{ path: string }>;
    expect(entries.map((entry) => entry.path)).toEqual(["real.txt"]);
  });

  it("rejects a sandbox id that is not one", async () => {
    await expect(executor.run("readFile", { id: "../..", path: "x" })).rejects.toThrow(
      /id must be a sandbox id/u,
    );
  });
});

describe("containPath", () => {
  it("rejects chained .. that resolve above the root", async () => {
    await expect(containPath(root, "a/b/../../..")).rejects.toThrow(/escapes the sandbox/u);
    await expect(containPath(root, "x/../../outside")).rejects.toThrow(/escapes the sandbox/u);
  });

  it("rejects absolute paths", async () => {
    await expect(containPath(root, "/etc/hosts")).rejects.toThrow(/must be relative/u);
    await expect(containPath(root, resolve(outside, "secret.txt"))).rejects.toThrow(
      /must be relative/u,
    );
  });

  it("rejects a symlink to the parent directory", async () => {
    symlinkSync(resolve(root, ".."), join(root, "up"));
    await expect(containPath(root, "up")).rejects.toThrow(/resolves outside the sandbox/u);
  });

  it("rejects a symlink whose target is created after the lexical check would pass", async () => {
    // Dangling symlink: lexically under root, target does not exist yet.
    const future = join(outside, "future.txt");
    symlinkSync(future, join(root, "pending.txt"));

    // Target materialises outside the root — realpath must still fail closed.
    writeFileSync(future, "classified");
    await expect(containPath(root, "pending.txt")).rejects.toThrow(
      /resolves outside the sandbox/u,
    );
  });

  it("allows a path that stays inside the root", async () => {
    mkdirSync(join(root, "nested"), { recursive: true });
    writeFileSync(join(root, "nested", "ok.txt"), "fine");
    await expect(containPath(root, "nested/ok.txt")).resolves.toBe(join(root, "nested", "ok.txt"));
  });
});
