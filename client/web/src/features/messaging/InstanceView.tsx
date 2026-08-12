/**
 * Instance view — channel rail / timeline / thread pane + ux.md states.
 *
 * States: loading, empty channel, empty instance, reconnecting, reconciling,
 * over-cap, access revoked, deleted instance.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChatTimelineAdapterHandle } from "./adapter";
import { isStorageCapError } from "./errors";
import { ChannelRail } from "./ChannelRail";
import { Composer } from "./Composer";
import {
  PresenceTypingBar,
  useAdapterPresence,
} from "./PresenceTyping";
import { TimelinePane } from "./TimelinePane";
import { ThreadPane } from "./ThreadPane";
import type { Channel, ConnectionState, Message } from "./schema";
import { cn } from "@/lib/utils";

const WINDOW_LIMIT = 50;

export type InstanceViewRole = "host" | "guest" | "participant";

export type InstanceViewProps = {
  adapter: ChatTimelineAdapterHandle;
  /** Hosting fact chip copy, e.g. "Managed by Acme" / "Hosted by Ada". */
  hostingLabel?: string;
  /** Viewer role for empty-instance copy. */
  role?: InstanceViewRole;
  /** Terminal: instance was deleted by its host. */
  deleted?: boolean;
  /** Optional link target for host over-cap banner → Manage. */
  onOpenManage?: () => void;
  displayName?: (sub: string) => string;
  className?: string;
};

function dedupeById(messages: Message[]): Message[] {
  const seen = new Set<string>();
  const out: Message[] = [];
  for (const m of messages) {
    if (seen.has(m.id)) continue;
    seen.add(m.id);
    out.push(m);
  }
  return out;
}

function mergeWindows(older: Message[], newer: Message[]): Message[] {
  return dedupeById([...older, ...newer]).sort(
    (a, b) =>
      a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id),
  );
}

