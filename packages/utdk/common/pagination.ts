/**
 * AsyncIterable pagination helper for @utdk provider packages.
 *
 * Provides cursor-based and offset-based adapters, plus a `maxPages` guard
 * against runaway iteration.
 */

// ---------------------------------------------------------------------------
// Core paginate() helper
// ---------------------------------------------------------------------------

export interface PaginatePage<T> {
  items: T[];
  nextCursor?: string;
}

export interface PaginateOptions {
  /** Maximum number of pages to fetch. Defaults to unlimited (Infinity). */
  maxPages?: number;
}

/**
 * Iterate over all items returned by a paginated API using cursor-based pagination.
 *
 * @example
 * for await (const item of paginate(async (cursor) => {
 *   const res = await api.listItems({ cursor });
 *   return { items: res.data, nextCursor: res.meta.nextCursor };
 * })) {
 *   console.log(item);
 * }
 */
export async function* paginate<T>(
  fn: (cursor?: string) => Promise<PaginatePage<T>>,
  options?: PaginateOptions,
): AsyncIterable<T> {
  const maxPages = options?.maxPages ?? Infinity;
  let cursor: string | undefined;
  let page = 0;

  while (page < maxPages) {
    const result = await fn(cursor);

    for (const item of result.items) {
      yield item;
    }

    page++;

    if (!result.nextCursor) {
      break;
    }

    cursor = result.nextCursor;
  }
}

// ---------------------------------------------------------------------------
// Cursor-based adapter
// ---------------------------------------------------------------------------

export interface CursorPaginatedFn<T> {
  (cursor?: string): Promise<PaginatePage<T>>;
}

/**
 * Create a cursor-based paginator from a function that accepts a cursor
 * and returns `{ items, nextCursor? }`.
 *
 * This is the same shape as the core `paginate()` helper and is provided
 * for explicit naming / documentation purposes.
 */
export function cursorPaginator<T>(
  fn: CursorPaginatedFn<T>,
): (options?: PaginateOptions) => AsyncIterable<T> {
  return (options) => paginate(fn, options);
}

// ---------------------------------------------------------------------------
// Offset-based adapter
// ---------------------------------------------------------------------------

export interface OffsetPage<T> {
  items: T[];
  /** Total number of items, if known. Used to determine when to stop. */
  total?: number;
}

export interface OffsetPaginatedFn<T> {
  (offset: number, limit: number): Promise<OffsetPage<T>>;
}

export interface OffsetPaginateOptions extends PaginateOptions {
  /** Number of items per page. Default: 100 */
  pageSize?: number;
  /** Starting offset. Default: 0 */
  startOffset?: number;
}

/**
 * Iterate over all items returned by an offset-based paginated API.
 *
 * Stops when:
 * - The page returns fewer items than `pageSize` (indicating the last page), or
 * - `total` is known and all items have been yielded, or
 * - `maxPages` is reached.
 *
 * @example
 * for await (const item of paginateOffset(
 *   async (offset, limit) => {
 *     const res = await api.listItems({ offset, limit });
 *     return { items: res.data, total: res.total };
 *   },
 *   { pageSize: 50 }
 * )) {
 *   console.log(item);
 * }
 */
export async function* paginateOffset<T>(
  fn: OffsetPaginatedFn<T>,
  options?: OffsetPaginateOptions,
): AsyncIterable<T> {
  const pageSize = options?.pageSize ?? 100;
  const maxPages = options?.maxPages ?? Infinity;
  let offset = options?.startOffset ?? 0;
  let page = 0;
  let totalYielded = 0;

  while (page < maxPages) {
    const result = await fn(offset, pageSize);

    for (const item of result.items) {
      yield item;
      totalYielded++;
    }

    page++;
    offset += result.items.length;

    // Stop if we know the total and have fetched all items
    if (result.total !== undefined && totalYielded >= result.total) {
      break;
    }

    // Stop if the page was shorter than requested (last page)
    if (result.items.length < pageSize) {
      break;
    }
  }
}

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

/**
 * Collect all items from an AsyncIterable into an array.
 * Useful in tests or when the full result set is needed at once.
 */
export async function collectPages<T>(iterable: AsyncIterable<T>): Promise<T[]> {
  const result: T[] = [];
  for await (const item of iterable) {
    result.push(item);
  }
  return result;
}

/**
 * Take at most `n` items from an AsyncIterable.
 */
export async function* take<T>(iterable: AsyncIterable<T>, n: number): AsyncIterable<T> {
  let count = 0;
  for await (const item of iterable) {
    if (count >= n) break;
    yield item;
    count++;
  }
}
