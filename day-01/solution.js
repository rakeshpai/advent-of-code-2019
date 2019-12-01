const fs = require('fs');
const {
  T, add, always, cond, divide, flip,
  lte, map, pipe, subtract, sum
} = require('ramda');

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

const totalFuelRequired = fn => pipe(map(fn), sum);

console.log('Part 1: Total fuel required', totalFuelRequired(fuelForMass)(masses));

const actualFuelForMass = pipe(
  fuelForMass,
  cond([
    [flip(lte)(0), always(0)],
    [T, x => add(actualFuelForMass(x))(x)] // would've used converge, but actualFuelForMass isn't declared yet.
  ])
);

console.log('Part 2: Actual total fuel required', totalFuelRequired(actualFuelForMass)(masses));
