//const FileSystem = require("fs");
const axios = require('axios')
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Partials, Events, Collection } = require("discord.js");
const { DISCORD_BOT_TOKEN } = require('./config.json');
const helpers = require("./utilities/helpers.js");
const { generateTeams } = require('./commands/teams');

// const textCommands = require("./commands/index.js");
const championsJson = require("./static/champions.json");

const leagueVersionApi = 'https://ddragon.leagueoflegends.com/api/versions.json';

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const client = new Client({ 
    intents: [
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildBans,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.DirectMessageReactions,
    ],
    partials: [
        Partials.Channel
    ] 
});

client.commands = new Collection();

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

    if (interaction.isButton()) {
        console.log('button!!!!', { interaction })
    }

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('interactionCreate', interaction => {
    if (interaction.isButton()) {
        if(interaction.customId === 'reroll') {
            generateTeams(interaction, interaction.user.username)
        }
    }
})

client.on("ready", () => {
    console.log("Logged in as Eeek games bot, checking for champions.json")

    // get current league version
    axios.get(leagueVersionApi)
    .then(res => {
        let currentVersion = res.data[0];
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
            console.log(`Version ${currentVersion} good to go`)
        }
    })
})

client.on("messageCreate", msg => {
    //if message is from eeek cucks print deprecate message at random intervalss
    if (msg.guild.id == "866869860319232020"){
        flag = helpers.getRandomInt(0,20)
        if (flag === 7){
            msg.reply("Server is deprecated, no further support will be given");
        }
    }
})

client.login(DISCORD_BOT_TOKEN); 
