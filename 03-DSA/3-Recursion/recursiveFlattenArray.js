function recursivFlattenArray(arr) {
  let result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(recursivFlattenArray(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

console.log(recursivFlattenArray([1, 2, [2, 3, [6, 8]]]));
