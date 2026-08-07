/**
 * Desktop → gateway env for the Apple on-device chat provider.
 *
 * Catalog entries honor `LLM_<ID>_BASE_URL`; when the macOS helper is ready on
 * an ephemeral loopback port, set `LLM_APPLE_BASE_URL` to that helper's `/v1`.
 */

export const LLM_APPLE_BASE_URL_ENV = "LLM_APPLE_BASE_URL";

/** Map a helper origin (`http://127.0.0.1:<port>`) to the OpenAI-compat root. */
export function appleLlmBaseUrlFromHelperOrigin(helperOrigin: string): string {
  return `${helperOrigin.replace(/\/+$/u, "")}/v1`;
}

/**
 * Env fragment for the gateway child. Empty when the helper is not ready so
 * the catalog keeps its placeholder loopback URL.
 */
export function appleLlmEnvFromHelperOrigin(
  helperOrigin: string | null | undefined,
): NodeJS.ProcessEnv {
  if (!helperOrigin) return {};
  return {
    [LLM_APPLE_BASE_URL_ENV]: appleLlmBaseUrlFromHelperOrigin(helperOrigin),
  };
}
