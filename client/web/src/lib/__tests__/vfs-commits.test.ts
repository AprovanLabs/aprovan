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

import { fetchCommitDetail } from "../vfs-commits";

beforeEach(() => {
  showMock.mockReset();
});

describe("fetchCommitDetail", () => {
  it("surfaces the server's change summary", async () => {
    const changes = {
      added: ["a.md"],
      modified: ["b.md"],
      removed: [] as string[],
    };
    showMock.mockResolvedValue({
      commit: {
        id: "c1",
        message: "edit",
        author: "alice",
        createdAt: "2026-01-01T00:00:00.000Z",
      },
      files: ["a.md", "b.md"],
      changes,
    });

    const detail = await fetchCommitDetail("c1");
    expect(showMock).toHaveBeenCalledWith("show", { commit: "c1" });
    expect(detail.changes).toEqual(changes);
    expect(detail.entries).toEqual([{ path: "a.md" }, { path: "b.md" }]);
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
