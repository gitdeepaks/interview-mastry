//Compose and pipe
const addFive = (num) => {
  return num + 5;
};

const substractTwo = (num) => {
  return num - 2;
};

const multiplyFour = (num) => {
  return num * 4;
};

// function compose(...fns) {
//   return function (init) {
//     let result = init;
//     for (let i = fns.length - 1; i >= 0; i--) {
//       result = fns[i](result);
//     }
//     return result;
//   };
// }

const compose = (...fns) => {
  return (init) => {
    return fns.reduceRight((acc, currVal) => {
      return currVal(acc);
    }, init);
  };
};

const evaluate = compose(addFive, substractTwo, multiplyFour); //Function consosition

console.log(evaluate(5));

const pipe = (...fns) => {
  return (init) => {
    return fns.reduce((acc, currVal) => {
      return currVal(acc);
    }, init);
  };
};

const evaluatePipe = pipe(addFive, substractTwo, multiplyFour); //Function consosition
console.log(evaluatePipe(5));
