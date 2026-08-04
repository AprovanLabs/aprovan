## Problem

Choosing *which* implementation a call goes to has three separate mechanisms that mean the same thing. A provider credential is chosen by a *profile*, which is a credential row's display **label** doing double duty as an identifier. An interface implementation is chosen by an *instance*, a real config record addressed by a `<interface>:<name>` namespace on the wire. A path is bound to an external store by a *mount*, a third table with its own operations. All three are "bind this addressable thing to an implementation," and a caller has to know which vocabulary applies before they can write the call.

The colon namespace form also blocks a decision already made: profile names should be arbitrary strings, and an arbitrary string cannot be a URL path segment.

## Users & Jobs

- **Widget and script authors** — need one way to say "use my work GitHub" or "use the fast model", without knowing whether the namespace is a provider or an interface.
- **Workspace administrators** — need one place to see and set every named configuration.
- **The generating model** — currently has to be told two syntaxes for one idea, and one of them (`llm:fast`) is not a property access.

## Goals

- One word, `profile`, in the call site, the configuration surface, and the storage.
- One call form: `tools.<ns>.client(name)` or `tools.<ns>.client({ name?, options? })`, resolving lazily with no `await` on the configuring call.
- Profile names accept any string, including characters that cannot appear in a URL path segment.
- The `<interface>:<instance>` namespace form does not appear on the wire, in tool discovery, in stored configuration, or in the UI.
- A mount is a profile whose key is a path prefix, resolved by the same lookup that resolves a namespace profile.
- A call-site option cannot influence transport (base URL, headers, auth); that is a compile-time distinction, not a runtime check.

## Non-Goals

- Does **not** change which namespaces exist or how they route to core services versus interfaces — that is `interfaces-native-provider`.
- Does **not** preserve compatibility with existing scripts, tests, or stored bindings. The colon form and `getClient` are removed outright.
- Does **not** change the `tools` root, plugin semantics, or the dependency scan — those are established in `tools-global`.

## Capabilities

### New Capabilities

- `namespace-profiles`: the unified profile concept — call form, resolution, storage, naming rules, and the separation of call-site options from transport configuration.
- `path-mounts`: mounts expressed as path-keyed profiles, including delegation semantics and controller-supplied metadata.

### Modified Capabilities

None.

## Constraints & Assumptions

- **Hard**: an arbitrary-string profile name cannot travel in the URL path. It must travel in the request body.
- **Hard**: call-site options must not reach transport configuration. Today `baseUrl` lives inside the same `Record<string, unknown>` as call arguments and is pulled out to become the API root; if a widget could set it at runtime, the gateway would send credentialed requests to an attacker-chosen host.
- **Hard**: the provider client cache is keyed by provider alone, so options that change client *construction* cannot use it. Options that become call *arguments* are free.
- **Assumption (confirmed)**: no backwards compatibility is required for existing scripts, tests, or stored bindings.
- **Assumption (unconfirmed)**: no stored binding depends on the ambiguity that a credential label is both a display name and an identifier — i.e. no workspace has two credentials sharing a label, which currently fails loudly at call time.

## Open Questions

> Settled 2026-08-03 — accept recommendations.

- **Does a failed profile lookup fail at the first operation, or should the configuring call round-trip to validate?** Fail at first operation; error names the profile and lists what exists.
- **Should path-keyed profiles use longest-prefix matching, or exact-prefix only?** Longest-prefix.
