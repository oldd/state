// stepping through in the debugger will be helpful

const fancyEditor = () => { };



const component1 = fancyEditor('asdfasd\nasdf\nasdf\nadfs', 'red', 'cursive', 'a');

const isTextArea1 = component1.nodeName === "TEXTAREA";
const id1 = component1.id === "a";
const style1 = component1.style.cssText === "color: red; font-family: cursive;";
const value1 = component1.value === 'asdfasd\nasdf\nasdf\nadfs';

console.assert(isTextArea1, 'component 1, .nodeName');
console.assert(id1, 'component 1, .id');
console.assert(style1, 'component 1, .style.cssText');
console.assert(value1, 'component 1, .value');


const component2 = fancyEditor('to mars!', 'white', 'fantasy', 'b');

const isTextArea2 = component2.nodeName === "TEXTAREA";
const id2 = component2.id === "b";
const style2 = component2.style.cssText === "color: white; font-family: fantasy;";
const value2 = component2.value === 'to mars!';

console.assert(isTextArea2, 'component 2, .nodeName');
console.assert(id2, 'component 2, .id');
console.assert(style2, 'component 2, .style.cssText');
console.assert(value2, 'component 2, .value');



const component3 = fancyEditor('?', 'black', 'sans-serif', 'c');

const isTextArea3 = component3.nodeName === "TEXTAREA";
const id3 = component3.id === "c";
const style3 = component3.style.cssText === "color: black; font-family: sans-serif;";
const value3 = component3.value === '?';

console.assert(isTextArea3, 'component 3, .nodeName');
console.assert(id3, 'component 3, .id');
console.assert(style3, 'component 3, .style.cssText');
console.assert(value3, 'component 3, .value');
