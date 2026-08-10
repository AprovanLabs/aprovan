/**
 * The VCS layer over the workspace FS: commits as snapshot manifests over
 * content that already exists, refs as pointers, diffs, pinned reads, and
 * non-destructive restore. See docs/vcs-and-sessions.md.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-vcs-"));
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

interface CommitPayload {
  commit: { id: string; snapshot: string; parents: string[]; message: string; stats: Record<string, number> };
  created: boolean;
}

describe("vfs commits", () => {
  it("commits the visible tree, idempotently", async () => {
    await putFile("notes/a.md", "alpha");
    await putFile("notes/b.md", "beta");

    const first = await data<CommitPayload>(await call("vcs/commit", { message: "first" }));
    expect(first.created).toBe(true);
    expect(first.commit.message).toBe("first");
    expect(first.commit.parents).toEqual([]);
    expect(first.commit.stats["added"]).toBeGreaterThanOrEqual(2);

    // Nothing changed — the same head comes back, no new commit.
    const again = await data<CommitPayload>(await call("vcs/commit", { message: "noop" }));
    expect(again.created).toBe(false);
    expect(again.commit.id).toBe(first.commit.id);
  });

  it("chains commits and reports stats vs the parent", async () => {
    await putFile("notes/a.md", "alpha v2");
    const second = await data<CommitPayload>(await call("vcs/commit", { message: "edit a" }));
    expect(second.created).toBe(true);
    expect(second.commit.parents).toHaveLength(1);
    expect(second.commit.stats).toMatchObject({ modified: 1, removed: 0 });

    const log = await data<{ commits: Array<{ message: string }> }>(
      await call("vcs/log", {}),
    );
    expect(log.commits.map((c) => c.message)).toEqual(["edit a", "first"]);
  });

  it("never snapshots service state or hidden partitions", async () => {
    const show = await data<{ entries: Array<{ path: string }> }>(
      await call("vcs/show", { commit: "main" }),
    );
    expect(show.entries.some((e) => e.path.startsWith(".services/"))).toBe(false);
  });

  it("diffs two commits and pins reads to a commit", async () => {
    const log = await data<{ commits: Array<{ id: string }> }>(await call("vcs/log", {}));
    const [head, root] = log.commits;

    const diff = await data<{
      modified: Array<{ path: string; from: string; to: string }>;
    }>(await call("vcs/diff", { from: root!.id, to: head!.id }));
    expect(diff.modified.map((m) => m.path)).toContain("notes/a.md");

    // Read the old side by commit.
    const pinned = await data<{ content: string }>(
      await call("vfs/read", { path: "notes/a.md", commit: root!.id }),
    );
    expect(pinned.content).toBe("alpha");

    // And by unambiguous prefix.
    const byPrefix = await data<{ content: string }>(
      await call("vfs/read", { path: "notes/a.md", commit: root!.id.slice(0, 12) }),
    );
    expect(byPrefix.content).toBe("alpha");
  });

  it("lists a snapshot's manifest via vfs.list {commit}", async () => {
    const listing = await data<{ entries: Array<{ path: string }> }>(
      await call("vfs/list", { commit: "main", prefix: "notes" }),
    );
    expect(listing.entries.map((e) => e.path).sort()).toEqual(["notes/a.md", "notes/b.md"]);
  });

  it("restores an old commit non-destructively", async () => {
    const log = await data<{ commits: Array<{ id: string }> }>(await call("vcs/log", {}));
    const root = log.commits.at(-1)!;

    const restore = await data<{ restored: string[] }>(
      await call("vcs/restore", { commit: root.id, path: "notes/a.md" }),
    );
    expect(restore.restored).toEqual(["notes/a.md"]);

    const current = await data<{ content: string }>(
      await call("vfs/read", { path: "notes/a.md" }),
    );
    expect(current.content).toBe("alpha");

    // Restore appended a version — history above it is intact.
    const commits = await data<CommitPayload>(await call("vcs/commit", { message: "restored" }));
    expect(commits.created).toBe(true);
    expect(commits.commit.stats).toMatchObject({ modified: 1 });
  });

  it("lists main in branches with its head", async () => {
    const branches = await data<{ refs: Array<{ name: string; commit: string }> }>(
      await call("vcs/branches", {}),
    );
    const main = branches.refs.find((ref) => ref.name === "main");
    expect(main).toBeTruthy();

    const log = await data<{ commits: Array<{ id: string }> }>(await call("vcs/log", {}));
    expect(main!.commit).toBe(log.commits[0]!.id);
  });
});
