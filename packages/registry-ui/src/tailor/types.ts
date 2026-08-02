export type FlowArg = {
  /** The full source text of the argument expression */
  text: string;
  /** All distinct variable names referenced inside this arg expression */
  refVars: string[];
};

export type NestedBlock = {
  label: "then" | "catch" | "finally";
  steps: FlowStep[];
};

export type FlowStep = {
  id: number;
  object: string | null;
  method: string | null;
  description: string | null;
  args: FlowArg[];
  produces: string | null;
  isAwait: boolean;
  nested: NestedBlock[];
  parallel: boolean;
  calls: FlowStep[];
};

/** What the source lets us infer about a param's shape — drives the run form. */
export type FlowParamKind = "string" | "number" | "boolean" | "object" | "unknown";

export type FlowParam = {
  name: string;
  /** "unknown" when the signature gives nothing away (no default value). */
  kind: FlowParamKind;
  /** Source text of the default value, when the signature has one. */
  defaultText?: string;
};

export type FlowAnalysis = {
  imports: Array<{ name: string; module: string }>;
  steps: FlowStep[];
  produced: Map<string, number>;
  params: FlowParam[];
  fnName: string | null;
};

export type FocusView = {
  title: string;
  steps: FlowStep[];
  fromStepId: number | null;
};
