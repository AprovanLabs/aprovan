/**
 * builtin:merge-conflict — the first widget-rendered notification
 * (registry docs/vcs-and-sessions.md "Notifications").
 *
 * Content only: which files changed in two places and what each resolution
 * would do. The actions live on the notification itself — choices call
 * `sessions.resolve` natively (one click completes the merge), and the
 * link opens the full merge dialog for file-by-file resolution with AI
 * help. This card just makes the decision legible.
 */

import { FileDiff } from "lucide-react";

interface MergeConflictData {
  sessionTitle?: string;
  conflicts?: Array<{ path: string }>;
}

export function MergeConflictCard({ data }: { data: unknown }) {
  const parsed = (data ?? {}) as MergeConflictData;
  const conflicts = Array.isArray(parsed.conflicts) ? parsed.conflicts : [];
  return (
    <div className="mt-2 rounded-md border bg-muted/30 p-2 text-xs space-y-2">
      <p className="text-muted-foreground">
        These files were changed both in{" "}
        <span className="font-medium text-foreground">
          {parsed.sessionTitle ?? "the draft"}
        </span>{" "}
        and in your workspace:
      </p>
      <ul className="space-y-0.5">
        {conflicts.slice(0, 8).map((conflict) => (
          <li key={conflict.path} className="flex items-center gap-1.5 font-mono">
            <FileDiff className="h-3 w-3 shrink-0 text-violet-500" />
            <span className="truncate">{conflict.path}</span>
          </li>
        ))}
        {conflicts.length > 8 && (
          <li className="text-muted-foreground">…and {conflicts.length - 8} more</li>
        )}
      </ul>
      <div className="space-y-1 text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">Keep the draft's versions</span> —
          the draft's files replace the workspace's and everything applies.
        </p>
        <p>
          <span className="font-medium text-foreground">Keep the workspace versions</span> —
          the draft lets those files go and the rest applies.
        </p>
        <p>
          <span className="font-medium text-foreground">Review</span> — decide file by
          file, with AI to combine both versions where you want it.
        </p>
      </div>
    </div>
  );
}
