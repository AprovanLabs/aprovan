/**
 * Shared widget mount contract for chat and the floating panel.
 *
 * Both hosts must use these options so widgets render unmodified with the
 * same sandbox privileges (floating-widget-panel spec).
 */

export const WIDGET_MOUNT_MODE = "iframe" as const;

/**
 * Sandbox tokens — mirrors `WidgetPreview` in `@aprovan/editor`, which is
 * the chat surface mount path. Keep in lockstep.
 */
export const WIDGET_IFRAME_SANDBOX = [
  "allow-scripts",
  "allow-same-origin",
] as const;

export type WidgetMountHost = "chat" | "panel";

export type WidgetMountExtras = {
  sourcePath?: string;
  plugins?: import("@aprovan/patchwork").PluginRegistry;
};

/** Mount options both hosts apply (aside from `target` / plugins / sourcePath). */
export function widgetMountContract(host: WidgetMountHost): {
  host: WidgetMountHost;
  mode: typeof WIDGET_MOUNT_MODE;
  sandbox: string[];
} {
  return {
    host,
    mode: WIDGET_MOUNT_MODE,
    sandbox: [...WIDGET_IFRAME_SANDBOX],
  };
}

export function buildWidgetMountOptions(
  target: HTMLElement,
  host: WidgetMountHost,
  extras: WidgetMountExtras = {},
): {
  target: HTMLElement;
  mode: typeof WIDGET_MOUNT_MODE;
  sandbox: string[];
  sourcePath?: string;
  plugins?: import("@aprovan/patchwork").PluginRegistry;
} {
  const contract = widgetMountContract(host);
  return {
    target,
    mode: contract.mode,
    sandbox: contract.sandbox,
    ...(extras.sourcePath ? { sourcePath: extras.sourcePath } : {}),
    ...(extras.plugins ? { plugins: extras.plugins } : {}),
  };
}
