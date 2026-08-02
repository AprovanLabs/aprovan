/**
 * Sandbox images — Patchwork's image system, pointed one layer down.
 *
 * Patchwork answered "what may generated UI import?" with an npm package: a
 * `package.json#patchwork` field declaring the platform, the dependencies,
 * the aliases, and a `PROMPT.md` the model reads. The image *name* is the
 * contract; the compiler resolves it from a CDN; the model is told what it may
 * use and nothing more.
 *
 * A sandbox image is the same object, describing a filesystem instead of a
 * bundle. `package.json#sandbox`:
 *
 * ```jsonc
 * {
 *   "name": "@aprovan/sandbox-image-node",
 *   "sandbox": {
 *     "platform": "linux/amd64",
 *     "workdir": "/work",
 *     "base": {                       // how each provider realizes it
 *       "sprites": "ghcr.io/aprovanlabs/sandbox-node:22",
 *       "local":   { "require": ["node>=20", "git"] }
 *     },
 *     "tools":      [{ "name": "node", "version": ">=20" }],
 *     "namespaces": ["vfs", "keyvalue"],
 *     "env":        { "CI": "1" },
 *     "prompt":     "./PROMPT.md"
 *   }
 * }
 * ```
 *
 * Two lists, two directions, and the distinction is the whole point:
 *
 *   - `tools`      — binaries on PATH *inside* the box. The direct analogue of
 *                    Patchwork's supported UI imports: what the agent may
 *                    reach for. A create() asking for a tool the image lacks
 *                    fails at resolution, not at the first command.
 *   - `namespaces` — workspace tool namespaces reachable *out* of the box over
 *                    the ordinary tools proxy. Capability = namespace, same as
 *                    everywhere else; narrowed by the caller's grants, never
 *                    widened.
 *
 * `base` is keyed by provider id because "the same image" means a container
 * reference on one host, a runtime descriptor on another, and a set of
 * prerequisites to verify on a developer's laptop. A missing entry is a clear
 * error naming the providers that do support the image.
 */

export const DEFAULT_IMAGE_WORKDIR = "/work";

export interface SandboxImageTool {
  name: string;
  /** Semver-ish range, informational — enforcement is the host's business. */
  version?: string;
  description?: string;
  /** Command that proves the tool is present, e.g. `node --version`. */
  check?: string;
}

export interface SandboxImageConfig {
  /** Target platform, e.g. `linux/amd64`. */
  platform?: string;
  /** Absolute working directory mounts are resolved against. */
  workdir?: string;
  /** Provider id → that provider's concrete realization of this image. */
  base?: Record<string, unknown>;
  /** Binaries available inside the box. */
  tools?: SandboxImageTool[];
  /** Workspace tool namespaces callable from inside the box. */
  namespaces?: string[];
  env?: Record<string, string>;
  resources?: { cpus?: number; memoryMb?: number; diskMb?: number };
  /** Package-relative provisioning script run once after create. */
  setup?: string;
  /** Package-relative markdown describing this environment for LLMs. */
  prompt?: string;
  /** Named extended docs, lazy-loaded (skills / DESIGN.md-style). */
  docs?: Record<string, string>;
}

export interface ResolvedSandboxImage {
  /** Package name, without the version suffix. */
  name: string;
  version?: string;
  config: SandboxImageConfig;
  /** The `base` entry for the requested provider. */
  base: unknown;
  workdir: string;
  tools: SandboxImageTool[];
  namespaces: string[];
  env: Record<string, string>;
  resources: { cpus?: number; memoryMb?: number; diskMb?: number };
}

export class SandboxImageError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "SandboxImageError";
    this.status = status;
  }
}

/**
 * Split `@scope/name@1.2.3` (or `name@1.2.3`) into package and version.
 * Mirrors the compiler's `parsePackageSpec` so an image spec reads the same
 * on both sides of the platform.
 */
export function parseImageSpec(spec: string): { name: string; version?: string } {
  const raw = String(spec ?? "").trim();
  if (!raw) throw new SandboxImageError("image spec must be a package name", 400);
  const at = raw.lastIndexOf("@");
  if (at > 0) {
    return { name: raw.slice(0, at), version: raw.slice(at + 1) };
  }
  return { name: raw };
}

function asToolList(raw: unknown): SandboxImageTool[] {
  if (!Array.isArray(raw)) return [];
  const tools: SandboxImageTool[] = [];
  for (const entry of raw) {
    if (typeof entry === "string") {
      tools.push({ name: entry });
      continue;
    }
    if (!entry || typeof entry !== "object") continue;
    const record = entry as Record<string, unknown>;
    if (typeof record["name"] !== "string" || !record["name"]) continue;
    tools.push({
      name: record["name"],
      ...(typeof record["version"] === "string" ? { version: record["version"] } : {}),
      ...(typeof record["description"] === "string" ? { description: record["description"] } : {}),
      ...(typeof record["check"] === "string" ? { check: record["check"] } : {}),
    });
  }
  return tools;
}

function asStringRecord(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof value === "string") out[key] = value;
  }
  return out;
}

/**
 * Validate and normalize a raw `package.json#sandbox` field. Returns null for
 * anything that isn't a sandbox image, so a caller can tell "not an image"
 * from "a broken image".
 */
