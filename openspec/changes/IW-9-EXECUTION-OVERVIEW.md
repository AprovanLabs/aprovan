# IW-9 execution overview — how to tackle the tasks

_2026-08-09. Companion to [IW-9-IMPLEMENTATION-PROMPT.md](IW-9-IMPLEMENTATION-PROMPT.md)
(the per-change execution protocol) and [IW-9-APP-FIRST.md](IW-9-APP-FIRST.md)
(decisions and invariants). This document is the map over the **elaborated**
plan: all twelve changes are complete, `openspec validate` passes on every
one, and every tasks.md uses the machine-parsed format with
`Depends-on | Repo | Touches | Verify` metadata._

## Inventory

**12 changes · 104 work streams · 453 tasks.**

| Change | Streams | Tasks | Repo(s) | External deps (from tasks.md) |
|---|---|---|---|---|
| iw9-f1-vcs-scoping-params | 4 | 17 | aprovan | soft: F6 test repair |
| iw9-f2-shared-partition | 6 | 24 | aprovan | — |
| iw9-f3-credential-levels | 7 | 21 | **both** (publish) | — |
| iw9-f4-app-identity | 6 | 30 | aprovan | — |
| iw9-f5-broker-spec | 4 | 15 | aprovan | — |
| iw9-f6-cleanup-rename | 12 | 51 | both (no publish) | — (all 12 streams `Depends-on: -`) |
| iw9-a-vcs-consolidation | 7 | 29 | aprovan | F1, F6 |
| iw9-b-app-model | 11 | 48 | aprovan | F2, F4 |
| iw9-d-agent-loop-server | 9 | 55 | aprovan | — |
| iw9-c-capability-approval | 14 | 60 | **both** (publish) | F3, F4, B, D, A(routes) |
| iw9-chat-flagship | 12 | 55 | aprovan | F2, F5, B, D |
| iw9-doc-markdown | 12 | 48 | aprovan | A, B, D, F5, Chat harness |

## The execution lanes

Maximum useful concurrency, respecting every declared dependency:

```
PHASE 1 (start immediately, all parallel)
  Lane 1: F6 — 12 independent streams, largest instant-start surface
  Lane 2: F1 → then A               (A also wants F6's test repair first)
  Lane 3: F2 ∥ F4 → then B
  Lane 4: F3 (registry→publish→pin→aprovan, strictly internal order)
  Lane 5: F5
  Lane 6: D  — longest stream; start day one, no deps

PHASE 2 (as lanes complete)
  A   after F1 + F6-stream-1        B after F2 + F4
  Chat after F2 + F5 + B + D
  C   after F3 + F4 + B + D, and A's routes/tools.ts edits

PHASE 3
  Doc after A + B + D + F5 (+ Chat's Playwright harness)
```

Practical reading: **on day one you can have six agents working** (F6, F1,
F2, F4, F3, F5, D — F2∥F4 share a lane only conceptually; their Touches are
disjoint, so seven is fine). The critical path is
**D → C** (55 + 60 tasks) and **F2/F4 → B → Chat → Doc**.

## Model tiers for the implementing fleet

Default **Sonnet** for every stream; escalate/downgrade only these:

| Tier | Streams | Why |
|---|---|---|
| **Opus** | D streams 1–3 (stream protocol, runner event emission, reattach/replay); C's review surface + derived-authority streams; B's install-as-copy migration stream; Doc's agent-reconciliation streams | genuinely novel logic; failure modes are silent-data or security-shaped |
| **Sonnet** (default) | everything else | contracts are frozen in tech-plans; work is elaboration against fixed interfaces |
| **Haiku** | F6 husk deletion, AGENTS.md edits, stale-doc archival; pure grep-gate close-out streams | mechanical, exhaustively specified, verifiable by command |

Do NOT downgrade F6's test-repair or dataScope streams to Haiku: elaboration
found `vcs-interface.test.ts`'s failures are a real interface-resolution
collision (not renames) and the dataScope residue is a live rendered UI
feature (`DataScopeBadge`) frozen at a dead default — both need judgment.

## Findings the elaboration surfaced (read before starting)

These are places where reality differed from the plan; each is recorded in
the owning change's tech-plan, listed here so the orchestrator isn't
surprised:

1. **CF-5 / UNASSIGNED, blocks both flagship agent profiles:**
   `agents/service.ts:642-660` 403s any app-scoped agent-profile call, which
   blocks `chat/summarize` and `doc/fix-typos` identically. Neither flagship
   may fix core code (their rule), and it predates C. **Recommendation:
   fold the fix into iw9-d's scope as a deviation** (it owns the agents
   service) — decide before Chat stream 5 starts.
2. `packages/native/src/dispatch.ts:69-83` arg-allowlist silently drops
   unthreaded scope args — F1 threads it; anyone adding tool args later must
   know it exists.
3. Diff hash-stripping is enforced by the shared `NativeVcsDiff` wire type —
   un-stripping is a contained breaking wire change (zero client callers
   today). Owned by F1/A.
4. `infra/aws/aws/` is a **tracked** 19-file duplicate, not a husk — F6
   deletes it through git, not `rm`.
5. `CredentialRecord.createdBy` already exists (provenance); F3 adds levels
   + invoker-aware resolution, not the field itself.
6. B's earlier draft drifted from F2/F4 contracts (invented `hostingMode`;
   assumed binary host modes) — corrected; the frozen-contract cross-check
   is the mechanism that caught it. Implementers should trust the
   tech-plans' Interfaces sections over any prose.
7. CloudFront has no `/chat` path behavior to edit — the rename adds a
   redirect function (F6's tech-plan D-decision).
8. F1/F5/F2/F3/F4/A/B/C/D/Chat/Doc all embed verified `file:line` cites;
   where a line has drifted by the time you implement, the tech-plan's
   stated intent wins over the line number (record drift in
   `briefs/deviations.md` per the implementation prompt).

## Definition of done (per change, restated)

1. Every `- [ ]` in tasks.md checked, each after its `Verify:` passed.
2. Grep-gates clean in BOTH repos for every deletion.
3. `openspec validate <change> --type change` still passes (specs may gain
   deltas during implementation; keep them coherent).
4. `briefs/report.md` written; deviations in `briefs/deviations.md`.
5. Wave exit gates in IW-9-IMPLEMENTATION-PROMPT.md hold before the next
   wave starts.

## Start here

```bash
# sanity: all changes valid
for c in openspec/changes/iw9-*/; do openspec validate "$(basename $c)" --type change; done

# day-one fleet (suggested): F6, F1, F2, F4, F3, F5, D
# each agent gets IW-9-IMPLEMENTATION-PROMPT.md + its change name
```
