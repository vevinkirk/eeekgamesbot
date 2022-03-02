const textCommands = require("./commands/textCommands.js");
const { Client, Intents } = require("discord.js");
const config = require("./config.json");
const prefix = '!';

const eekIntents = new Intents();
eekIntents.add(Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS)

const client = new Client({ intents: eekIntents })


client.on("ready", () => {
    console.log("Logged in as Eeek games bot")
})

client.on("messageCreate", msg => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) {
        return;
    }
    // Get command body and ensure commands aren't case-sensitive.
    let commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    console.log({textCommands, command})

    // if the command is found, run the function
    if(textCommands[command]) {
        let commandFunction = textCommands[command];
        commandFunction(msg);
    }
    else {
        msg.reply("Yebby is a peen")
    }
})

client.login(config.DISCORD_BOT_TOKEN); 