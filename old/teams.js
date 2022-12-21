const { MessageEmbed } = require('discord.js');
const { teamGenerator, pluralGamers } = require("../utilities/helpers.js");

const updateEmbed = (existingEmbed, userArr) => {
    let users = userArr.length ? userArr.join('\n') : "All users have reacted";
    let newUsersEmbed = new MessageEmbed();
    newUsersEmbed.setTitle("Click the green checkmark while in a voice channel if you\'re playing 10s.")
    .addFields( 
        { name: "The following users have not reacted.", value: users }
    )
    existingEmbed.edit({ embeds: [newUsersEmbed] })
};

const teams = (msg, client) => {
    if (!msg.member.voice.channelId) {
        msg.reply('You must be in a voice channel to do that.');
        return;
    }
    const guild = client.guilds.cache.get(msg.guildId);
    const TEAM_SIZE = 10;
    // let gamers = ['one','two','three','four','five','six','seven','eight','nine'];
    let gamers = [];
    let inChannel = [];

    msg.member.voice.channel.members.each(member=>{
        inChannel.push(member.user.username)
    })

    let usersEmbed = new MessageEmbed();
        usersEmbed.setTitle("Click the green checkmark while in a voice channel if you\'re playing 10s.")
        .addFields( 
            { name: "The following users have not reacted.", value: inChannel.join('\n') }
        )


    msg.reply({ embeds: [usersEmbed] })
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
                        inChannel = [];
                        msg.member.voice.channel.members.each(member=>{
                            inChannel.push(member.user.username)
                        })
                        inChannel = inChannel.filter(user => !gamers.includes(user))
                        updateEmbed(botReply, inChannel)
                    } 
                    return true
                } else if (!memberInfo.voice.channelId) {
                    try {
                        msg.channel.send(`${user}, join the voice channel if you wish to play.`)
                    } catch (error) {
                        console.log({error})
                    }
                }
            }
        }

        client.on("messageReactionRemove", async (reaction, user) => {
            if (user.bot || reaction.message.id !== botReply.id) return;
            if(gamers.includes(user.username)) {
                try {
                    gamers.splice(gamers.indexOf(user.username), 1);
                    inChannel = [];
                    msg.member.voice.channel.members.each(member=>{
                        inChannel.push(member.user.username)
                    })
                    inChannel = inChannel.filter(user => !gamers.includes(user))
                    updateEmbed(botReply, inChannel)
                } catch (error) {
                    console.log({ error })
                }
            }
        });
        
        botReply.awaitReactions({ filter, maxUsers: TEAM_SIZE, time: 1000 * 60})
        .then(collected => {
            if(gamers.length < TEAM_SIZE){
                msg.channel.send(`Only ${gamers.length} ${pluralGamers(gamers.length)} reacted.`)
                return
            }
            try {
                const teams = teamGenerator(gamers);

                let embed = new MessageEmbed();
                embed.setTitle("Randomly generated teams")
                .addFields(
                    { name: teams.teamOne.name, value: teams.teamOne.players.join('\n') },
                    { name: teams.teamTwo.name, value: teams.teamTwo.players.join('\n') },
                )
                msg.channel.send({ embeds: [embed] })
            } catch (error) {
                console.log({error})
            }
        })
    })

    return;
}

module.exports = teams;
