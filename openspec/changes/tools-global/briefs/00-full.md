# Brief: tools-global (all streams 1–8)

## Mission
Replace bare service globals/imports with a single `tools` root across the compiler,
workflow sandbox, dependency scan, plugins, prompts, and package renames. When done,
widget/workflow code reaches services only via `tools.<ns>.<op>`, there is exactly one
namespace-set definition, PostHog no longer overrides the authoring prompt, and packages
are renamed `@aprovan/patchwork-compiler`→`@aprovan/patchwork` and
`@aprovan/patchwork-editor`→`@aprovan/editor`. This change owns all resulting import churn
in `client/web` so later wave lanes do not rewrite the same lines.

## Read first
1. `openspec/changes/tools-global/prd.md` (open questions settled)
2. `openspec/changes/tools-global/tech-plan.md` (D1–D7, Interfaces & Data)
3. `openspec/changes/tools-global/tasks.md` (streams 1–8 — execute in Depends-on order)
4. Specs under `openspec/changes/tools-global/specs/`
5. Key sources: `packages/compiler/src/namespace-core.ts`, `packages/compiler/src/mount/**`,
   `server/workspace/src/workflows/{runner,sandbox}.ts`, `server/workspace/src/promptStore.ts`,
   `data/prompts/chat-patchwork-widget.md`, `scripts/seed-prompts.ts`
6. Karpathy guidelines: `~/.claude/skills/karpathy-guidelines/SKILL.md`

## Settled decisions (do not re-litigate)
- Hard cutover — no bare-global deprecation warning path.
- PostHog rip-out: `resolveStoredPrompt` is workspace-FS-only; task 6.4 is rip-out, not a divergence CI check. PostHog `chat-patchwork-widget` already stubbed as DEPRECATED.
- `assembleTools()` lives in the compiler for now.
- Workflow sandbox installs `tools` via QuickJS prelude.
- Leave `patchwork:*` / `patchwork_access_token` localStorage keys unchanged.

## Tasks
Execute streams **1 → 8** from `openspec/changes/tools-global/tasks.md` verbatim.
Internal parallelism allowed only where Depends-on and Touches do not conflict
(after stream 1: 2 ‖ 3 ‖ 5; after 2: 4; after 2+3: 6; after 2+3+4+5: 7 then 8).
Check off each checkbox in `tasks.md` as you complete it.

Stream 7: land renames as **two commits** (compiler rename, then editor rename).

Stream 6.3: delete duplicate prompt in the registry repo; reconcile
`workflows.trace({ runId })` vs `{ run: runId }` against `workflows/service.ts`.

## Acceptance criteria
### namespace-plugins

#### Scenario: Registration before sandbox creation

- **WHEN** the host mounts a widget with plugins registered
- **THEN** the assembled `tools` reflects those plugins, and the widget observes them as ordinary namespaces

### namespace-plugins

#### Scenario: Sandbox cannot register

- **WHEN** sandboxed widget code attempts to register a plugin or mutate `tools`
- **THEN** no registration occurs and subsequent calls dispatch through the host's assembly unchanged

### namespace-plugins

#### Scenario: Chained middleware

- **WHEN** two middleware are registered and a call is dispatched
- **THEN** both observe the call in registration order, and the transport receives the result of the chain

### namespace-plugins

#### Scenario: Middleware does not change shape

- **WHEN** middleware is registered for retry or attribution
- **THEN** the namespace's operation surface is unchanged from the caller's perspective

### namespace-plugins

#### Scenario: Override delegates to the underlying node

- **WHEN** a `telemetry` override is registered that batches and attributes events
- **THEN** it receives the underlying `telemetry` node and calls through to `telemetry.export` rather than reimplementing dispatch

### namespace-plugins

#### Scenario: Plugin provides a namespace with no gateway counterpart

- **WHEN** the notification drawer registers a `notification` plugin carrying the delivered payload
- **THEN** `tools.notification` resolves to that payload object, with no source rewriting and no gateway namespace of that name

### namespace-plugins

#### Scenario: One override per namespace

- **WHEN** two overrides are registered for the same namespace
- **THEN** registration fails with an error naming the namespace, rather than silently taking one

### namespace-plugins

#### Scenario: Override type reaches generated declarations

- **WHEN** types are generated for a host with a `telemetry` override registered
- **THEN** the emitted declaration describes the override's shape, not the gateway's unmodified operation list

### namespace-plugins

#### Scenario: Provided namespace is declared

- **WHEN** a plugin provides a namespace absent from the gateway's namespace list
- **THEN** the generated declarations include it, sourced from the plugin rather than from `GET /tools`

### tools-namespace-root

#### Scenario: Namespace reached through the root

- **WHEN** widget code evaluates `tools.vfs.read({ path: "a.txt" })`
- **THEN** the runtime issues `POST /tools/vfs/read` with body `{ args: { path: "a.txt" } }`

### tools-namespace-root

#### Scenario: Bare global no longer installed

- **WHEN** widget code references the identifier `vfs` without declaring it
- **THEN** evaluation fails with a `ReferenceError`, and no namespace proxy is reachable under that name

### tools-namespace-root

#### Scenario: Bare specifier is not intercepted

- **WHEN** widget code contains `import vfs from "vfs"`
- **THEN** the compiler does not claim the specifier and it resolves as an ordinary CDN package, exactly as any other npm name would

### tools-namespace-root

#### Scenario: Platform namespace present

- **WHEN** widget code evaluates `tools.apps.list({})`
- **THEN** the call dispatches to `POST /tools/apps/list` identically to any provider call

### tools-namespace-root

#### Scenario: Undeclared namespace still reachable

