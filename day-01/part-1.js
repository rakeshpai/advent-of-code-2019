const fs = require('fs');
const { divide, flip, subtract, pipe, sum, map } = require('ramda');

const masses = fs
  .readFileSync(__dirname + '/module-masses.txt', 'utf-8')
  .split('\n');

const divideBy = flip(divide);
const roundDown = x => Math.floor(x);

const fuelForMass = pipe(
  divideBy(3),
  roundDown,
  flip(subtract)(2)
);

const totalFuelRequired = pipe(
  map(fuelForMass),
  sum
);

console.log('Part 1: Total fuel required', totalFuelRequired(masses));

const actualFuelForMass = mass => {
  const requiredFuel = fuelForMass(mass);

  if(requiredFuel <= 0) return 0;
  return requiredFuel + actualFuelForMass(requiredFuel)
};

const totalActualFuelRequired = pipe(
  map(actualFuelForMass),
  sum
);

console.log('Part 2: Actual total fuel required', totalActualFuelRequired(masses));
