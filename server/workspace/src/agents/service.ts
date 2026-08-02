/**
 * `agents` core service — named agent profiles (docs/telemetry-and-agents.md).
 *
 * An agent is configuration, not code: which LLM to use, what system prompt
 * to run with, and — the important part — a {@link CapabilityGrants} bounding
 * what its runs may touch: tool patterns (native + provider SDKs) and
 * workspace-VFS path prefixes with ro/rw access.
 *
 * Profiles live at `.services/agents/<name>.json` on the workspace FS (same
 * plane as workflow registrations — versioned, syncable, inspectable). The
 * workflow runner resolves a profile when a run is agent-attributed
 * (`workflows.run {name, agent}` or a registration's `agent` field), pins the
 * run's ServiceContext to the profile's grants, and exposes the profile to
 * the script as the `agent` global. Isolation composes with VCS: grants
 * bound what a run *can* touch, its draft session bounds what it *does*
 * touch until someone applies it.
 */

import { AGENT_EFFORTS, type AgentEffort } from "@utdk/agent";
import { getFsStore } from "../fs-store.js";
import {
  deleteSvcRecord,
  listSvcRecords,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "../svc-records.js";
import { parseGrants, type CapabilityGrants } from "../grants.js";
import { parseInterfaceNamespace, resolveInterfaceForWorkspace } from "../interfaces.js";
import { parseMounts } from "../sandboxes/mounts.js";
import { requireSandbox, type RepoMountRef } from "../sandboxes/store.js";
import { ServiceError, type CoreService, type ServiceContext } from "../service-kernel.js";
import { listRepoFiles, readRepoFile } from "../vcs/mounts.js";
import { visibleEntries } from "../vcs/store.js";
import {
  parseLlmTier,
  selectLlmInstance,
  type AgentModelPolicy,
  type LlmCandidateMeta,
} from "./policy.js";

const AGENTS_SCOPE = svcScope("agents");
const NAME_RE = /^[a-z0-9][a-z0-9-]{0,63}$/u;

/**
 * A profile mount: the sandbox mount vocabulary (`sandboxes/mounts.ts`),
 * minus the sync bookkeeping a sandbox record carries — a profile declares
 * *what* is mounted; how it reaches a runtime is that runtime's rung on the
 * mounts ladder (docs/agent-interface.md).
 */
export interface AgentMount {
  path: string;
  /** Workspace VFS prefix, a `github:` repo spec, or null for scratch. */
  source: string | null;
  /** Absent means `vfs`. */
  kind?: "vfs" | "repo";
  /** Parsed repo reference, present exactly when `kind` is "repo". */
  repo?: RepoMountRef;
  mode: "ro" | "rw";
}

export interface AgentProfile {
  name: string;
  title?: string;
  /**
   * The `llm` interface instance this agent's runs resolve through — `llm`
   * (the workspace default), or a named one like `llm:fast`. This is the
   * same swappable-implementation mechanism sandboxes use: an agent picks a
   * *bound, credentialed instance*, not a provider it hopes is connected.
   *
   * `provider`/`model` below predate instances and still work — they pin the
   * implementation directly, ignoring whatever the instance is bound to.
   */
  llm?: string;
  /** LLM provider id (synthetic.new, openai, …) the agent's runs should use. */
  provider?: string;
  model?: string;
  /** System prompt for the agent's LLM calls. */
  prompt?: string;
  grants?: CapabilityGrants;
  /**
   * Cost/speed policy for runs (agents/policy.ts): effort default, a cost
   * cap over candidates' declared prices, and a deadline that both prefers
   * the fast tier at selection time and caps the run's wall clock.
   */
  policy?: AgentModelPolicy;
  /**
   * `llm` instances the policy may choose between (e.g. ["llm:fast",
   * "llm:deep"]) — each carries its own tier/cost metadata in its binding
   * options. When present, selection wins over `llm`; when selection comes
   * up empty (cost cap excluded everything), `llm` is the fallback.
   */
  llmCandidates?: string[];
  /**
   * Workspace files a run should see, in the sandbox mount vocabulary and
   * validated against `grants.paths` exactly as `sandboxes.create` mounts
   * are. How they reach the runtime is the runtime's ladder rung: the
   * native runner renders small text bodies as an instruction layer; a
   * filesystem runtime will materialize them for real.
   */
  mounts?: AgentMount[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Validate an agent's `llm` field: it must name an instance of the `llm`
 * interface. Binding an agent to `sql:analytics` is a configuration error
 * worth catching at write time.
 */
function parseAgentLlm(value: unknown): string | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const namespace = typeof value === "string" ? value : "";
  const parsed = parseInterfaceNamespace(namespace);
  if (!parsed || parsed.interfaceId !== "llm") {
    throw new ServiceError(
      `llm must name an llm interface instance (e.g. "llm" or "llm:fast"), got: ${namespace}`,
      400,
    );
  }
  return namespace;
}

function parseAgentLlmCandidates(value: unknown): string[] | undefined {
  if (value === undefined || value === null) return undefined;
  if (!Array.isArray(value) || value.length === 0) {
    throw new ServiceError(
      'llmCandidates must be a non-empty array of llm instance names (["llm:fast", "llm:deep"])',
      400,
    );
  }
  return value.map((entry) => {
    const parsed = parseAgentLlm(entry);
    if (!parsed) {
      throw new ServiceError(`llmCandidates entries must name llm instances, got: ${String(entry)}`, 400);
    }
    return parsed;
  });
}

function parseAgentPolicy(value: unknown): AgentModelPolicy | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "object" || Array.isArray(value)) {
    throw new ServiceError("policy must be an object { effort?, maxCostUsd?, deadlineMs? }", 400);
  }
  const input = value as Record<string, unknown>;
  const policy: AgentModelPolicy = {};
  if (input["effort"] !== undefined) {
    if (!AGENT_EFFORTS.includes(input["effort"] as AgentEffort)) {
      throw new ServiceError(`policy.effort must be one of: ${AGENT_EFFORTS.join(", ")}`, 400);
    }
    policy.effort = input["effort"] as AgentEffort;
  }
  for (const key of ["maxCostUsd", "deadlineMs"] as const) {
    if (input[key] === undefined) continue;
    const raw = Number(input[key]);
    if (!Number.isFinite(raw) || raw <= 0) {
      throw new ServiceError(`policy.${key} must be a positive number`, 400);
    }
    policy[key] = raw;
  }
  return Object.keys(policy).length > 0 ? policy : undefined;
}

