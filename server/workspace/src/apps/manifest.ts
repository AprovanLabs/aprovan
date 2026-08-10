/**
 * `app.yaml` loader/validator — Zod-over-YAML (IW-9 decision D3).
 *
 * `loadAppYaml(content)` turns app.yaml bytes into a typed, validated
 * {@link AppYaml} or a list of actionable issues (path + message). This
 * module never touches the filesystem — it operates on the given string
 * only — and never validates the `capabilities` grammar (`"ns.proc"` |
 * `"ns.*"`); that enforcement belongs to iw9-c (Wave 2).
 *
 * `AppYaml` is a frozen seam: `iw9-b-app-model` and this change's own
 * `reconcile.ts` import the type directly. See tech-plan.md "Interfaces &
 * Data" for the authoritative shape.
 */

import { parse as parseYaml } from "yaml";
import { z } from "zod";

/**
 * Fields minted or derived by `reconcile.ts` — never authored in app.yaml.
 * Declared on the object so `.strict()` does not conflate them with ordinary
 * unknown keys; rejected by `superRefine` with a distinct D3 message.
 */
const PLATFORM_FIELDS = [
  "appId",
  "createdAt",
  "updatedAt",
  "createdBy",
  "channels",
  "paths",
  "entry",
] as const;

const PLATFORM_ASSIGNED_MESSAGE =
  "identity is platform-assigned; never appears in app.yaml";

/**
 * Icon-traversal check is a STRING PATTERN ONLY (reject a leading "/" and
 * any ".." path segment) — this module has no filesystem access, so it
 * cannot and does not perform real path resolution against an app root.
 */
function isEscapingIconPath(icon: string): boolean {
  if (icon.startsWith("/")) return true;
  return icon.split(/[\\/]/u).includes("..");
}

export const AppYamlSchema = z
  .object({
    // T2: when present, must equal the app-root basename — enforced by
    // reconcile.ts, not here (this module never sees a root path).
    slug: z.string().optional(),
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    // Named icon identifier OR app-root-relative path; traversal rejected below.
    icon: z.string().optional(),
    // Coarse ceiling only; F4 accepts ANY string array. The "ns.proc" |
    // "ns.*" grammar is iw9-c's enforcement concern (Wave 2) — do not add
    // it here even though it looks easy (briefs/deviations.md §7).
    capabilities: z.array(z.string()).optional(),
    // Existing AppRequirement shape (apps/store.ts:142-146), reused as-is.
    requires: z
      .array(
        z.object({
          contract: z.string(),
          profileName: z.string().optional(),
          optional: z.boolean().optional(),
        }),
      )
      .optional(),
    // D2 shape; install-time pick is iw9-b's concern.
    hostModes: z
      .array(z.enum(["managed", "creator-hosted", "publisher-hosted"]))
      .nonempty()
      .default(["managed"]),
    // Platform-owned — accepted into the object only so superRefine can name
    // them distinctly from ordinary unknown keys; never appear on AppYaml.
    appId: z.unknown().optional(),
    createdAt: z.unknown().optional(),
    updatedAt: z.unknown().optional(),
    createdBy: z.unknown().optional(),
    channels: z.unknown().optional(),
    paths: z.unknown().optional(),
    entry: z.unknown().optional(),
  })
  .strict()
  .superRefine((val, ctx) => {
    for (const key of PLATFORM_FIELDS) {
      if (Object.prototype.hasOwnProperty.call(val, key) && val[key] !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [key],
          message: PLATFORM_ASSIGNED_MESSAGE,
        });
      }
    }
    if (val.icon !== undefined && isEscapingIconPath(val.icon)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["icon"],
        message:
          `icon "${val.icon}" escapes the app root — icon paths must be app-root-relative ` +
          `(no leading "/" and no ".." segments)`,
      });
    }
  })
  .transform((val) => {
    const {
      appId: _appId,
      createdAt: _createdAt,
      updatedAt: _updatedAt,
      createdBy: _createdBy,
      channels: _channels,
      paths: _paths,
      entry: _entry,
      ...authored
    } = val;
    return authored;
  });

export type AppYaml = z.infer<typeof AppYamlSchema>;

/** One actionable validation issue: the offending YAML path and a message. */
export interface AppYamlIssue {
  path: string;
  message: string;
}

export type LoadAppYamlResult =
  | { ok: true; value: AppYaml }
  | { ok: false; issues: AppYamlIssue[] };

/** First line of a `yaml` parse error's message (it already embeds "at line N, column M"). */
function yamlParseIssue(err: unknown): AppYamlIssue {
  if (err instanceof Error) {
    const firstLine = err.message.split("\n")[0] ?? err.message;
    return { path: "", message: `Malformed YAML: ${firstLine}` };
  }
  return { path: "", message: `Malformed YAML: ${String(err)}` };
}

export function loadAppYaml(content: string): LoadAppYamlResult {
  let raw: unknown;
  try {
    raw = parseYaml(content);
  } catch (err) {
    return { ok: false, issues: [yamlParseIssue(err)] };
  }

  if (raw === null || raw === undefined) raw = {};
  if (typeof raw !== "object" || Array.isArray(raw)) {
    return {
      ok: false,
      issues: [{ path: "", message: "app.yaml must be a YAML mapping (object) at the top level" }],
    };
  }

  const parsed = AppYamlSchema.safeParse(raw);
  if (parsed.success) return { ok: true, value: parsed.data };

  // Expand unrecognized_keys into one issue per key (Zod packs them).
  const issues: AppYamlIssue[] = [];
  for (const issue of parsed.error.issues) {
    if (issue.code === "unrecognized_keys") {
      for (const key of issue.keys) {
        issues.push({
          path: key,
          message: `Unknown key "${key}" is not a recognized app.yaml field`,
        });
      }
      continue;
    }
    issues.push({ path: issue.path.join("."), message: issue.message });
  }
  return { ok: false, issues };
}
