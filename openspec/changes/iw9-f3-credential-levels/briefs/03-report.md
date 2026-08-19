# Report: 03 — Registry publish

## Published version

`@aprovan/registry-server@0.3.0` — live on npm (published 2026-08-19T02:19Z
by the owner; `npm view @aprovan/registry-server version` → `0.3.0`).
Minor bump from 0.2.11 per the brief (additive/widening API only).

## Changelog entry (registry `packages/registry-server/CHANGELOG.md`, commit 6e49685)

> ## 0.3.0
>
> Invoker-aware credential resolution (IW-9 F3 streams 1-2). Additive
> exports only: `CredentialLevel`, `effectiveLevel`, `defaultLevelForType`,
> `isCredentialLevel`, `credentialLevelValues`,
> `CredentialProvisionInput.level`, `CredentialInvoker`,
> `CredentialResolutionRequest`, `ResolvedCredential`,
> `CredentialNotConnectedError`, and
> `CredentialService.resolveForInvoker(tenantId, provider, invoker)`.
> `resolveById` widened to return `ResolvedCredential & { provider }`;
> `ResolvedProfile.credential` widened to `ResolvedCredential`.

## Process notes

- Build required rebuilding stale workspace deps first
  (`pnpm --filter "@aprovan/registry-server..." build`) — the package-only
  build failed against a stale `@utdk/common/dist`.
- Test suite at the documented 4-failure pre-existing baseline
  (02-report.md deviations §3); no new failures.
- Publish required owner 2FA; subsequent npm writes use the granular
  `NPM_TOKEN` from `aprovan/infra/aws/.env`.

Stream 4 pins aprovan to exactly `0.3.0`.
