/**
 * The `sandboxes` service end to end, against a fake driver.
 *
 * What is worth testing here is not the driver — that is a provider's problem
 * — but the workspace half: that mounting materializes the right files, that
 * change detection is a hash diff and reads nothing, and above all that
 * commit *routes* correctly. A sandbox bound to a draft chat must leave the
 * live tree untouched; an unbound one must land on `main` with a commit.
 *
 * The fake is installed through the isolate's provider cache, so calls travel
 * the real path: `sandboxes.exec` → the `sandbox` interface → the bound
 * provider → the executor.
 */

import { createHash } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { resetProviderCache, setProviderModuleForTesting } from "../src/isolate.js";

let dataDir: string;

// -----------------------------------------------------------------------------
// A fake sandbox host: an in-memory filesystem with real content hashes.
// -----------------------------------------------------------------------------

const sha = (content: string): string => createHash("sha256").update(content).digest("hex");

/** `<sandboxId>:<path>` → content. */
const boxes = new Map<string, string>();
let created = 0;
let lastExec: { command: string; cwd?: string } | undefined;
let lastListTimeout: number | undefined;

function key(id: string, path: string): string {
  return `${id}:${path}`;
}

function installFakeHost(): void {
  // Bound to a *vendor* provider on purpose: the `machine` provider talks to
  // the in-process relay rather than the isolate, so it could never exercise
  // the interface → module → driver path this fake stands in for. The
  // machine path gets its own suite below, driven by a fake agent.
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
      exec: async (args: { command: string; cwd?: string }) => {
        lastExec = args;
        return { exitCode: 0, stdout: "ok", stderr: "", durationMs: 1, truncated: false };
      },
      writeFile: async ({ id, path, content }: { id: string; path: string; content: string }) => {
        boxes.set(key(id, path), content);
        return { path, hash: sha(content), size: content.length };
      },
      readFile: async ({ id, path }: { id: string; path: string }) => {
        const content = boxes.get(key(id, path));
        if (content === undefined) throw new Error(`no such file: ${path}`);
        return { path, content, encoding: "utf8", hash: sha(content), size: content.length };
      },
      deleteFile: async ({ id, path }: { id: string; path: string }) => ({
        deleted: boxes.delete(key(id, path)),
      }),
      listFiles: async ({
        id,
        path,
        timeoutMs,
      }: {
        id: string;
        path?: string;
        timeoutMs?: number;
      }) => {
        lastListTimeout = timeoutMs;
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

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-sandboxes-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  // Every case here is a burst of tool calls from one "user"; the default
  // 10rps/20burst gate would fail the suite for reasons that have nothing to
  // do with sandboxes.
  process.env["GATEWAY_RATE_LIMIT_RPS"] = "1000";
  process.env["GATEWAY_RATE_LIMIT_BURST"] = "2000";
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["GATEWAY_RATE_LIMIT_RPS"];
  delete process.env["GATEWAY_RATE_LIMIT_BURST"];
  resetProviderCache();
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  boxes.clear();
  lastExec = undefined;
  lastListTimeout = undefined;
  installFakeHost();
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

async function bindFakeHost(): Promise<void> {
  await call("interfaces/bind", { interface: "sandbox", provider: "fly/sprites" });
}

interface SandboxSummary {
  id: string;
  externalId: string;
  provider: string;
  mounts: Array<{ path: string; source: string | null; files: number }>;
}

interface Changes {
  changes: Array<{ mount: string; added: string[]; modified: string[]; removed: string[] }>;
}

// -----------------------------------------------------------------------------

describe("sandboxes", () => {
  it("materializes a mounted prefix into the sandbox", async () => {
    await bindFakeHost();
    await putFile("apps/demo/index.ts", "export const a = 1;\n");
    await putFile("apps/demo/lib/util.ts", "export const b = 2;\n");

    const sandbox = await data<SandboxSummary>(
      await call("sandboxes/create", {
        name: "demo",
        mounts: [{ path: "app", source: "apps/demo", mode: "rw" }],
      }),
    );

    expect(sandbox.provider).toBe("fly/sprites");
    expect(sandbox.mounts).toEqual([
      expect.objectContaining({ path: "app", source: "apps/demo", files: 2 }),
    ]);
    expect(boxes.get(key(sandbox.externalId, "app/index.ts"))).toBe("export const a = 1;\n");
    expect(boxes.get(key(sandbox.externalId, "app/lib/util.ts"))).toBe("export const b = 2;\n");
  });

  it("reports added, modified and removed files as a hash diff", async () => {
    await bindFakeHost();
    await putFile("apps/diff/index.ts", "one\n");
    await putFile("apps/diff/keep.ts", "keep\n");
    const sandbox = await data<SandboxSummary>(
      await call("sandboxes/create", { mounts: [{ path: "app", source: "apps/diff" }] }),
    );

    // A fresh sandbox has changed nothing.
    const clean = await data<Changes>(await call("sandboxes/tree", { id: sandbox.id }));
    expect(clean.changes[0]).toMatchObject({ added: [], modified: [], removed: [] });

    // Work happens inside the box.
    boxes.set(key(sandbox.externalId, "app/index.ts"), "two\n");
    boxes.set(key(sandbox.externalId, "app/new.ts"), "new\n");
    boxes.delete(key(sandbox.externalId, "app/keep.ts"));

    const dirty = await data<Changes>(await call("sandboxes/tree", { id: sandbox.id }));
    expect(dirty.changes[0]).toMatchObject({
      added: ["new.ts"],
      modified: ["index.ts"],
      removed: ["keep.ts"],
    });
  });

  it("commits changes to the workspace and advances main", async () => {
    await bindFakeHost();
    await putFile("apps/commit/index.ts", "before\n");
    const sandbox = await data<SandboxSummary>(
      await call("sandboxes/create", { mounts: [{ path: "app", source: "apps/commit" }] }),
    );

    boxes.set(key(sandbox.externalId, "app/index.ts"), "after\n");
    boxes.set(key(sandbox.externalId, "app/added.ts"), "added\n");

    const result = await data<{
      written: string[];
      conflicts: string[];
      commit?: { id: string };
    }>(await call("sandboxes/commit", { id: sandbox.id, message: "from the sandbox" }));

    expect(result.written.sort()).toEqual(["apps/commit/added.ts", "apps/commit/index.ts"]);
    expect(result.conflicts).toEqual([]);
    expect(result.commit?.id).toMatch(/^[0-9a-f]{64}$/u);

    const file = await data<{ content: string }>(
      await call("vfs/read", { path: "apps/commit/index.ts" }),
    );
    expect(file.content).toBe("after\n");

    // Committing twice is a no-op: the mount's base advanced with the writes.
    const again = await data<{ written: string[] }>(
      await call("sandboxes/commit", { id: sandbox.id }),
    );
    expect(again.written).toEqual([]);
  });

  it("leaves paths the workspace also changed as conflicts", async () => {
    await bindFakeHost();
    await putFile("apps/conflict/index.ts", "base\n");
    const sandbox = await data<SandboxSummary>(
      await call("sandboxes/create", { mounts: [{ path: "app", source: "apps/conflict" }] }),
    );

    // Both sides move, differently.
    boxes.set(key(sandbox.externalId, "app/index.ts"), "sandbox\n");
    await putFile("apps/conflict/index.ts", "workspace\n");

    const result = await data<{ written: string[]; conflicts: string[] }>(
      await call("sandboxes/commit", { id: sandbox.id }),
    );
    expect(result.written).toEqual([]);
    expect(result.conflicts).toEqual(["apps/conflict/index.ts"]);

    const file = await data<{ content: string }>(
      await call("vfs/read", { path: "apps/conflict/index.ts" }),
    );
    expect(file.content).toBe("workspace\n");
  });

  it("commits into a draft chat's changes and leaves the live tree alone", async () => {
    await bindFakeHost();
    await putFile("apps/draft/index.ts", "live\n");
    const { session } = await data<{ session: { id: string } }>(
      await call("sessions/create", { title: "sandbox work", mode: "staged" }),
    );
    const sandbox = await data<SandboxSummary>(
      await call("sandboxes/create", {
        mounts: [{ path: "app", source: "apps/draft" }],
        session: session.id,
      }),
    );

    boxes.set(key(sandbox.externalId, "app/index.ts"), "drafted\n");
    const result = await data<{ written: string[]; session?: string; commit?: unknown }>(
      await call("sandboxes/commit", { id: sandbox.id }),
    );

    expect(result.written).toEqual(["apps/draft/index.ts"]);
    expect(result.session).toBe(session.id);
    // A draft keeps its changes until a human applies them — advancing main
    // here would be exactly the unreviewed write the draft exists to prevent.
    expect(result.commit).toBeUndefined();

    const live = await data<{ content: string }>(
      await call("vfs/read", { path: "apps/draft/index.ts" }),
    );
    expect(live.content).toBe("live\n");

    const staged = await data<{ content: string }>(
      await call("vfs/read", { path: "apps/draft/index.ts", session: session.id }),
    );
    expect(staged.content).toBe("drafted\n");
  });

  it("refuses an auto chat, which would write straight through unreviewed", async () => {
    await bindFakeHost();
    const { session } = await data<{ session: { id: string } }>(
      await call("sessions/create", { title: "auto" }),
    );
    const response = await call("sandboxes/create", {
      mounts: [{ path: "app", source: "apps/demo" }],
      session: session.id,
    });
    expect(response.status).toBe(400);
    expect(((await response.json()) as { error: string }).error).toMatch(/draft chat/u);
  });

  it("never mounts service state", async () => {
    await bindFakeHost();
    const response = await call("sandboxes/create", {
      mounts: [{ path: "svc", source: ".services/apps" }],
    });
    expect(response.status).toBe(400);
  });

  it("keeps scratch mounts out of the workspace entirely", async () => {
    await bindFakeHost();
    const sandbox = await data<SandboxSummary>(
      await call("sandboxes/create", { mounts: [{ path: "tmp" }] }),
    );
    boxes.set(key(sandbox.externalId, "tmp/build.log"), "noise\n");

    const changes = await data<Changes>(await call("sandboxes/tree", { id: sandbox.id }));
    expect(changes.changes[0]).toMatchObject({ mount: "tmp", source: null, scratch: true });

    const response = await call("sandboxes/commit", { id: sandbox.id });
    expect(response.status).toBe(400);
  });

  /**
   * The UI asks every sandbox what has changed when its panel opens, and the
   * default host deadline is sized for a build. Without a caller-supplied
   * deadline an asleep host holds that row for two minutes.
   */
  it("passes a caller deadline through to the driver's listing", async () => {
    await bindFakeHost();
    await putFile("apps/poll/index.ts", "x\n");
    const sandbox = await data<SandboxSummary>(
      await call("sandboxes/create", { mounts: [{ path: "app", source: "apps/poll" }] }),
    );

    await call("sandboxes/tree", { id: sandbox.id });
    expect(lastListTimeout).toBeUndefined();

    await call("sandboxes/tree", { id: sandbox.id, timeoutMs: 15_000 });
    expect(lastListTimeout).toBe(15_000);
  });

  it("proxies exec through the bound driver", async () => {
    await bindFakeHost();
    const sandbox = await data<SandboxSummary>(await call("sandboxes/create", {}));
    const result = await data<{ exitCode: number; stdout: string }>(
      await call("sandboxes/exec", { id: sandbox.id, command: "pnpm test", cwd: "app" }),
    );
    expect(result).toMatchObject({ exitCode: 0, stdout: "ok" });
    expect(lastExec).toMatchObject({ command: "pnpm test", cwd: "app" });
  });

  it("re-materializes a mount on sync, discarding sandbox-side edits", async () => {
    await bindFakeHost();
    await putFile("apps/sync/index.ts", "canonical\n");
    const sandbox = await data<SandboxSummary>(
      await call("sandboxes/create", { mounts: [{ path: "app", source: "apps/sync" }] }),
    );
    boxes.set(key(sandbox.externalId, "app/index.ts"), "scribbled\n");

    await call("sandboxes/sync", { id: sandbox.id, mount: "app" });
    expect(boxes.get(key(sandbox.externalId, "app/index.ts"))).toBe("canonical\n");

    const changes = await data<Changes>(await call("sandboxes/tree", { id: sandbox.id }));
    expect(changes.changes[0]).toMatchObject({ added: [], modified: [], removed: [] });
  });

  it("marks a destroyed sandbox gone rather than silently recreating it", async () => {
    await bindFakeHost();
    const sandbox = await data<SandboxSummary>(await call("sandboxes/create", {}));
    await call("sandboxes/destroy", { id: sandbox.id });
    const response = await call("sandboxes/exec", { id: sandbox.id, command: "ls" });
    expect(response.status).toBe(410);
  });
});

describe("sandbox hosts", () => {
  it("mints a token pair once and never returns the digests", async () => {
    const registered = await data<{
      host: Record<string, unknown>;
      hostToken: string;
      clientToken: string;
      relayUrl: string;
    }>(await call("sandboxes/registerHost", { name: "laptop", root: "/tmp/work" }));

    expect(registered.hostToken).toMatch(/^sbht_/u);
    expect(registered.clientToken).toMatch(/^sbhc_/u);
    expect(registered.hostToken).not.toBe(registered.clientToken);
    expect(registered.relayUrl).toContain("/sandbox-hosts/");
    expect(registered.host).not.toHaveProperty("hostTokenHash");

    const listed = await data<{ hosts: Array<Record<string, unknown>> }>(
      await call("sandboxes/hosts", {}),
    );
    expect(listed.hosts.some((host) => host["name"] === "laptop")).toBe(true);
    expect(listed.hosts.every((host) => !("clientTokenHash" in host))).toBe(true);
  });

  it("separates the two principals: a client token cannot lease work", async () => {
    const registered = await data<{ hostToken: string; clientToken: string; relayUrl: string }>(
      await call("sandboxes/registerHost", { name: "principals" }),
    );

    const lease = (token: string) =>
      createApp().request(`${registered.relayUrl}/lease`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        // Answer immediately instead of parking for the full long-poll.
        body: JSON.stringify({ maxWaitMs: 50 }),
      });

    expect((await lease(registered.clientToken)).status).toBe(401);
    // The host token is accepted; with nothing queued it answers empty.
    const ok = await lease(registered.hostToken);
    expect(ok.status).toBe(200);
    expect((await ok.json()) as { ops: unknown[] }).toMatchObject({ ops: [] });
  });

  it("rejects an unknown host and a bad token alike", async () => {
    const response = await createApp().request("/sandbox-hosts/local/sbh_missing/lease", {
      method: "POST",
      headers: { Authorization: "Bearer nope", "Content-Type": "application/json" },
      body: JSON.stringify({ maxWaitMs: 50 }),
    });
    expect(response.status).toBe(401);
  });
});
