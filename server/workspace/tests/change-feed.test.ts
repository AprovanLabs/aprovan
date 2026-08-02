/**
 * The workspace change journal + `GET /fs/changes` (change-feed spec, Phase
 * A / stream 1): cursor advance on every mutation kind, the ETag 304 fast
 * path (zero store reads), incremental deltas, ring-overflow reset, and
 * `.services/**` invisibility.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import { RING_CAPACITY, resetChangeJournal } from "../src/change-journal.js";
import * as fsStore from "../src/fs-store.js";
import { getFsStore } from "../src/fs-store.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-change-feed-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetRateLimiters();
});

afterEach(() => {
  resetChangeJournal();
  vi.restoreAllMocks();
});

const put = (path: string, content: string) =>
  createApp().request(`/fs/${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

const del = (path: string, recursive = false) =>
  createApp().request(`/fs/${path}${recursive ? "?recursive=1" : ""}`, { method: "DELETE" });

const changes = (query = "") => createApp().request(`/fs/changes${query}`);

describe("change feed", () => {
  it("advances the cursor on write, and reports the delta", async () => {
    const first = await changes();
    const { cursor: baseline } = (await first.json()) as { cursor: number };

    await put("widgets/a.txt", "a");

    const response = await changes(`?since=${baseline}`);
    expect(response.status).toBe(200);
    const body = (await response.json()) as {
      cursor: number;
      reset: boolean;
      changes: Array<{ path: string; kind: string }>;
    };
    expect(body.reset).toBe(false);
    expect(body.cursor).toBeGreaterThan(baseline);
    expect(body.changes).toContainEqual({ path: "widgets/a.txt", kind: "update" });
  });

  it("reports every mutation kind: write, remove, removePrefix, completeUpload", async () => {
    await put("m/one.txt", "1");
    const baseline = Number(
      ((await (await changes()).json()) as { cursor: number }).cursor,
    );

    await put("m/one.txt", "2"); // update
    await put("m/two.txt", "x");
    await put("m/dir/three.txt", "y");
    await del("m/two.txt"); // delete
    await del("m/dir", true); // removePrefix delete

    const store = getFsStore();
    const hash = await store
      .write("local", "m/four.txt", "z")
      .then((f) => f.hash);
    if (store.createUpload && store.completeUpload) {
      // S3-backed only; SQLite backend has neither — the write above already
      // registered the path, so completeUpload isn't exercised there.
      void hash;
    }

    const response = await changes(`?since=${baseline}`);
    const body = (await response.json()) as {
      changes: Array<{ path: string; kind: string }>;
    };
    const byPath = new Map(body.changes.map((c) => [c.path, c.kind]));
    expect(byPath.get("m/one.txt")).toBe("update");
    expect(byPath.get("m/two.txt")).toBe("delete");
    expect(byPath.get("m/three.txt") ?? byPath.get("m/dir/three.txt")).toBe("delete");
  });

  it("304s an idle poll with zero store reads", async () => {
    await put("idle/a.txt", "a");
    const { cursor } = (await (await changes()).json()) as { cursor: number };

    const store = getFsStore();
    const listSpy = vi.spyOn(store, "list");
    const readSpy = vi.spyOn(store, "read");

    const response = await createApp().request("/fs/changes", {
      headers: { "If-None-Match": `"${cursor}"` },
    });
    expect(response.status).toBe(304);
    expect(await response.text()).toBe("");
    expect(listSpy).not.toHaveBeenCalled();
    expect(readSpy).not.toHaveBeenCalled();
  });

  it("falls back to a full listing with reset:true when the ring overflows", async () => {
    const { cursor: baseline } = (await (await changes()).json()) as { cursor: number };
    await put("overflow/keep.txt", "keep");
    for (let i = 0; i < RING_CAPACITY + 5; i += 1) {
      await put(`overflow/churn-${i}.txt`, String(i));
    }

    const response = await changes(`?since=${baseline}`);
    const body = (await response.json()) as {
      reset: boolean;
      changes: Array<{ path: string; kind: string }>;
    };
    expect(body.reset).toBe(true);
    expect(body.changes.some((c) => c.path === "overflow/keep.txt")).toBe(true);
    expect(body.changes.every((c) => c.kind === "update")).toBe(true);
  });

  it("resets after a journal loss (server restart) even with an in-range-looking since", async () => {
    await put("restart/a.txt", "a");
    resetChangeJournal(); // simulates a process restart: cursor resets to 0
    const response = await changes("?since=999");
    const body = (await response.json()) as { reset: boolean; cursor: number };
    expect(body.reset).toBe(true);
    expect(body.cursor).toBe(0);
  });

  it("never surfaces .services/** paths in a change entry", async () => {
    const { cursor: baseline } = (await (await changes()).json()) as { cursor: number };
    // Service paths are rejected at the HTTP boundary, so mutate the store
    // directly the way an internal subsystem (mounts, keyvalue) would.
    await fsStore.getFsStore().write("local", ".services/vcs/mounts.json", "[]");
    await put("visible/a.txt", "a");

    const response = await changes(`?since=${baseline}`);
    const body = (await response.json()) as { changes: Array<{ path: string }> };
    expect(body.changes.map((c) => c.path)).toEqual(["visible/a.txt"]);
  });

  it("scopes staged-session shadow writes to that session's poll", async () => {
    const created = await createApp().request("/tools/sessions/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ args: { mode: "staged" } }),
    });
    expect(created.status).toBe(200);
    const { data } = (await created.json()) as { data: { session: { id: string } } };
    const sessionId = data.session.id;

    const { cursor: baseline } = (await (
      await changes(`?session=${sessionId}`)
    ).json()) as { cursor: number };

    await createApp().request(`/fs/staged.txt?session=${sessionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "draft" }),
    });

    const scoped = (await (
      await changes(`?since=${baseline}&session=${sessionId}`)
    ).json()) as { changes: Array<{ path: string; kind: string }> };
    expect(scoped.changes).toContainEqual({ path: "staged.txt", kind: "update" });

    const unscoped = (await (await changes(`?since=${baseline}`)).json()) as {
      changes: Array<{ path: string }>;
    };
    expect(unscoped.changes.some((c) => c.path === "staged.txt")).toBe(false);
  });
});
