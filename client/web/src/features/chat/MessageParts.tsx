import { useContext, useMemo } from "react";
import { extractCodeBlocks } from "@aprovan/editor";
import { AlertCircle, Brain, ChevronDown, Loader2, Wrench } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { UIMessage } from "ai";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { WidgetErrorReporterCtx } from "@/contexts";
import {
  extractVisibleWidgetBlocks,
  shouldMountAsWidget,
  stripWidgetFences,
} from "@/features/chat/widget-fences";
import { ChatArtifactBlock } from "@/features/widgets/ChatArtifactBlock";
import { ChatWidgetArtifact } from "@/features/widgets/ChatWidgetArtifact";
import { isImplicitRootMain } from "@/features/widgets/suggest-artifact-path";

export const APROVAN_LOGO =
  "https://raw.githubusercontent.com/AprovanLabs/aprovan.com/main/docs/assets/social-labs.png";

export function ReasoningPart({ text, isStreaming }: { text: string; isStreaming?: boolean }) {
  const widgetBlocks = useMemo(
    () => extractVisibleWidgetBlocks(text, { includeUnclosed: isStreaming }),
    [text, isStreaming],
  );
  const thinkingText = useMemo(() => stripWidgetFences(text), [text]);

  return (
    <>
      {widgetBlocks.map((block, index) => {
        const rawPath = block.attributes?.path;
        const path =
          rawPath && !isImplicitRootMain(rawPath) ? rawPath : undefined;
        if (!shouldMountAsWidget(path, block.language, block.content)) {
          return (
            <ChatArtifactBlock
              key={`reasoning-widget-${index}`}
              content={block.content}
              language={block.language}
              path={path ?? rawPath}
              isStreaming={Boolean(block.unclosed)}
            />
          );
        }
        return (
          <ChatWidgetArtifact
            key={`reasoning-widget-${index}`}
            content={block.content}
            language={block.language}
            path={path}
            titleHint={block.attributes?.title}
            isStreaming={Boolean(block.unclosed)}
          />
        );
      })}
      {thinkingText && (
        <Collapsible defaultOpen={isStreaming}>
          <CollapsibleTrigger className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400 hover:opacity-80 w-full">
            <Brain className="h-4 w-4" />
            <span className="text-xs font-medium">Thinking</span>
            {isStreaming && <Loader2 className="h-3 w-3 animate-spin" />}
            <ChevronDown className="h-3 w-3 ml-auto transition-transform [[data-state=open]>&]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2 p-3 rounded border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/50">
              <p className="text-sm text-muted-foreground italic whitespace-pre-wrap">
                {thinkingText}
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </>
  );
}

export function ToolPart({
  toolName,
  state,
  input,
  output,
  errorText,
}: {
  toolName: string;
  state: string;
  input: unknown;
  output?: unknown;
  errorText?: string;
}) {
  const isRunning = state === "input-streaming" || state === "input-available";
  const hasError = state === "output-error";

  return (
    <Collapsible className="my-1 w-full">
      <CollapsibleTrigger className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/50 hover:bg-muted text-xs transition-colors">
        <Wrench className="h-3 w-3 text-muted-foreground" />
        <span className="font-mono">{toolName}</span>
        <span className="w-3 h-3 flex items-center justify-center">
          {isRunning && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
          {hasError && <AlertCircle className="h-3 w-3 text-destructive" />}
        </span>
        <ChevronDown className="h-3 w-3 text-muted-foreground transition-transform [[data-state=open]>&]:rotate-180" />
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-2 p-3 rounded-lg border bg-card space-y-2">
        {input !== undefined && (
          <div>
            <span className="text-xs font-medium text-muted-foreground">Input</span>
            <div className="mt-1 p-2 bg-muted/30 rounded text-xs overflow-auto max-h-48">
              <pre className="whitespace-pre-wrap break-words m-0">
                {typeof input === "string" ? input : JSON.stringify(input, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {output !== undefined && (
          <div>
            <span className="text-xs font-medium text-muted-foreground">Output</span>
            <div className="mt-1 p-2 bg-muted/30 rounded text-xs overflow-auto max-h-48">
              <pre className="whitespace-pre-wrap break-words m-0">
                {typeof output === "string" ? output : JSON.stringify(output, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {errorText && (
          <div className="text-sm text-destructive flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span className="break-words">{errorText}</span>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const isStreaming = message.parts?.some(
    (p) => "state" in p && (p.state === "input-streaming" || p.state === "input-available"),
  );

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <img src={APROVAN_LOGO} alt="Assistant" className="rounded-full" />
          <AvatarFallback className="bg-primary text-primary-foreground">A</AvatarFallback>
        </Avatar>
      )}

      <div
        className={`flex flex-col gap-1 max-w-[92%] sm:max-w-[80%] min-w-0 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div className="flex items-center gap-2 h-5">
          <span className="text-xs text-muted-foreground capitalize">{message.role}</span>
          {isStreaming && (
            <Badge variant="outline" className="text-xs">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              streaming
            </Badge>
          )}
        </div>

        <div
          className={`rounded-lg px-4 py-2 overflow-hidden w-full ${
            isUser ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          {message.parts?.map((part, i) => {
            if (part.type === "text") {
              return (
                <TextPartWithSession
                  key={i}
                  text={part.text}
                  isUser={isUser}
                  messageId={message.id}
                />
              );
            }

            if (part.type === "reasoning") {
              return (
                <ReasoningPart key={i} text={part.text} isStreaming={part.state === "streaming"} />
              );
            }

            if (part.type.startsWith("tool-") || part.type === "dynamic-tool") {
              const toolPart = part as {
                type: string;
                toolName?: string;
                toolCallId: string;
                state: string;
                input?: unknown;
                output?: unknown;
                errorText?: string;
              };
              const toolName = toolPart.toolName ?? part.type.replace("tool-", "");
              return (
                <ToolPart
                  key={i}
                  toolName={toolName}
                  state={toolPart.state}
                  input={toolPart.input}
                  output={toolPart.output}
                  errorText={toolPart.errorText}
                />
              );
            }

            return null;
          })}
        </div>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-secondary">U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export function TextPartWithSession({
  text,
  isUser,
  messageId,
}: {
  text: string;
  isUser: boolean;
  messageId?: string;
}) {
  const reportWidgetError = useContext(WidgetErrorReporterCtx);

  if (isUser) {
    return (
      <div className="prose prose-sm prose-invert prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-pre:my-2 prose-code:before:content-none prose-code:after:content-none">
        <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
      </div>
    );
  }

  const parts = extractCodeBlocks(text, { includeUnclosed: true });

  return (
    <div className="prose prose-sm dark:prose-invert prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-pre:my-2 prose-code:before:content-none prose-code:after:content-none">
      {parts.map((part, index) => {
        if (part.type === "code" && (part.language === "patch" || part.language === "diff")) {
          return (
            <Markdown key={index} remarkPlugins={[remarkGfm]}>
              {`\`\`\`diff\n${part.content}\`\`\``}
            </Markdown>
          );
        }

        if (part.type === "code" && part.unclosed) {
          const rawPath = part.attributes?.path;
          const path =
            rawPath && !isImplicitRootMain(rawPath) ? rawPath : undefined;
          const language = part.language || undefined;
          if (shouldMountAsWidget(path, language, part.content)) {
            return (
              <ChatWidgetArtifact
                key={index}
                content={part.content}
                language={language}
                path={path}
                titleHint={part.attributes?.title}
                isStreaming
                onWidgetError={
                  reportWidgetError && messageId
                    ? (error) => reportWidgetError(messageId, { path, error })
                    : undefined
                }
              />
            );
          }
          return (
            <ChatArtifactBlock
              key={index}
              content={part.content}
              language={language}
              path={path ?? rawPath}
              isStreaming
            />
          );
        }

        if (part.type === "code") {
          const rawPath = part.attributes?.path;
          const path =
            rawPath && !isImplicitRootMain(rawPath) ? rawPath : undefined;
          const language = part.language || undefined;
          if (!shouldMountAsWidget(path, language, part.content)) {
            return (
              <ChatArtifactBlock
                key={index}
                content={part.content}
                language={language}
                path={path ?? rawPath}
              />
            );
          }
          return (
            <ChatWidgetArtifact
              key={index}
              content={part.content}
              language={language}
              path={path}
              titleHint={part.attributes?.title}
              onWidgetError={
                reportWidgetError && messageId
                  ? (error) => reportWidgetError(messageId, { path, error })
                  : undefined
              }
            />
          );
        }

        return (
          <Markdown key={index} remarkPlugins={[remarkGfm]}>
            {part.content}
          </Markdown>
        );
      })}
    </div>
  );
}
