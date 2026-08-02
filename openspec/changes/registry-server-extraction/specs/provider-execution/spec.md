# provider-execution

The in-process provider executor and the one dispatch pipeline. See tech-plan D5 and
decision 1 (final): generated provider modules execute in-process; rate limits and
budgets are enforced server-side.

## ADDED Requirements

### Requirement: In-process executor with lazy load and LRU cap

The executor SHALL load provider modules on first use via dynamic import —
`import('utdk/<provider>')` for catalog providers, the explicit `moduleSpecifier` for
first-party contract implementations — and retain them in an LRU cache keyed by import
specifier with a configurable cap (default 20). Client objects SHALL be constructed per
call with the call's injected credential and baseUrl; client objects SHALL NOT be cached.
The executor is the renamed direct executor; no `@utdk/isolate` code path exists.

#### Scenario: Warm dispatch skips the import

- **WHEN** two consecutive calls execute against the same provider module
- **THEN** the second call reuses the cached module (no dynamic import) and constructs a
  fresh client with its own credentials

#### Scenario: LRU eviction bounds resident modules

- **WHEN** more distinct provider modules than the configured cap are executed
- **THEN** the least-recently-used module is evicted and a later call to it re-imports
  transparently

#### Scenario: No credential bleed through the module cache

- **WHEN** tenant A calls provider P with credential CA, then tenant B calls P with
  credential CB through the same cached module
- **THEN** tenant B's upstream request carries only CB — no header, token, or baseUrl
  from tenant A's call is observable

### Requirement: Catalog guard before the module loader

Dispatch SHALL refuse namespaces that are not a registered native service, a cataloged
interface, an LLM alias, or a catalog provider — with an actionable unknown-namespace
error — before any dynamic import is attempted. Interface compat entries marked
unavailable SHALL be refused with a 501 carrying the entry's reason, never a module-loader
error.

#### Scenario: Unknown namespace never reaches the loader

- **WHEN** a caller dispatches to a namespace absent from the catalog and the native
  registry
- **THEN** the response is a 4xx naming the namespace as unknown — not a package-subpath
  resolution error

#### Scenario: Declared-but-unbuilt compat entry refuses with its reason

- **WHEN** a profile or fallback resolves an interface to a compat entry marked
  unavailable
- **THEN** dispatch returns 501 with the entry's unavailable text and tool discovery
  omits that namespace's entries

### Requirement: Server-side rate limits and budgets

Rate limits and budgets SHALL be enforced in the dispatch pipeline (shared by HTTP,
embedding, MCP, and sandbox dispatch), keyed by `(tenant, profile-or-provider,
principal)`. Profile `limits` override tenant defaults. In-sandbox policy helpers remain
cooperative and SHALL NOT be the enforcement point.

#### Scenario: Profile limit throttles every surface

- **WHEN** a profile carries `limits: { rps: 1, burst: 1 }` and a caller issues three
  immediate dispatches through it — one HTTP, one via the embedding API, one from a
  sandboxed script
- **THEN** enforcement applies uniformly across all three surfaces (excess calls are
  rejected with a retryable 429-class error)

#### Scenario: Tenants do not share buckets

- **WHEN** tenant A exhausts its bucket for provider P
- **THEN** tenant B's calls to P are unaffected

### Requirement: OAuth pre-resolution

The executor SHALL only ever receive injectable credentials (bearer token or api key).
Stored OAuth payloads (client-credentials and authorization-code) SHALL be resolved to
live bearer tokens in the dispatch pipeline before execution — client-credentials tokens
cached per `(tenant, provider, credential)` until expiry, refreshed tokens persisted back
to the credential store. OAuth resolution failures SHALL fail the call with a 502-class
error naming the provider, before the provider module executes.

#### Scenario: Expired authcode token refreshes once and persists

- **WHEN** a stored authorization-code credential's access token is expired and a call
  dispatches through it
- **THEN** the token is refreshed, the updated payload is persisted, and the call executes
  with the fresh bearer token

### Requirement: Streaming pass-through

Dispatch SHALL support streaming results end-to-end: chat-completion streams open the
client-facing SSE response immediately with comment keepalives while the upstream thinks;
provider results that are a fetch Response, ReadableStream, or async iterable pass
through as byte streams; buffered results from a stream-requested call are re-emitted as
a single SSE event. The embedding API SHALL surface streams as `{ kind: "stream" }`
results without buffering.

#### Scenario: Slow upstream does not drop the client

- **WHEN** a streaming chat completion's upstream takes longer than intermediary
  time-to-first-byte limits to answer
- **THEN** the client connection is held open by keepalive comments and receives the
  upstream bytes when they arrive

### Requirement: Every dispatch is audited and telemetered

Every dispatch exit path — success, validation failure, authorization failure, credential
resolution failure, execution failure — SHALL append an audit row and record exactly one
attributed dispatch telemetry span. No exit path may be invisible to `telemetry` queries.

#### Scenario: Early failure still records

- **WHEN** a dispatch fails during profile resolution (before execution)
- **THEN** an audit row and an error-status dispatch span with `{tenant, principal,
  source}` attribution exist for the request
