## ADDED Requirements

### Requirement: A release is a tag over an app-scoped commit
An app release SHALL be a named tag ref pointing at an app-scoped commit
(D10). Cutting a release SHALL commit the app scope if dirty and then write
the tag; a channel (default `live`) SHALL be a movable named pointer at a
release tag. Releases and channels SHALL be resolvable to `{ commitId,
snapshotId }` so install pinning (D8, consumed by iw9-b) can copy exactly
that content.

#### Scenario: Cut a release
- **WHEN** `apps.release` is invoked for app `X` with channel `live`
- **THEN** an app-scoped commit for X exists at head, a release tag points at
  it, and the `live` channel resolves to that commit

#### Scenario: Roll back a channel
- **WHEN** a channel is re-pointed at an older release tag
- **THEN** resolution for that channel returns the older commit and no content
  is rewritten

#### Scenario: Install resolution interface for iw9-b
- **WHEN** iw9-b's install-as-copy resolves app X at channel `live`
- **THEN** it receives a commit id whose snapshot contains the full app
  subtree (manifest included), sufficient to copy and pin without reading the
  origin at request time

### Requirement: releases.ts and the per-file version surface are deleted
`server/workspace/src/apps/releases.ts`, the per-file entrypoint-version
helpers (`listEntryVersions`/`readEntryVersion`/`restoreEntryVersion` in
`apps/store.ts`), the `apps.versions`/`apps.version`/`apps.restore` tool
surface in `apps/service.ts`, and the client per-file version UI
(`packages/registry-ui/src/apps/versions.tsx`) SHALL be removed once their
consumers (`apps/install.ts`, `routes/live-apps.ts`, `apps/directory.ts`,
`notifications/service.ts`, `platform-output-schemas.ts`) are re-pointed at
the tag-based release surface. Deletion is done only when a grep for the
removed symbols returns nothing in both repos (MIGRATION-DEBT rule).

#### Scenario: Grep gate passes
- **WHEN** `grep -r "listEntryVersions\|readEntryVersion\|restoreEntryVersion\|apps/releases"`
  runs over both repos' source (excluding archives/changelogs)
- **THEN** it returns no matches

#### Scenario: Pinned serving still works
- **WHEN** `routes/live-apps.ts` serves an app entrypoint for a released
  channel after the migration
- **THEN** it serves the content pinned by the release's commit, not the live
  tree

### Requirement: Existing release records are cut over
Releases stored as `svc#apps#releases#<appId>` records SHALL be either
migrated to tags (re-tagging the equivalent content as an app-scoped commit)
or explicitly invalidated at cut-over with installs re-resolved; the change
SHALL pick one behavior and apply it uniformly. Channel names SHALL keep
their existing validation (`^[a-z][a-z0-9-]{0,31}$`).

#### Scenario: Old release ids do not silently dangle
- **WHEN** the migration completes
- **THEN** every install that referenced an old release either resolves
  through a tag or surfaces an explicit re-release-needed state — never a
  silent 404 at serve time
