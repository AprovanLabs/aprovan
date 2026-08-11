/**
 * End-to-end coverage for iw9-f1 VCS scoping params (prefix/ref through the
 * real native dispatch path). Specs: vcs-scoped-commits, vcs-ref-enumeration,
 * vcs-diff-wire-fidelity. F6 owns the legacy suites — do not edit those.
 */

import { createHash } from "node:crypto";
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import {
  buildSnapshot,
  listRefs,
  readRef,
  readSnapshot,
  type VcsSnapshot,
} from "../src/vcs/store.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-vcs-scoping-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  process.env["GATEWAY_RATE_LIMIT_RPS"] = "1000";
  process.env["GATEWAY_RATE_LIMIT_BURST"] = "2000";
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["GATEWAY_RATE_LIMIT_RPS"];
  delete process.env["GATEWAY_RATE_LIMIT_BURST"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetRateLimiters();
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

const deleteFile = (path: string) =>
  createApp().request(`/fs/${path}`, { method: "DELETE" });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T };
  return body.data;
}

const sha = (content: string): string => createHash("sha256").update(content).digest("hex");

interface CommitPayload {
  commit: {
    id: string;
    snapshot: string;
    parents: string[];
    message: string;
    author: string;
  };
  created: boolean;
}

interface DiffPayload {
  from: string;
  to: string;
  added: Array<{ path: string; hash: string }>;
  modified: Array<{ path: string; from: string; to: string }>;
  removed: Array<{ path: string; hash: string }>;
}

// ---------------------------------------------------------------------------
// 4.2 — empty workspace must run before any commits land in dataDir
// ---------------------------------------------------------------------------

describe("vcs-ref-enumeration: empty workspace", () => {
  it("branches returns { branches: [] } when no refs exist", async () => {
    const branches = await data<{ branches: Array<{ name: string; commit: string }> }>(
      await call("vcs/branches", {}),
    );
    expect(branches).toEqual({ branches: [] });
  });
});

// ---------------------------------------------------------------------------
// 4.1 — scoped commit creation + snapshot identity
// ---------------------------------------------------------------------------

