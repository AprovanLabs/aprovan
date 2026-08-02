/**
 * Automatic pagination over namespace-proxy operations.
 *
 * Providers disagree on envelope shape, so pagination is heuristic but
 * pluggable: pass `getItems` / `nextArgs` to override detection. Works with
 * any callable produced by `createNamespaceProxy`.
 */

type PageFn = (args?: Record<string, unknown>) => Promise<unknown>;

export interface PaginateOptions {
  /** Extract the page's items; default: array response, or first array field. */
  getItems?: (page: unknown) => unknown[];
  /**
   * Compute the next call's args from the previous page, or null to stop.
   * Default heuristics: `next_cursor`/`nextCursor`/`cursor` fields, else a
   * numeric `page` arg incremented while full pages keep arriving.
   */
  nextArgs?: (page: unknown, previousArgs: Record<string, unknown>) => Record<string, unknown> | null;
  /** Hard cap on fetched pages (default 20). */
  maxPages?: number;
}

function defaultGetItems(page: unknown): unknown[] {
  if (Array.isArray(page)) return page;
  if (page && typeof page === "object") {
    for (const value of Object.values(page)) {
      if (Array.isArray(value)) return value;
    }
  }
  return [];
}

function defaultNextArgs(
  page: unknown,
  previousArgs: Record<string, unknown>,
): Record<string, unknown> | null {
  if (page && typeof page === "object" && !Array.isArray(page)) {
    const record = page as Record<string, unknown>;
    const cursor = record["next_cursor"] ?? record["nextCursor"] ?? record["next"];
    if (typeof cursor === "string" && cursor.length > 0) {
      return { ...previousArgs, cursor };
    }
    if (record["has_more"] === false || record["hasMore"] === false) return null;
  }

  const currentPage = previousArgs["page"];
  if (typeof currentPage === "number") {
    const items = defaultGetItems(page);
    return items.length > 0 ? { ...previousArgs, page: currentPage + 1 } : null;
  }

  return null;
}

/** Iterate every item across pages: `for await (const repo of paginate(github.repos.list, { page: 1 }))`. */
export async function* paginate(
  operation: PageFn,
  args: Record<string, unknown> = {},
  options: PaginateOptions = {},
): AsyncGenerator<unknown, void, undefined> {
  const getItems = options.getItems ?? defaultGetItems;
  const nextArgs = options.nextArgs ?? defaultNextArgs;
  const maxPages = options.maxPages ?? 20;

  let currentArgs: Record<string, unknown> | null = args;
  for (let pageIndex = 0; pageIndex < maxPages && currentArgs; pageIndex++) {
    const page = await operation(currentArgs);
    const items = getItems(page);
    if (items.length === 0 && pageIndex > 0) return;
    yield* items;
    currentArgs = nextArgs(page, currentArgs);
  }
}

/** Collect every paginated item into one array. */
export async function allPages(
  operation: PageFn,
  args: Record<string, unknown> = {},
  options: PaginateOptions = {},
): Promise<unknown[]> {
  const items: unknown[] = [];
  for await (const item of paginate(operation, args, options)) {
    items.push(item);
  }
  return items;
}
