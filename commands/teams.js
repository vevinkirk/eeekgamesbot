const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { teamGenerator } = require("../utilities/helpers.js");

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
  const channel = interaction.member.voice.channel;
  let excudeArr = []
  if(!rerolledBy) {
    excudeArr = [
      interaction.options.getUser("excluded1") ? interaction.options.getUser("excluded1").username : null, 
      interaction.options.getUser("excluded2") ? interaction.options.getUser("excluded2").username : null, 
      interaction.options.getUser("excluded3") ? interaction.options.getUser("excluded3").username : null, 
      interaction.options.getUser("excluded4") ? interaction.options.getUser("excluded4").username : null, 
      interaction.options.getUser("excluded5") ? interaction.options.getUser("excluded5").username : null
    ];
  }
  if(!channel) {
    await interaction.reply("You must be in a voice chat to create teams.")
  } else {
    // let membersInVoiceChannel = [];
    let membersInVoiceChannel = ['one','two','three','four','five','six'];
    channel.members.forEach(({ user }) => {
      if(!excudeArr.includes(user.username)) {
        membersInVoiceChannel.push(user.username)
      }
    });
    console.log({membersInVoiceChannel})
    if(membersInVoiceChannel.length < 10) {
      await interaction.reply(`Ten gamers are required to create teams. We currently only have \`${membersInVoiceChannel.length}\` in voice chat.`)
    } else if (membersInVoiceChannel.length > 10) {
      if(rerolledBy) {
        await interaction.reply("Reroll does not work when excluding gamers. Use `teams` command again");
      } else {
        await interaction.reply("You have too many players, please ensure only 10 gamers are connected. Use `Exclude` option to specify gamers to remove.");
      }
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
	.setDescription('Creates teams for league 5v5s')
  .addUserOption(option =>
    option
      .setName('excluded1')
      .setDescription('The user in the channel who will be excluded from teams creation.')
  )
  .addUserOption(option =>
    option
      .setName('excluded2')
      .setDescription('The second user in the channel who will be excluded from teams creation.')
  )
  .addUserOption(option =>
    option
      .setName('excluded3')
      .setDescription('The third user in the channel who will be excluded from teams creation.')
  )
  .addUserOption(option =>
    option
      .setName('excluded4')
      .setDescription('The fourth user in the channel who will be excluded from teams creation.')
  )
  .addUserOption(option =>
    option
      .setName('excluded5')
      .setDescription('The fifth user in the channel who will be excluded from teams creation.')
  ),
  async execute(interaction) {
    generateTeams(interaction)
  },
  generateTeams
};
