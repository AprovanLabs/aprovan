/**
 * Revocation blast-radius confirmation (ux.md "Revocation cascade visibility").
 */

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export type RevocationBlastRadius = {
  automations: Array<{ id: string; name: string }>;
  apps: Array<{ id: string; name: string; capability: string }>;
};

export function RevocationBlastDialog({
  open,
  onOpenChange,
  blast,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blast: RevocationBlastRadius;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Confirm revocation</DialogTitle>
        <DialogClose onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogContent>
        <div data-testid="revocation-blast-dialog" className="space-y-3 text-sm">
          <p>This will deactivate dependent standing automations and remove capability from apps:</p>
          {blast.automations.length > 0 ? (
            <ul className="list-disc pl-5" data-testid="blast-automations">
              {blast.automations.map((a) => (
                <li key={a.id}>{a.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No standing automations affected.</p>
          )}
          {blast.apps.length > 0 ? (
            <ul className="list-disc pl-5" data-testid="blast-apps">
              {blast.apps.map((a) => (
                <li key={a.id}>
                  {a.name} · <span className="font-mono text-xs">{a.capability}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              data-testid="confirm-revocation"
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
            >
              Revoke
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
