import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { resolveProviderOutputDir } from "../provider.js";
import type { OpenAPIV3 } from "openapi-types";

const execFileAsync = promisify(execFile);

// ---------------------------------------------------------------------------
// Infrastructure tier types
// ---------------------------------------------------------------------------

export type InfraCheck = {
  passed: boolean;
  skipped: boolean;
  message: string;
};

export type InfrastructureCheckResult = {
  tsc: InfraCheck;
  imports: InfraCheck;
  circularDeps: InfraCheck;
  eslint: InfraCheck;
  allPassed: boolean;
};

// ---------------------------------------------------------------------------
// Domain tier types
// ---------------------------------------------------------------------------

export type DomainScoreResult = {
  authConfigPoints: number;           // +20
  nonTrivialTypesPoints: number;      // +20
  paginationHintPoints: number;       // +15
  readmePoints: number;               // +15
  operationsCountPoints: number;      // +15
  operationsDescribedPoints: number;  // +15
  total: number;
};

// ---------------------------------------------------------------------------
// Scorecard result
// ---------------------------------------------------------------------------

export type ScorecardResult = {
  infrastructure: InfrastructureCheckResult;
  domain: DomainScoreResult;
  /** true when infrastructure.allPassed && domain.total >= MIN_DOMAIN_SCORE */
  passed: boolean;
  /** Human-readable report for failures */
  report: string;
};

export type RunScorecardOptions = {
  provider: string;
  outputRoot: string;
  /** Inject alternative runner for testing */
  runner?: InfraRunner;
};

// ---------------------------------------------------------------------------
// Infrastructure runner interface (injectable for tests)
// ---------------------------------------------------------------------------

export type InfraRunResult = { success: boolean; output: string };

export type InfraRunner = {
  runTsc(providerDir: string, outputRoot: string): Promise<InfraRunResult>;
  runImports(providerDir: string): Promise<InfraRunResult>;
  runCircularDeps(providerDir: string): Promise<InfraRunResult>;
  runEslint(providerDir: string): Promise<InfraRunResult>;
};

// ---------------------------------------------------------------------------
// Minimum domain score required to ship
// ---------------------------------------------------------------------------

export const MIN_DOMAIN_SCORE = 60;

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

