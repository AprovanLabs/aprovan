# Report: 03 — Fix the vcs-interface resolution-order collision

## What was built

In `server/workspace/src/interfaces.ts`, zero-config resolution for the
`vcs` interface id no longer lets the credentialless `{provider: "aprovan"}`
compat entry win the generic catalog path.

Mechanism (tech-plan D3 option (a) — smallest change against the current
order): when `interfaceId === "vcs"`, skip the
`def.compat.find((entry) => entry.credentialless)` arm and resolve only from
a connected credentialed provider (else reject). Other interfaces
(`agent`, `telemetry`, `vfs`, `keyvalue`, `events`, …) keep the existing
credentialless-wins rule unchanged.

The vcs reject path uses the phrase `no binding and no connected` so
`vcs-interface.test.ts:109`'s regex matches; other interfaces retain the
profiles-era `no profile and no connected` wording so non-F6 failure counts
stay byte-identical.

Worktree: `.../.worktrees/aprovan-iw9-f6-vcs-resolution-r2`, branch
`fix/iw9-f6-vcs-interface-resolution`, from `origin/main` (`8473fc5`).

## How it was verified

### Task 3.1 — confirmed pre-fix collision

`resolveInterfaceForWorkspace` zero-config was:

```ts
def.compat.find((entry) => entry.credentialless) ??
def.compat.find((entry) => connected.has(entry.provider));
```

With `vcs` compat listing credentialless `aprovan` ahead of `github` /
`bitbucket`, that always returned `aprovan` — pre-empting both "no cred →
reject" and "github cred → github".

### Task 3.3 — focused suite

```
$ pnpm --filter @aprovan/workspace test -- tests/vcs-interface.test.ts
# (vitest run tests/vcs-interface.test.ts after deps build)
```

| Assertion | Result |
|---|---|
| no credential → reject `/no binding and no connected/` | **pass** |
| github credential → `github` / `github/vcs` | **pass** |
| bitbucket bind → 200, then 501 reason (not loader 404) | **fail** — bind returns 404 |

Bitbucket failure body:

```
Unknown interfaces procedure: bind. Use profiles.set / profiles.remove to configure bindings.
```

In-process check (outside the HTTP bind path) confirms the resolution /
`unavailable` short-circuit itself is fine: `writeBinding(..., bitbucket)` +
`dispatchInterface(..., "repos.get")` → **501** with the Bitbucket adapter
reason. The remaining failure is the removed `interfaces/bind` procedure,
not the resolution order.

### Task 3.4 — full suite vs `briefs/deviations.md` §1 baseline

```
$ pnpm --filter @aprovan/workspace test
```

| | Baseline (deviations §1) | This stream |
|---|---|---|
| Failed files | 18 | **21** |
| Failed tests | 81 | **82** |
| Passed | 474 | **479** |
| Skipped | 57 | **57** |

**13 non-F6 files (gate): all failure counts byte-identical**

| File | Baseline | After |
|---|---|---|
| `interfaces.test.ts` | 18 | 18 |
| `sandboxes.test.ts` | 8 | 8 |
| `get-client.test.ts` | 8 | 8 |
| `telemetry.test.ts` | 6 | 6 |
| `agent-run.test.ts` | 5 | 5 |
| `agent-interface.test.ts` | 4 | 4 |
| `oauth-tokens.test.ts` | 3 | 3 |
| `sandbox-agent-runs.test.ts` | 2 | 2 |
| `sync.test.ts` | 1 | 1 |
| `sandbox-repo-mounts.test.ts` | 1 | 1 |
| `profiles.test.ts` | 1 | 1 |
| `live-apps.test.ts` | 1 | 1 |
| `apps.test.ts` | 1 | 1 |

**F6-owned drift**

| File | Baseline | After |
|---|---|---|
| `vcs-interface.test.ts` | 3 | **1** (−2 from 3.2) |
| `vcs.test.ts` | 7 | 7 |
| `vfs-mounts.test.ts` | 6 | 6 |
| `vcs-mount-lineage.test.ts` | 4 | 4 |
| `chat-sessions.test.ts` | 2 | 2 |

**New previously-passing failures (collateral of D3(a))**

| File | Failures | Why |
|---|---|---|
| `native-resolve.test.ts` | 1 | expects zero-config `vcs` → `aprovan` |
| `vfs-vcs-split.test.ts` | 1 | same |
| `partition-access.test.ts` | 1 | `vcs/commit` / `vcs/show` via tools path need resolve → `aprovan`; resolve now rejects with no cred |

Other interfaces' resolution behavior unchanged (non-F6 suites that exercise
`llm` / `agent` / `telemetry` / etc. kept their failure counts).

## Deviations

1. **Task 3.3 incomplete (planning / Touches gap).** The bitbucket
   assertion calls `interfaces/bind`, which
   `interfaces-service.ts` removed in favor of `profiles.set` (returns
   404). Restoring a bind alias is outside this stream's Touches
   (`interfaces.ts` only) and would also move many of the 59 non-F6
   failures (those suites still call `interfaces/bind`). Recorded as a
   planning bug: task 3.3's third assertion is not reachable from the
   declared footprint. Disposition: leave 3.3 unchecked; next wave either
   expands Touches to restore thin `bind`/`unbind` aliases, or updates
   `vcs-interface.test.ts` to `profiles.set` / `profiles.remove` (that
   test edit is *not* the D3-rejected "native always wins" change).

2. **Tech-plan claim that `routes/tools.ts:478-488` fully owns the native
   path is discovery-only.** That block always returns
   `nativeVcsDiscoveryEntries`, but HTTP / `dispatchInterface` still call
   `resolveInterfaceForWorkspace` and only short-circuit to
   `dispatchAprovanNativeOp` when resolve returns `provider === "aprovan"`.
   D3(a) therefore breaks zero-config native `vcs/*` dispatch (see
   `partition-access` collateral). F1-owned follow-up: when `vcs` resolve
   rejects (or returns a git host) and the op is a workspace-commit-store
   verb, fall back to native — without re-poisoning the generic git-hosting
   path. Distinct interface ids (D3 revisit) would also dissolve this.

3. **Pre-existing `@aprovan/workspace` `tsc` break on this `main` tip**
   (`native-dispatch.ts` vs hash-bearing `NativeVcsDiff` from #172). Vitest
   still runs; `pnpm turbo run build --filter=@aprovan/workspace` fails.
   Unrelated to this stream; not fixed here.

## Next wave

- Finish 3.3: `profiles.set` in the test **or** restore bind aliases under
  an expanded Touches, without disturbing the non-F6 baseline gate.
- F1 / tools.ts: native `vcs` dispatch fallback so D3(a) and zero-config
  commit-store coexist (or split the interface ids).
- Update `native-resolve` / `vfs-vcs-split` expectations once the native
  path no longer depends on generic zero-config returning `aprovan`.
