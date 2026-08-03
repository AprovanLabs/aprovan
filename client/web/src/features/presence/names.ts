/**
 * Resolve presence userIds → display names / initials.
 * Soft-loads `/members` when possible; falls back to neutral "Member".
 */

import { createRegistryGatewayClient } from "@/lib/gateway";

const names = new Map<string, string>();
let loadStarted = false;

export function memberDisplayName(userId: string): string {
  return names.get(userId) ?? "Member";
}

export function memberInitials(userId: string): string {
  const name = names.get(userId);
  if (name && name !== "Member") {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  // Deterministic glyph from userId when the directory has no display name.
  const cleaned = userId.replace(/[^a-zA-Z0-9]/g, "");
  if (cleaned.length >= 2) return cleaned.slice(0, 2).toUpperCase();
  return "·";
}

/** Best-effort member directory load (admin-only endpoint; ignore failures). */
export function ensureMemberNamesLoaded(): void {
  if (loadStarted) return;
  loadStarted = true;
  try {
    const client = createRegistryGatewayClient();
    void client
      .request<{ members: Array<{ userId: string }> }>("/members")
      .then((data: { members?: Array<{ userId: string }> }) => {
        for (const m of data.members ?? []) {
          if (!names.has(m.userId)) names.set(m.userId, "Member");
        }
        notifyNameListeners();
      })
      .catch(() => {});
  } catch {
    // Gateway not ready — stay on fallbacks.
  }
}

const nameListeners = new Set<() => void>();

export function subscribeMemberNames(cb: () => void): () => void {
  nameListeners.add(cb);
  return () => {
    nameListeners.delete(cb);
  };
}

function notifyNameListeners(): void {
  for (const cb of nameListeners) cb();
}

/** Deterministic hue (0–359) from userId — stable across sessions. */
export function hueFromUserId(userId: string): number {
  let h = 2166136261;
  for (let i = 0; i < userId.length; i++) {
    h ^= userId.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 360;
}
