/**
 * @aprovan/patchwork
 *
 * JSX→ESM compilation, image loading, and DOM mounting for Patchwork widgets.
 *
 * @example
 * ```typescript
 * import { createCompiler } from '@aprovan/patchwork';
 *
 * const compiler = await createCompiler({
 *   image: '@aprovan/patchwork-image-shadcn',
 *   proxyUrl: 'http://localhost:3000/api/proxy'
 * });
 *
 * const widget = await compiler.compile(source, manifest);
 * const mounted = await compiler.mount(widget, {
 *   target: document.getElementById('root'),
 *   mode: 'embedded'
 * });
 *
 * // Later...
 * compiler.unmount(mounted);
 * ```
 */

// Core compiler
export { createCompiler } from "./compiler.js";

// Schemas (Zod validation)
export {
  // Schemas
  PlatformSchema,
  EsbuildConfigSchema,
  ImageConfigSchema,
  InputSpecSchema,
  ManifestSchema,
  CompileOptionsSchema,
  MountModeSchema,
  MountOptionsSchema,
  // Parsers
  parseImageConfig,
  safeParseImageConfig,
  parseManifest,
  safeParseManifest,
  // Defaults
  DEFAULT_IMAGE_CONFIG,
  DEFAULT_CLI_IMAGE_CONFIG,
} from "./schemas.js";

// Types
export type {
  // Core types
  Platform,
  Manifest,
  InputSpec,
  Checker,
  Diagnostic,
  CompileOptions,
  CompiledWidget,
  MountMode,
  MountOptions,
  MountedWidget,
  Compiler,
  CompilerOptions,
  // Image types
  ImageConfig,
  ImageMountFn,
  LoadedImage,
  // Service types
  Proxy,
  ServiceCallHandler,
  GlobalInterfaceDefinition,
  BridgeMessage,
  BridgeMessageType,
  ServiceCallPayload,
  ServiceResultPayload,
  // Telemetry types
  WidgetCallMeta,
  WidgetRuntimeEvent,
  WidgetTelemetryHook,
} from "./types.js";

// Images
export {
  // Registry
  ImageRegistry,
  getImageRegistry,
  createImageRegistry,
  // Loader
  loadImage,
  loadImageDoc,
  parseImageSpec,
  fetchPackageJson,
  fetchPackageFile,
} from "./images/index.js";

// Transforms
export {
  cdnTransformPlugin,
  generateImportMap,
  // CDN utilities (shared with Vite plugins)
  toEsmShUrl,
  parseImportPath,
  isBareImport,
  parsePackageSpec,
  setCdnBaseUrl,
  getCdnBaseUrl,
  matchAlias,
  getCommonExports,
} from "./transforms/cdn.js";
export { DEFAULT_CDN_BASE } from "./cdn-config.js";
export type { CdnTransformOptions } from "./transforms/cdn.js";
export { vfsPlugin } from "./transforms/vfs.js";
export type { VFSPluginOptions } from "./transforms/vfs.js";
export { NATIVE_APP_NAMESPACES } from "./namespace-core.js";
// Also published on its own, dependency-free:
//   import { generateNamespaceTypes } from "@aprovan/patchwork/namespace-types";
// which is how the gateway generates an app's `__sdk__.d.ts` without loading
// esbuild-wasm into a Node process.
export { generateNamespaceTypes } from "./transforms/namespace-types.js";
export type {
  JsonSchema,
  WorkflowTypeSpec,
  NamespaceTypesOptions,
} from "./transforms/namespace-types.js";

// VFS
export {
  createProjectFromFiles,
  createSingleFileProject,
  resolveEntry,
  detectMainFile,
} from "./vfs/index.js";
export type {
  VirtualFile,
  VirtualProject,
  ChangeRecord,
  WatchCallback,
  WatchEventType,
} from "./vfs/index.js";

// Mount utilities
export {
  // Embedded
  mountEmbedded,
  reloadEmbedded,
  // Iframe
  mountIframe,
  reloadIframe,
  disposeIframeBridge,
  DEV_SANDBOX,
  // Script sandbox (playground entry point)
  runScriptInSandbox,
  answerServiceCall,
  // Tools assembly
  assembleTools,
  createCallableNamespaceNode,
  installTools,
  removeTools,
  // Bridge
  createHttpProxy,
  extractNamespaces,
  ParentBridge,
  createIframeProxy,
  generateIframeBridgeScript,
} from "./mount/index.js";
export type {
  AssembleToolsOptions,
  NamespaceNode,
  ToolsTransport,
  MiddlewareFn,
  OverrideContext,
  OverrideFactory,
  ToolCall,
  RunScriptOptions,
  SandboxRun,
} from "./mount/index.js";
export {
  createPluginRegistry,
  PluginRegistry,
} from "./plugins/index.js";
