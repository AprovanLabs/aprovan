/**
 * The bashkit provider end to end — no fakes anywhere.
 *
 * `sandboxes.test.ts` proves the workspace half (mounts, diff, commit
 * routing) over a fake driver; this file proves the whole column over the
 * real one: `sandboxes.*` → the `sandbox` interface → the isolate's dynamic
 * import of `@aprovan/sandbox-bashkit` → a real bash interpreter in WASM.
 * Every exec here actually runs; every manifest hash is computed from real
 * file bodies on both sides.
 *
 * The second suite is the north-star flow from docs/sandboxes.md, with a
 * public Git repo as the payload: fetch the tree over the GitHub REST API
 * (no credential — the repo arrives via HTTP and mounts, not `git clone`;
 * the WASM box has no git and no network by design), land it in the
 * workspace VFS, mount it into a bashkit sandbox, do real shell work over
 * it, and commit the generated artifacts back. Network-dependent cases skip
 * — never fail — when the API is unreachable, following the utdk-e2e
 * convention that a missing prerequisite is a skip with a reason.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { resolveInterfaceForWorkspace } from "../src/interfaces.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-sbx-bashkit-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  // Bursts of tool calls from one "user"; the default rate gate would fail
  // the suite for reasons that have nothing to do with sandboxes.
  process.env["GATEWAY_RATE_LIMIT_RPS"] = "1000";
  process.env["GATEWAY_RATE_LIMIT_BURST"] = "2000";
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["GATEWAY_RATE_LIMIT_RPS"];
  delete process.env["GATEWAY_RATE_LIMIT_BURST"];
  rmSync(dataDir, { recursive: true, force: true });
});

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

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
  const body = (await res.json()) as { data?: T; error?: string };
  if (body.error) throw new Error(body.error);
  return body.data as T;
}

interface SandboxSummary {
  id: string;
  externalId: string;
  provider: string;
  workdir: string;
  mounts: Array<{ path: string; source: string | null; files: number }>;
}

interface Changes {
  changes: Array<{
    mount: string;
    added: string[];
    modified: string[];
    removed: string[];
  }>;
}

interface CommitResult {
  written: string[];
  removed: string[];
  conflicts: string[];
  commit?: { id: string };
}

// -----------------------------------------------------------------------------

describe("bashkit through sandboxes.*", () => {
  it("wins the zero-config fallback: no binding, no credential, still resolves", async () => {
    const resolved = await resolveInterfaceForWorkspace("local", "sandbox");
    expect(resolved.bound).toBe(false);
    expect(resolved.compat.provider).toBe("bashkit");
    expect(resolved.compat.moduleSpecifier).toBe("@aprovan/sandbox-bashkit");
    expect(resolved.compat.credentialless).toBe(true);
  });

  it("binds, mounts, and materializes workspace files into the interpreter", async () => {
    await call("interfaces/bind", { interface: "sandbox", provider: "bashkit" });
    await putFile("apps/wasm-demo/index.ts", "export const a = 1;\n");
    await putFile("apps/wasm-demo/lib/util.ts", "export const b = 2;\n");

    const sandbox = await data<SandboxSummary>(
      await call("sandboxes/create", {
        name: "wasm-demo",
        mounts: [{ path: "app", source: "apps/wasm-demo", mode: "rw" }],
      }),
    );
    expect(sandbox.provider).toBe("bashkit");
    expect(sandbox.mounts).toEqual([
      expect.objectContaining({ path: "app", source: "apps/wasm-demo", files: 2 }),
    ]);

    // The proof the bytes landed: the shell inside the box reads them back.
    const cat = await data<{ exitCode: number; stdout: string }>(
      await call("sandboxes/exec", { id: sandbox.id, command: "cat app/index.ts" }),
    );
    expect(cat).toMatchObject({ exitCode: 0, stdout: "export const a = 1;\n" });
  });

  it("runs a build command and round-trips the diff through commit", async () => {
    await call("interfaces/bind", { interface: "sandbox", provider: "bashkit" });
    await putFile("apps/wasm-build/src/a.txt", "alpha\n");
    await putFile("apps/wasm-build/src/b.txt", "beta\n");
    const sandbox = await data<SandboxSummary>(
      await call("sandboxes/create", {
        mounts: [{ path: "app", source: "apps/wasm-build" }],
      }),
    );

    // A fresh sandbox has changed nothing — the hash manifests agree.
    const clean = await data<Changes>(await call("sandboxes/tree", { id: sandbox.id }));
    expect(clean.changes[0]).toMatchObject({ added: [], modified: [], removed: [] });

    // The "build": concatenate the sources into a dist artifact, uppercase
    // one file in place, and drop the other — added, modified, and removed
    // in one pass, all from real shell commands.
    const build = await data<{ exitCode: number; stderr: string }>(
      await call("sandboxes/exec", {
        id: sandbox.id,
        command:
          "mkdir -p dist && cat src/a.txt src/b.txt > dist/bundle.txt" +
          " && tr a-z A-Z < src/a.txt > src/a.txt.up && mv src/a.txt.up src/a.txt" +
          " && rm src/b.txt",
        cwd: "app",
      }),
    );
    expect(build.exitCode).toBe(0);

    const dirty = await data<Changes>(await call("sandboxes/tree", { id: sandbox.id }));
    expect(dirty.changes[0]).toMatchObject({
      added: ["dist/bundle.txt"],
      modified: ["src/a.txt"],
      removed: ["src/b.txt"],
    });

    const committed = await data<CommitResult>(
      await call("sandboxes/commit", { id: sandbox.id, message: "wasm build" }),
    );
    expect(committed.written.sort()).toEqual([
      "apps/wasm-build/dist/bundle.txt",
      "apps/wasm-build/src/a.txt",
    ]);
    expect(committed.removed).toEqual(["apps/wasm-build/src/b.txt"]);
    expect(committed.conflicts).toEqual([]);
    expect(committed.commit?.id).toMatch(/^[0-9a-f]{64}$/u);

    const bundle = await data<{ content: string }>(
      await call("vfs/read", { path: "apps/wasm-build/dist/bundle.txt" }),
    );
    expect(bundle.content).toBe("alpha\nbeta\n");
    const upper = await data<{ content: string }>(
      await call("vfs/read", { path: "apps/wasm-build/src/a.txt" }),
    );
    expect(upper.content).toBe("ALPHA\n");

    // The base advanced with the commit, so committing again moves nothing.
    const again = await data<CommitResult>(await call("sandboxes/commit", { id: sandbox.id }));
    expect(again.written).toEqual([]);
    expect(again.removed).toEqual([]);
  });

  it("proxies read and write through the driver's virtual filesystem", async () => {
    await call("interfaces/bind", { interface: "sandbox", provider: "bashkit" });
    const sandbox = await data<SandboxSummary>(
      await call("sandboxes/create", { mounts: [{ path: "tmp" }] }),
    );

    await data(
      await call("sandboxes/write", {
        id: sandbox.id,
        path: "tmp/notes.txt",
        content: "written from outside\n",
      }),
    );
    const echoed = await data<{ exitCode: number; stdout: string }>(
      await call("sandboxes/exec", { id: sandbox.id, command: "cat tmp/notes.txt" }),
    );
    expect(echoed.stdout).toBe("written from outside\n");

    const read = await data<{ content: string; encoding: string }>(
      await call("sandboxes/read", { id: sandbox.id, path: "tmp/notes.txt" }),
    );
    expect(read).toMatchObject({ content: "written from outside\n", encoding: "utf8" });
  });

  it("destroys the interpreter with the record", async () => {
    await call("interfaces/bind", { interface: "sandbox", provider: "bashkit" });
    const sandbox = await data<SandboxSummary>(await call("sandboxes/create", {}));
    await data(await call("sandboxes/destroy", { id: sandbox.id }));
    const response = await call("sandboxes/exec", { id: sandbox.id, command: "ls" });
    expect(response.status).toBe(410);
  });
});

// -----------------------------------------------------------------------------
// The north-star flow: a Git repo, mounted, built, committed back.
// -----------------------------------------------------------------------------

const REPO = "JacobSampson/jacobsampson.github.io";
const MOUNT_SOURCE = "vendor/jacobsampson-site";

/** Text formats worth carrying into a text-only VFS. */
const TEXT_EXTENSIONS = /\.(html?|md|markdown|css|js|json|txt|xml|ya?ml|svg)$/iu;

