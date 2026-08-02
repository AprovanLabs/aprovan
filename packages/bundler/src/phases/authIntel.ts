/**
 * Auth-intel phase — LLM interpretation of a provider's authentication model.
 *
 * Reads the OpenAPI `securitySchemes` (plus surrounding description text and
 * any cached docs index) and asks Claude to produce a structured `auth.json`:
 * which gateway credential types apply, exact header names, and concrete
 * setup steps (where to create an API key, how to register an OAuth app).
 * The output is designed to slot into the registry credentials area and to
 * be rendered on provider pages.
 *
 * Results are cached by a hash of the auth-relevant spec content — re-runs
 * are no-ops unless the spec's auth surface changed or --overwrite is passed.
 */

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { CREDENTIAL_TYPES, type CredentialType } from "@utdk/common/auth";
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

/**
 * The gateway credential types, imported from `@utdk/common/auth` — the
 * published single source of truth, so this phase cannot drift from the
 * workspace credential store.
 */
export type AuthIntelMethod = CredentialType;

export type AuthIntelSetupStep = {
  title: string;
  detail: string;
};

export type AuthIntelResult = {
  /** One-paragraph plain-language description of how auth works. */
  summary: string;
  /** Gateway credential types this provider supports. */
  methods: AuthIntelMethod[];
  /** Exact header used for API keys (e.g. "X-Figma-Token"), if applicable. */
  apiKeyHeader: string | null;
  /** Ordered, concrete steps to obtain and configure credentials. */
  setupSteps: AuthIntelSetupStep[];
  oauth: {
    authorizationUrl: string | null;
    tokenUrl: string | null;
    /** URL where developers register an OAuth app, when known from the spec/docs. */
    appRegistrationUrl: string | null;
    scopes: Array<{ name: string; description: string }>;
  } | null;
};

export type ProviderAuthIntel = {
  provider: string;
  generatedAt: string;
  /** Hash of the auth-relevant spec content this result was derived from. */
  sourceHash: string;
  model: string;
  auth: AuthIntelResult;
};

export type RunAuthIntelPhaseOptions = {
  provider: string;
  outputRoot?: string;
  model?: string;
  overwrite?: boolean;
};

export type RunAuthIntelPhaseResult = {
  provider: string;
  outputPath: string;
  skipped: boolean;
  authIntel: ProviderAuthIntel;
};

