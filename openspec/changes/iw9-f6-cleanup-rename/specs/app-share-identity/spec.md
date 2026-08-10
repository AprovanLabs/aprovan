## ADDED Requirements

### Requirement: Workspace shares grant by durable app identity
`WorkspaceShare.apps` and `shareAllows` (`server/workspace/src/apps/store.ts`)
SHALL key on an app's durable `appId`, never on its mutable `name`. Renaming
an app (`mv` of its directory, per D4) SHALL NOT change which shares apply to
it, and SHALL NOT require a workspace admin to re-enter any
`WorkspaceConfig.shares` entry.

#### Scenario: Renaming an app does not change what its shares allow
- **WHEN** an app with an active share grant is renamed
- **THEN** `shareAllows`/`appFsAllowed` evaluated for that app (by its
  unchanged `appId`) returns the same result before and after the rename

#### Scenario: A share still resolves after the app is renamed twice
- **WHEN** an app is renamed more than once after a share was granted to it
- **THEN** the share continues to resolve correctly by `appId` at every point,
  with no re-grant required

### Requirement: Pre-existing name-keyed shares continue to work without manual migration
`WorkspaceConfig.shares` entries written before this change stored an app's
`name` in the `apps` field. This change SHALL NOT strand those entries: they
SHALL keep granting the same effective access after the change ships,
resolved transparently (e.g. via the existing name→appId alias index) rather
than requiring every workspace to re-save its share configuration.

#### Scenario: An existing share keeps working after upgrade
- **WHEN** a `WorkspaceConfig.shares` entry written under the old (name-keyed)
  scheme is evaluated by the upgraded `shareAllows`
- **THEN** it grants access to the same app it granted before, without an
  admin having edited the share

### Requirement: `appFsAllowed` resolves by durable identity end-to-end
The call path from an app session's filesystem access check
(`appFsAllowed`) down to `shareAllows` SHALL carry the app's `appId`, not its
`name`, as the identity used for the share-list membership check.

#### Scenario: A share scoped to one app does not leak to a same-named future app
- **WHEN** app A is deleted and a new, unrelated app is later given the same
  `name` A used to have
- **THEN** shares originally granted to A's `appId` do not apply to the new
  app, because membership is keyed on the old `appId`, which the new app does
  not have
