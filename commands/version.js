const package = require('../package.json');
const { SlashCommandBuilder } = require('discord.js');
const revision = require('child_process')
  .execSync('git log -1 --format=%s')
  .toString().trim()


module.exports = {
  data: new SlashCommandBuilder()
    .setName('version')
    .setDescription('Replies with bot version.'),
  async execute(interaction) {
    await interaction.reply(`Current version: \`${package.version}\` \nLatest commit: \`${revision}\``)
  }
};
