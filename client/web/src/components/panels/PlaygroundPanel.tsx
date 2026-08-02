/**
 * PlaygroundPanel — authenticated in-browser script runner for chat.
 *
 * Reuses the same sandbox + RunView stack as the registry catalog playground,
 * but wires gateway transport through the signed-in workspace session.
 */

import {
  createGatewayTransport,
  instrument,
  runScriptInSandbox,
  withPolicy,
  type RuntimeEvent,
  type SandboxRun,
} from "@aprovan/runtime";
import {
  INITIAL_RUN,
  reduceRunEvent,
  RunView,
  runViewFromRuntimeEvents,
  type RunState,
} from "@aprovan/registry-ui/run-view";
import { TsScriptEditor } from "@aprovan/registry-ui/editor";
import { PlayIcon, SquareIcon, Terminal } from "lucide-react";
import * as React from "react";
import { PanelShell, type NativePanelProps } from "./shell";
import { Button } from "@/components/ui/button";
import { ACTIVE_WORKSPACE_KEY } from "@/features/tabs/useTabs";
import { getAccessTokenSync } from "@/lib/auth";
import { GATEWAY_BASE } from "@/lib/gateway";
import { gatewayFetch } from "@/lib/gateway-fetch";
import { compileScript, SAMPLE_SCRIPT } from "@/lib/playground";

export function PlaygroundPanel(_props: NativePanelProps) {
  const [source, setSource] = React.useState(SAMPLE_SCRIPT);
  const [inputsJson, setInputsJson] = React.useState('{ "username": "octocat" }');
  const [run, setRun] = React.useState<RunState>(INITIAL_RUN);
  const [compileError, setCompileError] = React.useState<string | null>(null);
  const sandboxRef = React.useRef<SandboxRun | null>(null);

  React.useEffect(() => () => sandboxRef.current?.dispose(), []);

  const start = () => {
    let compiled;
    let inputs: Record<string, unknown>;
    try {
      compiled = compileScript(source);
    } catch (error) {
      setCompileError(error instanceof Error ? error.message : String(error));
      return;
    }
    try {
      const parsed: unknown = inputsJson.trim() === "" ? {} : JSON.parse(inputsJson);
      inputs =
        parsed && typeof parsed === "object" && !Array.isArray(parsed)
          ? (parsed as Record<string, unknown>)
          : {};
    } catch {
      setCompileError("Inputs must be a JSON object.");
      return;
    }
    setCompileError(null);
    setRun({ events: [], running: true, startTs: Date.now() });

    const onEvent = (event: RuntimeEvent) => {
      setRun((previous) => reduceRunEvent(previous, event));
    };

    const transport = instrument(
      withPolicy(
        createGatewayTransport({
          baseUrl: GATEWAY_BASE,
          getToken: () => getAccessTokenSync() ?? undefined,
          getWorkspaceId: () => localStorage.getItem(ACTIVE_WORKSPACE_KEY) ?? undefined,
          fetchImpl: gatewayFetch,
        }),
        { retry: { attempts: 3 } },
        {
          onRetry: (info) =>
            onEvent({
              type: "call:retry",
              callId: info.callId ?? "",
              provider: info.provider,
              operation: info.operation,
              attempt: info.attempt,
              delayMs: info.delayMs,
              reason: info.reason,
              ts: Date.now(),
            }),
        },
      ),
      onEvent,
    );

    const sandbox = runScriptInSandbox({
      body: compiled.body,
      dependencies: compiled.dependencies,
      transport,
      inputs,
      onEvent,
    });
    sandbox.result.catch(() => {
      // Failures surface through script:end.
    });
    sandboxRef.current = sandbox;
  };

  const stop = () => sandboxRef.current?.dispose();

  return (
    <PanelShell
      description="Run TypeScript against connected providers with your workspace credentials."
      icon={Terminal}
      title="Playground"
    >
      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-2">
        <div className="flex min-h-0 flex-col gap-3">
          <React.Suspense
            fallback={
              <textarea
                aria-label="Script source"
                className="min-h-[240px] w-full rounded-lg border bg-transparent p-3 font-mono text-sm"
                onChange={(event) => setSource(event.target.value)}
                spellCheck={false}
                value={source}
              />
            }
          >
            <TsScriptEditor
              ariaLabel="Script source"
              className="min-h-[240px] w-full overflow-hidden rounded-lg border"
              onChange={setSource}
              value={source}
            />
          </React.Suspense>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Inputs</span>
            <textarea
              className="w-full rounded-lg border bg-transparent px-3 py-2 font-mono text-sm"
              onChange={(event) => setInputsJson(event.target.value)}
              rows={2}
              spellCheck={false}
              value={inputsJson}
            />
          </label>
          {compileError ? <p className="text-sm text-destructive">{compileError}</p> : null}
          <div className="flex flex-wrap items-center gap-2">
            <Button disabled={run.running} onClick={start} type="button">
              <PlayIcon className="size-3.5" />
              {run.running ? "Running…" : "Run in sandbox"}
            </Button>
            {run.running ? (
              <Button onClick={stop} size="sm" type="button" variant="outline">
                <SquareIcon className="size-3" />
                Stop
              </Button>
            ) : null}
          </div>
        </div>
        <div className="min-h-0 overflow-y-auto rounded-lg border p-3">
          <RunView model={runViewFromRuntimeEvents(run)} />
        </div>
      </div>
    </PanelShell>
  );
}
