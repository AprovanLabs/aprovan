/**
 * Interface compat catalog — schema and loader for the per-contract
 * `compat.json` documents under `packages/contracts/<name>/`.
 *
 * A compat document describes one interface (the contract's id, label,
 * description, dispatch timeout, defaults-taking operations) and which
 * registry providers implement it. Data travels with the contract package
 * (published in its npm tarball); this loader is the one shared parser and
 * validation-error surface for every consumer (workspace `listInterfaces()`,
 * the catalog site, the WS-3 registry server).
 *
 * Validation is loud by design: a malformed document throws an error naming
 * the source path and the offending field — entries are never silently
 * dropped.
 */

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

/** One provider implementing an interface. */
export interface CompatEntry {
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
  /** This implementation needs no workspace credential. */
  credentialless?: boolean;
  /** Declared but has no executable module yet — the reason, for whoever hits it. */
  unavailable?: string;
  /** Optional capability badges for the catalog (e.g. sandbox flags). */
  capabilities?: string[];
}

export interface InterfaceMeta {
  id: string;
  label: string;
  description: string;
  /** Per-call timeout for operations dispatched through this interface. */
  timeoutMs: number;
  /** Operations that receive binding option defaults as missing args. */
  defaultsFor: string[];
}

export interface CompatDocument {
  schemaVersion: 1;
  interface: InterfaceMeta;
  /**
   * Inline compat entries. Optional: a document may instead declare
   * `compatSource` (D5 — the llm contract's list is generated from the
   * chat-provider registry), and consumers must handle both.
   */
  compat?: CompatEntry[];
  /** Named external source that generates the compat list (e.g. "chat-provider-registry"). */
  compatSource?: string;
}

