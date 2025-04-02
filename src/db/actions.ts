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
