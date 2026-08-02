import type { StepStatus } from "./trace";

export type ArgChip = {
  text: string;
  /** null = plain literal, otherwise what kind of reference */
  relation: "local" | "outer" | "input" | null;
  /** step index (1-based) when relation === "local" */
  stepIndex?: number;
  /** live value when relation === "input" and user has typed something */
  inputValue?: string;
};

/** What a selected run did at this node; absent when nothing is overlaid. */
export type RunOverlay = {
  status: StepStatus;
  durationMs: number;
  error?: string;
};

export type StepNodeData = {
  /** FlowStep.id — the key the trace correlation and hover linking use. */
  stepId: number;
  title: string;
  object: string | null;
  method: string | null;
  description: string | null;
  isAwait: boolean;
  produces: string | null;
  args: ArgChip[];
  nested: Array<{ label: "then" | "catch" | "finally"; count: number }>;
  onOpen: (label: "then" | "catch" | "finally") => void;
  active: boolean;
  /** Highlighted by a hovered/selected span in the trace. */
  highlighted: boolean;
  run?: RunOverlay;
};

export type ParallelNodeData = {
  stepId: number;
  title: string;
  description: string | null;
  calls: Array<{
    name: string;
    description: string | null;
    args: ArgChip[];
    nested: Array<{ label: "then" | "catch" | "finally"; count: number }>;
    run?: RunOverlay;
  }>;
  onOpenCallBranch: (callIndex: number, label: "then" | "catch" | "finally") => void;
  active: boolean;
  highlighted: boolean;
  run?: RunOverlay;
};
