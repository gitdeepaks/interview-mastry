function numberRange(startNumber, endNumber) {
  if (startNumber === endNumber) {
    return [startNumber];
  }

  const numbers = numberRange(startNumber, endNumber - 1);
  numbers.push(endNumber);
  return numbers;
}

console.log(numberRange(1, 7));
