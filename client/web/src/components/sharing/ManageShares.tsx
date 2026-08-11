/**
 * Manage shares table — kind, recipient/label, created, expiry, status, revoke.
 *
 * Revoke uses AlertDialog confirmation. A failed revoke leaves the row in a
 * distinct "revoke failed, retry" state — never silently reverts to active.
 */

import { AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatShareDate,
  isNoExpiry,
  listSharesCreated,
  revokeShare,
  shareStatus,
} from "./api";
import { RevokeConfirmDialog } from "./RevokeConfirmDialog";
import type { ShareRowStatus, VfsShare } from "./types";

export interface ManageSharesProps {
  /** When set, only shares for this path are shown (per-file manage). */
  path?: string;
  loadShares?: () => Promise<VfsShare[]>;
  className?: string;
}

export function ManageShares({
  path,
  loadShares = listSharesCreated,
  className,
}: ManageSharesProps) {
  const [shares, setShares] = useState<VfsShare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedRevokes, setFailedRevokes] = useState<Set<string>>(() => new Set());
  const [pending, setPending] = useState<VfsShare | null>(null);
  const [revoking, setRevoking] = useState(false);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    void loadShares()
      .then((list) => {
        setShares(path ? list.filter((s) => s.path === path) : list);
      })
      .catch((err: unknown) => {
        setShares([]);
        setError(err instanceof Error ? err.message : "Could not load shares");
      })
      .finally(() => setLoading(false));
  }, [loadShares, path]);

  useEffect(() => {
    reload();
  }, [reload]);

  async function confirmRevoke() {
    if (!pending) return;
    const shareId = pending.shareId;
    setRevoking(true);
    try {
      const updated = await revokeShare(shareId);
      setShares((prev) => prev.map((s) => (s.shareId === shareId ? updated : s)));
      setFailedRevokes((prev) => {
        const next = new Set(prev);
        next.delete(shareId);
        return next;
      });
      setPending(null);
    } catch {
      setFailedRevokes((prev) => new Set(prev).add(shareId));
      setPending(null);
    } finally {
      setRevoking(false);
    }
  }

  if (loading) {
    return (
      <div className={className}>
        <div className="space-y-2 p-4" aria-busy="true" aria-label="Loading shares">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-10 animate-pulse rounded-md bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <div
          className="m-4 flex items-start gap-3 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm"
          role="alert"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <div className="min-w-0 flex-1 space-y-2">
            <p className="text-destructive">{error}</p>
            <Button type="button" size="sm" variant="outline" onClick={reload}>
              <RefreshCw className="mr-1.5 size-3.5" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (shares.length === 0) {
    return (
      <div className={className}>
        <p className="p-6 text-center text-sm text-muted-foreground">
          You haven&apos;t shared anything yet.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="border-b text-xs text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Kind</th>
              {!path ? <th className="px-3 py-2 font-medium">Path</th> : null}
              <th className="px-3 py-2 font-medium">Recipient / label</th>
              <th className="px-3 py-2 font-medium">Created</th>
              <th className="px-3 py-2 font-medium">Expiry</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {shares.map((share) => {
              const status = shareStatus(share, failedRevokes.has(share.shareId));
              return (
                <tr key={share.shareId} className="align-middle">
                  <td className="px-3 py-2 capitalize">{share.kind}</td>
                  {!path ? (
                    <td className="max-w-[12rem] truncate px-3 py-2 font-mono text-xs">
                      {share.path}
                    </td>
                  ) : null}
                  <td className="px-3 py-2">
                    {share.kind === "person" ? (share.grantee ?? "—") : "Link"}
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {formatShareDate(share.createdAt)}
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {share.kind === "link"
                      ? isNoExpiry(share.expiresAt)
                        ? "No expiry"
                        : formatShareDate(share.expiresAt)
                      : "—"}
                  </td>
                  <td className="px-3 py-2">
                    <StatusBadge status={status} />
                  </td>
                  <td className="px-3 py-2 text-right">
                    {status === "active" || status === "revoke_failed" ? (
                      <Button
                        type="button"
                        size="sm"
                        variant={status === "revoke_failed" ? "destructive" : "outline"}
                        onClick={() => setPending(share)}
                      >
                        {status === "revoke_failed" ? "Retry revoke" : "Revoke"}
                      </Button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <RevokeConfirmDialog
        open={pending !== null}
        onOpenChange={(next) => {
          if (!next && !revoking) setPending(null);
        }}
        label={
          pending
            ? pending.kind === "person"
              ? (pending.grantee ?? pending.path)
              : `link to ${pending.path}`
            : ""
        }
        busy={revoking}
        onConfirm={() => void confirmRevoke()}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: ShareRowStatus }) {
  if (status === "revoke_failed") {
    return (
      <Badge variant="destructive" className="font-normal">
        Revoke failed — retry
      </Badge>
    );
  }
  if (status === "revoked") {
    return (
      <Badge variant="secondary" className="font-normal">
        Revoked
      </Badge>
    );
  }
  if (status === "expired") {
    return (
      <Badge variant="outline" className="font-normal">
        Expired
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="font-normal">
      Active
    </Badge>
  );
}

/** Thin loading hint used while a revoke is in flight on the confirm dialog. */
export function ManageSharesBusyHint() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <Loader2 className="size-3 animate-spin" />
      Updating…
    </span>
  );
}
