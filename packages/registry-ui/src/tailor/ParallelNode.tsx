import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { ArgBadge, BranchButtons, RunBadge, nodeShellCls } from "./node-parts";
import type { ParallelNodeData } from "./node-types";

export function ParallelNode({ data }: NodeProps<Node<ParallelNodeData>>) {
  return (
    <div
      className={[
        "min-w-[290px] max-w-[420px] rounded-xl border border-border border-l-[3px]",
        "bg-card text-foreground p-[0.7rem] shadow-sm transition-shadow",
        nodeShellCls(data.run, data.highlighted, data.active),
      ].join(" ")}
    >
      <Handle type="target" position={Position.Top} />

      {/* Header */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[0.58rem] font-bold tracking-widest uppercase text-tailor-provider-text border border-tailor-provider-border bg-tailor-provider-bg">
          Promise
        </span>
        <span className="font-mono text-[0.84rem] font-bold">all( )</span>
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

      {/* Parallel lanes */}
      <div
        className="mt-2.5 grid gap-2"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}
      >
        {data.calls.map((call, callIndex) => (
          <div
            key={`${call.name}-${callIndex}`}
            className="rounded-lg border border-border bg-muted/50 p-[0.45rem] flex flex-col gap-1.5"
          >
            <span className="flex items-center gap-1.5 flex-wrap">
              <span className="font-mono text-[0.72rem] text-foreground font-bold">{call.name}</span>
              {call.run && <RunBadge run={call.run} />}
            </span>
            {call.description && (
              <span className="text-[0.72rem] text-muted-foreground">{call.description}</span>
            )}
            {call.args.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {call.args.map((chip, i) => (
                  <ArgBadge key={`${chip.text}-${i}`} chip={chip} />
                ))}
              </div>
            )}
            {call.run?.error && (
              <span className="font-mono text-[0.66rem] leading-snug text-tailor-fail break-words">
                {call.run.error}
              </span>
            )}
            <BranchButtons
              nested={call.nested}
              onOpen={(label) => data.onOpenCallBranch(callIndex, label)}
            />
          </div>
        ))}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
