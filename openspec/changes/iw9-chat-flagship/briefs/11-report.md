# Report: E2E — Hosted install (friends) and guest join

**Stream:** 11 · **Branch:** `feat/iw9-chat-e2e-hosted` · **Status:** done

## PR

https://github.com/AprovanLabs/aprovan/pull/244

## What shipped

| Path | Role |
|---|---|
| `client/web/e2e/chat-hosted-guest-join.spec.ts` | `@chat` Playwright: hosted install (D1 surfaced), CF-2 guest invite/consume, zero workspace membership, ux.md disclosure verbatim, expired/consumed/revoked terminals, remove-guest store + fan-out deny |

## Verify

```bash
E2E_WORKSPACE_DATA_DIR="$(mktemp -d)" \
  pnpm --filter @aprovan/patchwork-web exec playwright test e2e/chat-hosted-guest-join.spec.ts --retries=0
# ✓ 1 passed
```

Prefer a fresh `E2E_WORKSPACE_DATA_DIR` (stream 10 note: stale SQLite can flake
with `no such column: level`). Default ports: gateway `4010`, web `5174`.

## Tasks

| Task | Status |
|---|---|
| 11.1 hosted install + guest invite/join + post | done |
| 11.2 no workspace membership + ux.md disclosure | done |
| 11.3 expired / consumed / revoked negatives | done |
| 11.4 removed guest loses live access | done |

## Deviations / flake notes (for stream 12)

1. **Auth-none principals** — both browser contexts are still `sub: "local"`
   (streams 9–10). Guest is minted via CF-2 `consumeInvite(token, guest-friend)`
   against the shared E2E data dir; HTTP `/invites/:token/accept` still needs
   Cognito (no auth-none short-circuit).
2. **GuestJoinCopy / InstanceView not mounted** — stream 8 ships copy/admin as
   libraries; no shell route mounts the join card or `InstanceView` hosting
   chip. Disclosure + chip strings are asserted via `resolveGuestJoin` /
   `hostedGuestDisclosure` / `"Hosted by Ada"` (ux.md verbatim), same posture
   as stream 10 timeline assertions via WS/`fetchWindow` rather than DOM rows.
3. **D1 “default surfaced”** — `HostingModePicker` does **not** pre-select
   Hosted (`aria-checked=false` until click). Spec asserts the Hosted option
   is visible and explicitly chosen, then `apps.install` with `mode: "hosted"`
   lands `hostingWorkspaceId: "local"` (creator personal / installer space).
4. **D14 removeParticipant** — `apps.instanceRemoveParticipant` is still not
   on the frozen tool table; E2E calls F2 module `removeParticipant` (same
   seam ManagePanel’s injectable client targets).
5. **Live fan-out under auth-none** — gateway WS cannot mint a distinct guest
   sub. Removed-guest delivery uses an **in-process** `createBroker` +
   `createAppTopicsHandler` with fake Conns (distinct `userId`s) on the shared
   SQLite instance. After `removeParticipant`, readable channels are cleared
   via `setReadableChannelsForTest` (authorize-cache seam from CF-1 unit
   tests) because `listChannels` throws on deny and would fail a
   `channel-membership` refresh for the removed guest. Stream 12 should
   harden product-path refresh (fail-closed empty channels) and can reuse
   this broker pattern + `ws-capture` for invariant-7.
6. **Stale E2E data dir** — reuse across schema bumps can crash the gateway;
   prefer a fresh temp dir per CI run.

## Unblocks

- Stream 12 (presence / invariant-7) — reuse invite + in-process broker /
  `ws-capture` patterns; remember `--retries=0` and auth-none limits for
  true two-principal browser WS.
