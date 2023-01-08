const { SlashCommandBuilder } = require("discord.js");

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
    await interaction.reply(
      `${interaction.options.getUser("user")} GOT A COCK ON EM!!!`
    );
  },
};
