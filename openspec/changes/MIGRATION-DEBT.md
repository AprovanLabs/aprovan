# Migration debt — audit and remediation

Deferred debt from half-finished moves across `registry` and `aprovan`: duplicate
implementations, dead husks left behind by completed migrations, and API drift between
what `registry` publishes and what `aprovan` consumes.

Audit method is the IW-8 orchestrator's definition-of-done rule 4 — *grep for anything a
stream claims to have deleted or replaced, in both repos; a task that says "delete X" is
not done until `grep X` returns nothing*. Every row below is grep/`git ls-files` evidence,
not inference.

## Settled

- **Husk test:** a directory under a workspace glob with **zero git-tracked files**
  (`git ls-files <dir> | wc -l` = 0) is build residue from a completed move, not a
  package. `dist/` + `.turbo/` + `node_modules/` with no `package.json` and no `src`.
- **Delete, don't deprecate.** A husk left "just in case" is how this codebase acquired a
  duplicate implementation twice.
- **Re-export, never redeclare.** Where a local type name must exist, it is
  `export type { X } from "<owner>"`. `export type` erases at compile time, so re-exporting
  from a server package into a browser package costs nothing at runtime — verified against
  the built bundle, not assumed.
- **`@aprovan/registry-server` 0.2.4/0.2.5/0.2.6 are deprecated-broken on npm. 0.2.7 is the
  only good version in the 0.2.x line.** Every new pin uses `^0.2.7`.
- Husks are **untracked**, so removing them produces no git diff. The remediation is real
  but unreviewable through `git show`; the verification is the re-run scan, recorded below.

---

## Audit

### A. Duplicate implementations

