import { afterEach, describe, expect, it } from "vitest";
import {
  DEFAULT_CDN_BASE,
  formatUnresolvedDependencyError,
  getCdnBaseUrl,
  helperEsmBaseUrl,
  setCdnBaseUrl,
  toEsmShUrl,
} from "../cdn-config.js";

describe("cdn-config helper seam", () => {
  afterEach(() => {
    setCdnBaseUrl(DEFAULT_CDN_BASE);
  });

  it("helperEsmBaseUrl appends /esm for setCdnBaseUrl", () => {
    expect(helperEsmBaseUrl("http://127.0.0.1:4242")).toBe(
      "http://127.0.0.1:4242/esm",
    );
    expect(helperEsmBaseUrl("http://127.0.0.1:4242/")).toBe(
      "http://127.0.0.1:4242/esm",
    );
  });

  it("setCdnBaseUrl points toEsmShUrl at the helper when configured", () => {
    setCdnBaseUrl(helperEsmBaseUrl("http://127.0.0.1:9"));
    expect(getCdnBaseUrl()).toBe("http://127.0.0.1:9/esm");
    expect(toEsmShUrl("react", "18")).toBe("http://127.0.0.1:9/esm/react@18");
  });

  it("leaves the public default in place until overridden", () => {
    expect(getCdnBaseUrl()).toBe(DEFAULT_CDN_BASE);
    expect(toEsmShUrl("clsx", "2.0.0")).toBe("https://esm.sh/clsx@2.0.0");
  });

  it("names an unresolvable dependency", () => {
    expect(formatUnresolvedDependencyError("left-pad@1.3.0")).toBe(
      "Unresolvable dependency: left-pad@1.3.0",
    );
  });

  it("keeps version in the specifier — different versions are distinct URLs", () => {
    expect(toEsmShUrl("lodash", "4.17.21")).not.toBe(
      toEsmShUrl("lodash", "4.17.20"),
    );
  });
});
