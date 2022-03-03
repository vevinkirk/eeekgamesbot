const FileSystem = require("fs");
const axios = require('axios')
const { Client, Intents } = require("discord.js");

const textCommands = require("./commands/textCommands.js");
const config = require("./config.json");
const championsJson = require("./static/champions.json");
const prefix = '!';

const eekIntents = new Intents();
eekIntents.add(Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS)

const leagueVersionApi = 'https://ddragon.leagueoflegends.com/api/versions.json';

const client = new Client({ intents: eekIntents });

client.on("ready", () => {
    console.log("Logged in as Eeek games bot, checking for champions.json")

    let currentVersion = '';

    // get current league version
    axios.get(leagueVersionApi)
    .then(res => {
        currentVersion = res.data[0];
        // if current version of champion.json is behind or doesn't exist, get the newer version
        if(!championsJson || championsJson.version !== currentVersion) {
            console.log("Version mismatch")
            axios.get(`http://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/en_US/champion.json`)
            .then(res => {
                FileSystem.writeFile("./static/champions.json", JSON.stringify(res.data), "utf8", (err,res) => {
                    if(err)console.log(err);
                    console.info(res);
                })
            } )
        } else {
            console.log("Version good to go")
        }
    })

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

    // if the command is found, run the function
    if(textCommands[command]) {
        let commandFunction = textCommands[command];
        commandFunction(msg, args);
    }
    else {
        msg.reply("Yebby is a peen")
    }
})

client.login(config.DISCORD_BOT_TOKEN); 