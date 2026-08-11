import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { classifyMountError } from "./api";
import { MountErrorAlert } from "./MountErrorAlert";
import { mountsStore } from "./store";
import type { MountFormError, VfsMountRecord } from "./types";

export function RemoveMountDialog({
  mount,
  open,
  onOpenChange,
  onRemoved,
}: {
  mount: VfsMountRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRemoved?: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<MountFormError | null>(null);

  const confirm = async () => {
    if (!mount) return;
    setBusy(true);
    setError(null);
    try {
      await mountsStore.remove(mount.prefix);
      onOpenChange(false);
      onRemoved?.();
    } catch (err) {
      setError(classifyMountError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (busy) return;
        setError(null);
        onOpenChange(next);
      }}
    >
      <DialogHeader>
        <DialogTitle>Remove mount</DialogTitle>
        <DialogClose onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Remove the mount at{" "}
          <code className="font-mono text-foreground">{mount?.prefix}</code>? Content
          served from this backend will no longer appear in the file tree.
        </p>
        {error ? <MountErrorAlert error={error} /> : null}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={busy}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={busy || !mount}
            onClick={() => void confirm()}
          >
            {busy ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : null}
            Remove
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
