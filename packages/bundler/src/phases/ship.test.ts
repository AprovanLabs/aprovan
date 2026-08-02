import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { runShipPhase } from "./ship.js";
import type { AgentReadinessResult } from "./agentReadiness.js";
import type { ScorecardResult } from "../verification/scorecard.js";

const tempDirs: string[] = [];

async function createTempDir(): Promise<string> {
  const dir = await mkdtemp(path.join(tmpdir(), "bundler-ship-"));
  tempDirs.push(dir);
  return dir;
}

const mockScorecardResult: ScorecardResult = {
  infrastructure: {
    tsc: { passed: true, skipped: false, message: "TypeScript compilation passed" },
    imports: { passed: true, skipped: false, message: "Named exports resolve" },
    circularDeps: { passed: true, skipped: false, message: "No circular dependencies found" },
    eslint: { passed: true, skipped: false, message: "ESLint passed" },
    allPassed: true,
  },
  domain: {
    authConfigPoints: 20,
    nonTrivialTypesPoints: 20,
    paginationHintPoints: 15,
    readmePoints: 15,
    operationsCountPoints: 15,
    operationsDescribedPoints: 15,
    total: 100,
  },
  passed: true,
  report: "Infrastructure checks PASSED\nDomain score: 100/100 (minimum to ship: 60)\nDomain score PASSED",
};

