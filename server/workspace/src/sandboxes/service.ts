/**
 * `sandboxes` — external execution environments as a workspace capability.
 *
 * The raw driver (`create`/`exec`/file ops) is the `sandbox` *interface*:
 * swappable, credentialed, provider-shaped, and it knows nothing about this
 * workspace. This service is the other half — the part that cannot live in a
 * provider module because it is made of workspace nouns:
 *
 *   - **mounts**  — which VFS prefixes the box may see, bounded by the
 *     caller's existing path grants;
 *   - **sync**    — two hash manifests and a set difference (mounts.ts);
 *   - **commit**  — routing changed bytes to a session overlay, an external
 *     mount, or the FS store plus a VCS commit;
 *   - **records** — so "what changed in that sandbox" survives the request.
 *
 * Everything rides `POST /tools/sandboxes/:procedure`, so chat, widgets,
 * workflow scripts and MCP pick it up with no integration code.
 *
 * See docs/sandboxes.md.
 */

import {
  DEFAULT_TTL_SECONDS,
  resolveSandboxImage,
  type ResolvedSandboxImage,
} from "@utdk/sandbox";
import { agentsService, readAgentProfile } from "../agents/service.js";
import { getCredentialStore } from "../credentials.js";
import { resolveInterfaceForWorkspace } from "../interfaces.js";
import { ServiceError, type CoreService, type ServiceContext } from "../service-kernel.js";
import { createSession, requireSession, type ChatSessionRecord } from "../vcs/chat-sessions.js";
import { commitTree } from "../vcs/store.js";
import { dispatchInterface } from "../workflows/invoke.js";
import { runWorkflowByName } from "../workflows/runner.js";
import { applyDefaultMounts, readDefaultMounts, writeDefaultMounts } from "./defaults.js";
import {
  commitMount,
  diffManifests,
  diffTotal,
  isRepoMount,
  materializeMount,
  sandboxManifest,
  type MountCommitResult,
  type SandboxCall,
} from "./mounts.js";
import { materializeRepoMount } from "./repo-mounts.js";
import {
  claimRun,
  enqueueRun,
  finishRun,
  listRuns,
  readQueuedRun,
  requireRunnableWorkflow,
  updateQueuedRun,
  type SandboxRun,
  type SandboxRunStatus,
} from "./queue.js";
import { dispatchToHost } from "./relay.js";
import {
  deleteHost,
  hostSummary,
  listHosts,
  listSandboxes,
  mintToken,
  newHostId,
  newSandboxId,
  readHost,
  requireSandbox,
  sandboxIdent,
  saveHost,
  saveSandbox,
  tokenDigest,
  type SandboxHostRecord,
  type SandboxMount,
  type SandboxMountKind,
  type SandboxRecord,
} from "./store.js";
import type { CapabilityGrants } from "../grants.js";

const INTERFACE = "sandbox";

/**
 * The image a host offers when it names none. Registering with no image at
 * all would leave a machine unable to take any scheduled run, which is never
 * what someone registering a machine meant.
 */
const DEFAULT_IMAGE = "@aprovan/native";

/**
 * Resolved image descriptors, keyed by `<provider>:<spec>`. Descriptors are
 * immutable per version, and a busy workspace would otherwise refetch one per
 * sandbox.
 */
const imageCache = new Map<string, unknown>();

/**
 * Sandboxes are a workspace concern: mounting reaches across the tree, and
 * commits land on `main` or in a chat session. An app session's world is its
 * own partition, so it has no business here — the same rule VCS verbs apply.
 */
function requireWorkspaceCaller(ctx: ServiceContext): void {
  if (ctx.appScope) {
    throw new ServiceError("Sandbox operations are workspace-only", 403);
  }
}

function str(args: Record<string, unknown>, key: string): string | undefined {
  const value = args[key];
  return typeof value === "string" && value ? value : undefined;
}

/**
 * A caller-supplied deadline for a read-only probe.
 *
 * The default host timeout is sized for a build, not for a poll. A UI showing
 * "3 uncommitted files" per sandbox asks every one of them on load, and an
 * asleep machine would hold that row for two minutes — so the caller that
 * knows it is polling gets to say so.
 */
function timeoutOf(args: Record<string, unknown>): number | undefined {
  const value = args["timeoutMs"];
  return typeof value === "number" && value > 0 ? value : undefined;
}

/**
 * Dispatch into the driver for one sandbox, pinned to the provider — and,
 * where the provider addresses hosts individually, to the exact host holding
 * the files.
 *
 * The `machine` provider short-circuits the isolate and talks to the relay
 * in-process. That is not a special case bolted on: the relay *is* the host's
 * API and it lives in this process, so routing an HTTP request from the
 * gateway back to the gateway would add a network round trip per file — and
 * materializing a mount is one write per file. The published
 * `@aprovan/native/host` client exists for callers that genuinely are
 * elsewhere (another deployment, a script), and takes the HTTP path.
 */
