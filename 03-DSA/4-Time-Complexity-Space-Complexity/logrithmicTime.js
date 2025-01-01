function findPower(base, exponent) {
  if (exponent === 0) {
    return 1;
  }

  if (exponent % 2 === 0) {
    const halfPower = findPower(base, exponent / 2);

    return halfPower * halfPower;
  } else {
    const halfPower = findPower(base, (exponent - 1) / 2);

    return base * halfPower * halfPower;
  }
}

console.time("Find Power1");
findPower(2, 100);

console.timeEnd("Find Power1");

console.time("Find Power 2");

findPower(2, 10000000000);

console.timeEnd("Find Power 2");
