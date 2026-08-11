import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RevokeConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: string;
  busy?: boolean;
  onConfirm: () => void;
}

/** AlertDialog-shaped revoke confirmation — irreversible. */
export function RevokeConfirmDialog({
  open,
  onOpenChange,
  label,
  busy,
  onConfirm,
}: RevokeConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Revoke share?</DialogTitle>
        <DialogClose onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogContent className="space-y-4">
        <div className="flex gap-3 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <p>
            Revoke access for <span className="font-medium">{label}</span>? This cannot be
            undone. Anyone with this share will lose access on their next request.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={busy}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" variant="destructive" disabled={busy} onClick={onConfirm}>
            {busy ? "Revoking…" : "Revoke"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