function driverFor(ctx: ServiceContext, target: { provider: string; hostId?: string }): SandboxCall {
  if (target.provider === MACHINE_PROVIDER) {
    const hostId = target.hostId;
    if (!hostId) {
      throw new ServiceError(
        "This sandbox has no registered host. Register one with `aprovan sandbox host register`.",
        400,
      );
    }
    return async (op, args) => {
      const timeoutMs =
        typeof args["timeoutMs"] === "number" && args["timeoutMs"] > 0
          ? args["timeoutMs"]
          : DEFAULT_HOST_OP_TIMEOUT_MS;
      const result = await dispatchToHost(ctx.workspaceId, hostId, { op, args, timeoutMs });
      if (result.error) throw new ServiceError(`machine: ${result.error}`, 502);
      return result.data;
    };
  }
  return (op, args) => dispatchInterface(ctx, INTERFACE, op, args, target.provider);
}

/** The one provider whose hosts this workspace operates itself. */
const MACHINE_PROVIDER = "machine";

/** Ops without their own deadline still need one for the relay round trip. */
const DEFAULT_HOST_OP_TIMEOUT_MS = 120_000;

/**
 * The host a new sandbox should land on: the caller's choice, else the only
 * registered one. Ambiguity is an error rather than a coin flip — picking a
 * machine at random is how work ends up on the laptop that is closed.
 */
async function resolveHost(
  workspaceId: string,
  provider: string,
  requested: string | undefined,
): Promise<SandboxHostRecord | undefined> {
  if (provider !== MACHINE_PROVIDER) return undefined;
  const hosts = (await listHosts(workspaceId)).filter(
    (host) => host.provider === MACHINE_PROVIDER,
  );
  if (requested) {
    const host = hosts.find((candidate) => candidate.id === requested);
    if (!host) throw new ServiceError(`Unknown sandbox host: ${requested}`, 404);
    return host;
  }
  if (hosts.length === 0) {
    throw new ServiceError(
      "No machine is registered for this workspace. Run `aprovan sandbox host register`.",
      400,
    );
  }
  if (hosts.length > 1) {
    throw new ServiceError(
      `Several machines are registered (${hosts.map((h) => h.id).join(", ")}) — pass host.`,
      400,
    );
  }
  return hosts[0];
}

/**
 * Grants governing this sandbox: an explicitly named agent profile's, else
 * the caller's own. A named agent can only ever narrow — an agent grant is
 * something a member gives, and a member cannot mint reach they lack.
 */
async function resolveGrants(
  ctx: ServiceContext,
  agent: string | undefined,
): Promise<CapabilityGrants | undefined> {
  if (!agent) return ctx.grants;
  const profile = await readAgentProfile(ctx.workspaceId, agent);
  if (!profile) throw new ServiceError(`Unknown agent: ${agent}`, 404);
  return profile.grants ?? ctx.grants;
}

/**
 * A sandbox may only write into a chat session's overlay if that session is
 * staged and open — an `auto` session writes straight through to the live
 * tree, which is exactly what a sandbox must not do unreviewed.
 */
async function resolveSession(
  ctx: ServiceContext,
  id: string | undefined,
): Promise<ChatSessionRecord | undefined> {
  if (!id) return undefined;
  const session = await requireSession(ctx.workspaceId, id);
  if (session.mode !== "staged") {
    throw new ServiceError(
      `Session ${id} is an auto chat — sandbox commits need a draft chat (sessions.create { mode: "staged" }) so the work can be reviewed before it lands`,
      400,
    );
  }
  return session;
}

async function resolveImage(
  spec: string,
  provider: string,
): Promise<ResolvedSandboxImage> {
  return resolveSandboxImage(spec, {
    provider,
    cache: imageCache as Map<string, unknown>,
    ...(process.env["SANDBOX_IMAGE_CDN"] ? { cdnBaseUrl: process.env["SANDBOX_IMAGE_CDN"] } : {}),
  });
}

interface ProvisionOptions {
  name?: string | undefined;
  image?: string | undefined;
  mounts: SandboxMount[];
  session?: ChatSessionRecord | undefined;
  agent?: string | undefined;
  host?: string | undefined;
  env?: Record<string, string>;
  ttlSeconds?: number;
}

/**
 * Start a sandbox and hand it the workspace files its mounts declare.
 *
 * Shared by `sandboxes.create` and the scheduler, which is the point: a
 * scheduled run is an ordinary sandbox that a host asked for rather than a
 * user. There is one provisioning path, so there is one thing to get right.
 */
