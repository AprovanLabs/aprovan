# Report: B closeout follow-ups (F1–F4)

## What was built

### F1 — `vfs.shares.received`
- **`routes/tools.ts`**: Additive discovery entry `shares.received`.
- **`native-dispatch.ts`**: Dispatches to `listSharesReceivedBy` (same
  shape as `shares.list`: `{ shares }`).
- **`vfs-shares.test.ts`**: Person-share scenario asserts the native op
  returns the received share for the grantee.

### F2 — `/share/:key` SPA landing
- **`main.tsx`**: Matches `/(?:^|\/)share\/:key` **outside** `AuthGate` so
  anonymous link landing works when Cognito is configured.
- **`App.tsx`**: Defense-in-depth match for in-app re-renders.
- Product URL remains `${origin}/share/<key>` (gateway serves bytes at
  `GET ${GATEWAY_BASE}/share/:key`). SPA owns the path when the web origin
  receives the navigation; CloudFront may still route `/share/*` to the
  gateway API — both work: gateway returns JSON, SPA renders when it gets
  the document.

### F3 — InstallDialog / PromoteDialog wiring
- **`registry-ui` `AppsPanel`**: Optional `onInstall` — host owns the
  dialog; built-in `InstallSheet` only when unset.
- **`client/.../AppsPanel`**: Wires `InstallDialog` for directory installs;
  toolbar + source-path picker for `PromoteDialog`.
- **`AppsLauncher` empty CTA**: Split into “Install from directory” /
  “Promote from Personal”, via `apps-entry` intent into `native://apps`.

### F4 — Grep-gate progress (7.4)
- **`summarizeInstall`**: Copy-model installs (`root` set) no longer emit
  `resolvedRelease` / `editing` / `prefix` on the wire.
- **`InstallSummary` / `normalizeInstall`**: `editing` optional; project
  `root` / `hosting`; deprecate notes on legacy fields.
- **`InstallSettingsTab`**: Hide legacy Editing section for copy-model;
  show `root` beside pin; keep `resolvedRelease` display only for legacy.

## How verified

```bash
pnpm --filter @aprovan/workspace typecheck     # ✓
pnpm --filter @aprovan/patchwork-web typecheck # ✓
pnpm --filter @aprovan/workspace test -- vfs-shares
# ✓ 7 tests passed
```

## Remaining debt (7.4 / follow-ups)

1. **`paths` derived projection** — `apps/store.ts` still keeps
   `paths: [root]` for iw9-a / typecheck consumers. Not deleted.
2. **`resolvedRelease` / `editing` / `prefix` on `AppInstallation`** —
   still optional on `install.ts` and used by legacy `apps.update` /
   `apps.configure` / `apps.update` materialize paths in `service.ts`.
3. **Migration scripts** — intentional refs in
   `migrate-installs-to-copy.ts` / `migrate-app-roots.ts`.
4. **`AppPin` wire type** — still `{channel}|{release}` only; commit pins
   coerce poorly in registry-ui pin labels (defensive `"commit" in pin`
   added, but wire `normalizePin` does not yet mint `{commit,tag?}`).
5. **CloudFront `/share` routing** — confirm edge maps `/share/*` to SPA
   and/or gateway as intended for production; SPA + gateway both handle
   their roles when they receive the request.
6. **`InstallSheet` retained** in registry-ui for hosts that do not pass
   `onInstall` (registry web).

## Deviations

1. Promote empty CTA uses a source-path picker before `PromoteDialog`
   (dialog source is read-only).
2. Directory installs default `hostModes: ["managed","hosted"]` so the
   picker appears; server hosting-required 400 still recovers options.
