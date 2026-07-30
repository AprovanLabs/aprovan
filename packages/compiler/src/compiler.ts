import * as esbuild from "esbuild-wasm";
import { setCdnBaseUrl as setImageCdnBaseUrl } from "./images/loader.js";
import { getImageRegistry } from "./images/registry.js";
import { createHttpProxy } from "./mount/bridge.js";
import { mountEmbedded, reloadEmbedded } from "./mount/embedded.js";
import { mountIframe, reloadIframe } from "./mount/iframe.js";
import {
  setCdnBaseUrl as setTransformCdnBaseUrl,
  cdnTransformPlugin,
  ALIAS_MODULE_NAMESPACE,
} from "./transforms/cdn.js";
import { namespaceImportPlugin } from "./transforms/namespaces.js";
import { vfsPlugin } from "./transforms/vfs.js";
import { createSingleFileProject } from "./vfs/project.js";
import type {
  Compiler,
  CompilerOptions,
  CompileOptions,
  CompiledWidget,
  LoadedImage,
  Manifest,
  MountedWidget,
  MountOptions,
  Proxy,
  WidgetTelemetryHook,
} from "./types.js";
import type { VirtualProject } from "./vfs/types.js";

// Track esbuild initialization
let esbuildInitialized = false;
let esbuildInitPromise: Promise<void> | null = null;

// Pin the wasm binary to the installed host version. An unpinned URL lets
// unpkg serve a newer "latest" binary than the host JS, which crashes the
// esbuild service with "Host version does not match binary version" and makes
// esbuild.build() hang forever (widgets stuck on "Rendering preview...").
const DEFAULT_ESBUILD_WASM_URL = `https://unpkg.com/esbuild-wasm@${esbuild.version}/esbuild.wasm`;

/**
 * Initialize esbuild-wasm (must be called before using esbuild)
 * @param urlOverrides - Optional URL overrides for bundled assets
 */
async function initEsbuild(
  urlOverrides?: Record<string, string>,
): Promise<void> {
  if (esbuildInitialized) return;
  if (esbuildInitPromise) return esbuildInitPromise;

  const wasmUrl =
    urlOverrides?.["esbuild-wasm/esbuild.wasm"] || DEFAULT_ESBUILD_WASM_URL;

  esbuildInitPromise = (async () => {
    try {
      await esbuild.initialize({
        wasmURL: wasmUrl,
      });
      esbuildInitialized = true;
    } catch (error) {
      // If already initialized (e.g., HMR or multiple compiler instances)
      if (error instanceof Error && error.message.includes("initialize")) {
        esbuildInitialized = true;
      } else {
        throw error;
      }
    }
  })();

  return esbuildInitPromise;
}

const MIN_ES_TARGET = 2022;

/**
 * Upgrade es20xx targets below es2022 so top-level await always compiles.
 * Non-es targets (node20, esnext, ...) pass through untouched.
 */
function floorTarget(target: string): string {
  const match = /^es(\d{4})$/i.exec(target);
  if (match && Number(match[1]) < MIN_ES_TARGET) {
    return `es${MIN_ES_TARGET}`;
  }
  return target;
}

/**
 * The available names closest to one that does not exist.
 *
 * Prefix and substring matches first — a wrong component name is usually the
 * right family under a wrong noun (`Spinner` → `Skeleton`/`Slider` is weak,
 * but `TableHeaderCell` → `TableHead` is exact), and case-insensitive
 * containment catches those without an edit-distance table. Falls back to a
 * shared-prefix ranking so there is always something to try.
 */
function nearestNames(missing: string, available: readonly string[], limit = 4): string[] {
  const needle = missing.toLowerCase();
  const scored = available
    .map((name) => {
      const candidate = name.toLowerCase();
      if (candidate === needle) return { name, score: 0 };
      if (candidate.startsWith(needle) || needle.startsWith(candidate)) return { name, score: 1 };
      if (candidate.includes(needle) || needle.includes(candidate)) return { name, score: 2 };
      let shared = 0;
      while (shared < candidate.length && candidate[shared] === needle[shared]) shared += 1;
      return { name, score: shared >= 3 ? 3 : Number.POSITIVE_INFINITY };
    })
    .filter((entry) => Number.isFinite(entry.score))
    .sort((a, b) => a.score - b.score || a.name.length - b.name.length);
  return scored.slice(0, limit).map((entry) => entry.name);
}

/**
 * Generate a content hash for caching
 */
function hashContent(content: string): string {
  // Use Web Crypto API for browser compatibility
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  // Simple hash for cache key (not cryptographic)
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash + (data[i] ?? 0)) | 0;
  }
  return Math.abs(hash).toString(16).padStart(8, "0");
}

/**
 * Create a compiler instance
 */
