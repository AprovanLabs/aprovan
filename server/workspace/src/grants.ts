/**
 * Unified capability + resource grants (IW-9 C / invariant 2).
 *
 * `evaluateDispatch` is the one server-side predicate every tool execution
 * path must call. Observations skip resource/queue checks. Actions intersect
 * invoker grants ∩ app ceiling ∩ profile narrowing, then match the resource
 * against standing resource-grant rows (or queue on a miss).
 */

import { randomUUID } from "node:crypto";
import {
  matchesResourcePattern,
  type CredentialLevel,
  type ResourceGrantRow,
  type ResourceGrantSubject,
} from "@aprovan/registry-server";
import type { Principal } from "./middleware/auth.js";
import { getPermissionStore } from "./permissions.js";
import {
  invokerMatchedToolPatterns,
  profileGrantAllows,
} from "./profile-grants.js";
import { getRegistryStorage } from "./registry-storage.js";
import { ServiceError } from "./service-kernel.js";

export type Effect = "observation" | "action";

export interface PathGrant {
  /** Workspace path prefix, no leading slash (e.g. "docs/"). */
  prefix: string;
  access: "ro" | "rw";
}

export interface CapabilityGrants {
  tools?: string[];
  paths?: PathGrant[];
}

export interface DispatchRequest {
  principal: Principal;
  via?: { appId?: string; profileId?: string };
  tool: { namespace: string; operation: string; effect: Effect };
  resource?: string;
  credential?: { level: CredentialLevel; id: string };
  runContext?: { runId: string; resultDependent: boolean };
}

export type DispatchDecision =
  | { kind: "allow" }
  | { kind: "deny"; reason: "capability" | "credential-unconnected" }
  | { kind: "queue"; queuedActionId: string }
  | { kind: "ask"; cardId: string };

/** Optional ceilings / overrides for tests and app-session callers. */
export interface EvaluateDispatchOptions {
  /** App install allow-list (`allowedTools`) when `via.appId` is set. */
  appCeiling?: string[];
  /** Agent-run tool projection (patterns) — intersected when present. */
  runTools?: string[];
  /** Skip storage lookups; supply resource grants directly (tests). */
  resourceGrants?: ResourceGrantRow[];
  /** Skip legacy permission / profile resolution; supply invoker patterns. */
  invokerPatterns?: string[];
}

/** Does `pattern` cover the call `namespace.procedure`? */
function patternMatches(pattern: string, call: string): boolean {
  if (pattern === "*") return true;
  if (pattern.endsWith(".*")) {
    const base = pattern.slice(0, -2);
    return call === base || call.startsWith(`${base}.`);
  }
  return call === pattern;
}

/**
 * Capability-pattern matcher (exact / `ns.*` / `*`). Used by
 * {@link evaluateDispatch} and path-adjacent helpers; kept as the shared
 * vocabulary for grant rows and run projections.
 */
export function matchesCapabilityPattern(
  patterns: string[],
  namespace: string,
  procedure: string,
): boolean {
  const call = `${namespace}.${procedure}`;
  return patterns.some((pattern) => patternMatches(pattern, call));
}

/**
 * @deprecated Prefer {@link matchesCapabilityPattern}. Retained name for
 * in-tree callers that still import the old helper; evaluateDispatch is the
 * enforcement chokepoint.
 */
export function toolGranted(
  patterns: string[],
  namespace: string,
  procedure: string,
): boolean {
  return matchesCapabilityPattern(patterns, namespace, procedure);
}

/**
 * Effective access for `path` under the grant list: the longest matching
 * prefix decides; nothing matching is "none". A prefix grant of "docs/"
 * covers "docs" itself and everything under it.
 */
export function pathAccess(grants: PathGrant[], path: string): "none" | "ro" | "rw" {
  let best: { length: number; access: "ro" | "rw" } | undefined;
  for (const grant of grants) {
    const prefix = grant.prefix.replace(/\/+$/u, "");
    const covers = prefix === "" || path === prefix || path.startsWith(`${prefix}/`);
    if (!covers) continue;
    if (!best || prefix.length > best.length) {
      best = { length: prefix.length, access: grant.access };
    }
  }
  return best?.access ?? "none";
}

/** Throw 403 unless the grants (when present) permit this tool call. */
export function assertToolGranted(
  grants: CapabilityGrants | undefined,
  namespace: string,
  procedure: string,
): void {
  if (!grants?.tools) return;
  if (!matchesCapabilityPattern(grants.tools, namespace, procedure)) {
    throw new ServiceError(
      `Agent grant denies ${namespace}.${procedure} (granted: ${grants.tools.join(", ") || "nothing"})`,
      403,
    );
  }
}

/** Throw 403 unless the grants (when present) permit touching `path`. */
export function assertPathGranted(
  grants: CapabilityGrants | undefined,
  path: string,
  write: boolean,
): void {
  if (!grants?.paths) return;
  const access = pathAccess(grants.paths, path);
  if (access === "none" || (write && access === "ro")) {
    throw new ServiceError(
      `Agent grant denies ${write ? "writing" : "reading"} ${path}`,
      403,
    );
  }
}