- **WHEN** a widget accesses a namespace it never declared and the gateway grants the call
- **THEN** the call succeeds; authorization is enforced by the gateway, not by the contents of `tools`

### tools-namespace-root

#### Scenario: Ungranted namespace rejected server-side

- **WHEN** a widget accesses a namespace the gateway's grants do not permit
- **THEN** the gateway returns an error and the client surfaces it; the client does not pre-filter the namespace out of `tools`

### tools-namespace-root

#### Scenario: Unconfigured call needs no invocation

- **WHEN** widget code evaluates `tools.llm.createChatCompletion({ messages })`
- **THEN** the call dispatches with the namespace's default configuration and no extra call syntax is required

### tools-namespace-root

#### Scenario: Configured node returned

- **WHEN** widget code evaluates `tools.github({ name: "work" })`
- **THEN** a node is returned that dispatches subsequent operations with that configuration, and no network request is made by the configuring call itself

### tools-namespace-root

#### Scenario: No reserved operation name

- **WHEN** a provider declares a root-level operation named `client`
- **THEN** `tools.<provider>.client(args)` dispatches that operation, because configuration uses the node's own call signature rather than a named method

### tools-namespace-root

#### Scenario: No credentials in the sandbox

- **WHEN** sandboxed widget code inspects its global scope
- **THEN** it finds `tools` but no gateway base URL, bearer token, workspace id, or transport function

### tools-namespace-root

#### Scenario: Host supplies the transport

- **WHEN** the host mounts a widget
- **THEN** the transport is bound in the host and reached only through the postMessage bridge; the widget's own module graph contains no self-configuring client

### widget-authoring-prompt

#### Scenario: One copy in the repo

- **WHEN** the repositories are searched for the widget authoring prompt
- **THEN** exactly one file is found, in this repository

### widget-authoring-prompt

#### Scenario: Seeder writes the prompt successfully

- **WHEN** the prompt seeder is run against a workspace
- **THEN** it completes without error and the prompt is readable from that workspace's filesystem

### widget-authoring-prompt

#### Scenario: PostHog does not override

- **WHEN** a chat request resolves the widget authoring prompt and PostHog credentials are configured
- **THEN** the workspace filesystem copy is used and PostHog is not consulted

### widget-authoring-prompt

#### Scenario: No bare conventions taught

- **WHEN** the prompt is inspected
- **THEN** it contains no bare namespace import or bare global call example, and no `uses=` fence attribute

### widget-authoring-prompt

#### Scenario: Root-anchored examples

- **WHEN** the prompt shows a service call
- **THEN** the example is rooted at `tools`

### widget-dependency-scan

#### Scenario: Namespaces collected from property access

- **WHEN** source contains `tools.vfs.read(...)` and `tools.github.repos.get(...)`
- **THEN** the derived dependency list contains `vfs` and `github`

### widget-dependency-scan

#### Scenario: Configured access still counted

- **WHEN** source contains `tools.github({ name: "work" }).repos.get(...)`
- **THEN** `github` appears in the derived list exactly once

### widget-dependency-scan

#### Scenario: Unrelated identifier ignored

- **WHEN** source declares a local variable named `tools` in an inner scope and accesses a property on it
- **THEN** the scan does not attribute that access to a service namespace

### widget-dependency-scan

#### Scenario: Dynamic access reported as unresolved

- **WHEN** source contains `tools[someVariable]`
- **THEN** the scan records that the dependency list is incomplete, rather than silently reporting a complete list

### widget-dependency-scan

#### Scenario: uses attribute ignored

- **WHEN** a code fence carries `uses="keyvalue events"`
- **THEN** the attribute has no effect on which namespaces are available or on the derived dependency list

### widget-dependency-scan

#### Scenario: Derived list drives the dependency panel

- **WHEN** the dependency panel renders for a widget
- **THEN** it shows namespaces produced by the scan of that widget's source

### widget-dependency-scan

#### Scenario: No duplicate definitions

- **WHEN** the repository is searched for a hardcoded list of first-party namespace names
- **THEN** exactly one definition is found, and no consumer declares its own copy

### widget-dependency-scan

#### Scenario: Consumers agree by construction

- **WHEN** the namespace set changes
- **THEN** every consumer observes the change without a second edit

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/patchwork-compiler test   # until renamed; then @aprovan/patchwork
pnpm --filter @aprovan/workspace test
pnpm --filter @aprovan/patchwork-web typecheck    # package name may change mid-stream
pnpm check-types
pnpm build
# After rename, re-run with new filter names.
```

## Git workflow
- Primary repo: `/Users/jacob/Documents/Code/AprovanLabs/aprovan`
- Also edit registry for: stream 5 (`packages/runtime/src/imports.ts`), stream 6 (delete duplicate prompt).
- Branch from latest `origin/main`: `iw7/tools-global`
- If registry edits needed: branch `iw7/tools-global` on registry too; open separate PRs.
- Open PRs to `main` on each touched repo. Do **not** merge yourself — report PR URLs;
  the orchestrator merges + deploys.
- Rebase onto `origin/main` before PR.

## Constraints
- Implement only tasks 1–8; tech-plan interfaces are fixed — stop and report if wrong.
- Surgical changes; match existing style.
- Do **not** implement profiles-unified, utdk-remote-package, editor-consolidation, or
  interfaces-native-provider work.
- Do **not** flip catalog-derived output schemas (that is interfaces-native-provider 8.4).
- Touches only the globs listed per stream in `tasks.md`.

## Report back
Check off tasks in `openspec/changes/tools-global/tasks.md`. Write
`openspec/changes/tools-global/briefs/00-report.md` with: PR URLs, verify output summary,
deviations, and notes for wave-1 (especially package rename fallout for
`@aprovan/patchwork` / `@aprovan/editor` consumers).
