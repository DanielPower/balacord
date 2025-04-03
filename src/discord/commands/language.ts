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
          ...Object.keys(localizations).map((key) => ({
            name: key,
            value: key,
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

    if (interaction.user.id !== interaction.guild?.ownerId) {
      await interaction.reply({
        content: "Only the server owner can change the language.",
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
