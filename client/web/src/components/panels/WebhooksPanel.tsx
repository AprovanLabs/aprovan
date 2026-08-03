/**
 * WebhooksPanel — native surface over the gateway `webhooks` namespace.
 *
 * Lists registrations (inbound URL with copy affordances that never render
 * the raw token, delivery health, guarded remove) and supports creating one:
 * pick a provider (from the UTDK webhook-intel catalogue via
 * `webhooks.providers`, or type a free-form id), the events and workflows it
 * should trigger, and either the provider's HMAC signature or plain token
 * auth. Composes `${GATEWAY_BASE}${hookPath}` so what you copy is what the
 * provider calls.
 */

import { Check, Copy, KeyRound, Plus, Webhook } from "lucide-react";
import { useMemo, useState } from "react";
import {
  ArmedButton,
  PanelEmpty,
  PanelErrorWithRetry,
  PanelLoading,
  PanelShell,
  relativeTime,
  type NativePanelProps,
  usePanelData,
} from "./shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface ProviderWebhookEvent {
  id: string;
  description?: string;
}

interface ProviderWebhookSignature {
  header: string;
  scheme: "hmac-sha256" | "hmac-sha1";
}

interface ProviderWebhookIntel {
  provider: string;
  supported: boolean;
  summary: string;
  events: ProviderWebhookEvent[];
  signature?: ProviderWebhookSignature;
  setupSteps: Array<{ title: string; detail: string }>;
}

interface WorkflowSummary {
  name: string;
  description?: string;
}

const invokeWebhooks = invokeNamespaceTool("webhooks");
const invokeWorkflows = invokeNamespaceTool("workflows");

const CUSTOM_PROVIDER = "__custom__";
const fieldLabel = "text-xs font-medium text-muted-foreground";

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64);
}

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

function Chip({ children }: { children: string }) {
  return (
    <span className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
      {children}
    </span>
  );
}

/** Scrollable checkbox list shared by the events and workflows pickers. */
function MultiSelectList({
  items,
  selected,
  onToggle,
  emptyText,
}: {
  items: Array<{ id: string; description?: string }>;
  selected: string[];
  onToggle: (id: string) => void;
  emptyText: string;
}) {
  const [filter, setFilter] = useState("");
  const visible = filter
    ? items.filter((item) => item.id.toLowerCase().includes(filter.toLowerCase()))
    : items;
  return (
    <div className="rounded-md border bg-background">
      {items.length > 8 && (
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter…"
          className="w-full border-b bg-transparent px-2 py-1 text-xs focus-visible:outline-none"
        />
      )}
      <div className="max-h-36 overflow-y-auto p-1">
        {items.length === 0 ? (
          <div className="p-2 text-xs text-muted-foreground">{emptyText}</div>
        ) : visible.length === 0 ? (
          <div className="p-2 text-xs text-muted-foreground">No matches</div>
        ) : (
          visible.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-1.5 rounded px-1.5 py-1 text-xs hover:bg-muted"
            >
              <input
                type="checkbox"
                checked={selected.includes(item.id)}
                onChange={() => onToggle(item.id)}
                className="h-3 w-3 shrink-0"
              />
              <span className="shrink-0 font-mono">{item.id}</span>
              {item.description && (
                <span className="truncate text-muted-foreground">{item.description}</span>
              )}
            </label>
          ))
        )}
      </div>
    </div>
  );
}

