import { describe, it, expect, vi } from "vitest";
import {
  paginate,
  paginateOffset,
  collectPages,
  take,
  cursorPaginator,
} from "../pagination.js";

// ---------------------------------------------------------------------------
// paginate() — cursor-based
// ---------------------------------------------------------------------------

describe("paginate", () => {
  it("yields all items from a single page", async () => {
    const fn = vi.fn().mockResolvedValue({ items: [1, 2, 3] });
    const result = await collectPages(paginate(fn));
    expect(result).toEqual([1, 2, 3]);
    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith(undefined);
  });

  it("yields all items across multiple pages using nextCursor", async () => {
    const fn = vi
      .fn()
      .mockResolvedValueOnce({ items: ["a", "b"], nextCursor: "cursor1" })
      .mockResolvedValueOnce({ items: ["c", "d"], nextCursor: "cursor2" })
      .mockResolvedValueOnce({ items: ["e"] });

    const result = await collectPages(paginate(fn));
    expect(result).toEqual(["a", "b", "c", "d", "e"]);
    expect(fn).toHaveBeenCalledTimes(3);
    expect(fn).toHaveBeenNthCalledWith(1, undefined);
    expect(fn).toHaveBeenNthCalledWith(2, "cursor1");
    expect(fn).toHaveBeenNthCalledWith(3, "cursor2");
  });

  it("stops after maxPages is reached", async () => {
    const fn = vi
      .fn()
      .mockResolvedValue({ items: [1, 2], nextCursor: "next" });

    const result = await collectPages(paginate(fn, { maxPages: 2 }));
    expect(result).toEqual([1, 2, 1, 2]);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("handles an empty first page", async () => {
    const fn = vi.fn().mockResolvedValue({ items: [] });
    const result = await collectPages(paginate(fn));
    expect(result).toEqual([]);
    expect(fn).toHaveBeenCalledOnce();
  });
});

// ---------------------------------------------------------------------------
// paginateOffset() — offset-based
// ---------------------------------------------------------------------------

describe("paginateOffset", () => {
  it("yields all items using offset pagination", async () => {
    const fn = vi
      .fn()
      .mockResolvedValueOnce({ items: [1, 2, 3], total: 5 })
      .mockResolvedValueOnce({ items: [4, 5], total: 5 });

    const result = await collectPages(paginateOffset(fn, { pageSize: 3 }));
    expect(result).toEqual([1, 2, 3, 4, 5]);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenNthCalledWith(1, 0, 3);
    expect(fn).toHaveBeenNthCalledWith(2, 3, 3);
  });

  it("stops when page is shorter than pageSize", async () => {
    const fn = vi
      .fn()
      .mockResolvedValueOnce({ items: ["x", "y", "z"] })
      .mockResolvedValueOnce({ items: ["w"] });

    const result = await collectPages(paginateOffset(fn, { pageSize: 3 }));
    expect(result).toEqual(["x", "y", "z", "w"]);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("stops when total is reached even if page is full", async () => {
    const fn = vi
      .fn()
      .mockResolvedValueOnce({ items: [1, 2], total: 2 });

    const result = await collectPages(paginateOffset(fn, { pageSize: 2 }));
    expect(result).toEqual([1, 2]);
    expect(fn).toHaveBeenCalledOnce();
  });

  it("respects maxPages limit", async () => {
    const fn = vi.fn().mockResolvedValue({ items: [1, 2] });
    const result = await collectPages(paginateOffset(fn, { pageSize: 2, maxPages: 1 }));
    expect(result).toEqual([1, 2]);
    expect(fn).toHaveBeenCalledOnce();
  });

  it("uses startOffset when provided", async () => {
    const fn = vi
      .fn()
      .mockResolvedValueOnce({ items: [10, 11] })
      .mockResolvedValueOnce({ items: [] });
    await collectPages(paginateOffset(fn, { pageSize: 2, startOffset: 10 }));
    expect(fn).toHaveBeenNthCalledWith(1, 10, 2);
  });
});

// ---------------------------------------------------------------------------
// cursorPaginator adapter
// ---------------------------------------------------------------------------

describe("cursorPaginator", () => {
  it("wraps a cursor function into a paginator factory", async () => {
    const fn = vi
      .fn()
      .mockResolvedValueOnce({ items: ["a"], nextCursor: "p2" })
      .mockResolvedValueOnce({ items: ["b"] });

    const paginator = cursorPaginator(fn);
    const result = await collectPages(paginator());
    expect(result).toEqual(["a", "b"]);
  });
});

// ---------------------------------------------------------------------------
// take() helper
// ---------------------------------------------------------------------------

describe("take", () => {
  it("limits items to n from an AsyncIterable", async () => {
    const fn = vi.fn().mockResolvedValue({ items: [1, 2, 3, 4, 5], nextCursor: "more" });
    const result = await collectPages(take(paginate(fn, { maxPages: 1 }), 3));
    expect(result).toEqual([1, 2, 3]);
  });

  it("returns all items when n is greater than total", async () => {
    const fn = vi.fn().mockResolvedValue({ items: [1, 2] });
    const result = await collectPages(take(paginate(fn), 10));
    expect(result).toEqual([1, 2]);
  });
});
