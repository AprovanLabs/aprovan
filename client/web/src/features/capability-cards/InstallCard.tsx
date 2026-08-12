/**
 * Install card — one-shot ceiling approval (ux.md "Install card").
 */

import { Button } from "@/components/ui/button";
import {
  CredentialLevelBadge,
  EffectBadge,
} from "@/features/review-surface/CredentialLevelBadge";
import type { CredentialLevel, Effect } from "@/features/review-surface/types";

export type InstallCapabilityRow = {
  capability: string;
  effect: Effect;
  credentialLevel?: CredentialLevel;
  flag?: "undeclared" | "unused";
};

export type InstallCardProps = {
  app: { name: string; publisher?: string; hosted?: boolean };
  rows: InstallCapabilityRow[];
  /** Static analysis still running. */
  analyzing?: boolean;
  /** Analysis failed — manifest fallback + warning. */
  analysisFailed?: boolean;
  /** Viewer cannot approve workspace-level credentials. */
  needsAdmin?: boolean;
  pendingAdmin?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  onSendToAdmins?: () => void;
};

export function InstallCard({
  app,
  rows,
  analyzing,
  analysisFailed,
  needsAdmin,
  pendingAdmin,
  onConfirm,
  onCancel,
  onSendToAdmins,
}: InstallCardProps) {
  const blocked = rows.some((r) => r.flag === "undeclared");
  const workspaceCred = rows.some(
    (r) =>
      r.credentialLevel === "workspace-token" || r.credentialLevel === "workspace-oauth",
  );
  const sendToAdmins = Boolean(needsAdmin && workspaceCred && !pendingAdmin);
  const confirmDisabled =
    analyzing || blocked || pendingAdmin || (analysisFailed && rows.some((r) => r.effect === "action"));

  return (
    <div data-testid="install-card" className="space-y-4 p-1">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{app.name}</h2>
          {app.hosted ? (
            <span className="rounded border px-1.5 py-0.5 text-xs">hosted</span>
          ) : (
            <span className="rounded border px-1.5 py-0.5 text-xs">managed</span>
          )}
        </div>
        {app.publisher ? (
          <p className="text-sm text-muted-foreground">{app.publisher}</p>
        ) : null}
      </header>

      {analyzing ? (
        <p data-testid="install-analyzing" className="text-sm text-muted-foreground">
          reading app code…
        </p>
      ) : null}

      {analysisFailed ? (
        <p
          data-testid="install-analysis-failed"
          className="rounded-md border border-amber-600/40 bg-amber-50 px-3 py-2 text-sm text-amber-950"
        >
          Static analysis failed — showing manifest-declared capabilities. Action
          capabilities require analysis to pass.
        </p>
      ) : null}

      <ul className="space-y-2" data-testid="install-capability-rows">
        {rows.map((row) => (
          <li
            key={row.capability}
            data-flag={row.flag ?? "ok"}
            className="flex flex-wrap items-center gap-2 rounded-md border px-3 py-2 text-sm"
          >
            <span className="font-mono text-xs">{row.capability}</span>
            <EffectBadge effect={row.effect} />
            {row.credentialLevel ? (
              <CredentialLevelBadge level={row.credentialLevel} />
            ) : null}
            {row.flag === "undeclared" ? (
              <span className="rounded bg-destructive/15 px-1.5 py-0.5 text-xs text-destructive">
                undeclared
              </span>
            ) : null}
            {row.flag === "unused" ? (
              <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                unused
              </span>
            ) : null}
          </li>
        ))}
      </ul>

      <p data-testid="resources-come-later" className="text-sm text-muted-foreground">
        Resources are approved as the app first touches them
      </p>

      {pendingAdmin ? (
        <p data-testid="install-pending-admin" className="text-sm text-amber-800">
          Needs an admin — this uses the workspace bot, not your account
        </p>
      ) : null}

      <footer className="flex flex-wrap justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        {sendToAdmins ? (
          <Button data-testid="send-to-admins" onClick={onSendToAdmins}>
            Send to admins
          </Button>
        ) : (
          <Button
            data-testid="install-confirm"
            disabled={confirmDisabled}
            onClick={onConfirm}
          >
            Confirm
          </Button>
        )}
      </footer>
    </div>
  );
}
