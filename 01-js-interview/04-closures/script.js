// Lexical scope

// function local() {
//   // local scope
//   var user = "Developer";
// }
// console.log(user);
// // local();

// function subscribe() {
//   var uName = "Developer";

//   //inner scope 2

//   function displayName() {
//     console.log(uName);
//   }
//   displayName();
// }
// subscribe();

// var uName = "Deepak";

// function makeFunc() {
//   var uName = "Firefox";

//   function displayName(num) {
//     console.log(uName, num);
//   }
//   return displayName;
// }
// makeFunc()(5);

// let count = 0;
// (function printCount() {
//   if (count === 0) {
//     let count = 1; //shadowing

//     console.log(count); // 1
//   }
//   // count = 0
//   console.log(count);
// })();

// function createBase(num) {
//   return function (innerNum) {
//     return console.log(innerNum + num);
//   };
// }

// var addSix = createBase(6);
// addSix(10);
// addSix(21);

// function find() {
//   let a = [];

//   for (let i = 0; i < 1000000; i++) {
//     a[i] = i * i;
//   }

//   return function (index) {
//     console.log(a[index]);
//   };
// }

// const closure = find();

// console.time("6");

// find(6);

// console.timeEnd("6");
// closure(6);
// console.time("12");
// find(12);

// Blocked scope and settimeout
for (var i = 0; i < 3; i++) {
  function inner(i) {
    setTimeout(function log() {
      console.log(i);
    }, 1000);
  }
  inner(i);
}
