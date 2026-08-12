/**
 * Trusted-shell join copy surface — Chat supplies copy only (invariant 6).
 * Not a custom join widget; shell owns who/what/buttons chrome.
 */

import { cn } from "@/lib/utils";
import type { GuestJoinPayload } from "./join";

export type GuestJoinCopyProps = {
  payload: GuestJoinPayload;
  className?: string;
};

/**
 * Renders the copy fields the trusted shell binds into its generic card.
 * Accept/Decline buttons are shell-owned and intentionally absent here.
 */
export function GuestJoinCopy({ payload, className }: GuestJoinCopyProps) {
  if (payload.kind === "skip") {
    return null;
  }

  if (payload.kind === "sign-in") {
    return (
      <div
        className={cn("space-y-1 text-sm", className)}
        data-testid="guest-join-sign-in"
        data-join-kind="sign-in"
      >
        <p className="font-medium">{payload.title}</p>
      </div>
    );
  }

  if (payload.kind === "terminal") {
    return (
      <div
        className={cn("space-y-1 text-sm", className)}
        data-testid="guest-join-terminal"
        data-join-kind="terminal"
        data-join-reason={payload.reason}
      >
        <p className="text-muted-foreground">{payload.message}</p>
      </div>
    );
  }

  return (
    <div
      className={cn("space-y-3 text-sm", className)}
      data-testid="guest-join-ready"
      data-join-kind="ready"
    >
      <div>
        <p className="text-xs text-muted-foreground">Invited by</p>
        <p className="font-medium" data-testid="join-inviter">
          {payload.inviterDisplayName}
        </p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Instance</p>
        <p className="font-medium" data-testid="join-instance">
          {payload.instanceName}
        </p>
      </div>
      <p data-testid="join-guest-summary">{payload.guestSummary}</p>
      {payload.grantedChannelsSummary ? (
        <p
          className="text-muted-foreground"
          data-testid="join-channels"
        >
          Channels: {payload.grantedChannelsSummary}
        </p>
      ) : null}
      <p data-testid="join-disclosure">{payload.disclosure}</p>
    </div>
  );
}
