# Report: Core repo purge (purge-dead-code stream 3)

**Status**: complete. Landed in https://github.com/AprovanLabs/core/pull/60 (merged 2026-08-02).

## Tasks

- **3.1** `infra/aws/dist/` removed locally (untracked; no git diff). Re-confirmed 2026-08-04 on
  a stale local checkout that still carried the dir.
- **3.2** `infra/cloudflare/tunnel.tf` deleted on GitHub `main` (404 via contents API;
  `workspace-tunnel.tf` present). Local stale copy also removed 2026-08-04.
- **3.3** `pnpm run build` in `infra/aws` regenerates `dist/`; `pnpm run typecheck` passes.
  `tofu validate` in `infra/cloudflare` succeeds (pre-existing deprecation warnings only).

## Verify (re-run 2026-08-04)

```
cd core/infra/aws && pnpm run build && pnpm run typecheck   # pass
cd core/infra/cloudflare && tofu validate                  # Success (warnings only)
```

## Notes

Local `core` remote URL embeds an expired `ghp_` token, so `git fetch` fails with
"Device not configured". GitHub `main` (via `gh api`) is the source of truth for 3.2;
no new core PR needed.
