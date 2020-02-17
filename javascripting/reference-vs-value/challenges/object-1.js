console.log('\n--- object challenges: 1 ---');


; // declare and assign object1
; // declare and assign object2

const areTheSameObject = object1 === object2;
const sameXValue = object1.x === object2.x;
const xValueIsHi = object1.x === 'hi';
console.assert(areTheSameObject, 'Test 1 - areTheSameObject');
console.assert(sameXValue, 'Test 2 - sameXValue');
console.assert(xValueIsHi, 'Test 3 - xValueIsHi');


const key = 'y';
// pass the next tests

const objectsKeyAreSame = object1[key] === object2[key];
const object1YIsBye = object1.y === 'bye';
console.assert(objectsKeyAreSame, 'Test 4 - objectsKeyAreSame');
console.assert(object1YIsBye, 'Test 5 - object1YIsBye');
