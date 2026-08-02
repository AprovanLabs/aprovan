import { CodeBlockView, MarkdownPreview } from "@aprovan/patchwork-editor";
import { resolveRenderer } from "@aprovan/registry-ui/renderers";
import { WorkspaceFilePreview } from "@/components/WorkspaceFilePreview";

/**
 * A fenced block that is NOT widget source — JSON, YAML, markdown, config,
 * arbitrary snippets. Registered renderers (JSON tree, workflow flow, …) get
 * first pick, markdown renders as prose, and anything else is
 * syntax-highlighted under the fence's own language. Never compiled.
 */
export function ChatArtifactBlock({
  content,
  language,
  path,
}: {
  content: string;
  language?: string;
  path?: string;
}) {
  const isMarkdown =
    language === "md" || language === "markdown" || (path ?? "").endsWith(".md");
  // A pathless JSON fence still deserves the JSON tree — give the renderer
  // registry a representative path to match on.
  const rendererPath = path ?? (language === "json" ? "artifact.json" : undefined);

  let body: React.ReactNode;
  if (isMarkdown) {
    body = (
      <div className="p-3 prose prose-sm dark:prose-invert max-w-none">
        <MarkdownPreview value={content} />
      </div>
    );
  } else if (resolveRenderer({ path: rendererPath, content })) {
    body = <WorkspaceFilePreview code={content} filePath={rendererPath} />;
  } else {
    body = <CodeBlockView content={content} language={language ?? null} />;
  }

  return (
    <div className="not-prose my-2 border rounded-lg overflow-hidden min-w-0">
      {(path || language) && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 border-b text-xs text-muted-foreground">
          {path ? <span className="font-mono">{path}</span> : <span>{language}</span>}
        </div>
      )}
      <div className="bg-muted/30 overflow-auto max-h-[60vh]">{body}</div>
    </div>
  );
}
