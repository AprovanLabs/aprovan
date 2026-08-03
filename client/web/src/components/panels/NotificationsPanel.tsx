/**
 * NotificationsPanel — native surface over the gateway `notifications`
 * namespace.
 *
 * The bell drawer is the *interrupt*: unseen decisions and warnings, one
 * click from dismissing them. This is the *record* — the whole feed including
 * everything already seen, filterable by category and by which app emitted
 * it, in a pane you can leave open. A drawer that hides a row the moment you
 * acknowledge it is the right shape for an interrupt and the wrong shape for
 * "what did that app tell me last Tuesday", which is why this exists
 * alongside it rather than instead of it.
 *
 * Scoped to an app (the app inspector's contextual tab) it shows only what
 * that app emitted — the gateway stamps `source.app` server-side, so this is
 * a filter over provenance, not a guess from the title.
 */

import { Bell, CircleAlert, Info, MessageCircleQuestion } from "lucide-react";
import { useState } from "react";
import {
  PanelEmpty,
  PanelErrorWithRetry,
  PanelLoading,
  PanelShell,
  PanelTabs,
  relativeTime,
  type NativePanelProps,
  usePanelData,
  useScopeFilter,
} from "./shell";
import { Badge } from "@/components/ui/badge";
import { invokeNamespaceTool } from "@/lib/tools";

type Category = "decision" | "warning" | "activity";

interface NotificationRow {
  id: string;
  category: Category;
  title: string;
  body?: string;
  audience: "user" | "workspace";
  widget?: { path: string };
  choices?: Array<{ label: string }>;
  source?: { app: string };
  createdBy: string;
  createdAt: string;
  seenBy?: Record<string, string>;
}

const invokeNotifications = invokeNamespaceTool("notifications");

const CATEGORY_STYLE: Record<
  Category,
  { Icon: typeof Info; className: string; label: string }
> = {
  decision: {
    Icon: MessageCircleQuestion,
    className: "text-primary",
    label: "Decision",
  },
  warning: { Icon: CircleAlert, className: "text-amber-500", label: "Warning" },
  activity: { Icon: Info, className: "text-muted-foreground", label: "Activity" },
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "decision", label: "Decisions" },
  { id: "warning", label: "Warnings" },
  { id: "activity", label: "Activity" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

function NotificationCard({ row, seen }: { row: NotificationRow; seen: boolean }) {
  const style = CATEGORY_STYLE[row.category] ?? CATEGORY_STYLE.activity;
  return (
    <div className={`rounded-md border bg-card px-3 py-2 text-sm ${seen ? "opacity-60" : ""}`}>
      <div className="flex flex-wrap items-center gap-1.5">
        <style.Icon className={`h-3.5 w-3.5 shrink-0 ${style.className}`} />
        <span className="font-medium">{row.title}</span>
        {row.source && (
          <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
            {row.source.app}
          </Badge>
        )}
        {row.audience === "workspace" && (
          <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
            Workspace
          </Badge>
        )}
        <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
          {relativeTime(row.createdAt)}
        </span>
      </div>
      {row.body && <p className="mt-1 text-xs text-muted-foreground">{row.body}</p>}
      {(row.widget || row.choices?.length) && (
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
          {row.widget && (
            <span className="rounded border bg-muted px-1.5 py-0.5 font-mono">
              {row.widget.path}
            </span>
          )}
          {/* Choices are dispatched from the bell, where acting on one also
              settles the interrupt. Here they are shown as what this
              notification *asked for*, not re-offered — two places that both
              fire a tool call is how you get it fired twice. */}
          {row.choices?.map((choice) => (
            <span key={choice.label} className="rounded-full border px-2 py-0.5">
              {choice.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function NotificationsPanel({ scope: explicitScope }: NativePanelProps) {
  const { scope, scopeFilter } = useScopeFilter(explicitScope);
  const [filter, setFilter] = useState<FilterId>("all");
  const { data, error, loading, refresh } = usePanelData(
    async () =>
      (await invokeNotifications("list", { include_seen: true, limit: 100 })) as {
        notifications: NotificationRow[];
        userId?: string;
      },
  );

  const all = data?.notifications ?? [];
  const scoped = scope ? all.filter((row) => row.source?.app === scope.name) : all;
  const rows = filter === "all" ? scoped : scoped.filter((row) => row.category === filter);
  const userId = data?.userId;
  const isSeen = (row: NotificationRow) =>
    Boolean(userId ? row.seenBy?.[userId] : Object.keys(row.seenBy ?? {}).length > 0);
  const unseen = scoped.filter((row) => !isSeen(row)).length;

  const emptyCopy = (() => {
    if (scope) {
      return `${scope.title ?? scope.name} hasn't sent any notifications yet.`;
    }
    if (filter === "all") {
      return "Decisions, warnings, and activity from apps and workflows appear here.";
    }
    const label = FILTERS.find((entry) => entry.id === filter)?.label.toLowerCase() ?? filter;
    return `No ${label} yet. They'll show up here when something needs your attention.`;
  })();

  return (
    <PanelShell
      icon={Bell}
      title="Notifications"
      description={
        scope
          ? `From ${scope.title ?? scope.name}`
          : "Decisions, warnings, and activity across your workspace"
      }
      actions={
        <>
          {scopeFilter}
          {unseen > 0 && (
            <Badge variant="secondary" className="text-[0.65rem]">
              {unseen} unseen
            </Badge>
          )}
        </>
      }
      onRefresh={refresh}
      refreshing={loading}
    >
      <PanelTabs
        tabs={FILTERS.map((entry) => ({
          id: entry.id,
          label: entry.label,
          badge:
            entry.id === "all"
              ? scoped.length
              : scoped.filter((row) => row.category === entry.id).length,
        }))}
        active={filter}
        onChange={setFilter}
      />
      {error ? (
        <PanelErrorWithRetry
          message="Couldn't load notifications. Retry, or check your connection."
          onRetry={refresh}
          retrying={loading}
        />
      ) : loading && !data ? (
        <PanelLoading label="Loading notifications…" />
      ) : rows.length === 0 ? (
        <PanelEmpty>{emptyCopy}</PanelEmpty>
      ) : (
        <div className="flex flex-col gap-1.5 p-3">
          {rows.map((row) => (
            <NotificationCard key={row.id} row={row} seen={isSeen(row)} />
          ))}
        </div>
      )}
    </PanelShell>
  );
}
