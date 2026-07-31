/**
 * Header services menu: what the current workspace's widgets can call.
 *
 * Four layers, one dialog:
 *  - Native services (VFS, Key value, Agents, Sessions, …) — always
 *    available, no credential.
 *  - Interfaces (llm, sql, sandbox, and any named instance like
 *    `sql:analytics`) — one tool contract, a swappable implementation. Each
 *    row shows which provider it currently resolves to.
 *  - Registry providers — connected ones (a credential exists, so their tools
 *    ride the proxy) expand to their tool list and deep-link back to the
 *    registry catalog page; unconnected catalog providers offer a one-click
 *    "connect" into the registry credentials form.
 *  - Meta tools (registry.providers / registry.search) let widgets discover
 *    UTDK SDK operations at runtime; they appear under Native → Registry.
 *
 * Which layer a namespace belongs to is the *gateway's* answer
 * (`GET /tools/namespaces`, see lib/namespaces.ts), not a list maintained
 * here. It was a list maintained here, and it was wrong: every core namespace
 * added after the list was written — sessions, notifications, telemetry,
 * agents, sandboxes — fell through to "Providers" and rendered as a connected
 * third-party SaaS with a registry link to a page that does not exist.
 */

import { ChevronRight, ExternalLink, Loader2, Plus, Server, Wrench } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ServiceInfo } from "@aprovan/patchwork-editor";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  fetchNamespaces,
  groupNamespaces,
  namespaceIcon,
  namespaceLabel,
  type NamespaceInfo,
} from "@/lib/namespaces";
import {
  credentialsUrl,
  fetchCatalogProviders,
  fetchRegistryProviders,
  providerUrl,
  registryUrl,
  type CatalogProviderSummary,
  type RegistryProviderSummary,
} from "@/lib/registry";
import { invokeRegistryTool } from "@/lib/tools";

function ToolRow({ tool }: { tool: ServiceInfo }) {
  return (
    <details className="group/tool">
      <summary className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-xs cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground [&::-webkit-details-marker]:hidden">
        <ChevronRight className="h-3 w-3 shrink-0 transition-transform group-open/tool:rotate-90" />
        <code className="font-mono shrink-0">{tool.procedure}</code>
        <span className="truncate opacity-70">{tool.description}</span>
      </summary>
      {tool.parameters ? (
        <pre className="mx-2 my-1 max-h-48 overflow-auto rounded border bg-muted/30 p-2 text-[0.65rem] font-mono whitespace-pre-wrap break-words">
          {JSON.stringify(tool.parameters, null, 2)}
        </pre>
      ) : (
        <p className="mx-2 my-1 text-[0.65rem] text-muted-foreground">
          No parameter schema published.
        </p>
      )}
    </details>
  );
}

function GroupSection({
  icon,
  title,
  subtitle,
  badge,
  action,
  tools,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  tools: ServiceInfo[];
}) {
  return (
    <details className="group rounded-md border">
      <summary className="flex items-center gap-2.5 px-3 py-2 cursor-pointer rounded-md hover:bg-muted/50 [&::-webkit-details-marker]:hidden">
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
        {icon}
        <span className="text-sm font-medium">{title}</span>
        {subtitle && (
          <span className="hidden sm:inline truncate text-xs text-muted-foreground">
            {subtitle}
          </span>
        )}
        <span className="ml-auto flex items-center gap-2 shrink-0">
          {badge}
          {action}
        </span>
      </summary>
      <div className="border-t px-2 py-1.5 space-y-0.5">
        {tools.length > 0 ? (
          tools.map((tool) => <ToolRow key={tool.name} tool={tool} />)
        ) : (
          <p className="px-2 py-1.5 text-xs text-muted-foreground">
            No tool details available.
          </p>
        )}
      </div>
    </details>
  );
}

