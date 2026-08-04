/**
 * @vitest-environment happy-dom
 *
 * unified-code-editor fidelity scenario: markdown that cannot round-trip
 * through TipTap must open in source view — never rich with silent loss.
 */
import { describe, expect, it } from "vitest";
import { markdownRoundTrips } from "../../components/markdownRoundTrip";

describe("markdown fidelity probe (unified-code-editor)", () => {
  it("accepts ordinary markdown that TipTap preserves", () => {
    const source = [
      "# Title",
      "",
      "A paragraph with **bold** and `code`.",
      "",
      "- one",
      "- two",
      "",
      "```ts",
      "const x = 1;",
      "```",
    ].join("\n");
    expect(markdownRoundTrips(source)).toBe(true);
  });

  it("ignores YAML frontmatter when probing the body", () => {
    const source = [
      "---",
      "title: Hello",
      "---",
      "# Body",
      "",
      "Paragraph.",
    ].join("\n");
    expect(markdownRoundTrips(source)).toBe(true);
  });

  it("rejects markdown TipTap would rewrite (lossy round-trip)", () => {
    // Raw HTML is disabled (`html: false`); TipTap drops it on serialize,
    // so rich view would silently lose content.
    const source = [
      "# Keep",
      "",
      '<div class="callout">preserved only in source</div>',
      "",
      "After.",
    ].join("\n");
    expect(markdownRoundTrips(source)).toBe(false);
  });
});
