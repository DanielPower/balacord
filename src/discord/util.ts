import { EmbedBuilder, Message } from "discord.js";
import { Joker, jokerKeys, jokerMap, jokers } from "./balatro";
import { closest } from "fastest-levenshtein";

export const handleCardTags = async (message: Message) => {
  const messageTags = message.content.match(/\(\((.*?)\)\)/g) as string[];
  if (!messageTags) return;

  const taggedJokers: Array<Joker> = [];
  for (const tag of messageTags) {
    const parsedTag = tag.toLowerCase().slice(2, -2);
    const jokerKey = closest(parsedTag, jokerKeys);
    const joker = jokerMap[jokerKey];
    if (joker) {
      taggedJokers.push(joker);
    }
  }

  const embeds = taggedJokers.map((joker) => {
    return new EmbedBuilder()
      .setTitle(joker.name)
      .setThumbnail(joker.imageUrl)
      .addFields([
        { name: "Rarity", value: capitalize(joker.rarity), inline: true },
        { name: "Type", value: capitalize(joker.type), inline: true },
        { name: "Effect", value: joker.effect },
        ...(joker.activation
          ? [{ name: "Activation", value: capitalize(joker.activation) }]
          : []),
        { name: "Unlock Requirement", value: joker.unlockRequirement },
        { name: "Buy Price", value: joker.buyPrice.toString(), inline: true },
        { name: "Sell Price", value: joker.sellPrice.toString(), inline: true },
      ]);
  });

  message.reply({ embeds });
};

const capitalize = (s: string) =>
  s
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
