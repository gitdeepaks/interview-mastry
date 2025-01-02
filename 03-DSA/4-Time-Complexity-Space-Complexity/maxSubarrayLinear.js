function maxSubarrayLinear(arr, k) {
  let currentSum = 0;
  let maxSum = 0;

  // Initialize the sum of the first k elements
  for (let i = 0; i < k; i++) {
    maxSum += arr[i];
  }

  currentSum = maxSum;

  // Sliding window
  for (let j = k; j < arr.length; j++) {
    currentSum = currentSum - arr[j - k] + arr[j];
  }

  return maxSum;
}

const res = maxSubarrayLinear([1, 2, 3, 4, 5, 6, 7], 3);
console.log(res);
