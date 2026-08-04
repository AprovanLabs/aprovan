export interface ToolsAccessScan {
  namespaces: string[];
  unresolved: boolean;
}

/** Strip string literals and comments; preserve newlines for line mapping. */
function stripStringsAndComments(source: string): string {
  let out = "";
  let i = 0;

  while (i < source.length) {
    const ch = source[i]!;
    const next = source[i + 1];

    if (ch === "/" && next === "/") {
      while (i < source.length && source[i] !== "\n") {
        out += " ";
        i++;
      }
      continue;
    }

    if (ch === "/" && next === "*") {
      i += 2;
      while (i < source.length - 1 && !(source[i] === "*" && source[i + 1] === "/")) {
        out += source[i] === "\n" ? "\n" : " ";
        i++;
      }
      if (i < source.length) {
        out += "  ";
        i += 2;
      }
      continue;
    }

    if (ch === "'" || ch === '"' || ch === "`") {
      const quote = ch;
      out += " ";
      i++;
      while (i < source.length) {
        if (source[i] === "\\") {
          out += "  ";
          i += 2;
          continue;
        }
        if (quote === "`" && source[i] === "$" && source[i + 1] === "{") {
          i += 2;
          let depth = 1;
          while (i < source.length && depth > 0) {
            if (source[i] === "{") depth++;
            if (source[i] === "}") depth--;
            out += source[i] === "\n" ? "\n" : " ";
            i++;
          }
          continue;
        }
        out += source[i] === "\n" ? "\n" : " ";
        if (source[i] === quote) {
          i++;
          break;
        }
        i++;
      }
      continue;
    }

    out += ch;
    i++;
  }

  return out;
}

function readIdent(code: string, start: number): { word: string; end: number } | null {
  if (!/[A-Za-z_$]/.test(code[start] ?? "")) return null;
  let end = start + 1;
  while (end < code.length && /[\w$]/.test(code[end]!)) end++;
  return { word: code.slice(start, end), end };
}

function isToolsBinding(code: string, start: number, end: number): boolean {
  const before = code.slice(Math.max(0, start - 24), start).replace(/\s+$/, "");
  if (/(?:\b(?:const|let|var|function)\s*)$/.test(before)) return true;

  const after = code.slice(end).match(/^\s*([,)])/);
  if (!after) return false;
  const paramContext = /[(,]\s*$/.test(before.slice(-12));
  return paramContext && after[1] !== undefined;
}

/**
 * Static scan for `tools.<namespace>` member access in widget or script source.
 * Returns deduplicated namespace names and flags dynamic `tools[expr]` access.
 */
export function scanToolsAccess(source: string): ToolsAccessScan {
  const code = stripStringsAndComments(source);
  const namespaces = new Set<string>();
  let unresolved = false;

  /** Lexical shadow stack — true when `tools` is bound in the current block. */
  const shadowStack: boolean[] = [false];
  let i = 0;

  while (i < code.length) {
    const ch = code[i]!;

    if (ch === "{") {
      shadowStack.push(shadowStack[shadowStack.length - 1]!);
      i++;
      continue;
    }

    if (ch === "}") {
      if (shadowStack.length > 1) shadowStack.pop();
      i++;
      continue;
    }

    const ident = readIdent(code, i);
    if (!ident) {
      i++;
      continue;
    }

    if (ident.word === "tools") {
      if (isToolsBinding(code, i, ident.end)) {
        shadowStack[shadowStack.length - 1] = true;
        i = ident.end;
        continue;
      }

      if (!shadowStack[shadowStack.length - 1]!) {
        let j = ident.end;
        while (j < code.length && /\s/.test(code[j]!)) j++;

        if (code[j] === ".") {
          j++;
          while (j < code.length && /\s/.test(code[j]!)) j++;
          const member = readIdent(code, j);
          if (member) namespaces.add(member.word);
        } else if (code[j] === "[") {
          unresolved = true;
        }
      }

      i = ident.end;
      continue;
    }

    i = ident.end;
  }

  return { namespaces: [...namespaces].sort(), unresolved };
}
