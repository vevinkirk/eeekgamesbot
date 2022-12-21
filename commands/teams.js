const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { teamGenerator, pluralGamers } = require("../utilities/helpers.js");

function createTeamsEmbed(gamerArray, rerolledBy) {
  const teams = teamGenerator(gamerArray);
  const teamEmbed =  new EmbedBuilder()
    .setTitle("Randomly generated teams")
    .addFields(
      { name: teams.teamOne.name, value: teams.teamOne.players.join('\n') },
      { name: teams.teamTwo.name, value: teams.teamTwo.players.join('\n') },
    )
    if(rerolledBy) {
      teamEmbed.setDescription(`Rerolled by ${rerolledBy}`)
    }
  return teamEmbed
}

async function generateTeams(interaction, rerolledBy) {
  let channel = interaction.member.voice.channel;
  if(!channel) {
    await interaction.reply("You must be in a voice chat to create teams.")
  } else {
    let membersInVoiceChannel = [];
    // let membersInVoiceChannel = ['one','two','three','four','five','six','seven','eight', 'nine'];
    channel.members.forEach(({ user }) => {
      membersInVoiceChannel.push(user.username)
    });
    if(membersInVoiceChannel.length < 10) {
      await interaction.reply(`Ten gamers are required to create teams. We currently only have \`${membersInVoiceChannel.length}\` in voice chat.`)
    } else if (membersInVoiceChannel.length > 10) {
      await interaction.reply("You have too many players, please ensure only 10 gamers are connected. `Exclude` command coming soon.")
    } else {
      // create teams and response
      const row = new ActionRowBuilder()
        .addComponents(
          // new ButtonBuilder()
          //   .setCustomId('start-teams')
          //   .setLabel('Start')
          //   .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId('reroll')
            .setLabel('Re-Roll')
            .setStyle(ButtonStyle.Danger),
        );

      await interaction.reply({ embeds: [createTeamsEmbed(membersInVoiceChannel, rerolledBy)], components: [row]})
    }
  }
}

module.exports = {
  data: new SlashCommandBuilder()
	.setName('teams')
	.setDescription('Creates teams for league 5v5s'),
  // .addUserOption(option =>
  //   option
  //     .setName('exclude')
  //     .setDescription('The user in the channel who will be excluded from teams creation.')
  // ),
  async execute(interaction) {
    generateTeams(interaction)
  },
  generateTeams
};
