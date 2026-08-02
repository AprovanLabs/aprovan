import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DocsPipelineError } from "./docs/types.js";
import { runAuthIntelPhase } from "./phases/authIntel.js";
import { runWebhookIntelPhase } from "./phases/webhookIntel.js";
import { runEnrichPhase } from "./phases/enrich.js";
import { runResearchPhase } from "./phases/research.js";
import { runReviewPhase } from "./phases/review.js";
import { runShipPhase } from "./phases/ship.js";
import { DEFAULT_OUTPUT_ROOT } from "./provider.js";
import { runSmokeTest } from "./verification/smoke.js";
import { augmentRegistryProviderDocs, loadRegistryProviderDocs, runFullPipeline } from "./index.js";

// Load the package-local .env (LLM provider config) regardless of runner —
// tsx does not read .env files on its own. Existing env vars win.
function loadLocalEnv(): void {
  const envPath = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../.env");
  let raw: string;
  try {
    raw = readFileSync(envPath, "utf8");
  } catch {
    return;
  }
  for (const line of raw.split("\n")) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const [, key, value] = match;
    if (key && value !== undefined && process.env[key] === undefined) {
      process.env[key] = value.replace(/^["']|["']$/g, "");
    }
  }
}

loadLocalEnv();

type CliCommand = "generate" | "load-docs" | "augment-docs";
type PipelinePhase = "research" | "enrich" | "auth" | "webhooks" | "review" | "ship";

type ParsedCommand = {
  command: CliCommand;
  provider: string;
  phase?: PipelinePhase;
  docsCacheRoot?: string;
  outputRoot?: string;
  rawSnapshots?: boolean;
  overwriteDocs?: boolean;
  smoke?: boolean;
  seededReferences?: Array<{ source: "registry-seed"; url: string }>;
};

function getOptionValue(argv: string[], index: number, flag: string): string {
  const value = argv[index + 1];

  if (!value) {
    throw new Error(`Missing value for ${flag}.`);
  }

  return value;
}

function isValidPhase(value: string): value is PipelinePhase {
  return (
    value === "research" ||
    value === "enrich" ||
    value === "auth" ||
    value === "webhooks" ||
    value === "review" ||
    value === "ship"
  );
}

function parseCommand(argv: string[]): ParsedCommand {
  const [first, second, ...tail] = argv;
  const explicitCommand = first === "load-docs" || first === "augment-docs" || first === "generate";
  const command: CliCommand = explicitCommand ? (first as CliCommand) : "generate";
  const candidateProvider = explicitCommand ? second : first;
  // When the command is implicit ("<provider> --flag ..."), the second token
  // is the first option — don't drop it.
  const rest = explicitCommand ? tail : second === undefined ? [] : [second, ...tail];

  if (!candidateProvider) {
    throw new Error('Expected a provider name.');
  }

  const provider = candidateProvider;

  const parsed: ParsedCommand = {
    command,
    provider,
  };

  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];

    if (!token) {
      continue;
    }

    if (token === "--phase") {
      const value = getOptionValue(rest, index, token);
      if (!isValidPhase(value)) {
        throw new Error(`Unknown phase: ${value}. Valid phases are: research, enrich, auth, webhooks, review, ship.`);
      }
      parsed.phase = value;
      index += 1;
      continue;
    }

    if (token === "--docs-cache-root") {
      parsed.docsCacheRoot = getOptionValue(rest, index, token);
      index += 1;
      continue;
    }

    if (token === "--output-root") {
      parsed.outputRoot = getOptionValue(rest, index, token);
      index += 1;
      continue;
    }

    if (token === "--raw-snapshots") {
      parsed.rawSnapshots = true;
      continue;
    }

    if (token === "--overwrite-docs") {
      parsed.overwriteDocs = true;
      continue;
    }

    if (token === "--smoke") {
      parsed.smoke = true;
      continue;
    }

    if (token === "--seed-url") {
      const url = getOptionValue(rest, index, token);
      parsed.seededReferences = [...(parsed.seededReferences ?? []), { source: "registry-seed", url }];
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${token}`);
  }

  return parsed;
}

function writeJson(payload: unknown): void {
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
}

async function main(): Promise<void> {
  const parsed = parseCommand(process.argv.slice(2));

  // --smoke: run the smoke test harness on demand
  if (parsed.smoke) {
    const outputRoot = parsed.outputRoot ?? DEFAULT_OUTPUT_ROOT;
    const result = await runSmokeTest({ provider: parsed.provider, outputRoot });
    writeJson({ ok: result.status !== "failed", command: "smoke", provider: parsed.provider, result });
    if (result.status === "failed") {
      process.exitCode = 1;
    }
    return;
  }

  if (parsed.command === "generate") {
    if (parsed.phase === "research") {
      const result = await runResearchPhase({
        provider: parsed.provider,
        outputRoot: parsed.outputRoot,
      });
      writeJson({ ok: true, command: "generate", phase: "research", provider: parsed.provider, result });
      return;
    }

    if (parsed.phase === "enrich") {
      const result = await runEnrichPhase({
        provider: parsed.provider,
        outputRoot: parsed.outputRoot,
      });
      writeJson({ ok: true, command: "generate", phase: "enrich", provider: parsed.provider, result });
      return;
    }

    if (parsed.phase === "auth") {
      const result = await runAuthIntelPhase({
        provider: parsed.provider,
        outputRoot: parsed.outputRoot,
        overwrite: parsed.overwriteDocs,
      });
      writeJson({ ok: true, command: "generate", phase: "auth", provider: parsed.provider, result });
      return;
    }

    if (parsed.phase === "webhooks") {
      const result = await runWebhookIntelPhase({
        provider: parsed.provider,
        outputRoot: parsed.outputRoot,
        overwrite: parsed.overwriteDocs,
      });
      writeJson({ ok: true, command: "generate", phase: "webhooks", provider: parsed.provider, result });
      return;
    }

    if (parsed.phase === "review") {
      const result = await runReviewPhase({
        provider: parsed.provider,
        outputRoot: parsed.outputRoot,
      });
      writeJson({ ok: true, command: "generate", phase: "review", provider: parsed.provider, result });
      return;
    }

    if (parsed.phase === "ship") {
      const result = await runShipPhase({
        provider: parsed.provider,
        outputRoot: parsed.outputRoot,
      });
      writeJson({ ok: true, command: "generate", phase: "ship", provider: parsed.provider, result });
      return;
    }

    // Full pipeline (no --phase)
    const result = await runFullPipeline({
      provider: parsed.provider,
      outputRoot: parsed.outputRoot,
    });
    writeJson({ ok: true, command: "generate", provider: parsed.provider, result });
    return;
  }

  if (parsed.command === "load-docs") {
    const result = await loadRegistryProviderDocs({
      provider: parsed.provider,
      docsCacheRoot: parsed.docsCacheRoot,
      outputRoot: parsed.outputRoot,
      rawSnapshots: parsed.rawSnapshots,
      seededReferences: parsed.seededReferences,
    });
    writeJson({ ok: true, command: parsed.command, provider: parsed.provider, result });
    return;
  }

  const result = await augmentRegistryProviderDocs({
    provider: parsed.provider,
    docsCacheRoot: parsed.docsCacheRoot,
    outputRoot: parsed.outputRoot,
    overwriteDocs: parsed.overwriteDocs,
  });
  writeJson({ ok: true, command: parsed.command, provider: parsed.provider, result });
}

main().catch((error: unknown) => {
  const payload =
    error instanceof DocsPipelineError
      ? {
          ok: false,
          error: {
            code: error.code,
            message: error.message,
            details: error.details ?? {},
          },
        }
      : {
          ok: false,
          error: {
            code: "CLI_ERROR",
            message: error instanceof Error ? error.message : String(error),
          },
        };

  process.stderr.write(`${JSON.stringify(payload, null, 2)}\n`);
  process.exitCode = 1;
});