/** Create form: provider (catalogued or free-form) → events → workflows → auth → id. */
function WebhookCreateForm({
  providers,
  workflows,
  saving,
  error,
  onCreate,
  onCancel,
}: {
  providers: ProviderWebhookIntel[];
  workflows: WorkflowSummary[];
  saving: boolean;
  error: string | null;
  onCreate: (args: Record<string, unknown>, intel: ProviderWebhookIntel | undefined) => void;
  onCancel: () => void;
}) {
  const [providerSelect, setProviderSelect] = useState(providers[0]?.provider ?? CUSTOM_PROVIDER);
  const [customProvider, setCustomProvider] = useState("");
  const [id, setId] = useState(() => (providers[0] ? `${slugify(providers[0].provider)}-webhook` : ""));
  const [idTouched, setIdTouched] = useState(false);
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState<string[]>([]);
  const [customEvents, setCustomEvents] = useState("");
  const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);
  const [authMode, setAuthMode] = useState<"token" | "hmac">("token");
  const [sigHeader, setSigHeader] = useState("");
  const [sigScheme, setSigScheme] = useState<"hmac-sha256" | "hmac-sha1">("hmac-sha256");
  const [sigSecret, setSigSecret] = useState("");
  const [sigTouched, setSigTouched] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const provider = providerSelect === CUSTOM_PROVIDER ? customProvider.trim() : providerSelect;
  const intel = providers.find((p) => p.provider === provider);

  const applyProvider = (next: string) => {
    setProviderSelect(next);
    setEvents([]);
    const nextIntel = providers.find((p) => p.provider === next);
    if (!idTouched) {
      const base = next === CUSTOM_PROVIDER ? customProvider.trim() : next;
      if (base) setId(`${slugify(base)}-webhook`);
    }
    if (!sigTouched) {
      if (nextIntel?.signature) {
        setAuthMode("hmac");
        setSigHeader(nextIntel.signature.header);
        setSigScheme(nextIntel.signature.scheme);
      } else {
        setAuthMode("token");
        setSigHeader("");
      }
    }
  };

  const handleSubmit = () => {
    setLocalError(null);
    if (!provider) {
      setLocalError("Choose a provider, or enter a custom one.");
      return;
    }
    if (!id.trim()) {
      setLocalError("A webhook name is required.");
      return;
    }
    if (selectedWorkflows.length === 0) {
      setLocalError("Select at least one workflow to trigger.");
      return;
    }
    const eventList = intel
      ? events
      : customEvents.split(",").map((e) => e.trim()).filter(Boolean);
    let signature: Record<string, unknown> | undefined;
    if (authMode === "hmac") {
      if (!sigHeader.trim() || !sigSecret.trim()) {
        setLocalError("Signature header and secret are both required for HMAC auth.");
        return;
      }
      signature = { header: sigHeader.trim(), scheme: sigScheme, secret: sigSecret.trim() };
    }
    onCreate(
      {
        id: id.trim(),
        provider,
        description: description.trim() || undefined,
        events: eventList,
        workflows: selectedWorkflows,
        signature,
      },
      intel,
    );
  };

  return (
    <div className="space-y-3 rounded-md border bg-card p-3">
      <div className="text-sm font-semibold">New webhook</div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <div className={fieldLabel}>Provider</div>
          <select
            value={providerSelect}
            onChange={(e) => applyProvider(e.target.value)}
            className="h-8 w-full rounded-md border bg-background px-2 font-mono text-xs"
          >
            {providers.map((p) => (
              <option key={p.provider} value={p.provider}>
                {p.provider}
              </option>
            ))}
            <option value={CUSTOM_PROVIDER}>custom…</option>
          </select>
        </label>
        {providerSelect === CUSTOM_PROVIDER && (
          <label className="space-y-1">
            <div className={fieldLabel}>Custom provider id</div>
            <Input
              value={customProvider}
              onChange={(e) => {
                setCustomProvider(e.target.value);
                if (!idTouched && e.target.value.trim()) {
                  setId(`${slugify(e.target.value.trim())}-webhook`);
                }
              }}
              placeholder="acme"
              className="h-8 font-mono text-xs"
            />
          </label>
        )}
        <label className="space-y-1">
          <div className={fieldLabel}>Name</div>
          <Input
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setIdTouched(true);
            }}
            placeholder="github-pushes"
            className="h-8 font-mono text-xs"
          />
        </label>
        <label className="space-y-1">
          <div className={fieldLabel}>Description (optional)</div>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What this webhook starts"
            className="h-8 text-xs"
          />
        </label>
      </div>

      {intel?.summary && <p className="text-xs text-muted-foreground">{intel.summary}</p>}

      <div className="space-y-1">
        <div className={fieldLabel}>Events {intel ? "(optional — empty matches all)" : ""}</div>
        {intel ? (
          <MultiSelectList
            items={intel.events}
            selected={events}
            onToggle={(eventId) =>
              setEvents((current) =>
                current.includes(eventId) ? current.filter((e) => e !== eventId) : [...current, eventId],
              )
            }
            emptyText="No documented events for this provider. Leave empty to match all."
          />
        ) : (
          <Input
            value={customEvents}
            onChange={(e) => setCustomEvents(e.target.value)}
            placeholder="push, pull_request (comma-separated, optional)"
            className="h-8 font-mono text-xs"
          />
        )}
      </div>

      <div className="space-y-1">
        <div className={fieldLabel}>Workflows to trigger</div>
        <MultiSelectList
          items={workflows.map((w) => ({ id: w.name, description: w.description }))}
          selected={selectedWorkflows}
          onToggle={(name) =>
            setSelectedWorkflows((current) =>
              current.includes(name) ? current.filter((w) => w !== name) : [...current, name],
            )
          }
          emptyText="No workflows yet. Create one first, then come back."
        />
      </div>

      <div className="space-y-2 rounded-md border bg-background p-2">
        <div className="flex items-center gap-3 text-xs">
          <span className={fieldLabel}>Auth</span>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={authMode === "token"}
              onChange={() => {
                setAuthMode("token");
                setSigTouched(true);
              }}
            />
            Token only
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={authMode === "hmac"}
              onChange={() => {
                setAuthMode("hmac");
                setSigTouched(true);
              }}
            />
            HMAC signature
          </label>
        </div>
        {authMode === "hmac" && (
          <div className="grid gap-2 sm:grid-cols-3">
            <label className="space-y-1">
              <div className={fieldLabel}>Header</div>
              <Input
                value={sigHeader}
                onChange={(e) => {
                  setSigHeader(e.target.value);
                  setSigTouched(true);
                }}
                placeholder="X-Hub-Signature-256"
                className="h-8 font-mono text-xs"
              />
            </label>
            <label className="space-y-1">
              <div className={fieldLabel}>Scheme</div>
              <select
                value={sigScheme}
                onChange={(e) => {
                  setSigScheme(e.target.value as "hmac-sha256" | "hmac-sha1");
                  setSigTouched(true);
                }}
                className="h-8 w-full rounded-md border bg-background px-2 font-mono text-xs"
              >
                <option value="hmac-sha256">hmac-sha256</option>
                <option value="hmac-sha1">hmac-sha1</option>
              </select>
            </label>
            <label className="space-y-1">
              <div className={fieldLabel}>Secret</div>
              <Input
                type="password"
                value={sigSecret}
                onChange={(e) => setSigSecret(e.target.value)}
                placeholder="shared secret"
                className="h-8 font-mono text-xs"
              />
            </label>
          </div>
        )}
      </div>

      {(localError ?? error) && <div className="text-xs text-destructive">{localError ?? error}</div>}
      <div className="flex gap-2">
        <Button size="sm" className="h-8" onClick={handleSubmit} disabled={saving}>
          {saving ? "Registering…" : "Register webhook"}
        </Button>
        <Button size="sm" variant="ghost" className="h-8" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

