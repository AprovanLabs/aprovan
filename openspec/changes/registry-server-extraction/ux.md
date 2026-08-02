# UX — registry-server-extraction

Backend-only change; the user-facing surface is the **API-level developer experience** of
Profiles (scripts, chat tool calls, HTTP). Panels and admin UI wiring are WS-6. The flows
below are normative for error copy and DX, because Profile failures surface directly to
script authors and chat models.

## Flows

### Flow: Pin a profile from a script

1. Author has two GitHub credentials (work, personal) in the tenant and creates profiles:
   `profiles.create({ name: "work", target: { kind: "provider", provider: "github" }, credentialId: "..." })`.
2. In a workflow script: `const gh = await github.client("work"); await gh.repos.get({...})`.
3. Every call through `gh` dispatches with the `work` profile; the plain `github.*` global
   keeps resolving the `default` profile (or first-credential fallback).
4. Failure — no such profile: call rejects with
   `No github profile named "work". Profiles for github: "personal", "ci".` — the list of
   names that DO exist, never a silent fallback to another account.
5. Failure — profile's credential deleted: call rejects naming the profile and the missing
   credential id ("re-link a credential on the profile"), never quietly resolving a
   different credential.

### Flow: Route an interface through a named profile

1. Admin creates `profiles.create({ name: "docs", target: { kind: "interface", interface: "sql" }, provider: "postgres", credentialId: "...", options: { database: "docs" } })`.
2. Script: `const docs = await sql.client("docs"); await docs.query({ sql: "select ..." })`.
3. Bare `sql.query(...)` resolves the `default`-named sql profile; if none exists, the
   zero-config fallback (credentialless compat entry first, else first compat provider
   with a tenant credential) applies — to the default name only.
4. Failure — named profile absent: 404 with the `profiles.create` call that would fix it.
   Named profiles never zero-config-fall-back (a data leak wearing a convenience's clothes).

### Flow: Grant a profile to a caller (the allow-list)

1. Admin grants: `profiles.grant({ profile: "docs", subject: { kind: "group", id: "analysts" } })`
   (subjects: `user`, `group`, `app`, `workflow`, `agent`).
2. A member of `analysts` dispatches through `sql.client("docs")` — allowed; the grant IS
   the credential grant, no separate credential ACL.
3. A non-granted caller gets 403:
   `Profile "docs" (sql) is not granted to this caller. Ask a workspace admin to grant it.`
4. Auth-none mode (standalone local): grants are not enforced — single implicit admin.

## Screens & States

No screens in this change. The two client surfaces that render Profile state today
(credentials page labels, Interfaces panel bindings) are rewired in WS-6; until then they
read through compatibility-free new endpoints (`profiles.list`) added here.

## Component Inventory

Not applicable (no UI). API error copy follows the existing `ServiceError` conventions:
status + one sentence naming what exists and the call that fixes it.

## Open Questions

- Should `client()` with no argument be legal (returns the default-profile-pinned client,
  useful for symmetry)? Recommendation: yes, equivalent to the bare namespace.
