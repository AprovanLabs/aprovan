/**
 * Deterministic letter-plus-color fallback icon (IW-9 decision D6).
 *
 * Dependency-free leaf module: same slug always yields the same letter and
 * palette color, on every surface (server-rendered and client-rendered)
 * that imports this file. The FNV-1a-32 constants below are pinned
 * (tech-plan T7) — do not change them, a second implementation of this
 * algorithm must be able to reproduce these exact values.
 */

const FNV_OFFSET_BASIS = 0x811c9dc5;
const FNV_PRIME = 0x01000193;

/** 32-bit FNV-1a over the given bytes, unsigned arithmetic throughout. */
function fnv1a32(bytes: Uint8Array): number {
  let hash = FNV_OFFSET_BASIS;
  for (const byte of bytes) {
    hash ^= byte;
    hash = Math.imul(hash, FNV_PRIME) >>> 0;
  }
  return hash >>> 0;
}

export const APP_ICON_PALETTE: readonly string[] = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#3b82f6",
  "#6366f1",
  "#a855f7",
  "#ec4899",
];

/**
 * Fallback icon for an app with no custom icon. Slugs are `NAME_RE`-
 * constrained to `[a-z0-9-]` (ASCII-only), so `slug[0]` is the first
 * character without any grapheme-cluster segmentation.
 */
export function appIconFallback(slug: string): { letter: string; color: string } {
  // Non-null: `hash % length` is always a valid index into the fixed palette.
  const letter = slug[0]!.toUpperCase();
  const hash = fnv1a32(new TextEncoder().encode(slug));
  const color = APP_ICON_PALETTE[hash % APP_ICON_PALETTE.length]!;
  return { letter, color };
}
