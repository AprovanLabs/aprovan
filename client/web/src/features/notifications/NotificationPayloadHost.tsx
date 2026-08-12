/**
 * Production wiring: PayloadWidgetHost + the existing NotificationPathWidget
 * sandbox (extends, does not duplicate).
 */

import type { ReactNode } from "react";
import type { Compiler } from "@aprovan/patchwork";
import { NotificationPathWidget } from "@/features/widgets/NotificationPathWidget";
import {
  PayloadWidgetHost as CorePayloadWidgetHost,
  type PayloadWidgetRef,
  type SandboxRenderProps,
} from "./PayloadWidgetHost";

export type { PayloadWidgetRef, SandboxRenderProps };

/** Shared sandbox renderer — pass into review / JIT / notification cards. */
export function notificationSandboxRenderer(
  props: SandboxRenderProps,
): ReactNode {
  return (
    <NotificationPathWidget
      path={props.path}
      data={props.data}
      compiler={props.compiler}
      services={props.services}
    />
  );
}

type Props = {
  widget?: PayloadWidgetRef | null;
  payloadFallback: unknown;
  compiler?: Compiler | null;
  services?: string[];
  onPayloadEdit?: (payload: unknown) => void;
  className?: string;
  forceGeneric?: boolean;
};

/** Review / notification payload host bound to the notification iframe sandbox. */
export function PayloadWidgetHost(props: Props) {
  return (
    <CorePayloadWidgetHost {...props} renderSandbox={notificationSandboxRenderer} />
  );
}
