const milkman = (msg) => {
    if(msg.mentions.users.first()) {
        msg.delete();
        msg.channel.send(`${msg.mentions.users.first()} THE MILKMAN IS FUCKING YOUR WIFE!!!`)
    }
}

module.exports = milkman;
