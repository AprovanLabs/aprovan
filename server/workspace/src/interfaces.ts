/**
 * Many APIs implement a subset of another (OpenAI-compatible LLM servers,
 * S3-compatible object stores). An *interface* names that common surface
 * (`llm`, `objectstore`, …); *compat entries* list which registry providers
 * implement it and how to reach them (executor module + base URL + option
 * defaults); a *workspace profile* picks the implementation. Callers use one
 * stable namespace —
 *
 *   await tools.llm.createChatCompletion({ messages });
 *
 * — and swapping OpenAI for Anthropic (or Synthetic) is a profile change,
 * not a code change. Credentials stay keyed by the concrete provider id.
 *
 * Named configurations use the unified profile store (`profiles.set` with a
 * `name`); the profile travels in the request body, never as a colon-
 * addressed namespace on the wire.
 */

import { createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { loadCompatDocuments, parseCompatDocument } from "@utdk/common/compat";
import type { CompatDocument, CompatEntry } from "@utdk/common/compat";
import { getFsStore } from "./fs-store.js";
import { getCredentialStore } from "./credentials.js";
import { listLlmProviders } from "./llm.js";
import { getRegistryStorage } from "./registry-storage.js";
import { ServiceError } from "./service-kernel.js";
import { assertProviderBindingAllowed } from "./workspaces.js";

const BINDINGS_PATH = ".services/bindings.json";

export interface InterfaceCompat {
  /** Registry provider id (also the credential-store key). */
  provider: string;
  label: string;
  /** UTDK module that executes operations for this implementation. */
  module: string;
  /**
   * Import specifier when the module is not in the UTDK catalogue — a
   * first-party implementation of a public contract. `module` still names the
   * client factory; this only changes where it is loaded from.
   */
  moduleSpecifier?: string;
  /** API root override; undefined = the module's own spec server. */
  baseUrl?: string;
  /** Option defaults applied when the call omits them (e.g. model). */
  defaults?: Record<string, unknown>;
  /**
   * This implementation needs no workspace credential — it is the gateway's
   * own, or something the workspace already operates.
   *
   * Two things follow, and both are why the flag exists rather than being
   * inferred from an empty credential list. Such an entry counts as
   * *connected* for discovery, so its interface is listed even in a workspace
   * that has connected nothing; and it wins the zero-config fallback ahead of
   * any vendor. The `agent` interface is the motivating case: a workspace with
   * an OpenAI key has not thereby said "run my agents in OpenAI's cloud", and
   * without this the first credential in the list would decide that.
   */
  credentialless?: boolean;
  /**
   * This entry is declared but has no executable module yet — the reason,
   * phrased for whoever hits it.
   *
   * A catalog entry is a *contract commitment*, and it earns its place before
   * the module exists: it is what the design doc, the compat list and the
   * bindings UI are written against. So resolution still points at it happily
   * — "what does this namespace mean" has an answer either way, and the
   * `agents`-style short-circuit that skips the module entirely depends on
   * that answer.
   *
   * What must not happen is reaching the *isolate* with it. The failure there
   * is a module-resolution error from deep inside the loader (`Package subpath
   * './native' is not defined by "exports"`), which names nothing the caller
   * can act on. So the two places that would expose it check this instead:
   * dispatch refuses with a 501 carrying this text, and tool discovery leaves
   * the namespace out — a tool the model can see is a tool the model calls.
   */
  unavailable?: string;
}

export interface InterfaceDef {
  id: string;
  label: string;
  description: string;
  /** Per-call timeout for operations dispatched through this interface. */
  timeoutMs: number;
  /**
   * Operations that receive the binding's option defaults as missing args
   * (e.g. `model` on createChatCompletion). Other operations get caller args
   * untouched.
   */
  defaultsFor: string[];
  compat: InterfaceCompat[];
}

export interface InterfaceBinding {
  /**
   * Which interface this instance implements. Absent in files written before
   * instances existed, where the map key *was* the interface id — which is
   * still true of the default instance, so absence resolves to the key.
   */
  interface?: string;
  provider: string;
  /**
   * Pin this instance to one credential. Without it the provider's first
   * credential is used, which is the only sensible default and exactly the
   * thing that makes two accounts on one provider indistinguishable.
   */
  credentialId?: string;
  /** Option overrides merged over the compat entry's defaults (e.g. model). */
  options?: Record<string, unknown>;
}

interface BindingsFile {
  bindings?: Record<string, InterfaceBinding>;
}

export interface InterfaceNamespace {
  /** The interface being implemented (`sql`). */
  interfaceId: string;
  /** Always the bare interface id — profiles travel in the request body. */
  instance: string;
}

/**
 * Parse a namespace as a bare interface id, or `undefined` when it names no
 * interface (or uses the removed colon-addressed form).
 */
export function parseInterfaceNamespace(namespace: string): InterfaceNamespace | undefined {
  if (namespace.includes(":")) return undefined;
  return isInterface(namespace) ? { interfaceId: namespace, instance: namespace } : undefined;
}

/** Contract packages whose `compat.json` feeds the workspace interface catalog. */
const CONTRACT_PACKAGES = [
  "@utdk/agent",
  "@utdk/llm",
  "@utdk/sql",
  "@utdk/sandbox",
  "@utdk/vcs",
  "@utdk/keyvalue",
  "@utdk/events",
  "@utdk/vfs",
  "@utdk/telemetry",
] as const;

/**
 * Load compat documents from the monorepo `packages/contracts/` tree when
 * present; otherwise resolve each published `@utdk/*` contract package
 * individually. pnpm isolates packages so walking up from `@utdk/agent` no
 * longer finds sibling contracts under `node_modules/@utdk`.
 */
function loadWorkspaceCompatDocuments(): Map<string, CompatDocument> {
  const monorepoContracts = path.resolve(import.meta.dirname, "..", "..", "..", "packages", "contracts");
  if (existsSync(monorepoContracts)) return loadCompatDocuments(monorepoContracts);

  const require = createRequire(import.meta.url);
  const documents = new Map<string, CompatDocument>();
  for (const pkg of CONTRACT_PACKAGES) {
    let root: string;
    try {
      root = path.resolve(require.resolve(pkg), "..", "..");
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "MODULE_NOT_FOUND") continue;
      throw err;
    }
    const manifestPath = path.join(root, "package.json");
    if (!existsSync(manifestPath)) continue;
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as {
      utdk?: { contract?: string };
    };
    const contract = manifest.utdk?.contract;
    if (typeof contract !== "string" || contract === "") continue;
    const compatPath = path.join(root, "compat.json");
    if (!existsSync(compatPath)) continue;
    const document = parseCompatDocument(
      JSON.parse(readFileSync(compatPath, "utf8")) as unknown,
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

/** Pre-instance catalog order; contracts beyond it sort alphabetically after. */
const INTERFACE_ORDER = ["llm", "sql", "sandbox", "vcs", "agent"];

/**
 * The compat catalog, loaded once at module init from the contract packages'
 * `compat.json` documents (build-time data; no hot reload needed). A
 * malformed document fails loudly here, at import — never as silently
 * dropped entries.
 */
const compatDocuments: CompatDocument[] = [...loadWorkspaceCompatDocuments().values()].sort(
  (left, right) => {
    const l = INTERFACE_ORDER.indexOf(left.interface.id);
    const r = INTERFACE_ORDER.indexOf(right.interface.id);
    if (l !== -1 || r !== -1) return (l === -1 ? INTERFACE_ORDER.length : l) - (r === -1 ? INTERFACE_ORDER.length : r);
    return left.interface.id.localeCompare(right.interface.id);
  },
);

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

/**
 * The interface catalog — a consumer of the contract packages' `compat.json`
 * data (loaded through `@utdk/common/compat`), not its home. `llm` rides the
 * OpenAI-compatible chat surface — its compat list IS the chat-provider
 * registry (src/llm.ts), declared via the `compatSource` indirection, so the
 * chat picker and the interface stay in lockstep. Further interfaces add a
 * `compat.json` to their contract package; nothing here changes.
 */
export function listInterfaces(): InterfaceDef[] {
  return compatDocuments.map((document) => ({
    id: document.interface.id,
    label: document.interface.label,
    description: document.interface.description,
    timeoutMs: document.interface.timeoutMs,
    defaultsFor: [...document.interface.defaultsFor],
    compat:
      document.compatSource === "chat-provider-registry"
        ? listLlmProviders().map((provider) => ({
            provider: provider.id,
            label: provider.label,
            module: provider.module,
            baseUrl: provider.baseUrl,
            defaults: { model: provider.defaultModel },
          }))
        : (document.compat ?? []).map(toInterfaceCompat),
  }));
}

export function resolveInterface(id: string): InterfaceDef | undefined {
  return listInterfaces().find((def) => def.id === id);
}

export function isInterface(id: string): boolean {
  return listInterfaces().some((def) => def.id === id);
}

/**
 * The WS-3 dispatch-plane cutover, bindings half: a workspace binding IS a
 * registry-server profile row — `(tenant, targetKind "interface", targetId,
 * name)` with the default instance stored under the package's reserved name
 * `"default"` and `sql:analytics` under `"analytics"`. `.services/bindings.json`
 * is a tombstone: read once, imported into profiles, deleted.
 */
const DEFAULT_PROFILE_NAME = "default";

function splitInstance(instance: string): { interfaceId: string; name: string } {
  // Legacy colon keys from pre-migration bindings may still appear during
  // import; after migration every key is a bare interface id + profile name.
  const separator = instance.indexOf(":");
  if (separator === -1) return { interfaceId: instance, name: DEFAULT_PROFILE_NAME };
  return { interfaceId: instance.slice(0, separator), name: instance.slice(separator + 1) };
}

function toInstanceKey(targetId: string, name: string): string {
  // Stored configuration never uses the colon form — named profiles are
  // addressed as (targetId, name) in the profile store. The map key for the
  // in-memory bindings view stays the bare interface for the default and
  // `${targetId}\0${name}` is not needed: listInstances returns structured
  // records. For resolveInterfaceForWorkspace we look up by profile name.
  return name === DEFAULT_PROFILE_NAME ? targetId : `${targetId}\u0000${name}`;
}

function bindingLookupKey(interfaceId: string, profileName?: string): string {
  if (profileName === undefined || profileName === "" || profileName === DEFAULT_PROFILE_NAME) {
    return interfaceId;
  }
  return `${interfaceId}\u0000${profileName}`;
}

async function readLegacyBindingsFile(
  workspaceId: string,
): Promise<Record<string, InterfaceBinding>> {
  const file = await getFsStore().read(workspaceId, BINDINGS_PATH);
  if (!file) return {};
  try {
    return (JSON.parse(file.content) as BindingsFile).bindings ?? {};
  } catch {
    return {};
  }
}

/**
 * One-time tombstone import: when the profile store holds nothing for this
 * workspace but a legacy bindings file exists, carry the bindings over and
 * delete the file. Best-effort — a failed import leaves the file for the
 * next read.
 */
async function importLegacyBindings(workspaceId: string): Promise<void> {
  const legacy = await readLegacyBindingsFile(workspaceId).catch(() => ({}));
  const entries = Object.entries(legacy);
  if (entries.length > 0) {
    for (const [instance, binding] of entries) {
      await writeProfileBinding(workspaceId, instance, binding, "bindings-migration").catch(
        () => undefined,
      );
    }
  }
  await getFsStore()
    .remove(workspaceId, BINDINGS_PATH)
    .catch(() => undefined);
}

async function readProfileBindings(
  workspaceId: string,
): Promise<Record<string, InterfaceBinding>> {
  const storage = await getRegistryStorage();
  await storage.tenants.ensure(workspaceId);
  let rows = await storage.profiles.list(workspaceId, { targetKind: "interface" });
  if (rows.length === 0) {
    // Nothing bound yet — a pre-cutover deployment may have left a legacy
    // bindings file behind; import it once, then the file is gone.
    const legacyFile = await getFsStore()
      .read(workspaceId, BINDINGS_PATH)
      .catch(() => undefined);
    if (legacyFile) {
      await importLegacyBindings(workspaceId);
      rows = await storage.profiles.list(workspaceId, { targetKind: "interface" });
    }
  }
  const bindings: Record<string, InterfaceBinding> = {};
  for (const row of rows) {
    if (!row.provider) continue;
    bindings[toInstanceKey(row.targetId, row.name)] = {
      interface: row.targetId,
      provider: row.provider,
      ...(row.credentialId ? { credentialId: row.credentialId } : {}),
      ...(Object.keys(row.options ?? {}).length > 0 ? { options: row.options } : {}),
    };
  }
  return bindings;
}

async function writeProfileBinding(
  workspaceId: string,
  instance: string,
  binding: InterfaceBinding | null,
  updatedBy: string,
): Promise<void> {
  const storage = await getRegistryStorage();
  await storage.tenants.ensure(workspaceId);
  const { interfaceId, name } = splitInstance(instance);
  const targetId = binding?.interface ?? interfaceId;
  const existing = await storage.profiles.getByName(workspaceId, "interface", targetId, name);
  if (!binding) {
    if (existing) await storage.profiles.delete(workspaceId, existing.id);
    return;
  }
  if (existing) {
    await storage.profiles.update(workspaceId, existing.id, {
      provider: binding.provider,
      credentialId: binding.credentialId,
      options: binding.options ?? {},
    });
    return;
  }
  await storage.profiles.create(workspaceId, {
    name,
    targetKind: "interface",
    targetId,
    provider: binding.provider,
    ...(binding.credentialId ? { credentialId: binding.credentialId } : {}),
    options: binding.options ?? {},
    createdBy: updatedBy,
  });
}

export async function readBindings(
  workspaceId: string,
): Promise<Record<string, InterfaceBinding>> {
  return readProfileBindings(workspaceId);
}

/**
 * Every configured instance, keyed by namespace. The default instance is
 * included only when it is explicitly bound — an interface resolving by the
 * zero-config fallback has no instance record, and inventing one would make
 * "bound to Postgres" and "happens to have a Postgres credential" look the
 * same in the UI.
 */
export async function listInstances(
  workspaceId: string,
): Promise<
  Array<InterfaceNamespace & { binding: InterfaceBinding; name?: string }>
> {
  const bindings = await readBindings(workspaceId);
  const instances: Array<InterfaceNamespace & { binding: InterfaceBinding; name?: string }> = [];
  for (const [key, binding] of Object.entries(bindings)) {
    const sep = key.indexOf("\u0000");
    const interfaceId = sep === -1 ? key : key.slice(0, sep);
    const name = sep === -1 ? undefined : key.slice(sep + 1);
    if (!isInterface(interfaceId)) continue;
    instances.push({
      interfaceId,
      instance: interfaceId,
      ...(name !== undefined ? { name } : {}),
      binding,
    });
  }
  return instances;
}

export async function writeBinding(
  workspaceId: string,
  instance: string,
  binding: InterfaceBinding | null,
  updatedBy = "workspace",
): Promise<void> {
  if (binding) {
    await assertProviderBindingAllowed(workspaceId, binding.provider);
  }
  await writeProfileBinding(workspaceId, instance, binding, updatedBy);
}

export interface ResolvedInterface {
  def: InterfaceDef;
  compat: InterfaceCompat;
  /** compat defaults merged with binding option overrides, minus `baseUrl`. */
  options: Record<string, unknown>;
  /**
   * API root for the executing module: the binding's `baseUrl` option, else
   * the compat entry's. Some implementations have no vendor-hosted endpoint
   * at all — a Cloudflare sandbox Worker, a local host relay — so where the
   * API lives is workspace configuration, not a property of the provider.
   */
  baseUrl?: string;
  /** Whether an explicit binding chose this implementation. */
  bound: boolean;
  /** The namespace that resolved here (`sql`, `sql:analytics`). */
  instance: string;
  /** The credential this instance is pinned to, if any. */
  credentialId?: string;
}

/**
 * Split the merged option bag into the API root and the option defaults that
 * get folded into call arguments. `baseUrl` is transport, not an argument —
 * passing it through as one would put it in every `defaultsFor` operation's
 * args.
 */
function splitOptions(
  compat: InterfaceCompat,
  merged: Record<string, unknown>,
): { options: Record<string, unknown>; baseUrl?: string } {
  const { baseUrl, ...options } = merged;
  const resolved = typeof baseUrl === "string" && baseUrl ? baseUrl : compat.baseUrl;
  return { options, ...(resolved ? { baseUrl: resolved } : {}) };
}

/**
 * Resolve an interface namespace to its concrete implementation for a
 * workspace: caller override first (e.g. a workflow registration's
 * `bindings`), then the named/default profile, else — for the default only —
 * the first compat provider with a credential.
 *
 * `namespace` is always a bare interface id. Named configurations travel as
 * `profile` (request body / depth-0 configure), never as a colon path segment.
 * A named profile has no zero-config fallback.
 */
export async function resolveInterfaceForWorkspace(
  workspaceId: string,
  namespace: string,
  overrideProvider?: string,
  profile?: string,
): Promise<ResolvedInterface> {
  const parsed = parseInterfaceNamespace(namespace);
  if (!parsed) throw new ServiceError(`Unknown interface: ${namespace}`, 404);
  const interfaceId = parsed.interfaceId;
  const name =
    profile !== undefined && profile !== "" && profile !== DEFAULT_PROFILE_NAME
      ? profile
      : undefined;
  const instance = interfaceId;
  const def = resolveInterface(interfaceId);
  if (!def) throw new ServiceError(`Unknown interface: ${interfaceId}`, 404);

  const bindings = await readBindings(workspaceId);
  const binding = bindings[bindingLookupKey(interfaceId, name)];

  if (overrideProvider) {
    const compat = def.compat.find((entry) => entry.provider === overrideProvider);
    if (!compat) {
      throw new ServiceError(
        `${overrideProvider} does not implement ${interfaceId}. Compatible: ${def.compat.map((c) => c.provider).join(", ")}`,
        400,
      );
    }
    // The instance's options still apply when they target the same provider
    // (e.g. a model choice for the overridden provider); its credential does
    // not — an override names a different implementation.
    const merged =
      binding?.provider === overrideProvider
        ? { ...compat.defaults, ...binding.options }
        : { ...compat.defaults };
    return {
      def,
      compat,
      ...splitOptions(compat, merged),
      bound: true,
      instance,
      ...(binding?.provider === overrideProvider && binding.credentialId
        ? { credentialId: binding.credentialId }
        : {}),
    };
  }

  if (binding) {
    const compat = def.compat.find((entry) => entry.provider === binding.provider);
    if (!compat) {
      throw new ServiceError(
        `${instance} is bound to ${binding.provider}, which does not implement ${interfaceId}`,
        400,
      );
    }
    return {
      def,
      compat,
      ...splitOptions(compat, { ...compat.defaults, ...binding.options }),
      bound: true,
      instance,
      ...(binding.credentialId ? { credentialId: binding.credentialId } : {}),
    };
  }

  if (name !== undefined) {
    const existing = Object.keys(bindings)
      .filter((key) => key === interfaceId || key.startsWith(`${interfaceId}\u0000`))
      .map((key) => {
        const sep = key.indexOf("\u0000");
        return sep === -1 ? "default" : key.slice(sep + 1);
      });
    const available =
      existing.length > 0
        ? `Available profiles: ${existing.map((n) => JSON.stringify(n)).join(", ")}`
        : `No profiles are configured for ${interfaceId}`;
    throw new ServiceError(
      `No ${interfaceId} profile named ${JSON.stringify(name)}. ${available}. ` +
        `Create it with profiles.set { namespace: "${interfaceId}", name: ${JSON.stringify(name)}, provider: … }.`,
      404,
    );
  }

  const credentials = await getCredentialStore().list(workspaceId);
  const connected = new Set(credentials.map((credential) => credential.provider));
  // A credentialless implementation wins ahead of any connected vendor, in
  // catalog order. Falling back to "the first vendor we happen to hold a key
  // for" is a sensible default for `sql` (a database is a database) and a bad
  // one for `agent`: having an OpenAI key is not consent to run your agents in
  // OpenAI's cloud. Where a first-party implementation exists, it is the
  // conservative answer as well as the free one.
  const compat =
    def.compat.find((entry) => entry.credentialless) ??
    def.compat.find((entry) => connected.has(entry.provider));
  if (!compat) {
    throw new ServiceError(
      `Interface ${interfaceId} has no profile and no connected compatible provider. ` +
        `Connect a credential for one of: ${def.compat.map((c) => c.provider).join(", ")} — or set one with profiles.set.`,
      400,
    );
  }
  return {
    def,
    compat,
    ...splitOptions(compat, { ...compat.defaults }),
    bound: false,
    instance,
  };
}
