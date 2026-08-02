# Report — contracts-and-catalog (streams 1–7)

PR: https://github.com/AprovanLabs/registry/pull/76 (branch `contracts-and-catalog`, 7 commits, one per stream)

## Per-stream status

| Stream | Status | Notes |
| --- | --- | --- |
| 1. Contract promotion + exclusion lists | Done | `git mv` to `packages/contracts/{sql,llm,sandbox,vcs,agent}`; all four exclusion lists deleted; `sql` marker + `sql`/`llm` publishConfig/license added; `tsconfig extends` depth unchanged (same depth, verified); 5× `AUDIT.md`, all frozen at **0.2.0**; `dist/github/vcs/` + exports entry verified after rebuild. |
| 2. Naming authority | Done | `packages/bundler/src/naming.ts` + `naming.test.ts`; `splitProviderName` slash-only; `assertValidProviderName` wired into `loadRegistryProviders`; apis-guru routed through the authority (collision fallback preserved; explicit-map entries win); registry.json normalization was a **no-op assert** — all 2,566 names already valid, file untouched. Map seeded with 30 exception hostnames from hand-curated provenance (docs portals, non-.com vendors) + canonical `github.com`/`api.github.com`/`docs.github.com`/`drive.google.com`. `synthetic.new` deliberately NOT in the map (spec scenario requires the default rule to produce `synthetic-new`). |
| 3. New contracts | Done | `@utdk/keyvalue`, `@utdk/events`, `@utdk/vfs`, `@utdk/telemetry` exactly per tech-plan surfaces; 53 unit tests incl. an OTLP/HTTP JSON sample payload validating unmodified and a vfs no-session/overlay/mount surface assertion; 4× `AUDIT.md`, all frozen at **0.2.0**. |
| 4. Shared types | Done | `@utdk/common/auth` → `CREDENTIAL_TYPES` tuple + `CredentialType`; `authIntel.ts` imports them (local union deleted, schema enum spread); new `@utdk/common/compat` (parse + marker-driven loader, 22 tests) and types-only `@utdk/common/webhooks` (webhookIntel imports + re-exports; sourceHash caching untouched); `docs/interfaces.md` updated. Bundler gained a `@utdk/common` workspace dep. |
| 5. Compat extraction | Done | `compat.json` for sql/sandbox/vcs/agent (verbatim transcription) + llm (`compatSource: "chat-provider-registry"`); `listInterfaces()` consumes `loadCompatDocuments` (loaded once at module init, llm composed live); deep-equality test vs. pre-extraction literals passes; no `webhooks` id anywhere. |
| 6. CI publish list | Done | All nine contracts + common + mcp-core + utdk in the loop, skip-if-published/independent-failure preserved; the four new contracts added to the workflow's build step (outside the workspace dependency closure). Dry-run publish across `@utdk/*` clean. |
| 7. Catalog site | Done | New `apps/registry/src/lib/contracts.ts` (marker enumeration, shared compat loader, tool-entry factories executed at build, inverted provider→entries index, loud failure on missing `packages/contracts/`, build failure on an available catalogue module absent from disk); `/interfaces` index + `/interfaces/[id]` pages + nav entry; provider-page Implements section; Webhooks section typed via `@utdk/common/webhooks` with build-warn+omit on malformed intel. Build output verified: github shows Implements→`@utdk/vcs` via `github/vcs`; vcs page shows Bitbucket "not yet built" + reason, un-linked; vfs shows the explicit zero-implementer state; index shows 4 zero-count cards and available/planned splits; llm shows 5 implementers from the live chat registry. |

## Verify results (final pass, worktree root)

