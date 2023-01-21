const { PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { calculateMilliseconds }  = require("../../../utils/calculateMiliseconds");

const handleTimeout = async (interaction) => {

  function createErrEmbed(err) {
    return new EmbedBuilder()
      .setTitle('Something went wrong. Please try again later.')
      .setColor(0xc72c3b)
      .addFields({
        name: 'Error',
        value: `${err}`
      })
  }

  try {
    const { guild, member, options } = interaction;
    const target = options.getUser("target", true);
    const targetMember = guild.members.cache.get(target.id);
    const duration = options.getInteger("duration", true);
    const durationUnit = options.getString("unit", true);
    const reason = options.getString("reason", true);
    const durationMilliseconds = calculateMilliseconds(duration, durationUnit);

    const successEmbed = new EmbedBuilder()
      .setTitle(":white_check_mark: Timeout")
      .setDescription(`${target} has been Timed out.`)
      .setColor(0x0099FF)
      .addFields({
        name: 'Reason',
        value: `${reason}`,
        inline: true
      })
      .addFields({
        name: 'Time',
        value: `${duration} ${durationUnit}`,
        inline: true
      })

    if (!durationMilliseconds) {
      await interaction.editReply({
        content: "Invalid duration!",
      });
      return;
    }

    if (durationMilliseconds > 2419200000) {
      await interaction.editReply({
        content: "Duration too long!",
      });
      return;
    }

    if (!guild) {
      await interaction.editReply({
        content: "Missing Guild!!",
      });
      return;
    }

    const channel = targetMember.voice.channel

    // check if member has moderation perms
    if (
      !member ||
      typeof member.permissions === "string" ||
      !member.permissions.has(PermissionFlagsBits.ModerateMembers) ||
      !targetMember
    ) {
      await interaction.editReply({
        content: "You don't have permission to do that!",
      });
      return;
    }

    if(!channel) {
      await interaction.editReply({
        content: "Target user is not connected to voice.",
      });
      return;
    }

    if (!targetMember) {
      await interaction.editReply({
        content: "That user appears to have left the guild.",
      });
      return;
    }

    if (target.id === member.user.id) {
      await interaction.editReply({
        content: "You can't timeout yourself!",
      });
      return;
    }
    
    // Bot ID
    if (target.id === 948683359549292544) {
      await interaction.editReply({
        content: "You can't timeout me!",
      });
      return;
    }

    await targetMember.timeout(durationMilliseconds, reason);

    await interaction.editReply({
      embeds: [successEmbed]
    });
  } catch (err) {
    console.log({err})
    await interaction.editReply({
      embeds: [createErrEmbed(err)]
    });
  }
};

module.exports = {
  handleTimeout
}