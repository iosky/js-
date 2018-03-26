const num = 20;
const arr = [1, 2, 3, 4];
const obj = {
  a: 0,
  b: function () {
    console.log('hi world');
  }
};
const foo = () => {
  const a = 0;
  const b = 20;
  return a + b;
};

export default {
  num,
  arr,
  obj,
  foo
};

export const bar = () => {
  console.log('my thought');
};

export const element = 123;