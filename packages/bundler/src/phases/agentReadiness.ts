import { readFile } from "node:fs/promises";
import path from "node:path";
import { resolveProviderOutputDir } from "../provider.js";

export type AgentReadinessBlocker = {
  severity: "error" | "warning";
  code: string;
  message: string;
};

export type AgentReadinessResult = {
  provider: string;
  blockers: AgentReadinessBlocker[];
  passed: boolean;
};

export type RunAgentReadinessOptions = {
  provider: string;
  outputRoot: string;
};

async function readFileSafe(filePath: string): Promise<string | undefined> {
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return undefined;
  }
}

function checkTypesTs(content: string, blockers: AgentReadinessBlocker[]): void {
  if (!content.includes("export type") && !content.includes("export interface")) {
    blockers.push({
      severity: "error",
      code: "NO_EXPORTED_TYPES",
      message: "types.ts has no exported types or interfaces.",
    });
  }

  const anyMatches = content.match(/:\s*any\b/g);
  if (anyMatches && anyMatches.length > 5) {
    blockers.push({
      severity: "warning",
      code: "EXCESSIVE_ANY_TYPES",
      message: `types.ts contains ${anyMatches.length} occurrences of 'any' type, which reduces agent type-safety.`,
    });
  }
}

function checkPackageJson(content: string, blockers: AgentReadinessBlocker[]): void {
  let parsed: { utdk?: { auth?: unknown } };

  try {
    parsed = JSON.parse(content) as { utdk?: { auth?: unknown } };
  } catch {
    blockers.push({
      severity: "error",
      code: "INVALID_PACKAGE_JSON",
      message: "package.json is not valid JSON.",
    });
    return;
  }

  const auth = parsed.utdk?.auth;
  const hasAuth = Array.isArray(auth) ? auth.length > 0 : Boolean(auth);

  if (!hasAuth) {
    blockers.push({
      severity: "warning",
      code: "MISSING_AUTH_CONFIG",
      message: "package.json utdk.auth is not configured. Agents may not know how to authenticate.",
    });
  }
}

export async function runAgentReadiness(options: RunAgentReadinessOptions): Promise<AgentReadinessResult> {
  const providerDir = resolveProviderOutputDir(options.provider, options.outputRoot);
  const blockers: AgentReadinessBlocker[] = [];

  const [indexTs, typesTs, packageJson] = await Promise.all([
    readFileSafe(path.join(providerDir, "index.ts")),
    readFileSafe(path.join(providerDir, "types.ts")),
    readFileSafe(path.join(providerDir, "package.json")),
  ]);

  if (!indexTs) {
    blockers.push({
      severity: "error",
      code: "MISSING_INDEX_TS",
      message: "index.ts is missing. Run the scaffold phase first.",
    });
  }

  if (!typesTs) {
    blockers.push({
      severity: "error",
      code: "MISSING_TYPES_TS",
      message: "types.ts is missing. Run the scaffold phase first.",
    });
  } else {
    checkTypesTs(typesTs, blockers);
  }

  if (!packageJson) {
    blockers.push({
      severity: "error",
      code: "MISSING_PACKAGE_JSON",
      message: "package.json is missing. Run the scaffold phase first.",
    });
  } else {
    checkPackageJson(packageJson, blockers);
  }

  const errorBlockers = blockers.filter((b) => b.severity === "error");

  return {
    provider: options.provider,
    blockers,
    passed: errorBlockers.length === 0,
  };
}
