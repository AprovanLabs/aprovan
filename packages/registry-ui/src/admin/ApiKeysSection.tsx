import type { GatewayClient } from "@aprovan/registry-main";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@aprovan/ui";
import { useCallback, useEffect, useState } from "react";
import { listApiKeys, mintApiKey, revokeApiKey } from "./api";
import type { ApiKey } from "./types";

export function ApiKeysSection({
  client,
}: {
  client: GatewayClient;
}): React.ReactElement {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [label, setLabel] = useState("");
  const [plaintext, setPlaintext] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setKeys(await listApiKeys(client));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load API keys");
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleMint(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    setError("");
    try {
      const result = await mintApiKey(client, {
        ...(label.trim() ? { label: label.trim() } : {}),
      });
      setPlaintext(result.plaintext);
      setLabel("");
      setKeys((prev) => [result.key, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mint API key");
    }
  }

  async function handleRevoke(key: ApiKey): Promise<void> {
    const name = key.label ?? key.id;
    if (!confirm(`Revoke API key "${name}"? This cannot be undone.`)) return;
    try {
      await revokeApiKey(client, key.id);
      setKeys((prev) =>
        prev.map((k) =>
          k.id === key.id ? { ...k, revokedAt: new Date().toISOString() } : k,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to revoke API key");
    }
  }

  const active = keys.filter((k) => !k.revokedAt);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">API keys</h3>
        <Button onClick={() => void load()} size="sm" variant="outline">
          Refresh
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {plaintext && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Copy your new API key</CardTitle>
            <CardDescription>
              You won&apos;t see this again. Store it somewhere safe before closing.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <code className="break-all rounded border bg-muted/40 px-3 py-2 font-mono text-xs">
              {plaintext}
            </code>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => void navigator.clipboard.writeText(plaintext)}
                size="sm"
                type="button"
              >
                Copy
              </Button>
              <Button onClick={() => setPlaintext(null)} size="sm" variant="outline" type="button">
                Dismiss
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Mint API key</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-wrap items-end gap-3" onSubmit={(e) => void handleMint(e)}>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">Label (optional)</span>
              <Input onChange={(e) => setLabel(e.target.value)} value={label} />
            </label>
            <Button type="submit">Mint</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading && <p className="px-4 py-3 text-sm text-muted-foreground">Loading…</p>}
          {!loading && active.length === 0 && (
            <p className="px-4 py-3 text-sm text-muted-foreground">No API keys</p>
          )}
          {active.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-xs text-muted-foreground">
                    <th className="pb-2 pl-4 pt-3 text-left font-medium">Label</th>
                    <th className="pb-2 pr-4 pt-3 text-left font-medium">Id</th>
                    <th className="pb-2 pr-4 pt-3 text-left font-medium">Created</th>
                    <th className="pb-2 pr-4 pt-3" />
                  </tr>
                </thead>
                <tbody>
                  {active.map((k) => (
                    <tr className="border-b last:border-0" key={k.id}>
                      <td className="py-2 pl-4">{k.label ?? "—"}</td>
                      <td className="py-2 pr-4 font-mono text-xs">{k.id}</td>
                      <td className="py-2 pr-4 text-xs text-muted-foreground">
                        {new Date(k.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 pr-4">
                        <Button
                          onClick={() => void handleRevoke(k)}
                          size="sm"
                          variant="destructive"
                        >
                          Revoke
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
