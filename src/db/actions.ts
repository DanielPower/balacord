import { client } from "./db";

export const createUserIfNotExists = async (id: string) => {
  await client.query(
    "INSERT INTO discord_user (id, last_seen) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING",
    [id, new Date()],
  );
};

export const createGuildIfNotExists = async (id: string) => {
  await client.query(
    "INSERT INTO discord_guild (id, last_seen) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING",
    [id, new Date()],
  );
};

export const recordActivity = async (userId: string, guildId: string) => {
  await createUserIfNotExists(userId);
  await client.query(
    `
    UPDATE discord_user SET last_seen = $1 WHERE id = $2;
    UPDATE discord_guild SET last_seen = $1 WHERE id = $3;
  `,
    [new Date(), userId, guildId],
  );
};
