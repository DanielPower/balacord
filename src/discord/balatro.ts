export type Joker = {
  activation?: "independent" | "on scored" | "on held";
  buyPrice: number;
  effect: string;
  name: string;
  rarity: "common" | "uncommon" | "rare" | "legendary";
  sellPrice: number;
  type:
    | "additive mult"
    | "chips"
    | "multiplicative mult"
    | "effect"
    | "retrigger"
    | "economy";
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
    unlockRequirement: "Available from the start.",
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
    unlockRequirement: "Available from the start.",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/4/43/Greedy_Joker.png",
  },
  {
    activation: "on scored",
    buyPrice: 5,
    effect: "Played cards with Heart suit give +4 Mult when scored.",
    name: "Lusty Joker",
    rarity: "common",
    sellPrice: 1,
    type: "additive mult",
    unlockRequirement: "Available from the start.",
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
    unlockRequirement: "Available from the start.",
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
    unlockRequirement: "Available from the start.",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/a/ac/Gluttonous_Joker.png",
  },
  {
    name: "Jolly Joker",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/4/40/Jolly_Joker.png",
    effect: "+8 Mult if played hand contains a Pair",
    rarity: "common",
    buyPrice: 3,
    sellPrice: 1,
    type: "additive mult",
    activation: "on scored",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Zany Joker",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/4/45/Zany_Joker.png",
    effect: "+12 Mult if played hand contains a Three of a Kind",
    rarity: "common",
    buyPrice: 4,
    sellPrice: 2,
    type: "additive mult",
    activation: "independent",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Mad Joker",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/6/6d/Mad_Joker.png",
    effect: "+20 Mult if played hand contains a Four of a Kind",
    rarity: "common",
    buyPrice: 4,
    sellPrice: 2,
    type: "additive mult",
    activation: "independent",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Crazy Joker",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/4/4d/Crazy_Joker.png",
    effect: "+10 Mult if played hand contains a Straight",
    rarity: "common",
    buyPrice: 4,
    sellPrice: 2,
    type: "additive mult",
    activation: "independent",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Droll Joker",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/9/9c/Droll_Joker.png",
    effect: "+10 Mult if played hand contains a Flush.",
    rarity: "common",
    buyPrice: 4,
    sellPrice: 2,
    type: "additive mult",
    activation: "independent",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Sly Joker",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/4/4e/Sly_Joker.png",
    effect: "+50 Chips if played hand contains a Pair",
    rarity: "common",
    buyPrice: 3,
    sellPrice: 1,
    type: "chips",
    activation: "independent",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Wily Joker",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/4/4d/Wily_Joker.png",
    effect: "+100 Chips if played hand contains a Three of a Kind",
    rarity: "common",
    buyPrice: 4,
    sellPrice: 2,
    type: "chips",
    activation: "independent",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Clever Joker",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/6/6a/Clever_Joker.png",
    effect: "+150 Chips if played hand contains a Four of a Kind",
    rarity: "common",
    buyPrice: 4,
    sellPrice: 2,
    type: "chips",
    activation: "independent",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Devious Joker",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/4/4a/Devious_Joker.png",
    effect: "+100 Chips if played hand contains a Straight.",
    rarity: "common",
    buyPrice: 4,
    sellPrice: 2,
    type: "chips",
    activation: "independent",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Crafty Joker",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/7/7f/Crafty_Joker.png",
    effect: "+80 Chips if played hand contains a Flush.",
    rarity: "common",
    buyPrice: 4,
    sellPrice: 2,
    type: "chips",
    activation: "independent",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Half Joker",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/a/a0/Half_Joker.png",
    effect: "+20 Mult if played hand contains 3 or fewer cards.",
    rarity: "common",
    buyPrice: 5,
    sellPrice: 2,
    type: "additive mult",
    activation: "independent",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Joker Stencil",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/2/2e/Joker_Stencil.png",
    effect:
      "X1 Mult for each empty Joker slot. Joker Stencil included\n(Currently X1 Mult)",
    rarity: "uncommon",
    buyPrice: 8,
    sellPrice: 4,
    type: "multiplicative mult",
    activation: "independent",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Four Fingers",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/f/fd/Four_Fingers.png",
    effect: "All Flushes and Straights can be made with 4 cards",
    rarity: "uncommon",
    buyPrice: 7,
    sellPrice: 3,
    type: "effect",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Mime",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/6/65/Mime.png",
    effect: "Retrigger all card held in hand abilities",
    rarity: "uncommon",
    buyPrice: 5,
    sellPrice: 2,
    type: "retrigger",
    activation: "on held",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Credit Card",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/a/aa/Credit_Card.png",
    effect: "Go up to -$20 in debt",
    rarity: "common",
    buyPrice: 1,
    sellPrice: 1,
    type: "economy",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Ceremonial Dagger",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/7/76/Ceremonial_Dagger.png",
    effect:
      "When Blind is selected, destroy Joker to the right and permanently add double its sell value to this Mult (Currently +0 Mult)",
    rarity: "uncommon",
    buyPrice: 6,
    sellPrice: 3,
    type: "additive mult",
    activation: "independent",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Banner",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/8/87/Banner.png",
    effect: "+40 Chips for each remaining discard.",
    rarity: "common",
    buyPrice: 5,
    sellPrice: 2,
    type: "chips",
    activation: "independent",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Mystic Summit",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/a/a4/Mystic_Summit.png",
    effect: "+15 Mult when 0 discards remaining",
    rarity: "common",
    buyPrice: 5,
    sellPrice: 2,
    type: "additive mult",
    activation: "independent",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Marble Joker",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/1/16/Marble_Joker.png",
    effect: "Adds one Stone card to the deck when Blind is selected",
    rarity: "uncommon",
    buyPrice: 6,
    sellPrice: 3,
    type: "effect",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Loyalty Card",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/e/eb/Loyalty_Card.png",
    effect: "x4 Mult every 6 hands played\n5 remaining",
    rarity: "uncommon",
    buyPrice: 5,
    sellPrice: 2,
    type: "multiplicative mult",
    activation: "independent",
    unlockRequirement: "Available from start.",
  },
  {
    name: "8 Ball",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/e/ef/8_Ball.png",
    effect:
      "Create a Planet card if played hand contains 2 or more 8s\n(Must have room)",
    rarity: "common",
    buyPrice: 5,
    sellPrice: 2,
    type: "effect",
    activation: "independent",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Misprint",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/e/e1/Misprint.png",
    effect: "+? Mult",
    rarity: "common",
    buyPrice: 4,
    sellPrice: 2,
    type: "additive mult",
    activation: "independent",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Dusk",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/5/5d/Dusk.png",
    effect: "Retrigger all played cards in final hand of the round",
    rarity: "uncommon",
    buyPrice: 5,
    sellPrice: 2,
    type: "retrigger",
    activation: "on scored",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Raised Fist",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/3/37/Raised_Fist.png",
    effect: "Adds double the rank of lowest card held in hand to Mult",
    rarity: "common",
    buyPrice: 5,
    sellPrice: 2,
    type: "additive mult",
    activation: "on held",
    unlockRequirement: "Available from start.",
  },
  {
    name: "Chaos the Clown",
    imageUrl:
      "https://static.wikia.nocookie.net/balatrogame/images/0/02/Chaos_the_Clown.png",
    effect: "1 free Reroll per shop",
    rarity: "common",
    buyPrice: 4,
    sellPrice: 2,
    type: "effect",
    unlockRequirement: "Available from start.",
  },
] satisfies Array<Joker>;

export const jokerKeys = jokers.map((j) => j.name.toLowerCase());

export const jokerMap = Object.fromEntries(
  jokerKeys.map((key, index) => [key, jokers[index]]),
);
