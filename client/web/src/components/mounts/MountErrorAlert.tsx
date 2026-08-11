import { AlertCircle, Ban } from "lucide-react";
import type { MountFormError } from "./types";

/**
 * Distinct inline alerts for overlap (409) vs backend-unreachable (400) per
 * ux.md Mounts panel error states. Not a toast — row/dialog scoped.
 */
export function MountErrorAlert({ error }: { error: MountFormError }) {
  if (error.kind === "overlap") {
    return (
      <div
        role="alert"
        className="flex gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-950 dark:text-amber-100"
      >
        <Ban className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <div>
          <p className="font-medium">Mount overlaps an existing app or mount</p>
          <p className="mt-0.5 text-xs opacity-90">{error.message}</p>
        </div>
      </div>
    );
  }

  if (error.kind === "unreachable") {
    return (
      <div
        role="alert"
        className="flex gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
      >
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <div>
          <p className="font-medium">Backend could not be reached</p>
          <p className="mt-0.5 text-xs opacity-90">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      role="alert"
      className="flex gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <p>{error.message}</p>
    </div>
  );
}
