# Brief: App-scoped agent profiles — CF-5 (stream 10)

**Model tier: Opus.** This is an authorization boundary; a mistake here
silently widens what an installed app can do. **Depends-on: stream 5
(merged)** — stream 5 is the only other editor of `agents/service.ts` and the
two must never run concurrently. May run in parallel with streams 6-9.

## Mission

When you are done, an installed app can run the agent profiles its own
manifest declares — addressed `<app-slug>/<agent>` — and nothing else, with
its effective authority computed at run time as the intersection of the
declaration, the app's grants, and the invoker's grants. Today
`agents/service.ts` returns 403 to *every* app-scoped profile call, which
hard-blocks two flagship features (`chat/summarize` in iw9-chat-flagship and
`doc/fix-typos` in iw9-doc-markdown) that may not fix core code themselves.
You own the whole seam — declaration grammar, resolution, and execution — so
neither of them is left half-unblocked.

**This is a narrowing, not an opening.** The existing 403 is deliberate,
documented behavior ("an app could otherwise mint itself a wide grant"). You
permit exactly one new case and widen nothing else.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — **read invariants 2, 3, 4 and 11 carefully; they are the design constraints of this stream, not background.**
3. `openspec/changes/IW-9-EXECUTION-OVERVIEW.md` — "Findings" item 1 (CF-5), now assigned here.
4. `openspec/changes/iw9-d-agent-loop-server/briefs/deviations.md` — entry 1 records the assignment rationale and the security analysis you are implementing.
5. `openspec/changes/iw9-d-agent-loop-server/prd.md` — Goal 0 and the CF-5 constraints.
6. `openspec/changes/iw9-d-agent-loop-server/tech-plan.md` — **D7** and "Interfaces & Data → App agent declaration".
7. `openspec/changes/iw9-d-agent-loop-server/specs/app-scoped-agent-profiles/spec.md` — your acceptance bar.
8. `openspec/changes/iw9-d-agent-loop-server/tasks.md` — preamble (baseline rule) and stream 10's serialization note.
9. `server/workspace/src/agents/service.ts` — the `ctx.appScope` gate at L642-660 (`appScope` check L648, the 403 at L658), `AgentProfile` at ~L67-104, `renderAgentRun` at L394, `NAME_RE`.
10. `server/workspace/src/apps/manifest.ts` — iw9-f4's `AppYamlSchema` (`.strict()`), `loadAppYaml`.
11. `server/workspace/src/apps/store.ts` — `AppRecord.declared`, the last-reconciled manifest snapshot you resolve from.
12. `openspec/changes/iw9-chat-flagship/tasks.md` stream 5 and `openspec/changes/iw9-doc-markdown/tasks.md` stream 10 — the two gates you are opening; task 10.7 checks them.

`server/workspace/src/agents/app-profiles.ts` does not exist yet; you create it.

**Before writing code**, confirm the two serialization facts stream 10
depends on and record a deviation if either fails: iw9-f4 has landed (so
`apps/manifest.ts` exists in its final shape), and no iw9-b stream touches
`apps/manifest.ts`.

## Tasks

