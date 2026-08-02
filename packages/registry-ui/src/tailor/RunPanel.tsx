/**
 * RunPanel — the workflow's input surface, derived from the analysed
 * signature: one labelled field per param, typed where the source made the
 * type inferable (`limit = 5` → number, `dryRun = false` → checkbox) and a
 * JSON-or-text field otherwise. Extra keys can be added for scripts whose
 * signature we couldn't read, and a raw-JSON mode is the escape hatch for
 * anything nested.
 *
 * The same values feed the graph's `← input` arg chips, so what you type is
 * visible on the node that consumes it.
 *
 * Without `onRun` this is a read-only preview of the inputs (no host run
 * capability) — exactly how the renderer behaves in a file preview.
 */

import * as React from "react";
import type { FlowParam, FlowParamKind } from "./types";

const FIELD =
  "flex-1 min-w-0 rounded-md border border-border bg-muted/40 px-2 py-1 font-mono text-[0.78rem] text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-ring transition-colors";

const LAST_INPUT_PREFIX = "aprovan.workflow-input:";

export type RunValues = Map<string, string>;

/** Parse one field's text into the value the workflow will receive. */
function coerce(kind: FlowParamKind, raw: string): unknown {
  if (kind === "boolean") return raw === "true";
  if (kind === "number") {
    const value = Number(raw);
    if (!Number.isFinite(value)) throw new Error(`not a number: ${raw}`);
    return value;
  }
  if (kind === "string") return raw;
  // object / unknown — JSON when it parses, plain text otherwise.
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

/**
 * Build the run input from the current field values. Blank fields are
 * omitted so the script's own defaults apply; `undefined` means "run with no
 * input at all".
 */
export function buildRunInput(
  params: FlowParam[],
  values: RunValues,
): Record<string, unknown> | undefined {
  const kinds = new Map(params.map((param) => [param.name, param.kind]));
  const input: Record<string, unknown> = {};
  for (const [name, raw] of values) {
    if (!name.trim()) continue;
    const kind = kinds.get(name) ?? "unknown";
    if (raw === "") continue;
    try {
      input[name] = coerce(kind, raw);
    } catch (error) {
      throw new Error(`${name}: ${error instanceof Error ? error.message : "invalid value"}`);
    }
  }
  return Object.keys(input).length > 0 ? input : undefined;
}

function valuesFromJson(json: string): RunValues | null {
  if (!json.trim()) return new Map();
  try {
    const parsed = JSON.parse(json) as unknown;
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return null;
    return new Map(
      Object.entries(parsed).map(([key, value]) => [
        key,
        typeof value === "string" ? value : JSON.stringify(value),
      ]),
    );
  } catch {
    return null;
  }
}

export interface RunPanelProps {
  /** Analysed signature; empty when the source is unavailable/unparsed. */
  params: FlowParam[];
  values: RunValues;
  onValuesChange: (next: RunValues) => void;
  /** Host-supplied execution. Absent → inputs render as a pure preview. */
  onRun?: (input: unknown) => void | Promise<void>;
  running?: boolean;
  /** Error from the last run attempt. */
  error?: string | null;
  /** Remembers the last input across reloads (e.g. the workflow name). */
  storageKey?: string;
}

export function RunPanel({
  params,
  values,
  onValuesChange,
  onRun,
  running = false,
  error,
  storageKey,
}: RunPanelProps) {
  const [mode, setMode] = React.useState<"fields" | "json">("fields");
  const [raw, setRaw] = React.useState("");
  const [localError, setLocalError] = React.useState<string | null>(null);

  // Seed from the remembered input once, before the user touches anything.
  const seeded = React.useRef(false);
  React.useEffect(() => {
    if (seeded.current || !storageKey || values.size > 0) return;
    seeded.current = true;
    try {
      const remembered = localStorage.getItem(`${LAST_INPUT_PREFIX}${storageKey}`);
      const parsed = remembered ? valuesFromJson(remembered) : null;
      if (parsed?.size) onValuesChange(parsed);
    } catch {
      // Remembering the input is best-effort.
    }
  }, [storageKey, values, onValuesChange]);

  // Params the analysis knows about, then any extra keys the user added.
  const rows = React.useMemo<Array<{ param: FlowParam; extra: boolean }>>(() => {
    const known = new Set(params.map((param) => param.name));
    const extras = [...values.keys()].filter((name) => !known.has(name));
    return [
      ...params.map((param) => ({ param, extra: false })),
      ...extras.map((name) => ({ param: { name, kind: "unknown" as const }, extra: true })),
    ];
  }, [params, values]);

  const setValue = (name: string, value: string) => {
    const next = new Map(values);
    next.set(name, value);
    onValuesChange(next);
  };

  const renameKey = (from: string, to: string) => {
    const next = new Map<string, string>();
    for (const [key, value] of values) next.set(key === from ? to : key, value);
    onValuesChange(next);
  };

  const addField = () => {
    let name = "field";
    for (let n = 2; values.has(name); n += 1) name = `field${n}`;
    setValue(name, "");
  };

  const removeKey = (name: string) => {
    const next = new Map(values);
    next.delete(name);
    onValuesChange(next);
  };

  const toJsonMode = () => {
    try {
      setRaw(JSON.stringify(buildRunInput(params, values) ?? {}, null, 2));
      setLocalError(null);
      setMode("json");
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Invalid input");
    }
  };

  const toFieldMode = () => {
    const parsed = valuesFromJson(raw);
    if (!parsed) {
      setLocalError("Input must be a JSON object");
      return;
    }
    onValuesChange(parsed);
    setLocalError(null);
    setMode("fields");
  };

  const run = () => {
    let input: unknown;
    try {
      if (mode === "json") {
        const text = raw.trim();
        input = text === "" ? undefined : JSON.parse(text);
      } else {
        input = buildRunInput(params, values);
      }
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Invalid input");
      return;
    }
    setLocalError(null);
    if (storageKey) {
      try {
        localStorage.setItem(
          `${LAST_INPUT_PREFIX}${storageKey}`,
          JSON.stringify(input ?? {}),
        );
      } catch {
        // Remembering the input is best-effort.
      }
    }
    void onRun?.(input);
  };

  const shown = localError ?? error;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 px-3.5 py-2 border-b border-border bg-muted/50">
        <span className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-muted-foreground">
          {onRun ? "Run" : "Inputs"}
        </span>
        <button
          className="ml-auto text-[0.68rem] text-muted-foreground underline-offset-2 hover:underline"
          onClick={() => (mode === "fields" ? toJsonMode() : toFieldMode())}
          type="button"
        >
          {mode === "fields" ? "edit as JSON" : "edit as fields"}
        </button>
      </div>

      {mode === "json" ? (
        <textarea
          className={`${FIELD} m-3 w-[calc(100%-1.5rem)] resize-y`}
          onChange={(event) => setRaw(event.target.value)}
          placeholder='{ "key": "value" }'
          rows={5}
          spellCheck={false}
          value={raw}
        />
      ) : (
        <div className="divide-y divide-border">
          {rows.map(({ param, extra }) => (
            <div className="flex items-center gap-2.5 px-3.5 py-1.5" key={param.name}>
              {extra ? (
                <input
                  aria-label="Field name"
                  className="w-[7rem] shrink-0 rounded-md border border-border bg-muted/40 px-2 py-1 font-mono text-[0.76rem] text-tailor-var-input-text outline-none focus:border-ring"
                  onChange={(event) => renameKey(param.name, event.target.value)}
                  spellCheck={false}
                  value={param.name}
                />
              ) : (
                <label
                  className="font-mono text-[0.78rem] font-bold text-tailor-var-input-text min-w-[7rem] shrink-0 truncate"
                  htmlFor={`param-${param.name}`}
                  title={param.defaultText ? `default: ${param.defaultText}` : undefined}
                >
                  {param.name}
                </label>
              )}

              {param.kind === "boolean" ? (
                <label className="flex flex-1 items-center gap-2 text-[0.74rem] text-muted-foreground">
                  <input
                    checked={values.get(param.name) === "true"}
                    id={`param-${param.name}`}
                    onChange={(event) => setValue(param.name, String(event.target.checked))}
                    type="checkbox"
                  />
                  {values.get(param.name) ?? `unset (default ${param.defaultText ?? "false"})`}
                </label>
              ) : (
                <input
                  autoComplete="off"
                  className={FIELD}
                  id={`param-${param.name}`}
                  inputMode={param.kind === "number" ? "numeric" : undefined}
                  onChange={(event) => setValue(param.name, event.target.value)}
                  placeholder={param.defaultText ?? `value for ${param.name}…`}
                  spellCheck={false}
                  type="text"
                  value={values.get(param.name) ?? ""}
                />
              )}

              <span className="w-[3.6rem] shrink-0 text-right text-[0.62rem] uppercase tracking-wider text-muted-foreground">
                {param.kind === "unknown" ? "json" : param.kind}
              </span>
              {extra && (
                <button
                  aria-label={`Remove ${param.name}`}
                  className="px-1 text-muted-foreground hover:text-foreground"
                  onClick={() => removeKey(param.name)}
                  type="button"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {rows.length === 0 ? (
            // A workflow with no declared input is still runnable — say so and
            // keep the optional input tucked away instead of dead-ending on
            // "no inputs found". The JSON editor is one click for anything ad hoc.
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-3.5 py-2">
              <p className="text-[0.74rem] text-muted-foreground">
                {onRun
                  ? "No inputs declared — Run executes with an empty input."
                  : "No inputs declared."}
              </p>
              <button
                className="text-[0.68rem] text-muted-foreground underline-offset-2 hover:underline"
                onClick={toJsonMode}
                type="button"
              >
                add optional JSON input
              </button>
              <button
                className="text-[0.68rem] text-muted-foreground underline-offset-2 hover:underline"
                onClick={addField}
                type="button"
              >
                + add field
              </button>
            </div>
          ) : (
            <div className="px-3.5 py-1.5">
              <button
                className="text-[0.68rem] text-muted-foreground underline-offset-2 hover:underline"
                onClick={addField}
                type="button"
              >
                + add field
              </button>
            </div>
          )}
        </div>
      )}

      {(shown || onRun) && (
        <div className="flex flex-wrap items-center gap-2 border-t border-border px-3.5 py-2">
          {onRun && (
            <button
              className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              disabled={running}
              onClick={run}
              type="button"
            >
              {running ? "Running…" : "Run"}
            </button>
          )}
          {shown && <span className="text-xs text-tailor-fail">{shown}</span>}
        </div>
      )}
    </div>
  );
}
