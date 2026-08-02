/**
 * Git repo mount sources (`source: "github:owner/repo[#ref[/sub/path]]"`) and
 * workspace default mounts.
 *
 * Three layers, mirroring where the behavior lives:
 *
 *   - parsing — `parseMounts` stays the single validation point, so the
 *     syntax cases are asserted straight against it;
 *   - the snapshot rung — a vendor-driver sandbox (the sandboxes.test.ts
 *     fake) materializes a repo mount through the GitHub tree API, stubbed
 *     with a local HTTP server behind `GITHUB_API_URL`, exactly as the image
 *     CDN is stubbed elsewhere;
 *   - the clone rung — a machine-host sandbox materializes the same mount as
 *     one `cloneRepo` op over the relay, asserted by *being* the host agent
 *     (the sandbox-scheduling.test.ts pattern) and checking the op carries
 *     repo, ref, and the workspace's GitHub token.
 */

import { createHash } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { resetProviderCache, setProviderModuleForTesting } from "../src/isolate.js";
import { parseMounts, parseRepoSource } from "../src/sandboxes/mounts.js";

let dataDir: string;

// -----------------------------------------------------------------------------
// A stand-in GitHub API: the tree and contents endpoints the read path uses.
// -----------------------------------------------------------------------------

const REPO_FILES: Record<string, string> = {
  "SKILL.md": "Always be kind.\n",
  "review/SKILL.md": "Ask for tests.\n",
};

let githubServer: { url: string; close: () => Promise<void> };

async function startGithubStub(): Promise<typeof githubServer> {
  const { createServer } = await import("node:http");
  const server = createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://stub");
    const json = (status: number, body: unknown): void => {
      res.writeHead(status, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
    };
    if (/^\/repos\/acme\/skills\/git\/trees\//u.test(url.pathname)) {
      json(200, {
        tree: Object.entries(REPO_FILES).map(([path, content]) => ({
          path,
          type: "blob",
          sha: `blob-${path}`,
          size: content.length,
        })),
      });
      return;
    }
    const contents = /^\/repos\/acme\/skills\/contents\/(.+)$/u.exec(url.pathname);
    if (contents) {
      const path = decodeURIComponent(contents[1]!);
      const body = REPO_FILES[path];
      if (body === undefined) {
        json(404, { message: "Not Found" });
        return;
      }
      json(200, {
        content: Buffer.from(body, "utf8").toString("base64"),
        encoding: "base64",
        sha: `blob-${path}`,
        size: body.length,
      });
      return;
    }
    json(404, { message: "Not Found" });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = (server.address() as { port: number }).port;
  return {
    url: `http://127.0.0.1:${port}`,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
}

// -----------------------------------------------------------------------------
// The vendor-driver fake (sandboxes.test.ts), for the snapshot rung.
// -----------------------------------------------------------------------------

const sha = (content: string): string => createHash("sha256").update(content).digest("hex");

/** `<sandboxId>:<path>` → content. */
const boxes = new Map<string, string>();
let created = 0;

function installFakeDriver(): void {
  setProviderModuleForTesting("fly/sprites", {
    createFlySpritesClient: async () => ({
      capabilities: { persist: true, hashes: true },
      create: async () => ({
        id: `sbx-${++created}`,
        status: "running",
        workdir: "/work",
        createdAt: new Date().toISOString(),
      }),
      get: async ({ id }: { id: string }) => ({ id, status: "running", workdir: "/work" }),
      list: async () => [],
      destroy: async () => ({ destroyed: true }),
      exec: async () => ({ exitCode: 0, stdout: "", stderr: "", durationMs: 1, truncated: false }),
      writeFile: async ({ id, path, content }: { id: string; path: string; content: string }) => {
        boxes.set(`${id}:${path}`, content);
        return { path, hash: sha(content), size: content.length };
      },
      readFile: async ({ id, path }: { id: string; path: string }) => {
        const content = boxes.get(`${id}:${path}`);
        if (content === undefined) throw new Error(`no such file: ${path}`);
        return { path, content, encoding: "utf8", hash: sha(content), size: content.length };
      },
      deleteFile: async ({ id, path }: { id: string; path: string }) => ({
        deleted: boxes.delete(`${id}:${path}`),
      }),
      listFiles: async ({ id, path }: { id: string; path?: string }) => {
        const prefix = `${id}:${path ? `${path}/` : ""}`;
        return [...boxes.entries()]
          .filter(([entry]) => entry.startsWith(prefix))
          .map(([entry, content]) => ({
            path: entry.slice(`${id}:`.length),
            hash: sha(content),
            size: content.length,
          }));
      },
    }),
  });
}

// -----------------------------------------------------------------------------

beforeAll(async () => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-repo-mounts-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  process.env["GATEWAY_RATE_LIMIT_RPS"] = "1000";
  process.env["GATEWAY_RATE_LIMIT_BURST"] = "2000";
  githubServer = await startGithubStub();
  process.env["GITHUB_API_URL"] = githubServer.url;
});

afterAll(async () => {
  await githubServer.close();
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["GATEWAY_RATE_LIMIT_RPS"];
  delete process.env["GATEWAY_RATE_LIMIT_BURST"];
  delete process.env["GITHUB_API_URL"];
  resetProviderCache();
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  boxes.clear();
  installFakeDriver();
});

const call = (path: string, args: Record<string, unknown> = {}) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data?: T; error?: string };
  if (body.error) throw new Error(body.error);
  return body.data as T;
}

