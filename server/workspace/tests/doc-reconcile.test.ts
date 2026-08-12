/**
 * Agent-write reconciliation — SEARCH/REPLACE → Yjs (stream 5).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import * as Y from "yjs";
import {
  deriveDiffBlocks,
  reconcileOrPassThrough,
  type ReconcileOrigin,
} from "../src/doc/reconcile.js";
import { docKey, getOrLoadDoc, hasLiveDoc, releaseDoc } from "../src/doc/registry.js";
import { getFsStore, resetFsStore } from "../src/fs-store.js";
import { resetRecordStore } from "../src/records.js";
import { resetWorkspaceConfig } from "../src/runtime/config.js";
import { deleteSvcRecord, deleteSvcScope, svcScope } from "../src/svc-records.js";
import { readSession, sessionRead } from "../src/vcs/chat-sessions.js";

const WS = "ws-doc-reconcile";
const USER = "user-reconcile";

let dataDir: string;
let PATH: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-doc-reconcile-"));
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
  PATH = `notes/doc-${crypto.randomUUID()}.md`;
});

afterEach(async () => {
  if (hasLiveDoc(WS, PATH)) await releaseDoc(docKey(WS, PATH));
  const key = docKey(WS, PATH);
  await deleteSvcRecord(WS, svcScope("doc", "snapshot"), key);
  await deleteSvcScope(WS, svcScope("doc", "updates", key));
});

const BASE = [
  "# Title",
  "",
  "Paragraph one.",
  "",
  "Paragraph two with a typo.",
  "",
  "Paragraph three.",
  "",
  "Paragraph four.",
  "",
  "Paragraph five.",
  "",
].join("\n");

const FIXED = [
  "# Title",
  "",
  "Paragraph one.",
  "",
  "Paragraph two with a fix.",
  "",
  "Paragraph three.",
  "",
  "Paragraph four.",
  "",
  "Paragraph five.",
  "",
].join("\n");

describe("deriveDiffBlocks", () => {
  it("emits a SEARCH/REPLACE hunk for a single-line edit", () => {
    const blocks = deriveDiffBlocks(BASE, FIXED);
    expect(blocks.length).toBeGreaterThanOrEqual(1);
    expect(blocks.some((b) => b.search.includes("typo") && b.replace.includes("fix"))).toBe(
      true,
    );
  });
});

describe("reconcileOrPassThrough", () => {
  it("returns not-live when no live doc is loaded (ordinary write path)", async () => {
    await getFsStore().write(WS, PATH, BASE);
    expect(hasLiveDoc(WS, PATH)).toBe(false);
    const result = await reconcileOrPassThrough({
      workspaceId: WS,
      path: PATH,
      content: FIXED,
      base: BASE,
      actor: { userId: USER },
    });
    expect(result).toEqual({ kind: "not-live" });
    const file = await getFsStore().read(WS, PATH);
    expect(file?.content).toBe(BASE);
  });

  it("merges an agent edit with concurrent human typing elsewhere", async () => {
    await getFsStore().write(WS, PATH, BASE);
    const live = await getOrLoadDoc(WS, PATH);
    expect(live.doc.getText("content").toString()).toBe(BASE);

    // Human types in paragraph 5 while the agent fixes paragraph 2.
    live.doc.transact(() => {
      const ytext = live.doc.getText("content");
      const current = ytext.toString();
      const needle = "Paragraph five.";
      const idx = current.indexOf(needle);
      expect(idx).toBeGreaterThan(-1);
      ytext.insert(idx + needle.length, " Human addition.");
    }, "human");

    const withHuman = live.doc.getText("content").toString();
    expect(withHuman).toContain("Human addition.");
    expect(withHuman).toContain("typo");

    const result = await reconcileOrPassThrough({
      workspaceId: WS,
      path: PATH,
      content: FIXED,
      base: BASE,
      actor: {
        userId: USER,
        agentProfile: "doc/fix-typos",
        app: "document",
      },
    });

    expect(result.kind).toBe("applied");
    if (result.kind !== "applied") return;
    expect(result.appliedBlocks).toBeGreaterThanOrEqual(1);

    const merged = live.doc.getText("content").toString();
    expect(merged).toContain("Paragraph two with a fix.");
    expect(merged).not.toContain("typo");
    expect(merged).toContain("Human addition.");
  });

  it("attributes the Yjs transaction origin to the agent principal", async () => {
    await getFsStore().write(WS, PATH, BASE);
    const live = await getOrLoadDoc(WS, PATH);

    let origin: unknown;
    const onAfter = (tr: Y.Transaction) => {
      origin = tr.origin;
    };
    live.doc.on("afterTransaction", onAfter);

    await reconcileOrPassThrough({
      workspaceId: WS,
      path: PATH,
      content: FIXED,
      base: BASE,
      actor: {
        userId: USER,
        agentProfile: "doc/fix-typos",
        app: "document",
      },
    });

    live.doc.off("afterTransaction", onAfter);

    expect(origin).toEqual({
      userId: USER,
      agentProfile: "doc/fix-typos",
      app: "document",
    } satisfies ReconcileOrigin);
  });

  it("escalates an unresolvable SEARCH to a staged draft without clobbering live", async () => {
    await getFsStore().write(WS, PATH, BASE);
    const live = await getOrLoadDoc(WS, PATH);

    // Human rewrites paragraph 2 beyond fuzzy tolerance.
    live.doc.transact(() => {
      const ytext = live.doc.getText("content");
      const current = ytext.toString();
      const old = "Paragraph two with a typo.";
      const idx = current.indexOf(old);
      expect(idx).toBeGreaterThan(-1);
      ytext.delete(idx, old.length);
      ytext.insert(idx, "Completely different paragraph two that shares no tokens.");
    }, "human");

    const before = live.doc.getText("content").toString();
    expect(before).toContain("Completely different");
    expect(before).not.toContain("typo");

    const result = await reconcileOrPassThrough({
      workspaceId: WS,
      path: PATH,
      content: FIXED,
      base: BASE,
      actor: {
        userId: USER,
        agentProfile: "doc/fix-typos",
        app: "document",
      },
    });

    expect(result.kind).toBe("conflict");
    if (result.kind !== "conflict") return;
    expect(result.sessionId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(result.failed.length).toBeGreaterThanOrEqual(1);

    // Live region rewritten by the human is untouched (no agent clobber).
    const after = live.doc.getText("content").toString();
    expect(after).toContain("Completely different paragraph two");
    expect(after).not.toContain("Paragraph two with a fix.");

    const session = await readSession(WS, result.sessionId);
    expect(session?.mode).toBe("staged");
    expect(session?.overlay[PATH]).toEqual(expect.any(String));

    const staged = await sessionRead(WS, session!, PATH);
    expect(staged?.content).toBe(FIXED);
  });
});
