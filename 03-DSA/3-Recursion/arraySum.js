function arraySum(arr) {
  if (arr.length === 0) {
    return 0;
  }

  return arr[0] + arraySum(arr.slice(1));
}

console.log(arraySum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100]));
