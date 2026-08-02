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
/**
 * Parse and validate one compat document. Throws an error naming
 * `sourcePath` and the offending field on any violation.
 */
export declare function parseCompatDocument(json: unknown, sourcePath: string): CompatDocument;
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
export declare function loadCompatDocuments(contractsDir: string): Map<string, CompatDocument>;
