/**
 * InterfacesPanel — native surface over the gateway `interfaces` namespace.
 *
 * An interface is one tool contract (`sql.query`, `llm.createChatCompletion`)
 * with several implementations; a *binding* picks which one, and a named
 * profile lets a workspace have more than one at a time — `sql` for
 * production, `sql:analytics` for the warehouse, each with its own
 * credential. That is the whole model, and until now it had no UI at all:
 * `interfaces.bind` was reachable only as a chat tool call, so "swap this
 * workspace's SQL backend" was something you had to know to ask for.
 *
 * The panel is one list over one call (`interfaces.list`): each interface as
 * a card — what it is for, which provider answers today, which providers
 * exist (connected, built-in, or declared-but-not-ready) — with its named
 * profiles nested beneath. Editing is inline: pick a provider, pick a
 * credential when the workspace holds more than one for it, set the options
 * that ride the binding (model/tier for llm, host/database for sql,
 * image/region for sandbox, API root for vcs).
 */

import { Loader2, Plug, Plus } from "lucide-react";
import { useRef, useState } from "react";
import {
  PanelEmpty,
  PanelError,
  PanelLoading,
  PanelShell,
  type NativePanelProps,
  usePanelData,
  usePanelHostActions,
} from "./shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { invokeNamespaceTool } from "@/lib/tools";

interface InterfaceCompat {
  provider: string;
  label: string;
  defaults: Record<string, unknown>;
  connected: boolean;
  /** Needs no credential (in-process implementation); shown as "built-in". */
  credentialless?: boolean;
  /** Declared but not executable yet — the human-readable reason. */
  unavailable?: string;
}

interface InterfaceDef {
  id: string;
  label: string;
  description: string;
  binding: { provider: string; credentialId?: string; options?: Record<string, unknown> } | null;
  compat: InterfaceCompat[];
}

interface InterfaceInstance {
  namespace: string;
  interface: string;
  name: string | null;
  provider: string;
  credentialId: string | null;
  options: Record<string, unknown>;
  connected: boolean;
}

interface CredentialSummary {
  id: string;
  provider: string;
  label: string | null;
}

interface InterfacesListing {
  interfaces: InterfaceDef[];
  instances: InterfaceInstance[];
  credentials: CredentialSummary[];
}

const invokeInterfaces = invokeNamespaceTool("interfaces");

interface OptionField {
  key: string;
  placeholder: string;
  /** Render as a select over these values instead of free text. */
  choices?: string[];
  /** Store as a number when the value parses as one. */
  numeric?: boolean;
}

/** Options worth offering per interface — the ones the binding actually folds
 *  into call arguments. All optional and free-form; anything else rides the
 *  binding via chat. `agent` has none: its policy lives in the agents service. */
const OPTION_FIELDS: Record<string, OptionField[]> = {
  llm: [
    { key: "model", placeholder: "model (e.g. claude-sonnet-5)" },
    { key: "tier", placeholder: "tier", choices: ["fast", "balanced", "deep"] },
    { key: "costPerMTokUsd", placeholder: "cost per M tokens (USD)", numeric: true },
  ],
  sql: [
    { key: "host", placeholder: "host" },
    { key: "database", placeholder: "database" },
    { key: "account", placeholder: "account" },
    { key: "warehouse_id", placeholder: "warehouse id" },
  ],
  sandbox: [
    { key: "image", placeholder: "default image" },
    { key: "region", placeholder: "region" },
    { key: "baseUrl", placeholder: "API root (self-hosted)" },
  ],
  vcs: [{ key: "baseUrl", placeholder: "API root (e.g. GitHub Enterprise)" }],
};

