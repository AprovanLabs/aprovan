/**
 * @utdk/agent — the shared contract for UTDK agent runtimes.
 *
 * An *agent runtime* is whatever holds the loop: prompt the model, read the
 * tool calls it asks for, run them, feed the results back, repeat until the
 * model stops or a limit does. Every vendor sells one and they are not
 * interchangeable in shape — the Claude Agent SDK is a library, OpenAI
 * Assistants is a durable server-side run resource, a `pi`-style harness is a
 * process on a laptop — so provider modules are handwritten, exactly like the
 * database providers on `@utdk/sql` and the hosts on `@utdk/sandbox`, and all
 * of them speak this contract:
 *
 *   - the operation surface is `run / get / cancel`, plus the optional
 *     `submitToolResults` and file ops the capability descriptor advertises;
 *   - a run is a *resource with an id*, not a request/response — even the
 *     in-gateway runtime returns one, so "check on it" and "stop it" are the
 *     same two calls everywhere;
 *   - effort is a five-step ordinal, not a vendor's own knob (see
 *     {@link AgentEffort});
 *   - the secret arrives as the standard UTDK `Authorization: Bearer …`
 *     header injection.
 *
 * What a runtime does **not** decide, and never sees:
 *
 *   - **grants.** A driver is handed a tool list that is already filtered and,
 *     when it has to call back, a token that is already scoped. It never
 *     receives {@link https://…|CapabilityGrants}. A second enforcement point
 *     living inside an untrusted vendor is not defense in depth; it is a place
 *     for the check to be skipped.
 *   - **workspace paths.** Instructions arrive as one resolved string and
 *     files as content. Layering, VFS prefixes, skills directories and commit
 *     routing are workspace nouns and belong to the `agents` core service —
 *     see docs/agent-interface.md.
 *
 * Capabilities are declared, not assumed. Runtimes differ in where they live,
 * how tool calls get back to the workspace, whether they have a filesystem,
 * and whether a finished run can still be read; a caller reads
 * {@link AgentCapabilities} and a driver asked for something it lacks fails
 * loudly rather than degrading in silence.
 */

// ---------------------------------------------------------------------------
// Budgets
// ---------------------------------------------------------------------------

/** Default wall-clock budget for one run; override with `limits.wallClockMs`. */
export const DEFAULT_RUN_TIMEOUT_MS = 900_000;

/** Default turn cap. A loop with no cap is a bill with no cap. */
export const DEFAULT_MAX_TURNS = 32;

/** Cap on the resolved instruction string handed to a runtime. */
export const MAX_INSTRUCTIONS_BYTES = 200_000;

/** Cap on captured final output; the run reports the cut. */
export const MAX_OUTPUT_BYTES = 1_000_000;

/** Caps on inline files, for runtimes with no filesystem of their own. */
export const MAX_INLINE_FILES = 64;
export const MAX_INLINE_FILE_BYTES = 256_000;

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

/** Error with an HTTP-ish status for hosts that map errors onto responses. */
export class AgentError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "AgentError";
    this.status = status;
  }
}

// ---------------------------------------------------------------------------
// Capabilities
// ---------------------------------------------------------------------------

/**
 * Where the loop physically runs. This is the axis that decides everything
 * else — how tool calls get home, whether a browser-resident sandbox can be
 * offered to it, and what a cancel actually does.
 *
 * - `in-gateway` — the loop is this process. Tool calls are in-process
 *   dispatch; there is no token to mint and no network to lose.
 * - `relayed` — the loop is a harness on a machine or a tab that dials the
 *   gateway and leases work. Reachable only while its agent is connected.
 * - `remote` — the loop is in a vendor's cloud. Reachable whenever the vendor
 *   is up, and it can reach *nothing* of ours that is not publicly dialable.
 */
export type AgentLocality = "in-gateway" | "relayed" | "remote";

