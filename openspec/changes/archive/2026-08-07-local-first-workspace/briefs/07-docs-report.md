# Report: 07 — Local-first documentation

## What was built

- **`docs/local-first.md`** — shipped model for workspace execution locus: what a local workspace is, why locus is immutable, what cloud workspaces cannot do (no local-machine bindings, no offline cache / D5), and that the VFS root is a user-chosen boundary enforced in application code via shared `containPath`, not by the OS. Also notes runtime `GatewayResolver` routing and local→cloud outbound binds.
- **`docs/index.md`** — link under References.
- **`docs/app-data.md`** — cross-ref from the Future section to `local-first.md` (records/files vs locus/offline).
- **`tasks.md`** — checked off 7.1–7.3.

## Verify

Content matches landed streams 1–6 (contain, local-directory VFS, KeystoreCipher, locus fields, locus dispatch, GatewayResolver) and tech-plan D2/D5. No code changes; `pnpm lint` skipped (pre-broken eslint config per AGENTS.md).

No `docs/index.md` conflict with streaming-sessions docs on `origin/main` at PR time (streaming `index` link not yet on main).

## Deviations

None.

## Notes

This completes the `local-first-workspace` change when merged. Follow-on packaging / OS keystore binding remains `desktop-shell`.
