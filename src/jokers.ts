import extractedJokers from "../extracted/jokers.json";
import { getCard } from "./image.ts";

const language = "en-us";

export type Joker = {
  key: string;
  activation?: "independent" | "on scored" | "on held";
  buyPrice: number;
  effect: string;
  effectText: string;
  name: string;
  rarity: "common" | "uncommon" | "rare" | "legendary";
  sellPrice: number;
  type: string;
  unlockRequirement?: string;
  image: Buffer;
};

const rarity = ["common", "uncommon", "rare", "legendary"] as const;

export const jokers: { [key: string]: Joker } = Object.fromEntries(
  await Promise.all(
    Object.entries(extractedJokers).map(async ([key, joker]: [string, any]) => [
      key.slice(2),
      {
        key,
        name: joker.name,
        effectTemplate: joker.descriptions[language].text,
        effect: joker.descriptions[language].text
          .join(" ")
          .replace(/{[^{}]*}/g, " ")
          .replace(/#1#/g, joker.extra_vars[0])
          .replace(/#2#/g, joker.extra_vars[1])
          .replace(/#3#/g, joker.extra_vars[2])
          .replace("(Currently ", "(Initially ")
          .replace(/\ +/g, " ")
          .trim(),
        rarity: rarity[joker.rarity - 1],
        buyPrice: joker.cost,
        sellPrice: Math.floor(joker.cost / 2),
        unlockRequirement: joker.unlockRequirement,
        image: await getCard(
          "./extracted/Jokers.png",
          joker.pos.x,
          joker.pos.y,
          142,
          190,
        ),
      },
    ]),
  ),
);

console.dir(jokers, { depth: null });
