/**
 * unified-code-editor acceptance: stale-file handling.
 * Clean editor reloads silently; dirty editor offers reload / keep-mine.
 */
import { describe, expect, it } from "vitest";
import { staleFileAction } from "../../components/staleFile";

describe("unified-code-editor: stale-file handling", () => {
  it("returns none when the file is not stale", () => {
    expect(staleFileAction(false, false)).toBe("none");
    expect(staleFileAction(false, true)).toBe("none");
  });

  it("silently reloads when the buffer is clean", () => {
    expect(staleFileAction(true, false)).toBe("silent-reload");
  });

  it("offers reload or keep-mine when the buffer is dirty", () => {
    expect(staleFileAction(true, true)).toBe("offer-choice");
  });
});
