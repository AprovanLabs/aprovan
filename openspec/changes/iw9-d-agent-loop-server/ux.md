# UX — iw9-d `agent-loop-server`

Chat behavior during server-driven runs. The surface is the existing
ChatDock/MessageParts; this change alters what happens under it, so the UX
contract is mostly "nothing visibly regresses, and disconnects stop losing
replies".

## Flows

### Flow: Send a message (streaming turn)

1. User types and submits; composer clears immediately; dock opens if closed
   (existing behavior).
2. User bubble renders at once; assistant bubble appears with the streaming
   badge as soon as `run_started` arrives.
3. Assistant text streams token-wise (`assistant_delta`); fenced widget
   blocks mount incrementally exactly as today (streaming widget artifact).
4. Each tool call renders as a pill the moment `tool_call_started` arrives —
   spinner while running, then collapses to name + expandable input/output
   on `tool_call_finished` (error state shows the alert icon).
5. `run_finished` clears the streaming badge; the transcript is final.
6. Failure paths: run `error` renders an inline error part on the assistant
   message; submit against a read-only session is refused before any network
   call; provider-not-connected disables submit (existing guard).

### Flow: Lock the phone / lose the network mid-run

1. Stream dies silently; the run continues server-side — no user action.
2. On return (tab foregrounded, network back), the transport reattaches with
   the last seen `seq`; missed events replay fast, then the live tail
   resumes. The user sees the reply "catch up" and continue; no error toast,
   no duplicated text.
3. If the run finished while away, replay ends at `run_finished` and the
   completed reply just is there.
4. If reattach itself fails (gateway unreachable), show the existing
   offline/error affordance with a retry; history stays rendered.

### Flow: Reload / second device mid-run

1. Session history renders from the session record.
2. The session carries `activeRunId`; the client attaches with `from=0`,
   replays the in-flight assistant message, and continues streaming.
3. Cancel remains available on the streaming message (routes to
   `agents.cancel`); a cancelled run renders its partial text plus a
   "stopped" marker from the terminal event.

### Flow: Widget self-heal

1. A widget in the just-streamed reply fails to mount; the failure pill and
   broken-widget state render as today.
2. Client (armed only within a user-send window) posts the failure report;
   a subtle "fixing widget…" system-style line appears — a heal turn is a
   visible turn, streaming like any other, not a hidden mutation.
3. The fix streams in; the corrected widget mounts.
4. Budget exhausted or caps hit: the broken state simply remains, no retry
   spinner, no error escalation (matches today's silent stop at
   `MAX_WIDGET_AUTOFIXES`).

## Screens & States

### ChatDock / message list

- Purpose unchanged. States: **loading** (session history fetch), **empty**
  (no messages, funnels unchanged), **streaming** (badge + live parts),
  **reattaching** (brief; no distinct chrome unless >2s, then a quiet
  "reconnecting…" hint on the streaming bubble), **error** (inline error
  part + composer stays usable), **read-only** (existing peek styling,
  composer disabled).

### Tool-call pill (existing `ToolPart`)

- Sourced from `tool_call_*` events instead of AI-SDK tool parts; same
  states: running (spinner), done (expandable input/output), error (alert
  icon + message). Partial state on reattach: a `tool_call_started` with no
  finish yet renders as running — correct by construction from replay order.

### Streaming widget artifact (existing)

- Unchanged contract: unclosed fence → `isStreaming`, close → mount decision
  via `shouldMountAsWidget`. Reattach replays fence deltas in order, so a
  widget interrupted mid-fence resumes cleanly.

## Component Inventory

Existing components only — no new primitives: `ChatComposer`, `ChatDock`,
`MessageBubble`/`MessageParts` (`ToolPart`, `ReasoningPart`), 
`ChatWidgetArtifact`/`ChatArtifactBlock`, shadcn `Collapsible`, `Badge`,
`Avatar`, lucide icons. New code is transport-level
(`features/chat/run-transport.ts`), invisible in the component tree except
the optional "reconnecting…" hint (a `Badge` variant) and the "fixing
widget…" line (muted text row, same styling as system notes).

## Open Questions

None requiring user decision. Default taken: reconnection is silent under
2s and a quiet badge beyond that (recommendation follows the PRD goal that
disconnects are a non-event, so no toast/modal).
