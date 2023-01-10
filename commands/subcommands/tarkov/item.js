const { request, gql } = require('graphql-request');
const { EmbedBuilder } = require('discord.js');
const { formatNumber } = require('../../../utilities/helpers')

function createEmbed(itemObject) {
  const itemEmbed =  new EmbedBuilder()
      .setTitle(`${itemObject.name}`)
      .setImage(itemObject.image512pxLink)
      .setColor(0x0099FF)
      .addFields(
        { name: "Description", value: `${itemObject.description}` },
        { name: "Base price", value: `${formatNumber(itemObject.basePrice, 'RUB')}`},
        { name: "Average 24 hour flea price", value: `${formatNumber(itemObject.avg24hPrice, 'RUB')}`},
      )
      if(itemObject.usedInTasks.length) {
        itemObject.usedInTasks.forEach(task => {
          itemEmbed.addFields({
            name: `Required for task at player level ${task.minPlayerLevel}`,
            value: `${task.name} - ${task.trader.name}`,
          })
        })
      }
  return itemEmbed
}

const item = async (interaction) => {
  const itemString = interaction.options.getString("item", true);

  const query = gql`
    {
      items(name: "${itemString}") {
        name
        avg24hPrice
        image512pxLink
        basePrice
        description
        usedInTasks {
          trader {
            name
          } 
          name
          minPlayerLevel
        }
      }
    }
  `
  try {
    await request('https://api.tarkov.dev/graphql', query)
      .then(data => {
        if (data) {
          interaction.editReply({
            embeds: [createEmbed(data.items[0])],
          });
        } else {
          interaction.editReply({
            content: "Error",
          });
        }
    })
  } catch (err) {
    console.log({ err })
    await interaction.editReply('An error ocurred');
  }
};

module.exports = {
  item
}
