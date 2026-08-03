import { Cpu } from "lucide-react";
import { InterfacesPanel } from "./InterfacesPanel";
import type { NativePanelProps } from "./shell";

export function RuntimePanel(props: NativePanelProps) {
  return (
    <InterfacesPanel
      {...props}
      filter="agent"
      icon={Cpu}
      title="Runtime"
      description="Choose which runtime executes agent turns in this workspace"
      emptyMessage="Agent runtime configuration appears here once the gateway is reachable."
      loadingLabel="Loading runtime…"
    />
  );
}
