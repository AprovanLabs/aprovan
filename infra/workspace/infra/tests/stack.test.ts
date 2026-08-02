/**
 * Structural assertions over the synthesised stack.
 *
 * These exist because the expensive mistakes in this stack are silent ones: a
 * NAT gateway that nobody notices until the bill ($32/month, eight times the
 * compute), an x86 task definition that quietly costs 20% more, a capacity
 * provider strategy that drops Spot. None of those break a deploy — they just
 * cost money forever. So they are asserted here rather than reviewed by eye.
 */

import { namer } from "@aprovan/cdk";
import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { describe, expect, it } from "vitest";
import { RegistryApp } from "../src/stack.js";

const IMAGE = "ghcr.io/aprovanlabs/workspace:deadbeefcafe";

function synth(): Template {
  const app = new cdk.App();
  const names = namer({ environment: "prd", region: "us-east-2", projectId: "registry" });
  const stack = new RegistryApp(app, names.regional(), {
    env: { account: "111122223333", region: "us-east-2" },
    environmentName: "prd",
    names,
    sharedEnv: {
      COGNITO_USER_POOL_ID: "us-east-2_abc123",
      DYNAMODB_USERS_TABLE: "aprovan-prd-use2-users",
      DYNAMODB_MEMBERSHIPS_TABLE: "aprovan-prd-use2-memberships",
      AWS_REGION: "us-east-2",
    },
    workspaceImage: IMAGE,
  });
  return Template.fromStack(stack);
}

describe("workspace service", () => {
  it("runs ARM64 at the smallest useful task size", () => {
    synth().hasResourceProperties("AWS::ECS::TaskDefinition", {
      Cpu: "512",
      Memory: "1024",
      RuntimePlatform: { CpuArchitecture: "ARM64", OperatingSystemFamily: "LINUX" },
    });
  });

  it("prefers Spot but can fall back to on-demand", () => {
    synth().hasResourceProperties("AWS::ECS::Service", {
      DesiredCount: 1,
      CapacityProviderStrategy: [
        { CapacityProvider: "FARGATE_SPOT", Weight: 4 },
        { CapacityProvider: "FARGATE", Weight: 1 },
      ],
    });
  });

  it("provisions no NAT gateway", () => {
    const template = synth();
    template.resourceCountIs("AWS::EC2::NatGateway", 0);
    // Egress instead rides a public subnet + public IP, which is why there
    // must be no private subnets expecting a NAT that isn't there.
    expect(Object.keys(template.findResources("AWS::EC2::Subnet"))).toHaveLength(2);
  });

  it("carries the tunnel sidecar and pins the workspace image", () => {
    const template = synth();
    const [taskDefinition] = Object.values(
      template.findResources("AWS::ECS::TaskDefinition"),
    ) as Array<{
      Properties: {
        ContainerDefinitions: Array<{
          Name: string;
          Image: string;
          Secrets?: Array<{ Name: string }>;
          Environment?: Array<{ Name: string; Value: string }>;
        }>;
      };
    }>;
    const containers = taskDefinition!.Properties.ContainerDefinitions;

    const workspace = containers.find((c) => c.Name === "workspace");
    expect(workspace?.Image).toBe(IMAGE);
    expect(workspace?.Environment).toContainEqual({ Name: "WORKSPACE_MODE", Value: "aws" });

    const cloudflared = containers.find((c) => c.Name === "cloudflared");
    expect(cloudflared?.Secrets?.map((s) => s.Name)).toEqual(["TUNNEL_TOKEN"]);
  });

  it("leaves nothing of the Lambda deployment behind", () => {
    const template = synth();
    template.resourceCountIs("AWS::Lambda::Function", 0);
    template.resourceCountIs("AWS::Lambda::Url", 0);
    // The cron tick is now a leader-leased in-process timer, not a scheduled
    // event delivering a synthetic Function URL request.
    template.resourceCountIs("AWS::Events::Rule", 0);
  });
});