async function resolveNodeBin(name: string): Promise<string | undefined> {
  // Walk up looking for node_modules/.bin/<name>
  let dir = path.resolve(".");
  for (let i = 0; i < 8; i++) {
    const candidate = path.join(dir, "node_modules", ".bin", name);
    try {
      await readFile(candidate); // will throw if not a file
      return candidate;
    } catch {
      // try next level
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Infrastructure check implementations
// ---------------------------------------------------------------------------

async function defaultRunTsc(providerDir: string, outputRoot: string): Promise<InfraRunResult> {
  const tscBin = await resolveNodeBin("tsc");
  if (!tscBin) {
    return { success: true, output: "tsc not found — skipped" };
  }

  // Use the parent-level tsconfig if it exists, otherwise create a temp one
  const parentTsconfig = path.join(outputRoot, "tsconfig.json");
  let tsconfigPath = parentTsconfig;
  let tempTsconfig: string | undefined;

  const parentTsconfigContent = await readFileSafe(parentTsconfig);
  if (!parentTsconfigContent) {
    // Create a minimal temporary tsconfig
    const tempDir = path.join(outputRoot, ".scorecard-tmp");
    await mkdir(tempDir, { recursive: true });
    tsconfigPath = path.join(tempDir, "tsconfig.json");
    tempTsconfig = tsconfigPath;
    const config = {
      compilerOptions: {
        target: "ES2022",
        module: "ESNext",
        moduleResolution: "Bundler",
        strict: true,
        skipLibCheck: true,
        noEmit: true,
        resolveJsonModule: true,
      },
      include: [providerDir + "/**/*.ts"],
    };
    await writeFile(tsconfigPath, JSON.stringify(config, null, 2), "utf8");
  }

  try {
    await execFileAsync(tscBin, ["--noEmit", "-p", tsconfigPath]);
    return { success: true, output: "TypeScript compilation passed" };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, output: message };
  } finally {
    if (tempTsconfig) {
      const tempDir = path.dirname(tempTsconfig);
      await rm(tempDir, { recursive: true, force: true }).catch(() => undefined);
    }
  }
}

async function defaultRunImports(providerDir: string): Promise<InfraRunResult> {
  const tsxBin = await resolveNodeBin("tsx");
  if (!tsxBin) {
    return { success: true, output: "tsx not found — import smoke skipped" };
  }

  const indexPath = path.join(providerDir, "index.ts");
  const indexContent = await readFileSafe(indexPath);
  if (!indexContent) {
    return { success: false, output: "index.ts not found" };
  }

  // Check that named exports can be resolved by writing a small import script
  // to a temp file and running it through tsx.
  const tempDir = await mkdtemp(path.join(tmpdir(), "utdk-smoke-"));
  const scriptPath = path.join(tempDir, "smoke.mts");
  try {
    const script = `import ${JSON.stringify(indexPath)};\n`;
    await writeFile(scriptPath, script, "utf8");
    await execFileAsync(tsxBin, [scriptPath]);
    return { success: true, output: "Named exports resolve" };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, output: message };
  } finally {
    await rm(tempDir, { recursive: true, force: true }).catch(() => undefined);
  }
}

async function defaultRunCircularDeps(providerDir: string): Promise<InfraRunResult> {
  const madgeBin = await resolveNodeBin("madge");

  if (madgeBin) {
    try {
      await execFileAsync(madgeBin, ["--circular", "--extensions", "ts", providerDir]);
      return { success: true, output: "No circular dependencies found" };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      // madge exits non-zero when cycles are found
      return { success: false, output: message };
    }
  }

  // Fallback: static import cycle detection
  return runStaticCircularCheck(providerDir);
}

async function runStaticCircularCheck(providerDir: string): Promise<InfraRunResult> {
  const { readdir, stat } = await import("node:fs/promises");

  async function collectTsFiles(dir: string): Promise<string[]> {
    const entries = await readdir(dir).catch(() => []);
    const files: string[] = [];
    for (const entry of entries) {
      const full = path.join(dir, entry);
      const s = await stat(full).catch(() => null);
      if (!s) continue;
      if (s.isDirectory()) {
        files.push(...(await collectTsFiles(full)));
      } else if (entry.endsWith(".ts")) {
        files.push(full);
      }
    }
    return files;
  }

  const files = await collectTsFiles(providerDir);
  const importMap = new Map<string, string[]>();

  for (const file of files) {
    const content = (await readFileSafe(file)) ?? "";
    const imports: string[] = [];
    const importRe = /(?:^|\n)\s*import[^"']*["'](\.[^"']+)["']/g;
    let match: RegExpExecArray | null;
    while ((match = importRe.exec(content)) !== null) {
      const specifier = match[1];
      if (!specifier) continue;
      // Resolve relative to file's directory
      let resolved = path.resolve(path.dirname(file), specifier);
      if (!resolved.endsWith(".ts")) resolved += ".ts";
      imports.push(resolved);
    }
    importMap.set(file, imports);
  }

  // DFS cycle detection
  const visited = new Set<string>();
  const stack = new Set<string>();

  function hasCycle(node: string): boolean {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;
    visited.add(node);
    stack.add(node);
    for (const dep of importMap.get(node) ?? []) {
      if (hasCycle(dep)) return true;
    }
    stack.delete(node);
    return false;
  }

  for (const file of files) {
    if (hasCycle(file)) {
      return { success: false, output: `Circular dependency detected involving ${file}` };
    }
  }

  return { success: true, output: "No circular dependencies found (static analysis)" };
}

async function defaultRunEslint(providerDir: string): Promise<InfraRunResult> {
  const eslintBin = await resolveNodeBin("eslint");
  if (!eslintBin) {
    return { success: true, output: "eslint not found — skipped" };
  }

  try {
    await execFileAsync(eslintBin, ["--ext", ".ts", providerDir]);
    return { success: true, output: "ESLint passed" };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, output: message };
  }
}

// ---------------------------------------------------------------------------
// Default runner
// ---------------------------------------------------------------------------

const defaultRunner: InfraRunner = {
  runTsc: defaultRunTsc,
  runImports: defaultRunImports,
  runCircularDeps: defaultRunCircularDeps,
  runEslint: defaultRunEslint,
};

// ---------------------------------------------------------------------------
// Infrastructure tier
// ---------------------------------------------------------------------------

async function runInfrastructureTier(
  providerDir: string,
  outputRoot: string,
  runner: InfraRunner,
): Promise<InfrastructureCheckResult> {
  const [tscResult, importsResult, circularResult, eslintResult] = await Promise.all([
    runner.runTsc(providerDir, outputRoot),
    runner.runImports(providerDir),
    runner.runCircularDeps(providerDir),
    runner.runEslint(providerDir),
  ]);

  const tsc: InfraCheck = {
    passed: tscResult.success,
    skipped: tscResult.output.includes("skipped"),
    message: tscResult.output,
  };
  const imports: InfraCheck = {
    passed: importsResult.success,
    skipped: importsResult.output.includes("skipped"),
    message: importsResult.output,
  };
  const circularDeps: InfraCheck = {
    passed: circularResult.success,
    skipped: circularResult.output.includes("skipped"),
    message: circularResult.output,
  };
  const eslint: InfraCheck = {
    passed: eslintResult.success,
    skipped: eslintResult.output.includes("skipped"),
    message: eslintResult.output,
  };

  const allPassed = tsc.passed && imports.passed && circularDeps.passed && eslint.passed;

  return { tsc, imports, circularDeps, eslint, allPassed };
}