async function provisionSandbox(
  ctx: ServiceContext,
  options: ProvisionOptions,
): Promise<SandboxRecord> {
  // Resolve the implementation *before* dispatch: the image's base is
  // provider-specific, and the record must pin both provider and host so a
  // later rebind cannot point an existing sandbox somewhere its files aren't.
  const resolved = await resolveInterfaceForWorkspace(ctx.workspaceId, INTERFACE);
  const provider = resolved.compat.provider;
  const host = await resolveHost(ctx.workspaceId, provider, options.host);
  const spec = options.image ?? (resolved.options["image"] as string | undefined);
  const image = spec ? await resolveImage(spec, provider) : undefined;

  const target = { provider, ...(host ? { hostId: host.id } : {}) };
  const call = driverFor(ctx, target);
  const instance = (await call("create", {
    ...(image ? { base: image.base, workdir: image.workdir } : {}),
    ...(options.name ? { name: options.name } : {}),
    // Every mount must exist as a directory before the first command runs —
    // a scratch mount has no files to create it as a side effect.
    mounts: options.mounts.map((mount) => mount.path),
    env: { ...(image?.env ?? {}), ...(options.env ?? {}) },
    ...(image?.resources && Object.keys(image.resources).length > 0
      ? { resources: image.resources }
      : {}),
    ttlSeconds: options.ttlSeconds ?? DEFAULT_TTL_SECONDS,
  })) as { id?: string; workdir?: string; url?: string } | undefined;

  if (!instance?.id) {
    throw new ServiceError(`${provider} did not return a sandbox id`, 502);
  }

  const now = new Date().toISOString();
  const record: SandboxRecord = {
    id: newSandboxId(),
    ...(host ? { hostId: host.id } : {}),
    name: options.name ?? "sandbox",
    provider,
    externalId: instance.id,
    ...(spec ? { image: spec } : {}),
    workdir: instance.workdir ?? image?.workdir ?? "/work",
    status: "running",
    mounts: options.mounts,
    ...(options.session ? { sessionId: options.session.id } : {}),
    ...(options.agent ? { agent: options.agent } : {}),
    ...(instance.url ? { url: instance.url } : {}),
    createdBy: ctx.userId,
    createdAt: now,
    updatedAt: now,
  };

  for (const mount of record.mounts) {
    await materializeAnyMount(ctx, record, mount, call);
  }
  return saveSandbox(ctx.workspaceId, record);
}

/** Route one mount to its materializer: repo mounts clone or snapshot. */
async function materializeAnyMount(
  ctx: ServiceContext,
  record: SandboxRecord,
  mount: SandboxMount,
  call: SandboxCall,
): Promise<{ files: number; bytes: number }> {
  if (isRepoMount(mount)) {
    return materializeRepoMount(ctx, record, mount, call, {
      machine: record.provider === MACHINE_PROVIDER,
    });
  }
  return materializeMount(ctx, record, mount, call);
}

/** Public mount summary: record fields plus a materialized file count. */
export interface SandboxMountSummary {
  path: string;
  source: string | null;
  kind: SandboxMountKind;
  mode: "ro" | "rw";
  track: boolean;
  files: number;
  syncedAt: string;
}

/**
 * Public shape of a sandbox: the record with mounts narrowed to a summary
 * (file counts instead of the full `base` map). Explicit fields — no open
 * record spread — so downstream output schemas can read the real shape.
 */
export type SandboxSummary = Omit<SandboxRecord, "mounts"> & {
  mounts: SandboxMountSummary[];
};

function summarize(record: SandboxRecord): SandboxSummary {
  const { mounts, ...rest } = record;
  return {
    ...rest,
    mounts: mounts.map((mount) => ({
      path: mount.path,
      source: mount.source,
      kind: mount.kind ?? "vfs",
      mode: mount.mode,
      track: mount.track,
      files: Object.keys(mount.base).length,
      syncedAt: mount.syncedAt,
    })),
  };
}

function mountsFor(record: SandboxRecord, name: string | undefined): SandboxMount[] {
  if (!name) return record.mounts;
  const mount = record.mounts.find((candidate) => candidate.path === name);
  if (!mount) throw new ServiceError(`Sandbox ${record.id} has no mount "${name}"`, 404);
  return [mount];
}

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

