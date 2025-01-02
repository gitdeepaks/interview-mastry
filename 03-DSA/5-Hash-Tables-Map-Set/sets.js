const newSet = new Set(["Deepak", "Antonio", "Hitesh"]);

//Add to set

newSet.add("Jack");
newSet.add("Jill");

//check value

console.log(newSet.has("Antonio"));
console.log(newSet.has("Wilson"));

//getSize

console.log(newSet.size);

// getValues

console.log(newSet.values());

console.log(newSet);

for (const name of newSet) {
  console.log(name);
}

//convert to Array

const nameArr = [...newSet];

console.log(nameArr);

// clear

newSet.clear();

console.log(newSet.size);
