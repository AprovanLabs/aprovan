# Report: E2E — Managed install (company)

**Stream:** 10 · **Branch:** `feat/iw9-chat-e2e-managed` · **Status:** done

## What shipped

| Path | Role |
|---|---|
| `client/web/e2e/chat-managed-install.spec.ts` | `@chat` Playwright flow: workspace invites ≥2 members, Chat managed install + host-mode prompt, channel/thread exchange, timeline id convergence, `saveInstall` immutability, F2 shared-partition read |

## Verify

```bash
pnpm --filter @aprovan/patchwork-web exec playwright test e2e/chat-managed-install.spec.ts --retries=0
# ✓ 1 passed
```

Use a fresh `E2E_WORKSPACE_DATA_DIR` if a prior suite left a stale SQLite schema
(`no such column: level` on reuse). Default ports: gateway `4010`, web `5174`.

## Tasks

| Task | Status |
|---|---|
| 10.1 managed install flow + invites + messages/thread | done |
| 10.2 timeline converge + host-mode prompt + immutable hosting | done |
| 10.3 F2 shared-partition server read | done |

## Deviations / flake notes (for stream 12)

1. **Auth-none principals** — harness still resolves both browser contexts as
   `sub: "local"` (stream 9 note). Second member is minted via `invites.*`
   create + `consumeInvite`/`putMembership` for `user-b` (workspace invite
   path, **not** Chat guest `target`). Live WS publish still rides `local`;
   cross-author records use Node-side `postMessage` as `local` / `user-b`.
2. **Invite HTTP accept** — `POST /invites/:token/accept` requires Cognito
   verify (no auth-none short-circuit). Spec uses the invite facade +
   membership put to complete the workspace-invite accept under local mode.
3. **InstanceView not mounted** — stream 7 ships the messaging UI as a
   library; no shell route mounts `<InstanceView>` yet. Timeline convergence
   is asserted via CF-1 WS subscribe snapshots + `fetchWindow` id equality
   (T4 canonical source), not DOM `data-message-id` rows.
4. **Instance create** — `apps.instance*` tools are not on main; the spec
   calls `createInstance` against the shared E2E SQLite data dir (same path
   as playwright `webServer`).
5. **Host-mode UI** — Install dialog radiogroup is asserted when the
   directory Install affordance opens; install completion uses
   `apps.install` with `mode: "managed"` (avoids origin-root slug collision
   flakes). Server-side D2 proof: install without `mode` → 400
   `Hosting mode required…`.
6. **Stale E2E data dir** — reusing `E2E_WORKSPACE_DATA_DIR` across schema
   bumps can crash the gateway (`no such column: level`). Prefer a fresh
   temp dir per run in CI.

## Unblocks

- Stream 12 (presence / invariant-7) can reuse invite + WS patterns; remember
  `--retries=0` and auth-none limits for true two-principal tests.
