import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { detectOperationPaginationHint, detectPaginationHints, runEnrichPhase } from "./enrich.js";
import type { OpenAPIV3 } from "openapi-types";

const tempDirs: string[] = [];

async function createTempDir(): Promise<string> {
  const dir = await mkdtemp(path.join(tmpdir(), "bundler-enrich-"));
  tempDirs.push(dir);
  return dir;
}

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

// ---------------------------------------------------------------------------
// Minimal OpenAPI document builder for tests
// ---------------------------------------------------------------------------

function makeDoc(
  operations: Record<string, { params?: OpenAPIV3.ParameterObject[]; responseProps?: Record<string, unknown>; linkHeader?: boolean }>,
): OpenAPIV3.Document {
  const paths: OpenAPIV3.PathsObject = {};

  for (const [operationId, opts] of Object.entries(operations)) {
    const headers: Record<string, OpenAPIV3.HeaderObject> = opts.linkHeader
      ? { Link: { schema: { type: "string" } } }
      : {};

    const responseContent: OpenAPIV3.MediaTypeObject | undefined = opts.responseProps
      ? {
          schema: {
            type: "object",
            properties: Object.fromEntries(
              Object.entries(opts.responseProps).map(([k, v]) => [k, v as OpenAPIV3.SchemaObject]),
            ),
          },
        }
      : undefined;

    const response: OpenAPIV3.ResponseObject = {
      description: "OK",
      ...(Object.keys(headers).length ? { headers } : {}),
      ...(responseContent ? { content: { "application/json": responseContent } } : {}),
    };

    paths[`/${operationId}`] = {
      get: {
        operationId,
        parameters: opts.params ?? [],
        responses: { "200": response },
      },
    };
  }

  return {
    openapi: "3.0.0",
    info: { title: "Test", version: "1.0.0" },
    paths,
  };
}

function qp(name: string): OpenAPIV3.ParameterObject {
  return { name, in: "query", schema: { type: "string" } };
}

// ---------------------------------------------------------------------------
// detectOperationPaginationHint
// ---------------------------------------------------------------------------

