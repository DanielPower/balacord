import extractedJokers from "../extracted/jokers.json";
import { getCard } from "./image.ts";
import { language_keys } from "./localization.ts";

export type Joker = {
  key: string;
  activation?: "independent" | "on scored" | "on held";
  buyPrice: number;
  effect: Record<string, string>;
  name: Record<string, string>;
  rarity: number;
  sellPrice: number;
  type: string;
  unlockRequirement?: string;
  image: Buffer;
};

const renderTemplate = (template: string[], vars: string[]) =>
  template
    .join(" ")
    .replace(/{[^{}]*}/g, "")
    .replace(/#1#/g, vars[0])
    .replace(/#2#/g, vars[1])
    .replace(/#3#/g, vars[2])
    .replace("(Currently ", "(Initially ")
    .trim();

export const jokers: { [key: string]: Joker } = Object.fromEntries(
  await Promise.all(
    Object.entries(extractedJokers).map(async ([key, joker]: [string, any]) => [
      key,
      {
        key,
        name: Object.fromEntries(
          language_keys.map((language) => [
            language,
            joker.descriptions[language].name,
          ]),
        ),
        effect: Object.fromEntries(
          language_keys.map((language) => [
            language,
            renderTemplate(joker.descriptions[language].text, joker.extra_vars),
          ]),
        ),
        rarity: joker.rarity - 1,
        buyPrice: joker.cost,
        sellPrice: Math.floor(joker.cost / 2),
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
