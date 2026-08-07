/**
 * Chat-composer voice capture: start/stop via CaptureHandle, live partials,
 * destination disclosure, and inline unavailable reasons. Panel-independent.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CaptureError,
  startCapture,
  wasMicrophonePermissionDenied,
  type CaptureDestination,
  type CaptureHandle,
  type SttEvent,
} from "@/lib/capture";

export type VoiceCaptureStatus =
  | "idle"
  | "listening"
  | "unavailable";

export interface VoiceCaptureState {
  status: VoiceCaptureStatus;
  /** Live partial text while listening (also mirrored into the composer). */
  partialText: string;
  destination: CaptureDestination | null;
  /** Inline reason when voice is unavailable (permission / device / start fail). */
  unavailableReason: string | null;
  /** Non-fatal transcription issue; partial retained for editing. */
  transcriptNotice: string | null;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  cancel: () => Promise<void>;
}

/**
 * Drive `startCapture` for the chat composer. Partials update `onPartial`
 * (composer value) live; stop seeds a final transcript; cancel discards.
 */
export function useVoiceCapture({
  model,
  disabled,
  onPartial,
  onFinal,
  onDiscard,
}: {
  model?: string | null;
  disabled?: boolean;
  /** Called when a live partial arrives (and on clear when capture ends). */
  onPartial: (text: string) => void;
  /** Called with the terminal transcript after an explicit stop. */
  onFinal: (text: string) => void;
  /** Called when capture is cancelled — restore prior composer text. */
  onDiscard: () => void;
}): VoiceCaptureState {
  const [status, setStatus] = useState<VoiceCaptureStatus>(() =>
    wasMicrophonePermissionDenied() ? "unavailable" : "idle",
  );
  const [partialText, setPartialText] = useState("");
  const [destination, setDestination] = useState<CaptureDestination | null>(null);
  const [unavailableReason, setUnavailableReason] = useState<string | null>(() =>
    wasMicrophonePermissionDenied()
      ? "Microphone permission denied. Voice input is unavailable until permission is granted in system settings."
      : null,
  );
  const [transcriptNotice, setTranscriptNotice] = useState<string | null>(null);

  const handleRef = useRef<CaptureHandle | null>(null);
  const unsubRef = useRef<(() => void) | null>(null);
  const finalsRef = useRef<string[]>([]);
  const startingRef = useRef(false);
  const finalizingRef = useRef(false);
  const onFinalRef = useRef(onFinal);
  const onDiscardRef = useRef(onDiscard);
  onFinalRef.current = onFinal;
  onDiscardRef.current = onDiscard;

  const clearSubscription = useCallback(() => {
    unsubRef.current?.();
    unsubRef.current = null;
  }, []);

  const resetListeningUi = useCallback(() => {
    handleRef.current = null;
    setDestination(null);
    setPartialText("");
    setStatus((prev) => (prev === "unavailable" ? prev : "idle"));
  }, []);

  const applyPartial = useCallback(
    (text: string) => {
      setPartialText(text);
      onPartial(text);
    },
    [onPartial],
  );

  const finalizeStop = useCallback(
    async (mode: "stop" | "cancel") => {
      if (finalizingRef.current) return;
      finalizingRef.current = true;
      const handle = handleRef.current;
      clearSubscription();
      handleRef.current = null;
      try {
        if (!handle) return;
        if (mode === "cancel") {
          await handle.cancel();
          resetListeningUi();
          onDiscardRef.current();
          return;
        }
        const result = await handle.stop();
        const text = (result.text || "").trim();
        // Prefer terminal text; fall back to last mirrored partial via state in stop().
        onFinalRef.current(text);
      } catch (err) {
        if (mode === "stop") {
          setTranscriptNotice(
            err instanceof Error
              ? err.message
              : "Transcription ended with an error — edit the draft or try again.",
          );
        }
      } finally {
        resetListeningUi();
        finalizingRef.current = false;
      }
    },
    [clearSubscription, resetListeningUi],
  );

  const onEvent = useCallback(
    (event: SttEvent) => {
      if (event.type === "partial") {
        const composed = [...finalsRef.current, event.data.text]
          .filter(Boolean)
          .join(" ")
          .trim();
        applyPartial(composed || event.data.text);
        return;
      }
      if (event.type === "final") {
        finalsRef.current = [...finalsRef.current, event.data.segment.text].filter(
          Boolean,
        );
        const composed = finalsRef.current.join(" ").trim();
        applyPartial(composed);
        return;
      }
      if (event.type === "speech-end") {
        // Provider-signalled end — same path as explicit stop (D6).
        void (async () => {
          if (finalizingRef.current) return;
          finalizingRef.current = true;
          const handle = handleRef.current;
          clearSubscription();
          handleRef.current = null;
          try {
            const result = await handle?.stop();
            const text = (result?.text ?? "").trim();
            if (text) onFinalRef.current(text);
            else {
              // Keep whatever partial was already mirrored into the composer.
            }
          } catch (err) {
            setTranscriptNotice(
              err instanceof Error
                ? err.message
                : "Transcription ended with an error — edit the draft or try again.",
            );
          } finally {
            resetListeningUi();
            finalizingRef.current = false;
          }
        })();
        return;
      }
      if (event.type === "error") {
        // Retain editable partial rather than discarding (ux failure path).
        setTranscriptNotice(
          event.data.message || "Transcription failed — edit the draft or try again.",
        );
        if (!event.data.retryable) {
          void (async () => {
            if (finalizingRef.current) return;
            finalizingRef.current = true;
            const handle = handleRef.current;
            clearSubscription();
            handleRef.current = null;
            try {
              await handle?.stop();
            } catch {
              // already closed
            } finally {
              resetListeningUi();
              finalizingRef.current = false;
            }
          })();
        }
      }
    },
    [applyPartial, clearSubscription, resetListeningUi],
  );

  const start = useCallback(async () => {
    if (disabled || startingRef.current || status === "listening") return;
    if (wasMicrophonePermissionDenied()) {
      setStatus("unavailable");
      setUnavailableReason(
        "Microphone permission denied. Voice input is unavailable until permission is granted in system settings.",
      );
      return;
    }

    startingRef.current = true;
    setTranscriptNotice(null);
    finalsRef.current = [];
    finalizingRef.current = false;
    try {
      const handle = await startCapture(model ? { model } : undefined);
      handleRef.current = handle;
      setDestination(handle.destination);
      setStatus("listening");
      applyPartial("");
      unsubRef.current = handle.onEvent(onEvent);
    } catch (err) {
      if (err instanceof CaptureError) {
        if (err.code === "permission-denied" || err.code === "device-missing") {
          setStatus("unavailable");
          setUnavailableReason(err.message);
          return;
        }
        setTranscriptNotice(err.message);
        setStatus("idle");
        return;
      }
      setTranscriptNotice(
        err instanceof Error ? err.message : "Could not start voice capture",
      );
      setStatus("idle");
    } finally {
      startingRef.current = false;
    }
  }, [applyPartial, disabled, model, onEvent, status]);

  const stop = useCallback(async () => {
    if (finalizingRef.current) return;
    finalizingRef.current = true;
    const handle = handleRef.current;
    const lastPartial = partialText;
    clearSubscription();
    handleRef.current = null;
    try {
      if (!handle) return;
      const result = await handle.stop();
      const text = (result.text || lastPartial).trim();
      onFinalRef.current(text);
    } catch (err) {
      setTranscriptNotice(
        err instanceof Error
          ? err.message
          : "Transcription ended with an error — edit the draft or try again.",
      );
      onFinalRef.current(lastPartial.trim());
    } finally {
      resetListeningUi();
      finalizingRef.current = false;
    }
  }, [clearSubscription, partialText, resetListeningUi]);

  const cancel = useCallback(async () => {
    await finalizeStop("cancel");
  }, [finalizeStop]);

  // Tear down on unmount so the mic never stays open after leaving chat.
  useEffect(() => {
    return () => {
      clearSubscription();
      const handle = handleRef.current;
      handleRef.current = null;
      if (handle) void handle.cancel().catch(() => {});
    };
  }, [clearSubscription]);

  return {
    status,
    partialText,
    destination,
    unavailableReason,
    transcriptNotice,
    start,
    stop,
    cancel,
  };
}
