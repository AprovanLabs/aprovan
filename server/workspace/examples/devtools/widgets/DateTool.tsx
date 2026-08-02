import React, { useMemo, useState } from "react";
import { describeInstant, parseInstant } from "../lib/datetime";

const MONO: React.CSSProperties = { fontFamily: "ui-monospace, monospace", fontSize: 13 };

export default function DateTool() {
  const [input, setInput] = useState("");

  const views = useMemo(() => {
    const text = input.trim() || String(Date.now());
    try {
      return { ok: true as const, data: describeInstant(parseInstant(text)) };
    } catch (err) {
      return { ok: false as const, error: err instanceof Error ? err.message : String(err) };
    }
  }, [input]);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <input
        onChange={(e) => setInput(e.target.value)}
        placeholder="Epoch seconds/millis or ISO date — empty = now"
        style={{ ...MONO, padding: 10, borderRadius: 8, border: "1px solid #d4d4d8" }}
        value={input}
      />
      {views.ok ? (
        <div style={{ display: "grid", gap: 4 }}>
          <div style={MONO}>ISO&nbsp;&nbsp;&nbsp;&nbsp;{views.data.iso}</div>
          <div style={MONO}>epoch s&nbsp;&nbsp;{views.data.epochSeconds}</div>
          <div style={MONO}>epoch ms&nbsp;{views.data.epochMillis}</div>
          <table style={{ ...MONO, borderCollapse: "collapse", marginTop: 8 }}>
            <tbody>
              {views.data.zones.map((z) => (
                <tr key={z.zone}>
                  <td style={{ padding: "2px 12px 2px 0", color: "#71717a" }}>{z.zone}</td>
                  <td style={{ padding: "2px 0" }}>{z.display}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ color: "#dc2626", fontSize: 13 }}>{views.error}</p>
      )}
    </div>
  );
}