const saveCredential = (provider: string, token: string) =>
  createApp().request("/credentials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider, payload: { type: "bearer_token", token } }),
  });

interface SandboxSummary {
  id: string;
  externalId: string;
  provider: string;
  mounts: Array<{
    path: string;
    source: string | null;
    kind: string;
    mode: string;
    track: boolean;
    files: number;
  }>;
}

// -----------------------------------------------------------------------------
// Parsing — parseMounts is the single validation point.
// -----------------------------------------------------------------------------

describe("repo mount parsing", () => {
  it("parses the three source shapes", () => {
    expect(parseRepoSource("github:acme/skills")).toEqual({
      provider: "github",
      repo: "acme/skills",
    });
    expect(parseRepoSource("github:acme/skills#v1.2")).toEqual({
      provider: "github",
      repo: "acme/skills",
      ref: "v1.2",
    });
    expect(parseRepoSource("github:acme/skills#main/packs/review")).toEqual({
      provider: "github",
      repo: "acme/skills",
      ref: "main",
      path: "packs/review",
    });
  });

  it("rejects malformed specs", () => {
    for (const bad of ["github:", "github:acme", "github:acme/skills#ref/../up"]) {
      expect(() => parseRepoSource(bad)).toThrow(/repo mount/u);
    }
  });

  it("yields an untracked repo-kind mount, absolute target paths normalized", () => {
    const [mount] = parseMounts(
      [{ path: "/skills", source: "github:acme/skills#main" }],
      undefined,
    );
    expect(mount).toMatchObject({
      path: "skills",
      source: "github:acme/skills#main",
      kind: "repo",
      repo: { provider: "github", repo: "acme/skills", ref: "main" },
      track: false,
    });
  });

  it("does not subject repo sources to workspace path grants", () => {
    // A grant list that covers only docs/ still admits a repo mount — repo
    // reach is bounded by the GitHub credential, not by VFS prefixes...
    const grants = { paths: [{ prefix: "docs/", access: "ro" as const }] };
    expect(() =>
      parseMounts([{ path: "skills", source: "github:acme/skills" }], grants),
    ).not.toThrow();
    // ...while a workspace source outside the grant still fails.
    expect(() => parseMounts([{ path: "app", source: "apps/x" }], grants)).toThrow(/denies/u);
  });
});

// -----------------------------------------------------------------------------
// Snapshot rung — vendor driver, tree API.
// -----------------------------------------------------------------------------

describe("repo mounts on a vendor sandbox (tree-API snapshot)", () => {
  it("materializes the repo read-only and diffs cleanly", async () => {
    expect((await saveCredential("github", "gh-secret")).status).toBeLessThan(300);
    await call("interfaces/bind", { interface: "sandbox", provider: "fly/sprites" });

    const sandbox = await data<SandboxSummary>(
      await call("sandboxes/create", {
        name: "skills-box",
        mounts: [{ path: "/skills", source: "github:acme/skills#main" }],
      }),
    );
    expect(sandbox.mounts).toEqual([
      expect.objectContaining({
        path: "skills",
        source: "github:acme/skills#main",
        kind: "repo",
        track: false,
        files: 2,
      }),
    ]);

    // The bytes landed inside the box, at the mount path.
    const read = await data<{ content: string }>(
      await call("sandboxes/read", { id: sandbox.id, path: "skills/review/SKILL.md" }),
    );
    expect(read.content).toBe("Ask for tests.\n");

    // A fresh snapshot has changed nothing: base and live manifests agree,
    // which proves the snapshot's sha256 base lines up with driver hashes.
    const tree = await data<{ changes: Array<Record<string, unknown>> }>(
      await call("sandboxes/tree", { id: sandbox.id }),
    );
    expect(tree.changes[0]).toMatchObject({
      mount: "skills",
      kind: "repo",
      added: [],
      modified: [],
      removed: [],
    });

    // Repo mounts never commit back through the workspace.
    const commit = await call("sandboxes/commit", { id: sandbox.id });
    expect(commit.status).toBe(400);
    expect(((await commit.json()) as { error: string }).error).toMatch(/no writable/u);
  });
});

// -----------------------------------------------------------------------------
// Defaults — set once, applied to creates unless overridden.
// -----------------------------------------------------------------------------

