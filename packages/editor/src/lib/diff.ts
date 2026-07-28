const DIFF_BLOCK_REGEX = /<<<<<<< SEARCH\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> REPLACE/g;

/** Patterns that indicate diff markers in text */
const DIFF_MARKER_PATTERNS = [
  /^<<<<<<< SEARCH\s*$/m,
  /^=======\s*$/m,
  /^>>>>>>> REPLACE\s*$/m,
];

/**
 * Regex to match code fence opening with language and optional attributes.
 * Format: triple-backtick + lang + attr="value" attr2="value2"
 * Captures: [1]=language, [2]=attributes string
 */
const CODE_FENCE_REGEX = /^```(\w*)\s*((?:[a-zA-Z_][\w-]*="[^"]*"\s*)*)\s*$/;

/**
 * Regex to match individual key="value" attributes.
 */
const ATTRIBUTE_REGEX = /([a-zA-Z_][\w-]*)="([^"]*)"/g;

export interface CodeBlockAttributes {
  /** Progress note for UI display (optional but encouraged, comes first) */
  note?: string;
  /** Virtual file path for multi-file generation (uses \@/ prefix) */
  path?: string;
  /** Additional arbitrary attributes */
  [key: string]: string | undefined;
}

export interface CodeBlock {
  /** Language identifier (e.g., tsx, json, diff) */
  language: string;
  /** Parsed attributes from the fence line */
  attributes: CodeBlockAttributes;
  /** Raw content between the fence markers */
  content: string;
}

export interface DiffBlock {
  search: string;
  replace: string;
  /** Progress note from the code fence attributes */
  note?: string;
  /** Target file path for multi-file edits */
  path?: string;
}

/**
 * Parse attributes from a code fence line.
 *
 * Example input: 'note="Adding handler" path="\@/components/Button.tsx"'
 *
 * Returns: an object with note, path, and any other attributes
 */
export function parseCodeBlockAttributes(attrString: string): CodeBlockAttributes {
  const attrs: CodeBlockAttributes = {};
  if (!attrString) return attrs;

  const regex = new RegExp(ATTRIBUTE_REGEX.source, 'g');
  let match;
  while ((match = regex.exec(attrString)) !== null) {
    const key = match[1];
    const value = match[2];
    if (key && value !== undefined) {
      attrs[key] = value;
    }
  }
  return attrs;
}

/**
 * Parse all code blocks from text, extracting language and attributes.
 * Returns blocks in order of appearance.
 */
export function parseCodeBlocks(text: string): CodeBlock[] {
  const blocks: CodeBlock[] = [];
  const lines = text.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line) {
      i++;
      continue;
    }
    const fenceMatch = line.match(CODE_FENCE_REGEX);

    if (fenceMatch) {
      const language = fenceMatch[1] || '';
      const attributes = parseCodeBlockAttributes(fenceMatch[2] ?? '');
      const contentLines: string[] = [];
      i++; // Move past opening fence

      // Collect content until closing fence
      while (i < lines.length) {
        const currentLine = lines[i];
        if (currentLine !== undefined && currentLine.match(/^```\s*$/)) {
          break;
        }
        contentLines.push(currentLine ?? '');
        i++;
      }

      blocks.push({
        language,
        attributes,
        content: contentLines.join('\n'),
      });
    }
    i++;
  }

  return blocks;
}

/**
 * Check if text contains any diff markers.
 * Returns the first marker found, or null if clean.
 */
export function findDiffMarkers(text: string): string | null {
  for (const pattern of DIFF_MARKER_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      return match[0].trim();
    }
  }
  return null;
}

/**
 * Remove stray diff markers from text.
 * Use as a fallback when markers leak into output.
 */
export function sanitizeDiffMarkers(text: string): string {
  let result = text;
  // Remove standalone marker lines
  result = result.replace(/^<<<<<<< SEARCH\s*\n?/gm, '');
  result = result.replace(/^=======\s*\n?/gm, '');
  result = result.replace(/^>>>>>>> REPLACE\s*\n?/gm, '');
  // Clean up any double newlines created by removals
  result = result.replace(/\n{3,}/g, '\n\n');
  return result;
}

export interface ParsedEditResponse {
  /** Progress notes extracted from code block attributes (in order of appearance) */
  progressNotes: string[];
  /** Parsed diff blocks with their attributes */
  diffs: DiffBlock[];
  /** Summary markdown text (content outside of code blocks) */
  summary: string;
}

