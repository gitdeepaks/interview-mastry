// Currying in JS
//Example for Currying

// function f(a) {
//   return function (b) {
//     return `${a} X ${b}`;
//   };
// }

// console.log(f(5)(6));

// // implement sum using Currying

// // function currSum(a, b, c) {
// //   return a + b + c;
// // }

// // function sum(a) {
// //   return function (b) {
// //     return function (c) {
// //       return a + b + c;
// //     };
// //   };
// // }

// // console.log(sum(6, 6, 6));
// // // function named as evaluate

// function evaluate(oparation) {
//   return function (a) {
//     return function (b) {
//       if (oparation === "sum") {
//         return a + b;
//       } else if (oparation === "multiply") {
//         return a * b;
//       } else if (oparation === "divide") {
//         return a / b;
//       } else if (oparation === "substract") {
//         return a - b;
//       } else {
//         return "Invalid oparation";
//       }
//     };
//   };
// }

// console.log(evaluate("sum")(9)(9));
// // Infinite currying
// function addInfinite(a) {
//   return function (b) {
//     if (b) return addInfinite(a + b);
//     return a;
//   };
// }

// // console.log(addInfinite(2(3)(6)()));

// //Currying vs partial function
// function sumFour(a) {
//   return function (b, c) {
//     return a + b + c;
//   };
// }

// console.log(sumFour(20)(5, 6));

//Currying in Manipulation of DOM

// function updateELementText(id) {
//   return function (content) {
//     document.querySelector("#" + id).textContent = content;
//   };
// }

// const updateHeader = updateELementText("heading");

// updateHeader("Hello-Bekar-Developer");

// curry implmentation

//curry f(a,b,c) into f(a)(b)(c)

function curry(func) {
  return function curriedFunction(...args) {
    console.log(args.length, func.length);

    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...next) {
        return curriedFunction(...args, ...next);
      };
    }
  };
}

const sum = (a, b, c, d) => a + b + c + d;

const totalSum = curry(sum);

console.log(totalSum(1)(2)(3)(4));
