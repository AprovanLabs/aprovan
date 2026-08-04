/**
 * DependencyPanel — what a sandbox script actually loads, and where it comes
 * from. One row per imported provider: local identifier → provider namespace,
 * branding, supported auth methods, and provenance (the vendor's own domain
 * and spec, never an aggregator). Purely presentational so both the registry
 * playground and patchwork widgets can feed it their own catalog data.
 */

import * as React from "react";

/** A parsed script import (from `@aprovan/runtime`'s dependency parser). */
export interface ScriptDependency {
  /** Local binding name in the script (`github` in `import github from …`). */
  identifier: string;
  /** Raw import specifier (`@utdk/github`, `open-meteo/geocoding`). */
  specifier: string;
  /** Resolved provider id. */
  provider: string;
  /** Optional namespace path inside the provider. */
  path?: string;
}

/** Catalog knowledge about a provider, when the registry has it. */
export interface ProviderCatalogInfo {
  title?: string;
  icon?: string;
  /** Vendor site (branding), e.g. `https://www.github.com`. */
  site?: string;
  /** Where the spec truly lives — `docs.github.com`, not an aggregator. */
  originDomain?: string;
  originSpecUrl?: string;
  authMethods?: string[];
  /** Whether generated TypeScript types exist for the provider. */
  typed?: boolean;
}

export interface DependencyPanelProps {
  dependencies: ScriptDependency[];
  /** True when dynamic `tools[expr]` access makes the list incomplete. */
  unresolved?: boolean;
  /** Lookup by provider id; missing entries render as "unregistered". */
  catalog?: Record<string, ProviderCatalogInfo>;
  /** Base URL for provider deep links (e.g. `/registry`). */
  registryBaseUrl?: string;
  className?: string;
}

function ProviderIcon({ info, provider }: { info?: ProviderCatalogInfo; provider: string }) {
  if (info?.icon) {
    return (
      <img
        alt=""
        className="size-5 shrink-0 rounded-sm object-contain"
        src={info.icon}
      />
    );
  }
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-sm bg-muted font-mono text-[0.6rem] font-semibold uppercase text-muted-foreground">
      {provider.charAt(0)}
    </span>
  );
}

export function DependencyPanel({
  dependencies,
  unresolved = false,
  catalog,
  registryBaseUrl = "",
  className,
}: DependencyPanelProps): React.ReactElement {
  if (dependencies.length === 0 && !unresolved) {
    return (
      <p className={`text-xs text-muted-foreground ${className ?? ""}`}>
        No tools.* accesses yet — call a namespace on the global tools root.
      </p>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      {unresolved && (
        <p className="text-xs text-amber-700 dark:text-amber-400">
          Dependency list may be incomplete — dynamic tools[…] access detected.
        </p>
      )}
      {dependencies.length === 0 ? null : (
    <ul className="flex flex-col divide-y rounded-lg border">
      {dependencies.map((dependency) => {
        const info = catalog?.[dependency.provider];
        const namespace = dependency.path
          ? `${dependency.provider}.${dependency.path}`
          : dependency.provider;
        return (
          <li
            className="flex flex-wrap items-center gap-2 px-3 py-2"
            key={`${dependency.identifier}:${dependency.specifier}`}
          >
            <ProviderIcon info={info} provider={dependency.provider} />
            <span className="min-w-0 font-mono text-xs">
              <span className="font-medium">{dependency.identifier}</span>
              <span className="text-muted-foreground"> → </span>
              {registryBaseUrl ? (
                <a
                  className="underline-offset-2 hover:underline"
                  href={`${registryBaseUrl}/packages/${dependency.provider}`}
                >
                  {namespace}
                </a>
              ) : (
                namespace
              )}
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              {info?.authMethods?.map((method) => (
                <span
                  className="rounded border px-1.5 py-0.5 font-mono text-[0.6rem] text-muted-foreground"
                  key={method}
                >
                  {method}
                </span>
              ))}
              {info?.typed && (
                <span className="rounded border border-syntax-type/40 px-1.5 py-0.5 font-mono text-[0.6rem] text-syntax-type">
                  typed
                </span>
              )}
              {info ? (
                info.originDomain && (
                  <a
                    className="text-[0.65rem] text-muted-foreground underline-offset-2 hover:underline"
                    href={info.originSpecUrl ?? info.site ?? `https://${info.originDomain}`}
                    rel="noreferrer"
                    target="_blank"
                    title={`Spec source: ${info.originSpecUrl ?? info.originDomain}`}
                  >
                    {info.originDomain}
                  </a>
                )
              ) : (
                <span className="text-[0.65rem] text-muted-foreground/70">
                  unregistered
                </span>
              )}
            </span>
          </li>
        );
      })}
    </ul>
      )}
    </div>
  );
}
