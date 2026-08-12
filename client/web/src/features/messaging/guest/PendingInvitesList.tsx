/**
 * Pending guest invites — revoke + expiry countdown (ux.md Manage panel).
 */

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  createGuestInvitesClient,
  type GuestInviteRecord,
  type GuestInvitesClient,
} from "./invites";
import { formatExpiryCountdown } from "./inviteFormat";

export type PendingInvitesListProps = {
  client?: GuestInvitesClient;
  /** Controlled list; when omitted, loads via client.list(). */
  invites?: GuestInviteRecord[];
  onChange?: (invites: GuestInviteRecord[]) => void;
  className?: string;
};

export function PendingInvitesList({
  client: clientProp,
  invites: invitesProp,
  onChange,
  className,
}: PendingInvitesListProps) {
  const client = clientProp ?? createGuestInvitesClient();
  const [invites, setInvites] = useState<GuestInviteRecord[]>(invitesProp ?? []);
  const [loading, setLoading] = useState(!invitesProp);
  const [revoking, setRevoking] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (invitesProp) {
      setInvites(invitesProp);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    void client
      .list()
      .then((list) => {
        if (cancelled) return;
        setInvites(list);
        onChange?.(list);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to list invites");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [client, invitesProp, onChange]);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const revoke = async (token: string) => {
    setRevoking(token);
    setError(null);
    try {
      await client.revoke(token);
      const next = invites.filter((i) => i.inviteToken !== token);
      setInvites(next);
      onChange?.(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Revoke failed");
    } finally {
      setRevoking(null);
    }
  };

  if (loading) {
    return (
      <p className="text-xs text-muted-foreground" data-testid="pending-invites-loading">
        Loading invites…
      </p>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)} data-testid="pending-invites">
      <h3 className="text-sm font-medium">Pending invites</h3>
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {invites.length === 0 ? (
        <p className="text-xs text-muted-foreground">No pending invites.</p>
      ) : (
        <ul className="divide-y rounded-md border">
          {invites.map((invite) => (
            <li
              key={invite.inviteToken}
              className="flex items-center justify-between gap-2 px-3 py-2 text-sm"
              data-testid="pending-invite-row"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{invite.email}</p>
                <p
                  className="text-xs text-muted-foreground"
                  data-testid="invite-expiry"
                >
                  {formatExpiryCountdown(invite.expiresAt, now)}
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={revoking === invite.inviteToken}
                onClick={() => void revoke(invite.inviteToken)}
              >
                {revoking === invite.inviteToken ? "Revoking…" : "Revoke"}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
