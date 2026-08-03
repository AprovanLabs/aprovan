/**
 * Shared widget mount logic for embedded and iframe modes.
 *
 * Awaits async mount/render/default-export invocations so a Promise is never
 * passed into React createElement/render (React error #31).
 */

export type CreateElementFn = (...args: unknown[]) => unknown;
export type CreateRootFn = (el: HTMLElement) => {
  render: (el: unknown) => void;
  unmount?: () => void;
};
export type RenderFn = (el: unknown, container: HTMLElement) => void;

export type Renderer =
  | { kind: "root"; createRoot: CreateRootFn }
  | { kind: "render"; render: RenderFn };

export type ModuleExports = {
  default?: unknown;
  mount?: (root: HTMLElement, inputs: Record<string, unknown>) => unknown;
  render?: (root: HTMLElement, inputs: Record<string, unknown>) => unknown;
};

export type ReactMountApi = {
  createElement: CreateElementFn | null;
  renderer: Renderer | null;
};

export type UnloadFn = () => void;

export function pickCreateElement(globals: Array<Record<string, unknown>>): CreateElementFn | null {
  for (const obj of globals) {
    const ce = obj?.createElement;
    if (typeof ce === "function") return ce as CreateElementFn;
    const def = obj?.default as Record<string, unknown> | undefined;
    if (def && typeof def.createElement === "function") {
      return def.createElement as CreateElementFn;
    }
  }
  return null;
}

export function pickRenderer(globals: Array<Record<string, unknown>>): Renderer | null {
  for (const obj of globals) {
    if (obj && typeof obj.createRoot === "function") {
      return { kind: "root", createRoot: obj.createRoot as CreateRootFn };
    }
    if (obj && typeof obj.render === "function") {
      return { kind: "render", render: obj.render as RenderFn };
    }
    const def = obj?.default as Record<string, unknown> | undefined;
    if (def && typeof def.createRoot === "function") {
      return { kind: "root", createRoot: def.createRoot as CreateRootFn };
    }
    if (def && typeof def.render === "function") {
      return { kind: "render", render: def.render as RenderFn };
    }
  }
  return null;
}

function isPromiseLike(value: unknown): value is Promise<unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof (value as Promise<unknown>).then === "function"
  );
}

function isAsyncFunction(fn: unknown): boolean {
  return typeof fn === "function" && fn.constructor.name === "AsyncFunction";
}

function mountPlainResult(root: HTMLElement, result: unknown): UnloadFn | undefined {
  if (result instanceof HTMLElement) {
    root.appendChild(result);
    return undefined;
  }
  if (typeof result === "string") {
    root.innerHTML = result;
    return undefined;
  }
  if (result === undefined || result === null) {
    root.textContent = "Script completed with no UI output.";
    return undefined;
  }
  root.textContent = "No framework renderer available for this widget.";
  return undefined;
}

/**
 * Mount a compiled widget module onto `root`.
 * Returns an optional cleanup/unmount function.
 */
export async function mountDefaultExport(
  mod: ModuleExports,
  root: HTMLElement,
  inputs: Record<string, unknown>,
  react: ReactMountApi,
): Promise<UnloadFn | undefined> {
  if (typeof mod?.mount === "function") {
    const cleanup = await mod.mount(root, inputs);
    return typeof cleanup === "function" ? (cleanup as UnloadFn) : undefined;
  }

  if (typeof mod?.render === "function") {
    const cleanup = await mod.render(root, inputs);
    return typeof cleanup === "function" ? (cleanup as UnloadFn) : undefined;
  }

  const Component = mod?.default;
  if (typeof Component !== "function") {
    root.textContent = "Widget did not export a default component.";
    return undefined;
  }

  // Async defaults are script entrypoints (workflows), not React components.
  if (isAsyncFunction(Component)) {
    try {
      const result = await Component(inputs);
      return mountPlainResult(root, result);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      root.textContent = `Script error: ${message}`;
      return undefined;
    }
  }

  const { createElement, renderer } = react;

  if (createElement && renderer?.kind === "root") {
    const reactRoot = renderer.createRoot(root);
    reactRoot.render(createElement(Component, inputs));
    return typeof reactRoot.unmount === "function" ? () => reactRoot.unmount!() : undefined;
  }

  if (createElement && renderer?.kind === "render") {
    renderer.render(createElement(Component, inputs), root);
    return undefined;
  }

  const result = Component(inputs);
  if (isPromiseLike(result)) {
    const resolved = await result;
    return mountPlainResult(root, resolved);
  }

  return mountPlainResult(root, result);
}

