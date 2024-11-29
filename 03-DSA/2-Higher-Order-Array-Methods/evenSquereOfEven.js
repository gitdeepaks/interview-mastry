function sumOfEvenSquares(numbers) {
  const evenSquares = numbers
    .filter((num) => num % 2 === 0)
    .map((num) => num ** 2)
    .reduce((acc, square) => acc + square, 0);

  return evenSquares;
}
