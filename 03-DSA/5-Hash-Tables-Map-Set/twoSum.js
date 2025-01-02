function twoSum(nums, target) {
  const numSet = new Set();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (numSet.has(complement)) {
      return [nums.indexOf(complement), i];
    }

    numSet.add(nums[i]);
  }

  return [];
}

console.log(twoSum([2, 3, 4, 5, 6], 19));
