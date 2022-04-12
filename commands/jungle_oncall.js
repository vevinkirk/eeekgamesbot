const { MessageEmbed } = require('discord.js');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const jungle_oncall  = (msg) => {
    const members_array = []
    let channel = msg.member.voice.channel.members.each(member=>{
      members_array.push(member.user.tag)
   })
   let arr_len = members_array.length
   flag = getRandomInt(0,(arr_len-1))
   console.log("Jungle oncall is" + members_array[flag])
   msg.reply("Jungle oncall is" + members_array[flag])

}

module.exports = jungle_oncall;
