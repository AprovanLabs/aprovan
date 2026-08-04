/**
 * The bashkit driver against the real interpreter — no mocks, because the
 * whole point of this provider is that the real thing is cheap enough to run
 * in-process. What matters here is the contract surface the workspace mounts
 * layer depends on: manifest paths relative to the workdir, sha256 hashes
 * that match the FS store's identity, per-exec cwd isolation, and loud
 * refusals for the things a text-only VFS cannot do.
 */

import { createHash } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { createBashkitClient, resetBashkitInstancesForTesting } from "../index.js";

const sha = (content: string): string =>
  createHash("sha256").update(content).digest("hex");

beforeEach(() => {
  resetBashkitInstancesForTesting();
});

describe("lifecycle", () => {
  it("creates a sandbox with its workdir and mount directories in place", async () => {
    const client = await createBashkitClient();
    const box = await client.create({ mounts: ["app", "tmp/deep"] });

    expect(box.id).toMatch(/^sbx-/u);
    expect(box.workdir).toBe("/work");
    const result = await client.exec({ id: box.id, command: "ls" });
    expect(result.exitCode).toBe(0);
    expect(result.stdout.split("\n").filter(Boolean).sort()).toEqual(["app", "tmp"]);
  });

  it("lists and gets what exists, and destroy makes it unknown", async () => {
    const client = await createBashkitClient();
    const box = await client.create({});
    expect(await client.get({ id: box.id })).toMatchObject({ id: box.id });
    expect((await client.list()).map((entry) => entry.id)).toContain(box.id);

    expect(await client.destroy({ id: box.id })).toEqual({ destroyed: true });
    expect(await client.get({ id: box.id })).toBeUndefined();
    await expect(client.exec({ id: box.id, command: "ls" })).rejects.toThrow(
      /Unknown sandbox/u,
    );
  });

  it("evicts a sandbox whose ttl has lapsed", async () => {
    const client = await createBashkitClient();
    const box = await client.create({ ttlSeconds: 0.001 });
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(await client.get({ id: box.id })).toBeUndefined();
  });

  it("refuses scoped secrets rather than downgrading them to env vars", async () => {
    const client = await createBashkitClient();
    await expect(
      client.create({ secrets: { token: { hosts: ["api.example.com"], value: "s" } } }),
    ).rejects.toThrow(/scoped secrets/u);
  });
});

describe("exec", () => {
  it("runs real shell pipelines and reports exit codes", async () => {
    const client = await createBashkitClient();
    const box = await client.create({});

    const ok = await client.exec({
      id: box.id,
      command: "seq 1 4 | awk '{ sum += $1 } END { print sum }'",
    });
    expect(ok).toMatchObject({ exitCode: 0, stdout: "10\n", truncated: false });

    const bad = await client.exec({ id: box.id, command: "grep needle /does-not-exist" });
    expect(bad.exitCode).not.toBe(0);
  });

  it("pins cwd per exec without leaking a cd into the next call", async () => {
    const client = await createBashkitClient();
    const box = await client.create({ mounts: ["app"] });

    const inMount = await client.exec({ id: box.id, command: "cd app; pwd" });
    expect(inMount.stdout).toBe("/work/app\n");

    const after = await client.exec({ id: box.id, command: "pwd", cwd: "app" });
    expect(after.stdout).toBe("/work/app\n");
    expect((await client.exec({ id: box.id, command: "pwd" })).stdout).toBe("/work\n");
  });

  it("passes env and stdin through", async () => {
    const client = await createBashkitClient();
    const box = await client.create({ env: { FROM_CREATE: "one" } });
    const result = await client.exec({
      id: box.id,
      command: 'echo "$FROM_CREATE/$FROM_EXEC"; cat',
      env: { FROM_EXEC: "two" },
      stdin: "from-stdin\n",
    });
    expect(result.stdout).toBe("one/two\nfrom-stdin\n");
  });
});