/**
 * Validate + normalize profile mounts by reusing the sandbox parser — same
 * vocabulary, same grant check (`grants.paths` bounds what may be mounted,
 * `ro` grants cannot produce `rw` mounts) — then drop the sync bookkeeping
 * a profile has no use for.
 */
function parseAgentMounts(
  value: unknown,
  grants: CapabilityGrants | undefined,
): AgentMount[] | undefined {
  const parsed = parseMounts(value, grants);
  if (parsed.length === 0) return undefined;
  return parsed.map(({ path, source, mode, kind, repo }) => ({
    path,
    source,
    mode,
    ...(kind === "repo" ? { kind, ...(repo ? { repo } : {}) } : {}),
  }));
}

export async function readAgentProfile(
  workspaceId: string,
  name: string,
): Promise<AgentProfile | undefined> {
  if (!NAME_RE.test(name)) return undefined;
  return readSvcRecord<AgentProfile>(workspaceId, AGENTS_SCOPE, name).catch(() => undefined);
}

function optionalString(value: unknown, cap: number): string | undefined {
  return typeof value === "string" && value.trim() ? value.slice(0, cap) : undefined;
}

// ---------------------------------------------------------------------------
// Rendering — profile → contract args (docs/agent-interface.md "Profile or
// contract"). Everything below the dispatch line speaks @utdk/agent
// vocabulary; instance names, grant patterns and VFS prefixes never cross it.
// ---------------------------------------------------------------------------

