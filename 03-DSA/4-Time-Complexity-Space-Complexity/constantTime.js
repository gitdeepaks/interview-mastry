// O(1)

function accessElement(arr, index) {
  return arr[index];
}

const arr1 = [1, 2, 3, 4, 5];

console.time("accessElement1");
console.log(accessElement(arr1, 1));
console.timeEnd("accessElement1");

const arr2 = Array.from({ length: 10000 }, (_, index) => index + 1);

console.time("accessElement2");
console.log(accessElement(arr2, 100));
console.timeEnd("accessElement2");
