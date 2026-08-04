/**
 * Embedded mount mode - mounts widgets directly in the DOM
 *
 * For trusted widgets that need full window access.
 */

import {
  assembleTools,
  installTools,
  removeTools,
} from "./assemble-tools.js";
import {
  mountDefaultExport,
  pickCreateElement,
  pickRenderer,
} from "./mount-default-export.js";
import { toEsmShUrl } from "../cdn-config.js";
import type { CompiledWidget, LoadedImage, MountedWidget, MountOptions, Proxy } from "../types.js";

let mountCounter = 0;
let importMapInjected = false;

/**
 * Inject an import map for bare module specifiers.
 * Maps package names to their CDN URLs so browsers can resolve them.
 * Must be called before any ES module imports happen.
 */
function injectImportMap(
  globals: Record<string, string>,
  preloadUrls: string[],
  deps?: Record<string, string>
): void {
  // Only inject once per page (browser limitation)
  if (importMapInjected) return;

  // Check if there's already an import map
  const existingMap = document.querySelector('script[type="importmap"]');
  if (existingMap) {
    // Cannot modify existing import maps in standard browsers
    importMapInjected = true;
    return;
  }

  // Build import map from globals + preload URLs
  // Convention: globals keys are package names, preload URLs are in matching order
  const imports: Record<string, string> = {};
  const packageNames = Object.keys(globals);

  packageNames.forEach((pkgName, index) => {
    // Use the preload URL if available, otherwise construct CDN URL
    if (preloadUrls[index]) {
      imports[pkgName] = preloadUrls[index];
    } else if (deps?.[pkgName]) {
      imports[pkgName] = toEsmShUrl(pkgName, deps[pkgName]);
    } else {
      imports[pkgName] = toEsmShUrl(pkgName);
    }
  });

  // Also add common subpaths (e.g., react-dom/client)
  if (imports["react-dom"]) {
    imports["react-dom/client"] = imports["react-dom"];
  }

  // Inject new import map
  const script = document.createElement("script");
  script.type = "importmap";
  script.textContent = JSON.stringify({ imports }, null, 2);
  document.head.insertBefore(script, document.head.firstChild);

  importMapInjected = true;
}

/**
 * Generate a unique mount ID
 */
function generateMountId(): string {
  return `pw-mount-${Date.now()}-${++mountCounter}`;
}

/**
 * Mount a widget in embedded mode (direct DOM injection)
 */
export async function mountEmbedded(
  widget: CompiledWidget,
  options: MountOptions,
  image: LoadedImage | null,
  proxy: Proxy
): Promise<MountedWidget> {
  const { target, inputs = {} } = options;
  const mountId = generateMountId();

  // Create container
  const container = document.createElement("div");
  container.id = mountId;
  container.className = "patchwork-widget patchwork-embedded";
  target.appendChild(container);

  // Run image setup if available
  if (image?.setup) {
    await image.setup(container);
  }

  // Inject CSS if available
  if (image?.css) {
    const style = document.createElement("style");
    style.id = `${mountId}-style`;
    style.textContent = image.css;
    document.head.appendChild(style);
  }

  const effectiveProxy = options.plugins?.wrapProxy(proxy) ?? proxy;

  // Install the assembled tools root
  const services = widget.manifest.services || [];
  const pluginContext = { sourcePath: options.sourcePath };
  const tools = assembleTools({
    namespaces: services,
    transport: (namespace, procedure, args, pin) =>
      effectiveProxy.call(namespace, procedure, args, undefined, pin),
    plugins: options.plugins,
    pluginContext,
  });
  installTools(window, tools);

  // Get framework config from image
  const frameworkConfig = image?.config?.framework || {};
  const preloadUrls = frameworkConfig.preload || [];
  const globalMapping = frameworkConfig.globals || {};
  const deps = frameworkConfig.deps || {};

  // Inject import map for bare module specifiers (must happen before ES module imports)
  // This allows the browser to resolve imports like 'react' to CDN URLs
  injectImportMap(globalMapping, preloadUrls, deps);

  // Pre-load framework modules from image config
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const preloadedModules: any[] = await Promise.all(
    preloadUrls.map((url: string) => import(/* webpackIgnore: true */ /* @vite-ignore */ url))
  );

  // Set framework globals on window based on image config
  const win = window as unknown as Record<string, unknown>;
  const globalNames = Object.values(globalMapping) as string[];

  // Map preloaded modules to their global names
  // Convention: preload order matches globals order (react -> React, react-dom -> ReactDOM)
  preloadedModules.forEach((mod, index) => {
    if (globalNames[index]) {
      const name = globalNames[index];
      win[name] = mod;
    }
  });

  // Create a blob with the widget code
  const blob = new Blob([widget.code], { type: "application/javascript" });
  const scriptUrl = URL.createObjectURL(blob);

  // Import the module
  let moduleCleanup: (() => void) | undefined;

  const globalObjects = globalNames.map((n) => win[n] as unknown).filter(Boolean) as Array<
    Record<string, unknown>
  >;

  try {
    const module = await import(/* webpackIgnore: true */ scriptUrl);

    // Image-provided mount handler takes priority
    if (image?.mount) {
      const result = await image.mount(module, container, inputs);
      if (typeof result === "function") {
        moduleCleanup = result;
      }
    } else {
      moduleCleanup = await mountDefaultExport(module, container, inputs, {
        createElement: pickCreateElement(globalObjects),
        renderer: pickRenderer(globalObjects),
      });
    }
  } finally {
    URL.revokeObjectURL(scriptUrl);
  }

  // Create unmount function
  const unmount = () => {
    // Call module cleanup if available
    if (moduleCleanup) {
      moduleCleanup();
    }

    // Remove tools root
    removeTools(window);

    // Remove style
    const style = document.getElementById(`${mountId}-style`);
    if (style) {
      style.remove();
    }

    // Remove container
    container.remove();
  };

  return {
    id: mountId,
    widget,
    mode: "embedded",
    target,
    inputs,
    unmount,
  };
}

/**
 * Hot reload an embedded widget
 */
export async function reloadEmbedded(
  mounted: MountedWidget,
  widget: CompiledWidget,
  image: LoadedImage | null,
  proxy: Proxy
): Promise<MountedWidget> {
  // Unmount existing
  mounted.unmount();

  // Remount with new widget
  return mountEmbedded(
    widget,
    { target: mounted.target, mode: "embedded", inputs: mounted.inputs },
    image,
    proxy
  );
}
