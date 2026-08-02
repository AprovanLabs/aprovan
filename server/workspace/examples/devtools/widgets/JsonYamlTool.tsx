import React, { useMemo, useState } from "react";
import { jsonToYaml, yamlToJson } from "../lib/jsonyaml";

const AREA: React.CSSProperties = {
  width: "100%",
  minHeight: 180,
  fontFamily: "ui-monospace, monospace",
  fontSize: 13,
  padding: 10,
  borderRadius: 8,
  border: "1px solid #d4d4d8",
  boxSizing: "border-box",
};

export default function JsonYamlTool() {
  const [input, setInput] = useState('{\n  "name": "devtools",\n  "tags": ["json", "yaml"]\n}');
  const [direction, setDirection] = useState<"json→yaml" | "yaml→json">("json→yaml");

  const output = useMemo(() => {
    if (!input.trim()) return "";
    try {
      if (direction === "json→yaml") return jsonToYaml(JSON.parse(input));
      return JSON.stringify(yamlToJson(input), null, 2);
    } catch (err) {
      return `⚠ ${err instanceof Error ? err.message : String(err)}`;
    }
  }, [input, direction]);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <label>
          <input
            checked={direction === "json→yaml"}
            onChange={() => setDirection("json→yaml")}
            type="radio"
          />{" "}
          JSON → YAML
        </label>
        <label>
          <input
            checked={direction === "yaml→json"}
            onChange={() => setDirection("yaml→json")}
            type="radio"
          />{" "}
          YAML → JSON
        </label>
      </div>
      <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
        <textarea onChange={(e) => setInput(e.target.value)} style={AREA} value={input} />
        <textarea readOnly style={{ ...AREA, background: "#fafafa" }} value={output} />
      </div>
    </div>
  );
}
