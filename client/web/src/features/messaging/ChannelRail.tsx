/**
 * Channel rail — lock badge on restricted, presence dots, unread markers.
 */

import { Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Channel, InstancePresence } from "./schema";
import { PresenceDot, rosterOnline, rosterTooltip } from "./PresenceTyping";

export type ChannelRailProps = {
  channels: Channel[];
  activeChannelId: string | null;
  presence: InstancePresence;
  /** channelId → unread count (optional). */
  unread?: Record<string, number>;
  loading?: boolean;
  emptyLabel?: string;
  onSelect: (channelId: string) => void;
  displayName?: (sub: string) => string;
  className?: string;
};

export function ChannelRail({
  channels,
  activeChannelId,
  presence,
  unread = {},
  loading = false,
  emptyLabel = "No channels yet",
  onSelect,
  displayName,
  className,
}: ChannelRailProps) {
  return (
    <nav
      className={cn(
        "flex h-full w-56 shrink-0 flex-col border-r bg-muted/30",
        className,
      )}
      data-testid="channel-rail"
      aria-label="Channels"
    >
      <div className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Channels
      </div>
      {loading ? (
        <div className="space-y-2 px-2" data-testid="channel-rail-skeleton">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-8 animate-pulse rounded-md bg-muted"
            />
          ))}
        </div>
      ) : channels.length === 0 ? (
        <p className="px-3 py-2 text-sm text-muted-foreground">{emptyLabel}</p>
      ) : (
        <ul className="flex-1 space-y-0.5 overflow-y-auto px-1 pb-2">
          {channels.map((ch) => {
            const active = ch.id === activeChannelId;
            const online = rosterOnline(
              presence,
              ch.kind === "restricted" ? ch.members : undefined,
            );
            const count = unread[ch.id] ?? 0;
            return (
              <li key={ch.id}>
                <button
                  type="button"
                  data-testid={`channel-rail-item-${ch.id}`}
                  data-active={active ? "true" : undefined}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/60",
                  )}
                  onClick={() => onSelect(ch.id)}
                >
                  <span className="min-w-0 flex-1 truncate">
                    {ch.kind === "restricted" ? (
                      <Lock
                        className="mr-1 inline h-3 w-3 opacity-70"
                        aria-label="Restricted"
                      />
                    ) : (
                      <span className="mr-1 text-muted-foreground">#</span>
                    )}
                    {ch.name}
                  </span>
                  <PresenceDot
                    online={online}
                    title={rosterTooltip(presence, displayName)}
                  />
                  {count > 0 ? (
                    <Badge
                      variant="secondary"
                      className="h-5 min-w-5 justify-center px-1 text-[10px]"
                      data-testid={`channel-unread-${ch.id}`}
                    >
                      {count > 99 ? "99+" : count}
                    </Badge>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
