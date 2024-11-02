// // Lexical scope

// // function local() {
// //   // local scope
// //   var user = "Developer";
// // }
// // console.log(user);
// // // local();

// // function subscribe() {
// //   var uName = "Developer";

// //   //inner scope 2

// //   function displayName() {
// //     console.log(uName);
// //   }
// //   displayName();
// // }
// // subscribe();

// // var uName = "Deepak";

// // function makeFunc() {
// //   var uName = "Firefox";

// //   function displayName(num) {
// //     console.log(uName, num);
// //   }
// //   return displayName;
// // }
// // makeFunc()(5);

// // let count = 0;
// // (function printCount() {
// //   if (count === 0) {
// //     let count = 1; //shadowing

// //     console.log(count); // 1
// //   }
// //   // count = 0
// //   console.log(count);
// // })();

// // function createBase(num) {
// //   return function (innerNum) {
// //     return console.log(innerNum + num);
// //   };
// // }

// // var addSix = createBase(6);
// // addSix(10);
// // addSix(21);

// // function find() {
// //   let a = [];

// //   for (let i = 0; i < 1000000; i++) {
// //     a[i] = i * i;
// //   }

// //   return function (index) {
// //     console.log(a[index]);
// //   };
// // }

// // const closure = find();

// // console.time("6");

// // find(6);

// // console.timeEnd("6");
// // closure(6);
// // console.time("12");
// // find(12);

// // Blocked scope and settimeout
// // for (var i = 0; i < 3; i++) {
// //   function inner(i) {
// //     setTimeout(function log() {
// //       console.log(i);
// //     }, 1000);
// //   }
// //   inner(i);
// // }

// // how can we use a closure to create a private counter.

// function counter() {
//   var _counter = 0;

//   function add(increment) {
//     _counter += increment;
//   }

//   function retrive() {
//     return `Counter is  = ${_counter}`;
//   }

//   return {
//     add,
//     retrive,
//   };
// }

// const c = counter();

// c.add(5);
// c.add(20);

// console.log(c.add(20));

// //Module Pattern
// var Module = (function () {
//   function privateMethode() {
//     //do something
//   }

//   return {
//     publicMethod: function () {
//       console.log("public");
//     },
//   };
// })();

// Module.publicMethod(); //return "public"
// // Module.privateMethode(); //return error

// //Make this run only once

// let view;

// function likeVideo() {
//   let called = 0;

//   return function () {
//     if (called > 0) {
//       console.log("Already Support to Developer");
//     } else {
//       view = "Developer";
//       console.log(`Support to ${view}`);
//     }
//   };
// }

// let isSUpported = likeVideo();

// isSUpported();
// isSUpported();
// isSUpported();
// isSUpported();
// isSUpported();

// Once Polyfill

// function once(func, context) {
//   let ran;

//   return function () {
//     if (func) {
//       ran = func.apply(context || this, arguments);
//       func = null;
//     }

//     return ran;
//   };
// }

// const hello = once((a, b) => console.log("hello", a, b));
// hello(1, 2);
// hello(3, 4);
// hello(5, 6);
// hello(7, 8);
// hello(9, 10);

// Memoize Polyfill

function myMemoize(fn, context) {
  const res = {};

  return function (...args) {
    var argsCache = JSON.stringify(args);
    if (!res[argsCache]) {
      res[argsCache] = fn.call(context || this, ...args);
    }
    return res[argsCache];
  };
}

const clumsysquare = (num1, num2) => {
  for (let i = 1; i <= 100000000; i++) {}
  return num1 * num2;
};

const memoizes = myMemoize(clumsysquare);

console.time("First call");
console.log(memoizes(9467, 7649));
console.timeEnd("First call");

console.time("Second Call");
console.log(memoizes(9467, 7649));
console.timeEnd("Second Call");
