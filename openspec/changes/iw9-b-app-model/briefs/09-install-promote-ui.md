# Brief: Client — Install flow + hosting picker + promote-out UI

## Mission

Build install dialog (hosting picker with exact PRD/ux.md copy when multi-mode),
promote-out dialog, and update-available affordance wired to stream 6
procedures. Explicit slug on collision; never auto-suffix.

## Read first

1. `openspec/changes/iw9-b-app-model/ux.md` (install, promote, update)
2. Specs: `app-data-hosting`, `app-install-lifecycle`, `personal-app`
3. `client/web/src/components/apps/**` (create as needed)
4. Stream 6 procedure contracts

## Tasks

> Depends-on: 6 | Repo: aprovan | Touches: aprovan/client/web/src/components/apps/** | Verify: pnpm --filter @aprovan/patchwork-web typecheck

- [x] 9.1 Build the install dialog: reads the target app's declared
      `hostModes`; no picker when exactly one bucket (managed-only or
      hosted-only) is available; when both managed and a hosted flavor are
      declared, render the two-option picker with the exact copy from
      ux.md/PRD invariant 5 — managed: *"Data lives in your own space..."*;
      hosted: loud disclosure naming the host, visually secondary, never a
      plain radio row (`app-data-hosting` — "Multi-mode requires the pick").
- [x] 9.2 Wire the 400-with-declared-modes response into the picker (a
      mode-less API call surfaces the accepted options inline, per
      tech-plan's owned `apps.install` contract) and the explicit-slug-on-
      collision 400 into a field-scoped error (no auto-suffix client
      behavior yet — PRD Open Q2 unresolved, ux.md flow step 3 documents the
      explicit-choice fallback).
- [x] 9.3 Build the promote-out dialog: source path (read-only), editable
      slug field pre-filled from the source folder name, live preview URL;
      collision shows a field-scoped error, any other failure shows a
      retry-safe banner leaving the source subtree untouched (ux.md
      Promote-out dialog states).
- [x] 9.4 Build the update-available affordance in the apps management
      surface: "v(N) available → Copy again", explicit local-edits-overwrite
      confirmation when the install has local edits, never an automatic
      trigger (`app-install-lifecycle` — "Update is an explicit re-copy").

## Verify

```bash
pnpm --filter @aprovan/patchwork-web typecheck
```

## Constraints

- Touch ONLY `client/web/src/components/apps/**` (+ report/tasks).
- Exact managed/hosted disclosure copy from ux.md/PRD invariant 5.
- No sidebar IA (stream 8), sharing (10), or mounts UI (11).

## Report back

PR or `briefs/09-report.md`.
