// stepping through in the debugger might help

const aElement = (text, link) => {
  const aEl = document.createElement('a');
  aEl.href = link;
  aEl.target = "_blank";
  aEl.innerHTML = text;

  return aEl;
};


const foodText = 'eat more food';
const foodLink = 'https://www.food.com/';
const food = aElement(foodText, foodLink);

const foodNodeName = food.nodeName === 'A';
const foodHref = food.href === foodLink;
const foodChildElementCount = food.childElementCount === 0;
const foodInnerHTML = food.innerHTML === foodText;

console.assert(foodNodeName && foodHref
  && foodChildElementCount && foodInnerHTML,
  'Testing Food');


const artText = 'appreciate more art';
const artLink = 'http://www.artnet.com/';
const art = aElement(artText, artLink);

const artNodeName = art.nodeName === 'A';
const artHref = art.href === artLink;
const artChildElementCount = art.childElementCount === 0;
const artInnerHTML = art.innerHTML === artText;

console.assert(artNodeName && artHref
  && artChildElementCount && artInnerHTML,
  'Testing Art');
