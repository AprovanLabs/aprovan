# ghcr.io/aprovanlabs/workspace — the Aprovan product backend (aprovan monorepo).
#
# Build from the aprovan repo root:
#   docker buildx build -f server/workspace/Dockerfile -t workspace .
#
# utdk / registry-server / contract packages are vendored under packages/ in this
# monorepo (unscoped `utdk` cannot publish to npm). Do not overwrite them from a
# registry git SHA at build time — that desyncs pnpm-lock.yaml.

ARG NODE_VERSION=22.12.0
ARG PNPM_VERSION=9.15.9

FROM node:${NODE_VERSION}-bookworm-slim AS builder
ARG PNPM_VERSION
WORKDIR /repo
RUN npm install --global corepack@latest \
    && corepack enable \
    && corepack prepare pnpm@${PNPM_VERSION} --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json tsconfig.json .prettierrc.json ./
COPY config ./config
COPY packages ./packages
COPY server/workspace ./server/workspace

RUN pnpm install --frozen-lockfile --filter @aprovan/workspace...
RUN pnpm --filter @aprovan/workspace... run build
RUN pnpm --filter @aprovan/workspace --prod deploy /srv/workspace

FROM node:${NODE_VERSION}-bookworm-slim AS runtime
ENV NODE_ENV=production \
    WORKSPACE_MODE=local \
    WORKSPACE_DATA_DIR=/data \
    WORKSPACE_PORT=4000
WORKDIR /srv/workspace
COPY --from=builder --chown=node:node /srv/workspace ./
RUN mkdir -p /data && chown node:node /data
VOLUME ["/data"]
USER node
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:'+(process.env.WORKSPACE_PORT||4000)+'/health').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"]
ENTRYPOINT ["node", "dist/cli.js"]
CMD ["start"]