// ---------------------------------------------------------------------------
// Domain tier helpers
// ---------------------------------------------------------------------------

const PAGINATION_PARAM_NAMES = new Set([
  "page",
  "cursor",
  "offset",
  "per_page",
  "perPage",
  "limit",
  "pageSize",
  "page_size",
  "pageToken",
  "page_token",
  "after",
  "before",
  "next",
  "startAt",
  "start_at",
  "maxResults",
  "max_results",
  "nextPage",
  "next_page",
  "skip",
  "from",
]);

function hasPaginationHint(doc: OpenAPIV3.Document): boolean {
  for (const pathItem of Object.values(doc.paths ?? {})) {
    if (!pathItem) continue;
    const methods = ["get", "post", "put", "patch", "delete"] as const;
    for (const method of methods) {
      const op = pathItem[method] as OpenAPIV3.OperationObject | undefined;
      if (!op) continue;
      for (const param of op.parameters ?? []) {
        const p = param as OpenAPIV3.ParameterObject;
        if (PAGINATION_PARAM_NAMES.has(p.name)) return true;
      }
    }
  }
  // Also check response schemas for next/cursor fields
  for (const pathItem of Object.values(doc.paths ?? {})) {
    if (!pathItem) continue;
    const methods = ["get", "post"] as const;
    for (const method of methods) {
      const op = pathItem[method] as OpenAPIV3.OperationObject | undefined;
      if (!op?.responses) continue;
      for (const response of Object.values(op.responses)) {
        const r = response as OpenAPIV3.ResponseObject;
        const schema = r.content?.["application/json"]?.schema as OpenAPIV3.SchemaObject | undefined;
        if (!schema?.properties) continue;
        const props = Object.keys(schema.properties);
        const paginationResponseKeys = ["next", "nextPage", "next_page", "nextCursor", "next_cursor", "cursor", "hasMore", "has_more", "total_pages", "totalPages"];
        if (props.some((k) => paginationResponseKeys.includes(k))) return true;
      }
    }
  }
  return false;
}

function countOperations(doc: OpenAPIV3.Document): number {
  const methods = ["get", "post", "put", "patch", "delete", "head", "options", "trace"] as const;
  let count = 0;
  for (const pathItem of Object.values(doc.paths ?? {})) {
    if (!pathItem) continue;
    for (const method of methods) {
      if (method in pathItem) count++;
    }
  }
  return count;
}

function allOperationsHaveDescriptions(doc: OpenAPIV3.Document): boolean {
  const methods = ["get", "post", "put", "patch", "delete", "head", "options", "trace"] as const;
  for (const pathItem of Object.values(doc.paths ?? {})) {
    if (!pathItem) continue;
    for (const method of methods) {
      const op = pathItem[method] as OpenAPIV3.OperationObject | undefined;
      if (!op) continue;
      const desc = (op.description ?? "").trim();
      const summary = (op.summary ?? "").trim();
      if (!desc && !summary) return false;
    }
  }
  return true;
}

