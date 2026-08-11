import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ChangeListChanges = {
  added: string[];
  modified: string[];
  removed: string[];
};

export type ChangeStatus = "new" | "edited" | "removed";

export type ChangeListRow = {
  path: string;
  status: ChangeStatus;
};

export interface ChangeListProps {
  changes: ChangeListChanges;
  /** Host-provided open handler (diff sheet or file tab). */
  onOpen?: (path: string) => void;
  /** Rows shown before "Show all N". Default 8. */
  collapseAfter?: number;
  className?: string;
  emptyLabel?: string;
}

const STATUS_CHIP: Record<
  ChangeStatus,
  { label: string; className: string }
> = {
  new: {
    label: "new",
    className:
      "border-transparent bg-emerald-600/15 text-emerald-700 dark:text-emerald-400 font-normal",
  },
  edited: {
    label: "edited",
    className:
      "border-transparent bg-amber-600/15 text-amber-700 dark:text-amber-400 font-normal",
  },
  removed: {
    label: "removed",
    className:
      "border-transparent bg-red-600/15 text-red-700 dark:text-red-400 font-normal",
  },
};

/** Flatten + sort change bags into word-chip rows (new / edited / removed). */
export function changeListRows(changes: ChangeListChanges): ChangeListRow[] {
  return [
    ...changes.added.map((path) => ({ path, status: "new" as const })),
    ...changes.modified.map((path) => ({ path, status: "edited" as const })),
    ...changes.removed.map((path) => ({ path, status: "removed" as const })),
  ].sort((a, b) => a.path.localeCompare(b.path));
}

/**
 * Shared changed-paths renderer. One symbol set: word chips
 * (new / edited / removed) — never +/~/− glyphs.
 */
export function ChangeList({
  changes,
  onOpen,
  collapseAfter = 8,
  className,
  emptyLabel = "No file changes",
}: ChangeListProps) {
  const rows = useMemo(() => changeListRows(changes), [changes]);
  const [expanded, setExpanded] = useState(false);

  if (rows.length === 0) {
    return (
      <p className={cn("text-xs text-muted-foreground px-1 py-1", className)}>
        {emptyLabel}
      </p>
    );
  }

  const collapsed = !expanded && rows.length > collapseAfter;
  const visible = collapsed ? rows.slice(0, collapseAfter) : rows;
  const hiddenCount = rows.length - visible.length;

  return (
    <div className={cn("space-y-0.5", className)}>
      {visible.map((row) => {
        const chip = STATUS_CHIP[row.status];
        const body = (
          <>
            <Badge
              variant="outline"
              className={cn(
                "w-[4.25rem] shrink-0 justify-center px-1.5 py-0 text-[10px] uppercase tracking-wide rounded-sm",
                chip.className,
              )}
            >
              {chip.label}
            </Badge>
            <span className="truncate font-mono text-[11px] text-muted-foreground">
              {row.path}
            </span>
          </>
        );

        if (onOpen) {
          return (
            <button
              key={`${row.status}:${row.path}`}
              type="button"
              onClick={() => onOpen(row.path)}
              title={row.path}
              className="flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left hover:bg-muted"
            >
              {body}
            </button>
          );
        }

        return (
          <div
            key={`${row.status}:${row.path}`}
            className="flex items-center gap-1.5 px-1 py-0.5"
            title={row.path}
          >
            {body}
          </div>
        );
      })}
      {collapsed ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="w-full rounded px-1 py-1 text-left text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          Show all {rows.length}
        </button>
      ) : null}
      {expanded && hiddenCount === 0 && rows.length > collapseAfter ? (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="w-full rounded px-1 py-1 text-left text-xs text-muted-foreground hover:bg-muted"
        >
          Show less
        </button>
      ) : null}
    </div>
  );
}
