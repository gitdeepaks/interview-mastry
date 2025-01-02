function anagramGrouping(words) {
  const anagramGroups = new Map();

  for (const word of words) {
    const sortedChars = word.split("").sort().join("");

    if (anagramGroups.has(sortedChars)) {
      anagramGroups.get(sortedChars).push(word);
    } else {
      anagramGroups.set(sortedChars, [word]);
    }
  }
  return Array.from(anagramGroups.values());
}

const items = ["cat", "dog", "act", "god", "tac", "map", "amp"];

console.log(anagramGrouping(items));
