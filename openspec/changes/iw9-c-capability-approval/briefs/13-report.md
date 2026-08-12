# Report: stream 13 — client review surface + install/JIT cards

**Status:** done  
**PR:** https://github.com/AprovanLabs/aprovan/pull/249  
**Branch:** `feat/iw9-c-client-review`  
**Verify:** `pnpm --filter @aprovan/patchwork-web test -- review-surface` — 14 passed

## What landed

| Task | Result |
|------|--------|
| 13.1 | `features/notifications/PayloadWidgetHost` — shared host; production wiring via `NotificationPayloadHost` / `notificationSandboxRenderer` reuses `NotificationPathWidget` (same iframe sandbox). Mount/compile failure → silent `GenericPayloadCard`; decisions stay on the shell. |
| 13.2 | `ReviewItemShell` + `ReviewItemDetail` — chrome only from `ReviewItem.shell`; payload edits call `applyClientPayloadEdit` then `shellStale` gates buttons until the shell re-renders. |
| 13.3 | `CredentialLevelBadge` / shell sentence / `CredentialNotConnectedPrompt` — fixed strings + distinct icons/colors; never "connect a credential". |
| 13.4 | `InstallCard` (rows, badges, undeclared/unused, Send to admins, resources-come-later); `JitCard` (Allow once / Allow pattern + matcher coverage / Deny); `matchesResourcePattern` mirrored from published 0.2.11 algorithm. |
| 13.5 | `ReviewSurfacePanel` (kind tabs + counts, list/detail, bulk gated by `(app, capability)`, expiry &lt;24h); `RevocationBlastDialog`. |
| 13.6 | `review-surface.test.tsx` — 14 cases covering shell gate, generic fallback, credential copy, bulk mixed-group disable, install + matcher. |

## Client module map

```
features/notifications/
  PayloadWidgetHost.tsx          # core host + generic fallback
  NotificationPayloadHost.tsx    # wires NotificationPathWidget
  NotificationShellCard.tsx      # choices in shell
  GenericPayloadCard.tsx

features/review-surface/
  types.ts                       # ReviewItem wire + applyClientPayloadEdit / canBulkAct
  ReviewItemShell.tsx
  ReviewItemDetail.tsx
  ReviewSurfacePanel.tsx
  CredentialLevelBadge.tsx
  ResourcePatternInput.tsx
  RevocationBlastDialog.tsx
  review-surface.test.tsx

features/capability-cards/
  InstallCard.tsx
  JitCard.tsx
  matches-resource-pattern.ts    # mirrors @aprovan/registry-server 0.2.11
```

Pass `renderSandbox={notificationSandboxRenderer}` (or use `NotificationPayloadHost`) when mounting widgets in production hosts.

## Verify

```text
pnpm --filter @aprovan/patchwork-web test -- review-surface
→ 14 passed
```

## Deviations

1. **`matchesResourcePattern` vendored** — patchwork-web cannot add `@aprovan/registry-server` under this stream's Touches (no `package.json` edits). Algorithm copied from published `0.2.11` `dispatch/resource-pattern.js`. Follow-up: depend on the package and delete the mirror.
2. **Partial-segment email globs** (e.g. `*@example.org`) still do not match under the published segment rules (stream 3 known limit) — UI coverage preview uses whole-segment patterns (`*`, `mailto:*`, URL paths).
3. **No app-shell wiring** — ChatPage / sidebar / NotificationsBell remain outside Touches. Components are export-ready; hosts must pass `renderSandbox` and feed `listReviewItems` from stream 12.
4. **Brief `13-client-review-cards.md`** lives untracked on the main checkout and was not on `origin/main` at branch creation — report + tasks.md checkoffs land in this PR.

## Unblocks

Stream 14 (grep-gate / DoD). Wire review panel into sidebar + notification drawer in a follow-up that is allowed to touch pages/components.