const mockAgentReadinessResult: AgentReadinessResult = {
  provider: "openai",
  blockers: [],
  passed: true,
};

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("runShipPhase", () => {
  it("emits provenance.json with required fields", async () => {
    const outputRoot = await createTempDir();

    const result = await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: mockScorecardResult,
      agentReadinessResult: mockAgentReadinessResult,
    });

    expect(result.provenancePath).toContain("provenance.json");
    expect(result.provenance.provider).toBe("openai");
    expect(result.provenance.source.url).toBeTruthy();
    expect(result.provenance.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/u);
    expect(result.provenance.generation).toBeGreaterThanOrEqual(1);
  });

  it("emits source block with type, url, hash, and fetchedAt", async () => {
    const outputRoot = await createTempDir();

    const result = await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: mockScorecardResult,
      agentReadinessResult: mockAgentReadinessResult,
    });

    expect(result.provenance.source.type).toBe("openapi");
    expect(result.provenance.source.url).toBeTruthy();
    expect(typeof result.provenance.source.hash).toBe("string");
    expect(result.provenance.source.fetchedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/u);
  });

  it("computes source.hash from openapi.json when present", async () => {
    const outputRoot = await createTempDir();
    const providerDir = path.join(outputRoot, "openai");
    await mkdir(providerDir, { recursive: true });

    const openApiContent = JSON.stringify({ openapi: "3.0.0", info: { title: "OpenAI", version: "1.0" }, paths: {} });
    await writeFile(path.join(providerDir, "openapi.json"), openApiContent, "utf8");

    const result = await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: mockScorecardResult,
      agentReadinessResult: mockAgentReadinessResult,
    });

    expect(result.provenance.source.hash).toMatch(/^sha256:[a-f0-9]{64}$/u);
  });

  it("sets source.hash to empty string when openapi.json is absent", async () => {
    const outputRoot = await createTempDir();

    const result = await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: mockScorecardResult,
      agentReadinessResult: mockAgentReadinessResult,
    });

    expect(result.provenance.source.hash).toBe("");
  });

  it("includes pipeline scorecard scores in provenance.json", async () => {
    const outputRoot = await createTempDir();

    const result = await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: mockScorecardResult,
      agentReadinessResult: mockAgentReadinessResult,
    });

    expect(result.provenance.pipeline.scorecard.infrastructure).toBe("pass");
    expect(result.provenance.pipeline.scorecard.domain).toBe(100);
  });

  it("maps failed infrastructure scorecard to 'fail'", async () => {
    const outputRoot = await createTempDir();
    const failedScorecard: ScorecardResult = {
      ...mockScorecardResult,
      infrastructure: {
        ...mockScorecardResult.infrastructure,
        allPassed: false,
      },
      passed: false,
    };

    const result = await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: failedScorecard,
      agentReadinessResult: mockAgentReadinessResult,
    });

    expect(result.provenance.pipeline.scorecard.infrastructure).toBe("fail");
  });

  it("includes pipeline agentReadiness in provenance.json", async () => {
    const outputRoot = await createTempDir();

    const result = await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: mockScorecardResult,
      agentReadinessResult: mockAgentReadinessResult,
    });

    expect(result.provenance.pipeline.agentReadiness).toBe("pass");
  });

  it("maps failed agentReadiness to 'fail'", async () => {
    const outputRoot = await createTempDir();
    const failedReadiness: AgentReadinessResult = {
      provider: "openai",
      blockers: [{ severity: "error", code: "MISSING_INDEX_TS", message: "index.ts missing" }],
      passed: false,
    };

    const result = await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: mockScorecardResult,
      agentReadinessResult: failedReadiness,
    });

    expect(result.provenance.pipeline.agentReadiness).toBe("fail");
  });

  it("sets pipeline.research to null when research.json is absent", async () => {
    const outputRoot = await createTempDir();

    const result = await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: mockScorecardResult,
      agentReadinessResult: mockAgentReadinessResult,
    });

    expect(result.provenance.pipeline.research).toBeNull();
  });

  it("populates pipeline.research from research.json when present", async () => {
    const outputRoot = await createTempDir();
    const providerDir = path.join(outputRoot, "openai");
    await mkdir(providerDir, { recursive: true });

    const researchContent = JSON.stringify({
      provider: "openai",
      noveltyScore: 8,
      npmPackages: [
        { name: "openai", version: "4.0.0", description: "Official SDK", category: "official-sdk" },
        { name: "openai-client", version: "1.0.0", description: "Community", category: "community-sdk" },
        { name: "mcp-server-openai", version: "0.1.0", description: "MCP", category: "mcp-server" },
      ],
    });
    await writeFile(path.join(providerDir, "research.json"), researchContent, "utf8");

    const result = await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: mockScorecardResult,
      agentReadinessResult: mockAgentReadinessResult,
    });

    expect(result.provenance.pipeline.research).toEqual({
      noveltyScore: 8,
      competingPackages: 3,
    });
  });

  it("includes ingestSource defaulting to 'manual'", async () => {
    const outputRoot = await createTempDir();

    const result = await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: mockScorecardResult,
      agentReadinessResult: mockAgentReadinessResult,
    });

    expect(result.provenance.ingestSource).toBe("manual");
  });

  it("includes bundlerVersion in provenance.json", async () => {
    const outputRoot = await createTempDir();

    const result = await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: mockScorecardResult,
      agentReadinessResult: mockAgentReadinessResult,
    });

    expect(typeof result.provenance.bundlerVersion).toBe("string");
    expect(result.provenance.bundlerVersion.length).toBeGreaterThan(0);
  });

  it("writes valid JSON to provenance.json", async () => {
    const outputRoot = await createTempDir();

    const result = await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: mockScorecardResult,
      agentReadinessResult: mockAgentReadinessResult,
    });

    const raw = await readFile(result.provenancePath, "utf8");
    const parsed = JSON.parse(raw) as { provider: string };
    expect(parsed.provider).toBe("openai");
  });

  it("reads generation from existing package.json", async () => {
    const outputRoot = await createTempDir();
    const providerDir = path.join(outputRoot, "openai");
    await mkdir(providerDir, { recursive: true });

    await writeFile(
      path.join(providerDir, "package.json"),
      JSON.stringify({ utdk: { generation: 5 } }),
      "utf8",
    );

    const result = await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: mockScorecardResult,
      agentReadinessResult: mockAgentReadinessResult,
    });

    expect(result.provenance.generation).toBe(5);
  });

  it("defaults generation to 1 when package.json is absent", async () => {
    const outputRoot = await createTempDir();

    const result = await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: mockScorecardResult,
      agentReadinessResult: mockAgentReadinessResult,
    });

    expect(result.provenance.generation).toBe(1);
  });

  it("places provenance.json in the correct provider subdirectory", async () => {
    const outputRoot = await createTempDir();

    const result = await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: mockScorecardResult,
      agentReadinessResult: mockAgentReadinessResult,
    });

    expect(result.provenancePath).toBe(path.join(outputRoot, "openai", "provenance.json"));
  });

  it("updates the registry.json catalog with a provenance reference", async () => {
    const outputRoot = await createTempDir();

    await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: mockScorecardResult,
      agentReadinessResult: mockAgentReadinessResult,
    });

    const catalogRaw = await readFile(path.join(outputRoot, "registry.json"), "utf8");
    const catalog = JSON.parse(catalogRaw) as {
      schemaVersion: string;
      providers: Record<string, { provenancePath: string; packageName: string }>;
    };
    expect(catalog.schemaVersion).toBe("1.0.0");
    expect(catalog.providers["openai"]).toBeDefined();
    expect(catalog.providers["openai"]?.provenancePath).toBe("./openai/provenance.json");
    expect(catalog.providers["openai"]?.packageName).toBe("@utdk/openai");
  });

  it("merges into existing registry.json catalog without clobbering other providers", async () => {
    const outputRoot = await createTempDir();

    const existing = {
      schemaVersion: "1.0.0",
      providers: {
        spotify: {
          packageName: "@utdk/spotify",
          provenancePath: "./spotify/provenance.json",
          generatedAt: "2026-01-01T00:00:00.000Z",
          bundlerVersion: "0.1.0",
        },
      },
    };
    await writeFile(path.join(outputRoot, "registry.json"), JSON.stringify(existing, null, 2), "utf8");

    await runShipPhase({
      provider: "openai",
      outputRoot,
      scorecardResult: mockScorecardResult,
      agentReadinessResult: mockAgentReadinessResult,
    });

    const catalogRaw = await readFile(path.join(outputRoot, "registry.json"), "utf8");
    const catalog = JSON.parse(catalogRaw) as { providers: Record<string, unknown> };
    expect(catalog.providers["spotify"]).toBeDefined();
    expect(catalog.providers["openai"]).toBeDefined();
  });
});
