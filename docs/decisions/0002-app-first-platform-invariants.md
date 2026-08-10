# 0002. App-first platform invariants

- **Status**: accepted
- **Date**: 2026-08-09
- **Origin**: `IW-9-APP-FIRST` orchestrator (openspec/changes/IW-9-APP-FIRST.md)

## Context

IW-9 makes apps the product: users and agents create, promote, install, and
share apps; two flagships (Chat, Document) validate the model. During the
design grill, the same small set of rules independently resolved questions
about execution identity, approval routing, payment, audit attribution,
revocation, agent authority, and data hosting. Recording them once prevents
each future change from re-deriving (or contradicting) them locally. These
extend the existing platform rules ("capability = namespace; tenancy =
workspace; transport = tools proxy"; "files are authored, records are
accumulated") — they do not replace them.

## Decision

Every change must respect these invariants:

1. **Identity follows the credential.** Credential levels are
   `workspace-token` (static secret), `workspace-oauth` (shared bot
   identity), `user-oauth` (acts as that person). The level decides who
   executes, who approves the grant (admin once for workspace-level; each
   user for user-level), who pays, and who the audit row names. User-level
   credentials resolve per-invoker and fail closed.
2. **Grants intersect, never union.** Profiles, app allow-lists, and hosting
   relationships only narrow the invoker's authority; nothing gains
   capability by indirection.
3. **Authority is derived at run time, never snapshotted.** Standing
   automations (cron, webhooks, scheduled agents) execute with their owner's
   *current* standing; owner departure deactivates them (cascading
   revocation).
4. **Access follows the principal.** A user's agents inherit that user's
   access. Apps are separate principals and need grants. Publishers reach
   non-participant data only via the gated, audited `apps.data` path.
5. **Hosted vs managed is the only user-facing data question.** Managed =
   data in a space you belong to (enforced). Hosted = data in someone else's
   space (their claims are promises; *who* hosts is a displayed fact).
   Managed shared data requires all participants to be members of the
   hosting workspace.
6. **Payload-widget / shell-decision.** Trusted chrome renders
   who-is-asking, capability, credential, and action buttons; app-supplied
   sandboxed widgets render only the payload. Approval applies to what the
   shell last displayed. No widget → generic card.
7. **Topic keys route; they never authorize.** Authorization is re-applied
   at every fan-out path.
8. **Search and indexes are never the access boundary.** Queries return
   ids; canonical rows are refetched through tenant-scoped access checks.
9. **Anonymous may read link-shared files. Nothing else, ever.**
10. **Immutable at creation:** workspace `locus`, workspace region, an
    install's data-hosting mode. Changing any is export/import, not a flag.
11. **Agents propose; people instantiate.** Agents may draft apps, agent
    profiles, or installs for owner review; they cannot self-provision.

Also decided at the same altitude: **install = copy** (an installed app is a
pinned copy of its archive; publishers cannot silently mutate installed
code — updates surface as "new version available").

## Alternatives

- **Per-action human approval (Cloudflare-OS-style queue-everything with
  simulated results)**: lost — approval is grant-time keyed
  (capability, resource), with an explicit `ask` step and an exception
  queue for out-of-grant resources; simulated results rejected as
  fabricated agent state.
- **Sealed hosted partitions (host's own tooling blind to hosted data)**:
  lost to invariant 4 — access follows the principal; participants (and
  their agents) read what they participate in.
- **Serve-from-origin installs**: lost to install-as-copy — portability,
  offline installs, and third-party trust outweigh publisher push-to-all.

## Consequences

- `CredentialRecord` must gain an owner dimension before user-level grants
  or observer-style sharing checks can exist (IW-9 F3).
- Audit rows must record (user, via profile/app, credential level + id) so
  shared-bot actions remain attributable.
- A mode-flip migration for hosted/managed data is deliberately impossible;
  spec text must never assume one.
- Changing any invariant requires superseding this ADR.