/**
 * Caps on the inline mount rendering. Deliberately far below the contract's
 * MAX_INSTRUCTIONS_BYTES: this rung of the mounts ladder is for a handful of
 * skills/docs files, and hitting the cap is how someone finds out their
 * profile wants a filesystem runtime instead.
 */
const MOUNT_FILE_CAP_BYTES = 32_000;
const MOUNT_TOTAL_CAP_BYTES = 100_000;

/**
 * Render a profile's mounts as one instruction layer: small text bodies read
 * from the workspace VFS, headed by their in-mount path. This is the inline
 * rung of the mounts ladder — the native runner has no filesystem to
 * materialize into, so the files ride the system context. A future harness
 * runtime (`filesystem: true`) materializes the same declarations for real
 * through sandboxes/mounts.ts instead.
 */
async function renderMountLayer(
  workspaceId: string,
  mounts: AgentMount[] | undefined,
): Promise<string | undefined> {
  if (!mounts?.length) return undefined;
  const store = getFsStore();
  const sections: string[] = [];
  let budget = MOUNT_TOTAL_CAP_BYTES;

  const push = (path: string, size: number, content: string | undefined): void => {
    if (content === undefined) return;
    if (size > MOUNT_FILE_CAP_BYTES || size > budget) {
      sections.push(`### ${path}\n(omitted: ${size} bytes exceeds the inline mount cap)`);
      return;
    }
    budget -= size;
    sections.push(`### ${path}\n${content}`);
  };

  for (const mount of mounts) {
    // A scratch mount (source: null) is working space; it has no workspace
    // content to render.
    if (!mount.source) continue;

    // A repo mount renders through the same GitHub tree-API read path VFS
    // git mounts use — this rung of the ladder is a read-only snapshot; a
    // filesystem runtime (machine sandbox) gets the real clone instead.
    if (mount.kind === "repo" && mount.repo) {
      const listing = await listRepoFiles(workspaceId, mount.repo).catch(() => []);
      for (const entry of listing) {
        if (entry.size > MOUNT_FILE_CAP_BYTES) {
          push(`${mount.path}/${entry.path}`, entry.size, "");
          continue;
        }
        const file = await readRepoFile(workspaceId, mount.repo, entry.path).catch(
          () => undefined,
        );
        if (file) push(`${mount.path}/${entry.path}`, file.size, file.content);
      }
      continue;
    }

    const entries = await visibleEntries(workspaceId, mount.source).catch(() => []);
    for (const entry of entries) {
      const rel = entry.path === mount.source ? "" : entry.path.slice(mount.source.length + 1);
      if (!rel) continue;
      const file = await store.read(workspaceId, entry.path).catch(() => undefined);
      if (!file) continue;
      push(`${mount.path}/${rel}`, file.size, file.content);
    }
  }
  if (sections.length === 0) return undefined;
  return `## Mounted files (read-only reference)\n\n${sections.join("\n\n")}`;
}

/**
 * Pick the `llm` instance a run thinks with. Candidates resolve through
 * `resolveInterfaceForWorkspace` so their binding options (`tier`,
 * `costPerMTokUsd`) feed the pure selector; an unbound candidate is skipped
 * rather than fatal — the profile lists preferences, not requirements.
 * Fallback order: selection → `profile.llm` → the default `llm` instance
 * (by leaving the redirection unset).
 */
async function selectRunLlm(
  workspaceId: string,
  profile: AgentProfile,
  effort: AgentEffort | undefined,
): Promise<string | undefined> {
  if (!profile.llmCandidates?.length) return profile.llm;
  const candidates: LlmCandidateMeta[] = [];
  for (const instance of profile.llmCandidates) {
    try {
      const resolved = await resolveInterfaceForWorkspace(workspaceId, instance);
      candidates.push({
        instance,
        tier: parseLlmTier(resolved.options["tier"]),
        ...(typeof resolved.options["costPerMTokUsd"] === "number"
          ? { costPerMTokUsd: resolved.options["costPerMTokUsd"] }
          : {}),
      });
    } catch {
      // Unbound or unresolvable candidate: not eligible, not an error.
    }
  }
  return (
    selectLlmInstance(candidates, { ...profile.policy, ...(effort ? { effort } : {}) }) ??
    profile.llm
  );
}

