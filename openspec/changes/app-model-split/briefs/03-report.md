# Stream 3 report — install lifecycle + dependencies

**Branch:** `iw1/install-lifecycle`  
**Worktree:** `/tmp/iw1-install-lifecycle`  
**Status:** implemented; tasks 3.1–3.7 checked off

## What landed

- **`requires` (D4)** in `capabilities.ts` / `store.ts`: publish parses and
  validates contracts against the interface catalog; `assertAllowedTools`
  accepts exact `contract.procedure` for declared contracts (wildcards keep
  the tier message); `apps.capabilities` gains a `dependencies` section
  (`contract`, `optional`, `boundProfile?`, `fulfilled` / `"ungated"`).
- **`AppInstallation` (D2/D5)** rewrite of `install.ts`: ULID-keyed
  `svc#installs / <installId>` with `originAppId`/`originWorkspaceId`, pin
  (channel default `live` | release), `resolvedRelease`, `bindings`, `config`,
  `editing: false`. Binding resolution uses explicit profile or tenant
  `default`; missing non-optional → 400 naming the contract.
- **Grant mirroring**: `profile-grants.ts` grants/revokes
  `{kind: "app", id: installId}`; app-session contract dispatch checks the
  grant; dynamo degrade path keeps install-side bindings with
  `fulfilled: "ungated"`.
- **Lifecycle procedures**: `apps.install` / `update` / `configure` /
  `uninstall` / `installed` / `directory`. Public-or-own installable;
  private-elsewhere → 404; update returns `{from,to}`; editing forks need
  `force` to overwrite.
- **Serve-from-origin + fork (D6)**: live-apps resolves installId routes to
  origin release content (cached) or local materialized prefix when
  `editing: true`.
- **Directory (D7)**: `apps/directory.ts` write-through index in
  `__deployment__`; synced from `saveApp`/`removeApp`;
  `apps.directory` merges index + own apps; `__deployment__` rejected as
  caller workspace.

## Verify

```
pnpm --dir server/workspace typecheck   # pass
pnpm --dir server/workspace test        # 516 passed, 7 skipped
```

## Owner constraints honored

- Stream 3 globs only.
- Degrade path when `profileGrantsAvailable()` is false.

## Follow-ons (not this stream)

- Stream 5+ surface integration; stream 6 e2e across workspaces.
