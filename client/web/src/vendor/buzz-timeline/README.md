# Vendored buzz timeline (Apache-2.0)

Presentational `MessageTimeline` + scroll-anchoring hooks lifted from
[block/buzz](https://github.com/block/buzz) for Chat timeline quality
(IW-9 D24 / tech-plan T2).

## Upstream

| Field | Value |
| --- | --- |
| Repository | https://github.com/block/buzz |
| Commit SHA | `4b3570671eb2786594267758af18784ac6e82972` |
| Paths | `desktop/src/features/messages/ui/{MessageTimeline,useAnchoredScroll,useLoadOlderOnScroll,useVirtualizedBottomSettle,useTimelineRetention,anchoredScrollPolicy,useVirtualizedViewportResize,timelineRetention}.*` plus `classifyTimelineMessageDelta` from `lib/timelineSnapshot.ts` |
| License | Apache-2.0 — see `LICENSE` |
| Virtua | `virtua@0.49.3` pinned with buzz's `patches/virtua@0.49.3.patch` (stable upward-history prepend). **Do not bump virtua without re-validating the patch** — exclude from renovate/dependabot. |

## What was copied verbatim (import paths only)

- `useAnchoredScroll.ts`
- `useLoadOlderOnScroll.ts`
- `useVirtualizedBottomSettle.ts`
- `useTimelineRetention.ts`
- `timelineRetention.ts`
- `useVirtualizedViewportResize.ts`
- `anchoredScrollPolicy.ts`
- `classifyTimelineMessageDelta` (from `timelineSnapshot.ts`)

Upstream `MessageTimeline.tsx` is preserved byte-for-byte at
`upstream/MessageTimeline.tsx.source` for audit.

## Divergences (dated)

**2026-08-12 — presentational MessageTimeline shell.** Upstream
`MessageTimeline.tsx` is not a drop-in presentational module: it transitively
imports Nostr-coupled row UI, channel chrome, huddle/video-review surfaces, and
buzz shared components (D24: do not adopt Nostr / buzz composer / relay). The
shipped `MessageTimeline.tsx` keeps the hook + patched-virtua wiring and the
host-facing prop surface stream 7 needs (`messages`, fetch-older, target scroll,
`renderMessage`), and leaves Chat row chrome to the host via `renderMessage`.
This is an intentional, documented adaptation — not a silent fork of the hook
cluster.

**2026-08-12 — `timelineSnapshot.ts` trimmed.** Only
`classifyTimelineMessageDelta` (required by `useAnchoredScroll`) is vendored;
day-divider / intro-surface helpers that depended on buzz `dateFormatters` were
omitted. Import path for `TimelineMessage` points at local `./types`.

**2026-08-12 — `types.ts`.** Minimal `TimelineMessage` / `TimelineReaction`
types from buzz `types.ts` so the hooks typecheck without the rest of the
messages feature module.

**2026-08-12 — React 19 / strict-null tweaks on hooks.** Aprovan's
`RefObject` typing and `strictNullChecks` required two one-line guards that
buzz's desktop tsconfig does not surface:
`useVirtualizedBottomSettle` uses `(itemsLengthRef.current ?? 0)`;
`useVirtualizedViewportResize` coalesces `virtualizerAtBottomRef.current ?? false`.
