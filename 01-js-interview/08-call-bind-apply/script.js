// var obj = { name: "Deepak" };

// const { errors } = require("undici-types");

// function sayHello(age, profession) {
//   return "Hello " + this.name + "is" + age + "is a" + profession;
// }
// const bindFunc = sayHello.bind(obj);
// console.log(bindFunc(33, "Softwere Developer"));

// // Question-4
// const person = { name: "Deepak" };

// function sayHI(age) {
//   return `${this.name} is ${age}`;
// }
// // console.log(sayHI.call(person, 33));
// // console.log(sayHI.bind(person, 33));

// const age = 10;

// var person1 = {
//   name: "Deepak",
//   age: 20,
//   getAge: function () {
//     return this.age;
//   },
// };

// var person2 = { age: 24 };

// // console.log(person1.getAge.call(person2));

// // var status = "😎";

// // setTimeout(() => {
// //   const status = "😍";

// //   const data = {
// //     status: "🥑",
// //     getStatus() {
// //       return this.status;
// //     },
// //   };

// //   console.log(data.getStatus());

// //   console.log(data.getStatus.call(this));
// // }, 0);

// const animals = [
//   { species: "Lion", name: "Heera" },
//   { species: "Whale", name: "Fishu" },
// ];

// function printAnimals(i) {
//   this.print = function () {
//     console.log("#" + i + " " + this.species + ": " + this.name);
//   };
//   this.print;
// }
// for (let i = 0; i < animals.length; i++) {
//   printAnimals.call(animals[i], i);
// }

// // append an Array to another Array

// const arr = ["a", "b"];

// const element = [1, 2, 3];

// arr.push.apply(arr, element);

// console.log(arr);

// // using apply usning builtIn finction in JS

// //find min/max number in an Array

// const number = [5, 6, 2, 3, 7];

// console.log(Math.max.apply(null, number));

// // bound function

// function f() {
//   console.log(this);
// }

// let user = {
//   g: f.bind(null),
// };

// user.g();

// //bind chaining

// function f1() {
//   console.log(this.name);
// }

// f1 = f1.bind({ name: "John" }).bind({ name: "Hekko" });

// f1();

// fix the error

// function checkPassword(success, failed) {
//   let password = prompt("password", "");
//   if ((password = "BadCoder")) {
//     success();
//   } else failed();
// }

// let user1 = {
//   name: "Deepak Sankhyan",

//   loginSucess() {
//     console.log(`${this.name} logged in`);
//   },
//   loginFailed() {
//     console.log(`${this.name} log in failed`);
//   },
// };

// checkPassword(user1.loginSucess.bind(user1), user1.loginFailed.bind(user1));

// Explicit binding with Arrow function

// const age = 10;

// var person = {
//   name: "Piyush",
//   age: 33,
//   getAgeArrow: () => console.log(this.age),
//   getAge: function () {
//     console.log(this.age);
//   },
// };

// var person2 = { age: 24 };

// person.getAgeArrow.call(person2);
// person.getAge.call(person2);

// polyfill for call bind and apply

let car1 = {
  color: "Red",
  company: "Ferrari",
};

function purchaseCar(currency, price) {
  console.log(
    `I have purchased ${this.color} - ${this.company} car from my money ${currency} ${price}`
  );
}

// Function.prototype.myCall = function (currentContext = {}, ...arg) {
//   if (typeof this !== "function") {
//     throw new Error(this + "it's not callable");
//   }
//   currentContext.fn = this;
//   currentContext.fn(...arg);
// };

// // purchaseCar.call(car1, "$", 5000000);
// purchaseCar.myCall(car1, "$", 5000000);

// Question 16 : Apply Method Polyfill
// Function.prototype.myApply = function (currentContext = {}, argsArray = []) {
//   if (typeof this !== "function") {
//     throw new Error(this + "it's not callable");
//   }

//   if (Array.isArray(argsArray)) {
//     throw new TypeError("CreatingListFromArrayLike called");
//   }
//   currentContext.fn = this;
//   currentContext.fn(...argsArray);
// };

Function.prototype.myBind = function (currentContext = {}, ...arg) {
  if (typeof this !== "function") {
    throw new Error(this + "cannot be bound as it's not callable");
  }
  currentContext.fn = this;
  return function (...newArgs) {
    return currentContext.fn(...arg, ...newArgs);
  };
};

const newFunc = purchaseCar.myBind(car1);
console.log(newFunc("$", 50000000));
