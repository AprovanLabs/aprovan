/**
 * Mic control + destination disclosure for the chat composer (stream 4).
 * Capture itself lives in `@/lib/capture` — this only hosts the UI.
 */

import { useState } from "react";
import { Loader2, Mic, MicOff, Square, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VoiceCaptureState } from "./useVoiceCapture";

export function VoiceDestinationBanner({
  voice,
}: {
  voice: Pick<VoiceCaptureState, "status" | "destination">;
}) {
  if (voice.status !== "listening" || !voice.destination) return null;
  return (
    <div
      className="px-3 py-1.5 text-xs rounded-md border bg-muted/40 text-muted-foreground flex items-center gap-2"
      role="status"
      aria-live="polite"
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
          voice.destination.local ? "bg-emerald-500" : "bg-amber-500"
        }`}
        aria-hidden
      />
      <span>{voice.destination.disclosure}</span>
    </div>
  );
}

export function VoiceStatusBanners({
  voice,
}: {
  voice: Pick<
    VoiceCaptureState,
    "status" | "unavailableReason" | "transcriptNotice"
  >;
}) {
  return (
    <>
      {voice.status === "unavailable" && voice.unavailableReason && (
        <div className="px-3 py-2 text-xs rounded-md border border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 flex items-center gap-2">
          <MicOff className="h-3.5 w-3.5 shrink-0" />
          <span>{voice.unavailableReason} Typing still works.</span>
        </div>
      )}
      {voice.transcriptNotice && (
        <div className="px-3 py-2 text-xs rounded-md border border-destructive/40 bg-destructive/10 text-destructive flex items-center gap-2">
          <span className="flex-1">{voice.transcriptNotice}</span>
        </div>
      )}
    </>
  );
}

export function VoiceCaptureControls({
  voice,
  disabled,
}: {
  voice: VoiceCaptureState;
  disabled?: boolean;
}) {
  const listening = voice.status === "listening";
  const unavailable = voice.status === "unavailable";
  const [pending, setPending] = useState(false);

  const run = async (fn: () => Promise<void>) => {
    setPending(true);
    try {
      await fn();
    } finally {
      setPending(false);
    }
  };

  if (listening) {
    return (
      <div className="flex shrink-0 gap-1">
        <Button
          type="button"
          variant="outline"
          className="shrink-0"
          disabled={pending || disabled}
          title="Discard transcript"
          aria-label="Discard voice transcript"
          onClick={() => void run(voice.cancel)}
        >
          <X className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="shrink-0"
          disabled={pending || disabled}
          title="Stop listening"
          aria-label="Stop listening"
          onClick={() => void run(voice.stop)}
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Square className="h-4 w-4" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="shrink-0"
      disabled={pending || disabled || unavailable}
      title={
        unavailable
          ? (voice.unavailableReason ?? "Voice unavailable")
          : "Dictate with voice"
      }
      aria-label="Start voice capture"
      onClick={() => void run(voice.start)}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : unavailable ? (
        <MicOff className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
}
