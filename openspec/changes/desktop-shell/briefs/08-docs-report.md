# Report: Desktop documentation

## What was built

Stream 8 lands product docs for the desktop shell (tasks 8.1–8.3):

1. **8.1** — `docs/desktop.md` covers architecture (main / supervisor /
   BundleManager / `app://` / bridge), the two update channels (shell
   auto-updater vs signed OTA renderer bundles) and why both exist (Chromium
   patches vs live hydration), Application Support layout
   (`bundles/` + `gateway-data/`), and how to run the shell against a locally
   vendored gateway (`vendor:gateway` → `build:main` → `start`).
2. **8.2** — Same doc states plainly: App Sandbox is off; workspace root is
   application-enforced (not OS); Mac App Store distribution is a deliberate
   non-goal. Points at `local-first.md` and `desktop/docs/signing.md`.
3. **8.3** — `docs/index.md` links `desktop.md` next to `local-first.md`.

## Verification

Content review against tech-plan D3/D4/D6, landed `desktop/src/*`, and
`desktop/docs/signing.md`. `pnpm lint` is pre-broken per AGENTS.md — skipped.

## Blockers / follow-ups

None for this stream.

## Deviations

None.
