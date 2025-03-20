// // // // const user = {
// // // //   firstName: "Piyush!",
// // // //   getName() {
// // // //     const firstName = "Piyush!";
// // // //     return this.firstName;
// // // //   },
// // // // };

// const { isRunningInExpoGo } = require("expo");

// // // // console.log(object.getMessage());

// // // const set = new Set([3, 2, 1, 1, 2]);
// // // console.log(set);

// // // set.add(1);
// // // set.add(2);
// // // set.add(1);

// // const newArr = ["deepak", "vignesh", "saif"];

// // for (const arr of newArr) {
// //   console.log(arr + "-surname");
// // }

// // const mySurName = newArr.map((arr) => arr + "-mapsurname");

// // console.log(mySurName);

// // const surname = "SurnameForEach";

// // let updatedArr = [];
// // newArr.forEach((name) => {
// //   updatedArr.push(`${name} ${surname}`);
// // });

// // console.log(updatedArr);

// function sum(...nums) {
//   return nums.reduce((acc, currVal) => acc + currVal, 0);
// }

// console.log(sum(1, 2, 3, 4, 5));

// const run = (message) => {
//   console.log(message);
// };

// run("hello");

// function add(counter) {
//   return function anotherSun(nums) {
//     counter++;
//   };
// }

// Function.prototype.des = function () {
//   console.log(`description ${this.name}`);
// };

// function greet() {
//   return `Hello, ${this.name}!`;
// }

// greet.des();

// greet.des("deepak");

// function add(a, b) {
//   return a + b;
// }

// const subs = function (a, b) {
//   return a - b;
// };

// const multiply = (a, b) => a * b;

// function applyOne(a, b, operation) {
//   return operation(a, b);
// }

// const res = applyOne(2, 3, (a, b) => a + b);

// function createCounter() {
//   let count = 0;

//   return function () {
//     count++;
//     return count;
//   };
// }

// function checkNumber(num) {
//   if (num > 0) {
//     return "positive";
//   } else if (num < 0) {
//     return "negative";
//   } else {
//     return "zero";
//   }
// }

// // function to implement debouncing
// function debounce(func, delay) {
//   let timer;
//   return function (...args) {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// }

let expenses = [
  { description: "Groceries", amount: 500, category: "Food" },
  { description: "Electricity Bill", amount: 100, category: "Unitility" },
  { description: "Dinner", amount: 30, category: "Food" },
  { description: "Internet Bill", amount: 50, category: "Unitility" },
];

let expenseReport = expenses.reduce((acc, curr) => {
  if (acc[curr.category]) {
    acc[curr.category] += curr.amount;
  } else {
    acc[curr.category] = curr.amount;
  }
  return acc;
}, {});

let expecsesReport = expenses.reduce((acc, curr) => {
  if (acc[curr.category]) {
    acc[curr.category].push(curr);
  } else {
    acc[curr.category] = [curr];
  }
  return acc;
}, {});

console.log(expecsesReport);

// Utility functions for mathematical operations
const styles = {
  container: {
    padding: "20px",
    margin: "10px",
    borderRadius: "4px",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  resultDisplay: {
    fontSize: "16px",
    color: "#333",
    fontFamily: "monospace",
    padding: "10px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#0056b3",
    },
  },
};

// Mathematical operation functions
const multiply = (a, b) => a * b;

// Higher-order function to apply operations
function applyOne(a, b, operation) {
  return operation(a, b);
}

// Component to display results
function OperationDisplay({ a, b, operation }) {
  const result = applyOne(a, b, operation);

  return (
    <div style={styles.container}>
      <div style={styles.resultDisplay}>Result: {result}</div>
      <button
        style={styles.button}
        onClick={() => console.log(`Operation result: ${result}`)}
      >
        Log Result
      </button>
    </div>
  );
}

// Example usage
const res = applyOne(2, 3, (a, b) => a + b);

// Export for use in other components
export { multiply, applyOne, OperationDisplay };
