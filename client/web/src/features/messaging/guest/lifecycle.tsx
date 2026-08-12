/**
 * Guest leave + host remove-guest actions (stream 8.3).
 * Wires UI to F2 participant remove; live fan-out effect is stream 12.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  createInstanceHostClient,
  type InstanceHostClient,
} from "../admin/platform";
import { cn } from "@/lib/utils";

export type LeaveInstanceButtonProps = {
  instanceId: string;
  /** Current user sub (guest leaving). */
  userSub: string;
  client?: InstanceHostClient;
  onLeft?: () => void;
  className?: string;
};

/** Guest self-leave control. */
export function LeaveInstanceButton({
  instanceId,
  userSub,
  client: clientProp,
  onLeft,
  className,
}: LeaveInstanceButtonProps) {
  const client = clientProp ?? createInstanceHostClient();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const leave = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      await client.removeParticipant(instanceId, userSub);
      onLeft?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to leave");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Button
        type="button"
        size="sm"
        variant="outline"
        disabled={busy}
        onClick={() => void leave()}
        data-testid="guest-leave"
      >
        {busy ? "Leaving…" : "Leave instance"}
      </Button>
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export type RemoveGuestButtonProps = {
  instanceId: string;
  guestSub: string;
  guestLabel?: string;
  client?: InstanceHostClient;
  onRemoved?: (sub: string) => void;
  className?: string;
};

/** Host remove-guest control (Manage panel participant list). */
export function RemoveGuestButton({
  instanceId,
  guestSub,
  guestLabel,
  client: clientProp,
  onRemoved,
  className,
}: RemoveGuestButtonProps) {
  const client = clientProp ?? createInstanceHostClient();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      await client.removeParticipant(instanceId, guestSub);
      onRemoved?.(guestSub);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove guest");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Button
        type="button"
        size="sm"
        variant="outline"
        disabled={busy}
        onClick={() => void remove()}
        data-testid="remove-guest"
        aria-label={`Remove ${guestLabel ?? guestSub}`}
      >
        {busy ? "Removing…" : "Remove"}
      </Button>
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
