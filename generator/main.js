function* hello() {
  yield 'hello'
  yield 'world'
  return 'successful'
}

// let generator = hello()
// console.log(generator)
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())

function* onefun() {
  let a = yield 'a'
  let b = yield 'b'
  console.log(a, b, '结果')
  return 'a b'
}

let one = onefun()

// for (const item of one) {
//   console.log(item, '内容')
// }

// one.next()
// one.next()
// one.next()

// one.next(1)
// one.next(2)
// one.next(3)

function* forof() {}
