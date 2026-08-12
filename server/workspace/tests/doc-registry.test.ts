/**
 * Live-doc registry — process-local Map, load-on-miss via persistence.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import {
  docKey,
  getOrLoadDoc,
  hasLiveDoc,
  releaseDoc,
} from "../src/doc/registry.js";
import { getFsStore, resetFsStore } from "../src/fs-store.js";
import { resetRecordStore } from "../src/records.js";
import { resetWorkspaceConfig } from "../src/runtime/config.js";

const WS = "ws-doc-reg";
const PATH = "notes/hello.md";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-doc-registry-"));
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
  await getFsStore().write(WS, PATH, "# hello\n");
});

afterEach(async () => {
  const key = docKey(WS, PATH);
  if (hasLiveDoc(WS, PATH)) await releaseDoc(key);
});

describe("doc registry", () => {
  it("docKey mirrors presence topicKey shape", () => {
    expect(docKey("ws", "a/b.md")).toBe("ws\0a/b.md");
  });

  it("getOrLoadDoc loads from file on first open and caches", async () => {
    expect(hasLiveDoc(WS, PATH)).toBe(false);
    const live = await getOrLoadDoc(WS, PATH);
    expect(hasLiveDoc(WS, PATH)).toBe(true);
    expect(live.key).toBe(docKey(WS, PATH));
    expect(live.doc.getText("content").toString()).toBe("# hello\n");
    expect(live.participants.size).toBe(0);

    const again = await getOrLoadDoc(WS, PATH);
    expect(again).toBe(live);
  });

  it("concurrent getOrLoadDoc shares one LiveDoc", async () => {
    const [a, b] = await Promise.all([getOrLoadDoc(WS, PATH), getOrLoadDoc(WS, PATH)]);
    expect(a).toBe(b);
    expect(hasLiveDoc(WS, PATH)).toBe(true);
  });

  it("releaseDoc drops the live entry", async () => {
    await getOrLoadDoc(WS, PATH);
    expect(hasLiveDoc(WS, PATH)).toBe(true);
    await releaseDoc(docKey(WS, PATH));
    expect(hasLiveDoc(WS, PATH)).toBe(false);
    await releaseDoc(docKey(WS, PATH)); // idempotent
  });

  it("reload after release reconstructs identical content", async () => {
    const live = await getOrLoadDoc(WS, PATH);
    live.doc.getText("content").insert(0, "x");
    // Durable not updated — release drops memory; next load re-reads durable
    // (still the original file snapshot from first open).
    await releaseDoc(docKey(WS, PATH));
    const reloaded = await getOrLoadDoc(WS, PATH);
    expect(reloaded.doc.getText("content").toString()).toBe("# hello\n");
    expect(reloaded).not.toBe(live);
  });
});
