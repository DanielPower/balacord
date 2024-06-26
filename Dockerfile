FROM oven/bun:latest

COPY package.json ./
COPY bun.lockb ./
COPY src ./

RUN bun install --production
ENTRYPOINT [ "bun", "run", "index.ts" ]