const first = [
  'Sprightly',
  'Mongo',
  'Tepid',
  'Slowly',
  'Dirty',
  'Messy',
  'Silly',
  'Teeny Tiny',
  'Big Bad'
];
const last = [
  'Monkey',
  'Caterpiller',
  'Bengal Cat',
  'Tarzan',
  'The Rock',
  'King Kong',
  'Godzilla',
  'Spongebob',
  'T-Rex'
];

let permutations = {
  'Anonymouse': true,
  'KING OF THE JUNGLE': true
};

for (const a of first) {
  for (const b of last) {
    permutations[`${a} ${b}`] = true
  }
}

const keys = Object.keys(permutations);
const size = keys.length;

module.exports = () => {
  const getName = () => {
    //Try three times to find a unique username. After that, just grab a dupe.
    //This is a temporary solution, and we likely won't have enough users.
    const attempts = 3
    for (i = 0; i < attempts; i++) {
      const index = Math.floor(Math.random() * size);
      if (permutations[keys[index]] || (i + 1 == attempts)) {
        return keys[index];
      }
    }
  };

  const returnName = (name) => {
    permutations[name] = true;
  }

  return {
    getName,
    returnName
  }
}