let parent = document.querySelector('#parent');
let son = document.querySelector('#son');

parent.addEventListener('click', (ev) => {
  ev.stopPropagation();
  console.log('parent click');
}, false);

son.addEventListener('click', (ev) => {
  ev.stopPropagation();
  console.log('son click');
}, false)
