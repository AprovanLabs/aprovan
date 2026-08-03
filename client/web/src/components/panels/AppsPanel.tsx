/**
 * Apps panel — thin native-surface wrapper around the shared registry-ui
 * AppsPanel pane variant (list ↔ detail in-pane). Transports and host
 * callbacks are injected; selection lives inside the pane.
 */

import { AppsPanel as RegistryAppsPanel } from "@aprovan/registry-ui/apps-panel";
import { type NativePanelProps, usePanelHostActions } from "./shell";
import { invokeAppsTool, invokeWorkflowsTool } from "@/lib/tools";
import { readFile } from "@/lib/workspace-vfs";

const loadScript = async (path: string): Promise<string | null> =>
  readFile(path).catch(() => null);

export function AppsPanel(_props: NativePanelProps) {
  const host = usePanelHostActions();

  return (
    <div className="flex flex-1 min-h-0 flex-col p-3">
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
  );
}
