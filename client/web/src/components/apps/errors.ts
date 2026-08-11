/**
 * Parse apps.install / apps.promote error messages into UI-actionable shapes.
 * Server messages (stream 6) are the contract — no structured error payload yet.
 */

import type { HostingBucket } from "./hosting";

export type InstallErrorKind =
  | { kind: "hosting-required"; options: HostingBucket[] }
  | { kind: "slug-collision"; message: string }
  | { kind: "generic"; message: string };

const BUCKET_RE = /\b(managed|hosted)\b/g;

/** Extract managed/hosted options listed after "options:" or in a comma list. */
export function parseDeclaredHostingOptions(message: string): HostingBucket[] | null {
  const lower = message.toLowerCase();
  if (
    !lower.includes("hosting mode required") &&
    !lower.includes("hosting must be") &&
    !lower.includes("options:")
  ) {
    // Still accept a bare "options: managed, hosted" fragment from 400 bodies.
    if (!/options:\s*(managed|hosted)/i.test(message)) return null;
  }
  const found = new Set<HostingBucket>();
  for (const match of message.matchAll(BUCKET_RE)) {
    found.add(match[1] as HostingBucket);
  }
  if (found.size === 0) return null;
  return (["managed", "hosted"] as const).filter((b) => found.has(b));
}

export function isSlugCollisionMessage(message: string): boolean {
  const lower = message.toLowerCase();
  return (
    lower.includes("choose an explicit slug") ||
    lower.includes("conflicts with an existing app root") ||
    /app name ".+" is already held/i.test(message) ||
    lower.includes("slug") && lower.includes("already")
  );
}

export function classifyInstallError(error: unknown): InstallErrorKind {
  const message = error instanceof Error ? error.message : String(error ?? "Install failed");
  const options = parseDeclaredHostingOptions(message);
  if (options && options.length > 0) {
    return { kind: "hosting-required", options };
  }
  if (isSlugCollisionMessage(message)) {
    return { kind: "slug-collision", message };
  }
  return { kind: "generic", message };
}

export function classifyPromoteError(
  error: unknown,
): { kind: "slug-collision"; message: string } | { kind: "generic"; message: string } {
  const message = error instanceof Error ? error.message : String(error ?? "Promote failed");
  if (isSlugCollisionMessage(message)) {
    return { kind: "slug-collision", message };
  }
  return { kind: "generic", message };
}

export function isLocalEditsGuardMessage(message: string): boolean {
  const lower = message.toLowerCase();
  return lower.includes("local edits") && lower.includes("confirmoverwrite");
}
