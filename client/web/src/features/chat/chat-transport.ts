import { useCallback, useMemo, useRef } from "react";
import { DefaultChatTransport } from "ai";
import { buildEditMessages, type EditTransport, type ServiceInfo } from "@aprovan/patchwork-editor";
import { IMAGE_SPEC } from "@/features/widgets/useCompilerBootstrap";
import { resilientChatFetch } from "@/lib/chat-transport";
import { GATEWAY_BASE } from "@/lib/gateway";
import { runChatCompletionJob } from "@/lib/llm";
import { recentProblemsDigest } from "@/lib/telemetry";

/**
 * Compact per-operation signatures for the system prompt's {{tools}} var —
 * enough for the model to emit correct single-object calls without pasting
 * full JSON schemas. Large providers are capped; the registry.search meta
 * tool covers the tail.
 */
export const TOOL_PROMPT_CAP_PER_NAMESPACE = 40;

export function formatToolSignatures(services: ServiceInfo[]): string {
  const byNamespace = new Map<string, ServiceInfo[]>();
  for (const service of services) {
    const list = byNamespace.get(service.namespace) ?? [];
    list.push(service);
    byNamespace.set(service.namespace, list);
  }
  const lines: string[] = [];
  for (const [namespace, tools] of byNamespace) {
    for (const tool of tools.slice(0, TOOL_PROMPT_CAP_PER_NAMESPACE)) {
      const schema = tool.parameters as
        | { properties?: Record<string, unknown>; required?: string[] }
        | undefined;
      const required = schema?.required ?? [];
      const optional = Object.keys(schema?.properties ?? {}).filter(
        (key) => !required.includes(key)
      );
      const params = [...required, ...optional.map((key) => `${key}?`)].slice(0, 8).join(", ");
      const description = tool.description ? ` — ${tool.description.slice(0, 90)}` : "";
      lines.push(`- ${namespace}.${tool.procedure}({ ${params} })${description}`);
    }
    if (tools.length > TOOL_PROMPT_CAP_PER_NAMESPACE) {
      lines.push(
        `- …${tools.length - TOOL_PROMPT_CAP_PER_NAMESPACE} more ${namespace} operations — discover with registry.search({ q })`
      );
    }
  }
  return lines.join("\n");
}

/**
 * Chat rides the gateway's /llm/:provider/chat — provider aliases resolve
 * to OpenAI-compatible UTDK modules server-side, and the response is the
 * AI SDK UI message stream DefaultChatTransport expects. Provider/model and
 * the prompt-composition inputs are read via refs at send time, so switches
 * apply to the next send even though useChat holds on to the transport
 * instance.
 */
export function useChatTransport(args: {
  chatProviderRef: React.MutableRefObject<string>;
  chatModelRef: React.MutableRefObject<string>;
  imagePromptsRef: React.MutableRefObject<string>;
  namespaces: string[];
  services: ServiceInfo[];
}) {
  const { chatProviderRef, chatModelRef, imagePromptsRef, namespaces, services } = args;

  // Prompt composition inputs, read at send time: per-image runtime prompts
  // (from each image's manifest), the live namespace list, and compact tool
  // signatures so generated calls match the real SDK contract.
  const namespacesRef = useRef<string[]>([]);
  namespacesRef.current = namespaces;
  const servicesRef = useRef<ServiceInfo[]>([]);
  servicesRef.current = services;

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: `${GATEWAY_BASE}/llm/${chatProviderRef.current}/chat`,
        // resilientChatFetch = gatewayFetch (bearer token + OAC payload hash)
        // plus the job-resume wrapper: /chat responses are job-backed
        // (x-llm-job), so a dropped or stalled stream is finished from the
        // server-side job record instead of surfacing a network error.
        fetch: resilientChatFetch,
        prepareSendMessagesRequest: ({ messages }) => ({
          api: `${GATEWAY_BASE}/llm/${chatProviderRef.current}/chat`,
          body: {
            messages,
            ...(chatModelRef.current ? { model: chatModelRef.current } : {}),
            // The wrapper prompt is server-managed (PostHog → WFS fallback);
            // the client only supplies the runtime-derived vars.
            prompt: {
              id: "chat-patchwork-widget",
              vars: {
                images:
                  imagePromptsRef.current || `- \`${IMAGE_SPEC}\` (no runtime prompt published)`,
                namespaces: namespacesRef.current,
                tools:
                  formatToolSignatures(servicesRef.current) ||
                  "(tool list unavailable — stick to the documented native namespaces)",
              },
            },
          },
        }),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return transport;
}

/**
 * Widget edits run through the same gateway LLM as chat (there is no
 * `/api/edit` server): the editor hands us {code, prompt}, we ask the model
 * for search/replace blocks, and the editor applies them. The active
 * provider/model are read at call time via refs.
 *
 * The call streams. A buffered completion held the whole reply until the
 * model finished, so any edit past CloudFront's 60s origin-response timeout
 * came back as a 504 — big widgets hit that routinely. Streaming also lets
 * the edit panel count off blocks as they land instead of sitting idle.
 */
export function useEditTransport(args: {
  chatProviderRef: React.MutableRefObject<string>;
  chatModelRef: React.MutableRefObject<string>;
}): EditTransport {
  const { chatProviderRef, chatModelRef } = args;

  return useCallback<EditTransport>(async (req, onProgress) => {
    const provider = chatProviderRef.current;
    const model = chatModelRef.current;
    // Staged, immediate feedback: the user sees the call chain from the
    // first moment — request sent → model thinking → edits streaming →
    // per-change progress — instead of a silent spinner.
    let blocksSeen = 0;
    let announcedThinking = false;
    let announcedWriting = false;
    onProgress?.(`Asking ${provider}${model ? ` (${model})` : ""}…`);
    return runChatCompletionJob(
      provider,
      {
        messages: buildEditMessages(
          req.code,
          req.prompt,
          req.filePath ? recentProblemsDigest(req.filePath) : undefined,
        ),
        ...(model ? { model } : {}),
      },
      (_delta, full) => {
        if (!onProgress) return;
        if (!announcedWriting) {
          announcedWriting = true;
          onProgress("Writing edits…");
        }
        // Each closing marker is one finished search/replace block.
        const completed = full.split(">>>>>>> REPLACE").length - 1;
        for (; blocksSeen < completed; blocksSeen++) {
          onProgress(`Change ${blocksSeen + 1} drafted`);
        }
      },
      {
        onReasoning: () => {
          if (announcedThinking || !onProgress) return;
          announcedThinking = true;
          onProgress("Thinking through the change…");
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
