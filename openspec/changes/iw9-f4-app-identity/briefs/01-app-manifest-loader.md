# Brief: app.yaml loader/validator (Zod-over-YAML)

## Mission

Create `server/workspace/src/apps/manifest.ts` — the parser+validator for the
`app.yaml` authored-manifest format (IW-9 decision D3). This is the first
frozen seam `iw9-b-app-model` builds trees on top of, and stream 3 in this
same change (`reconcile.ts`) imports its `AppYaml` type directly. When you
are done, `loadAppYaml(content)` turns YAML bytes into a typed, validated
`AppYaml` object or a list of actionable issues (path + message); it never
touches the filesystem, never accepts a platform-owned field (`appId`,
timestamps, etc. — those are minted by reconcile, never authored), and never
validates the `capabilities` grammar (that enforcement belongs to
`iw9-c`, Wave 2 — do not add it here even though it looks easy).

## Read first

All paths relative to `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

1. `openspec/changes/IW-9-APP-FIRST.md` — decision D3
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-f4-app-identity/prd.md` — "Problem", "Goals"
4. `openspec/changes/iw9-f4-app-identity/tech-plan.md` — Context, T1, T2, the
   `AppYaml` block under "Interfaces & Data" (frozen — implement exactly this
   shape, including the inline comments on `icon`/`capabilities` added in the
   pre-dispatch repair pass)
5. `openspec/changes/iw9-f4-app-identity/specs/app-manifest/spec.md` — full
   spec (reproduced under Acceptance criteria below)
6. `openspec/changes/iw9-f4-app-identity/specs/app-icon/spec.md` — the two
   requirements this stream owns ("Icon is a manifest field")
7. `server/workspace/src/apps/store.ts:82-146` — existing `AppManifest`
   (context only, do not edit) and `AppRequirement` (reuse this exact shape
   for `requires`)
8. `briefs/deviations.md` §7 — why `capabilities` and `icon` validation are
   scoped narrowly; read before writing 1.2/1.5

## Tasks

(Verbatim from `openspec/changes/iw9-f4-app-identity/tasks.md` §1, as
repaired in the pre-dispatch pass — see `briefs/deviations.md` §7, §9)

> Depends-on: - | Repo: aprovan | Touches: aprovan/server/workspace/src/apps/manifest.ts, aprovan/server/workspace/tests/app-manifest.test.ts, aprovan/server/workspace/package.json | Verify: pnpm --filter @aprovan/workspace test -- tests/app-manifest.test.ts && pnpm --filter @aprovan/workspace typecheck

- [ ] 1.1 Add the `yaml` package to `@aprovan/workspace` dependencies (tech-plan T1).
- [ ] 1.2 Create `server/workspace/src/apps/manifest.ts`: `AppYamlSchema` per tech-plan Interfaces (slug?, title?, description?, icon?, capabilities?, requires? reusing the `AppRequirement` shape from `apps/store.ts:142-146`, hostModes with default `["managed"]`), `.strict()` so unknown top-level keys fail naming the key (spec app-manifest "unknown key rejected"). `capabilities` accepts any `string[]` — do NOT validate the `"ns.proc" | "ns.*"` grammar; that enforcement is iw9-c's (tech-plan T1 addendum).
- [ ] 1.3 Add the platform-field rejection: superRefine rejecting `appId`, `createdAt`, `updatedAt`, `createdBy`, `channels`, `paths`, `entry` with an "identity is platform-assigned; never appears in app.yaml" message (spec app-manifest "appId in file rejected", "derived timestamp rejected"; D3).
- [ ] 1.4 Implement `loadAppYaml(content)` returning `{ ok: true, value } | { ok: false, issues: [{ path, message }] }`; YAML parse failures carry the parse position and produce no partial manifest (spec "malformed YAML rejected with position").
- [ ] 1.5 Validate `icon` when present: named identifier or app-root-relative path; reject traversal and absolute paths by STRING PATTERN ONLY — reject a leading `/` and any `..` path segment; `manifest.ts` has no filesystem access, this is not a real path resolution (spec app-icon "escaping icon path rejected"; tech-plan T1 addendum).
- [ ] 1.6 New test file `tests/app-manifest.test.ts` covering every app-manifest and app-icon validation scenario (valid parse, unknown key, each platform field, malformed YAML position, icon traversal, hostModes default).

## Acceptance criteria

Verbatim from `specs/app-manifest/spec.md`:

