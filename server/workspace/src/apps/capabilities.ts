/**
 * What a published app may touch — the whitelisting story, stated once so
 * every surface (publish validation, the app tool proxy, the directory UI, the
 * generated SDK) reads it from the same place instead of hardcoding lists.
 *
 * There are exactly three ways an app reaches data:
 *
 *  1. **Native, auto-partitioned** — {@link NATIVE_APP_NAMESPACES}. First-party
 *     namespaces whose storage is automatically partitioned per (app, app
 *     user) and rate-limited per user. No credential, no workspace membership.
 *  2. **Workspace-credentialed** — a provider namespace (`github`, `linear`, …)
 *     executing with the OWNING workspace's credential. Reachable from an app
 *     session's tool proxy only through an explicit **credential grant**: an
 *     `allowedTools` entry naming one *exact* procedure (`github.repos.get`) —
 *     never a wildcard — for a provider the workspace actually holds a
 *     credential for. `apps.capabilities` reports each grant under this tier.
 *  3. **Exported workflows** — everything else. A workflow is the BFF boundary:
 *     allow-listed by name, traced, rate-limited, and the only place a secret
 *     is ever near an app request. Exported workflows are callable as
 *     `POST /tools/app/<workflow>` — at the call site a workflow and a native
 *     procedure are indistinguishable (capability = namespace).
 *
 * `allowedTools` may therefore name (1), the app's own workflow namespace, and
 * exact provider procedures (2); {@link assertAllowedTools} rejects everything
 * else — a provider *wildcard* in particular — with a message pointing at (3).
 */

import {
  NATIVE_APP_NAMESPACES,
  type NativeAppNamespace,
} from "@aprovan/patchwork-compiler/namespace-core";
import { isInterface } from "../interfaces.js";
import { isCoreServiceName, ServiceError } from "../service-kernel.js";
import { DEFAULT_DAILY_CALLS } from "./usage.js";
import type { AppManifest, AppRequirement } from "./store.js";

export type { AppRequirement };
export { NATIVE_APP_NAMESPACES, type NativeAppNamespace };

/** The auto-partitioned first-party namespaces an app session may call.
 *  Defined once in `@aprovan/patchwork-compiler/namespace-core`.
 *  `notifications` is scoped per (app, user) by construction: an app can
 *  only notify its own current user, and only embed choices whose calls it
 *  could make itself (see notifications/service.ts). `telemetry` is
 *  stamped/filtered by app the same way (telemetry/service.ts). */

/**
 * Namespace an app's exported workflows answer on. `app` is canonical (an app
 * calls its own workflow as `app.weeklySummary(...)`); `workflow` is accepted
 * as a synonym in allow-list entries and on the wire so a manifest that spells
 * it out long-form keeps working.
 */
export const APP_WORKFLOW_NAMESPACE = "app";
const WORKFLOW_NAMESPACE_ALIASES = new Set([APP_WORKFLOW_NAMESPACE, "workflow"]);

export function isNativeNamespace(namespace: string): namespace is NativeAppNamespace {
  return (NATIVE_APP_NAMESPACES as readonly string[]).includes(namespace);
}

export function isWorkflowNamespace(namespace: string): boolean {
  return WORKFLOW_NAMESPACE_ALIASES.has(namespace);
}

/**
 * `weekly-summary` → `weeklySummary`. Workflow names are kebab-case ids; the
 * SDK and the tool proxy also answer to the camel-case spelling so
 * `app.weeklySummary(input)` reads like an ordinary method call.
 */
export function camelCase(name: string): string {
  return name.replace(/-([a-z0-9])/gu, (_, ch: string) => ch.toUpperCase());
}

/**
 * Resolve a requested procedure to one of the app's exported workflow names,
 * accepting either the kebab-case id or its camel-case alias.
 */
export function resolveExportedWorkflow(
  workflows: readonly string[],
  requested: string,
): string | undefined {
  return workflows.find((name) => name === requested || camelCase(name) === requested);
}

// ---------------------------------------------------------------------------
// Native capability descriptors
// ---------------------------------------------------------------------------

