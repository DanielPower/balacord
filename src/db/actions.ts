import { client } from "./db";

export const createUserIfNotExists = async (id: string) => {
  await client.query(
    "INSERT INTO discord_user (id, last_seen) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING",
    [id, new Date()],
  );
};

export const userSeen = async (id: string) => {
  await createUserIfNotExists(id);
  await client.query("UPDATE discord_user SET last_seen = $1 WHERE id = $2", [
    new Date(),
    id,
  ]);
};
