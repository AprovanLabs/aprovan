# Report: Guest UX and host administration surface

**Stream:** 8 · **Branch:** `feat/iw9-chat-guest-ux` · **Status:** done

## What shipped

- `client/web/src/features/messaging/guest/` — invite issuance
  (`InviteGuestForm`, `PendingInvitesList`), trusted-shell join payload
  (`resolveGuestJoin` + `GuestJoinCopy` — copy only, no custom widget),
  leave/remove lifecycle buttons, verbatim ux.md copy helpers.
- `client/web/src/features/messaging/admin/` — `ManagePanel` (storage meter
  with as-of stamp, cap editor + below-usage warning, typed delete,
  hosted guest invites/participants), `CoworkerPicker` (members-only +
  managed non-member guidance), `apps.instance*` host client.
- `client/web/src/lib/__tests__/chat-guest-join.test.ts` — sign-in gate,
  distinct terminal reasons, already-participant skip, hosted disclosure
  snapshot.

## Verify

```text
pnpm --filter @aprovan/patchwork-web exec vitest run src/features/messaging/guest src/features/messaging/admin
# 2 files / 9 tests pass

pnpm --filter @aprovan/patchwork-web exec vitest run src/lib/__tests__/chat-guest-join.test.ts
# 4 tests pass (also covered when run alongside guest/admin)

pnpm --filter @aprovan/patchwork-web typecheck
# pass
```

## Unblocks

- **Stream 11** (hosted guest E2E) — join copy / Manage panel / invite UI
  surfaces to drive from Playwright.
- Guest lifecycle UI wired; live fan-out after remove remains stream 12.

## Deviations

See `briefs/deviations.md` stream 8 (D13–D14): F2 `apps.instance*` host
procedures and `instanceRemoveParticipant` not on main yet — UI calls the
frozen procedure names via injectable clients.

## PR

(filled after open)