export function parseSandboxImage(raw: unknown): SandboxImageConfig | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const record = raw as Record<string, unknown>;
  const base =
    record["base"] && typeof record["base"] === "object" && !Array.isArray(record["base"])
      ? (record["base"] as Record<string, unknown>)
      : undefined;
  const resources =
    record["resources"] && typeof record["resources"] === "object"
      ? (record["resources"] as { cpus?: number; memoryMb?: number; diskMb?: number })
      : undefined;

  const config: SandboxImageConfig = {
    ...(typeof record["platform"] === "string" ? { platform: record["platform"] } : {}),
    ...(typeof record["workdir"] === "string" ? { workdir: record["workdir"] } : {}),
    ...(base ? { base } : {}),
    tools: asToolList(record["tools"]),
    namespaces: Array.isArray(record["namespaces"])
      ? record["namespaces"].filter((entry): entry is string => typeof entry === "string")
      : [],
    env: asStringRecord(record["env"]),
    ...(resources ? { resources } : {}),
    ...(typeof record["setup"] === "string" ? { setup: record["setup"] } : {}),
    ...(typeof record["prompt"] === "string" ? { prompt: record["prompt"] } : {}),
    ...(record["docs"] ? { docs: asStringRecord(record["docs"]) } : {}),
  };
  return config;
}

/**
 * The provider's realization of an image. Throws with the supported provider
 * list rather than handing back undefined — "this image doesn't run here" is
 * a resolution error the caller can act on.
 */
export function sandboxImageBase(
  config: SandboxImageConfig,
  provider: string,
  imageName = "image",
): unknown {
  const base = config.base?.[provider];
  if (base === undefined) {
    const supported = Object.keys(config.base ?? {});
    throw new SandboxImageError(
      supported.length > 0
        ? `${imageName} has no base for provider "${provider}". Supported: ${supported.join(", ")}`
        : `${imageName} declares no bases — it cannot run on any provider`,
      400,
    );
  }
  return base;
}

/** Throw unless every required tool is declared by the image. */
export function assertImageTools(image: ResolvedSandboxImage, required: string[]): void {
  const present = new Set(image.tools.map((tool) => tool.name));
  const missing = required.filter((tool) => !present.has(tool));
  if (missing.length > 0) {
    throw new SandboxImageError(
      `${image.name} does not provide: ${missing.join(", ")}. It provides: ${
        [...present].join(", ") || "nothing"
      }`,
      400,
    );
  }
}

export interface ResolveImageOptions {
  /** Provider id whose `base` entry to resolve. */
  provider: string;
  /** Package registry root; defaults to esm.sh, as the compiler does. */
  cdnBaseUrl?: string;
  fetchImpl?: typeof fetch;
  /**
   * Pre-fetched `package.json` bodies keyed by `name@version` (or `name`).
   * The gateway caches resolutions this way so a busy workspace does not
   * refetch a descriptor per sandbox.
   */
  cache?: Map<string, unknown>;
}

const DEFAULT_CDN = "https://esm.sh";

interface ImagePackageJson {
  name?: string;
  version?: string;
  sandbox?: unknown;
}

/**
 * Fetch and resolve an image descriptor for one provider. The returned value
 * is everything `create` needs and nothing it doesn't: the provider's base,
 * the workdir, the merged env, and the two capability lists.
 */
export async function resolveSandboxImage(
  spec: string,
  options: ResolveImageOptions,
): Promise<ResolvedSandboxImage> {
  const { name, version } = parseImageSpec(spec);
  const cacheKey = version ? `${name}@${version}` : name;

  let packageJson = options.cache?.get(cacheKey) as ImagePackageJson | undefined;
  if (!packageJson) {
    const root = (options.cdnBaseUrl ?? DEFAULT_CDN).replace(/\/+$/u, "");
    const url = `${root}/${name}${version ? `@${version}` : ""}/package.json`;
    const fetchImpl = options.fetchImpl ?? fetch;
    let response: Response;
    try {
      response = await fetchImpl(url, { signal: AbortSignal.timeout(15_000) });
    } catch (err) {
      throw new SandboxImageError(
        `Could not fetch sandbox image ${spec}: ${err instanceof Error ? err.message : String(err)}`,
        502,
      );
    }
    if (!response.ok) {
      throw new SandboxImageError(
        `Sandbox image ${spec} not found (${response.status} from ${url})`,
        response.status === 404 ? 404 : 502,
      );
    }
    packageJson = (await response.json()) as ImagePackageJson;
    options.cache?.set(cacheKey, packageJson);
  }

  const config = parseSandboxImage(packageJson.sandbox);
  if (!config) {
    throw new SandboxImageError(
      `${name} is not a sandbox image — its package.json has no "sandbox" field`,
      400,
    );
  }

  return {
    name: packageJson.name ?? name,
    ...(packageJson.version ?? version ? { version: packageJson.version ?? version } : {}),
    config,
    base: sandboxImageBase(config, options.provider, name),
    workdir: config.workdir ?? DEFAULT_IMAGE_WORKDIR,
    tools: config.tools ?? [],
    namespaces: config.namespaces ?? [],
    env: config.env ?? {},
    resources: config.resources ?? {},
  };
}
