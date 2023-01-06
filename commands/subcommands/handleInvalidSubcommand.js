/**
 * This handles a case where a proper subcommand handler isn't found.
 */
export const handleInvalidSubcommand = async (
  interaction
) => {
  try {
    await interaction.editReply({
      content: "Command Invalid!",
    });
  } catch (err) {
    await interaction.reply('Error ocurred')
  }
};