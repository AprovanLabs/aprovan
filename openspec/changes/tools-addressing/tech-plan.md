## D1 — Global alias is a fourth rendering of the canonical name

`ResolvedProviderName` already carries three renderings of one identity (`name`,
`packageName`, `importSpecifier`). Add `globalAlias`, derived by the same authority in
`packages/bundler/src/naming.ts`:

```
"github/graphql" → "githubGraphql"
"google/drive"   → "googleDrive"
"adyen/checkoutservice" → "adyenCheckoutservice"
```

Segments join camelCase; internal dashes are removed. The canonical slash name remains
the registry key and the only thing stored.

**Rejected — two-segment scan.** Teach the scanner to read `tools.github.graphql` as one
provider by consulting the registry. Dead on arrival: `github` exists as a bare provider
*and* `github/graphql` would exist, so the tie is unbreakable by lookup.

**Rejected — suite-root proxy.** `tools.github` returns a node that resolves `.graphql`
to a provider switch at runtime. Destroys static analyzability, which the editor's lazy
type acquisition depends on.

**Rejected — import-only.** Slash providers reachable only via `@utdk/clients/...`.
Permanently fences 1,996 providers out of the sandbox and chat surfaces.

**Revisit if** alias collisions stop being rare, or a provider name gains a segment
separator other than `/`.

## D2 — Alias uniqueness is enforced at registry load

`assertValidProviderName` already runs at load (`loadRegistryProviders`). Add a
case-insensitive uniqueness check across derived aliases in the same pass, so
`google/drive` → `googleDrive` cannot silently collide with a bare `googledrive`.
Failure is a load error, not a runtime surprise.

**Rejected — uniqueness at ingest only.** Hand-edited `data/registry.json` entries
bypass ingest; the existing name validation is at load for exactly this reason.

**Revisit if** the registry grows a case-sensitive naming rule.

## D3 — The dependency scan is a type-loading hint, not a boundary

Enforcement lives at `resolveProfile` (see `grant-enforcement`). The scan's job is to
tell the editor which `.d.ts` to fetch lazily — `@typescript/vfs` cannot eagerly load
~2,000 providers into a browser. A hint is allowed to be wrong; a boundary is not.

**Rejected — scan as the enforcement point.** Dynamic `tools[expr]` access is
unrepresentable in a static list, so the scan can never be complete enough to scope
against.

**Revisit if** dynamic access is removed entirely *and* a second consumer needs a
guaranteed-complete list.

## D4 — One scanner, exported from `@utdk/remote`

`@utdk/remote` has zero dependencies and is explicitly DOM-free (asserted by its own
`package constraints` test). The editor consumes it rather than carrying a copy. Add a
`./tools-scan` subpath export and `"sideEffects": false` so consumers that only want the
scanner can tree-shake the transport away.

**Rejected — keep the fork, add a sync test.** A test that diffs two files across two
repos fails in whichever repo is edited second, and the drift is silent until then.

**Revisit if** the editor's bundle budget makes a `@utdk/remote` dependency untenable
even with tree-shaking.

## Interfaces & Data

```ts
// packages/bundler/src/naming.ts
export interface ResolvedProviderName {
  name: string;            // "google/drive" — canonical, registry key, never dotted
  packageName: string;     // "@utdk/google"
  importSpecifier: string; // "@utdk/clients/google/drive"
  globalAlias: string;     // "googleDrive" — the `tools.` binding. NEW.
}

export function assertUniqueGlobalAliases(names: readonly string[]): void; // NEW
```

`GET /tools/namespaces` gains `globalAlias` alongside the existing `name`. The canonical
`name` remains the key for profiles, grants, credentials, and dispatch — the alias is a
binding surface only and is never stored.
