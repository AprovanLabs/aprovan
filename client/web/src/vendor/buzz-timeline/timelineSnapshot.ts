/**
 * Pure helpers that read a timeline message snapshot to compute the values the
 * timeline render needs: sticky-bottom autoscroll, day dividers, jump-to-message
 * deep links, and the deferred reply-list render state.
 *
 * Keeping these out of the component render body / scroll-manager effects lets
 * them be covered by the lib-level `*.test.mjs` suite. It also enforces the key
 * correctness property: every decision must read off the SAME snapshot. If the
 * deep-link lookup reads a fresher list than the rows the DOM has actually
 * committed, a jump fires against a row that isn't there yet and silently fails.
 *
 * Vendored from block/buzz — import path adjusted to local `./types`.
 */

import type { TimelineMessage } from "./types";

export type TimelineMessageDelta = "prepend" | "append" | "replace" | "none";

export function classifyTimelineMessageDelta({
  current,
  previous,
}: {
  current: readonly Pick<TimelineMessage, "id">[];
  previous: readonly Pick<TimelineMessage, "id">[];
}): TimelineMessageDelta {
  if (previous.length === 0 || current.length === 0) {
    return previous.length === current.length ? "none" : "replace";
  }

  const previousFirstId = previous[0]?.id;
  const previousLastId = previous[previous.length - 1]?.id;
  const currentFirstId = current[0]?.id;
  const currentLastId = current[current.length - 1]?.id;

  if (previousFirstId === currentFirstId && previousLastId === currentLastId) {
    if (previous.length === current.length) {
      return "none";
    }
    return current.length > previous.length ? "append" : "replace";
  }

  if (
    previousFirstId !== undefined &&
    currentFirstId !== previousFirstId &&
    current.some((message) => message.id === previousFirstId)
  ) {
    return "prepend";
  }

  if (previousLastId !== undefined && currentLastId !== previousLastId) {
    return "append";
  }

  return "replace";
}