export interface NativeCapabilityPartitioning {
  /**
   * "per-app-user" — every app user gets a private partition under
   * `.apps/<appId>/data/<user>` in the workspace hosting the session.
   */
  mode: "per-app-user";
  /** Where a write physically lands, as a path template. */
  path: string;
  description: string;
}

export interface NativeCapability {
  namespace: NativeAppNamespace;
  description: string;
  /** Procedures reachable in this app (allow-list filtered). */
  procedures: string[];
  partitioning: NativeCapabilityPartitioning;
  /** Effective per-app-user limits for this app. */
  rateLimit: { rps: number; burst: number; daily: number };
}

interface NativeSpec {
  description: string;
  procedures: string[];
  /**
   * FS-path-shaped partitioning (vfs, events — still file/append-log backed).
   * `<root>` is substituted with `.apps/<appId>/data` at describe time.
   * Mutually exclusive with `recordsPartition` below.
   */
  fsPath?: string;
  /**
   * Record-store partitioning (keyvalue — see records.ts). An app session
   * only ever addresses its own `app#<appId>#u#<self>` scope. `<appId>` is
   * substituted at describe time.
   */
  recordsPartition?: string;
  partitionNote: string;
}

const NATIVE_SPECS: Record<NativeAppNamespace, NativeSpec> = {
  vfs: {
    description:
      "The app's own folder as a filesystem. Relative paths resolve under the app root; `~/<path>` reaches another declared prefix or a workspace share.",
    procedures: ["list", "read", "write", "delete"],
    fsPath: "<root>/",
    partitionNote:
      "Reads and writes are confined to the app's declared prefixes, and each user's file partition " +
      "(.apps/<appId>/data/<user>) is read-enforced: readable and writable only by that user — other members " +
      "get 404 — with app-admin access only through the audited apps.data procedure. Never served over HTTP.",
  },
  keyvalue: {
    description: "Per-user JSON key/value storage, accumulated in the record store.",
    procedures: ["get", "set", "delete", "list"],
    recordsPartition: "app#<appId>#u#<you>",
    partitionNote:
      "Keys are transparently namespaced and read-enforced — an app user can only ever read and write " +
      "their own partition, and the app's admins reach a user's data only through the audited apps.data " +
      "procedure.",
  },
  events: {
    description:
      "Named event channels. Emissions trigger the workspace's subscribed workflows (depth-capped).",
    procedures: ["emit", "list"],
    fsPath: ".services/events/<channel>.jsonl (owning workspace)",
    partitionNote:
      "Channels are workspace-wide: emissions are visible to the workspace that hosts the app's data.",
  },
  notifications: {
    description:
      "Notify the app's current user: title/body, an optional widget that renders the content, and optional one-click choices. Choices may only call tools this app itself can call.",
    procedures: ["emit", "list", "seen"],
    recordsPartition: "notify (record store, per workspace)",
    partitionNote:
      "An app only ever notifies — and lists notifications for — its own current user, stamped with the app as the source. Seen notifications hide and expire after 10 days.",
  },
  telemetry: {
    description:
      "Debugging telemetry: emit OTel-shaped spans/logs and query them back (errors carry message + stack, spans carry durations). Events expire after 3 days.",
    procedures: ["emit", "query", "traces"],
    recordsPartition: "telemetry (record store, per workspace)",
    partitionNote:
      "Events emitted through an app session are stamped with the app as the source, and the app only ever reads its own stream.",
  },
  agents: {
    description:
      "Named agent profiles: provider/model/prompt plus capability grants. Read-only for apps — resolve an assignee's configuration; managing profiles is member-only.",
    procedures: ["get", "list", "runs"],
    fsPath: ".services/agents/ (owning workspace)",
    partitionNote:
      "Apps can read profiles and executions but never create, update, or delete them — a grant is something a member gives, not something an app mints.",
  },
};

/** Does the manifest's allow-list permit `namespace.procedure`? */
function allowListPermits(manifest: AppManifest, namespace: string, procedure: string): boolean {
  const exact = `${namespace}.${procedure}`;
  return manifest.allowedTools.some((entry) => entry === exact || entry === `${namespace}.*`);
}

