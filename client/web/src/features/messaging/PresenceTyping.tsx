/**
 * Presence dots + "{n} people are typing…" — reads adapter only (ux.md).
 * Typing signals expire ~4s client-side after the last signal.
 */

import { useEffect, useState } from "react";
import type { ChatTimelineAdapter } from "./adapter";
import type { ChatRealtimeEvent, InstancePresence } from "./schema";
import { cn } from "@/lib/utils";

const TYPING_TTL_MS = 4_000;

export type PresenceTypingProps = {
  adapter: ChatTimelineAdapter;
  channelId: string | null;
  /** Optional display-name resolver; defaults to the raw sub. */
  displayName?: (sub: string) => string;
  className?: string;
};

export function useAdapterPresence(adapter: ChatTimelineAdapter): InstancePresence {
  const [presence, setPresence] = useState(() => adapter.presence());
  useEffect(() => {
    setPresence(adapter.presence());
    return adapter.onEvent((e: ChatRealtimeEvent) => {
      if (e.kind === "presence") setPresence({ roster: e.roster });
    });
  }, [adapter]);
  return presence;
}

export function useChannelTypers(
  adapter: ChatTimelineAdapter,
  channelId: string | null,
): string[] {
  const [typers, setTypers] = useState<Map<string, number>>(() => new Map());

  useEffect(() => {
    setTypers(new Map());
    if (!channelId) return;

    const unsub = adapter.onEvent((e) => {
      if (e.kind !== "typing" || e.channelId !== channelId) return;
      setTypers((prev) => {
        const next = new Map(prev);
        next.set(e.sub, Date.now() + TYPING_TTL_MS);
        return next;
      });
    });

    const timer = window.setInterval(() => {
      const now = Date.now();
      setTypers((prev) => {
        let changed = false;
        const next = new Map<string, number>();
        for (const [sub, exp] of prev) {
          if (exp > now) next.set(sub, exp);
          else changed = true;
        }
        return changed || next.size !== prev.size ? next : prev;
      });
    }, 500);

    return () => {
      unsub();
      window.clearInterval(timer);
    };
  }, [adapter, channelId]);

  return [...typers.keys()];
}

export function PresenceDot({
  online,
  title,
  className,
}: {
  online: boolean;
  title?: string;
  className?: string;
}) {
  if (!online) return null;
  return (
    <span
      className={cn(
        "inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-500",
        className,
      )}
      title={title}
      aria-label={title ?? "Online"}
      data-testid="presence-dot"
    />
  );
}

export function TypingIndicator({
  typers,
  displayName = (s) => s,
  className,
}: {
  typers: string[];
  displayName?: (sub: string) => string;
  className?: string;
}) {
  if (typers.length === 0) return null;
  const text =
    typers.length === 1
      ? `${displayName(typers[0]!)} is typing…`
      : `${typers.length} people are typing…`;
  return (
    <p
      className={cn("px-3 py-1 text-xs text-muted-foreground", className)}
      data-testid="typing-indicator"
    >
      {text}
    </p>
  );
}

export function PresenceTypingBar({
  adapter,
  channelId,
  displayName,
  className,
}: PresenceTypingProps) {
  const typers = useChannelTypers(adapter, channelId);
  return (
    <TypingIndicator
      typers={typers}
      displayName={displayName}
      className={className}
    />
  );
}

/** True when any roster member is considered present for a channel rail dot. */
export function rosterOnline(
  presence: InstancePresence,
  memberSubs: string[] | undefined,
): boolean {
  if (!memberSubs || memberSubs.length === 0) {
    return presence.roster.length > 0;
  }
  const online = new Set(presence.roster.map((r) => r.sub));
  return memberSubs.some((s) => online.has(s));
}

export function rosterTooltip(
  presence: InstancePresence,
  displayName: (sub: string) => string = (s) => s,
): string {
  if (presence.roster.length === 0) return "Nobody online";
  return presence.roster.map((r) => displayName(r.sub)).join(", ");
}
