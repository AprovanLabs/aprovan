/**
 * Quiesce materialization — idle / max-interval → plain Markdown on disk (D5).
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
import * as Y from "yjs";
import {
  docKey,
  getOrLoadDoc,
  hasLiveDoc,
  releaseDoc,
} from "../src/doc/registry.js";
import {
  clearQuiesceTimers,
  DOC_QUIESCE,
  materialize,
  materializeAndFlush,
  noteDocActivity,
} from "../src/doc/quiesce.js";
import { getFsStore, resetFsStore } from "../src/fs-store.js";
import { resetRecordStore } from "../src/records.js";
import { resetWorkspaceConfig } from "../src/runtime/config.js";

const WS = "ws-doc-quiesce";

let dataDir: string;
let savedIdle: number;
let savedMax: number;
/** Paths touched this test — released in afterEach. */
let touched: string[];

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-doc-quiesce-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  delete process.env["STORE_BACKEND"];
  resetWorkspaceConfig();
  resetFsStore();
  resetRecordStore();
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  resetWorkspaceConfig();
  resetFsStore();
  resetRecordStore();
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  savedIdle = DOC_QUIESCE.IDLE_MS;
  savedMax = DOC_QUIESCE.MAX_INTERVAL_MS;
  touched = [];
  resetRecordStore();
});

afterEach(async () => {
  if (vi.isFakeTimers()) {
    vi.useRealTimers();
  }
  DOC_QUIESCE.IDLE_MS = savedIdle;
  DOC_QUIESCE.MAX_INTERVAL_MS = savedMax;
  for (const path of touched) {
    if (!hasLiveDoc(WS, path)) continue;
    const live = await getOrLoadDoc(WS, path);
    clearQuiesceTimers(live);
    await releaseDoc(docKey(WS, path));
  }
});

async function loadLive(path: string, initial: string) {
  await getFsStore().write(WS, path, initial);
  touched.push(path);
  return getOrLoadDoc(WS, path);
}

describe("doc quiesce", () => {
  it("idle quiesce writes the file as plain Markdown", async () => {
    const path = "notes/idle.md";
    DOC_QUIESCE.IDLE_MS = 5_000;
    DOC_QUIESCE.MAX_INTERVAL_MS = 60_000;
    vi.useFakeTimers();

    const live = await loadLive(path, "# base\n");
    live.doc.getText("content").insert(0, "edited ");
    noteDocActivity(live, WS, path);

    expect((await getFsStore().read(WS, path))?.content).toBe("# base\n");

    await vi.advanceTimersByTimeAsync(5_000);
    // Allow the timer's async materializeAndFlush to finish.
    await vi.advanceTimersByTimeAsync(0);
    await Promise.resolve();
    await Promise.resolve();

    const after = await getFsStore().read(WS, path);
    expect(after?.content).toBe("edited # base\n");
    expect(after!.content.includes("\0")).toBe(false);
    expect(Buffer.from(after!.content, "utf8").toString("utf8")).toBe(after!.content);
    clearQuiesceTimers(live);
  });

  it("continuous typing still bounds staleness within the max interval", async () => {
    const path = "notes/continuous.md";
    DOC_QUIESCE.IDLE_MS = 10_000;
    DOC_QUIESCE.MAX_INTERVAL_MS = 3_000;
    vi.useFakeTimers();

    const live = await loadLive(path, "# base\n");
    live.doc.getText("content").insert(0, "a");
    noteDocActivity(live, WS, path);

    // Simulate continuous edits that keep resetting the idle timer.
    for (let i = 0; i < 2; i++) {
      await vi.advanceTimersByTimeAsync(1_000);
      live.doc.getText("content").insert(0, "x");
      noteDocActivity(live, WS, path);
    }
    // Cross the max-interval boundary without letting idle fire (idle is 10s).
    await vi.advanceTimersByTimeAsync(1_500);
    await Promise.resolve();
    await Promise.resolve();

    const file = await getFsStore().read(WS, path);
    expect(file?.content).not.toBe("# base\n");
    expect(file!.content.includes("x") || file!.content.includes("a")).toBe(true);
    clearQuiesceTimers(live);
  });

  it("agent mid-session vfs.read sees plain Markdown, never CRDT bytes", async () => {
    const path = "notes/agent-read.md";
    const live = await loadLive(path, "# base\n");
    live.doc.getText("content").delete(0, live.doc.getText("content").length);
    live.doc.getText("content").insert(0, "## Heading\n\nPlain body.\n");
    // Direct materialize — same write path the idle timer uses.
    await materialize(WS, path, live.doc);

    const file = await getFsStore().read(WS, path);
    expect(file).toBeDefined();
    expect(file!.content).toBe("## Heading\n\nPlain body.\n");
    const roundTrip = Buffer.from(file!.content, "utf8").toString("utf8");
    expect(roundTrip).toBe(file!.content);
    expect(file!.content.includes("\u0000")).toBe(false);
    expect(file!.content.startsWith("##")).toBe(true);
    // Live CRDT bytes must not appear on the FS path agents read.
    const encoded = Y.encodeStateAsUpdate(live.doc);
    expect(Buffer.from(file!.content, "utf8").equals(Buffer.from(encoded))).toBe(
      false,
    );
    clearQuiesceTimers(live);
  });

  it("materialize writes content without a session or commit side-effect", async () => {
    const path = "notes/direct-materialize.md";
    await getFsStore().write(WS, path, "# base\n");
    const doc = new Y.Doc();
    doc.getText("content").insert(0, "direct\n");
    await materialize(WS, path, doc);
    const file = await getFsStore().read(WS, path);
    expect(file?.content).toBe("direct\n");
    doc.destroy();
  });

  it("releaseDoc materializes before dropping the live entry", async () => {
    const path = "notes/release.md";
    const live = await loadLive(path, "# base\n");
    clearQuiesceTimers(live);
    live.doc.getText("content").insert(0, "final ");
    const expected = live.doc.getText("content").toString();
    await releaseDoc(docKey(WS, path));
    expect(hasLiveDoc(WS, path)).toBe(false);
    const file = await getFsStore().read(WS, path);
    expect(file?.content).toBe(expected);
  });

  it("materializeAndFlush keeps post-quiesce cold load content-identical", async () => {
    const path = "notes/flush-roundtrip.md";
    const live = await loadLive(path, "# base\n");
    clearQuiesceTimers(live);
    live.doc.getText("content").insert(0, "kept ");
    const expected = live.doc.getText("content").toString();
    await materializeAndFlush(WS, path, live.doc);
    await releaseDoc(docKey(WS, path));

    const reloaded = await getOrLoadDoc(WS, path);
    touched.push(path);
    expect(reloaded.doc.getText("content").toString()).toBe(expected);
    clearQuiesceTimers(reloaded);
  });
});
