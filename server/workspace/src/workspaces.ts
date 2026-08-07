/**
 * Workspace registry — persists each workspace's execution locus and, for
 * local ones, its data directory / optional VFS root (tech-plan D2).
 *
 * Locus is write-once at creation. Pre-locus rows resolve to `"cloud"` so
 * deployed behaviour is unchanged.
 */

import {
  getCredentialCipher,
  type KeyProvider,
} from "@aprovan/registry-server";
import { getIdentityStore } from "./identity/store.js";
import type { WorkspaceLocus, WorkspaceRecord } from "./identity/types.js";
import { ServiceError } from "./service-kernel.js";

export type { WorkspaceLocus, WorkspaceRecord } from "./identity/types.js";

/**
 * Providers that require the caller's local machine. A cloud workspace cannot
 * reach them (inbound access is deferred).
 */
const LOCAL_MACHINE_PROVIDERS = new Set(["local-directory"]);

const CLOUD_LOCAL_BIND_MESSAGE =
  "A cloud workspace cannot reach local resources — inbound access from the cloud to a local machine is not available";

/** Resolve a stored locus, defaulting missing/legacy rows to `"cloud"`. */
export function resolveLocus(record: Pick<WorkspaceRecord, "locus"> | undefined): WorkspaceLocus {
  return record?.locus === "local" ? "local" : "cloud";
}

/** Normalize a raw store row so callers always see an explicit locus. */
export function normalizeWorkspace(record: WorkspaceRecord): WorkspaceRecord {
  const locus = resolveLocus(record);
  return {
    ...record,
    locus,
    ...(locus === "local"
      ? {
          ...(record.dataDir !== undefined ? { dataDir: record.dataDir } : {}),
          ...(record.vfsRoot !== undefined ? { vfsRoot: record.vfsRoot } : {}),
        }
      : {}),
  };
}

/** Fetch a single workspace row by id (undefined = stale membership). */
export async function getWorkspace(
  workspaceId: string,
): Promise<WorkspaceRecord | undefined> {
  const row = await getIdentityStore().workspaces.get(workspaceId);
  return row ? normalizeWorkspace(row) : undefined;
}

/** Fetch multiple workspaces by id; missing ones are omitted. */
export async function getWorkspaces(
  workspaceIds: string[],
): Promise<WorkspaceRecord[]> {
  const rows = await getIdentityStore().workspaces.getMany(workspaceIds);
  return rows.map(normalizeWorkspace);
}

export interface CreateWorkspaceInput {
  workspaceId: string;
  name: string;
  /** Defaults to `"cloud"` — matches pre-locus behaviour. */
  locus?: WorkspaceLocus;
  /** Required when `locus` is `"local"`. */
  dataDir?: string;
  vfsRoot?: string;
  plan?: string;
  /**
   * Cipher key provider for a local workspace. Without one (and without a
   * CREDENTIALS_* env secret) local init is refused rather than falling through
   * to plaintext.
   */
  keyProvider?: KeyProvider;
}

/**
 * Create a workspace. Locus is fixed here and cannot be changed later.
 * Local workspaces require a cipher key provider (or an env-backed cipher).
 */
export async function createWorkspace(input: CreateWorkspaceInput): Promise<WorkspaceRecord> {
  const locus: WorkspaceLocus = input.locus ?? "cloud";
  if (locus !== "local" && locus !== "cloud") {
    throw new ServiceError(`Invalid workspace locus: ${String(locus)}`, 400);
  }

  if (locus === "local") {
    if (!input.dataDir || input.dataDir.trim() === "") {
      throw new ServiceError("A local workspace requires dataDir", 400);
    }
    // Refuse plaintext — stream 3's requireEncryption seam.
    getCredentialCipher({
      ...(input.keyProvider ? { keyProvider: input.keyProvider } : {}),
      requireEncryption: true,
    });
  }

  const existing = await getIdentityStore().workspaces.get(input.workspaceId);
  if (existing) {
    throw new ServiceError(`Workspace ${input.workspaceId} already exists`, 409);
  }

  const now = new Date().toISOString();
  const record: WorkspaceRecord = {
    workspaceId: input.workspaceId,
    name: input.name,
    locus,
    ...(input.plan !== undefined ? { plan: input.plan } : {}),
    ...(locus === "local"
      ? {
          dataDir: input.dataDir,
          ...(input.vfsRoot !== undefined ? { vfsRoot: input.vfsRoot } : {}),
        }
      : {}),
    createdAt: now,
    updatedAt: now,
  };
  await getIdentityStore().workspaces.put(record);
  return normalizeWorkspace(record);
}

export interface UpdateWorkspaceInput {
  name?: string;
  plan?: string;
  dataDir?: string;
  vfsRoot?: string;
  /** Rejected — locus is immutable after create. */
  locus?: WorkspaceLocus;
}

/**
 * Update mutable workspace fields. Attempts to change `locus` are rejected
 * without modifying the row.
 */
export async function updateWorkspace(
  workspaceId: string,
  patch: UpdateWorkspaceInput,
): Promise<WorkspaceRecord> {
  if (patch.locus !== undefined) {
    throw new ServiceError("Workspace locus cannot be changed after creation", 400);
  }

  const existing = await getIdentityStore().workspaces.get(workspaceId);
  if (!existing) {
    throw new ServiceError(`Workspace ${workspaceId} not found`, 404);
  }

  const locus = resolveLocus(existing);
  const updated: WorkspaceRecord = {
    ...existing,
    locus,
    ...(patch.name !== undefined ? { name: patch.name } : {}),
    ...(patch.plan !== undefined ? { plan: patch.plan } : {}),
    ...(locus === "local"
      ? {
          ...(patch.dataDir !== undefined ? { dataDir: patch.dataDir } : {}),
          ...(patch.vfsRoot !== undefined ? { vfsRoot: patch.vfsRoot } : {}),
        }
      : {}),
    updatedAt: new Date().toISOString(),
  };
  // Store put never overwrites locus (SQL ON CONFLICT / Dynamo preserve).
  await getIdentityStore().workspaces.put(updated);
  return normalizeWorkspace(updated);
}

/** Whether a provider id is backed by the caller's local machine. */
export function isLocalMachineProvider(provider: string): boolean {
  return LOCAL_MACHINE_PROVIDERS.has(provider);
}

/**
 * Refuse binding a local-machine provider in a cloud workspace.
 * Call before persisting an interface/path profile that names a provider.
 */
export async function assertProviderBindingAllowed(
  workspaceId: string,
  provider: string | undefined,
): Promise<void> {
  if (!provider || !isLocalMachineProvider(provider)) return;
  const workspace = await getWorkspace(workspaceId);
  // Missing record → treat as cloud (safe default; same as resolveLocus).
  if (resolveLocus(workspace) === "cloud") {
    throw new ServiceError(CLOUD_LOCAL_BIND_MESSAGE, 400);
  }
}

/**
 * Initialise credential encryption for a local workspace. Refuses the
 * plaintext `none` backend when no key provider (or env cipher secret) is set.
 */
export function initLocalWorkspaceCipher(keyProvider?: KeyProvider): ReturnType<
  typeof getCredentialCipher
> {
  return getCredentialCipher({
    ...(keyProvider ? { keyProvider } : {}),
    requireEncryption: true,
  });
}
