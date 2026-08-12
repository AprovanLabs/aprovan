/**
 * Notification card retrofit onto the shell / widget split (invariant 6).
 * Choices render in the shell; the body uses {@link PayloadWidgetHost}.
 */

import type { ReactNode } from "react";
import type { Compiler } from "@aprovan/patchwork";
import { Button } from "@/components/ui/button";
import { PayloadWidgetHost, type SandboxRenderProps } from "./PayloadWidgetHost";

export type NotificationShell = {
  who: { user?: string; app?: string };
  title: string;
  body?: string;
  category: "decision" | "warning" | "activity";
  choices?: Array<{ label: string; description?: string }>;
};

export type NotificationProjection = {
  id: string;
  shell: NotificationShell;
  widget?: { path: string; data?: unknown };
  payloadFallback: unknown;
};

export function NotificationShellCard({
  item,
  compiler = null,
  services = [],
  onChoice,
  choiceBusy,
  renderSandbox,
}: {
  item: NotificationProjection;
  compiler?: Compiler | null;
  services?: string[];
  onChoice?: (label: string) => void;
  choiceBusy?: string | null;
  renderSandbox?: (props: SandboxRenderProps) => ReactNode;
}) {
  const { shell } = item;
  return (
    <article
      data-testid="notification-shell-card"
      className="rounded-lg border bg-background p-3 shadow-sm"
    >
      <header className="mb-2 space-y-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {shell.who.app ? <span data-shell-app>{shell.who.app}</span> : null}
          <span className="uppercase tracking-wide">{shell.category}</span>
        </div>
        <h3 className="text-sm font-semibold">{shell.title}</h3>
        {shell.body ? (
          <p className="text-sm text-muted-foreground">{shell.body}</p>
        ) : null}
      </header>

      <PayloadWidgetHost
        widget={item.widget}
        payloadFallback={item.payloadFallback ?? shell.body ?? null}
        compiler={compiler}
        services={services}
        renderSandbox={renderSandbox}
      />

      {shell.choices && shell.choices.length > 0 ? (
        <footer className="mt-3 flex flex-wrap gap-2" data-testid="notification-shell-choices">
          {shell.choices.map((choice) => (
            <Button
              key={choice.label}
              size="sm"
              variant="outline"
              disabled={choiceBusy === choice.label}
              onClick={() => onChoice?.(choice.label)}
            >
              {choice.label}
            </Button>
          ))}
        </footer>
      ) : null}
    </article>
  );
}
