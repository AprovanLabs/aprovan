/**
 * Tool-invocation authorization — thin facade over {@link evaluateDispatch}.
 *
 * Legacy `mayInvokeTool` remains as a boolean adapter for out-of-Touches
 * callers (e.g. workflows/invoke.ts) until those sites call evaluateDispatch
 * directly. Direct permission-store checks are gone: legacy APR-320 rows
 * resolve through the unified predicate as capability-only patterns.
 */

import {
  denyMessage,
  evaluateDispatch,
  type DispatchDecision,
  type DispatchRequest,
  type Effect,
} from "./grants.js";
import type { Principal } from "./middleware/auth.js";
import { ServiceError } from "./service-kernel.js";

export type { DispatchDecision };

/**
 * Boolean adapter over {@link evaluateDispatch} (capability axis only —
 * no resource). Prefer `evaluateDispatch` at new call sites.
 */
export async function mayInvokeTool(
  principal: Principal,
  provider: string,
  operation: string,
  effect: Effect = "action",
): Promise<boolean> {
  const decision = await evaluateDispatch({
    principal,
    tool: { namespace: provider, operation, effect },
  });
  return decision.kind === "allow";
}

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