| # | What | Why it exists | Depends on it | Safe to remove? |
|---|---|---|---|---|
| A1 | `server/workspace/src/mcp/server.ts` — the 326-line parallel MCP assembly named in the IW-8 orchestrator | `registry-server-extraction` 8.3 claimed it was replaced "with package imports"; it was not | — | **Already resolved.** Deleted in `81e2ea4` (rse §9.4, PR #105). `git cat-file -e main:server/workspace/src/mcp/server.ts` → *does not exist*. Closed, no action. |
| A2 | `packages/registry-ui/src/credentials/types.ts` redeclared `CredentialType`, `CredentialPayload`, `BearerTokenPayload`, `ApiKeyPayload`, `OAuth2ClientPayload`, `OAuth2AuthCodePayload` | `registry-ui` never depended on `@aprovan/registry-server`, so nothing enforced alignment | `AddCredentialForm.tsx`, `credentials/index.ts` barrel, package root barrel | **Yes — done.** See §1. |
| A3 | `ProfileTargetKind` declared **three** times: `registry-server` (canonical, 3 members) + `registry-ui/src/credentials/types.ts` + `registry-ui/src/admin/types.ts` (both 2 members) | Same cause as A2. Two same-named, structurally different types escaped the same package barrel | `ProfileForm.tsx`, `ProfilesSection.tsx`, `GroupProfilesSection.tsx`, `admin/types.ts` | **Yes — done.** See §1. |
| A4 | `registry/packages/mcp` (`@utdk/mcp`) vs `registry/packages/registry-server/src/mcp/server.ts` | **Not a duplicate.** `@utdk/mcp` is a standalone stdio MCP CLI (`bin: utdk-mcp`, 208 lines); `registry-server/src/mcp/server.ts` (259 lines) is the embedded per-tenant handler | both real | **No — keep both.** Different entrypoints, different consumers. Recorded so the next audit does not re-flag it. |
| A5 | `permittedTools` / `makeExecute` — rse §9.5 asserts exactly one definition survives | — | — | **Verified true.** Exactly one, at `registry/packages/registry-server/src/mcp/server.ts:111`. Remaining aprovan hits are comments. No action. |
| A6 | `ProfileWire`, `CredentialRecord`, `CredentialInput` each declared in `registry-ui`, `server/workspace`, and `client/web` | Wire DTOs hand-copied per layer; these are *not* exported by `registry-server`, so there is no single owner to import | three layers | **Left for a human** — see "Deliberately not done". |

### B. Dead husks — 19 directories, all zero git-tracked files

All were deleted from git by a completed migration; only build output remained on disk.

| Repo | Directory | Deleted from git by |
|---|---|---|
| registry | `apps/workspace` (held the only non-reproducible file, a local `.env`) | `c4faba8` Remove moved product-plane code |
| registry | `packages/aprovan-cli`, `packages/registry-main`, `packages/registry-ui`, `packages/sandbox-host` | `c4faba8` |
| registry | `packages/sandbox-bashkit` | `c4faba8` |
| registry | `packages/runtime` | `dafc382` retire `@aprovan/runtime` (#119) |
| registry | `apps/tailor`, `packages/utdk-isolate` | `2a744f3` Purge dead code (#73) |
| aprovan | `packages/bundler`, `packages/contracts`, `packages/mcp`, `packages/mcp-core`, `packages/registry-server`, `packages/runtime` | `4c28c80` Consume execution-plane packages from npm and delete the fork (#24) |
| aprovan | `packages/bobbin`, `packages/mcp-app-server` | `98c7845` Purge dead code (#1) |
| aprovan | `packages/sandbox-bashkit`, `packages/sandbox-host` | `46e565b` feat(native) sandbox consolidate |

Two of these were **not inert**:

- **`aprovan/packages/contracts/` was shadowing at runtime.**
  `server/workspace/src/interfaces.ts:155-156` does
  `if (existsSync(<repo>/packages/contracts)) return loadCompatDocuments(...)`, falling back
  to resolving the nine published `@utdk/*` contract packages only when absent. The husk
  made that `existsSync` true. `loadCompatDocuments` skips any subdirectory without a
  `package.json` (`@utdk/common/dist/compat.js:161-163`) — the husk subdirs held only
  `dist/`, so it returned an **empty Map** with no error, silently loading zero compat
  documents instead of nine. Removing the husk restores the published-package path.
- **`aprovan/packages/registry-server/dist/` was a stale full build** of the whole server
  package (31 `.js` files, `index.js` 2444 B, Aug 2) sitting in the product host's tree
  alongside the real installed 0.2.5 (3473 B, Aug 5) — precisely the "duplicate goes
  unnoticed" shape this audit exists to find.

`registry-server-extraction` task **9.7** — "Remove untracked build litter: `packages/mcp/`,
`packages/mcp-core/`, and `packages/mcp-app-server/`" — was marked `[x]` while all three
were still on disk. It also undercounted: the real number was 19, not 3.

### C. API drift — `@aprovan/registry-server`

| # | Symbol | Canonical (registry `0.2.7`) | Consumer state | Safe to fix? |
|---|---|---|---|---|
| C1 | **package version** | `0.2.7` published and healthy | `server/workspace/package.json` pins `^0.2.5`; lockfile resolves **0.2.5**, deprecated-broken: *"pins `@utdk/mcp-core@0.1.0`, which lacks `lookupGraphqlType` — any import throws"* | **Left for a human — highest priority.** See "Deliberately not done". |
| C2 | `ProfileTargetKind` | `"interface" \| "provider" \| "path"` | `server/workspace` re-exports correctly. `registry-ui` had two 2-member copies | **Fixed — §1** |
| C3 | `CredentialPayload` family | `clientId`/`clientSecret` optional; `clientOrigin`, `accessToken`, `refreshToken`, `expiresAt` present | `server/workspace` re-exports correctly (no drift). `registry-ui` copy had required `clientId`/`clientSecret` and lacked all four fields | **Fixed — §1** |
| C4 | `resolveToInjectable` (the brief's "`resolveOAuth`"; no symbol by that name exists) | `(payload, options: ResolveOAuthOptions)` with **required** `provider` | All 3 production call sites correct. `server/workspace/tests/oauth-tokens.test.ts` has 6 calls missing `provider` and 3 `exchangeAuthorizationCode` calls on the old single-positional form | **Left — other agent's tree.** §3 |
| C5 | `provisionCredential` | Required `RegistryStorage` member; creates credential + default profile + grant in one transaction. Doc: *"Every `credentials.create()` call site MUST route through this"* | `routes/profiles.ts:97` wires it correctly, but `server/workspace/src/credentials.ts:612` (and `credential-store-adapter.ts:13`) call `storage.credentials.create()` raw — credentials created that way get no profile and no grant, so they are unreachable by dispatch | **Left for a human — see "Deliberately not done".** §4 |
| C6 | export surface | 207-line index | Every symbol aprovan imports exists upstream; no missing-export drift | No action |

---

## Tasks

Ordered. Each has a runnable Verify and a Done-when.

### §1 — Unify the `registry-ui` type redeclarations — **DONE**

- [x] 1.1 Add `"@aprovan/registry-server": "^0.2.7"` to `packages/registry-ui/package.json`
      dependencies. Not `^0.2.5` — that release is deprecated-broken (C1).
- [x] 1.2 Replace the redeclared payload types in `src/credentials/types.ts` with
      `export type { … } from "@aprovan/registry-server"`, adding `OAuthClientOrigin`.
- [x] 1.3 Replace both `ProfileTargetKind` redeclarations (`credentials/types.ts`,
      `admin/types.ts`) and both `ProfileLimits` copies with re-exports.
- [x] 1.4 Confirm no runtime import reaches the browser bundle.

_Done when_ `ProfileTargetKind` and `CredentialPayload` each have exactly one definition
across both repos, `registry-ui` builds and tests green, and its `dist/*.js` contains no
reference to `registry-server`.

Verify (in `aprovan`):
```
pnpm --filter @aprovan/registry-ui typecheck && \
pnpm --filter @aprovan/registry-ui build && \
pnpm --filter @aprovan/registry-ui test && \
grep -l registry-server packages/registry-ui/dist/*.js || echo "no runtime leak"
```

### §2 — Remove the 19 husks — **DONE**

- [x] 2.1 Back up `registry/apps/workspace/.env` (untracked, not reproducible) before
      deleting; it is the only non-build file in any husk.
- [x] 2.2 Delete the 9 registry husks and the 10 aprovan husks (table B).
- [x] 2.3 Re-run the husk scan in both repos; assert zero remain.
- [x] 2.4 Correct the false `[x]` on `registry-server-extraction` task 9.7.

_Done when_ the scan returns nothing in either repo, both repos are tracked-clean, and
`registry` builds standalone.

Verify (per repo):
```
for d in packages/*/ apps/*/; do [ -d "$d" ] || continue; \
  n=$(git ls-files "$d" | wc -l | tr -d ' '); [ "$n" = 0 ] && echo "HUSK: $d"; done
git status --short
```

### §3 — Update `oauth-tokens.test.ts` to the 0.2.x OAuth signatures — **BLOCKED (ownership)**

- [ ] 3.1 Add the required `provider` to the 6 `resolveToInjectable(...)` option objects at
      `server/workspace/tests/oauth-tokens.test.ts` lines 88, 96, 97, 113, 131, 147.
- [ ] 3.2 Move `exchangeAuthorizationCode(payload)` → `(provider, payload)` at lines 46, 66, 81.

Depends on **§5** — the pin bump changes these types again. Do not do §3 before §5.

_Done when_ `server/workspace` typechecks with no OAuth-signature errors.

Verify: `pnpm --filter <workspace-pkg> typecheck`

### §4 — Route registry-backed credential creation through `provisionCredential` — **NEEDS A DECISION**

- [ ] 4.1 Decide the legacy `createdBy === undefined` case: `CredentialInput.createdBy` is
      optional in `server/workspace/src/credentials.ts:78`, but
      `CredentialProvisionInput.createdBy` is **required**. Reject, or synthesize a
      principal? This is a security-relevant default and is not derivable from the code.
- [ ] 4.2 Change `CredentialStoreRegistry.create` (`credentials.ts:612`) to call
      `storage.provisionCredential(...)`.
- [ ] 4.3 Same for `credential-store-adapter.ts:13`.
- [ ] 4.4 Leave the Dynamo (`credentials.ts:163`) and sqlite (`:410`) backends alone —
      no registry storage behind them, out of scope.

_Done when_ every registry-backed credential creation yields a reachable default profile
and grant, and a test asserts it.

### §5 — Bump the product-host pin to `@aprovan/registry-server@^0.2.7` — **BLOCKED (ownership)**

- [ ] 5.1 `server/workspace/package.json`: `^0.2.5` → `^0.2.7`; refresh the lockfile.
- [ ] 5.2 Re-typecheck; expect the diff to move, not vanish — 0.2.5 → 0.2.7 is a real
      type change, and some of the errors currently being fixed by hand may be artifacts
      of the broken pin rather than genuine drift.
- [ ] 5.3 Update the `WAVE-PLAN.md` closeout line "Product host pin:
      `@aprovan/registry-server@^0.2.5`" — it currently records a broken version as the
      target.

Blocks §3. **Do this first of the remaining work.**

_Done when_ the lockfile resolves 0.2.7 and no deprecated `@aprovan/registry-server`
version appears in `pnpm why`.

Verify: `pnpm why @aprovan/registry-server` shows only `0.2.7`.

### §6 — Give the wire DTOs a single owner — **NEEDS A DECISION**

- [ ] 6.1 Decide where `ProfileWire`, `CredentialRecord`, `CredentialInput` should live.
      They are declared in `registry-ui`, `server/workspace`, and `client/web`, and unlike
      A2/A3 there is **no upstream owner to import** — `registry-server` does not export
      them. Options: publish them from `registry-server`; move them into the existing
      browser-safe `@aprovan/registry-main`; or accept the duplication as a deliberate
      layer boundary. This is an architecture call, not a cleanup.

---

## Deliberately not done, and why

- **§5 / C1 — the broken `^0.2.5` pin.** This is the highest-severity finding in the audit:
  the product host pins a version npm marks *"Broken … any import throws"*. It is also
  squarely in `server/workspace/**`, which another agent is actively editing. Bumping it
  would change that agent's type errors underneath them mid-flight — the exact clobbering
  pattern that produced `ecd6810`. Flagged rather than fixed. Worth checking whether the
  errors being hand-fixed there are caused by the broken pin.
- **§3 — `oauth-tokens.test.ts`.** Same tree, same reason, and gated on §5 anyway.
- **§4 — `provisionCredential` bypass.** Same tree, *and* 4.1 is a genuine security-relevant
  decision (what to do with a credential that has no `createdBy`) that the code does not
  answer. Not a mechanical fix.
- **§6 — wire DTO ownership.** No single source of truth exists to import; creating one is
  an architectural decision about layer boundaries, not migration debt cleanup.
- **`registry/apps/workspace/.env`** was backed up rather than destroyed. It is untracked
  local dev config (DynamoDB table names, `APROVAN_ENV`, `STORE_BACKEND`) and is not
  recoverable from git. Restore it if that workspace is ever revived.
- **Pre-existing, not caused here:** `registry`'s `node_modules` was out of sync with its
  manifests — `@utdk/events` declares `@aws-sdk/client-{sns,sqs}` in `dependencies` but
  they were absent, failing `pnpm -r build`. Repaired with `pnpm install`; no manifest
  change was needed, and `registry` is tracked-clean.
