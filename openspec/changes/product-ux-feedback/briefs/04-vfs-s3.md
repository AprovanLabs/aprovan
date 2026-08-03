# Brief: VFS S3 backend

## Mission
Ship a real `@utdk/vfs` S3 implementation (read/write/delete/list/stat + etag ifMatch).

## Read first
- aprovan `openspec/changes/product-ux-feedback/{prd,tech-plan,tasks}.md`
- `registry/packages/contracts/vfs/index.ts`
- `registry/packages/contracts/sql/postgres.ts` + `packages/utdk/postgres/**`
- Any existing S3 helpers in aprovan `server/workspace` (patterns only — implement in registry contracts)

## Tasks
- [ ] 4.1 Implement `s3.ts` for the five ops with etag conditionals.
- [ ] 4.2 Compat + thin `packages/utdk/s3` provider + mocked S3 tests.
- [ ] 4.3 Document bucket/prefix options.

## Acceptance criteria
#### Scenario: Put and get object as file
- WHEN a workspace binds vfs to the S3 provider
- THEN `vfs.write` then `vfs.read` round-trips content for a relative path

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @utdk/vfs test && pnpm --filter @utdk/vfs build
```

## Constraints
- Branch: `pux/vfs-s3` from `origin/main`
- Touches: `packages/contracts/vfs/**`, new `packages/utdk/<provider>/**`
- Paths: relative, no leading `/`, no `..` (enforce contract validation helpers if present)

## Report back
PR + etag/ifMatch behavior summary.
