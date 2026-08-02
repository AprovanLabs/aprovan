import { useAppsCatalog, WorkflowDetail } from "@aprovan/registry-ui/apps-panel";
import { resolveRenderer } from "@aprovan/registry-ui/renderers";
import { WorkspaceFilePreview } from "@/components/WorkspaceFilePreview";
import { invokeAppsTool, invokeWorkflowsTool } from "@/lib/tools";
import { readFile } from "@/lib/workspace-vfs";

// Registry-ui renderers (workflow TailorFlow, JSON tree, …) layered over the
// widget compiler. Unmatched types fall through to the editor defaults.
//
// A file that is a *registered* workflow's script gets more than the static
// renderer: it mounts the same WorkflowDetail (run form + graph + live trace)
// the Apps view uses — previewing a workflow and operating it are one
// surface, not two. Registration is looked up through the shared catalog, so
// this costs no extra fetch; unregistered scripts (and every other renderable
// file) keep the static preview.
export function ChatWorkflowPreview({ code, filePath }: { code: string; filePath?: string }) {
  const catalog = useAppsCatalog();
  const workflow = filePath
    ? catalog.workflows.find((entry) => entry.scriptPath === filePath)
    : undefined;
  if (workflow) {
    return (
      <div className="flex-1 min-h-0 flex flex-col p-2">
        <WorkflowDetail
          name={workflow.name}
          invoke={invokeWorkflowsTool}
          invokeApps={invokeAppsTool}
          loadScript={loadWorkflowScript}
          fill
        />
      </div>
    );
  }
  return <WorkspaceFilePreview code={code} filePath={filePath} />;
}

export const workflowCustomPreview = ({ code, filePath }: { code: string; filePath?: string }) => {
  const input = { path: filePath, content: code };
  if (!resolveRenderer(input)) return null;
  return <ChatWorkflowPreview code={code} filePath={filePath} />;
};

// Reading a workflow's script is what upgrades the shared panel from a bare
// run form to the flow graph with the run painted onto it: the `workflows`
// namespace doesn't serve source, the workspace FS does.
export const loadWorkflowScript = async (path: string): Promise<string | null> =>
  readFile(path).catch(() => null);
