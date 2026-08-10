# resource-grants

Grant = (capability, resource-pattern), remembered at grant time (D12),
enforced at one dispatch chokepoint, approved at the level the credential
dictates (invariant 1), always intersecting (invariant 2).

## ADDED Requirements

### Requirement: Grants are keyed by capability and resource pattern
A grant row SHALL identify (principal, capability, resource-pattern), where
principal is a user, group, or app install, capability is a namespace or
tool pattern (existing `CapabilityGrants.tools` vocabulary), and
resource-pattern is a URL-style pattern over the resource an action
touches. A grant with no resource-pattern SHALL mean "any resource within
the capability" and SHALL only be creatable by explicit approval, never as
a migration default for action effects.

#### Scenario: Action within granted resource
- **WHEN** a principal holding grant `(email.send, mailto:*@aprovan.com)`
  dispatches `email.send` to `alice@aprovan.com`
- **THEN** the call executes without a card or queue entry

#### Scenario: Action outside granted resource
- **WHEN** the same principal dispatches `email.send` to
  `bob@example.org`
- **THEN** the action does not execute and enters the exception queue
  (see action-exception-queue)

### Requirement: URL-pattern matcher
The platform SHALL provide a single resource-pattern matcher (target ~100
LOC, shape cf. Cloudflare OS `matchesResourceUrlPattern`): literal
segments, `*` single-segment wildcard, `**`/trailing-`*` suffix wildcard,
case-insensitive host, no regex, no network I/O, pure function. All grant
comparisons — enforcement, install-card preview, review surface — SHALL use
this one matcher.

#### Scenario: Wildcard host segment
- **WHEN** pattern `https://*.github.com/aprovan/**` is matched against
  `https://api.github.com/aprovan/registry/issues`
- **THEN** the matcher returns true

#### Scenario: No partial-segment match
- **WHEN** pattern `https://github.com/aprovan-labs/**` is matched against
  `https://github.com/aprovan-labs-evil/x`
- **THEN** the matcher returns false

### Requirement: One dispatch chokepoint
Grant evaluation (capability + resource + effect + credential level) SHALL
execute in exactly one predicate on the server dispatch path, called by
every route that executes tools: the HTTP tool route
(`routes/tools.ts` invoke handler), the agent loop
(`agents/runner.ts`), app workflow execution, and native dispatch
(`native-dispatch.ts`). Existing gates (`mayInvokeTool`,
`assertAllowedTools`, `toolGranted` call sites) SHALL delegate to or be
replaced by this predicate; no dispatch path may bypass it.

#### Scenario: Hidden namespace unreachable from every path
- **WHEN** a namespace is not covered by a principal's grants
- **THEN** invoking it via the HTTP route, via `call_tool` inside an agent
  run, and via an app workflow all return the same authorization error, and
  a test enumerates all dispatch entry points against the predicate

#### Scenario: Admin is not exempt from resource grants for apps
- **WHEN** an app install's allow-list does not cover a resource
- **THEN** the call is out-of-grant even when the invoking user is an
  admin (the app is a separate principal — invariant 4)

### Requirement: Grants intersect, never union
Effective authority SHALL be the intersection of the invoker's grants, the
app install's ceiling, and any profile narrowing. No composition may grant
what any single layer denies (invariant 2). A requested narrowing that is a
superset of the principal's grant SHALL be rejected with an error naming
the offending entries, never silently clamped (grant-enforcement stream 4
precedent).

#### Scenario: App cannot exceed invoker
- **WHEN** an app ceiling includes `email.send` but the invoking user holds
  no `email` grant
- **THEN** the app's `email.send` call is denied for that invoker

#### Scenario: Invoker cannot exceed app
- **WHEN** a user holds `(email.send, mailto:**)` but the app ceiling omits
  `email`
- **THEN** the call made through the app is denied

### Requirement: Approval follows the credential
For capabilities backed by a workspace-level credential
(`workspace-token`, `workspace-oauth`), a workspace admin SHALL approve the
grant once for the space. For user-level credentials (`user-oauth`), each
user SHALL connect and approve for themselves on first use; an unconnected
user's call fails closed with a connect prompt, not a queue entry
(invariant 1; consumes iw9-f3 credential levels).

#### Scenario: Workspace credential, member invokes
- **WHEN** an admin has approved `(slack.post, https://aprovan.slack.com/**)`
  for a workspace-oauth credential and a member invokes it
- **THEN** the call executes and the audit row names the member, the app,
  and the credential level + id

#### Scenario: User credential, first use
- **WHEN** a member first invokes a capability backed by user-oauth and has
  not connected
- **THEN** the call fails closed with a connect-and-approve prompt scoped
  to that member; no other member's approval satisfies it

### Requirement: Direct permission rows migrate into the grant model
Existing APR-320 direct permission rows SHALL be represented in (or
resolved through) the unified grant model so there is exactly one grant
system; the legacy check path is deleted in the same change (MIGRATION-DEBT
rule: done when grep finds no callers).

#### Scenario: Legacy grant still works
- **WHEN** a principal held a pre-existing direct permission for
  `keyvalue.*`
- **THEN** after migration the same calls succeed via the unified
  predicate, and the retired check path has no remaining callers