/** Stay far under the 5,000-file mount cap and the API's patience. */
const MAX_REPO_FILES = 25;
const MAX_REPO_FILE_BYTES = 100_000;

interface RepoFile {
  path: string;
  content: string;
}

/**
 * Fetch a slice of the repo over the GitHub REST API — the tree listing, then
 * raw bodies for a capped set of small text files. Returns `undefined` for
 * anything that should skip the suite (offline, rate-limited) rather than
 * fail it: an unauthenticated caller gets 60 requests an hour, and a CI box
 * without egress gets none.
 */
async function fetchRepoSlice(): Promise<RepoFile[] | string> {
  const headers = { Accept: "application/vnd.github+json" };
  let tree: { tree?: Array<{ path: string; type: string; size?: number }> };
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO}/git/trees/HEAD?recursive=1`,
      { headers, signal: AbortSignal.timeout(15_000) },
    );
    if (response.status === 403 || response.status === 429) {
      return `GitHub API rate-limited (${response.status})`;
    }
    if (!response.ok) return `GitHub API answered ${response.status}`;
    tree = (await response.json()) as typeof tree;
  } catch (err) {
    return `GitHub unreachable: ${err instanceof Error ? err.message : String(err)}`;
  }

  const picks = (tree.tree ?? [])
    .filter(
      (entry) =>
        entry.type === "blob" &&
        TEXT_EXTENSIONS.test(entry.path) &&
        (entry.size ?? 0) > 0 &&
        (entry.size ?? 0) < MAX_REPO_FILE_BYTES &&
        !entry.path.split("/").some((segment) => segment.startsWith(".")),
    )
    .sort((a, b) => a.path.localeCompare(b.path))
    .slice(0, MAX_REPO_FILES);
  if (picks.length === 0) return "repo tree held no small text files";

  const files: RepoFile[] = [];
  for (const pick of picks) {
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/${REPO}/HEAD/${pick.path}`,
        { signal: AbortSignal.timeout(15_000) },
      );
      if (!response.ok) return `raw fetch of ${pick.path} answered ${response.status}`;
      files.push({ path: pick.path, content: await response.text() });
    } catch (err) {
      return `raw fetch failed: ${err instanceof Error ? err.message : String(err)}`;
    }
  }
  return files;
}