### Requirement: app.yaml is the authored manifest
The platform SHALL accept an app declaration as a YAML file named `app.yaml` at the app root, parsed and validated by a Zod schema (Zod-over-YAML). The file SHALL admit only human/agent-authored declarative fields: `slug` (optional, see app-slug), `title`, `icon`, `description`, `capabilities` (coarse ceiling — field defined here, enforced by iw9-c), `requires` (interface-contract requirements), and `hostModes` (supported data-hosting modes, D2 shape). Unknown top-level keys SHALL be rejected with an error naming the key.

#### Scenario: valid manifest parses
- **WHEN** an `app.yaml` containing only authored fields with valid values is loaded
- **THEN** the loader returns a typed manifest object and no errors

#### Scenario: unknown key rejected
- **WHEN** an `app.yaml` contains a top-level key outside the authored field set
- **THEN** validation fails with an issue naming that key and its YAML path

#### Scenario: malformed YAML rejected with position
- **WHEN** the file is not parseable YAML
- **THEN** the loader fails with an error carrying the parse position, and no partial manifest is produced

### Requirement: Platform-owned fields never appear in app.yaml
`app.yaml` SHALL NOT contain `appId` or any platform-derived field (identity, alias state, directory row, `createdAt`/`updatedAt`, `createdBy`). Validation SHALL fail closed when any such field is present, with an error stating that identity is platform-assigned.

#### Scenario: appId in file rejected
- **WHEN** an `app.yaml` contains an `appId` key (any value, including a well-formed ULID)
- **THEN** validation fails and the manifest is not loaded

#### Scenario: derived timestamp rejected
- **WHEN** an `app.yaml` contains `createdAt`, `updatedAt`, or `createdBy`
- **THEN** validation fails with an error naming the offending field

Verbatim from `specs/app-icon/spec.md` (the requirement this stream owns):

### Requirement: Icon is a manifest field
`app.yaml` SHALL accept an optional `icon` field: either a named icon identifier or an app-relative path to an image file under the app's own root. An icon path escaping the app root SHALL be rejected at validation.

#### Scenario: custom icon accepted
- **WHEN** `app.yaml` declares `icon: assets/logo.svg` and the path is app-root-relative
- **THEN** validation passes and the icon reference is available on the loaded manifest

#### Scenario: escaping icon path rejected
- **WHEN** `app.yaml` declares an icon path containing traversal or an absolute path outside the app root
- **THEN** validation fails naming the field

(This stream implements the "escaping icon path rejected" check as a string
pattern only — reject a leading `/` and any `..` segment — since
`manifest.ts` never touches the filesystem. Do not attempt a real path
resolution against a real app root; none exists at this layer.)

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
pnpm turbo run build --filter=@aprovan/workspace
pnpm --filter @aprovan/workspace test -- tests/app-manifest.test.ts
pnpm --filter @aprovan/workspace typecheck
```

The first line is a correction over `tasks.md`'s literal `Verify:` string
(see `briefs/deviations.md` §9): `@aprovan/workspace` depends on
`@aprovan/native`, `@aprovan/node`, and `@aprovan/patchwork` as
`workspace:*` packages resolved through `dist/` only, and turbo's own
`test`/`typecheck` tasks declare `dependsOn: ["^build"]` for exactly this
reason — `pnpm --filter ... test`/`typecheck` alone bypasses that. The build
is cached and cheap when nothing changed. All commands must exit 0.

## Constraints

- Implement only what the tasks say; the `AppYamlSchema`/`loadAppYaml` shape
  in `tech-plan.md`'s "Interfaces & Data" is fixed — if it seems wrong, stop
  and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not add `capabilities` grammar validation (`"ns.proc" | "ns.*"`) —
  accept any `string[]`. That is `iw9-c`'s job.
- Do not give `manifest.ts` any filesystem access — icon-traversal rejection
  is string-pattern-only.
- Do not modify files outside: `server/workspace/src/apps/manifest.ts`,
  `server/workspace/tests/app-manifest.test.ts`,
  `server/workspace/package.json`.

## Model

**Sonnet** — the default tier for every `iw9-f4` stream per
`IW-9-EXECUTION-OVERVIEW.md`'s "Model tiers for the implementing fleet"
table. F4 does not appear in that table's Opus-escalation row, and this
stream is pure elaboration against a tech-plan-frozen Zod schema — exactly
the case the overview reserves Sonnet for. Haiku is not used in this fleet
(unavailable); do not downgrade below Sonnet regardless. Do not escalate to
Opus.

## Report back

When done: check off tasks 1.1–1.6 in
`openspec/changes/iw9-f4-app-identity/tasks.md`, and open a PR (or write
`briefs/01-report.md`) containing: what you built, how you verified it, any
deviations from this brief and why, and anything stream 3 (which imports
`AppYaml` from this file) needs to know.
