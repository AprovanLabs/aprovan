import { describe, expect, it } from "vitest";
import {
  isImplicitRootMain,
  suggestWidgetPath,
} from "@/features/widgets/suggest-artifact-path";
import {
  extractVisibleWidgetBlocks,
  stripWidgetFences,
} from "./widget-fences";

describe("suggestWidgetPath", () => {
  it("never suggests bare root main.tsx", () => {
    const path = suggestWidgetPath({
      path: "main.tsx",
      language: "tsx",
      content: 'export default function Counter() { return <div />; }',
    });
    expect(path).toMatch(/^widgets\/counter\/main\.tsx$/);
    expect(isImplicitRootMain(path)).toBe(false);
  });

  it("keeps explicit non-root paths", () => {
    expect(
      suggestWidgetPath({
        path: "widgets/hello/main.tsx",
        language: "tsx",
        content: "export default function Hello() {}",
      }),
    ).toBe("widgets/hello/main.tsx");
  });

  it("derives slug from export name when pathless", () => {
    expect(
      suggestWidgetPath({
        language: "tsx",
        content: "export default function TodoList() { return null; }",
      }),
    ).toBe("widgets/todo-list/main.tsx");
  });
});

describe("widget-fences", () => {
  it("extracts streaming widget blocks from reasoning text", () => {
    const blocks = extractVisibleWidgetBlocks(
      "Planning the layout.\n```tsx\nexport default function A() {\n  return <div",
      { includeUnclosed: true },
    );
    expect(blocks).toHaveLength(1);
    expect(blocks[0]?.unclosed).toBe(true);
    expect(blocks[0]?.content).toContain("export default");
  });

  it("strips widget fences from thinking prose", () => {
    const prose = stripWidgetFences(
      "Still thinking.\n```tsx\nexport default function X() {}\n```\nDone.",
    );
    expect(prose).not.toContain("export default");
    expect(prose).toContain("Still thinking");
    expect(prose).toContain("Done.");
  });
});
