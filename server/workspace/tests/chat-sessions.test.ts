/**
 * Chat sessions: branch-shaped chats over the VCS layer — staged overlays,
 * transcript persistence, sync/conflicts, and close (discard vs stage to
 * main). See docs/vcs-and-sessions.md.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-chat-sessions-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetRateLimiters();
});

const call = (path: string, args: Record<string, unknown> = {}) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

const putFile = (path: string, content: string, session?: string) =>
  createApp().request(`/fs/${path}${session ? `?session=${session}` : ""}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

const getFile = (path: string, session?: string) =>
  createApp().request(`/fs/${path}${session ? `?session=${session}` : ""}`);

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T };
  return body.data;
}

interface SessionPayload {
  session: {
    id: string;
    title: string;
    status: string;
    mode: string;
    base: string;
    overlay: Record<string, string | null>;
    messageCount: number;
    changes?: { added: string[]; modified: string[]; removed: string[] };
    mergeCommit?: string;
  };
  commit?: { id: string; message: string; sessionId?: string };
  conflicts?: Array<{ path: string }>;
}

describe("chat sessions", () => {
  let stagedId: string;

  it("creates a session with an auto-snapshot base", async () => {
    await putFile("widgets/board.tsx", "export const v = 1;");
    const created = await data<SessionPayload>(
      await call("sessions/create", { title: "Kanban work", mode: "staged" }),
    );
    stagedId = created.session.id;
    expect(created.session.mode).toBe("staged");
    expect(created.session.base).toMatch(/^[0-9a-f]{64}$/);

    // The base commit is on main.
    const log = await data<{ commits: Array<{ id: string }> }>(await call("vfs/log", {}));
    expect(log.commits[0]!.id).toBe(created.session.base);
  });

  it("stages writes in the overlay without touching the live tree", async () => {
    const write = await putFile("widgets/board.tsx", "export const v = 2;", stagedId);
    expect(write.status).toBe(201);

    // Live tree still v1.
    const live = (await (await getFile("widgets/board.tsx")).json()) as { content: string };
    expect(live.content).toBe("export const v = 1;");

    // Session view sees v2.
    const sessionView = (await (await getFile("widgets/board.tsx", stagedId)).json()) as {
      content: string;
    };
    expect(sessionView.content).toBe("export const v = 2;");

    // New files exist only in the session; deletes are tombstones.
    await putFile("widgets/new.tsx", "export const fresh = true;", stagedId);
    expect((await getFile("widgets/new.tsx")).status).toBe(404);
    expect((await getFile("widgets/new.tsx", stagedId)).status).toBe(200);

    const summary = await data<SessionPayload>(await call("sessions/get", { id: stagedId }));
    expect(summary.session.changes).toEqual({
      added: ["widgets/new.tsx"],
      modified: ["widgets/board.tsx"],
      removed: [],
    });
  });

  it("lists the overlay view via vfs.list {session}", async () => {
    const listing = await data<{ entries: Array<{ path: string; hash: string }> }>(
      await call("vfs/list", { session: stagedId, prefix: "widgets" }),
    );
    expect(listing.entries.map((e) => e.path).sort()).toEqual([
      "widgets/board.tsx",
      "widgets/new.tsx",
    ]);
  });

  it("persists and upserts the transcript", async () => {
    await call("sessions/append", {
      id: stagedId,
      messages: [
        { id: "m1", role: "user", parts: [{ type: "text", text: "make a board" }] },
        { id: "m2", role: "assistant", parts: [{ type: "text", text: "draft" }] },
      ],
    });
    // Re-send m2 with the final text — upsert, not duplicate.
    const after = await data<SessionPayload>(
      await call("sessions/append", {
        id: stagedId,
        messages: [{ id: "m2", role: "assistant", parts: [{ type: "text", text: "final" }] }],
      }),
    );
    expect(after.session.messageCount).toBe(2);

    const transcript = await data<{ messages: Array<{ id: string; parts: Array<{ text: string }> }> }>(
      await call("sessions/messages", { id: stagedId }),
    );
    expect(transcript.messages).toHaveLength(2);
    expect(transcript.messages[1]!.parts[0]!.text).toBe("final");
  });

  it("syncs onto a moved main and reports conflicts at path granularity", async () => {
    // Main moves under the staged edit...
    await putFile("widgets/board.tsx", "export const v = 99;");
    // ...and somewhere the session never touched.
    await putFile("README.md", "hello");

    const synced = await data<SessionPayload>(await call("sessions/sync", { id: stagedId }));
    expect(synced.conflicts).toEqual([
      expect.objectContaining({ path: "widgets/board.tsx" }),
    ]);

    // The rebased base sees main's README through the overlay view.
    const readme = (await (await getFile("README.md", stagedId)).json()) as { content: string };
    expect(readme.content).toBe("hello");
  });

  it("stages the session onto main as a merge commit", async () => {
    const closed = await data<SessionPayload>(
      await call("sessions/close", { id: stagedId, stage: true, message: "Ship the board" }),
    );
    expect(closed.session.status).toBe("merged");
    expect(closed.commit?.sessionId).toBe(stagedId);
    expect(closed.session.mergeCommit).toBe(closed.commit?.id);

    // Overlay content is live now.
    const live = (await (await getFile("widgets/board.tsx")).json()) as { content: string };
    expect(live.content).toBe("export const v = 2;");
    expect((await getFile("widgets/new.tsx")).status).toBe(200);

    // And the merge commit is main's head.
    const log = await data<{ commits: Array<{ id: string; message: string }> }>(
      await call("vfs/log", { limit: 1 }),
    );
    expect(log.commits[0]!.message).toBe("Ship the board");

    // Writes to a merged session are rejected; peeking still works.
    expect((await putFile("widgets/board.tsx", "post-close", stagedId)).status).toBe(400);
    expect((await getFile("widgets/new.tsx", stagedId)).status).toBe(200);
  });

  it("closes without staging, leaving main untouched", async () => {
    const created = await data<SessionPayload>(
      await call("sessions/create", { title: "Scratch", mode: "staged" }),
    );
    await putFile("scratch/tmp.md", "throwaway", created.session.id);
    const closed = await data<SessionPayload>(
      await call("sessions/close", { id: created.session.id }),
    );
    expect(closed.session.status).toBe("closed");
    expect((await getFile("scratch/tmp.md")).status).toBe(404);
  });

  it("auto-mode sessions write through to the live tree", async () => {
    const created = await data<SessionPayload>(await call("sessions/create", {}));
    expect(created.session.mode).toBe("auto");
    await putFile("notes/auto.md", "direct", created.session.id);
    expect((await getFile("notes/auto.md")).status).toBe(200);
  });

  it("discards staged changes per path (keep-the-workspace resolution)", async () => {
    const created = await data<SessionPayload>(
      await call("sessions/create", { title: "Resolvable", mode: "staged" }),
    );
    await putFile("widgets/board.tsx", "draft version", created.session.id);
    await putFile("widgets/extra.tsx", "kept", created.session.id);

    const resolved = await data<{ dropped: string[]; session: SessionPayload["session"] }>(
      await call("sessions/discard", {
        id: created.session.id,
        paths: ["widgets/board.tsx"],
      }),
    );
    expect(resolved.dropped).toEqual(["widgets/board.tsx"]);
    expect(resolved.session.changes).toEqual({
      added: ["widgets/extra.tsx"],
      modified: [],
      removed: [],
    });

    // The dropped path reads as the workspace has it again.
    const view = (await (await getFile("widgets/board.tsx", created.session.id)).json()) as {
      content: string;
    };
    expect(view.content).toBe("export const v = 2;");
  });

  it("reports live peers via presence heartbeats and expires stale ones", async () => {
    const beat = (window: string, title: string) =>
      call("sessions/presence", { window, title, id: stagedId, mode: "auto" });

    await beat("w1", "Window one");
    const second = await data<{ peers: Array<{ window: string; sessionTitle?: string }> }>(
      await beat("w2", "Window two"),
    );
    expect(second.peers.map((p) => p.window)).toEqual(["w1"]);
    expect(second.peers[0]?.sessionTitle).toBe("Window one");

    // Same window heartbeating again sees the other, not itself.
    const again = await data<{ peers: Array<{ window: string }> }>(
      await beat("w1", "Window one"),
    );
    expect(again.peers.map((p) => p.window)).toEqual(["w2"]);
  });

  it("resolves a conflicted merge in one call — keep-workspace", async () => {
    await putFile("res/a.md", "base");
    const created = await data<SessionPayload>(
      await call("sessions/create", { title: "Resolver A", mode: "staged" }),
    );
    await putFile("res/a.md", "draft version", created.session.id);
    await putFile("res/a.md", "workspace moved"); // conflict on main

    const resolved = await data<{
      session: SessionPayload["session"];
      resolved: string[];
      commit?: { message: string };
    }>(
      await call("sessions/resolve", {
        id: created.session.id,
        strategy: "keep-workspace",
      }),
    );
    expect(resolved.resolved).toEqual(["res/a.md"]);
    expect(resolved.session.status).toBe("merged");

    const after = (await (await getFile("res/a.md")).json()) as { content: string };
    expect(after.content).toBe("workspace moved");
  });

  it("resolves a conflicted merge in one call — keep-draft", async () => {
    const created = await data<SessionPayload>(
      await call("sessions/create", { title: "Resolver B", mode: "staged" }),
    );
    await putFile("res/a.md", "draft wins", created.session.id);
    await putFile("res/a.md", "workspace again");

    const resolved = await data<{ resolved: string[]; commit?: { message: string } }>(
      await call("sessions/resolve", { id: created.session.id, strategy: "keep-draft" }),
    );
    expect(resolved.resolved).toEqual(["res/a.md"]);
    expect(resolved.commit?.message).toContain("kept the draft's versions");

    const after = (await (await getFile("res/a.md")).json()) as { content: string };
    expect(after.content).toBe("draft wins");
  });

  it("hard-deletes a session: record, transcript, and staged shadows", async () => {
    const created = await data<SessionPayload>(
      await call("sessions/create", { title: "Doomed", mode: "staged" }),
    );
    const id = created.session.id;
    await putFile("scratch/doomed.md", "bye", id);
    await call("sessions/append", {
      id,
      messages: [{ id: "m1", role: "user", parts: [{ type: "text", text: "hi" }] }],
    });

    const deleted = await data<{ deleted: string }>(await call("sessions/delete", { id }));
    expect(deleted.deleted).toBe(id);

    // Gone from the list, from get, and its staged view no longer resolves.
    const listing = await data<{ sessions: Array<{ id: string }> }>(
      await call("sessions/list", {}),
    );
    expect(listing.sessions.some((s) => s.id === id)).toBe(false);
    expect((await call("sessions/get", { id })).status).toBe(404);
    expect((await getFile("scratch/doomed.md", id)).status).toBe(404);

    // Deleting again 404s; the workspace itself was never touched.
    expect((await call("sessions/delete", { id })).status).toBe(404);
    expect((await getFile("scratch/doomed.md")).status).toBe(404);
  });

  it("shows the PR-style list with changes", async () => {
    const listing = await data<{ sessions: Array<{ title: string; status: string }> }>(
      await call("sessions/list", { status: "merged" }),
    );
    expect(listing.sessions.some((s) => s.title === "Kanban work")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Record-backed transcripts (specs/record-store, "Transcripts append as
// per-message records"): append cost is O(messages appended), storage is the
// svc#chat scopes, and no transcript state rides the file plane.
// ---------------------------------------------------------------------------

describe("transcript records", () => {
  it("appends 2 messages to a 500-message session with exactly 3 record writes", async () => {
    const { getRecordStore } = await import("../src/records.js");
    const { vi } = await import("vitest");
    const created = await data<SessionPayload>(
      await call("sessions/create", { title: "Long haul" }),
    );
    const id = created.session.id;
    const seed = Array.from({ length: 500 }, (_, i) => ({
      id: `seed-${i}`,
      role: "user",
      parts: [{ type: "text", text: `message ${i}` }],
    }));
    await call("sessions/append", { id, messages: seed });

    const store = getRecordStore();
    const spy = vi.spyOn(store, "set");
    const after = await data<SessionPayload>(
      await call("sessions/append", {
        id,
        messages: [
          { id: "new-1", role: "user", parts: [{ type: "text", text: "501" }] },
          { id: "new-2", role: "assistant", parts: [{ type: "text", text: "502" }] },
        ],
      }),
    );
    // Exactly the 2 message records plus the session record (other scopes —
    // telemetry counters — are not transcript writes).
    const chatWrites = spy.mock.calls.filter((c) => String(c[1]).startsWith("svc#chat"));
    expect(chatWrites.map((c) => String(c[2]))).toEqual([
      `0000000500#new-1`,
      `0000000501#new-2`,
      id,
    ]);
    spy.mockRestore();
    expect(after.session.messageCount).toBe(502);

    const transcript = await data<{ messages: Array<{ id: string }> }>(
      await call("sessions/messages", { id }),
    );
    expect(transcript.messages).toHaveLength(502);
    expect(transcript.messages[0]!.id).toBe("seed-0");
    expect(transcript.messages[501]!.id).toBe("new-2");
  });

  it("stores sessions and messages under svc#chat scopes, not the file plane", async () => {
    const { getRecordStore } = await import("../src/records.js");
    const { getFsStore } = await import("../src/fs-store.js");
    const created = await data<SessionPayload>(
      await call("sessions/create", { title: "Recorded", mode: "staged" }),
    );
    const id = created.session.id;
    await call("sessions/append", {
      id,
      messages: [{ id: "m1", role: "user", parts: [{ type: "text", text: "hi" }] }],
    });
    await putFile("scratch/shadowed.md", "shadow", id);

    const store = getRecordStore();
    expect(await store.list("local", "svc#chat#sessions")).toContain(id);
    const messageKeys = await store.list("local", `svc#chat#session#${id}`);
    expect(messageKeys).toHaveLength(1);
    expect(messageKeys[0]).toMatch(/^\d{10}#m1$/);

    // The only `.services/chat` file-plane residue is staged shadow content.
    const { listAll } = await import("../src/fs-store.js");
    const files = await listAll(getFsStore(), "local", ".services/chat");
    const nonShadow = files.filter((entry) => !/\/files\//.test(entry.path));
    expect(nonShadow).toEqual([]);
  });
});
