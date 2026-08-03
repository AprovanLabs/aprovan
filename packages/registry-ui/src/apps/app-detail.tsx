/**
 * AppDetail — the right-hand pane for one app, in five tabs.
 *
 *  - **Overview**  what it is and where it lives: live URL, entry, published
 *    prefixes, description, and the link that opens the real thing.
 *  - **Workflows** the app's *export list* — the WASI-world analogue. Each row
 *    carries its trigger badges, its last run, and an inline run.
 *  - **Access**    who may open it, what it may touch, and — the question the
 *    spec insists both UIs answer verbatim — *where an app user's data
 *    physically lives*, rendered from the "three ways data is reached" model.
 *  - **Releases**  the channel pins (live / preview / custom), the release
 *    history, and promote / rollback.
 *  - **Versions**  the workspace FS content-version log for the app's entry.
 *
 * Every section degrades on its own: a gateway without `apps.capabilities`
 * falls back to the model derived from the manifest, and one without
 * `apps.channels` simply hides the Releases controls instead of erroring.
 */

import * as React from "react";
import {
  BADGE,
  ConfirmButton,
  ConfirmDeleteButton,
  CopyChip,
  CreateWorkflowEmpty,
  DataScopeBadge,
  DatabaseIcon,
  Empty,
  ErrorLine,
  FIELD,
  FieldRow,
  LABEL,
  ReleaseChip,
  SMALL_BUTTON,
  SectionHeading,
  Segmented,
  StatusDot,
  Tabs,
  TagsInput,
  TriggerBadges,
  UserChip,
  VisibilityBadge,
  formatWhen,
  useLoader,
} from "./ui";
import { useLastRun, useRecordRun } from "./last-runs";
import { VersionsSection } from "./versions";
import {
  asRecord,
  asString,
  attempt,
  classifyToolEntry,
  deriveCapabilities,
  mergeCapabilities,
  normalizeChannels,
  normalizeReleases,
  normalizeRunTrace,
  unwrapList,
  NATIVE_APP_NAMESPACES,
  type AppChannel,
  type AppDependencyStatus,
  type AppRelease,
  type AppSummary,
  type CapabilityModel,
  type InstallSummary,
  type ToolEntryInfo,
  type ToolEntryTier,
  type ToolsInvoke,
  type WorkflowSummary,
} from "./wire";

export type AppDetailTab =
  | "overview"
  | "workflows"
  | "access"
  | "releases"
  | "versions"
  | "install";

const OWNER_TABS: ReadonlyArray<{ id: AppDetailTab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "workflows", label: "Workflows" },
  { id: "access", label: "Access" },
  { id: "releases", label: "Releases" },
  { id: "versions", label: "Versions" },
];

const INSTALL_TABS: ReadonlyArray<{ id: AppDetailTab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "access", label: "Access" },
  { id: "install", label: "Install settings" },
];

// ---------------------------------------------------------------------------
// Overview
// ---------------------------------------------------------------------------

