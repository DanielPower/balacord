import { EmbedBuilder, Message } from "discord.js";
import { closest } from "fastest-levenshtein";
import { Joker, jokers } from "balatro";

const rarityColors: Record<Joker["rarity"], number> = {
  common: 0x0093ff,
  uncommon: 0x35bc86,
  rare: 0xff4c40,
  legendary: 0xaa5ab4,
};

const jokerNames = Object.values(jokers).map((j) => j.name.toLowerCase());
export const handleCardTags = async (message: Message) => {
  const tags = message.content.match(/\(\((.*?)\)\)/g) as string[];
  if (!tags) return;

  const taggedJokers: Map<Joker, boolean> = new Map();
  for (const tag of tags) {
    const parsedTag = tag.toLowerCase().slice(2, -2).replace("+", "");
    const jokerName = closest(parsedTag, jokerNames);
    const joker = Object.values(jokers).find(
      (j) => j.name.toLowerCase() === jokerName,
    );
    if (joker) {
      taggedJokers.set(
        joker,
        taggedJokers.get(joker) || tag.slice(0, -2).endsWith("+"),
      );
    }
  }

  const embeds: EmbedBuilder[] = [];
  for (const [joker, extended] of taggedJokers) {
    if (extended) {
      embeds.push(
        new EmbedBuilder()
          .setTitle(joker.name)
          .setThumbnail(joker.imageUrl)
          .setColor(rarityColors[joker.rarity])
          .addFields([
            { name: "Rarity", value: capitalize(joker.rarity), inline: true },
            { name: "Type", value: capitalize(joker.type), inline: true },
            { name: "Effect", value: joker.effect },
            ...(joker.activation
              ? [{ name: "Activation", value: capitalize(joker.activation) }]
              : []),
            { name: "Unlock Requirement", value: joker.unlockRequirement },
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
          ]),
      );
    } else {
      embeds.push(
        new EmbedBuilder()
          .setTitle(joker.name)
          .setThumbnail(joker.imageUrl)
          .setColor(rarityColors[joker.rarity])
          .setDescription(joker.effect),
      );
    }
  }

  if (embeds.length === 0) return;
  message.reply({ embeds });
};

const capitalize = (s: string) =>
  s
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
