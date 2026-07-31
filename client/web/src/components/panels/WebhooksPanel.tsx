/**
 * WebhooksPanel — native surface over the gateway `webhooks` namespace.
 *
 * Read-mostly: registrations are created via chat (`webhooks.register`);
 * this panel surfaces the inbound URL (with copy affordances that never
 * render the raw token), delivery health, and a guarded remove. Composes
 * `${GATEWAY_BASE}${hookPath}` so what you copy is what the provider calls.
 */

import { Check, Copy, KeyRound, Webhook } from "lucide-react";
import { useRef, useState } from "react";
import {
  PanelEmpty,
  PanelError,
  PanelLoading,
  PanelShell,
  relativeTime,
  type NativePanelProps,
  usePanelData,
} from "./shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GATEWAY_BASE } from "@/lib/gateway";
import { invokeNamespaceTool } from "@/lib/tools";

interface WebhookRegistration {
  id: string;
  provider: string;
  description?: string;
  level: "workspace" | "user";
  userId?: string;
  events: string[];
  workflows: string[];
  hookPath: string;
  token: string;
  signatureConfigured: boolean;
  deliveryCount: number;
  lastDeliveryAt?: string;
  lastEvent?: string;
  lastError?: string;
  updatedAt: string;
}

const invokeWebhooks = invokeNamespaceTool("webhooks");

/** Clipboard button that flashes "Copied" without rendering the payload. */
function CopyButton({
  text,
  label,
  title,
  icon: Icon = Copy,
}: {
  text: string;
  label?: string;
  title: string;
  icon?: typeof Copy;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      title={title}
      onClick={() => {
        void navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        });
      }}
      className="inline-flex shrink-0 items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      {copied ? <Check className="h-3 w-3" /> : <Icon className="h-3 w-3" />}
      {copied ? "Copied" : label}
    </button>
  );
}

/** Two-click destructive confirm: first click arms for 3s. */
function ConfirmRemoveButton({ onConfirm, disabled }: { onConfirm: () => void; disabled?: boolean }) {
  const [arming, setArming] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  return (
    <Button
      variant={arming ? "destructive" : "ghost"}
      size="sm"
      disabled={disabled}
      className="h-7 px-2 text-xs"
      onClick={() => {
        if (arming) {
          window.clearTimeout(timer.current);
          setArming(false);
          onConfirm();
          return;
        }
        setArming(true);
        timer.current = window.setTimeout(() => setArming(false), 3000);
      }}
    >
      {arming ? "Confirm remove?" : "Remove"}
    </Button>
  );
}

function Chip({ children }: { children: string }) {
  return (
    <span className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
      {children}
    </span>
  );
}

function WebhookCard({ hook, onRemoved }: { hook: WebhookRegistration; onRemoved: () => void }) {
  const [removing, setRemoving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const url = `${GATEWAY_BASE}${hook.hookPath}`;

  const remove = () => {
    setRemoving(true);
    setActionError(null);
    invokeWebhooks("remove", { id: hook.id })
      .then(onRemoved)
      .catch((err) => setActionError(err instanceof Error ? err.message : String(err)))
      .finally(() => setRemoving(false));
  };

  return (
    <div className="rounded-md border bg-card p-3 text-sm">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="font-semibold">{hook.id}</span>
        <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">{hook.provider}</Badge>
        <Badge variant="outline" className="px-1.5 py-0 text-[10px]">{hook.level}</Badge>
        {hook.signatureConfigured ? (
          <Badge
            variant="outline"
            className="border-emerald-500/40 px-1.5 py-0 text-[10px] text-emerald-500"
          >
            HMAC ✓
          </Badge>
        ) : (
          <Badge variant="outline" className="px-1.5 py-0 text-[10px] text-muted-foreground">
            token only
          </Badge>
        )}
      </div>
      {hook.description && (
        <p className="mt-1 text-xs text-muted-foreground">{hook.description}</p>
      )}

      <div className="mt-2 flex items-center gap-1.5">
        <code className="min-w-0 truncate font-mono text-xs text-muted-foreground" title={url}>
          {url}
        </code>
        <CopyButton text={url} title="Copy URL" />
      </div>
      <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
        <span>token: ••••</span>
        <CopyButton
          text={`${url}?token=${hook.token}`}
          label="copy with token"
          title="Copy URL with token appended"
          icon={KeyRound}
        />
      </div>

      {hook.events.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-1">
          {hook.events.map((event) => (
            <Chip key={event}>{event}</Chip>
          ))}
        </div>
      )}
      {hook.workflows.length > 0 && (
        <div className="mt-1.5 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          <span>Triggers:</span>
          {hook.workflows.map((workflow) => (
            <Chip key={workflow}>{workflow}</Chip>
          ))}
        </div>
      )}

      <div className="mt-2 text-xs text-muted-foreground">
        {hook.deliveryCount} deliveries
        {hook.lastDeliveryAt && ` · last ${relativeTime(hook.lastDeliveryAt)}`}
        {hook.lastEvent && ` · ${hook.lastEvent}`}
      </div>
      {hook.lastError && <div className="mt-1 text-xs text-destructive">{hook.lastError}</div>}
      {actionError && <div className="mt-1 text-xs text-destructive">{actionError}</div>}

      <div className="mt-2 flex items-center gap-2 border-t pt-2">
        <ConfirmRemoveButton onConfirm={remove} disabled={removing} />
        <span className="text-[11px] text-muted-foreground">Also remove it at the provider.</span>
      </div>
    </div>
  );
}

export function WebhooksPanel({ scope: _scope }: NativePanelProps) {
  const { data, error, loading, refresh } = usePanelData(
    async () => (await invokeWebhooks("list", {})) as { webhooks: WebhookRegistration[] },
  );
  const webhooks = data?.webhooks ?? [];

  return (
    <PanelShell
      icon={Webhook}
      title="Webhooks"
      description="Inbound URLs that trigger workflows"
      onRefresh={refresh}
      refreshing={loading}
    >
      {error ? (
        <PanelError message={error} />
      ) : loading && !data ? (
        <PanelLoading />
      ) : webhooks.length === 0 ? (
        <PanelEmpty>
          No webhooks yet. Ask in chat to register one — you&apos;ll get an inbound URL to
          paste at the provider.
        </PanelEmpty>
      ) : (
        <div className="flex flex-col gap-2 p-3">
          {webhooks.map((hook) => (
            <WebhookCard key={hook.id} hook={hook} onRemoved={refresh} />
          ))}
        </div>
      )}
    </PanelShell>
  );
}