describe("vcs-scoped-commits", () => {
  it("default args reproduce legacy whole-workspace main advance", async () => {
    await putFile("notes/a.md", "alpha");
    await putFile("notes/b.md", "beta");

    const first = await data<CommitPayload>(
      await call("vcs/commit", { message: "first" }),
    );
    expect(first.created).toBe(true);
    expect(first.commit.parents).toEqual([]);
    expect(first.commit.message).toBe("first");

    const snap = (await readSnapshot("local", first.commit.snapshot)) as VcsSnapshot;
    expect(snap.prefix).toBe("");
    expect(snap.entries.map((e) => e.path).sort()).toEqual(["notes/a.md", "notes/b.md"]);

    const main = await readRef("local", "main");
    expect(main?.commit).toBe(first.commit.id);
  });

  it("scoped commit covers only the subtree and sets snapshot.prefix", async () => {
    await putFile("Apps/a/file.md", "app-a");
    await putFile("other/file.md", "other");

    const scoped = await data<CommitPayload>(
      await call("vcs/commit", { message: "scope a", prefix: "Apps/a" }),
    );
    expect(scoped.created).toBe(true);

    const snap = (await readSnapshot("local", scoped.commit.snapshot)) as VcsSnapshot;
    expect(snap.prefix).toBe("Apps/a");
    expect(snap.entries.map((e) => e.path)).toEqual(["Apps/a/file.md"]);
    expect(snap.entries.some((e) => e.path === "other/file.md")).toBe(false);
  });

  it("commit advances the named ref only, leaving main untouched", async () => {
    const mainBefore = await readRef("local", "main");
    expect(mainBefore).toBeTruthy();
    const mainHead = mainBefore!.commit;

    const named = await data<CommitPayload>(
      await call("vcs/commit", { message: "on app/x", ref: "app/x", prefix: "Apps/a" }),
    );
    expect(named.created).toBe(true);
    expect(named.commit.parents).toEqual([]); // fresh ref → root

    const appX = await readRef("local", "app/x");
    expect(appX?.commit).toBe(named.commit.id);

    const mainAfter = await readRef("local", "main");
    expect(mainAfter?.commit).toBe(mainHead);
  });

  it("invalid ref name is rejected with 400 and writes nothing", async () => {
    const refsBefore = (await listRefs("local")).map((r) => r.name).sort();
    const mainBefore = (await readRef("local", "main"))!.commit;

    const res = await call("vcs/commit", { message: "bad", ref: "NOT A REF" });
    expect(res.status).toBe(400);

    expect(await readRef("local", "NOT A REF")).toBeUndefined();
    expect((await readRef("local", "main"))?.commit).toBe(mainBefore);
    expect((await listRefs("local")).map((r) => r.name).sort()).toEqual(refsBefore);
  });

  it("identical content in different scopes does not collide", () => {
    const entries = [
      { path: "file.md", hash: sha("same"), mimeType: "text/plain", size: 4 },
    ];
    const a = buildSnapshot(entries, "Apps/a");
    const b = buildSnapshot(entries, "Apps/b");
    expect(a.id).not.toBe(b.id);
    expect(a.prefix).toBe("Apps/a");
    expect(b.prefix).toBe("Apps/b");
  });

  it("same scope and content is idempotent (created: false)", async () => {
    const first = await data<CommitPayload>(
      await call("vcs/commit", { message: "idem a", prefix: "Apps/a", ref: "app/idem" }),
    );
    expect(first.created).toBe(true);

    const again = await data<CommitPayload>(
      await call("vcs/commit", { message: "idem a again", prefix: "Apps/a", ref: "app/idem" }),
    );
    expect(again.created).toBe(false);
    expect(again.commit.id).toBe(first.commit.id);
  });

  it("whole-workspace ids match precomputed sha256 of sorted hash/path lines", () => {
    const entries = [
      { path: "z.md", hash: "bbbb", mimeType: "text/plain", size: 1 },
      { path: "a.md", hash: "aaaa", mimeType: "text/plain", size: 1 },
    ];
    const snap = buildSnapshot(entries, "");
    const expected = createHash("sha256")
      .update(["aaaa a.md", "bbbb z.md"].join("\n"))
      .digest("hex");
    expect(snap.id).toBe(expected);
    expect(snap.prefix).toBe("");
  });

  it("first commit on a new ref has no parents", async () => {
    await putFile("Apps/fresh/x.md", "fresh");
    const created = await data<CommitPayload>(
      await call("vcs/commit", {
        message: "fresh root",
        ref: "app/fresh",
        prefix: "Apps/fresh",
      }),
    );
    expect(created.created).toBe(true);
    expect(created.commit.parents).toEqual([]);
    expect((await readRef("local", "app/fresh"))?.commit).toBe(created.commit.id);
  });
});

// ---------------------------------------------------------------------------
// 4.2 — ref-scoped log + branch listing
// ---------------------------------------------------------------------------

