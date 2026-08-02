import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  DEFAULT_OUTPUT_ROOT,
  getProviderImportSpecifier,
  loadRegistryProviders,
  resolveProvider,
  resolveProviderOutputDir,
  resolveRepoPath,
  splitProviderName,
} from "../provider.js";
import { runScorecard, type ScorecardResult } from "../verification/scorecard.js";
import { runAgentReadiness, type AgentReadinessResult } from "./agentReadiness.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ProvenanceSource = {
  type: "openapi";
  url: string;
  hash: string;
  fetchedAt: string;
};

export type ProvenancePipelineResearch = {
  noveltyScore: number;
  competingPackages: number;
};

export type ProvenancePipeline = {
  research: ProvenancePipelineResearch | null;
  scorecard: {
    infrastructure: "pass" | "fail";
    domain: number;
  };
  agentReadiness: "pass" | "fail";
};

export type ProvenanceManifest = {
  provider: string;
  generatedAt: string;
  generation: number;
  source: ProvenanceSource;
  ingestSource: string;
  pipeline: ProvenancePipeline;
  bundlerVersion: string;
};

export type RunShipPhaseOptions = {
  provider: string;
  outputRoot?: string;
  scorecardResult?: ScorecardResult;
  agentReadinessResult?: AgentReadinessResult;
};

export type RunShipPhaseResult = {
  provider: string;
  provenancePath: string;
  provenance: ProvenanceManifest;
};

// ---------------------------------------------------------------------------
// Catalog types
// ---------------------------------------------------------------------------

type CatalogEntry = {
  packageName: string;
  provenancePath: string;
  generatedAt: string;
  bundlerVersion: string;
};

type Catalog = {
  schemaVersion: string;
  providers: Record<string, CatalogEntry>;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function readFileSafe(filePath: string): Promise<string | undefined> {
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return undefined;
  }
}

function hashContent(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

function getGeneration(packageJson: string | undefined): number {
  if (!packageJson) return 1;
  try {
    const parsed = JSON.parse(packageJson) as { utdk?: { generation?: unknown } };
    const gen = parsed.utdk?.generation;
    return typeof gen === "number" ? gen : 1;
  } catch {
    return 1;
  }
}

async function getBundlerVersion(): Promise<string> {
  // resolveRepoPath is anchored to provider.ts in the bundler source.
  // Navigate from the repo root to the bundler package.json.
  const pkgPath = resolveRepoPath("packages", "bundler", "package.json");
  try {
    const content = await readFile(pkgPath, "utf8");
    const pkg = JSON.parse(content) as { version?: string };
    return typeof pkg.version === "string" && pkg.version ? pkg.version : "0.0.0";
  } catch {
    return "0.0.0";
  }
}

function parseResearch(researchJson: string | undefined): ProvenancePipelineResearch | null {
  if (!researchJson) return null;
  try {
    const parsed = JSON.parse(researchJson) as {
      noveltyScore?: unknown;
      npmPackages?: unknown[];
    };
    const noveltyScore = typeof parsed.noveltyScore === "number" ? parsed.noveltyScore : 0;
    const competingPackages = Array.isArray(parsed.npmPackages) ? parsed.npmPackages.length : 0;
    return { noveltyScore, competingPackages };
  } catch {
    return null;
  }
}

async function updateCatalog(
  outputRoot: string,
  providerName: string,
  entry: CatalogEntry,
): Promise<void> {
  const catalogPath = path.join(outputRoot, "registry.json");
  let catalog: Catalog = { schemaVersion: "1.0.0", providers: {} };

  const existing = await readFileSafe(catalogPath);
  if (existing) {
    try {
      const parsed = JSON.parse(existing) as Catalog;
      if (
        parsed &&
        typeof parsed === "object" &&
        parsed.providers &&
        typeof parsed.providers === "object"
      ) {
        catalog = parsed;
      }
    } catch {
      // use default empty catalog on parse failure
    }
  }

  catalog.providers[providerName] = entry;
  await writeFile(catalogPath, JSON.stringify(catalog, null, 2).concat("\n"), "utf8");
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function runShipPhase(options: RunShipPhaseOptions): Promise<RunShipPhaseResult> {
  const outputRoot = options.outputRoot ?? DEFAULT_OUTPUT_ROOT;
  const providers = await loadRegistryProviders();
  const provider = resolveProvider(providers, options.provider);
  const providerDir = resolveProviderOutputDir(provider.name, outputRoot);
  const generatedAt = new Date().toISOString();

  const [researchJson, packageJson, openApiJson] = await Promise.all([
    readFileSafe(path.join(providerDir, "research.json")),
    readFileSafe(path.join(providerDir, "package.json")),
    readFileSafe(path.join(providerDir, "openapi.json")),
  ]);

  const scorecard =
    options.scorecardResult ?? (await runScorecard({ provider: provider.name, outputRoot }));

  const agentReadiness =
    options.agentReadinessResult ??
    (await runAgentReadiness({ provider: provider.name, outputRoot }));

  const generation = getGeneration(packageJson);
  const bundlerVersion = await getBundlerVersion();
  const sourceHash = openApiJson ? `sha256:${hashContent(openApiJson)}` : "";
  const research = parseResearch(researchJson);

  const provenance: ProvenanceManifest = {
    provider: provider.name,
    generatedAt,
    generation,
    source: {
      type: "openapi",
      url: provider.url,
      hash: sourceHash,
      fetchedAt: generatedAt,
    },
    ingestSource: provider.ingestSource ?? "manual",
    pipeline: {
      research,
      scorecard: {
        infrastructure: scorecard.infrastructure.allPassed ? "pass" : "fail",
        domain: scorecard.domain.total,
      },
      agentReadiness: agentReadiness.passed ? "pass" : "fail",
    },
    bundlerVersion,
  };

  await mkdir(providerDir, { recursive: true });
  const provenancePath = path.join(providerDir, "provenance.json");
  await writeFile(provenancePath, JSON.stringify(provenance, null, 2).concat("\n"), "utf8");

  // Update the output catalog so consumers can discover provenance per provider
  await updateCatalog(outputRoot, provider.name, {
    packageName: getProviderImportSpecifier(provider.name),
    provenancePath: `./${splitProviderName(provider.name).join("/")}/provenance.json`,
    generatedAt,
    bundlerVersion,
  });

  return { provider: provider.name, provenancePath, provenance };
}
