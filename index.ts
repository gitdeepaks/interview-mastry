// class Person {
//   private id: number;
//   public name: string;

import { log } from "console";

//   constructor(id: number, name: string) {
//     this.id = id;
//     this.name = name;
//   }

//   getId(): number {
//     return this.id;
//   }
// }

// const person = new Person(1, "Alice");
// console.log(person.getId());

// function Component(constructor: Function) {
//   console.log("Component decorator called on:", constructor.name);
// }

// @Component
// class myComponent {}

// // Enums

// enum Directions {
//   North,
//   East,
//   South,
//   West,
// }

// const move = (dir: Directions) => {
//   //
// };

const productPrices: Record<string, number> = {
  Apple: 1.2,
  Banana: 0.5,
  Orange: 0.8,
};

const getPrice = (productName: string) => {
  return productPrices[productName];
};

function mySum(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  p4: number,
  ...nums: []
) {
  return nums.reduce((acc, curVal) => acc + curVal, 0);
}

console.log(mySum(1, 2, 3, 4, 5));

const run = (message: string) => {
  console.log(message);
};

run("hello");
import { expect, it } from "vitest";

const handleFormData = (e: any) => {
  e.preventDefault();
  const data = new FormData(e.terget);
  const value = Object.fromEntries(data.entries());
  return value;
};

it("Should handle a form submit", () => {
  const form = document.createElement("form");
  form.innerHTML = `
    <input name="name" value="John Doe" />
  `;

  form.onsubmit = (e) => {
    const value = handleFormData(e);
    expect(value).toEqual({ name: "John Doe" });
  };

  form.requestSubmit();

  expect.assertions(1);
});

function greet(greeting: string, punctuation: string) {
  console.log(greeting + " " + this.name + punctuation);
}
const person = { name: "Alice" };

greet.call(person, "Hello", "!"); // "Hello Alice!"
greet.apply(person, ["Hi", "?"]); // "Hi Alice?"
const boundGreet = greet.bind(person, "Hey");
boundGreet("!!!"); // "Hey Alice!!!"

const func = () => {
  // Refactor this to be its own function
  const randomPercentage = getRandonPercentage();
  console.log(randomPercentage);
};
function getRandonPercentage() {
  return `${(Math.random() * 100).toFixed(2)}%`;
}
