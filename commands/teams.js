const { MessageEmbed } = require('discord.js');
const { teamGenerator, pluralGamers } = require("../utilities/helpers.js");

const teams = (msg, client) => {
    if (!msg.member.voice.channelId) {
        msg.reply('You must be in a voice channel to do that.');
        return;
    }
    const guild = client.guilds.cache.get(msg.guildId);
    const TEAM_SIZE = 10;
    // let gamers = ['one','two','three','four','five','six','seven','eight','nine'];
    let gamers = [];

    msg.reply('Click the green checkmark while in a voice channel if you\'re playing 10s.')
    .then(botReply => {
        botReply.react('✅')
        
        // Check if user is in voice channel, reacting with correct emote and not a bot.
        const filter = async (reaction, user) => {
            if(!user.bot) {
                let memberInfo;
                await guild.members.fetch(user.id)
                .then(member => {
                    memberInfo = member;
                })
                if(memberInfo.voice.channelId && reaction.emoji.name === '✅') {
                    if (!gamers.includes(user.username)) {
                        gamers.push(user.username)
                    } 
                    return true
                } else {
                    msg.channel.send(`${user}, join the voice channel if you wish to play.`)
                }
            }
        }
        
        botReply.awaitReactions({ filter, maxUsers: TEAM_SIZE, time: 1000 * 60})
        .then(collected => {
            if(gamers.length < TEAM_SIZE){
                msg.channel.send(`Only ${gamers.length} ${pluralGamers(gamers.length)} reacted.`)
                return
            }
            const teams = teamGenerator(gamers);

            let embed = new MessageEmbed();
            embed.setTitle("Randomly generated teams")
            .addFields(
                { name: teams.teamOne.name, value: teams.teamOne.players.join('\n') },
                { name: teams.teamTwo.name, value: teams.teamTwo.players.join('\n') },
            )

            msg.channel.send({ embeds: [embed] })
        })
    })

    return;
}

module.exports = teams;