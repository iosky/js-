/*
// 首先我们实现简单ajax原生的代码实现

window.onload = () => {
  let url = `promiseTest.json?t=${ Math.random() }`;
  console.log(url);
  let result;
  let XHR = new XMLHttpRequest();
  let elem = document.querySelector('#promise span');
  XHR.open('GET', url, true);
  XHR.send(null);

  XHR.onreadystatechange = () => {
    if(XHR.readyState === 4 && XHR.status === 200) {
      result = JSON.parse(XHR.response);
      elem.innerText = result.name;
      console.log(result);
      // 如果此时我们需要执行下一个的ajax
      // 那么我们就需要继续在此处添加内容
      // code code code
      // 如果还存在下一个，是不是就需要一直往里面添加，这也就是常说的回调地狱
      /!**
       * 因此我们需要一个promise来帮我们解决回调地狱，同时也为了代码的可读性与可维护性
       *!/
    }
  };
};*/

// 先让我们来体验一下promise吧
/*function want() {
  console.log('假设此处存放的是我们的ajax代码');
  console.log('这是我们想要执行的代码');
}

function fn(want) {
  console.log('表示此处执行了一大段代码');

  // 返回promise对象
  return new Promise(function (resolve, reject) {
    if (typeof want === 'function') {
      resolve(want);
    } else {
      reject(`TypeError ${ want } 不是一个可执行的函数`);
    }
  })
}

let wants = 'hello';
fn(wants)
  .then(function (want) {
    want();
  }).catch(function (err) {
  console.log(err);
});

// 第二个例子

let fn2 = function (num) {
  return new Promise(function (resolve, reject) {
    if(typeof num === 'number') {
      resolve(num);
    } else {
      reject('TypeError');
    }
  })
};

fn2(2)
  .then(function (num) {
    console.log(`first: ${ num }`);
    return num + 1;
  })
  .then(function (num) {
    console.log(`second: ${ num }`);
    return num + 1;
  })
  .then(function (num) {
    console.log(`third: ${ num }`);
    return 'hello';
  });*/


// 那么现在我们用promise来封装一下ajax
function getJSON(url) {
  return new Promise(function (resolve, reject) {
    let XHR = new XMLHttpRequest();
    XHR.open('GET', url + '?t=' + Math.random());
    XHR.send();

    XHR.onreadystatechange = () => {
      if (XHR.readyState === 4) {
        if (XHR.status === 200) {
          try {
            let response = JSON.parse(XHR.responseText);
            resolve(response);
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error(XHR.statusText));
        }
      }
    }
  })
}

function readerAll() {
  return Promise.all([getJSON(url), getJSON(url2)]);
}

function renderRace() {
  return Promise.race([getJSON(url), getJSON(url2)]);
}
let url = 'promiseTest.json';
let url2 = 'promiseTest2.json';

/*getJSON(url)
  .then(resp => console.log(resp))
  .catch(function (err) {
    console.log(err);
  });*/

readerAll()
  .then(function (value) {
    console.log(value);
  });

renderRace()
.then(function (val) {
  console.log(val);
});