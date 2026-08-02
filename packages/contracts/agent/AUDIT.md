# Shape audit — @utdk/agent

Paper audit (documentation-level) of the contract surface against real vendor
APIs, per Decision 8. Freeze criterion for the 0.2.0 bump.

## Vendors

1. **OpenAI Assistants API** (assistants + threads + runs, `submit_tool_outputs`)
2. **Claude Agent SDK harness** (in-process/relayed harness over the Agent SDK)
3. **Relayed harness shape** (the gateway's own relay protocol: a remote
   harness driven over callbacks — the `relayed` locality the contract names)

## Per-operation mapping

| Contract op | OpenAI Assistants | Claude Agent SDK harness | Relayed harness |
| --- | --- | --- | --- |
| `run` (instructions, messages, model, effort, limits, tools, files) | create thread + `POST /runs` (assistant instructions, model, `max_completion_tokens`, tool definitions) | `query()` with system prompt, messages, model, `maxTurns`, MCP/custom tools | relay `run` frame carrying the same args |
| `get` (status, turns, usage, output) | `GET /runs/{id}` + list run steps (status, usage) | harness state (turn list, usage accumulators) | relay `get` frame |
| `cancel` | `POST /runs/{id}/cancel` | abort signal on the query | relay `cancel` frame |
| `submitToolResults` (callback transport) | `POST /runs/{id}/submit_tool_outputs` (maps `requires_action`) | in-process tool execution (no round-trip needed) | relay `toolResults` frame |
| file ops (`readFile`/`writeFile`/`listFiles`, sandbox-shaped) | Files API attachments (partial: no arbitrary paths) | harness workspace mount (full) | relay file frames (full) |
| `AgentRunStatus` vocabulary | queued/in_progress/requires_action/cancelling/cancelled/failed/completed/expired → mapped | running/awaiting-tools/done/error → mapped | same as harness |
| effort ordinal (`minimal…max`) | model choice + reasoning-effort param (`nearestEffort`) | Claude effort/thinking budget (`nearestEffort`) | forwarded ordinal |
| capabilities (`AgentCapabilities`) | callback transport, no in-process tools, partial files | in-process tools, files | callback transport, files |
| error → `AgentError(status)` | HTTP status + `last_error` | SDK errors → mapped status | relay error frame |

Findings:

- The run/get/cancel/submitToolResults lifecycle is expressible on all three
  targets. OpenAI's `requires_action` + `submit_tool_outputs` is precisely
  the contract's `callback` tool transport; the Claude harness uses
  `in-process`; the relay uses `callback` — the `AgentToolTransport` union
  covers all three without change.
- OpenAI Assistants cannot implement arbitrary-path sandbox-shaped file ops
  (its Files API is attachment-oriented); the file surface is already
  capability-gated (`AgentCapabilities`), so an OpenAI adapter declares no
  file capability rather than faking paths.
- The effort ordinal maps by `nearestEffort` onto both OpenAI's
  reasoning-effort values and Claude's thinking budgets; the ordinal (not a
  vendor knob) survives contact.
- Status vocabularies of all three collapse cleanly into `AgentRunStatus`;
  no missing state was found (OpenAI `expired` → `failed` with stop reason).

## Changes

No change. The run/get/cancel/submitToolResults + capability-gated file
surface mapped onto all three targets; partial vendor support is expressed
through `AgentCapabilities`, as designed.

## Verdict

**Frozen at 0.2.0.** All operations implementable against the three audited
targets; the capability system absorbs the vendor differences.
