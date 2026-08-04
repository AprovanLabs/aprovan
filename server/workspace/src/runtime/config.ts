/**
 * The one switch.
 *
 * A workspace runs in exactly two worlds, and `WORKSPACE_MODE` picks which:
 *
 *   local — everything on disk. SQLite for the file, record, credential and
 *           audit stores; auth off; you are the implicit `local` user in the
 *           implicit `local` workspace. No AWS account, no network required.
 *
 *   aws   — everything on AWS. DynamoDB + S3 behind the same interfaces,
 *           Cognito access tokens, shared config pulled from SSM. This is what
 *           the ECS task runs.
 *
 * Before this module the choice was re-derived independently inside four store
 * factories and both entry points, each with its own fallback rules — so a
 * half-configured deploy could quietly end up with the record store on DynamoDB
 * and the workspace filesystem on SQLite. Backend selection now happens once,
 * here, and every store asks this module rather than reading `process.env`.
 *
 * Resolution is deliberately split in two:
 *
 *   loadWorkspaceConfig() — async, called once at boot. In `aws` mode it pulls
 *                           `/aprovan/<env>/env` from SSM into process.env
 *                           first, then resolves and installs the config.
 *   getWorkspaceConfig()  — sync, called from anywhere. Returns the installed
 *                           config, or resolves one from the environment on
 *                           first use so tests and scripts need no boot step.
 */

import { homedir } from "node:os";
import { join } from "node:path";

export type WorkspaceMode = "local" | "aws";

/** Local mode: one SQLite file plus scratch space under a single directory. */
export interface SqliteDataConfig {
  kind: "sqlite";
  /** Directory holding `workspace.db`. */
  dir: string;
}

/**
 * AWS mode: DynamoDB tables and the WFS content bucket. Individual table names
 * stay with the store that owns them (each Dynamo class reads its own
 * `*_TABLE`) — what lives here is what the *runtime* needs to know: which
 * world we are in, where blobs go, and which region to talk to.
 */
export interface AwsDataConfig {
  kind: "aws";
  region: string;
  /** WFS content-addressed blob bucket. Required — no silent SQLite fallback. */
  fsBucket: string;
}

export type DataConfig = SqliteDataConfig | AwsDataConfig;

export interface WorkspaceConfig {
  mode: WorkspaceMode;
  /** HTTP port. */
  port: number;
  data: DataConfig;
  /**
   * Auth is a consequence of configuration, not an independent knob: OIDC when
   * an issuer and audience are present (SSM supplies them in `aws` mode),
   * otherwise none.
   */
  auth: {
    mode: "none" | "oidc";
    issuer?: string;
    audience?: string;
    authority?: string;
    clientId?: string;
    domain?: string;
  };
  /** In-process cron tick, guarded by the leader lease (see ./leader.ts). */
  cron: { enabled: boolean };
  /** Escape hatch for running auth-none under NODE_ENV=production. */
  allowInsecure: boolean;
}

// ---------------------------------------------------------------------------
// Resolution
// ---------------------------------------------------------------------------

const DEFAULT_PORT = 4000;

function resolveMode(): WorkspaceMode {
  const raw = process.env["WORKSPACE_MODE"]?.trim().toLowerCase();
  if (!raw || raw === "local") return "local";
  if (raw === "aws") return "aws";
  throw new Error(`WORKSPACE_MODE must be "local" or "aws" (got "${raw}")`);
}

/**
 * Where local-mode state lives. Also the scratch directory tests point at, so
 * it stays meaningful in `aws` mode rather than being undefined there.
 */
export function workspaceDataDir(): string {
  return process.env["WORKSPACE_DATA_DIR"] ?? join(homedir(), ".aprovan");
}

function resolveData(mode: WorkspaceMode): DataConfig {
  if (mode === "local") return { kind: "sqlite", dir: workspaceDataDir() };

  const fsBucket = process.env["FS_BUCKET"];
  if (!fsBucket) {
    throw new Error(
      "WORKSPACE_MODE=aws requires FS_BUCKET (the workspace filesystem's content bucket). " +
        "Use WORKSPACE_MODE=local to run on SQLite instead.",
    );
  }
  return {
    kind: "aws",
    region: process.env["AWS_REGION"] ?? process.env["AWS_DEFAULT_REGION"] ?? "us-east-2",
    fsBucket,
  };
}

/**
 * Live auth-mode check — deliberately not read off the memoized config, so
 * `middleware/auth.ts` and the well-known route see env changes immediately
 * (tests flip the issuer between suites). One rule, one implementation.
 */
export function resolveAuthMode(): "none" | "oidc" {
  return process.env["OIDC_ISSUER"] && process.env["OIDCAUDIENCE"] ? "oidc" : "none";
}

