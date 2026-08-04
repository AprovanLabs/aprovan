import { Badge } from "@/components/ui/badge";
import { PanelEmpty } from "../shell";
import { formatLlmPin } from "./draft";
import type { AgentProfile } from "./types";
import { promptPreview } from "./utils";

export function ProfileList({
  agents,
  onSelect,
}: {
  agents: AgentProfile[];
  onSelect: (name: string) => void;
}) {
  if (agents.length === 0) {
    return (
      <PanelEmpty>
        Agents are reusable AI workers with their own model, instructions, and permissions.
        Create your first agent to get started.
      </PanelEmpty>
    );
  }

  return (
    <div className="divide-y rounded-md border">
      {agents.map((agent) => {
        const display = agent.title?.trim() || agent.name;
        const preview = promptPreview(agent.prompt);
        return (
          <button
            key={agent.name}
            type="button"
            onClick={() => onSelect(agent.name)}
            className="flex w-full flex-col gap-0.5 px-3 py-2 text-left hover:bg-muted/50"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span className="truncate text-sm font-medium">{display}</span>
              {agent.title?.trim() && agent.title.trim() !== agent.name && (
                <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                  {agent.name}
                </span>
              )}
            </div>
            <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
              {agent.llm ? (
                <Badge variant="secondary" className="shrink-0 px-1.5 py-0 font-mono text-[10px]">
                  {formatLlmPin(agent.llm)}
                </Badge>
              ) : (
                <span className="shrink-0 text-[10px]">No model</span>
              )}
              {preview ? (
                <span className="truncate">{preview}</span>
              ) : (
                <span className="truncate italic">No instructions yet</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
