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
    // Native wire omits stats (F1); change counts live on the store record.
    const { readCommit } = await import("../src/vcs/store.js");
    const stored = await readCommit("local", first.commit.id);
    expect(stored?.stats.added).toBeGreaterThanOrEqual(2);

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
    const { readCommit } = await import("../src/vcs/store.js");
    const stored = await readCommit("local", second.commit.id);
    expect(stored?.stats).toMatchObject({ modified: 1, removed: 0 });

    const log = await data<{ commits: Array<{ message: string }> }>(
      await call("vcs/log", {}),
    );
    expect(log.commits.map((c) => c.message)).toEqual(["edit a", "first"]);
  });

  it("never snapshots service state or hidden partitions", async () => {
    const show = await data<{ files: string[] }>(
      await call("vcs/show", { commit: "main" }),
    );
    expect(show.files.some((p) => p.startsWith(".services/"))).toBe(false);
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
    const { readCommit } = await import("../src/vcs/store.js");
    const stored = await readCommit("local", commits.commit.id);
    expect(stored?.stats).toMatchObject({ modified: 1 });
  });

  it("lists main in branches with its head", async () => {
    const branches = await data<{ branches: Array<{ name: string; commit: string }> }>(
      await call("vcs/branches", {}),
    );
    const main = branches.branches.find((ref) => ref.name === "main");
    expect(main).toBeTruthy();

    const log = await data<{ commits: Array<{ id: string }> }>(await call("vcs/log", {}));
    expect(main!.commit).toBe(log.commits[0]!.id);
  });
});

// ---------------------------------------------------------------------------
// IW-9 A stream 1: app-scoped commits, tags, distinct snapshot ids
// ---------------------------------------------------------------------------

describe("app-scoped commits", () => {
  it("lands on app/<id>, leaves main untouched, and salts snapshot ids by prefix", async () => {
    const { commitTree, listRefs, readCommit, readRef, readSnapshot, writeTag, moveChannel, tagRefName, channelRefName, appRefName } =
      await import("../src/vcs/store.js");

    await putFile("apps/alpha/index.tsx", "export default () => 'a';");
    await putFile("apps/beta/index.tsx", "export default () => 'a';"); // identical content
    await putFile("notes/outside.md", "workspace");

    const mainBefore = await commitTree("local", { message: "workspace base", author: "alice" });
    const mainIdBefore = mainBefore.commit.id;

    const alpha = await commitTree("local", {
      message: "alpha v1",
      author: "alice",
      prefix: "apps/alpha",
      ref: appRefName("01ALPHAAPP0000000000000000"),
    });
    expect(alpha.created).toBe(true);
    expect(alpha.commit.prefix).toBe("apps/alpha");

    const beta = await commitTree("local", {
      message: "beta v1",
      author: "alice",
      prefix: "apps/beta",
      ref: appRefName("01BETAAPP00000000000000000"),
    });
    expect(beta.created).toBe(true);
    // Identical subtree bytes under different prefixes → distinct snapshot ids.
    expect(beta.commit.snapshot).not.toBe(alpha.commit.snapshot);

    const mainRef = await readRef("local", "main");
    expect(mainRef?.commit).toBe(mainIdBefore);

    const alphaSnap = await readSnapshot("local", alpha.commit.snapshot);
    expect(alphaSnap?.entries.every((e) => e.path.startsWith("apps/alpha"))).toBe(true);
    expect(alphaSnap?.entries.some((e) => e.path === "notes/outside.md")).toBe(false);

    // Scoped restore cannot write outside the app root.
    await putFile("apps/alpha/index.tsx", "export default () => 'changed';");
    await putFile("notes/outside.md", "tampered");
    const { restoreCommit } = await import("../src/vcs/store.js");
    const restored = await restoreCommit("local", alpha.commit, { prefix: "apps/alpha" });
    expect(restored.restored).toContain("apps/alpha/index.tsx");
    expect(restored.restored.some((p) => p.startsWith("notes/"))).toBe(false);
    const outside = await (
      await createApp().request("/fs/notes/outside.md")
    ).json() as { content: string };
    expect(outside.content).toBe("tampered");

    // Branches lists main + app refs.
    const refs = await listRefs("local");
    const names = refs.map((r) => r.name);
    expect(names).toContain("main");
    expect(names).toContain(appRefName("01ALPHAAPP0000000000000000"));
    expect(names).toContain(appRefName("01BETAAPP00000000000000000"));

    // Tags/channels over the ref machinery.
    const tagName = tagRefName("01ALPHAAPP0000000000000000", "rel1");
    await writeTag("local", tagName, alpha.commit.id, "alice");
    await expect(writeTag("local", tagName, alpha.commit.id, "alice")).rejects.toThrow(/already exists/);
    const channelName = channelRefName("01ALPHAAPP0000000000000000", "live");
    await moveChannel("local", channelName, alpha.commit.id, "alice");
    await moveChannel("local", channelName, beta.commit.id, "alice"); // movable
    const tagRefs = await listRefs("local", "tag/app/01ALPHAAPP0000000000000000");
    expect(tagRefs.map((r) => r.name)).toEqual([tagName]);
    const channel = await readRef("local", channelName);
    expect(channel?.commit).toBe(beta.commit.id);

    // Scope mapping via native dispatch.
    await putFile("apps/gamma/index.tsx", "export const g = 1;");
    await putFile(
      "apps/gamma/app.yaml",
      "title: Gamma\n",
    );
    const published = await data<{ appId: string; root: string }>(
      await call("apps/publish", {
        name: "gamma",
        dir: "apps/gamma",
        allowed_tools: ["vfs.*"],
      }),
    );
    const scoped = await data<CommitPayload>(
      await call("vcs/commit", {
        message: "scoped via scope",
        scope: { app: published.appId },
      }),
    );
    expect(scoped.created).toBe(true);
    const scopedCommit = await readCommit("local", scoped.commit.id);
    expect(scopedCommit?.prefix).toBe("apps/gamma");
    const appHead = await readRef("local", appRefName(published.appId));
    expect(appHead?.commit).toBe(scoped.commit.id);
    // main still at whatever it was after the restore/workspace edits — not the app commit.
    const mainAfter = await readRef("local", "main");
    expect(mainAfter?.commit).not.toBe(scoped.commit.id);
  });
});