export const sandboxesService: CoreService = {
  meta: {
    label: "Sandboxes",
    blurb: "Execution environments mounted from your workspace",
    icon: "box",
  },
  tools: [
    {
      name: "sandboxes.create",
      operation: "create",
      description:
        "Start a sandbox — a filesystem plus a shell on the workspace's bound sandbox host — and mount workspace paths into it. " +
        'mounts: [{ path: "app", source: "apps/liift4", mode: "rw" }]; a mount with no source is scratch space that never comes back. ' +
        'A source may also be a GitHub repo spec — "github:owner/repo", "github:owner/repo#ref", "github:owner/repo#ref/sub/path" — ' +
        "materialized as a real git clone on machine hosts (branch/commit/push work inside) and as a read-only snapshot elsewhere; repo mounts never commit back through the workspace. " +
        "Workspace default mounts (sandboxes.setDefaults) are added unless a mount claims the same path. " +
        "Pass session (a draft chat id) so commits land in that chat's changes instead of the live workspace.",
      inputSchema: {
        type: "object",
        properties: {
          image: { type: "string", description: "Image package spec, e.g. @aprovan/native" },
          name: { type: "string" },
          mounts: {
            type: "array",
            items: {
              type: "object",
              properties: {
                path: { type: "string", description: "Directory inside the sandbox" },
                source: { type: "string", description: "Workspace path prefix (omit for scratch)" },
                mode: { type: "string", enum: ["ro", "rw"] },
              },
              required: ["path"],
            },
          },
          session: { type: "string", description: "Draft chat id that receives commits" },
          agent: { type: "string", description: "Agent profile whose grants bound this sandbox" },
          env: { type: "object" },
          ttlSeconds: { type: "number" },
        },
      },
    },
    {
      name: "sandboxes.list",
      operation: "list",
      description: "List this workspace's sandboxes, newest first.",
      inputSchema: { type: "object", properties: { status: { type: "string" } } },
    },
    {
      name: "sandboxes.get",
      operation: "get",
      description: "One sandbox: its record, mounts, and (with changes=true) what has changed inside it.",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" }, changes: { type: "boolean" } },
        required: ["id"],
      },
    },
    {
      name: "sandboxes.exec",
      operation: "exec",
      description:
        "Run a shell command in a sandbox and return { exitCode, stdout, stderr, durationMs }. " +
        "cwd is relative to the sandbox workdir, so a mount path works directly.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string" },
          command: { type: "string" },
          cwd: { type: "string" },
          env: { type: "object" },
          timeoutMs: { type: "number" },
        },
        required: ["id", "command"],
      },
    },
    {
      name: "sandboxes.read",
      operation: "read",
      description: "Read a file from inside a sandbox (path relative to the sandbox workdir).",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" }, path: { type: "string" } },
        required: ["id", "path"],
      },
    },
    {
      name: "sandboxes.write",
      operation: "write",
      description: "Write a file inside a sandbox. Nothing reaches the workspace until sandboxes.commit.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string" },
          path: { type: "string" },
          content: { type: "string" },
        },
        required: ["id", "path", "content"],
      },
    },
    {
      name: "sandboxes.tree",
      operation: "tree",
      description:
        "What has changed inside a sandbox since it was given its files: { added, modified, removed } per mount. " +
        "Compares content hashes on both sides — no file bodies are read. " +
        "Pass a short timeoutMs when polling: an asleep host would otherwise hold the call for the full default.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string" },
          mount: { type: "string" },
          timeoutMs: { type: "number" },
        },
        required: ["id"],
      },
    },
    {
      name: "sandboxes.sync",
      operation: "sync",
      description:
        'Re-materialize a mount from the workspace ("push"), discarding what the sandbox has under it. ' +
        'Use sandboxes.commit for the other direction ("pull" is commit without the commit).',
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" }, mount: { type: "string" } },
        required: ["id"],
      },
    },
    {
      name: "sandboxes.commit",
      operation: "commit",
      description:
        "Bring a sandbox's changes back into the workspace: writes land in the bound draft chat, through an external mount, or on the live tree plus a commit. " +
        "Paths the workspace changed in the meantime are reported as conflicts and left alone.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string" },
          message: { type: "string" },
          mount: { type: "string" },
        },
        required: ["id"],
      },
    },
    {
      name: "sandboxes.expose",
      operation: "expose",
      description: "Expose a port from a sandbox and return its public URL (host permitting).",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" }, port: { type: "number" } },
        required: ["id", "port"],
      },
    },
    {
      name: "sandboxes.destroy",
      operation: "destroy",
      description: "Destroy a sandbox. Uncommitted changes inside it are lost — commit first.",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
    {
      name: "sandboxes.image",
      operation: "image",
      description:
        "Resolve a sandbox image descriptor: the tools available inside the box, the workspace namespaces callable from it, and its prompt.",
      inputSchema: {
        type: "object",
        properties: { spec: { type: "string" }, provider: { type: "string" } },
        required: ["spec"],
      },
    },
    {
      name: "sandboxes.schedule",
      operation: "schedule",
      description:
        "Queue work to run in a sandbox as soon as a machine that can run the image becomes available. " +
        "Pass workflow to execute a workflow script with the sandbox in scope, or just agent to drive that agent profile's loop against the sandbox (its shell and file tool calls execute inside it). " +
        "Changes commit into a draft chat, so unattended work stays reviewable. Mount sources may be workspace prefixes or GitHub repo specs (github:owner/repo#ref); workspace default mounts apply unless overridden. " +
        "Runs are offered only to hosts registered for their image — a Node workload is never seen by a box without Node.",
      inputSchema: {
        type: "object",
        properties: {
          image: { type: "string", description: "Image the run needs; also the match key" },
          workflow: {
            type: "string",
            description: "Workflow executed inside the sandbox (omit for an agent-only run)",
          },
          input: { type: "object" },
          mounts: {
            type: "array",
            items: {
              type: "object",
              properties: {
                path: { type: "string" },
                source: {
                  type: "string",
                  description: 'Workspace prefix or "github:owner/repo[#ref[/sub/path]]"',
                },
                mode: { type: "string", enum: ["ro", "rw"] },
              },
              required: ["path"],
            },
          },
          agent: {
            type: "string",
            description:
              "Agent profile the run executes as; with no workflow, the run drives this agent's loop inside the sandbox",
          },
          session: { type: "string", description: "Draft chat to commit into (one is created if omitted)" },
          limits: {
            type: "object",
            description:
              "Agent-only runs: limits forwarded to the loop {maxTurns?, wallClockMs?, maxToolCalls?, maxOutputBytes?}",
          },
          requires: {
            type: "object",
            properties: { tools: { type: "array", items: { type: "string" } } },
            description: "Binaries needed beyond what the image promises",
          },
        },
        required: ["image"],
      },
    },
    {
      name: "sandboxes.getDefaults",
      operation: "getDefaults",
      description:
        "Read the workspace's default sandbox mounts — declarations applied to every new sandbox and scheduled run unless the caller mounts the same path himself.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "sandboxes.setDefaults",
      operation: "setDefaults",
      description:
        'Replace the workspace\'s default sandbox mounts: mounts [{ path, source?, mode? }], where source is a workspace prefix or a repo spec like "github:owner/repo#ref". ' +
        "Pass an empty array to clear. Explicit mounts always win on path collision.",
      inputSchema: {
        type: "object",
        properties: {
          mounts: {
            type: "array",
            items: {
              type: "object",
              properties: {
                path: { type: "string" },
                source: { type: "string" },
                mode: { type: "string", enum: ["ro", "rw"] },
              },
              required: ["path"],
            },
          },
        },
        required: ["mounts"],
      },
    },
    {
      name: "sandboxes.runs",
      operation: "runs",
      description: "Scheduled sandbox runs — queued, running, and finished, newest first.",
      inputSchema: {
        type: "object",
        properties: { status: { type: "string" }, limit: { type: "number" } },
      },
    },
    {
      name: "sandboxes.cancelRun",
      operation: "cancelRun",
      description: "Cancel a scheduled run. A run already claimed by a host keeps going.",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
    {
      name: "sandboxes.hosts",
      operation: "hosts",
      description: "List registered sandbox hosts (machines and vendor endpoints).",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "sandboxes.registerHost",
      operation: "registerHost",
      description:
        "Register an execution endpoint and mint its token pair. The client token is what this workspace stores as the provider credential; the host token is what `aprovan sandbox host run` uses. Both are shown once.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string" },
          provider: { type: "string", description: 'Defaults to "machine"' },
          root: { type: "string", description: "Directory the agent confines working directories to" },
          images: {
            type: "array",
            items: { type: "string" },
            description:
              "Sandbox images this host offers to run. Scheduled runs are matched on this — a host is never offered a run for an image it did not register.",
          },
        },
        required: ["name"],
      },
    },
    {
      name: "sandboxes.revokeHost",
      operation: "revokeHost",
      description: "Revoke a host registration. Its tokens stop working immediately.",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
  ],

  async call(ctx, procedure, args): Promise<unknown> {
    requireWorkspaceCaller(ctx);

    switch (procedure) {
      // ---------------------------------------------------------------- create
      case "create":
        return summarize(
          await provisionSandbox(ctx, {
            name: str(args, "name"),
            image: str(args, "image"),
            mounts: await applyDefaultMounts(
              ctx.workspaceId,
              args["mounts"],
              await resolveGrants(ctx, str(args, "agent")),
            ),
            session: await resolveSession(ctx, str(args, "session")),
            agent: str(args, "agent"),
            host: str(args, "host"),
            env: (args["env"] as Record<string, string>) ?? {},
            ...(typeof args["ttlSeconds"] === "number"
              ? { ttlSeconds: args["ttlSeconds"] }
              : {}),
          }),
        );

      // ------------------------------------------------------------------ read
      case "list": {
        const status = str(args, "status");
        const records = await listSandboxes(ctx.workspaceId);
        return {
          sandboxes: records
            .filter((record) => !status || record.status === status)
            .map(summarize),
        };
      }

      case "get": {
        const record = await requireSandbox(ctx.workspaceId, args["id"]);
        if (args["changes"] !== true) return summarize(record);
        const call = driverFor(ctx, record);
        return {
          ...summarize(record),
          changes: await treeChanges(record, record.mounts, call, timeoutOf(args)),
        };
      }

      case "tree": {
        const record = await requireSandbox(ctx.workspaceId, args["id"]);
        const call = driverFor(ctx, record);
        return {
          changes: await treeChanges(
            record,
            mountsFor(record, str(args, "mount")),
            call,
            timeoutOf(args),
          ),
        };
      }

      // -------------------------------------------------------------- passthru
      case "exec": {
        const record = await requireSandbox(ctx.workspaceId, args["id"]);
        if (typeof args["command"] !== "string" || !args["command"].trim()) {
          throw new ServiceError('exec requires { command: "pnpm test" }', 400);
        }
        return driverFor(ctx, record)("exec", {
          id: record.externalId,
          command: args["command"],
          ...(str(args, "cwd") ? { cwd: args["cwd"] } : {}),
          ...(args["env"] ? { env: args["env"] } : {}),
          ...(typeof args["timeoutMs"] === "number" ? { timeoutMs: args["timeoutMs"] } : {}),
        });
      }

      case "read": {
        const record = await requireSandbox(ctx.workspaceId, args["id"]);
        if (!str(args, "path")) throw new ServiceError("path is required", 400);
        return driverFor(ctx, record)("readFile", {
          id: record.externalId,
          path: args["path"],
        });
      }

      case "write": {
        const record = await requireSandbox(ctx.workspaceId, args["id"]);
        if (!str(args, "path")) throw new ServiceError("path is required", 400);
        if (typeof args["content"] !== "string") {
          throw new ServiceError("content must be a string", 400);
        }
        return driverFor(ctx, record)("writeFile", {
          id: record.externalId,
          path: args["path"],
          content: args["content"],
        });
      }

      case "expose": {
        const record = await requireSandbox(ctx.workspaceId, args["id"]);
        if (typeof args["port"] !== "number") {
          throw new ServiceError("port must be a number", 400);
        }
        return driverFor(ctx, record)("exposePort", {
          id: record.externalId,
          port: args["port"],
        });
      }

      // ----------------------------------------------------------------- sync
      case "sync": {
        const record = await requireSandbox(ctx.workspaceId, args["id"]);
        const call = driverFor(ctx, record);
        const targets = mountsFor(record, str(args, "mount"));
        const results: Array<{ mount: string; files: number; bytes: number }> = [];
        for (const mount of targets) {
          const { files, bytes } = await materializeAnyMount(ctx, record, mount, call);
          results.push({ mount: mount.path, files, bytes });
        }
        await saveSandbox(ctx.workspaceId, record);
        return { synced: results };
      }

      // --------------------------------------------------------------- commit
      case "commit": {
        const record = await requireSandbox(ctx.workspaceId, args["id"]);
        const call = driverFor(ctx, record);
        const session = await resolveSession(ctx, record.sessionId);
        const targets = mountsFor(record, str(args, "mount")).filter((mount) => mount.track);
        if (targets.length === 0) {
          throw new ServiceError(
            `Sandbox ${record.id} has no writable workspace mounts — nothing to commit`,
            400,
          );
        }

        const results: MountCommitResult[] = [];
        for (const mount of targets) {
          results.push(
            await commitMount(ctx, record, mount, call, session ? { session } : {}),
          );
        }
        await saveSandbox(ctx.workspaceId, record);

        const written = results.flatMap((result) => result.written);
        const removed = results.flatMap((result) => result.removed);
        const conflicts = results.flatMap((result) => result.conflicts);
        const skipped = results.flatMap((result) => result.skipped);

        // A staged session keeps its changes until a human applies them —
        // that *is* the commit, and advancing main here would defeat it.
        let commit: { id: string; message: string } | undefined;
        if (!session && written.length + removed.length > 0) {
          const message =
            str(args, "message") ?? `Sandbox ${record.name}: ${written.length + removed.length} file(s)`;
          const { commit: created } = await commitTree(ctx.workspaceId, {
            message,
            author: ctx.userId,
          });
          commit = { id: created.id, message: created.message };
        }

        return {
          mounts: results,
          written,
          removed,
          conflicts,
          skipped,
          ...(session ? { session: session.id } : {}),
          ...(commit ? { commit } : {}),
        };
      }

      // -------------------------------------------------------------- destroy
      case "destroy": {
        const record = await requireSandbox(ctx.workspaceId, args["id"]);
        await driverFor(ctx, record)("destroy", { id: record.externalId }).catch(
          () => undefined,
        );
        record.status = "destroyed";
        await saveSandbox(ctx.workspaceId, record);
        return { id: record.id, destroyed: true };
      }

      // ---------------------------------------------------------------- image
      case "image": {
        const spec = str(args, "spec");
        if (!spec) throw new ServiceError("spec is required", 400);
        const provider =
          str(args, "provider") ??
          (await resolveInterfaceForWorkspace(ctx.workspaceId, INTERFACE)).compat.provider;
        const image = await resolveImage(spec, provider);
        return {
          name: image.name,
          version: image.version,
          provider,
          workdir: image.workdir,
          tools: image.tools,
          namespaces: image.namespaces,
          env: image.env,
          resources: image.resources,
          prompt: image.config.prompt,
          docs: image.config.docs ?? {},
        };
      }

      // ---------------------------------------------------------------- hosts
      // ------------------------------------------------------------ schedule
      case "schedule": {
        const image = str(args, "image");
        if (!image) {
          throw new ServiceError(
            "schedule requires { image } — it is what decides which machines may take the run",
            400,
          );
        }
        const agent = str(args, "agent");
        // A run is a workflow script, an agent loop, or a workflow executed
        // *as* an agent — but it must be one of them, or the host would
        // claim a sandbox with nothing to do in it.
        const workflow = agent ? str(args, "workflow") : requireRunnableWorkflow(args["workflow"]);
        // resolveGrants also verifies the agent profile exists — a schedule
        // naming a ghost agent fails now, not when a host claims it.
        const grants = await resolveGrants(ctx, agent);
        const requires = args["requires"] as { tools?: unknown } | undefined;
        const run = await enqueueRun(ctx.workspaceId, {
          image,
          ...(workflow ? { workflow } : {}),
          input: args["input"],
          mounts: await applyDefaultMounts(ctx.workspaceId, args["mounts"], grants),
          ...(agent ? { agent } : {}),
          ...(args["limits"] && typeof args["limits"] === "object" && !Array.isArray(args["limits"])
            ? { limits: args["limits"] as Record<string, unknown> }
            : {}),
          ...(str(args, "session")
            ? { sessionId: (await resolveSession(ctx, str(args, "session")))!.id }
            : {}),
          requires: {
            tools: Array.isArray(requires?.tools)
              ? requires.tools.filter((tool): tool is string => typeof tool === "string")
              : [],
          },
          createdBy: ctx.userId,
        });
        return { run };
      }

      // -------------------------------------------------------------- defaults
      case "getDefaults":
        return { mounts: await readDefaultMounts(ctx.workspaceId) };

      case "setDefaults": {
        // Validated against the *setter's* grants; per-caller applicability
        // is re-checked at create/schedule time (defaults.ts).
        return { mounts: await writeDefaultMounts(ctx.workspaceId, args["mounts"], ctx.grants) };
      }

      case "runs":
        return {
          runs: await listRuns(ctx.workspaceId, {
            ...(str(args, "status") ? { status: str(args, "status") as SandboxRunStatus } : {}),
            ...(typeof args["limit"] === "number" ? { limit: args["limit"] } : {}),
          }),
        };

      case "cancelRun": {
        const id = sandboxIdent(args["id"], "id");
        const run = await readQueuedRun(ctx.workspaceId, id);
        if (!run) throw new ServiceError(`Unknown or already-finished run: ${id}`, 404);
        if (run.status !== "pending") {
          throw new ServiceError(
            `Run ${id} is ${run.status} — a host already took it, so cancelling would leave the sandbox orphaned`,
            409,
          );
        }
        return { run: await finishRun(ctx.workspaceId, run, { status: "cancelled" }) };
      }

      // ---------------------------------------------------------------- hosts
      case "hosts":
        return { hosts: (await listHosts(ctx.workspaceId)).map(hostSummary) };

      case "registerHost": {
        const name = str(args, "name");
        if (!name) throw new ServiceError("name is required", 400);
        const hostToken = mintToken("sbht");
        const clientToken = mintToken("sbhc");
        const host: SandboxHostRecord = {
          id: newHostId(),
          name,
          provider: str(args, "provider") ?? "machine",
          ...(str(args, "root") ? { root: args["root"] as string } : {}),
          images: Array.isArray(args["images"])
            ? (args["images"] as unknown[]).filter((i): i is string => typeof i === "string")
            : [DEFAULT_IMAGE],

          hostTokenHash: tokenDigest(hostToken),
          clientTokenHash: tokenDigest(clientToken),
          createdBy: ctx.userId,
          createdAt: new Date().toISOString(),
        };
        await saveHost(ctx.workspaceId, host);
        // Workspace half of the registration: the client token is the
        // `machine` credential used to enqueue work (see SandboxHostRecord).
        // Not creatable via POST /credentials — that route rejects interface-
        // only providers so they never appear under Services → Providers.
        await getCredentialStore().create(ctx.workspaceId, {
          provider: host.provider,
          label: host.name,
          payload: { type: "bearer_token", token: clientToken },
          createdBy: ctx.userId,
        });
        return {
          host: hostSummary(host),
          // Shown exactly once. The relay stores digests only.
          hostToken,
          clientToken,
          relayUrl: `/sandbox-hosts/${ctx.workspaceId}/${host.id}`,
        };
      }

      case "revokeHost": {
        const id = sandboxIdent(args["id"], "id");
        const host = await readHost(ctx.workspaceId, id);
        if (!host) throw new ServiceError(`Unknown host: ${id}`, 404);
        await deleteHost(ctx.workspaceId, id);
        return { id, revoked: true };
      }

      default:
        throw new ServiceError(`Unknown sandboxes procedure: ${procedure}`, 404);
    }
  },
};