describe("default workspace mounts", () => {
  it("round-trips through setDefaults/getDefaults", async () => {
    const set = await data<{ mounts: Array<Record<string, unknown>> }>(
      await call("sandboxes/setDefaults", {
        mounts: [{ path: "/skills", source: "github:acme/skills", mode: "ro" }],
      }),
    );
    expect(set.mounts).toEqual([
      { path: "skills", source: "github:acme/skills", mode: "ro" },
    ]);
    const got = await data<{ mounts: Array<Record<string, unknown>> }>(
      await call("sandboxes/getDefaults", {}),
    );
    expect(got.mounts).toEqual(set.mounts);
  });

  it("applies defaults to a new sandbox and lets explicit mounts win", async () => {
    await call("interfaces/bind", { interface: "sandbox", provider: "fly/sprites" });
    await call("sandboxes/setDefaults", {
      mounts: [{ path: "skills", source: "github:acme/skills", mode: "ro" }],
    });

    // No mounts named: the default rides along.
    const defaulted = await data<SandboxSummary>(await call("sandboxes/create", {}));
    expect(defaulted.mounts).toEqual([
      expect.objectContaining({ path: "skills", kind: "repo", files: 2 }),
    ]);

    // The same path named explicitly: the caller's declaration wins.
    const overridden = await data<SandboxSummary>(
      await call("sandboxes/create", { mounts: [{ path: "skills" }] }),
    );
    expect(overridden.mounts).toEqual([
      expect.objectContaining({ path: "skills", source: null, files: 0 }),
    ]);

    await call("sandboxes/setDefaults", { mounts: [] });
  });

  it("does not surface defaults.json as a sandbox in list", async () => {
    await call("sandboxes/setDefaults", {
      mounts: [{ path: "skills", source: "github:acme/skills", mode: "ro" }],
    });
    const listed = await data<{ sandboxes: Array<{ id?: string }> }>(
      await call("sandboxes/list", {}),
    );
    for (const box of listed.sandboxes) expect(typeof box.id).toBe("string");
    await call("sandboxes/setDefaults", { mounts: [] });
  });

  it("rejects garbage at set time", async () => {
    const res = await call("sandboxes/setDefaults", {
      mounts: [{ path: "skills", source: "github:not-a-spec" }],
    });
    expect(res.status).toBe(400);
  });
});

// -----------------------------------------------------------------------------
// Clone rung — machine host, one cloneRepo op over the relay.
// -----------------------------------------------------------------------------

interface Registered {
  host: { id: string };
  hostToken: string;
  clientToken: string;
  relayUrl: string;
}

const asAgent = (host: Registered, path: string, body: unknown = {}) =>
  createApp().request(`${host.relayUrl}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${host.hostToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

interface LeasedOp {
  id: string;
  op: string;
  args: Record<string, unknown>;
}

describe("repo mounts on a machine host (git clone)", () => {
  it("dispatches cloneRepo with repo, ref, and the stored GitHub token", async () => {
    expect((await saveCredential("github", "gh-secret")).status).toBeLessThan(300);
    const registered = await data<Registered>(
      await call("sandboxes/registerHost", { name: "desk", root: "/tmp/aprovan-work" }),
    );
    // The CLI's registration flow: the client token becomes the machine
    // credential, and the sandbox interface binds to the machine provider.
    expect((await saveCredential("machine", registered.clientToken)).status).toBeLessThan(300);
    await call("interfaces/bind", { interface: "sandbox", provider: "machine" });

    const seen: LeasedOp[] = [];
    let done = false;
    const createRequest = (async () => {
      const sandbox = await data<SandboxSummary>(
        await call("sandboxes/create", {
          name: "clone-box",
          mounts: [{ path: "repo", source: "github:acme/skills#main" }],
        }),
      );
      done = true;
      return sandbox;
    })();

    // Be the host agent: lease and answer until the create call settles.
    const hostLoop = (async () => {
      while (!done) {
        const leased = (await (await asAgent(registered, "lease", { maxWaitMs: 500 })).json()) as {
          ops?: LeasedOp[];
        };
        for (const op of leased.ops ?? []) {
          seen.push(op);
          let answer: unknown;
          if (op.op === "create") {
            answer = {
              id: "sbx-m1",
              status: "running",
              workdir: "/tmp/aprovan-work/sbx-m1",
              createdAt: new Date().toISOString(),
            };
          } else if (op.op === "cloneRepo") {
            answer = {
              path: op.args["path"],
              files: [
                {
                  path: "SKILL.md",
                  hash: sha(REPO_FILES["SKILL.md"]!),
                  size: REPO_FILES["SKILL.md"]!.length,
                  updatedAt: new Date().toISOString(),
                },
              ],
            };
          } else {
            answer = { ok: true };
          }
          await asAgent(registered, "result", { id: op.id, data: answer });
        }
      }
    })();

    const sandbox = await createRequest;
    await hostLoop;

    const clone = seen.find((op) => op.op === "cloneRepo");
    expect(clone).toBeDefined();
    expect(clone!.args).toMatchObject({
      id: "sbx-m1",
      path: "repo",
      repo: "acme/skills",
      ref: "main",
      token: "gh-secret",
    });

    // The clone's manifest became the mount's base.
    expect(sandbox.provider).toBe("machine");
    expect(sandbox.mounts).toEqual([
      expect.objectContaining({ path: "repo", kind: "repo", track: false, files: 1 }),
    ]);

    await call("sandboxes/revokeHost", { id: registered.host.id });
    // Later suites in this workspace expect the vendor binding again.
    await call("interfaces/bind", { interface: "sandbox", provider: "fly/sprites" });
  });
});