/** The app's effective per-user rate limits (manifest values or the defaults). */
export function effectiveRateLimit(manifest: AppManifest): {
  rps: number;
  burst: number;
  daily: number;
} {
  return {
    rps: manifest.rateLimit?.rps ?? 5,
    burst: manifest.rateLimit?.burst ?? 10,
    daily: manifest.rateLimit?.daily ?? DEFAULT_DAILY_CALLS,
  };
}

/**
 * The native half of `apps.capabilities`: one descriptor per allow-listed
 * native namespace, with the procedures this app may actually call and where
 * its data lands under `.apps/<appId>/data/<user>`.
 */
export function nativeCapabilities(manifest: AppManifest): NativeCapability[] {
  const root = `.apps/${manifest.appId}/data`;
  const rateLimit = effectiveRateLimit(manifest);

  const capabilities: NativeCapability[] = [];
  for (const namespace of NATIVE_APP_NAMESPACES) {
    const spec = NATIVE_SPECS[namespace];
    const procedures = spec.procedures.filter((procedure) =>
      allowListPermits(manifest, namespace, procedure),
    );
    if (procedures.length === 0) continue;
    const path = spec.recordsPartition
      ? `records: ${spec.recordsPartition.replace("<appId>", manifest.appId)}`
      : spec.fsPath!.replace("<root>", root);
    const description = spec.recordsPartition
      ? `Records live in the hosting workspace's record store. ${spec.partitionNote}`
      : `Data lives under ${root}/<user> in the hosting workspace. ${spec.partitionNote}`;
    capabilities.push({
      namespace,
      description: spec.description,
      procedures,
      partitioning: { mode: "per-app-user", path, description },
      rateLimit,
    });
  }
  return capabilities;
}

// ---------------------------------------------------------------------------
// Publish validation
// ---------------------------------------------------------------------------

const ENTRY_RE = /^([\w-]+)\.(\*|[\w.-]+)$/u;

/** One provider credential grant parsed out of `allowedTools`. */
export interface ProviderGrant {
  /** Provider whose workspace credential executes the call (e.g. "github"). */
  provider: string;
  /** Exact procedure granted (e.g. "repos.get") — never a wildcard. */
  procedure: string;
}

/** Declared contract ids from a requires list (for allow-list checks). */
function declaredContracts(requires: readonly AppRequirement[] | undefined): Set<string> {
  return new Set((requires ?? []).map((req) => req.contract));
}

/**
 * Validate an `allowed_tools` list against the three-ways-to-reach-data rule
 * and return the provider credential grants it contains (tier 2 — the caller
 * must still verify the workspace holds a credential for each provider).
 *
 * Declared interface contracts (from `requires`) are a fourth acceptable form:
 * exact `contract.procedure` entries, same no-wildcard rule as providers.
 *
 * A provider *wildcard* is rejected with the escape hatch spelled out, because
 * "add github.* to allowed_tools" is exactly the mistake this model exists to
 * prevent: a blanket borrow of the owner's credential with no audited
 * boundary. An exact procedure is a deliberate, narrow credential grant; a
 * workflow is the boundary for anything broader.
 */
