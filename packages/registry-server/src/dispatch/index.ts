/**
 * The ONE dispatch pipeline (tech-plan D5, provider-execution spec) — shared
 * by HTTP, the embedding API, MCP, and the QuickJS guest:
 *
 *   classify (native | interface | provider | llm-alias)
 *     → resolveProfile (grants, compat, credential — the normative algorithm)
 *     → OAuth pre-resolution (executor only ever sees injectables)
 *     → limits (token bucket keyed tenant:profileOrProvider:principal)
 *     → execute (ProviderExecutor)
 *     → audit + telemetry span on EVERY exit path.
 *
 * Failures leave as `ServiceError`s (status-carrying); the HTTP layer maps
 * them to responses, the embed/MCP/sandbox surfaces re-throw or envelope.
 */

import { findLlmAlias, type InterfaceCatalog } from "../catalog/types.js";
import { resolveToInjectable, OAuthExchangeError, type OAuthTokenCache } from "../credentials/oauth.js";
import { RateLimitExceededError, type RateLimiter } from "./limits.js";
import { asStreamBody } from "./stream.js";
import { resolveProfile, type ResolveDeps, type ResolvedProfile } from "../profiles/resolve.js";
import { ServiceError, type NativeServiceRegistry, type ServiceContext } from "../kernel/index.js";
import type { CallContext, DispatchResult } from "../config/types.js";
import type { CredentialService } from "../credentials/service.js";
import type { InjectableCredential } from "../credentials/types.js";
import type { ProviderExecutor } from "../executor/index.js";
import type { AuditStore } from "../storage/types.js";
import type { RegistryTelemetry } from "../telemetry/index.js";

export interface DispatchOptions {
  profile?: string;
  stream?: boolean;
  /** Ephemeral request-supplied credential (HTTP surface only). */
  credential?: InjectableCredential;
}

/**
 * Host hook for compat entries that execute IN the host process (module
 * "native" — e.g. the agent contract's native runner). Keyed by interface id.
 */
export type CompatDispatch = Record<
  string,
  (ctx: ServiceContext, operation: string, args: Record<string, unknown>) => Promise<unknown>
>;

export interface DispatcherDeps {
  catalog: InterfaceCatalog;
  natives: NativeServiceRegistry;
  credentials: CredentialService;
  resolveDeps: ResolveDeps;
  executor: ProviderExecutor;
  limiter: RateLimiter;
  telemetry: RegistryTelemetry;
  audit: AuditStore;
  oauthCache: OAuthTokenCache;
  compatDispatch?: CompatDispatch;
}

const isOAuth = (payload: { type: string }): boolean =>
  payload.type === "oauth2_client" || payload.type === "oauth2_authcode";

export class Dispatcher {
  constructor(private readonly deps: DispatcherDeps) {}

