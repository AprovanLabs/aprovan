/**
 * IW-9 doc stream 12 — integration verification.
 *
 * Proves: quiesce keeps vfs.read as plain Markdown within max-interval
 * staleness; compaction bounds durable size; anonymous GET /share/<key>
 * returns materialized Markdown only (iw9-b route, no Document-specific
 * share path).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { Hono } from "hono";
import * as Y from "yjs";
import { createApp } from "../src/app.js";
import {
  DOC_COMPACT,
  DOC_COMPACT_SIZE_BYTES,
  appendUpdate,
  compactIfDue,
} from "../src/doc/persistence.js";
import {
  clearQuiesceTimers,
  DOC_QUIESCE,
  DOC_QUIESCE_MAX_INTERVAL_MS,
  materialize,
  noteDocActivity,
} from "../src/doc/quiesce.js";
import {
  docKey,
  getOrLoadDoc,
  hasLiveDoc,
  releaseDoc,
} from "../src/doc/registry.js";
import { getFsStore, resetFsStore } from "../src/fs-store.js";
import { resetRecordStore } from "../src/records.js";
import { shareRouter } from "../src/routes/share.js";
import { resetWorkspaceConfig } from "../src/runtime/config.js";
import {
  deleteSvcRecord,
  deleteSvcScope,
  listSvcKeys,
  listSvcRecords,
  svcScope,
} from "../src/svc-records.js";
import { createLinkShare } from "../src/vfs/shares.js";

/** Same workspace createApp / tools use by default. */
const WS = "local";
const ALICE = "alice";

let dataDir: string;
let savedIdle: number;
let savedMax: number;
let savedCompactSize: number;
/** Paths with a live doc this test — released in afterEach. */
let touched: string[];

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-doc-integration-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  process.env["VFS_SHARE_SECRET"] = "test-doc-integration-share-secret";
  delete process.env["STORE_BACKEND"];
  resetWorkspaceConfig();
  resetFsStore();
  resetRecordStore();
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["VFS_SHARE_SECRET"];
  resetWorkspaceConfig();
  resetFsStore();
  resetRecordStore();
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  savedIdle = DOC_QUIESCE.IDLE_MS;
  savedMax = DOC_QUIESCE.MAX_INTERVAL_MS;
  savedCompactSize = DOC_COMPACT.SIZE_BYTES;
  touched = [];
  resetRecordStore();
});

afterEach(async () => {
  if (vi.isFakeTimers()) {
    vi.useRealTimers();
  }
  DOC_QUIESCE.IDLE_MS = savedIdle;
  DOC_QUIESCE.MAX_INTERVAL_MS = savedMax;
  DOC_COMPACT.SIZE_BYTES = savedCompactSize;
  for (const path of touched) {
    if (!hasLiveDoc(WS, path)) continue;
    const live = await getOrLoadDoc(WS, path);
    clearQuiesceTimers(live);
    await releaseDoc(docKey(WS, path));
  }
});

function shareApp(): Hono {
  const app = new Hono();
  app.route("/share", shareRouter);
  return app;
}

