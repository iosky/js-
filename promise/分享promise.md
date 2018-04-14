# promise

## 为什么要使用 promise

```javascript
setTimeout(function() {
  var a = 100
  console.log(a)
  setTimeout(function() {
    var b = 200
    console.log(b)
    setTimeout(function() {
      var c = 300
      console.log(c)
    }, 1000)
  }, 1000)
}, 1000)
```

```javascript
new Promise(function(resolve, reject) {
  setTimeout(function() {
    var a = 100
    resolve(a)
  }, 1000)
})
  .then(function(res) {
    console.log(res)
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        var b = 200
        resolve(b)
      }, 1000)
    })
  })
  .then(function(res) {
    console.log(res)
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        var c = 300
        resolve(c)
      }, 1000)
    })
  })
  .then(function(res) {
    console.log(res)
  })
```

![promise](https://segmentfault.com/img/bVzLT4?w=716&h=736)

## 什么是 promise

promise 翻译成中文是‘承诺，诺言’的意思，假如说你今天承诺，玩 3 个小时游戏，就去写作业，那么在未来的每个时刻，三个小时的游戏结束，这是不是意味着，现在你需要去做之前承诺过的事情，也就是需要写作业了。当然，如果你一直都没玩到游戏，你的心情是不是就十分低落，当然写作业是不可能的了，这辈子都不可能了，但是是不是就要去做其他的事情，来让自己开心起来。

用 promise 来表达，也就是翻译成代码

```javascript
const today = new promise((resolve, reject) => {
  // 开始玩游戏
  if (end) {
    // 游戏结束了，现在十分开始
    resolve()
  } else {
    // 难过，连游戏都没得玩，写个屁作业
    reject()
  }
})

// 但是不管，怎么样，都的找点事情作业啊
today.then(
  function() {
    writerHomeWork()
  },
  function() {
    eatFood()
  }
)
```

### MDN 解释

Promise 对象是一个代理对象（代理一个值），被代理的值在 Promise 对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的 promise 对象

一个 Promise 有以下几种状态:

pending: 初始状态，既不是成功，也不是失败状态。
fulfilled: 意味着操作成功完成。
rejected: 意味着操作失败。
pending 状态的 Promise 对象可能触发 fulfilled 状态并传递一个值给相应的状态处理方法，也可能触发失败状态（rejected）并传递失败信息。当其中任一种情况出现时，Promise 对象的 then 方法绑定的处理方法（handlers ）就会被调用（then 方法包含两个参数：onfulfilled 和 onrejected，它们都是 Function 类型。当 Promise 状态为 fulfilled 时，调用 then 的 onfulfilled 方法，当 Promise 状态为 rejected 时，调用 then 的 onrejected 方法， 所以在异步操作的完成和绑定处理方法之间不存在竞争）。

## promise 基本语法

new promise( function(resolve, reject) {......})

参数是带有 resolve 和 reject 两个参数的一个函数 。Promise 构造函数执行时立即调用 executor 函数， resolve 和 reject 两个函数作为参数传递给 executor（executor 函数在 Promise 构造函数返回新建对象前被调用）。resolve 和 reject 函数被调用时，分别将 promise 的状态改为 fulfilled（完成）或 rejected（失败）。executor 内部通常会执行一些异步操作，一旦完成，可以调用 resolve 函数来将 promise 状态改成 fulfilled，或者在发生错误时将它的状态改为 rejected。如果在 executor 函数中抛出一个错误，那么该 promise 状态为 rejected。executor 函数的返回值被忽略。

![promise](https://mdn.mozillademos.org/files/8633/promises.png)

## promise 的其他使用方法

Promise.all(iterable)
这个方法返回一个新的 promise 对象，该 promise 对象在 iterable 参数对象里所有的 promise 对象都成功的时候才会触发成功，一旦有任何一个 iterable 里面的 promise 对象失败则立即触发该 promise 对象的失败。这个新的 promise 对象在触发成功状态以后，会把一个包含 iterable 里所有 promise 返回值的数组作为成功回调的返回值，顺序跟 iterable 的顺序保持一致；如果这个新的 promise 对象触发了失败状态，它会把 iterable 里第一个触发失败的 promise 对象的错误信息作为它的失败错误信息。Promise.all 方法常被用于处理多个 promise 对象的状态集合。

Promise.race(iterable)
当 iterable 参数里的任意一个子 promise 被成功或失败后，父 promise 马上也会用子 promise 的成功返回值或失败详情作为参数调用父 promise 绑定的相应句柄，并返回该 promise 对象。

Promise.reject(reason)
返回一个状态为失败的 Promise 对象，并将给定的失败信息传递给对应的处理方法

Promise.resolve(value)
返回一个状态由给定 value 决定的 Promise 对象。如果该值是一个 Promise 对象，则直接返回该对象；如果该值是 thenable(即，带有 then 方法的对象)，返回的 Promise 对象的最终状态由 then 方法执行决定；否则的话(该 value 为空，基本类型或者不带 then 方法的对象),返回的 Promise 对象状态为 fulfilled，并且将该 value 传递给对应的 then 方法。通常而言，如果你不知道一个值是否是 Promise 对象，使用 Promise.resolve(value) 来返回一个 Promise 对象,这样就能将该 value 以 Promise 对象形式使用
