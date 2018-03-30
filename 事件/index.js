let parent = document.querySelector('#parent');
let son = document.querySelector('#son');

parent.addEventListener('click', () => {
  console.log('parent click');
}, false);

son.addEventListener('click', () => {
  console.log('son click');
}, false)
