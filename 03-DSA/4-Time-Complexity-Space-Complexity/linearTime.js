function sumArray(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum;
}

const arr1 = [1, 2, 3, 4, 5];

console.time("Sum Array 1");
console.time(sumArray(arr1));
console.timeEnd("Sum Array 1");

const arr2 = Array.from({ length: 100000000 }, (_, index) => index + 1);
console.time("Sum Array 2");
console.time(sumArray(arr2));
console.timeEnd("Sum Array 2");
