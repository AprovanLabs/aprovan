/**
 * Apps panel — thin native-surface wrapper around the shared registry-ui
 * AppsPanel pane variant (list ↔ detail in-pane). Transports and host
 * callbacks are injected; selection lives inside the pane.
 *
 * Chrome uses PanelShell; loading / empty / error / unavailable live in the
 * registry-ui pane (IW-1 data contracts unchanged).
 */

import { AppsPanel as RegistryAppsPanel } from "@aprovan/registry-ui/apps-panel";
import { LayoutGrid } from "lucide-react";
import { type NativePanelProps, PanelShell, usePanelHostActions } from "./shell";
import { invokeAppsTool, invokeWorkflowsTool } from "@/lib/tools";
import { readFile } from "@/lib/workspace-vfs";

const loadScript = async (path: string): Promise<string | null> =>
  readFile(path).catch(() => null);

export function AppsPanel(_props: NativePanelProps) {
  const host = usePanelHostActions();

  return (
    <PanelShell
      description="Your apps, installations, private flows, and the directory"
      icon={LayoutGrid}
      title="Apps"
    >
      <div className="flex h-full min-h-0 flex-1 flex-col p-3">
        <RegistryAppsPanel
          variant="pane"
          fill
          invoke={invokeWorkflowsTool}
          invokeApps={invokeAppsTool}
          loadScript={loadScript}
          {...(host.onOpenFile ? { onOpenScript: host.onOpenFile } : {})}
          {...(host.onCreateWorkflow ? { onCreateWorkflow: host.onCreateWorkflow } : {})}
          {...(host.onPublishFlow ? { onPublishFlow: host.onPublishFlow } : {})}
          {...(host.onOpenCredentials
            ? { onCreateProfile: (contract: string) => host.onOpenCredentials?.(contract) }
            : {})}
          title={null}
        />
      </div>
    </PanelShell>
  );
}
