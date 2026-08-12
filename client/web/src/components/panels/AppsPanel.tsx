/**
 * Apps panel — thin native-surface wrapper around the shared registry-ui
 * AppsPanel pane variant (list ↔ detail in-pane). Transports and host
 * callbacks are injected; selection lives inside the pane.
 *
 * Chrome uses PanelShell; loading / empty / error / unavailable live in the
 * registry-ui pane (IW-1 data contracts unchanged).
 *
 * Install / promote: patchwork owns `InstallDialog` + `PromoteDialog`
 * (iw9-b stream 9) — directory Install clicks and launcher empty CTAs land here.
 */

import {
  AppsPanel as RegistryAppsPanel,
  type AppsSelection,
  type DirectoryEntry,
} from "@aprovan/registry-ui/apps-panel";
import { LayoutGrid, PackagePlus, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { InstallDialog, PromoteDialog } from "@/components/apps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { consumeAppsEntryIntent, subscribeAppsEntryIntent } from "@/features/sidebar/apps-entry";
import { invokeAppsTool, invokeWorkflowsTool } from "@/lib/tools";
import { readFile } from "@/lib/workspace-vfs";
import { type NativePanelProps, PanelShell, usePanelHostActions } from "./shell";

const loadScript = async (path: string): Promise<string | null> =>
  readFile(path).catch(() => null);

function directoryToInstallTarget(entry: DirectoryEntry) {
  return {
    title: entry.title ?? entry.name,
    publisher: entry.workspaceId ?? "publisher",
    hostModes: ["managed", "hosted"] as const,
    app: entry.appId,
    directoryRef: entry.appId,
    defaultSlug: entry.name,
    ...(entry.workspaceId
      ? { installArgs: { workspace: entry.workspaceId } as Record<string, unknown> }
      : {}),
  };
}

export function AppsPanel(_props: NativePanelProps) {
  const host = usePanelHostActions();
  const [selection, setSelection] = useState<AppsSelection | null>(null);
  const [installEntry, setInstallEntry] = useState<DirectoryEntry | null>(null);
  const [promoteOpen, setPromoteOpen] = useState(false);
  const [promoteSource, setPromoteSource] = useState("apps/personal/");
  const [promoteSourceOpen, setPromoteSourceOpen] = useState(false);
  const [catalogEpoch, setCatalogEpoch] = useState(0);

  useEffect(() => {
    const applyIntent = () => {
      const intent = consumeAppsEntryIntent();
      if (intent === "directory") {
        setSelection({ kind: "directory" });
      } else if (intent === "promote") {
        setPromoteSource("apps/personal/");
        setPromoteSourceOpen(true);
      }
    };
    applyIntent();
    return subscribeAppsEntryIntent(applyIntent);
  }, []);

  const openPromotePicker = () => {
    setPromoteSource("apps/personal/");
    setPromoteSourceOpen(true);
  };

  return (
    <PanelShell
      description="Your apps, installations, private flows, and the directory"
      icon={LayoutGrid}
      title="Apps"
    >
      <div className="flex h-full min-h-0 flex-1 flex-col gap-2 p-3">
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setSelection({ kind: "directory" })}
          >
            <PackagePlus className="mr-1.5 size-3.5" aria-hidden />
            Install from directory
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={openPromotePicker}>
            <Sparkles className="mr-1.5 size-3.5" aria-hidden />
            Promote from Personal
          </Button>
        </div>
        <RegistryAppsPanel
          key={catalogEpoch}
          variant="pane"
          fill
          invoke={invokeWorkflowsTool}
          invokeApps={invokeAppsTool}
          loadScript={loadScript}
          selection={selection}
          onSelectionChange={setSelection}
          onInstall={(entry) => setInstallEntry(entry)}
          {...(host.onOpenFile ? { onOpenScript: host.onOpenFile } : {})}
          {...(host.onCreateWorkflow ? { onCreateWorkflow: host.onCreateWorkflow } : {})}
          {...(host.onPublishFlow ? { onPublishFlow: host.onPublishFlow } : {})}
          {...(host.onOpenCredentials
            ? { onCreateProfile: (contract: string) => host.onOpenCredentials?.(contract) }
            : {})}
          title={null}
        />
      </div>

      {installEntry ? (
        <InstallDialog
          open={Boolean(installEntry)}
          onOpenChange={(open) => {
            if (!open) setInstallEntry(null);
          }}
          target={directoryToInstallTarget(installEntry)}
          onInstalled={() => {
            setInstallEntry(null);
            setSelection(null);
            setCatalogEpoch((n) => n + 1);
          }}
        />
      ) : null}

      <Dialog open={promoteSourceOpen} onOpenChange={setPromoteSourceOpen}>
        <DialogHeader>
          <DialogTitle>Promote from Personal</DialogTitle>
          <DialogClose onClose={() => setPromoteSourceOpen(false)} />
        </DialogHeader>
        <DialogContent className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Choose a Personal (or other) VFS folder to turn into a standalone app.
          </p>
          <Input
            value={promoteSource}
            onChange={(e) => setPromoteSource(e.target.value)}
            placeholder="apps/personal/my-folder"
            autoComplete="off"
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setPromoteSourceOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!promoteSource.trim()}
              onClick={() => {
                setPromoteSourceOpen(false);
                setPromoteOpen(true);
              }}
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <PromoteDialog
        open={promoteOpen}
        onOpenChange={setPromoteOpen}
        source={promoteSource.trim()}
        onPromoted={() => {
          setPromoteOpen(false);
          setSelection(null);
          setCatalogEpoch((n) => n + 1);
        }}
      />
    </PanelShell>
  );
}
