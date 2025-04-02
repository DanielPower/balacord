import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { localizations } from "../../localization";
import { setGuildLanguage } from "../../db/actions";

export const language = {
  data: new SlashCommandBuilder()
    .setName("language")
    .setDescription("Change the bot's language")
    .addStringOption((option) =>
      option
        .setName("language")
        .setDescription("The language to set")
        .setRequired(true)
        .addChoices(
          ...Object.entries(localizations).map(([name, value]) => ({
            name,
            value: name,
          })),
        ),
    ),
  async handler(interaction: ChatInputCommandInteraction) {
    const guildId = interaction.guildId;
    if (!guildId) {
      await interaction.reply({
        content: "This command can only be used in a server.",
        ephemeral: true,
      });
      return;
    }

    const languageResult = interaction.options.getString("language", true);
    if (!(languageResult in localizations)) {
      await interaction.reply({
        content: "Invalid language.",
        ephemeral: true,
      });
      return;
    }
    const language = languageResult as keyof typeof localizations;

    await setGuildLanguage(guildId, language);

    await interaction.reply({
      content: localizations[language].language_change,
      ephemeral: true,
    });
  },
};