export function assertAllowedTools(
  entries: string[],
  context: {
    app: string;
    workflows: readonly string[];
    requires?: readonly AppRequirement[];
  },
): ProviderGrant[] {
  const contracts = declaredContracts(context.requires);
  const grants: ProviderGrant[] = [];
  for (const entry of entries) {
    const match = ENTRY_RE.exec(entry);
    if (!match) {
      throw new ServiceError(
        `allowed_tools entry "${entry}" must be 'namespace.procedure' or 'namespace.*'`,
        400,
      );
    }
    const namespace = match[1]!;
    const procedure = match[2]!;
    if (isNativeNamespace(namespace)) continue;
    if (isWorkflowNamespace(namespace)) {
      if (procedure === "*") continue;
      if (resolveExportedWorkflow(context.workflows, procedure)) continue;
      throw new ServiceError(
        `allowed_tools entry "${entry}" names a workflow ${context.app} does not export. ` +
          `Add "${procedure}" to this app's \`workflows\` list first ` +
          `(exported: ${context.workflows.length > 0 ? context.workflows.join(", ") : "none"}).`,
        400,
      );
    }
    // Declared interface contracts: exact procedures only (tier-2 shape).
    if (contracts.has(namespace)) {
      if (procedure === "*") {
        throw new ServiceError(
          `allowed_tools entry "${entry}" grants a whole interface namespace, which is never allowed: a contract entry ` +
            `must name one exact procedure (e.g. "${namespace}.query"). ` +
            `Anything broader belongs in an exported workflow — register one that calls ${namespace}, list it in ` +
            `\`workflows\`, and the app calls it as "${APP_WORKFLOW_NAMESPACE}.<workflow>".`,
          400,
        );
      }
      continue;
    }
    // Core service namespaces (registry, workflows, apps, …) are neither
    // native app namespaces nor providers — they are never app-reachable.
    if (isCoreServiceName(namespace)) {
      throw new ServiceError(
        `allowed_tools entry "${entry}" is not reachable from an app session: "${namespace}" is a core service ` +
          `namespace, not a provider. Only the auto-partitioned natives (${NATIVE_APP_NAMESPACES.join(", ")}), ` +
          `this app's workflow namespace ("${APP_WORKFLOW_NAMESPACE}.*"), exact provider procedures, and ` +
          `exact procedures on declared requires contracts are allowed.`,
        400,
      );
    }
    // Provider namespace: an entry here is a credential grant, so it must be
    // one exact procedure. Wildcards stay behind the workflow boundary.
    if (procedure === "*") {
      throw new ServiceError(
        `allowed_tools entry "${entry}" grants a whole provider namespace, which is never allowed: a provider entry ` +
          `is a credential grant and must name one exact procedure (e.g. "${namespace}.repos.get"). ` +
          `Anything broader belongs in an exported workflow — register one that calls ${namespace}, list it in ` +
          `\`workflows\`, and the app calls it as "${APP_WORKFLOW_NAMESPACE}.<workflow>".`,
        400,
      );
    }
    grants.push({ provider: namespace, procedure });
  }
  return grants;
}

/**
 * Parse and validate a publish-time `requires` array. Unknown contracts → 400.
 */
export function parseRequires(raw: unknown): AppRequirement[] | undefined {
  if (raw === undefined || raw === null) return undefined;
  if (!Array.isArray(raw)) {
    throw new ServiceError("requires must be an array of {contract, profileName?, optional?}", 400);
  }
  if (raw.length === 0) return [];
  const requires: AppRequirement[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw new ServiceError("requires entries must be objects with a contract id", 400);
    }
    const value = entry as Record<string, unknown>;
    const contract = value["contract"];
    if (typeof contract !== "string" || !contract.trim()) {
      throw new ServiceError("requires entry must name a contract string", 400);
    }
    if (!isInterface(contract)) {
      throw new ServiceError(
        `Unknown contract "${contract}" — declare a contract that exists in the interface catalog`,
        400,
      );
    }
    const req: AppRequirement = { contract };
    if (typeof value["profileName"] === "string" && value["profileName"].trim()) {
      req.profileName = value["profileName"].trim();
    }
    if (value["optional"] === true) req.optional = true;
    requires.push(req);
  }
  return requires;
}

/** One dependencies-section row of `apps.capabilities`. */
export interface DependencyCapability {
  contract: string;
  optional: boolean;
  /** Bound profile id when an installation (or default) resolved one. */
  boundProfile?: string;
  /**
   * Whether the binding is currently authorized. `"ungated"` when the
   * deployment has no profile-grant storage (interim dynamo) — install-side
   * binding only.
   */
  fulfilled: boolean | "ungated";
}

/**
 * Dependencies half of `apps.capabilities`: each declared contract, whether
 * optional, the bound profile (when known), and fulfillment status.
 */
export function dependencyCapabilities(
  manifest: AppManifest,
  options: {
    bindings?: Record<string, string>;
    /** Per-contract fulfillment override (grant check / ungated). */
    fulfilled?: Record<string, boolean | "ungated">;
  } = {},
): DependencyCapability[] {
  return (manifest.requires ?? []).map((req) => {
    const boundProfile = options.bindings?.[req.contract];
    const fulfilled =
      options.fulfilled?.[req.contract] ??
      (boundProfile ? true : req.optional === true ? true : false);
    return {
      contract: req.contract,
      optional: req.optional === true,
      ...(boundProfile ? { boundProfile } : {}),
      fulfilled,
    };
  });
}

