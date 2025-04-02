import { AttachmentBuilder, EmbedBuilder, Message } from "discord.js";
import { closest, distance } from "fastest-levenshtein";
import { Joker, jokers } from "../jokers";
import { logger } from "../logging";
import { capitalize } from "../util";
import {
  discordToBalatroLocale,
  language_keys,
  localizations,
} from "../localization";
import { getGuildLanguage } from "../db/actions";

const MAX_DISTANCE = 3;
const rarityColors = [0x0093ff, 0x35bc86, 0xff4c40, 0xaa5ab4];

const jokerMaps = Object.fromEntries(
  language_keys.map((language_key) => [
    language_key,
    new Map(
      Object.values(jokers).map((j) => [
        j.name[language_key].toLowerCase(),
        j.key,
      ]),
    ),
  ]),
);
const jokerNames = Object.fromEntries(
  language_keys.map((language_key) => [
    language_key,
    Array.from(jokerMaps[language_key].keys()),
  ]),
);
export const handleCardTags = async (message: Message<true>) => {
  const tags = message.content.match(/\(\((.*?)\)\)/g) as string[];
  if (!tags) return;

  let guildLanguage = await getGuildLanguage(message.guild.id);
  if (!guildLanguage) {
    guildLanguage = discordToBalatroLocale(message.guild.preferredLocale);
  }

  const taggedJokers: Map<Joker, boolean> = new Map();
  for (const tag of tags) {
    // First try in the guild's language
    let joker: Joker | undefined = undefined;
    const parsedTag = tag.toLowerCase().slice(2, -2).replace("+", "");
    const jokerName = closest(parsedTag, jokerNames[guildLanguage]);
    const distanceToJoker = distance(parsedTag, jokerName);

    if (distanceToJoker <= MAX_DISTANCE) {
      const jokerKey = jokerMaps[guildLanguage].get(jokerName);
      if (!jokerKey) continue;
      joker = jokers[jokerKey];
    }

    if (!joker && guildLanguage !== "en-us") {
      // If not found, try in English
      const parsedTag = tag.toLowerCase().slice(2, -2).replace("+", "");
      const jokerName = closest(parsedTag, jokerNames["en-us"]);
      const distanceToJoker = distance(parsedTag, jokerName);

      if (distanceToJoker <= MAX_DISTANCE) {
        const jokerKey = jokerMaps["en-us"].get(jokerName);
        if (!jokerKey) continue;
        joker = jokers[jokerKey];
      }
    }

    if (!joker) {
      continue;
    }

    if (joker) {
      const extended =
        taggedJokers.get(joker) || tag.slice(0, -2).endsWith("+");
      taggedJokers.set(joker, extended);
      logger.info(
        {
          parsedTag,
          jokerName,
          distanceToJoker,
          userId: message.author.id,
          guildId: message.guild.id,
          guildName: message.guild.name,
          extended,
        },
        "Joker tag used",
      );
    }
  }

  const embeds: EmbedBuilder[] = [];
  const files: AttachmentBuilder[] = [];
  for (const [joker, extended] of taggedJokers) {
    const attachment = new AttachmentBuilder(joker.image, {
      name: `${joker.key}.png`,
    });
    files.push(attachment);
    const embed = new EmbedBuilder()
      .setTitle(joker.name[guildLanguage])
      .setThumbnail(`attachment://${joker.key}.png`)
      .setColor(rarityColors[joker.rarity]);
    if (extended) {
      embed.addFields([
        {
          name: localizations[guildLanguage].rarity,
          value: capitalize(
            localizations[guildLanguage].rarities[joker.rarity],
          ),
          inline: true,
        },
        {
          name: localizations[guildLanguage].effect,
          value: joker.effect[guildLanguage],
        },
        {
          name: localizations[guildLanguage].buy_price,
          value: joker.buyPrice.toString(),
          inline: true,
        },
        {
          name: localizations[guildLanguage].sell_price,
          value: joker.sellPrice.toString(),
          inline: true,
        },
      ]);
    } else {
      embed.setDescription(joker.effect[guildLanguage]);
    }
    embeds.push(embed);
  }

  if (embeds.length === 0) return;
  message.reply({ embeds, files });
};