/**
 * The tool projection a sandbox-bound run gets on top of its profile: enough
 * to work inside the box (shell, files, change inspection), nothing that
 * routes changes out of it — commit and destroy stay with the scheduler.
 */
const SANDBOX_RUN_TOOLS = [
  "sandboxes.exec",
  "sandboxes.read",
  "sandboxes.write",
  "sandboxes.tree",
];

/** What a sandbox-bound run needs to know about its box. */
export interface RunSandboxContext {
  id: string;
  workdir: string;
  mounts: string[];
}

function renderSandboxLayer(sandbox: RunSandboxContext): string {
  const mounts = sandbox.mounts.length > 0 ? sandbox.mounts.join(", ") : "(none)";
  return [
    "## Sandbox",
    `You are working inside sandbox "${sandbox.id}" (workdir ${sandbox.workdir}; mounts: ${mounts}).`,
    `Run shell commands with call_tool { namespace: "sandboxes", operation: "exec", args: { id: "${sandbox.id}", command, cwd? } } — cwd is relative to the workdir, so a mount path works directly.`,
    `Read and write files with sandboxes.read / sandboxes.write ({ id: "${sandbox.id}", path, content? }), and inspect what you have changed with sandboxes.tree ({ id: "${sandbox.id}" }).`,
    "Git-cloned mounts are real checkouts: branch, commit, and push with ordinary git commands through sandboxes.exec.",
  ].join("\n");
}

/**
 * Render one run: profile + caller args → `@utdk/agent` run args plus the
 * ServiceContext the loop executes under. The context carries the security
 * side (grants, instance redirection, legacy provider pin); the args carry
 * only contract vocabulary.
 *
 * `sandbox` binds the run to an execution environment: the run's tool list
 * (and its grant boundary) is widened with {@link SANDBOX_RUN_TOOLS}, an
 * instruction layer tells the model which box it owns, and the run record
 * carries the sandbox id. The widening is deliberate and bounded: whoever
 * bound the sandbox held `sandboxes.*` reach himself, and the projection
 * gives the run a place to *work*, not a way to land changes — commit stays
 * with the caller.
 */
