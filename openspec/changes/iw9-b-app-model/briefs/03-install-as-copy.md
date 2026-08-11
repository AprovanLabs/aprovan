# Brief: Server — Install-as-copy + hosting mode

## Mission

Rebuild install from serve-from-origin to install-as-copy (D8): copy the
origin archive into the installer's `Apps/<slug>`, pin `{tag?, commit}`,
record F2's `hosting: "managed" | "hosted"` (+ optional `hostingWorkspaceId`),
delete request-time origin reads (`cachedOriginRelease` and live-apps/apps
origin branches), and add explicit update-check/apply with local-edits guard.
Depends on stream 1's `assertRootAvailable`.

## Read first

1. `openspec/changes/iw9-b-app-model/tech-plan.md` (D4, D5)
2. `openspec/changes/iw9-b-app-model/specs/app-install-lifecycle/spec.md`
3. `openspec/changes/iw9-b-app-model/specs/app-data-hosting/spec.md`
4. `server/workspace/src/apps/install.ts` (current `AppInstallation`, `materializeFork` ~262-285)
5. `server/workspace/src/routes/live-apps.ts` (~119-126)
6. `server/workspace/src/routes/apps.ts` (~115-120, 169-171)
7. F2 `AppInstallation.hosting` contract; F4 `AppYaml.hostModes`
8. Stream 1 `assertRootAvailable`

## Tasks

> Depends-on: 1 | Repo: aprovan | Touches: aprovan/server/workspace/src/apps/install.ts, aprovan/server/workspace/src/routes/live-apps.ts, aprovan/server/workspace/src/routes/apps.ts, aprovan/server/workspace/tests/apps-install-copy.test.ts | Verify: pnpm --filter @aprovan/workspace test -- apps-install-copy.test.ts && grep -rn "cachedOriginRelease" AAP/server/workspace/src REG 2>/dev/null

Copy tasks 3.1–3.6 verbatim from `tasks.md` stream 3.

## Acceptance criteria

All scenarios in `specs/app-install-lifecycle/spec.md` and
`specs/app-data-hosting/spec.md` that this stream owns (install copies;
origin never read at serve; update explicit re-copy; local-edits guard;
multi-mode requires pick; hosting immutable post-creation).

## Verify

```bash
AAP=/Users/jacob/Documents/Code/AprovanLabs/aprovan
REG=/Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @aprovan/workspace test -- apps-install-copy.test.ts
# Must return nothing:
grep -rn "cachedOriginRelease" "$AAP/server/workspace/src" "$REG" 2>/dev/null || true
pnpm --filter @aprovan/workspace typecheck
```

## Constraints

- Touch ONLY Touches paths.
- Field names must match F2 verbatim: `hosting`, never `hostingMode`.
- Do not delete `materializeFork` logic without preserving it for stream 7's
  migration script seed — either keep a local helper stream 7 can import, or
  copy the loop into a comment/export that migration will consume. Prefer
  extracting the copy loop to a named helper still in `install.ts`.
- Never touch `apps/releases.ts` (iw9-a). Consume release-as-tag when present;
  fall back to app-root VCS head commit.
- No procedure registration (stream 6) or client picker UI (stream 9).

## Report back

Check off tasks; PR or `briefs/03-report.md`. Note anything stream 7 needs
about the preserved materialize helper.
