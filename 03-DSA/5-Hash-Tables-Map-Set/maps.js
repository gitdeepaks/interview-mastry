const nameMap = new Map([
  [1, "Jonny"],
  [2, "Jakcy"],
  [3, "Jill"],
]);

const myFunction = () => {};

const myObj = {};

const map2 = new Map([
  ["name", "Jonny"],
  [1, "number one"],
  [true, "really true"],
  [null, "null"],
  [myFunction, "my function"],
  [myObj, "my object"],
]);

console.log(nameMap);
// console.log(map2);

// Get Values

// console.log(nameMap.get(1));
// console.log(map2.get(myObj));
// console.log(map2.get(myFunction));

// check values

nameMap.set(4, "Deepak");
nameMap.set(5, "Antonio");

console.log(nameMap.has(5));
console.log(nameMap.has(10));

//Get Size

console.log(nameMap.size);

// Iterate

for (let [key, value] of nameMap) {
  console.log(key, value);
}

nameMap.forEach((value, name) => console.log(name, value));

// Get Keys

console.log(nameMap.keys());

// get value
console.log(nameMap.values());

nameMap.clear(nameMap.size);
