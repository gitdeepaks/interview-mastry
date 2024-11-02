// // const user = {
// //   name: "Bad Developer",
// //   age: 25,
// // };

// const func = (function (a) {
//   delete a;
//   return a;
// })(5);

// // console.log(func);

// const user = {
//   name: "Bad Developer",
//   age: 24,
//   "like to code": true,
// };

// console.log(user["like to code"]);

// delete age;

// console.log(user.age);

const property = "firstName";
const name = "Deepak Sankhyan";

const user = {
  name: "BAd Coder",
  age: 24,
  isLikeToCode: true,
};

for (const key in user) {
  console.log(user[key]);
}