export function InstanceView({
  adapter,
  hostingLabel,
  role = "participant",
  deleted = false,
  onOpenManage,
  displayName,
  className,
}: InstanceViewProps) {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [historyExhausted, setHistoryExhausted] = useState(false);
  const [fetchingOlder, setFetchingOlder] = useState(false);
  const [connState, setConnState] = useState<ConnectionState>(() =>
    adapter.connectionState(),
  );
  const [sendError, setSendError] = useState<string | null>(null);
  const [overCap, setOverCap] = useState(false);
  const [accessRevoked, setAccessRevoked] = useState(false);
  const [threadRootId, setThreadRootId] = useState<string | null>(null);
  const presence = useAdapterPresence(adapter);
  const activeRef = useRef(activeChannelId);
  activeRef.current = activeChannelId;

  const loadChannels = useCallback(async () => {
    const list =
      adapter.cachedChannels().length > 0
        ? adapter.cachedChannels()
        : await adapter.listChannels();
    setChannels(list);
    setActiveChannelId((prev) => {
      if (prev && list.some((c) => c.id === prev)) return prev;
      return list[0]?.id ?? null;
    });
    return list;
  }, [adapter]);

  const loadWindow = useCallback(
    async (channelId: string) => {
      const window = await adapter.fetchWindow(channelId, {
        limit: WINDOW_LIMIT,
      });
      setMessages((prev) => {
        // Keep older pages already loaded; replace the live tail without blanking.
        const older = prev.filter(
          (m) => m.channelId === channelId && !window.some((w) => w.id === m.id),
        );
        return mergeWindows(older, window);
      });
      // Initial/reconcile window shorter than the limit ⇒ no older pages.
      if (window.length < WINDOW_LIMIT) setHistoryExhausted(true);
      return window;
    },
    [adapter],
  );

  useEffect(() => {
    adapter.start();
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const list = await loadChannels();
        if (cancelled) return;
        const first = list[0]?.id;
        if (first) await loadWindow(first);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    const poll = window.setInterval(() => {
      setConnState(adapter.connectionState());
    }, 200);

    const unsub = adapter.onEvent((e) => {
      if (e.kind === "message" && e.channelId === activeRef.current) {
        void loadWindow(e.channelId);
      }
      if (e.kind === "channel-membership") {
        void (async () => {
          const list = await loadChannels();
          const still = list.some((c) => c.id === e.channelId);
          if (!still && activeRef.current === e.channelId) {
            setAccessRevoked(true);
            setActiveChannelId(list[0]?.id ?? null);
            if (list[0]) await loadWindow(list[0].id);
          } else if (still && activeRef.current === e.channelId) {
            setAccessRevoked(false);
          }
        })();
      }
    });

    return () => {
      cancelled = true;
      window.clearInterval(poll);
      unsub();
      adapter.dispose();
    };
  }, [adapter, loadChannels, loadWindow]);

  useEffect(() => {
    if (!activeChannelId || accessRevoked) return;
    let cancelled = false;
    setLoading(true);
    setHistoryExhausted(false);
    setSendError(null);
    (async () => {
      try {
        await loadWindow(activeChannelId);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [activeChannelId, accessRevoked, loadWindow]);

  const channelMessages = useMemo(
    () =>
      messages.filter(
        (m) => m.channelId === activeChannelId && !m.parentId,
      ),
    [messages, activeChannelId],
  );

  const threadRoot = useMemo(
    () =>
      threadRootId
        ? messages.find((m) => m.id === threadRootId) ?? null
        : null,
    [messages, threadRootId],
  );

  const threadReplies = useMemo(
    () =>
      threadRootId
        ? messages.filter((m) => m.parentId === threadRootId)
        : [],
    [messages, threadRootId],
  );

  const fetchOlder = useCallback(async () => {
    if (!activeChannelId || fetchingOlder || historyExhausted) return;
    const oldest = channelMessages[0];
    if (!oldest) {
      setHistoryExhausted(true);
      return;
    }
    setFetchingOlder(true);
    try {
      const older = await adapter.fetchOlder(
        activeChannelId,
        oldest.id,
        WINDOW_LIMIT,
      );
      if (older.length === 0) setHistoryExhausted(true);
      setMessages((prev) => mergeWindows(older, prev));
    } finally {
      setFetchingOlder(false);
    }
  }, [
    activeChannelId,
    adapter,
    channelMessages,
    fetchingOlder,
    historyExhausted,
  ]);

  const send = useCallback(
    async (body: string, parentId?: string) => {
      if (!activeChannelId) return;
      setSendError(null);
      try {
        const msg = await adapter.send(activeChannelId, body, parentId);
        setMessages((prev) => mergeWindows(prev, [msg]));
        setOverCap(false);
      } catch (err) {
        if (isStorageCapError(err)) {
          setOverCap(true);
          setSendError(
            "Message not sent — this instance hit its storage cap. The host can raise it.",
          );
          return;
        }
        setSendError(
          err instanceof Error ? err.message : "Message not sent.",
        );
      }
    },
    [activeChannelId, adapter],
  );

  if (deleted) {
    return (
      <div
        className={cn(
          "flex h-full items-center justify-center p-8 text-center",
          className,
        )}
        data-testid="instance-deleted"
      >
        <p className="text-sm text-muted-foreground">
          This instance was deleted by its host.
        </p>
      </div>
    );
  }

  const emptyInstance = !loading && channels.length === 0;
  const connectionPill =
    connState === "reconnecting" || connState === "reconciling"
      ? connState
      : null;

  return (
    <div
      className={cn("flex h-full min-h-0 w-full flex-col", className)}
      data-testid="instance-view"
    >
      <header className="flex items-center justify-between border-b px-3 py-2">
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold">Chat</h1>
          {hostingLabel ? (
            <p
              className="truncate text-xs text-muted-foreground"
              data-testid="hosting-chip"
            >
              {hostingLabel}
            </p>
          ) : null}
        </div>
      </header>

      {overCap && (role === "host" || onOpenManage) ? (
        <div
          className="flex items-center gap-2 border-b bg-destructive/10 px-3 py-2 text-xs text-destructive"
          data-testid="over-cap-banner"
          role="status"
        >
          <span>This instance hit its storage cap.</span>
          {onOpenManage ? (
            <button
              type="button"
              className="underline"
              onClick={onOpenManage}
            >
              Manage
            </button>
          ) : null}
        </div>
      ) : null}

      {emptyInstance ? (
        <div
          className="flex flex-1 items-center justify-center p-8 text-center"
          data-testid="instance-empty"
        >
          <p className="text-sm text-muted-foreground">
            {role === "guest"
              ? "No channels shared with you yet"
              : "Create your first channel"}
          </p>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1">
          <ChannelRail
            channels={channels}
            activeChannelId={activeChannelId}
            presence={presence}
            loading={loading && channels.length === 0}
            emptyLabel={
              role === "guest"
                ? "No channels shared with you yet"
                : "Create your first channel"
            }
            onSelect={(id) => {
              setAccessRevoked(false);
              setThreadRootId(null);
              setActiveChannelId(id);
            }}
            displayName={displayName}
          />

          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            {accessRevoked ? (
              <div
                className="flex flex-1 items-center justify-center p-8 text-center"
                data-testid="access-revoked"
              >
                <p className="text-sm text-muted-foreground">
                  You no longer have access to this channel
                </p>
              </div>
            ) : (
              <>
                <TimelinePane
                  channelId={activeChannelId}
                  messages={channelMessages}
                  loading={loading}
                  connectionPill={connectionPill}
                  fetchOlder={fetchOlder}
                  hasOlderMessages={!historyExhausted}
                  isFetchingOlder={fetchingOlder}
                  onOpenThread={(id) => setThreadRootId(id)}
                />
                <PresenceTypingBar
                  adapter={adapter}
                  channelId={activeChannelId}
                  displayName={displayName}
                />
                <Composer
                  autoFocus={!loading && channelMessages.length === 0}
                  disabled={!activeChannelId}
                  error={sendError}
                  onSend={(body) => send(body)}
                  onTyping={() => {
                    if (activeChannelId) adapter.signalTyping(activeChannelId);
                  }}
                />
              </>
            )}
          </div>

          {threadRoot && !accessRevoked ? (
            <ThreadPane
              root={threadRoot}
              replies={threadReplies}
              onClose={() => setThreadRootId(null)}
              sendError={sendError}
              onSendReply={(body) => send(body, threadRoot.id)}
              onTyping={() => {
                if (activeChannelId) adapter.signalTyping(activeChannelId);
              }}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
