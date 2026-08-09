import { fetchNamespaces } from "@/lib/namespaces";

/**
 * Bound-provider identity for disclosure while capture is active.
 * Stream 4 renders this; stream 3 only exposes it on the handle.
 */
export interface CaptureDestination {
  /** Provider id receiving audio (e.g. deepgram, aprovan). */
  provider: string;
  /** Human-readable label. */
  label: string;
  /** True when transcription stays on this machine. */
  local: boolean;
  /** Ready-to-show disclosure sentence for the host surface. */
  disclosure: string;
}

/** Known remote STT vendors — everything else is treated as on-device. */
const REMOTE_STT_PROVIDERS = new Set(["deepgram", "assemblyai"]);

export function destinationForProvider(
  provider: string,
  label?: string,
): CaptureDestination {
  const local = !REMOTE_STT_PROVIDERS.has(provider);
  const resolvedLabel =
    label ?? (local ? "This machine" : provider.charAt(0).toUpperCase() + provider.slice(1));
  return {
    provider,
    label: resolvedLabel,
    local,
    disclosure: local
      ? "Transcription is happening on this machine"
      : `Audio is being sent to ${resolvedLabel}`,
  };
}

/**
 * Resolve which stt provider the gateway will bind for `/tools/stt/open`.
 * Falls back to a generic remote-looking label when the catalog is unavailable
 * — the capture path itself stays provider-agnostic either way.
 */
export async function resolveSttDestination(): Promise<CaptureDestination> {
  try {
    const namespaces = await fetchNamespaces();
    const stt = namespaces?.find((n) => n.id === "stt");
    const provider = stt?.binding?.provider;
    if (provider) {
      const compatLabel = stt?.compat?.find((c) => c.provider === provider)?.label;
      return destinationForProvider(provider, compatLabel);
    }
  } catch {
    // Catalog unreachable — still open capture; disclose as local when on desktop.
  }
  return destinationForProvider("stt", "bound speech provider");
}
