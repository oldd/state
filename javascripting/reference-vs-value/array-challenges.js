console.log('\n--- array challenges: 1 ---');


; // declare and assign array1
; // declare and assign array2
console.assert(array1 === array2, 'array1 === array2');


; // write one line to pass the assertions
console.assert(array1[0] === array2[0], 'array1[0] === array2[0]');
console.assert(array1[0] === 'hi', 'array1[0] === "hi"');


const index1 = 1;

; // write one line to pass the assertions
console.assert(array1[index1] === array2[index1], 'array1[index1] === array2[index1]');
console.assert(array1[index1] === 'bye', 'array1[index1] === "bye"');



console.log('--- array challenges: 2 ---');


; // declare and assign array3
; // declare and assign array4
console.assert(array3 !== array4, 'array3 !== array4');

; // write two lines to pass the assertions
;
console.assert(array3[0] === array4[0], 'array3[0] === array4[0]');
console.assert(array3[0] === 'hi', 'array3[0] === "hi"');


const index2 = 1;

; // write two lines to pass the assertions
;
console.assert(array3[index2] === array4[index2], 'array3[index2] === array4[index2]');
console.assert(array3[index2] === 'bye', 'array3[index2] === "bye"');
