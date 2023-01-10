const { SlashCommandBuilder, SlashCommandSubcommandBuilder } = require('discord.js');
const { item } = require("./subcommands/tarkov/item");


const handlers = {
  item: item,
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tarkov')
    .setDescription('Tarkov commands')
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("item")
        .setDescription("Checks item details.")
        .addStringOption((option) =>
          option
            .setName("item")
            .setDescription("The name of the item to check.")
            .setRequired(true)
        )
  ),
  execute: async (interaction) => {
    try {
      await interaction.deferReply();
      const subcommand = interaction.options.getSubcommand();
      const handler = handlers[subcommand] || handleInvalidSubcommand;
      await handler(interaction);
    } catch (err) {
      await interaction.editReply('An error ocurred');
    }
  },
};
