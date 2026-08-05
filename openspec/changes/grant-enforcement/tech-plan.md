## D1 — Grants attach to the identity, not the script or the run

The principal (workspace member, API key, MCP session) carries the grant. Runs inherit
it and may narrow it; nothing inside a script can widen it.

**Rejected — grant declared by the script, approved once by an admin.** Breaks for the
MCP sandbox tool, where the submitted TypeScript is ephemeral and there is no saved
script that could have been approved.

**Rejected — grant authored per run by the invoker.** The invoker is frequently an LLM,
so it would author its own grant. Self-authorization, one level up.

**Rejected — extend `profile` into a grant.** A profile is selected *by the script*
(`tools.github({ name: "work" })`). A script-selected value can never bound that script.

**Revisit if** per-principal grants prove too coarse in practice and users start minting
one principal per task to compensate.

## D2 — `resolveProfile` is the single chokepoint; `permittedTools` is a projection

Catalog visibility is derived from the same predicate that gates execution, rather than
reimplementing it. The sandbox transport routes through the same `Dispatcher` so it
passes the same gate.

**Rejected — enforce in the sandbox host** by building the `tools` global from the
grant. Two implementations of one predicate; when they disagree the catalog says one
thing and execution does another, silently.

**Revisit if** a caller needs visibility semantics that deliberately differ from
executability — e.g. showing tools a user could request access to.

## D3 — Gate step 5, then make it unreachable

Two moves, in order:

1. **Gate.** Step 5 runs only when `authMode === "none"`. This is what its own comment
   says it is for ("ungoverned tenants") and it shuts the hole regardless of data state.
2. **Provision.** Connecting a credential also creates a `default` profile row bound to
   it, granted to the connecting principal. The invariant becomes *every usable
   credential has a row*, so the fallback stops being load-bearing and can later be
   deleted outright.

Both writes are one transaction — a credential nobody can reach is worse than no
credential.

**Rejected — delete step 5 immediately.** Every tenant would have to author profiles
before anything worked; zero-config onboarding dies.

**Rejected — grant-check step 5 against a tenant-level default grant.** Introduces a
second grant concept that must be kept consistent with the first.

**Rejected — provision only, no gate.** Leaves the fallback reachable for any credential
connected outside the new path.

**Revisit if** a provider needs a credential with no meaningful default profile.

## D4 — Dynamic `tools[expr]` is an error

`unresolved` currently sets a boolean that renders a warning chip. With the `tools.`
global reaching the full registry, `tools[untrustedString]` reaches every configured
credential and no static analysis can bound it. Since `globalAlias` removes the last
legitimate reason to use bracket access, it becomes a hard error at parse.

**Rejected — keep it a warning.** A warning on a privilege-escalation vector is a
finding, not a control.

**Revisit if** a genuine use case for computed namespace access appears that cannot be
served by `tools.search()`.

## D5 — `authMode: "none"` refuses to register the sandbox tool

Unauthenticated arbitrary TypeScript with ambient tenant credentials is the whole
vulnerability in one line. The tool is not registered at all in that mode — not
registered-and-failing, which invites a bypass.

**Revisit if** an ungoverned single-user mode gains its own credential isolation.

## Interfaces & Data

```ts
// registry-server/src/profiles/resolve.ts
export interface ResolveDeps {
  // …existing
  authMode: "oidc" | "api-key" | "none";
}

// Step 5 is entered only when authMode === "none".
// Steps 1–4 and 6 are unchanged.

// registry-server/src/credentials/service.ts
export interface CreateCredentialResult {
  credential: CredentialRow;
  defaultProfile: ProfileRow;   // NEW — provisioned in the same transaction
  grant: ProfileGrantRow;       // NEW — to the connecting principal
}

// registry-server/src/config/types.ts
export interface CallContext {
  // …existing
  /** Subset of the principal's grant requested by this run. Never a superset. */
  narrowedTo?: string[];        // NEW — canonical provider names
}
```

`narrowedTo` is validated as a subset at context construction; a superset is a 400, not
a silent intersection.
