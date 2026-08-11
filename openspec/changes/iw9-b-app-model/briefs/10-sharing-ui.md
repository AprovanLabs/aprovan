# Brief: Client — Sharing UI

## Mission

Share dialog (Person/Link tabs), Shared-with-me listing, Manage-shares table
with revoke confirmation, and anonymous link-landing view per ux.md +
artifact-sharing spec. Backed by stream 6 `vfs.share*` procedures and
`GET /share/:key`.

## Read first

1. `openspec/changes/iw9-b-app-model/ux.md` (sharing screens)
2. `openspec/changes/iw9-b-app-model/specs/artifact-sharing/spec.md`
3. Stream 4/6 share contracts
4. Existing dialog patterns under `client/web/src/components/`

## Tasks

Copy 10.1–10.4 from `tasks.md` verbatim.

## Verify

```bash
pnpm --filter @aprovan/patchwork-web typecheck
```

## Constraints

- Touch ONLY `client/web/src/components/sharing/**`.
- Expired/revoked/never-existed links look identical.
- No sibling/parent nav on anonymous landing.

## Report back

PR or `briefs/10-report.md`.
