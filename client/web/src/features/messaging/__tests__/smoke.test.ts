/**
 * Messaging feature smoke — keeps brief Verify (`src/features/messaging`) green.
 * Full adapter coverage lives in `src/lib/__tests__/chat-timeline-adapter.test.ts`.
 */

import { describe, expect, it } from "vitest";
import { StorageCapError, appTopic, isStorageCapError } from "@/features/messaging";

describe("features/messaging", () => {
  it("exports StorageCapError as a distinguishable over-cap failure", () => {
    const err = new StorageCapError();
    expect(err.code).toBe("storage_cap");
    expect(isStorageCapError(err)).toBe(true);
    expect(isStorageCapError({ status: 413 })).toBe(true);
  });

  it("appTopic matches CF-1 app:<installId>", () => {
    expect(appTopic("01ABC")).toBe("app:01ABC");
  });
});
