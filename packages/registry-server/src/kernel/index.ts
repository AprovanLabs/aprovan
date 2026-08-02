/**
 * The service kernel — the contract every native (core) service is written
 * against, extracted from apps/workspace/src/service-kernel.ts (tech-plan D6).
 *
 * `ServiceError`, `ServiceContext`, and `CoreService` live HERE, in the
 * package every host embeds: the dispatch pipeline, the native-service
 * contract, and the QuickJS sandbox all speak `ServiceError`, and one
 * canonical definition means `instanceof` checks in the host against the
 * package's export succeed (sandbox-runtime spec "ServiceError moves with the
 * kernel contract").
 *
 * Hosts with product-plane context (app scoping, capability grants, interface
 * redirection) extend `ServiceContext` by module augmentation:
 *
 *   declare module "@aprovan/registry-server" {
 *     interface ServiceContext { appScope?: MyAppScope }
 *   }
 */

/** A status-carrying service failure — the one error type dispatch speaks. */
export class ServiceError extends Error {
  constructor(
    message: string,
    readonly status: number = 400,
  ) {
    super(message);
  }
}

/**
 * The context a native service call executes in. `workspaceId` is the host's
 * name for the tenant (embedded hosts map workspace→tenant 1:1, same string);
 * `userId` is the calling principal.
 */
export interface ServiceContext {
  workspaceId: string;
  userId: string;
  /** Event-cascade depth when the caller is a workflow run. */
  workflowDepth?: number;
  /** Trace correlation — cascades carry these forward. */
  traceId?: string;
  /** The run this context descends from (the parent edge in the trace). */
  parentRunId?: string;
}

/** Discovery entry for one operation (`GET /tools`). */
export interface ToolEntry {
  provider: string;
  name: string;
  operation: string;
  description?: string;
  inputSchema?: unknown;
  outputSchema?: unknown;
}

/**
 * How a namespace presents itself to a human. Every native service declares
 * its own, so a client never keeps a parallel map of labels and blurbs.
 */
export interface CoreServiceMeta {
  /** Human label ("Key value"). */
  label: string;
  /** One line: what the namespace is for. */
  blurb: string;
  /** Icon slug the client maps to its own icon set. */
  icon: string;
}

export interface CoreService {
  /** Identity + one-line description for discovery and UI. */
  meta: CoreServiceMeta;
  /** Tool entries advertised in discovery (`GET /tools`). */
  tools: Omit<ToolEntry, "provider">[];
  call(
    ctx: ServiceContext,
    procedure: string,
    args: Record<string, unknown>,
  ): Promise<unknown>;
}

// ---------------------------------------------------------------------------
// Native-service registry
// ---------------------------------------------------------------------------

/**
 * Per-server native-service registry. Hosts register `CoreService`-shaped
 * implementations (`registerNativeServices()`); the standalone image
 * registers only the execution-plane natives. Product natives (vfs,
 * workflows, …) stay host-registered — this is the seam WS-4 uses.
 *
 * Deliberately instance-scoped (not module-global): two embedded servers in
 * one process must not share service tables.
 */
export class NativeServiceRegistry {
  private readonly services = new Map<string, CoreService>();

  constructor(initial?: Record<string, CoreService>) {
    if (initial) this.registerNativeServices(initial);
  }

  registerNativeServices(services: Record<string, CoreService>): void {
    for (const [name, service] of Object.entries(services)) {
      this.services.set(name, service);
    }
  }

  get(namespace: string): CoreService | undefined {
    return this.services.get(namespace);
  }

  has(namespace: string): boolean {
    return this.services.has(namespace);
  }

  names(): string[] {
    return [...this.services.keys()];
  }

  /** Discovery entries for every native service (always available, no credential). */
  toolEntries(): ToolEntry[] {
    return [...this.services.entries()].flatMap(([provider, service]) =>
      service.tools.map((tool) => ({ ...tool, provider })),
    );
  }

  /** Each native namespace's identity, for the namespace catalog. */
  meta(): Array<CoreServiceMeta & { id: string }> {
    return [...this.services.entries()].map(([id, service]) => ({
      id,
      ...service.meta,
    }));
  }
}
