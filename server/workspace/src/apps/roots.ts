/**
 * App root binding — the sole overlap authority for app path roots.
 *
 * Every app occupies exactly one root (`apps/<slug>`). Publish, promote-out,
 * install materialization, and root rename all call {@link assertRootAvailable}
 * before claiming a root. Containment is checked in both directions (tech-plan D2).
 */

import { ServiceError } from "../service-kernel.js";
import { listApps, workspacePath } from "./store.js";

/**
 * Reject (409) when `root` equals, contains, or is contained by any other
 * app's root in the workspace. Pass `exceptAppId` when updating an existing
 * app so its own root does not conflict with itself.
 */
export async function assertRootAvailable(
  workspaceId: string,
  root: string,
  exceptAppId?: string,
): Promise<void> {
  const normalized = workspacePath(root, "root");
  const apps = await listApps(workspaceId);
  for (const app of apps) {
    if (exceptAppId && app.appId === exceptAppId) continue;
    const other = app.root ?? app.paths?.[0];
    if (!other) continue;
    if (
      normalized === other ||
      normalized.startsWith(`${other}/`) ||
      other.startsWith(`${normalized}/`)
    ) {
      throw new ServiceError(
        `App root "${normalized}" overlaps existing app "${app.name}" (${app.appId}) at "${other}"`,
        409,
      );
    }
  }
}
