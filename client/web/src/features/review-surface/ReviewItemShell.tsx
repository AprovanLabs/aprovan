/**
 * Trusted chrome for a review item — renders only from server-supplied
 * `ReviewItem.shell` (invariant 6). Decision buttons stay disabled until the
 * shell has re-rendered after a widget payload-edit event.
 */

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  CredentialLevelBadge,
  CredentialShellSentence,
  EffectBadge,
  WaitingForAdminNotice,
} from "./CredentialLevelBadge";
import { expiryCountdown, type ReviewDecision, type ReviewItemShellData } from "./types";

const DECISION_LABEL: Record<ReviewDecision, string> = {
  approve: "Approve",
  deny: "Deny",
  release: "Release",
  discard: "Discard",
  resolve: "Resolve",
  answer: "Answer",
};

export function ReviewItemShell({
  shell,
  expiresAt,
  readOnly,
  /** True while a payload edit is being folded into the shell summary. */
  shellStale = false,
  waitingForAdmin = false,
  onDecision,
  footer,
}: {
  shell: ReviewItemShellData;
  expiresAt?: string;
  readOnly?: boolean;
  shellStale?: boolean;
  waitingForAdmin?: boolean;
  onDecision?: (decision: ReviewDecision) => void;
  footer?: ReactNode;
}) {
  const who = [shell.who.app, shell.who.profile, shell.who.user].filter(Boolean).join(" · ");
  const countdown = expiryCountdown(expiresAt);
  const decisionsEnabled = !readOnly && !shellStale && !waitingForAdmin && shell.decisions.length > 0;

  return (
    <header data-testid="review-item-shell" className="space-y-2 border-b pb-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span data-testid="shell-who" className="font-medium">
          {who}
        </span>
        {shell.capability ? (
          <>
            <span className="text-muted-foreground">→</span>
            <span data-testid="shell-capability" className="font-mono text-xs">
              {shell.capability}
            </span>
          </>
        ) : null}
        {shell.resource ? (
          <span data-testid="shell-resource" className="font-mono text-xs text-muted-foreground">
            {shell.resource}
          </span>
        ) : null}
        {shell.effect ? <EffectBadge effect={shell.effect} /> : null}
        {shell.credential ? (
          <CredentialLevelBadge
            level={shell.credential.level}
            label={shell.credential.label}
          />
        ) : null}
        {countdown ? (
          <span data-testid="expiry-countdown" className="text-xs text-amber-700 dark:text-amber-300">
            {countdown}
          </span>
        ) : null}
      </div>

      {shell.credential ? (
        <CredentialShellSentence level={shell.credential.level} />
      ) : null}

      {waitingForAdmin ? (
        <WaitingForAdminNotice level={shell.credential?.level} />
      ) : null}

      {shell.decisions.length > 0 && !waitingForAdmin ? (
        <div className="flex flex-wrap gap-2" data-testid="shell-decisions">
          {shell.decisions.map((decision) => (
            <Button
              key={decision}
              size="sm"
              variant={decision === "deny" || decision === "discard" ? "outline" : "default"}
              disabled={!decisionsEnabled}
              data-decision={decision}
              data-shell-stale={shellStale ? "true" : "false"}
              onClick={() => onDecision?.(decision)}
            >
              {DECISION_LABEL[decision]}
            </Button>
          ))}
        </div>
      ) : null}

      {footer}
    </header>
  );
}
