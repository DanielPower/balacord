import pino from "pino";

export const logger = pino({
  name: "balacord",
  transport: Bun.env.LOKI_URL
    ? {
        target: "pino-loki",
        options: {
          labels: { application: Bun.env.APP_NAME },
          host: Bun.env.LOKI_URL,
          basicAuth: {
            username: Bun.env.LOKI_USERNAME,
            password: Bun.env.LOKI_PASSWORD,
          },
        },
      }
    : {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
});
