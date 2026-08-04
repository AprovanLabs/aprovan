import { describe, expect, it } from "vitest";
import { extractCodeBlocks } from "../code-extractor";

describe("streaming code view (unterminated fence)", () => {
  it("extracts an unclosed fence as a progressive code part", () => {
    const partial = "Here is a widget:\n\n```tsx\nexport default () => <div>Hi";
    const parts = extractCodeBlocks(partial, { includeUnclosed: true });
    const code = parts.find((p) => p.type !== "text");
    expect(code).toBeDefined();
    if (!code || code.type === "text") throw new Error("expected code part");
    expect("unclosed" in code && code.unclosed).toBe(true);
    expect(code.content).toContain("export default");
    expect("language" in code && code.language).toMatch(/tsx|jsx|typescript/i);
  });

  it("grows the unclosed content as more tokens arrive", () => {
    const first = extractCodeBlocks("```ts\nconst a = 1", {
      includeUnclosed: true,
    });
    const second = extractCodeBlocks("```ts\nconst a = 1\nconst b = 2", {
      includeUnclosed: true,
    });
    const c1 = first.find((p) => "content" in p && p.type !== "text");
    const c2 = second.find((p) => "content" in p && p.type !== "text");
    expect(c1 && "unclosed" in c1 && c1.unclosed).toBe(true);
    expect(c2 && "unclosed" in c2 && c2.unclosed).toBe(true);
    if (c1 && c2 && c1.type !== "text" && c2.type !== "text") {
      expect(c2.content.length).toBeGreaterThan(c1.content.length);
    }
  });

  it("does not throw on empty or whitespace-only streaming content", () => {
    expect(() =>
      extractCodeBlocks("```tsx\n", { includeUnclosed: true }),
    ).not.toThrow();
    expect(() =>
      extractCodeBlocks("```\n ", { includeUnclosed: true }),
    ).not.toThrow();
  });
});