/** Just-registered summary: inbound URL/token plus the provider's setup checklist. */
function WebhookSuccessCard({
  registration,
  intel,
  onDismiss,
}: {
  registration: WebhookRegistration;
  intel: ProviderWebhookIntel | undefined;
  onDismiss: () => void;
}) {
  const url = `${GATEWAY_BASE}${registration.hookPath}`;
  return (
    <div className="space-y-2 rounded-md border border-emerald-500/40 bg-emerald-500/5 p-3 text-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold">
          <span className="font-mono">{registration.id}</span> registered
        </span>
        <Button size="sm" variant="ghost" className="h-6 shrink-0 px-2 text-xs" onClick={onDismiss}>
          Dismiss
        </Button>
      </div>
      <div className="flex items-center gap-1.5">
        <code className="min-w-0 truncate font-mono text-xs text-muted-foreground" title={url}>
          {url}
        </code>
        <CopyButton text={url} title="Copy URL" />
      </div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span>token: ••••</span>
        <CopyButton
          text={`${url}?token=${registration.token}`}
          label="Copy with token"
          title="Copy URL with token appended"
          icon={KeyRound}
        />
      </div>
      {intel && intel.setupSteps.length > 0 && (
        <div className="space-y-1 border-t pt-2">
          <div className="text-xs font-medium">Finish setup in {intel.provider}</div>
          <ol className="list-decimal space-y-1 pl-4 text-xs text-muted-foreground">
            {intel.setupSteps.map((step) => (
              <li key={step.title}>
                <span className="text-foreground">{step.title}.</span> {step.detail}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
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
      .catch(() =>
        setActionError("Couldn't remove this webhook. Retry, or check your connection."),
      )
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
          label="Copy with token"
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
          <span>Triggers</span>
          {hook.workflows.map((workflow) => (
            <Chip key={workflow}>{workflow}</Chip>
          ))}
        </div>
      )}

      <div className="mt-2 text-xs text-muted-foreground">
        {hook.deliveryCount} {hook.deliveryCount === 1 ? "delivery" : "deliveries"}
        {hook.lastDeliveryAt && ` · last ${relativeTime(hook.lastDeliveryAt)}`}
        {hook.lastEvent && ` · ${hook.lastEvent}`}
      </div>
      {hook.lastError && <div className="mt-1 text-xs text-destructive">{hook.lastError}</div>}
      {actionError && <div className="mt-1 text-xs text-destructive">{actionError}</div>}

      <div className="mt-2 flex items-center gap-2 border-t pt-2">
        {!removing && (
          <ArmedButton label="Remove" armedLabel="Confirm remove?" onConfirm={remove} />
        )}
        <span className="text-[11px] text-muted-foreground">
          Also remove it from the provider.
        </span>
      </div>
    </div>
  );
}

export function WebhooksPanel({ scope: _scope }: NativePanelProps) {
  const { data, error, loading, refresh } = usePanelData(async () => {
    const [webhooksRes, providersRes, workflowsRes] = await Promise.all([
      invokeWebhooks("list", {}) as Promise<{ webhooks: WebhookRegistration[] }>,
      (invokeWebhooks("providers", {}) as Promise<{ providers: ProviderWebhookIntel[] }>).catch(
        () => ({ providers: [] }),
      ),
      (invokeWorkflows("list", {}) as Promise<{ workflows: WorkflowSummary[] }>).catch(() => ({
        workflows: [],
      })),
    ]);
    return {
      webhooks: webhooksRes.webhooks ?? [],
      providers: providersRes.providers ?? [],
      workflows: workflowsRes.workflows ?? [],
    };
  });
  const webhooks = data?.webhooks ?? [];
  const providers = useMemo(() => data?.providers ?? [], [data?.providers]);
  const workflows = data?.workflows ?? [];

  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [justCreated, setJustCreated] = useState<{
    registration: WebhookRegistration;
    intel: ProviderWebhookIntel | undefined;
  } | null>(null);

  const handleCreate = (args: Record<string, unknown>, intel: ProviderWebhookIntel | undefined) => {
    setSaving(true);
    setCreateError(null);
    invokeWebhooks("register", args)
      .then((result) => {
        setJustCreated({ registration: result as WebhookRegistration, intel });
        setCreating(false);
        refresh();
      })
      .catch(() =>
        setCreateError("Couldn't register this webhook. Retry, or check your connection."),
      )
      .finally(() => setSaving(false));
  };

  return (
    <PanelShell
      icon={Webhook}
      title="Webhooks"
      description="Receive events from outside services and start workflows from them"
      onRefresh={refresh}
      refreshing={loading}
    >
      {error ? (
        <PanelErrorWithRetry
          message="Couldn't load webhooks. Retry, or check your connection."
          onRetry={refresh}
          retrying={loading}
        />
      ) : loading && !data ? (
        <PanelLoading label="Loading webhooks…" />
      ) : (
        <div className="flex flex-col gap-2 p-3">
          {justCreated && (
            <WebhookSuccessCard
              registration={justCreated.registration}
              intel={justCreated.intel}
              onDismiss={() => setJustCreated(null)}
            />
          )}
          {!creating && (
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-fit"
              onClick={() => {
                setCreateError(null);
                setCreating(true);
              }}
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              New webhook
            </Button>
          )}
          {creating && (
            <WebhookCreateForm
              providers={providers}
              workflows={workflows}
              saving={saving}
              error={createError}
              onCreate={handleCreate}
              onCancel={() => setCreating(false)}
            />
          )}
          {webhooks.length === 0 && !creating ? (
            <PanelEmpty>
              Inbound URLs that start workflows appear here. Create one to get a URL to paste at
              the provider.
            </PanelEmpty>
          ) : (
            webhooks.map((hook) => <WebhookCard key={hook.id} hook={hook} onRemoved={refresh} />)
          )}
        </div>
      )}
    </PanelShell>
  );
}