/**
 * How a tool call gets from the model back to the workspace.
 *
 * - `in-process` — the runtime calls the gateway's dispatcher directly.
 * - `callback` — the runtime calls the workspace's tools API with the scoped
 *   token in {@link AgentCallback}. It needs the gateway to be dialable.
 * - `yield` — the runtime *pauses* and reports the calls it wants
 *   (`status: "awaiting_tools"`); the caller runs them and answers with
 *   `submitToolResults`. OpenAI Assistants' `requires_action` is this.
 * - `none` — the runtime has no tool loop at all (a completion in a costume).
 *
 * `yield` is the shape to prefer for a `remote` runtime: it needs no inbound
 * reachability and it puts every tool call back through the one chokepoint
 * that already holds the credentials.
 */
export type AgentToolTransport = "in-process" | "callback" | "yield" | "none";

export interface AgentCapabilities {
  locality: AgentLocality;
  toolTransport: AgentToolTransport;
  /**
   * The driver implements `readFile`/`writeFile`/`listFiles` over a working
   * directory the run can see. This is what lets the gateway materialize a
   * skills or docs mount as real files instead of as tool calls.
   */
  filesystem: boolean;
  /** `listFiles` returns real content hashes, so manifest diffing works. */
  hashes: boolean;
  /** `run` accepts `files` — a handful of documents, inline. */
  inlineFiles: boolean;
  /** A run outlives the `run` call and `get` can still read it afterwards. */
  resumable: boolean;
  cancellable: boolean;
  streaming: boolean;
  /** The caller may name the model; false means the runtime owns that choice. */
  modelSelectable: boolean;
  /** `run` accepts `setup` — a command executed before the loop starts. */
  setupCommand: boolean;
  /** Effort levels this runtime can actually distinguish. */
  effortLevels: AgentEffort[];
}

export const NO_AGENT_CAPABILITIES: AgentCapabilities = {
  locality: "remote",
  toolTransport: "none",
  filesystem: false,
  hashes: false,
  inlineFiles: false,
  resumable: false,
  cancellable: false,
  streaming: false,
  modelSelectable: false,
  setupCommand: false,
  effortLevels: ["medium"],
};

export function assertCapability(
  capabilities: AgentCapabilities,
  capability: keyof AgentCapabilities,
  provider: string,
): void {
  if (!capabilities[capability]) {
    throw new AgentError(`${provider} does not support "${capability}"`, 501);
  }
}

// ---------------------------------------------------------------------------
// Effort
// ---------------------------------------------------------------------------

/**
 * How hard to try, as a five-step ordinal.
 *
 * Vendors expose this differently and incompatibly: Anthropic's Messages API
 * takes a `thinking.budget_tokens` integer, OpenAI's takes a `reasoning.effort`
 * enum, a harness takes a turn cap and a model tier. Carrying any one of those
 * in the contract would make it that vendor's wrapper — and a driver whose
 * vendor has three discrete levels would have to bucket a number anyway.
 * Bucketing is what an ordinal already is, so the contract carries the bucket
 * and each driver maps it onto its own knob.
 *
 * A driver reports what it actually did in {@link AgentRun.effortApplied}, so
 * "I asked for max and got medium" is visible rather than inferred.
 *
 * Anything genuinely vendor-specific rides `providerOptions`, untranslated.
 */
export type AgentEffort = "minimal" | "low" | "medium" | "high" | "max";

export const AGENT_EFFORTS: readonly AgentEffort[] = [
  "minimal",
  "low",
  "medium",
  "high",
  "max",
];

/**
 * Snap a requested effort onto the nearest level a runtime can distinguish.
 *
 * Ties round *down*: a runtime offering `{low, high}` asked for `medium`
 * answers `low`. Rounding up would make "medium" quietly the most expensive
 * setting on every two-level backend, which is the wrong direction for a knob
 * whose whole purpose is cost.
 */
export function nearestEffort(
  requested: AgentEffort,
  supported: readonly AgentEffort[],
): AgentEffort {
  if (supported.length === 0) return requested;
  if (supported.includes(requested)) return requested;
  const target = AGENT_EFFORTS.indexOf(requested);
  let best = supported[0]!;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const level of supported) {
    const index = AGENT_EFFORTS.indexOf(level);
    if (index === -1) continue;
    const distance = Math.abs(index - target);
    // `<` rather than `<=`, scanning low→high, keeps the lower level on a tie.
    if (distance < bestDistance || (distance === bestDistance && index < AGENT_EFFORTS.indexOf(best))) {
      best = level;
      bestDistance = distance;
    }
  }
  return best;
}

