import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { ArgBadge, BranchButtons, RunBadge, nodeShellCls } from "./node-parts";
import type { StepNodeData } from "./node-types";

export function StepNode({ data }: NodeProps<Node<StepNodeData>>) {
  return (
    <div
      className={[
        "min-w-[290px] max-w-[360px] rounded-xl border border-border border-l-[3px]",
        "bg-card text-foreground p-[0.7rem] shadow-sm transition-shadow",
        nodeShellCls(data.run, data.highlighted, data.active),
      ].join(" ")}
    >
      <Handle type="target" position={Position.Top} />

      {/* Header */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {data.isAwait && (
          <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[0.58rem] font-bold tracking-widest uppercase text-tailor-block-text border border-tailor-block-border bg-tailor-block-bg">
            async
          </span>
        )}
        {data.object && (
          <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[0.58rem] font-bold tracking-widest uppercase text-tailor-provider-text border border-tailor-provider-border bg-tailor-provider-bg">
            {data.object}
          </span>
        )}
        <span className="font-mono text-[0.84rem] font-bold">{data.method ?? "call"}</span>
        {data.run && (
          <span className="ml-auto">
            <RunBadge run={data.run} />
          </span>
        )}
      </div>

      {/* Description */}
      {data.description && (
        <p className="mt-2 pl-[0.45rem] border-l-2 border-border text-muted-foreground text-[0.75rem] leading-snug">
          {data.description}
        </p>
      )}

      {/* Args */}
      {data.args.length > 0 && (
        <div className="mt-2 flex gap-1.5 flex-wrap">
          {data.args.map((chip, i) => (
            <ArgBadge key={`${chip.text}-${i}`} chip={chip} />
          ))}
        </div>
      )}

      {/* Produces */}
      {data.produces && (
        <div className="mt-2 pt-2 border-t border-border font-mono text-[0.72rem] text-foreground">
          returns{" "}
          <span className="inline-flex items-center rounded-full border border-tailor-var-border bg-tailor-var-bg text-tailor-var-text px-2 py-0.5 text-[0.68rem] ml-1">
            {data.produces}
          </span>
        </div>
      )}

      {/* Run error, when a trace is overlaid */}
      {data.run?.error && (
        <p className="mt-2 pt-2 border-t border-border font-mono text-[0.68rem] leading-snug text-tailor-fail break-words">
          {data.run.error}
        </p>
      )}

      {/* Branch buttons */}
      {data.nested.length > 0 && (
        <div className="mt-2 pt-2 border-t border-border flex gap-1.5 flex-wrap">
          <BranchButtons nested={data.nested} onOpen={data.onOpen} />
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
