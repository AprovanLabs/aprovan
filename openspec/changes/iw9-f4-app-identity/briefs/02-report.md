# Stream 2 report — Slug rules and slug registries

## What was built

`server/workspace/src/apps/slugs.ts` with:

- `assertValidSlug(slug)` — `NAME_RE` shape + `!isAppId(slug)` (T4; one ULID definition via `identity.isAppId`)
- `claimGlobalSlug` / `releaseGlobalSlug` / `resolveGlobalSlug` on `svc#slugs/<slug>` under `DEPLOYMENT_TENANT` (record `{ appId, workspaceId, claimedAt }`)
- `resolveWorkspaceSlug` reading `svc#wsSlugs/<wsSlug>` under `DEPLOYMENT_TENANT` (resolver only; always undefined until a later change writes entries)

`server/workspace/tests/app-slugs.test.ts` covers shape rules (incl. real `ulid()` + Crockford fixture rejection; 26-char `u`/`i`/`l`/`o`/hyphen acceptance), claim/409/idempotent reclaim, release lifecycle, holder-only release (403), and unresolved wsSlug.

## Verify

```bash
pnpm turbo run build --filter=@aprovan/workspace   # FAIL — see deviations
pnpm --filter @aprovan/workspace test -- tests/app-slugs.test.ts  # PASS 10/10
pnpm --filter @aprovan/workspace typecheck          # FAIL — same pre-existing errors
```

Focused suite: **10 tests passed**.

## Deviations

1. **`NAME_RE` duplicated, not imported.** `apps/store.ts`'s `NAME_RE` is module-private and this stream cannot edit `store.ts`. The identical regex literal lives in `slugs.ts` with a comment tying it to store. Stream 3 could export a shared constant later if desired.
2. **Pre-existing `origin/main` typecheck/build break (not introduced here).** `server/workspace/src/native-dispatch.ts` maps VCS diffs to `string[]` paths while `@aprovan/native`'s `NativeVcsDiff` expects `{ path, hash }[]`. Both `turbo build --filter=@aprovan/workspace` and package `typecheck` fail on those two errors only — neither file is in this stream's Touches. Vitest (transform path) still runs the new tests cleanly.
3. **Non-holder `releaseGlobalSlug` → 403.** Spec says holder-only but does not pin a status; 403 names the current holder. Claim collisions remain 409 to match `setAlias`.

## Notes for streams 3 and 5

- Import from `../apps/slugs.js` (or `./slugs.js`): `assertValidSlug`, `claimGlobalSlug`, `releaseGlobalSlug`, `resolveGlobalSlug`, `resolveWorkspaceSlug`.
- Stream 3 task 3.7 should call `releaseGlobalSlug` on unpublish/remove; this stream only provides the primitive.
- Stream 5 `/a/<globalSlug>` → `resolveGlobalSlug`; `/w/<wsSlug>/...` → `resolveWorkspaceSlug` (will 404 until wsSlug writers exist).
- `claimGlobalSlug` is idempotent for the same `appId` (mirrors `setAlias`).
