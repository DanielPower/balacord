import { Localization, localizations } from "../localization";
import { client } from "./db";

export const createUserIfNotExists = async (id: string) => {
  await client.query(
    "INSERT INTO discord_user (id) VALUES ($1) ON CONFLICT (id) DO NOTHING",
    [id],
  );
};

export const createGuildIfNotExists = async (id: string) => {
  await client.query(
    "INSERT INTO discord_guild (id) VALUES ($1) ON CONFLICT (id) DO NOTHING",
    [id],
  );
};

export const setGuildLanguage = async (guildId: string, language: string) => {
  await client.query("UPDATE discord_guild SET language = $1 WHERE id = $2", [
    language,
    guildId,
  ]);
};

export const getGuildLanguage = async (
  guildId: string,
): Promise<Localization | undefined> => {
  const result = await client.query(
    "SELECT language FROM discord_guild WHERE id = $1",
    [guildId],
  );
  if (result.rowCount === 0) {
    return undefined;
  }
  if (!(result.rows[0]?.language in localizations)) {
    return undefined;
  }
  return result.rows[0]?.language;
};
