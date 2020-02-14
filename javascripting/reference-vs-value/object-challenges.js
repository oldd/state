console.log('\n--- object challenges: 1 ---');


; // declare and assign object1
; // declare and assign object2
console.assert(object1 === object2, 'object1 === object2');


; // write one line to pass the assertions
console.assert(object1.x === object2.x, 'object1.x === object2.x');
console.assert(object1.x === 'hi', 'object1.x === "hi"');


const index1 = 'y';

; // write one line to pass the assertions
console.assert(object1[index1] === object2[index1], 'object1[index1] === object2[index1]');
console.assert(object1[index1] === 'bye', 'object1[index1] === "bye"');



console.log('--- object challenges: 2 ---');


; // declare and assign object3
; // declare and assign object4
console.assert(object3 !== object4, 'object3 !== object4');

; // write two lines to pass the assertions
;
console.assert(object3.a === object4.a, 'object3.x === object4.a');
console.assert(object3.a === 'hi', 'object3.x === "hi"');


const index2 = 'b';

; // write two lines to pass the assertions
;
console.assert(object3[index2] === object4[index2], 'object3[index2] === object4[index2]');
console.assert(object3[index2] === 'bye', 'object3[index2] === "bye"');
