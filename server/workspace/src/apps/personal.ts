/**
 * The Personal app — every workspace's implicit, built-in app.
 *
 * There is no such thing as an unbundled workflow: every workflow belongs to
 * an app, and the ones no real app exports belong to the workspace's
 * **Personal** app. Personal is *synthesized*, never stored as a manifest:
 *
 *   - `name: "personal"`, flagged `builtin: true` on the wire;
 *   - private and members-only — the app proxy rejects callers who are not
 *     members of the owning workspace;
 *   - no releases, channels, versions, SDK pins, or install machinery;
 *   - cannot be published, edited, or removed (`apps.publish` / `apps.remove`
 *     reject the name with a clear 400);
 *   - owns every workflow not exported by any real app, inlined in
 *     `apps.list` exactly like a real app's export list;
 *   - data partitions per calling user under the workspace's personal prefix:
 *     a keyvalue key `k` for member `u` lives at `.personal/data/<u>/k`
 *     (the standard app partitioning rule applied to `paths: [".personal"]`),
 *     and relative vfs paths resolve under `.personal/`;
 *   - workflows execute in the member's own workspace with the caller's own
 *     (workspace) credentials — your own deployment of yourself.
 *
 * This module is the single home of the synthesis; everything else (the apps
 * service, the app proxy) special-cases Personal only through the lookup
 * hooks exported here.
 */

import { getMembership } from "../memberships.js";
import { getAuthMode } from "../middleware/auth.js";
import { listRegistrations } from "../workflows/store.js";
import { listApps, type AppManifest } from "./store.js";

export const PERSONAL_APP_NAME = "personal";

/** The workspace prefix Personal's data hangs off (`.personal/data/<sub>/…`). */
export const PERSONAL_PREFIX = ".personal";

export function isPersonalApp(name: unknown): boolean {
  return name === PERSONAL_APP_NAME;
}

/**
 * The workflow names no real app exports — Personal's export list. Order
 * follows the registration listing so `apps.list` stays stable across calls.
 */
export function unbundledWorkflowNames(
  manifests: readonly Pick<AppManifest, "workflows">[],
  registrationNames: readonly string[],
): string[] {
  const exported = new Set(manifests.flatMap((manifest) => manifest.workflows ?? []));
  return registrationNames.filter((name) => !exported.has(name));
}

/**
 * Synthesize the Personal manifest. It is a plain {@link AppManifest} so the
 * standard machinery (capability descriptors, data partitioning, the tool
 * proxy's allow-list checks) applies unchanged — but it is never written to
 * the store, so nothing downstream can mutate or release it.
 */
export function personalManifest(workflows: string[]): AppManifest {
  return {
    name: PERSONAL_APP_NAME,
    title: "Personal",
    description:
      "The workspace's built-in app: every workflow no published app exports, " +
      "runnable by members with their own credentials. Data lives in a private " +
      "per-user partition readable only by its owner — enforced (foreign access " +
      "answers 404), with no admin override of any kind.",
    // Personal has no UI; the entry is a placeholder that is never served.
    entry: `${PERSONAL_PREFIX}/index.tsx`,
    paths: [PERSONAL_PREFIX],
    visibility: "private",
    workflows,
    dataScope: "owner",
    allowedTools: ["vfs.*", "keyvalue.*", "events.*", "app.*"],
    createdBy: "system",
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
  };
}

/**
 * Read the synthesized Personal manifest for a workspace: list the real apps
 * and registrations, and everything unexported is Personal's.
 */
export async function readPersonalManifest(workspaceId: string): Promise<AppManifest> {
  const [manifests, registrations] = await Promise.all([
    listApps(workspaceId).catch(() => []),
    listRegistrations(workspaceId).catch(() => []),
  ]);
  return personalManifest(
    unbundledWorkflowNames(
      manifests,
      registrations.map((registration) => registration.name),
    ),
  );
}

/**
 * Personal is members-only: resolve the caller's role from their workspace
 * membership, or null when they hold none. In auth mode "none" (dev/test)
 * the single local principal is the workspace's one member.
 */
export async function personalCallerRole(
  workspaceId: string,
  sub: string,
): Promise<"admin" | "user" | null> {
  if (getAuthMode() === "none") return sub === "local" ? "admin" : null;
  const membership = await getMembership(workspaceId, sub).catch(() => undefined);
  if (!membership) return null;
  return membership.role === "admin" ? "admin" : "user";
}

/**
 * The wire shape of Personal in `apps.list` / `apps.get`: a real app's
 * composition minus what a synthesized app cannot have (an entrypoint, a live
 * URL, stored roles, authorship timestamps), plus `builtin: true`. The UI
 * treats missing fields as absent, so stripping is wire-compatible.
 */
export function toPersonalWire<T extends Record<string, unknown>>(
  described: T,
): Omit<T, "entry" | "url" | "roles" | "createdBy" | "createdAt" | "updatedAt"> & {
  builtin: true;
} {
  const {
    entry: _entry,
    url: _url,
    roles: _roles,
    createdBy: _createdBy,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    ...rest
  } = described;
  return { ...rest, builtin: true };
}
