import type { ProviderTool } from "./loader.js";

// ---------------------------------------------------------------------------
// Tokenization
// ---------------------------------------------------------------------------

/**
 * Tokenize text into lowercase words, splitting on non-alphanumeric characters.
 * Also splits camelCase boundaries for better matching of MCP tool names.
 *
 * Examples:
 *   "github__repos_list" → ["github", "repos", "list"]
 *   "List public repositories" → ["list", "public", "repositories"]
 *   "security-advisories" → ["security", "advisories"]
 */
export function tokenize(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2") // split camelCase boundaries
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// TF-IDF scoring
// ---------------------------------------------------------------------------

/**
 * Build a TF-IDF scoring function over a corpus of tools.
 *
 * Field weights applied during term-frequency calculation:
 *   - name  × 3   (most signal)
 *   - tags  × 2   (category signal)
 *   - description × 1
 *
 * IDF formula: log((N + 1) / df)  — smoothed to avoid division-by-zero.
 *
 * Returns a function `score(tool, queryWords) → number` that can be called
 * for each candidate. Build once per search call, reuse across candidates.
 */
export function buildTfIdf(
  tools: ProviderTool[],
): (tool: ProviderTool, words: string[]) => number {
  const N = tools.length;
  if (N === 0) return () => 0;

  type TokenBag = Map<string, number>;

  // Precompute weighted token bags for each tool
  const bags: TokenBag[] = tools.map((tool) => {
    const bag: TokenBag = new Map();
    const add = (tokens: string[], weight: number) => {
      for (const tok of tokens) {
        bag.set(tok, (bag.get(tok) ?? 0) + weight);
      }
    };
    add(tokenize(tool.mcpName), 3);
    for (const tag of tool.tags) {
      add(tokenize(tag), 2);
    }
    add(tokenize(tool.description), 1);
    return bag;
  });

  // Document frequency: how many tools contain each token
  const df = new Map<string, number>();
  for (const bag of bags) {
    for (const tok of bag.keys()) {
      df.set(tok, (df.get(tok) ?? 0) + 1);
    }
  }

  const bagIndex = new Map<ProviderTool, TokenBag>(tools.map((t, i) => [t, bags[i]!]));

  return (tool: ProviderTool, words: string[]): number => {
    const bag = bagIndex.get(tool);
    if (!bag) return 0;
    const totalWeight = [...bag.values()].reduce((s, v) => s + v, 0) || 1;
    let score = 0;
    for (const word of words) {
      const tf = (bag.get(word) ?? 0) / totalWeight;
      const docFreq = df.get(word) ?? 0;
      if (docFreq === 0) continue;
      const idf = Math.log((N + 1) / docFreq);
      score += tf * idf;
    }
    return score;
  };
}

// ---------------------------------------------------------------------------
// searchTools
// ---------------------------------------------------------------------------

/**
 * Search tools by keyword using TF-IDF relevance ranking.
 *
 * Matching: ALL query words must appear in at least one of name, tags, or
 * description (case-insensitive substring match used for filtering; TF-IDF
 * token scoring used for ranking).
 *
 * Returns up to `limit` results in descending relevance order.
 */
export function searchTools(
  tools: ProviderTool[],
  query: string,
  provider: string | undefined,
  limit: number,
): Array<{ name: string; description: string; tags: string[] }> {
  const words = tokenize(query);
  if (words.length === 0) return [];

  const source = provider ? tools.filter((t) => t.providerName === provider) : tools;
  const scoreFn = buildTfIdf(source);

  const candidates: Array<{ tool: ProviderTool; score: number }> = [];

  for (const tool of source) {
    const nameLower = tool.mcpName.toLowerCase();
    const tagsText = tool.tags.join(" ").toLowerCase();
    const descLower = tool.description.toLowerCase();

    const allMatch = words.every(
      (word) =>
        nameLower.includes(word) || tagsText.includes(word) || descLower.includes(word),
    );

    if (allMatch) {
      candidates.push({ tool, score: scoreFn(tool, words) });
    }
  }

  candidates.sort((a, b) => b.score - a.score);

  return candidates.slice(0, limit).map(({ tool }) => ({
    name: tool.mcpName,
    description: tool.description,
    tags: tool.tags,
  }));
}

// ---------------------------------------------------------------------------
// groupTools
// ---------------------------------------------------------------------------

/**
 * Group tools by provider name or by OpenAPI tag.
 * Tools with no tags fall back to grouping under their provider name.
 */
export function groupTools(
  tools: ProviderTool[],
  by: "provider" | "tag",
): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};

  for (const tool of tools) {
    if (by === "provider") {
      (grouped[tool.providerName] ??= []).push(tool.mcpName);
    } else {
      const keys = tool.tags.length > 0 ? tool.tags : [tool.providerName];
      for (const key of keys) {
        (grouped[key] ??= []).push(tool.mcpName);
      }
    }
  }

  return grouped;
}
