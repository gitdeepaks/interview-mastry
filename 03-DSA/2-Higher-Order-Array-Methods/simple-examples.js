const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map
const dubuledNumbers = numbers.map((num, index) => {
  //   console.log(index);

  return num * 2;
});

// console.log(dubuledNumbers);

// filter

const evenNumbers = numbers.filter((num) => {
  return num >= 5;
});

// console.log(evenNumbers);

//reduce

const sum = numbers.reduce((acc, num) => {
  return acc + num;
}, 0);

// console.log(sum);

// forEach
numbers.forEach((num) => {
  console.log(num);
});

// find
const foundNumber = numbers.find((num) => {
  return num > 3;
});

console.log(foundNumber);

// some

const hasEvenNumber = numbers.some((num) => num < 10);

console.log(hasEvenNumber);

// every

const allNums = numbers.every((num) => num > 10);
console.log(allNums);
