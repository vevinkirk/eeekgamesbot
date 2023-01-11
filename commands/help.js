const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const help = new EmbedBuilder()
  .setTitle("Eeek games bot commands")
  .setDescription("List of commands available with Eeek games bot")
  .setAuthor({
    name: "A VirkCorn Original",
    iconURL:
      "https://cdn.discordapp.com/emojis/660667449620037674.gif?size=96&quality=lossless",
    url: "https://github.com/vevinkirk/eeekgamesbot",
  })
  .addFields({
    name: "\u200B",
    value:
      "`teams` - Create randomly generated teams. \n `mastery` - Bot will reply with the summoners top 3 champions. \n `milkman` - The milkman will fuck their wife. \n `version` - Shows current bot version and latest commit. \n `tarkov item` - Display tarkov item description, price, and average flea price over the last 24 hours. \n `hog` - Determine whether a user has a hog on them. \n",
    inline: true,
  })
  .setImage(
    "https://cdn.discordapp.com/attachments/278730910906581004/1061541169177296956/IMG_3183.png"
  )
  .setFooter({
    text: "Nice cock bro",
    iconURL:
      "https://cdn.discordapp.com/emojis/592482696920432652.webp?size=96&quality=lossless",
  });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Displays all available commands"),
  async execute(interaction) {
    await interaction.reply({ embeds: [help] });
  },
};
