import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildClientToolMap } from "./client-api.js";
import { augmentProviderDocs, type AugmentProviderDocsResult } from "./docs/augment.js";
import { loadProviderDocs, type LoadProviderDocsOptions, type LoadProviderDocsResult } from "./docs/load.js";
import { applyProviderOpenApiOptions, buildPublicTypeMap, loadOpenApiDocument } from "./openapi.js";
import { runAuthIntelPhase, type RunAuthIntelPhaseOptions, type RunAuthIntelPhaseResult } from "./phases/authIntel.js";
import {
  runWebhookIntelPhase,
  type RunWebhookIntelPhaseOptions,
  type RunWebhookIntelPhaseResult,
} from "./phases/webhookIntel.js";
import { runEnrichPhase, type RunEnrichPhaseOptions, type RunEnrichPhaseResult } from "./phases/enrich.js";
import { runResearchPhase, type RunResearchPhaseOptions, type RunResearchPhaseResult } from "./phases/research.js";
import { runReviewPhase, type RunReviewPhaseOptions, type RunReviewPhaseResult } from "./phases/review.js";
import { runShipPhase, type RunShipPhaseOptions, type RunShipPhaseResult } from "./phases/ship.js";
import {
  DEFAULT_DOCS_CACHE_ROOT,
  DEFAULT_OUTPUT_ROOT,
  getProviderClientImportPath,
  getProviderPackageRootName,
  loadRegistryProviders,
  resolveProvider,
  resolveProviderDocsOutputDir,
  resolveProviderOutputDir,
  resolveProviderPackageRootDir,
  splitProviderName,
} from "./provider.js";
import {
  createProviderSchemaTypes,
  createSchemaRenderContext,
  renderCopyAssetsScript,
  renderNamespaceEntry,
  renderNamespacePackageJson,
  renderRootClient,
  renderProviderEntry,
  renderProviderGroupTypes,
  renderProviderMetadata,
  renderProviderPackageJson,
  renderProviderReadme,
  renderProviderTypesIndex,
  renderRootPackageEntry,
  renderRootPackageJson,
  renderRootTsconfig,
} from "./render.js";
import { loadProviderTools, normalizeOpenApiDocument } from "./utcp.js";
import type { OpenAPIV3 } from "openapi-types";

export {
  runAuthIntelPhase,
  type RunAuthIntelPhaseOptions,
  type RunAuthIntelPhaseResult,
  runWebhookIntelPhase,
  type RunWebhookIntelPhaseOptions,
  type RunWebhookIntelPhaseResult,
  runResearchPhase,
  type RunResearchPhaseOptions,
  type RunResearchPhaseResult,
  runEnrichPhase,
  type RunEnrichPhaseOptions,
  type RunEnrichPhaseResult,
  runReviewPhase,
  type RunReviewPhaseOptions,
  type RunReviewPhaseResult,
  runShipPhase,
  type RunShipPhaseOptions,
  type RunShipPhaseResult,
};

export type GenerateRegistryTypesOptions = {
  provider: string;
  outputRoot?: string;
  /**
   * Spec to generate from. Defaults to fetching `provider.url`. Pass the
   * already-shipped `openapi.json` to re-run codegen against the exact document
   * a provider currently ships, so the diff is codegen-only and does not fold in
   * whatever upstream changed since the provider was last generated.
   */
  openApiDocument?: OpenAPIV3.Document;
};

export type GenerateRegistryTypesResult = {
  provider: string;
  outputPaths: string[];
  toolCount: number;
};

export type LoadRegistryProviderDocsOptions = LoadProviderDocsOptions;
export type LoadRegistryProviderDocsResult = LoadProviderDocsResult;

export type AugmentRegistryProviderDocsOptions = {
  provider: string;
  docsCacheRoot?: string;
  outputRoot?: string;
  overwriteDocs?: boolean;
};

export type AugmentRegistryProviderDocsResult = {
  provider: string;
  readmePath: string;
  docsPaths: string[];
  packageJsonPath: string;
  staleReason: string;
  metadata: AugmentProviderDocsResult["metadata"];
};

async function writeTextFile(filePath: string, contents: string): Promise<string> {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, contents, "utf8");
  return filePath;
}

async function readOptionalTextFile(filePath: string): Promise<string | undefined> {
  try {
    return await readFile(filePath, "utf8");
  } catch (error: unknown) {
    if (typeof error === "object" && error && "code" in error && error.code === "ENOENT") {
      return undefined;
    }

    throw error;
  }
}

export async function loadRegistryProviderDocs(
  options: LoadRegistryProviderDocsOptions,
): Promise<LoadRegistryProviderDocsResult> {
  return loadProviderDocs(options);
}

