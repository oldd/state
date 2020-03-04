// stepping through in the debugger might help

const hElement = (text, size) => {
  const sizeString = String(size);
  const hEl = document.createElement('h' + sizeString);
  hEl.innerHTML = text;

  return hEl;
};


const smallText = 'smaller';
const smallSize = 6;
const small = hElement(smallText, smallSize);

const smallNodeName = small.nodeName === 'H' + String(smallSize);
const smallChildElementCount = small.childElementCount === 0;
const smallInnerHTML = small.innerHTML === smallText;

console.assert(smallNodeName && smallChildElementCount && smallInnerHTML,
  'Testing Small');



const largeText = 'BIGGER';
const largeSize = 1;
const large = hElement(largeText, largeSize);

const largeNodeName = large.nodeName === 'H' + String(largeSize);
const largeChildElementCount = large.childElementCount === 0;
const largeInnerHTML = large.innerHTML === largeText;

console.assert(largeNodeName && largeChildElementCount && largeInnerHTML,
  'Testing Large');
