import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { MIN_DOMAIN_SCORE, runScorecard, type InfraRunner } from "./scorecard.js";

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

const tempDirs: string[] = [];

async function createTempDir(): Promise<string> {
  const dir = await mkdtemp(path.join(tmpdir(), "bundler-scorecard-"));
  tempDirs.push(dir);
  return dir;
}

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

/** Infrastructure runner that always reports all checks as passed. */
const passingRunner: InfraRunner = {
  runTsc: async () => ({ success: true, output: "TypeScript compilation passed" }),
  runImports: async () => ({ success: true, output: "Named exports resolve" }),
  runCircularDeps: async () => ({ success: true, output: "No circular dependencies found" }),
  runEslint: async () => ({ success: true, output: "ESLint passed" }),
};

/** Infrastructure runner that fails the tsc check. */
const failingTscRunner: InfraRunner = {
  ...passingRunner,
  runTsc: async () => ({ success: false, output: "error TS2345: Argument of type X is not assignable to Y" }),
};

/** Infrastructure runner that fails the circular-deps check. */
const failingCircularRunner: InfraRunner = {
  ...passingRunner,
  runCircularDeps: async () => ({ success: false, output: "Circular dependency detected: a.ts → b.ts → a.ts" }),
};

// OpenAPI document with >5 operations, all described, and a pagination param.
const richOpenApi = JSON.stringify({
  openapi: "3.0.0",
  info: { title: "Test API", version: "1.0.0" },
  paths: {
    "/items": {
      get: { operationId: "list_items", summary: "List items", parameters: [{ name: "limit", in: "query", schema: { type: "integer" } }], responses: { "200": { description: "ok" } } },
      post: { operationId: "create_item", summary: "Create item", responses: { "201": { description: "created" } } },
    },
    "/items/{id}": {
      get: { operationId: "get_item", summary: "Get item", responses: { "200": { description: "ok" } } },
      put: { operationId: "update_item", summary: "Update item", responses: { "200": { description: "ok" } } },
      delete: { operationId: "delete_item", summary: "Delete item", responses: { "204": { description: "no content" } } },
    },
    "/items/{id}/tags": {
      get: { operationId: "list_item_tags", summary: "List item tags", responses: { "200": { description: "ok" } } },
    },
  },
});

// Minimal OpenAPI: 1 operation, no descriptions, no pagination.
const sparseOpenApi = JSON.stringify({
  openapi: "3.0.0",
  info: { title: "Sparse API", version: "1.0.0" },
  paths: {
    "/ping": { get: { operationId: "ping", responses: { "200": { description: "ok" } } } },
  },
});

async function writeProviderFiles(
  outputRoot: string,
  providerName: string,
  files: {
    indexTs?: string;
    typesTs?: string;
    packageJson?: string;
    openApiJson?: string;
    readme?: string;
  } = {},
): Promise<void> {
  const dir = path.join(outputRoot, providerName);
  await mkdir(dir, { recursive: true });
  const writes: Promise<void>[] = [];
  if (files.indexTs !== undefined) writes.push(writeFile(path.join(dir, "index.ts"), files.indexTs, "utf8"));
  if (files.typesTs !== undefined) writes.push(writeFile(path.join(dir, "types.ts"), files.typesTs, "utf8"));
  if (files.packageJson !== undefined) writes.push(writeFile(path.join(dir, "package.json"), files.packageJson, "utf8"));
  if (files.openApiJson !== undefined) writes.push(writeFile(path.join(dir, "openapi.json"), files.openApiJson, "utf8"));
  if (files.readme !== undefined) writes.push(writeFile(path.join(dir, "README.md"), files.readme, "utf8"));
  await Promise.all(writes);
}

// ---------------------------------------------------------------------------
// MIN_DOMAIN_SCORE constant
// ---------------------------------------------------------------------------

