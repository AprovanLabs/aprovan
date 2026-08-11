/**
 * Client transport for vfs person/link shares (iw9-b stream 10).
 *
 * Procedures (stream 6 / #196):
 *   POST /tools/vfs/share          {path, expiresAt, person} | {path, expiresAt, link:true}
 *   POST /tools/vfs/shares.list    {}
 *   POST /tools/vfs/shares.revoke  {shareId}
 *
 * Anonymous read: GET /share/:key (gateway-relative via GATEWAY_BASE).
 */

import { GATEWAY_BASE } from "@/lib/gateway";
import { gatewayFetch } from "@/lib/gateway-fetch";
import { createRegistryGatewayClient } from "@/lib/gateway";
import { invokeNamespaceTool } from "@/lib/tools";
import {
  NO_EXPIRY_ISO,
  type ExpiryChoice,
  type ShareFilePayload,
  type VfsShare,
  type WorkspaceMember,
} from "./types";

const invokeVfs = invokeNamespaceTool("vfs");

export function expiresAtFromChoice(choice: ExpiryChoice, now = new Date()): string {
  if (choice === "none") return NO_EXPIRY_ISO;
  const days = choice === "7d" ? 7 : choice === "30d" ? 30 : 90;
  const at = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return at.toISOString();
}

/** Public share URL shown to the sharer once (SPA path; gateway serves the bytes). */
export function shareUrlForKey(key: string): string {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/share/${encodeURIComponent(key)}`;
}

export async function createPersonShare(args: {
  path: string;
  person: string;
  expiresAt?: string;
}): Promise<VfsShare> {
  const data = await invokeVfs("share", {
    path: args.path,
    person: args.person,
    expiresAt: args.expiresAt ?? NO_EXPIRY_ISO,
  });
  return data as VfsShare;
}

export async function createLinkShare(args: {
  path: string;
  expiresAt: string;
}): Promise<{ shareId: string; key: string; share: VfsShare }> {
  const data = await invokeVfs("share", {
    path: args.path,
    expiresAt: args.expiresAt,
    link: true,
  });
  return data as { shareId: string; key: string; share: VfsShare };
}

export async function listSharesCreated(): Promise<VfsShare[]> {
  const data = (await invokeVfs("shares.list", {})) as { shares?: VfsShare[] };
  return data.shares ?? [];
}

/**
 * Shares received by the current user.
 *
 * Stream 6 only wired `shares.list` (created-by). The store already has
 * `listSharesReceivedBy`; this calls the natural `shares.received` op so the
 * UI is ready when the server registers it. Until then the listing surfaces
 * its load-failure + retry state.
 */
export async function listSharesReceived(): Promise<VfsShare[]> {
  const data = (await invokeVfs("shares.received", {})) as { shares?: VfsShare[] };
  return data.shares ?? [];
}

export async function revokeShare(shareId: string): Promise<VfsShare> {
  const data = await invokeVfs("shares.revoke", { shareId });
  return data as VfsShare;
}

/**
 * Anonymous link landing fetch. Expired / revoked / never-existed all look
 * the same to the caller (null) — never distinguish them.
 */
export async function fetchSharedFile(key: string): Promise<ShareFilePayload | null> {
  if (!key || !GATEWAY_BASE) return null;
  try {
    const res = await gatewayFetch(`${GATEWAY_BASE}/share/${encodeURIComponent(key)}`);
    if (!res.ok) return null;
    const body = (await res.json()) as ShareFilePayload & { error?: string };
    if (!body.path || typeof body.content !== "string") return null;
    return body;
  } catch {
    return null;
  }
}

/** Soft-load workspace members for the person-share combobox (admin-only; ignore failures). */
export async function loadWorkspaceMembers(): Promise<WorkspaceMember[]> {
  try {
    const client = createRegistryGatewayClient();
    const data = await client.request<{ members?: WorkspaceMember[] }>("/members");
    return data.members ?? [];
  } catch {
    return [];
  }
}

export function formatShareDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function isNoExpiry(expiresAt: string): boolean {
  return expiresAt.startsWith("9999-");
}

export function shareStatus(
  share: VfsShare,
  revokeFailed: boolean,
  now = new Date(),
): "active" | "expired" | "revoked" | "revoke_failed" {
  if (revokeFailed) return "revoke_failed";
  if (share.revokedAt) return "revoked";
  const exp = new Date(share.expiresAt);
  if (!Number.isNaN(exp.getTime()) && exp.getTime() <= now.getTime()) return "expired";
  return "active";
}
