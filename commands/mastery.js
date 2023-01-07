const axios = require('axios')
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require("../config.json");
const champData = require("../static/champions.json")

function createEmbed(summonerName, champions) {
    const masteryEmbed =  new EmbedBuilder()
        .setTitle(`${summonerName} mastery`)
        .setImage(champions[0].image)
        .setColor(0x0099FF);

    champions.forEach(champ => {
        masteryEmbed.addFields(
            { name: "Champion", value: `${champ.name}` },
            { name: "Mastery level", value: `${champ.masteryLevel}`, inline: true },
            { name: "Mastery points", value: `${champ.masteryPoints}`, inline: true },
        )
    })
    return masteryEmbed
}

async function mastery(interaction) {
    const summonerName = interaction.options.getString('summoner');
    console.log({ summonerName })
    const summonerApi = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${config.RIOT_API_KEY}`;
    const masteryApi = 'https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner';
    const champImageUrl = `http://ddragon.leagueoflegends.com/cdn/${champData.version}/img/champion/`;
    let summonerInfo = '';
    try {
        await axios.get(summonerApi)
        .then(res => {
            summonerInfo = res.data
        })
        .then(() => {
            axios.get(`${masteryApi}/${summonerInfo.id}?api_key=${config.RIOT_API_KEY}`)
            .then(async (res) => {
                try {
                    let champs = res.data.slice(0, 3);
                    let champArr = []
                    champs.forEach((champ) => {
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
                    await interaction.reply({ embeds: [createEmbed(summonerName, champArr)]});
                } catch (error) {
                    await interaction.reply(`Error: ${error}`);
                }
            })
        })
    } catch (error) {
        console.log({ error })
        await interaction.reply(`Error: Summoner ${summonerName} not found. If this seems to be an error, check your API key.`);
    }
    return;
}

module.exports = {
  data: new SlashCommandBuilder()
	.setName('mastery')
	.setDescription('Looks up a players top three champions by summoner name')
    .addStringOption(option =>
        option
          .setName('summoner')
          .setDescription('The summoner name of the player youd like to look up.')
          .setRequired(true)
    ),
  async execute(interaction) {
    mastery(interaction)
  }
};
