function powerRecursion(base, exponent) {
  if (exponent === 0) {
    return 1;
  }

  return base * powerRecursion(base, exponent - 1);
}

console.log(powerRecursion(2, 6));