/**
 * JavaScript helpers injected into iframe srcdoc modules.
 * Keep in sync with mountDefaultExport above.
 */
export function generateIframeMountHelpers(): string {
  return `
    function isPromiseLike(value) {
      return value !== null && typeof value === 'object' && typeof value.then === 'function';
    }

    function isAsyncFunction(fn) {
      return typeof fn === 'function' && fn.constructor.name === 'AsyncFunction';
    }

    function mountPlainResult(root, result) {
      if (result instanceof HTMLElement) {
        root.appendChild(result);
        return;
      }
      if (typeof result === 'string') {
        root.innerHTML = result;
        return;
      }
      if (result === undefined || result === null) {
        root.textContent = 'Script completed with no UI output.';
        return;
      }
      root.textContent = 'No framework renderer available for this widget.';
    }

    function pickCreateElement(globals) {
      for (const obj of globals) {
        if (obj && typeof obj.createElement === 'function') return obj.createElement.bind(obj);
        if (obj?.default && typeof obj.default.createElement === 'function') return obj.default.createElement.bind(obj.default);
      }
      return null;
    }

    function pickRenderer(globals) {
      for (const obj of globals) {
        if (obj && typeof obj.createRoot === 'function') {
          return { kind: 'root', createRoot: obj.createRoot.bind(obj) };
        }
        if (obj && typeof obj.render === 'function') {
          return { kind: 'render', render: obj.render.bind(obj) };
        }
        if (obj?.default && typeof obj.default.createRoot === 'function') {
          return { kind: 'root', createRoot: obj.default.createRoot.bind(obj.default) };
        }
        if (obj?.default && typeof obj.default.render === 'function') {
          return { kind: 'render', render: obj.default.render.bind(obj.default) };
        }
      }
      return null;
    }

    async function mountDefaultExport(mod, root, inputs, globals) {
      if (typeof mod?.mount === 'function') {
        const cleanup = await mod.mount(root, inputs);
        if (typeof cleanup === 'function') window.__PATCHWORK_CLEANUP__ = cleanup;
        return;
      }

      if (typeof mod?.render === 'function') {
        const cleanup = await mod.render(root, inputs);
        if (typeof cleanup === 'function') window.__PATCHWORK_CLEANUP__ = cleanup;
        return;
      }

      const Component = mod?.default;
      if (typeof Component !== 'function') {
        root.textContent = 'Widget did not export a default component.';
        return;
      }

      if (isAsyncFunction(Component)) {
        try {
          const result = await Component(inputs);
          mountPlainResult(root, result);
        } catch (e) {
          root.textContent = 'Script error: ' + (e?.message || String(e));
        }
        return;
      }

      const createElement = pickCreateElement(globals);
      const renderer = pickRenderer(globals);

      if (createElement && renderer?.kind === 'root') {
        const r = renderer.createRoot(root);
        r.render(createElement(Component, inputs));
        if (typeof r.unmount === 'function') window.__PATCHWORK_CLEANUP__ = () => r.unmount();
        return;
      }

      if (createElement && renderer?.kind === 'render') {
        renderer.render(createElement(Component, inputs), root);
        return;
      }

      const result = Component(inputs);
      if (isPromiseLike(result)) {
        mountPlainResult(root, await result);
        return;
      }

      mountPlainResult(root, result);
    }
  `;
}
