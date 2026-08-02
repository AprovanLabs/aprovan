// -----------------------------------------------------------------------------
// Widget self-heal plumbing: widgets deep inside a message bubble report
// compile/mount failures up to the page, which runs a bounded fix loop
// (see features/self-heal/useWidgetSelfHeal).
// -----------------------------------------------------------------------------

import { createContext } from "react";

export interface WidgetFailure {
  path?: string;
  error: string;
}

export const WidgetErrorReporterCtx = createContext<
  ((messageId: string, failure: WidgetFailure) => void) | null
>(null);

/** Max automatic fix follow-ups sent per user message before giving up. */
export const MAX_WIDGET_AUTOFIXES = 2;