const call = (toolPath: string, args: Record<string, unknown> = {}) =>
  createApp().request(`/tools/${toolPath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

async function toolData<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T };
  return body.data;
}

async function loadLive(path: string, initial: string) {
  await getFsStore().write(WS, path, initial);
  touched.push(path);
  return getOrLoadDoc(WS, path);
}

function applyAndCapture(doc: Y.Doc, mutate: () => void): Uint8Array {
  const before = Y.encodeStateVector(doc);
  mutate();
  return Y.encodeStateAsUpdate(doc, before);
}

async function durableUpdateBytes(path: string): Promise<number> {
  const key = docKey(WS, path);
  const entries = await listSvcRecords<{ data: string }>(
    WS,
    svcScope("doc", "updates", key),
  );
  let total = 0;
  for (const entry of entries) {
    total += Buffer.from(entry.value.data, "base64").byteLength;
  }
  return total;
}

async function flushTimerCallbacks(): Promise<void> {
  await vi.advanceTimersByTimeAsync(0);
  await Promise.resolve();
  await Promise.resolve();
}

describe("doc integration — quiesce / vfs.read purity (12.1)", () => {
  it("idle quiesce then vfs.read returns plain Markdown with no session param", async () => {
    const path = "Apps/document/integration-idle.md";
    DOC_QUIESCE.IDLE_MS = 5_000;
    DOC_QUIESCE.MAX_INTERVAL_MS = DOC_QUIESCE_MAX_INTERVAL_MS;
    vi.useFakeTimers();

    const live = await loadLive(path, "# base\n");
    live.doc.getText("content").insert(0, "edited ");
    noteDocActivity(live, WS, path);

    // Pre-quiesce disk still has the seed — agents would see stale base.
    expect((await getFsStore().read(WS, path))?.content).toBe("# base\n");

    await vi.advanceTimersByTimeAsync(DOC_QUIESCE.IDLE_MS);
    await flushTimerCallbacks();

    // Agent path: vfs.read with only `path` — no session / live-doc hint.
    const res = await call("vfs/read", { path });
    expect(res.status).toBe(200);
    const file = await toolData<{ content: string }>(res);
    expect(file.content).toBe("edited # base\n");
    expect(file.content.includes("\0")).toBe(false);
    expect(Buffer.from(file.content, "utf8").toString("utf8")).toBe(file.content);

    const crdt = Y.encodeStateAsUpdate(live.doc);
    expect(Buffer.from(file.content, "utf8").equals(Buffer.from(crdt))).toBe(
      false,
    );
    clearQuiesceTimers(live);
  });

  it("continuous edits still bound vfs.read staleness within max interval", async () => {
    const path = "Apps/document/integration-continuous.md";
    // Idle never fires; max-interval is the staleness ceiling.
    DOC_QUIESCE.IDLE_MS = 60_000;
    DOC_QUIESCE.MAX_INTERVAL_MS = 3_000;
    expect(DOC_QUIESCE.MAX_INTERVAL_MS).toBeLessThanOrEqual(
      DOC_QUIESCE_MAX_INTERVAL_MS,
    );
    vi.useFakeTimers();

    const live = await loadLive(path, "# base\n");
    live.doc.getText("content").insert(0, "a");
    noteDocActivity(live, WS, path);

    for (let i = 0; i < 2; i++) {
      await vi.advanceTimersByTimeAsync(1_000);
      live.doc.getText("content").insert(0, "x");
      noteDocActivity(live, WS, path);
    }
    // Cross max-interval without idle firing (idle is 60s).
    await vi.advanceTimersByTimeAsync(1_500);
    await flushTimerCallbacks();

    const res = await call("vfs/read", { path });
    expect(res.status).toBe(200);
    const file = await toolData<{ content: string }>(res);
    expect(file.content).not.toBe("# base\n");
    expect(file.content.includes("x") || file.content.includes("a")).toBe(true);
    expect(file.content.includes("\0")).toBe(false);
    clearQuiesceTimers(live);
  });
});

describe("doc integration — compaction bounds size (12.2)", () => {
  it("past DOC_COMPACT_SIZE_BYTES shrinks log to snapshot-plus-bounded-tail", async () => {
    const path = `Apps/document/integration-compact-${crypto.randomUUID()}.md`;
    // Lower threshold for the test; name matches tech-plan constant.
    DOC_COMPACT.SIZE_BYTES = 64;
    expect(DOC_COMPACT_SIZE_BYTES).toBeGreaterThan(DOC_COMPACT.SIZE_BYTES);

    const live = await loadLive(path, "base content\n");
    for (let i = 0; i < 20; i += 1) {
      const update = applyAndCapture(live.doc, () => {
        live.doc.getText("content").insert(0, `u${i}-`);
      });
      await appendUpdate(WS, path, update);
    }
    const contentBefore = live.doc.getText("content").toString();
    const key = docKey(WS, path);
    const updateScope = svcScope("doc", "updates", key);

    const keysBefore = await listSvcKeys(WS, updateScope);
    expect(keysBefore.length).toBeGreaterThan(0);
    const bytesBefore = await durableUpdateBytes(path);
    expect(bytesBefore).toBeGreaterThanOrEqual(DOC_COMPACT.SIZE_BYTES);

    await compactIfDue(WS, path);

    const keysAfter = await listSvcKeys(WS, updateScope);
    expect(keysAfter.length).toBe(0);
    const bytesAfter = await durableUpdateBytes(path);
    expect(bytesAfter).toBe(0);
    expect(bytesAfter).toBeLessThan(bytesBefore);

    expect(live.doc.getText("content").toString()).toBe(contentBefore);

    clearQuiesceTimers(live);
    await releaseDoc(key);
    // releaseDoc removes from touched via hasLiveDoc check next — clean svc.
    const idx = touched.indexOf(path);
    if (idx >= 0) touched.splice(idx, 1);

    const reloaded = await getOrLoadDoc(WS, path);
    touched.push(path);
    expect(reloaded.doc.getText("content").toString()).toBe(contentBefore);
    clearQuiesceTimers(reloaded);

    await deleteSvcRecord(WS, svcScope("doc", "snapshot"), key);
    await deleteSvcScope(WS, updateScope);
  });
});

describe("doc integration — anonymous share mid-session (12.3)", () => {
  it("GET /share/<key> returns materialized Markdown only — no doc/awareness leak", async () => {
    const path = "Apps/document/integration-share.md";
    const seed = "# shared doc\n";
    const live = await loadLive(path, seed);

    // Simulate a live participant with awareness (cursors / identity).
    live.participants.add(ALICE);
    live.awareness.setLocalStateField("user", {
      name: ALICE,
      color: "#ff0000",
    });
    live.awareness.setLocalStateField("cursor", { anchor: 0, head: 4 });

    live.doc.getText("content").insert(0, "live-edit ");
    const materialized = live.doc.getText("content").toString();
    // Quiesce write — same path idle/max timers use; share reads FS only.
    await materialize(WS, path, live.doc);

    const { key } = await createLinkShare(WS, {
      path,
      expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
      createdBy: ALICE,
    });

    const anon = await shareApp().request(`/share/${key}`);
    expect(anon.status).toBe(200);
    const body = (await anon.json()) as Record<string, unknown>;

    expect(body["content"]).toBe(materialized);
    expect(body["content"]).not.toBe(seed);
    expect(typeof body["content"]).toBe("string");
    expect(String(body["content"]).includes("\0")).toBe(false);

    // Response shape is file metadata only — no live-session fields.
    const allowedKeys = new Set([
      "path",
      "content",
      "mimeType",
      "size",
      "hash",
      "updatedAt",
    ]);
    for (const k of Object.keys(body)) {
      expect(allowedKeys.has(k)).toBe(true);
    }
    expect(body).not.toHaveProperty("awareness");
    expect(body).not.toHaveProperty("participants");
    expect(body).not.toHaveProperty("kind");
    expect(body).not.toHaveProperty("session");
    expect(body).not.toHaveProperty("cursors");

    const serialized = JSON.stringify(body);
    expect(serialized).not.toMatch(/"kind":"awareness"/);
    expect(serialized).not.toMatch(/"kind":"sync"/);
    expect(serialized).not.toContain("doc:");
    expect(serialized).not.toContain("y-protocols");
    // Live participant identity must not appear as structured awareness payload.
    expect(serialized).not.toContain('"user"');
    expect(serialized).not.toContain('"cursor"');
    expect(serialized).not.toContain('"participants"');

    // Live doc still has awareness — share path did not clear it; isolation is
    // that the HTTP response never carries it.
    expect(live.awareness.getLocalState()?.["user"]).toEqual({
      name: ALICE,
      color: "#ff0000",
    });
    clearQuiesceTimers(live);
  });
});
