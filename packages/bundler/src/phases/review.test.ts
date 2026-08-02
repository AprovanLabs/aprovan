import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { runReviewPhase } from "./review.js";
import type { InfraRunner } from "../verification/scorecard.js";

const tempDirs: string[] = [];

async function createTempDir(): Promise<string> {
  const dir = await mkdtemp(path.join(tmpdir(), "bundler-review-"));
  tempDirs.push(dir);
  return dir;
}

/** Mock infrastructure runner that always passes — avoids subprocess calls in tests. */
const passingInfraRunner: InfraRunner = {
  runTsc: async () => ({ success: true, output: "TypeScript compilation passed" }),
  runImports: async () => ({ success: true, output: "Named exports resolve" }),
  runCircularDeps: async () => ({ success: true, output: "No circular dependencies found" }),
  runEslint: async () => ({ success: true, output: "ESLint passed" }),
};

async function writeProviderFiles(
  outputRoot: string,
  providerName: string,
  overrides: Partial<{
    indexTs: string;
    typesTs: string;
    packageJson: string;
    openApiJson: string;
    readme: string;
  }> = {},
): Promise<void> {
  const providerDir = path.join(outputRoot, providerName);
  await mkdir(providerDir, { recursive: true });

  // Default openApiJson has 6 operations with summaries and a pagination param
  // so the domain score reaches the minimum threshold of 60.
  const defaults = {
    indexTs: `import type { OpenaiClient } from "./types.js";\nexport * from "./types.js";\n`,
    typesTs: `export type OpenaiClient = { responses: { create: () => Promise<void> } };\n`,
    packageJson: JSON.stringify({
      name: "@utdk/openai",
      version: "1.0.0-20260101.1",
      utdk: { provider: "openai", generation: 1, auth: [{ auth_type: "api_key" }] },
    }),
    openApiJson: JSON.stringify({
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
    }),
    readme:
      "# OpenAI\n\nGenerated UTDK provider for OpenAI. This package provides TypeScript types and a client for the OpenAI API.\n",
  };

  await Promise.all([
    writeFile(path.join(providerDir, "index.ts"), overrides.indexTs ?? defaults.indexTs, "utf8"),
    writeFile(path.join(providerDir, "types.ts"), overrides.typesTs ?? defaults.typesTs, "utf8"),
    writeFile(
      path.join(providerDir, "package.json"),
      overrides.packageJson ?? defaults.packageJson,
      "utf8",
    ),
    writeFile(
      path.join(providerDir, "openapi.json"),
      overrides.openApiJson ?? defaults.openApiJson,
      "utf8",
    ),
    writeFile(path.join(providerDir, "README.md"), overrides.readme ?? defaults.readme, "utf8"),
  ]);
}

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("runReviewPhase", () => {
  it("passes when all expected files are present and valid", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "openai");

    const result = await runReviewPhase({ provider: "openai", outputRoot, infraRunner: passingInfraRunner });

    expect(result.provider).toBe("openai");
    expect(result.scorecard.passed).toBe(true);
    expect(result.agentReadiness.passed).toBe(true);
    expect(result.passed).toBe(true);
  });

  it("fails agent-readiness when scaffold files are missing", async () => {
    const outputRoot = await createTempDir();
    // Don't write any files

    const result = await runReviewPhase({ provider: "openai", outputRoot, infraRunner: passingInfraRunner });

    expect(result.agentReadiness.passed).toBe(false);
    expect(result.passed).toBe(false);

    const errorCodes = result.agentReadiness.blockers
      .filter((b) => b.severity === "error")
      .map((b) => b.code);

    expect(errorCodes).toContain("MISSING_INDEX_TS");
    expect(errorCodes).toContain("MISSING_TYPES_TS");
    expect(errorCodes).toContain("MISSING_PACKAGE_JSON");
  });

  it("issues warning when auth config is missing", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "openai", {
      packageJson: JSON.stringify({
        name: "@utdk/openai",
        version: "1.0.0",
        utdk: { provider: "openai", generation: 1 },
      }),
    });

    const result = await runReviewPhase({ provider: "openai", outputRoot, infraRunner: passingInfraRunner });

    const warnCodes = result.agentReadiness.blockers
      .filter((b) => b.severity === "warning")
      .map((b) => b.code);

    expect(warnCodes).toContain("MISSING_AUTH_CONFIG");
    // Missing auth is a warning, not an error — agent-readiness still passes
    expect(result.agentReadiness.passed).toBe(true);
  });

  it("includes scorecard domain score in the result", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "openai");

    const result = await runReviewPhase({ provider: "openai", outputRoot, infraRunner: passingInfraRunner });

    expect(result.scorecard.domain.total).toBeGreaterThan(0);
    expect(result.scorecard.infrastructure.allPassed).toBe(true);
  });

  it("reports no exported types as error", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "openai", {
      typesTs: "// no exports here\n",
    });

    const result = await runReviewPhase({ provider: "openai", outputRoot, infraRunner: passingInfraRunner });

    const errorCodes = result.agentReadiness.blockers
      .filter((b) => b.severity === "error")
      .map((b) => b.code);

    expect(errorCodes).toContain("NO_EXPORTED_TYPES");
    expect(result.agentReadiness.passed).toBe(false);
  });

  it("populates warnings array for non-passing conditions", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "openai", {
      packageJson: JSON.stringify({
        name: "@utdk/openai",
        version: "1.0.0",
        utdk: { provider: "openai", generation: 1 },
      }),
    });

    const result = await runReviewPhase({ provider: "openai", outputRoot, infraRunner: passingInfraRunner });

    // warnings should contain the auth warning
    expect(result.warnings.some((w) => w.includes("MISSING_AUTH_CONFIG"))).toBe(true);
  });

  it("fails when an infrastructure check fails", async () => {
    const outputRoot = await createTempDir();
    await writeProviderFiles(outputRoot, "openai");

    const failingTscRunner: InfraRunner = {
      ...passingInfraRunner,
      runTsc: async () => ({ success: false, output: "error TS2345: Type mismatch" }),
    };

    const result = await runReviewPhase({ provider: "openai", outputRoot, infraRunner: failingTscRunner });

    expect(result.scorecard.infrastructure.allPassed).toBe(false);
    expect(result.scorecard.passed).toBe(false);
    expect(result.passed).toBe(false);
  });
});
