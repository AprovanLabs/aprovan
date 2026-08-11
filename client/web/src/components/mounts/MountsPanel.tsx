import { HardDrive } from "lucide-react";
import { useCallback, useState } from "react";
import { PanelShell, type NativePanelProps } from "@/components/panels/shell";
import { invalidateStagedPrefixes } from "@/features/editing/write-policy";
import { AddMountForm } from "./AddMountForm";
import { MountsTable } from "./MountsTable";
import { RemoveMountDialog } from "./RemoveMountDialog";
import { mountsStore } from "./store";
import { useMounts } from "./useMounts";
import type { VfsMountRecord } from "./types";

/**
 * Workspace Mounts panel — table + add form backed by `vcs.mounts.*`.
 * List updates immediately via {@link mountsStore}; pass `onMountsChanged`
 * so the host can refresh the file tree without a full reload.
 */
export function MountsPanel({
  onMountsChanged,
}: NativePanelProps & {
  onMountsChanged?: () => void;
}) {
  const { mounts, loaded } = useMounts();
  const [pendingRemove, setPendingRemove] = useState<VfsMountRecord | null>(null);

  const afterMutation = useCallback(() => {
    invalidateStagedPrefixes();
    onMountsChanged?.();
  }, [onMountsChanged]);

  return (
    <PanelShell
      description="Mount shared git or S3 content into this workspace (read-only)"
      icon={HardDrive}
      title="Mounts"
    >
      <div className="flex h-full min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-3">
        <MountsTable
          mounts={mounts}
          loading={!loaded}
          removingPrefix={null}
          onRemove={setPendingRemove}
        />
        <AddMountForm
          disabled={!loaded}
          onAdded={afterMutation}
        />
      </div>

      <RemoveMountDialog
        mount={pendingRemove}
        open={pendingRemove !== null}
        onOpenChange={(open) => {
          if (!open) setPendingRemove(null);
        }}
        onRemoved={afterMutation}
      />
    </PanelShell>
  );
}

/** Ensure the store is warm (e.g. sidebar badge bootstrap). */
export function ensureMountsLoaded(): Promise<VfsMountRecord[]> {
  return mountsStore.refresh();
}