async function renderAgentRun(
  ctx: ServiceContext,
  profile: AgentProfile,
  args: Record<string, unknown>,
  sandbox?: RunSandboxContext,
): Promise<{ runArgs: Record<string, unknown>; runCtx: ServiceContext }> {
  // The task: a string or message list passes through; any other JSON
  // payload (the north-star's { diff }) is serialized into one user turn.
  const rawInput = args["input"];
  const input =
    typeof rawInput === "string" || Array.isArray(rawInput)
      ? rawInput
      : rawInput !== undefined && rawInput !== null
        ? JSON.stringify(rawInput)
        : "";

  // Instruction layers, composed in order into the contract's ONE string:
  // the profile's prompt, the sandbox binding, then the rendered mounts.
  const layers: string[] = [];
  if (profile.prompt) layers.push(profile.prompt);
  if (sandbox) layers.push(renderSandboxLayer(sandbox));
  const mountLayer = await renderMountLayer(ctx.workspaceId, profile.mounts);
  if (mountLayer) layers.push(mountLayer);
  const instructions = layers.join("\n\n");

  const effortRaw = args["effort"] ?? profile.policy?.effort;
  if (effortRaw !== undefined && !AGENT_EFFORTS.includes(effortRaw as AgentEffort)) {
    throw new ServiceError(`effort must be one of: ${AGENT_EFFORTS.join(", ")}`, 400);
  }
  const effort = effortRaw as AgentEffort | undefined;

  // The caller's limits, with the policy deadline as a wall-clock ceiling:
  // a profile-level deadline holds even when the caller asked for longer.
  const limits: Record<string, unknown> =
    args["limits"] && typeof args["limits"] === "object" && !Array.isArray(args["limits"])
      ? { ...(args["limits"] as Record<string, unknown>) }
      : {};
  const deadlineMs = profile.policy?.deadlineMs;
  if (deadlineMs) {
    const requested = typeof limits["wallClockMs"] === "number" ? limits["wallClockMs"] : deadlineMs;
    limits["wallClockMs"] = Math.min(requested, deadlineMs);
  }

  // The tool list is a *projection* of the grants — the explicit pattern
  // list, nothing more. No `grants.tools` means no tools: an absent axis is
  // permissive for a human-authored script, but a model choosing calls gets
  // nothing it was not explicitly granted. A sandbox-bound run additionally
  // gets the sandbox projection, or it could not touch the box it was
  // bound to.
  const toolPatterns = sandbox
    ? [...new Set([...(profile.grants?.tools ?? []), ...SANDBOX_RUN_TOOLS])]
    : profile.grants?.tools;
  const tools = toolPatterns?.length
    ? toolPatterns.map((pattern) => ({ name: pattern }))
    : undefined;

  const runArgs: Record<string, unknown> = {
    input,
    ...(instructions ? { instructions } : {}),
    ...(effort ? { effort } : {}),
    ...(Object.keys(limits).length > 0 ? { limits } : {}),
    ...(tools ? { tools } : {}),
    // Legacy `model` pin; the instance's binding default fills it otherwise.
    ...(profile.model ? { model: profile.model } : {}),
    ...(typeof args["session"] === "string" && args["session"]
      ? { session: args["session"] }
      : {}),
    metadata: { agent: profile.name, ...(sandbox ? { sandboxId: sandbox.id } : {}) },
  };

  // The dispatch-side boundary must agree with the tool list above, or the
  // model would be offered sandbox calls that invokeTool then denies.
  const grants =
    sandbox && profile.grants?.tools
      ? { ...profile.grants, tools: [...new Set([...profile.grants.tools, ...SANDBOX_RUN_TOOLS])] }
      : profile.grants;

  const llmInstance = await selectRunLlm(ctx.workspaceId, profile, effort);
  const runCtx: ServiceContext = {
    ...ctx,
    // The profile is the run's boundary — it replaces the caller's grants
    // exactly as agent attribution does on a workflow run: a sub-agent runs
    // with its own profile's reach, not its spawner's.
    ...(grants ? { grants } : {}),
    ...(llmInstance
      ? { interfaceInstances: { ...ctx.interfaceInstances, llm: llmInstance } }
      : {}),
    // Legacy provider pin: overrides the instance's implementation the way
    // a registration's `bindings` would.
    ...(profile.provider
      ? { interfaceBindings: { ...ctx.interfaceBindings, llm: profile.provider } }
      : {}),
  };
  return { runArgs, runCtx };
}

