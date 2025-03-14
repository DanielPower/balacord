import { startBot } from "./discord/discord";
import { logger } from "./logging";

logger.info("Starting bot.");
await startBot();
