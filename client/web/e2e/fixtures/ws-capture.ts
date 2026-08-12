import type { Page } from "@playwright/test";

/** One raw WebSocket frame observed on a page (sent or received). */
export type WsFrame = {
  direction: "sent" | "received";
  /** UTF-8 text when possible; otherwise base64 of binary payload. */
  payload: string;
  url: string;
};

export type WsCapture = {
  /** Frames accumulated since attach (or last {@link WsCapture.clear}). */
  readonly frames: readonly WsFrame[];
  clear: () => void;
  /**
   * Assert that no captured frame matches `predicate` over the test window.
   * Stream 12’s invariant-7 guest-isolation gate uses this.
   */
  assertZeroMatching: (
    predicate: (frame: WsFrame) => boolean,
    message?: string,
  ) => void;
};

function payloadToString(payload: string | Buffer): string {
  if (typeof payload === "string") return payload;
  return payload.toString("utf8");
}

/**
 * Capture raw WebSocket frames on `page` via Playwright’s `page.on("websocket")`.
 * Attach before the page opens its realtime socket.
 */
export function attachWsCapture(page: Page): WsCapture {
  const frames: WsFrame[] = [];

  page.on("websocket", (ws) => {
    const url = ws.url();
    ws.on("framereceived", (event) => {
      frames.push({
        direction: "received",
        payload: payloadToString(event.payload),
        url,
      });
    });
    ws.on("framesent", (event) => {
      frames.push({
        direction: "sent",
        payload: payloadToString(event.payload),
        url,
      });
    });
  });

  return {
    get frames() {
      return frames;
    },
    clear() {
      frames.length = 0;
    },
    assertZeroMatching(predicate, message) {
      const hits = frames.filter(predicate);
      if (hits.length === 0) return;
      const sample = hits
        .slice(0, 3)
        .map((f) => `${f.direction}@${f.url}: ${f.payload.slice(0, 200)}`)
        .join("\n");
      throw new Error(
        message ??
          `Expected zero matching WebSocket frames, got ${hits.length}. Sample:\n${sample}`,
      );
    },
  };
}
