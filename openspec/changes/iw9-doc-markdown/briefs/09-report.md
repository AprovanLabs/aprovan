# Stream 9 report — Document `app.yaml` + tile

**PR:** https://github.com/AprovanLabs/aprovan/pull/254
**Branch:** `feat/iw9-doc-app-manifest`
**Base:** `origin/main`

## Built

| Path | Role |
|---|---|
| `Apps/document/app.yaml` | Managed-only Document flagship: title/description/icon, `hostModes: [managed]`, ceiling `vfs.*` / `sessions.*` / `agents.run` |
| `client/web/src/features/document/DocumentAppTile.tsx` | Thin wrapper over shared `AppIconTile` (D6 `appIconFallback`) — no Document-specific icon chrome |
| `server/workspace/tests/vfs-shares.test.ts` | Document-scoped link + person share case (9.4; see deviations) |

### Capability ceiling / host mode

```yaml
hostModes:
  - managed
capabilities:
  - vfs.*
  - sessions.*
  - agents.run
```

`agents:` / `doc/fix-typos` **not** declared — stream 10.

## Platform confirmation (9.2 / install skip)

| Check | Result |
|---|---|
| `loadAppYaml(Apps/document/app.yaml)` | ok; no `appId` in authored YAML |
| `reconcileApp({ root: "Apps/document", yaml })` | mints platform `appId`, `created: true` |
| `resolveHostingChoice` with sole `managed` | returns `{ hosting: "managed" }` with no `requested` (skips prompt) |

Hard gate satisfied: iw9-f4 `reconcileApp` + iw9-b single-bucket install are on main.

## Verified

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/vfs-shares.test.ts -t "Document app root"
# ✓ 1 passed

APROVAN_ENV=off pnpm --filter @aprovan/patchwork-web typecheck
# ✓

# 9.2 one-shot: loadAppYaml + reconcileApp + resolveHostingChoice (see above)
```

Brief verify (`app-directory.test.ts --grep document`) — see `briefs/deviations.md`.

## Tasks

| Task | Status |
|---|---|
| 9.1 Author `Apps/document/app.yaml` | done |
| 9.2 Confirm reconcile accepts manifest | done |
| 9.3 DocumentAppTile via shared icon path | done |
| 9.4 Document case on vfs share suite | done |

## Deviations

See `briefs/deviations.md` (vfs-shares path; `--grep` → `-t`; app-directory filter empty).

## Next wave

- Stream 10 owns `agents:` / `doc/fix-typos` on this manifest.
- No `document.svg` asset shipped — `icon: document.svg` resolves when present under the installed app root; otherwise `AppIconTile` falls back to D6 letter+color for slug `document`.
- `DocumentAppTile` is not wired into `AppsLauncher` (launcher already uses `AppIconTile` for all apps); available for Document feature surfaces.