export async function createCompiler(
  options: CompilerOptions,
): Promise<Compiler> {
  // Initialize esbuild-wasm
  await initEsbuild(options.urlOverrides);

  const { image: imageSpec, proxyUrl, cdnBaseUrl, widgetCdnBaseUrl } = options;

  // Set CDN base URLs (can be different for image loading vs widget imports)
  if (cdnBaseUrl) {
    setImageCdnBaseUrl(cdnBaseUrl);
  }
  // Widget imports use widgetCdnBaseUrl if provided, otherwise fall back to cdnBaseUrl or default
  if (widgetCdnBaseUrl) {
    setTransformCdnBaseUrl(widgetCdnBaseUrl);
  } else if (cdnBaseUrl) {
    setTransformCdnBaseUrl(cdnBaseUrl);
  }

  const registry = getImageRegistry();

  // Pre-load the initial image
  await registry.preload(imageSpec);

  // Create service proxy (telemetry hook observes calls + attributes them)
  const proxy: Proxy = createHttpProxy(proxyUrl, options.proxyFetch, {
    hook: options.telemetry,
    sessionId: options.telemetrySessionId,
  });

  return new PatchworkCompiler(proxy, registry, options.telemetry);
}

/**
 * Patchwork compiler implementation
 */
class PatchworkCompiler implements Compiler {
  private proxy: Proxy;
  private registry: ReturnType<typeof getImageRegistry>;
  private telemetry?: WidgetTelemetryHook;

  constructor(
    proxy: Proxy,
    registry: ReturnType<typeof getImageRegistry>,
    telemetry?: WidgetTelemetryHook,
  ) {
    this.proxy = proxy;
    this.registry = registry;
    this.telemetry = telemetry;
  }

  /**
   * Pre-load an image package
   */
  async preloadImage(spec: string): Promise<void> {
    await this.registry.preload(spec);
  }

  /**
   * Check if an image is loaded
   */
  isImageLoaded(spec: string): boolean {
    return this.registry.has(spec);
  }

  /**
   * Get a loaded image (manifest config, runtime prompt, …)
   */
  getImage(spec: string): LoadedImage | undefined {
    return this.registry.get(spec);
  }

  /**
   * Compile widget source to ESM
   */
  async compile(
    source: string | VirtualProject,
    manifest: Manifest,
    options: CompileOptions = {},
  ): Promise<CompiledWidget> {
    try {
      return await this.buildWidget(source, manifest, options);
    } catch (error) {
      // A failed compile is the single most actionable piece of evidence about
      // a widget, and until this hook existed it went only to whatever host
      // component happened to call compile() — into React state, rendered
      // once, never recorded. It never reached the logs buffer, so
      // "fix it" prompts shipped without the error that motivated them.
      // Reported here rather than at each call site so every host (chat, the
      // editor preview, the live app page, the MCP runtime) gets it from
      // having wired `telemetry` at all.
      this.telemetry?.({
        kind: "error",
        at: new Date().toISOString(),
        level: "error",
        ...(options.sourcePath ? { path: options.sourcePath } : {}),
        message: `Compile failed: ${error instanceof Error ? error.message : String(error)}`,
        ...(error instanceof Error && error.stack ? { stack: error.stack } : {}),
      });
      throw error;
    }
  }

