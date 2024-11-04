// // // this in Javascript
// // // this.a = 5;

// // // const getPeram = () => {
// // //   console.log(this.a);
// // // };
// // // getPeram();

// // let user = {
// //   name: "deepak",
// //   age: 33,

// //   getDetails: () => {
// //     nestedArraow: () => console.log(this.name);
// //     nestedArraow();
// //   },
// // };

// // user.getDetails();

// // class user {
// //   constructor(name) {
// //     this.name = n;
// //   }

// //   hetNAme() {
// //     console.log(this.name);
// //   }
// // }

// // const User = new user("Deepak");

// // console.log(User);

// // User.hetNAme();

// // const user = {
// //   firstName: "Deepak1",

// //   getName() {
// //     const firstName = "Deepak2";

// //     return this.firstName;
// //   },
// // };

// // console.log(user.getName());

// function makeUser() {
//   return {
//     name: "John",
//     ref() {
//       return this;
//     },
//   };
// }

// let userw = makeUser();

// // console.log(userw.ref().name);

// const user3 = {
//   name: "Deepak Sankhyan",
//   logMessage() {
//     console.log(this.name);
//   },
// };

// setTimeout(
//   function () {
//     user3.logMessage();
//   },

//   1000
// );

// // Questions 4
// const user4 = {
//   name: "Deepak",
//   greet() {
//     return `Hello ${this.name}`;
//   },

//   farewell: () => {
//     return `Good ${this.name}`;
//   },
// };

// console.log(user4.greet());
// console.log(user4.farewell());

// Object Calculator

// let calculator = {
//   read() {
//     this.a = +prompt("a = ", 0);
//     this.b = +prompt("b = ", 0);
//   },

//   sum() {
//     return this.a + this.b;
//   },

//   multiply() {
//     return this.a * this.b;
//   },
// };

// calculator.read();
// console.log(calculator.sum());
// console.log(calculator.multiply());

// let length = 4;

// function callback() {
//   console.log(this.length);
// }

// const object = {
//   length: 5,
//   method() {
//     //arguments = [callback,2,3]
//     console.log(arguments);

//     arguments[0]();
//   },
// };
// object.method(callback, 2, 3); //3

const calc = {
  total: 0,
  add(a) {
    this.total += a;
    return this;
  },
  multiply(a) {
    this.total *= a;
    return this;
  },
  substract(a) {
    this.total *= a;
    return this;
  },
};

const result = calc.add(10).multiply(5).substract(30).add(10);
console.log(result.total);
