// MAP, FILTER & REDUCE Interview Questions

// // Question 1 : Array.map()

// const nums1 = [1, 2, 3, 4];

// const multiplyThree = nums1.map((num, i, arr) => num * 3); // cb can take num, index and array
// console.log(multiplyThree);

// // Question 2 : Array.filter()

// const nums2 = [1, 2, 3, 4];

// const moreThanTwo = nums2.filter((num, i, arr) => num > 2 === 0);
// console.log(moreThanTwo);

// // Question 3 : Array.reduce()

// const nums3 = [1, 2, 3, 4];

// const sum = nums3.reduce((acc, curr, i, arr) => {
//   return acc + curr;
// }, 0);

// console.log(sum); // 10

// // Question 4 : Map Polyfill

// Array.prototype.myMap = function (cb) {
//   let temp = [];
//   for (let i = 0; i < this.length; i++) {
//     temp.push(cb(this[i], i, this));
//   }

//   return temp;
// };

// // Ques 5 : Filter Polyfill

// Array.prototype.myFilter = function (cb) {
//   let temp = [];
//   for (let i = 0; i < this.length; i++) {
//     if (cb(this[i], i, this)) temp.push(this[i]);
//   }

//   return temp;
// };

// // Question 6 : Reduce Polyfill

// Array.prototype.myReduce = function (cb, initialValue) {
//   var accumulator = initialValue;

//   for (let i = 0; i < this.length; i++) {
//     accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
//   }

//   return accumulator;
// };

// // Question 7 : map vs foreach

// let students = [
//   { name: "Piyush", rollNumber: 31, marks: 80 },
//   { name: "Jenny", rollNumber: 15, marks: 69 },
//   { name: "Kaushal", rollNumber: 16, marks: 35 },
//   { name: "Dilpreet", rollNumber: 7, marks: 55 },
// ];

// // Q1 - Return only the names of students in capital

// // Solution 1 : Traditional for() loop
// let names = [];
// for (let index = 0; index < studentRecords.length; index++) {
//   names.push(students[index].name.toUpperCase());
// }

// console.log(names);

// // Solution 2 : forEach()
// let names = [];
// students.forEach((student) => {
//   names.push(student.name.toUpperCase());
// });

// console.log(names);

// // Solution 3 : map()
// let names = students.map((stu) => stu.name.toUpperCase());
// console.log(names);

// // Q2 - we want to get the details of students who scored more than 60 marks.

// let names = students.filter((stu) => stu.marks > 60);
// console.log(names);

// // Q3 - Get the details of students who scored more than 60 marks and have rollNumber greater than 15.

// let names = students.filter((stu) => stu.marks > 60 && stu.rollNumber > 20);
// console.log(names);

// // Q4 - Sum total of the marks of the students

// let totalMarks = students.reduce((acc, emp) => acc + emp.marks, 0);
// console.log(totalMarks);

// // Q5 - Get only the names of the students who scored more than 60 marks

// let names = students.filter((stu) => stu.marks > 50).map((stu) => stu.name);
// console.log(names);

// // Q6 - print the total marks of the students with marks greater than 60 after 20 marks has been added to those students who scored less than 60.

// let totalMarks = studentRecords
//   .map(function (stu) {
//     if (stu.marks < 60) {
//       stu.marks += 20;
//     }
//     return stu;
//   })
//   .filter((stu) => stu.marks > 60)
//   .reduce((acc, curr) => acc + curr.marks, 0);

// console.log(totalMarks);

const nums = [1, 2, 3, 4, 5];

const mullBtThree = nums.map((num, i, arr) => {
  return num * 4 + i;
});
console.log(mullBtThree);

// filter

const numFill = [1, 2, 3, 4, 5, 6, 7];

const moreThanTwo = numFill.filter((num, i, arr) => num >= 4);
console.log(moreThanTwo);

const sum = nums.reduce((acc, currVal, i, arr) => {
  return acc + currVal;
}, 0);

console.log(sum);

// polyfills

Array.prototype.myMap = function (cb) {
  let temp = [];

  for (let i = 0; i < this.length; i++) {
    temp.push(cb(this[i], i, this));
  }

  return temp;
};

const cusnums = [1, 2, 3, 4, 5];

const custommullBtThree = nums.myMap((num, i, arr) => {
  return num * 4 - i;
});
console.log(custommullBtThree);

//filter polyfilll

Array.prototype.myFilter = function (cb) {
  let temp = [];

  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      temp.push(this[i]);
    }
  }
  return temp;
};
const customnumFill = [1, 2, 3, 4, 5, 6, 7];

const custommoreThanTwo = numFill.myFilter((num, i, arr) => num >= 4);

console.log(custommoreThanTwo);

// Reduce polyfill

Array.prototype.myReduce = function (cb, initialValue) {
  var accumalator = initialValue;

  for (let i = 0; i < this.length; i++) {
    accumalator = accumalator ? cb(accumalator, this[i], i, this) : this[i];
  }

  return accumalator;
};

const customReducesum = nums.myReduce((acc, currVal, i, arr) => {
  return acc + currVal;
}, 0);

console.log(customReducesum);

//Questions

let students = [
  { name: "Deepak", rollnumber: 21, marks: 81 },
  { name: "Jenni", rollnumber: 41, marks: 91 },
  { name: "Kaushal", rollnumber: 51, marks: 71 },
  { name: "Diljeet", rollnumber: 81, marks: 51 },
];

const names = students.map((s) => s.name.toUpperCase());

console.log(names);

const details = students.filter((s) => s.marks > 60);
console.log(details);

const det = students.filter((s) => s.marks > 60 && s.rollnumber > 50);
console.log(det);

const sumByReduce = students.reduce((acc, currVal) => acc + currVal.marks, 0);

console.log(sumByReduce);

const studentsName = students.filter((s) => s.marks > 60).map((s) => s.name);
console.log(studentsName);

const totalMarks = students
  .map((s) => {
    if (s.marks < 60) {
      s.marks + 20;
    }

    return s;
  })
  .filter((s) => s.marks > 60)
  .reduce((acc, currVal) => acc + currVal.marks, 0);
console.log(totalMarks);
