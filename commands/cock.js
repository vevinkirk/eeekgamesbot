const { SlashCommandBuilder } = require("discord.js");
const { getRandomInt } = require("../utilities/helpers.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cock")
    .setDescription("Confirms who's got a cock on em")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The users who`s got a massive cock on em.")
        .setRequired(true)
    ),
  async execute(interaction) {
    inch = getRandomInt(1, 13);
    const user = interaction.options.getUser("user");
    if (user.id == 687842330006519880) {
      await interaction.reply(
        `${interaction.options.getUser(
          "user"
        )} does not in fact have a cock on them, <:sadge:725467934893408309>`
      );
    } else if (user.id == 553792724373864448 || user.id == 116698813372039171) {
      await interaction.reply(
        `${interaction.options.getUser(
          "user"
        )} has a ton of privilege but not cock to be found.`
      );
    } else if (inch >= 5) {
      await interaction.reply(
        `${interaction.options.getUser("user")} GOT A ${inch} INCH HOG ON EM!!!`
      );
    } else if (inch > 5 && inch <= 7) {
      await interaction.reply(
        `${interaction.options.getUser(
          "user"
        )} has a totally above average ${inch} inch cock on em`
      );
    } else {
      `${interaction.options.getUser(
        "user"
      )} has a tiny little ${inch} inch baby ween.`;
    }
  },
};
