const package = require('../package.json');
const revision = require('child_process')
  .execSync('git log -1 --format=%s')
  .toString().trim()

const version = (msg) => {
    msg.reply(`Current version: \`${package.version}\` \nLatest commit: \`${revision}\``)
}

module.exports = version;