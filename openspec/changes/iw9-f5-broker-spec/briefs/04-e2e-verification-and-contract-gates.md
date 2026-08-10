# Brief: End-to-end verification and contract gates (Stream 4)

**Model:** Sonnet (default tier — see `openspec/changes/IW-9-EXECUTION-OVERVIEW.md`
"Model tiers for the implementing fleet". This stream is disciplined
test-writing and honest verification, not novel design — the main risk is
under-running or under-reporting the gates, not getting the logic wrong).

## Mission

When you are done, `tests/realtime-e2e.test.ts` exercises the full async
contract end to end and demonstrates the change's core promise in one
scenario: a client that gets disconnected (slowness, dropped events) can
reconnect, resubscribe, and rebuild correct presence state from the
`subscribed` body alone — no replay needed. You then run the full
workspace suite and every grep gate in this change's `Verify` line and
report the results **honestly and completely**, not summarized down to
"pass/fail." This is the final gate before the change is considered done;
sloppiness here is exactly how this codebase has previously shipped
"replaced" code that wasn't actually replaced (see
`openspec/changes/MIGRATION-DEBT.md`).

## Read first

1. `openspec/changes/iw9-f5-broker-spec/specs/realtime-broker/spec.md` — "Client recovers by resubscribing" (the scenario you newly demonstrate end-to-end)
2. `openspec/changes/MIGRATION-DEBT.md` — the grep-gate / "husk test" definition of done your Verify enforces
3. `openspec/changes/IW-9-APP-FIRST.md` — "Cross-repo coordination", rule 4: grep-gates for every deletion run in BOTH repos regardless of which repo the deletion happened in
4. `openspec/changes/iw9-f5-broker-spec/briefs/deviations.md` — item 4, the recorded full-suite baseline (read this before you run anything, so you know what "already broken, not yours" looks like)
5. `server/workspace/tests/realtime-e2e.test.ts` — current file, the sync-contract baseline you're converting
6. The merged `server/workspace/src/realtime/broker.ts`, `presence.ts`, `store.ts`, `socket.ts` from Streams 1–3 — this stream writes no new production code, only tests and verification

## Tasks

(Verbatim from `openspec/changes/iw9-f5-broker-spec/tasks.md` §4)

- [ ] 4.1 Update `tests/realtime-e2e.test.ts` for the async contract and add
      an end-to-end recovery case: client is disconnected for slowness (or
      drops events), reconnects, resubscribes, and rebuilds correct presence
      state from the `subscribed` body alone (spec "Client recovers by
      resubscribing").
- [ ] 4.2 Run the full workspace suite plus the grep gates in Verify
      (MIGRATION-DEBT definition of done: replaced state names return
      nothing **in both repos** — aprovan realtime sources and the sibling
      `../registry` checkout, per IW-9 cross-repo rule 4; async signature
      present); confirm no file outside
      `server/workspace/src/realtime/` and its tests changed
      (`git diff --stat` scoped review — F5 shares no files with F1-F4/F6).

## Acceptance criteria

Full WHEN/THEN scenario from `specs/realtime-broker/spec.md`:

> #### Scenario: Client recovers by resubscribing
> - **WHEN** a client suspects it missed events (reconnect, buffer-drop disconnect)
> - **THEN** re-subscribing yields a `subscribed` body sufficient to rebuild current state without any replayed events

## Verify

```bash
pnpm --filter @aprovan/workspace test && grep -n "Promise<{ body?: unknown }>" server/workspace/src/realtime/broker.ts && ! grep -rn "focusByConn\|UserMembership" server/workspace/src/realtime/presence.ts && ! grep -rn --include="*.ts" "focusByConn\|UserMembership" ../registry/packages
```

Run this from the aprovan repo root exactly as written — the third grep
sweeps the **sibling** `registry` checkout (`../registry/packages`), not
this repo. Do not skip it because it's "obviously aprovan-only" — it is a
belt-and-suspenders rule applied uniformly across all of IW-9, not
project-specific evidence something leaked there.

### Baseline comparison — report honestly, do not launder the full-suite result

`briefs/deviations.md` item 4 recorded the pre-F5 baseline on a clean `main`
checkout:

```
Test Files  18 failed | 58 passed | 6 skipped (82)
     Tests  81 failed | 474 passed | 57 skipped (612)
```

with these 18 pre-existing failing files (none realtime, owned by F6's test
repair, not this change):

```
tests/agent-interface.test.ts
tests/agent-run.test.ts
tests/apps.test.ts
tests/chat-sessions.test.ts
tests/get-client.test.ts
tests/interfaces.test.ts
tests/live-apps.test.ts
tests/oauth-tokens.test.ts
tests/profiles.test.ts
tests/sandbox-agent-runs.test.ts
tests/sandbox-repo-mounts.test.ts
tests/sandboxes.test.ts
tests/sync.test.ts
tests/telemetry.test.ts
tests/vcs-interface.test.ts
tests/vcs-mount-lineage.test.ts
tests/vcs.test.ts
tests/vfs-mounts.test.ts
```

Do this comparison, and report **both** halves of it:

1. **Owned-regression check.** Diff your `pnpm --filter @aprovan/workspace test`
   output's failing-test list against the 18 files above. Your bar is: zero
   *new* failing files, and the realtime-owned files
   (`presence.test.ts`, `realtime-broker.test.ts`, `realtime-socket.test.ts`,
   `realtime-backpressure.test.ts`, `realtime-e2e.test.ts`) are fully green
   with no skips introduced. If a pre-existing file's failure *count* shifted
   (e.g. it gained or lost individual failing tests) without F5 touching
   anything near it, note that too rather than assuming it's unrelated.
2. **Full, honest result.** Paste the actual final summary line(s) from your
   test run verbatim in `briefs/04-report.md` — e.g. if F5 is the only
   change since the baseline, you should still see something close to `81
   failed | ...` in the total, not a claim of "all tests pass." Do **not**
   report only "0 new regressions, so it passes" — that summarizes away a
   result the orchestrator needs to see in full (per
   `IW-9-IMPLEMENTATION-PROMPT.md`: "failing Verify output goes in the report
   verbatim, not summarized away"). If by the time you run this the 18
   pre-existing failures have changed (e.g. F6 landed in the meantime and
   fixed some), report the new actual numbers, not the baseline above —
   the baseline is a comparison point, not a substitute for a fresh run.

## Constraints

- Touches only: `server/workspace/tests/realtime-e2e.test.ts`. If the full
  Verify surfaces a real regression you believe traces to Streams 1-3 rather
  than pre-existing debt, do not fix it yourself outside this stream's
  Touches — record it in `briefs/deviations.md` and report it as a blocker.
- Do not narrow the Verify command or split it into pieces to make partial
  success easier to claim — run it exactly as specified, in one pass, and
  report what actually happened.
- Surgical changes only; match existing style.

## Report back

When done: check off tasks 4.1–4.2 in `openspec/changes/iw9-f5-broker-spec/tasks.md`,
and write `openspec/changes/iw9-f5-broker-spec/briefs/04-report.md` containing:
what you built (the new e2e recovery case), the full Verify output verbatim
(all four commands), the baseline comparison from above with both halves
reported, and any deviations discovered.
