/**
 * Deep links into the registry web app — the harness for every
 * patchwork → registry hand-off (credentials, provider pages).
 *
 * `VITE_REGISTRY_URL` overrides the base; dev defaults to the local Astro
 * dev server so local patchwork never bounces to production aprovan.com.
 */

const REGISTRY_BASE = (
  (import.meta.env["VITE_REGISTRY_URL"] as string | undefined) ??
  (import.meta.env.DEV
    ? "http://localhost:4321"
    : "https://aprovan.com/registry")
).replace(/\/$/, "");

export function registryUrl(path = "/"): string {
  return `${REGISTRY_BASE}${path}`;
}

/** Credentials page; pass a provider id to preselect it in the add form. */
export function credentialsUrl(provider?: string): string {
  const query = provider ? `?provider=${encodeURIComponent(provider)}` : "";
  return registryUrl(`/account/credentials/${query}`);
}

const CHAT_BASE = (
  (import.meta.env["VITE_CHAT_URL"] as string | undefined) ??
  (import.meta.env.DEV
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/chat`
    : "https://aprovan.com/chat")
).replace(/\/$/, "");

/**
 * Deep-link URL for external stubs (e.g. catalog MovedNotice) into chat native
 * surfaces. In-app CTAs should call `openNativeTab` instead.
 */
export function chatDeepLinkUrl(
  native: "credentials" | "admin",
  provider?: string,
): string {
  const params = new URLSearchParams({ native });
  if (provider && native === "credentials") {
    params.set("provider", provider);
  }
  return `${CHAT_BASE}/?${params.toString()}`;
}

/** Provider detail page in the registry catalog. */
export function providerUrl(provider: string): string {
  return registryUrl(`/providers/?p=${encodeURIComponent(provider)}`);
}

export interface CatalogProviderSummary {
  id: string;
  title: string;
  description: string | null;
  packageName: string;
  icon: string | null;
}

/**
 * The public registry catalog (all published providers, with icons). Static
 * JSON — same origin in production, so no auth involved. Null on failure.
 */
export async function fetchCatalogProviders(): Promise<
  CatalogProviderSummary[] | null
> {
  try {
    const response = await fetch(registryUrl("/catalog/providers.json"));
    if (!response.ok) return null;
    const body = (await response.json()) as {
      providers?: CatalogProviderSummary[];
    };
    return Array.isArray(body.providers) ? body.providers : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Paginated provider browsing (ServicesMenu's "Available in the registry")
// ---------------------------------------------------------------------------

export interface RegistryProviderSummary {
  id: string;
  title: string;
  description: string | null;
}

export interface RegistryProvidersPage {
  providers: RegistryProviderSummary[];
  total: number;
}

/** One namespace's dispatch — matches `lib/tools.ts`'s `ToolsInvoke`, kept
 *  structural here so this module doesn't have to import from it. */
type Invoke = (operation: string, args: Record<string, unknown>) => Promise<unknown>;

const DEFAULT_PAGE_LIMIT = 20;

/**
 * Paginated, searchable provider listing for the "browse the rest of the
 * catalog" section of the tools panel. Previously that section fetched the
 * *entire* public catalog JSON eagerly the moment the panel opened — fine
 * for a small catalog, not for "paginate and load more on search". Rides the
 * gateway's `registry.providers` procedure so paging/search happen
 * server-side, with two layers of defensive fallback since a concurrent
 * gateway change is what's expected to add real pagination there:
 *
 *  1. `registry.providers` missing, erroring, or (pre-pagination rollout)
 *     silently ignoring `offset`/`limit` and returning everything — sliced
 *     client-side either way, so "Load more" always behaves.
 *  2. The procedure entirely unavailable → `registry.search` (a keyword
 *     search over *operations*, always present) deduped down to the
 *     providers it mentions — coarser, but keeps search working.
 *  3. The gateway unreachable at all → the public static catalog JSON this
 *     replaced, filtered/sliced client-side, so the section never goes
 *     empty just because auth/workspace isn't wired up.
 */
export async function fetchRegistryProviders(
  invoke: Invoke,
  { q = "", offset = 0, limit = DEFAULT_PAGE_LIMIT }: { q?: string; offset?: number; limit?: number },
): Promise<RegistryProvidersPage> {
  try {
    const result = (await invoke("providers", { q, offset, limit })) as {
      providers?: Array<{ id: string; title?: string; description?: string | null }>;
      total?: number;
    };
    const providers = Array.isArray(result?.providers) ? result.providers : [];
    // A pre-pagination `registry.providers` ignores offset/limit and returns
    // the full (filtered) set; slice it ourselves so paging still works, and
    // fall back to its length for `total` when the response doesn't say.
    const page =
      typeof result?.total === "number" ? providers : providers.slice(offset, offset + limit);
    return {
      providers: page.map((p) => ({
        id: p.id,
        title: p.title ?? p.id,
        description: p.description ?? null,
      })),
      total: typeof result?.total === "number" ? result.total : providers.length,
    };
  } catch {
    // registry.providers missing/erroring — fall through to registry.search.
  }

  try {
    const result = (await invoke("search", { q, limit: Math.max(limit * 4, 40) })) as {
      tools?: Array<{ provider: string; description?: string }>;
    };
    const tools = Array.isArray(result?.tools) ? result.tools : [];
    const byProvider = new Map<string, string | undefined>();
    for (const tool of tools) {
      if (!tool.provider || byProvider.has(tool.provider)) continue;
      byProvider.set(tool.provider, tool.description);
    }
    const all: RegistryProviderSummary[] = Array.from(byProvider.entries()).map(
      ([id, description]) => ({ id, title: id, description: description ?? null }),
    );
    return { providers: all.slice(offset, offset + limit), total: all.length };
  } catch {
    // Gateway unreachable entirely — fall through to the static catalog.
  }

  const catalog = (await fetchCatalogProviders()) ?? [];
  const query = q.trim().toLowerCase();
  const filtered = query
    ? catalog.filter(
        (p) => p.id.toLowerCase().includes(query) || p.title.toLowerCase().includes(query),
      )
    : catalog;
  return {
    providers: filtered
      .slice(offset, offset + limit)
      .map((p) => ({ id: p.id, title: p.title, description: p.description })),
    total: filtered.length,
  };
}
