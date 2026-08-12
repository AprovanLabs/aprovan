/**
 * Credential-level badge + shell sentence (ux.md copy rules).
 * Distinct treatment for workspace vs user so skimming users can tell them apart.
 */

import { Building2, KeyRound, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CREDENTIAL_COPY,
  CREDENTIAL_NOT_CONNECTED_PROMPT,
  type CredentialLevel,
} from "./types";

const LEVEL_STYLE: Record<
  CredentialLevel,
  { className: string; Icon: typeof Building2 }
> = {
  "workspace-token": {
    className: "border-amber-600/40 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100",
    Icon: KeyRound,
  },
  "workspace-oauth": {
    className: "border-sky-600/40 bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-100",
    Icon: Building2,
  },
  "user-oauth": {
    className: "border-emerald-600/40 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100",
    Icon: User,
  },
};

export function CredentialLevelBadge({
  level,
  label,
  className,
}: {
  level: CredentialLevel;
  /** Prefer server-supplied label; falls back to fixed copy. */
  label?: string;
  className?: string;
}) {
  const copy = CREDENTIAL_COPY[level];
  const style = LEVEL_STYLE[level];
  const Icon = style.Icon;
  const text = label ?? copy.badge;
  return (
    <Badge
      variant="outline"
      data-testid="credential-level-badge"
      data-credential-level={level}
      title={`${copy.sentence} ${copy.whoApproves}`}
      className={cn("gap-1 font-medium", style.className, className)}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {text}
    </Badge>
  );
}

export function CredentialShellSentence({ level }: { level: CredentialLevel }) {
  return (
    <p data-testid="credential-shell-sentence" className="text-sm text-muted-foreground">
      {CREDENTIAL_COPY[level].sentence}
    </p>
  );
}

/** Pending-admin explanation — never a bare "pending". */
export function WaitingForAdminNotice({ level }: { level?: CredentialLevel }) {
  const bot =
    level === "workspace-oauth"
      ? "workspace bot"
      : level === "workspace-token"
        ? "workspace secret"
        : "workspace credential";
  return (
    <p data-testid="waiting-for-admin" className="text-sm text-amber-800 dark:text-amber-200">
      Needs an admin — this uses the {bot}, not your account
    </p>
  );
}

/** CredentialNotConnectedError → user-scoped connect prompt. */
export function CredentialNotConnectedPrompt() {
  return (
    <p
      data-testid="credential-not-connected"
      className="rounded-md border border-emerald-600/30 bg-emerald-50 px-3 py-2 text-sm text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100"
    >
      {CREDENTIAL_NOT_CONNECTED_PROMPT}
    </p>
  );
}

export function EffectBadge({ effect }: { effect: "observation" | "action" }) {
  return (
    <Badge
      variant="outline"
      data-testid="effect-badge"
      data-effect={effect}
      className={
        effect === "action"
          ? "border-orange-600/40 bg-orange-50 text-orange-900 dark:bg-orange-950/40 dark:text-orange-100"
          : "border-slate-500/40 bg-slate-50 text-slate-800 dark:bg-slate-900/40 dark:text-slate-100"
      }
    >
      {effect}
    </Badge>
  );
}
