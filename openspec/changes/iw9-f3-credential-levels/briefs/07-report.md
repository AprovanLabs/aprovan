# Report: 07 — aprovan audit attribution (final F3 stream)

## What was built (tasks 7.1–7.3)

### 7.1 — `AuditEntry` + schema (audit.ts, db/dsql-schema.sql)

- `AuditEntry` gains the six D7 fields: `credentialId?`, `credentialLevel?:
  CredentialLevel` (type-only re-import from `credentials.js` — the level is
  stored as resolved, never re-derived, per stream 5's deviation 2),
  `credentialSource?: "stored" | "ephemeral"`, `actorKind?: "app" |
  "workflow" | "agent"`, `actorId?`, `profileName?`.
- **sqlite**: the six columns in the base DDL plus a try/catch `ALTER` per
  column (the `created_by` pattern from `credentials.ts:530-540`, looped);
  `append` writes them (`?? null`), `recent()` maps them back.
- **dsql**: `db/dsql-schema.sql` `audit_log` gains the six nullable columns
  plus the "deployments that created audit_log before…" ALTER comment block
  (the same convention `records.bytes` and `workspaces.locus` use);
  `AuditStoreDsql.append`/`recent` thread them through.
- **Dynamo test-only store**: conditional item fields on `append`, mapped in
  `toEntry` — pure pass-through, still not wired into the factory.
- `recent()` mapping is `typeof … === "string"` gated on every backend, so a
  NULL column (pre-change row on a migrated table) AND a wholly absent column
  (not-yet-migrated dsql `SELECT *`) both read back `undefined`, never
  `"null"`/`"undefined"` strings. Fire-and-forget write contract unchanged.

### 7.2 — attribution threaded at every dispatch audit append

- **`routes/tools.ts`** (dispatch/audit region only; F1 tool-schema region
  untouched): a single `auditCredential` object is populated exactly where
  stream 6 left the resolution result —
  - `body.credential` branch → `{ credentialSource: "ephemeral" }` (no id,
    per spec "Ephemeral credential is distinguishable");
  - stored branch (`record` from `resolveCredentialRecord`) →
    `{ credentialId: record.id, credentialLevel: record.level,
    credentialSource: "stored" }`, plus `profileName: requestProfile` when
    the request profile pinned the credential (`interfaceCredentialId` set);
  - spread into the 502 OAuth-exchange append and `finishLog` (which serves
    both the buffered and SSE-streaming completions). The
    resolution-*failure* append and every credential-less append (core
    service, deny/queue, sessions, embed, native) are byte-for-byte
    unchanged — no credential resolved, no attribution fields.
- **`routes/llm.ts`**: `ResolvedChatCredentials` widened with
  `credentialId`/`credentialLevel`/`credentialSource`; `resolveCredentials`
  returns them from the `ResolvedCredential`, `resolveChatCredentials`'s
  ephemeral branch marks `credentialSource: "ephemeral"`. Both audit appends
  (`handleChat`'s in-stream append and `handleCompletionJob`'s) spread them
  conditionally. `GET /:provider/models` has no audit append — unchanged.
- **`workflows/invoke.ts`** (the workflow/agent via-path):
  `resolveProviderCredentials` now returns `{ credentials, record }` (the
  06-report's "widen this function's return" option), and
  `dispatchProviderLegacy` appends an audit row **when a credential was
  resolved**: id + level + `"stored"`, `actorKind`/`actorId` from
  `invokerFromContext(ctx)` (app → `appScope.id`, workflow → dispatching
  run id), and `profileName` when a profile selected the credential.
  `ProviderDispatch` gains an additive `profileName?` set at both call
  sites: `invokeTool`'s provider-profile branch (`credentialId` is only
  ever set there, so its presence *is* "the profile selected it") and
  `dispatchInterface`'s profile-pinned interface resolution.
  Credential-less in-process dispatches still write no row from this path —
  their observable behavior is unchanged.

### 7.3 — `tests/audit-attribution.test.ts`

5 tests on the sqlite backend (per task scope): all-six-fields round-trip
through `append`/`recent`; shared-bot row carries `callerId` + level
`workspace-oauth` + credential id (spec "Shared-bot action names the
human"); ephemeral row is marked and stores no credential id/level;
credential-less append writes a row with every attribution field undefined;
and a pre-change database (old-schema table raw-built with `better-sqlite3`,
row inserted, then opened through `AuditStoreSqlite` so the try/catch
`ALTER` path runs) reads the legacy row back with all six fields undefined
while new attributed writes coexist on the migrated table.

## Verify (run from the worktree root, 2026-08-18)

```
$ pnpm --filter @aprovan/workspace test -- audit-attribution
 ✓ tests/audit-attribution.test.ts (5 tests) 9ms
 Test Files  1 passed (1)
      Tests  5 passed (5)

$ grep -n "credential_level" server/workspace/src/db/dsql-schema.sql
72:  credential_level text,
83:--   ALTER TABLE audit_log ADD COLUMN credential_level text;

$ pnpm --filter @aprovan/workspace check-types
effect-completeness: ok (143 tools)        # tsc --noEmit passed

$ pnpm --filter @aprovan/workspace test -- credential-level-resolution
 Tests  11 passed (11)                     # stream 6 still green
$ pnpm --filter @aprovan/workspace test -- credential-levels
 Tests  15 passed (15)                     # stream 5 still green
```

Final grep gate (task 6.5 — the change's only grep gate; see Deviations on
"task 8.1"), re-run verbatim and clean:

```
$ ! grep -rln "resolveRecordForProvider" server/workspace/src --include="*.ts" | grep -v "^server/workspace/src/credentials\.ts$"
(no output — exit 1 from grep, gate passes; credentials.ts is the sole owner)

$ ! grep -n "deps\.credentials\.firstForProvider" registry/packages/registry-server/src/profiles/resolve.ts
(no output — gate passes)
```

Full-suite baseline (measured, not assumed): at the clean base (`07c8a7b`,
stream 6 merge) `pnpm --filter @aprovan/workspace test` shows **50 failed /
893 passed / 63 skipped across 17 files** (pre-existing 0.3.0-pin fallout,
matching the 06-report's measurement exactly). With this stream's changes:
**50 failed / 898 passed / 63 skipped** — the failed-file list is identical
(diffed after stripping durations), i.e. **0 new failures, 5 new passes**.

## Deviations

1. **"Task 8.1" does not exist.** The orchestrator prompt asked for
   "tasks 7.1–7.3 and 8.1 (the final stream-8 grep gate)" — this change's
   `tasks.md` has sections 1–7 only; its final grep gate is task 6.5
   (already checked by stream 6). I re-ran 6.5's both halves verbatim
   (clean, above) as "the change's final grep gate" and checked off nothing
   nonexistent. (A `briefs/14-grep-gate-dod.md` exists in the *sibling*
   change `iw9-c-capability-approval` — likely the source of the confusion;
   not this change's scope.)
2. **`workflows/invoke.ts` had no audit-append call site**, contrary to the
   brief's "Read first" item 10. Threading attribution required creating
   one; the 06-report anticipated exactly this ("widen this function's
   return or append inside it"). The new append fires **only when a
   credential was resolved** — the minimal change that satisfies the spec
   scenario "Via-path is recorded for indirect dispatch" without altering
   credential-less dispatch behavior or double-writing the paths tools.ts
   already audits (its embed branch only runs on dsql, where dispatch goes
   through `registryDispatch`, not `dispatchProviderLegacy`). Note: on dsql
   the embed pipeline handles workflow dispatch end-to-end and tools.ts's
   boundary append covers HTTP-originated calls; in-process workflow
   dispatch through the embed writes no attributed row today — that seam
   lives in `registry-embed.ts`/the registry package, outside this stream's
   allowed files, flagged for iw9-c planning.
3. **`profileName` granularity**: at `dispatchInterface`, an interface
   resolution's `credentialId` cannot be distinguished between "the profile
   pinned it" and "the base binding carried it" without widening stream 6's
   fixed resolution surface, so `profileName` is recorded when a profile was
   in effect AND a credential id was pinned — the closest available signal.
   Same predicate in tools.ts (`requestProfile` + `interfaceCredentialId`).
4. **`ProviderDispatch.credentialProfile` was not reused** for the profile
   name: `resolveCredentialRecord` *throws* when a profile string reaches it
   (labels are display names, not identifiers — stream 6), so a separate
   additive `profileName?` field carries the audit-only value.
5. `recent()`'s new-field mapping uses `typeof … === "string"` guards
   instead of the file's `=== null` idiom so a not-yet-migrated dsql
   deployment (columns absent from `SELECT *`, not NULL) also reads back
   `undefined` per spec "Old rows still read".

## F3 is implementation-complete

This was the final stream (7 of 7). All tasks 1.1–7.3 are checked. The full
chain — registry level model (1) → invoker-aware resolution contract (2) →
`@aprovan/registry-server` 0.3.0 publish (3) → aprovan pin bump (4) →
aprovan stores carry the level (5) → invoker-aware dispatch resolution (6)
→ credential audit attribution (7) — is now complete, published, and
consumed end-to-end. Per the IW-9 wave table, `iw9-c-capability-approval`
is unblocked; whoever plans its dispatch work should read deviation 2 above
(the dsql embed path's attribution seam) and the 06-report's stream-7
handoff for where resolution results live at each dispatch site.
