/**
 * The native agent runtime — the gateway's own loop behind the `@utdk/agent`
 * contract (docs/agent-interface.md).
 *
 * `agent`'s `native` compat entry names this module's dispatch, never a UTDK
 * module: `dispatchInterface` (and its HTTP twin in routes/tools.ts)
 * short-circuits straight into {@link dispatchNativeAgentOp}, exactly as
 * `sandboxes` short-circuits a `machine` host — the implementation IS this
 * process, and a hop through the isolate would buy a serialization boundary
 * and nothing else. The compat entry's `module: "native"` completes the
 * resolution tuple and is never imported.
 *
 * ## The loop
 *
 * OpenAI-compatible chat shapes end to end. Each turn:
 *
 *   1. `llm.createChatCompletion` through {@link dispatchInterface} — the
 *      normal interface dispatch, so the run's instance redirection
 *      (`ctx.interfaceInstances.llm`, set by `agents.run` from the profile or
 *      its policy), binding options, credentials and provider pins all apply
 *      exactly as they do for a workflow script's `llm.*` call.
 *   2. If the assistant message carries `tool_calls`, each is executed and
 *      answered with a `{ role: "tool", tool_call_id, content }` message,
 *      then the loop continues. Otherwise the message content is the final
 *      output and the run completes.
 *
 * Termination: final answer (`completed`), `limits.maxTurns` / `wallClockMs`
 * / `maxToolCalls`, `cancel` (checked between turns — a model call in flight
 * finishes first), a model asking outside its tool list (`tool_denied`), or
 * a thrown model call (`error`). Every run — however it ends — is persisted
 * under `.services/agents/_runs/` so `get`/`cancel` work from other requests
 * and `agents.runs` can list executions, mirroring the workflow run store.
 *
 * ## Two built-ins, not a generated schema per operation
 *
 * The model is offered `call_tool { namespace, operation, args }` and
 * `describe { namespace, query?, cursor? }`, plus the run's allowed patterns —
 * NOT one JSON schema per granted operation. A grant like `vcs.*` covers
 * dozens of operations and `github.*` thousands; pasting signatures into
 * every prompt is wasteful. Prompts carry the pattern list; the model asks
 * `describe` for compact signatures on demand. Describing never widens
 * authority: the runner still checks every `call_tool` against the pattern
 * list, and `invokeTool` re-checks against `ctx.grants`.
 */

