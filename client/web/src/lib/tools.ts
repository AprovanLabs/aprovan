/**
 * Gateway tool-namespace transports.
 *
 * Every first-party capability the chat app drives from the UI — apps,
 * workflows, and whatever namespace comes next — is reached the same way:
 * `POST /tools/<namespace>/<operation>` with an `{ args }` body, unwrapping
 * the envelope's `data`. That is the "capability = namespace" rule from
 * docs/apps-and-workflows.md: a UTDK provider procedure, a core service
 * procedure and a workflow are indistinguishable at the call site.
 *
 * These transports live in `lib/` rather than next to a component because
 * they outlive components: the sidebar explorer, the full-pane AppsPanel and
 * anything else that renders a shared `@aprovan/registry-ui` panel all inject
 * the *same* function, and the shared panels never fetch on their own.
 */

import { GATEWAY_BASE } from "./gateway";
import { gatewayFetch } from "./gateway-fetch";

/** One namespace's dispatch, matching the shared panels' `invoke` prop. */
export type ToolsInvoke = (
  operation: string,
  args: Record<string, unknown>,
) => Promise<unknown>;

/** Build a transport bound to one gateway tool namespace. */
export function invokeNamespaceTool(namespace: string): ToolsInvoke {
  return async (operation, args) => {
    const res = await gatewayFetch(`${GATEWAY_BASE}/tools/${namespace}/${operation}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ args }),
    });
    const body = (await res.json()) as { data?: unknown; error?: string };
    if (!res.ok) throw new Error(body.error ?? `${namespace}.${operation} failed (${res.status})`);
    return body.data;
  };
}

/** `workflows.*` — the unit of execution on every surface. */
export const invokeWorkflowsTool = invokeNamespaceTool("workflows");

/** `apps.*` — the bundles that export workflows. */
export const invokeAppsTool = invokeNamespaceTool("apps");

/** `registry.*` — provider/operation discovery (see lib/registry.ts). */
export const invokeRegistryTool = invokeNamespaceTool("registry");
