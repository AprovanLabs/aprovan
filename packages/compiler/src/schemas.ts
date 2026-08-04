/**
 * Zod schemas for Patchwork compiler types
 *
 * These schemas validate:
 * - ImageConfig from package.json patchwork field
 * - Widget manifests
 * - Input specifications
 */

import { z } from 'zod';

// Platform schema
export const PlatformSchema = z.enum(['browser', 'cli']);
export type Platform = z.infer<typeof PlatformSchema>;

// esbuild configuration schema
export const EsbuildConfigSchema = z
  .object({
    target: z.string().optional(),
    format: z.enum(['esm', 'cjs', 'iife']).optional(),
    jsx: z.enum(['automatic', 'transform', 'preserve']).optional(),
    jsxFactory: z.string().optional(),
    jsxFragment: z.string().optional(),
  })
  .strict()
  .optional();

export type EsbuildConfig = z.infer<typeof EsbuildConfigSchema>;

// Framework configuration - specifies globals and CDN URLs for framework deps
export const FrameworkConfigSchema = z
  .object({
    // Map of package names to window global names (e.g., { react: 'React' })
    globals: z.record(z.string(), z.string()).optional(),
    // CDN URLs to preload before widget execution
    preload: z.array(z.string()).optional(),
    // Dependency version overrides for CDN packages (e.g., { react: '18' })
    deps: z.record(z.string(), z.string()).optional(),
  })
  .strict()
  .optional();

export type FrameworkConfig = z.infer<typeof FrameworkConfigSchema>;

// Aliases schema - maps path patterns to target packages
export const AliasesSchema = z.record(z.string(), z.string()).optional();

export type Aliases = z.infer<typeof AliasesSchema>;

// Value exports of each alias-target package, keyed by package name. Lets the
// compiler turn an unknown component into a compile error instead of a
// browser link failure; see CdnTransformOptions.aliasExports.
export const AliasExportsSchema = z
  .record(z.string(), z.array(z.string()))
  .optional();

export type AliasExports = z.infer<typeof AliasExportsSchema>;

// Dependencies schema - maps package names to version specifiers
export const DependenciesSchema = z.record(z.string(), z.string()).optional();

// ImageConfig schema - validates package.json patchwork field
export const ImageConfigSchema = z
  .object({
    platform: PlatformSchema,
    dependencies: DependenciesSchema,
    esbuild: EsbuildConfigSchema,
    framework: FrameworkConfigSchema,
    aliases: AliasesSchema,
    aliasExports: AliasExportsSchema,
    // Package-relative markdown prompt describing this runtime for LLMs
    prompt: z.string().optional(),
    // Named extended docs (lazy-loaded, skills/DESIGN.md-style)
    docs: z.record(z.string(), z.string()).optional(),
  })
  // Passthrough, not strict. An image's config is fetched from the CDN at
  // runtime, so a compiler routinely meets images published after it. Under
  // `.strict()` one unrecognised field failed the whole parse, and
  // `loadImage` falls back to DEFAULT_IMAGE_CONFIG on a failed parse — which
  // silently drops the image's `aliases`, breaking every
  // `@/components/ui/*` import in every widget. Trading a typo check for
  // that blast radius was the wrong side of the deal.
  .passthrough();

export type ImageConfig = z.infer<typeof ImageConfigSchema>;

// Input specification schema
export const InputSpecSchema = z.object({
  type: z.enum(['string', 'number', 'boolean', 'object', 'array']),
  default: z.unknown().optional(),
  required: z.boolean().optional(),
  description: z.string().optional(),
});

export type InputSpec = z.infer<typeof InputSpecSchema>;

// Widget manifest schema
export const ManifestSchema = z.object({
  name: z.string(),
  version: z.string(),
  description: z.string().optional(),
  platform: PlatformSchema,
  image: z.string(),
  inputs: z.record(z.string(), InputSpecSchema).optional(),
  services: z.array(z.string()).optional(),
  packages: z.record(z.string(), z.string()).optional(),
});

export type Manifest = z.infer<typeof ManifestSchema>;

// Compile options schema. `checker` is a function interface — validated as
// custom rather than JSON-shaped, matching CompileOptions in types.ts.
export const CompileOptionsSchema = z
  .object({
    typescript: z.boolean().optional(),
    sourcePath: z.string().optional(),
    checker: z.custom<(project: unknown, entry: string) => Promise<unknown[]>>((v) => {
      return typeof v === "object" && v !== null && typeof (v as { check?: unknown }).check === "function";
    }).optional(),
  })
  .strict()
  .optional();

// Mount mode schema
export const MountModeSchema = z.enum(['embedded', 'iframe']);
export type MountMode = z.infer<typeof MountModeSchema>;

// Mount options schema
export const MountOptionsSchema = z.object({
  target: z.custom<HTMLElement>((v) => v instanceof HTMLElement, {
    message: 'Expected HTMLElement',
  }),
  mode: MountModeSchema,
  sandbox: z.array(z.string()).optional(),
  inputs: z.record(z.string(), z.unknown()).optional(),
});

export type MountOptions = z.infer<typeof MountOptionsSchema>;

/**
 * Parse and validate ImageConfig from package.json patchwork field
 *
 * @param data - Raw data from package.json patchwork field
 * @returns Validated ImageConfig
 * @throws z.ZodError if validation fails
 */
export function parseImageConfig(data: unknown): ImageConfig {
  return ImageConfigSchema.parse(data);
}

/**
 * Safely parse ImageConfig, returning null on failure
 */
export function safeParseImageConfig(data: unknown): ImageConfig | null {
  const result = ImageConfigSchema.safeParse(data);
  return result.success ? result.data : null;
}

/**
 * Parse and validate widget manifest
 */
export function parseManifest(data: unknown): Manifest {
  return ManifestSchema.parse(data);
}

/**
 * Safely parse manifest, returning null on failure
 */
export function safeParseManifest(data: unknown): Manifest | null {
  const result = ManifestSchema.safeParse(data);
  return result.success ? result.data : null;
}

// Default ImageConfig for fallback
export const DEFAULT_IMAGE_CONFIG: ImageConfig = {
  platform: 'browser',
  esbuild: {
    target: 'es2022',
    format: 'esm',
    jsx: 'automatic',
  },
  framework: {},
};

// Default CLI ImageConfig for fallback
export const DEFAULT_CLI_IMAGE_CONFIG: ImageConfig = {
  platform: 'cli',
  esbuild: {
    target: 'node20',
    format: 'esm',
    jsx: 'automatic',
  },
};
