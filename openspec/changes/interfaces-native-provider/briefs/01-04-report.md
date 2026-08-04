# Report: interfaces-native-provider streams 1–4

## Status
Foundation streams 1–4 complete on `iw7/interfaces-native` (aprovan + registry).

## Landed

### Stream 1 — helper return types
- `SandboxSummary` / `SandboxMountSummary` replace `Record<string, unknown>` on the sandbox summariser (explicit fields, no open record).
- `SessionWithChanges` replaces the opaque session helper return (unblocks sessions output schemas in stream 7).

### Stream 2 — `@aprovan/native`
- New package absorbs bashkit, machine host, and the Node sandbox image descriptor.
- Exports: `.`, `./bashkit`, `./host`, `./vfs`, `./vcs`, `./keyvalue`, `./events`, `./telemetry`.
- Retired `packages/sandbox-{bashkit,host,image-node}`; publish workflow lists `@aprovan/native`.
- Server-side-only test asserts no widget/browser export surface.

### Stream 3 — five contracts + conformance
- **vfs**: full `@utdk/vfs` client (incl. `stat`) over injectable backend; gateway wires workspace FS.
- **vcs**: workspace commit store ops (`commit`/`log`/`show`/`diff`/`branches`/`restore`) — see blocker below.
- **keyvalue**: contract shapes with `found: boolean` absence.
- **events**: `channel`/`type`/`timestamp` field names.
- **telemetry**: confirmed export shape via native sink.
- Conformance tests in `packages/native/__tests__/conformance.test.ts` (48 package tests pass).

### Stream 4 — compat defaults + short-circuit
- Registry `compat.json`: credentialless `aprovan` + `moduleSpecifier: "@aprovan/native"` on vfs/vcs/keyvalue/events/telemetry; sandbox Specifiers retargeted; package patch bumps (`0.2.1` / telemetry `0.3.1`).
- Gateway short-circuit in `routes/tools.ts`, `workflows/invoke.ts`, and `registry-embed` `compatDispatch`.
- `native-resolve.test.ts`: default → aprovan; binding to s3 → third party.

## Verify
| Check | Result |
|---|---|
| `pnpm --filter @aprovan/native build && test` | pass (48) |
| `pnpm --filter @aprovan/workspace check-types` | pass |
| `native-resolve` + `interfaces-catalog` + `sandbox-bashkit` | pass |
| Full workspace suite | pre-existing failures unrelated to this change (workflows/sandboxes mocks) |

## PRs
- Aprovan: (filled after open)
- Registry: (filled after open)

## Blockers for streams 5–8
1. **`@utdk/vcs` vs workspace commit ops** — Native vcs implements workspace commit/log/show/diff/branches/restore (tech-plan). Frozen `@utdk/vcs` is Git hosting (repos/PRs). Rebinding `vcs` to GitHub cannot share one operation surface until a contract decision (split interface ids, or reshape one side). Stream 5 should resolve this before moving ops off `vfs`.
2. **Publish contract patches** — Registry needs `@utdk/{vfs,vcs,keyvalue,events,sandbox}@0.2.1` and `@utdk/telemetry@0.3.1` published so aprovan CI (no local `packages/contracts` symlink) loads the new compat entries. Local verify used a gitignored symlink to the registry worktree.
3. **CORE_SERVICE precedence** — Until stream 6 removes `CORE_SERVICE_NAMES` / service-before-interface, HTTP calls to bare `keyvalue`/`events`/`vfs`/`telemetry` still hit core services. Interface path + short-circuit are ready; callers flip in stream 8.
4. **Caller churn** — Shape changes (kv `found`, events fields, vfs read/list/delete, vcs namespace) wait for streams 5+8.
