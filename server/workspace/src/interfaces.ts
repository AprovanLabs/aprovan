/**
 * Generic interfaces — virtual tool namespaces a workspace binds to a
 * concrete provider + credential.
 *
 * Many APIs implement a subset of another (OpenAI-compatible LLM servers,
 * S3-compatible object stores). An *interface* names that common surface
 * (`llm`, `objectstore`, …); *compat entries* list which registry providers
 * implement it and how to reach them (executor module + base URL + option
 * defaults); a *workspace binding* (`.services/bindings.json`) picks the
 * implementation. Callers use one stable namespace —
 *
 *   await llm.createChatCompletion({ messages });
 *
 * — and swapping OpenAI for Anthropic (or Synthetic) is a binding change,
 * not a code change. Credentials stay keyed by the concrete provider id, so
 * the registry credentials page and the gateway credential store line up.
 *
 * Zero-config: with no explicit binding, an interface resolves to the first
 * compat provider that has a workspace credential.
 *
 * ## Instances
 *
 * One binding per interface is enough to answer "which LLM does this
 * workspace use", and not enough for anything else: a workspace with a
 * production database and an analytics warehouse needs *both* bound to `sql`
 * at once, and two accounts on one provider need two credentials. So a
 * binding is keyed by an **instance name**, not by the interface id:
 *
 *   sql              → the default instance (what `sql.query` reaches)
 *   sql:analytics    → a second, independently bound implementation
 *   sql:warehouse    → a third
 *
 * Each instance is (interface, provider, credential, options), and each is a
 * namespace of its own — `sql:analytics.query` appears in tool discovery, in
 * the services menu, and as a workflow script import next to `sql.query`. The
 * bare interface id is reserved as the default instance, which is why the
 * pre-instance bindings file (keyed by interface id, with no `interface`
 * field) reads correctly as-is: it was always describing the default.
 */

import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import path from "node:path";
import { loadCompatDocuments } from "@utdk/common/compat";
import type { CompatDocument, CompatEntry } from "@utdk/common/compat";
import { getFsStore } from "./fs-store.js";
import { getCredentialStore } from "./credentials.js";
import { listLlmProviders } from "./llm.js";
import { getRegistryStorage } from "./registry-storage.js";
import { storeBackend } from "./runtime/config.js";
import { ServiceError } from "./service-kernel.js";

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

/** Instance names: same shape as an agent or workflow name. */
const INSTANCE_RE = /^[a-z0-9][a-z0-9-]{0,63}$/u;

export interface InterfaceNamespace {
  /** The interface being implemented (`sql`). */
  interfaceId: string;
  /** The bindings-file key (`sql` for the default, `sql:analytics` named). */
  instance: string;
  /** The part after the colon, absent for the default instance. */
  name?: string;
}

/**
 * Parse a namespace into its interface and instance, or `undefined` when it
 * names no interface at all.
 *
 * `:` is safe as the separator: no registry provider id contains one (they
 * use dashes and slashes — `synthetic-new`, `fly/sprites`), and a namespace
 * is a single path segment on the wire, so `POST /tools/sql:analytics/query`
 * needs no routing change.
 */
export function parseInterfaceNamespace(namespace: string): InterfaceNamespace | undefined {
  const separator = namespace.indexOf(":");
  if (separator === -1) {
    return isInterface(namespace) ? { interfaceId: namespace, instance: namespace } : undefined;
  }
  const interfaceId = namespace.slice(0, separator);
  const name = namespace.slice(separator + 1);
  if (!isInterface(interfaceId) || !INSTANCE_RE.test(name)) return undefined;
  return { interfaceId, instance: namespace, name };
}

/**
 * Locate `packages/contracts/` (or, in a deployed install, the `@utdk` scope
 * directory) by walking up from the resolved `@utdk/agent` entry point — a
 * declared dependency whose realpath lands inside the contracts directory in
 * the monorepo and inside `node_modules/@utdk` when installed from tarballs.
 * The compat loader filters on the `utdk.contract` manifest marker, so
 * non-contract neighbours (`common`, `mcp-core`) are ignored either way.
 */
function resolveContractsDir(): string {
  const monorepoContracts = path.resolve(import.meta.dirname, "..", "..", "..", "packages", "contracts");
  if (existsSync(monorepoContracts)) return monorepoContracts;
  const require = createRequire(import.meta.url);
  // <contracts dir>/agent/dist/index.js → up three.
  return path.resolve(require.resolve("@utdk/agent"), "..", "..", "..");
}

