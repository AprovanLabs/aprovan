import { describe, expect, it } from "vitest";
import {
  buildWidgetMountOptions,
  widgetMountContract,
  WIDGET_IFRAME_SANDBOX,
  WIDGET_MOUNT_MODE,
} from "./widget-mount-contract";

/**
 * Chat's WidgetPreview (`@aprovan/editor`) hardcodes these tokens. Keep the
 * floating panel on the same contract so widgets need no host-specific changes.
 */
const CHAT_WIDGET_PREVIEW_SANDBOX = [
  "allow-scripts",
  "allow-same-origin",
] as const;

describe("widget mount contract — both hosts", () => {
  it.each(["chat", "panel"] as const)(
    "%s host uses iframe mode and identical sandbox",
    (host) => {
      const contract = widgetMountContract(host);
      expect(contract.mode).toBe(WIDGET_MOUNT_MODE);
      expect(contract.mode).toBe("iframe");
      expect(contract.sandbox).toEqual([...WIDGET_IFRAME_SANDBOX]);
      expect(contract.sandbox).toEqual([...CHAT_WIDGET_PREVIEW_SANDBOX]);
    },
  );

  it("panel mount options match chat (no extra privilege)", () => {
    const target = { tagName: "DIV" } as unknown as HTMLElement;
    const chat = buildWidgetMountOptions(target, "chat");
    const panel = buildWidgetMountOptions(target, "panel");
    expect(panel.mode).toBe(chat.mode);
    expect(panel.sandbox).toEqual(chat.sandbox);
    expect(panel.sandbox).not.toContain("allow-top-navigation");
    expect(panel.sandbox).not.toContain("allow-popups");
  });

  it("does not invent a second mount path — shared builder only", () => {
    const target = { tagName: "DIV" } as unknown as HTMLElement;
    const opts = buildWidgetMountOptions(target, "panel", {
      sourcePath: "widgets/demo/main.tsx",
    });
    expect(opts).toEqual({
      target,
      mode: "iframe",
      sandbox: ["allow-scripts", "allow-same-origin"],
      sourcePath: "widgets/demo/main.tsx",
    });
  });
});