- [x] 10.1 Extend F4's `AppYamlSchema` (`server/workspace/src/apps/manifest.ts`) additively with an optional top-level `agents` block: a list of `{ name, description?, prompt?, llm?, tools: string[] }`, `name` matching the same lowercase-slug rule agent profiles already use (`NAME_RE`, `agents/service.ts`). The schema stays `.strict()` (F4 spec app-manifest "unknown key rejected" must still pass unchanged), and `agents` is the *only* new key. Reject at parse time any entry whose `tools` patterns are not covered by the manifest's declared `capabilities` ceiling — a declaration may narrow the app's ceiling, never exceed it (invariant 2), with a 400 naming both the pattern and the ceiling.
- [x] 10.2 Create `server/workspace/src/agents/app-profiles.ts` exporting `resolveAppProfile(workspaceId, appId, name)`: read the installed app's last-reconciled manifest snapshot (F4's `AppRecord.declared`) and render an in-memory `AgentProfile` from the matching `agents` entry. Declaration **is** registration — there is no separate registration record and no stored copy of the profile, so a manifest edit takes effect on next resolve and a removed declaration stops resolving immediately (invariant 3: derived at run time, never snapshotted). Return `undefined` (not a throw) when the app declares no such agent.
- [x] 10.3 Add app provenance to `AgentProfile` (`agents/service.ts`, the interface at ~L67-104): `app?: { appId: string; slug: string }`, populated only by 10.2's resolver. The field is never accepted from request input and never written by `agents.create`/`update`; a stored workspace profile always has it `undefined`. Any `agents.get`/`list` rendering shows it so an operator can tell an app-shipped profile from a workspace one.
- [x] 10.4 Narrow the `ctx.appScope` gate (`agents/service.ts` ~L642-660) minimally: `get`/`list`/`runs`/`getRun` remain allowed exactly as today; `run` becomes allowed **only** when the requested profile name is `<slug>/<agent>` where `<slug>` is the calling app's own slug and `resolveAppProfile` (10.2) returns a declaration for it; every other `run` — including any workspace-level profile name and any other app's profile — and all of `create`/`update`/`delete` continue to throw the existing `ServiceError("Apps cannot manage or run agent profiles", 403)`. Keep the existing comment and extend it to state precisely what is now permitted and why the widening is safe (declaration is authored by a person in the app's manifest; invariant 11 is preserved because the app cannot mint or edit a declaration at run time).
- [x] 10.5 Effective authority is an intersection computed at run render, not a copy: the app-scoped run's tool patterns = the declared profile's `tools` ∩ the app's installed capability grants ∩ the invoker's grants (invariant 2), threaded through `renderAgentRun`'s existing shape (stream 5.3's path) with no new rendering path. The runner's pattern-list bound and `invokeTool`'s `ctx.grants` re-check are **not modified** by this stream (invariant 3, PRD constraint). Attribution follows ADR 0002's consequence: the run record names the invoker as principal/payer and the app profile as the via-path.
- [x] 10.6 New test file `tests/agent-app-profiles.test.ts` covering every scenario in the `app-scoped-agent-profiles` spec: a declared profile runs from an app session ("Declared app profile runs"); the same session naming a workspace profile is refused 403 ("Arbitrary workspace profile is refused"); `agents.create`/`agents.update` from an app session are still refused 403 ("Apps never provision profiles") while `get`/`list`/`runs`/`getRun` still succeed; a declaration whose `tools` exceed the invoker's grants runs with the intersection and a call outside it is denied at dispatch ("Authority is the intersection, derived at run time"); and a manifest whose `agents[].tools` exceed the app's own `capabilities` ceiling is rejected at parse time ("Declaration cannot exceed the app ceiling").
- [x] 10.7 Close the cross-change gates: confirm `iw9-chat-flagship/tasks.md` 5.1 and `iw9-doc-markdown/tasks.md` 10.0 name this stream and that their stated exit conditions are literally satisfied by what landed (an app-declared `<slug>/<agent>` profile parses, resolves, and runs bounded by app ∩ invoker grants); report any mismatch as a blocker against those changes rather than adjusting scope here.

## Acceptance criteria

From `specs/app-scoped-agent-profiles/spec.md`:

### Requirement: App sessions may run manifest-declared profiles only

An app-scoped session (`ctx.appScope` set) SHALL be able to start a run for
an agent profile that the calling app's own manifest declares — addressed as
`<app-slug>/<agent>` — and for nothing else. The declaration in `app.yaml`
is the registration: no separate registration record exists, the profile is
rendered from the app's last-reconciled manifest at resolve time, and a
declaration that is removed from the manifest stops resolving. Any other
profile name from an app session, including a workspace-level profile or
another app's profile, SHALL be refused with the existing 403.

#### Scenario: Declared app profile runs

- **WHEN** an app session whose manifest declares `agents: [{ name: summarize, tools: [...] }]` starts a run for profile `chat/summarize`
- **THEN** the run starts, its record carries the app provenance (appId and slug) alongside the invoker as principal, and it executes through the same runner and dispatch path as any workspace run

#### Scenario: Arbitrary workspace profile is refused

