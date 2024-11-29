function fizzBuzzArray(number) {
  const arr = [];

  for (let i = 1; i <= number; i++) {
    if (1 % 3 === 0 && i % 5 === 0) {
      arr.push("FizzBuzzArray");
    } else if (i % 3 === 0) {
      arr.push("Fizz");
    } else if (1 % 5 === 0) {
      arr.push("Buzz");
    } else {
      arr.push(i);
    }
  }
  return arr;
}