/** Pre-instance catalog order; contracts beyond it sort alphabetically after. */
const INTERFACE_ORDER = ["llm", "sql", "sandbox", "vcs", "agent"];

/**
 * The compat catalog, loaded once at module init from the contract packages'
 * `compat.json` documents (build-time data; no hot reload needed). A
 * malformed document fails loudly here, at import — never as silently
 * dropped entries.
 */
const compatDocuments: CompatDocument[] = [...loadCompatDocuments(resolveContractsDir()).values()].sort(
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
 * The WS-3 dispatch-plane cutover, bindings half: on the durable backends
 * (sqlite locally, dsql in cloud) a workspace binding IS a registry-server
 * profile row — `(tenant, targetKind "interface", targetId, name)` with the
 * default instance stored under the package's reserved name `"default"` and
 * `sql:analytics` under `"analytics"`. `.services/bindings.json` is a
 * tombstone: read once, imported into profiles, deleted. Only the interim
 * dynamo backend still reads the file (the package has no Dynamo driver by
 * design), and that path dies wholesale when the cutover flips to dsql.
 */
const DEFAULT_PROFILE_NAME = "default";

function usesLegacyBindingsFile(): boolean {
  return storeBackend() === "dynamo";
}

function splitInstance(instance: string): { interfaceId: string; name: string } {
  const separator = instance.indexOf(":");
  if (separator === -1) return { interfaceId: instance, name: DEFAULT_PROFILE_NAME };
  return { interfaceId: instance.slice(0, separator), name: instance.slice(separator + 1) };
}

function toInstanceKey(targetId: string, name: string): string {
  return name === DEFAULT_PROFILE_NAME ? targetId : `${targetId}:${name}`;
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
  if (usesLegacyBindingsFile()) return readLegacyBindingsFile(workspaceId);
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
): Promise<Array<InterfaceNamespace & { binding: InterfaceBinding }>> {
  const bindings = await readBindings(workspaceId);
  const instances: Array<InterfaceNamespace & { binding: InterfaceBinding }> = [];
  for (const [instance, binding] of Object.entries(bindings)) {
    const parsed = parseInterfaceNamespace(instance);
    // A binding whose interface no longer exists (renamed, removed) is
    // skipped rather than thrown on — the file outlives the catalog.
    if (!parsed) continue;
    instances.push({ ...parsed, binding });
  }
  return instances;
}

export async function writeBinding(
  workspaceId: string,
  instance: string,
  binding: InterfaceBinding | null,
  updatedBy = "workspace",
): Promise<void> {
  if (!usesLegacyBindingsFile()) {
    await writeProfileBinding(workspaceId, instance, binding, updatedBy);
    return;
  }
  // Interim dynamo backend: the legacy file, exactly as before the cutover.
  const bindings = await readLegacyBindingsFile(workspaceId);
  if (binding) {
    bindings[instance] = binding;
  } else {
    delete bindings[instance];
  }
  await getFsStore().write(
    workspaceId,
    BINDINGS_PATH,
    JSON.stringify({ bindings }, null, 2),
    "application/json",
  );
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
 * `bindings`), then the instance's binding, else — for the default instance
 * only — the first compat provider with a credential.
 *
 * `namespace` is `sql` or `sql:analytics`. A *named* instance has no
 * zero-config fallback by design: `sql` meaning "whatever database is
 * connected" is a convenience, but `sql:analytics` silently pointing at
 * production because nobody bound it would be a data leak wearing a
 * convenience's clothes.
 */
export async function resolveInterfaceForWorkspace(
  workspaceId: string,
  namespace: string,
  overrideProvider?: string,
): Promise<ResolvedInterface> {
  const parsed = parseInterfaceNamespace(namespace);
  if (!parsed) throw new ServiceError(`Unknown interface: ${namespace}`, 404);
  const { interfaceId, instance, name } = parsed;
  const def = resolveInterface(interfaceId);
  if (!def) throw new ServiceError(`Unknown interface: ${interfaceId}`, 404);

  const binding = (await readBindings(workspaceId))[instance];

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
    throw new ServiceError(
      `No such interface instance: ${instance}. Create it with interfaces.bind { interface: "${interfaceId}", as: "${name}", provider: … }.`,
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
      `Interface ${interfaceId} has no binding and no connected compatible provider. ` +
        `Connect a credential for one of: ${def.compat.map((c) => c.provider).join(", ")} — or bind one with interfaces.bind.`,
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
