type SchemaLike = {
  $ref?: string;
  additionalProperties?: boolean | SchemaLike;
  allOf?: SchemaLike[];
  anyOf?: SchemaLike[];
  description?: string;
  enum?: Array<string | number | boolean | null>;
  items?: SchemaLike | SchemaLike[];
  nullable?: boolean;
  oneOf?: SchemaLike[];
  properties?: Record<string, SchemaLike>;
  required?: string[];
  type?: string | string[];
};

/**
 * Controls how `$ref` nodes are rendered. With `refTypeName`, refs render as
 * named types (`Repository`) instead of being inlined — the caller is
 * responsible for emitting the named type declarations. `resolveRef` is the
 * fallback for refs without a name (they get dereferenced and inlined).
 */
export type SchemaRenderContext = {
  refTypeName?: (ref: string) => string | undefined;
  resolveRef?: (ref: string) => unknown;
};

export function quotePropertyName(name: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : JSON.stringify(name);
}

function mapJsonTypeToTS(type: string): string {
  switch (type) {
    case "string":
      return "string";
    case "number":
    case "integer":
      return "number";
    case "boolean":
      return "boolean";
    case "null":
      return "null";
    case "object":
      return "{ [key: string]: unknown }";
    case "array":
      return "unknown[]";
    default:
      return "unknown";
  }
}

function withNullable(type: string, schema: SchemaLike): string {
  return schema.nullable ? `${type} | null` : type;
}

export function schemaToTypeScriptType(
  rawSchema: unknown,
  context?: SchemaRenderContext,
  seenRefs: Set<string> = new Set(),
): string {
  const schema = rawSchema as SchemaLike | undefined;

  if (!schema || typeof schema !== "object") {
    return "unknown";
  }

  if (schema.$ref) {
    const named = context?.refTypeName?.(schema.$ref);

    if (named) {
      return named;
    }

    if (context?.resolveRef && !seenRefs.has(schema.$ref)) {
      const target = context.resolveRef(schema.$ref);

      if (target && typeof target === "object") {
        const nextSeen = new Set(seenRefs);
        nextSeen.add(schema.$ref);
        return schemaToTypeScriptType(target, context, nextSeen);
      }
    }

    return "unknown";
  }

  // An empty `enum: []` joins to the empty string, which emits syntactically
  // invalid TypeScript (`status?: ;`). Specs that do this (Discord's
  // `GET /guilds/{guild_id}/requests`) carry the real constraint elsewhere —
  // an `allOf` $ref, or just `type` — so fall through rather than emitting
  // `never`, which would make the property unusable.
  if (schema.enum && schema.enum.length > 0) {
    return withNullable(
      schema.enum.map((value) => (typeof value === "string" ? JSON.stringify(value) : String(value))).join(" | "),
      schema,
    );
  }

  if (Array.isArray(schema.type)) {
    return withNullable(schema.type.map(mapJsonTypeToTS).join(" | "), schema);
  }

  if (Array.isArray(schema.allOf) && schema.allOf.length > 0) {
    return withNullable(schema.allOf.map((item) => schemaToTypeScriptType(item, context, seenRefs)).join(" & "), schema);
  }

  if (Array.isArray(schema.oneOf) && schema.oneOf.length > 0) {
    return withNullable(schema.oneOf.map((item) => schemaToTypeScriptType(item, context, seenRefs)).join(" | "), schema);
  }

  if (Array.isArray(schema.anyOf) && schema.anyOf.length > 0) {
    return withNullable(schema.anyOf.map((item) => schemaToTypeScriptType(item, context, seenRefs)).join(" | "), schema);
  }

  if (schema.properties && !schema.type) {
    return withNullable(schemaToTypeScriptType({ ...schema, type: "object" }, context, seenRefs), schema);
  }

  switch (schema.type) {
    case "object": {
      const properties = schema.properties ?? {};
      const required = new Set(schema.required ?? []);
      const propertyEntries = Object.entries(properties).map(([key, value]) => {
        const optionalMarker = required.has(key) ? "" : "?";
        return `${quotePropertyName(key)}${optionalMarker}: ${schemaToTypeScriptType(value, context, seenRefs)}`;
      });
      const additionalProperties =
        schema.additionalProperties && typeof schema.additionalProperties === "object"
          ? `[key: string]: ${schemaToTypeScriptType(schema.additionalProperties, context, seenRefs)} | undefined`
          : schema.additionalProperties === true
            ? "[key: string]: unknown"
            : undefined;
      const members = [...propertyEntries, ...(additionalProperties ? [additionalProperties] : [])];
      return withNullable(members.length > 0 ? `{ ${members.join("; ")} }` : "{ [key: string]: unknown }", schema);
    }
    case "array": {
      if (!schema.items) {
        return withNullable("unknown[]", schema);
      }

      const itemType = Array.isArray(schema.items)
        ? schema.items.map((item) => schemaToTypeScriptType(item as SchemaLike, context, seenRefs)).join(" | ")
        : schemaToTypeScriptType(schema.items as SchemaLike, context, seenRefs);

      return withNullable(`(${itemType})[]`, schema);
    }
    case "string":
      return withNullable("string", schema);
    case "number":
    case "integer":
      return withNullable("number", schema);
    case "boolean":
      return withNullable("boolean", schema);
    case "null":
      return "null";
    default:
      return schema.additionalProperties === true ? "{ [key: string]: unknown }" : "unknown";
  }
}

export function escapeComment(text: string): string {
  return text.replace(/\*\//g, "*\\/").replace(/\n/g, " ");
}

export function schemaToObjectContent(
  rawSchema: unknown,
  indent = "    ",
  context?: SchemaRenderContext,
): string {
  const schema = rawSchema as SchemaLike | undefined;

  if (!schema || typeof schema !== "object" || (schema.type !== "object" && !schema.properties)) {
    return `${indent}[key: string]: unknown;`;
  }

  const properties = schema.properties ?? {};
  const required = new Set(schema.required ?? []);
  const lines: string[] = [];

  for (const [propName, propSchema] of Object.entries(properties)) {
    const optionalMarker = required.has(propName) ? "" : "?";
    const description = typeof propSchema.description === "string" ? propSchema.description : "";

    if (description) {
      lines.push(`${indent}/** ${escapeComment(description)} */`);
    }

    lines.push(`${indent}${quotePropertyName(propName)}${optionalMarker}: ${schemaToTypeScriptType(propSchema, context)};`);
  }

  if (schema.additionalProperties && typeof schema.additionalProperties === "object") {
    lines.push(`${indent}[key: string]: ${schemaToTypeScriptType(schema.additionalProperties, context)} | undefined;`);
  } else if (schema.additionalProperties === true || lines.length === 0) {
    lines.push(`${indent}[key: string]: unknown;`);
  }

  return lines.join("\n");
}
