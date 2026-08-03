import type { GatewayClient } from "@aprovan/registry-main";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@aprovan/ui";
import { useCallback, useEffect, useState } from "react";
import { listAudit } from "./api";
import type { AuditEntry } from "./types";

const PAGE_SIZE = 50;

export function AuditSection({
  client,
}: {
  client: GatewayClient;
}): React.ReactElement {
  const [rows, setRows] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setRows(await listAudit(client, { limit }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load audit log");
    } finally {
      setLoading(false);
    }
  }, [client, limit]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Audit</h3>
        <Button onClick={() => void load()} size="sm" variant="outline">
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Recent calls</CardTitle>
          <CardDescription>
            {loading ? "Loading…" : `${rows.length} entr${rows.length === 1 ? "y" : "ies"}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {!loading && rows.length === 0 && (
            <p className="text-sm text-muted-foreground">No audit entries yet.</p>
          )}
          {rows.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-xs text-muted-foreground">
                    <th className="pb-2 text-left font-medium">When</th>
                    <th className="pb-2 pr-4 text-left font-medium">Principal</th>
                    <th className="pb-2 pr-4 text-left font-medium">Call</th>
                    <th className="pb-2 pr-4 text-left font-medium">Status</th>
                    <th className="pb-2 text-left font-medium">ms</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr className="border-b last:border-0" key={`${r.requestId}-${r.createdAt}`}>
                      <td className="py-2 text-xs text-muted-foreground">
                        {new Date(r.createdAt).toLocaleString()}
                      </td>
                      <td className="py-2 pr-4 font-mono text-xs">{r.principal}</td>
                      <td className="py-2 pr-4 font-mono text-xs">
                        {r.namespace}.{r.operation}
                      </td>
                      <td className="py-2 pr-4 font-mono text-xs">{r.status}</td>
                      <td className="py-2 text-xs text-muted-foreground">
                        {r.durationMs ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!loading && rows.length >= limit && (
            <div className="pt-3">
              <Button onClick={() => setLimit((n) => n + PAGE_SIZE)} size="sm" variant="outline">
                Load more
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