describe("MIN_DOMAIN_SCORE", () => {
  it("is 60", () => {
    expect(MIN_DOMAIN_SCORE).toBe(60);
  });
});

// ---------------------------------------------------------------------------
// Domain scoring — auth config (+20)
// ---------------------------------------------------------------------------

describe("domain scoring — auth config", () => {
  it("awards 20 points when utdk.auth is a non-empty array", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      packageJson: JSON.stringify({ utdk: { auth: [{ auth_type: "api_key" }] } }),
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.authConfigPoints).toBe(20);
  });

  it("awards 20 points when utdk.auth is a non-null object", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      packageJson: JSON.stringify({ utdk: { auth: { auth_type: "bearer" } } }),
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.authConfigPoints).toBe(20);
  });

  it("awards 0 points when utdk.auth is absent", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      packageJson: JSON.stringify({ utdk: { provider: "test" } }),
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.authConfigPoints).toBe(0);
  });

  it("awards 0 points when utdk.auth is an empty array", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      packageJson: JSON.stringify({ utdk: { auth: [] } }),
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.authConfigPoints).toBe(0);
  });

  it("awards 0 points when package.json is missing", async () => {
    const outputRoot = await createTempDir();
    await mkdir(path.join(outputRoot, "test"), { recursive: true });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.authConfigPoints).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Domain scoring — non-trivial types (+20)
// ---------------------------------------------------------------------------

describe("domain scoring — non-trivial TypeScript types", () => {
  it("awards 20 points for an exported object type", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      typesTs: `export type MyClient = { doThing: () => void };\n`,
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.nonTrivialTypesPoints).toBe(20);
  });

  it("awards 20 points for an exported interface", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      typesTs: `export interface MyInterface { id: string; name: string; }\n`,
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.nonTrivialTypesPoints).toBe(20);
  });

  it("awards 0 points for only primitive type aliases", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      typesTs: `export type Id = string;\nexport type Count = number;\n`,
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.nonTrivialTypesPoints).toBe(0);
  });

  it("awards 0 points when types.ts is missing", async () => {
    const outputRoot = await createTempDir();
    await mkdir(path.join(outputRoot, "test"), { recursive: true });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.nonTrivialTypesPoints).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Domain scoring — pagination hint (+15)
// ---------------------------------------------------------------------------

describe("domain scoring — pagination hint", () => {
  it("awards 15 points when a 'limit' query parameter is present", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      openApiJson: JSON.stringify({
        openapi: "3.0.0",
        info: { title: "T", version: "1" },
        paths: {
          "/items": { get: { operationId: "list", parameters: [{ name: "limit", in: "query" }], responses: { "200": { description: "ok" } } } },
        },
      }),
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.paginationHintPoints).toBe(15);
  });

  it("awards 15 points when a 'cursor' query parameter is present", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      openApiJson: JSON.stringify({
        openapi: "3.0.0",
        info: { title: "T", version: "1" },
        paths: {
          "/items": { get: { operationId: "list", parameters: [{ name: "cursor", in: "query" }], responses: { "200": { description: "ok" } } } },
        },
      }),
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.paginationHintPoints).toBe(15);
  });

  it("awards 0 points when no pagination params are present", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", { openApiJson: sparseOpenApi });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.paginationHintPoints).toBe(0);
  });

  it("awards 15 points when response schema has 'next_cursor' property", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      openApiJson: JSON.stringify({
        openapi: "3.0.0",
        info: { title: "T", version: "1" },
        paths: {
          "/items": {
            get: {
              operationId: "list",
              responses: {
                "200": {
                  description: "ok",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: { items: { type: "array" }, next_cursor: { type: "string" } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }),
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.paginationHintPoints).toBe(15);
  });
});

// ---------------------------------------------------------------------------
// Domain scoring — README > 100 chars (+15)
// ---------------------------------------------------------------------------

describe("domain scoring — README length", () => {
  it("awards 15 points when README has more than 100 non-whitespace characters", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      readme: "# My Provider\n\nThis is a provider that does important things and has a very detailed description that exceeds one hundred characters easily.",
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.readmePoints).toBe(15);
  });

  it("awards 0 points when README is too short", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", { readme: "# Short\n" });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.readmePoints).toBe(0);
  });

  it("awards 0 points when README is missing", async () => {
    const outputRoot = await createTempDir();
    await mkdir(path.join(outputRoot, "test"), { recursive: true });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.readmePoints).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Domain scoring — operations count > 5 (+15)
// ---------------------------------------------------------------------------

describe("domain scoring — operations count", () => {
  it("awards 15 points when there are more than 5 operations", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", { openApiJson: richOpenApi });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.operationsCountPoints).toBe(15);
  });

  it("awards 0 points when there are exactly 5 operations", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      openApiJson: JSON.stringify({
        openapi: "3.0.0",
        info: { title: "T", version: "1" },
        paths: {
          "/a": { get: { operationId: "a1", summary: "a1", responses: { "200": { description: "ok" } } }, post: { operationId: "a2", summary: "a2", responses: { "200": { description: "ok" } } } },
          "/b": { get: { operationId: "b1", summary: "b1", responses: { "200": { description: "ok" } } }, post: { operationId: "b2", summary: "b2", responses: { "200": { description: "ok" } } } },
          "/c": { get: { operationId: "c1", summary: "c1", responses: { "200": { description: "ok" } } } },
        },
      }),
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.operationsCountPoints).toBe(0);
  });

  it("awards 0 points for 1 operation", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", { openApiJson: sparseOpenApi });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.operationsCountPoints).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Domain scoring — all operations described (+15)
// ---------------------------------------------------------------------------

describe("domain scoring — operations described", () => {
  it("awards 15 points when all operations have summaries", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", { openApiJson: richOpenApi });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.operationsDescribedPoints).toBe(15);
  });

  it("awards 15 points when all operations have descriptions (not summary)", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      openApiJson: JSON.stringify({
        openapi: "3.0.0",
        info: { title: "T", version: "1" },
        paths: {
          "/ping": { get: { operationId: "ping", description: "Health check", responses: { "200": { description: "ok" } } } },
        },
      }),
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.operationsDescribedPoints).toBe(15);
  });

  it("awards 0 points when any operation lacks a description or summary", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      openApiJson: JSON.stringify({
        openapi: "3.0.0",
        info: { title: "T", version: "1" },
        paths: {
          "/items": { get: { operationId: "list", responses: { "200": { description: "ok" } } } },
        },
      }),
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.operationsDescribedPoints).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Domain total and pass/fail
// ---------------------------------------------------------------------------

describe("domain total and passing threshold", () => {
  it("sums all domain point allocations correctly (max 100)", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      packageJson: JSON.stringify({ utdk: { auth: [{ auth_type: "api_key" }] } }),
      typesTs: `export type MyClient = { foo: () => void };\n`,
      openApiJson: richOpenApi,
      readme: "# Full provider\n\nThis provider has a very detailed description that goes well beyond one hundred characters in total.",
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.authConfigPoints).toBe(20);
    expect(result.domain.nonTrivialTypesPoints).toBe(20);
    expect(result.domain.paginationHintPoints).toBe(15);
    expect(result.domain.readmePoints).toBe(15);
    expect(result.domain.operationsCountPoints).toBe(15);
    expect(result.domain.operationsDescribedPoints).toBe(15);
    expect(result.domain.total).toBe(100);
  });

  it("marks passed=true when infrastructure passes and domain score >= 60", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      packageJson: JSON.stringify({ utdk: { auth: [{ auth_type: "api_key" }] } }),
      typesTs: `export type MyClient = { foo: () => void };\n`,
      openApiJson: richOpenApi,
      readme: "# Full provider\n\nDetailed description exceeding one hundred characters easily enough.",
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.total).toBeGreaterThanOrEqual(60);
    expect(result.infrastructure.allPassed).toBe(true);
    expect(result.passed).toBe(true);
  });

  it("marks passed=false when domain score < 60", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      packageJson: JSON.stringify({ utdk: { provider: "test" } }), // no auth
      typesTs: `export type Id = string;\n`, // no non-trivial type
      openApiJson: sparseOpenApi, // no pagination, no >5 ops, no descriptions
      readme: "Short", // no README content
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.domain.total).toBeLessThan(60);
    expect(result.passed).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Infrastructure tier
