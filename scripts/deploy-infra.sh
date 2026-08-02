#!/usr/bin/env bash
#
# Deploy the registry backing services (workspace ECS service + DynamoDB
# tables + S3) via CDK.
#
# Wraps the infra/ CDK app: compiles it, then `cdk deploy`. The stack reads the
# shared identity env from SSM (/aprovan/<env>/env) at synth time, so no secrets
# are needed here — just AWS credentials (AWS_PROFILE locally, OIDC in CI).
#
# The container image tag is also an SSM parameter
# (/aprovan/<env>/workspace/image) read at synth. Passing a tag here writes it
# before synthesising, which makes a release and a rollback the same command:
#
#   AWS_PROFILE=aprovan scripts/deploy-infra.sh                 # redeploy the pinned tag
#   AWS_PROFILE=aprovan scripts/deploy-infra.sh 1a2b3c4d5e6f    # release / roll back to a tag
#
# CloudFormation deliberately owns the task definition. Registering a revision
# out of band with `aws ecs register-task-definition` is faster, but it leaves
# the stack drifted and the next `cdk deploy` silently reverts the image — one
# mechanism, one source of truth, is worth the extra minute.
#
# Config:
#   CDK_DEFAULT_ACCOUNT  AWS account (auto-detected via STS when unset)
#   CDK_REQUIRE_APPROVAL cdk --require-approval value (default: never)
#   WORKSPACE_IMAGE      full image name (default: ghcr.io/aprovanlabs/workspace)

source "$(dirname "${BASH_SOURCE[0]}")/deploy-lib.sh"

export ENVIRONMENT
export CDK_DEFAULT_REGION="${CDK_DEFAULT_REGION:-$AWS_REGION}"

IMAGE_PARAM="/aprovan/${ENVIRONMENT}/workspace/image"
IMAGE_NAME="${WORKSPACE_IMAGE:-ghcr.io/aprovanlabs/workspace}"

if [[ -z "${CDK_DEFAULT_ACCOUNT:-}" ]]; then
  CDK_DEFAULT_ACCOUNT="$(awscli "$AWS_REGION" sts get-caller-identity \
    --query Account --output text)"
  [[ -n "$CDK_DEFAULT_ACCOUNT" && "$CDK_DEFAULT_ACCOUNT" != "None" ]] ||
    die "Could not determine AWS account (STS get-caller-identity failed)."
fi
export CDK_DEFAULT_ACCOUNT

if [[ -n "${1:-}" ]]; then
  log "Pinning $IMAGE_PARAM -> $IMAGE_NAME:$1"
  awscli "$AWS_REGION" ssm put-parameter \
    --name "$IMAGE_PARAM" \
    --value "$IMAGE_NAME:$1" \
    --type String \
    --overwrite >/dev/null
fi

PINNED="$(ssm_param "$AWS_REGION" "$IMAGE_PARAM")"
[[ -n "$PINNED" && "$PINNED" != "None" ]] ||
  die "No image pinned at $IMAGE_PARAM. Publish one (scripts/image.sh push) then pass its tag: scripts/deploy-infra.sh <tag>"
log "Workspace image: $PINNED"

CDK_FLAGS=(--require-approval "${CDK_REQUIRE_APPROVAL:-never}")
[[ -n "${AWS_PROFILE:-}" ]] && CDK_FLAGS+=(--profile "$AWS_PROFILE")

log "Deploying workspace infra (env=$ENVIRONMENT account=$CDK_DEFAULT_ACCOUNT region=$CDK_DEFAULT_REGION)"
(
  cd "$REPO_ROOT"
  # Workspace CDK deps must be built before infra/workspace tsc can resolve them.
  pnpm --filter @aprovan/cdk... --filter @aprovan/node... build
  pnpm --filter @aprovan/registry-infra build
  cd "$REPO_ROOT/infra/workspace"
  pnpm exec cdk deploy "${CDK_FLAGS[@]}"
)

log "Workspace infra deploy complete."
