/**
 * Update-available affordance for the apps management surface.
 *
 * Shows "v(N) available → Copy again" from `apps.updateCheck`, then runs
 * `apps.applyUpdate`. Local edits require an explicit overwrite confirmation
 * (`confirmOverwrite`) — never an automatic trigger.
 */

import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { invokeAppsTool, type ToolsInvoke } from "@/lib/tools";
import { cn } from "@/lib/utils";
import { isLocalEditsGuardMessage } from "./errors";

export interface UpdateCheckResult {
  current: { commit?: string; tag?: string; [key: string]: unknown };
  available?: { commit?: string; tag?: string; [key: string]: unknown };
  originAvailable: boolean;
  message?: string;
}

export interface UpdateAvailableProps {
  installId: string;
  /** Optional prefetched check — skips the initial `updateCheck` call. */
  check?: UpdateCheckResult | null;
  /** When true, fetch `updateCheck` on mount (ignored if `check` is passed). */
  autoCheck?: boolean;
  invokeApps?: ToolsInvoke;
  onUpdated?: (result: unknown) => void;
  className?: string;
}

function availableLabel(check: UpdateCheckResult): string {
  if (check.message) {
    // Server already formats `v(tag) available` or a short commit label.
    const base = check.message.replace(/\s*available\.?$/i, "").trim();
    return `${base} available → Copy again`;
  }
  const tag = check.available?.tag;
  if (tag) return `v(${tag}) available → Copy again`;
  const commit = check.available?.commit;
  if (commit) return `commit ${commit.slice(0, 8)} available → Copy again`;
  return "Update available → Copy again";
}

export function UpdateAvailable({
  installId,
  check: checkProp,
  autoCheck = true,
  invokeApps = invokeAppsTool,
  onUpdated,
  className,
}: UpdateAvailableProps) {
  const [check, setCheck] = useState<UpdateCheckResult | null>(checkProp ?? null);
  const [checking, setChecking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const refresh = useCallback(async () => {
    setChecking(true);
    setError(null);
    try {
      const result = (await invokeApps("updateCheck", {
        install: installId,
      })) as UpdateCheckResult;
      setCheck(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setChecking(false);
    }
  }, [installId, invokeApps]);

  useEffect(() => {
    if (checkProp !== undefined && checkProp !== null) {
      setCheck(checkProp);
      return;
    }
    if (autoCheck) void refresh();
  }, [checkProp, autoCheck, refresh]);

  const apply = async (confirmOverwrite: boolean) => {
    setBusy(true);
    setError(null);
    try {
      const result = await invokeApps("applyUpdate", {
        install: installId,
        ...(confirmOverwrite ? { confirmOverwrite: true } : {}),
      });
      setConfirmOpen(false);
      onUpdated?.(result);
      await refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (!confirmOverwrite && isLocalEditsGuardMessage(message)) {
        setConfirmOpen(true);
      } else {
        setError(message);
      }
    } finally {
      setBusy(false);
    }
  };

  if (checking && !check) {
    return (
      <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}>
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
        Checking for updates…
      </div>
    );
  }

  if (!check?.available) {
    return error ? (
      <p className={cn("text-sm text-destructive", className)} role="alert">
        {error}
      </p>
    ) : null;
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={busy}
        onClick={() => void apply(false)}
        className="w-fit"
      >
        {busy && !confirmOpen ? (
          <>
            <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" aria-hidden />
            Copying…
          </>
        ) : (
          availableLabel(check)
        )}
      </Button>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <Dialog
        open={confirmOpen}
        onOpenChange={(next) => {
          if (!next && busy) return;
          setConfirmOpen(next);
        }}
      >
        <DialogHeader>
          <DialogTitle>Overwrite local edits?</DialogTitle>
          {!busy ? <DialogClose onClose={() => setConfirmOpen(false)} /> : <span />}
        </DialogHeader>
        <DialogContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            This installation has local edits. Copying again will overwrite those changes
            with the origin archive. This cannot be undone from here.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={busy}
              onClick={() => setConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={busy}
              onClick={() => void apply(true)}
            >
              {busy ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                  Overwriting…
                </>
              ) : (
                "Overwrite and copy again"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
