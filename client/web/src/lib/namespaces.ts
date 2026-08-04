/**
 * The gateway's namespace catalog (`GET /tools/namespaces`).
 *
 * `GET /tools` says which operations exist; it does not say whether `agents`
 * is a first-party service or somebody's SaaS. The client used to answer that
 * with a hardcoded name list in ServicesMenu, which silently misclassified
 * every namespace shipped after the list was written — `sessions`,
 * `notifications`, `telemetry`, `agents` and `sandboxes` all rendered under
 * "Providers" with a connected dot and a registry link that goes nowhere.
 *
 * The server owns the answer now. This module is just the transport plus the
 * one thing that genuinely is a client concern: which icon draws each kind.
 */

import {
  Activity,
  Bell,
  BookOpen,
  Bot,
  Box,
  Database,
  FolderTree,
  GitBranch,
  LayoutGrid,
  Plug,
  Radio,
  RefreshCw,
  Server,
  Webhook,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { GATEWAY_BASE } from "./gateway";
import { gatewayFetch } from "./gateway-fetch";

export type NamespaceKind = "core" | "interface" | "provider" | "llm-alias";

export interface NamespaceCompat {
  provider: string;
  label: string;
  connected: boolean;
}

export interface NamespaceInfo {
  id: string;
  kind: NamespaceKind;
  label: string;
  description: string;
  /** Icon slug from the service's own `meta`; mapped below. */
  icon?: string;
  /** Interfaces only: the implementations and which are connected. */
  compat?: NamespaceCompat[];
  binding?: { provider: string; options?: Record<string, unknown> } | null;
  /** LLM aliases: the model used when a call names none. */
  defaultModel?: string;
  /** Named profiles when the gateway knows them (providers and interfaces). */
  profiles?: string[];
  /** Which profile bare import / omit-profile calls use, when present. */
  defaultProfile?: string;
}

/**
 * Icon slug → mark. The slug is the service's word for what it is; picking
 * the glyph is ours. An unknown slug falls back rather than throwing, so a
 * gateway that ships a namespace this client has never heard of still renders
 * as a proper native row.
 */
const ICONS: Record<string, LucideIcon> = {
  activity: Activity,
  bell: Bell,
  "book-open": BookOpen,
  bot: Bot,
  box: Box,
  database: Database,
  "folder-tree": FolderTree,
  "git-branch": GitBranch,
  "layout-grid": LayoutGrid,
  plug: Plug,
  radio: Radio,
  "refresh-cw": RefreshCw,
  webhook: Webhook,
  workflow: Workflow,
};

export function namespaceIcon(info: Pick<NamespaceInfo, "icon">): LucideIcon {
  return (info.icon && ICONS[info.icon]) || Server;
}

export interface GroupedNamespaces {
  core: string[];
  interfaces: string[];
  providers: string[];
}

/**
 * Core namespaces this client already knew about, used **only** when the
 * gateway's catalog is unavailable.
 *
 * This is the hardcoded list the catalog was built to replace, and it is back
 * deliberately and in a smaller role. Deleting it outright coupled a deployed
 * client to a brand-new server route: against a gateway that predates
 * `/tools/namespaces` the fetch 404s, the catalog is empty, and *every*
 * namespace lands under Providers — which is what shipping the web app ahead
 * of the gateway actually did.
 *
 * The original reasoning still holds for a genuinely unknown id: a SaaS
 * claiming to be first-party misrepresents where a user's data goes, so
 * unknown must never resolve to native. The mistake was treating "the catalog
 * says nothing about `vfs`" and "the catalog could not be reached" as the same
 * state. They are not, and only the first is unknown.
 *
 * Ids only, no labels or blurbs — this list must never become a second copy of
 * the metadata that drifts from the server's. In fallback the rows render with
 * a generic mark and the namespace's own name: correct, plainer than usual,
 * and self-healing the moment the gateway catches up.
 */
const FALLBACK_CORE = new Set([
  "vfs",
  "keyvalue",
  "events",
  "registry",
  "workflows",
  "apps",
  "webhooks",
  "interfaces",
  "sync",
  "sessions",
  "notifications",
  "telemetry",
  "agents",
  "sandboxes",
]);

/** Interfaces predating the catalog, for the same fallback. */
const FALLBACK_INTERFACES = new Set(["llm", "sql", "sandbox", "agent", "vcs"]);

/**
 * Agent hosting, git hosting, and LLM are first-class native surfaces in the
 * sidebar (Runtime / VCS / LLM). They still resolve through the interfaces
 * binding model, but the services menu should list them under Native, not
 * Interfaces — same as core services.
 */
const NATIVE_INTERFACE_IDS = new Set(["agent", "vcs", "llm"]);

function isNativeInterface(namespace: string): boolean {
  return NATIVE_INTERFACE_IDS.has(namespace);
}

/**
 * Split the namespaces a workspace can call into the three sections the
 * services menu renders.
 *
 * The catalog is authoritative whenever it is present — it knows about
 * namespaces shipped after this client was built, which is the whole reason it
 * exists. Only when it is missing entirely does {@link FALLBACK_CORE} stand
 * in, and even then anything outside that list is a provider, so a namespace
 * this client has never heard of is still never claimed as first-party.
 */
export function groupNamespaces(
  namespaces: string[],
  catalog: NamespaceInfo[] | null,
): GroupedNamespaces {
  const kinds = new Map((catalog ?? []).map((info) => [info.id, info.kind]));
  const degraded = kinds.size === 0;
  const core: string[] = [];
  const interfaces: string[] = [];
  const providers: string[] = [];
  for (const namespace of namespaces) {
    const kind =
      kinds.get(namespace) ??
      (degraded && FALLBACK_CORE.has(namespace)
        ? "core"
        : degraded && isFallbackInterface(namespace)
          ? "interface"
          : undefined);
    // `plugin` is the stream-6 wire value; `core` kept for older gateways.
    if (kind === "core" || kind === "plugin") core.push(namespace);
    else if (kind === "interface") {
      if (isNativeInterface(namespace)) core.push(namespace);
      else interfaces.push(namespace);
    } else providers.push(namespace);
  }
  return { core, interfaces: interfaces.sort(), providers: providers.sort() };
}

/** A namespace is always a bare name — no colon-addressed instances. */
function isFallbackInterface(namespace: string): boolean {
  return FALLBACK_INTERFACES.has(namespace);
}

/**
 * Display metadata for a namespace, falling back to the id itself when the
 * catalog is unavailable. A plain title-cased name beats an empty row, and it
 * keeps the fallback from carrying descriptions that could contradict the
 * server's.
 */
export function namespaceLabel(
  namespace: string,
  info: NamespaceInfo | undefined,
): { label: string; description: string } {
  if (info) return { label: info.label, description: info.description };
  return { label: namespace.charAt(0).toUpperCase() + namespace.slice(1), description: "" };
}

/** Compact profile summary for services-menu subtitles when discovery lists them. */
export function namespaceProfilesHint(
  info: Pick<NamespaceInfo, "profiles" | "defaultProfile"> | undefined,
): string | undefined {
  if (!info?.profiles?.length) return undefined;
  const names = info.profiles.join(", ");
  return info.defaultProfile ? `${names} (default: ${info.defaultProfile})` : names;
}

/**
 * Fetch the catalog. Returns null when the gateway is unreachable or predates
 * the route — callers then fall back to treating unknown namespaces as
 * providers, which is the old behaviour and no worse than it was.
 */
export async function fetchNamespaces(): Promise<NamespaceInfo[] | null> {
  if (!GATEWAY_BASE) return null;
  try {
    const response = await gatewayFetch(`${GATEWAY_BASE}/tools/namespaces`);
    if (!response.ok) return null;
    const body = (await response.json()) as { namespaces?: NamespaceInfo[] };
    return Array.isArray(body.namespaces) ? body.namespaces : null;
  } catch {
    return null;
  }
}
