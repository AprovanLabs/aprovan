/**
 * Shared test harness: an in-memory storage + a small synthetic catalog that
 * exercises every resolution shape (interface with credentialless entry,
 * interface without, llm aliases, plain providers).
 */

import {
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { CredentialService } from "../src/credentials/service.js";
import { createOAuthTokenCache } from "../src/credentials/oauth.js";
import { Dispatcher, type CompatDispatch } from "../src/dispatch/index.js";
import { RateLimiter } from "../src/dispatch/limits.js";
import { ProviderExecutor } from "../src/executor/index.js";
import { NativeServiceRegistry, type CoreService } from "../src/kernel/index.js";
import { ProfileService } from "../src/profiles/service.js";
import { RegistryTelemetry } from "../src/telemetry/index.js";
import { createStorage } from "../src/storage/index.js";
import type { ResolveDeps } from "../src/profiles/resolve.js";
import type { CallContext } from "../src/config/types.js";
import type { InterfaceCatalog } from "../src/catalog/types.js";
import type { RegistryStorage } from "../src/storage/types.js";

export const TEST_CATALOG: InterfaceCatalog = {
  interfaces: [
    {
      id: "sql",
      label: "SQL",
      description: "Query relational databases",
      timeoutMs: 60_000,
      defaultsFor: ["query"],
      compat: [
        { provider: "postgres", label: "PostgreSQL", module: "postgres" },
        { provider: "snowflake", label: "Snowflake", module: "snowflake" },
        {
          provider: "duckdb",
          label: "DuckDB",
          module: "duckdb",
          unavailable: "declared but not yet built",
        },
      ],
    },
    {
      id: "agent",
      label: "Agents",
      description: "Run agents",
      timeoutMs: 300_000,
      defaultsFor: ["run"],
      compat: [
        {
          provider: "native",
          label: "Native runner",
          module: "native",
          credentialless: true,
        },
        { provider: "openai", label: "OpenAI", module: "openai" },
      ],
    },
  ],
  llmAliases: [
    {
      id: "anthropic",
      label: "Claude",
      module: "openai",
      baseUrl: "https://api.anthropic.com/v1",
      defaultModel: "claude-sonnet-5",
    },
    { id: "openai", label: "OpenAI", module: "openai", defaultModel: "gpt-5.1" },
  ],
};

export const KNOWN_PROVIDERS = new Set([
  "github",
  "postgres",
  "snowflake",
  "openai",
  "slack",
]);

export interface TestEnv {
  storage: RegistryStorage;
  credentials: CredentialService;
  profiles: ProfileService;
  deps: ResolveDeps;
  close(): Promise<void>;
}

export async function makeEnv(
  options: { authMode?: "oidc" | "api-key" | "none"; catalog?: InterfaceCatalog } = {},
): Promise<TestEnv> {
  const storage = await createStorage({ driver: "sqlite", url: "file::memory:" });
  const catalog = options.catalog ?? TEST_CATALOG;
  const credentials = new CredentialService(storage.credentials);
  const profiles = new ProfileService(storage.profiles, storage.grants, credentials, catalog);
  const deps: ResolveDeps = {
    catalog,
    profiles: storage.profiles,
    profileService: profiles,
    credentials,
    isKnownProvider: (id) => KNOWN_PROVIDERS.has(id),
    authMode: options.authMode ?? "oidc",
  };
  return { storage, credentials, profiles, deps, close: () => storage.close() };
}

export function ctx(overrides: Partial<CallContext> = {}): CallContext {
  return {
    tenantId: "t1",
    principal: "user-1",
    source: { type: "tool" },
    role: "member",
    groupIds: [],
    ...overrides,
  };
}

export const adminCtx = (overrides: Partial<CallContext> = {}): CallContext =>
  ctx({ role: "admin", ...overrides });

// ---------------------------------------------------------------------------
// Dispatcher harness
// ---------------------------------------------------------------------------

export interface DispatchEnv extends TestEnv {
  dispatcher: Dispatcher;
  executor: ProviderExecutor;
  natives: NativeServiceRegistry;
  limiter: RateLimiter;
  telemetry: RegistryTelemetry;
  exporter: InMemorySpanExporter;
}

export async function makeDispatchEnv(
  options: {
    authMode?: "oidc" | "api-key" | "none";
    catalog?: InterfaceCatalog;
    nativeServices?: Record<string, CoreService>;
    limits?: { defaultRps?: number; defaultBurst?: number };
    compatDispatch?: CompatDispatch;
  } = {},
): Promise<DispatchEnv> {
  const env = await makeEnv(options);
  const executor = new ProviderExecutor();
  const natives = new NativeServiceRegistry(options.nativeServices);
  const limiter = new RateLimiter(options.limits ?? {});
  const exporter = new InMemorySpanExporter();
  const telemetry = new RegistryTelemetry({
    spanProcessor: new SimpleSpanProcessor(exporter),
  });
  await telemetry.ready();
  const dispatcher = new Dispatcher({
    catalog: options.catalog ?? TEST_CATALOG,
    natives,
    credentials: env.credentials,
    resolveDeps: env.deps,
    executor,
    limiter,
    telemetry,
    audit: env.storage.audit,
    oauthCache: createOAuthTokenCache(),
    ...(options.compatDispatch ? { compatDispatch: options.compatDispatch } : {}),
  });
  return { ...env, dispatcher, executor, natives, limiter, telemetry, exporter };
}

/** A provider module whose calls capture headers/args for assertions. */
export function fakeProviderModule(factoryName: string) {
  const calls: Array<{ headers: Record<string, string>; baseUrl?: string; args: unknown }> = [];
  const mod = {
    [factoryName]: async (opts?: { headers?: Record<string, string>; baseUrl?: string }) => ({
      repos: {
        get: async (args: Record<string, unknown>) => {
          calls.push({
            headers: opts?.headers ?? {},
            ...(opts?.baseUrl ? { baseUrl: opts.baseUrl } : {}),
            args,
          });
          return { echoed: args };
        },
      },
      query: async (args: Record<string, unknown>) => {
        calls.push({
          headers: opts?.headers ?? {},
          ...(opts?.baseUrl ? { baseUrl: opts.baseUrl } : {}),
          args,
        });
        return { rows: [], echoed: args };
      },
      createChatCompletion: async (args: Record<string, unknown>) => {
        calls.push({
          headers: opts?.headers ?? {},
          ...(opts?.baseUrl ? { baseUrl: opts.baseUrl } : {}),
          args,
        });
        return { choices: [], echoed: args };
      },
    }),
  };
  return { mod, calls };
}
