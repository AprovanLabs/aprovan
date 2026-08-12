# Report: 06-leak-gates-and-validation

## Verdict

`iw9-f4-app-identity` leak gates are green in both repos. Canonical URL
emitters no longer bake `/apps/<workspaceId>/…` into `routes/`. Public shell
config no longer contains the `/apps/id/` literal in `app-urls.ts`.
`openspec validate iw9-f4-app-identity --type change` passes. F4-owned suites
(app-urls, live-apps, identity, install-copy, manifest, slugs, reconcile,
directory) + `@aprovan/ui` are green. Frozen contracts (`AppYaml` /
`reconcileApp`) are ready for `iw9-b-app-model` consumers.

## Grep gates (pasted)

```text
$ ! grep -rn 'apps/${workspaceId}' server/workspace/src/routes/
→ exit 0 (0 matches)  # 6.1 aprovan

$ ! grep -rn 'apps/${workspaceId}' /Users/jacob/Documents/Code/AprovanLabs/registry/packages --include='*.ts'
→ exit 0 (0 matches)  # 6.1 registry

$ ! grep -rn '/apps/id/' server/workspace/src/routes/app-urls.ts
→ exit 0 (0 matches)

$ ! grep -rn 'region' server/workspace/src/routes/app-urls.ts
→ exit 0 (0 matches)  # 6.2
```

## What this closeout fixed

1. **Canonical emitters** — `apps/url-bases.ts` plus updates to
   `routes/app-urls.ts` (shell `appBase` via helpers so `/apps/id/` is not
   literal in that file), `routes/apps.ts` manifest JSON, and
   `apps/service.ts` (`url` / `permalink` / `apiBase` → `/a/<appId>` +
   `/api/gateway/apps/id/<appId>`).
2. **Shim mount bug** — `live-apps.ts` `requestPath` stripped `/apps` so
   `createWorkspaceApp().request("/apps/…")` resolves correctly (Hono keeps
   the full pathname under `app.route("/apps", …)`). Regression covered in
   `tests/live-apps.test.ts`.
3. **Stream-5 leftover tests** — retargeted
   `app-domain` / `app-identity` / `apps-install-copy` / `app-integration`
   live-surface expectations from `/apps` 200s to canonical `/a` / `/w/…/a`
   (or 302 → Location).
4. **UI wire defaults** — `@aprovan/ui` permalink fallbacks now `/a/<appId>`.

## Suites

| Package | Result |
|---|---|
| `@aprovan/ui` | **15/15 passed** |
| F4-owned workspace files (8 files) | **107/107 passed** |
| Full `@aprovan/workspace` | **628 passed / 67 failed / 63 skipped** (17 files) |

### Pre-existing failures (not F4; not fixed here)

Same-workspace install-as-copy root overlap and unrelated interface/sandbox
churn on current `main` tip after #206:

- `app-domain` install lifecycle — `apps/install { app: "tmpl" }` in the
  owning workspace → 400 slug/root overlap (iw9-b D8).
- `app-install`, `app-dependencies`, `app-integration` — same class of
  install-as-copy / update assertions.
- `apps.test` keyvalue `list` shape (`[{key}]` vs `[string]`).
- Broader: `interfaces`, `agent-*`, `get-client`, `oauth-tokens`,
  `profiles`, `sandbox*`, `sync`, `telemetry`, `vcs-interface`.

## openspec validate

```text
$ openspec validate iw9-f4-app-identity --type change
Change 'iw9-f4-app-identity' is valid
```

## Remaining debt

- Gateway tool routes still live under `/api/gateway/apps/id/<appId>` and
  `/api/gateway/apps/<ws>/<installId>` (functional; live pages are
  canonical). Remount to `/api/gateway/a/…` is out of F4.
- `packages/registry-ui` still hard-codes `/apps/id/<appId>` permalink
  fallbacks (not in `@aprovan/ui` verify scope).
- Same-workspace `apps/install` tests need retargeting for install-as-copy
  (iw9-b follow-up).
- Tasks 6.1–6.4 checked off in `tasks.md`.
