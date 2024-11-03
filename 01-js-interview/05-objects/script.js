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
  name: "Bad Coder",
  age: 25,
  isLikeToCode: true,
};

for (const key in user) {
  console.log(user[key]);
}

// Outout questions

const obj = {
  a: "one",
  b: "two",
  a: "three",
};

console.log(obj);

function mulByTwo(obj) {
  for (const key in obj) {
    if (typeof obj[key] === "number") {
      obj[key] *= 2;
    }
  }
}
// console.log(obj[key]);

// Output of the code

const a = {};

const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]);

//what is JSON.stringify & JSON.parse

const jsonUser = {
  name: "deepak",
  age: 24,
};

console.log(JSON.stringify(jsonUser));

// console.log(JSON.parse(jsonUser));

//what is the output

console.log([..."Lydia"]);
//[ 'L', 'y', 'd', 'i', 'a' ]

// output please
const userFive = { name: "Lydia", age: 21 };

const admin = { admin: true, ...userFive };

console.log(admin);

//output on JSON.stringify

const settings = {
  usename: "Deepak",
  level: 29,
  health: 90,
};

const dataSix = JSON.stringify(settings, ["level", "health"]);

console.log(dataSix);

const shape = {
  redius: 10,
  diameter() {
    return this.redius * 2;
  },
  perimeter: () => 2 * Math.PI * this.redius,
};

// console.log(shape.diameter());
// console.log(shape.perimeter());

// destructuring in objects

let userSeven = {
  name: "Deepak",
  age: 33,
  fullName: {
    first: "Deepak",
    last: "Sankhyan",
  },
};
// const nameTwo = "Bad Coder";
// const { name":nameTwo } = userSeven;

const {
  fullName: { first },
} = userSeven;

console.log(first);

// outputTen

function getItems(firstLIst, favourateFruit, ...args) {
  return [...firstLIst, ...args, favourateFruit, favourateFruit];
}

const getItemss = getItems(["banana", "apple"], "pear", "orange");
console.log(getItemss);

// [ 'banana', 'apple', 'orange', 'pear', 'pear' ]

// outputEleven

let cEleven = { greetings: "Hey!" };

let d;

d = cEleven;

c.greetings = "Hello";

console.log(d.greetings); //Hey!

//outputTwelve

console.log({ a: 1 } == { a: 1 }); //false
console.log({ a: 1 } === { a: 1 }); //false

let person = { name: "Deepak" };

const member = [person];

person = null;

console.log(member);

const value = { number: 20 };

const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};

multiply(); //40
multiply();
multiply(value);
multiply(value);

function changeAgeAndReference(person) {
  person.age = 33;
  person = {
    name: "John",
    age: 50,
  };

  return age;
}

const personObj1 = {
  name: "Alex",
  age: 30,
};

// shllow Copy vs Deep Copy
let userNine = {
  name: "Bad Coder",
  age: 33,
};

// const objClone = Object.assign({}, userNine);
const objClone = { ...user };
// const objCloneString = JSON.parse(JSON.stringify(user));

objClone.name = "Deepak";

console.log(user, objClone);