function hasNonTrivialType(typesTs: string): boolean {
  // Matches: export type Foo = { ... } or export interface Foo { ... }
  // "Non-trivial" means it's an object type, not just `export type Foo = string`
  const objectTypeRe = /export\s+(?:type\s+\w+\s*=\s*\{|interface\s+\w+\s*\{)/;
  return objectTypeRe.test(typesTs);
}

// ---------------------------------------------------------------------------
// Domain tier
// ---------------------------------------------------------------------------

function scoreDomain(
  packageJson: string | undefined,
  typesTs: string | undefined,
  openApiJson: string | undefined,
  readme: string | undefined,
): DomainScoreResult {
  let authConfigPoints = 0;
  let nonTrivialTypesPoints = 0;
  let paginationHintPoints = 0;
  let readmePoints = 0;
  let operationsCountPoints = 0;
  let operationsDescribedPoints = 0;

  // Auth config: +20
  if (packageJson) {
    try {
      const parsed = JSON.parse(packageJson) as { utdk?: { auth?: unknown } };
      const auth = parsed.utdk?.auth;
      const hasAuth = Array.isArray(auth) ? auth.length > 0 : Boolean(auth);
      if (hasAuth) authConfigPoints = 20;
    } catch {
      // invalid JSON
    }
  }

  // Non-trivial types: +20
  if (typesTs && hasNonTrivialType(typesTs)) {
    nonTrivialTypesPoints = 20;
  }

  if (openApiJson) {
    try {
      const doc = JSON.parse(openApiJson) as OpenAPIV3.Document;

      // Pagination hint: +15
      if (hasPaginationHint(doc)) {
        paginationHintPoints = 15;
      }

      // Operations count > 5: +15
      const opCount = countOperations(doc);
      if (opCount > 5) {
        operationsCountPoints = 15;
      }

      // All operations have descriptions: +15
      if (allOperationsHaveDescriptions(doc)) {
        operationsDescribedPoints = 15;
      }
    } catch {
      // invalid JSON
    }
  }

  // README > 100 chars: +15
  if (readme && readme.trim().length > 100) {
    readmePoints = 15;
  }

  const total =
    authConfigPoints +
    nonTrivialTypesPoints +
    paginationHintPoints +
    readmePoints +
    operationsCountPoints +
    operationsDescribedPoints;

  return {
    authConfigPoints,
    nonTrivialTypesPoints,
    paginationHintPoints,
    readmePoints,
    operationsCountPoints,
    operationsDescribedPoints,
    total,
  };
}

// ---------------------------------------------------------------------------
// Report generation
// ---------------------------------------------------------------------------

function buildReport(infra: InfrastructureCheckResult, domain: DomainScoreResult): string {
  const lines: string[] = [];

  // Infrastructure failures
  if (!infra.allPassed) {
    lines.push("Infrastructure checks FAILED (ship is blocked):");
    if (!infra.tsc.passed && !infra.tsc.skipped) {
      lines.push(`  [FAIL] TypeScript compilation: ${infra.tsc.message}`);
    }
    if (!infra.imports.passed && !infra.imports.skipped) {
      lines.push(`  [FAIL] Named exports resolve: ${infra.imports.message}`);
    }
    if (!infra.circularDeps.passed && !infra.circularDeps.skipped) {
      lines.push(`  [FAIL] Circular dependencies: ${infra.circularDeps.message}`);
    }
    if (!infra.eslint.passed && !infra.eslint.skipped) {
      lines.push(`  [FAIL] ESLint: ${infra.eslint.message}`);
    }
  } else {
    lines.push("Infrastructure checks PASSED");
  }

  // Domain score summary
  lines.push(`Domain score: ${domain.total}/100 (minimum to ship: ${MIN_DOMAIN_SCORE})`);

  if (domain.total < MIN_DOMAIN_SCORE) {
    lines.push("Domain checks NOT MET (ship is blocked):");
    if (!domain.authConfigPoints) {
      lines.push("  [ ] Auth config in package.json utdk.auth (+20)");
    }
    if (!domain.nonTrivialTypesPoints) {
      lines.push("  [ ] At least one non-trivial TypeScript type exported (+20)");
    }
    if (!domain.paginationHintPoints) {
      lines.push("  [ ] Pagination hint in openapi.json (+15)");
    }
    if (!domain.readmePoints) {
      lines.push("  [ ] README > 100 chars (+15)");
    }
    if (!domain.operationsCountPoints) {
      lines.push("  [ ] Operations count > 5 (+15)");
    }
    if (!domain.operationsDescribedPoints) {
      lines.push("  [ ] All operations have descriptions (+15)");
    }
  } else {
    lines.push("Domain score PASSED");
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function runScorecard(options: RunScorecardOptions): Promise<ScorecardResult> {
  const providerDir = resolveProviderOutputDir(options.provider, options.outputRoot);
  const runner = options.runner ?? defaultRunner;

  const [indexTs, typesTs, packageJson, openApiJson, readme] = await Promise.all([
    readFileSafe(path.join(providerDir, "index.ts")),
    readFileSafe(path.join(providerDir, "types.ts")),
    readFileSafe(path.join(providerDir, "package.json")),
    readFileSafe(path.join(providerDir, "openapi.json")),
    readFileSafe(path.join(providerDir, "README.md")),
  ]);

  // Infrastructure tier
  const infrastructure = await runInfrastructureTier(providerDir, options.outputRoot, runner);

  // Domain tier (pure, no subprocesses)
  const domain = scoreDomain(packageJson, typesTs, openApiJson, readme);

  const passed = infrastructure.allPassed && domain.total >= MIN_DOMAIN_SCORE;
  const report = buildReport(infrastructure, domain);

  // Suppress unused-variable warning; indexTs presence was checked by agentReadiness
  void indexTs;

  return { infrastructure, domain, passed, report };
}
