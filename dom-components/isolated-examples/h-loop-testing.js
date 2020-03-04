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

const smallTest = { nodeName: 'H6', childElementCount: 0, innerHTML: 'smaller' };

for (let key in smallTest) {
  const keyTest = smallTest[key] === small[key];
  console.assert(keyTest, 'small: ' + key);
}


const largeText = 'BIGGER';
const largeSize = 1;
const large = hElement(largeText, largeSize);

const largeTest = { nodeName: 'H1', childElementCount: 0, innerHTML: 'BIGGER' };

for (let key in largeTest) {
  const keyTest = largeTest[key] === large[key];
  console.assert(keyTest, 'large: ' + key);
}

