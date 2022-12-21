const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('milkman')
      .setDescription('Sends the milkman out to bang some loser\'s wife.')
      .addUserOption(option =>
        option
            .setName('user')
            .setDescription('The users who\`s wife get absolutely fucking raw-dogged.')
            .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.reply(`${interaction.options.getUser('user')} THE MILKMAN IS FUCKING YOUR WIFE!!!`)
    }
  };
  