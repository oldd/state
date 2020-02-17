console.log('\n--- array challenges: 2 ---');


; // declare and assign array1
; // declare and assign array2

const areDifferentArrays = array1 !== array2;
const sameZeroValue = array1[0] === array2[0];
const zeroValueIsHi = array1[0] === 'hi';
console.assert(areDifferentArrays, 'Test 1 - areDifferentArrays');
console.assert(sameZeroValue, 'Test 2 - sameZeroValue');
console.assert(zeroValueIsHi, 'Test 3 - zeroValueIsHi');

const index = 1;
// pass the last two asserts

const arraysIndexAreSame = array1[index] === array2[index];
const array1IndexIsBye = array1[index] === 'bye';
console.assert(arraysIndexAreSame, 'Test 4 - arrasyIndexAreSame');
console.assert(array1IndexIsBye, 'Test 5 - array1IndexIsbye');
