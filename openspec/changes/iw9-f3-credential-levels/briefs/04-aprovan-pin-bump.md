# Brief: aprovan — dependency pin bump (separate commit)

- **Change**: `iw9-f3-credential-levels` (stream 4 of 7)
- **Repo**: `aprovan` — work happens entirely in
  `/Users/jacob/Documents/Code/AprovanLabs/aprovan`
- **Depends-on**: stream 3 (the new version must already be live on npm —
  confirm with `npm view @aprovan/registry-server version` before
  starting; do not guess the version number)
- **Model**: Sonnet (per `IW-9-EXECUTION-OVERVIEW.md`) — this is process,
  not logic; there is no spec surface for this stream.

## Mission

When you are done, `@aprovan/workspace`'s `package.json` pins
`@aprovan/registry-server` to the version stream 3 published, in its own
commit, with `pnpm install` run and typecheck passing — before any F3
aprovan code (streams 5-7) touches a single line. This is the second half
of the publish→pin gate `IW-9-IMPLEMENTATION-PROMPT.md`'s execution
protocol requires as a discrete step; bundling it with stream 5's code
changes is explicitly disallowed by `tasks.md`.

## Read first

All paths below are relative to
`/Users/jacob/Documents/Code/AprovanLabs/aprovan` unless noted.

1. `openspec/changes/IW-9-APP-FIRST.md` — "Cross-repo coordination" rule 2
   (pin must stay `^0.2.7`-or-later)
2. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md` — execution protocol
   step 5 (why this is its own commit, never bundled with stream 5+)
3. `server/workspace/package.json` — line ~42, current pin (verify the
   current value; do not assume `^0.2.10` is still current if streams
   1-3 already ran)

## Tasks

Copied verbatim from `openspec/changes/iw9-f3-credential-levels/tasks.md`
(aprovan repo), section "4. aprovan — dependency pin bump (separate
commit)":

- [ ] 4.1 Bump the `@aprovan/registry-server` pin to the version
      published in 3.1 (must stay `^0.2.7`-or-later per IW-9 rule 2) in
      its own commit; `pnpm install`; confirm typecheck passes before
      any aprovan F3 code lands.

## Acceptance criteria

None — this stream is process, not a spec surface. The acceptance bar is
the Verify section below: the pin matches the published version and the
workspace package typechecks against it.

## Verify

Run every command from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.
All must pass before reporting done.

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
grep -n "@aprovan/registry-server" server/workspace/package.json
pnpm --filter @aprovan/workspace check-types
```

Before bumping, confirm the target version is actually live (do not pin
to a version that has not finished publishing):

```bash
npm view @aprovan/registry-server version
```

After `pnpm install`, confirm the lockfile actually resolved to the new
version (not a cached stale resolution):

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
grep -A2 "'@aprovan/registry-server'" pnpm-lock.yaml | head -5
```

Per this repo's `AGENTS.md`: build workspace dependencies before
typechecking if `check-types` fails to resolve `dist/` output —
`pnpm --filter @aprovan/registry-server build` is not applicable here
(that package now comes from npm, not the monorepo), but if
`@aprovan/workspace` itself has unbuilt local dependents, run
`pnpm build` first per the repo's standard note on `dev`/`test`
depending on `^build`.

## Constraints

- Implement only what the task says — a version bump, `pnpm install`, and
  a typecheck. Do not touch any source file that consumes
  `@aprovan/registry-server`'s new exports; that is streams 5-7's job,
  strictly after this commit.
- Do not modify files outside:
  `server/workspace/package.json`, `pnpm-lock.yaml`.
- **This MUST be its own commit** — do not combine it with any other
  change, even a trivial one. Streams 5-7 depend on being able to bisect
  "did this break because of the pin, or because of the code that
  consumes it."
- The pin must remain `^0.2.7`-or-later (per IW-9 rule 2) — do not
  loosen or pin exactly (`=`) unless the existing convention in
  `package.json` already does so.

## Report back

When done: check off task 4.1 in
`openspec/changes/iw9-f3-credential-levels/tasks.md`, and write
`openspec/changes/iw9-f3-credential-levels/briefs/04-report.md` containing:
the exact version pinned, the commit hash, and confirmation
`check-types` passed — stream 5 starts from this commit and will fail
immediately if the pin or the typecheck is not clean.
