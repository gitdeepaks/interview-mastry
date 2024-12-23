function sumUpTo(n) {
  if (n === 1) {
    return 1;
  }

  return n + sumUpTo(n - 1);
}

const result = sumUpTo(5);
console.log(result);
