import {
  Client,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
  type Interaction,
} from "discord.js";
import { handleCardTags } from "./util";
const commands = {};

export const registerCommands = async () => {
  const rest = new REST().setToken(Bun.env.DISCORD_TOKEN);

  await rest.put(Routes.applicationCommands(Bun.env.DISCORD_APPLICATION_ID), {
    body: Object.values(commands).map(({ data }) => data.toJSON()),
  });
};

export const startBot = async () => {
  const bot = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  bot.once(Events.ClientReady, (c) => {
    console.log(`Discord bot ready. Logged in as ${c.user.tag}`);
  });

  bot.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    if (interaction.commandName in commands) {
      const command =
        commands[interaction.commandName as keyof typeof commands];
      await command.handler(interaction);
    }
  });

  bot.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    console.log("Handling card tags.");
    handleCardTags(message);
  });

  bot.login(Bun.env.DISCORD_TOKEN);

  return { bot };
};
