# Brief: tools-addressing §1 — Naming authority

## Mission
Every provider in `data/registry.json` derives a unique, valid JS-identifier
`globalAlias` (e.g. `google/drive` → `googleDrive`) at registry load. Collisions and
non-identifiers fail `loadRegistryProviders` immediately. This is the naming authority
all later `tools.` binding streams consume.

## Read first
1. `openspec/changes/tools-addressing/{prd,tech-plan,tasks}.md` (in aprovan repo)
2. Tech-plan D1–D2 and Interfaces (`ResolvedProviderName.globalAlias`,
   `assertUniqueGlobalAliases`)
3. registry `packages/bundler/src/naming.ts`
4. registry `packages/bundler/src/naming.test.ts` (create if missing)
5. registry `packages/bundler/src/provider.ts` (`loadRegistryProviders` /
   `assertValidProviderName` call site)

## Tasks
- [ ] 1.1 Add `globalAlias` to `ResolvedProviderName`, derived in
      `resolveProviderNameFromHostname`: segments joined camelCase, internal dashes
      removed (`google/drive` → `googleDrive`, `adyen/checkoutservice` →
      `adyenCheckoutservice`, `ably-io/platform` → `ablyIoPlatform`).
- [ ] 1.2 Add `assertUniqueGlobalAliases(names)`; call it from `loadRegistryProviders`
      beside the existing `assertValidProviderName` pass. Comparison is
      case-insensitive.
- [ ] 1.3 Assert every derived alias is a valid JS identifier — `/^[A-Za-z_$][\w$]*$/`.
      A provider name that cannot produce one is a load error naming the provider.
- [ ] 1.4 Tests: single-segment names alias to themselves unchanged; three-segment names;
      names with leading digits (`api-` prefix path); a deliberate collision fails load
      with both offending provider names in the message.

## Acceptance criteria
**Done when** every provider in `data/registry.json` derives a unique, valid-identifier
alias, and a seeded collision fails `loadRegistryProviders` rather than surfacing later.

Rejected (do not implement): two-segment scan; suite-root proxy; import-only slash access.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/utdk-bundler test
```
Paste full command output in the report.

Also: load real `data/registry.json` through the naming path (or existing load test) and
confirm no collision. Grep that `globalAlias` exists on `ResolvedProviderName`.

## Constraints
- Implement only §1 tasks; interfaces in tech-plan are fixed.
- Surgical changes only; match existing style.
- Do not modify files outside: registry `packages/bundler/src/naming.ts`,
  `packages/bundler/src/naming.test.ts`, `packages/bundler/src/provider.ts`
  (and tightly related test files under bundler if needed for 1.4).
- Work on a new branch from `origin/main`. Open a PR to `AprovanLabs/registry`.
- After merge-ready: check off tasks in aprovan
  `openspec/changes/tools-addressing/tasks.md` (separate commit/PR on aprovan if
  needed) and write `openspec/changes/tools-addressing/briefs/01-report.md`.

## Report back
PR URL, verify paste, deviations, anything Wave 1 (TA §2/§3) needs to know.
