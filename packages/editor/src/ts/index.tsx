/**
 * Per-project TypeScript language-service environments.
 *
 * Liberated from the page-wide singleton: each project gets its own
 * VirtualTypeScriptEnvironment, configurable rootFiles (so a global
 * declaration can apply), and dispose() that releases mounted files.
 */

import { autocompletion } from "@codemirror/autocomplete";
import { javascript } from "@codemirror/lang-javascript";
import {
  createDefaultMapFromCDN,
  createSystem,
  createVirtualTypeScriptEnvironment,
  type VirtualTypeScriptEnvironment,
} from "@typescript/vfs";
import {
  tsAutocomplete,
  tsFacet,
  tsHover,
  tsLinter,
  tsSync,
} from "@valtown/codemirror-ts";
import { basicSetup, EditorView } from "codemirror";
import { Compartment, EditorState } from "@codemirror/state";
import * as React from "react";
import ts from "typescript";
import type { Checker, Diagnostic, VirtualProject } from "@aprovan/patchwork";

const DEFAULT_COMPILER_OPTIONS: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2022,
  lib: ["es2022", "dom"],
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  allowArbitraryExtensions: true,
  noImplicitAny: false,
  jsx: ts.JsxEmit.ReactJSX,
};

/**
 * Imports with no better match resolve as open modules instead of erroring —
 * sandbox scripts import providers / `react` by bare name and typing coverage
 * is incremental. An empty `declare module "*"` keeps named imports
 * (`import { useState } from "react"`) valid as `any`; a default-only wildcard
 * made TypeScript report them as `Module '"*"' has no exported member …`.
 * Mounted `.d.ts` files always win over this wildcard.
 */
export const AMBIENT_FALLBACK = `declare module "*";`;

export const AMBIENT_FALLBACK_PATH = "/ambient-fallback.d.ts";

/** Process-wide lib map cache (CDN / localStorage) — not project state. */
let libMapPromise: Promise<Map<string, string>> | null = null;

async function loadLibMap(
  compilerOptions: ts.CompilerOptions,
): Promise<Map<string, string>> {
  libMapPromise ??= createDefaultMapFromCDN(
    { target: compilerOptions.target ?? ts.ScriptTarget.ES2022 },
    ts.version,
    true,
    ts,
  );
  const shared = await libMapPromise;
  // Clone so each project has an independent fsMap.
  return new Map(shared);
}

export interface TypeEnvironmentOptions {
  /**
   * Virtual paths that seed the program as roots. Content must be provided
   * via `files` (or the ambient fallback is used for {@link AMBIENT_FALLBACK_PATH}).
   */
  rootFiles: string[];
  /** Initial file contents keyed by absolute virtual path. */
  files?: Record<string, string>;
  compilerOptions?: ts.CompilerOptions;
  /**
   * Optional prebuilt lib+file map for tests (skips CDN). When omitted the
   * TypeScript CDN default map is fetched and cloned.
   */
  fsMap?: Map<string, string>;
}

export interface TypeEnvironment {
  /** Underlying VFS environment (for CodeMirror tsFacet). */
  readonly vfs: VirtualTypeScriptEnvironment;
  mount(path: string, content: string): void;
  unmount(path: string): void;
  dispose(): void;
}

function upsertFile(
  environment: VirtualTypeScriptEnvironment,
  path: string,
  content: string,
): void {
  if (environment.sys.fileExists(path)) environment.updateFile(path, content);
  else environment.createFile(path, content);
}

