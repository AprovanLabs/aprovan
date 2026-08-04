# Report: interfaces-native-provider streams 5–8

## Status
Streams 5–8 complete on `iw7/interfaces-native` (aprovan). Registry PR from streams 1–4 unchanged for this tranche (compat already landed).

## Landed

### Stream 5 — VFS / VCS split
- `vfs` reduced to driver ops: `list` / `read` / `write` / `delete` / `stat`.
- Commit / log / show / diff / branches / restore served by `vcs` (interface → aprovan native).
- Mount ops removed from `vfs`; mounts are path-keyed profiles (`profiles.list`).
- Workspace-only VCS guard gone from `vfs` (ops unreachable there).
- Capability allow-list aligned to contract (`+stat`).
- Tests: `tests/vfs-vcs-split.test.ts` (7 scenarios).

**Blocker #1 resolution:** Workspace commit ops live on the `vcs` product/interface path via `@aprovan/native` (commit/log/show/diff/branches/restore). Frozen `@utdk/vcs` Git-hosting ops remain the third-party contract surface; rebinding to GitHub does not share the workspace-commit operation set until a future contract unification.

### Stream 6 — Platform namespaces → plugins
- New `platform-plugins.ts` registry (`PLATFORM_PLUGIN_NAMES`); install completeness check.
- Removed shadowed ids (`keyvalue`, `events`, `vfs`, `telemetry`) from the first-party list — intersection with interface ids is empty.
- Namespace wire kind `plugin` (client accepts `core` | `plugin`).
- No service-before-interface precedence for those five; they resolve as interfaces → native short-circuit.
- Product semantics preserved: vfs/keyvalue route through product services with contract-shape adaptation; telemetry product ops (emit/query/traces) stay on the activity store; events keep workflow fan-out.
- Tests: `tests/platform-plugins.test.ts`.

### Stream 7 — Platform output schemas
- `platform-output-schemas.ts` seals schemas onto all ~98 platform tools at install.
- Seven sandbox driver passthroughs marked (`passthrough: true` + advisory schema).
- `apps.data` split → `dataUsers` / `dataKeys` / `dataGet` / `dataRead` (legacy `data` still dispatched).
- Regression: `tests/platform-output-schemas.test.ts`.

### Stream 8 — Callers + catalog flip
- Clients: `vcs.show` for commit detail; path profiles for mounts; prompt uses `tools.vcs.*`.
- Tests updated for keyvalue list rows + `vcs.*` commit ops.
- **8.4** `catalogToolEntries` maps catalog `outputs` → success `outputSchema` (lowest 2xx with schema; omit when `responseUnknown` / no 2xx).
- Tests: `tests/catalog-output-schema.test.ts`.

## Verify
| Check | Result |
|---|---|
| `tsc` workspace | pass |
| vfs-vcs-split + platform-plugins + output-schemas + catalog + native-resolve + records + partition-access | **51/51 pass** |

## PRs
- Aprovan: https://github.com/AprovanLabs/aprovan/pull/86
- Registry: https://github.com/AprovanLabs/registry/pull/123

## Follow-ups
1. Publish contract patches (`@utdk/*@0.2.1` / telemetry `0.3.1`) so CI loads new compat without the local symlink.
2. Tighten platform output schemas beyond structural object shapes where callers need field-level guarantees.
3. Optional: unify `@utdk/vcs` Git-hosting ops with workspace commit ops (or split interface ids).
4. Reseed example snapshots in a dedicated pass if reference content still cites `vfs.commit`.
