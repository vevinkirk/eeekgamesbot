const { MessageEmbed } = require('discord.js');

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

  module.exports = jungle_oncall;
