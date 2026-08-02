/**
 * The injectable interface catalog — the WS-2 compat data in consumable form.
 *
 * The server never hardcodes interface knowledge: hosts inject an
 * `InterfaceCatalog` (`options.catalog`), and `defaultCatalog()` builds one
 * from the contract packages' `compat.json` documents (@utdk/common/compat)
 * plus the LLM chat-provider alias table.
 */

export interface InterfaceCompat {
  /** Registry provider id (also the credential-store key). */
  provider: string;
  label: string;
  /** UTDK module that executes operations for this implementation. */
  module: string;
  /** Import specifier when the module is not in the UTDK catalogue. */
  moduleSpecifier?: string;
  /** API root override; undefined = the module's own spec server. */
  baseUrl?: string;
  /** Option defaults applied when the call omits them (e.g. model). */
  defaults?: Record<string, unknown>;
  /** This implementation needs no tenant credential. */
  credentialless?: boolean;
  /** Declared but has no executable module yet — the reason, for whoever hits it. */
  unavailable?: string;
}

export interface InterfaceDef {
  id: string;
  label: string;
  description: string;
  /** Per-call timeout for operations dispatched through this interface. */
  timeoutMs: number;
  /** Operations that receive option defaults as missing args (e.g. model). */
  defaultsFor: string[];
  compat: InterfaceCompat[];
}

/** An LLM chat-provider alias riding an OpenAI-compatible module. */
export interface LlmAlias {
  /** Chat-facing provider id — also the credential-store key. */
  id: string;
  label: string;
  /** UTDK module that executes chat operations for this alias. */
  module: string;
  /** OpenAI-compat API root; undefined = the module's own spec server. */
  baseUrl?: string;
  defaultModel: string;
}

export interface InterfaceCatalog {
  interfaces: InterfaceDef[];
  llmAliases: LlmAlias[];
}

export function findInterface(catalog: InterfaceCatalog, id: string): InterfaceDef | undefined {
  return catalog.interfaces.find((def) => def.id === id);
}

export function findLlmAlias(catalog: InterfaceCatalog, id: string): LlmAlias | undefined {
  return catalog.llmAliases.find((alias) => alias.id === id);
}