function Overview({
  app,
  install,
}: {
  app: AppSummary;
  install?: InstallSummary | undefined;
}) {
  const permalink = install?.permalink ?? app.permalink ?? (app.appId ? `/apps/id/${app.appId}` : undefined);
  const lineage = install
    ? `installed from ${install.originWorkspaceId ? `${install.originWorkspaceId}/` : ""}${install.name ?? install.originAppId}`
    : app.originAppId
      ? `forked from ${app.originAppId}`
      : null;

  return (
    <div className="space-y-2.5">
      {app.description && <p className="text-xs text-muted-foreground">{app.description}</p>}
      {(app.appId || install?.installId) && (
        <FieldRow label={install ? "Install id" : "App id"}>
          <span className="flex flex-wrap items-center gap-1.5">
            <code className="break-all font-mono text-[0.7rem]">
              {install?.installId ?? app.appId}
            </code>
            {(install?.installId ?? app.appId) && (
              <CopyChip text={(install?.installId ?? app.appId) as string} />
            )}
          </span>
        </FieldRow>
      )}
      {permalink && (
        <FieldRow label="Stable link">
          <span className="flex flex-wrap items-center gap-1.5">
            <code className="break-all font-mono text-[0.7rem]">{permalink}</code>
            <CopyChip text={permalink} />
          </span>
        </FieldRow>
      )}
      {lineage && (
        <FieldRow label="Lineage">
          <span className="text-xs text-muted-foreground">{lineage}</span>
        </FieldRow>
      )}
      <FieldRow label="Live page">
        {app.liveUrl || install?.liveUrl ? (
          <span className="flex flex-wrap items-center gap-1.5">
            <a
              className="break-all font-mono underline-offset-2 hover:underline"
              href={(app.liveUrl ?? install?.liveUrl) as string}
              rel="noreferrer"
              target="_blank"
            >
              {app.liveUrl ?? install?.liveUrl}
            </a>
            <CopyChip text={(app.liveUrl ?? install?.liveUrl) as string} />
          </span>
        ) : (
          <span className="text-muted-foreground">not published yet</span>
        )}
      </FieldRow>
      <FieldRow label="Entry">
        {app.entry ? (
          <code className="break-all font-mono">{app.entry}</code>
        ) : (
          <span className="text-muted-foreground">unbound</span>
        )}
      </FieldRow>
      <FieldRow label="Published paths">
        {app.paths?.length ? (
          <span className="flex flex-wrap gap-1.5">
            {app.paths.map((path, index) => (
              <code
                className={`${BADGE} border-border font-mono text-muted-foreground`}
                key={path}
                title={index === 0 ? "Primary prefix — the app's root and data partition" : undefined}
              >
                {path}
                {index === 0 ? " · root" : ""}
              </code>
            ))}
          </span>
        ) : (
          <span className="text-muted-foreground">derived from the entry's folder</span>
        )}
      </FieldRow>
      <FieldRow label="API base">
        {app.appPath ? <code className="break-all font-mono">{app.appPath}</code> : "—"}
      </FieldRow>
      <FieldRow label="Updated">{app.updatedAt ? formatWhen(app.updatedAt) : "—"}</FieldRow>
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        {install?.available === false ? (
          <span className={`${BADGE} border-amber-300 text-amber-700 dark:border-amber-900 dark:text-amber-400`}>
            origin unavailable
          </span>
        ) : (
          <VisibilityBadge app={app} />
        )}
        <DataScopeBadge app={app} />
        {!install && <ReleaseChip app={app} />}
        {install && (
          <span className={`${BADGE} border-border font-mono text-muted-foreground`}>
            {"channel" in install.pin
              ? `channel · ${install.pin.channel}`
              : `release · ${install.pin.release.slice(0, 12)}`}
            {install.updateAvailable ? " · update available" : ""}
          </span>
        )}
      </div>
      {(app.liveUrl || install?.liveUrl) && (
        <a
          className="inline-flex items-center rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          href={(app.liveUrl ?? install?.liveUrl) as string}
          rel="noreferrer"
          target="_blank"
        >
          Open live app
        </a>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Workflows tab
// ---------------------------------------------------------------------------

function ExportedWorkflowRow({
  workflow,
  invoke,
  onSelect,
}: {
  workflow: WorkflowSummary;
  invoke: ToolsInvoke;
  onSelect: () => void;
}) {
  const lastRun = useLastRun(workflow.name);
  const record = useRecordRun();
  const [running, setRunning] = React.useState(false);
  const missing = !workflow.scriptPath;

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border px-2.5 py-1.5">
      <button className="flex min-w-0 flex-1 flex-col items-start gap-0.5" onClick={onSelect} type="button">
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="truncate text-xs font-medium">{workflow.name}</span>
          {missing && (
            <span className={`${BADGE} border-red-300 text-red-700 dark:border-red-900 dark:text-red-400`}>
              not registered
            </span>
          )}
        </span>
        {lastRun ? (
          <span className="flex items-center gap-1.5 text-[0.65rem] text-muted-foreground">
            <StatusDot status={lastRun.status} />
            last run {formatWhen(lastRun.startedAt)}
            {lastRun.durationMs !== undefined ? ` · ${lastRun.durationMs}ms` : ""}
          </span>
        ) : (
          <span className="text-[0.65rem] text-muted-foreground">no runs yet</span>
        )}
      </button>
      <TriggerBadges workflow={workflow} />
      <button
        className={`${SMALL_BUTTON} shrink-0 disabled:opacity-50`}
        disabled={running || missing}
        onClick={() => {
          setRunning(true);
          void attempt(() => invoke("run", { name: workflow.name })).then((result) => {
            setRunning(false);
            const run = result.ok ? normalizeRunTrace(result.value) : null;
            if (run) record(workflow.name, run);
          });
        }}
        type="button"
      >
        {running ? "Running…" : "Run"}
      </button>
    </div>
  );
}

function WorkflowsTab({
  app,
  workflows,
  invoke,
  onSelectWorkflow,
  onCreateWorkflow,
  createWorkflowHref,
}: {
  app: AppSummary;
  workflows: WorkflowSummary[];
  invoke: ToolsInvoke;
  onSelectWorkflow: (name: string) => void;
  onCreateWorkflow?: ((appName?: string) => void) | undefined;
  createWorkflowHref?: string | undefined;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        An app's workflow list is its export surface. Each one is callable as{" "}
        <code className="font-mono">
          {app.name}.&lt;workflow&gt;
        </code>{" "}
        from a widget, from another workflow, and from curl — the same dispatch path, the same
        trace.
      </p>
      {workflows.length === 0 ? (
        <CreateWorkflowEmpty
          appName={app.name}
          createWorkflowHref={createWorkflowHref}
          onCreateWorkflow={onCreateWorkflow}
        >
          This app exports no workflows yet.
        </CreateWorkflowEmpty>
      ) : (
        <div className="space-y-1.5">
          {workflows.map((workflow) => (
            <ExportedWorkflowRow
              invoke={invoke}
              key={workflow.name}
              onSelect={() => onSelectWorkflow(workflow.name)}
              workflow={workflow}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Access tab (v3) — one screen, three sections: Who, What, Limits.
// ---------------------------------------------------------------------------

/**
 * Where an app user's data physically lands, as a *path*. The truthfulness
 * rule: the gateway's `apps.capabilities` `partitioning.path` (carried on the
 * merged native reaches) wins; a gateway `dataLocation` that is itself a bare
 * path is next; only then the manifest-derived default.
 */
function dataLocationPath(model: CapabilityModel, app: AppSummary): string {
  const fromReach = model.native.find(
    (reach) => reach.id !== "events" && reach.location && !/\s/.test(reach.location),
  )?.location;
  if (fromReach) return fromReach;
  if (model.fromGateway && model.dataLocation && !/\s/.test(model.dataLocation)) {
    return model.dataLocation;
  }
  const root = app.paths?.[0] ?? (app.entry ? app.entry.replace(/\/[^/]*$/, "") : app.name);
  return model.dataScope === "workspace" ? "<install prefix>/data" : `${root}/data/<app user>`;
}

/** Icon + monospace path + a tone chip, on one line — the fuller explanation
 *  moves to the title tooltip instead of a permanent paragraph. */
function DataLocationCallout({ model, app }: { model: CapabilityModel; app: AppSummary }) {
  const explanation =
    model.dataScope === "workspace"
      ? "Self-hosted — data lives in each caller's own workspace; the publisher stores nothing and lends no credentials."
      : "Owner-hosted — one private partition per app user, stored in the publishing workspace.";
  const title = model.fromGateway
    ? explanation
    : `${explanation} Derived from the manifest — this gateway doesn't report capabilities yet.`;
  return (
    <div
      className="flex items-center gap-2 rounded-md border bg-muted/20 px-2.5 py-1.5"
      title={title}
    >
      <DatabaseIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      <code className="min-w-0 truncate font-mono text-[0.72rem] font-medium">
        {dataLocationPath(model, app)}
      </code>
      <span className="ml-auto shrink-0 text-[0.65rem] text-muted-foreground">
        {model.dataScope === "workspace" ? "self-hosted" : "owner-hosted"}
      </span>
    </div>
  );
}

/** The three-tier reach model, collapsed to one line + a disclosure for the
 *  full explanation — it used to be three cards of prose above the editor;
 *  now the editor's own tier tags carry that weight per-row. */
function TierExplainer() {
  return (
    <details className="group rounded-md border px-2.5 py-1.5">
      <summary className="cursor-pointer text-[0.7rem] text-muted-foreground marker:content-none">
        <span className="mr-1 inline-block transition-transform group-open:rotate-90">›</span>
        Three ways this app can reach data
      </summary>
      <div className="mt-1.5 space-y-1 text-[0.7rem] text-muted-foreground">
        <p>
          <strong className="font-medium text-foreground">Native</strong> — the auto-partitioned
          namespaces (<code className="font-mono">vfs</code>, <code className="font-mono">keyvalue</code>,{" "}
          <code className="font-mono">events</code>): no credential, no workspace membership,
          wildcards allowed.
        </p>
        <p>
          <strong className="font-medium text-foreground">This app</strong> — its own exported
          workflows, always reachable as <code className="font-mono">{"<app>.<workflow>"}</code>.
        </p>
        <p>
          <strong className="font-medium text-foreground">Provider grant</strong> — an explicit
          credential grant onto a provider namespace: exact procedures only, never a wildcard.
          Anything broader belongs in an exported workflow instead.
        </p>
      </div>
    </details>
  );
}

/** Small fixed-tone tag for a classified allow-list entry's tier. */
function TierTag({ tier }: { tier: ToolEntryTier | null }) {
  const label = tier === "provider" ? "provider grant" : (tier ?? "invalid");
  const tone =
    tier === null
      ? "border-red-300 text-red-700 dark:border-red-900 dark:text-red-400"
      : tier === "provider"
        ? "border-amber-300 text-amber-700 dark:border-amber-900 dark:text-amber-400"
        : "border-border text-muted-foreground";
  return <span className={`${BADGE} ${tone}`}>{label}</span>;
}

/** One allow-list entry: an icon by namespace initial, the entry itself,
 *  its tier tag, a credential-grant note where it applies, and a remover.
 *  Provider rows name the executing profile when the gateway reports one
 *  (`apps.capabilities` tier-2 `profile`); older gateways fall back to the
 *  bare workspace-credential string. */
function ToolEntryRow({
  info,
  executingProfile,
  onRemove,
}: {
  info: ToolEntryInfo;
  executingProfile?: string | undefined;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border px-2 py-1.5 text-xs">
      <span
        aria-hidden="true"
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-muted font-mono text-[0.62rem] font-semibold uppercase text-muted-foreground"
      >
        {info.namespace.slice(0, 1) || "?"}
      </span>
      <code className="min-w-0 flex-1 truncate font-mono">{info.entry}</code>
      <TierTag tier={info.tier} />
      {info.tier === "provider" && (
        <span
          className={`${BADGE} border-dashed text-muted-foreground`}
          title={
            executingProfile
              ? `Executes through profile "${executingProfile}" with this workspace's ${info.namespace} credential — never directly from an app session.`
              : `Executes with this workspace's ${info.namespace} credential — never directly from an app session.`
          }
        >
          {executingProfile
            ? `runs with profile ${executingProfile} (${info.namespace} credential)`
            : "uses workspace credential"}
        </span>
      )}
      {info.reason && (
        <span
          className="text-[0.65rem] text-red-600 dark:text-red-400"
          title={info.reason}
        >
          invalid
        </span>
      )}
      <button
        aria-label={`Remove ${info.entry}`}
        className="shrink-0 text-muted-foreground hover:text-foreground"
        onClick={onRemove}
        title="Remove"
        type="button"
      >
        ×
      </button>
    </div>
  );
}

type AddTier = "native" | "app" | "provider";

/**
 * The add-tool flow: pick a tier, then a namespace (a dropdown for native, a
 * fixed value for this app, a search box against `registry.providers` — or
 * `registry.search` on a gateway without it — for a provider), then a
 * procedure. A provider grant blocks on a wildcard with the same explanation
 * {@link classifyToolEntry} would give back after a round-trip, so the user
 * never has to fail once to learn the rule.
 */
function AddToolForm({
  app,
  invokeRegistry,
  onAdd,
}: {
  app: AppSummary;
  invokeRegistry?: ToolsInvoke | undefined;
  onAdd: (entry: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [tier, setTier] = React.useState<AddTier>("native");
  const [namespace, setNamespace] = React.useState<string>(NATIVE_APP_NAMESPACES[0]);
  const [procedure, setProcedure] = React.useState("*");
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [searching, setSearching] = React.useState(false);

  React.useEffect(() => {
    if (tier === "native") setNamespace(NATIVE_APP_NAMESPACES[0]);
    else if (tier === "app") setNamespace(app.name);
    else setNamespace("");
    setProcedure(tier === "provider" ? "" : "*");
    setSuggestions([]);
  }, [tier, app.name]);

  // Provider namespace search, debounced. `registry.providers` is the direct
  // hit — `{ providers: [{ id, title, description? }], total }`, paged. A
  // gateway without it still has `registry.search`, but that searches
  // *operations*, not providers (`{ operations: [{ providerPath,
  // providerTitle, sdkPath, ... }] }`), so the fallback dedupes `providerPath`
  // off the matched operations instead — a coarser list, but the same
  // namespaces either way.
  React.useEffect(() => {
    if (tier !== "provider" || !invokeRegistry || namespace.length < 2) {
      setSuggestions([]);
      return;
    }
    let alive = true;
    setSearching(true);
    const timeout = setTimeout(() => {
      void attempt(() => invokeRegistry("providers", { q: namespace, offset: 0, limit: 20 }))
        .then((direct) => {
          if (direct.ok) {
            const ids = unwrapList(direct.value, "providers")
              .map((entry) => asString(asRecord(entry)?.["id"]))
              .filter((id): id is string => Boolean(id));
            return [...new Set(ids)];
          }
          if (!direct.missing) return [];
          return attempt(() => invokeRegistry("search", { q: namespace })).then((fallback) => {
            if (!fallback.ok) return [];
            const ids = unwrapList(fallback.value, "operations")
              .map((entry) => asString(asRecord(entry)?.["providerPath"]))
              .filter((id): id is string => Boolean(id));
            return [...new Set(ids)];
          });
        })
        .then((ids) => {
          if (alive) setSuggestions(ids);
        })
        .finally(() => {
          if (alive) setSearching(false);
        });
    }, 250);
    return () => {
      alive = false;
      clearTimeout(timeout);
    };
  }, [tier, invokeRegistry, namespace]);

  const trimmedProcedure = procedure.trim();
  const wildcard = trimmedProcedure === "" || trimmedProcedure === "*";
  const blocked = tier === "provider" && wildcard;
  const canAdd = namespace.trim().length > 0 && !blocked;
  const entry = `${namespace.trim()}.${wildcard && tier !== "provider" ? "*" : trimmedProcedure}`;

  if (!open) {
    return (
      <button className={SMALL_BUTTON} onClick={() => setOpen(true)} type="button">
        + add tool
      </button>
    );
  }

  return (
    <div className="space-y-2 rounded-md border p-2">
      <Segmented
        ariaLabel="Tier"
        onChange={setTier}
        options={[
          { value: "native", label: "Native", hint: "vfs, keyvalue, events — auto-partitioned" },
          { value: "app", label: "This app", hint: `${app.name}'s own exported workflows` },
          { value: "provider", label: "Provider", hint: "A credential grant — exact procedure only" },
        ]}
        value={tier}
      />

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="space-y-1">
          <label className={LABEL}>Namespace</label>
          {tier === "native" ? (
            <select
              className={FIELD}
              onChange={(event) => setNamespace(event.target.value)}
              value={namespace}
            >
              {NATIVE_APP_NAMESPACES.map((ns) => (
                <option key={ns} value={ns}>
                  {ns}
                </option>
              ))}
            </select>
          ) : tier === "app" ? (
            <input className={`${FIELD} text-muted-foreground`} disabled value={namespace} />
          ) : (
            <div className="relative space-y-1">
              <input
                className={FIELD}
                onChange={(event) => setNamespace(event.target.value)}
                placeholder={invokeRegistry ? "Search providers…" : "Provider namespace, e.g. github"}
                spellCheck={false}
                value={namespace}
              />
              {invokeRegistry && namespace.length >= 2 && (
                <div className="max-h-32 overflow-y-auto rounded-md border bg-background">
                  {searching ? (
                    <p className="px-2 py-1 text-[0.7rem] text-muted-foreground">Searching…</p>
                  ) : suggestions.length === 0 ? (
                    <p className="px-2 py-1 text-[0.7rem] text-muted-foreground">No matches</p>
                  ) : (
                    suggestions.map((id) => (
                      <button
                        className="block w-full px-2 py-1 text-left font-mono text-xs hover:bg-muted"
                        key={id}
                        onClick={() => {
                          setNamespace(id);
                          setSuggestions([]);
                        }}
                        type="button"
                      >
                        {id}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Procedure</label>
          <input
            className={FIELD}
            onChange={(event) => setProcedure(event.target.value)}
            placeholder={tier === "provider" ? "exact procedure, e.g. repos.get" : "* or a specific name"}
            value={procedure}
          />
        </div>
      </div>

      {blocked && (
        <p className="text-[0.7rem] text-amber-700 dark:text-amber-400">
          Provider grants are credential grants — exact procedures only ({namespace || "provider"}
          .some.procedure, never {namespace || "provider"}.*). Anything broader belongs in an
          exported workflow.
        </p>
      )}

      <div className="flex items-center gap-2">
        <button
          className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          disabled={!canAdd}
          onClick={() => {
            onAdd(entry);
            setOpen(false);
          }}
          type="button"
        >
          Add
        </button>
        <button className={SMALL_BUTTON} onClick={() => setOpen(false)} type="button">
          Cancel
        </button>
      </div>
    </div>
  );
}

/**
 * WHAT — the unified allow-list editor. Every entry is classified locally by
 * {@link classifyToolEntry} (no gateway round-trip needed, so this works the
 * same on a gateway that has never heard of `apps.capabilities`) and rendered
 * as one typed row instead of three separate read-only cards plus a bare tag
 * input underneath them.
 */
function WhatSection({
  app,
  tools,
  onChange,
  invokeRegistry,
  executingProfiles,
}: {
  app: AppSummary;
  tools: string[];
  onChange: (next: string[]) => void;
  invokeRegistry?: ToolsInvoke | undefined;
  /** provider → executing profile name, from the gateway's capabilities. */
  executingProfiles?: Record<string, string> | undefined;
}) {
  const rows = tools.map((entry) => classifyToolEntry(entry, app));
  return (
    <div className="space-y-2">
      <TierExplainer />
      {rows.length === 0 ? (
        <Empty>No tools allow-listed yet.</Empty>
      ) : (
        <div className="space-y-1">
          {rows.map((info) => (
            <ToolEntryRow
              executingProfile={executingProfiles?.[info.namespace]}
              info={info}
              key={info.entry}
              onRemove={() => onChange(tools.filter((entry) => entry !== info.entry))}
            />
          ))}
        </div>
      )}
      <AddToolForm
        app={app}
        invokeRegistry={invokeRegistry}
        onAdd={(entry) => {
          if (!tools.includes(entry)) onChange([...tools, entry]);
        }}
      />
    </div>
  );
}

/** WHO — visibility, who may use it, and admins as one compact block. */
function WhoSection({
  visibility,
  onVisibilityChange,
  access,
  onAccessChange,
  users,
  onUsersChange,
  admins,
}: {
  visibility: AppSummary["visibility"];
  onVisibilityChange: (next: AppSummary["visibility"]) => void;
  access: "any" | "listed";
  onAccessChange: (next: "any" | "listed") => void;
  users: string[];
  onUsersChange: (next: string[]) => void;
  admins: string[];
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <Segmented
          ariaLabel="Page visibility"
          onChange={onVisibilityChange}
          options={[
            { value: "private", label: "Private", hint: "An Aprovan account is required" },
            { value: "public", label: "Public", hint: "Anyone can open the page" },
          ]}
          value={visibility}
        />
        <Segmented
          ariaLabel="Who may use it"
          onChange={onAccessChange}
          options={[
            { value: "any", label: "Any account" },
            { value: "listed", label: "Listed only" },
          ]}
          value={access}
        />
      </div>
      <div className="flex flex-wrap items-start gap-x-4 gap-y-2">
        {access === "listed" && (
          <div className="min-w-[12rem] flex-1 space-y-1">
            <span className={LABEL}>Users</span>
            <TagsInput
              ariaLabel="Allowed users"
              onChange={onUsersChange}
              placeholder="Cognito sub, press Enter…"
              value={users}
            />
          </div>
        )}
        <div className="space-y-1">
          <span className={LABEL}>Admins</span>
          {admins.length ? (
            <div className="flex flex-wrap gap-1">
              {admins.map((admin) => (
                <UserChip id={admin} key={admin} />
              ))}
            </div>
          ) : (
            <span className={`${BADGE} border-border text-muted-foreground`}>
              Workspace members
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/** One rate-limit number, editable in place — the tile stays a tile, it just
 *  also accepts input. */
function EditableStat({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  hint?: string;
}) {
  return (
    <div className="rounded-md border px-2 py-1" title={hint}>
      <input
        aria-label={label}
        className="w-14 bg-transparent text-sm font-semibold leading-5 tabular-nums outline-none"
        inputMode="numeric"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
      <div className="text-[0.62rem] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}

/** LIMITS — the rate-limit stat row, now editable in place instead of a
 *  read-only summary above a separate edit form. */
function LimitsSection({
  rps,
  onRpsChange,
  burst,
  onBurstChange,
  daily,
  onDailyChange,
}: {
  rps: string;
  onRpsChange: (next: string) => void;
  burst: string;
  onBurstChange: (next: string) => void;
  daily: string;
  onDailyChange: (next: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <EditableStat hint="Requests per second, per app user" label="req / s" onChange={onRpsChange} value={rps} />
      <EditableStat hint="Burst allowance above the steady rate" label="burst" onChange={onBurstChange} value={burst} />
      <EditableStat hint="Calls per day, per app user" label="per day" onChange={onDailyChange} value={daily} />
      <span className="text-[0.65rem] text-muted-foreground">per app user</span>
    </div>
  );
}

function DependenciesSection({
  dependencies,
  showRebind,
  onRebind,
}: {
  dependencies: AppDependencyStatus[];
  showRebind?: boolean;
  onRebind?: (() => void) | undefined;
}) {
  if (dependencies.length === 0) return null;
  return (
    <div className="space-y-1.5">
      <SectionHeading>Dependencies</SectionHeading>
      <div className="space-y-1">
        {dependencies.map((dep) => {
          const unfulfilled = dep.fulfilled === false;
          const ungated = dep.fulfilled === "ungated";
          return (
            <div
              className={`flex flex-wrap items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs ${
                unfulfilled
                  ? "border-amber-300 dark:border-amber-900"
                  : "border-border"
              }`}
              key={dep.contract}
            >
              <code className="font-mono">{dep.contract}</code>
              {dep.optional && (
                <span className={`${BADGE} border-border text-muted-foreground`}>optional</span>
              )}
              {dep.boundProfile ? (
                <span className="text-muted-foreground">→ {dep.boundProfile}</span>
              ) : (
                <span className="text-muted-foreground">unbound</span>
              )}
              {ungated && (
                <span className={`${BADGE} border-dashed text-muted-foreground`}>
                  ungated
                </span>
              )}
              {unfulfilled && (
                <span className={`${BADGE} border-amber-300 text-amber-700 dark:border-amber-900 dark:text-amber-400`}>
                  unfulfilled
                </span>
              )}
              {unfulfilled && showRebind && onRebind && (
                <button className={`${SMALL_BUTTON} ml-auto`} onClick={onRebind} type="button">
                  Re-bind
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InstallSettingsTab({
  install,
  invoke,
  onChanged,
}: {
  install: InstallSummary;
  invoke: ToolsInvoke;
  onChanged: () => void;
}) {
  const [bindings, setBindings] = React.useState(install.bindings);
  const [configText, setConfigText] = React.useState(
    () => JSON.stringify(install.config ?? {}, null, 2),
  );
  const [editing, setEditing] = React.useState(install.editing);
  const [busy, setBusy] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<string | null>(null);

  React.useEffect(() => {
    setBindings(install.bindings);
    setConfigText(JSON.stringify(install.config ?? {}, null, 2));
    setEditing(install.editing);
    setError(null);
    setStatus(null);
  }, [install.installId, install.bindings, install.config, install.editing]);

  const pinLabel =
    "channel" in install.pin
      ? `channel · ${install.pin.channel}`
      : `release · ${install.pin.release}`;

  const save = async () => {
    setBusy("save");
    setError(null);
    let config: Record<string, unknown> = {};
    try {
      config = JSON.parse(configText) as Record<string, unknown>;
    } catch {
      setError("Config must be valid JSON");
      setBusy(null);
      return;
    }
    const result = await attempt(() =>
      invoke("configure", {
        install: install.installId,
        bindings,
        config,
        editing,
      }),
    );
    setBusy(null);
    if (!result.ok) {
      setError(result.error ?? "Configure failed");
      return;
    }
    setStatus("Saved");
    onChanged();
  };

  const update = async (force = false) => {
    setBusy("update");
    setError(null);
    const result = await attempt(() =>
      invoke("update", { install: install.installId, ...(force ? { force: true } : {}) }),
    );
    setBusy(null);
    if (!result.ok) {
      setError(result.error ?? "Update failed");
      return;
    }
    setStatus("Updated");
    onChanged();
  };

  return (
    <div className="space-y-3">
      {install.available === false && (
        <p className="rounded-md border border-amber-300 px-2.5 py-1.5 text-xs text-amber-700 dark:border-amber-900 dark:text-amber-400">
          Origin app is unavailable — update is disabled; the install keeps running from its pin.
        </p>
      )}
      <FieldRow label="Pin">
        <span className="flex flex-wrap items-center gap-1.5">
          <span className={`${BADGE} border-border font-mono`}>{pinLabel}</span>
          {install.resolvedRelease && (
            <span className="font-mono text-[0.65rem] text-muted-foreground">
              → {install.resolvedRelease.slice(0, 12)}
            </span>
          )}
          {install.updateAvailable && (
            <span className={`${BADGE} border-emerald-300 text-emerald-700`}>update available</span>
          )}
        </span>
      </FieldRow>
      <div className="flex flex-wrap gap-2">
        <button
          className={SMALL_BUTTON}
          disabled={busy !== null || install.available === false}
          onClick={() => void update(false)}
          type="button"
        >
          {busy === "update" ? "Updating…" : "Update"}
        </button>
      </div>

      <div className="space-y-1.5">
        <SectionHeading>Bindings</SectionHeading>
        {Object.keys(bindings).length === 0 && !(install.requires?.length) ? (
          <span className="text-[0.7rem] text-muted-foreground">No bindings</span>
        ) : (
          (install.requires ?? Object.keys(bindings).map((c) => ({ contract: c }))).map((req) => (
            <div className="space-y-1" key={req.contract}>
              <label className={LABEL}>{req.contract}</label>
              <input
                className={FIELD}
                onChange={(e) =>
                  setBindings((prev) => ({ ...prev, [req.contract]: e.target.value }))
                }
                placeholder="profile id"
                value={bindings[req.contract] ?? ""}
              />
            </div>
          ))
        )}
      </div>

      <div className="space-y-1.5">
        <SectionHeading>Config</SectionHeading>
        <textarea
          className={`${FIELD} min-h-[6rem] font-mono`}
          onChange={(e) => setConfigText(e.target.value)}
          spellCheck={false}
          value={configText}
        />
      </div>

      <div className="space-y-1.5">
        <SectionHeading>Editing</SectionHeading>
        {editing ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs">Editing enabled</span>
            {install.prefix ? (
              <span className="font-mono text-[0.65rem] text-muted-foreground">
                {install.prefix}
              </span>
            ) : null}
            <button className={SMALL_BUTTON} onClick={() => setEditing(false)} type="button">
              Disable
            </button>
          </div>
        ) : (
          <>
            <p className="text-[0.65rem] text-muted-foreground">
              Copies the pinned release&apos;s source into this workspace
              {install.prefix ? (
                <>
                  {" "}
                  at <span className="font-mono">{install.prefix}</span>
                </>
              ) : null}
              . Future updates from the origin may overwrite local edits or be blocked.
            </p>
            <ConfirmButton
              armedLabel="Confirm enable editing?"
              label="Enable editing"
              onConfirm={() => setEditing(true)}
              tone="caution"
            />
          </>
        )}
      </div>

      <ErrorLine error={error} />
      <div className="flex items-center gap-2 border-t pt-2">
        <button
          className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          disabled={busy !== null}
          onClick={() => void save()}
          type="button"
        >
          {busy === "save" ? "Saving…" : "Save install settings"}
        </button>
        {status && <span className="text-xs text-emerald-600 dark:text-emerald-400">{status}</span>}
      </div>
    </div>
  );
}

function AccessTab({
  app,
  workflows,
  invoke,
  invokeRegistry,
  onChanged,
  install,
}: {
  app: AppSummary;
  workflows: WorkflowSummary[];
  invoke: ToolsInvoke;
  invokeRegistry?: ToolsInvoke | undefined;
  onChanged: () => void;
  install?: InstallSummary | undefined;
}) {
  // The data-location line still wants the gateway's own capability read when
  // there is one — everything else in this tab works entirely off the
  // manifest (`classifyToolEntry` needs no round-trip), so a gateway that has
  // never heard of `apps.capabilities` only loses this one line's precision
  // and the per-provider executing-profile names.
  const load = React.useCallback(async (): Promise<{
    model: CapabilityModel;
    executingProfiles: Record<string, string>;
  }> => {
    const base = deriveCapabilities(app, workflows);
    const result = await attempt(() =>
      invoke("capabilities", { app: app.appId ?? app.name, name: app.name }),
    );
    if (!result.ok) return { model: base, executingProfiles: {} };
    // Tier-2 entries name the profile that executes each provider grant on
    // profiles-enabled gateways; older gateways simply omit the field and
    // the rows fall back to the bare credential string.
    const executingProfiles: Record<string, string> = {};
    for (const entry of unwrapList(result.value, "providers")) {
      const item = asRecord(entry);
      const provider = asString(item?.["provider"]);
      const profile = asString(item?.["profile"]);
      if (provider && profile) executingProfiles[provider] = profile;
    }
    return { model: mergeCapabilities(base, result.value), executingProfiles };
  }, [app, invoke, workflows]);
  const { data } = useLoader(load, true, app.name);
  const model = data?.model ?? deriveCapabilities(app, workflows);

  const [visibility, setVisibility] = React.useState(app.visibility);
  const [access, setAccess] = React.useState(app.roles?.access ?? "any");
  const [users, setUsers] = React.useState<string[]>(app.roles?.users ?? []);
  const [tools, setTools] = React.useState<string[]>(app.allowedTools ?? []);
  const [rps, setRps] = React.useState(String(app.rateLimit?.rps ?? 5));
  const [burst, setBurst] = React.useState(String(app.rateLimit?.burst ?? 10));
  const [daily, setDaily] = React.useState(String(app.rateLimit?.daily ?? 1000));
  const [saving, setSaving] = React.useState(false);
  const [status, setStatus] = React.useState<string | null>(null);

  // A different app in the same pane resets every field to its own values —
  // otherwise switching apps would carry the previous app's unsaved edits.
  React.useEffect(() => {
    setVisibility(app.visibility);
    setAccess(app.roles?.access ?? "any");
    setUsers(app.roles?.users ?? []);
    setTools(app.allowedTools ?? []);
    setRps(String(app.rateLimit?.rps ?? 5));
    setBurst(String(app.rateLimit?.burst ?? 10));
    setDaily(String(app.rateLimit?.daily ?? 1000));
    setStatus(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on identity, not every field
  }, [app.name]);

  const save = async () => {
    setSaving(true);
    setStatus(null);
    try {
      await invoke("publish", {
        name: app.name,
        entry: app.entry,
        paths: app.paths,
        visibility,
        allowed_tools: tools,
        roles: {
          access,
          ...(access === "listed" ? { users } : {}),
        },
        rate_limit: {
          rps: Number(rps) > 0 ? Number(rps) : 5,
          burst: Number(burst) > 0 ? Number(burst) : 10,
          daily: Number(daily) > 0 ? Number(daily) : 1000,
        },
      });
      setStatus("Saved");
      onChanged();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-3">
      <DataLocationCallout app={app} model={model} />

      <div className="space-y-1.5">
        <SectionHeading>Who</SectionHeading>
        <WhoSection
          access={access}
          admins={app.roles?.admins ?? []}
          onAccessChange={setAccess}
          onUsersChange={setUsers}
          onVisibilityChange={setVisibility}
          users={users}
          visibility={visibility}
        />
      </div>

      <div className="space-y-1.5">
        <SectionHeading>What it can touch</SectionHeading>
        <WhatSection
          app={app}
          executingProfiles={data?.executingProfiles}
          invokeRegistry={invokeRegistry}
          onChange={setTools}
          tools={tools}
        />
      </div>

      <DependenciesSection
        dependencies={model.dependencies}
        onRebind={
          install
            ? () => {
                /* host can open install settings / rebind via configure */
              }
            : undefined
        }
        showRebind={Boolean(install)}
      />

      <div className="space-y-1.5">
        <SectionHeading>Limits</SectionHeading>
        <LimitsSection
          burst={burst}
          daily={daily}
          onBurstChange={setBurst}
          onDailyChange={setDaily}
          onRpsChange={setRps}
          rps={rps}
        />
      </div>

      <div className="flex items-center gap-2 border-t pt-2">
        <button
          className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          disabled={saving}
          onClick={() => void save()}
          type="button"
        >
          {saving ? "Saving…" : "Save access & limits"}
        </button>
        {status && (
          <span
            className={`text-xs ${
              status === "Saved"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {status}
          </span>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Releases tab
// ---------------------------------------------------------------------------

interface ReleaseState {
  channels: AppChannel[];
  releases: AppRelease[];
  /** True when neither procedure exists — releases aren't wired up yet. */
  unsupported: boolean;
}

function ReleasesTab({ app, invoke }: { app: AppSummary; invoke: ToolsInvoke }) {
  const [busy, setBusy] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [notes, setNotes] = React.useState("");
  const [cutChannel, setCutChannel] = React.useState("preview");
  const [promoteFrom, setPromoteFrom] = React.useState("preview");
  const [promoteTo, setPromoteTo] = React.useState("live");

  const load = React.useCallback(async (): Promise<ReleaseState> => {
    const [channelsResult, releasesResult] = await Promise.all([
      attempt(() => invoke("channels", { name: app.name })),
      attempt(() => invoke("releases", { name: app.name })),
    ]);
    return {
      channels: channelsResult.ok ? normalizeChannels(channelsResult.value) : [],
      releases: releasesResult.ok ? normalizeReleases(releasesResult.value) : [],
      unsupported: Boolean(channelsResult.missing) && Boolean(releasesResult.missing),
    };
  }, [app.name, invoke]);

  const { data, reload, loading } = useLoader(load, true, app.name);

  const act = async (label: string, operation: string, args: Record<string, unknown>) => {
    setBusy(label);
    setError(null);
    const result = await attempt(() => invoke(operation, { name: app.name, ...args }));
    setBusy(null);
    if (!result.ok) {
      setError(
        result.missing
          ? `This gateway has no apps.${operation} yet.`
          : (result.error ?? `${label} failed`),
      );
      return;
    }
    reload();
  };

  const channels = data?.channels ?? [];
  const releases = data?.releases ?? [];
  const channelNames = channels.length ? channels.map((channel) => channel.name) : ["live", "preview"];

  if (data?.unsupported) {
    return (
      <Empty>
        Releases aren't available on this gateway yet. The live page serves the workspace's
        current files until <code className="font-mono">apps.release</code> lands.
      </Empty>
    );
  }

  return (
    <div className="space-y-4">
      <ErrorLine error={error} />

      <div className="space-y-1">
        <SectionHeading hint="What each channel currently points at">Channels</SectionHeading>
        {loading && channels.length === 0 ? (
          <Empty>Loading…</Empty>
        ) : channels.length === 0 ? (
          <Empty>No channel pins yet — cut a release to create one.</Empty>
        ) : (
          <div className="space-y-1">
            {channels.map((channel) => (
              <div
                className="flex flex-wrap items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs"
                key={channel.name}
              >
                <span className={`${BADGE} border-border font-medium`}>{channel.name}</span>
                <code className="font-mono text-muted-foreground">
                  {channel.releaseId ? channel.releaseId.slice(0, 12) : "unpinned"}
                </code>
                {channel.updatedAt && (
                  <span className="text-muted-foreground">{formatWhen(channel.updatedAt)}</span>
                )}
                <span className="ml-auto">
                  <ConfirmButton
                    armedLabel="Confirm rollback?"
                    busy={busy === `rollback:${channel.name}`}
                    busyLabel="Rolling back…"
                    label="Rollback"
                    onConfirm={() =>
                      void act(`rollback:${channel.name}`, "rollback", { channel: channel.name })
                    }
                    tone="caution"
                  />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-1.5 rounded-md border px-2.5 py-2">
        <SectionHeading>Cut a release</SectionHeading>
        <p className="text-[0.7rem] text-muted-foreground">
          A release is a snapshot of content hashes over files that already exist — free to
          create, instant to roll back.
        </p>
        <div className="grid gap-2 sm:grid-cols-[8rem_1fr_auto]">
          <select
            className={FIELD}
            onChange={(event) => setCutChannel(event.target.value)}
            value={cutChannel}
          >
            {channelNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <input
            className={FIELD}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Notes (optional)"
            value={notes}
          />
          <button
            className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            disabled={busy === "release"}
            onClick={() => {
              void act("release", "release", { channel: cutChannel, notes }).then(() => setNotes(""));
            }}
            type="button"
          >
            {busy === "release" ? "Cutting…" : "Release"}
          </button>
        </div>
      </div>

      <div className="space-y-1.5 rounded-md border px-2.5 py-2">
        <SectionHeading>Promote</SectionHeading>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            className={`${FIELD} w-auto`}
            onChange={(event) => setPromoteFrom(event.target.value)}
            value={promoteFrom}
          >
            {channelNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <span className="text-muted-foreground">→</span>
          <select
            className={`${FIELD} w-auto`}
            onChange={(event) => setPromoteTo(event.target.value)}
            value={promoteTo}
          >
            {channelNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <ConfirmButton
            armedLabel="Confirm promote?"
            busy={busy === "promote"}
            busyLabel="Promoting…"
            label="Promote"
            onConfirm={() => void act("promote", "promote", { from: promoteFrom, to: promoteTo })}
            tone="caution"
          />
        </div>
      </div>

      <div className="space-y-1">
        <SectionHeading>History</SectionHeading>
        {releases.length === 0 ? (
          <Empty>No releases yet.</Empty>
        ) : (
          <div className="space-y-1">
            {releases.map((release) => (
              <div className="rounded-md border px-2.5 py-1.5 text-xs" key={release.id}>
                <div className="flex flex-wrap items-center gap-2">
                  <code className="font-mono" title={release.id}>
                    {release.id.slice(0, 12)}
                  </code>
                  {release.channel && (
                    <span className={`${BADGE} border-border text-muted-foreground`}>
                      {release.channel}
                    </span>
                  )}
                  {release.createdAt && (
                    <span className="text-muted-foreground">{formatWhen(release.createdAt)}</span>
                  )}
                  {release.createdBy && (
                    <span className="truncate font-mono text-[0.65rem] text-muted-foreground">
                      {release.createdBy}
                    </span>
                  )}
                </div>
                {release.notes && <p className="mt-0.5 text-muted-foreground">{release.notes}</p>}
                {(release.entryHash || release.workflowHashes?.length) && (
                  <div className="mt-0.5 flex flex-wrap gap-1.5 text-[0.65rem] text-muted-foreground">
                    {release.entryHash && (
                      <code className="font-mono">entry {release.entryHash.slice(0, 8)}</code>
                    )}
                    {release.workflowHashes?.map((entry) => (
                      <code className="font-mono" key={entry.name}>
                        {entry.name} {entry.hash.slice(0, 8)}
                      </code>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pane
// ---------------------------------------------------------------------------

export interface AppDetailProps {
  app: AppSummary;
  /** When set, this is an installation detail (Install settings tab appears). */
  install?: InstallSummary | undefined;
  /** The app's exported workflows, resolved against the workflow registry. */
  workflows: WorkflowSummary[];
  /** Gateway `apps` namespace transport. */
  invokeApps: ToolsInvoke;
  /** Gateway `workflows` namespace transport — the Workflows tab runs through it. */
  invoke: ToolsInvoke;
  /**
   * Gateway `registry` namespace transport, for the Access tab's provider
   * search (`registry.providers`, falling back to `registry.search`) when
   * adding a provider credential grant. Omit it and that step becomes a
   * plain namespace text field — everything else in Access still works.
   */
  invokeRegistry?: ToolsInvoke | undefined;
  onSelectWorkflow: (name: string) => void;
  /** The app was edited in place — refresh the catalog, keep it selected. */
  onChanged?: (() => void) | undefined;
  /**
   * The app is gone. Distinct from {@link AppDetailProps.onChanged} because a
   * host with a tab strip has to close the tab, not just reload. Falls back to
   * `onChanged` when omitted, which is the behaviour every existing host has.
   */
  onRemoved?: (() => void) | undefined;
  onOpenApp?: ((app: AppSummary) => void) | undefined;
  /** Navigate back to the list (pane variant). */
  onBack?: (() => void) | undefined;
  tab?: AppDetailTab;
  onTabChange?: ((tab: AppDetailTab) => void) | undefined;
  /** Wired into the Workflows tab's empty state — see {@link AppsPanelProps.onCreateWorkflow}. */
  onCreateWorkflow?: ((appName?: string) => void) | undefined;
  createWorkflowHref?: string | undefined;
  className?: string;
}

export function AppDetail({
  app,
  install,
  workflows,
  invokeApps,
  invoke,
  invokeRegistry,
  onSelectWorkflow,
  onChanged,
  onRemoved,
  onOpenApp,
  onBack,
  tab,
  onTabChange,
  onCreateWorkflow,
  createWorkflowHref,
  className,
}: AppDetailProps) {
  const tabs = install ? INSTALL_TABS : OWNER_TABS;
  const [localTab, setLocalTab] = React.useState<AppDetailTab>("overview");
  const active = tab ?? localTab;
  const setTab = (next: AppDetailTab) => {
    setLocalTab(next);
    onTabChange?.(next);
  };

  const [deleting, setDeleting] = React.useState(false);
  const [purgeData, setPurgeData] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // A different app/install in the same pane resets to Overview.
  React.useEffect(() => {
    setLocalTab("overview");
    setError(null);
    setPurgeData(false);
  }, [app.name, install?.installId]);

  const removeApp = async () => {
    setDeleting(true);
    setError(null);
    const result = install
      ? await attempt(() =>
          invokeApps("uninstall", { install: install.installId, purge_data: purgeData }),
        )
      : await attempt(() =>
          invokeApps("remove", {
            app: app.appId ?? app.name,
            name: app.name,
            purge_data: purgeData,
          }),
        );
    if (!result.ok) {
      setError(result.error ?? "Delete failed");
      setDeleting(false);
      return;
    }
    if (onRemoved) onRemoved();
    else onChanged?.();
  };

  const permalink =
    install?.permalink ?? app.permalink ?? (app.appId ? `/apps/id/${app.appId}` : undefined);

  return (
    <div className={`space-y-3 ${className ?? ""}`}>
      {onBack && (
        <button
          className="text-[0.7rem] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          onClick={onBack}
          type="button"
        >
          ‹ Apps
        </button>
      )}
      <div className="flex flex-wrap items-start gap-2">
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium">
            {install?.title ?? app.title ?? app.name}
          </span>
          <code className="font-mono text-[0.7rem] text-muted-foreground">
            {install ? install.installId : app.name}
          </code>
          {permalink && (
            <span className="mt-0.5 flex flex-wrap items-center gap-1">
              <code className="font-mono text-[0.65rem] text-muted-foreground">{permalink}</code>
              <CopyChip text={permalink} />
            </span>
          )}
          {(install || app.originAppId) && (
            <span className="mt-0.5 block text-[0.65rem] text-muted-foreground">
              {install
                ? `installed from ${install.originWorkspaceId ? `${install.originWorkspaceId}/` : ""}${install.name ?? install.originAppId}`
                : `forked from ${app.originAppId}`}
            </span>
          )}
        </span>
        {onOpenApp && !install && (
          <button className={SMALL_BUTTON} onClick={() => onOpenApp(app)} type="button">
            Open
          </button>
        )}
      </div>

      <ErrorLine error={error} />

      <Tabs
        active={active}
        onChange={setTab}
        tabs={tabs.map((entry) =>
          entry.id === "workflows" ? { ...entry, badge: workflows.length } : entry,
        )}
      />

      {active === "overview" && <Overview app={app} install={install} />}
      {active === "workflows" && !install && (
        <WorkflowsTab
          app={app}
          createWorkflowHref={createWorkflowHref}
          invoke={invoke}
          onCreateWorkflow={onCreateWorkflow}
          onSelectWorkflow={onSelectWorkflow}
          workflows={workflows}
        />
      )}
      {active === "access" && (
        <AccessTab
          app={app}
          install={install}
          invoke={invokeApps}
          invokeRegistry={invokeRegistry}
          onChanged={() => onChanged?.()}
          workflows={workflows}
        />
      )}
      {active === "releases" && !install && <ReleasesTab app={app} invoke={invokeApps} />}
      {active === "versions" && !install && (
        <VersionsSection
          invoke={invokeApps}
          name={app.name}
          onRestored={() => onChanged?.()}
          open
        />
      )}
      {active === "install" && install && (
        <InstallSettingsTab install={install} invoke={invokeApps} onChanged={() => onChanged?.()} />
      )}

      <div className="flex flex-wrap items-center gap-2 border-t pt-2">
        <label className="flex items-center gap-1 text-[0.7rem] text-muted-foreground">
          <input
            checked={purgeData}
            onChange={(event) => setPurgeData(event.target.checked)}
            type="checkbox"
          />
          {install
            ? "also delete this install's per-user data"
            : "also delete the app folder & every user's data"}
        </label>
        <span className="ml-auto">
          <ConfirmDeleteButton
            busy={deleting}
            label={install ? "Uninstall" : "Unpublish"}
            onConfirm={() => void removeApp()}
          />
        </span>
      </div>
    </div>
  );
}
