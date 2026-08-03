import { Brain } from "lucide-react";
import { InterfacesPanel } from "./InterfacesPanel";
import type { NativePanelProps } from "./shell";

export function LlmPanel(props: NativePanelProps) {
  return (
    <InterfacesPanel
      {...props}
      filter="llm"
      icon={Brain}
      title="LLM"
      description="Choose which provider powers chat completions and model calls"
      emptyMessage="LLM configuration appears here once the gateway is reachable."
      loadingLabel="Loading LLM…"
    />
  );
}
