/**
 * Harness bootstrap probe — not a Chat product flow (those are streams 10–12).
 * Exists so `playwright test --list` / `--grep @chat` succeed before flow specs land.
 */
import { test, expect } from "./fixtures/two-users";
import { attachWsCapture } from "./fixtures/ws-capture";

test("@chat harness: two-users fixture and ws-capture load", async ({
  twoUsers,
}) => {
  expect(twoUsers.userA.label).toBe("A");
  expect(twoUsers.userB.label).toBe("B");
  expect(twoUsers.testId.length).toBeGreaterThan(0);

  const capture = attachWsCapture(twoUsers.userA.page);
  capture.assertZeroMatching(() => true);
  expect(capture.frames).toHaveLength(0);
});
