/**
 * SES email helper for workspace invites.
 *
 * Controlled by two env vars:
 *   GATEWAY_SES_FROM_EMAIL   — verified SES sender address; when unset the
 *                              email is NOT sent and the link is logged to
 *                              stderr instead (dev / test mode).
 *   GATEWAY_REGISTRY_BASE_URL — base URL for the registry app (default
 *                              http://localhost:3000); used to build the
 *                              magic-link URL.
 */

import type { SESClient } from "@aws-sdk/client-ses";

type Ses = typeof import("@aws-sdk/client-ses") & { client: SESClient };

let _ses: Promise<Ses> | undefined;

/**
 * Loaded on demand: without `GATEWAY_SES_FROM_EMAIL` no invite ever reaches
 * SES, so local mode never touches the SDK — and must not pay for it (see
 * db/client.ts).
 */
function ses(): Promise<Ses> {
  _ses ??= import("@aws-sdk/client-ses").then((mod) => ({
    ...mod,
    client: new mod.SESClient({
      region:
        process.env["GATEWAY_AWS_REGION"] ??
        process.env["AWS_REGION"] ??
        "us-east-1",
    }),
  }));
  return _ses;
}

/**
 * Inject a SES client double (tests). The command classes still come from the
 * real module — only the transport is replaced.
 */
export function setSesClient(c: SESClient | undefined): void {
  _ses =
    c === undefined
      ? undefined
      : import("@aws-sdk/client-ses").then((mod) => ({ ...mod, client: c }));
}

/** Reset the cached SES client (tests). */
export function resetSesClient(): void {
  _ses = undefined;
}

const FROM_EMAIL = (): string | undefined => process.env["GATEWAY_SES_FROM_EMAIL"];
const REGISTRY_BASE = (): string =>
  (process.env["GATEWAY_REGISTRY_BASE_URL"] ?? "http://localhost:3000").replace(/\/$/, "");

/**
 * Send a workspace invite email containing the magic-link token.
 *
 * When `GATEWAY_SES_FROM_EMAIL` is unset (dev / test) the email is skipped and
 * the token is written to stderr so developers can accept invites locally.
 */
export async function sendInviteEmail(opts: {
  toEmail: string;
  inviteToken: string;
  workspaceName?: string;
  invitedByEmail?: string;
}): Promise<void> {
  const { toEmail, inviteToken, workspaceName, invitedByEmail } = opts;
  const inviteUrl = `${REGISTRY_BASE()}/invite?token=${inviteToken}`;

  const from = FROM_EMAIL();
  if (!from) {
    process.stderr.write(
      `[gateway] invite (dev): to=${toEmail} url=${inviteUrl}\n`,
    );
    return;
  }

  const workspaceLabel = workspaceName ? ` to "${workspaceName}"` : "";
  const inviterLabel = invitedByEmail ? ` by ${invitedByEmail}` : "";

  const { client, SendEmailCommand } = await ses();
  await client.send(
    new SendEmailCommand({
      Source: from,
      Destination: { ToAddresses: [toEmail] },
      Message: {
        Subject: {
          Data: `You've been invited${workspaceLabel}`,
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: [
              `You've been invited${workspaceLabel}${inviterLabel}.`,
              "",
              `Accept your invitation:`,
              inviteUrl,
              "",
              "This link expires in 7 days.",
            ].join("\n"),
            Charset: "UTF-8",
          },
        },
      },
    }),
  );
}
