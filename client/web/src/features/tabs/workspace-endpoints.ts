/**
 * Client-side registry of per-workspace gateway endpoints.
 *
 * Until the server persists `locus` / local URLs (section 4), the renderer
 * keeps overrides here so {@link GatewayResolver} can pick a base URL per
 * active workspace. Records without an explicit `baseUrl` resolve to the
 * build-time `VITE_GATEWAY_URL` fallback.
 */

export const WORKSPACE_ENDPOINTS_KEY = "patchwork:workspace-endpoints";

export type WorkspaceEndpointRecord = {
  workspaceId: string;
  locus?: "local" | "cloud";
  /** Explicit gateway base URL for this workspace. */
  baseUrl?: string;
};

function readAll(): WorkspaceEndpointRecord[] {
  try {
    const raw = localStorage.getItem(WORKSPACE_ENDPOINTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (row): row is WorkspaceEndpointRecord =>
        !!row &&
        typeof row === "object" &&
        typeof (row as WorkspaceEndpointRecord).workspaceId === "string",
    );
  } catch {
    return [];
  }
}

function writeAll(records: WorkspaceEndpointRecord[]): void {
  localStorage.setItem(WORKSPACE_ENDPOINTS_KEY, JSON.stringify(records));
}

/** All known endpoint overrides (may be empty). */
export function listWorkspaceEndpointRecords(): WorkspaceEndpointRecord[] {
  return readAll();
}

/** Upsert a workspace endpoint record by `workspaceId`. */
export function upsertWorkspaceEndpointRecord(
  record: WorkspaceEndpointRecord,
): void {
  const next = readAll().filter((r) => r.workspaceId !== record.workspaceId);
  next.push(record);
  writeAll(next);
}

/** Remove a workspace endpoint record. */
export function removeWorkspaceEndpointRecord(workspaceId: string): void {
  writeAll(readAll().filter((r) => r.workspaceId !== workspaceId));
}
