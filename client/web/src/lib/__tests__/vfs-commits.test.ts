/**
 * commit-detail-fidelity — fetchCommitDetail must surface vcs.show's `changes`.
 */

import { beforeEach, describe, expect, it, vi } from "vitest";

const { showMock } = vi.hoisted(() => ({
  showMock: vi.fn(),
}));

vi.mock("../tools", () => ({
  invokeNamespaceTool: () => showMock,
}));

import {
  changeListBag,
  draftChatTitleFromCommit,
  fetchCommitDetail,
} from "../vfs-commits";

beforeEach(() => {
  showMock.mockReset();
});

describe("fetchCommitDetail", () => {
  it("surfaces the server's change summary with per-path hashes", async () => {
    const changes = {
      added: [{ path: "a.md", hash: "ha" }],
      modified: [{ path: "b.md", from: "hb0", to: "hb1" }],
      removed: [] as Array<{ path: string; hash: string }>,
    };
    showMock.mockResolvedValue({
      commit: {
        id: "c1",
        message: "edit",
        author: "alice",
        createdAt: "2026-01-01T00:00:00.000Z",
        parents: ["c0"],
      },
      files: ["a.md", "b.md"],
      changes,
    });

    const detail = await fetchCommitDetail("c1");
    expect(showMock).toHaveBeenCalledWith("show", { commit: "c1" });
    expect(detail.changes).toEqual(changes);
    expect(changeListBag(detail.changes)).toEqual({
      added: ["a.md"],
      modified: ["b.md"],
      removed: [],
    });
    expect(detail.entries).toEqual([{ path: "a.md" }, { path: "b.md" }]);
  });

  it("passes app scope through to vcs.show", async () => {
    showMock.mockResolvedValue({
      commit: {
        id: "c1",
        message: "edit",
        author: "alice",
        createdAt: "2026-01-01T00:00:00.000Z",
      },
      files: [],
      changes: { added: [], modified: [], removed: [] },
    });
    await fetchCommitDetail("c1", { app: "billing" });
    expect(showMock).toHaveBeenCalledWith("show", {
      commit: "c1",
      scope: { app: "billing" },
    });
  });

  it("degrades cleanly when the server omits changes", async () => {
    showMock.mockResolvedValue({
      commit: {
        id: "root",
        message: "init",
        author: "alice",
        createdAt: "2026-01-01T00:00:00.000Z",
      },
      files: ["a.md"],
    });

    const detail = await fetchCommitDetail("root");
    expect(detail.changes).toBeUndefined();
    expect(detail.entries).toEqual([{ path: "a.md" }]);
  });
});

describe("draftChatTitleFromCommit", () => {
  it("reads chat title from two-parent merge messages", () => {
    expect(
      draftChatTitleFromCommit({
        message: "Merge session: Invoice cleanup",
        parents: ["main", "session"],
      }),
    ).toBe("Invoice cleanup");
  });

  it("ignores single-parent commits", () => {
    expect(
      draftChatTitleFromCommit({
        message: "Merge session: Invoice cleanup",
        parents: ["main"],
      }),
    ).toBeNull();
  });
});
