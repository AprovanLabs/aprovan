import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_OUTPUT_ROOT, loadRegistryProviders, resolveProvider, resolveProviderOutputDir } from "../provider.js";

export type NpmPackageInfo = {
  name: string;
  version: string;
  description: string;
  category: "official-sdk" | "community-sdk" | "types" | "mcp-server" | "other";
};

export type ResearchGapAnalysis = {
  hasOfficialSdk: boolean;
  hasCommunitySDK: boolean;
  hasTypeDefinitions: boolean;
  hasMcpServer: boolean;
  recommendation: string;
};

export type ResearchResult = {
  provider: string;
  generatedAt: string;
  noveltyScore: number;
  npmPackages: NpmPackageInfo[];
  gapAnalysis: ResearchGapAnalysis;
};

export type RunResearchPhaseOptions = {
  provider: string;
  outputRoot?: string;
};

export type RunResearchPhaseResult = {
  provider: string;
  outputPath: string;
  research: ResearchResult;
};

type NpmSearchPackage = {
  name: string;
  version: string;
  description?: string;
};

type NpmSearchResponse = {
  objects?: Array<{ package: NpmSearchPackage }>;
};

function providerBaseName(providerName: string): string {
  const segments = providerName.split(/[./]/u);
  const leaf = segments[segments.length - 1] ?? providerName;
  return leaf.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function classifyPackage(
  packageName: string,
  baseName: string,
): "official-sdk" | "community-sdk" | "types" | "mcp-server" | "other" {
  const lower = packageName.toLowerCase();

  if (lower.startsWith("@types/")) {
    return "types";
  }

  if (lower.includes("mcp")) {
    return "mcp-server";
  }

  if (lower.startsWith(`@${baseName}/`) || lower === `@${baseName}`) {
    return "official-sdk";
  }

  if (
    lower.includes(baseName) &&
    (lower.includes("sdk") || lower.includes("client") || lower.includes("api"))
  ) {
    return "community-sdk";
  }

  return "other";
}

function buildGapAnalysis(packages: NpmPackageInfo[], providerName: string): ResearchGapAnalysis {
  const hasOfficialSdk = packages.some((p) => p.category === "official-sdk");
  const hasCommunitySDK = packages.some((p) => p.category === "community-sdk");
  const hasTypeDefinitions = packages.some((p) => p.category === "types");
  const hasMcpServer = packages.some((p) => p.category === "mcp-server");

  let recommendation: string;

  if (hasOfficialSdk) {
    recommendation = `An official SDK exists for ${providerName}. Consider wrapping it or focusing on gaps it does not cover.`;
  } else if (hasCommunitySDK) {
    recommendation = `Community SDKs exist for ${providerName}. Evaluate them before generating; focus on filling gaps they do not cover.`;
  } else {
    recommendation = `No existing TypeScript SDK found for ${providerName}. Generating from OpenAPI spec provides high value.`;
  }

  if (hasMcpServer) {
    recommendation += " An MCP server already exists; differentiate by offering better type coverage.";
  }

  return { hasOfficialSdk, hasCommunitySDK, hasTypeDefinitions, hasMcpServer, recommendation };
}

function computeNoveltyScore(gapAnalysis: ResearchGapAnalysis): number {
  let score = 10;
  if (gapAnalysis.hasOfficialSdk) score -= 4;
  if (gapAnalysis.hasCommunitySDK) score -= 2;
  if (gapAnalysis.hasTypeDefinitions) score -= 2;
  if (gapAnalysis.hasMcpServer) score -= 2;
  return Math.max(1, score);
}

async function fetchNpmSearch(query: string): Promise<NpmSearchResponse> {
  const url = `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=5`;
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) {
    return { objects: [] };
  }
  return response.json() as Promise<NpmSearchResponse>;
}

async function searchNpmPackages(providerName: string): Promise<NpmPackageInfo[]> {
  const baseName = providerBaseName(providerName);
  const queries = [`${baseName}-sdk`, `@types/${baseName}`, `mcp-server-${baseName}`, baseName];
  const seenNames = new Set<string>();
  const results: NpmPackageInfo[] = [];

  for (const query of queries) {
    try {
      const data = await fetchNpmSearch(query);
      for (const obj of data.objects ?? []) {
        const { package: pkg } = obj;
        if (seenNames.has(pkg.name)) continue;
        seenNames.add(pkg.name);
        results.push({
          name: pkg.name,
          version: pkg.version,
          description: pkg.description ?? "",
          category: classifyPackage(pkg.name, baseName),
        });
      }
    } catch {
      // ignore individual query failures
    }
  }

  return results;
}

export async function runResearchPhase(options: RunResearchPhaseOptions): Promise<RunResearchPhaseResult> {
  const outputRoot = options.outputRoot ?? DEFAULT_OUTPUT_ROOT;
  const providers = await loadRegistryProviders();
  const provider = resolveProvider(providers, options.provider);
  const providerDir = resolveProviderOutputDir(provider.name, outputRoot);

  const npmPackages = await searchNpmPackages(provider.name);
  const gapAnalysis = buildGapAnalysis(npmPackages, provider.name);
  const noveltyScore = computeNoveltyScore(gapAnalysis);

  const research: ResearchResult = {
    provider: provider.name,
    generatedAt: new Date().toISOString(),
    noveltyScore,
    npmPackages,
    gapAnalysis,
  };

  await mkdir(providerDir, { recursive: true });
  const outputPath = path.join(providerDir, "research.json");
  await writeFile(outputPath, JSON.stringify(research, null, 2).concat("\n"), "utf8");

  return { provider: provider.name, outputPath, research };
}
