import pg from "pg";
const { Client } = pg;

export const client = new Client();
await client.connect();
