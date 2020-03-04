// stepping through in the debugger will be helpful

const summaryDetails = () => { };



const component1 = summaryDetails('a', false, 'asdf', 'h2');

const isDetails1 = component1.nodeName === "DETAILS";
const id1 = component1.id === "a";
const open1 = component1.open === false;
const child0Type1 = component1.children[0].nodeName === 'SUMMARY';
const child0NodeName1 = component1.children[0].innerHTML === 'asdf';
const child1NodeName1 = component1.children[1].nodeName === "H2";

console.assert(isDetails1, 'component 1, .nodeName');
console.assert(id1, 'component 1, .id');
console.assert(open1, 'component 1, .open');
console.assert(child0Type1, 'component 1, .children[0].nodeName');
console.assert(child0NodeName1, 'component 1, .children[0].innerHTML');
console.assert(child1NodeName1, 'component 1, .children[1].nodeName');


const component2 = summaryDetails('b', true, 'hi there', 'button');

const isDetails2 = component2.nodeName === "DETAILS";
const id2 = component2.id === "b";
const open2 = component2.open === true;
const child0Type2 = component2.children[0].nodeName === 'SUMMARY';
const child0NodeName2 = component2.children[0].innerHTML === 'hi there';
const child1NodeName2 = component2.children[1].nodeName === "BUTTON";

console.assert(isDetails2, 'component 2, .nodeName');
console.assert(id2, 'component 2, .id');
console.assert(open2, 'component 2, .open');
console.assert(child0Type2, 'component 2, .children[0].nodeName');
console.assert(child0NodeName2, 'component 2, .children[0].innerHTML');
console.assert(child1NodeName2, 'component 2, .children[1].nodeName');



const component3 = summaryDetails('c', false, 'DOM is fun', 'p');

const isDetails3 = component3.nodeName === "DETAILS";
const id3 = component3.id === "c";
const open3 = component3.open === false;
const child0Type3 = component3.children[0].nodeName === 'SUMMARY';
const child0NodeName3 = component3.children[0].innerHTML === 'DOM is fun';
const child1NodeName3 = component3.children[1].nodeName === "P";

console.assert(isDetails3, 'component 3, .nodeName');
console.assert(id3, 'component 3, .id');
console.assert(open3, 'component 3, .open');
console.assert(child0Type3, 'component 3, .children[0].nodeName');
console.assert(child0NodeName3, 'component 3, .children[0].innerHTML');
console.assert(child1NodeName3, 'component 3, .children[1].nodeName');
