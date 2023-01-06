const { PermissionFlagsBits } = require("discord.js");
const { calculateMilliseconds }  = require("../../../utils/calculateMiliseconds");

const handleMute = async (interaction) => {
  try {
    const { guild, member } = interaction;
    const target = interaction.options.getUser("target", true);
    const duration = interaction.options.getInteger("duration", true);
    const durationUnit = interaction.options.getString("unit", true);
    const reason = interaction.options.getString("reason", true);
    const durationMilliseconds = calculateMilliseconds(duration, durationUnit);

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

    const targetMember = await guild.members.fetch(target.id).catch(() => null);

    const channel = targetMember.voice.channel

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
        content: "You can't mute yourself!",
      });
      return;
    }
    
    // Bot ID
    if (target.id === 948683359549292544) {
      await interaction.editReply({
        content: "You can't mute me!",
      });
      return;
    }

    const targetUser = await guild.members.fetch(target.id);

    await targetUser.timeout(durationMilliseconds, reason);

    await interaction.editReply({
      content: "Muted " + target.tag + " for " + reason,
    });
  } catch (err) {
    console.log({err})
    await interaction.editReply('An error ocurred');
  }
};

module.exports = {
  handleMute
}