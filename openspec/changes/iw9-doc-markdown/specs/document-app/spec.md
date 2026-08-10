# document-app

The Document flagship as a real app on the platform (not a service):
`app.yaml` manifest per iw9-f4, managed-mode hosting per iw9-b/D2, a bundled
agent profile per D15 riding the iw9-d server loop.

## ADDED Requirements

### Requirement: Document ships as a managed-mode app with a manifest

Document SHALL be an installable app with an `app.yaml` conforming to the
iw9-f4 `app-manifest` capability: slug, title, icon, description, declared
capability ceiling (D9), `requires[]`, and host modes declaring **managed
only** — document data (CRDT state and files) always lives in a workspace
the user belongs to, so the D2 hosting prompt is skipped. The app SHALL be
addressable via the D5 URL scheme provided by the platform (canonical
`/a/<appId>` forms) and SHALL declare an icon (or receive the D6
letter/color fallback).

#### Scenario: Install skips the hosting prompt

- **WHEN** a user installs the Document app
- **THEN** no hosted/managed choice is presented (single declared mode) and
  the install record carries `managed`, immutable (invariant 10)

#### Scenario: Manifest validates

- **WHEN** the platform reconciles the Document app root
- **THEN** its `app.yaml` passes the iw9-f4 loader/validator with no
  hand-written `appId` present

### Requirement: Document bundles a doc/fix-typos agent profile

The app SHALL ship an agent profile (`doc/fix-typos`-style) as an
app-shipped profile per D15: bounded by the app's grants (intersection,
never union — invariant 2), executed by the iw9-d server-side agent loop
(`agents.run`), with any approvals routed to the invoker's queue. The
profile's job: read a document from the VFS, produce a corrected version,
and write it back via `vfs.write` — exercising the
`document-agent-reconciliation` path when the doc is live.

#### Scenario: Profile runs within app grants

- **WHEN** a user invokes doc/fix-typos on a document
- **THEN** the run executes on the server loop under the intersection of
  the invoker's authority and the app's grants, and its `vfs.write` lands
  through reconciliation without clobbering concurrent human edits

### Requirement: Document sharing uses platform vfs sharing

Sharing a document with a person or by link SHALL use the iw9-b `vfs`
person/link sharing (D20) — the app SHALL NOT implement its own share
store, keys, or ACLs. Link shares expose the materialized file to anonymous
readers per `document-materialization`; person shares grant authenticated
read (and, where granted, live participation subject to
`document-collab` access checks).

#### Scenario: Share management is platform-native

- **WHEN** a user shares a document by link and later revokes the share
- **THEN** creation, expiry, and revocation behave per iw9-b `vfs` sharing,
  and revocation immediately ends anonymous access
