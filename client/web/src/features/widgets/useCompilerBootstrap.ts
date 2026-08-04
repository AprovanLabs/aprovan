import { useEffect, useRef, useState } from "react";
import { createCompiler, type Compiler } from "@aprovan/patchwork";
import type { ServiceInfo } from "@aprovan/editor";
import { ACTIVE_WORKSPACE_KEY } from "@/features/tabs/useTabs";
import { getAccessTokenSync } from "@/lib/auth";
import { GATEWAY_BASE } from "@/lib/gateway";
import { gatewayFetch } from "@/lib/gateway-fetch";
import { recordWidgetEvent } from "@/lib/telemetry";

// The compiler calls POST ${PROXY_URL}/:provider/:operation for widget tool calls.
// Map to the gateway's /tools/:provider/:operation path.
export const PROXY_URL = GATEWAY_BASE ? `${GATEWAY_BASE}/tools` : "";

// Version-pinned: esm.sh caches the unversioned "latest" redirect for hours,
// so a bare spec can silently serve a stale image after a publish.
export const IMAGE_SPEC = "@aprovan/patchwork-image-shadcn@0.1.4";
// Local proxy for loading image packages, esm.sh for widget imports
export const IMAGE_CDN_URL = import.meta.env.DEV ? "/_local-packages" : "https://esm.sh";
export const WIDGET_CDN_URL = "https://esm.sh"; // Widget imports need esm.sh bundles like @packagedcn

// See packages/editor's withTimeout doc comment: bounds the edit flow's
// post-edit compile check so a stalled compiler call can't hang the panel.
export const COMPILE_TIMEOUT_MS = 20_000;

interface GatewayToolEntry {
  provider: string;
  name: string;
  operation: string;
  description?: string;
  inputSchema?: unknown;
}

/**
 * Mount-time bootstrap for the widget pipeline: creates the compiler against
 * the pinned image, seeds the image runtime-prompt ref, and fetches the
 * gateway's tool list into `namespaces`/`services` — the values ChatPage feeds
 * into `PatchworkCtx.Provider`.
 */
export function useCompilerBootstrap(args: { refreshWorkspace: () => Promise<void> }) {
  const { refreshWorkspace } = args;
  const [compiler, setCompiler] = useState<Compiler | null>(null);
  const [compilerError, setCompilerError] = useState<string | null>(null);
  const [namespaces, setNamespaces] = useState<string[]>([]);
  const [services, setServices] = useState<ServiceInfo[]>([]);
  // Per-image runtime prompts (from each image's manifest), read at send time
  // by the chat transport's prompt composition.
  const imagePromptsRef = useRef("");

  useEffect(() => {
    // Fetch available services directly from the gateway.
    // Requires the platform auth flow to have stored a Cognito token and an
    // active workspace id. Gracefully skips when either is absent.
    const fetchGatewayTools = async () => {
      const token = getAccessTokenSync();
      const wsId = localStorage.getItem(ACTIVE_WORKSPACE_KEY);
      if (!token || !wsId || !GATEWAY_BASE) return;

      // Register the active workspace with the gateway (idempotent; non-fatal).
      try {
        await gatewayFetch(`${GATEWAY_BASE}/auth/sessions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workspace_id: wsId }),
        });
      } catch {
        // Non-fatal — session may already be established from a prior chat request.
      }

      try {
        // `?scope=configured` is a faster path (core + credentialed
        // providers + LLM aliases only — same `{ tools }` shape) than the
        // unscoped list, which walks every connected provider's catalog
        // entry over the network. It may not exist on every gateway yet, so
        // fall back to the plain call on any failure; an old gateway that
        // just ignores the unknown query param degrades to today's
        // behavior for free.
        let res: Response;
        try {
          res = await gatewayFetch(`${GATEWAY_BASE}/tools?scope=configured`);
          if (!res.ok) throw new Error(`scoped tools fetch failed (${res.status})`);
        } catch {
          res = await gatewayFetch(`${GATEWAY_BASE}/tools`);
        }
        if (!res.ok) return;
        const data = (await res.json()) as { tools?: GatewayToolEntry[] };
        const tools = data.tools ?? [];
        const providers = Array.from(new Set(tools.map((t) => t.provider)));
        setNamespaces(providers);
        setServices(
          tools.map((t) => ({
            namespace: t.provider,
            name: t.name,
            procedure: t.operation,
            description: t.description ?? "",
            parameters: t.inputSchema as Record<string, unknown> | undefined,
          }))
        );
      } catch {
        setNamespaces([]);
        setServices([]);
      }
    };
    void fetchGatewayTools();

    // Initialize compiler; the loaded image carries its own runtime prompt
    // (PROMPT.md via the `patchwork.prompt` manifest field), composed into
    // the system prompt at send time.
    createCompiler({
      image: IMAGE_SPEC,
      proxyUrl: PROXY_URL,
      proxyFetch: gatewayFetch,
      cdnBaseUrl: IMAGE_CDN_URL,
      widgetCdnBaseUrl: WIDGET_CDN_URL,
      // Console output, uncaught errors, and service calls from every
      // mounted widget land in the local logs buffer (editor Logs panel)
      // and — for console/errors — ship to the workspace telemetry store.
      telemetry: recordWidgetEvent,
    })
      .then((created) => {
        setCompiler(created);
        setCompilerError(null);
        imagePromptsRef.current = [created.getImage(IMAGE_SPEC)]
          .flatMap((img) => (img?.prompt ? [img.prompt] : []))
          .join("\n\n");
      })
      .catch((err) => {
        console.error(err);
        // Without a compiler every widget silently falls back to "Compiler
        // not initialized" — surface the real cause instead.
        setCompilerError(err instanceof Error ? err.message : "Failed to load the widget compiler");
      });

    void refreshWorkspace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { compiler, compilerError, namespaces, services, imagePromptsRef };
}
