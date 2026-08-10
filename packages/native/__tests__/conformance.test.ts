/**
 * Conformance: every declared operation is implemented and results match
 * the contract shapes (native-interface-provider / first-party results).
 */

import { describe, expect, it } from "vitest";
import {
  createMemoryEventsBackend,
  createNativeEvents,
} from "../src/events.js";
import {
  createMemoryKeyValueBackend,
  createNativeKeyValue,
} from "../src/keyvalue.js";
import {
  createMemoryTelemetryBackend,
  createNativeTelemetry,
} from "../src/telemetry.js";
import {
  createMemoryVcsBackend,
  createNativeVcs,
  NATIVE_VCS_OPERATIONS,
} from "../src/vcs.js";
import {
  createMemoryVfsBackend,
  createNativeVfs,
} from "../src/vfs.js";
import { dispatchNativeOp } from "../src/dispatch.js";

describe("vfs conformance", () => {
  const ops = ["read", "write", "delete", "list", "stat"] as const;

  it("implements every declared operation", async () => {
    const vfs = createNativeVfs({ backend: createMemoryVfsBackend() });
    for (const op of ops) {
      expect(typeof vfs[op]).toBe("function");
    }
  });

  it("matches contract shapes: write/stat/list/delete/read", async () => {
    const vfs = createNativeVfs({ backend: createMemoryVfsBackend() });
    const written = await vfs.write({ path: "a/b.txt", content: "hi" });
    expect(written).toMatchObject({ path: "a/b.txt", kind: "file" });
    expect(typeof written.etag).toBe("string");
    expect(typeof written.size).toBe("number");

    const statted = await vfs.stat({ path: "a/b.txt" });
    expect(statted.kind).toBe("file");
    expect(statted.etag).toBe(written.etag);

    const listed = await vfs.list({ prefix: "a", recursive: true });
    expect(listed.entries.some((e) => e.path === "a/b.txt" && e.kind === "file")).toBe(true);

    const dirs = await vfs.list({ prefix: "", recursive: false });
    expect(dirs.entries.some((e) => e.path === "a" && e.kind === "directory")).toBe(true);

    const read = await vfs.read({ path: "a/b.txt" });
    expect(read).toMatchObject({
      path: "a/b.txt",
      encoding: "utf8",
      content: "hi",
      size: 2,
    });

    const deleted = await vfs.delete({ path: "a/b.txt" });
    expect(deleted).toEqual({ path: "a/b.txt", deleted: true });
    const idempotent = await vfs.delete({ path: "a/b.txt" });
    expect(idempotent.deleted).toBe(false);
  });
});

describe("keyvalue conformance", () => {
  const ops = ["get", "set", "delete", "list"] as const;

  it("implements every declared operation", () => {
    const kv = createNativeKeyValue({ backend: createMemoryKeyValueBackend() });
    for (const op of ops) expect(typeof kv[op]).toBe("function");
  });

  it("distinguishes absence from a stored empty value", async () => {
    const kv = createNativeKeyValue({ backend: createMemoryKeyValueBackend() });
    const missing = await kv.get({ key: "nope" });
    expect(missing).toEqual({ key: "nope", value: undefined, found: false });

    const set = await kv.set({ key: "empty", value: "" });
    expect(set).toMatchObject({ key: "empty" });
    expect(typeof set.updatedAt).toBe("string");

    const empty = await kv.get({ key: "empty" });
    expect(empty.found).toBe(true);
    expect(empty.value).toBe("");

    const nulled = await kv.set({ key: "nil", value: null });
    expect(nulled.key).toBe("nil");
    const gotNull = await kv.get({ key: "nil" });
    expect(gotNull).toMatchObject({ found: true, value: null });

    const listed = await kv.list({ prefix: "" });
    expect(listed.keys.every((row) => typeof row.key === "string")).toBe(true);
    expect(listed.keys.some((row) => row.key === "empty")).toBe(true);

    const deleted = await kv.delete({ key: "empty" });
    expect(deleted).toEqual({ key: "empty", deleted: true });
  });
});

