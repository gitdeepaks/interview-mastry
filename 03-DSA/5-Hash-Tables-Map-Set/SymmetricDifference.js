function SymmetricDifference(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  const result = [];

  for (const num of arr1) {
    if (!set2.has(num)) {
      result.push(num);
    }
  }

  for (const num of arr2) {
    if (!set1.has(num)) {
      result.push(num);
    }
  }

  return result;
}

const res = SymmetricDifference([1, 2, 3], [2, 3, 4]);
console.log(res);
