import type { GatewayClient } from "@aprovan/registry-main";
import { listApiKeys, listGroups, listMembers, listPermissions } from "./api";
import {
  DEFAULT_ADMIN_CAPABILITIES,
  type AdminCapability,
} from "./types";

export { DEFAULT_ADMIN_CAPABILITIES };
export type { AdminCapability };

export interface AdminTab {
  id: AdminCapability;
  label: string;
}

const TAB_LABELS: Record<AdminCapability, string> = {
  members: "Members",
  groups: "Groups",
  permissions: "Tool grants",
  "api-keys": "API keys",
  profiles: "Profiles",
  audit: "Audit",
};

/** Resolve the ordered tab strip from an explicit capability list (no probing). */
export function tabsForCapabilities(
  capabilities: ReadonlyArray<AdminCapability> = DEFAULT_ADMIN_CAPABILITIES,
): AdminTab[] {
  return capabilities.map((id) => ({ id, label: TAB_LABELS[id] }));
}

/**
 * Probe an admin-gated list endpoint matching the capability set so hosted
 * keeps `/members` and standalone never hits `/members` or `/groups`.
 */
export async function checkAdminAccess(
  client: GatewayClient,
  capabilities: ReadonlyArray<AdminCapability>,
): Promise<void> {
  if (capabilities.includes("members")) {
    await listMembers(client);
    return;
  }
  if (capabilities.includes("api-keys")) {
    await listApiKeys(client);
    return;
  }
  if (capabilities.includes("groups")) {
    await listGroups(client);
    return;
  }
  if (capabilities.includes("permissions")) {
    await listPermissions(client);
  }
}
