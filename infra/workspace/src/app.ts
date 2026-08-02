#!/usr/bin/env node
import "source-map-support/register.js";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { loadAprovanEnv } from "@aprovan/node";
import { namer, resolveEnv } from "@aprovan/cdk";
import * as cdk from "aws-cdk-lib";
import { RegistryApp } from "./stack.js";

const app = new cdk.App();
const { environmentName, env } = resolveEnv();
const names = namer({
  environment: environmentName,
  region: env.region,
  projectId: "registry",
});

const ssm = new SSMClient({ region: env.region });

let sharedEnv: Record<string, string> = {};
try {
  sharedEnv = await loadAprovanEnv(environmentName, { client: ssm });
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.warn(
    `[registry-infra] Could not load /aprovan/${environmentName}/env from SSM: ${message}`,
  );
}

// Registry-owned env overlay. The shared parameter above is rewritten by the
// core stack's AprovanEnvironmentWriter on every core deploy, so anything the
// registry needs that core does not manage (e.g. POSTHOG_* for prompt
// management) lives in its own SecureString parameter and is merged on top.
try {
  const overlay = await ssm.send(
    new GetParameterCommand({
      Name: `/aprovan/${environmentName}/registry/env`,
      WithDecryption: true,
    }),
  );
  if (overlay.Parameter?.Value) {
    for (const line of overlay.Parameter.Value.split("\n")) {
      const eq = line.indexOf("=");
      if (eq > 0 && !line.startsWith("#")) {
        sharedEnv[line.slice(0, eq).trim()] = line.slice(eq + 1).trim();
      }
    }
  }
} catch {
  // Optional parameter — absent until first configured.
}

// The workspace container image. Resolved here, at synth, so the tag lands in
// the template as a literal — `cdk diff` then shows a release as an image
// change, and CloudFormation registers a new task-definition revision because
// the property genuinely differs. scripts/deploy-infra.sh writes this
// parameter when given a tag, which makes release and rollback one command.
const imageParameterName = `/aprovan/${environmentName}/workspace/image`;
let workspaceImage: string;
try {
  const pinned = await ssm.send(
    new GetParameterCommand({ Name: imageParameterName }),
  );
  workspaceImage = pinned.Parameter?.Value ?? "";
} catch {
  workspaceImage = "";
}
if (!workspaceImage) {
  throw new Error(
    `No workspace image pinned at ${imageParameterName} (${env.region}).\n` +
      "Publish one with `scripts/image.sh push`, then deploy with " +
      "`scripts/deploy-infra.sh <tag>`.",
  );
}

const stack = new RegistryApp(app, names.regional(), {
  env,
  environmentName,
  names,
  sharedEnv,
  workspaceImage,
});

cdk.Tags.of(stack).add("project", "registry");
cdk.Tags.of(stack).add("environment", environmentName);

app.synth();