describe("vcs-ref-enumeration", () => {
  it("log walks the requested ref and defaults to main", async () => {
    // Ensure main has at least one commit distinct from app/x.
    await putFile("notes/main-only.md", "main-line");
    const mainCommit = await data<CommitPayload>(
      await call("vcs/commit", { message: "main advance" }),
    );
    expect(mainCommit.created).toBe(true);

    const appLog = await data<{ commits: Array<{ id: string; message: string }> }>(
      await call("vcs/log", { ref: "app/x" }),
    );
    expect(appLog.commits.every((c) => c.id !== mainCommit.commit.id)).toBe(true);
    expect(appLog.commits.map((c) => c.id)).not.toContain(mainCommit.commit.id);

    const defaultLog = await data<{ commits: Array<{ id: string }> }>(
      await call("vcs/log", {}),
    );
    expect(defaultLog.commits[0]?.id).toBe(mainCommit.commit.id);

    const explicitMain = await data<{ commits: Array<{ id: string }> }>(
      await call("vcs/log", { ref: "main" }),
    );
    expect(explicitMain.commits.map((c) => c.id)).toEqual(
      defaultLog.commits.map((c) => c.id),
    );
  });

  it("unknown well-formed ref yields { commits: [] }", async () => {
    const log = await data<{ commits: unknown[] }>(
      await call("vcs/log", { ref: "app/missing" }),
    );
    expect(log).toEqual({ commits: [] });
  });

  it("branches enumerates main + session/* + app/* sorted by name", async () => {
    await putFile("session-scope/s.md", "session");
    const session = await data<CommitPayload>(
      await call("vcs/commit", {
        message: "session head",
        ref: "session/s1",
        prefix: "session-scope",
      }),
    );
    expect(session.created).toBe(true);

    const branches = await data<{ branches: Array<{ name: string; commit: string }> }>(
      await call("vcs/branches", {}),
    );
    const names = branches.branches.map((b) => b.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
    expect(names).toContain("main");
    expect(names).toContain("session/s1");
    expect(names).toContain("app/x");

    const byName = Object.fromEntries(branches.branches.map((b) => [b.name, b.commit]));
    expect(byName["session/s1"]).toBe(session.commit.id);
    expect(byName["app/x"]).toBe((await readRef("local", "app/x"))!.commit);
    expect(byName["main"]).toBe((await readRef("local", "main"))!.commit);
  });
});

// ---------------------------------------------------------------------------
// 4.3 — hash-bearing diff / show + prefix filter + discovery schemas
// ---------------------------------------------------------------------------

describe("vcs-diff-wire-fidelity", () => {
  let commitA: string;
  let commitB: string;
  const hOld = sha("old-content");
  const hNew = sha("new-file");
  const h1 = sha("version-one");
  const h2 = sha("version-two");
  const hApps = sha("apps-a-f");
  const hOther = sha("other-g");

  beforeAll(async () => {
    // Fresh tree for a clean A→B diff: start on a dedicated ref so main history
    // from earlier describes does not pollute parent chains.
    await putFile("diff/old.md", "old-content");
    await putFile("diff/file.md", "version-one");
    await putFile("Apps/a/f.md", "apps-a-f");
    await putFile("other/g.md", "other-g");

    const a = await data<CommitPayload>(
      await call("vcs/commit", { message: "diff-a", ref: "app/diff" }),
    );
    commitA = a.commit.id;

    await putFile("diff/file.md", "version-two");
    await putFile("diff/new.md", "new-file");
    await deleteFile("diff/old.md");
    await putFile("Apps/a/f.md", "apps-a-f-changed");
    await putFile("other/g.md", "other-g-changed");

    const b = await data<CommitPayload>(
      await call("vcs/commit", { message: "diff-b", ref: "app/diff" }),
    );
    commitB = b.commit.id;
  });

  it("diff and show expose hash-bearing added/modified/removed objects", async () => {
    const diff = await data<DiffPayload>(
      await call("vcs/diff", { from: commitA, to: commitB }),
    );
    expect(diff.modified.find((m) => m.path === "diff/file.md")).toEqual({
      path: "diff/file.md",
      from: h1,
      to: h2,
    });
    expect(diff.added).toContainEqual({ path: "diff/new.md", hash: hNew });
    expect(diff.removed).toContainEqual({ path: "diff/old.md", hash: hOld });

    const show = await data<{ changes: DiffPayload }>(
      await call("vcs/show", { commit: commitB }),
    );
    expect(show.changes.modified.find((m) => m.path === "diff/file.md")).toEqual({
      path: "diff/file.md",
      from: h1,
      to: h2,
    });
  });

  it("diff prefix filter scopes paths; omitting prefix returns the full diff", async () => {
    const filtered = await data<DiffPayload>(
      await call("vcs/diff", { from: commitA, to: commitB, prefix: "Apps/a" }),
    );
    const filteredPaths = [
      ...filtered.added.map((e) => e.path),
      ...filtered.modified.map((e) => e.path),
      ...filtered.removed.map((e) => e.path),
    ];
    expect(filteredPaths).toContain("Apps/a/f.md");
    expect(filteredPaths).not.toContain("other/g.md");
    expect(filteredPaths).not.toContain("diff/file.md");

    const unfiltered = await data<DiffPayload>(
      await call("vcs/diff", { from: commitA, to: commitB }),
    );
    const paths = [
      ...unfiltered.added.map((e) => e.path),
      ...unfiltered.modified.map((e) => e.path),
      ...unfiltered.removed.map((e) => e.path),
    ];
    expect(paths).toEqual(expect.arrayContaining([
      "Apps/a/f.md",
      "other/g.md",
      "diff/file.md",
      "diff/new.md",
      "diff/old.md",
    ]));
    expect(unfiltered.modified.find((m) => m.path === "Apps/a/f.md")?.from).toBe(hApps);
    expect(unfiltered.modified.find((m) => m.path === "other/g.md")?.from).toBe(hOther);
  });

  it("discovery schemas advertise prefix/ref and object-shaped diff entries", async () => {
    const res = await createApp().request("/tools");
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      tools: Array<{
        name: string;
        operation: string;
        inputSchema?: {
          properties?: Record<string, unknown>;
        };
        outputSchema?: {
          properties?: Record<string, { items?: { properties?: Record<string, unknown> } }>;
        };
      }>;
    };

    const byOp = Object.fromEntries(
      body.tools.filter((t) => t.name.startsWith("vcs.")).map((t) => [t.operation, t]),
    );

    expect(byOp["commit"]?.inputSchema?.properties).toHaveProperty("prefix");
    expect(byOp["commit"]?.inputSchema?.properties).toHaveProperty("ref");
    expect(byOp["log"]?.inputSchema?.properties).toHaveProperty("ref");
    expect(byOp["diff"]?.inputSchema?.properties).toHaveProperty("prefix");

    const diffAdded = byOp["diff"]?.outputSchema?.properties?.["added"]?.items?.properties;
    expect(diffAdded).toMatchObject({ path: { type: "string" }, hash: { type: "string" } });
    const diffMod = byOp["diff"]?.outputSchema?.properties?.["modified"]?.items?.properties;
    expect(diffMod).toMatchObject({
      path: { type: "string" },
      from: { type: "string" },
      to: { type: "string" },
    });

    const showChanges = byOp["show"]?.outputSchema?.properties?.["changes"] as
      | {
          properties?: {
            modified?: { items?: { properties?: Record<string, unknown> } };
          };
        }
      | undefined;
    expect(showChanges?.properties?.modified?.items?.properties).toMatchObject({
      path: { type: "string" },
      from: { type: "string" },
      to: { type: "string" },
    });
  });
});

// ---------------------------------------------------------------------------
// 4.4 — MIGRATION-DEBT grep gates
// ---------------------------------------------------------------------------

describe("definition-of-done grep gates", () => {
  const repoRoot = join(import.meta.dirname, "../../..");

  it("listRefs has a non-test caller outside vcs/store.ts", () => {
    const out = execSync(
      "grep -rn 'listRefs' server/workspace/src --include='*.ts' | grep -v vcs/store.ts || true",
      { cwd: repoRoot, encoding: "utf8" },
    ).trim();
    expect(out.length).toBeGreaterThan(0);
    expect(out).toMatch(/native-dispatch\.ts/);
  });

  it('no readRef(workspaceId, "main") remains in native-dispatch.ts', () => {
    const out = execSync(
      `grep -n 'readRef(workspaceId, "main")' server/workspace/src/native-dispatch.ts || true`,
      { cwd: repoRoot, encoding: "utf8" },
    ).trim();
    expect(out).toBe("");
  });
});
