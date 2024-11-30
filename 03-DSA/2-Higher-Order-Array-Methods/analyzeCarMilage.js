function analyzeCarMilage(cars) {
  const totalMilage = cars.reduce((acc, car) => acc + car, 0);

  const avgMilage = totalMilage / cars.length;

  const highestMIlageCar = cars.reduce(
    (highest, car) => (car.milage > car.milage ? car : highest),
    cars[0]
  );
  const lowestMIlageCar = cars.reduce(
    (highest, car) => (car.milage < car.milage ? car : highest),
    cars[0]
  );

  return {
    avgMilage: parseFloat(avgMilage.toFixed(2)),
    highestMIlageCar,
    lowestMIlageCar,
    totalMilage,
  };
}
