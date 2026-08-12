/**
 * Tool-invocation authorization — thin facade over {@link evaluateDispatch}.
 *
 * Direct permission-store checks are gone: legacy APR-320 rows resolve
 * through the unified predicate as capability-only patterns.
 */

import {
  denyMessage,
  evaluateDispatch,
  type DispatchDecision,
  type DispatchRequest,
} from "./grants.js";
import { ServiceError } from "./service-kernel.js";

export type { DispatchDecision };

/** Run evaluateDispatch; throw 403 on deny. queue/ask returned to the caller. */
export async function assertDispatchAllowed(
  req: DispatchRequest,
): Promise<DispatchDecision> {
  const decision = await evaluateDispatch(req);
  if (decision.kind === "deny") {
    throw new ServiceError(denyMessage(decision), 403);
  }
  return decision;
}