function optionText(options: Record<string, unknown> | undefined, key: string): string {
  const value = options?.[key];
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

/** Mirror of the gateway's zero-config fallback: a built-in implementation
 *  wins ahead of any connected vendor, in catalog order. */
function fallbackCompat(compat: InterfaceCompat[]): InterfaceCompat | undefined {
  return compat.find((entry) => entry.credentialless) ?? compat.find((entry) => entry.connected);
}

/** Read-only availability chip: connected, built-in, waiting on a credential,
 *  or declared-but-not-ready (dimmed, reason in the tooltip — these document
 *  what's coming and must not be hidden). */
function CompatChip({ entry }: { entry: InterfaceCompat }) {
  if (entry.unavailable) {
    return (
      <span
        title={entry.unavailable}
        className="flex cursor-not-allowed items-center rounded-full border border-dashed px-2 py-0.5 text-[11px] text-muted-foreground opacity-60"
      >
        {entry.label}
      </span>
    );
  }
  if (entry.credentialless) {
    return (
      <span
        title={`${entry.label} — built in, needs no credential`}
        className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground"
      >
        {entry.label}
        <span className="rounded-full bg-muted px-1 text-[9px] uppercase tracking-wide">
          built-in
        </span>
      </span>
    );
  }
  return (
    <span
      title={
        entry.connected
          ? `${entry.label} — credential connected`
          : `${entry.label} — no credential in this workspace yet`
      }
      className="flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground"
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${entry.connected ? "bg-emerald-500" : "bg-amber-500"}`}
      />
      {entry.label}
    </span>
  );
}

/**
 * The editor body shared by a default binding and a named profile: provider
 * choice, credential choice, options. `onSave` carries whatever `as` the
 * caller is editing, so this component never has to know which it is.
 */
function BindingForm({
  interfaceId,
  compat,
  credentials,
  provider,
  credentialId,
  options,
  onSave,
  onCancel,
  saving,
}: {
  interfaceId: string;
  compat: InterfaceCompat[];
  credentials: CredentialSummary[];
  provider: string;
  credentialId: string | null;
  options: Record<string, unknown>;
  onSave: (next: {
    provider: string;
    credential?: string;
    options: Record<string, unknown>;
  }) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const fields = OPTION_FIELDS[interfaceId] ?? [];
  const { onOpenCredentials } = usePanelHostActions();
  const [nextProvider, setNextProvider] = useState(provider);
  const [nextCredential, setNextCredential] = useState(credentialId ?? "");
  const [nextOptions, setNextOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((field) => [field.key, optionText(options, field.key)])),
  );

  // Only offer a credential picker when there is a choice to make: one
  // credential is the default anyway, and zero means the real next step is
  // adding one, not picking one.
  const providerCredentials = credentials.filter((entry) => entry.provider === nextProvider);
  const selected = compat.find((entry) => entry.provider === nextProvider);

  return (
    <div className="mt-2 space-y-2 border-t pt-2">
      <div className="flex flex-wrap gap-1.5">
        {compat.map((entry) => (
          <button
            key={entry.provider}
            type="button"
            disabled={Boolean(entry.unavailable)}
            onClick={() => {
              setNextProvider(entry.provider);
              setNextCredential("");
            }}
            title={
              entry.unavailable ??
              (entry.credentialless
                ? `${entry.label} — built in, needs no credential`
                : entry.connected
                  ? entry.label
                  : `${entry.label} — no credential in this workspace yet`)
            }
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
              entry.unavailable
                ? "cursor-not-allowed border-dashed text-muted-foreground opacity-60"
                : entry.provider === nextProvider
                  ? "border-primary bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/60"
            }`}
          >
            {entry.credentialless ? (
              <span className="rounded-full bg-muted px-1 text-[9px] uppercase tracking-wide">
                built-in
              </span>
            ) : (
              !entry.unavailable && (
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    entry.connected ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
              )
            )}
            {entry.label}
          </button>
        ))}
      </div>

      {selected && !selected.connected && !selected.credentialless && (
        <p className="text-xs text-muted-foreground">
          {selected.label} has no credential in this workspace — binding will
          resolve but calls will fail until you{" "}
          {onOpenCredentials ? (
            <button
              type="button"
              onClick={() => onOpenCredentials(selected.provider)}
              className="underline hover:text-foreground"
            >
              add one
            </button>
          ) : (
            <span className="font-medium">add a credential</span>
          )}
          .
        </p>
      )}

      {providerCredentials.length > 1 && (
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="shrink-0">Account</span>
          <select
            value={nextCredential}
            onChange={(event) => setNextCredential(event.target.value)}
            className="h-7 flex-1 rounded border bg-background px-1.5 text-xs"
          >
            <option value="">First available</option>
            {providerCredentials.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.label ?? entry.id}
              </option>
            ))}
          </select>
        </label>
      )}

      {fields.map((field) =>
        field.choices ? (
          <label
            key={field.key}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <span className="shrink-0">{field.key}</span>
            <select
              value={nextOptions[field.key] ?? ""}
              onChange={(event) =>
                setNextOptions((prev) => ({ ...prev, [field.key]: event.target.value }))
              }
              className="h-7 flex-1 rounded border bg-background px-1.5 text-xs"
            >
              <option value="">(unset)</option>
              {field.choices.map((choice) => (
                <option key={choice} value={choice}>
                  {choice}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <Input
            key={field.key}
            value={nextOptions[field.key] ?? ""}
            onChange={(event) =>
              setNextOptions((prev) => ({ ...prev, [field.key]: event.target.value }))
            }
            placeholder={field.placeholder}
            className="h-7 text-xs"
          />
        ),
      )}

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          className="h-7 px-2 text-xs"
          disabled={saving || !nextProvider}
          onClick={() =>
            onSave({
              provider: nextProvider,
              ...(nextCredential ? { credential: nextCredential } : {}),
              options: Object.fromEntries(
                Object.entries(nextOptions)
                  .filter(([, value]) => value.trim())
                  .map(([key, value]) => {
                    const trimmed = value.trim();
                    const numeric = fields.find((field) => field.key === key)?.numeric;
                    return [
                      key,
                      numeric && trimmed !== "" && !Number.isNaN(Number(trimmed))
                        ? Number(trimmed)
                        : trimmed,
                    ];
                  }),
              ),
            })
          }
        >
          {saving && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
          Save
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs"
          disabled={saving}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

/** Two-click destructive confirm: first click arms for 3s. */
function ConfirmButton({
  label,
  onConfirm,
  disabled,
}: {
  label: string;
  onConfirm: () => void;
  disabled?: boolean;
}) {
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
      {arming ? "Confirm?" : label}
    </Button>
  );
}

function summarize(options: Record<string, unknown> | undefined): string {
  const entries = Object.entries(options ?? {}).filter(
    ([, value]) => (typeof value === "string" && value) || typeof value === "number",
  );
  return entries.map(([key, value]) => `${key}=${String(value)}`).join(" · ");
}

function InterfaceCard({
  def,
  credentials,
  onChanged,
}: {
  def: InterfaceDef;
  credentials: CredentialSummary[];
  onChanged: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [instanceName, setInstanceName] = useState("");
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // No binding is not "broken" — the gateway falls back to a built-in
  // implementation or the first connected one. Say which, so an unbound row
  // reads as a default rather than a gap.
  const fallback = fallbackCompat(def.compat);
  const active = def.binding
    ? def.compat.find((entry) => entry.provider === def.binding?.provider)
    : fallback;
  const activeLabel = active?.label ?? def.binding?.provider;
  const pinned = credentials.find((entry) => entry.id === def.binding?.credentialId);

  const run = (operation: string, args: Record<string, unknown>) => {
    setBusy(true);
    setActionError(null);
    invokeInterfaces(operation, args)
      .then(() => {
        setEditing(false);
        setAdding(false);
        setInstanceName("");
        onChanged();
      })
      .catch((err) => setActionError(err instanceof Error ? err.message : String(err)))
      .finally(() => setBusy(false));
  };

  return (
    <div className="rounded-md border bg-card p-3 text-sm">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="font-semibold">{def.label}</span>
        <code className="font-mono text-xs text-muted-foreground">{def.id}</code>
        {activeLabel ? (
          <Badge
            variant="outline"
            className={`px-1.5 py-0 text-[10px] ${active?.unavailable ? "text-amber-600" : ""}`}
            title={
              active?.unavailable ??
              (def.binding ? undefined : "No binding — the first available provider answers")
            }
          >
            → {activeLabel}
            {!def.binding && <span className="opacity-60"> (auto)</span>}
            {active?.unavailable && <span className="opacity-80"> — not ready</span>}
          </Badge>
        ) : (
          <Badge variant="outline" className="px-1.5 py-0 text-[10px] text-amber-600">
            no provider connected
          </Badge>
        )}
        {pinned && (
          <span
            className="text-[11px] text-muted-foreground"
            title="This binding is pinned to one account"
          >
            {pinned.label ?? pinned.id}
          </span>
        )}
      </div>
      {def.binding?.options && summarize(def.binding.options) && (
        <p className="mt-1 font-mono text-[11px] text-muted-foreground">
          {summarize(def.binding.options)}
        </p>
      )}
      {actionError && <div className="mt-1 text-xs text-destructive">{actionError}</div>}

      {editing ? (
        <BindingForm
          interfaceId={def.id}
          compat={def.compat}
          credentials={credentials}
          provider={def.binding?.provider ?? active?.provider ?? def.compat[0]?.provider ?? ""}
          credentialId={def.binding?.credentialId ?? null}
          options={def.binding?.options ?? {}}
          saving={busy}
          onCancel={() => setEditing(false)}
          onSave={(next) => run("bind", { interface: def.id, ...next })}
        />
      ) : adding ? (
        <div className="mt-2 space-y-2 border-t pt-2">
          <Input
            value={instanceName}
            onChange={(event) => setInstanceName(event.target.value)}
            placeholder="profile name (e.g. analytics)"
            className="h-7 text-xs"
          />
          {instanceName.trim() && (
            <p className="font-mono text-[11px] text-muted-foreground">
              → {def.id}:{instanceName.trim()}
            </p>
          )}
          <BindingForm
            interfaceId={def.id}
            compat={def.compat}
            credentials={credentials}
            provider={def.compat.find((entry) => !entry.unavailable)?.provider ?? ""}
            credentialId={null}
            options={{}}
            saving={busy}
            onCancel={() => {
              setAdding(false);
              setInstanceName("");
            }}
            onSave={(next) =>
              instanceName.trim()
                ? run("bind", { interface: def.id, as: instanceName.trim(), ...next })
                : setActionError("Name the profile first")
            }
          />
        </div>
      ) : (
        <>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {def.compat.map((entry) => (
              <CompatChip key={entry.provider} entry={entry} />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 border-t pt-2">
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setEditing(true)}
            >
              {def.binding ? "Change binding" : "Bind"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 px-2 text-xs"
              onClick={() => setAdding(true)}
            >
              <Plus className="h-3 w-3" />
              Add profile
            </Button>
            {def.binding && (
              <ConfirmButton
                label="Unbind"
                disabled={busy}
                onConfirm={() => run("unbind", { interface: def.id })}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

function InstanceRow({
  instance,
  def,
  credentials,
  onChanged,
}: {
  instance: InterfaceInstance;
  def: InterfaceDef | undefined;
  credentials: CredentialSummary[];
  onChanged: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const credential = credentials.find((entry) => entry.id === instance.credentialId);
  const compat = def?.compat.find((entry) => entry.provider === instance.provider);

  const run = (operation: string, args: Record<string, unknown>) => {
    setBusy(true);
    setActionError(null);
    invokeInterfaces(operation, args)
      .then(() => {
        setEditing(false);
        onChanged();
      })
      .catch((err) => setActionError(err instanceof Error ? err.message : String(err)))
      .finally(() => setBusy(false));
  };

  return (
    <div className="rounded-md border bg-card p-3 text-sm">
      <div className="flex flex-wrap items-center gap-1.5">
        <code className="font-mono font-semibold">{instance.namespace}</code>
        <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
          → {compat?.label ?? instance.provider}
        </Badge>
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            instance.connected || compat?.credentialless ? "bg-emerald-500" : "bg-amber-500"
          }`}
          title={
            compat?.credentialless
              ? "built in — needs no credential"
              : instance.connected
                ? "credential present"
                : "no credential for this provider"
          }
        />
        {credential && (
          <span
            className="text-[11px] text-muted-foreground"
            title="This profile is pinned to one account"
          >
            {credential.label ?? credential.id}
          </span>
        )}
      </div>
      {summarize(instance.options) && (
        <p className="mt-1 font-mono text-[11px] text-muted-foreground">
          {summarize(instance.options)}
        </p>
      )}
      {actionError && <div className="mt-1 text-xs text-destructive">{actionError}</div>}

      {editing && def ? (
        <BindingForm
          interfaceId={instance.interface}
          compat={def.compat}
          credentials={credentials}
          provider={instance.provider}
          credentialId={instance.credentialId}
          options={instance.options}
          saving={busy}
          onCancel={() => setEditing(false)}
          onSave={(next) =>
            run("bind", { interface: instance.interface, as: instance.name, ...next })
          }
        />
      ) : (
        <div className="mt-2 flex items-center gap-2 border-t pt-2">
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 text-xs"
            disabled={!def}
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>
          <ConfirmButton
            label="Remove"
            disabled={busy}
            onConfirm={() =>
              run("unbind", { interface: instance.interface, as: instance.name })
            }
          />
        </div>
      )}
    </div>
  );
}

export function InterfacesPanel({ scope: _scope }: NativePanelProps) {
  const { data, error, loading, refresh } = usePanelData(
    async () => (await invokeInterfaces("list", {})) as InterfacesListing,
  );
  const interfaces = data?.interfaces ?? [];
  const credentials = data?.credentials ?? [];
  // The default instances are already rendered inside their interface card;
  // these are the named profiles, which nest under their interface below.
  const named = (data?.instances ?? []).filter((instance) => instance.name);
  // A profile whose interface left the catalog still needs a row to remove it.
  const orphans = named.filter(
    (instance) => !interfaces.some((def) => def.id === instance.interface),
  );

  return (
    <PanelShell
      icon={Plug}
      title="Interfaces"
      description="Choose which service backs each built-in capability"
      onRefresh={refresh}
      refreshing={loading}
    >
      {error ? (
        <PanelError message={error} />
      ) : loading && !data ? (
        <PanelLoading />
      ) : interfaces.length === 0 ? (
        <PanelEmpty>No interfaces available from this gateway.</PanelEmpty>
      ) : (
        <div className="flex flex-col gap-3 p-3">
          {interfaces.map((def) => {
            const profiles = named.filter((instance) => instance.interface === def.id);
            return (
              <div key={def.id} className="flex flex-col gap-1.5">
                <InterfaceCard def={def} credentials={credentials} onChanged={refresh} />
                {profiles.length > 0 && (
                  <div className="ml-3 flex flex-col gap-1.5">
                    {profiles.map((instance) => (
                      <InstanceRow
                        key={instance.namespace}
                        instance={instance}
                        def={def}
                        credentials={credentials}
                        onChanged={refresh}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {orphans.map((instance) => (
            <InstanceRow
              key={instance.namespace}
              instance={instance}
              def={undefined}
              credentials={credentials}
              onChanged={refresh}
            />
          ))}
        </div>
      )}
    </PanelShell>
  );
}
