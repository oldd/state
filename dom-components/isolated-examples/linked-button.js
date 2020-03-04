// stepping through in the debugger will be very helpful

const linkedButton = (text, link, id) => {
  const buttonEl = document.createElement('button');
  buttonEl.innerHTML = text;

  const aEl = document.createElement('a');
  aEl.id = id;
  aEl.href = link;
  aEl.target = "_blank";
  aEl.appendChild(buttonEl);

  return aEl;
};


const testLinkedButton = (component, link, text, id) => {
  const componentNodeName = component.nodeName === 'A';
  const componentId = component.id === id;
  const componentHref = component.href === link;
  const componentChildElementCount = component.childElementCount === 1;
  const componentButtonInnerHTML = component.children[0].innerHTML === text;
  console.assert(componentNodeName
    && componentId
    && componentHref
    && componentChildElementCount
    && componentButtonInnerHTML,
    id);
};


const badgersText = 'learn about badgers';
const badgersLink = 'https://badgerbadgerbadger.com/';
const badgersId = 'badgers';
const badgersComponent = linkedButton(badgersText, badgersLink, badgersId);

testLinkedButton(badgersComponent, badgersLink, badgersText, badgersId);


const wormsText = 'buy worms';
const wormsLink = 'https://www.worms.com/';
const wormsId = 'worms';
const wormsComponent = linkedButton(wormsText, wormsLink, wormsId);

testLinkedButton(wormsComponent, wormsLink, wormsText, wormsId);


const antsText = 'buy ants';
const antsLink = 'https://www.ants.com/';
const antsId = 'ants';
const antsComponent = linkedButton(antsText, antsLink, antsId);

testLinkedButton(antsComponent, antsLink, antsText, antsId);