// ---------------------------------------------------------------------------

describe("infrastructure tier", () => {
  it("marks allPassed=true when all checks succeed", async () => {
    const outputRoot = await createTempDir();
    await mkdir(path.join(outputRoot, "test"), { recursive: true });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.infrastructure.allPassed).toBe(true);
    expect(result.infrastructure.tsc.passed).toBe(true);
    expect(result.infrastructure.imports.passed).toBe(true);
    expect(result.infrastructure.circularDeps.passed).toBe(true);
    expect(result.infrastructure.eslint.passed).toBe(true);
  });

  it("marks allPassed=false when tsc fails", async () => {
    const outputRoot = await createTempDir();
    await mkdir(path.join(outputRoot, "test"), { recursive: true });

    const result = await runScorecard({ provider: "test", outputRoot, runner: failingTscRunner });

    expect(result.infrastructure.tsc.passed).toBe(false);
    expect(result.infrastructure.allPassed).toBe(false);
  });

  it("marks allPassed=false when circular-deps check fails", async () => {
    const outputRoot = await createTempDir();
    await mkdir(path.join(outputRoot, "test"), { recursive: true });

    const result = await runScorecard({ provider: "test", outputRoot, runner: failingCircularRunner });

    expect(result.infrastructure.circularDeps.passed).toBe(false);
    expect(result.infrastructure.allPassed).toBe(false);
  });

  it("marks passed=false when infrastructure fails, even with high domain score", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      packageJson: JSON.stringify({ utdk: { auth: [{ auth_type: "api_key" }] } }),
      typesTs: `export type MyClient = { foo: () => void };\n`,
      openApiJson: richOpenApi,
      readme: "# Full provider\n\nDetailed description exceeding one hundred characters for sure yes definitely.",
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: failingTscRunner });

    expect(result.domain.total).toBeGreaterThanOrEqual(60);
    expect(result.infrastructure.allPassed).toBe(false);
    expect(result.passed).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

