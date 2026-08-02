import { buildLocalProducedMap } from "./flow-analyzer";
import type { ArgChip, RunOverlay, StepNodeData, ParallelNodeData } from "./node-types";
import type { RunCorrelation } from "./trace";
import type { FlowAnalysis, FlowStep, FocusView } from "./types";
import type { Edge, Node } from "@xyflow/react";

export function methodName(step: FlowStep) {
  const object = step.object ? `${step.object}.` : "";
  const method = step.method ?? "call";
  return `${object}${method}( )`;
}

function resolveOneRef(
  varName: string,
  localProduced: Map<string, number>,
  globalProduced: Map<string, number>,
  inputValues: Map<string, string>,
  stepIndex: number,
): ArgChip {
  const localIdx = localProduced.get(varName);

  if (localIdx === -1) {
    return {
      text: varName,
      relation: "input" as const,
      inputValue: inputValues.get(varName) ?? undefined,
    };
  }

  if (localIdx != null && localIdx < stepIndex) {
    return { text: varName, relation: "local" as const, stepIndex: localIdx + 1 };
  }

  const globalIdx = globalProduced.get(varName);
  if (globalIdx === -1) {
    return {
      text: varName,
      relation: "input" as const,
      inputValue: inputValues.get(varName) ?? undefined,
    };
  }
  if (globalIdx != null) {
    return { text: varName, relation: "outer" as const };
  }

  return { text: varName, relation: null };
}

function resolveArgs(
  rawArgs: FlowStep["args"],
  localProduced: Map<string, number>,
  globalProduced: Map<string, number>,
  inputValues: Map<string, string>,
  stepIndex: number,
): ArgChip[] {
  const chips: ArgChip[] = [];

  for (const arg of rawArgs) {
    if (arg.refVars.length === 0) {
      // Plain literal — show truncated text
      chips.push({ text: arg.text.length > 32 ? arg.text.slice(0, 30) + "…" : arg.text, relation: null });
    } else {
      // One chip per distinct variable reference found in this arg
      for (const varName of arg.refVars) {
        chips.push(resolveOneRef(varName, localProduced, globalProduced, inputValues, stepIndex));
      }
    }
  }

  return chips;
}

export interface BuildGraphOptions {
  analysis: FlowAnalysis;
  current: FocusView;
  inputValues: Map<string, string>;
  onOpen: (stepId: number, label: "then" | "catch" | "finally") => void;
  onOpenCallBranch: (stepId: number, callIndex: number, label: "then" | "catch" | "finally") => void;
  /** Trace overlay; undefined when no run is selected (pure preview). */
  correlation?: RunCorrelation;
  /** FlowStep.ids currently highlighted from the trace side. */
  highlightedStepIds?: ReadonlySet<number>;
}

export function buildGraph({
  analysis,
  current,
  inputValues,
  onOpen,
  onOpenCallBranch,
  correlation,
  highlightedStepIds,
}: BuildGraphOptions): { nodes: Array<Node<StepNodeData | ParallelNodeData>>; edges: Edge[] } {
  const nodes: Array<Node<StepNodeData | ParallelNodeData>> = [];
  const edges: Edge[] = [];

  const localProduced = buildLocalProducedMap(current.steps, analysis.params);
  const stepNodeIds = new Map<number, string>();
  const overlay = (step: FlowStep): RunOverlay | undefined => correlation?.steps.get(step.id);
  const highlighted = (step: FlowStep) => highlightedStepIds?.has(step.id) ?? false;

  for (let index = 0; index < current.steps.length; index += 1) {
    const step = current.steps[index];
    if (!step) continue;
    const nodeId = `step-${step.id}-${index}`;
    stepNodeIds.set(index, nodeId);

    const args = resolveArgs(step.args, localProduced, analysis.produced, inputValues, index);

    if (!step.parallel) {
      nodes.push({
        id: nodeId,
        type: "step",
        position: { x: 80, y: index * 220 + 20 },
        data: {
          stepId: step.id,
          title: methodName(step),
          object: step.object,
          method: step.method,
          description: step.description,
          isAwait: step.isAwait,
          produces: step.produces,
          args,
          nested: step.nested.map((nested) => ({
            label: nested.label,
            count: nested.steps.length,
          })),
          onOpen: (label) => onOpen(step.id, label),
          active: current.fromStepId === step.id,
          highlighted: highlighted(step),
          run: overlay(step),
        },
      });
    } else {
      nodes.push({
        id: nodeId,
        type: "parallel",
        position: { x: 80, y: index * 220 + 20 },
        data: {
          stepId: step.id,
          title: "Promise.all",
          description: step.description,
          calls: step.calls.map((call) => ({
            name: methodName(call),
            description: call.description,
            args: resolveArgs(call.args, localProduced, analysis.produced, inputValues, index),
            nested: call.nested.map((nested) => ({
              label: nested.label,
              count: nested.steps.length,
            })),
            run: overlay(call),
          })),
          onOpenCallBranch: (callIndex, label) => onOpenCallBranch(step.id, callIndex, label),
          active: current.fromStepId === step.id,
          highlighted: highlighted(step) || step.calls.some(highlighted),
          run: overlay(step),
        },
      });
    }

    if (index > 0) {
      const prevNodeId = stepNodeIds.get(index - 1);
      if (prevNodeId) {
        edges.push({
          id: `${prevNodeId}-${nodeId}`,
          source: prevNodeId,
          target: nodeId,
          animated: true,
        });
      }
    }

    // Dependency edges for local var refs
    const depVars: string[] = [];
    for (const arg of step.args) {
      for (const varName of arg.refVars) {
        const depIndex = localProduced.get(varName);
        if (depIndex == null || depIndex < 0 || depIndex >= index) continue;
        if (!depVars.includes(varName)) depVars.push(varName);
      }
    }
    for (const variableName of depVars) {
      const sourceIndex = localProduced.get(variableName);
      if (sourceIndex == null) continue;
      const sourceId = stepNodeIds.get(sourceIndex);
      if (!sourceId) continue;
      edges.push({
        id: `${sourceId}-${nodeId}-${variableName}`,
        source: sourceId,
        target: nodeId,
        label: variableName,
        style: { strokeDasharray: "5 4" },
      });
    }
  }

  return { nodes, edges };
}