// ---------------------------------------------------------------------------
// Scheduled runs
// ---------------------------------------------------------------------------

/**
 * Execute a claimed run: provision the sandbox on the claiming host, run the
 * workflow with the sandbox in scope, commit, destroy.
 *
 * Called fire-and-forget from the claim handler — the agent's job was to say
 * it was available, not to wait. Every failure is written back onto the run
 * record, because a scheduled run nobody is watching must explain itself.
 */
export async function executeClaimedRun(
  workspaceId: string,
  run: SandboxRun,
  host: SandboxHostRecord,
): Promise<void> {
  const ctx: ServiceContext = {
    workspaceId,
    userId: run.createdBy,
    ...(run.agent ? {} : {}),
  };
  let sandbox: SandboxRecord | undefined;
  const label = run.workflow ?? `agent:${run.agent ?? "?"}`;
  try {
    // A scheduled run is unattended, so it gets a draft chat by default — its
    // changes are reviewable rather than applied to the live workspace by
    // something nobody watched.
    const session = run.sessionId
      ? await requireSession(workspaceId, run.sessionId)
      : await createSession(workspaceId, run.createdBy, {
          title: `Scheduled: ${label}`,
          mode: "staged",
        });

    sandbox = await provisionSandbox(ctx, {
      name: label,
      image: run.image,
      mounts: run.mounts,
      session,
      ...(run.agent ? { agent: run.agent } : {}),
      host: host.id,
    });

    await updateQueuedRun(workspaceId, {
      ...run,
      status: "running",
      sandboxId: sandbox.id,
      sessionId: session.id,
    });

    let outcome: {
      status: "succeeded" | "failed";
      error?: string;
      workflowRunId?: string;
      agentRunId?: string;
    };
    if (run.workflow) {
      // The script reaches the sandbox the same way any caller does — through
      // `sandboxes.*` with an id. No new global, no new runtime contract.
      const result = await runWorkflowByName(
        ctx,
        run.workflow,
        "manual",
        {
          ...(typeof run.input === "object" && run.input !== null ? run.input : { input: run.input }),
          sandbox: { id: sandbox.id, workdir: sandbox.workdir, mounts: run.mounts.map((m) => m.path) },
          session: session.id,
        },
        `sandbox run ${run.id}`,
        run.agent,
      );
      outcome = {
        status: result.status === "failed" ? "failed" : "succeeded",
        ...(result.error ? { error: String(result.error) } : {}),
        workflowRunId: result.id,
      };
    } else {
      // Agent-only run: the gateway's native loop runs exactly as it does
      // for `agents.run`, granted the sandbox-bound tool projection
      // (agents/service.ts renderAgentRun) so its shell/file work executes
      // inside this sandbox over the existing relay. The run record carries
      // both halves — sandboxId here, agent + sandboxId on the agent run.
      const agentRun = (await agentsService.call(ctx, "run", {
        agent: run.agent,
        input: run.input ?? "",
        sandbox: sandbox.id,
        ...(run.limits ? { limits: run.limits } : {}),
      })) as { id?: string; status?: string; error?: { message?: string } };
      outcome = {
        status: agentRun.status === "succeeded" ? "succeeded" : "failed",
        ...(agentRun.error?.message ? { error: agentRun.error.message } : {}),
        ...(agentRun.id ? { agentRunId: agentRun.id } : {}),
      };
    }

    // A run with no tracked mount has nothing to bring back — a build that
    // only produced logs, say. `commit` refuses that case on purpose (an
    // explicit commit with nothing to commit is a mistake worth naming), but
    // here it is ordinary, and reporting the whole run as failed for it would
    // be a lie about the workflow.
    if (sandbox.mounts.some((mount) => mount.track)) {
      await sandboxesService.call({ ...ctx }, "commit", {
        id: sandbox.id,
        message: `Scheduled run: ${label}`,
      });
    }

    await finishRun(workspaceId, { ...run, sandboxId: sandbox.id, sessionId: session.id }, outcome);
  } catch (err) {
    await finishRun(workspaceId, run, {
      status: "failed",
      error: err instanceof Error ? err.message : String(err),
    }).catch(() => undefined);
  } finally {
    if (sandbox) {
      await sandboxesService
        .call({ workspaceId, userId: run.createdBy }, "destroy", { id: sandbox.id })
        .catch(() => undefined);
    }
  }
}

/**
 * Claim on behalf of a host and start the run. The relay route calls this;
 * the agent gets the summary back immediately and the work proceeds here.
 */
export async function claimRunForHost(
  workspaceId: string,
  host: SandboxHostRecord,
  options: { maxWaitMs?: number } = {},
): Promise<SandboxRun | undefined> {
  const run = await claimRun(workspaceId, host, options);
  if (!run) return undefined;
  void executeClaimedRun(workspaceId, run, host);
  return run;
}

/** Per-mount `{added, modified, removed}` without reading a single body. */
async function treeChanges(
  record: SandboxRecord,
  mounts: SandboxMount[],
  call: SandboxCall,
  timeoutMs?: number,
): Promise<Array<Record<string, unknown>>> {
  const changes: Array<Record<string, unknown>> = [];
  for (const mount of mounts) {
    if (!mount.source) {
      changes.push({ mount: mount.path, source: null, scratch: true });
      continue;
    }
    const live = await sandboxManifest(record, mount, call, timeoutMs);
    const diff = diffManifests(mount.base, live);
    changes.push({
      mount: mount.path,
      source: mount.source,
      kind: mount.kind ?? "vfs",
      track: mount.track,
      total: diffTotal(diff),
      ...diff,
    });
  }
  return changes;
}
