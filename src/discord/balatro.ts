export type Joker = {
  activation: "independent" | "on scored";
  buyPrice: number;
  effect: string;
  name: string;
  rarity: "common" | "uncommon" | "rare" | "legendary";
  sellPrice: number;
  type: "additive mult";
  unlockRequirement: string;
  imageUrl: string;
};

export type Embeddable = Joker;

export const jokers = [
  {
    activation: "independent",
    buyPrice: 2,
    effect: "+4 Mult",
    name: "Joker",
    rarity: "common",
    sellPrice: 1,
    type: "additive mult",
    unlockRequirement: "Available from the start",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/e/ef/Joker.png",
  },
  {
    activation: "on scored",
    buyPrice: 5,
    effect: "Played cards with Diamond suit give +4 Mult when scored.",
    name: "Greedy Joker",
    rarity: "common",
    sellPrice: 1,
    type: "additive mult",
    unlockRequirement: "Available from the start",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/4/43/Greedy_Joker.png",
  },
  {
    activation: "on scored",
    buyPrice: 5,
    effect: "Played cards with Diamond Heart give +4 Mult when scored.",
    name: "Lusty Joker",
    rarity: "common",
    sellPrice: 1,
    type: "additive mult",
    unlockRequirement: "Available from the start",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/f/fd/Lusty_Joker.png",
  },
  {
    activation: "on scored",
    buyPrice: 5,
    effect: "Played cards with Spade suit give +4 Mult when scored.",
    name: "Wrathful Joker",
    rarity: "common",
    sellPrice: 1,
    type: "additive mult",
    unlockRequirement: "Available from the start",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/7/7b/Wrathful_Joker.png",
  },
  {
    activation: "on scored",
    buyPrice: 5,
    effect: "Played cards with Club suit give +4 Mult when scored.",
    name: "Gluttonous Joker",
    rarity: "common",
    sellPrice: 1,
    type: "additive mult",
    unlockRequirement: "Available from the start",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/a/ac/Gluttonous_Joker.png",
  },
] satisfies Array<Joker>;

export const jokerKeys = jokers.map((j) => j.name.toLowerCase());

export const jokerMap = Object.fromEntries(
  jokerKeys.map((key, index) => [key, jokers[index]]),
);
