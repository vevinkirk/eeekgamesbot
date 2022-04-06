const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
}


const isIdentile = (string) => {
    const letters = string.split('');
    const unique = new Set(letters)
    
    return unique.size === 1 ? true: false;
}

const adjectiveArray = [
    'Filthy',
    'Naked',
    'Wife-fucking',
    'Wasted',
    'Limp',
    'Libtard',
    'Trump-loving',
    'Homeless',
    'Canned',
    'Gay',
    'CIS',
    'Braindead',
    'Sorry'
]

const nounArray = [
    'Cucks',
    'Milkmen',
    'Farts',
    'Punching Bags',
    'Gamers',
    'White Guys',
    'Nerds',
    'Cocks',
    'Ballers',
    'Winners',
    'Losers',
    'Brain Geniuses',
    'Scientists'
]

const teamGenerator = (arr) => {
    let tempAdjArr = adjectiveArray;
    let tempNounArr = nounArray;
    let teamOne = {}, teamTwo = {};
    teamOne.name = `${tempAdjArr.splice(Math.floor(Math.random()*tempAdjArr.length), 1)} ${tempNounArr.splice(Math.floor(Math.random()*tempNounArr.length), 1)}`;
    teamTwo.name = `${tempAdjArr.splice(Math.floor(Math.random()*tempAdjArr.length), 1)} ${tempNounArr.splice(Math.floor(Math.random()*tempNounArr.length), 1)}`;
    shuffle(arr);
    teamOne.players = arr.slice(0,5);
    teamTwo.players = arr.slice(5,11);
    return { teamOne, teamTwo }
}

const pluralGamers = (num) => {
    return num === 1 ? 'gamer' : 'gamers';
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


module.exports = { teamGenerator, isIdentile, getRandomInt, pluralGamers };
