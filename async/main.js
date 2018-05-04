async function fn() {
  return 30
}
// console.log(fn())

function hi() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(30)
    }, 1000)
  })
}

const foo = async () => {
  const t = await fn()
  console.log(t)
}

// foo()
console.log('begin')

const err = async () => {
  try {
    await fn()
  } catch (error) {
    console.log(error)
  }
}

// err()

function takeTime(n) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(n + 200)
    }, n)
  })
}

function step1(t) {
  console.log(`step1 with ${t}`)
  return takeTime(t)
}

function step2(t) {
  console.log(`step2 with ${t}`)
  return takeTime(t)
}

function step3(t) {
  console.log(`step3 with ${t}`)
  return takeTime(t)
}

//proimise
function doIt() {
  console.time('doIt')
  const time1 = 300
  step1(time1)
    .then(time2 => step2(time2))
    .then(time3 => step3(time3))
    .then(result => {
      console.log(`result is ${result}`)
      console.timeEnd('doIt')
    })
}

// doIt()

// async
async function doIt2() {
  console.time('doIt2')
  const time1 = 300
  const time2 = await step1(time1)
  const time3 = await step2(time2)
  const result = await step3(time3)
  console.log(`result is ${result}`)
  console.timeEnd('doIt2')
}

//doIt2()

// 多参数的情况下

function step12(t) {
  console.log(`step1 with ${t}`)
  return takeTime(t)
}

function step22(t, y) {
  console.log(`step2 with ${t} and ${y}`)
  return takeTime(t + y)
}

function step32(t, y, u) {
  console.log(`step3 with ${t}, ${y} and ${u}`)
  return takeTime(t + y + u)
}

// async

async function doIt22() {
  console.time('doIt22')
  const time1 = 300
  const time2 = await step12(time1)
  const time3 = await step22(time1, time2)
  const result = await step32(time1, time2, time3)
  console.log(`result is ${result}`)
  console.timeEnd('doIt22')
}

// doIt22()

function doIt12() {
  console.time('doIt12')
  const time1 = 300
  step12(time1)
    .then(time2 => {
      return step22(time1, time2).then(time3 => [time1, time2, time3])
    })
    .then(times => {
      const [time1, time2, time3] = times
      return step32(time1, time2, time3)
    })
    .then(result => {
      console.log(`result is ${result}`)
      console.timeEnd('doIt12')
    })
}

doIt12()
