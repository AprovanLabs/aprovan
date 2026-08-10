# Deviations — iw9-f3-credential-levels

Recorded during the delegation-readiness pass (2026-08-09/10), before any
brief was dispatched, per `IW-9-IMPLEMENTATION-PROMPT.md` step 6. Nothing
below required re-litigating a D1–D24 or A1–A3 decision — each item is
either observed drift (line numbers, tooling baselines) or a planning-gap
fix that keeps `tech-plan.md`/`tasks.md` internally coherent and
implementable exactly as written, with no invention beyond what the
existing code already established as precedent.

## Planning-gap fixes applied to tech-plan.md / tasks.md / prd.md

Four gaps were identified while re-reading `tasks.md` against the live
source with the standalone-brief test in mind (would an agent with zero
conversational context be able to complete this task without asking a
question?). All four failed that test as originally worded. Fixes,
verified against live code before writing (`packages/registry-server/src/storage/{sql-storage,dynamo-storage,sql-client,types}.ts`,
`server/workspace/src/{credentials,credential-store-adapter}.ts`,
`packages/registry-server/src/profiles/resolve.ts`,
`packages/registry-server/src/routes/profiles.ts` — actually
`server/workspace/src/routes/profiles.ts`):

1. **`level` was never threaded through `CredentialProvisionInput`/
   `provisionCredential`.** Task 1.2 named `CredentialRow.level` and the
   `sql-storage.ts`/`dynamo-storage.ts` "row mapping," but neither
   `CredentialProvisionInput` (`storage/types.ts`) nor the
   `credentialStore.create()` / `credentials.create()` calls *inside*
   `provisionCredential()` (`sql-storage.ts:591-597`,
   `dynamo-storage.ts:664-670`) carried it — a level `CredentialService.create`
   computed would have been silently dropped on the way to the row. Fixed:
   tech-plan "Interfaces & Data" + tasks 1.2/1.3 now name the input
   contract and both call sites explicitly.
2. **One-`user-oauth`-per-(tenant,provider,owner) had no race-safe
   mechanism.** Tasks 1.3/5.2 said "enforce," which reads as
   list-then-insert in `CredentialService.create`/`ICredentialStore.create`
   — a TOCTOU race. Inspected the live idioms instead of guessing: SQL
   already funnels every driver's unique-violation error through
   `UniqueConstraintError` inside `SqlClient.run()`
   (`storage/sql-client.ts:55-68`), caught today by `SqlTenantStore.ensure`
   and `SqlGrantStore.grant` (`storage/sql-storage.ts:62-70`, `:397-405`);
   Dynamo already has the conditional-`Put`-inside-`TransactWriteCommand`
   idiom (`DynamoProfileStore.create` `:183-207`, `provisionDefaultProfile`
   `:617-637`, `isConditionalFailure` `:507-514`). Fixed: tech-plan D3a
   specifies a partial unique index (registry `schema.ts` AND aprovan's
   own sqlite DDL in `credentials.ts`) for the two SQL backends, and a
   third conditional `USEROAUTH#<provider>#<createdBy>` transact item for
   aprovan's Dynamo backend — all three reusing patterns already live in
   the codebase, not new ones.
