FROM oven/bun:latest

COPY package.json ./
COPY bun.lockb ./
COPY src ./src
copy extracted ./extracted

RUN bun install --production
ENTRYPOINT [ "bun", "run", "src/index.ts" ]
