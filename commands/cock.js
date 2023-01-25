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
    inch = getRandomInt(1,13)
    const user = interaction.options.getUser("user")
    if (user.id == 687842330006519880){
      await interaction.reply(
        `${interaction.options.getUser("user")} does not in fact have a cock on them, sadge :( `
      );
    } else if (user.id == 553792724373864448){
      await interaction.reply(
      `${interaction.options.getUser("user")} might have a cock on him if he ever coded, sadge :( `
      )
    } else {
      await interaction.reply(
        `${interaction.options.getUser("user")} GOT A ${inch} INCH COCK ON EM!!!`
      );
    }
  },
};

