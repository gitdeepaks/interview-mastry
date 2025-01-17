// // const user = {
// //   firstName: "Piyush!",
// //   getName() {
// //     const firstName = "Piyush!";
// //     return this.firstName;
// //   },
// // };

// // console.log(object.getMessage());

// const set = new Set([3, 2, 1, 1, 2]);
// console.log(set);

// set.add(1);
// set.add(2);
// set.add(1);

const newArr = ["deepak", "vignesh", "saif"];

for (const arr of newArr) {
  console.log(arr + "-surname");
}

const mySurName = newArr.map((arr) => arr + "-mapsurname");

console.log(mySurName);

const surname = "SurnameForEach";

let updatedArr = [];
newArr.forEach((name) => {
  updatedArr.push(`${name} ${surname}`);
});

console.log(updatedArr);
