// primitives are stored "by value", connected to one variable
//  assigning a primitive to a new variable makes a copy of it
//  modifying the new variable does not change the old one

const number5 = 5;
let new5 = number5;
new5 = new5 + 1;
console.assert(new5 === 6, 'new5 stores has been modified');
console.assert(number5 === 5, 'original variable was not modified');


// objects & arrays are stored by reference
//  both variables reference the same object in memory
//  modifying on variable changes both

let objectOne = {};
const objectTwo = objectOne;
objectTwo.x = 6;
console.assert(objectOne.x === 6, 'objectOne has changed after modifying objectTwo');
objectOne.y = 'hi!';
console.assert(objectTwo.y === 'hi!', 'objectTwo has changed after modifying objectOne');
objectOne = undefined;
console.assert(objectTwo !== undefined, 'reassigning objectOne does not affect objectTwo');

let arrayOne = [];
const arrayTwo = arrayOne;
arrayTwo[0] = 7;
console.assert(arrayOne[0] === 7, 'arrayOne has changed after modifying arrayTwo');
arrayOne[1] = 'bye!';
console.assert(arrayTwo[1] === 'bye!', 'arrayTwo has changed after modifying arrayOne');
arrayOne = undefined;
console.assert(arrayTwo !== undefined, 'reassigning arrayOne does not affect arrayTwo');


// using const with arrays and objects is like locking a bag
//  someone can't steal your bag because it's locked in place
//  but they can still take things out or put things in

const constantObject = { a: 2 };
constantObject.a = 3; // no error
constantObject.b = 4; // no error
constantObject = { a: 3 }; // error!

const constantArray = [4];
constantArray[0] = 6; // no error
constantArray[1] = 7; // no error
constantArray = [6]; // error!


