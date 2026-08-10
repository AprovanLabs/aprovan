# PRD — iw9-f3-credential-levels

_IW-9 Wave 0, stream F3. Authority: `openspec/changes/IW-9-APP-FIRST.md`
(invariant 1 "Identity follows the credential"; D12, D15, D22). Decisions
cited from that brief are settled and not re-litigated here._

## Problem

Every credential in a workspace is workspace-shared: resolution returns "the
first credential for this provider" no matter who is invoking
(`server/workspace/src/credentials.ts:497-509`,
`registry/packages/registry-server/src/profiles/resolve.ts` step 5). A user
who connects their personal GitHub account has silently lent it to every
member and agent in the workspace, and the audit row records only a
`callerId` — not which credential acted or as whom
(`server/workspace/src/audit.ts:18-33`). IW-9 invariant 1 makes the
credential level the root of approval routing, payment, and attribution;
every Wave-1/2 stream (especially iw9-c capability-approval) builds on it,
so the level dimension must land first.

Verified current state: `CredentialRecord` carries `createdBy` (creator's
sub, optional, "undefined = legacy/tenant-shared row" —
`credentials.ts:82-92`; mirrored as `CredentialRow.createdBy` in
`registry/packages/registry-server/src/storage/types.ts:24-35`). That is
**provenance only**: no level field exists, and no resolution path takes the
invoker into account.

## Users & Jobs

- **Workspace member**: connects their own account ("user OAuth") for a
  provider and trusts that only actions *they* invoke run as them — and that
  nobody else's automation borrows their identity.
- **Workspace admin**: installs a shared bot identity ("workspace OAuth") or
  a static secret ("workspace token") once for the whole space, and can later
  answer "who did this?" for any action the shared identity performed.
- **Auditor / security reviewer**: reads audit rows and can always name the
  human invoker, the path (profile/app/agent), and the credential (level +
  id) behind every provider call.
- **Sibling stream iw9-c (capability-approval)**: consumes the level as a
  routing key — workspace-level → admin approves once; user-level → each
  user approves for themselves (D12, invariant 1). It needs a stated
  resolution-order contract, not just behavior.

## Goals

1. Every credential row (both repos) has exactly one of three levels:
   `workspace-token` | `workspace-oauth` | `user-oauth`. No row without a
   resolved level after migration (grep-verifiable: every read path maps a
   missing stored level to a deterministic backfill value).
2. Resolution honors the level: `user-oauth` credentials resolve **only** to
   their owner's invocations. An invoker without their own connection gets a
   distinguishable "connect your account" failure — never another user's
   credential, never a silent downgrade to a workspace identity when a
   user-level credential was required.
3. Audit rows for provider dispatch record the triple: invoking user, the
   via-path (profile and/or non-user actor such as app/workflow/agent), and
   the credential (level + id) — so a shared-bot action is attributable to
   the human who triggered it.
4. The resolution-order contract is published as a typed interface in
   `@aprovan/registry-server` so iw9-c can route approvals on it without
   reading implementation code.
5. Existing credential rows keep working with **unchanged effective
   behavior** through the migration (no workspace loses a working provider
   connection on deploy).

## Non-Goals

- **No approval/grant routing.** Which queue an approval lands in, grant
  intersection, exception queues — all iw9-c (D12/D15). This change only
  makes the level *available and enforced at resolution*.
- **No app manifest work** (`app.yaml`, capability ceilings) — iw9-f4/b.
- **No partition/ACL work** — iw9-f2.
- **No new OAuth connect UI.** The existing credential-creation surfaces
  gain a level field; a dedicated "Connect your account" flow is a later
  consumer of the fail-closed error, not part of this change.
- **No billing/metering changes.** D22 ("you pay for what runs under your
  credential") consumes the level later; this change only records it.
- **No changes to payload shapes or the cipher envelope**
  (`protected-credential-envelope` spec stays satisfied as-is).

## Capabilities

### New Capabilities

- `credential-levels`: the credential record model — the three-level
  vocabulary, level/payload-type compatibility, owner dimension for
  user-level rows, and the backfill rule for pre-existing rows.
- `credential-level-resolution`: resolution honors the level — per-invoker
  resolution for `user-oauth`, fail-closed on unconnected invokers, and the
  published resolution-order contract (the iw9-c seam).
- `credential-audit-attribution`: audit rows carry (user, via
  profile/actor, credential level + id) for every provider dispatch that
  resolved a credential.

### Modified Capabilities

None. (`openspec/specs/protected-credential-envelope` is cipher-only and
unaffected; no existing spec covers credential records, resolution, or
audit.)

## Constraints & Assumptions

Constraints (verified in source):

- **Two repos, one seam.** `@aprovan/registry-server` owns `CredentialRow`,
  `CredentialService`, `resolveProfile()` (the normative resolution
  algorithm) and the dispatch pipeline; the aprovan workspace consumes it
  **only as a published npm package** (`server/workspace/package.json`
  pins `^0.2.10`). Registry changes must publish before the workspace can
  adopt them — the tech-plan must sequence this.
- Workspace-side stores implementing `ICredentialStore`: sqlite, the
  registry-backed dsql adapter, and the dynamo store (contract tests only).
  All three plus `credential-store-adapter.ts` must carry the new fields.
- Audit has three backends (sqlite, dsql, dynamo-test-only) with schema DDL
  in `audit.ts` and `db/dsql-schema.sql`; registry credentials DDL is in
  `registry/packages/registry-server/src/storage/schema.ts`.
- Migration is additive column + read-time backfill (both stores already use
  this pattern for `created_by`).

Assumptions (flagged, not user-confirmed):

- A1: Backfill maps by payload type — `bearer_token`/`api_key` →
  `workspace-token`; `oauth2_client`/`oauth2_authcode` → `workspace-oauth`.
  Rationale: existing rows are workspace-shared *in behavior today*;
  promoting a legacy authcode row to `user-oauth` would cut off every other
  member (a behavior change the brief does not order). The brief's "likely
  workspace-token" is refined to keep OAuth rows honest about being OAuth.
- A2: For **newly created** credentials the default level derives from
  payload type (`oauth2_authcode` → `user-oauth`; `oauth2_client` →
  `workspace-oauth`; static → `workspace-token`), overridable at creation
  with type-compatibility validation. Who may create workspace-level
  credentials (admin gating) is approval policy → iw9-c.
- A3: At most one `user-oauth` credential per (workspace, provider, owner);
  duplicates are a creation-time error.

## Open Questions

None. A1–A3 above are recommended defaults the orchestrator may veto at
review; they do not block elaboration (per IW-9 "Open Questions
near-empty").
