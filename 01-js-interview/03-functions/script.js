// // functions in Javascript
// function square(num) {
//   return num * num;
// }

// // function expression

// const sqr = function (num) {
//   return num + num;
// };

// // console.log(sqr(7));

// function displaySquare(fn) {
//   console.log("Sqr is" + fn(5));
// }

// displaySquare(sqr);

// // IIFFE

// (function add(num) {
//   return num + num;
// })(7);

// (function (x) {
//   return (function (y) {
//     console.log(x);
//   })(3);
// })(1);

// // function Scope  - O/P based Questions

// // for (let i = 0; i < 5; i++) {
// //   setTimeout(() => {
// //     console.log(i);
// //   }, i * 1000);
// // }

// // Hoisting

// function functionName() {
//   console.log(x);
//   console.log("Coder");
// }

// // var x = 5;

// // var fun = function () {
// //   console.log(x);
// //   var x = 20;
// // };

// // fun();

// // param vs arguments

// function mul(...num) {
//   console.log(num[0] * num[1]);
// }

// var arr = [5, 6];

// mul(...arr);

// const fn = (a, x, y, ...nums) => {
//   console.log(x, y, nums);
// };
// fn(2, 6, 9, 87, 7);

// // Callback functions

// function great(name) {
//   alert("hello" + name);
// }

// function prcessUserInpur(cb) {
//   var name = prompt("Please enter the name");
//   cb(name);
// }

// prcessUserInpur(names);

// // more example of callback

// document.addEventListener("click", function () {});

// // Arrow functions
// const add = (fName, sName) => {
//   return fName + sName;
// };

// function square(num) {
//   return num * num;
// }

// const square = () => {};

// //arguments
// function fn() {
//   console.log(arguments);
// }

// fn();

// this

let user = {
  username: "Developer",
  rc1: () => {
    console.log(`Please support to ${this.username} work`);
  },
  rc2: () => {
    console.log(`Please support to ${this.username} work`);
  },
};

user.rc1();
user.rc2();
