import { FolderGit } from "lucide-react";
import { InterfacesPanel } from "./InterfacesPanel";
import type { NativePanelProps } from "./shell";

/** Provider-config surface for where code is hosted — not the history timeline. */
export function VcsPanel(props: NativePanelProps) {
  return (
    <InterfacesPanel
      {...props}
      filter="vcs"
      icon={FolderGit}
      title="Code host"
      description="Choose which git host powers code review and repo tools"
      emptyMessage="Git hosting configuration appears here once the gateway is reachable."
      loadingLabel="Loading code host…"
    />
  );
}
