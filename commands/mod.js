const { SlashCommandBuilder, SlashCommandSubcommandBuilder } = require('discord.js');
const { handleTimeout } = require("./subcommands/moderation/handleTimeout");


const handlers = {
  timeout: handleTimeout,
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mod')
    .setDescription('Moderation commands')
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("timeout")
        .setDescription("Timeouts a user for x amount of time.")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The user to timeout.")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("duration")
            .setDescription("The length of time to timeout the user.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("unit")
            .setDescription("The unit of time for the duration.")
            .setRequired(true)
            .addChoices(
              { name: "Minutes", value: "minutes" },
              { name: "Hours", value: "hours" },
              { name: "Days", value: "days" },
              { name: "Weeks", value: "weeks" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("The reason for muting the user.")
            .setRequired(true)
        )
  ),
  execute: async (interaction) => {
    try {
      await interaction.deferReply();
      const subcommand = interaction.options.getSubcommand();
      const handler = handlers[subcommand] || handleInvalidSubcommand;
      console.log({ subcommand, handler })
      await handler(interaction);
    } catch (err) {
      await interaction.editReply(`An error ocurred: ${err}`);
    }
  },
};