// ---------------------------------------------------------------------------
// What the run is given
// ---------------------------------------------------------------------------

export interface AgentMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

/**
 * One tool the runtime may offer the model.
 *
 * This list is a *projection* of the caller's grants, computed by the gateway
 * before dispatch — never the grants themselves. A runtime needs to know which
 * tools exist so it can describe them to the model; it has no business knowing
 * why the list is the length it is.
 */
export interface AgentToolDescriptor {
  /** Fully-qualified call name, e.g. `vfs.read`, `sandboxes.exec`. */
  name: string;
  description?: string;
  inputSchema?: Record<string, unknown>;
}

/**
 * Where a `callback`-transport runtime sends its tool calls, and the token it
 * presents. The token is minted per run, carries the run's grants, and expires
 * with the run's wall-clock budget — so a leaked one is bounded in both reach
 * and time without the driver knowing either bound.
 */
export interface AgentCallback {
  /** Tools API root, e.g. `https://…/api/gateway/tools`. */
  url: string;
  token: string;
  expiresAt?: string;
}

/**
 * Bounds on one run. Which side can actually *enforce* each of these differs,
 * and pretending otherwise is how a budget becomes a suggestion:
 *
 * | limit          | enforced by                                          |
 * | -------------- | ---------------------------------------------------- |
 * | `wallClockMs`  | both — the caller holds a hard deadline and `cancel`  |
 * | `maxTurns`     | the driver; only it counts turns                     |
 * | `maxToolCalls` | the caller, for `yield`/`callback` transports         |
 * | `maxTokens`    | the driver; the caller sees usage only when told      |
 * | `maxOutputBytes` | both, as a truncation                              |
 *
 * A driver that ignores a budget is not detectable from the outside. The
 * bounds that hold against a hostile or broken one are wall clock, the
 * callback token's TTL, and the tool chokepoint — everything else is a good
 * driver cooperating.
 */
export interface AgentLimits {
  wallClockMs?: number;
  maxTurns?: number;
  maxToolCalls?: number;
  /** Total tokens across the whole run, not per request. */
  maxTokens?: number;
  maxOutputBytes?: number;
}

/** A file handed to a runtime that has no filesystem of its own. */
export interface AgentFile {
  path: string;
  content: string;
  /** `utf8` unless the body is not valid text. */
  encoding?: "utf8" | "base64";
}

export interface AgentRunArgs {
  /**
   * The system prompt — **one resolved string**.
   *
   * Profiles compose theirs from layers and workspace files; that composition
   * happens before dispatch, because a driver that understood layering would
   * be a driver that understood workspace paths.
   */
  instructions?: string;
  /** The task. A string is shorthand for one user message. */
  input: string | AgentMessage[];
  /** Only meaningful when `capabilities.modelSelectable`. */
  model?: string;
  effort?: AgentEffort;
  limits?: AgentLimits;
  /** Grant-filtered tool list; absent means "no tools". */
  tools?: AgentToolDescriptor[];
  /** Required when `capabilities.toolTransport === "callback"`. */
  callback?: AgentCallback;
  /** Inline documents (skills, style guides) for `inlineFiles` runtimes. */
  files?: AgentFile[];
  /** Working directory for `filesystem` runtimes. */
  workdir?: string;
  /** Command run before the loop starts; needs `capabilities.setupCommand`. */
  setup?: string;
  env?: Record<string, string>;
  /** Continue a previous run's context, where the runtime keeps one. */
  session?: string;
  stream?: boolean;
  /** Opaque labels echoed back on the run, for correlation. */
  metadata?: Record<string, string>;
  /**
   * Vendor-specific settings passed through untranslated. The escape hatch
   * that keeps the normalized fields above from growing a union of every
   * vendor's knobs.
   */
  providerOptions?: Record<string, unknown>;
  /** Binding option defaults are merged in here by the gateway. */
  [option: string]: unknown;
}

// ---------------------------------------------------------------------------
// What comes back
// ---------------------------------------------------------------------------

