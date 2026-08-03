import { extractCodeBlocks, getFileType, type CodePart } from "@aprovan/patchwork-editor";
import { isWorkflowScript } from "@aprovan/registry-ui/renderers";

const WIDGET_FENCE_LANGUAGES = new Set([
  "tsx",
  "jsx",
  "ts",
  "js",
  "typescript",
  "javascript",
]);

export type VisibleWidgetBlock = {
  content: string;
  language: string;
  attributes?: Record<string, string>;
  unclosed?: boolean;
};

/** Widget-shaped fences lifted out of reasoning/thinking text for visible streaming. */
export function extractVisibleWidgetBlocks(
  text: string,
  options: { includeUnclosed?: boolean } = {},
): VisibleWidgetBlock[] {
  const parts = extractCodeBlocks(text, {
    includeUnclosed: options.includeUnclosed,
    filterLanguages: WIDGET_FENCE_LANGUAGES,
  });
  return parts
    .filter((part): part is CodePart => part.type === "code")
    .map((part) => ({
      content: part.content,
      language: part.language,
      attributes: part.attributes,
      unclosed: part.unclosed,
    }));
}

/** Reasoning prose with widget fences removed so code streams outside Thinking. */
export function stripWidgetFences(text: string): string {
  const parts = extractCodeBlocks(text, {
    includeUnclosed: true,
    filterLanguages: WIDGET_FENCE_LANGUAGES,
  });
  return parts
    .filter((part) => part.type === "text")
    .map((part) => part.content)
    .join("")
    .trim();
}

export function isWidgetFenceLanguage(language?: string): boolean {
  return language !== undefined && WIDGET_FENCE_LANGUAGES.has(language);
}

/** Workflow/script sources must not mount through the widget compiler. */
export function isNonWidgetScript(path: string | undefined, content: string): boolean {
  if (isWorkflowScript(path, content)) return true;
  return /export\s+default\s+async\s+(function|\()/u.test(content);
}

/** Whether a fenced block should compile and mount as a UI widget. */
export function shouldMountAsWidget(
  path: string | undefined,
  language: string | undefined,
  content: string,
): boolean {
  const isWidgetCandidate = path
    ? getFileType(path).category === "compilable"
    : isWidgetFenceLanguage(language);
  if (!isWidgetCandidate) return false;
  return !isNonWidgetScript(path, content);
}
