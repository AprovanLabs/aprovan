# Brief: profiles-unified (streams 1–8)

## Mission
Unify namespace/path profile configuration: store+resolver, profiles.set/list/remove,
migrate bindings/mounts/credential labels, dispatch `{ args, profile, options }`,
remove colon form + getClient, lazy depth-0 `client(name)` on remote proxy, UI updates,
delete old stores.

## Gate
**Blocked until `tools-global` on main.**
**Stream 6 additionally blocked until `utdk-remote-package` stream 1** (`packages/remote/src/proxy.ts`) is on registry main — do streams 1–5,7 first if remote not ready; finish 6+8 after.

## Settled
Fail at first op on missing profile; longest-prefix path mounts; `profiles` own namespace; path singly-bound.

## Read first
prd/tech-plan/tasks/specs under openspec/changes/profiles-unified/
Reference snapshot: `~/aprovan-snapshots/workspace-2026-08-03/` for migration 3.5.

## Tasks
Streams 1–8 from tasks.md. Coordinate stream 6 with remote package availability.

## Acceptance criteria
### namespace-profiles

#### Scenario: Provider profile

- **WHEN** a profile named `work` is configured for the `github` namespace and `tools.github.client("work").repos.get(args)` is called
- **THEN** the call dispatches using that profile's credential

### namespace-profiles

#### Scenario: Interface profile

- **WHEN** a profile named `fast` is configured for the `llm` namespace and `tools.llm.client("fast").createChatCompletion(args)` is called
- **THEN** the call dispatches to that profile's provider, credential, and options

### namespace-profiles

#### Scenario: Default profile

- **WHEN** a namespace is called with no `client(...)` configuration
- **THEN** the default profile is used, falling back to zero-config resolution when no default is configured

### namespace-profiles

#### Scenario: No await on the configuring call

- **WHEN** widget code evaluates `tools.github.client("work").repos.get(args)`
- **THEN** the expression dispatches one request and requires no `await` on `client`

### namespace-profiles

#### Scenario: Reusable configured node

- **WHEN** a configured node is stored and used for several operations
- **THEN** each operation dispatches with the same profile and the profile is resolved no more than once per call

### namespace-profiles

#### Scenario: Unknown profile fails at the operation

- **WHEN** a profile name matching no configuration is used and an operation is called on the resulting node
- **THEN** the operation fails with an error naming the profile and listing the profiles that exist for that namespace

### namespace-profiles

#### Scenario: Name with reserved URL characters

- **WHEN** a profile is named with characters that cannot appear in a URL path segment
- **THEN** it can be configured, selected, and dispatched successfully

### namespace-profiles

#### Scenario: Name travels out of band

- **WHEN** any profile-pinned operation is dispatched
- **THEN** the profile travels in the request body and the request path contains only the namespace and the operation

### namespace-profiles

#### Scenario: Not routable

- **WHEN** a request is made to a path containing a colon-addressed namespace
- **THEN** it is not treated as an interface instance

### namespace-profiles

#### Scenario: Not discoverable

- **WHEN** the tool list is retrieved
- **THEN** no entry names a colon-addressed namespace

### namespace-profiles

#### Scenario: Not stored

- **WHEN** stored configuration is inspected
- **THEN** no key uses the colon form

### namespace-profiles

#### Scenario: Transport key rejected at compile time

- **WHEN** widget code passes a transport-shaped key such as a base URL in call-site options
- **THEN** it is a type error at the call site, not a runtime check

### namespace-profiles

#### Scenario: Unknown transport-shaped key rejected at runtime

- **WHEN** an untyped caller supplies a transport-shaped key at the call site
- **THEN** the call fails loudly rather than the key silently becoming an argument

### namespace-profiles

#### Scenario: Call-site options win over profile options

- **WHEN** a profile declares options and the call site supplies overlapping keys
- **THEN** the call-site values take precedence and the remaining profile options still apply

### namespace-profiles

#### Scenario: Former name removed

- **WHEN** the repositories are searched for the earlier `getClient` factory
- **THEN** no implementation, reference, or documentation of it remains

### path-mounts

#### Scenario: Mount created as a profile

- **WHEN** a path prefix is bound to a provider with options through the profile configuration surface
- **THEN** subsequent file operations under that prefix resolve to the bound implementation

### path-mounts

#### Scenario: Mount removed as a profile

- **WHEN** a path-keyed profile is removed
- **THEN** operations under that prefix resolve to the workspace's own store again

### path-mounts

#### Scenario: One configuration surface

- **WHEN** the configuration surface is listed
- **THEN** namespace-keyed and path-keyed profiles appear together, with no separate mount-management operations

### path-mounts

#### Scenario: Nested mounts

- **WHEN** profiles exist for both a path prefix and a longer prefix beneath it, and an operation targets a path under the longer one
- **THEN** the longer prefix's profile is used

### path-mounts

#### Scenario: No matching prefix

- **WHEN** an operation targets a path under no configured prefix
- **THEN** the workspace's own store handles it

### path-mounts

#### Scenario: Read through a mount

- **WHEN** a file under a mounted prefix is read
- **THEN** the content comes from the bound implementation and the caller uses the ordinary read operation

### path-mounts

#### Scenario: Listing splices a mounted subtree

- **WHEN** a directory containing a mounted prefix is listed
- **THEN** entries from the bound implementation appear in their place in the listing

### path-mounts

#### Scenario: Both file and version-control operations honour mounts

- **WHEN** a version-control operation targets a path under a prefix bound to a version-control implementation
- **THEN** it resolves to that implementation rather than to the workspace's own store

### path-mounts

#### Scenario: Version token from the controller

- **WHEN** a mounted path's metadata is requested
- **THEN** the version token and modification time reflect the bound implementation's own values

### path-mounts

#### Scenario: Controller-dependent metadata is documented

- **WHEN** a caller inspects the metadata contract
- **THEN** it states that these fields are supplied by the controlling implementation and vary by implementation

## Verify
Per tasks.md; final workspace test + check-types.

## Git
Aprovan `iw7/profiles-unified` (+ registry docs/interfaces.md and remote proxy in stream 6).
Worktrees. PRs; do not merge.

## Report
briefs/00-report.md
