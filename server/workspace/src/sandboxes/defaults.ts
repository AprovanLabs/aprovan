/**
 * Default sandbox mounts — a workspace-level setting applied to every new
 * sandbox and scheduled run unless the caller mounts the same path himself.
 *
 *   record svc#sandboxes#defaults / defaults   { "mounts": [{ path, source?, mode? }] }
 *
 * The classic use is a skills repo every agent sandbox should carry:
 * `{ path: "skills", source: "github:JacobSampson/skills", mode: "ro" }` set
 * once, present everywhere. Stored as raw declarations (not parsed
 * `SandboxMount`s) because validation belongs to the moment of use: grants
 * differ per caller, and a default that one agent may not materialize must
 * not poison the setting for everyone else. Hence the asymmetry in
 * {@link applyDefaultMounts}: explicit mounts validate strictly (a caller
 * who names a mount he may not have deserves the error), defaults validate
 * leniently (one the grants deny is skipped, not fatal).
 */

import { ServiceError } from "../service-kernel.js";
import { readSvcRecord, svcScope, writeSvcRecord } from "../svc-records.js";
import { parseMounts } from "./mounts.js";
import type { CapabilityGrants } from "../grants.js";
import type { SandboxMount } from "./store.js";

const DEFAULTS_SCOPE = svcScope("sandboxes", "defaults");
const DEFAULTS_KEY = "defaults";

/** A stored default: the declaration vocabulary of `sandboxes.create`. */
export interface DefaultMount {
  path: string;
  source?: string | null;
  mode?: "ro" | "rw";
}

export async function readDefaultMounts(workspaceId: string): Promise<DefaultMount[]> {
  const parsed = await readSvcRecord<{ mounts?: unknown }>(
    workspaceId,
    DEFAULTS_SCOPE,
    DEFAULTS_KEY,
  ).catch(() => undefined);
  return parsed && Array.isArray(parsed.mounts) ? (parsed.mounts as DefaultMount[]) : [];
}

/**
 * Replace the workspace's default mounts. The list runs through
 * {@link parseMounts} with the caller's grants — the same validation a
 * `sandboxes.create` would apply — so a typo'd repo spec or an ungranted
 * source fails at set time, not on every later create. What is *stored* is
 * the normalized declaration trio, not the parsed record.
 */
export async function writeDefaultMounts(
  workspaceId: string,
  raw: unknown,
  grants: CapabilityGrants | undefined,
): Promise<DefaultMount[]> {
  if (raw !== undefined && raw !== null && !Array.isArray(raw)) {
    throw new ServiceError("mounts must be an array of { path, source?, mode? }", 400);
  }
  const parsed = parseMounts(raw, grants);
  const mounts: DefaultMount[] = parsed.map((mount) => ({
    path: mount.path,
    source: mount.source,
    mode: mount.mode,
  }));
  await writeSvcRecord(workspaceId, DEFAULTS_SCOPE, DEFAULTS_KEY, { mounts });
  return mounts;
}

const normalizePath = (path: unknown): string =>
  typeof path === "string" ? path.replace(/^\/+|\/+$/gu, "") : "";

/**
 * Parse a caller's mount declarations with the workspace defaults folded in.
 * Explicit mounts win on path collision; a default the grants deny is
 * dropped rather than failing the create.
 */
export async function applyDefaultMounts(
  workspaceId: string,
  raw: unknown,
  grants: CapabilityGrants | undefined,
): Promise<SandboxMount[]> {
  const mounts = parseMounts(raw, grants);
  const taken = new Set(mounts.map((mount) => mount.path));
  for (const entry of await readDefaultMounts(workspaceId)) {
    if (taken.has(normalizePath(entry.path))) continue;
    try {
      const [mount] = parseMounts([entry], grants);
      if (mount) {
        mounts.push(mount);
        taken.add(mount.path);
      }
    } catch {
      // A default this caller's grants deny simply does not apply to him.
    }
  }
  return mounts;
}
