import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { runResearchPhase } from "./research.js";

const tempDirs: string[] = [];

async function createTempDir(): Promise<string> {
  const dir = await mkdtemp(path.join(tmpdir(), "bundler-research-"));
  tempDirs.push(dir);
  return dir;
}

function makeNpmResponse(packages: Array<{ name: string; version: string; description?: string }>) {
  return new Response(
    JSON.stringify({
      objects: packages.map((pkg) => ({ package: pkg })),
      total: packages.length,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}

afterEach(async () => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("runResearchPhase", () => {
  it("computes novelty score 10 when npm search returns no relevant packages", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => makeNpmResponse([])),
    );

    const outputRoot = await createTempDir();
    const result = await runResearchPhase({ provider: "openai", outputRoot });

    expect(result.research.noveltyScore).toBe(10);
    expect(result.research.npmPackages).toHaveLength(0);
    expect(result.research.gapAnalysis.hasOfficialSdk).toBe(false);
    expect(result.research.gapAnalysis.hasCommunitySDK).toBe(false);
    expect(result.research.gapAnalysis.hasMcpServer).toBe(false);
    expect(result.research.gapAnalysis.hasTypeDefinitions).toBe(false);
  });

  it("detects official SDK and reduces novelty score", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: RequestInfo | URL) => {
        const urlStr = String(url);
        if (urlStr.includes("openai-sdk")) {
          return makeNpmResponse([
            { name: "@openai/sdk", version: "1.0.0", description: "Official OpenAI SDK" },
          ]);
        }
        return makeNpmResponse([]);
      }),
    );

    const outputRoot = await createTempDir();
    const result = await runResearchPhase({ provider: "openai", outputRoot });

    expect(result.research.noveltyScore).toBeLessThanOrEqual(6);
    expect(result.research.gapAnalysis.hasOfficialSdk).toBe(true);
    expect(result.research.gapAnalysis.recommendation).toContain("official SDK");
  });

  it("detects MCP server and adjusts novelty score", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: RequestInfo | URL) => {
        const urlStr = String(url);
        if (urlStr.includes("mcp-server-openai")) {
          return makeNpmResponse([
            { name: "mcp-server-openai", version: "0.1.0", description: "MCP server for OpenAI" },
          ]);
        }
        return makeNpmResponse([]);
      }),
    );

    const outputRoot = await createTempDir();
    const result = await runResearchPhase({ provider: "openai", outputRoot });

    expect(result.research.gapAnalysis.hasMcpServer).toBe(true);
    expect(result.research.noveltyScore).toBeLessThan(10);
  });

  it("detects type definitions", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: RequestInfo | URL) => {
        const urlStr = String(url);
        if (urlStr.includes("%40types%2Fopenai")) {
          return makeNpmResponse([
            { name: "@types/openai", version: "4.0.0", description: "TypeScript defs for OpenAI" },
          ]);
        }
        return makeNpmResponse([]);
      }),
    );

    const outputRoot = await createTempDir();
    const result = await runResearchPhase({ provider: "openai", outputRoot });

    expect(result.research.gapAnalysis.hasTypeDefinitions).toBe(true);
  });

  it("writes research.json to the provider output directory", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => makeNpmResponse([])),
    );

    const outputRoot = await createTempDir();
    const result = await runResearchPhase({ provider: "openai", outputRoot });

    expect(result.outputPath).toContain("research.json");

    const content = await readFile(result.outputPath, "utf8");
    const parsed = JSON.parse(content) as {
      provider: string;
      noveltyScore: number;
      gapAnalysis: { hasOfficialSdk: boolean };
    };

    expect(parsed.provider).toBe("openai");
    expect(typeof parsed.noveltyScore).toBe("number");
    expect(parsed.noveltyScore).toBeGreaterThanOrEqual(1);
    expect(parsed.noveltyScore).toBeLessThanOrEqual(10);
  });

  it("handles npm fetch failures gracefully and returns empty packages", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("Network error");
      }),
    );

    const outputRoot = await createTempDir();
    const result = await runResearchPhase({ provider: "openai", outputRoot });

    expect(result.research.npmPackages).toHaveLength(0);
    expect(result.research.noveltyScore).toBe(10);
  });

  it("returns provider name and generatedAt timestamp", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => makeNpmResponse([])),
    );

    const outputRoot = await createTempDir();
    const result = await runResearchPhase({ provider: "openai", outputRoot });

    expect(result.provider).toBe("openai");
    expect(result.research.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/u);
  });
});
