import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import {
  isNativeTabPath,
  nativeTabId,
  UnknownNativeSurface,
  unknownNativeNotice,
} from "./UnknownNativeSurface";

describe("unknown native tab fallback", () => {
  it("detects native:// paths and extracts the surface id", () => {
    expect(isNativeTabPath("native://playground")).toBe(true);
    expect(isNativeTabPath("native://gone")).toBe(true);
    expect(isNativeTabPath("app://demo")).toBe(false);
    expect(nativeTabId("native://playground")).toBe("playground");
    expect(nativeTabId("native://gone")).toBe("gone");
  });

  it("playground notice includes the catalog playground link", () => {
    const notice = unknownNativeNotice("playground");
    expect(notice.body).toMatch(/registry catalog/i);
    expect(notice.catalogHref).toMatch(/\/playground$/);

    const html = renderToStaticMarkup(
      createElement(UnknownNativeSurface, {
        path: "native://playground",
        onClose: () => undefined,
      }),
    );
    expect(html).toContain("The playground now lives in the registry catalog");
    expect(html).toContain("Open catalog playground");
    expect(html).toMatch(/href="[^"]*\/playground"/);
    expect(html).toContain("Close tab");
  });

  it("unknown native ids render a notice without the playground link", () => {
    const notice = unknownNativeNotice("never-existed");
    expect(notice.catalogHref).toBeUndefined();
    expect(notice.body).toContain("never-existed");

    const html = renderToStaticMarkup(
      createElement(UnknownNativeSurface, {
        path: "native://never-existed",
        onClose: () => undefined,
      }),
    );
    expect(html).toContain("Surface unavailable");
    expect(html).toContain("never-existed");
    expect(html).not.toContain("Open catalog playground");
    expect(html).toContain("Close tab");
  });
});
