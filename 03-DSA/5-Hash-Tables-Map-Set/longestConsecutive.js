function longestConsecutive(nums) {
  const numSet = new Set();

  const longestSequence = 0;

  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      let currentNum = num;

      let currentSequence = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentSequence++;
      }
      longestSequence = Math.max(longestSequence, currentSequence);
    }
  }

  return longestSequence;
}
