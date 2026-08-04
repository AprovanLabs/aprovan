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
 * ## One generic tool, not a generated schema per operation
 *
 * The model is offered a single documented `call_tool` function taking
 * `{ namespace, operation, args }`, plus the run's allowed patterns in its
 * description — NOT one JSON schema per granted operation. A grant like
 * `vcs.*` covers dozens of operations and `github.*` thousands; generating
 * schemas for them would mean loading provider catalogs into every run's
 * prompt for marginal steering. The tool list handed to the run is a
 * *projection* of the grants (the pattern list itself, one direction, no
 * authority), and the real boundary is the dispatch path: the runner checks
 * every requested call against that list, and `invokeTool` re-checks it
 * against `ctx.grants` — a model-chosen namespace can bypass neither.
 */

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
import { ServiceError, type ServiceContext } from "../service-kernel.js";
import { dispatchInterface, invokeTool } from "../workflows/invoke.js";

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
  streaming: false,
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

/** The one tool the model sees; `allowed` is the grant projection. */
function callToolSchema(allowed: string[]): Record<string, unknown> {
  return {
    type: "function",
    function: {
      name: "call_tool",
      description:
        "Call one workspace tool and get its JSON result. " +
        `Allowed calls (namespace.operation patterns): ${allowed.join(", ")}. ` +
        'namespace is the tool namespace (e.g. "vcs"), operation the dot-path ' +
        'within it (e.g. "pullRequests.diff"), args the operation\'s named arguments.',
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

/**
 * One requested `call_tool` invocation, decoded. A malformed request is fed
 * back to the model as a tool error rather than killing the run — models
 * recover from a bad argument; a run does not recover from being failed.
 */
function decodeToolCall(
  call: ChatToolCall,
): { namespace: string; operation: string; args: Record<string, unknown> } | { error: string } {
  if (call.function?.name !== "call_tool") {
    return { error: `Unknown tool "${call.function?.name ?? ""}" — the only tool is call_tool` };
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(call.function.arguments || "{}");
  } catch {
    return { error: "call_tool arguments were not valid JSON" };
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { error: "call_tool arguments must be an object { namespace, operation, args? }" };
  }
  const record = parsed as Record<string, unknown>;
  const namespace = typeof record["namespace"] === "string" ? record["namespace"] : "";
  const operation = typeof record["operation"] === "string" ? record["operation"] : "";
  if (!namespace || !operation) {
    return { error: "call_tool needs { namespace, operation }" };
  }
  const args =
    record["args"] && typeof record["args"] === "object" && !Array.isArray(record["args"])
      ? (record["args"] as Record<string, unknown>)
      : {};
  return { namespace, operation, args };
}

async function runNativeAgent(
  ctx: ServiceContext,
  args: AgentRunArgs,
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
    ...(agentName ? { agent: agentName } : {}),
    ...(sandboxId ? { sandboxId } : {}),
    ...(args.metadata ? { meta: { ...args.metadata } } : {}),
  };
  await saveRunRecord(ctx.workspaceId, record);
  const handle = { cancelled: false };
  activeRuns.set(id, handle);

  // The tool list is patterns (the grant projection `agents.run` computes,
  // or a raw caller's own list); it bounds the loop even when ctx.grants is
  // absent, and invokeTool's assertToolGranted re-checks underneath.
  const allowed = (args.tools ?? []).map((tool) => tool.name);
  const toolSchemas = allowed.length > 0 ? [callToolSchema(allowed)] : undefined;

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

      let message: ChatMessage;
      try {
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
        break;
      }
      usage.turns = turn + 1;
      const at = new Date().toISOString();

      const requested = Array.isArray(message.tool_calls) ? message.tool_calls : [];
      if (requested.length === 0) {
        output = typeof message.content === "string" ? message.content : "";
        turns.push({
          index: turn,
          at,
          kind: "assistant",
          text: truncate(output, MAX_RECORDED_RESULT_BYTES),
        });
        status = "succeeded";
        stopReason = "completed";
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
          break loop;
        }
        usage.toolCalls = (usage.toolCalls ?? 0) + 1;

        const decoded = decodeToolCall(call);
        if ("error" in decoded) {
          messages.push({ role: "tool", tool_call_id: callId, content: jsonish({ error: decoded.error }) });
          recorded.push({ id: callId, name: call.function?.name ?? "call_tool", error: decoded.error });
          continue;
        }
        const name = `${decoded.namespace}.${decoded.operation}`;
        // The security boundary, both halves: the run's own tool list here,
        // the profile grants inside invokeTool. A model-chosen namespace
        // outside the list ends the run — retrying a policy is not a thing
        // more turns can fix.
        if (!toolGranted(allowed, decoded.namespace, decoded.operation)) {
          stopReason = "tool_denied";
          errorMessage = `The model asked for ${name}, which the run's tool list (${allowed.join(", ")}) does not allow`;
          recorded.push({ id: callId, name, error: "denied" });
          turns.push({ index: turn, at, kind: "tool", toolCalls: recorded });
          break loop;
        }
        const callStart = performance.now();
        try {
          const result = await invokeTool(ctx, decoded.namespace, decoded.operation, decoded.args);
          const body = jsonish(result);
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
            durationMs: Math.round(performance.now() - callStart),
          });
        } catch (err) {
          // Ordinary tool failures (a 404 repo, a validation error) go back
          // to the model — it may recover with a corrected call.
          const messageText = err instanceof Error ? err.message : String(err);
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
            durationMs: Math.round(performance.now() - callStart),
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
