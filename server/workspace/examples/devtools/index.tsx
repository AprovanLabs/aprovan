/**
 * Dev Tools — a CyberChef-style static utility page, published as a live
 * app. Deliberately multi-file: domain logic lives in ./lib modules and each
 * tool is its own widget under ./widgets, exercising relative imports across
 * the app bundle. No backend calls at all — publishing infra only.
 */
import React, { useState } from "react";
import Base64Tool from "./widgets/Base64Tool";
import JsonYamlTool from "./widgets/JsonYamlTool";
import DateTool from "./widgets/DateTool";

const TOOLS = [
  { id: "base64", label: "Base64", Component: Base64Tool },
  { id: "jsonyaml", label: "JSON ↔ YAML", Component: JsonYamlTool },
  { id: "datetime", label: "Date / Time zones", Component: DateTool },
] as const;

export default function DevTools() {
  const [active, setActive] = useState<(typeof TOOLS)[number]["id"]>("base64");
  const tool = TOOLS.find((t) => t.id === active)!;

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>Dev Tools</h1>
      <p style={{ color: "#71717a", fontSize: 13, marginTop: 0 }}>
        Everyday encoders and converters — runs entirely in your browser.
      </p>
      <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        {TOOLS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              border: "1px solid #d4d4d8",
              background: t.id === active ? "#18181b" : "#fff",
              color: t.id === active ? "#fff" : "#18181b",
              fontSize: 13,
              cursor: "pointer",
            }}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>
      <tool.Component />
    </div>
  );
}
