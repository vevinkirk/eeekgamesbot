const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hog")
    .setDescription("Confirms who's got a hog on em")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription(
          "The users who you want to be impressed by the bots hog."
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply(
      `${interaction.options.getUser("user")} I GOT NO HOG ON ME!!!!`
    );
  },
};