describe("events conformance", () => {
  it("implements emit and list with contract field names", async () => {
    const events = createNativeEvents({ backend: createMemoryEventsBackend() });
    expect(typeof events.emit).toBe("function");
    expect(typeof events.list).toBe("function");

    const emitted = await events.emit({
      channel: "form.submitted",
      type: "form.submitted",
      payload: { ok: true },
    });
    expect(emitted).toMatchObject({ channel: "form.submitted" });
    expect(typeof emitted.id).toBe("string");
    expect(typeof emitted.timestamp).toBe("string");

    const listed = await events.list({ channel: "form.submitted" });
    expect(listed.channel).toBe("form.submitted");
    expect(listed.events).toHaveLength(1);
    expect(listed.events[0]).toMatchObject({
      id: emitted.id,
      channel: "form.submitted",
      type: "form.submitted",
      timestamp: emitted.timestamp,
      payload: { ok: true },
    });
  });
});

describe("telemetry conformance", () => {
  it("implements export and returns accepted counts", async () => {
    const telemetry = createNativeTelemetry({ backend: createMemoryTelemetryBackend() });
    expect(typeof telemetry.export).toBe("function");

    const result = await telemetry.export({
      resourceLogs: [
        {
          scopeLogs: [
            {
              logRecords: [
                {
                  timeUnixNano: "1000000000",
                  body: { stringValue: "hello" },
                },
              ],
            },
          ],
        },
      ],
    });
    expect(result.accepted).toEqual({ spans: 0, logs: 1, metrics: 0 });
  });
});

describe("vcs conformance (workspace commit store)", () => {
  it("implements every declared workspace operation", () => {
    const vcs = createNativeVcs({ backend: createMemoryVcsBackend() });
    for (const op of NATIVE_VCS_OPERATIONS) {
      expect(typeof vcs[op]).toBe("function");
    }
  });

  it("commits, logs, shows, diffs, branches, and restores", async () => {
    const backend = createMemoryVcsBackend();
    const vcs = createNativeVcs({ backend });
    backend.stage?.("readme.md", "hash-a");
    const { commit, created } = await vcs.commit({ message: "init" });
    expect(created).toBe(true);
    expect(commit.id).toMatch(/^cmt-/);

    const log = await vcs.log({});
    expect(log.commits[0]?.id).toBe(commit.id);

    const shown = await vcs.show({ commit: commit.id });
    expect(shown.files).toContain("readme.md");
    expect(shown.changes.added).toContainEqual({ path: "readme.md", hash: "hash-a" });

    backend.stage?.("readme.md", "hash-b");
    const second = await vcs.commit({ message: "edit" });
    const diff = await vcs.diff({ from: commit.id, to: second.commit.id });
    expect(diff.modified).toContainEqual({ path: "readme.md", from: "hash-a", to: "hash-b" });

    const branches = await vcs.branches();
    expect(branches.branches).toEqual([{ name: "main", commit: second.commit.id }]);

    const restored = await vcs.restore({ commit: commit.id, path: "readme.md" });
    expect(restored.commit).toBe(commit.id);
    expect(restored.restored).toContain("readme.md");
  });
});

describe("dispatchNativeOp", () => {
  it("routes each interface to its client", async () => {
    const backend = createMemoryVfsBackend();
    const ctx = {
      vfs: createNativeVfs({ backend }),
      keyvalue: createNativeKeyValue({ backend: createMemoryKeyValueBackend() }),
    };
    await dispatchNativeOp("vfs", "write", { path: "x.txt", content: "y" }, ctx);
    const read = await dispatchNativeOp("vfs", "read", { path: "x.txt" }, ctx);
    expect(read).toMatchObject({ path: "x.txt", content: "y" });

    await dispatchNativeOp("keyvalue", "set", { key: "k", value: 1 }, ctx);
    const got = await dispatchNativeOp("keyvalue", "get", { key: "k" }, ctx);
    expect(got).toMatchObject({ key: "k", value: 1, found: true });
  });
});
