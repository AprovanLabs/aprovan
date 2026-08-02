/**
 * Webhook-intel phase — LLM interpretation of a provider's webhook support.
 *
 * Reads the OpenAPI webhook surface (3.1 `webhooks`, `x-webhooks`, operation
 * `callbacks`, webhook-management operations, description prose) plus any
 * cached docs index and asks the model to produce a structured
 * `webhooks.json`: which events exist, how subscriptions are registered
 * (console vs API), how payloads are verified, and concrete setup steps.
 * The output renders on registry provider pages and drives the workspace
 * webhook-registration flow.
 *
 * Results are cached by a hash of the webhook-relevant spec content —
 * re-runs are no-ops unless the spec's webhook surface changed or
 * --overwrite is passed.
 */

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  ProviderWebhookIntel,
  WebhookConfigMethod,
  WebhookIntelEndpoint,
  WebhookIntelEvent,
  WebhookIntelResult,
  WebhookIntelSetupStep,
} from "@utdk/common/webhooks";
import { createStructuredCompletion } from "../llm.js";
import { applyProviderOpenApiOptions, loadOpenApiDocument } from "../openapi.js";
import {
  DEFAULT_OUTPUT_ROOT,
  loadRegistryProviders,
  resolveProvider,
  resolveProviderDocsIndexPath,
  resolveProviderOutputDir,
} from "../provider.js";
import type { OpenAPIV3 } from "openapi-types";

// The result shapes are published, types-only, from `@utdk/common/webhooks`
// so consumers (catalog site, product plane) can type a `webhooks.json`
// without importing this LLM-phase machinery. Re-exported here for existing
// bundler-side importers.
export type {
  ProviderWebhookIntel,
  WebhookConfigMethod,
  WebhookIntelEndpoint,
  WebhookIntelEvent,
  WebhookIntelResult,
  WebhookIntelSetupStep,
} from "@utdk/common/webhooks";

export type RunWebhookIntelPhaseOptions = {
  provider: string;
  outputRoot?: string;
  model?: string;
  overwrite?: boolean;
};

export type RunWebhookIntelPhaseResult = {
  provider: string;
  outputPath: string;
  skipped: boolean;
  webhookIntel: ProviderWebhookIntel;
};

const WEBHOOK_INTEL_SCHEMA = {
  type: "object",
  properties: {
    supported: {
      type: "boolean",
      description:
        "true only if the provider can deliver outbound webhooks to a subscriber URL. false when the source material shows no webhook support.",
    },
    summary: {
      type: "string",
      description:
        "One short paragraph, plain language, describing how webhooks work for this provider. Empty string when supported is false.",
    },
    config_methods: {
      type: "array",
      description:
        "How subscriptions are registered: console = via the provider's dashboard/UI; api = via API operations.",
      items: { type: "string", enum: ["console", "api"] },
    },
    events: {
      type: "array",
      description:
        "Event types a subscription can listen for, using the provider's exact event names. Cap at the ~40 most useful events for large catalogs.",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
        },
        required: ["name", "description"],
        additionalProperties: false,
      },
    },
    management_endpoints: {
      type: "array",
      description:
        "API operations that create, list, or delete webhook subscriptions. Only operations present in the source material.",
      items: {
        type: "object",
        properties: {
          method: { type: "string" },
          path: { type: "string" },
          description: { type: "string" },
        },
        required: ["method", "path", "description"],
        additionalProperties: false,
      },
    },
    signature: {
      anyOf: [
        {
          type: "object",
          properties: {
            header: { anyOf: [{ type: "string" }, { type: "null" }] },
            scheme: { anyOf: [{ type: "string" }, { type: "null" }] },
            detail: { anyOf: [{ type: "string" }, { type: "null" }] },
          },
          required: ["header", "scheme", "detail"],
          additionalProperties: false,
        },
        { type: "null" },
      ],
      description:
        "How delivery payloads are authenticated (signature header + scheme), or null when not documented.",
    },
    payload_format: {
      anyOf: [{ type: "string" }, { type: "null" }],
      description: 'Delivery content type (e.g. "application/json"), or null.',
    },
    docs_url: {
      anyOf: [{ type: "string" }, { type: "null" }],
      description:
        "Provider webhook docs URL. Only cite URLs present in the source material — never invent one.",
    },
    setup_steps: {
      type: "array",
      description:
        "Ordered concrete steps a developer follows to point the provider at a registry hook URL. Reference real provider console pages/API calls only when stated in the source material, and end with registering the hook in the registry webhooks area.",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          detail: { type: "string" },
        },
        required: ["title", "detail"],
        additionalProperties: false,
      },
    },
  },
  required: [
    "supported",
    "summary",
    "config_methods",
    "events",
    "management_endpoints",
    "signature",
    "payload_format",
    "docs_url",
    "setup_steps",
  ],
  additionalProperties: false,
} as const;

type RawWebhookIntel = {
  supported: boolean;
  summary: string;
  config_methods: WebhookConfigMethod[];
  events: WebhookIntelEvent[];
  management_endpoints: WebhookIntelEndpoint[];
  signature: { header: string | null; scheme: string | null; detail: string | null } | null;
  payload_format: string | null;
  docs_url: string | null;
  setup_steps: WebhookIntelSetupStep[];
};

