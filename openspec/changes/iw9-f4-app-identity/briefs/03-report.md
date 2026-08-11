# Report: F4 stream 3 — Reconcile entry point

## What landed

- **`apps/identity.ts`**: workspace-scoped root→appId index (`ROOT_SCOPE`),
  `AppRootBinding`, `readRootBinding` / `bindRoot` / `dropRootBinding`.
- **`apps/reconcile.ts`**: `reconcileApp(input) → ReconcileResult` — first-sight
  mint, idempotent no-op, authored-field update, foreign/duplicate 400,
  slug/basename + `assertValidSlug` 400, slug-collision 409 (pre-write),
  rename-as-`mv` via `expectedAppId` on an unbound root.
- **`apps/directory.ts`**: `DirectoryEntry.slug` (`manifest.slug ?? name`) and
  `icon?` (`manifest.declared?.icon`); visibility-drop releases global claim.
- **`apps/store.ts`**: `removeApp` releases global claim and drops root binding;
  `slug?` / `root?` / `declared?` already present from #190 (task 3.1 additive
  shape confirmed, not re-derived).
- **`tests/app-reconcile.test.ts`**: covers 3.0 and 3.3–3.7.

## Export signature (B swap target)

```ts
import { reconcileApp, type ReconcileInput, type ReconcileResult } from "./reconcile.js";
// or: from "../apps/reconcile.js"

export interface ReconcileInput {
  workspaceId: string;
  root: string;                 // app-root path; basename = slug
  yaml: AppYaml;                // already loadAppYaml'd
  expectedAppId?: AppId;        // rename signal / foreign-id check
  actor: string;
}
export interface ReconcileResult {
  appId: AppId;
  created: boolean;
  changed: boolean;
}
export function reconcileApp(input: ReconcileInput): Promise<ReconcileResult>;
```

B streams: replace `saveApp` identity-create/update call sites with
`reconcileApp({ workspaceId, root, yaml, expectedAppId?, actor })`. Keep
`saveApp` for operational mutations that are not root/yaml reconcile
(channels, visibility-only, etc.) until those also funnel through reconcile.

## Verify

```text
pnpm turbo run build --filter=@aprovan/workspace          # exit 0
pnpm --filter @aprovan/workspace test -- \
  tests/app-reconcile.test.ts \
  tests/app-identity.test.ts \
  tests/app-directory.test.ts                             # 25 passed
pnpm --filter @aprovan/workspace typecheck                # exit 0
```

## Deviations

1. **Task 3.1 fields already on main via #190** — `slug?` / `root?` /
   `declared?` and `hydrateAppRecord` were present; this stream did not
   re-add them. Reconcile always sets `name === slug` and populates all three.
2. **`removeApp` also calls `dropRootBinding`** — not named in 3.7 (which only
   required global-claim release) but required so the new root index does not
   leak after delete; mirrors existing `dropAlias` / `dropAppLocation`.
3. **Slug-collision checked via `readAlias` before writes** — same 409
   semantics as `setAlias`, but avoids orphan `svc#apps/<appId>` rows if
   `saveApp`'s write-then-alias order would otherwise leave a record after a
   409.
4. **Slug/basename + `assertValidSlug` run on every path** (not only when a
   binding already exists) — matches task 3.4 / T2; fails first-sight and
   rename early with the same errors.

## For stream 5

- Read `AppRecord.slug ?? AppRecord.name` and `AppRecord.declared` (icon/title).
- Alias index is authoritative for workspace vanity; root binding is
  authoritative for reconcile. Global claims are released on unpublish/remove
  but **not claimed** by reconcile — claim remains a separate call
  (`claimGlobalSlug`) when you want a deployment-wide vanity.
