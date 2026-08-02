/**
 * TsScriptEditor — a CodeMirror 6 editor backed by a real TypeScript language
 * service (diagnostics, completions, hover) running in the page via
 * `@typescript/vfs`. Built for sandbox scripts: imports of providers we have
 * no types for fall back to an ambient `declare module "*"` (typed `any`, no
 * squiggles), while provider `.d.ts` files mounted through `extraFiles` give
 * real IntelliSense and take precedence.
 *
 * The TS environment is created once per page (base libs fetched from the
 * TypeScript CDN and cached in localStorage) and shared by every editor;
 * each editor instance owns one virtual file. Ship it behind a lazy import —
 * the `typescript` package is heavy.
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

const COMPILER_OPTIONS: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2022,
  lib: ["es2022", "dom"],
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  allowArbitraryExtensions: true,
  // Playground scripts are casual: untyped inputs shouldn't light up red.
  noImplicitAny: false,
};

/**
 * Imports with no better match resolve as `any` instead of erroring —
 * sandbox scripts import providers by bare name and typing coverage is
 * incremental. Mounted `.d.ts` files always win over this wildcard.
 */
const AMBIENT_FALLBACK = `declare module "*" {
  const value: any;
  export default value;
}`;

let environmentPromise: Promise<VirtualTypeScriptEnvironment> | null = null;

/** Create (or reuse) the page-wide TS environment. Safe to call early. */
export function loadTsEnvironment(): Promise<VirtualTypeScriptEnvironment> {
  environmentPromise ??= (async () => {
    const fsMap = await createDefaultMapFromCDN(
      { target: COMPILER_OPTIONS.target ?? ts.ScriptTarget.ES2022 },
      ts.version,
      true,
      ts,
    );
    fsMap.set("/ambient-fallback.d.ts", AMBIENT_FALLBACK);
    const system = createSystem(fsMap);
    return createVirtualTypeScriptEnvironment(
      system,
      ["/ambient-fallback.d.ts"],
      ts,
      COMPILER_OPTIONS,
    );
  })();
  return environmentPromise;
}

function upsertFile(
  environment: VirtualTypeScriptEnvironment,
  path: string,
  content: string,
): void {
  if (environment.sys.fileExists(path)) environment.updateFile(path, content);
  else environment.createFile(path, content);
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
  className?: string;
  /** CSS min-height of the editor surface. */
  minHeight?: string;
  ariaLabel?: string;
}

export function TsScriptEditor({
  value,
  onChange,
  extraFiles,
  className,
  minHeight = "22rem",
  ariaLabel = "Script editor",
}: TsScriptEditorProps): React.ReactElement {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const viewRef = React.useRef<EditorView | null>(null);
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;
  // One virtual file per mounted editor.
  const pathRef = React.useRef(`/script-${nextEditorId++}.ts`);
  const tsCompartment = React.useMemo(() => new Compartment(), []);

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
            ".cm-content": { fontFamily: "var(--font-mono, ui-monospace, monospace)" },
            ".cm-gutters": { backgroundColor: "transparent" },
            "&.cm-focused": { outline: "none" },
          }),
        ],
      }),
    });
    viewRef.current = view;

    let cancelled = false;
    void loadTsEnvironment().then((environment) => {
      if (cancelled) return;
      upsertFile(environment, pathRef.current, view.state.doc.toString());
      view.dispatch({
        effects: tsCompartment.reconfigure([
          tsFacet.of({ env: environment, path: pathRef.current }),
          tsSync(),
          tsLinter(),
          autocompletion({ override: [tsAutocomplete()] }),
          tsHover(),
        ]),
      });
    });

    return () => {
      cancelled = true;
      viewRef.current = null;
      view.destroy();
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

  // Mount/refresh provider type files.
  React.useEffect(() => {
    if (!extraFiles) return;
    void loadTsEnvironment().then((environment) => {
      for (const [path, content] of Object.entries(extraFiles)) {
        upsertFile(environment, path, content);
      }
    });
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
