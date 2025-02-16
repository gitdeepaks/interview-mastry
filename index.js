// // // const user = {
// // //   firstName: "Piyush!",
// // //   getName() {
// // //     const firstName = "Piyush!";
// // //     return this.firstName;
// // //   },
// // // };

// // // console.log(object.getMessage());

// // const set = new Set([3, 2, 1, 1, 2]);
// // console.log(set);

// // set.add(1);
// // set.add(2);
// // set.add(1);

// const newArr = ["deepak", "vignesh", "saif"];

// for (const arr of newArr) {
//   console.log(arr + "-surname");
// }

// const mySurName = newArr.map((arr) => arr + "-mapsurname");

// console.log(mySurName);

// const surname = "SurnameForEach";

// let updatedArr = [];
// newArr.forEach((name) => {
//   updatedArr.push(`${name} ${surname}`);
// });

// console.log(updatedArr);

function sum(...nums) {
  return nums.reduce((acc, currVal) => acc + currVal, 0);
}

console.log(sum(1, 2, 3, 4, 5));

const run = (message) => {
  console.log(message);
};

run("hello");

function add(counter) {
  return function anotherSun(nums) {
    counter++;
  };
}

Function.prototype.des = function () {
  console.log(`description ${this.name}`);
};

function greet() {
  return `Hello, ${this.name}!`;
}

greet.des();

greet.des("deepak");

function add(a, b) {
  return a + b;
}

const subs = function (a, b) {
  return a - b;
};

const multiply = (a, b) => a * b;

function applyOne(a, b, operation) {
  return operation(a, b);
}

const res = applyOne(2, 3, (a, b) => a + b);

function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}
