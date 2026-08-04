/**
 * Ambient types for the namespaces a widget can import.
 *
 * `generateNamespaceTypes` makes `import vfs from "vfs"` *compile*; this makes
 * it *typed*. The gateway serves the output as an app's `__sdk__.d.ts`
 * (registry/docs/apps-and-workflows.md, "The app SDK"), so this is deliberately
 * a pure string-producing function: no fetch, no filesystem, no gateway
 * imports. Given a manifest's service list and the app's declared workflow
 * schemas it returns a self-contained `.d.ts` — the same input the editor, the
 * playground and the live page each have on hand.
 *
 * What gets real types and what doesn't:
 *
 * - **Native namespaces** (`vfs`, `keyvalue`, `events`) are first-party and
 *   stable, so their procedures are hand-written here, mirroring the gateway's
 *   `apps/gateway/src/services.ts` tool declarations and return shapes. They
 *   change when that file changes, which is rare and reviewable.
 * - **Providers and `app`** are generated per workspace, so they get a
 *   structural fallback: an index signature that is callable at any depth
 *   (`github.repos.list(...)` type-checks) and resolves to `Promise<unknown>`.
 *   Where a workflow declares JSON Schema, that schema is rendered into a real
 *   TS type — declared schema is the only thing that can make the call typed,
 *   which is exactly the incentive the workflow model wants.
 *
 * The emitted file contains only `declare module` blocks and no top-level
 * import/export, so it stays an ambient (script) declaration file.
 *
 * This module is the single implementation of that contract. It is published
 * as the dependency-free subpath `@aprovan/patchwork-compiler/namespace-types`
 * so the gateway can serve the very same bytes as `__sdk__.d.ts` without
 * pulling esbuild-wasm or DOM code into a Node process — one generator, so the
 * types in chat, in the playground and on the live page cannot drift.
 */

import { extractNamespaces, NATIVE_APP_NAMESPACES } from "../namespace-core.js";

export { extractNamespaces, NATIVE_APP_NAMESPACES };
export type { NativeAppNamespace } from "../namespace-core.js";

/** The slice of JSON Schema this generator understands. */
export interface JsonSchema {
  type?: string | string[];
  properties?: Record<string, JsonSchema>;
  required?: string[];
  items?: JsonSchema;
  enum?: unknown[];
  const?: unknown;
  additionalProperties?: boolean | JsonSchema;
  anyOf?: JsonSchema[];
  oneOf?: JsonSchema[];
  allOf?: JsonSchema[];
  description?: string;
  [key: string]: unknown;
}

/** Knobs a host with more manifest context than `services` can turn. */
export interface NamespaceTypesOptions {
  /**
   * Per-namespace procedure allow-list. A namespace named here declares only
   * the procedures listed, so generated types never advertise a call the
   * manifest's `allowedTools` would reject. Namespaces left out keep every
   * procedure this generator knows.
   */
  procedures?: Record<string, readonly string[]>;
  /**
   * Per-namespace prose rendered as a doc comment above the module block —
   * where the data physically lands, how it is partitioned, anything the
   * caller knows and this generator cannot.
   */
  notes?: Record<string, string>;
}

/** One workflow an app exports, as the manifest declares it. */
export interface WorkflowTypeSpec {
  /** Published workflow name, e.g. `weekly-summary`. */
  name: string;
  /** JSON Schema for the call's argument object, when declared. */
  input?: JsonSchema;
  /** JSON Schema for the resolved value, when declared. */
  output?: JsonSchema;
  /** Rendered as the member's doc comment. */
  description?: string;
}

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

function quoteMember(name: string): string {
  return IDENTIFIER.test(name) ? name : JSON.stringify(name);
}

/** `weekly-summary` → `weeklySummary`, the call-site spelling the docs use. */
function camelCase(name: string): string {
  return name.replace(/[-_.\s]+([A-Za-z0-9])/g, (_match, char: string) =>
    char.toUpperCase(),
  );
}

