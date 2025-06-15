import { registerCommands, startBot } from "./discord/discord";

console.log("Starting bot.");
await registerCommands();
await startBot();
