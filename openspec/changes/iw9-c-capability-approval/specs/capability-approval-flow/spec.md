# capability-approval-flow

How grants come to exist: the install card (D9 ceiling), JIT non-blocking
resource introduction (D9/D12), the explicit `ask` workflow action, app
always-ask policy, and the workspace tighten-only override (D12).

## ADDED Requirements

### Requirement: Install card proposes a static-analysis ceiling
At install (and at promote-out), the platform SHALL statically analyze the
app's code for tool access (the registry `tools-scan` machinery — dynamic
`tools[expr]` access is already a parse error per grant-enforcement stream
2, so the static list is total) and propose a capability ceiling
reconciled against the `app.yaml` declaration (iw9-b manifest fields):
capabilities declared but never used are flagged, capabilities used but
undeclared block install until declared. The installer confirms one card;
confirmation writes the ceiling grants (D9).

#### Scenario: Ceiling proposed from code
- **WHEN** an app whose code calls `github.issues.create` and
  `email.send` is installed
- **THEN** the install card lists exactly those capabilities with their
  effects, pre-filled from `app.yaml`, and confirming writes the ceiling

#### Scenario: Undeclared use blocks
- **WHEN** app code calls a namespace absent from `app.yaml` capabilities
- **THEN** the install card marks it as undeclared and install cannot
  complete until the manifest declares it or the code drops it

#### Scenario: Ceiling is coarse, resources come later
- **WHEN** the install card is confirmed
- **THEN** only capability-level grants exist; resource patterns are
  introduced just-in-time on first action (D9)

### Requirement: JIT capability cards are non-blocking
When a run misses a grant (capability or resource), the platform SHALL
emit a capability-request card and end the turn — never block a held
connection awaiting approval. Accepting the card records the grant
(remembered, D12) and resumes the run via the agent stream protocol's
resume extension point (iw9-d). Declining records nothing and the run
stays ended.

#### Scenario: Miss ends the turn
- **WHEN** an agent run's tool call misses a resource grant on a
  result-dependent action
- **THEN** the turn ends with a card summarizing the request (capability,
  resource, effect, credential level) and the message "queued N actions"
  where applicable

#### Scenario: Accept resumes
- **WHEN** the invoker accepts the JIT card
- **THEN** the grant is persisted, queued actions covered by it are
  released, and the run resumes from where it ended

### Requirement: Explicit ask action
Workflows SHALL have an explicit `ask` step that surfaces a question/
approval to the invoker's queue (D15: approvals from a run go to the
invoker) and ends the turn like a JIT card. `ask` is the only
workflow-visible synchronous approval primitive; there is no
approve-before-everything mode (D11).

#### Scenario: Workflow asks
- **WHEN** a workflow executes an `ask` step with a payload
- **THEN** a card appears in the invoker's review surface, the turn ends,
  and the workflow resumes with the answer on response

### Requirement: App always-ask policy, workspace tightens only
An app manifest MAY declare action classes as always-ask (every dispatch
raises a card even inside granted resources). Workspace policy MAY add
always-ask classes or narrow grants but SHALL NOT remove an app's declared
always-ask or widen its ceiling (D12: workspace tightens, never loosens).

#### Scenario: Always-ask fires inside a grant
- **WHEN** an app declares `email.send` always-ask and a granted resource
  is targeted
- **THEN** a card is raised anyway; acceptance executes but records no
  standing grant beyond the existing one

#### Scenario: Workspace cannot loosen
- **WHEN** workspace policy attempts to clear an app-declared always-ask
  class
- **THEN** the policy write is rejected with an error naming the app
  declaration

### Requirement: Agents draft, people instantiate
An agent MAY produce a draft install, grant request, or agent profile for
owner review; no agent-initiated path SHALL create a grant, install, or
profile without a human acting on a card (invariant 11).

#### Scenario: Agent proposes an install
- **WHEN** an agent run calls the install-proposal tool
- **THEN** a draft install card appears for the owner and no install or
  grant exists until the owner confirms
