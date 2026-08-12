/**
 * Canonical and API base URL builders for app surfaces (IW-9 D5).
 *
 * Live pages use `/a/<appId>` and `/w/<wsId>/a/<installId>`. Gateway tool
 * routes remain under `/api/gateway/apps/…` (appId permalink or
 * workspace/install addressing) until a later change remounts them.
 */

/** Rename-stable public live URL. */
export function canonicalLiveUrl(appId: string): string {
  return `/a/${appId}`;
}

/** Workspace-scoped install live URL (workspace id allowed only here). */
export function canonicalInstallLiveUrl(workspaceId: string, installId: string): string {
  return `/w/${workspaceId}/a/${installId}`;
}

/** Gateway API base keyed by durable app id (no workspace id). */
export function publicAppApiBase(appId: string): string {
  return `/api/gateway/apps/id/${appId}`;
}

/** Gateway API base for an install-id address in a workspace. */
export function installAppApiBase(workspaceId: string, installId: string): string {
  return `/api/gateway/apps/${workspaceId}/${installId}`;
}