export async function augmentRegistryProviderDocs(
  options: AugmentRegistryProviderDocsOptions,
): Promise<AugmentRegistryProviderDocsResult> {
  const docsCacheRoot = options.docsCacheRoot ?? DEFAULT_DOCS_CACHE_ROOT;
  const outputRoot = options.outputRoot ?? DEFAULT_OUTPUT_ROOT;
  const providers = await loadRegistryProviders();
  const provider = resolveProvider(providers, options.provider);
  const rawOpenApiDocument = await loadOpenApiDocument(provider);
  // Same single-document rule as generateRegistryTypes: docs describe the tools,
  // so they must be built from the document the tools were converted from.
  const openApiDocument = normalizeOpenApiDocument(applyProviderOpenApiOptions(rawOpenApiDocument, provider));
  const { tools } = await loadProviderTools(provider, openApiDocument);
  const clientToolMap = buildClientToolMap(openApiDocument, tools, provider);
  const augmented = await augmentProviderDocs({
    provider: provider.name,
    providerOptions: provider.options,
    openApiDocument,
    tools,
    clientToolMap,
    docsCacheRoot,
    outputRoot,
    overwriteDocs: options.overwriteDocs,
  });
  const providerDir = resolveProviderOutputDir(provider.name, outputRoot);
  const readmePath = path.join(providerDir, "README.md");
  const docsDir = resolveProviderDocsOutputDir(provider.name, outputRoot);
  const packageJsonPath = path.join(providerDir, "package.json");
  const previousPackageJson = await readOptionalTextFile(packageJsonPath);

  await rm(docsDir, { recursive: true, force: true });

  const docsPaths = await Promise.all(
    augmented.docs.map((doc) => writeTextFile(path.join(docsDir, doc.relativePath), doc.content)),
  );

  await Promise.all([
    writeTextFile(
      readmePath,
      renderProviderReadme(provider, {
        generatedReadme: augmented.readme,
      }),
    ),
    writeTextFile(
      packageJsonPath,
      renderProviderPackageJson(provider, openApiDocument, previousPackageJson, undefined, {
        docsMetadata: augmented.metadata,
        // Suite leaves are private subpaths of the root "utdk" package —
        // keep the docs rewrite consistent with the scaffold.
        includePackageName: splitProviderName(provider.name).length === 1,
      }),
    ),
  ]);

  return {
    provider: provider.name,
    readmePath,
    docsPaths,
    packageJsonPath,
    staleReason: augmented.staleReason,
    metadata: augmented.metadata,
  };
}