describe("detectOperationPaginationHint", () => {
  it("returns undefined when no pagination signals are present", () => {
    const doc = makeDoc({ listItems: { params: [qp("q")] } });
    const op = (doc.paths!["/listItems"] as OpenAPIV3.PathItemObject).get!;
    expect(detectOperationPaginationHint(op, doc)).toBeUndefined();
  });

  it("detects offset-based pagination (offset + limit)", () => {
    const doc = makeDoc({ listItems: { params: [qp("offset"), qp("limit")] } });
    const op = (doc.paths!["/listItems"] as OpenAPIV3.PathItemObject).get!;
    expect(detectOperationPaginationHint(op, doc)).toEqual({
      type: "offset",
      offsetParam: "offset",
      limitParam: "limit",
    });
  });

  it("detects page-based pagination (page + per_page)", () => {
    const doc = makeDoc({ listRepos: { params: [qp("page"), qp("per_page")] } });
    const op = (doc.paths!["/listRepos"] as OpenAPIV3.PathItemObject).get!;
    expect(detectOperationPaginationHint(op, doc)).toEqual({
      type: "page",
      pageParam: "page",
      limitParam: "per_page",
    });
  });

  it("detects page-based pagination with Link header (GitHub style)", () => {
    const doc = makeDoc({
      listRepos: { params: [qp("page"), qp("per_page")], linkHeader: true },
    });
    const op = (doc.paths!["/listRepos"] as OpenAPIV3.PathItemObject).get!;
    expect(detectOperationPaginationHint(op, doc)).toEqual({
      type: "page",
      pageParam: "page",
      limitParam: "per_page",
      linkHeader: true,
    });
  });

  it("detects cursor-based pagination via next_cursor response field", () => {
    const doc = makeDoc({
      listEvents: {
        params: [qp("cursor"), qp("limit")],
        responseProps: { items: { type: "array" }, next_cursor: { type: "string" } },
      },
    });
    const op = (doc.paths!["/listEvents"] as OpenAPIV3.PathItemObject).get!;
    expect(detectOperationPaginationHint(op, doc)).toEqual({
      type: "cursor",
      nextCursorKey: "next_cursor",
      cursorParam: "cursor",
      limitParam: "limit",
    });
  });

  it("detects cursor-based pagination via 'after' response field", () => {
    const doc = makeDoc({
      listItems: {
        params: [qp("after"), qp("per_page")],
        responseProps: { data: { type: "array" }, after: { type: "string" } },
      },
    });
    const op = (doc.paths!["/listItems"] as OpenAPIV3.PathItemObject).get!;
    const hint = detectOperationPaginationHint(op, doc);
    expect(hint?.type).toBe("cursor");
    expect(hint?.nextCursorKey).toBe("after");
    expect(hint?.cursorParam).toBe("after");
  });

  it("detects cursor-based pagination via page_token response field", () => {
    const doc = makeDoc({
      listItems: {
        params: [qp("page_token")],
        responseProps: { items: { type: "array" }, page_token: { type: "string" } },
      },
    });
    const op = (doc.paths!["/listItems"] as OpenAPIV3.PathItemObject).get!;
    const hint = detectOperationPaginationHint(op, doc);
    expect(hint?.type).toBe("cursor");
    expect(hint?.nextCursorKey).toBe("page_token");
  });

  it("detects cursor query param with Link header (no response cursor field)", () => {
    const doc = makeDoc({
      listItems: { params: [qp("cursor"), qp("limit")], linkHeader: true },
    });
    const op = (doc.paths!["/listItems"] as OpenAPIV3.PathItemObject).get!;
    expect(detectOperationPaginationHint(op, doc)).toEqual({
      type: "cursor",
      cursorParam: "cursor",
      limitParam: "limit",
      linkHeader: true,
    });
  });

  it("detects page-based with only page param and Link header", () => {
    const doc = makeDoc({ listItems: { params: [qp("page")], linkHeader: true } });
    const op = (doc.paths!["/listItems"] as OpenAPIV3.PathItemObject).get!;
    expect(detectOperationPaginationHint(op, doc)).toEqual({
      type: "page",
      pageParam: "page",
      linkHeader: true,
    });
  });

  it("prioritises offset-based over page-based when both offset and page params exist", () => {
    const doc = makeDoc({
      listItems: { params: [qp("offset"), qp("limit"), qp("page")] },
    });
    const op = (doc.paths!["/listItems"] as OpenAPIV3.PathItemObject).get!;
    expect(detectOperationPaginationHint(op, doc)?.type).toBe("offset");
  });
});

// ---------------------------------------------------------------------------
// detectPaginationHints — document-level scan
// ---------------------------------------------------------------------------

describe("detectPaginationHints", () => {
  it("returns empty object when no operations have pagination", () => {
    const doc = makeDoc({ search: { params: [qp("q")] } });
    expect(detectPaginationHints(doc)).toEqual({});
  });

  it("maps operationIds to detected hints across multiple operations", () => {
    const doc = makeDoc({
      listRepos: { params: [qp("page"), qp("per_page")], linkHeader: true },
      listEvents: {
        params: [qp("cursor"), qp("limit")],
        responseProps: { next_cursor: { type: "string" } },
      },
      search: { params: [qp("q")] },
    });

    const hints = detectPaginationHints(doc);
    expect(Object.keys(hints).sort()).toEqual(["listEvents", "listRepos"]);
    expect(hints["listRepos"]?.type).toBe("page");
    expect(hints["listRepos"]?.linkHeader).toBe(true);
    expect(hints["listEvents"]?.type).toBe("cursor");
    expect(hints["listEvents"]?.nextCursorKey).toBe("next_cursor");
  });

  it("skips operations without operationId", () => {
    const doc: OpenAPIV3.Document = {
      openapi: "3.0.0",
      info: { title: "Test", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            // no operationId
            parameters: [qp("page"), qp("per_page")],
            responses: { "200": { description: "ok" } },
          },
        },
      },
    };
    expect(detectPaginationHints(doc)).toEqual({});
  });

  it("handles $ref parameters by resolving them", () => {
    const doc: OpenAPIV3.Document = {
      openapi: "3.0.0",
      info: { title: "Test", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            operationId: "listItems",
            parameters: [{ $ref: "#/components/parameters/PageParam" }, { $ref: "#/components/parameters/PerPageParam" }],
            responses: { "200": { description: "ok" } },
          },
        },
      },
      components: {
        parameters: {
          PageParam: { name: "page", in: "query", schema: { type: "integer" } },
          PerPageParam: { name: "per_page", in: "query", schema: { type: "integer" } },
        },
      },
    };

    const hints = detectPaginationHints(doc);
    expect(hints["listItems"]?.type).toBe("page");
    expect(hints["listItems"]?.pageParam).toBe("page");
    expect(hints["listItems"]?.limitParam).toBe("per_page");
  });
});

