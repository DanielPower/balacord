import { AttachmentBuilder, EmbedBuilder, Message } from "discord.js";
import { closest, distance } from "fastest-levenshtein";
import { Joker, jokers } from "../jokers";
import { logger } from "../logging";
import { recordActivity } from "../db/actions";

const MAX_DISTANCE = 3;

const rarityColors: Record<Joker["rarity"], number> = {
  common: 0x0093ff,
  uncommon: 0x35bc86,
  rare: 0xff4c40,
  legendary: 0xaa5ab4,
};

const jokerNames = Object.values(jokers).map((j) => j.name.toLowerCase());
export const handleCardTags = async (message: Message<true>) => {
  const nono = message.content.match(/\(\(\((.*?)\)\)\)/g) as string[];
  if (nono) {
    message.reply("Please do not use triple parentheses.");
    return;
  }
  const tags = message.content.match(/\(\((.*?)\)\)/g) as string[];
  if (!tags) return;

  const taggedJokers: Map<Joker, boolean> = new Map();
  for (const tag of tags) {
    const parsedTag = tag.toLowerCase().slice(2, -2).replace("+", "");
    const jokerName = closest(parsedTag, jokerNames);
    const distanceToJoker = distance(parsedTag, jokerName);

    const jokerFound = distanceToJoker <= MAX_DISTANCE;

    if (!jokerFound) {
      continue;
    }

    recordActivity(message.author.id, message.guild.id);

    const joker = Object.values(jokers).find(
      (j) => j.name.toLowerCase() === jokerName,
    );

    if (joker) {
      const extended =
        taggedJokers.get(joker) || tag.slice(0, -2).endsWith("+");
      taggedJokers.set(joker, extended);
      logger.info(
        {
          parsedTag,
          jokerName,
          distanceToJoker,
          jokerFound,
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
      .setTitle(joker.name)
      .setThumbnail(`attachment://${joker.key}.png`)
      .setColor(rarityColors[joker.rarity]);
    if (extended) {
      embed.addFields([
        { name: "Rarity", value: capitalize(joker.rarity), inline: true },
        { name: "Effect", value: joker.effect },
        ...(joker.unlockRequirement
          ? [{ name: "Unlock Requirement", value: joker.unlockRequirement }]
          : []),
        {
          name: "Buy Price",
          value: joker.buyPrice.toString(),
          inline: true,
        },
        {
          name: "Sell Price",
          value: joker.sellPrice.toString(),
          inline: true,
        },
      ]);
    } else {
      embed.setDescription(joker.effect);
    }
    embeds.push(embed);
  }

  if (embeds.length === 0) return;
  message.reply({ embeds, files });
};

const capitalize = (s: string) =>
  s
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
