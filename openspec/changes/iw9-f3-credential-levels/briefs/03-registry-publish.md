# Brief: Registry — publish

- **Change**: `iw9-f3-credential-levels` (stream 3 of 7)
- **Repo**: `registry` — work happens entirely in
  `/Users/jacob/Documents/Code/AprovanLabs/registry`
- **Depends-on**: stream 2 (the resolution contract must exist and be
  merged before it can be published)
- **Model**: Sonnet (per `IW-9-EXECUTION-OVERVIEW.md`) — this is process,
  not logic; there is no spec surface for this stream.

## Mission

When you are done, `@aprovan/registry-server` is published to npm at a new
**minor** version carrying everything streams 1-2 added (`CredentialLevel`,
`effectiveLevel`, `CredentialProvisionInput.level`, `CredentialInvoker`,
`ResolvedCredential`, `CredentialNotConnectedError`,
`CredentialService.resolveForInvoker`). This is the hard cross-repo gate:
nothing in aprovan (streams 4-7) can compile against the new types until
this publish completes and is confirmed live on the registry — per IW-9
cross-repo rule 2 ("consumption only via published npm; publish before
pin"), and per `IW-9-IMPLEMENTATION-PROMPT.md`'s execution protocol step 5
("registry work → version bump + publish → aprovan pin bump as its own
commit → aprovan work").

## Read first

All paths below are relative to
`/Users/jacob/Documents/Code/AprovanLabs/registry` unless noted.

1. (aprovan repo) `openspec/changes/IW-9-APP-FIRST.md` — "Cross-repo
   coordination" section, rules 1-2 (publish-before-pin; consumption only
   via published npm)
2. (aprovan repo) `openspec/changes/iw9-f3-credential-levels/tech-plan.md`
   — "Repo split & publish sequence" section
3. (aprovan repo) `openspec/changes/iw9-f3-credential-levels/briefs/02-report.md`
   — read if it exists; it names exactly what stream 2 exported, which is
   what your changelog entry must name
4. `packages/registry-server/package.json` — current version (verify the
   current published version with `npm view @aprovan/registry-server
   version` before bumping — do not assume the number in this brief is
   still current)
5. `packages/registry-server/CHANGELOG.md` — existing entry format/style

## Tasks

Copied verbatim from `openspec/changes/iw9-f3-credential-levels/tasks.md`
(aprovan repo), section "3. Registry — publish":

- [ ] 3.1 Minor version bump (additive/widening API only), changelog
      entry naming the new exports, `pnpm --filter
      @aprovan/registry-server build && pnpm --filter
      @aprovan/registry-server test`, then publish to npm (publish
      before pin — IW-9 cross-repo rule 2).

## Acceptance criteria

None — this stream is process, not a spec surface. The acceptance bar is
the Verify section below: the new version is live on npm and its exports
match what streams 1-2 built.

## Verify

Run every command from `/Users/jacob/Documents/Code/AprovanLabs/registry`.
All must pass before reporting done.

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
npm view @aprovan/registry-server version   # confirm CURRENT published version first
pnpm --filter @aprovan/registry-server build
pnpm --filter @aprovan/registry-server test
```

Confirm the version bump is minor, not patch or major (the API is
additive/widening only — no existing export's signature changed):

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
git diff HEAD~1 -- packages/registry-server/package.json   # after bumping, before publishing
```

Publish, then confirm it is live:

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry/packages/registry-server
npm publish
npm view @aprovan/registry-server version   # must show the new version
```

Lint: this repo's root `pnpm lint` has a pre-existing, unrelated baseline
of **236 errors / 22 warnings** (verified 2026-08-09; see
`briefs/deviations.md` in the aprovan repo). This stream does not touch
source files, so it does not change that count — do not run root
`pnpm lint` as a publish gate; it was never green before this change and
publishing does not require it to become green.

## Constraints

- Implement only what the task says. Do not touch any `src/` file in this
  stream — if the build or tests fail, the problem is in streams 1-2's
  work; stop and report rather than patching source here.
- Do not modify files outside:
  `packages/registry-server/package.json`,
  `packages/registry-server/CHANGELOG.md`.
- The version bump MUST be minor (e.g. `0.2.x` → `0.3.0`), never patch
  (would mask an additive API change) and never major.
- Requires npm publish rights for `@aprovan/registry-server` — if you do
  not have them, stop and report the blocker rather than working around
  it.
- Do not touch `openspec/changes/iw9-f3-credential-levels/**` in the
  aprovan repo (read-only context for this brief).

## Report back

When done: check off task 3.1 in
`openspec/changes/iw9-f3-credential-levels/tasks.md` (aprovan repo), and
write `openspec/changes/iw9-f3-credential-levels/briefs/03-report.md`
(aprovan repo) containing: the exact published version string, the
changelog entry, and confirmation `npm view @aprovan/registry-server
version` shows it live — stream 4 bumps aprovan's pin to exactly this
version and will block if it is not yet visible on the registry.