describe("report", () => {
  it("includes 'Infrastructure checks PASSED' when infra passes", async () => {
    const outputRoot = await createTempDir();
    await mkdir(path.join(outputRoot, "test"), { recursive: true });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.report).toContain("Infrastructure checks PASSED");
  });

  it("includes infrastructure FAIL messages when infra fails", async () => {
    const outputRoot = await createTempDir();
    await mkdir(path.join(outputRoot, "test"), { recursive: true });

    const result = await runScorecard({ provider: "test", outputRoot, runner: failingTscRunner });

    expect(result.report).toContain("[FAIL] TypeScript compilation");
  });

  it("includes domain score in the report", async () => {
    const outputRoot = await createTempDir();
    await mkdir(path.join(outputRoot, "test"), { recursive: true });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.report).toContain("Domain score:");
    expect(result.report).toContain("/100");
  });

  it("lists unmet domain items when domain score < 60", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "test", {
      packageJson: JSON.stringify({ utdk: { provider: "test" } }),
      typesTs: `export type Id = string;\n`,
      openApiJson: sparseOpenApi,
      readme: "Short",
    });

    const result = await runScorecard({ provider: "test", outputRoot, runner: passingRunner });

    expect(result.report).toContain("[ ] Auth config");
    expect(result.report).toContain("[ ] At least one non-trivial");
  });
});