  private async buildWidget(
    source: string | VirtualProject,
    manifest: Manifest,
    _options: CompileOptions = {},
  ): Promise<CompiledWidget> {
    // Normalize input to VirtualProject (entry defined by project, defaults to main.tsx)
    const project =
      typeof source === "string" ? createSingleFileProject(source) : source;

    // Infer loader from entry file extension
    const entryExt = project.entry.split(".").pop();
    const loader = entryExt === "ts" || entryExt === "tsx" ? "tsx" : "jsx";

    // Get image from registry based on manifest
    const image = this.registry.get(manifest.image) || null;

    // Get config from image (with proper typing)
    const esbuildConfig = image?.config.esbuild || {};
    const frameworkConfig = image?.config.framework || {};

    // Floor the target at es2022: top-level await is required by workflow
    // scripts, and older published image configs still pin es2020.
    const target = floorTarget(esbuildConfig.target || "es2022");
    const format = esbuildConfig.format || "esm";
    const jsx = esbuildConfig.jsx ?? "automatic";

    // Collect all packages (image deps + manifest packages)
    const packages: Record<string, string> = {
      ...(image?.dependencies || {}),
      ...(manifest.packages || {}),
    };

    const globals = frameworkConfig.globals || {};

    // Get dependency version overrides from image config (e.g., { react: '18' })
    const deps = frameworkConfig.deps || {};

    // Get import path aliases from image config (e.g., { '@/components/ui/*': '@packagedcn/react' })
    const aliases = image?.config.aliases || {};

    // What those alias targets actually export, so an unknown component name
    // fails here with a file and line instead of in the browser at link time.
    const aliasExports = image?.config.aliasExports || {};

    // Get entry file content
    const entryFile = project.files.get(project.entry);
    if (!entryFile) {
      throw new Error(`Entry file not found: ${project.entry}`);
    }

    // Build with esbuild using image-provided configuration
    const result = await this.withAliasHints(aliasExports, () => esbuild.build({
      stdin: {
        contents: entryFile.content,
        loader,
        sourcefile: project.entry,
      },
      bundle: true,
      format,
      target,
      platform: manifest.platform === "cli" ? "node" : "browser",
      jsx,
      ...(esbuildConfig.jsxFactory
        ? { jsxFactory: esbuildConfig.jsxFactory }
        : {}),
      ...(esbuildConfig.jsxFragment
        ? { jsxFragment: esbuildConfig.jsxFragment }
        : {}),
      write: false,
      sourcemap: "inline",
      plugins: [
        vfsPlugin(project, { aliases }),
        // Before the CDN plugin: a bare specifier naming an injected service
        // namespace is the SDK import, not an npm package. Everything else
        // still falls through to esm.sh.
        namespaceImportPlugin({ services: manifest.services }),
        cdnTransformPlugin({
          packages,
          globals,
          deps,
          aliases,
          aliasExports,
        }),
      ],
    }));

    const code = result.outputFiles?.[0]?.text || "";
    const hash = hashContent(code);

    return {
      code,
      hash,
      manifest,
    };
  }

  /**
   * Turn esbuild's "No matching export" into advice.
   *
   * esbuild says what is wrong and where, which is most of the job. What it
   * cannot know is that the module in question is an image's fixed component
   * inventory, so the fix is never "install it" — it is "use a different
   * component, or write the markup by hand". Whoever reads this next is
   * usually a model iterating on its own widget, and the nearest valid names
   * are the difference between a fix and another guess.
   */
  private async withAliasHints<T>(
    aliasExports: Record<string, string[]>,
    build: () => Promise<T>,
  ): Promise<T> {
    try {
      return await build();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const missing = [
        ...message.matchAll(
          new RegExp(
            `No matching export in "${ALIAS_MODULE_NAMESPACE}:([^"]+)" for import "([^"]+)"`,
            "g",
          ),
        ),
      ];
      if (missing.length === 0) throw error;

      const hints = missing.map(([, pkg, name]) => {
        const available = aliasExports[pkg ?? ""] ?? [];
        const near = nearestNames(name ?? "", available);
        return (
          `"${name}" is not one of the ${available.length} components this image provides` +
          (near.length > 0 ? `. Closest available: ${near.join(", ")}` : "") +
          `. There is no way to add one — use an available component or plain markup.`
        );
      });
      throw new Error(`${message}\n\n${hints.join("\n")}`);
    }
  }

  /**
   * Mount a compiled widget to the DOM
   */
  async mount(
    widget: CompiledWidget,
    options: MountOptions,
  ): Promise<MountedWidget> {
    const image = this.registry.get(widget.manifest.image) || null;
    try {
      if (options.mode === "iframe") {
        return await mountIframe(widget, options, image, this.proxy, this.telemetry);
      }
      return await mountEmbedded(widget, options, image, this.proxy);
    } catch (error) {
      // Mount is where a CDN module that compiled fine fails to link — the
      // "does not provide an export named 'X'" class. In iframe mode the
      // sandbox's own console.error is mirrored out, but embedded mode has no
      // such mirror and neither path recorded the rejection that the host
      // actually shows the user. Recording it here covers both.
      this.telemetry?.({
        kind: "error",
        at: new Date().toISOString(),
        level: "error",
        ...(options.sourcePath ? { path: options.sourcePath } : {}),
        message: `Mount failed: ${error instanceof Error ? error.message : String(error)}`,
        ...(error instanceof Error && error.stack ? { stack: error.stack } : {}),
      });
      throw error;
    }
  }

  /**
   * Unmount a mounted widget
   */
  unmount(mounted: MountedWidget): void {
    mounted.unmount();
  }

  /**
   * Hot reload a mounted widget
   */
  async reload(
    mounted: MountedWidget,
    source: string | VirtualProject,
    manifest: Manifest,
  ): Promise<void> {
    // Compile new version
    const widget = await this.compile(source, manifest);
    const image = this.registry.get(widget.manifest.image) || null;

    // Reload based on mode
    if (mounted.mode === "iframe") {
      await reloadIframe(mounted, widget, image, this.proxy, this.telemetry);
    } else {
      await reloadEmbedded(mounted, widget, image, this.proxy);
    }
  }
}
