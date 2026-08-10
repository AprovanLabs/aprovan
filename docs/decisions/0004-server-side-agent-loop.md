# 0004. One agent loop, server-side

- **Status**: accepted
- **Date**: 2026-08-09
- **Origin**: `IW-9-APP-FIRST` orchestrator (D14)

## Context

Two agent loops exist: chat runs client-side (Vercel AI SDK in
`client/web/src/features/chat/`, tool signatures pasted into the prompt,
tools dispatched from the browser) and `agents.run` runs server-side
(`server/workspace/src/agents/runner.ts`, with grants, run records, spans,
and cost ceilings). Approval enforcement, resumability, and attribution
cannot be guaranteed in a loop the client owns — `llm-jobs.ts` already
exists solely to patch around the client loop dying with the tab.

## Decision

The server-side loop is the only loop. Chat drives `agents.run`; the client
renders a server-driven stream and reattaches to runs by id. Tool exposure
is one generic `call_tool` plus an on-demand `describe(namespace)` tool —
never pasted per-namespace signature lists. Approval, grants, cost
ceilings, traces, and run records are enforced at the server dispatch
chokepoint, once.

## Alternatives

- **Keep both loops**: lost — every policy feature would be built twice and
  the client copy is bypassable by construction.
- **Client loop wins**: lost — no server enforcement point, no resumability,
  no attribution; mobile lock-screen kills runs.

## Consequences

- The chat UX is rebuilt against the server stream (IW-9 Wave 1 D); widget
  self-heal becomes a traced, cost-ceilinged server turn.
- `llm-jobs.ts` folds into run records; locked-phone resumability becomes
  structural.
- Anything needing a mid-run decision from the user (approvals, capability
  introductions) is modeled as a run event, not a client-side detour.
