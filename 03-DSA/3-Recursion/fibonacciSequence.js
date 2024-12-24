function fibonacciSeq(num) {
  console.log(`Calculating fibonacciSeq (${num})`);

  if (num < 2) {
    return num;
  }

  return fibonacciSeq(num - 1) + fibonacciSeq(num - 2);
}

console.log(fibonacciSeq(10));