export async function createTypeEnvironment(
  options: TypeEnvironmentOptions,
): Promise<TypeEnvironment> {
  const compilerOptions: ts.CompilerOptions = {
    ...DEFAULT_COMPILER_OPTIONS,
    ...options.compilerOptions,
  };
  // `lib` cannot be combined with `noLib` (TS5053), even as `lib: []`.
  if (compilerOptions.noLib) {
    delete compilerOptions.lib;
  }

  const fsMap = options.fsMap
    ? new Map(options.fsMap)
    : await loadLibMap(compilerOptions);

  const files = { ...(options.files ?? {}) };
  if (!files[AMBIENT_FALLBACK_PATH] && !options.fsMap) {
    files[AMBIENT_FALLBACK_PATH] = AMBIENT_FALLBACK;
  }

  for (const [path, content] of Object.entries(files)) {
    fsMap.set(path, content);
  }

  // Ensure every root has content.
  const rootFiles = [...options.rootFiles];
  if (
    !rootFiles.includes(AMBIENT_FALLBACK_PATH) &&
    fsMap.has(AMBIENT_FALLBACK_PATH)
  ) {
    rootFiles.push(AMBIENT_FALLBACK_PATH);
  }

  for (const path of rootFiles) {
    if (!fsMap.has(path)) {
      throw new Error(
        `createTypeEnvironment: root file "${path}" has no content in files/fsMap`,
      );
    }
  }

  const system = createSystem(fsMap);
  const vfs = createVirtualTypeScriptEnvironment(
    system,
    rootFiles,
    ts,
    compilerOptions,
  );

  const mounted = new Set<string>(rootFiles);
  let disposed = false;

  return {
    get vfs() {
      return vfs;
    },
    mount(path: string, content: string) {
      if (disposed) throw new Error("TypeEnvironment is disposed");
      upsertFile(vfs, path, content);
      mounted.add(path);
    },
    unmount(path: string) {
      if (disposed) return;
      if (vfs.sys.fileExists(path)) {
        vfs.deleteFile(path);
      }
      mounted.delete(path);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const path of [...mounted]) {
        try {
          if (vfs.sys.fileExists(path)) vfs.deleteFile(path);
        } catch {
          // best-effort teardown
        }
      }
      mounted.clear();
      try {
        vfs.languageService.dispose();
      } catch {
        // ignore
      }
    },
  };
}

/**
 * @deprecated Prefer {@link createTypeEnvironment}. Kept as a thin default
 * for hosts that have not yet adopted per-project envs.
 */
export function loadTsEnvironment(): Promise<VirtualTypeScriptEnvironment> {
  return createTypeEnvironment({
    rootFiles: [AMBIENT_FALLBACK_PATH],
    files: { [AMBIENT_FALLBACK_PATH]: AMBIENT_FALLBACK },
  }).then((env) => env.vfs);
}

let nextEditorId = 0;

export interface TsScriptEditorProps {
  value: string;
  onChange: (value: string) => void;
  /**
   * Extra files for the type environment, keyed by absolute virtual path
   * (e.g. `/node_modules/@utdk/github/index.d.ts`). Use them to give provider
   * imports real types.
   */
  extraFiles?: Record<string, string>;
  /**
   * Optional shared project environment. When omitted, the editor creates
   * and disposes its own (never a page-wide singleton).
   */
  environment?: TypeEnvironment;
  className?: string;
  /** CSS min-height of the editor surface. */
  minHeight?: string;
  ariaLabel?: string;
}

export function TsScriptEditor({
  value,
  onChange,
  extraFiles,
  environment: environmentProp,
  className,
  minHeight = "22rem",
  ariaLabel = "Script editor",
}: TsScriptEditorProps): React.ReactElement {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const viewRef = React.useRef<EditorView | null>(null);
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;
  const pathRef = React.useRef(`/script-${nextEditorId++}.ts`);
  const tsCompartment = React.useMemo(() => new Compartment(), []);
  const ownedEnvRef = React.useRef<TypeEnvironment | null>(null);
  const envRef = React.useRef<TypeEnvironment | null>(environmentProp ?? null);
  const prevExtraRef = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    envRef.current = environmentProp ?? ownedEnvRef.current;
  }, [environmentProp]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const view = new EditorView({
      parent: container,
      state: EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          javascript({ typescript: true }),
          tsCompartment.of([]),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              onChangeRef.current(update.state.doc.toString());
            }
          }),
          EditorView.theme({
            "&": { backgroundColor: "transparent", fontSize: "0.875rem" },
            ".cm-content": {
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
            },
            ".cm-gutters": { backgroundColor: "transparent" },
            "&.cm-focused": { outline: "none" },
          }),
        ],
      }),
    });
    viewRef.current = view;

    let cancelled = false;

    void (async () => {
      const typeEnv =
        environmentProp ??
        (await createTypeEnvironment({
          rootFiles: [AMBIENT_FALLBACK_PATH],
          files: { [AMBIENT_FALLBACK_PATH]: AMBIENT_FALLBACK },
        }));
      if (cancelled) {
        if (!environmentProp) typeEnv.dispose();
        return;
      }
      if (!environmentProp) ownedEnvRef.current = typeEnv;
      envRef.current = typeEnv;

      typeEnv.mount(pathRef.current, view.state.doc.toString());
      view.dispatch({
        effects: tsCompartment.reconfigure([
          tsFacet.of({ env: typeEnv.vfs, path: pathRef.current }),
          tsSync(),
          tsLinter(),
          autocompletion({ override: [tsAutocomplete()] }),
          tsHover(),
        ]),
      });
    })();

    return () => {
      cancelled = true;
      viewRef.current = null;
      view.destroy();
      const owned = ownedEnvRef.current;
      const env = envRef.current;
      if (env) {
        env.unmount(pathRef.current);
      }
      if (owned) {
        owned.dispose();
        ownedEnvRef.current = null;
      }
      envRef.current = environmentProp ?? null;
    };
    // The view is created once; `value` afterwards flows through the
    // controlled-update effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Controlled updates from outside (e.g. "reset script").
  React.useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  // Mount/refresh provider type files; unmount keys that disappeared.
  React.useEffect(() => {
    const env = envRef.current ?? ownedEnvRef.current;
    if (!env) return;
    const next = new Set(Object.keys(extraFiles ?? {}));
    for (const path of prevExtraRef.current) {
      if (!next.has(path)) env.unmount(path);
    }
    for (const [path, content] of Object.entries(extraFiles ?? {})) {
      env.mount(path, content);
    }
    prevExtraRef.current = next;
  }, [extraFiles]);

  return (
    <div
      aria-label={ariaLabel}
      className={className}
      ref={containerRef}
      role="textbox"
      style={{ minHeight }}
    />
  );
}


