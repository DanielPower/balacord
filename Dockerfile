FROM oven/bun:latest

COPY package.json ./
COPY bun.lockb ./
COPY src ./
copy extracted ./

RUN bun install --production
ENTRYPOINT [ "bun", "run", "index.ts" ]
