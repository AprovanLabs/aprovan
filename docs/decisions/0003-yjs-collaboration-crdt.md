# 0003. Yjs as the collaboration CRDT

- **Status**: accepted
- **Date**: 2026-08-09
- **Origin**: `IW-9-APP-FIRST` orchestrator (D17/D18)

## Context

The Document flagship needs live multi-user editing with visible cursors,
and future sheets/slides need map/array collaborative structures — not just
text. No CRDT library exists anywhere in the codebase today. The editor
stack is CodeMirror 6 (`packages/editor`).

## Decision

Adopt **Yjs**: its awareness protocol *is* the cursors/selections/presence
feature (the de facto standard); `y-codemirror.next` binds to the editor we
already ship; `Y.Map`/`Y.Array` cover the future sheets (cell maps) and
slides (element trees, z-order) plans, so the choice does not have to be
revisited when those arrive.

Usage rules:

- The live Yjs doc is truth while a document is open; a materialized file
  (`.md` first) is written to the workspace FS on quiesce so agents and
  ordinary `vfs` readers always see real content.
- Agent whole-file writes are reconciled into the live doc as diff→CRDT
  transactions; unresolvable conflicts flip the session to a draft resolved
  through the merge surface.
- Every long-lived doc requires a compaction strategy (periodic
  `Y.encodeStateAsUpdate` snapshot + update-log prune) — Yjs history grows
  unboundedly otherwise.
- Doc authority is server-side (one holder per doc). When a runtime
  interface exists, the holder becomes an actor per doc; nothing in app
  code may assume otherwise.

## Alternatives

- **Loro**: faster, better rich-text model — lost on youth, smaller
  ecosystem, and weaker cursor/editor-binding adoption.
- **Automerge**: mature core — lost on text quality and editor ecosystem.
- **No CRDT (file locking / last-write-wins)**: lost — kills the live-cursor
  requirement and the agent/human coexistence story.

## Consequences

- `yjs`, `y-protocols`, `y-codemirror.next` become dependencies of the
  Document app stream (IW-9 Wave 3).
- Formats without a clean CRDT isomorphism (slides, sheets) get
  CRDT-native internal models with import/export at a conversion boundary
  (headless LibreOffice inside the `sandbox` interface) — never a live
  LibreOffice editing backend.