/** Validate + normalize a grants payload from the API. Throws on garbage. */
export function parseGrants(raw: unknown): CapabilityGrants | undefined {
  if (raw === undefined || raw === null) return undefined;
  if (typeof raw !== "object" || Array.isArray(raw)) {
    throw new ServiceError("grants must be an object { tools?, paths? }", 400);
  }
  const input = raw as Record<string, unknown>;
  const grants: CapabilityGrants = {};
  if (input["tools"] !== undefined) {
    if (
      !Array.isArray(input["tools"]) ||
      input["tools"].some((t) => typeof t !== "string" || !/^[\w.*-]{1,200}$/u.test(t))
    ) {
      throw new ServiceError(
        'grants.tools must be an array of tool patterns ("keyvalue.*", "github.repos.get", "*")',
        400,
      );
    }
    grants.tools = input["tools"] as string[];
  }
  if (input["paths"] !== undefined) {
    if (!Array.isArray(input["paths"])) {
      throw new ServiceError("grants.paths must be an array of { prefix, access }", 400);
    }
    const paths: PathGrant[] = [];
    for (const entry of input["paths"] as Array<Record<string, unknown>>) {
      const prefix = typeof entry?.["prefix"] === "string" ? entry["prefix"] : undefined;
      const access = entry?.["access"] === "ro" ? "ro" : entry?.["access"] === "rw" ? "rw" : undefined;
      if (prefix === undefined || !access) {
        throw new ServiceError('each path grant needs { prefix, access: "ro" | "rw" }', 400);
      }
      const normalized = prefix.replace(/^\/+/u, "").replace(/\/+$/u, "");
      if (normalized.includes("..") || normalized.startsWith(".services")) {
        throw new ServiceError(`Invalid grant prefix: ${prefix}`, 400);
      }
      paths.push({ prefix: normalized, access });
    }
    grants.paths = paths;
  }
  return grants.tools || grants.paths ? grants : undefined;
}

// ---------------------------------------------------------------------------
// evaluateDispatch
// ---------------------------------------------------------------------------

function capabilityCovered(
  patterns: string[] | undefined,
  namespace: string,
  operation: string,
): boolean {
  if (!patterns || patterns.length === 0) return false;
  return matchesCapabilityPattern(patterns, namespace, operation);
}

/**
 * Resolve the invoker's capability patterns: legacy APR-320 permission rows
 * (as `provider.operation` / `provider.*`) unioned with profile-grant targets
 * (`namespace.*`). Admins without an app ceiling get a synthetic `*` so
 * direct admin invoke still works; apps remain a separate principal (no
 * admin bypass of the app ceiling — invariant 4).
 */
async function resolveInvokerPatterns(
  req: DispatchRequest,
  options?: EvaluateDispatchOptions,
): Promise<string[]> {
  if (options?.invokerPatterns) return options.invokerPatterns;

  const { principal } = req;
  const patterns = new Set<string>();

  // Legacy direct permission rows → capability-only patterns (any-resource).
  const legacy = await getPermissionStore().list(principal.workspaceId, principal.sub);
  for (const row of legacy) {
    patterns.add(row.operation === "*" ? `${row.provider}.*` : `${row.provider}.${row.operation}`);
  }

  const profilePatterns = await invokerMatchedToolPatterns(
    principal.workspaceId,
    principal.sub,
    principal.groupIds,
  );
  for (const pattern of profilePatterns) patterns.add(pattern);

  // Direct (non-app) admin invoke: capability axis open. App ceilings still
  // intersect below — admin is not exempt for apps.
  if (principal.role === "admin" && !req.via?.appId) {
    patterns.add("*");
  }

  return [...patterns];
}

async function resolveAppCeiling(
  req: DispatchRequest,
  options?: EvaluateDispatchOptions,
): Promise<string[] | undefined> {
  if (options?.appCeiling) return options.appCeiling;
  if (!req.via?.appId) return undefined;
  try {
    const { getApp } = await import("./apps/store.js");
    const app = await getApp(req.principal.workspaceId, req.via.appId);
    return app?.allowedTools;
  } catch {
    return undefined;
  }
}

function resourceGrantSubjectsFor(req: DispatchRequest): ResourceGrantSubject[] {
  const subjects: ResourceGrantSubject[] = [
    { kind: "user", id: req.principal.sub },
    ...req.principal.groupIds.map(
      (id): ResourceGrantSubject => ({ kind: "group", id }),
    ),
  ];
  if (req.via?.appId) {
    subjects.push({ kind: "app-install", id: req.via.appId });
  }
  return subjects;
}

function resourceMatchesGrant(grant: ResourceGrantRow, resource: string | undefined): boolean {
  if (grant.resourcePattern === null) return true;
  if (resource === undefined) return false;
  return matchesResourcePattern(grant.resourcePattern, resource);
}

