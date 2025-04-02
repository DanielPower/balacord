import { Locale } from "discord.js";

export const localizations = {
  "en-us": {
    effect: "Effect",
    rarity: "Rarity",
    buy_price: "Buy Price",
    sell_price: "Sell Price",
    unlock_requirement: "Unlock Requirement",
    rarities: ["Common", "Uncommon", "Rare", "Legendary"],
  },
  de: {
    effect: "Effekt",
    rarity: "Seltenheit",
    buy_price: "Kaufpreis",
    sell_price: "Verkaufspreis",
    unlock_requirement: "Freischaltbedingung",
    rarities: ["Gewöhnlich", "Ungewöhnlich", "Selten", "Legendär"],
  },
  es_419: {
    effect: "Efecto",
    rarity: "Rareza",
    buy_price: "Precio de compra",
    sell_price: "Precio de venta",
    unlock_requirement: "Requisito de desbloqueo",
    rarities: ["Común", "Poco común", "Raro", "Legendario"],
  },
  es_ES: {
    effect: "Efecto",
    rarity: "Rareza",
    buy_price: "Precio de compra",
    sell_price: "Precio de venta",
    unlock_requirement: "Requisito de desbloqueo",
    rarities: ["Común", "Poco común", "Raro", "Legendario"],
  },
  fr: {
    effect: "Effet",
    rarity: "Rareté",
    buy_price: "Prix d'achat",
    sell_price: "Prix de vente",
    unlock_requirement: "Condition de déverrouillage",
    rarities: ["Commun", "Peu commun", "Rare", "Légendaire"],
  },
  id: {
    effect: "Efek",
    rarity: "Kelangkaan",
    buy_price: "Harga Beli",
    sell_price: "Harga Jual",
    unlock_requirement: "Persyaratan Buka Kunci",
    rarities: ["Umum", "Tidak umum", "Langka", "Legendaris"],
  },
  it: {
    effect: "Effetto",
    rarity: "Rarità",
    buy_price: "Prezzo d'acquisto",
    sell_price: "Prezzo di vendita",
    unlock_requirement: "Requisito di sblocco",
    rarities: ["Comune", "Non comune", "Raro", "Leggendario"],
  },
  ja: {
    effect: "効果",
    rarity: "レアリティ",
    buy_price: "購入価格",
    sell_price: "売却価格",
    unlock_requirement: "解放条件",
    rarities: ["コモン", "アンコモン", "レア", "レジェンダリー"],
  },
  ko: {
    effect: "효과",
    rarity: "희귀도",
    buy_price: "구매 가격",
    sell_price: "판매 가격",
    unlock_requirement: "잠금 해제 요구 사항",
    rarities: ["일반", "희귀", "레어", "전설적"],
  },
  nl: {
    effect: "Effect",
    rarity: "Zeldzaamheid",
    buy_price: "Koopprijs",
    sell_price: "Verkoopprijs",
    unlock_requirement: "Ontgrendelingsvoorwaarde",
    rarities: ["Gewoon", "Ongewoon", "Zeldzaam", "Legendarisch"],
  },
  pl: {
    effect: "Efekt",
    rarity: "Rzadkość",
    buy_price: "Cena zakupu",
    sell_price: "Cena sprzedaży",
    unlock_requirement: "Wymaganie odblokowania",
    rarities: ["Pospolity", "Niepospolity", "Rzadki", "Legendarny"],
  },
  pt_BR: {
    effect: "Efeito",
    rarity: "Raridade",
    buy_price: "Preço de compra",
    sell_price: "Preço de venda",
    unlock_requirement: "Requisito para desbloquear",
    rarities: ["Comum", "Incomum", "Raro", "Lendário"],
  },
  ru: {
    effect: "Эффект",
    rarity: "Редкость",
    buy_price: "Цена покупки",
    sell_price: "Цена продажи",
    unlock_requirement: "Требование для разблокировки",
    rarities: ["Обычный", "Необычный", "Редкий", "Легендарный"],
  },
  zh_CN: {
    effect: "效果",
    rarity: "稀有度",
    buy_price: "购买价格",
    sell_price: "出售价格",
    unlock_requirement: "解锁要求",
    rarities: ["普通", "非凡", "稀有", "传说"],
  },
  zh_TW: {
    effect: "效果",
    rarity: "稀有度",
    buy_price: "購買價格",
    sell_price: "出售價格",
    unlock_requirement: "解鎖要求",
    rarities: ["普通", "非凡", "稀有", "傳說"],
  },
};

export const discordToBalatroLocale = (
  locale: Locale,
): keyof typeof localizations => {
  switch (locale) {
    case Locale.Indonesian:
      return "id";
    case Locale.ChineseCN:
      return "zh_CN";
    case Locale.ChineseTW:
      return "zh_TW";
    case Locale.Dutch:
      return "nl";
    case Locale.French:
      return "fr";
    case Locale.German:
      return "de";
    case Locale.Italian:
      return "it";
    case Locale.Japanese:
      return "ja";
    case Locale.Korean:
      return "ko";
    case Locale.Polish:
      return "pl";
    case Locale.PortugueseBR:
      return "pt_BR";
    case Locale.Russian:
      return "ru";
    case Locale.SpanishES:
      return "es_ES";
    default:
      return "en-us";
  }
};

export const language_keys = Object.keys(
  localizations,
) as (keyof typeof localizations)[];
