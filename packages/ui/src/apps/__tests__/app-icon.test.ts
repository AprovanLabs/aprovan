import { describe, expect, it } from "vitest";
import { APP_ICON_PALETTE, appIconFallback } from "../app-icon";

/**
 * Golden fixtures for the pinned FNV-1a-32 algorithm (tech-plan T7):
 * offset basis 0x811c9dc5, prime 0x01000193, over the UTF-8 bytes of the
 * slug, unsigned 32-bit arithmetic throughout. `hash % 12` selects the
 * palette index. A second implementation (e.g. server-side) can recompute
 * these hashes independently and must land on the same index/color.
 *
 *   slug       fnv1a32(utf8(slug))   % 12   APP_ICON_PALETTE[idx]
 *   recipes    122215668              0     #ef4444
 *   cookbook   2534158412             8     #3b82f6
 *   a          3826002220             4     #22c55e
 *   todo       844695421              1     #f97316
 */
const FIXTURES = [
  { slug: "recipes", letter: "R", index: 0 },
  { slug: "cookbook", letter: "C", index: 8 },
  { slug: "a", letter: "A", index: 4 },
  { slug: "todo", letter: "T", index: 1 },
] as const;

describe("appIconFallback", () => {
  it("is deterministic: the same slug yields the same letter and color on repeat calls", () => {
    const first = appIconFallback("recipes");
    const second = appIconFallback("recipes");
    expect(second).toEqual(first);
    expect(first).toEqual({ letter: "R", color: APP_ICON_PALETTE[0] });
  });

  it.each(FIXTURES)(
    "maps slug $slug to letter $letter and palette index $index per the pinned FNV-1a-32 algorithm",
    ({ slug, letter, index }) => {
      expect(appIconFallback(slug)).toEqual({
        letter,
        color: APP_ICON_PALETTE[index],
      });
    },
  );

  it("re-derives the fallback from the new slug on rename (recipes -> cookbook)", () => {
    const before = appIconFallback("recipes");
    const after = appIconFallback("cookbook");

    expect(before).toEqual({ letter: "R", color: APP_ICON_PALETTE[0] });
    expect(after).toEqual({ letter: "C", color: APP_ICON_PALETTE[8] });
    expect(after.letter).not.toBe(before.letter);
    expect(after.color).not.toBe(before.color);
  });

  it("uses the uppercased first character of the slug as the letter", () => {
    expect(appIconFallback("zebra").letter).toBe("Z");
    expect(appIconFallback("9lives").letter).toBe("9");
  });
});
