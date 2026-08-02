include .env
export
CDK_DEFAULT_REGION ?= $(AWS_DEFAULT_REGION)
CDK_DEFAULT_ACCOUNT ?= $(AWS_ACCOUNT_ID)
export CDK_DEFAULT_REGION CDK_DEFAULT_ACCOUNT

.PHONY: deploy
deploy:
	pnpm run build
	pnpm run synth
	pnpm run cdk deploy