class CompatValidationError extends Error {
  constructor(sourcePath: string, field: string, problem: string) {
    super(`Invalid compat document ${sourcePath}: ${field} ${problem}`);
    this.name = "CompatValidationError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(
  value: unknown,
  sourcePath: string,
  field: string,
  { allowEmpty = false }: { allowEmpty?: boolean } = {},
): string {
  if (typeof value !== "string" || (!allowEmpty && value.trim() === "")) {
    throw new CompatValidationError(sourcePath, field, "must be a non-empty string");
  }
  return value;
}

function checkKnownKeys(
  value: Record<string, unknown>,
  known: readonly string[],
  sourcePath: string,
  prefix: string,
): void {
  for (const key of Object.keys(value)) {
    if (!known.includes(key)) {
      throw new CompatValidationError(sourcePath, `${prefix}${key}`, "is not a recognized field");
    }
  }
}

const DOCUMENT_KEYS = ["schemaVersion", "interface", "compat", "compatSource"] as const;
const INTERFACE_KEYS = ["id", "label", "description", "timeoutMs", "defaultsFor"] as const;
const ENTRY_KEYS = [
  "provider",
  "label",
  "module",
  "moduleSpecifier",
  "baseUrl",
  "defaults",
  "credentialless",
  "unavailable",
  "capabilities",
] as const;

function parseEntry(value: unknown, sourcePath: string, field: string): CompatEntry {
  if (!isRecord(value)) {
    throw new CompatValidationError(sourcePath, field, "must be an object");
  }
  checkKnownKeys(value, ENTRY_KEYS, sourcePath, `${field}.`);

  const entry: CompatEntry = {
    provider: requireString(value.provider, sourcePath, `${field}.provider`),
    label: requireString(value.label, sourcePath, `${field}.label`),
    module: requireString(value.module, sourcePath, `${field}.module`),
  };
  if (value.moduleSpecifier !== undefined) {
    entry.moduleSpecifier = requireString(value.moduleSpecifier, sourcePath, `${field}.moduleSpecifier`);
  }
  if (value.baseUrl !== undefined) {
    entry.baseUrl = requireString(value.baseUrl, sourcePath, `${field}.baseUrl`);
  }
  if (value.defaults !== undefined) {
    if (!isRecord(value.defaults)) {
      throw new CompatValidationError(sourcePath, `${field}.defaults`, "must be an object");
    }
    entry.defaults = value.defaults;
  }
  if (value.credentialless !== undefined) {
    if (typeof value.credentialless !== "boolean") {
      throw new CompatValidationError(sourcePath, `${field}.credentialless`, "must be a boolean");
    }
    entry.credentialless = value.credentialless;
  }
  if (value.unavailable !== undefined) {
    entry.unavailable = requireString(value.unavailable, sourcePath, `${field}.unavailable`);
  }
  if (value.capabilities !== undefined) {
    if (!Array.isArray(value.capabilities)) {
      throw new CompatValidationError(sourcePath, `${field}.capabilities`, "must be an array of strings");
    }
    entry.capabilities = value.capabilities.map((capability, index) =>
      requireString(capability, sourcePath, `${field}.capabilities[${index}]`),
    );
  }
  return entry;
}

/**
 * Parse and validate one compat document. Throws an error naming
 * `sourcePath` and the offending field on any violation.
 */
export function parseCompatDocument(json: unknown, sourcePath: string): CompatDocument {
  if (!isRecord(json)) {
    throw new CompatValidationError(sourcePath, "document", "must be a JSON object");
  }
  checkKnownKeys(json, DOCUMENT_KEYS, sourcePath, "");

  if (json.schemaVersion !== 1) {
    throw new CompatValidationError(sourcePath, "schemaVersion", "must be 1");
  }

  if (!isRecord(json.interface)) {
    throw new CompatValidationError(sourcePath, "interface", "must be an object");
  }
  checkKnownKeys(json.interface, INTERFACE_KEYS, sourcePath, "interface.");
  const meta = json.interface;
  const timeoutMs = meta.timeoutMs;
  if (typeof timeoutMs !== "number" || !Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    throw new CompatValidationError(sourcePath, "interface.timeoutMs", "must be a positive number");
  }
  if (!Array.isArray(meta.defaultsFor)) {
    throw new CompatValidationError(sourcePath, "interface.defaultsFor", "must be an array of strings");
  }
  const iface: InterfaceMeta = {
    id: requireString(meta.id, sourcePath, "interface.id"),
    label: requireString(meta.label, sourcePath, "interface.label"),
    description: requireString(meta.description, sourcePath, "interface.description"),
    timeoutMs,
    defaultsFor: meta.defaultsFor.map((operation, index) =>
      requireString(operation, sourcePath, `interface.defaultsFor[${index}]`),
    ),
  };

  const hasCompat = json.compat !== undefined;
  const hasSource = json.compatSource !== undefined;
  if (hasCompat && hasSource) {
    throw new CompatValidationError(
      sourcePath,
      "compatSource",
      "replaces compat — a document declares one or the other, not both",
    );
  }
  if (!hasCompat && !hasSource) {
    throw new CompatValidationError(
      sourcePath,
      "compat",
      "is required (an empty array is fine) unless compatSource is declared",
    );
  }

  const document: CompatDocument = { schemaVersion: 1, interface: iface };
  if (hasSource) {
    document.compatSource = requireString(json.compatSource, sourcePath, "compatSource");
  } else {
    if (!Array.isArray(json.compat)) {
      throw new CompatValidationError(sourcePath, "compat", "must be an array");
    }
    document.compat = json.compat.map((entry, index) =>
      parseEntry(entry, sourcePath, `compat[${index}]`),
    );
  }
  return document;
}

type PackageManifest = { name?: string; utdk?: { contract?: string } };

/**
 * Load every compat document under a contracts directory
 * (`packages/contracts/`), keyed by contract name.
 *
 * Enumeration keys off the `utdk.contract` manifest marker (D2) — directory
 * location is a convention, the marker is the truth. Packages without a
 * `compat.json` are skipped (a compat entry is a contract commitment; the
 * new contracts ship none). A document whose `interface.id` disagrees with
 * its package's marker fails loudly.
 */
export function loadCompatDocuments(contractsDir: string): Map<string, CompatDocument> {
  if (!existsSync(contractsDir)) {
    throw new Error(
      `Contracts directory not found: ${contractsDir}. Expected the packages/contracts/ root containing the @utdk contract packages.`,
    );
  }

  const documents = new Map<string, CompatDocument>();
  for (const entry of readdirSync(contractsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const manifestPath = path.join(contractsDir, entry.name, "package.json");
    if (!existsSync(manifestPath)) continue;

    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as PackageManifest;
    const contract = manifest.utdk?.contract;
    if (typeof contract !== "string" || contract === "") continue;

    const compatPath = path.join(contractsDir, entry.name, "compat.json");
    if (!existsSync(compatPath)) continue;

    const document = parseCompatDocument(
      JSON.parse(readFileSync(compatPath, "utf8")),
      compatPath,
    );
    if (document.interface.id !== contract) {
      throw new Error(
        `Invalid compat document ${compatPath}: interface.id "${document.interface.id}" does not match the package's utdk.contract marker "${contract}"`,
      );
    }
    documents.set(contract, document);
  }
  return documents;
}