- **WHEN** an app session starts a run naming a workspace-level profile it did not declare (or another app's `<slug>/<agent>`)
- **THEN** the call is refused with 403 "Apps cannot manage or run agent profiles" and no run record is created

#### Scenario: Removed declaration stops resolving

- **WHEN** an app's manifest is edited to drop a previously declared agent and the app session then starts a run for that name
- **THEN** the profile does not resolve and the run is refused — no stored copy of the declaration survives the manifest edit

### Requirement: Apps never provision profiles

Profile management remains workspace configuration authored by people: an
app-scoped session SHALL continue to be refused for `create`, `update`, and
`delete` of agent profiles, and the app-provenance field SHALL never be
settable through request input. Read procedures (`get`, `list`, `runs`,
`getRun`) SHALL remain permitted exactly as before this change.

#### Scenario: Create and update stay refused

- **WHEN** an app session calls `agents.create` or `agents.update`
- **THEN** the call is refused with 403, no profile record is written, and the refusal is unchanged from the behavior before app-declared profiles existed

#### Scenario: Reads remain permitted

- **WHEN** an app session calls `agents.get`, `agents.list`, `agents.runs`, or `agents.getRun`
- **THEN** the call succeeds as it does today, and app-shipped profiles are distinguishable from workspace profiles by their provenance field

### Requirement: Authority is the intersection, derived at run time

The effective tool authority of an app-scoped run SHALL be the intersection
of the declared profile's tool patterns, the app's installed capability
grants, and the invoker's grants — computed at run render, never
snapshotted — and the runner's dispatch-time grant re-check SHALL be
unmodified. Declaring a tool pattern SHALL NOT grant it.

#### Scenario: Declaration does not widen authority

- **WHEN** an app declares an agent whose `tools` include a pattern the invoker's grants do not cover, and the run attempts a call under that pattern
- **THEN** the run's pattern list never contained it, the call is denied at dispatch exactly as an out-of-grant call is denied for a workspace run, and nothing about the app declaration changes the outcome

#### Scenario: Declaration cannot exceed the app ceiling

- **WHEN** an `app.yaml` declares an agent whose `tools` patterns are not covered by the app's own declared capability ceiling
- **THEN** manifest validation rejects it with an error naming both the offending pattern and the ceiling, and the app does not reconcile with that declaration

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/workspace test -- tests/agent-app-profiles.test.ts tests/app-manifest.test.ts tests/agent-run.test.ts && pnpm --filter @aprovan/workspace typecheck
```

**Baseline rule applies**: `tests/agent-run.test.ts` is already failing on
`main` (repo-wide baseline 81 failures). `tests/app-manifest.test.ts` is
iw9-f4's suite and must stay green — your `agents` key is additive and
`.strict()`'s unknown-key rejection must still pass. Capture baselines first
and state them in your report.

## Constraints

- **Widen exactly one case.** Every other `run`, and all of `create`/`update`/`delete`, keep the existing 403 with the existing message.
- Invariant 2: authority is an intersection, never a union. Invariant 3: computed at run render, never snapshotted — no stored profile record, no registration table. Invariant 4: apps remain separate principals needing grants. Invariant 11: apps and agents cannot self-provision; a person authors the declaration.
- Do not modify the runner's pattern-list bound or `invokeTool`'s `ctx.grants` re-check. If your change appears to require it, stop and report.
- The provenance field is resolver-set only; never accepted from request input.
- New tests go in a new file; never append to an existing test file.
- Surgical changes only; match existing style.
- Do not modify files outside: `server/workspace/src/apps/manifest.ts`, `server/workspace/src/agents/app-profiles.ts`, `server/workspace/src/agents/service.ts`, `server/workspace/tests/agent-app-profiles.test.ts`. `apps/manifest.ts` is iw9-f4's file and gets exactly one additive key — if you find yourself restructuring it, stop and report.

## Report back

Check off tasks as each Verify passes, and write `briefs/10-report.md`
containing: the final `agents:` grammar as shipped (iw9-chat-flagship 5.2 and
iw9-doc-markdown 10.1 will author manifests against it), the exact
before/after of the `ctx.appScope` gate, how the three-way intersection is
computed and where, your baselines, and any deviations. Explicitly state
whether the two flagship gates (Chat 5.1, Doc 10.0) are now satisfied — that
statement is what unblocks two other changes.
