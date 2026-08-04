import { CodeBlockView, MarkdownPreview } from "@aprovan/editor";
import { resolveRenderer } from "@aprovan/registry-ui/renderers";
import { Loader2 } from "lucide-react";
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
  isStreaming = false,
}: {
  content: string;
  language?: string;
  path?: string;
  isStreaming?: boolean;
}) {
  const isMarkdown =
    language === "md" || language === "markdown" || (path ?? "").endsWith(".md");
  const rendererPath = path ?? (language === "json" ? "artifact.json" : undefined);

  let body: React.ReactNode;
  if (isMarkdown) {
    body = (
      <div className="p-3 prose prose-sm dark:prose-invert max-w-none">
        <MarkdownPreview value={content} />
      </div>
    );
  } else if (rendererPath && resolveRenderer({ path: rendererPath, content })) {
    body = <WorkspaceFilePreview code={content} filePath={rendererPath} />;
  } else {
    body = (
      <div className="[&>div]:!h-auto [&>div]:min-h-[4rem]">
        <CodeBlockView content={content || " "} language={language ?? "text"} />
      </div>
    );
  }

  return (
    <div className="not-prose my-2 border rounded-lg overflow-hidden min-w-0">
      {(path || language || isStreaming) && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 border-b text-xs text-muted-foreground">
          {isStreaming && <Loader2 className="h-3 w-3 animate-spin" />}
          {path ? (
            <span className="font-mono">{path}</span>
          ) : language ? (
            <span>{language}</span>
          ) : (
            <span>Generating…</span>
          )}
        </div>
      )}
      <div className="bg-muted/30 overflow-auto max-h-[60vh] min-h-[4rem]">{body}</div>
    </div>
  );
}