/**
 * `suspended` is **reserved and not yet emitted by any runtime.** It is the
 * seam for a run that cannot proceed because a resource it needs went away —
 * the motivating case being a browser-resident sandbox whose tab closed (see
 * docs/agent-interface.md). It is in the vocabulary from day one because
 * adding a status later means every driver and every consumer has to learn
 * one; treating an unknown status as a failure is the safe default until a
 * runtime actually emits it.
 */
export type AgentRunStatus =
  | "queued"
  | "running"
  | "awaiting_tools"
  | "suspended"
  | "succeeded"
  | "failed"
  | "cancelled";

export type AgentStopReason =
  | "completed"
  | "max_turns"
  | "max_tokens"
  | "max_tool_calls"
  | "wall_clock"
  | "cancelled"
  | "tool_denied"
  | "error";

export interface AgentUsage {
  inputTokens?: number;
  outputTokens?: number;
  reasoningTokens?: number;
  totalTokens?: number;
  turns?: number;
  toolCalls?: number;
  /** Vendor-reported cost, when the vendor reports one. */
  costUsd?: number;
}

export interface AgentToolCall {
  id: string;
  name: string;
  arguments?: unknown;
  /** Present once the call has been answered. */
  result?: unknown;
  error?: string;
  durationMs?: number;
}

/** A tool call the runtime is waiting on (`yield` transport). */
export interface AgentPendingToolCall {
  id: string;
  name: string;
  arguments?: unknown;
}

export interface AgentToolResult {
  id: string;
  result?: unknown;
  error?: string;
}

export interface AgentTurn {
  index: number;
  at: string;
  kind: "assistant" | "tool" | "thinking";
  text?: string;
  toolCalls?: AgentToolCall[];
  usage?: AgentUsage;
}

