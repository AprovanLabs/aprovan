/**
 * Shared with me — flat recipient listing per ux.md.
 *
 * Empty: "Nothing shared with you yet."
 * Error: inline retry (does not block the rest of the workspace UI).
 */

import { AlertCircle, FileIcon, Loader2, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatShareDate, listSharesReceived } from "./api";
import type { VfsShare } from "./types";

export interface SharedWithMeProps {
  /** Optional controlled load — defaults to `vfs.shares.received`. */
  loadShares?: () => Promise<VfsShare[]>;
  onOpenPath?: (path: string) => void;
  className?: string;
}

export function SharedWithMe({
  loadShares = listSharesReceived,
  onOpenPath,
  className,
}: SharedWithMeProps) {
  const [shares, setShares] = useState<VfsShare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    void loadShares()
      .then((list) => setShares(list))
      .catch((err: unknown) => {
        setShares([]);
        setError(err instanceof Error ? err.message : "Could not load shared files");
      })
      .finally(() => setLoading(false));
  }, [loadShares]);

  useEffect(() => {
    reload();
  }, [reload]);

  if (loading) {
    return (
      <div className={className}>
        <div className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Loading shared files…
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
          Nothing shared with you yet.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <ul className="divide-y">
        {shares.map((share) => (
          <li key={share.shareId}>
            <button
              type="button"
              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-accent/50"
              onClick={() => onOpenPath?.(share.path)}
              disabled={!onOpenPath}
            >
              <FileIcon className="size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{share.path}</p>
                <p className="truncate text-xs text-muted-foreground">
                  Shared by {share.createdBy} · {formatShareDate(share.createdAt)}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
