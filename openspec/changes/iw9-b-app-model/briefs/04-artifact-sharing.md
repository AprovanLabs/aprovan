# Brief: Server — Artifact sharing (person/link) + anonymous read route

## Mission

Today the only sharing primitive is workspace→app config. When you are done,
`vfs/shares.ts` stores person- and link-shares under `svc#vfs#shares/<shareId>`
with HMAC-at-rest keys, expiry, and revocation; person-share reads pass through
the same authenticated vfs choke point as partition access (deny-as-404);
`GET /share/:key/*` serves anonymous read-only bytes and structurally imports
no records/workflows/tools modules (invariant 9). Visibility (installability)
and share records remain independent axes.

## Read first

1. `openspec/changes/iw9-b-app-model/prd.md`
2. `openspec/changes/iw9-b-app-model/tech-plan.md` (D6)
3. `openspec/changes/iw9-b-app-model/specs/artifact-sharing/spec.md`
4. `server/workspace/src/apps/store.ts` (`assertPartitionAccess` family; F6
   already keyed app shares on `appId`)
5. Existing route patterns under `server/workspace/src/routes/`
6. Stream 1's landed root binding (`apps/roots.ts`, narrowed `appPathAllowed`)
   — rebase on that; do not reintroduce `paths[]`

## Tasks

> Depends-on: 1 | Repo: aprovan | Touches: aprovan/server/workspace/src/vfs/shares.ts, aprovan/server/workspace/src/routes/share.ts, aprovan/server/workspace/src/apps/store.ts, aprovan/server/workspace/tests/vfs-shares.test.ts | Verify: pnpm --filter @aprovan/workspace test -- vfs-shares.test.ts

- [ ] 4.1 Create `vfs/shares.ts`: share record type + store under
      `svc#vfs#shares/<shareId>` (`{shareId, path, kind: "person" | "link",
      grantee?: sub, keyHmac?, expiresAt, createdBy, revokedAt?}`, tech-plan
      D6); `createPersonShare`, `createLinkShare` (mints a 256-bit key,
      returns it once, stores only `HMAC-SHA256(serverSecret, key)`),
      `resolveLinkShare(key)` (recompute-and-constant-time-compare lookup,
      checks expiry/revocation), `revokeShare`, `listSharesCreatedBy`,
      `listSharesReceivedBy`.
- [ ] 4.2 Wire person-share reads into the existing authenticated vfs read
      path: a share check at the same choke point as partition access
      (`apps/store.ts`'s `assertPartitionAccess` family), deny-as-404 on no
      share/expired/revoked (`artifact-sharing` — "Recipient reads, others
      cannot", "Revocation is immediate").
- [ ] 4.3 Create `routes/share.ts`: `GET /share/:key/*subpath?` — anonymous,
      resolves the link, serves file bytes read-only. This module SHALL
      import no record/workflow/tool modules (invariant 9 made structural,
      per tech-plan D6) — enforce by keeping its only internal import as
      `vfs/shares.ts` + the raw FS read primitive, never `apps/service.ts`,
      `records.ts`, or any workflow module.
- [ ] 4.4 Confirm `visibility` (installability) and share records are read
      from entirely independent code paths — no function computes one from
      the other (`artifact-sharing` — "Shared file, private app").
- [ ] 4.5 Add `tests/vfs-shares.test.ts`: store holds no usable key (HMAC
      only); expiry and revocation both 404 indistinguishably from
      never-existed; anonymous read succeeds while write/keyvalue/workflow
      attempts with the same link key all fail 401/404; link doesn't leak
      sibling/parent listing; `routes/share.ts` module graph contains no
      import from `records.ts`, `apps/service.ts`, or any `workflows/*`
      module (a static import-check test, not a runtime one).

## Acceptance criteria

Copy of `specs/artifact-sharing/spec.md` ADDED requirements in full:

### Requirement: Visibility and sharing are independent axes

An app's `visibility` SHALL control only installability/directory listing. A
file share SHALL control only viewability of the shared artifact. Neither
SHALL imply the other: sharing a file inside a private app's root makes that
file viewable without making the app installable, and a public app's files
are not thereby person- or link-shared.

#### Scenario: Shared file, private app

- **WHEN** a file under a `visibility: private` app's root is link-shared and
  the link is opened
- **THEN** the file renders, and the app remains uninstallable and absent
  from the directory

### Requirement: Person-shares grant a named user read access to an artifact

`vfs` SHALL support sharing a file or directory subtree with a named platform
user for reading. The recipient SHALL see shared artifacts in a dedicated
"Shared with me" listing, and reads SHALL pass tenant-scoped access checks on
every request (invariant: shares are checked at read time, not snapshotted).
Removing the share SHALL immediately end access.

#### Scenario: Recipient reads, others cannot

- **WHEN** member A shares `Apps/tasks/report.md` with user B
- **THEN** B can read it (and sees it under "Shared with me"); any other
  non-member user's read answers 404

#### Scenario: Revocation is immediate

- **WHEN** A revokes B's share and B reads again
- **THEN** the read answers 404 on the next request — no grace, no cache

### Requirement: Link-shares carry HMAC-hashed keys with expiry and revocation

A link-share SHALL mint a high-entropy key returned exactly once to the
sharer; the system SHALL store only an HMAC of the key (a leaked store cannot
mint working links) and SHALL look links up by recomputing the HMAC. Every
link SHALL carry an expiry chosen at creation and SHALL be revocable
individually; expired or revoked links answer 404 indistinguishably from
never-existed.

#### Scenario: Store holds no usable key

- **WHEN** the share records are read directly from storage
- **THEN** no stored value allows constructing a working share URL (only
  HMAC digests are present)

#### Scenario: Expiry and revocation both kill the link

- **WHEN** a link passes its expiry, or the sharer revokes it
- **THEN** subsequent fetches answer 404, identical to a link that never
  existed

### Requirement: Anonymous access is read of link-shared files only

An unauthenticated request bearing a valid link key SHALL be able to read the
shared artifact and nothing else. The system SHALL NOT allow anonymous
writes, record operations, workflow/tool calls, listings beyond the shared
subtree, or partition access of any kind — regardless of any share
configuration (invariant 9 admits no override).

#### Scenario: Anonymous read succeeds, everything else fails

- **WHEN** an anonymous holder of a valid link reads the shared file, then
  attempts a write, a keyvalue call, and a workflow call with the same link
- **THEN** the read succeeds and every other attempt fails with 401/404 —
  there is no code path that accepts a link key for a non-read operation

#### Scenario: Link does not leak siblings

- **WHEN** an anonymous holder of a file link requests the file's sibling or
  parent listing
- **THEN** the response is 404 — the link scopes exactly the shared artifact
  (or subtree, when a directory was shared)

## Verify

```bash
pnpm --filter @aprovan/workspace test -- vfs-shares.test.ts
pnpm --filter @aprovan/workspace typecheck
```

## Constraints

- Implement only what the tasks say; tech-plan interfaces are fixed.
- Surgical changes only; match existing style.
- Do not modify files outside the Touches globs.
- Rebase on stream 1's root-only binding — do not revive `paths[]`/`entry`.
- `routes/share.ts` MUST NOT import `records.ts`, `apps/service.ts`, or any
  `workflows/*` module.
- Do not register `vfs.share` procedures (stream 6) or build client UI
  (stream 10).
- Never touch `apps/releases.ts` or entry-version helpers (iw9-a).

## Report back

When done: check off tasks in `tasks.md`, open a PR (or write
`briefs/04-report.md`) with what you built, verification, deviations, and
notes for stream 6/10.