/**
 * Parse progress notes and diffs from an edit response.
 * 
 * ```diff note="Adding handler" path="@/components/Button.tsx"
 * <<<<<<< SEARCH
 * exact code
 * =======
 * replacement
 * >>>>>>> REPLACE
 * ```
 * 
 * Summary markdown is everything outside of code blocks.
 */
export function parseEditResponse(text: string): ParsedEditResponse {
  const progressNotes: string[] = [];
  const diffs: DiffBlock[] = [];

  // Parse all code blocks to extract notes and diffs
  const codeBlocks = parseCodeBlocks(text);

  for (const block of codeBlocks) {
    // Collect progress notes from any code block with a note attribute
    if (block.attributes.note) {
      progressNotes.push(block.attributes.note);
    }

    // A fenced block may hold several consecutive diffs — collect them all.
    const regex = new RegExp(DIFF_BLOCK_REGEX.source, 'g');
    let diffMatch;
    while ((diffMatch = regex.exec(block.content)) !== null) {
      if (diffMatch[1] === undefined || diffMatch[2] === undefined) continue;
      diffs.push({
        note: block.attributes.note,
        path: block.attributes.path,
        search: diffMatch[1],
        replace: diffMatch[2],
      });
    }
  }

  // The edit prompt asks for RAW search/replace blocks (no code fence), so
  // the common case is exactly that — fall back to bare markers whenever the
  // fenced pass found nothing. Without this, a model that follows the
  // contract to the letter parses as zero diffs and every edit "fails to
  // apply" despite a perfectly good reply.
  if (diffs.length === 0) {
    const regex = new RegExp(DIFF_BLOCK_REGEX.source, 'g');
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match[1] !== undefined && match[2] !== undefined) {
        diffs.push({ search: match[1], replace: match[2] });
      }
    }
  }

  // Extract summary: everything outside of code blocks
  const summary = extractSummary(text);

  return { progressNotes, diffs, summary };
}

/**
 * Parse diff blocks from text, extracting attributes from code fences.
 * Supports both fenced code blocks with attributes and raw diff markers.
 */
export function parseDiffs(text: string): DiffBlock[] {
  const blocks: DiffBlock[] = [];

  // First, try to parse from code blocks with attributes
  const codeBlocks = parseCodeBlocks(text);
  for (const block of codeBlocks) {
    const diffMatch = block.content.match(
      /<<<<<<< SEARCH\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> REPLACE/
    );
    if (diffMatch && diffMatch[1] !== undefined && diffMatch[2] !== undefined) {
      blocks.push({
        note: block.attributes.note,
        path: block.attributes.path,
        search: diffMatch[1],
        replace: diffMatch[2],
      });
    }
  }

  // If no fenced diffs found, fall back to raw diff markers (legacy support)
  if (blocks.length === 0) {
    const regex = new RegExp(DIFF_BLOCK_REGEX.source, 'g');
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match[1] !== undefined && match[2] !== undefined) {
        blocks.push({ search: match[1], replace: match[2] });
      }
    }
  }

  return blocks;
}

/**
 * Whitespace-tolerant fallback for a SEARCH block that doesn't match
 * byte-for-byte: slide a same-height window over the file comparing lines
 * with trailing whitespace ignored, additionally allowing one *uniform*
 * indentation shift across the whole window (models love re-indenting).
 * The REPLACE lines get the same shift so the surrounding style survives.
 * Returns the patched code, or null when no window matches.
 */