function docComment(text: string | undefined, indent: string): string {
  if (!text) return "";
  const oneLine = text.replace(/\*\//g, "*\\/").replace(/\s+/g, " ").trim();
  return `${indent}/** ${oneLine} */\n`;
}

/** A multi-line `/** … *\/` block, for prose too long to sit on one line. */
function blockComment(text: string | undefined): string {
  if (!text) return "";
  const lines = text
    .replace(/\*\//g, "*\\/")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  if (lines.length === 0) return "";
  return `/**\n${lines.map((line) => ` * ${line}`).join("\n")}\n */\n`;
}

function literal(value: unknown): string {
  if (value === null) return "null";
  switch (typeof value) {
    case "string":
      return JSON.stringify(value);
    case "number":
    case "boolean":
      return String(value);
    default:
      return "unknown";
  }
}

/**
 * JSON Schema → TypeScript. Intentionally shallow: the shapes above plus
 * unions, and `unknown` for everything else. An imprecise-but-honest `unknown`
 * beats a wrong type, and the schema is advisory anyway — an undeclared call
 * still works at runtime.
 */
function schemaToTs(schema: JsonSchema | undefined, indent: string): string {
  if (!schema || typeof schema !== "object") return "unknown";

  if (Array.isArray(schema.enum) && schema.enum.length > 0) {
    return schema.enum.map(literal).join(" | ");
  }
  if (schema.const !== undefined) return literal(schema.const);

  const union = schema.anyOf ?? schema.oneOf;
  if (Array.isArray(union) && union.length > 0) {
    return union.map((entry) => schemaToTs(entry, indent)).join(" | ");
  }
  if (Array.isArray(schema.allOf) && schema.allOf.length > 0) {
    return schema.allOf.map((entry) => schemaToTs(entry, indent)).join(" & ");
  }

  const types = Array.isArray(schema.type)
    ? schema.type
    : schema.type
      ? [schema.type]
      : [];

  if (types.length > 1) {
    return types
      .map((type) => schemaToTs({ ...schema, type }, indent))
      .join(" | ");
  }

  switch (types[0]) {
    case "string":
      return "string";
    case "number":
    case "integer":
      return "number";
    case "boolean":
      return "boolean";
    case "null":
      return "null";
    case "array":
      return `Array<${schemaToTs(schema.items, indent)}>`;
    case "object":
      return objectToTs(schema, indent);
    default:
      // No `type`, but `properties` (or a constrained `additionalProperties`)
      // still describes an object — schemas in the wild often omit the keyword.
      return schema.properties ||
        (schema.additionalProperties && typeof schema.additionalProperties === "object")
        ? objectToTs(schema, indent)
        : "unknown";
  }
}

function objectToTs(schema: JsonSchema, indent: string): string {
  const properties = schema.properties ?? {};
  const required = new Set(schema.required ?? []);
  const inner = `${indent}  `;
  const lines: string[] = [];

  for (const [name, property] of Object.entries(properties)) {
    const optional = required.has(name) ? "" : "?";
    lines.push(
      `${docComment(property?.description, inner)}${inner}${quoteMember(name)}${optional}: ${schemaToTs(property, inner)};`,
    );
  }

  const additional = schema.additionalProperties;
  if (additional === true) {
    lines.push(`${inner}[key: string]: unknown;`);
  } else if (additional && typeof additional === "object") {
    lines.push(`${inner}[key: string]: ${schemaToTs(additional, inner)};`);
  }

  if (lines.length === 0) return "Record<string, unknown>";
  return `{\n${lines.join("\n")}\n${indent}}`;
}

/** `const x: T; export default x; export { x };` — the shape the plugin emits. */
function moduleFooter(namespace: string, typeName: string): string {
  return `  const ${namespace}: ${typeName};\n  export default ${namespace};\n  export { ${namespace} };`;
}

/**
 * A native namespace, per procedure rather than as one string, so a host that
 * knows the app's allow-list can drop the procedures it may not call.
 */
interface NativeDeclaration {
  /** Interface describing the namespace object itself. */
  typeName: string;
  /** Supporting interfaces, pre-indented one level. */
  support?: string;
  /** Procedure members keyed by procedure name, pre-indented two levels. */
  procedures: Record<string, string>;
}

const NATIVE_DECLARATIONS: Record<string, NativeDeclaration> = {
  vfs: {
    typeName: "Vfs",
    support: `  export interface VfsEntry {
    path: string;
    hash: string;
    mimeType: string;
    size: number;
    updatedAt: string;
  }

  export interface VfsFile extends VfsEntry {
    content: string;
  }`,
    procedures: {
      list: `    /** List files (latest version metadata), optionally under a directory prefix. */
    list(args?: { prefix?: string }): Promise<{ entries: VfsEntry[] }>;`,
      read: `    /** Read a file; \`hash\` pins an older content version. */
    read(args: { path: string; hash?: string }): Promise<VfsFile>;`,
      write: `    /** Write a file. Content-hash versioned; prior versions stay readable. */
    write(args: {
      path: string;
      content: string;
      mimeType?: string;
    }): Promise<VfsEntry>;`,
      delete: `    /** Delete a file, or a whole subtree with \`recursive: true\`. */
    delete(args: { path: string; recursive?: boolean }): Promise<{ deleted: string }>;`,
    },
  },

  keyvalue: {
    typeName: "KeyValue",
    procedures: {
      get: `    /** Read a value by key (\`value\` is null when absent). */
    get(args: { key: string }): Promise<{ key: string; value: unknown }>;`,
      set: `    /** Write a JSON-serializable value under a key. */
    set(args: { key: string; value: unknown }): Promise<{ key: string; ok: boolean }>;`,
      delete: `    /** Delete a key. */
    delete(args: { key: string }): Promise<{ key: string; deleted: boolean }>;`,
      list: `    /** List keys under an optional prefix. */
    list(args?: { prefix?: string }): Promise<{ keys: string[] }>;`,
    },
  },

  events: {
    typeName: "Events",
    support: `  export interface EventRecord {
    id: string;
    ts: string;
    userId: string;
    payload: unknown;
  }`,
    procedures: {
      emit: `    /** Emit an event on a named channel (e.g. \`form.submitted\`). */
    emit(args: {
      channel: string;
      payload?: unknown;
    }): Promise<{ id: string; channel: string }>;`,
      list: `    /** Read recent events on a channel, oldest first. */
    list(args: {
      channel: string;
      limit?: number;
    }): Promise<{ channel: string; events: EventRecord[] }>;`,
    },
  },
};

/** Render a native namespace, keeping only `allowed` procedures if given. */
function nativeDeclaration(
  namespace: string,
  declaration: NativeDeclaration,
  allowed: readonly string[] | undefined,
): string {
  const members = Object.entries(declaration.procedures)
    .filter(([procedure]) => !allowed || allowed.includes(procedure))
    .map(([, member]) => member)
    .join("\n");
  const support = declaration.support ? `${declaration.support}\n\n` : "";

  return `declare module ${JSON.stringify(namespace)} {
${support}  export interface ${declaration.typeName} {
${members}
  }

${moduleFooter(namespace, declaration.typeName)}
}`;
}

/**
 * Structural fallback for a namespace whose procedures we cannot know at
 * generation time. `Procedure` is callable *and* indexable by itself, so any
 * depth the runtime proxy supports also type-checks.
 */
function structuralDeclaration(namespace: string): string {
  const typeName = `${namespace.charAt(0).toUpperCase()}${namespace.slice(1)}Namespace`;
  return `declare module ${JSON.stringify(namespace)} {
  /** Any procedure on this namespace, at any nesting depth. */
  export interface Procedure {
    (args?: Record<string, unknown>): Promise<unknown>;
    [procedure: string]: Procedure;
  }

  /** Pin a named profile; bare \`import\` uses the default profile. */
  type ProfileClient = (name: string) => Promise<${typeName}>;

  export interface ${typeName} {
    client: ProfileClient;
    [procedure: string]: Procedure | ProfileClient;
  }

${moduleFooter(namespace, typeName)}
}`;
}

/** The `app` namespace, typed from the workflows the app exports. */
function appDeclaration(
  namespace: string,
  workflows: WorkflowTypeSpec[],
): string {
  const typeName = `${namespace.charAt(0).toUpperCase()}${namespace.slice(1)}Namespace`;
  const members: string[] = [];
  const seen = new Set<string>();

  for (const workflow of workflows) {
    // Undeclared input still calls fine, so the argument stays optional
    // unless the schema says otherwise.
    const inputType = workflow.input
      ? schemaToTs(workflow.input, "    ")
      : "Record<string, unknown>";
    const requiredProps = workflow.input?.required;
    const requiredInput =
      Array.isArray(requiredProps) && requiredProps.length > 0;
    const outputType = workflow.output
      ? schemaToTs(workflow.output, "    ")
      : "unknown";
    const signature = `(input${requiredInput ? "" : "?"}: ${inputType}): Promise<${outputType}>;`;

    // Both spellings are declared: the published name is what the manifest and
    // `curl` use, the camelCase alias is the call-site form the SDK docs show.
    for (const member of [camelCase(workflow.name), workflow.name]) {
      if (seen.has(member)) continue;
      seen.add(member);
      members.push(
        `${docComment(workflow.description, "    ")}    ${quoteMember(member)}${signature}`,
      );
    }
  }

  return `declare module ${JSON.stringify(namespace)} {
  /** Workflows this app exports. Undeclared schemas widen to \`unknown\`. */
  export interface ${typeName} {
${members.join("\n")}
  }

${moduleFooter(namespace, typeName)}
}`;
}

/**
 * Generate the ambient `.d.ts` for a widget's importable namespaces.
 *
 * Pure: same inputs, same string, no I/O. This is what the gateway's
 * `apps.sdk` endpoint serves as `__sdk__.d.ts`.
 *
 * @param services - Manifest service entries (`["vfs", "github.repos.list"]`);
 *   reduced to namespace roots exactly as the mount does.
 * @param workflows - The app's exported workflows with their declared JSON
 *   Schemas. Supplying any of these also declares the `app` namespace.
 * @param options - Optional per-namespace procedure allow-list and prose, for
 *   a host (the gateway) that knows more about the app than its service list.
 */
export function generateNamespaceTypes(
  services: string[],
  workflows: WorkflowTypeSpec[] = [],
  options: NamespaceTypesOptions = {},
): string {
  const namespaces = extractNamespaces(services).filter((name) =>
    IDENTIFIER.test(name),
  );
  // Workflows imply the `app` namespace even if the caller forgot to list it —
  // an app that exports workflows always has one.
  if (workflows.length > 0 && !namespaces.includes("app")) {
    namespaces.push("app");
  }

  const native = new Set<string>(NATIVE_APP_NAMESPACES);
  const blocks = namespaces.map((namespace) => {
    const declaration = native.has(namespace)
      ? NATIVE_DECLARATIONS[namespace]
      : undefined;
    const body = declaration
      ? nativeDeclaration(namespace, declaration, options.procedures?.[namespace])
      : namespace === "app" && workflows.length > 0
        ? appDeclaration(namespace, workflows)
        : structuralDeclaration(namespace);
    return `${blockComment(options.notes?.[namespace])}${body}`;
  });

  return `// Generated by @aprovan/patchwork-compiler — do not edit.
//
// Ambient declarations for the namespaces this widget may import:
//
//   import vfs from "vfs";
//   import app from "app";
//
// Each module is sugar over the namespace proxy the runtime installs as a
// global, so the import and the global behave identically.

${blocks.join("\n\n")}
`;
}
