/**
 * Runtime gateway resolution — maps the active workspace to a base URL and
 * token source so one client build can talk to more than one gateway.
 */

export interface WorkspaceEndpoint {
  workspaceId: string;
  locus: "local" | "cloud";
  baseUrl: string;
  getToken(): string | undefined;
}

export interface GatewayResolver {
  active(): WorkspaceEndpoint | undefined;
  forWorkspace(id: string): WorkspaceEndpoint | undefined;
  list(): WorkspaceEndpoint[];
}

/** Source record fed to the resolver. Missing `locus` defaults to `"cloud"`. */
export interface WorkspaceEndpointSource {
  workspaceId: string;
  locus?: "local" | "cloud";
  /** Explicit gateway base URL. When omitted, `defaultBaseUrl` is used. */
  baseUrl?: string;
  getToken?: () => string | undefined;
}

export interface CreateGatewayResolverOptions {
  /**
   * Fallback when a workspace carries no explicit URL. May be a string or a
   * getter so hosts (e.g. the desktop shell) can point at a loopback gateway
   * that is only known after supervision starts.
   */
  defaultBaseUrl: string | (() => string);
  getActiveWorkspaceId: () => string | null | undefined;
  /** Known workspace endpoint sources. */
  getSources: () => WorkspaceEndpointSource[];
  /** Default token source when a source does not override it. */
  getToken?: () => string | undefined;
}

function normalizeBase(url: string): string {
  return url.replace(/\/$/, "");
}

export function createGatewayResolver(
  options: CreateGatewayResolverOptions,
): GatewayResolver {
  const resolveFallback = (): string =>
    normalizeBase(
      typeof options.defaultBaseUrl === "function"
        ? options.defaultBaseUrl()
        : options.defaultBaseUrl,
    );

  function toEndpoint(source: WorkspaceEndpointSource): WorkspaceEndpoint {
    const explicit = source.baseUrl?.trim();
    return {
      workspaceId: source.workspaceId,
      locus: source.locus ?? "cloud",
      baseUrl: explicit ? normalizeBase(explicit) : resolveFallback(),
      getToken: () => source.getToken?.() ?? options.getToken?.() ?? undefined,
    };
  }

  return {
    list() {
      return options.getSources().map(toEndpoint);
    },

    forWorkspace(id: string) {
      const source = options.getSources().find((s) => s.workspaceId === id);
      if (!source) return undefined;
      return toEndpoint(source);
    },

    active() {
      const id = options.getActiveWorkspaceId() ?? undefined;
      if (!id) return undefined;
      const known = options.getSources().find((s) => s.workspaceId === id);
      if (known) return toEndpoint(known);
      // Active id with no persisted source → cloud + build-time default.
      return toEndpoint({ workspaceId: id, locus: "cloud" });
    },
  };
}