function applyFuzzyDiff(code: string, search: string, replace: string): string | null {
  const fileLines = code.split('\n');
  const searchLines = search.split('\n');
  const height = searchLines.length;

  for (let start = 0; start + height <= fileLines.length; start++) {
    // The uniform shift: a prefix added to (indent) or removed from (dedent)
    // every search line to produce the file line. At most one of the two.
    let indent: string | null = null;
    let dedent: string | null = null;
    let matched = true;

    for (let i = 0; i < height; i++) {
      const fileLine = (fileLines[start + i] ?? '').trimEnd();
      const searchLine = (searchLines[i] ?? '').trimEnd();
      if (fileLine === searchLine) continue;
      if (
        searchLine !== '' &&
        fileLine.endsWith(searchLine) &&
        /^\s+$/.test(fileLine.slice(0, fileLine.length - searchLine.length))
      ) {
        const prefix = fileLine.slice(0, fileLine.length - searchLine.length);
        if ((indent ?? prefix) !== prefix || dedent !== null) {
          matched = false;
          break;
        }
        indent = prefix;
        continue;
      }
      if (
        fileLine !== '' &&
        searchLine.endsWith(fileLine) &&
        /^\s+$/.test(searchLine.slice(0, searchLine.length - fileLine.length))
      ) {
        const prefix = searchLine.slice(0, searchLine.length - fileLine.length);
        if ((dedent ?? prefix) !== prefix || indent !== null) {
          matched = false;
          break;
        }
        dedent = prefix;
        continue;
      }
      matched = false;
      break;
    }
    if (!matched) continue;

    const replaceLines = replace.split('\n').map((line) => {
      if (line.trim() === '') return line;
      if (indent) return indent + line;
      if (dedent && line.startsWith(dedent)) return line.slice(dedent.length);
      return line;
    });
    const next = [...fileLines];
    next.splice(start, height, ...replaceLines);
    return next.join('\n');
  }
  return null;
}

export function applyDiffs(
  code: string,
  diffs: DiffBlock[],
  options: { sanitize?: boolean } = {},
): { code: string; applied: number; failed: string[]; warning?: string } {
  let result = code;
  let applied = 0;
  const failed: string[] = [];

  for (const diff of diffs) {
    if (result.includes(diff.search)) {
      result = result.replace(diff.search, diff.replace);
      applied++;
      continue;
    }
    const fuzzy = applyFuzzyDiff(result, diff.search, diff.replace);
    if (fuzzy !== null) {
      result = fuzzy;
      applied++;
      continue;
    }
    // Provide more context: first 100 chars or first 3 lines, whichever is shorter
    const lines = diff.search.split('\n').slice(0, 3);
    const preview = lines.join('\n').slice(0, 100);
    const suffix = diff.search.length > preview.length ? '...' : '';
    failed.push(preview + suffix);
  }

  // Check for stray diff markers in the result
  const marker = findDiffMarkers(result);
  let warning: string | undefined;

  if (marker) {
    if (options.sanitize) {
      result = sanitizeDiffMarkers(result);
      warning = `Removed stray diff marker "${marker}" from output`;
    } else {
      warning = `Output contains diff marker "${marker}" - the LLM may have generated a malformed response`;
    }
  }

  return { code: result, applied, failed, warning };
}

export function hasDiffBlocks(text: string): boolean {
  // Reset lastIndex to avoid state issues from the global regex flag
  DIFF_BLOCK_REGEX.lastIndex = 0;
  return DIFF_BLOCK_REGEX.test(text);
}

export function extractTextWithoutDiffs(text: string): string {
  return text.replace(DIFF_BLOCK_REGEX, '').trim();
}

/**
 * Regex to match complete code blocks (with optional attributes) for removal.
 * Matches triple-backtick fenced code with language and attributes.
 */
const CODE_BLOCK_FULL_REGEX = /```\w*(?:\s+[a-zA-Z_][\w-]*="[^"]*")*\s*\n[\s\S]*?\n```/g;

/**
 * Extract the summary markdown from an edit response.
 * Removes code blocks (with their attributes), and any leading/trailing whitespace.
 * Preserves regular markdown prose outside of code blocks.
 */
export function extractSummary(text: string): string {
  // Remove raw (unfenced) diff blocks first — the edit contract's primary
  // shape — so their search/replace bodies never read as prose.
  let summary = text.replace(new RegExp(DIFF_BLOCK_REGEX.source, 'g'), '');
  // Remove complete code blocks (including those with attributes)
  summary = summary.replace(CODE_BLOCK_FULL_REGEX, '');
  // Remove stray diff fence markers that might be left over
  summary = summary.replace(/^<<<<<<< SEARCH\s*$/gm, '');
  summary = summary.replace(/^=======\s*$/gm, '');
  summary = summary.replace(/^>>>>>>> REPLACE\s*$/gm, '');
  // Remove standalone ``` markers (not part of a code block)
  summary = summary.replace(/^```[\w]*(?:\s+[a-zA-Z_][\w-]*="[^"]*")*\s*$/gm, '');
  // Clean up multiple newlines (3+ becomes 2) and trim
  summary = summary.replace(/\n{3,}/g, '\n\n').trim();
  return summary;
}