function hashContent(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

const MAX_WEBHOOK_DEFINITIONS = 25;
const MAX_SOURCE_CHARS = 60_000;

/**
 * Extract the webhook-relevant slice of an OpenAPI document. Event *names*
 * are kept exhaustively; full definitions are sampled, since catalogs like
 * GitHub's x-webhooks would otherwise dwarf the context window.
 */
function collectWebhookSource(document: OpenAPIV3.Document): string {
  const doc = document as OpenAPIV3.Document & {
    webhooks?: Record<string, unknown>;
    "x-webhooks"?: Record<string, unknown>;
  };

  const webhookDefs: Record<string, unknown> = {
    ...(doc.webhooks ?? {}),
    ...(doc["x-webhooks"] ?? {}),
  };

  const eventNames = Object.keys(webhookDefs);
  const sampledDefinitions = Object.fromEntries(
    eventNames.slice(0, MAX_WEBHOOK_DEFINITIONS).map((name) => [name, webhookDefs[name]]),
  );

  // Operation callbacks + operations that manage webhook subscriptions.
  const callbacks: Record<string, unknown> = {};
  const managementOperations: Array<Record<string, unknown>> = [];
  for (const [pathKey, pathItem] of Object.entries(document.paths ?? {})) {
    if (!pathItem) continue;
    for (const [methodKey, operation] of Object.entries(pathItem)) {
      if (typeof operation !== "object" || operation === null) continue;
      const op = operation as OpenAPIV3.OperationObject;
      if (op.callbacks && Object.keys(op.callbacks).length > 0) {
        callbacks[`${methodKey.toUpperCase()} ${pathKey}`] = op.callbacks;
      }
      const text = `${pathKey} ${op.operationId ?? ""} ${op.summary ?? ""}`.toLowerCase();
      if (/webhook|web_hook|\bhooks?\b|subscription.*event|event.*subscription/.test(text)) {
        managementOperations.push({
          method: methodKey.toUpperCase(),
          path: pathKey,
          operationId: op.operationId,
          summary: op.summary,
          description: op.description?.slice(0, 500),
        });
      }
    }
  }

  const source = JSON.stringify(
    {
      title: document.info?.title,
      description: document.info?.description?.slice(0, 4000),
      externalDocsUrl: document.externalDocs?.url,
      webhookEventNames: eventNames,
      webhookDefinitionsSample: sampledDefinitions,
      operationCallbacks: callbacks,
      webhookManagementOperations: managementOperations.slice(0, 60),
    },
    null,
    2,
  );

  return source.length > MAX_SOURCE_CHARS ? source.slice(0, MAX_SOURCE_CHARS) : source;
}

async function readOptionalText(filePath: string): Promise<string | undefined> {
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return undefined;
  }
}

async function readExistingWebhookIntel(
  outputPath: string,
): Promise<ProviderWebhookIntel | undefined> {
  const raw = await readOptionalText(outputPath);
  if (!raw) {
    return undefined;
  }
  try {
    return JSON.parse(raw) as ProviderWebhookIntel;
  } catch {
    return undefined;
  }
}

export async function runWebhookIntelPhase(
  options: RunWebhookIntelPhaseOptions,
): Promise<RunWebhookIntelPhaseResult> {
  const outputRoot = options.outputRoot ?? DEFAULT_OUTPUT_ROOT;
  // Backend default applies when neither the option nor the env is set (see llm.ts).
  const model = options.model ?? process.env.UTDK_WEBHOOK_INTEL_MODEL;
  const providers = await loadRegistryProviders();
  const provider = resolveProvider(providers, options.provider);
  const rawDocument = await loadOpenApiDocument(provider);
  const document = applyProviderOpenApiOptions(rawDocument, provider);
  const outputDir = resolveProviderOutputDir(provider.name, outputRoot);
  const outputPath = path.join(outputDir, "webhooks.json");

  const webhookSource = collectWebhookSource(document);
  const sourceHash = hashContent(webhookSource);
  const existing = await readExistingWebhookIntel(outputPath);

  if (existing && existing.sourceHash === sourceHash && !options.overwrite) {
    return { provider: provider.name, outputPath, skipped: true, webhookIntel: existing };
  }

  // Cached docs (from load-docs) often include vendor webhook guides — give
  // the model that context when available.
  const docsIndex = await readOptionalText(resolveProviderDocsIndexPath(provider.name));

  const completion = await createStructuredCompletion({
    model,
    schema: WEBHOOK_INTEL_SCHEMA as unknown as Record<string, unknown>,
    schemaName: "webhook_intel",
    system: [
      "You analyze API webhook capabilities for a package registry.",
      "The registry exposes stable inbound hook URLs (per workspace) that trigger user workflows; developers point provider webhooks at those URLs.",
      "Interpret the provider's OpenAPI webhook definitions, callbacks, webhook-management operations, and any supplied docs.",
      "Be precise about event names, signature headers, and verification schemes. Only cite URLs present in the source material — never invent console/docs URLs.",
      "If the source material shows no webhook support, return supported=false with empty collections rather than guessing.",
      "Setup steps must be actionable and end with registering the hook URL in the registry webhooks area.",
    ].join(" "),
    user: [
      `Provider: ${provider.name}`,
      "",
      "## Webhook-relevant OpenAPI content",
      "```json",
      webhookSource,
      "```",
      ...(docsIndex ? ["", "## Cached provider docs index", docsIndex.slice(0, 20000)] : []),
    ].join("\n"),
  });

  const raw = JSON.parse(completion.text) as RawWebhookIntel;

  const webhookIntel: ProviderWebhookIntel = {
    provider: provider.name,
    generatedAt: new Date().toISOString(),
    sourceHash,
    model: completion.model,
    webhooks: {
      supported: raw.supported,
      summary: raw.summary,
      configMethods: raw.config_methods,
      events: raw.events,
      managementEndpoints: raw.management_endpoints,
      signature: raw.signature,
      payloadFormat: raw.payload_format,
      docsUrl: raw.docs_url,
      setupSteps: raw.setup_steps,
    },
  };

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(webhookIntel, null, 2)}\n`, "utf8");

  return { provider: provider.name, outputPath, skipped: false, webhookIntel };
}
