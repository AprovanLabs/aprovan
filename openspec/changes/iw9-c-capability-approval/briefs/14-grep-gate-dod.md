# Brief: Both repos — grep-gate cleanup and definition of done

**Depends-on: 8, 9, 10, 11, 12, 13 (all merged)** | Repo: both | Wave 10

## Mission

When you are done, grep finds no remaining standalone authorization
bypasses in aprovan or registry-server; AGENTS.md notes the one-predicate
rule; full workspace/web/registry-server test suites pass. This is the
archive gate for iw9-c.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md` — MIGRATION-DEBT / grep-gates both repos
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-c-capability-approval/tasks.md` — stream 14 + preamble
4. Prior stream reports for known leftovers

Work in both `/Users/jacob/Documents/Code/AprovanLabs/aprovan` and
`/Users/jacob/Documents/Code/AprovanLabs/registry`.

## Tasks

- [x] 14.1 aprovan: confirm zero remaining callers of `mayInvokeTool`,
      `assertAllowedTools` as a standalone authorization gate, and
      `getPermissionStore().check` outside the migrated `evaluateDispatch`
      path (MIGRATION-DEBT rule — "delete X is not done until grep
      returns nothing").
- [x] 14.2 registry: confirm registry-server's own MCP/sandbox dispatch
      has no remaining resource-check bypass predating stream 3's single
      predicate.
- [x] 14.3 Update `AGENTS.md` (both repos, if not already covered by F6)
      to note the one-predicate rule for capability + resource dispatch,
      so a future addition does not reintroduce a fifth gate.
- [x] 14.4 Full-suite run in both repos
      (`pnpm --filter @aprovan/workspace test`, `pnpm --filter
      @aprovan/patchwork-web test`, `pnpm --filter @aprovan/registry-server
      test`) as the final gate before `openspec archive`.

## Acceptance criteria

Grep gates clean in both repos; AGENTS.md documents one-predicate rule;
full suites green. Spec DoD for resource-grants "One dispatch chokepoint"
and migration scenario "Legacy grant still works" hold repo-wide.

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && ! grep -rn "mayInvokeTool\|assertAllowedTools\b" server/workspace/src --include="*.ts" | grep -v "\.test\.ts" && cd /Users/jacob/Documents/Code/AprovanLabs/registry && ! grep -rn "legacyDispatch\|bypassResourceCheck" packages/registry-server/src --include="*.ts"
```

Plus full-suite commands in task 14.4.

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/server/workspace/src/**`, `registry/packages/registry-server/src/**` (plus both `AGENTS.md` for 14.3)
- Delete leftovers; do not deprecate-in-place.

## Report back

Check off tasks; PR or `briefs/14-report.md` with grep evidence and suite
results; ready for `openspec archive` when green.
