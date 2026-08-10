# document-materialization

The live Yjs doc is truth while a session runs, but agents and ordinary
tools read files (D18). This capability defines when and how the live doc is
materialized to its `.md` in the workspace VFS, and the anonymous read path
for link-shared documents (invariant 9, via iw9-b `vfs` sharing).

## ADDED Requirements

### Requirement: Materialize on quiesce

The server SHALL materialize the live doc's `Y.Text` to its `.md` path in
the workspace VFS when the doc quiesces: after an idle threshold with no
edits, and in any case no later than a maximum interval while edits are
continuous (both thresholds configurable, with defaults declared in the tech
plan). Materialization SHALL also run on last-participant leave and on
manual save. The written content SHALL be the plain Markdown serialization
of the doc — no CRDT metadata, vector clocks, or markers embedded.

#### Scenario: Idle quiesce writes the file

- **WHEN** a live doc receives edits and then no edits for the idle
  threshold
- **THEN** the `.md` at the document's path contains the current doc text,
  readable as plain Markdown

#### Scenario: Continuous typing still bounds staleness

- **WHEN** participants edit continuously for longer than the maximum
  interval
- **THEN** at least one materialization has occurred within that interval —
  the file on disk is never older than the maximum interval while the
  session lives

### Requirement: Files stay the truth agents read

`vfs.read` (and any ordinary file consumer, including agents) SHALL return
the materialized `.md` content for a document path, during and after a live
session. Reads SHALL never return CRDT-encoded state, and staleness SHALL
be bounded by the quiesce thresholds of this capability. No VFS consumer
needs to know a live session exists to read a document.

#### Scenario: Agent reads mid-session

- **WHEN** an agent calls `vfs.read` on a document that has a live session
- **THEN** it receives plain Markdown no older than the quiesce staleness
  bound, with no session-specific call or parameter required

### Requirement: Materialized writes flow through normal VFS and session semantics

Materialization SHALL write through the standard VFS write path so that
session/VCS semantics (D11) apply unchanged: in an `auto` session the write
lands on main and remains answerable (`diff(base, main)` + `vcs.restore`);
a manual save SHALL force materialization and produce a commit attributable
to the saving user. Materialization SHALL NOT bypass access checks, audit,
or change journaling.

#### Scenario: Manual save commits

- **WHEN** a participant invokes Save on a live document
- **THEN** the doc is materialized immediately and a commit exists whose
  author is that user and whose content equals the doc text

### Requirement: Anonymous read of link-shared documents

A document link-shared via iw9-b `vfs` sharing SHALL be readable by
anonymous holders of the share as the latest materialized `.md` only. The
anonymous path SHALL NOT expose live doc state, presence, participant
identity, or history beyond the shared file content, and SHALL honor share
expiry and revocation (iw9-b).

#### Scenario: Anonymous reader sees materialized content only

- **WHEN** an anonymous user opens a valid document share link during a live
  session
- **THEN** they receive the latest materialized Markdown (bounded-stale per
  quiesce), and no live updates, cursors, or participant information
