const HashTable = require("./customHashTable");

function wordInstanceCounter(srt, word) {
  const words = srt.toLoerCase().split(/\W+/);

  const worsFrequency = new HashTable();

  const targetWord = word.toLowerCase();

  let count = 0;

  for (const currentWord of words) {
    if (currentWord === "") continue;

    if (worsFrequency.has(currentWord)) {
      worsFrequency.set(currentWord, worsFrequency.get(currentWord));
    } else {
      worsFrequency.set(currentWord, 1);
    }

    if (currentWord === targetWord) {
      count = worsFrequency.get(currentWord);
    }
  }

  return count;
}
