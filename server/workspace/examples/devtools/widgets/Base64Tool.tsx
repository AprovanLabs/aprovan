import React, { useMemo, useState } from "react";
import { decodeBase64, decodeBase64Url, encodeBase64, encodeBase64Url } from "../lib/base64";

const AREA: React.CSSProperties = {
  width: "100%",
  minHeight: 120,
  fontFamily: "ui-monospace, monospace",
  fontSize: 13,
  padding: 10,
  borderRadius: 8,
  border: "1px solid #d4d4d8",
  boxSizing: "border-box",
};

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [urlSafe, setUrlSafe] = useState(false);

  const output = useMemo(() => {
    if (!input) return "";
    try {
      if (mode === "encode") return urlSafe ? encodeBase64Url(input) : encodeBase64(input);
      return urlSafe ? decodeBase64Url(input) : decodeBase64(input);
    } catch (err) {
      return `⚠ ${err instanceof Error ? err.message : String(err)}`;
    }
  }, [input, mode, urlSafe]);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <label>
          <input checked={mode === "encode"} onChange={() => setMode("encode")} type="radio" /> Encode
        </label>
        <label>
          <input checked={mode === "decode"} onChange={() => setMode("decode")} type="radio" /> Decode
        </label>
        <label>
          <input checked={urlSafe} onChange={(e) => setUrlSafe(e.target.checked)} type="checkbox" /> URL-safe
        </label>
      </div>
      <textarea
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === "encode" ? "Text to encode…" : "Base64 to decode…"}
        style={AREA}
        value={input}
      />
      <textarea readOnly style={{ ...AREA, background: "#fafafa" }} value={output} />
    </div>
  );
}
