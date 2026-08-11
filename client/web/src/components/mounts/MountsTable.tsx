import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatMountBackend, formatPinnedRef } from "./format";
import { MountReadOnlyBadge } from "./MountReadOnlyBadge";
import type { VfsMountRecord } from "./types";

export function MountsTable({
  mounts,
  loading,
  removingPrefix,
  onRemove,
}: {
  mounts: readonly VfsMountRecord[];
  loading: boolean;
  removingPrefix: string | null;
  onRemove: (mount: VfsMountRecord) => void;
}) {
  if (loading) {
    return (
      <div className="space-y-2" aria-busy="true" aria-label="Loading mounts">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="h-10 animate-pulse rounded-md bg-muted" />
        ))}
      </div>
    );
  }

  if (mounts.length === 0) {
    return (
      <p className="rounded-md border border-dashed px-3 py-6 text-center text-sm text-muted-foreground">
        No mounts yet — shared content from another workspace or repo arrives here.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead className="border-b bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-3 py-2 font-medium">Prefix</th>
            <th className="px-3 py-2 font-medium">Type</th>
            <th className="px-3 py-2 font-medium">Backend</th>
            <th className="px-3 py-2 font-medium">Pinned</th>
            <th className="px-3 py-2 font-medium">Creator</th>
            <th className="px-3 py-2 font-medium">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {mounts.map((mount) => {
            const busy = removingPrefix === mount.prefix;
            return (
              <tr key={mount.prefix} className="border-b last:border-0">
                <td className="px-3 py-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <code className="font-mono text-xs">{mount.prefix}</code>
                    <MountReadOnlyBadge />
                  </div>
                </td>
                <td className="px-3 py-2 text-muted-foreground">{mount.type}</td>
                <td className="max-w-[14rem] truncate px-3 py-2 font-mono text-xs" title={formatMountBackend(mount)}>
                  {formatMountBackend(mount)}
                </td>
                <td className="px-3 py-2 font-mono text-xs">{formatPinnedRef(mount)}</td>
                <td className="px-3 py-2 text-muted-foreground">{mount.createdBy || "—"}</td>
                <td className="px-3 py-2 text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={busy}
                    onClick={() => onRemove(mount)}
                    title={`Remove mount ${mount.prefix}`}
                  >
                    {busy ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                    <span className="sr-only">Remove</span>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
