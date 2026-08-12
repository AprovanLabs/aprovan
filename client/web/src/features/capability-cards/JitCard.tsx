/**
 * JIT capability / resource card — inline transcript + review-surface duplicate
 * (ux.md "JIT card"). Allow once / Allow pattern / Deny.
 */

import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import type { Compiler } from "@aprovan/patchwork";
import { Button } from "@/components/ui/button";
import {
  PayloadWidgetHost,
  type SandboxRenderProps,
} from "@/features/notifications/PayloadWidgetHost";
import { ReviewItemShell } from "@/features/review-surface/ReviewItemShell";
import { ResourcePatternInput } from "@/features/review-surface/ResourcePatternInput";
import {
  applyClientPayloadEdit,
  type ReviewItem,
} from "@/features/review-surface/types";

export type JitCardProps = {
  item: ReviewItem;
  /** Other queued resources for pattern coverage preview. */
  queuedResources?: string[];
  compiler?: Compiler | null;
  services?: string[];
  forceGenericWidget?: boolean;
  /** Notification sandbox renderer (NotificationPathWidget). */
  renderSandbox?: (props: SandboxRenderProps) => ReactNode;
  onAllowOnce?: (item: ReviewItem) => void;
  onAllowPattern?: (item: ReviewItem, pattern: string) => void;
  onDeny?: (item: ReviewItem) => void;
};

export function JitCard({
  item,
  queuedResources,
  compiler = null,
  services = [],
  forceGenericWidget,
  renderSandbox,
  onAllowOnce,
  onAllowPattern,
  onDeny,
}: JitCardProps) {
  const [current, setCurrent] = useState(item);
  const [shellStale, setShellStale] = useState(false);
  const [pattern, setPattern] = useState(item.shell.resource ?? "");
  const [showPattern, setShowPattern] = useState(false);

  useEffect(() => {
    setCurrent(item);
    setShellStale(false);
    setPattern(item.shell.resource ?? "");
  }, [item]);

  useLayoutEffect(() => {
    if (shellStale) setShellStale(false);
  }, [current.shell.resource, shellStale]);

  const waitingForAdmin = Boolean(
    current.authority.readOnly && current.authority.holder === "admins",
  );
  const candidates = queuedResources ?? (current.shell.resource ? [current.shell.resource] : []);
  const decisionsEnabled = !waitingForAdmin && !shellStale && !current.authority.readOnly;

  return (
    <article
      data-testid="jit-card"
      className="space-y-3 rounded-lg border bg-background p-4 shadow-sm"
    >
      <ReviewItemShell
        shell={current.shell}
        expiresAt={current.expiresAt}
        readOnly={current.authority.readOnly}
        shellStale={shellStale}
        waitingForAdmin={waitingForAdmin}
        onDecision={(decision) => {
          if (decision === "discard" || decision === "deny") onDeny?.(current);
          if (decision === "release" || decision === "approve") onAllowOnce?.(current);
        }}
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
          const next = applyClientPayloadEdit(current, payload);
          setCurrent(next);
          if (next.shell.resource) setPattern(next.shell.resource);
        }}
      />

      {!waitingForAdmin && !current.authority.readOnly ? (
        <div className="flex flex-col gap-2" data-testid="jit-actions">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              disabled={!decisionsEnabled}
              data-testid="allow-once"
              onClick={() => onAllowOnce?.(current)}
            >
              Allow once
            </Button>
            <Button
              size="sm"
              variant="secondary"
              disabled={!decisionsEnabled}
              data-testid="allow-pattern-toggle"
              onClick={() => setShowPattern((v) => !v)}
            >
              Allow pattern
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={!decisionsEnabled}
              data-testid="jit-deny"
              onClick={() => onDeny?.(current)}
            >
              Deny
            </Button>
          </div>
          {showPattern ? (
            <div className="space-y-2 rounded-md border p-3">
              <ResourcePatternInput
                value={pattern}
                onChange={setPattern}
                candidates={candidates}
              />
              <Button
                size="sm"
                disabled={!decisionsEnabled || !pattern}
                data-testid="allow-pattern-confirm"
                onClick={() => onAllowPattern?.(current, pattern)}
              >
                Remember pattern
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
