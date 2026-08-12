import { useCallback } from "react";
import { buildEditMessages, type EditTransport } from "@aprovan/editor";
import { runChatCompletionJob } from "@/lib/llm";
import { recentProblemsDigest } from "@/lib/telemetry";

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
 *
 * IW-9 D stream 9 migrates this off `runChatCompletionJob` / llm-jobs;
 * stream 8 leaves it untouched.
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
