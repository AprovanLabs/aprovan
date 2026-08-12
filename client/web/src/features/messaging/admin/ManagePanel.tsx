/**
 * Host Manage panel — storage meter, cap, invites, participants, delete
 * (ux.md Host administration / Manage panel). Metering only via apps.instance*.
 */

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CAP_BELOW_USAGE_WARNING } from "../guest/copy";
import { InviteGuestForm, type ChannelOption } from "../guest/InviteGuestForm";
import { RemoveGuestButton } from "../guest/lifecycle";
import { PendingInvitesList } from "../guest/PendingInvitesList";
import type { GuestInvitesClient } from "../guest/invites";
import {
  createInstanceHostClient,
  formatAsOfStamp,
  formatStorageBytes,
  isCapBelowUsage,
  type InstanceHostClient,
  type InstanceUsage,
} from "./platform";

export type ManagePanelParticipant = {
  sub: string;
  label?: string;
  /** Host cannot be removed from this list. */
  role?: "host" | "guest" | "participant";
};

export type ManagePanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  instanceId: string;
  /** Typed confirmation must match this name (D22). */
  instanceName: string;
  /** Hosting mode — guests invites only for hosted. */
  hosting: "hosted" | "managed";
  channels?: ChannelOption[];
  participants?: ManagePanelParticipant[];
  hostClient?: InstanceHostClient;
  invitesClient?: GuestInvitesClient;
  /** Managed-mode coworker section (rendered by parent or CoworkerPicker). */
  coworkerSlot?: ReactNode;
  onDeleted?: () => void;
  onParticipantsChange?: (subs: string[]) => void;
  className?: string;
};

