import { registerCommands, startBot } from "./discord/discord";
import { logger } from "./logging";

logger.info("Starting bot.");
await registerCommands();
await startBot();