describe("files", () => {
  it("round-trips a file with the FS store's own hash identity", async () => {
    const client = await createBashkitClient();
    const box = await client.create({});
    const content = "export const a = 1;\n";

    const written = await client.writeFile({
      id: box.id,
      path: "app/lib/index.ts",
      content,
    });
    expect(written).toEqual({ path: "app/lib/index.ts", hash: sha(content), size: content.length });

    const read = await client.readFile({ id: box.id, path: "app/lib/index.ts" });
    expect(read).toMatchObject({ content, encoding: "utf8", hash: sha(content) });

    // The shell sees the same bytes JS wrote — one filesystem, two views.
    const cat = await client.exec({ id: box.id, command: "cat app/lib/index.ts" });
    expect(cat.stdout).toBe(content);
  });

  it("refuses base64 bodies rather than corrupting them", async () => {
    const client = await createBashkitClient();
    const box = await client.create({});
    await expect(
      client.writeFile({ id: box.id, path: "bin", content: "AAEC", encoding: "base64" }),
    ).rejects.toThrow(/base64/u);
  });

  it("rejects traversal instead of resolving it", async () => {
    const client = await createBashkitClient();
    const box = await client.create({});
    await expect(
      client.readFile({ id: box.id, path: "../outside" }),
    ).rejects.toThrow(/\.\./u);
  });

  it("deletes files, and directories only with recursive", async () => {
    const client = await createBashkitClient();
    const box = await client.create({});
    await client.writeFile({ id: box.id, path: "dir/a.txt", content: "a" });

    await expect(client.deleteFile({ id: box.id, path: "dir" })).rejects.toThrow(
      /recursive/u,
    );
    expect(await client.deleteFile({ id: box.id, path: "dir/a.txt" })).toEqual({
      deleted: true,
    });
    expect(await client.deleteFile({ id: box.id, path: "dir", recursive: true })).toEqual({
      deleted: true,
    });
    expect(await client.deleteFile({ id: box.id, path: "dir" })).toEqual({ deleted: false });
  });
});

describe("listFiles — the manifest the workspace diffs", () => {
  it("returns workdir-relative paths with real content hashes", async () => {
    const client = await createBashkitClient();
    const box = await client.create({ mounts: ["app"] });
    await client.writeFile({ id: box.id, path: "app/index.ts", content: "one\n" });
    await client.writeFile({ id: box.id, path: "app/lib/util.ts", content: "two\n" });

    const all = await client.listFiles({ id: box.id });
    expect(all).toEqual([
      { path: "app/index.ts", hash: sha("one\n"), size: 4 },
      { path: "app/lib/util.ts", hash: sha("two\n"), size: 4 },
    ]);

    // Scoped to a mount path, the way sandboxManifest asks.
    const scoped = await client.listFiles({ id: box.id, path: "app" });
    expect(scoped.map((entry) => entry.path)).toEqual(["app/index.ts", "app/lib/util.ts"]);
  });

  it("sees files a shell command created — the round trip that makes commit work", async () => {
    const client = await createBashkitClient();
    const box = await client.create({ mounts: ["app"] });
    await client.writeFile({ id: box.id, path: "app/a.txt", content: "alpha\n" });
    await client.exec({
      id: box.id,
      command: "tr a-z A-Z < a.txt > loud.txt",
      cwd: "app",
    });

    const manifest = await client.listFiles({ id: box.id, path: "app" });
    expect(manifest.map((entry) => entry.path).sort()).toEqual([
      "app/a.txt",
      "app/loud.txt",
    ]);
    const read = await client.readFile({ id: box.id, path: "app/loud.txt" });
    expect(read.content).toBe("ALPHA\n");
  });

  it("keeps excluded directories out of the manifest", async () => {
    const client = await createBashkitClient();
    const box = await client.create({ mounts: ["app"] });
    await client.writeFile({ id: box.id, path: "app/keep.ts", content: "k" });
    await client.writeFile({
      id: box.id,
      path: "app/node_modules/dep/index.js",
      content: "noise",
    });

    const manifest = await client.listFiles({ id: box.id, path: "app" });
    expect(manifest.map((entry) => entry.path)).toEqual(["app/keep.ts"]);
  });

  it("answers an unknown path with an empty manifest", async () => {
    const client = await createBashkitClient();
    const box = await client.create({});
    expect(await client.listFiles({ id: box.id, path: "ghost" })).toEqual([]);
  });
});
