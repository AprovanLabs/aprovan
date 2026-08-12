# Brief: Server — release-as-tag + delete releases.ts

## Mission

Replace `apps/releases.ts` with `apps/release-tags.ts` over stream 1's
`writeTag`/`moveChannel`/`appRefName`/scoped commits. Re-point consumers,
migrate existing release records to tags, delete `releases.ts`, pass grep gate
in both repos.

## Read first

1. `openspec/changes/iw9-a-vcs-consolidation/tasks.md` stream 3
2. Tech-plan release-as-tag interface
3. Stream 1 exports: `writeTag`, `moveChannel`, `appRefName`, scoped `commitTree`
4. Current `apps/releases.ts`, `install.ts` (B install-as-copy already landed — rebase carefully)

## Tasks

- [x] 3.1 New `apps/release-tags.ts` implementing the tech-plan interface:
      `cutRelease` (commit app scope if dirty → write immutable tag → point
      channel), `resolveRelease`, `listReleases`; channel-name validation
      kept (`^[a-z][a-z0-9-]{0,31}$`). This is the interface iw9-b consumes
      for install-as-copy (spec app-release-tags).
- [x] 3.2 Re-point consumers off `releases.ts`: `apps/install.ts`,
      `routes/live-apps.ts` (serve pinned content from the release commit's
      snapshot, replacing `readEntryVersion(entry, release.entryHash)` at
      :209), `apps/directory.ts`, `notifications/service.ts`,
      `platform-output-schemas.ts` release shapes.
- [x] 3.3 One-time cut-over: re-tag every `svc#apps#releases#<appId>` record
      as an app-scoped commit + tag BEFORE dropping records; assert no
      install resolves to a dangling release (scenario "Old release ids do
      not silently dangle"). Tags written before records dropped (tech-plan
      Rollout 4).
- [x] 3.4 Replace the `apps.release`/`apps.releases`/`apps.channel` tool
      operations in `apps/service.ts` with the tag-backed implementations;
      DELETE the `apps.versions`/`apps.version`/`apps.restore` operations
      and the per-file helpers at `apps/store.ts:422-452`.
- [x] 3.5 DELETE `apps/releases.ts`. Grep gate (in Verify) must return
      nothing across BOTH repos (aprovan + registry), per MIGRATION-DEBT
      rule. Do this task last in the stream.

## Verify

Per tasks.md Verify line (typecheck + apps tests + cross-repo grep).

## Constraints

- Touches per stream 3 metadata line only
- Consume stream 1 helpers — do not reimplement tag refs
- B's `copyArchivePaths` / install pin must keep working
- Open PR; `briefs/03-report.md`

## Report back

PR URL, verify, grep gate result, notes for B pin consumers.