  /**
   * Dispatch one operation. Success returns a DispatchResult; every failure
   * throws a ServiceError — and BOTH paths append an audit row and record
   * exactly one attributed dispatch span first.
   */
  async dispatch(
    ctx: CallContext,
    namespace: string,
    operation: string,
    args: Record<string, unknown>,
    opts: DispatchOptions = {},
  ): Promise<DispatchResult> {
    const requestId = crypto.randomUUID();
    const start = Date.now();
    let profileId: string | undefined;
    let profileName: string | undefined;
    let finished = false;

    const finish = (status: number, error?: string): void => {
      if (finished) return; // exactly one audit row + span per dispatch
      finished = true;
      const durationMs = Date.now() - start;
      void this.deps.audit.append({
        requestId,
        tenantId: ctx.tenantId,
        principal: ctx.principal,
        namespace,
        operation,
        ...(profileId !== undefined ? { profileId } : {}),
        status,
        durationMs,
      });
      // Observing the observer is noise: telemetry-namespace dispatches are
      // audited but not span-recorded (registry-telemetry spec).
      if (namespace !== "telemetry") {
        this.deps.telemetry.dispatchSpan(ctx, {
          requestId,
          namespace,
          operation,
          ...(profileName !== undefined ? { profile: profileName } : {}),
          status,
          durationMs,
          ...(error !== undefined ? { error } : {}),
        });
      }
    };

    const fail = (err: unknown): never => {
      const status =
        err instanceof ServiceError
          ? err.status
          : err instanceof RateLimitExceededError
            ? 429
            : 500;
      const message = err instanceof Error ? err.message : String(err);
      finish(status, message);
      if (err instanceof ServiceError) throw err;
      throw new ServiceError(message, status);
    };

    try {
      // ---- Native services: no profile machinery; host-registered. --------
      const native = this.deps.natives.get(namespace);
      if (native) {
        if (opts.profile !== undefined) {
          throw new ServiceError(
            `${namespace} is a native service — it has no credential profiles to pin`,
            400,
          );
        }
        const serviceCtx: ServiceContext = {
          workspaceId: ctx.tenantId,
          userId: ctx.principal,
          ...(ctx.traceId !== undefined ? { traceId: ctx.traceId } : {}),
        };
        const data = await native.call(serviceCtx, operation, args);
        finish(200);
        return { kind: "json", data, requestId, durationMs: Date.now() - start };
      }

      // ---- Everything else: the normative profile resolution. -------------
      const resolved: ResolvedProfile = await resolveProfile(
        this.deps.resolveDeps,
        ctx,
        namespace,
        opts.profile,
      );
      profileId = resolved.profileId;
      profileName = resolved.profileName;

      // Server-side limits: profile limits over tenant defaults, keyed
      // (tenant, profile-or-provider, principal). Enforced before execution
      // on every surface that reaches this pipeline.
      const limitSubject = resolved.profileId ?? `${resolved.target.kind}:${resolved.target.id}`;
      this.deps.limiter.enforce(
        `${ctx.tenantId}:${limitSubject}:${ctx.principal}`,
        resolved.limits,
      );

      // Argument shaping: top-level stream flag folds into provider args;
      // interface option defaults fill missing args for defaultsFor ops.
      let callArgs = opts.stream === true ? { ...args, stream: true } : { ...args };
      if (resolved.defaultsFor.includes(operation)) {
        callArgs = { ...resolved.options, ...callArgs };
      }
      const alias =
        resolved.target.kind === "provider"
          ? findLlmAlias(this.deps.catalog, resolved.target.id)
          : undefined;
      if (alias && operation === "createChatCompletion" && !("model" in callArgs)) {
        const model = resolved.options["model"] ?? alias.defaultModel;
        callArgs = { ...callArgs, model };
      }

      // In-host compat short-circuit (module "native"): the implementation IS
      // the host process; no module, no credential, no executor.
      if (resolved.module === "native") {
        const hook = this.deps.compatDispatch?.[resolved.target.id];
        if (!hook) {
          throw new ServiceError(
            `${resolved.target.id} resolves to ${resolved.provider}, which executes in the host ` +
              `process — no host implementation is registered on this server.`,
            501,
          );
        }
        const data = await hook(
          { workspaceId: ctx.tenantId, userId: ctx.principal, ...(ctx.traceId ? { traceId: ctx.traceId } : {}) },
          operation,
          callArgs,
        );
        finish(200);
        return { kind: "json", data, requestId, durationMs: Date.now() - start };
      }

      // OAuth pre-resolution: the executor only ever receives injectables.
      let credentials: InjectableCredential | undefined;
      if (opts.credential) {
        credentials = opts.credential;
      } else if (resolved.credential) {
        if (isOAuth(resolved.credential.payload)) {
          try {
            credentials = await resolveToInjectable(resolved.credential.payload, {
              cacheKey: `${ctx.tenantId}:${resolved.provider}:${resolved.credential.id}`,
              cache: this.deps.oauthCache,
              persist: (payload) =>
                this.deps.credentials.updatePayload(
                  ctx.tenantId,
                  resolved.credential!.id,
                  payload,
                ),
            });
          } catch (err) {
            throw new ServiceError(
              err instanceof OAuthExchangeError
                ? `OAuth token resolution failed for ${resolved.provider}: ${err.message}`
                : `OAuth token resolution failed for ${resolved.provider}`,
              502,
            );
          }
        } else {
          credentials = resolved.credential.payload as InjectableCredential;
        }
      }

      // Execute.
      const timeout = resolved.timeoutMs ?? (alias ? 120_000 : 30_000);
      const result = await this.deps.executor.execute({
        provider: resolved.module,
        ...(resolved.moduleSpecifier ? { module: resolved.moduleSpecifier } : {}),
        operation,
        args: callArgs,
        ...(credentials ? { credentials } : {}),
        ...(resolved.baseUrl ? { baseUrl: resolved.baseUrl } : {}),
        timeout,
      });

      if (!result.success) {
        throw new ServiceError(result.error ?? `${namespace}.${operation} failed`, 502);
      }

      // For streaming results this measures time to first byte — the body is
      // still being produced when the audit row lands.
      finish(200);
      const streamBody = asStreamBody(result.data);
      if (streamBody) {
        return { kind: "stream", stream: streamBody.stream, headers: streamBody.headers };
      }
      return { kind: "json", data: result.data, requestId, durationMs: Date.now() - start };
    } catch (err) {
      return fail(err);
    }
  }
}
