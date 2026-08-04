# Report: profiles-unified (streams 1–8)

## Status
Complete enough for review PRs (do not merge). Companion registry PR ships
`@utdk/remote@0.1.2` (`client(name)` / call-site options) + `ProfileTargetKind`
`"path"` + interfaces docs rewrite.

## PRs
- Aprovan: https://github.com/AprovanLabs/aprovan/pull/85
- Registry: https://github.com/AprovanLabs/registry/pull/120

## What landed

### Store + resolver (1)
- `server/workspace/src/profiles/{types,store,resolver}.ts` — namespace exact /
  path longest-prefix; `CallOptions` vs `ProfileOptions`; arbitrary names.
- `profiles.set` / `list` / `remove` core service; app sessions cannot mutate.

### Configuration surface (2)
- `interfaces.bind` / `unbind` removed; `interfaces.list` discovery-only and
  returns configured profiles alongside compat.

### Migration (3)
- `server/workspace/scripts/migrate-profiles.ts` — labelled credentials →
  profiles, bindings.json → namespace profiles, mounts → path profiles;
  duplicate labels reported (exit 2).

### Dispatch body profile (4)
- `POST /tools/:ns/:op` accepts `{ args, profile?, options? }`; transport keys
  rejected at call site; missing named profile fails with listing.

### Colon / getClient removal (5)
- `parseInterfaceNamespace` rejects colons; tool discovery lists bare
  interface ids only; agent `llm` is `{ interface, profile }`; docs rewritten
  in registry.

### Lazy client (6)
- Registry `@utdk/remote@0.1.2`: depth-0 / `.client(name|{name,options})`,
  `callSiteOptions` on transport; sandbox prelude updated.
- Aprovan compiler mount mirrors the algorithm (works against published
  `^0.1.1` until 0.1.2 is on npm); iframe bridge carries profile/options.

### UI (7)
- Interfaces panel → `profiles.set`/`remove`; namespaces.ts drops colon split;
  agent editor emits structured pins; services menu copy updated.

### Old stores (8)
- Credential label lookup removed (labels are display-only).
- `vcs.mount` / `unmount` removed from the management surface (use
  path-keyed profiles). Delegation (`readMounts` / mount read) kept.

## Verify
- `@aprovan/workspace` build (tsc) green
- `tests/profiles-unified.test.ts` (6)
- `@aprovan/patchwork` sandbox-host tests (5)
- agent `payload.test.ts` (5)
- `@utdk/remote` tests (18)
- registry-server `sandbox.test.ts` (21)

## Follow-ups
1. Publish `@utdk/remote@0.1.2` from the registry PR (or after merge) so
   aprovan consumers pick up `.client` / `callSiteOptions` from npm under
   `^0.1.1`.
2. Run `migrate-profiles.ts --dry-run` against
   `~/aprovan-snapshots/workspace-2026-08-03/` before live data.
3. After migration, delete remaining `writeBinding` / legacy bindings tombstone
   paths and fold path-profile mounts into `readMounts` fully.