export const agentsService: CoreService = {
  meta: {
    label: "Agents",
    blurb: "Agent profiles, capability grants and their executions",
    icon: "bot",
  },
  tools: [
    {
      name: "agents.create",
      operation: "create",
      description:
        'Create a named agent profile: {name, title?, llm?, llmCandidates?, policy?, provider?, model?, prompt?, grants?, mounts?}. llm names the interface instance the agent\'s LLM calls resolve through ("llm", "llm:fast") — bind it with interfaces.bind; llmCandidates + policy {effort?, maxCostUsd?, deadlineMs?} let runs pick between instances by cost/speed; provider/model pin an implementation directly instead. grants bound what the agent\'s runs may touch: {tools: ["keyvalue.*", "github.repos.*"], paths: [{prefix: "docs/", access: "rw"}]} — tools not listed and paths not covered are denied (absent axes stay permissive). mounts [{path, source, mode?}] declare workspace files a run should see (validated against grants.paths). Run a workflow as an agent with workflows.run {name, agent}; run the agent\'s own loop with agents.run.',
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string" },
          title: { type: "string" },
          llm: { type: "string", description: 'llm interface instance ("llm", "llm:fast")' },
          llmCandidates: {
            type: "array",
            items: { type: "string" },
            description: 'llm instances the run policy may pick between (["llm:fast", "llm:deep"])',
          },
          policy: {
            type: "object",
            description:
              "Cost/speed policy: {effort?: minimal|low|medium|high|max, maxCostUsd?, deadlineMs?}",
          },
          provider: { type: "string" },
          model: { type: "string" },
          prompt: { type: "string" },
          grants: { type: "object" },
          mounts: {
            type: "array",
            items: { type: "object" },
            description:
              'Workspace files runs should see: [{path: "skills", source: "skills/", mode: "ro"}]',
          },
        },
        required: ["name"],
      },
    },
    {
      name: "agents.update",
      operation: "update",
      description:
        "Update an agent profile (same fields as create; provided fields replace, others keep). Pass null on grants/policy/llmCandidates/mounts to clear them.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string" },
          title: { type: "string" },
          llm: { type: "string" },
          llmCandidates: {},
          policy: {},
          provider: { type: "string" },
          model: { type: "string" },
          prompt: { type: "string" },
          grants: {},
          mounts: {},
        },
        required: ["name"],
      },
    },
    {
      name: "agents.run",
      operation: "run",
      description:
        "Run an agent profile's own loop on the workspace's bound agent runtime and return the run record {id, status, output, turns, usage, stopReason}. input is the task (a string, [{role, content}] messages, or any JSON payload). The gateway renders the profile before dispatch — prompt + mounts become the instructions, grants.tools becomes the tool list the model may call (via one generic call_tool function), and the profile's llm instance (or the policy's pick among llmCandidates) does the thinking. Tool calls the model requests are bounded by the profile's grants. effort/limits override the profile's per run. Pass sandbox (a sandbox id) to bind the run to that box: it gains sandboxes.exec/read/write/tree and works inside it.",
      inputSchema: {
        type: "object",
        properties: {
          agent: { type: "string", description: "Agent profile name" },
          input: { description: "The task: a string, [{role, content}] messages, or a JSON payload" },
          effort: {
            type: "string",
            enum: [...AGENT_EFFORTS],
            description: "How hard to try; overrides the profile's policy.effort",
          },
          limits: {
            type: "object",
            description: "{wallClockMs?, maxTurns?, maxToolCalls?, maxOutputBytes?}",
          },
          sandbox: {
            type: "string",
            description:
              "Bind the run to an existing sandbox by id: the run gains sandboxes.exec/read/write/tree for its shell and file work, is told which box it owns, and its record carries the sandbox id",
          },
        },
        required: ["agent", "input"],
      },
    },
    {
      name: "agents.getRun",
      operation: "getRun",
      description:
        "Read one agent run by id: status, turns so far, usage, and — once it has stopped — output and stopReason.",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
    {
      name: "agents.cancelRun",
      operation: "cancelRun",
      description:
        "Stop a running agent loop. Work already committed by its tool calls stands; the cancel lands between turns.",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
    {
      name: "agents.get",
      operation: "get",
      description: "Read one agent profile by name.",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string" } },
        required: ["name"],
      },
    },
    {
      name: "agents.list",
      operation: "list",
      description: "List the workspace's agent profiles.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "agents.delete",
      operation: "delete",
      description: "Delete an agent profile.",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string" } },
        required: ["name"],
      },
    },
    {
      name: "agents.runs",
      operation: "runs",
      description:
        "Recent agent executions, newest first: agent-attributed workflow runs ({id, workflow, agent, status, trigger, startedAt, durationMs, error?, traceId}) merged with native agents.run loops (trigger \"run\", no workflow). Filter with name (one agent) and limit. Full detail lives behind workflows.trace {run} and agents.getRun {id}.",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string" }, limit: { type: "number" } },
      },
    },
  ],

  async call(ctx, procedure, args) {
    // Agent profiles are workspace configuration — app sessions never manage
    // them (an app could otherwise mint itself a wide grant). Starting a loop
    // is blocked for the same reason a profile write is: a run executes with
    // the profile's workspace-level reach, and an app triggers agent work
    // through its allow-listed workflows, not by driving loops directly.
    if (ctx.appScope) {
      if (
        procedure === "get" ||
        procedure === "list" ||
        procedure === "runs" ||
        procedure === "getRun"
      ) {
        // Reads are harmless (grants only narrow), and let app workflows
        // resolve an assignee's provider/model/prompt and show executions.
      } else {
        throw new ServiceError("Apps cannot manage or run agent profiles", 403);
      }
    }
    const store = getFsStore();
    switch (procedure) {
      case "create":
      case "update": {
        const name = typeof args["name"] === "string" ? args["name"] : "";
        if (!NAME_RE.test(name)) {
          throw new ServiceError(
            "name must be lowercase letters/digits/hyphens (max 64 chars)",
            400,
          );
        }
        const existing = await readAgentProfile(ctx.workspaceId, name);
        if (procedure === "create" && existing) {
          throw new ServiceError(`Agent "${name}" already exists`, 409);
        }
        if (procedure === "update" && !existing) {
          throw new ServiceError(`Unknown agent: ${name}`, 404);
        }
        const now = new Date().toISOString();
        // Grants resolve first: mounts are validated against the grants
        // being written, exactly as sandboxes.create checks a caller's.
        const grants =
          args["grants"] === null
            ? undefined
            : args["grants"] !== undefined
              ? parseGrants(args["grants"])
              : existing?.grants;
        const profile: AgentProfile = {
          name,
          title: optionalString(args["title"], 120) ?? existing?.title,
          llm: args["llm"] === null ? undefined : parseAgentLlm(args["llm"]) ?? existing?.llm,
          llmCandidates:
            args["llmCandidates"] === null
              ? undefined
              : parseAgentLlmCandidates(args["llmCandidates"]) ?? existing?.llmCandidates,
          policy:
            args["policy"] === null
              ? undefined
              : parseAgentPolicy(args["policy"]) ?? existing?.policy,
          provider: optionalString(args["provider"], 100) ?? existing?.provider,
          model: optionalString(args["model"], 100) ?? existing?.model,
          prompt: optionalString(args["prompt"], 8000) ?? existing?.prompt,
          grants,
          mounts:
            args["mounts"] === null
              ? undefined
              : args["mounts"] !== undefined
                ? parseAgentMounts(args["mounts"], grants)
                : existing?.mounts,
          createdBy: existing?.createdBy ?? ctx.userId,
          createdAt: existing?.createdAt ?? now,
          updatedAt: now,
        };
        await writeSvcRecord(ctx.workspaceId, AGENTS_SCOPE, name, profile, profile.createdBy);
        return { agent: profile };
      }

      case "get": {
        const name = typeof args["name"] === "string" ? args["name"] : "";
        const profile = await readAgentProfile(ctx.workspaceId, name);
        if (!profile) throw new ServiceError(`Unknown agent: ${name}`, 404);
        return { agent: profile };
      }

      case "list": {
        const entries = await listSvcRecords<AgentProfile>(ctx.workspaceId, AGENTS_SCOPE);
        const agents = entries.map((entry) => entry.value);
        agents.sort((a, b) => a.name.localeCompare(b.name));
        return { agents };
      }

      case "delete": {
        const name = typeof args["name"] === "string" ? args["name"] : "";
        if (!NAME_RE.test(name)) throw new ServiceError(`Unknown agent: ${name}`, 404);
        const removed = await deleteSvcRecord(ctx.workspaceId, AGENTS_SCOPE, name);
        if (!removed) throw new ServiceError(`Unknown agent: ${name}`, 404);
        return { deleted: name };
      }

      case "run": {
        const name = typeof args["agent"] === "string" ? args["agent"] : "";
        const profile = await readAgentProfile(ctx.workspaceId, name);
        if (!profile) throw new ServiceError(`Unknown agent: ${name}`, 404);
        // A sandbox binding resolves to a live record now — a run handed a
        // destroyed or unknown box should fail before a model call is spent.
        let sandbox: RunSandboxContext | undefined;
        if (typeof args["sandbox"] === "string" && args["sandbox"]) {
          const record = await requireSandbox(ctx.workspaceId, args["sandbox"]);
          sandbox = {
            id: record.id,
            workdir: record.workdir,
            mounts: record.mounts.map((mount) => mount.path),
          };
        }
        const { runArgs, runCtx } = await renderAgentRun(ctx, profile, args, sandbox);
        // One rendering step, one dispatch, one result shape: the interface
        // path short-circuits into the in-process runner for the `native`
        // entry (never touching the isolate — workflows/invoke.ts, the
        // `machine` sandbox precedent) and reaches a vendor runtime through
        // the very same call for anything else. Dynamic import: the runner's
        // own tool dispatches come back through invoke.ts.
        const { dispatchInterface } = await import("../workflows/invoke.js");
        return dispatchInterface(runCtx, "agent", "run", runArgs);
      }

      case "getRun": {
        const id = typeof args["id"] === "string" ? args["id"] : "";
        const { dispatchInterface } = await import("../workflows/invoke.js");
        return dispatchInterface(ctx, "agent", "get", { id });
      }

      case "cancelRun": {
        const id = typeof args["id"] === "string" ? args["id"] : "";
        const { dispatchInterface } = await import("../workflows/invoke.js");
        return dispatchInterface(ctx, "agent", "cancel", { id });
      }

      case "runs": {
        const name = typeof args["name"] === "string" && args["name"] ? args["name"] : undefined;
        const limit = Math.min(Number(args["limit"]) || 50, 100);
        const { listRegistrations, listRuns } = await import("../workflows/store.js");
        const registrations = await listRegistrations(ctx.workspaceId).catch(() => []);
        const runs: Array<{
          id: string;
          workflow?: string;
          agent: string;
          status: string;
          trigger: string;
          startedAt: string;
          durationMs?: number;
          error?: string;
          traceId?: string;
        }> = [];
        // Native agents.run loops sit in the same feed as agent-attributed
        // workflow runs — an execution is an execution, whoever held it.
        const { listNativeAgentRuns } = await import("./runner.js");
        const nativeRuns = await listNativeAgentRuns(ctx.workspaceId, name, limit).catch(
          () => [],
        );
        for (const run of nativeRuns) {
          if (!run.agent) continue;
          runs.push({
            id: run.id,
            agent: run.agent,
            status: run.status,
            trigger: "run",
            startedAt: run.startedAt,
            ...(run.durationMs !== undefined ? { durationMs: run.durationMs } : {}),
            ...(run.error ? { error: run.error.message } : {}),
          });
        }
        for (const registration of registrations) {
          const recent = await listRuns(ctx.workspaceId, registration.name, 25).catch(() => []);
          for (const run of recent) {
            if (!run.agent) continue;
            if (name && run.agent !== name) continue;
            runs.push({
              id: run.id,
              workflow: run.workflow,
              agent: run.agent,
              status: run.status,
              trigger: run.trigger,
              startedAt: run.startedAt,
              ...(run.durationMs !== undefined ? { durationMs: run.durationMs } : {}),
              ...(run.error ? { error: run.error } : {}),
              ...(run.traceId ? { traceId: run.traceId } : {}),
            });
          }
        }
        runs.sort((a, b) => b.startedAt.localeCompare(a.startedAt));
        return { runs: runs.slice(0, limit) };
      }

      default:
        throw new ServiceError(`Unknown agents procedure: ${procedure}`, 404);
    }
  },
};
