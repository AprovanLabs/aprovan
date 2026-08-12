/**
 * Shared sandboxed payload host for review items and notifications
 * (invariant 6). Callers supply the sandbox renderer (production wires
 * {@link NotificationPathWidget}); on failure the host silently falls back
 * to {@link GenericPayloadCard} so decision buttons stay live.
 */

import { Component, useCallback, useState, type ErrorInfo, type ReactNode } from "react";
import type { Compiler } from "@aprovan/patchwork";
import { WIDGET_IFRAME_SANDBOX } from "@/features/panel/widget-mount-contract";
import { GenericPayloadCard } from "./GenericPayloadCard";

export { WIDGET_IFRAME_SANDBOX };

export type PayloadWidgetRef = {
  path: string;
  data?: unknown;
};

export type SandboxRenderProps = {
  path: string;
  data: unknown;
  compiler: Compiler;
  services: string[];
};

type HostProps = {
  widget?: PayloadWidgetRef | null;
  /** Generic-card body when no widget or widget fails. */
  payloadFallback: unknown;
  compiler?: Compiler | null;
  services?: string[];
  /** Fired when the user edits payload via the generic card. */
  onPayloadEdit?: (payload: unknown) => void;
  className?: string;
  /**
   * Force the generic-card path (tests / known-bad widgets). Prefer this over
   * throwing from the sandbox.
   */
  forceGeneric?: boolean;
  /**
   * Sandboxed iframe host — production passes NotificationPathWidget.
   * Extends the existing notification sandbox; does not fork a second mount.
   */
  renderSandbox?: (props: SandboxRenderProps) => ReactNode;
};

class WidgetErrorBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo): void {
    this.props.onError();
  }

  render(): ReactNode {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export function PayloadWidgetHost({
  widget,
  payloadFallback,
  compiler = null,
  services = [],
  onPayloadEdit,
  className,
  forceGeneric = false,
  renderSandbox,
}: HostProps) {
  const canSandbox =
    Boolean(widget?.path) &&
    !widget!.path.startsWith("builtin:") &&
    Boolean(compiler) &&
    Boolean(renderSandbox) &&
    !forceGeneric;

  const [failed, setFailed] = useState(false);
  const markFailed = useCallback(() => setFailed(true), []);

  if (!canSandbox || failed) {
    const payload =
      widget?.path?.startsWith("builtin:") && widget.data !== undefined
        ? widget.data
        : payloadFallback;
    return (
      <GenericPayloadCard
        payload={payload}
        className={className}
        onEdit={onPayloadEdit}
      />
    );
  }

  return (
    <div className={className} data-testid="payload-widget-host" data-sandbox="true">
      <WidgetErrorBoundary onError={markFailed}>
        {renderSandbox!({
          path: widget!.path,
          data: widget!.data,
          compiler: compiler!,
          services,
        })}
      </WidgetErrorBoundary>
    </div>
  );
}
