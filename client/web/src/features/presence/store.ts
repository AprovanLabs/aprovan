/**
 * Client-wide file presence: one RealtimeClient, per-open-tab subscriptions,
 * focus from active tab + document visibility. Spec: file-presence.
 */

import { currentUserSub } from "@/lib/notifications";
import { GATEWAY_BASE } from "@/lib/gateway";
import {
  createRealtimeClient,
  type RealtimeClient,
  type RealtimeState,
} from "@/lib/realtime";
import { isVirtualTabPath } from "@/features/tabs/tab-routing";
import { memberDisplayName } from "./names";
import type { FilePeer, PresenceDelta, PresenceRosterSnapshot } from "./types";

function presenceTopic(path: string): string {
  return `presence:${path}`;
}

function isFilePeerEntry(value: unknown): value is FilePeer {
  if (!value || typeof value !== "object") return false;
  const p = value as Record<string, unknown>;
  return (
    typeof p.userId === "string" &&
    typeof p.path === "string" &&
    typeof p.lastActive === "string"
  );
}

function parseSnapshot(body: unknown): FilePeer[] {
  if (!body || typeof body !== "object") return [];
  const peers = (body as PresenceRosterSnapshot).peers;
  if (!Array.isArray(peers)) return [];
  return peers.filter(isFilePeerEntry);
}

function parseDelta(body: unknown): PresenceDelta | null {
  if (!body || typeof body !== "object") return null;
  const d = body as PresenceDelta;
  if (
    (d.kind === "join" || d.kind === "leave" || d.kind === "update") &&
    isFilePeerEntry(d.peer)
  ) {
    return d;
  }
  return null;
}

const EMPTY_PEERS: FilePeer[] = [];
const EMPTY_TITLE_MAP: Map<string, string> = new Map();

class PresenceStore {
  private client: RealtimeClient | null = null;
  /** path → userId → peer */
  private rosters = new Map<string, Map<string, FilePeer>>();
  private unsubs = new Map<string, () => void>();
  private listeners = new Set<() => void>();
  private openPaths: string[] = [];
  private activeTabPath: string | null = null;
  private visible =
    typeof document !== "undefined" ? document.visibilityState === "visible" : true;
  private focusedPath: string | null = null;
  private socketState: RealtimeState = "closed";
  /** Cached filtered peer lists per path (stable until emit). */
  private peersCache = new Map<string, FilePeer[]>();
  private titleMapCache: Map<string, string> = EMPTY_TITLE_MAP;

  subscribe = (cb: () => void): (() => void) => {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  };

  isConnected(): boolean {
    return this.socketState === "open";
  }

  /** Peers for a path with self filtered out; empty when disconnected. */
  getPeers(path: string): FilePeer[] {
    if (this.socketState !== "open") return EMPTY_PEERS;
    const cached = this.peersCache.get(path);
    if (cached) return cached;
    return EMPTY_PEERS;
  }

  getTitleMap(): Map<string, string> {
    if (this.socketState !== "open") return EMPTY_TITLE_MAP;
    return this.titleMapCache;
  }

  /** Drive subscriptions + focus from the tab strip. */
  syncTabs(openTabPaths: Iterable<string>, activeTabPath: string | null): void {
    this.ensureClient();
    const nextOpen = [...openTabPaths].filter((p) => !isVirtualTabPath(p));
    this.openPaths = nextOpen;
    this.activeTabPath = activeTabPath;
    this.reconcileSubscriptions();
    this.syncFocus();
  }

  setVisible(visible: boolean): void {
    if (this.visible === visible) return;
    this.visible = visible;
    this.syncFocus();
  }

  private rebuildCaches(): void {
    this.peersCache.clear();
    if (this.socketState !== "open") {
      this.titleMapCache = EMPTY_TITLE_MAP;
      return;
    }
    const self = currentUserSub();
    const titles = new Map<string, string>();
    for (const [path, roster] of this.rosters) {
      const peers: FilePeer[] = [];
      for (const peer of roster.values()) {
        if (self && peer.userId === self) continue;
        peers.push(peer);
      }
      if (peers.length > 0) {
        this.peersCache.set(path, peers);
        titles.set(
          path,
          peers.map((p) => memberDisplayName(p.userId)).join(", "),
        );
      }
    }
    this.titleMapCache = titles.size > 0 ? titles : EMPTY_TITLE_MAP;
  }

  private emit(): void {
    this.rebuildCaches();
    for (const cb of this.listeners) cb();
  }

  private ensureClient(): void {
    if (this.client || !GATEWAY_BASE) return;
    this.client = createRealtimeClient();
    this.socketState = this.client.state;
    this.client.onStateChange((state) => {
      this.socketState = state;
      if (state === "closed") {
        this.rosters.clear();
        this.focusedPath = null;
        this.emit();
        return;
      }
      if (state === "open") {
        // Live subs resubscribe inside RealtimeClient; re-announce focus.
        this.focusedPath = null;
        this.syncFocus();
        this.emit();
      }
    });
  }

  private reconcileSubscriptions(): void {
    if (!this.client) return;
    const want = new Set(this.openPaths);
    for (const path of [...this.unsubs.keys()]) {
      if (!want.has(path)) {
        this.unsubs.get(path)?.();
        this.unsubs.delete(path);
        this.rosters.delete(path);
      }
    }
    for (const path of want) {
      if (this.unsubs.has(path)) continue;
      const topic = presenceTopic(path);
      const unsub = this.client.subscribe(
        topic,
        (body) => this.applyDelta(path, body),
        (body) => this.applySnapshot(path, body),
      );
      this.unsubs.set(path, unsub);
    }
    this.emit();
  }

  private applySnapshot(path: string, body: unknown): void {
    const peers = parseSnapshot(body);
    const map = new Map<string, FilePeer>();
    for (const peer of peers) map.set(peer.userId, peer);
    this.rosters.set(path, map);
    this.emit();
  }

  private applyDelta(path: string, body: unknown): void {
    const delta = parseDelta(body);
    if (!delta) return;
    let map = this.rosters.get(path);
    if (!map) {
      map = new Map();
      this.rosters.set(path, map);
    }
    if (delta.kind === "leave") {
      map.delete(delta.peer.userId);
    } else {
      map.set(delta.peer.userId, delta.peer);
    }
    this.emit();
  }

  private desiredFocus(): string | null {
    if (!this.visible) return null;
    const active = this.activeTabPath;
    if (!active || isVirtualTabPath(active)) return null;
    return active;
  }

  private syncFocus(): void {
    if (!this.client || this.socketState !== "open") return;
    const next = this.desiredFocus();
    if (next === this.focusedPath) return;
    if (next) {
      this.client.publish(presenceTopic(next), { action: "focus" });
      this.focusedPath = next;
    } else if (this.focusedPath) {
      this.client.publish(presenceTopic(this.focusedPath), { action: "blur" });
      this.focusedPath = null;
    }
  }
}

export const presenceStore = new PresenceStore();
