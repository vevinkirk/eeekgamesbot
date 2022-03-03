const axios = require('axios')
const { MessageEmbed } = require('discord.js');
const config = require("../config.json");
const champData = require("../static/champions.json")

const ping = (msg) => {
    msg.reply('Pong')
    return;
}

const tanner = (msg) => {
    msg.reply('FUCK TANNER')
    return;
}

const mastery = (msg, args) => {
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

const help = (msg) => {
    let embed = new MessageEmbed();
    embed.setTitle("Eeek games bot commands")
    .setDescription('Use the prefix \'!\' plus the following commands')
    .setAuthor({ name: 'Created by the dev boys', iconURL: 'https://cdn.discordapp.com/emojis/660667449620037674.gif?size=96&quality=lossless', url: 'https://github.com/vevinkirk/eeekgamesbot' })
    .addFields(
        { name: "!ping", value: "Bot replies with 'Pong'." },
        { name: "!tanner", value: "Bot replies with 'FUCK TANNER'." },
        { name: "!mastery [summoner name]", value: "Bot will reply with the summoners top 3 champions." }
    )
    .setImage('https://cdn.discordapp.com/attachments/866869860319232022/941456015826759761/812DC7BE-FA2C-4D82-9074-79789A4145A3.jpg')
    .setFooter({ text: "Nice cock bro", iconURL: "https://cdn.discordapp.com/emojis/592482696920432652.webp?size=96&quality=lossless"});

    msg.reply({ embeds: [embed] })
    return;
}

module.exports = { ping, tanner, mastery, help };