function grantsForCapability(
  rows: ResourceGrantRow[],
  namespace: string,
  operation: string,
): ResourceGrantRow[] {
  return rows.filter((row) =>
    matchesCapabilityPattern([row.capability], namespace, operation),
  );
}

/**
 * The one dispatch chokepoint. Returns allow | deny | queue | ask.
 * Queue/ask ids are provisional here — persistence is stream 9 / cards stream 10.
 */
export async function evaluateDispatch(
  req: DispatchRequest,
  options?: EvaluateDispatchOptions,
): Promise<DispatchDecision> {
  const { namespace, operation, effect } = req.tool;
  const call = `${namespace}.${operation}`;

  // User-oauth: each member must connect; unconnected fails closed (no queue).
  if (req.credential?.level === "user-oauth") {
    const connected = await isUserOauthConnected(req);
    if (!connected) {
      return { kind: "deny", reason: "credential-unconnected" };
    }
  }

  const invokerPatterns = await resolveInvokerPatterns(req, options);
  const invokerOk = capabilityCovered(invokerPatterns, namespace, operation);

  const appCeiling = await resolveAppCeiling(req, options);
  const appOk =
    appCeiling === undefined
      ? true
      : capabilityCovered(appCeiling, namespace, operation);

  // Profile narrowing (via.profileId): the profile's target must cover the call.
  let profileOk = true;
  if (req.via?.profileId) {
    profileOk = await profileGrantAllows(
      req.principal.workspaceId,
      req.principal.sub,
      req.principal.groupIds,
      namespace,
    );
    // Also require the named profile to target this namespace when resolvable.
    try {
      const store = await getRegistryStorage();
      const profile = await store.profiles.getById(
        req.principal.workspaceId,
        req.via.profileId,
      );
      if (profile && profile.targetId !== namespace && profile.targetId !== "*") {
        profileOk = false;
      }
    } catch {
      // Storage unavailable — fail closed on explicit profile pin.
      profileOk = false;
    }
  }

  const runOk =
    options?.runTools === undefined
      ? true
      : capabilityCovered(options.runTools, namespace, operation);

  // Intersection — any layer denying → capability miss.
  if (!invokerOk || !appOk || !profileOk || !runOk) {
    if (req.runContext) {
      return { kind: "ask", cardId: randomUUID() };
    }
    return { kind: "deny", reason: "capability" };
  }

  // Observations: capability gate only — never resource / queue / card.
  if (effect === "observation") {
    return { kind: "allow" };
  }

  // Actions: resource grants. No rows for this capability ⇒ unconstrained on
  // the resource axis (capability already decided). Rows present ⇒ must match.
  let rows = options?.resourceGrants;
  if (rows === undefined) {
    try {
      const store = await getRegistryStorage();
      await store.tenants.ensure(req.principal.workspaceId);
      rows = await store.resourceGrants.listForSubjects(
        req.principal.workspaceId,
        resourceGrantSubjectsFor(req),
      );
    } catch {
      rows = [];
    }
  }

  const forCap = grantsForCapability(rows, namespace, operation);
  if (forCap.length === 0) {
    // Capability-only authority (legacy permissions / profile grants with no
    // resource dimension yet) — allow the action.
    return { kind: "allow" };
  }

  const matched = forCap.filter((g) => resourceMatchesGrant(g, req.resource));
  if (matched.length === 0) {
    return { kind: "queue", queuedActionId: randomUUID() };
  }

  // Credential-level routing: when the request names a level, prefer grants
  // at that level (workspace-* shared; user-oauth already gated above).
  if (req.credential?.level) {
    const levelHits = matched.filter((g) => g.credentialLevel === req.credential!.level);
    if (levelHits.length === 0 && matched.some((g) => g.credentialLevel === "user-oauth")) {
      // Standing grants are user-oauth but request didn't prove connection path.
      return { kind: "deny", reason: "credential-unconnected" };
    }
  }

  void call; // kept for future audit attribution
  return { kind: "allow" };
}

/**
 * Whether the principal has a connected user-oauth credential for the
 * request. When `credential.id` is present we trust the caller resolved it;
 * otherwise look up a user-owned credential for the tool's namespace.
 */
async function isUserOauthConnected(req: DispatchRequest): Promise<boolean> {
  if (req.credential?.id) return true;
  try {
    const store = await getRegistryStorage();
    const creds = await store.credentials.list(req.principal.workspaceId);
    return creds.some(
      (c) =>
        c.level === "user-oauth" &&
        c.createdBy === req.principal.sub &&
        (c.provider === req.tool.namespace || !req.tool.namespace),
    );
  } catch {
    return false;
  }
}

/**
 * Map a {@link DispatchDecision} to HTTP/agent denial semantics.
 * `queue` / `ask` are returned to the caller as structured decisions — they
 * do not throw (streams 9–10 persist and surface them).
 */
export function denyMessage(decision: Extract<DispatchDecision, { kind: "deny" }>): string {
  if (decision.reason === "credential-unconnected") {
    return "Connect and approve this user-oauth credential before invoking";
  }
  return "Forbidden: caller does not have permission for this operation";
}