function ProviderMark({
  provider,
  catalog,
}: {
  provider: string;
  catalog: Map<string, CatalogProviderSummary>;
}) {
  const icon = catalog.get(provider)?.icon;
  if (icon) {
    return (
      <img
        src={icon}
        alt=""
        className="h-4 w-4 rounded-sm object-contain"
        loading="lazy"
      />
    );
  }
  return (
    <span className="inline-flex h-4 w-4 shrink-0 select-none items-center justify-center overflow-hidden rounded-sm bg-foreground/80 text-[0.6rem] font-semibold leading-none text-background">
      {provider.charAt(0).toUpperCase()}
    </span>
  );
}

/** Page size for the paginated provider browse list. */
const BROWSE_PAGE_LIMIT = 20;
/** Search-box debounce before it drives a network request. */
const BROWSE_SEARCH_DEBOUNCE_MS = 300;

export function ServicesMenu({ services }: { services: ServiceInfo[] }) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  // Full catalog JSON — kept around for provider icons only now; the
  // scrollable/searchable list below is paginated separately (see below).
  const [catalog, setCatalog] = useState<CatalogProviderSummary[] | null>(null);
  // What kind each namespace is — the gateway's answer, fetched with the
  // panel rather than kept in a list here (see the module comment).
  const [namespaces, setNamespaces] = useState<NamespaceInfo[] | null>(null);

  // Paginated "browse the rest of the catalog" list. Loaded lazily (only
  // once the panel is open) and refetched from page 1 on a debounced search,
  // never on every keystroke — see lib/registry's fetchRegistryProviders.
  const [browseProviders, setBrowseProviders] = useState<RegistryProviderSummary[]>([]);
  const [browseTotal, setBrowseTotal] = useState(0);
  const [browseLoading, setBrowseLoading] = useState(false);
  const [browseLoadingMore, setBrowseLoadingMore] = useState(false);
  const [browseError, setBrowseError] = useState(false);
  const browseRequestRef = useRef(0);

  useEffect(() => {
    if (!open || catalog !== null) return;
    void fetchCatalogProviders().then((providers) => setCatalog(providers ?? []));
  }, [open, catalog]);

  useEffect(() => {
    if (!open || namespaces !== null) return;
    void fetchNamespaces().then((list) => setNamespaces(list ?? []));
  }, [open, namespaces]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedFilter(filter.trim()), BROWSE_SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [filter]);

  useEffect(() => {
    if (!open) return;
    const requestId = ++browseRequestRef.current;
    setBrowseLoading(true);
    setBrowseError(false);
    fetchRegistryProviders(invokeRegistryTool, {
      q: debouncedFilter,
      offset: 0,
      limit: BROWSE_PAGE_LIMIT,
    })
      .then((page) => {
        if (browseRequestRef.current !== requestId) return;
        setBrowseProviders(page.providers);
        setBrowseTotal(page.total);
      })
      .catch(() => {
        if (browseRequestRef.current !== requestId) return;
        setBrowseProviders([]);
        setBrowseTotal(0);
        setBrowseError(true);
      })
      .finally(() => {
        if (browseRequestRef.current === requestId) setBrowseLoading(false);
      });
  }, [open, debouncedFilter]);

  const loadMoreProviders = () => {
    const requestId = ++browseRequestRef.current;
    setBrowseLoadingMore(true);
    fetchRegistryProviders(invokeRegistryTool, {
      q: debouncedFilter,
      offset: browseProviders.length,
      limit: BROWSE_PAGE_LIMIT,
    })
      .then((page) => {
        if (browseRequestRef.current !== requestId) return;
        setBrowseProviders((prev) => [...prev, ...page.providers]);
        setBrowseTotal(page.total);
      })
      .catch(() => {
        // Leave the existing page in place — the button just stays put so
        // the user can retry.
      })
      .finally(() => {
        if (browseRequestRef.current === requestId) setBrowseLoadingMore(false);
      });
  };

  const catalogById = useMemo(
    () => new Map((catalog ?? []).map((p) => [p.id, p])),
    [catalog],
  );

  const grouped = useMemo(() => {
    const byNamespace = new Map<string, ServiceInfo[]>();
    for (const service of services) {
      const list = byNamespace.get(service.namespace) ?? [];
      list.push(service);
      byNamespace.set(service.namespace, list);
    }
    return byNamespace;
  }, [services]);

  // Classification comes from the gateway. Until it arrives (or if the
  // gateway predates the route) nothing is claimed to be native — better to
  // show a namespace as an unlabelled provider for a moment than to assert
  // the wrong kind. See groupNamespaces in lib/namespaces.
  const byId = useMemo(
    () => new Map((namespaces ?? []).map((info) => [info.id, info])),
    [namespaces],
  );
  const {
    core: nativeNamespaces,
    interfaces: interfaceNamespaces,
    providers: connectedProviders,
  } = useMemo(() => groupNamespaces([...grouped.keys()], namespaces), [grouped, namespaces]);
  const connectedSet = new Set(connectedProviders);
  // Server-side filtering/paging already narrowed this to the current
  // search; only the "already connected" providers need excluding here.
  const unconnected = browseProviders.filter((p) => !connectedSet.has(p.id));
  const hasMoreProviders = browseProviders.length < browseTotal;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 rounded hover:bg-muted transition-colors"
        title="Available services and tools"
      >
        <Server className="h-4 w-4 text-muted-foreground" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader>
          <DialogTitle>Services</DialogTitle>
          <DialogClose onClose={() => setOpen(false)} />
        </DialogHeader>
        <DialogContent className="space-y-4">
          {/* Native tool groups */}
          <section className="space-y-1.5">
            <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Native
            </h3>
            {nativeNamespaces.length > 0 ? (
              nativeNamespaces.map((ns) => {
                // `info` is absent when the gateway predates the catalog
                // route — the row still renders, just without the server's
                // label and icon. See namespaceLabel.
                const info = byId.get(ns);
                const Icon = namespaceIcon(info ?? {});
                const { label, description } = namespaceLabel(ns, info);
                const tools = grouped.get(ns) ?? [];
                return (
                  <GroupSection
                    key={ns}
                    icon={<Icon className="h-4 w-4 shrink-0 text-muted-foreground" />}
                    title={label}
                    subtitle={description}
                    badge={
                      <Badge variant="secondary" className="text-[0.65rem]">
                        {tools.length}
                      </Badge>
                    }
                    tools={tools}
                  />
                );
              })
            ) : (
              <p className="text-xs text-muted-foreground">
                Native tools load once the gateway is reachable.
              </p>
            )}
          </section>

          {/* Interfaces: one contract, a swappable implementation */}
          {interfaceNamespaces.length > 0 && (
            <section className="space-y-1.5">
              <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Interfaces
              </h3>
              {interfaceNamespaces.map((ns) => {
                const info = byId.get(ns);
                const Icon = namespaceIcon(info ?? {});
                const { description } = namespaceLabel(ns, info);
                const tools = grouped.get(ns) ?? [];
                // What this namespace resolves to *right now*: the explicit
                // binding, else the first connected implementation — the same
                // fallback the gateway applies, spelled out so an unbound
                // interface doesn't read as a broken one.
                const fallback = info?.compat?.find((entry) => entry.connected);
                const provider = info?.binding?.provider ?? fallback?.provider;
                const providerLabel =
                  info?.compat?.find((entry) => entry.provider === provider)?.label ?? provider;
                return (
                  <GroupSection
                    key={ns}
                    icon={<Icon className="h-4 w-4 shrink-0 text-muted-foreground" />}
                    title={ns}
                    subtitle={description}
                    badge={
                      <>
                        {providerLabel && (
                          <span
                            className="whitespace-nowrap text-[0.65rem] text-muted-foreground"
                            title={
                              info?.binding
                                ? `Bound to ${providerLabel}`
                                : `No binding — falling back to ${providerLabel}`
                            }
                          >
                            → {providerLabel}
                            {!info?.binding && <span className="opacity-60"> (auto)</span>}
                          </span>
                        )}
                        <Badge variant="secondary" className="text-[0.65rem]">
                          {tools.length}
                        </Badge>
                      </>
                    }
                    tools={tools}
                  />
                );
              })}
            </section>
          )}

          {/* Connected registry providers */}
          <section className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Providers
              </h3>
              <a
                href={credentialsUrl()}
                target="_blank"
                rel="noreferrer"
                className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <Plus className="h-3 w-3" />
                add credential
              </a>
            </div>
            {connectedProviders.length > 0 ? (
              connectedProviders.map((provider) => {
                const tools = grouped.get(provider) ?? [];
                const info = catalogById.get(provider);
                return (
                  <GroupSection
                    key={provider}
                    icon={<ProviderMark provider={provider} catalog={catalogById} />}
                    title={info?.title ?? provider}
                    subtitle={info?.description ?? undefined}
                    badge={
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <Badge variant="secondary" className="text-[0.65rem]">
                          {tools.length}
                        </Badge>
                      </>
                    }
                    action={
                      <a
                        href={providerUrl(provider)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-0.5 rounded text-muted-foreground hover:text-foreground"
                        title="Open in registry"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    }
                    tools={tools}
                  />
                );
              })
            ) : (
              <p className="text-xs text-muted-foreground">
                No providers connected yet — add a credential to bring its
                tools into this workspace.
              </p>
            )}
          </section>

          {/* The rest of the catalog: one click from connected */}
          <section className="space-y-1.5">
            <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Available in the registry
            </h3>
            <Input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter providers…"
              className="h-8"
            />
            {browseLoading ? (
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Loader2 className="h-3 w-3 animate-spin" />
                {debouncedFilter ? "Searching…" : "Loading catalog…"}
              </p>
            ) : unconnected.length > 0 ? (
              <>
                <div className="max-h-56 space-y-0.5 overflow-y-auto">
                  {unconnected.map((provider) => (
                    <div
                      key={provider.id}
                      className="flex items-center gap-2.5 rounded-sm px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted/50"
                    >
                      <ProviderMark provider={provider.id} catalog={catalogById} />
                      <a
                        href={providerUrl(provider.id)}
                        target="_blank"
                        rel="noreferrer"
                        className="truncate font-medium text-foreground/80 hover:underline"
                      >
                        {provider.title}
                      </a>
                      {provider.description && (
                        <span className="hidden sm:inline truncate opacity-70">
                          {provider.description}
                        </span>
                      )}
                      <a
                        href={credentialsUrl(provider.id)}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-auto flex shrink-0 items-center gap-1 whitespace-nowrap text-[0.65rem] uppercase tracking-wide hover:text-foreground"
                      >
                        connect
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  ))}
                </div>
                {hasMoreProviders && (
                  <button
                    type="button"
                    onClick={loadMoreProviders}
                    disabled={browseLoadingMore}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs rounded border border-dashed text-muted-foreground hover:bg-muted/50 hover:text-foreground disabled:opacity-50"
                  >
                    {browseLoadingMore && <Loader2 className="h-3 w-3 animate-spin" />}
                    Load more ({browseTotal - browseProviders.length})
                  </button>
                )}
              </>
            ) : (
              <p className="text-xs text-muted-foreground">
                {browseError
                  ? "Couldn't load the catalog — try again shortly."
                  : debouncedFilter
                    ? "No providers match the search."
                    : "Catalog unavailable."}
              </p>
            )}
            <a
              href={registryUrl("/providers/")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <Wrench className="h-3 w-3" />
              Browse the full registry
              <ExternalLink className="h-3 w-3" />
            </a>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
