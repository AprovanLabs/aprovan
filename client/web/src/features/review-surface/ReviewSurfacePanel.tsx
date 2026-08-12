/**
 * Review surface panel — kind filter tabs, list/detail, bulk actions
 * constrained to a single (app, capability) group.
 */

import { useMemo, useState, type ReactNode } from "react";
import type { Compiler } from "@aprovan/patchwork";
import { Button } from "@/components/ui/button";
import type { SandboxRenderProps } from "@/features/notifications/PayloadWidgetHost";
import { ReviewItemDetail } from "./ReviewItemDetail";
import { expiryCountdown, canBulkAct, type ReviewItem, type ReviewItemKind } from "./types";

const KIND_LABEL: Record<ReviewItemKind, string> = {
  "queued-action": "Queued",
  "staged-change": "Staged",
  "merge-conflict": "Conflicts",
  "capability-request": "Capabilities",
};

const KINDS: ReviewItemKind[] = [
  "queued-action",
  "capability-request",
  "staged-change",
  "merge-conflict",
];

export function ReviewSurfacePanel({
  items,
  compiler = null,
  services = [],
  onDecision,
  onBulk,
  renderSandbox,
}: {
  items: ReviewItem[];
  compiler?: Compiler | null;
  services?: string[];
  onDecision?: (decision: string, item: ReviewItem) => void;
  onBulk?: (decision: "release" | "discard", items: ReviewItem[]) => void;
  renderSandbox?: (props: SandboxRenderProps) => ReactNode;
}) {
  const [kind, setKind] = useState<ReviewItemKind | "all">("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const map: Record<ReviewItemKind, number> = {
      "queued-action": 0,
      "staged-change": 0,
      "merge-conflict": 0,
      "capability-request": 0,
    };
    for (const item of items) map[item.kind] += 1;
    return map;
  }, [items]);

  const filtered = kind === "all" ? items : items.filter((i) => i.kind === kind);
  const active = filtered.find((i) => i.id === activeId) ?? filtered[0] ?? null;
  const selectedItems = filtered.filter((i) => selected.has(i.id));
  const bulkOk = canBulkAct(selectedItems);

  if (items.length === 0) {
    return (
      <div data-testid="review-surface-empty" className="p-6 text-sm text-muted-foreground">
        Nothing waiting on you
      </div>
    );
  }

  return (
    <div data-testid="review-surface-panel" className="flex h-full min-h-[24rem] flex-col">
      <div className="flex flex-wrap gap-1 border-b p-2" role="tablist" aria-label="Review kinds">
        <KindTab
          label="All"
          count={items.length}
          active={kind === "all"}
          onClick={() => setKind("all")}
        />
        {KINDS.map((k) => (
          <KindTab
            key={k}
            label={KIND_LABEL[k]}
            count={counts[k]}
            active={kind === k}
            onClick={() => setKind(k)}
          />
        ))}
      </div>

      <div className="grid flex-1 grid-cols-1 md:grid-cols-[minmax(14rem,18rem)_1fr]">
        <ul className="overflow-auto border-r" data-testid="review-item-list">
          {filtered.map((item) => {
            const countdown = expiryCountdown(item.expiresAt);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`flex w-full items-start gap-2 border-b px-3 py-2 text-left text-sm hover:bg-muted/50 ${
                    active?.id === item.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setActiveId(item.id)}
                >
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={selected.has(item.id)}
                    aria-label={`Select ${item.id}`}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      setSelected((prev) => {
                        const next = new Set(prev);
                        if (e.target.checked) next.add(item.id);
                        else next.delete(item.id);
                        return next;
                      });
                    }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">
                      {item.shell.who.app ?? item.shell.who.user}
                      {item.shell.capability ? ` → ${item.shell.capability}` : ""}
                    </span>
                    {item.shell.resource ? (
                      <span className="block truncate font-mono text-xs text-muted-foreground">
                        {item.shell.resource}
                      </span>
                    ) : null}
                    {countdown ? (
                      <span className="text-xs text-amber-700">{countdown}</span>
                    ) : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="overflow-auto p-3">
          {active ? (
            <ReviewItemDetail
              item={active}
              compiler={compiler}
              services={services}
              onDecision={onDecision}
              renderSandbox={renderSandbox}
            />
          ) : null}
        </div>
      </div>

      {selectedItems.length > 0 ? (
        <div
          data-testid="bulk-bar"
          className="flex items-center gap-2 border-t bg-muted/40 px-3 py-2"
        >
          <span className="text-xs text-muted-foreground">{selectedItems.length} selected</span>
          <Button
            size="sm"
            disabled={!bulkOk}
            data-testid="bulk-release"
            title={bulkOk ? undefined : "Select items from a single app + capability"}
            onClick={() => onBulk?.("release", selectedItems)}
          >
            Release all
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={!bulkOk}
            data-testid="bulk-discard"
            title={bulkOk ? undefined : "Select items from a single app + capability"}
            onClick={() => onBulk?.("discard", selectedItems)}
          >
            Discard all
          </Button>
          {!bulkOk ? (
            <span data-testid="bulk-mixed-hint" className="text-xs text-amber-700">
              Mixed groups — bulk actions disabled
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function KindTab({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={`rounded-md px-2.5 py-1 text-xs font-medium ${
        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      }`}
      onClick={onClick}
    >
      {label} <span className="opacity-80">({count})</span>
    </button>
  );
}