export function ManagePanel({
  open,
  onOpenChange,
  instanceId,
  instanceName,
  hosting,
  channels,
  participants: participantsProp,
  hostClient: hostClientProp,
  invitesClient,
  coworkerSlot,
  onDeleted,
  onParticipantsChange,
  className,
}: ManagePanelProps) {
  const host = hostClientProp ?? createInstanceHostClient();
  const [usage, setUsage] = useState<InstanceUsage | null>(null);
  const [usageError, setUsageError] = useState<string | null>(null);
  const [capInput, setCapInput] = useState("");
  const [capBusy, setCapBusy] = useState(false);
  const [capError, setCapError] = useState<string | null>(null);
  const [participants, setParticipants] = useState(participantsProp ?? []);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    if (participantsProp) setParticipants(participantsProp);
  }, [participantsProp]);

  const refreshUsage = useCallback(async () => {
    setUsageError(null);
    try {
      const next = await host.usage(instanceId);
      setUsage(next);
      if (next.storageCapBytes != null) {
        setCapInput(String(next.storageCapBytes));
      } else {
        setCapInput("");
      }
      if (next.participants && !participantsProp) {
        setParticipants(
          next.participants.map((sub) => ({ sub, role: "participant" as const })),
        );
      }
    } catch (err) {
      setUsageError(
        err instanceof Error ? err.message : "Failed to load storage usage",
      );
    }
  }, [host, instanceId, participantsProp]);

  useEffect(() => {
    if (!open) return;
    void refreshUsage();
  }, [open, refreshUsage]);

  const parsedCap = useMemo(() => {
    const t = capInput.trim();
    if (!t) return null;
    const n = Number(t);
    return Number.isFinite(n) && n >= 0 ? n : undefined;
  }, [capInput]);

  const belowUsageWarning =
    usage != null &&
    parsedCap !== undefined &&
    parsedCap !== null &&
    isCapBelowUsage(parsedCap, usage.storageBytes);

  const saveCap = async () => {
    if (parsedCap === undefined) {
      setCapError("Enter a non-negative number, or clear to uncap.");
      return;
    }
    setCapBusy(true);
    setCapError(null);
    try {
      const next = await host.setCap(instanceId, parsedCap);
      if (next) setUsage(next);
      else await refreshUsage();
    } catch (err) {
      setCapError(err instanceof Error ? err.message : "Failed to set cap");
    } finally {
      setCapBusy(false);
    }
  };

  const confirmDelete = async () => {
    if (deleteConfirm !== instanceName) return;
    setDeleteBusy(true);
    setDeleteError(null);
    try {
      await host.deleteInstance(instanceId);
      onOpenChange(false);
      onDeleted?.();
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Failed to delete instance",
      );
    } finally {
      setDeleteBusy(false);
    }
  };

  const guests = participants.filter((p) => p.role !== "host");
  const usagePct =
    usage && usage.storageCapBytes && usage.storageCapBytes > 0
      ? Math.min(100, (usage.storageBytes / usage.storageCapBytes) * 100)
      : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Manage</DialogTitle>
        <DialogClose onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogContent className={cn("space-y-6", className)} data-testid="manage-panel">
        <section className="space-y-2" data-testid="storage-meter">
          <h3 className="text-sm font-medium">Storage</h3>
          {usageError ? (
            <p className="text-xs text-destructive" role="alert">
              {usageError}
            </p>
          ) : usage ? (
            <>
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span>
                  {formatStorageBytes(usage.storageBytes)}
                  {usage.storageCapBytes != null
                    ? ` / ${formatStorageBytes(usage.storageCapBytes)}`
                    : " used"}
                </span>
                <span
                  className="text-xs text-muted-foreground"
                  data-testid="storage-as-of"
                >
                  {formatAsOfStamp(usage.asOf)}
                </span>
              </div>
              {usagePct != null ? (
                <div
                  className="h-2 overflow-hidden rounded-full bg-muted"
                  role="progressbar"
                  aria-valuenow={Math.round(usagePct)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full bg-primary transition-[width]"
                    style={{ width: `${usagePct}%` }}
                  />
                </div>
              ) : null}
            </>
          ) : (
            <p className="text-xs text-muted-foreground">Loading usage…</p>
          )}

          <div className="flex flex-wrap items-end gap-2 pt-1">
            <div className="min-w-[10rem] flex-1">
              <label className="text-xs text-muted-foreground" htmlFor="cap-bytes">
                Cap (bytes)
              </label>
              <Input
                id="cap-bytes"
                inputMode="numeric"
                placeholder="Uncapped"
                value={capInput}
                onChange={(e) => setCapInput(e.target.value)}
                disabled={capBusy}
              />
            </div>
            <Button
              type="button"
              size="sm"
              disabled={capBusy}
              onClick={() => void saveCap()}
            >
              {capBusy ? "Saving…" : "Save cap"}
            </Button>
          </div>
          {belowUsageWarning ? (
            <p
              className="text-xs text-amber-700 dark:text-amber-400"
              data-testid="cap-below-usage-warning"
              role="status"
            >
              {CAP_BELOW_USAGE_WARNING}
            </p>
          ) : null}
          {capError ? (
            <p className="text-xs text-destructive" role="alert">
              {capError}
            </p>
          ) : null}
        </section>

        {hosting === "hosted" ? (
          <section className="space-y-4" data-testid="manage-guests">
            <InviteGuestForm
              instanceId={instanceId}
              channels={channels}
              client={invitesClient}
            />
            <PendingInvitesList client={invitesClient} />
            <div>
              <h3 className="mb-2 text-sm font-medium">Participants</h3>
              {guests.length === 0 ? (
                <p className="text-xs text-muted-foreground">No guests yet.</p>
              ) : (
                <ul className="divide-y rounded-md border">
                  {guests.map((p) => (
                    <li
                      key={p.sub}
                      className="flex items-center justify-between gap-2 px-3 py-2 text-sm"
                    >
                      <span className="truncate">{p.label ?? p.sub}</span>
                      <RemoveGuestButton
                        instanceId={instanceId}
                        guestSub={p.sub}
                        guestLabel={p.label ?? p.sub}
                        client={host}
                        onRemoved={(sub) => {
                          const next = participants.filter((x) => x.sub !== sub);
                          setParticipants(next);
                          onParticipantsChange?.(next.map((x) => x.sub));
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ) : (
          <section data-testid="manage-coworkers">{coworkerSlot}</section>
        )}

        <section
          className="space-y-2 rounded-md border border-destructive/40 p-3"
          data-testid="delete-instance"
        >
          <h3 className="text-sm font-medium text-destructive">Delete instance</h3>
          <p className="text-xs text-muted-foreground">
            Permanent, audited removal for all participants. Type{" "}
            <span className="font-mono font-medium text-foreground">
              {instanceName}
            </span>{" "}
            to confirm.
          </p>
          <Input
            aria-label="Type instance name to confirm delete"
            value={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.value)}
            disabled={deleteBusy}
            placeholder={instanceName}
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={deleteBusy || deleteConfirm !== instanceName}
            onClick={() => void confirmDelete()}
          >
            {deleteBusy ? "Deleting…" : "Delete instance"}
          </Button>
          {deleteError ? (
            <p className="text-xs text-destructive" role="alert">
              {deleteError}
            </p>
          ) : null}
        </section>
      </DialogContent>
    </Dialog>
  );
}
