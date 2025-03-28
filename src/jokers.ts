import game from "../extracted/game.json";
import enUs from "../extracted/localization/en-us.json";
import { getCard } from "./image.ts";

const enUsAny = enUs as any;
const gameAny = game as any;

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

console.log(gameAny.P_CENTERS.j_vampire);
export const jokers: { [key: string]: Joker } = Object.fromEntries(
  await Promise.all(
    Object.entries(gameAny.P_CENTERS)
      .filter(([key]) => key.startsWith("j_"))
      .map(async ([key, joker]: [string, any]) => [
        key.slice(2),
        {
          key,
          name: joker.name,
          effect: enUsAny.descriptions.Joker[key].text,
          effectProperties: joker.config,
          effectText: enUsAny.descriptions.Joker[key].text
            .join(" ")
            .replace(/{[^{}]*}/g, "")
            .replace(/#1#/g, joker.loc_vars?.[0])
            .replace(/#2#/g, joker.loc_vars?.[1])
            .replace(/#3#/g, joker.loc_vars?.[2])
            .replace("(Currently ", "(Initially "),
          type: joker.effect,
          rarity: rarity[joker.rarity - 1],
          buyPrice: joker.cost,
          sellPrice: Math.floor(joker.cost / 2),
          unlockRequirement: enUsAny.descriptions.Joker[key].unlock?.join(" "),
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
