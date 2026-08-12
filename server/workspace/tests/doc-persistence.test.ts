/**
 * Durable doc persistence — snapshot + update log, compaction, restore.
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
  DOC_COMPACT,
  appendUpdate,
  compactIfDue,
  loadDurable,
} from "../src/doc/persistence.js";
import { docKey, getOrLoadDoc, hasLiveDoc, releaseDoc } from "../src/doc/registry.js";
import { getFsStore, resetFsStore } from "../src/fs-store.js";
import { resetRecordStore } from "../src/records.js";
import { resetWorkspaceConfig } from "../src/runtime/config.js";
import {
  deleteSvcRecord,
  deleteSvcScope,
  listSvcKeys,
  listSvcRecords,
  svcScope,
} from "../src/svc-records.js";

const WS = "ws-doc-persist";

let dataDir: string;
let PATH: string;
let savedSize: number;
let savedAge: number;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-doc-persist-"));
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

beforeEach(async () => {
  savedSize = DOC_COMPACT.SIZE_BYTES;
  savedAge = DOC_COMPACT.AGE_MS;
  PATH = `docs/readme-${crypto.randomUUID()}.md`;
  await getFsStore().write(WS, PATH, "base content\n");
});

afterEach(async () => {
  DOC_COMPACT.SIZE_BYTES = savedSize;
  DOC_COMPACT.AGE_MS = savedAge;
  vi.useRealTimers();
  if (hasLiveDoc(WS, PATH)) await releaseDoc(docKey(WS, PATH));
  const key = docKey(WS, PATH);
  await deleteSvcRecord(WS, svcScope("doc", "snapshot"), key);
  await deleteSvcScope(WS, svcScope("doc", "updates", key));
});

function applyAndCapture(doc: Y.Doc, mutate: () => void): Uint8Array {
  const before = Y.encodeStateVector(doc);
  mutate();
  return Y.encodeStateAsUpdate(doc, before);
}

describe("document persistence", () => {
  it("first open of an existing file initializes from content without changing the file", async () => {
    const before = await getFsStore().read(WS, PATH);
    expect(before?.content).toBe("base content\n");

    const doc = await loadDurable(WS, PATH);
    expect(doc.getText("content").toString()).toBe("base content\n");
    doc.destroy();

    const after = await getFsStore().read(WS, PATH);
    expect(after?.content).toBe("base content\n");
    expect(after?.hash).toBe(before?.hash);
  });

  it("restart reconstructs the doc from snapshot + update log", async () => {
    const live = await getOrLoadDoc(WS, PATH);
    const update = applyAndCapture(live.doc, () => {
      live.doc.getText("content").insert(0, "edited ");
    });
    await appendUpdate(WS, PATH, update);
    expect(live.doc.getText("content").toString()).toBe("edited base content\n");

    await releaseDoc(docKey(WS, PATH));
    expect(hasLiveDoc(WS, PATH)).toBe(false);

    const reloaded = await getOrLoadDoc(WS, PATH);
    expect(reloaded.doc.getText("content").toString()).toBe("edited base content\n");
  });

  it("long-lived doc stays bounded — size-triggered compaction preserves content", async () => {
    DOC_COMPACT.SIZE_BYTES = 64;

    const live = await getOrLoadDoc(WS, PATH);
    for (let i = 0; i < 20; i += 1) {
      const update = applyAndCapture(live.doc, () => {
        live.doc.getText("content").insert(0, `u${i}-`);
      });
      await appendUpdate(WS, PATH, update);
    }
    const contentBeforeCompact = live.doc.getText("content").toString();

    const key = docKey(WS, PATH);
    const updateScope = svcScope("doc", "updates", key);
    const keysBefore = await listSvcKeys(WS, updateScope);
    expect(keysBefore.length).toBeGreaterThan(0);

    await compactIfDue(WS, PATH);

    const keysAfter = await listSvcKeys(WS, updateScope);
    expect(keysAfter.length).toBe(0);

    expect(live.doc.getText("content").toString()).toBe(contentBeforeCompact);
    await releaseDoc(key);
    const reconstructed = await loadDurable(WS, PATH);
    expect(reconstructed.getText("content").toString()).toBe(contentBeforeCompact);
    reconstructed.destroy();
  });

  it("idle doc compacts by age when size threshold is never reached", async () => {
    DOC_COMPACT.SIZE_BYTES = 1024 * 1024;
    DOC_COMPACT.AGE_MS = 1_000;

    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T00:00:00.000Z"));

    const live = await getOrLoadDoc(WS, PATH);
    const update = applyAndCapture(live.doc, () => {
      live.doc.getText("content").insert(0, "aged ");
    });
    await appendUpdate(WS, PATH, update);
    const content = live.doc.getText("content").toString();

    const key = docKey(WS, PATH);
    const updateScope = svcScope("doc", "updates", key);
    expect((await listSvcKeys(WS, updateScope)).length).toBe(1);

    await compactIfDue(WS, PATH);
    expect((await listSvcKeys(WS, updateScope)).length).toBe(1);

    vi.setSystemTime(new Date("2024-01-01T00:00:02.000Z"));
    await compactIfDue(WS, PATH);
    expect((await listSvcKeys(WS, updateScope)).length).toBe(0);

    await releaseDoc(key);
    const reconstructed = await loadDurable(WS, PATH);
    expect(reconstructed.getText("content").toString()).toBe(content);
    reconstructed.destroy();
  });

  it("restore wins over stale doc state when no live session is active", async () => {
    const live = await getOrLoadDoc(WS, PATH);
    const update = applyAndCapture(live.doc, () => {
      live.doc.getText("content").insert(0, "stale ");
    });
    await appendUpdate(WS, PATH, update);
    expect(live.doc.getText("content").toString()).toBe("stale base content\n");
    await releaseDoc(docKey(WS, PATH));

    await getFsStore().write(WS, PATH, "restored from commit\n");

    const reloaded = await loadDurable(WS, PATH);
    expect(reloaded.getText("content").toString()).toBe("restored from commit\n");
    reloaded.destroy();
  });

  it("appendUpdate accepts a batch of updates as one call", async () => {
    const live = await getOrLoadDoc(WS, PATH);
    const u1 = applyAndCapture(live.doc, () => {
      live.doc.getText("content").insert(0, "a");
    });
    const u2 = applyAndCapture(live.doc, () => {
      live.doc.getText("content").insert(0, "b");
    });
    const expected = live.doc.getText("content").toString();
    await appendUpdate(WS, PATH, [u1, u2]);

    const key = docKey(WS, PATH);
    const entries = await listSvcRecords<{ data: string }>(
      WS,
      svcScope("doc", "updates", key),
    );
    expect(entries.length).toBe(2);

    await releaseDoc(key);
    const reconstructed = await loadDurable(WS, PATH);
    expect(reconstructed.getText("content").toString()).toBe(expected);
    expect(expected).toBe("babase content\n");
    reconstructed.destroy();
  });
});
