# Balabot

A Discord Bot for Balatro players.

## Invite the bot to your server

[Invite link](https://discord.com/oauth2/authorize?client_id=1224531149372657767&permissions=2147484672&scope=bot).

## Using the bot

The bot's only functionality currently is to embed joker information (for a subset of jokers).
To embed a joker, write its name in double brackets. For example, `((Greedy Joker))`.

## Running the bot

Create a `.env` file in the root of the project with the following content:

```env
DISCORD_TOKEN=asdf-asdf-asdf-asdf
DISCORD_APPLICATION_ID=1234567890
```

Then run the following command:

```bash
bun dev
```

