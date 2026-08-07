/**
 * `@aprovan/native/stt` — on-device speech-to-text fulfilling `@utdk/stt`.
 *
 * First-party, credentialless. The desktop helper owns the Metal/ggml engine;
 * this module is the in-process `SttDriver` the gateway binds (and the surface
 * the conformance suite runs against). Audio never leaves the process —
 * there is no vendor WebSocket and no remote listen URL.
 */

export {
  LOCAL_STT_CAPABILITIES,
  LOCAL_STT_PROVIDER,
  createLocalClient,
  type LocalSttClientOptions,
} from "./client.js";
export { tools } from "./client.js";
