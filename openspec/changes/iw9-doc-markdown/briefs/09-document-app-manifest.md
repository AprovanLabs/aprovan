# Brief: App — Document app manifest and install surface

**Depends-on: -** | Repo: aprovan | Wave 0 (parallel with 1)

## Mission

When you are done, Document ships as a managed-only `Apps/document/app.yaml`
app that reconciles under iw9-f4, installs without a hosting prompt, uses
shared icon fallback, and shares via platform `vfs.share` with no
Document-specific share code.

**Hard gate:** `iw9-b-app-model` and `iw9-f4-app-identity` must be on main.
If `reconcileApp` / managed-only install is missing, stop and report.

**Note:** Do not declare `doc/fix-typos` here — that is stream 10 (CF-5
already on main). This stream's manifest stops at capabilities/hostModes.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariants 5, 9, 10
3. `openspec/changes/iw9-doc-markdown/tech-plan.md` — App manifest block
4. `openspec/changes/iw9-doc-markdown/ux.md` — Install the Document app
5. `openspec/changes/iw9-doc-markdown/specs/document-app/spec.md`
6. `openspec/changes/iw9-doc-markdown/tasks.md` — stream 9 + B/F4 external note
7. iw9-f4 `AppYaml` / `reconcileApp`; `packages/ui/src/apps/app-icon.ts`

## Tasks

- [x] 9.1 (iw9-f4/iw9-b-gated) `Apps/document/app.yaml` per tech-plan
      "Interfaces & Data" App manifest block: `title`, `description`,
      `icon`, `capabilities: ["vfs.*", "sessions.*", "agents.run"]`,
      `hostModes: ["managed"]` — single mode so iw9-b's install flow skips
      the hosting prompt (spec document-app "Install skips the hosting
      prompt"; D2).
- [x] 9.2 Confirm reconcile (iw9-f4's `reconcileApp`) accepts the manifest
      with no hand-written `appId` (spec "Manifest validates") — this task
      is verification against the landed iw9-f4 surface, not new reconcile
      code.
- [x] 9.3 Document's app tile uses the manifest's declared icon or the D6
      fallback via the shared `packages/ui/src/apps/app-icon.ts` (iw9-f4) —
      no Document-specific icon rendering code.
- [x] 9.4 Sharing: confirm a file under `Apps/document/`'s root link-shares
      and person-shares through iw9-b's existing `vfs.share`/
      `GET /share/<key>` surface with zero Document-specific code (spec
      "Share management is platform-native") — verification task, add a
      Document-scoped case to iw9-b's existing share test suite rather than
      duplicating share tests here.

## Acceptance criteria

From `specs/document-app/spec.md`:

#### Scenario: Install skips the hosting prompt

- **WHEN** a user installs the Document app
- **THEN** no hosted/managed choice is presented (single declared mode) and
  the install record carries `managed`, immutable (invariant 10)

#### Scenario: Manifest validates

- **WHEN** the platform reconciles the Document app root
- **THEN** its `app.yaml` passes the iw9-f4 loader/validator with no
  hand-written `appId` present

#### Scenario: Share management is platform-native

- **WHEN** a user shares a document by link and later revokes the share
- **THEN** creation, expiry, and revocation behave per iw9-b `vfs` sharing,
  and revocation immediately ends anonymous access

## Verify

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/app-directory.test.ts --grep document && pnpm --filter @aprovan/patchwork-web typecheck
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `Apps/document/app.yaml`, `client/web/src/features/document/DocumentAppTile.tsx`
- For 9.4: adding a Document case to an existing iw9-b share test file is
  allowed even if outside the Touches list — record the path in
  `briefs/deviations.md` if you must; prefer a minimal Document-named test
  colocated with existing share tests.
- Do not add `agents:` / `doc/fix-typos` (stream 10).
- Do not implement anonymous live join (invariant 9).

## Report back

When done: check off your tasks in `openspec/changes/iw9-doc-markdown/tasks.md`, and open a
PR (or write `briefs/09-report.md`) containing: what you built, how you verified
it, any deviations from the brief and why, and anything you discovered that the
next wave needs to know.