import type { RunEvent } from "@aprovan/agent-protocol";
import {
  AGENT_EFFORTS,
  assertRunSupported,
  clampOutput,
  inputMessages,
  isTerminal,
  maxTurns,
  runTimeout,
  validateRunArgs,
  type AgentCapabilities,
  type AgentRun,
  type AgentRunArgs,
  type AgentRunStatus,
  type AgentStopReason,
  type AgentToolCall,
  type AgentTurn,
  type AgentUsage,
} from "@utdk/agent";
import { getFsStore } from "../fs-store.js";
import {
  deleteSvcRecord,
  listSvcKeys,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "../svc-records.js";
import { toolGranted } from "../grants.js";
import * as toolCatalog from "../routes/tools.js";
import { ServiceError, type ServiceContext } from "../service-kernel.js";
import { dispatchInterface, invokeTool } from "../workflows/invoke.js";
import { appendRunEvents, type RunEventInput } from "./run-events.js";

/** Per-response cap for the built-in `describe` tool (~40). */
export const DESCRIBE_PAGE_SIZE = 40;

export const NATIVE_AGENT_CAPABILITIES: AgentCapabilities = {
  locality: "in-gateway",
  toolTransport: "in-process",
  // No working directory: mounts reach a native run as instruction layers
  // rendered by `agents.run` (the mounts ladder's inline rung), so the
  // contract's `files`/file ops are refused rather than half-implemented. A
  // future harness runtime materializes mounts for real via sandboxes/mounts.
  filesystem: false,
  hashes: false,
  inlineFiles: false,
  // Run records persist, so `get` still answers after `run` returned.
  resumable: true,
  cancellable: true,
  // Event log + in-process fan-out exist (agents/run-events.ts); clients
  // discover attachability via this flag (stream endpoint lands in stream 3).
  streaming: true,
  modelSelectable: true,
  setupCommand: false,
  effortLevels: [...AGENT_EFFORTS],
};

// ---------------------------------------------------------------------------
// Run store — `svc#agents#runs` records, the workflow-run pattern.
// ---------------------------------------------------------------------------

const RUNS_SCOPE = svcScope("agents", "runs");
const RUNS_MAX_RETAINED = 100;

/** A persisted run: the contract's shape plus the profile it ran as. */
export interface StoredAgentRun extends AgentRun {
  agent?: string;
  /** The sandbox this run's tool calls executed against, when it had one. */
  sandboxId?: string;
  /** Gapless run-event log (assigned `seq` by appendRunEvents). */
  events?: RunEvent[];
  /** `events.at(-1).seq` — cheap resume answer for stream reattach. */
  lastSeq?: number;
  /** What started the run; defaults to `"api"` inside the runner lifecycle. */
  origin?: "chat" | "self-heal" | "api";
  /** Chat session this run belongs to, when any. */
  sessionId?: string;
}

/** Optional live sink; persistence always goes through appendRunEvents. */
export interface RunNativeAgentOptions {
  emit?: (event: RunEvent) => void;
}

/** Time-prefixed and path-safe, like workflow run ids. */
function newAgentRunId(): string {
  return `agr-${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}`;
}

async function saveRunRecord(workspaceId: string, run: StoredAgentRun): Promise<void> {
  await writeSvcRecord(workspaceId, RUNS_SCOPE, run.id, run);
}

export async function readNativeAgentRun(
  workspaceId: string,
  id: string,
): Promise<StoredAgentRun | undefined> {
  if (!/^[\w-]{1,80}$/u.test(id)) return undefined;
  return readSvcRecord<StoredAgentRun>(workspaceId, RUNS_SCOPE, id).catch(() => undefined);
}

/** Native runs, newest first; prunes past the retention cap (best-effort). */
export async function listNativeAgentRuns(
  workspaceId: string,
  agent?: string,
  limit = 50,
): Promise<StoredAgentRun[]> {
  // Run ids are time-prefixed, so a lexical sort is chronological.
  const ids = (await listSvcKeys(workspaceId, RUNS_SCOPE).catch(() => [])).sort().reverse();
  for (const stale of ids.slice(RUNS_MAX_RETAINED)) {
    void deleteSvcRecord(workspaceId, RUNS_SCOPE, stale);
  }
  const runs: StoredAgentRun[] = [];
  for (const id of ids) {
    if (runs.length >= limit) break;
    const run = await readNativeAgentRun(workspaceId, id);
    if (!run) continue;
    if (agent && run.agent !== agent) continue;
    runs.push(run);
  }
  return runs;
}

// ---------------------------------------------------------------------------
// Cancellation — an in-memory flag per live loop, checked between turns.
// Cross-request cancel works because the record is persisted as `running`
// before the first turn; a `running` record with no live handle is an orphan
// from a process restart and is settled directly.
// ---------------------------------------------------------------------------

const activeRuns = new Map<string, { cancelled: boolean }>();

async function cancelNativeAgentRun(
  workspaceId: string,
  id: string,
): Promise<{ cancelled: boolean }> {
  const handle = activeRuns.get(id);
  if (handle) {
    handle.cancelled = true;
    return { cancelled: true };
  }
  const record = await readNativeAgentRun(workspaceId, id);
  if (!record) throw new ServiceError(`Unknown agent run: ${id}`, 404);
  if (isTerminal(record.status)) return { cancelled: false };
  record.status = "cancelled";
  record.stopReason = "cancelled";
  record.finishedAt = new Date().toISOString();
  await saveRunRecord(workspaceId, record);
  return { cancelled: true };
}

// ---------------------------------------------------------------------------
// The loop
// ---------------------------------------------------------------------------

/** Bodies fed back to the model per tool result; the record stores less. */
const MAX_TOOL_RESULT_BYTES = 24_000;
/** Result echo kept on the persisted run record, per call. */
const MAX_RECORDED_RESULT_BYTES = 2_000;

interface ChatToolCall {
  id?: string;
  type?: string;
  function?: { name?: string; arguments?: string };
}

interface ChatMessage {
  role?: string;
  content?: string | null;
  tool_calls?: ChatToolCall[];
}

interface ChatResponse {
  choices?: Array<{ message?: ChatMessage }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}

/** The call_tool the model sees; `allowed` is the grant projection. */
function callToolSchema(allowed: string[]): Record<string, unknown> {
  return {
    type: "function",
    function: {
      name: "call_tool",
      description:
        "Call one workspace tool and get its JSON result. " +
        `Allowed calls (namespace.operation patterns): ${allowed.join(", ")}. ` +
        'namespace is the tool namespace (e.g. "vcs"), operation the dot-path ' +
        'within it (e.g. "pullRequests.diff"), args the operation\'s named arguments. ' +
        "Use describe first when you need operation signatures.",
      parameters: {
        type: "object",
        properties: {
          namespace: { type: "string", description: 'Tool namespace, e.g. "vcs"' },
          operation: { type: "string", description: 'Operation path, e.g. "pullRequests.diff"' },
          args: { type: "object", description: "Named arguments for the operation" },
        },
        required: ["namespace", "operation"],
      },
    },
  };
}

/** On-demand compact signatures; never widens call_tool authority. */
function describeToolSchema(allowed: string[]): Record<string, unknown> {
  return {
    type: "function",
    function: {
      name: "describe",
      description:
        "List compact operation signatures for one granted namespace " +
        "(operation path, parameter names with required/optional markers, " +
        "one-line description). Use before call_tool when you need details. " +
        `Allowed patterns: ${allowed.join(", ")}. ` +
        "Describing does not make an operation callable — call_tool still " +
        "checks the same pattern list. Large namespaces paginate via cursor.",
      parameters: {
        type: "object",
        properties: {
          namespace: { type: "string", description: 'Tool namespace to describe, e.g. "vcs"' },
          query: {
            type: "string",
            description: "Optional case-insensitive filter on operation name or description",
          },
          cursor: {
            type: "string",
            description: "Opaque pagination cursor from a previous describe result",
          },
        },
        required: ["namespace"],
      },
    },
  };
}

/**
 * Whether any allowed pattern covers some operation under `namespace`
 * (exact, prefix, or wildcard). Used to refuse describe before loading a
 * catalog the run cannot call into.
 */
function namespaceInProjection(allowed: string[], namespace: string): boolean {
  return allowed.some((pattern) => {
    if (pattern === "*") return true;
    if (pattern === namespace) return true;
    if (pattern.startsWith(`${namespace}.`)) return true;
    if (pattern.endsWith(".*")) {
      const base = pattern.slice(0, -2);
      return (
        namespace === base ||
        namespace.startsWith(`${base}.`) ||
        base.startsWith(`${namespace}.`)
      );
    }
    return false;
  });
}

function truncate(text: string, cap: number): string {
  return text.length <= cap ? text : `${text.slice(0, cap)}…(truncated)`;
}

function jsonish(value: unknown): string {
  try {
    return JSON.stringify(value) ?? "null";
  } catch {
    return String(value);
  }
}

function addUsage(total: AgentUsage, reported: ChatResponse["usage"]): void {
  if (!reported) return;
  if (typeof reported.prompt_tokens === "number") {
    total.inputTokens = (total.inputTokens ?? 0) + reported.prompt_tokens;
  }
  if (typeof reported.completion_tokens === "number") {
    total.outputTokens = (total.outputTokens ?? 0) + reported.completion_tokens;
  }
  if (typeof reported.total_tokens === "number") {
    total.totalTokens = (total.totalTokens ?? 0) + reported.total_tokens;
  }
}

type DecodedCallTool = {
  kind: "call_tool";
  namespace: string;
  operation: string;
  args: Record<string, unknown>;
};
type DecodedDescribe = {
  kind: "describe";
  namespace: string;
  query?: string;
  cursor?: string;
};

/**
 * One requested built-in invocation, decoded. A malformed request is fed
 * back to the model as a tool error rather than killing the run — models
 * recover from a bad argument; a run does not recover from being failed.
 */
function decodeToolCall(
  call: ChatToolCall,
): DecodedCallTool | DecodedDescribe | { error: string } {
  const name = call.function?.name ?? "";
  let parsed: unknown;
  try {
    parsed = JSON.parse(call.function?.arguments || "{}");
  } catch {
    return { error: `${name || "tool"} arguments were not valid JSON` };
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { error: `${name || "tool"} arguments must be an object` };
  }
  const record = parsed as Record<string, unknown>;

  if (name === "describe") {
    const namespace = typeof record["namespace"] === "string" ? record["namespace"] : "";
    if (!namespace) return { error: "describe needs { namespace }" };
    const query = typeof record["query"] === "string" ? record["query"] : undefined;
    const cursor = typeof record["cursor"] === "string" ? record["cursor"] : undefined;
    return {
      kind: "describe",
      namespace,
      ...(query ? { query } : {}),
      ...(cursor ? { cursor } : {}),
    };
  }

  if (name !== "call_tool") {
    return {
      error: `Unknown tool "${name}" — built-ins are call_tool and describe`,
    };
  }
  const namespace = typeof record["namespace"] === "string" ? record["namespace"] : "";
  const operation = typeof record["operation"] === "string" ? record["operation"] : "";
  if (!namespace || !operation) {
    return { error: "call_tool needs { namespace, operation }" };
  }
  const args =
    record["args"] && typeof record["args"] === "object" && !Array.isArray(record["args"])
      ? (record["args"] as Record<string, unknown>)
      : {};
  return { kind: "call_tool", namespace, operation, args };
}

/**
 * Run the built-in describe tool. Ungranted namespaces refuse without
 * loading a catalog; granted ones page at {@link DESCRIBE_PAGE_SIZE}.
 */
async function runDescribe(
  workspaceId: string,
  allowed: string[],
  request: DecodedDescribe,
): Promise<unknown> {
  if (!namespaceInProjection(allowed, request.namespace)) {
    return {
      error: `Namespace "${request.namespace}" is outside this run's tool projection`,
      allowed: [...allowed],
    };
  }

  let ops = await toolCatalog.catalogForNamespace(workspaceId, request.namespace);
  ops = ops.filter((op) => toolGranted(allowed, request.namespace, op.operation));
  if (request.query) {
    const q = request.query.toLowerCase();
    ops = ops.filter(
      (op) =>
        op.operation.toLowerCase().includes(q) ||
        (op.description?.toLowerCase().includes(q) ?? false),
    );
  }

  let offset = 0;
  if (request.cursor) {
    const parsed = Number.parseInt(request.cursor, 10);
    if (!Number.isFinite(parsed) || parsed < 0) {
      return { error: `Invalid describe cursor "${request.cursor}"` };
    }
    offset = parsed;
  }

  const page = ops.slice(offset, offset + DESCRIBE_PAGE_SIZE);
  const remaining = Math.max(0, ops.length - offset - page.length);
  return {
    namespace: request.namespace,
    operations: page,
    ...(remaining > 0
      ? { cursor: String(offset + page.length), remaining }
      : {}),
  };
}

async function runNativeAgent(
  ctx: ServiceContext,
  args: AgentRunArgs,
  options?: RunNativeAgentOptions,
): Promise<StoredAgentRun> {
  // Pre-flight refusals throw (nothing was spent); loop failures are
  // recorded on the run resource instead — the contract's split.
  validateRunArgs(args);
  assertRunSupported(NATIVE_AGENT_CAPABILITIES, "native", args);

  const id = newAgentRunId();
  const startedAt = new Date().toISOString();
  const startMs = performance.now();
  const agentName =
    typeof args.metadata?.["agent"] === "string" ? args.metadata["agent"] : undefined;
  // Set by `agents.run { sandbox }` so the UI can say "running on sandbox X
  // with agent Y" from the run record alone.
  const sandboxId =
    typeof args.metadata?.["sandboxId"] === "string" ? args.metadata["sandboxId"] : undefined;
  const sessionId =
    typeof args.metadata?.["sessionId"] === "string" ? args.metadata["sessionId"] : undefined;
  const originMeta = args.metadata?.["origin"];
  const origin: StoredAgentRun["origin"] =
    originMeta === "chat" || originMeta === "self-heal" || originMeta === "api"
      ? originMeta
      : "api";
  const llmPin = ctx.interfaceInstances?.["llm"];
  const llmInstance =
    typeof llmPin === "object" && llmPin !== null
      ? (llmPin as { profile?: string }).profile
        ? `llm:${(llmPin as { profile: string }).profile}`
        : "llm"
      : typeof llmPin === "string"
        ? llmPin
        : "llm";

  const record: StoredAgentRun = {
    id,
    status: "running",
    startedAt,
    origin,
    ...(agentName ? { agent: agentName } : {}),
    ...(sandboxId ? { sandboxId } : {}),
    ...(sessionId ? { sessionId } : {}),
    ...(args.metadata ? { meta: { ...args.metadata } } : {}),
  };
  await saveRunRecord(ctx.workspaceId, record);
  const handle = { cancelled: false };
  activeRuns.set(id, handle);

  // Persist + optional live sink. Persistence is unconditional; `options.emit`
  // is an additional sink (tests / future callers), never the record decision.
  const emit = async (input: RunEventInput): Promise<RunEvent> => {
    const [event] = await appendRunEvents(ctx.workspaceId, id, [input]);
    record.events = [...(record.events ?? []), event!];
    record.lastSeq = event!.seq;
    options?.emit?.(event!);
    return event!;
  };

  // The tool list is patterns (the grant projection `agents.run` computes,
  // or a raw caller's own list); it bounds the loop even when ctx.grants is
  // absent, and invokeTool's assertToolGranted re-checks underneath.
  // Prompt carries patterns only — signatures come from `describe` on demand.
  const allowed = (args.tools ?? []).map((tool) => tool.name);
  const toolSchemas =
    allowed.length > 0 ? [callToolSchema(allowed), describeToolSchema(allowed)] : undefined;

  const messages: Array<Record<string, unknown>> = [];
  if (args.instructions) messages.push({ role: "system", content: args.instructions });
  for (const message of inputMessages(args)) {
    messages.push({ role: message.role, content: message.content });
  }

  const wallClockMs = runTimeout(args);
  const deadline = Date.now() + wallClockMs;
  const turnCap = maxTurns(args);
  const toolCap = args.limits?.maxToolCalls;

  const turns: AgentTurn[] = [];
  const usage: AgentUsage = { turns: 0, toolCalls: 0 };
  let status: AgentRunStatus = "failed";
  let stopReason: AgentStopReason = "error";
  let output: string | undefined;
  let errorMessage: string | undefined;

  await emit({
    type: "run_started",
    runId: id,
    at: startedAt,
    ...(agentName ? { agent: agentName } : {}),
    ...(args.model ? { model: args.model } : {}),
    ...(sessionId ? { sessionId } : {}),
  });

  try {
    loop: for (let turn = 0; ; turn += 1) {
      if (handle.cancelled) {
        status = "cancelled";
        stopReason = "cancelled";
        break;
      }
      if (Date.now() > deadline) {
        stopReason = "wall_clock";
        errorMessage = `Run exceeded its ${wallClockMs}ms wall clock`;
        break;
      }
      if (turn >= turnCap) {
        stopReason = "max_turns";
        errorMessage = `Run hit its ${turnCap}-turn cap without a final answer`;
        break;
      }

      await emit({ type: "turn_started", turn, at: new Date().toISOString() });

      let message: ChatMessage;
      try {
        // Buffered completion: `llm.createChatCompletion` returns one full
        // choice per turn today (no token stream). Emit a single
        // `assistant_delta` with the full turn text rather than fabricating
        // a fake stream — see briefs/deviations.md (stream 2 / task 2.3).
        const response = (await dispatchInterface(ctx, "llm", "createChatCompletion", {
          messages,
          ...(toolSchemas ? { tools: toolSchemas, tool_choice: "auto" } : {}),
          ...(args.model ? { model: args.model } : {}),
        })) as ChatResponse | undefined;
        addUsage(usage, response?.usage);
        const choice = response?.choices?.[0]?.message;
        if (!choice) throw new ServiceError("The model returned no choices", 502);
        message = choice;
      } catch (err) {
        stopReason = "error";
        errorMessage = err instanceof Error ? err.message : String(err);
        await emit({ type: "turn_finished", turn });
        await emit({ type: "error", message: errorMessage });
        break;
      }
      usage.turns = turn + 1;
      const at = new Date().toISOString();

      const assistantText = typeof message.content === "string" ? message.content : "";
      if (assistantText) {
        await emit({ type: "assistant_delta", turn, text: assistantText });
      }

      const requested = Array.isArray(message.tool_calls) ? message.tool_calls : [];
      if (requested.length === 0) {
        output = assistantText;
        turns.push({
          index: turn,
          at,
          kind: "assistant",
          text: truncate(output, MAX_RECORDED_RESULT_BYTES),
        });
        status = "succeeded";
        stopReason = "completed";
        await emit({ type: "turn_finished", turn });
        break;
      }

      // Echo the assistant message before its tool answers — the OpenAI
      // shape every compatible server expects on the next request.
      messages.push({
        role: "assistant",
        content: message.content ?? null,
        tool_calls: requested,
      });

      const recorded: AgentToolCall[] = [];
      for (const call of requested) {
        const callId =
          typeof call.id === "string" && call.id ? call.id : `call-${usage.toolCalls}`;
        if (toolCap !== undefined && (usage.toolCalls ?? 0) >= toolCap) {
          stopReason = "max_tool_calls";
          errorMessage = `Run hit its ${toolCap}-tool-call cap`;
          turns.push({ index: turn, at, kind: "tool", toolCalls: recorded });
          await emit({ type: "turn_finished", turn });
          break loop;
        }
        usage.toolCalls = (usage.toolCalls ?? 0) + 1;

        const decoded = decodeToolCall(call);
        if ("error" in decoded) {
          messages.push({ role: "tool", tool_call_id: callId, content: jsonish({ error: decoded.error }) });
          recorded.push({ id: callId, name: call.function?.name ?? "call_tool", error: decoded.error });
          continue;
        }

        if (decoded.kind === "describe") {
          await emit({
            type: "tool_call_started",
            turn,
            callId,
            namespace: decoded.namespace,
            operation: "describe",
            args: {
              namespace: decoded.namespace,
              ...(decoded.query ? { query: decoded.query } : {}),
              ...(decoded.cursor ? { cursor: decoded.cursor } : {}),
            },
          });
          const callStart = performance.now();
          // Describe is read-only metadata: refusal is recoverable (no
          // tool_denied), and never widens call_tool authority.
          const result = await runDescribe(ctx.workspaceId, allowed, decoded);
          const body = jsonish(result);
          const durationMs = Math.round(performance.now() - callStart);
          messages.push({
            role: "tool",
            tool_call_id: callId,
            content: truncate(body, MAX_TOOL_RESULT_BYTES),
          });
          recorded.push({
            id: callId,
            name: "describe",
            arguments: {
              namespace: decoded.namespace,
              ...(decoded.query ? { query: decoded.query } : {}),
              ...(decoded.cursor ? { cursor: decoded.cursor } : {}),
            },
            result: truncate(body, MAX_RECORDED_RESULT_BYTES),
            durationMs,
          });
          await emit({
            type: "tool_call_finished",
            turn,
            callId,
            ok: true,
            resultPreview: truncate(body, MAX_RECORDED_RESULT_BYTES),
            durationMs,
          });
          continue;
        }

        const name = `${decoded.namespace}.${decoded.operation}`;
        await emit({
          type: "tool_call_started",
          turn,
          callId,
          namespace: decoded.namespace,
          operation: decoded.operation,
          args: decoded.args,
        });
        // The security boundary, both halves: the run's own tool list here,
        // the profile grants inside invokeTool. A model-chosen namespace
        // outside the list ends the run — retrying a policy is not a thing
        // more turns can fix.
        if (!toolGranted(allowed, decoded.namespace, decoded.operation)) {
          stopReason = "tool_denied";
          errorMessage = `The model asked for ${name}, which the run's tool list (${allowed.join(", ")}) does not allow`;
          recorded.push({ id: callId, name, error: "denied" });
          turns.push({ index: turn, at, kind: "tool", toolCalls: recorded });
          await emit({
            type: "tool_call_finished",
            turn,
            callId,
            ok: false,
            error: "denied",
            durationMs: 0,
          });
          await emit({ type: "turn_finished", turn });
          break loop;
        }
        const callStart = performance.now();
        try {
          const result = await invokeTool(ctx, decoded.namespace, decoded.operation, decoded.args);
          const body = jsonish(result);
          const durationMs = Math.round(performance.now() - callStart);
          messages.push({
            role: "tool",
            tool_call_id: callId,
            content: truncate(body, MAX_TOOL_RESULT_BYTES),
          });
          recorded.push({
            id: callId,
            name,
            arguments: decoded.args,
            result: truncate(body, MAX_RECORDED_RESULT_BYTES),
            durationMs,
          });
          await emit({
            type: "tool_call_finished",
            turn,
            callId,
            ok: true,
            resultPreview: truncate(body, MAX_RECORDED_RESULT_BYTES),
            durationMs,
          });
        } catch (err) {
          // Ordinary tool failures (a 404 repo, a validation error) go back
          // to the model — it may recover with a corrected call.
          const messageText = err instanceof Error ? err.message : String(err);
          const durationMs = Math.round(performance.now() - callStart);
          messages.push({
            role: "tool",
            tool_call_id: callId,
            content: jsonish({ error: messageText }),
          });
          recorded.push({
            id: callId,
            name,
            arguments: decoded.args,
            error: messageText,
            durationMs,
          });
          await emit({
            type: "tool_call_finished",
            turn,
            callId,
            ok: false,
            error: messageText,
            durationMs,
          });
        }
      }
      turns.push({
        index: turn,
        at,
        kind: "tool",
        ...(typeof message.content === "string" && message.content
          ? { text: truncate(message.content, MAX_RECORDED_RESULT_BYTES) }
          : {}),
        toolCalls: recorded,
      });
      await emit({ type: "turn_finished", turn });
    }
  } finally {
    activeRuns.delete(id);
  }

  const clamped = clampOutput(output, args.limits);
  record.status = status;
  record.finishedAt = new Date().toISOString();
  record.durationMs = Math.round(performance.now() - startMs);
  record.stopReason = stopReason;
  record.turns = turns;
  record.usage = usage;
  if (clamped.text) record.output = clamped.text;
  if (clamped.truncated) record.truncated = true;
  if (errorMessage) record.error = { message: errorMessage };
  // What became of the requested effort, in this runtime's own words: the
  // native loop has no reasoning knob, so effort's whole effect is which
  // instance the policy selected before dispatch.
  if (args.effort) record.effortApplied = `effort=${args.effort} llm=${llmInstance}`;

  // Terminal event: thrown model failures already emitted `error` inside the
  // loop; every other stop (including tool_denied) closes with `run_finished`.
  if (!(record.events ?? []).some((e) => e.type === "error")) {
    await emit({
      type: "run_finished",
      status,
      stopReason,
      usage,
      ...(clamped.text ? { output: clamped.text } : {}),
    });
  }

  await saveRunRecord(ctx.workspaceId, record);
  return record;
}

// ---------------------------------------------------------------------------
// Dispatch — the short-circuit target for the `agent` interface's `native`
// compat entry (workflows/invoke.ts and routes/tools.ts).
// ---------------------------------------------------------------------------

export async function dispatchNativeAgentOp(
  ctx: ServiceContext,
  procedure: string,
  args: Record<string, unknown>,
): Promise<unknown> {
  switch (procedure) {
    case "run":
      return runNativeAgent(ctx, args as unknown as AgentRunArgs);
    case "get": {
      const id = typeof args["id"] === "string" ? args["id"] : "";
      const run = await readNativeAgentRun(ctx.workspaceId, id);
      if (!run) throw new ServiceError(`Unknown agent run: ${id}`, 404);
      return run;
    }
    case "cancel": {
      const id = typeof args["id"] === "string" ? args["id"] : "";
      return cancelNativeAgentRun(ctx.workspaceId, id);
    }
    default:
      // submitToolResults and the file ops are capability-gated surfaces the
      // native runtime does not declare (in-process transport yields no tool
      // calls; there is no working directory) — refuse, don't degrade.
      throw new ServiceError(
        `The native agent runtime does not implement agent.${procedure}`,
        501,
      );
  }
}