- `pnpm --filter @utdk/e2e test:generation` — **273 passed** (6 skipped)
- `pnpm --filter @aprovan/utdk-bundler test` — **188 passed**; `check-types` clean
- `pnpm --filter @aprovan/workspace check-types` — clean; `test` — **414 passed** (46 files)
- `pnpm --filter @utdk/common test` — **90 passed**
- Four new contract suites — **53 passed**; all nine contract builds clean
- `pnpm --filter "@utdk/*" exec pnpm publish --dry-run --no-git-checks` — no rejections
- `pnpm --filter @aprovan/registry-web build` — **341 pages**, complete

## What WS-3 needs to know (frozen versions)

All nine contract surfaces are shape-audited and **frozen at 0.2.0**: `@utdk/sql@0.2.0`, `@utdk/llm@0.2.0`, `@utdk/sandbox@0.2.0`, `@utdk/vcs@0.2.0`, `@utdk/agent@0.2.0`, `@utdk/keyvalue@0.2.0`, `@utdk/events@0.2.0`, `@utdk/vfs@0.2.0`, `@utdk/telemetry@0.2.0`. WS-3 pins `0.2.x`. `@utdk/common` stays `0.1.0` but gained three consumable subpaths: `./auth` (adds `CREDENTIAL_TYPES`/`CredentialType`), `./compat` (`parseCompatDocument`/`loadCompatDocuments`, `CompatDocument`/`CompatEntry`/`InterfaceMeta`), `./webhooks` (types-only webhook-intel shapes). `compat.json` ships in each contract's npm tarball (no `files` filter). The workspace locates the contracts dir by resolving `@utdk/agent` and going up three (`apps/workspace/src/interfaces.ts` `resolveContractsDir`) — works for monorepo symlinks and installed `node_modules/@utdk`; revisit when WS-3 extracts dispatch. Every audit found the surfaces implementable; adapter-level caveats recorded in the AUDIT.md files (Redis SCAN ordering for keyvalue list; SNS list-side needs a paired sink; OpenAI Assistants files are capability-gated off; GitLab request_changes maps to unapprove+note).

## Deviations / notes

1. **llm compat on the catalog site**: the site composes llm's entries at build time by importing `listLlmProviders` from `apps/workspace/src/llm.ts` (relative import in `apps/registry/src/lib/contracts.ts`) — the honest "live registry at build time" per the tech-plan risk note, but it re-couples the site to a file WS-3/WS-4 will move. When the chat-provider registry relocates, update that one import.
2. **On-disk validation exemptions** (stream 7): the build-fails-on-missing-module check exempts entries with `moduleSpecifier` (first-party packages outside the catalogue) and `credentialless` entries (the `agent` contract's `native` module is a dispatch short-circuit that is never imported). Without the exemption, legitimate data would fail the build.
3. **Test updates outside Touches globs** (justified, minimal): `packages/bundler/src/provider.test.ts` and `render.test.ts` used dotted provider names (`google.books`) that the spec now forbids — updated to `google/books`; `apps/workspace/vitest.config.ts` needed alias entries for the new `@utdk/common/compat|webhooks` subpaths (its existing per-subpath alias pattern).
4. **`synthetic.new` chat provider id**: `apps/workspace/src/llm.ts` still uses `synthetic.new` as a *chat-facing credential id*. That is workspace-side chat registry data, not a registry.json provider name, so it is out of this change's scope — but WS-3 should be aware the dot ban applies to bundler/registry provider identity only.
5. **AppsHost.tsx / apps.astro** (deleted uncommitted in the user's main checkout): untouched; no new dependencies on them. The only adjacency is `BaseLayout.astro`'s pre-existing "Apps" nav entry, next to which the new "Interfaces" entry was added.
6. **pnpm-lock.yaml** regenerated (contract paths moved; new deps for bundler/registry-web). If the parallel `packages/utdk-e2e` branch conflicts on the lockfile, the later PR regenerates with `pnpm install` (noted in the PR body).
7. Commits are unsigned (`--no-gpg-sign`) per environment note; `tasks.md` in the aprovan checkout has all 38 boxes checked and is left uncommitted, as is this report.
