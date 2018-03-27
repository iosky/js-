function hello() {
  console.log('hello world');
}

window.onload = () => {
  import { plus } from "./test";
  import person from './test';
  import {firstName, lastName, year} from './test.js';
  hello();
  console.log(firstName , lastName);
  function setName(element) {
    element.textContent = firstName + ' ' + lastName;
  }
}
