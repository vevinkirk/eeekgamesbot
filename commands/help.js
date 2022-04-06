const { MessageEmbed } = require('discord.js');

const help = (msg) => {
    let embed = new MessageEmbed();
    embed.setTitle("Eeek games bot commands")
    .setDescription('Use the prefix \'!\' plus the following commands')
    .setAuthor({ name: 'Created by the dev boys', iconURL: 'https://cdn.discordapp.com/emojis/660667449620037674.gif?size=96&quality=lossless', url: 'https://github.com/vevinkirk/eeekgamesbot' })
    .addFields(
        { name: "!mastery [summoner name]", value: "Bot will reply with the summoners top 3 champions." },
        { name: "!milkman [@discord name]", value: "The milkman will fuck their wife." },
        { name: "!teams", value: "Bot will create a message 10 users must react to within one minute. Once 10 users react, the bot will generate and post teams." },
    )
    .setImage('https://cdn.discordapp.com/attachments/866869860319232022/941456015826759761/812DC7BE-FA2C-4D82-9074-79789A4145A3.jpg')
    .setFooter({ text: "Nice cock bro", iconURL: "https://cdn.discordapp.com/emojis/592482696920432652.webp?size=96&quality=lossless"});

    msg.reply({ embeds: [embed] })
    return;
}

module.exports = help;
