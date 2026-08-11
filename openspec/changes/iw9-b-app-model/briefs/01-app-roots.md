# Brief: Server — App roots + overlap validation

## Mission

Today an app binds via `entry` + `paths[]` with Set-dedupe only — no overlap
validation anywhere. When you are done, every app occupies exactly one root
under `Apps/<slug>` (derived from F4's `AppRecord.root`), `assertRootAvailable`
rejects equal/contain/contained roots with 409, publish rejects extra `paths[]`
with 400 pointing at mounts, and `resolveBinding`'s dedupe-only merge is gone
in favor of F4's `reconcileApp`. This is the frozen seam streams 2, 3, and 5
build on.

## Read first

1. `openspec/changes/IW-9-APP-FIRST.md`
2. `openspec/changes/iw9-b-app-model/prd.md`
3. `openspec/changes/iw9-b-app-model/tech-plan.md` (D1, D2)
4. `openspec/changes/iw9-b-app-model/specs/app-roots/spec.md`
5. `server/workspace/src/apps/store.ts` (manifest shape ~90-105; `appPathAllowed`/`appPathServable` ~328-338)
6. `server/workspace/src/apps/service.ts` (`resolveBinding` ~460-491; publish path ~474)
7. F4 contracts already on main: `loadAppYaml`, `reconcileApp`, `AppRecord.root`

## Tasks

> Depends-on: - | Repo: aprovan | Touches: aprovan/server/workspace/src/apps/store.ts, aprovan/server/workspace/src/apps/roots.ts, aprovan/server/workspace/src/apps/service.ts, aprovan/server/workspace/tests/apps-roots.test.ts | Verify: pnpm --filter @aprovan/workspace test -- apps-roots.test.ts

- [ ] 1.1 In `apps/store.ts`, delete the `entry: string` and `paths: string[]`
      fields from the manifest's operational shape (`store.ts:90-105`);
      derive the single binding from F4's `AppRecord.root` instead
      (`app-roots` — "Every app occupies exactly one root under Apps/").
- [ ] 1.2 Narrow `appPathAllowed`/`appPathServable` (`store.ts:328-338`) to
      check containment against the one `root` string instead of iterating a
      `paths[]` array.
- [ ] 1.3 Create `apps/roots.ts` exporting
      `assertRootAvailable(workspaceId, root): Promise<void>` — 409 when
      `root` equals, is contained by, or contains any existing app's root in
      the workspace (tech-plan D2's both-directions containment check).
- [ ] 1.4 Wire `assertRootAvailable` into the publish path in
      `apps/service.ts` (the `resolveBinding`-adjacent call site,
      `service.ts:~474`); reject (400) any publish/update request that still
      supplies extra `paths[]` entries, pointing the error at mounts
      (`app-roots` — "Publish with extra paths rejected").
- [ ] 1.5 Delete `resolveBinding`'s dedupe-only paths merge
      (`apps/service.ts:460-491`) now that binding = root only; publish calls
      F4's `reconcileApp` for identity/derived-state instead.
- [ ] 1.6 Add `tests/apps-roots.test.ts`: single-root binding on publish;
      nested-publish 409 (both containment directions); extra-paths 400;
      invalid `app.yaml` keeps last-good derived state without throwing at
      app users (`app-roots` scenarios, all four).

## Acceptance criteria

### Requirement: Every app occupies exactly one root under Apps/

An app's path binding SHALL be a single directory `Apps/<slug>` in the owning
workspace's VFS. The manifest SHALL NOT carry an `entry` path or a `paths[]`
list; the serving entrypoint and served prefixes SHALL all be derived from the
root. The live site and app sessions SHALL both authorize against the root
alone (one prefix rule, two consumers — the invariant `appPathAllowed`
enforces today, narrowed to one prefix).

#### Scenario: Publish binds the root, nothing else

- **WHEN** an app is published from `Apps/tasks`
- **THEN** its binding is exactly `Apps/tasks`; the stored manifest record
  carries no `paths` array, and vfs/keyvalue calls from its sessions resolve
  against `Apps/tasks` plus the app's data partition only

#### Scenario: Content outside the root is not the app's

- **WHEN** an app session addresses a workspace path outside its root, its
  data partition, and its mounts
- **THEN** the call is denied exactly as a foreign path is denied today

### Requirement: App roots never overlap

The system SHALL reject (409) any operation that would make one app's root
equal to, contain, or be contained by another app's root in the same
workspace — publish, promote-out, install materialization, and root rename
(`mv`) included. Validation SHALL run server-side against the current set of
app roots, not client-side.

#### Scenario: Nested publish rejected

- **WHEN** `Apps/crm` is an existing app's root and a publish attempts to
  create an app rooted at `Apps/crm/reports`
- **THEN** the operation fails with 409 naming the conflicting app

#### Scenario: Containing publish rejected

- **WHEN** apps exist at `Apps/crm/reports` (hypothetically) and a publish
  attempts `Apps/crm`
- **THEN** the operation fails with 409 (containment checked in both
  directions)

### Requirement: paths[] extras are retired in favor of mounts

The system SHALL NOT accept extra path prefixes on publish or update. Shared
content between apps SHALL be expressed as a mount under the consuming app's
root (see `vfs-mounts`).

#### Scenario: Publish with extra paths rejected

- **WHEN** a publish names path prefixes beyond the app root
- **THEN** the request fails with 400 pointing at mounts as the mechanism

#### Scenario: Invalid app.yaml does not break the app record

- **WHEN** `app.yaml` is saved with a schema violation
- **THEN** the platform record retains its last-good derived state and the
  validation error is surfaced to the author (reconcile status), not thrown
  at app users

## Verify

```bash
pnpm --filter @aprovan/workspace test -- apps-roots.test.ts
pnpm --filter @aprovan/workspace typecheck
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style.
- Do not modify files outside the Touches globs above.
- **Never touch** `apps/releases.ts` or entry-version helpers at
  `apps/store.ts:422-451` — owned by iw9-a.
- **Never touch** `packages/registry-ui/src/apps/versions.tsx`.
- Capability/grant fields are stored but never enforced here — iw9-c owns that.
- Do not implement Personal, install-as-copy, shares, or mounts procedures
  (streams 2–5).

## Report back

When done: check off your tasks in `openspec/changes/iw9-b-app-model/tasks.md`,
and open a PR (or write `briefs/01-report.md`) containing: what you built, how
you verified it, any deviations from the brief and why, and anything the next
wave needs to know.
