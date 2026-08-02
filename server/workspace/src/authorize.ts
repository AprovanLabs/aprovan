/**
 * Tool-invocation authorization.
 *
 * A caller may invoke `provider:operation` when any of:
 *   1. They hold a direct grant in the Permissions table (callerId match,
 *      exact op or provider `*` wildcard) — APR-320
 *   2. A profile targeting the namespace is granted to them or to any of
 *      their groups (specs group-profile-grants; the WS-3 single auth-time
 *      join — replacing the retired per-request UserGroups query + N+1
 *      per-group grant gets)
 *   3. They are a workspace admin (admins manage grants and need to be able
 *      to exercise tools without a bootstrap grant)
 */

import type { Principal } from "./middleware/auth.js";
import { getPermissionStore } from "./permissions.js";
import { profileGrantAllows } from "./profile-grants.js";

export async function mayInvokeTool(
  principal: Principal,
  provider: string,
  operation: string,
): Promise<boolean> {
  if (principal.role === "admin") return true;

  if (
    await getPermissionStore().check(
      principal.workspaceId,
      principal.sub,
      provider,
      operation,
    )
  ) {
    return true;
  }

  return profileGrantAllows(principal.workspaceId, principal.sub, principal.groupIds, provider);
}
