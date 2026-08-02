/**
 * The default catalog builder — WS-2 compat data loaded from the contract
 * packages' `compat.json` documents, plus the LLM chat-provider alias table.
 *
 * The interface data here is NOT a copy: it is the same `@utdk/common/compat`
 * loader the workspace's `listInterfaces()` consumes, so the two stay in
 * lockstep by construction. The chat-provider table is transcribed from
 * `apps/workspace/src/llm.ts` (the llm contract declares
 * `compatSource: "chat-provider-registry"`, and this table IS that registry
 * for the standalone server); env overrides (`LLM_<ID>_BASE_URL` /
 * `LLM_<ID>_DEFAULT_MODEL`) are honored the same way.
 */

import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import path from "node:path";
import { loadCompatDocuments } from "@utdk/common/compat";
import type { CompatDocument, CompatEntry } from "@utdk/common/compat";
import type { InterfaceCatalog, InterfaceCompat, InterfaceDef, LlmAlias } from "./types.js";

// ---------------------------------------------------------------------------
// LLM chat-provider aliases
// ---------------------------------------------------------------------------

const CHAT_PROVIDERS: LlmAlias[] = [
  { id: "openai", label: "OpenAI", module: "openai", defaultModel: "gpt-5.1" },
  {
    id: "anthropic",
    label: "Claude",
    module: "openai",
    baseUrl: "https://api.anthropic.com/v1",
    defaultModel: "claude-sonnet-5",
  },
  {
    id: "gemini",
    label: "Gemini",
    module: "openai",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai",
    defaultModel: "gemini-2.5-flash",
  },
  {
    id: "synthetic.new",
    label: "Synthetic.new",
    module: "openai",
    baseUrl: "https://api.synthetic.new/openai/v1",
    defaultModel: "hf:zai-org/GLM-5.2",
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    module: "openai",
    baseUrl: "https://openrouter.ai/api/v1",
    defaultModel: "openrouter/auto",
  },
];

function envOverride(id: string, key: "BASE_URL" | "DEFAULT_MODEL"): string | undefined {
  const slug = id.toUpperCase().replace(/[^A-Z0-9]+/gu, "_");
  return process.env[`LLM_${slug}_${key}`] || undefined;
}

export function defaultLlmAliases(): LlmAlias[] {
  return CHAT_PROVIDERS.map((provider) => ({
    ...provider,
    ...(envOverride(provider.id, "BASE_URL") ?? provider.baseUrl
      ? { baseUrl: envOverride(provider.id, "BASE_URL") ?? provider.baseUrl }
      : {}),
    defaultModel: envOverride(provider.id, "DEFAULT_MODEL") ?? provider.defaultModel,
  })) as LlmAlias[];
}

// ---------------------------------------------------------------------------
// Compat documents → interface defs
// ---------------------------------------------------------------------------

/**
 * Locate `packages/contracts/` (or, in a deployed install, the `@utdk` scope
 * directory) by walking up from the resolved `@utdk/agent` entry point.
 */
function resolveContractsDir(): string {
  const monorepoContracts = path.resolve(import.meta.dirname, "..", "..", "..", "..", "packages", "contracts");
  if (existsSync(monorepoContracts)) return monorepoContracts;
  const require = createRequire(import.meta.url);
  // <contracts dir>/agent/dist/index.js → up three.
  return path.resolve(require.resolve("@utdk/agent"), "..", "..", "..");
}

/** Pre-instance catalog order; contracts beyond it sort alphabetically after. */
const INTERFACE_ORDER = ["llm", "sql", "sandbox", "vcs", "agent"];

function toInterfaceCompat(entry: CompatEntry): InterfaceCompat {
  return {
    provider: entry.provider,
    label: entry.label,
    module: entry.module,
    ...(entry.moduleSpecifier !== undefined ? { moduleSpecifier: entry.moduleSpecifier } : {}),
    ...(entry.baseUrl !== undefined ? { baseUrl: entry.baseUrl } : {}),
    ...(entry.defaults !== undefined ? { defaults: entry.defaults } : {}),
    ...(entry.credentialless !== undefined ? { credentialless: entry.credentialless } : {}),
    ...(entry.unavailable !== undefined ? { unavailable: entry.unavailable } : {}),
  };
}

function toInterfaceDef(document: CompatDocument, llmAliases: LlmAlias[]): InterfaceDef {
  return {
    id: document.interface.id,
    label: document.interface.label,
    description: document.interface.description,
    timeoutMs: document.interface.timeoutMs,
    defaultsFor: [...document.interface.defaultsFor],
    compat:
      document.compatSource === "chat-provider-registry"
        ? llmAliases.map((alias) => ({
            provider: alias.id,
            label: alias.label,
            module: alias.module,
            ...(alias.baseUrl ? { baseUrl: alias.baseUrl } : {}),
            defaults: { model: alias.defaultModel },
          }))
        : (document.compat ?? []).map(toInterfaceCompat),
  };
}

/**
 * Build the default catalog from the installed contract packages. Pass a
 * `contractsDir` to point somewhere explicit (tests, unusual layouts).
 */
export function defaultCatalog(options?: { contractsDir?: string }): InterfaceCatalog {
  const llmAliases = defaultLlmAliases();
  const documents = [...loadCompatDocuments(options?.contractsDir ?? resolveContractsDir()).values()].sort(
    (left, right) => {
      const l = INTERFACE_ORDER.indexOf(left.interface.id);
      const r = INTERFACE_ORDER.indexOf(right.interface.id);
      if (l !== -1 || r !== -1) {
        return (l === -1 ? INTERFACE_ORDER.length : l) - (r === -1 ? INTERFACE_ORDER.length : r);
      }
      return left.interface.id.localeCompare(right.interface.id);
    },
  );
  return {
    interfaces: documents.map((document) => toInterfaceDef(document, llmAliases)),
    llmAliases,
  };
}
