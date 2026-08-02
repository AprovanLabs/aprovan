/**
 * Credentials panel — workspace credential CRUD in the product app (ux.md).
 */

import { KeyRound, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  PanelEmpty,
  PanelError,
  PanelLoading,
  PanelShell,
  type NativePanelProps,
} from "./shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  GatewayError,
  addCredential,
  deleteCredential,
  listCredentials,
  type CredentialRecord,
} from "@/lib/credentials";

const TYPE_LABELS: Record<string, string> = {
  bearer_token: "Bearer Token",
  api_key: "API Key",
  oauth2_client: "OAuth2 Client",
  oauth2_authcode: "OAuth2 Auth Code",
};

export function CredentialsPanel(_props: NativePanelProps) {
  const [records, setRecords] = useState<CredentialRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [provider, setProvider] = useState("");
  const [token, setToken] = useState("");
  const [revoking, setRevoking] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRecords(await listCredentials());
    } catch (err) {
      setError(err instanceof GatewayError ? err.message : "Failed to load credentials");
      setRecords(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const onAdd = async () => {
    if (!provider.trim() || !token.trim()) return;
    try {
      await addCredential({
        provider: provider.trim(),
        payload: { type: "bearer_token", token: token.trim() },
      });
      setShowAdd(false);
      setProvider("");
      setToken("");
      await load();
    } catch (err) {
      setError(err instanceof GatewayError ? err.message : "Failed to add credential");
    }
  };

  const onRevoke = async (id: string) => {
    setRevoking(id);
    try {
      await deleteCredential(id);
      await load();
    } catch (err) {
      setError(err instanceof GatewayError ? err.message : "Failed to revoke credential");
    } finally {
      setRevoking(null);
    }
  };

  if (loading && !records) {
    return (
      <PanelShell icon={KeyRound} title="Credentials" description="Provider tokens for tool calls">
        <PanelLoading />
      </PanelShell>
    );
  }

  if (error && !records) {
    return (
      <PanelShell icon={KeyRound} title="Credentials" description="Provider tokens for tool calls">
        <PanelError message={error} />
      </PanelShell>
    );
  }

  const items = records ?? [];

  return (
    <PanelShell
      actions={
        <Button onClick={() => setShowAdd((v) => !v)} size="sm" variant="outline">
          <Plus className="size-4" />
          Add
        </Button>
      }
      description="Provider tokens for tool calls"
      icon={KeyRound}
      title="Credentials"
    >
      {error ? <PanelError message={error} /> : null}
      {showAdd ? (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-sm">Add bearer token</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Input onChange={(e) => setProvider(e.target.value)} placeholder="Provider (e.g. github)" value={provider} />
            <Input onChange={(e) => setToken(e.target.value)} placeholder="Token" type="password" value={token} />
            <Button onClick={() => void onAdd()}>Save</Button>
          </CardContent>
        </Card>
      ) : null}
      {items.length === 0 ? (
        <PanelEmpty>No credentials yet — add one to enable provider tools.</PanelEmpty>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((cred) => (
            <Card key={cred.id}>
              <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                <div className="min-w-0">
                  <CardTitle className="truncate text-sm">{cred.label ?? cred.provider}</CardTitle>
                  <p className="font-mono text-xs text-muted-foreground">{cred.provider}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{TYPE_LABELS[cred.type] ?? cred.type}</Badge>
                  <Button
                    aria-label="Revoke"
                    disabled={revoking === cred.id}
                    onClick={() => void onRevoke(cred.id)}
                    size="icon"
                    variant="destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </PanelShell>
  );
}