/**
 * Checker backed by a per-project type environment.
 * Mounts the virtual project's files, runs syntactic + semantic diagnostics
 * on the entry, and maps them into the runtime Diagnostic shape.
 */
export function createChecker(env: TypeEnvironment): Checker {
  return {
    async check(project: VirtualProject, entry: string): Promise<Diagnostic[]> {
      const mounted: string[] = [];
      for (const file of project.files.values()) {
        const path = file.path.startsWith("/") ? file.path : `/${file.path}`;
        env.mount(path, file.content);
        mounted.push(path);
      }
      const entryPath = entry.startsWith("/") ? entry : `/${entry}`;
      const service = env.vfs.languageService;
      const diags = [
        ...service.getSyntacticDiagnostics(entryPath),
        ...service.getSemanticDiagnostics(entryPath),
      ];
      return diags.map((d): Diagnostic => {
        const file = d.file?.fileName ?? entryPath;
        const start = d.start ?? 0;
        const lineAndChar = d.file
          ? d.file.getLineAndCharacterOfPosition(start)
          : { line: 0, character: 0 };
        return {
          file: file.replace(/^\//, ""),
          line: lineAndChar.line + 1,
          column: lineAndChar.character + 1,
          message: ts.flattenDiagnosticMessageText(d.messageText, "\n"),
          severity: d.category === ts.DiagnosticCategory.Error ? "error" : "warning",
        };
      });
    },
  };
}

export interface CheckerFactoryOptions {
  /** Service namespaces available to the project (feeds generateNamespaceTypes). */
  namespaces: string[];
  /** Optional precomputed ambient SDK dts (defaults to generateNamespaceTypes). */
  sdkDts?: string;
  /** Extra virtual files to mount (provider bundles, plugins, …). */
  files?: Record<string, string>;
}

/**
 * Build a disposable per-project environment + Checker for compile-before-preview.
 * Global `tools` applies because `__sdk__.d.ts` is in rootFiles.
 */
export async function createProjectChecker(
  options: CheckerFactoryOptions,
): Promise<{ checker: Checker; environment: TypeEnvironment; dispose: () => void }> {
  const { generateNamespaceTypes } = await import("@aprovan/patchwork/namespace-types");
  const sdk =
    options.sdkDts ??
    generateNamespaceTypes(options.namespaces, [], { serviceRoot: "tools" });
  const files: Record<string, string> = {
    [AMBIENT_FALLBACK_PATH]: AMBIENT_FALLBACK,
    "/__sdk__.d.ts": sdk,
    ...(options.files ?? {}),
  };
  const environment = await createTypeEnvironment({
    rootFiles: ["/__sdk__.d.ts", AMBIENT_FALLBACK_PATH],
    files,
  });
  return {
    checker: createChecker(environment),
    environment,
    dispose: () => environment.dispose(),
  };
}