/**
 * May an app session call `namespace.procedure` as a declared-contract grant?
 * Exact allow-list entry only; wildcards never qualify.
 */
export function contractGrantCallable(
  manifest: AppManifest,
  namespace: string,
  procedure: string,
): boolean {
  if (!declaredContracts(manifest.requires).has(namespace)) return false;
  return manifest.allowedTools.includes(`${namespace}.${procedure}`);
}

/** The provider credential grants declared in an allow-list, in entry order. */
export function providerGrantEntries(allowedTools: readonly string[]): ProviderGrant[] {
  const grants: ProviderGrant[] = [];
  for (const entry of allowedTools) {
    const match = ENTRY_RE.exec(entry);
    if (!match) continue;
    const namespace = match[1]!;
    const procedure = match[2]!;
    if (isNativeNamespace(namespace) || isWorkflowNamespace(namespace)) continue;
    if (isCoreServiceName(namespace) || procedure === "*") continue;
    if (isInterface(namespace)) continue;
    grants.push({ provider: namespace, procedure });
  }
  return grants;
}

/**
 * May an app session call `namespace.procedure` as a provider credential
 * grant? Call-time re-validation of the tier rules: only an *exact* allow-list
 * entry on a non-native, non-core provider namespace qualifies — a wildcard
 * never does, even if a manifest predating validation carried one.
 */
export function providerGrantCallable(
  manifest: AppManifest,
  namespace: string,
  procedure: string,
): boolean {
  if (isNativeNamespace(namespace) || isWorkflowNamespace(namespace)) return false;
  if (isCoreServiceName(namespace)) return false;
  if (isInterface(namespace)) return false;
  return manifest.allowedTools.includes(`${namespace}.${procedure}`);
}

/** One tier-2 entry of `apps.capabilities`: a provider's granted procedures. */
export interface ProviderGrantCapability {
  provider: string;
  /** Exact procedures granted (never wildcards). */
  procedures: string[];
  tier: "workspace-credentialed";
  /** Provider whose workspace credential executes the calls. */
  credential: string;
  /**
   * Name of the profile that executes this grant, when the workspace stores
   * one for the provider (specs group-profile-grants "Access pane names the
   * executing profile"). Absent when execution rides the zero-config
   * fallback — clients fall back to the bare credential string.
   */
  profile?: string;
  description: string;
}

/**
 * The workspace-credentialed half of `apps.capabilities`: each provider the
 * allow-list grants, with the exact procedures and the credential that
 * executes them.
 */
export function providerGrantCapabilities(manifest: AppManifest): ProviderGrantCapability[] {
  const byProvider = new Map<string, string[]>();
  for (const grant of providerGrantEntries(manifest.allowedTools)) {
    const procedures = byProvider.get(grant.provider) ?? [];
    if (!procedures.includes(grant.procedure)) procedures.push(grant.procedure);
    byProvider.set(grant.provider, procedures);
  }
  return [...byProvider.entries()].map(([provider, procedures]) => ({
    provider,
    procedures,
    tier: "workspace-credentialed" as const,
    credential: provider,
    description:
      `Executes with the owning workspace's ${provider} credential, ` +
      `rate-limited and audited per app user. Exact procedures only.`,
  }));
}

/**
 * May an app session call the exported workflow `name`? The export list
 * (`manifest.workflows`) is the grant. A manifest that *also* spells workflow
 * entries out in `allowedTools` narrows further — explicit narrowing wins over
 * the blanket export.
 */
export function workflowCallable(manifest: AppManifest, name: string): boolean {
  if (!(manifest.workflows ?? []).includes(name)) return false;
  const entries = manifest.allowedTools.filter((entry) =>
    isWorkflowNamespace(entry.slice(0, entry.indexOf("."))),
  );
  if (entries.length === 0) return true;
  const aliases = new Set([name, camelCase(name)]);
  return entries.some((entry) => {
    const procedure = entry.slice(entry.indexOf(".") + 1);
    return procedure === "*" || aliases.has(procedure);
  });
}