const AUTH_INTEL_SCHEMA = {
  type: "object",
  properties: {
    summary: {
      type: "string",
      description:
        "One short paragraph, plain language, describing how authentication works for this API.",
    },
    methods: {
      type: "array",
      description:
        "Gateway credential types the provider supports. bearer_token = paste a token sent as Authorization: Bearer; api_key = static key sent in a header/query; oauth2_client = OAuth2 client-credentials flow; oauth2_authcode = OAuth2 authorization-code (user consent) flow.",
      items: {
        type: "string",
        // Derived from the shared runtime tuple: adding a credential type to
        // @utdk/common includes it here with no bundler change.
        enum: [...CREDENTIAL_TYPES],
      },
    },
    api_key_header: {
      anyOf: [{ type: "string" }, { type: "null" }],
      description:
        "Exact header name for API-key auth (e.g. X-Figma-Token), or null if not applicable.",
    },
    setup_steps: {
      type: "array",
      description:
        "Ordered concrete steps a developer follows to obtain credentials and configure them in the registry credentials area. Reference real provider URLs/console pages only when stated in the source material.",
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
    oauth: {
      anyOf: [
        {
          type: "object",
          properties: {
            authorization_url: { anyOf: [{ type: "string" }, { type: "null" }] },
            token_url: { anyOf: [{ type: "string" }, { type: "null" }] },
            app_registration_url: { anyOf: [{ type: "string" }, { type: "null" }] },
            scopes: {
              type: "array",
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
          },
          required: ["authorization_url", "token_url", "app_registration_url", "scopes"],
          additionalProperties: false,
        },
        { type: "null" },
      ],
    },
  },
  required: ["summary", "methods", "api_key_header", "setup_steps", "oauth"],
  additionalProperties: false,
} as const;

type RawAuthIntel = {
  summary: string;
  methods: AuthIntelMethod[];
  api_key_header: string | null;
  setup_steps: AuthIntelSetupStep[];
  oauth: {
    authorization_url: string | null;
    token_url: string | null;
    app_registration_url: string | null;
    scopes: Array<{ name: string; description: string }>;
  } | null;
};

function hashContent(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

function collectAuthSource(document: OpenAPIV3.Document): string {
  const securitySchemes = document.components?.securitySchemes ?? {};
  const security = document.security ?? [];

  return JSON.stringify(
    {
      title: document.info?.title,
      description: document.info?.description?.slice(0, 4000),
      contactUrl: document.info?.contact?.url,
      externalDocsUrl: document.externalDocs?.url,
      securitySchemes,
      security,
    },
    null,
    2,
  );
}

async function readOptionalText(filePath: string): Promise<string | undefined> {
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return undefined;
  }
}

async function readExistingAuthIntel(outputPath: string): Promise<ProviderAuthIntel | undefined> {
  const raw = await readOptionalText(outputPath);

  if (!raw) {
    return undefined;
  }

  try {
    return JSON.parse(raw) as ProviderAuthIntel;
  } catch {
    return undefined;
  }
}

export async function runAuthIntelPhase(
  options: RunAuthIntelPhaseOptions,
): Promise<RunAuthIntelPhaseResult> {
  const outputRoot = options.outputRoot ?? DEFAULT_OUTPUT_ROOT;
  // Backend default applies when neither the option nor the env is set (see llm.ts).
  const model = options.model ?? process.env.UTDK_AUTH_INTEL_MODEL;
  const providers = await loadRegistryProviders();
  const provider = resolveProvider(providers, options.provider);
  const rawDocument = await loadOpenApiDocument(provider);
  const document = applyProviderOpenApiOptions(rawDocument, provider);
  const outputDir = resolveProviderOutputDir(provider.name, outputRoot);
  const outputPath = path.join(outputDir, "auth.json");

  const authSource = collectAuthSource(document);
  const sourceHash = hashContent(authSource);
  const existing = await readExistingAuthIntel(outputPath);

  if (existing && existing.sourceHash === sourceHash && !options.overwrite) {
    return { provider: provider.name, outputPath, skipped: true, authIntel: existing };
  }

  // Cached docs (from load-docs) often include vendor auth guides — give the
  // model that context when available.
  const docsIndex = await readOptionalText(resolveProviderDocsIndexPath(provider.name));

  const completion = await createStructuredCompletion({
    model,
    schema: AUTH_INTEL_SCHEMA as unknown as Record<string, unknown>,
    schemaName: "auth_intel",
    system: [
      "You analyze API authentication requirements for a package registry.",
      "The registry stores credentials centrally (types: bearer_token, api_key, oauth2_client, oauth2_authcode) and a gateway injects them into requests at call time.",
      "Interpret the provider's OpenAPI security definitions and any supplied docs.",
      "Be precise about header names and flows. Only cite URLs present in the source material — never invent console/registration URLs.",
      "Setup steps must be actionable and end with configuring the credential in the registry credentials area.",
    ].join(" "),
    user: [
      `Provider: ${provider.name}`,
      "",
      "## Auth-relevant OpenAPI content",
      "```json",
      authSource,
      "```",
      ...(docsIndex
        ? ["", "## Cached provider docs index", docsIndex.slice(0, 20000)]
        : []),
    ].join("\n"),
  });

  const raw = JSON.parse(completion.text) as RawAuthIntel;

  const authIntel: ProviderAuthIntel = {
    provider: provider.name,
    generatedAt: new Date().toISOString(),
    sourceHash,
    model: completion.model,
    auth: {
      summary: raw.summary,
      methods: raw.methods,
      apiKeyHeader: raw.api_key_header,
      setupSteps: raw.setup_steps,
      oauth: raw.oauth
        ? {
            authorizationUrl: raw.oauth.authorization_url,
            tokenUrl: raw.oauth.token_url,
            appRegistrationUrl: raw.oauth.app_registration_url,
            scopes: raw.oauth.scopes,
          }
        : null,
    },
  };

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(authIntel, null, 2)}\n`, "utf8");

  return { provider: provider.name, outputPath, skipped: false, authIntel };
}
