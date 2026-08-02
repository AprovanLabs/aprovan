/**
 * Admin permissions panel — composes the shared registry-ui AdminPanel.
 */

import { AdminPanel } from "@aprovan/registry-ui";
import { useMemo } from "react";
import { type NativePanelProps } from "./shell";
import { createRegistryGatewayClient } from "@/lib/gateway";

export function AdminPermissionsPanel(_props: NativePanelProps) {
  const client = useMemo(() => createRegistryGatewayClient(), []);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto p-4">
      <AdminPanel client={client} />
    </div>
  );
}