3. **A second, undocumented bypass of validation on the dsql backend.**
   While inspecting (2) it became clear `CredentialStoreRegistry.create`
   (aprovan `credentials.ts:612-623`) calls `storage.credentials.create()`
   directly — the raw storage primitive — never
   `CredentialService.create()`, so task 1.3's validation would not apply
   to it despite task 5.2 assuming otherwise ("applies identically on the
   sqlite/dynamo backends"). `server/workspace/src/routes/profiles.ts:97`
   already constructs `new CredentialService(storage.credentials, storage.provisionCredential)`
   for a different call path, so the same construction is the fix (D3b,
   task 5.1) — not a new abstraction.
4. **`resolveWorkspaceCredential`'s return contract and the invoker
   grep-gate's coverage were both underspecified.** Fixed: tech-plan D6
   now states the exact signature (`Promise<ResolvedCredential | undefined>`)
   and the structural guarantee (row *selection* excludes `user-oauth`
   before ranking, not merely "didn't happen to pick one"). D6a replaces
   task 6.5's three-directory allowlist grep with an exclusion-based scan
   (`grep -rln ... server/workspace/src | grep -v credentials.ts`) that
   also covers `credential-store-adapter.ts`'s `firstForProvider`
   (:42-51) — verified to have **zero call sites anywhere in
   `server/workspace/src` today** (`grep -rn "adaptCredentialStore" server/workspace`
   matches only its own definition file), i.e. it is not exempt by
   design, it is dead code that stream 6 brings into compliance before
   anything wires it up live. A fifth, closely related gap surfaced in the
   same pass and was fixed the same way: `resolveProfile`'s three direct
   `firstForProvider` calls (`profiles/resolve.ts:263,350,378`) have no
   invoker parameter, so task 2.2's D4 order was not implementable through
   them — D4a adds the additive `CredentialService.resolveForInvoker`
   sibling method rather than widening `firstForProvider` (which would
   break the "additive/widening only" minor-bump constraint).

None of the above changes A1–A3, D1–D24, D1–D7, or any spec scenario's
WHEN/THEN — they add D3a/D3b/D4a/D6a as implementation-mechanism
specifications the original D3/D4/D6 already implied but did not spell
out, and correct two `tasks.md` assumptions that were contradicted by live
code. Every existing spec scenario is still satisfied by the mechanisms
above; no scenario needed a new WHEN/THEN.

Per the delegation directive, PRD assumptions A1–A3 are treated as
**confirmed**, not "recommended defaults the orchestrator may veto" — the
instruction to proceed with this change's elaborated recommendations IS
that decision. `prd.md`'s Open Questions section is updated accordingly.

## Line drift observed (tech-plan citations vs. live source, checked 2026-08-09)

The tech-plan/tasks cite exact `file:line` locations per
`IW-9-EXECUTION-OVERVIEW.md` finding #8 ("where a line has drifted... the
tech-plan's stated intent wins over the line number"). Checked every
citation touched by streams 5–7 against current source:

| Citation in tasks.md/tech-plan.md | Actual location (verified) | Verdict |
|---|---|---|
| `routes/tools.ts:1248` (`resolveCredentialRecord` call, task 6.3) | **line 1258** | Drifted ~10 lines; same statement, same surrounding structure. Intent unchanged. |
| `routes/tools.ts:1227-1240` (ephemeral-credential branch, task 7.2) | **lines 1238-1250** | Drifted with the above; same `if (body.credential)` branch. Intent unchanged. |
| `workflows/invoke.ts:366` (`resolveCredentialRecord` call, task 6.3) | line 366 | Exact match. |
| `routes/llm.ts:116` (`resolveCredentialRecord` call, task 6.3) | line 116 | Exact match. |
| `vcs/mounts.ts:207` (`resolveRecordForProvider` call, task 6.2) | line 207 | Exact match; confirmed genuinely invoker-less today. |
| `credentials.ts:53-63` (re-export drift warning, task 5.1) | lines 53-64 | Off by one line at the boundary; same comment block. |
| `credentials.ts:402-408` (sqlite `ALTER` precedent, task 5.1) | lines 402-408 | Exact match. |
| `credentials.ts:732-764` (`resolveCredentialRecord`, tech-plan) | lines 732-764 | Exact match. |
| `profiles/resolve.ts:148` (`resolveProfile`, tech-plan) | line 148 | Exact match. |

No drift changes any task's intent. Streams 6/7's briefs carry a note to
re-locate by content (the cited function/branch), not by line number
alone, before editing.

## Registry lint baseline (verified live, 2026-08-09)

Per `AGENTS.md`, registry's root lint is expected to run (unlike
aprovan's, which fails at module load). Verified by running it:

```
$ cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm lint
...
✖ 258 problems (236 errors, 22 warnings)
  221 errors and 0 warnings potentially fixable with the `--fix` option.
```

**236 errors / 22 warnings, pre-existing, root `pnpm lint` (eslint across
the whole workspace).** The overwhelming majority are `import/order` in
the **generated** `packages/utdk/*` provider clients (per AGENTS.md, this
is committed generated code, not something F3 — or any change — is
expected to clean up as a side effect). Streams 1–3 of this change touch
only `packages/registry-server/src/**`; scoping the same linter to just
that package, to establish what a stream 1–3 brief should treat as its
*own* pre-existing baseline (so it can tell "did I add an error" from
"was this already here"):

```
$ cd /Users/jacob/Documents/Code/AprovanLabs/registry && npx eslint "packages/registry-server/src/**/*.ts"
...
✖ 35 problems (35 errors, 0 warnings)
  34 errors and 0 warnings potentially fixable with the `--fix` option.
```

**35 errors / 0 warnings, pre-existing, scoped to `registry-server/src`**
— all `import/order` (one file also has an unrelated
`@typescript-eslint/no-unused-vars` hit on `createDynamoStorage` in
`storage/index.ts`, and one `@typescript-eslint/consistent-type-imports`
in `profiles/resolve.ts`). None of the files this change's tasks name are
implicated beyond ordinary import-order noise already present before this
change.

**Consequence for brief Verify sections:** streams 1–3 (registry) run
`npx eslint "packages/registry-server/src/**/*.ts"` (the scoped baseline
above) rather than root `pnpm lint`, and treat **35 errors / 0 warnings**
as the pass bar to not regress below (not to reach — the pre-existing 35
are not this change's to fix). No brief in this change claims root
`pnpm lint` is, or should be, green; that is a pre-existing, tracked,
out-of-scope condition per `AGENTS.md`.

## Model tier

Per `IW-9-EXECUTION-OVERVIEW.md`'s model-tier table, F3 is not named in
the Opus escalation list (D streams 1-3; C's review-surface/derived-
authority streams; B's install-as-copy stream; Doc's agent-reconciliation
streams) — all seven F3 briefs use the stated default, **Sonnet**.
