import { FolderGit } from "lucide-react";
import { InterfacesPanel } from "./InterfacesPanel";
import type { NativePanelProps } from "./shell";

export function VcsPanel(props: NativePanelProps) {
  return (
    <InterfacesPanel
      {...props}
      filter="vcs"
      icon={FolderGit}
      title="VCS"
      description="Choose which git host powers code review and repo tools"
      emptyMessage="Git hosting configuration appears here once the gateway is reachable."
      loadingLabel="Loading VCS…"
    />
  );
}