describe("git repo in a bashkit sandbox", () => {
  it(
    "fetches the repo, mounts it, builds over it, and commits the artifacts",
    { timeout: 120_000 },
    async (ctx) => {
      const slice = await fetchRepoSlice();
      if (typeof slice === "string") {
        ctx.skip(`network prerequisite missing: ${slice}`);
        return;
      }

      // The repo lands in the workspace VFS first — that is the design: the
      // sandbox mounts workspace paths, it does not reach the network itself.
      for (const file of slice) {
        const saved = await putFile(`${MOUNT_SOURCE}/${file.path}`, file.content);
        expect(saved.status).toBeLessThan(300);
      }

      await call("interfaces/bind", { interface: "sandbox", provider: "bashkit" });
      const sandbox = await data<SandboxSummary>(
        await call("sandboxes/create", {
          name: "site-build",
          mounts: [{ path: "site", source: MOUNT_SOURCE, mode: "rw" }],
        }),
      );
      expect(sandbox.provider).toBe("bashkit");
      expect(sandbox.mounts[0]).toMatchObject({ source: MOUNT_SOURCE, files: slice.length });

      // Real shell work over the checkout: the listing agrees with what was
      // fetched, and grep runs over actual repo bodies.
      const listing = await data<{ exitCode: number; stdout: string }>(
        await call("sandboxes/exec", {
          id: sandbox.id,
          command: "find . -type f | sort",
          cwd: "site",
        }),
      );
      expect(listing.exitCode).toBe(0);
      const listed = listing.stdout
        .split("\n")
        .filter(Boolean)
        .map((line) => line.replace(/^\.\//u, ""));
      expect(listed.sort()).toEqual(slice.map((file) => file.path).sort());

      const grep = await data<{ exitCode: number; stdout: string }>(
        await call("sandboxes/exec", {
          id: sandbox.id,
          command: "grep -ril . . | wc -l",
          cwd: "site",
        }),
      );
      expect(grep.exitCode).toBe(0);
      expect(Number(grep.stdout.trim())).toBeGreaterThan(0);

      // The "build": generate a manifest index and a concatenated size
      // report — the text-transformation shape this provider exists for.
      const build = await data<{ exitCode: number; stderr: string }>(
        await call("sandboxes/exec", {
          id: sandbox.id,
          command:
            "find . -type f ! -name MANIFEST.txt | sort | sed 's|^\\./||' > MANIFEST.txt" +
            " && wc -c $(cat MANIFEST.txt) > SIZES.txt",
          cwd: "site",
        }),
      );
      expect(build.exitCode).toBe(0);

      const dirty = await data<Changes>(await call("sandboxes/tree", { id: sandbox.id }));
      expect(dirty.changes[0]).toMatchObject({
        added: ["MANIFEST.txt", "SIZES.txt"],
        modified: [],
        removed: [],
      });

      const committed = await data<CommitResult>(
        await call("sandboxes/commit", { id: sandbox.id, message: "site index" }),
      );
      expect(committed.written.sort()).toEqual([
        `${MOUNT_SOURCE}/MANIFEST.txt`,
        `${MOUNT_SOURCE}/SIZES.txt`,
      ]);
      expect(committed.conflicts).toEqual([]);
      expect(committed.commit?.id).toMatch(/^[0-9a-f]{64}$/u);

      // The artifact in the workspace names every mounted repo file.
      const manifest = await data<{ content: string }>(
        await call("vfs/read", { path: `${MOUNT_SOURCE}/MANIFEST.txt` }),
      );
      const manifested = manifest.content.split("\n").filter(Boolean);
      expect(manifested.sort()).toEqual(slice.map((file) => file.path).sort());

      await call("sandboxes/destroy", { id: sandbox.id });
    },
  );
});
