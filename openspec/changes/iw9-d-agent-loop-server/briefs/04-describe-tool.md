# Brief: `describe(namespace)` tool (stream 4)

**Model tier: Sonnet.** Contract is frozen in the tech-plan; this is
elaboration against fixed interfaces. **Depends-on: stream 2 (merged). May
run in parallel with stream 3 — disjoint files.**

## Mission

When you are done, the native runner offers the model a second built-in
function, `describe { namespace, query?, cursor? }`, that returns compact
operation signatures on demand from the same catalog the tools route already
uses — bounded by the run's grant projection and paginated. This replaces
pasting up to 40 signatures per namespace into the system prompt: prompts
carry patterns, the model asks for details when it needs them. Describing
something must never make it callable.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `docs/decisions/0004-server-side-agent-loop.md` — "one generic `call_tool` plus an on-demand `describe(namespace)`".
4. `openspec/changes/iw9-d-agent-loop-server/prd.md` — Goal 2.
5. `openspec/changes/iw9-d-agent-loop-server/tech-plan.md` — "Interfaces & Data → describe tool".
6. `openspec/changes/iw9-d-agent-loop-server/specs/tool-discovery-describe/spec.md`
7. `openspec/changes/iw9-d-agent-loop-server/tasks.md` — preamble, incl. the baseline rule.
8. `server/workspace/src/routes/tools.ts:755-829` — `describeNamespaces`, the catalog you extract and share (`GET /tools` handler at L830).
9. `server/workspace/src/agents/runner.ts` — `callToolSchema` L209, `toolGranted` re-check L436, the system-prompt builder.

## Tasks

- [x] 4.1 Extract the operation-catalog logic inside `describeNamespaces` (`routes/tools.ts:756`) into a shared, importable function (e.g. `catalogForNamespace(workspaceId, namespace)`) so `runner.ts` reuses the same catalog instead of a second implementation (spec tool-discovery-describe: "the same catalog `describeNamespaces` uses"; avoids the duplicate-implementation pattern the IW-9 preamble warns about).
- [x] 4.2 Add `describeToolSchema()` beside `callToolSchema` (runner.ts ~L208-230): a second function definition, `describe { namespace, query?, cursor? }`, offered to the model on every native run alongside `call_tool`.
- [x] 4.3 Implement the `describe` handler: filter 4.1's catalog to operations matching the run's `allowed` pattern list using the same `toolGranted` check `call_tool` uses (runner.ts ~L435); page at ~40 operations per response with a `cursor` and `remaining` count (spec "Large namespaces paginate").
- [x] 4.4 Ungranted-namespace refusal: return `{ error, allowed: string[] }` and let the run continue (not `tool_denied` — spec "a describe refusal is recoverable, unlike a denied call_tool"; no catalog for the ungranted namespace is loaded).
- [x] 4.5 Confirm the runner's system-prompt builder never embeds per-operation signatures (only the pattern list + `call_tool`/`describe` mechanics) — this is the server-side half of PRD Goal 2; the client-side `formatToolSignatures`/`{{tools}}` deletion is stream 8.
- [x] 4.6 New test file `tests/agent-describe.test.ts`: a run granted `vcs.*` calling `describe { namespace: "vcs" }` gets compact signatures sufficient to issue a correct `call_tool` with no signature ever in the system prompt (spec "Model discovers operations mid-run"); a run granted only `vcs.*` calling `describe { namespace: "github" }` gets the refusal shape naming allowed patterns (spec "Ungranted namespace is refused"); pagination round-trips via `cursor` (spec "Large namespaces paginate"); describing a namespace then calling a denied operation still ends the run `tool_denied` exactly as without the describe call (spec "Describe does not widen authority").

## Acceptance criteria

From `specs/tool-discovery-describe/spec.md`:

### Requirement: describe tool offered alongside call_tool

The native runner SHALL offer the model a second built-in function,
`describe`, taking `{ namespace, query?, cursor? }` and returning operation
signatures (operation path, parameter names with required/optional markers,
one-line description) for that namespace on demand. `describe` SHALL only
answer for namespaces matched by the run's allowed tool patterns; a
namespace outside the projection returns a refusal naming the allowed
patterns, not an empty list.

#### Scenario: Model discovers operations mid-run

- **WHEN** a run granted `vcs.*` calls `describe { namespace: "vcs" }`
- **THEN** the tool result lists `vcs` operations with compact signatures and the model can issue a correct `call_tool` without any signature having been in the system prompt

#### Scenario: Ungranted namespace is refused

- **WHEN** a run granted only `vcs.*` calls `describe { namespace: "github" }`
- **THEN** the result is an error naming the run's allowed patterns, the run continues (a describe refusal is recoverable, unlike a denied call_tool), and no `github` catalog is loaded

#### Scenario: Large namespaces paginate

- **WHEN** `describe` targets a namespace whose operation count exceeds the per-response cap
- **THEN** the response carries a `cursor` and a note of the remaining count, and a follow-up call with that cursor returns the next page

### Requirement: Prompts carry patterns, not signatures

The system prompt composed for a chat-driven run SHALL identify tools only by
the allowed pattern list and the `call_tool`/`describe` mechanics; it SHALL
NOT embed per-operation signatures. The per-namespace signature-pasting
pipeline (`formatToolSignatures` and its `{{tools}}` prompt var) SHALL be
removed with the client transport.

#### Scenario: No signature pasting survives

- **WHEN** a chat-driven run's rendered system prompt is inspected in a test
- **THEN** it contains the allowed patterns and tool-use instructions but no operation parameter lists

### Requirement: Dispatch boundary is unchanged

`describe` SHALL be read-only metadata and grant nothing: `call_tool`
dispatch continues to check the run's pattern list in the runner and re-check
`ctx.grants` in `invokeTool`, and describing an operation SHALL NOT make it
callable.

#### Scenario: Describe does not widen authority

- **WHEN** a model describes a namespace and then calls an operation the pattern list does not allow
- **THEN** the call is denied exactly as it would have been without the describe call (run ends `tool_denied`)

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/workspace test -- tests/agent-describe.test.ts tests/agent-run.test.ts && pnpm --filter @aprovan/workspace typecheck
```

**Baseline rule applies**: `tests/agent-run.test.ts` is already failing on
`main`. Capture its failure count first; pass = your new file fully green and
no *additional* failures there. State both numbers in your report.

## Constraints

- 4.1 must **extract and share**, not copy. A second catalog implementation is exactly the failure mode the IW-9 preamble calls out.
- `describe` is read-only metadata and grants nothing; the dispatch re-check is untouched (invariant 3).
- The client-side deletion of `formatToolSignatures` belongs to stream 8 — do not do it here.
- New tests go in a new file; never append to an existing test file.
- Surgical changes only; match existing style.
- Do not modify files outside: `server/workspace/src/agents/runner.ts`, `server/workspace/src/routes/tools.ts`, `server/workspace/tests/agent-describe.test.ts`.
- Note: iw9-a also edits `routes/tools.ts` in Wave 1. If its schema changes have landed, rebase on them; if you hit a conflict, report it rather than reverting anyone's work.

## Report back

Check off tasks as each Verify passes, and write `briefs/04-report.md`:
what you built, the shared-catalog function's signature (stream 8 cross-checks
against it), your baselines, and any deviations.
