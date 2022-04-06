const package = require('../package.json');
const revision = require('child_process')
  .execSync('git log -1 --format=%s')
  .toString().trim()
const axios = require('axios')
const { MessageEmbed } = require('discord.js');
const config = require("../config.json");
const champData = require("../static/champions.json")
const { teamGenerator, pluralGamers } = require("../utilities/helpers.js");

const ping = (msg) => {
    msg.reply('Pong')
    return;
}

const tanner = (msg) => {
    msg.reply('FUCK TANNER')
    return;
}

const mastery = (msg, client, args) => {
    //remove white space and comma using regex keep formatted summoner name to display what was entered
    temp_name = args.toString().replace(/\s+/, ""); 
    temp_name =  temp_name.replace(/,/g,'')
    formatted_summoner_name =  args.join(' ');
    const summonerName = temp_name
    const summonerApi = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${config.RIOT_API_KEY}`;
    const masteryApi = 'https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner';
    const champImageUrl = `http://ddragon.leagueoflegends.com/cdn/${champData.version}/img/champion/`;
    let summonerInfo = '';
    axios.get(summonerApi)
    .then(res => {
        summonerInfo = res.data
    })
    .then(() => {
        axios.get(`${masteryApi}/${summonerInfo.id}?api_key=${config.RIOT_API_KEY}`)
        .then(res => {
            let champs = res.data.slice(0, 3);
            let champArr = []
            champs.forEach((champ, index) => {
                const arrOfChampData = Object.keys(champData.data).map((key) => champData.data[key]);
                let champion = arrOfChampData.find(c => parseInt(c.key) == champ.championId)
                champArr.push({
                    "name": champion.name,
                    "key": champion.key,
                    "masteryLevel": champ.championLevel,
                    "masteryPoints": champ.championPoints,
                    "image": `${champImageUrl}${champion.image.full}`
                })
            })
            let embedArr = [];
            champArr.forEach(c => {
                let embed = new MessageEmbed()
                embed.setTitle(`${c.name} mastery`)
                .setImage(c.image)
                .addFields(
                    { name: "Mastery level", value: `${c.masteryLevel}`, inline: true },
                    { name: "Mastery points", value: `${c.masteryPoints}`, inline: true },
                )
                embedArr.push(embed)
            })
            msg.reply(`Top 3 champion mastery for ${formatted_summoner_name}`)
            msg.channel.send({embeds: embedArr})
        })
    })
    return;
}

const teams = (msg, client) => {
    if (!msg.member.voice.channelId) {
        msg.reply('You must be in a voice channel to do that.');
        return;
    }
    const guild = client.guilds.cache.get(msg.guildId);
    const TEAM_SIZE = 10;
    // let gamers = ['one','two','three','four','five','six','seven','eight','nine'];
    let gamers = [];

    msg.reply('Click the green checkmark while in a voice channel if you\'re playing 10s.')
    .then(botReply => {
        botReply.react('✅')
        
        // Check if user is in voice channel, reacting with correct emote and not a bot.
        const filter = async (reaction, user) => {
            if(!user.bot) {
                let memberInfo;
                await guild.members.fetch(user.id)
                .then(member => {
                    memberInfo = member;
                })
                if(memberInfo.voice.channelId && reaction.emoji.name === '✅') {
                    if (!gamers.includes(user.username)) {
                        gamers.push(user.username)
                    } 
                    return true
                } else {
                    msg.channel.send(`${user}, join the voice channel if you wish to play.`)
                }
            }
        }
        
        botReply.awaitReactions({ filter, maxUsers: TEAM_SIZE, time: 1000 * 60})
        .then(collected => {
            const checkmark = collected.first();
            if(gamers.length < TEAM_SIZE){
                msg.channel.send(`Only ${gamers.length} ${pluralGamers(gamers.length)} reacted.`)
                return
            }
            const teams = teamGenerator(gamers);

            let embed = new MessageEmbed();
            embed.setTitle("Randomly generated teams")
            .addFields(
                { name: teams.teamOne.name, value: teams.teamOne.players.join('\n') },
                { name: teams.teamTwo.name, value: teams.teamTwo.players.join('\n') },
            )

            msg.channel.send({ embeds: [embed] })
        })
    })

    return;
}

const milkman = (msg) => {
    if(msg.mentions.users.first()) {
        msg.delete();
        msg.channel.send(`${msg.mentions.users.first()} THE MILKMAN IS FUCKING YOUR WIFE!!!`)
    }
}


const version = (msg) => {
    msg.reply(`Current version: \`${package.version}\` \nLatest commit: \`${revision}\``)
}

const team_generator = (msg, client, args) => {
    rank = {
        "iron": 5, 
        "bronze": 10, 
        "silver": 15, 
        "gold": 20, 
        "platinum": 25, 
        "diamond": 30, 
        "master": 35, 
        "grandmaster": 40, 
        "challenger": 45
    }
    let team1 = {}
    let team2 = {}
    args.forEach(x => 
        config.RIOT_API_KEY
    )
}

const get_league_rank_internal = ( summoner ) => {
    config.RIOT_API_KEY
}

const jungle_oncall  = (msg) => {
    let embed = new MessageEmbed();
    
    embed.setTitle("Jungle Oncall")
    .setColor(0x3498DB)
    .setDescription('Use this message to see the oncall for jungle')
    .setImage("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/Graves.png")
    .setThumbnail("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/Graves.png")
    .setTimestamp()
    .setFooter({text: "MAKE JOE JUNGLE AGAIN", iconURL: "http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/Urgot.png"});
    msg.reply({ embeds: [embed] })
    return;
}

const help = (msg) => {
    let embed = new MessageEmbed();
    embed.setTitle("Eeek games bot commands")
    .setDescription('Use the prefix \'!\' plus the following commands')
    .setAuthor({ name: 'Created by the dev boys', iconURL: 'https://cdn.discordapp.com/emojis/660667449620037674.gif?size=96&quality=lossless', url: 'https://github.com/vevinkirk/eeekgamesbot' })
    .addFields(
        { name: "!ping", value: "Bot replies with 'Pong'." },
        { name: "!tanner", value: "Bot replies with 'FUCK TANNER'." },
        { name: "!mastery [summoner name]", value: "Bot will reply with the summoners top 3 champions." },
        { name: "!milkman [@discord name]", value: "The milkman will fuck their wife." },
        { name: "!teams", value: "Bot will create a message 10 users must react to within one minute. Once 10 users react, the bot will generate and post teams." },
        { name: "!version", value: "Display version and latest commit." },
    )
    .setImage('https://cdn.discordapp.com/attachments/866869860319232022/941456015826759761/812DC7BE-FA2C-4D82-9074-79789A4145A3.jpg')
    .setFooter({ text: "Nice cock bro", iconURL: "https://cdn.discordapp.com/emojis/592482696920432652.webp?size=96&quality=lossless"});

    msg.reply({ embeds: [embed] })
    return;
}

module.exports = { ping, tanner, mastery, jungle_oncall, team_generator, milkman, teams, help, version };