export interface AgentRun {
  /** Runtime-native run id; the workspace keeps its own alongside it. */
  id: string;
  status: AgentRunStatus;
  startedAt: string;
  finishedAt?: string;
  durationMs?: number;
  /** The final assistant message, capped at {@link MAX_OUTPUT_BYTES}. */
  output?: string;
  truncated?: boolean;
  turns?: AgentTurn[];
  usage?: AgentUsage;
  stopReason?: AgentStopReason;
  /** `yield` transport: the calls the caller must run and submit back. */
  pending?: AgentPendingToolCall[];
  /**
   * The effort the driver actually applied, in its own words
   * (`thinking.budget_tokens=8000`, `reasoning.effort=high`). Requested
   * effort is an ordinal; this is what became of it.
   */
  effortApplied?: string;
  error?: { message: string; code?: string };
  /** Runtime-native identifiers a caller may need for support escalation. */
  meta?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// The driver
// ---------------------------------------------------------------------------

/** Listing entry over a runtime's working directory. `hash` is sha256 hex. */
export interface AgentFileEntry {
  path: string;
  hash: string;
  size: number;
  updatedAt?: string;
}

export interface AgentFileBody extends AgentFileEntry {
  content: string;
  encoding: "utf8" | "base64";
}

/**
 * The operation surface.
 *
 * The three file ops are deliberately named and shaped to match
 * `@utdk/sandbox`'s. That is not tidiness: the gateway's mount machinery
 * (`apps/workspace/src/sandboxes/mounts.ts`) is written against exactly
 * `writeFile` / `readFile` / `listFiles` taking `{ id, path, … }`, so a
 * `filesystem: true` agent driver is a valid target for it with no adapter —
 * which is how a skills directory gets into a runtime that lives somewhere
 * else, and how anything it wrote gets back out.
 */
export interface AgentDriver {
  capabilities: AgentCapabilities;
  run(args: AgentRunArgs): Promise<AgentRun>;
  get(args: { id: string }): Promise<AgentRun | undefined>;
  cancel(args: { id: string }): Promise<{ cancelled: boolean }>;
  /** Required when `toolTransport === "yield"`. */
  submitToolResults?(args: { id: string; results: AgentToolResult[] }): Promise<AgentRun>;
  /** The three below are required when `capabilities.filesystem`. */
  readFile?(args: { id: string; path: string }): Promise<AgentFileBody>;
  writeFile?(args: {
    id: string;
    path: string;
    content: string;
    encoding?: "utf8" | "base64";
  }): Promise<AgentFileEntry>;
  listFiles?(args: { id: string; path?: string }): Promise<AgentFileEntry[]>;
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

export interface AgentClientOptions {
  /** Injected headers; the secret rides `Authorization: Bearer …`. */
  headers?: Record<string, string>;
  /** API root override; undefined = the provider module's own default. */
  baseUrl?: string;
  /** Injection point for tests. */
  fetchImpl?: typeof fetch;
}

/**
 * Pull the provider secret out of the injected headers (the UTDK executor
 * translates a `bearer_token` credential into `Authorization: Bearer …`).
 */
export function secretFromHeaders(
  headers: Record<string, string> | undefined,
  provider: string,
  secretName = "API token",
): string {
  const raw = headers?.["Authorization"] ?? headers?.["authorization"] ?? "";
  const match = /^Bearer\s+(.+)$/iu.exec(raw);
  if (!match?.[1]) {
    throw new AgentError(
      `${provider} needs a bearer_token credential holding the ${secretName}. Add one for provider "${provider}".`,
      400,
    );
  }
  return match[1];
}

/** Normalize `input` to a message list; a bare string is one user turn. */
export function inputMessages(args: AgentRunArgs): AgentMessage[] {
  if (typeof args.input === "string") {
    return [{ role: "user", content: args.input }];
  }
  return args.input;
}

export function validateRunArgs(args: AgentRunArgs): void {
  const hasText = typeof args.input === "string" && args.input.trim().length > 0;
  const hasMessages = Array.isArray(args.input) && args.input.length > 0;
  if (!hasText && !hasMessages) {
    throw new AgentError('run requires { input: "…" } or { input: [{ role, content }] }', 400);
  }
  if (Array.isArray(args.input)) {
    for (const message of args.input) {
      if (!message || typeof message.content !== "string") {
        throw new AgentError("each input message needs { role, content }", 400);
      }
    }
  }
  if (args.instructions !== undefined && typeof args.instructions !== "string") {
    throw new AgentError("instructions must be a single resolved string", 400);
  }
  if ((args.instructions?.length ?? 0) > MAX_INSTRUCTIONS_BYTES) {
    throw new AgentError(
      `instructions exceed ${MAX_INSTRUCTIONS_BYTES} bytes — compose fewer layers, or hand the rest over as files`,
      413,
    );
  }
  if (args.effort !== undefined && !AGENT_EFFORTS.includes(args.effort)) {
    throw new AgentError(`effort must be one of: ${AGENT_EFFORTS.join(", ")}`, 400);
  }
  if (args.files) {
    if (args.files.length > MAX_INLINE_FILES) {
      throw new AgentError(
        `${args.files.length} inline files exceeds the cap of ${MAX_INLINE_FILES}. ` +
          "A set this size wants a filesystem runtime and a mount, not inlining.",
        413,
      );
    }
    for (const file of args.files) {
      if (!file || typeof file.path !== "string" || typeof file.content !== "string") {
        throw new AgentError("each file needs { path, content }", 400);
      }
      if (file.content.length > MAX_INLINE_FILE_BYTES) {
        throw new AgentError(`${file.path} exceeds the ${MAX_INLINE_FILE_BYTES}-byte inline cap`, 413);
      }
    }
  }
}

/**
 * Check a run request against what the runtime can actually do, before
 * anything is spent. Every branch here is a promise the gateway would
 * otherwise make on the driver's behalf and silently break — the same rule
 * `@utdk/sandbox` applies to `expose` on a host without ports.
 */
export function assertRunSupported(
  capabilities: AgentCapabilities,
  provider: string,
  args: AgentRunArgs,
): void {
  if (args.model && !capabilities.modelSelectable) {
    throw new AgentError(
      `${provider} chooses its own model — remove \`model\`, or bind a runtime that takes one`,
      400,
    );
  }
  if (args.setup && !capabilities.setupCommand) {
    throw new AgentError(
      `${provider} has no environment to run \`setup\` in (it is not a filesystem runtime)`,
      501,
    );
  }
  if (args.files?.length && !capabilities.inlineFiles && !capabilities.filesystem) {
    throw new AgentError(
      `${provider} cannot be given files — expose them as vfs tools instead`,
      501,
    );
  }
  if (args.stream && !capabilities.streaming) {
    throw new AgentError(`${provider} does not stream`, 501);
  }
  if (args.tools?.length && capabilities.toolTransport === "none") {
    throw new AgentError(`${provider} has no tool loop — it cannot be given tools`, 501);
  }
  if (capabilities.toolTransport === "callback" && args.tools?.length && !args.callback) {
    throw new AgentError(
      `${provider} calls tools back over HTTP and needs { callback: { url, token } }`,
      400,
    );
  }
}

/** The run's wall-clock budget: the caller's, else {@link DEFAULT_RUN_TIMEOUT_MS}. */
export function runTimeout(args: AgentRunArgs): number {
  const requested = args.limits?.wallClockMs;
  return typeof requested === "number" && requested > 0 ? requested : DEFAULT_RUN_TIMEOUT_MS;
}

/** The run's turn cap: the caller's, else {@link DEFAULT_MAX_TURNS}. */
export function maxTurns(args: AgentRunArgs): number {
  const requested = args.limits?.maxTurns;
  return typeof requested === "number" && requested > 0 ? requested : DEFAULT_MAX_TURNS;
}

/** Cut captured output to the run's cap, reporting whether it was cut. */
export function clampOutput(
  value: string | undefined,
  limits?: AgentLimits,
): { text: string; truncated: boolean } {
  const cap = limits?.maxOutputBytes && limits.maxOutputBytes > 0
    ? Math.min(limits.maxOutputBytes, MAX_OUTPUT_BYTES)
    : MAX_OUTPUT_BYTES;
  const text = value ?? "";
  if (text.length <= cap) return { text, truncated: false };
  return { text: text.slice(0, cap), truncated: true };
}

/** Terminal states — a run in one of these will never change again. */
export function isTerminal(status: AgentRunStatus): boolean {
  return status === "succeeded" || status === "failed" || status === "cancelled";
}

// ---------------------------------------------------------------------------
// Discovery
// ---------------------------------------------------------------------------

const RUN_ID = { type: "string", description: "Run id returned by run" } as const;

/**
 * Tool-discovery entries for an agent runtime — the static `tools` export the
 * gateway's `GET /tools` prefers over runtime metadata.
 *
 * Like `@utdk/llm`'s, these are **binding-neutral**: the contract knows the
 * whole surface, so it can describe itself without an implementation being
 * resolvable. That matters more here than it does for `sql`, because the
 * default implementation of `agent` is the gateway's own runtime, which has no
 * module to load and no credential to be connected by.
 *
 * These describe the *raw driver*. The workspace-facing surface — profiles,
 * grants, instruction layers, mounts, entrypoints — belongs to the `agents`
 * core service and is advertised there.
 */
export function agentToolEntries(
  provider: string,
  details: {
    label?: string;
    capabilities?: AgentCapabilities;
    /**
     * Describe the generic `agent` namespace rather than one implementation.
     *
     * Without this the label falls back to the namespace itself, and every
     * description reads "start an agent loop on agent" — the model's tool
     * list is the one place a placeholder like that is guaranteed to be read.
     */
    interfaceNamespace?: boolean;
  } = {},
): Array<{ name: string; description: string; inputSchema: Record<string, unknown> }> {
  const interfaceNs =
    details.interfaceNamespace === true || provider === "agent" || provider.startsWith("agent:");
  // "on the workspace's bound runtime" reads correctly wherever the binding
  // points; a concrete provider names itself.
  const label = details.label ?? (interfaceNs ? "the workspace's bound runtime" : provider);
  const capabilities = details.capabilities;
  const efforts = capabilities?.effortLevels ?? AGENT_EFFORTS;

  const entries: Array<{ name: string; description: string; inputSchema: Record<string, unknown> }> = [
    {
      name: `${provider}.run`,
      description:
        `Start an agent loop on ${label} and return the run: { id, status, output, turns, usage, stopReason }. ` +
        "instructions is the system prompt; input is the task; tools is the list the model may call. " +
        `Limits bound the run (${DEFAULT_MAX_TURNS} turns and ${Math.round(DEFAULT_RUN_TIMEOUT_MS / 1000)}s by default).`,
      inputSchema: {
        type: "object",
        properties: {
          instructions: { type: "string", description: "System prompt (one resolved string)" },
          input: {
            description: "The task: a string, or a [{ role, content }] message list",
            anyOf: [
              { type: "string" },
              {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    role: { type: "string", enum: ["user", "assistant", "system"] },
                    content: { type: "string" },
                  },
                  required: ["role", "content"],
                },
              },
            ],
          },
          model: { type: "string", description: "Model id, when the runtime takes one" },
          effort: {
            type: "string",
            enum: [...efforts],
            description: "How hard to try; the runtime maps this onto its own knob",
          },
          tools: {
            type: "array",
            description: "Tools the model may call; already filtered by the caller's grants",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                description: { type: "string" },
                inputSchema: { type: "object" },
              },
              required: ["name"],
            },
          },
          limits: {
            type: "object",
            properties: {
              wallClockMs: { type: "number" },
              maxTurns: { type: "number" },
              maxToolCalls: { type: "number" },
              maxTokens: { type: "number" },
              maxOutputBytes: { type: "number" },
            },
          },
          files: {
            type: "array",
            description: "Inline documents (skills, style guides) for runtimes with no filesystem",
            items: {
              type: "object",
              properties: { path: { type: "string" }, content: { type: "string" } },
              required: ["path", "content"],
            },
          },
          setup: { type: "string", description: "Command run before the loop (filesystem runtimes)" },
          env: { type: "object" },
          session: { type: "string", description: "Continue a previous run's context" },
          metadata: { type: "object", description: "Opaque labels echoed back on the run" },
          providerOptions: { type: "object", description: "Vendor-specific settings, untranslated" },
        },
        required: ["input"],
      },
    },
    {
      name: `${provider}.get`,
      description:
        `Read one run on ${label}: status, turns so far, usage, and — once it has stopped — its output and stopReason.`,
      inputSchema: { type: "object", properties: { id: RUN_ID }, required: ["id"] },
    },
    {
      name: `${provider}.cancel`,
      description: `Stop a running agent loop on ${label}. Work already committed by its tool calls stands.`,
      inputSchema: { type: "object", properties: { id: RUN_ID }, required: ["id"] },
    },
  ];

  if (!capabilities || capabilities.toolTransport === "yield") {
    entries.push({
      name: `${provider}.submitToolResults`,
      description:
        `Answer the tool calls a paused run on ${label} is waiting on (status "awaiting_tools") and let it continue.`,
      inputSchema: {
        type: "object",
        properties: {
          id: RUN_ID,
          results: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string", description: "Tool call id from run.pending" },
                result: {},
                error: { type: "string" },
              },
              required: ["id"],
            },
          },
        },
        required: ["id", "results"],
      },
    });
  }

  if (capabilities?.filesystem) {
    entries.push(
      {
        name: `${provider}.readFile`,
        description: `Read one file from a run's working directory on ${label}.`,
        inputSchema: {
          type: "object",
          properties: { id: RUN_ID, path: { type: "string" } },
          required: ["id", "path"],
        },
      },
      {
        name: `${provider}.writeFile`,
        description: `Write one file into a run's working directory on ${label} (parents created).`,
        inputSchema: {
          type: "object",
          properties: {
            id: RUN_ID,
            path: { type: "string" },
            content: { type: "string" },
            encoding: { type: "string", enum: ["utf8", "base64"] },
          },
          required: ["id", "path", "content"],
        },
      },
      {
        name: `${provider}.listFiles`,
        description:
          `List files under a path in a run's working directory on ${label}, with content hashes ` +
          "— the manifest the workspace diffs against to find what the agent changed.",
        inputSchema: {
          type: "object",
          properties: { id: RUN_ID, path: { type: "string" } },
          required: ["id"],
        },
      },
    );
  }

  return entries;
}
