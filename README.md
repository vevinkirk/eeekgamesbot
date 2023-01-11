# eeekgamesbot
The eeek games bot.
A collection of stupid commands for stupid people.

## Current Commands
1. `/help` will list currently available commands for the bot
2. `/teams` will generate teams for 5 vs 5 of users in the current voice channel
3. `/mastery` Bot will reply with summoners top three champions for league of legends
4. `/version` Shows current bot version and latest commit
5. `/tarkov item` will show a description of an item, base price and average 24h price on the flea market for Escape from Tarkov
## To run locally

1. Create a `config.json` and add `DISCORD_BOT_TOKEN`
    ```json
    {
      "DISCORD_BOT_TOKEN": "token goes here - ask connor",
      "clientId": "token goes here - ask connor",
      "RIOT_API_KEY": "token goes here - ask connor"
    }
    ```
2. Run `npm install`
3. Run `npm start`

## Registering a new command

In order to register a new command, one must run `npm run new`

Should autodeploy on merge