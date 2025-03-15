declare module "bun" {
  interface Env {
    APP_NAME: string;
    BALATRO_PATH: string;
    DISCORD_TOKEN: string;
    DISCORD_APPLICATION_ID: string;
    DISCORD_CHANNEL_ID: string;
    LOKI_URL: string;
    LOKI_USERNAME: string;
    LOKI_PASSWORD: string;
  }
}
