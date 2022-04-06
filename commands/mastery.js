const axios = require('axios')
const { MessageEmbed } = require('discord.js');
const config = require("../config.json");
const champData = require("../static/champions.json")

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
        console.log(`api: ${masteryApi}/${summonerInfo.id}?api_key=${config.RIOT_API_KEY}`)
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

module.exports = mastery;