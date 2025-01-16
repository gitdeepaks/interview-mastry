// class Person {
//   private id: number;
//   public name: string;

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
