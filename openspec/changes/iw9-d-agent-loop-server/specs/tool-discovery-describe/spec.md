# tool-discovery-describe — on-demand operation discovery in the run loop

## ADDED Requirements

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
- **THEN** the tool result lists `vcs` operations with compact signatures and
  the model can issue a correct `call_tool` without any signature having been
  in the system prompt

#### Scenario: Ungranted namespace is refused

- **WHEN** a run granted only `vcs.*` calls `describe { namespace: "github" }`
- **THEN** the result is an error naming the run's allowed patterns, the run
  continues (a describe refusal is recoverable, unlike a denied call_tool),
  and no `github` catalog is loaded

#### Scenario: Large namespaces paginate

- **WHEN** `describe` targets a namespace whose operation count exceeds the
  per-response cap
- **THEN** the response carries a `cursor` and a note of the remaining count,
  and a follow-up call with that cursor returns the next page

### Requirement: Prompts carry patterns, not signatures

The system prompt composed for a chat-driven run SHALL identify tools only by
the allowed pattern list and the `call_tool`/`describe` mechanics; it SHALL
NOT embed per-operation signatures. The per-namespace signature-pasting
pipeline (`formatToolSignatures` and its `{{tools}}` prompt var) SHALL be
removed with the client transport.

#### Scenario: No signature pasting survives

- **WHEN** a chat-driven run's rendered system prompt is inspected in a test
- **THEN** it contains the allowed patterns and tool-use instructions but no
  operation parameter lists

### Requirement: Dispatch boundary is unchanged

`describe` SHALL be read-only metadata and grant nothing: `call_tool`
dispatch continues to check the run's pattern list in the runner and re-check
`ctx.grants` in `invokeTool`, and describing an operation SHALL NOT make it
callable.

#### Scenario: Describe does not widen authority

- **WHEN** a model describes a namespace and then calls an operation the
  pattern list does not allow
- **THEN** the call is denied exactly as it would have been without the
  describe call (run ends `tool_denied`)