// ---------------------------------------------------------------------------
// runEnrichPhase
// ---------------------------------------------------------------------------

describe("runEnrichPhase", () => {
  it("creates overlay.yaml when it does not exist", async () => {
    const outputRoot = await createTempDir();
    const result = await runEnrichPhase({ provider: "openai", outputRoot });

    expect(result.created).toBe(true);
    expect(result.overlayPath).toContain("overlay.yaml");
    expect(result.overlay.provider).toBe("openai");
    expect(result.overlay.descriptions).toEqual({});
    expect(result.overlay.paginationHints).toEqual({});
    expect(result.overlay.authHints).toEqual({});
  });

  it("overlay.yaml is valid YAML with comment header", async () => {
    const outputRoot = await createTempDir();
    const result = await runEnrichPhase({ provider: "openai", outputRoot });

    const raw = await readFile(result.overlayPath, "utf8");
    expect(raw).toContain("# Spec enrichment overlay for openai");
    expect(raw).toContain("provider: openai");
  });

  it("reads existing overlay.yaml without overwriting", async () => {
    const outputRoot = await createTempDir();

    // First run creates the overlay
    const firstResult = await runEnrichPhase({ provider: "openai", outputRoot });
    expect(firstResult.created).toBe(true);

    // Manually edit the overlay
    const overlayPath = firstResult.overlayPath;
    const existing = await readFile(overlayPath, "utf8");
    await writeFile(overlayPath, existing + "\n# Custom edit\n", "utf8");

    // Second run should read without overwriting
    const secondResult = await runEnrichPhase({ provider: "openai", outputRoot });
    expect(secondResult.created).toBe(false);
    expect(secondResult.overlayPath).toBe(firstResult.overlayPath);

    const afterSecond = await readFile(overlayPath, "utf8");
    expect(afterSecond).toContain("# Custom edit");
  });

  it("overlay includes specUrl from provider registry", async () => {
    const outputRoot = await createTempDir();
    const result = await runEnrichPhase({ provider: "openai", outputRoot });

    expect(result.overlay.specUrl).toBeTruthy();
    expect(typeof result.overlay.specUrl).toBe("string");
  });

  it("overlay includes generatedAt ISO timestamp", async () => {
    const outputRoot = await createTempDir();
    const result = await runEnrichPhase({ provider: "openai", outputRoot });

    expect(result.overlay.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/u);
  });

  it("returns correct provider name in result", async () => {
    const outputRoot = await createTempDir();
    const result = await runEnrichPhase({ provider: "openai", outputRoot });

    expect(result.provider).toBe("openai");
  });

  it("places overlay.yaml in the correct provider subdirectory", async () => {
    const outputRoot = await createTempDir();
    const result = await runEnrichPhase({ provider: "openai", outputRoot });

    expect(result.overlayPath).toBe(path.join(outputRoot, "openai", "overlay.yaml"));
  });

  it("seeds paginationHints from document when provided", async () => {
    const outputRoot = await createTempDir();
    const doc = makeDoc({
      listRepos: { params: [qp("page"), qp("per_page")], linkHeader: true },
    });

    const result = await runEnrichPhase({ provider: "openai", outputRoot, document: doc });

    expect(result.created).toBe(true);
    expect(result.overlay.paginationHints["listRepos"]).toEqual({
      type: "page",
      pageParam: "page",
      limitParam: "per_page",
      linkHeader: true,
    });
  });

  it("does not overwrite existing overlay even when document is provided", async () => {
    const outputRoot = await createTempDir();

    // Create the overlay first (no detection)
    await runEnrichPhase({ provider: "openai", outputRoot });

    // Second run with a document should NOT overwrite
    const doc = makeDoc({
      listRepos: { params: [qp("page"), qp("per_page")] },
    });
    const secondResult = await runEnrichPhase({ provider: "openai", outputRoot, document: doc });

    expect(secondResult.created).toBe(false);
    expect(secondResult.overlay.paginationHints).toEqual({});
  });
});
