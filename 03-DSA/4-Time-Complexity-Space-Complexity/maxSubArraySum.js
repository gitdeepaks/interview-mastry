function maxSubArraySum(arr, k) {
  let maxSum = -Infinity;

  for (let i = 0; i <= arr.length - k; i++) {
    let currentSum = 0;

    for (let j = i; j < i + k; j++) {
      currentSum += arr[j];
    }
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

const res = maxSubArraySum([1, 2, 3, 4, 5, 6, 7], 3);

console.log(res);