export async function generateRegistryTypes(
  options: GenerateRegistryTypesOptions,
): Promise<GenerateRegistryTypesResult> {
  const providers = await loadRegistryProviders();
  const provider = resolveProvider(providers, options.provider);
  const rawOpenApiDocument = options.openApiDocument ?? (await loadOpenApiDocument(provider));
  // One document, used for everything: tool conversion, the public type map,
  // the client tool map, and the `openapi.json` we ship. The generated provider
  // entry re-reads that file at runtime and `createClient` will re-convert it
  // whenever `toolMetadata` is empty, so the shipped artifact has to be the
  // exact document the build converted — un-normalized, a spec without
  // `operationId`s converts to zero tools at runtime while converting fine here.
  const openApiDocument = normalizeOpenApiDocument(applyProviderOpenApiOptions(rawOpenApiDocument, provider));
  const { tools } = await loadProviderTools(provider, openApiDocument);
  // Built up front so the public type map shares the renderer's named component
  // types. Without it, response `$ref`s get inlined here — unbounded work on
  // specs whose components reference each other heavily.
  const schemaTypes = createProviderSchemaTypes(openApiDocument);
  const publicTypeMap = buildPublicTypeMap(openApiDocument, tools, createSchemaRenderContext(schemaTypes));
  const clientToolMap = buildClientToolMap(openApiDocument, tools, provider);

  const outputRoot = options.outputRoot ?? DEFAULT_OUTPUT_ROOT;
  const providerDir = resolveProviderOutputDir(provider.name, outputRoot);
  const providerPackageRootDir = resolveProviderPackageRootDir(provider.name, outputRoot);
  const providerPackageJsonPath = path.join(providerPackageRootDir, "package.json");
  const providerLeafPackageJsonPath = path.join(providerDir, "package.json");
  const legacyRuntimePath = path.join(providerDir, "runtime.ts");
  const providerSegments = splitProviderName(provider.name);
  const providerClientImportPath = getProviderClientImportPath(provider.name);
  // The registry can hold hundreds of services per vendor namespace, but the
  // namespace index/package must only reference services that have actually
  // been generated — otherwise it would re-export modules that don't exist.
  const namespaceProviders = providers.filter(
    (entry) =>
      getProviderPackageRootName(entry.name) === getProviderPackageRootName(provider.name) &&
      (entry.name === provider.name ||
        existsSync(path.join(resolveProviderOutputDir(entry.name, outputRoot), "index.ts"))),
  );
  const previousRootPackageJson = await readOptionalTextFile(path.join(outputRoot, "package.json"));
  const previousProviderPackageJson = await readOptionalTextFile(providerPackageJsonPath);
  const previousLeafPackageJson =
    providerLeafPackageJsonPath === providerPackageJsonPath
      ? previousProviderPackageJson
      : await readOptionalTextFile(providerLeafPackageJsonPath);

  await rm(legacyRuntimePath, { force: true });

  const namespaceOutputPaths =
    providerSegments.length > 1
      ? await Promise.all([
          writeTextFile(
            providerPackageJsonPath,
            renderNamespacePackageJson(provider.name, namespaceProviders, previousProviderPackageJson),
          ),
          ...providerSegments.slice(0, -1).map((_, index) => {
            const namespaceSegments = providerSegments.slice(0, index + 1);
            return writeTextFile(
              path.join(outputRoot, ...namespaceSegments, "index.ts"),
              renderNamespaceEntry(namespaceSegments, namespaceProviders),
            );
          }),
        ])
      : [];

  const outputPaths = await Promise.all([
    writeTextFile(path.join(outputRoot, "package.json"), renderRootPackageJson(providers, previousRootPackageJson)),
    writeTextFile(path.join(outputRoot, "tsconfig.json"), renderRootTsconfig()),
    writeTextFile(path.join(outputRoot, "index.ts"), renderRootPackageEntry()),
    writeTextFile(path.join(outputRoot, "client.ts"), renderRootClient()),
    writeTextFile(path.join(outputRoot, "copy-assets.mjs"), renderCopyAssetsScript()),
    ...(providerSegments.length === 1
      ? [writeTextFile(providerPackageJsonPath, renderProviderPackageJson(provider, openApiDocument, previousProviderPackageJson))]
      : [
          writeTextFile(
            providerLeafPackageJsonPath,
            renderProviderPackageJson(provider, openApiDocument, previousLeafPackageJson, undefined, {
              includePackageName: false,
            }),
          ),
        ]),
    writeTextFile(path.join(providerDir, "README.md"), renderProviderReadme(provider, { openApiDocument })),
    writeTextFile(path.join(providerDir, "index.ts"), renderProviderEntry(provider.name, providerClientImportPath)),
    ...(await (async () => {
      const typesDir = path.join(providerDir, "types");
      const groupTypeFiles = renderProviderGroupTypes(provider, tools, publicTypeMap, clientToolMap, schemaTypes);
      const indexContent = renderProviderTypesIndex(provider, tools, publicTypeMap, clientToolMap, schemaTypes);
      const typePaths = await Promise.all(
        [...groupTypeFiles.entries()].map(([fileName, content]) =>
          writeTextFile(path.join(typesDir, fileName), content)
        )
      );
      typePaths.push(await writeTextFile(path.join(typesDir, "index.ts"), indexContent));
      return typePaths;
    })()),
    writeTextFile(
      path.join(providerDir, "metadata.ts"),
      renderProviderMetadata(provider, clientToolMap, providerClientImportPath),
    ),
    writeTextFile(path.join(providerDir, "openapi.json"), JSON.stringify(openApiDocument, null, 2).concat("\n")),
    ...namespaceOutputPaths,
  ]);

  return {
    provider: provider.name,
    outputPaths,
    toolCount: tools.length,
  };
}

export type FullPipelineOptions = {
  provider: string;
  outputRoot?: string;
};

export type FullPipelineResult = {
  scaffold: GenerateRegistryTypesResult;
  research: RunResearchPhaseResult | { error: string };
  enrich: RunEnrichPhaseResult | { error: string };
  docs: AugmentRegistryProviderDocsResult | { error: string };
  review: RunReviewPhaseResult | { error: string };
  ship: RunShipPhaseResult | { error: string };
};

async function safeRun<T>(fn: () => Promise<T>): Promise<T | { error: string }> {
  try {
    return await fn();
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function runFullPipeline(options: FullPipelineOptions): Promise<FullPipelineResult> {
  const scaffold = await generateRegistryTypes({
    provider: options.provider,
    outputRoot: options.outputRoot,
  });

  const [research, enrich, docs] = await Promise.all([
    safeRun(() => runResearchPhase({ provider: options.provider, outputRoot: options.outputRoot })),
    safeRun(() => runEnrichPhase({ provider: options.provider, outputRoot: options.outputRoot })),
    safeRun(() => augmentRegistryProviderDocs({ provider: options.provider, outputRoot: options.outputRoot })),
  ]);

  const review = await safeRun(() =>
    runReviewPhase({ provider: options.provider, outputRoot: options.outputRoot }),
  );

  const reviewPassed = !("error" in review) && review.passed;
  const scorecardResult = !("error" in review) ? review.scorecard : undefined;
  const agentReadinessResult = !("error" in review) ? review.agentReadiness : undefined;

  const ship = await safeRun(() =>
    runShipPhase({
      provider: options.provider,
      outputRoot: options.outputRoot,
      scorecardResult,
      agentReadinessResult,
    }),
  );

  if (!reviewPassed && !("error" in review)) {
    process.stderr.write(
      `Warning: review phase did not pass for ${options.provider}. ` +
        `Scorecard domain: ${review.scorecard.domain.total}/100. ` +
        `Blockers: ${review.agentReadiness.blockers.filter((b) => b.severity === "error").length} errors.\n`,
    );
  }

  return { scaffold, research, enrich, docs, review, ship };
}
