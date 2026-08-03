/**
 * builtin:merge-conflict — summary entry for the one conflict surface.
 *
 * Lists conflicted paths and points at Review. Resolution (per-file and bulk)
 * lives only in MergeDialog — this card never offers one-click choices.
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
      <p className="text-muted-foreground">
        <span className="font-medium text-foreground">Review</span> — choose per file, or
        keep all mine / keep all workspace in the dialog.
      </p>
    </div>
  );
}
