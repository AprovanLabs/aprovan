/**
 * Full review item: shell + payload host. Payload edits update the shell
 * summary before decision buttons re-enable (invariant 6).
 *
 * Pass `renderSandbox` from {@link NotificationPayloadHost} / notification
 * sandbox to mount app widgets; without it the generic payload card is used.
 */

import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import type { Compiler } from "@aprovan/patchwork";
import {
  PayloadWidgetHost,
  type SandboxRenderProps,
} from "@/features/notifications/PayloadWidgetHost";
import { ReviewItemShell } from "./ReviewItemShell";
import {
  applyClientPayloadEdit,
  type ReviewDecision,
  type ReviewItem,
} from "./types";

export function ReviewItemDetail({
  item,
  compiler = null,
  services = [],
  onDecision,
  forceGenericWidget,
  renderSandbox,
}: {
  item: ReviewItem;
  compiler?: Compiler | null;
  services?: string[];
  onDecision?: (decision: ReviewDecision, item: ReviewItem) => void;
  forceGenericWidget?: boolean;
  renderSandbox?: (props: SandboxRenderProps) => ReactNode;
}) {
  const [current, setCurrent] = useState(item);
  const [shellStale, setShellStale] = useState(false);

  useEffect(() => {
    setCurrent(item);
    setShellStale(false);
  }, [item]);

  useLayoutEffect(() => {
    if (shellStale) {
      // Shell has painted the edited summary — decisions may act.
      setShellStale(false);
    }
  }, [current.shell.resource, current.shell.capability, shellStale]);

  const waitingForAdmin = Boolean(
    current.authority.readOnly && current.authority.holder === "admins",
  );

  return (
    <article data-testid="review-item-detail" className="space-y-3 rounded-lg border p-4">
      <ReviewItemShell
        shell={current.shell}
        expiresAt={current.expiresAt}
        readOnly={current.authority.readOnly}
        shellStale={shellStale}
        waitingForAdmin={waitingForAdmin}
        onDecision={(decision) => onDecision?.(decision, current)}
      />
      <PayloadWidgetHost
        widget={current.widget}
        payloadFallback={current.payloadFallback}
        compiler={compiler}
        services={services}
        forceGeneric={forceGenericWidget}
        renderSandbox={forceGenericWidget ? undefined : renderSandbox}
        onPayloadEdit={(payload) => {
          setShellStale(true);
          setCurrent(applyClientPayloadEdit(current, payload));
        }}
      />
    </article>
  );
}