function resolveAuth(): WorkspaceConfig["auth"] {
  const issuer = process.env["OIDC_ISSUER"];
  const audience = process.env["OIDCAUDIENCE"];
  const common = {
    authority: process.env["COGNITO_AUTHORITY"],
    clientId: process.env["COGNITO_CLIENT_ID"],
    domain: process.env["COGNITO_DOMAIN"],
  };
  return resolveAuthMode() === "oidc"
    ? { mode: "oidc", issuer, audience, ...common }
    : { mode: "none", ...common };
}

function resolveConfig(): WorkspaceConfig {
  const mode = resolveMode();
  return {
    mode,
    port: Number(process.env["WORKSPACE_PORT"] ?? DEFAULT_PORT),
    data: resolveData(mode),
    auth: resolveAuth(),
    cron: { enabled: process.env["WORKSPACE_CRON"] !== "0" },
    allowInsecure: process.env["WORKSPACE_ALLOW_INSECURE"] === "1",
  };
}

// ---------------------------------------------------------------------------
// Installed singleton
// ---------------------------------------------------------------------------

let installed: WorkspaceConfig | undefined;

/**
 * Boot-time resolution. In `aws` mode this loads the shared identity/table
 * bundle from SSM before resolving, so the returned config reflects it.
 * Existing process env wins (`overwrite: false`) — explicit beats discovered.
 */
export async function loadWorkspaceConfig(): Promise<WorkspaceConfig> {
  const mode = resolveMode();
  if (mode === "aws") {
    const environmentName = process.env["APROVAN_ENVIRONMENT"] ?? "prd";
    process.env["AWS_REGION"] ??= "us-east-2";
    process.env["AWS_DEFAULT_REGION"] ??= process.env["AWS_REGION"];
    try {
      // Imported here rather than at module scope: @aprovan/node pulls in
      // @aws-sdk/client-ssm, and local mode — which never reaches this branch —
      // must not load the AWS SDK at all (see ../db/client.ts).
      const { loadAprovanEnv } = await import("@aprovan/node");
      await loadAprovanEnv(environmentName, { overwrite: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(
        `Failed to load /aprovan/${environmentName}/env from SSM (${process.env["AWS_REGION"]}): ${message}\n` +
          "Run with WORKSPACE_MODE=local to skip AWS entirely, or configure credentials (e.g. AWS_PROFILE=aprovan).",
      );
    }
  }
  installed = resolveConfig();
  return installed;
}

/** The active configuration. Resolves from the environment on first use. */
export function getWorkspaceConfig(): WorkspaceConfig {
  installed ??= resolveConfig();
  return installed;
}

/** Install a configuration directly (tests, embedded hosts such as Electron). */
export function setWorkspaceConfig(config: WorkspaceConfig): void {
  installed = config;
}

/** Drop the installed configuration so the next read re-resolves. */
export function resetWorkspaceConfig(): void {
  installed = undefined;
}

/** True when stores should use their AWS backends. */
export function isAwsMode(): boolean {
  return getWorkspaceConfig().data.kind === "aws";
}

// ---------------------------------------------------------------------------
// Store backend — the three-way switch (tech-plan §6, specs/fs-metadata-store)
// ---------------------------------------------------------------------------

export type StoreBackend = "sqlite" | "dynamo" | "dsql";

/**
 * Which backend the five store factories use (`fs-store`, `records`,
 * `credentials`, `audit`, `identity`). Replaces `isAwsMode()` at those
 * factories:
 *
 *   STORE_BACKEND = "sqlite" | "dynamo" | "dsql"
 *     default: sqlite when WORKSPACE_MODE=local; dsql when aws.
 *     dynamo remains for rollback / pre-cutover mirrors only.
 *
 * Lazy module loading is preserved per backend: sqlite loads no AWS SDK and
 * no `pg`; dsql loads `pg` (and the DSQL signer) only. `dsql` still rides S3
 * for FS content blobs and record spill, so aws-mode requirements (FS_BUCKET)
 * apply there unchanged.
 *
 * Deliberately read live from the environment (like {@link resolveAuthMode})
 * so test suites can flip backends between files without a config reset.
 */
export function storeBackend(): StoreBackend {
  const raw = process.env["STORE_BACKEND"]?.trim().toLowerCase();
  if (!raw) return isAwsMode() ? "dsql" : "sqlite";
  if (raw === "sqlite" || raw === "dynamo" || raw === "dsql") return raw;
  throw new Error(`STORE_BACKEND must be "sqlite", "dynamo", or "dsql" (got "${raw}")`);
}
