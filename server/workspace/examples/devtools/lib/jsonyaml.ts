/**
 * JSON ↔ YAML converters.
 *
 * Emission covers all of JSON. Parsing covers the pragmatic YAML subset
 * people paste into dev tools: nested maps and lists by indentation, quoted
 * and plain scalars, inline `[]`/`{}` values, comments. Anchors, tags, and
 * multi-document streams are out of scope and raise a clear error.
 */

// --- JSON → YAML -----------------------------------------------------------

const PLAIN_SCALAR = /^[A-Za-z0-9_][A-Za-z0-9_ .\/@-]*$/;

function scalarToYaml(value: unknown): string {
  if (value === null) return "null";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  const text = String(value);
  if (
    PLAIN_SCALAR.test(text) &&
    !/^(true|false|null|yes|no|on|off)$/i.test(text) &&
    !/^[\d.+-]/.test(text)
  ) {
    return text;
  }
  return JSON.stringify(text);
}

export function jsonToYaml(value: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (Array.isArray(value)) {
    if (value.length === 0) return `${pad}[]`;
    return value
      .map((item) => {
        if (item !== null && typeof item === "object") {
          const nested = jsonToYaml(item, indent + 1);
          return `${pad}-\n${nested}`;
        }
        return `${pad}- ${scalarToYaml(item)}`;
      })
      .join("\n");
  }
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return `${pad}{}`;
    return entries
      .map(([key, item]) => {
        const yamlKey = PLAIN_SCALAR.test(key) ? key : JSON.stringify(key);
        if (item !== null && typeof item === "object") {
          const isEmpty = Array.isArray(item)
            ? item.length === 0
            : Object.keys(item).length === 0;
          if (isEmpty) return `${pad}${yamlKey}: ${Array.isArray(item) ? "[]" : "{}"}`;
          return `${pad}${yamlKey}:\n${jsonToYaml(item, indent + 1)}`;
        }
        return `${pad}${yamlKey}: ${scalarToYaml(item)}`;
      })
      .join("\n");
  }
  return `${pad}${scalarToYaml(value)}`;
}

// --- YAML → JSON -----------------------------------------------------------

function parseScalar(raw: string): unknown {
  const text = raw.trim();
  if (text === "" || text === "null" || text === "~") return null;
  if (text === "true") return true;
  if (text === "false") return false;
  if (/^-?\d+$/.test(text)) return Number.parseInt(text, 10);
  if (/^-?\d*\.\d+$/.test(text)) return Number.parseFloat(text);
  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("[") && text.endsWith("]")) ||
    (text.startsWith("{") && text.endsWith("}"))
  ) {
    // Quoted strings and inline collections are JSON-compatible.
    return JSON.parse(text.replace(/'/g, '"'));
  }
  if (text.startsWith("'") && text.endsWith("'")) return text.slice(1, -1);
  return text;
}

interface Line {
  indent: number;
  content: string;
}

export function yamlToJson(source: string): unknown {
  if (/^\s*(%|---\s*$|&\w|\*\w|!!)/m.test(source)) {
    throw new Error("Anchors, tags, and multi-document YAML are not supported");
  }
  const lines: Line[] = source
    .split("\n")
    .map((raw) => {
      const noComment = raw.replace(/(^|\s)#.*$/, "");
      return { indent: noComment.length - noComment.trimStart().length, content: noComment.trim() };
    })
    .filter((line) => line.content.length > 0);
  if (lines.length === 0) return null;

  let index = 0;

  function parseBlock(indent: number): unknown {
    const first = lines[index];
    if (!first || first.indent < indent) return null;

    if (first.content.startsWith("- ") || first.content === "-") {
      const list: unknown[] = [];
      while (index < lines.length && lines[index]!.indent === first.indent && (lines[index]!.content.startsWith("- ") || lines[index]!.content === "-")) {
        const item = lines[index]!.content.slice(1).trim();
        index += 1;
        if (item === "") {
          list.push(parseBlock(first.indent + 1));
        } else if (item.includes(": ") || item.endsWith(":")) {
          // Inline map start on the dash line: re-inject as a map block.
          lines.splice(index, 0, { indent: first.indent + 2, content: item });
          list.push(parseBlock(first.indent + 2));
        } else {
          list.push(parseScalar(item));
        }
      }
      return list;
    }

    const map: Record<string, unknown> = {};
    while (index < lines.length && lines[index]!.indent === first.indent && !lines[index]!.content.startsWith("- ")) {
      const line = lines[index]!.content;
      const match = /^("[^"]*"|'[^']*'|[^:]+):(.*)$/.exec(line);
      if (!match) throw new Error(`Cannot parse line: ${line}`);
      const key = match[1]!.replace(/^["']|["']$/g, "");
      const rest = match[2]!.trim();
      index += 1;
      if (rest === "") {
        map[key] = index < lines.length && lines[index]!.indent > first.indent ? parseBlock(lines[index]!.indent) : null;
      } else {
        map[key] = parseScalar(rest);
      }
    }
    return map;
  }

  return parseBlock(lines[0]!.indent);
}
