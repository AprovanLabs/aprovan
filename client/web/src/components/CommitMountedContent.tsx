/**
 * Read-only "Mounted content" section for a commit (registry
 * specs/mount-lineage "History surfaces lineage"): one row per mount —
 * prefix, source origin, resolved version token (short), and a relative
 * retrieved-at — with a "version unavailable at commit time" badge when
 * resolution failed. The section is absent for commits without lineage
 * (pre-change commits, mountless workspaces): this component renders null.
 */

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { relativeTime } from "@/lib/chat-sessions";
import { fetchCommitDetail, mountedContentRows, type MountedContentRow } from "@/lib/vfs-commits";

export function CommitMountedContent({ commitId }: { commitId: string }) {
  const [rows, setRows] = useState<MountedContentRow[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setRows(null);
    setFailed(false);
    fetchCommitDetail(commitId)
      .then((detail) => {
        if (!cancelled) setRows(mountedContentRows(detail));
      })
      .catch(() => {
        // Old gateway / unknown commit — behave like "no lineage": absent.
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [commitId]);

  if (failed) return null;
  if (rows === null) {
    return (
      <div className="flex items-center gap-1 px-1.5 py-1 text-xs text-muted-foreground">
        <Loader2 className="h-3 w-3 animate-spin" /> Loading commit details…
      </div>
    );
  }
  if (rows.length === 0) return null;

  return (
    <div className="mt-1 rounded border px-2 py-1.5">
      <p className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
        Mounted content
      </p>
      <ul className="mt-1 flex flex-col gap-1">
        {rows.map((row) => (
          <li key={row.prefix} className="flex flex-wrap items-center gap-2 text-xs">
            <code className="font-mono font-medium">{row.prefix}</code>
            <span className="min-w-0 truncate text-muted-foreground">{row.sourceLabel}</span>
            {row.shortToken ? (
              <code className="font-mono text-muted-foreground">→ {row.shortToken}</code>
            ) : (
              <Badge variant="outline" className="text-[0.65rem]">
                version unavailable at commit time
              </Badge>
            )}
            <span className="ml-auto shrink-0 text-[0.65rem] text-muted-foreground">
              {relativeTime(row.retrievedAt)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
