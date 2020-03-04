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

const foodTest = {
  nodeName: 'A', href: 'https://www.food.com/',
  childElementCount: 0, innerHTML: 'eat more food'
};

for (let key in foodTest) {
  const keyTest = foodTest[key] === food[key];
  console.assert(keyTest, 'food: ' + key);
}



const artText = 'appreciate more art';
const artLink = 'http://www.artnet.com/';
const art = aElement(artText, artLink);

const artTest = {
  nodeName: 'A', href: 'http://www.artnet.com/',
  childElementCount: 0, innerHTML: 'appreciate more art'
};

for (let key in artTest) {
  const keyTest = artTest[key] === art[key];
  console.assert(keyTest, 'art: ' + key);
}
