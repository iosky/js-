let myDB = {
  name: 'test',
  version: 1,
  db: null
}
function openDB(name = 'test', version = 1) {
  let request = indexedDB.open(name, version)
  request.onerror = e => {
    console.log('error')
  }
  request.onsuccess = e => {
    myDB.db = e.target.result
    console.log('success')
  }
  request.onupgradeneeded = e => {
    let db = e.target.result
    if (!db.objectStoreNames.contains('students')) {
      db.createObjectStore('students', {
        keyPath: 'id'
      })
    }
    console.log(`indexDB version have changed ${version++}`)
  }
}

openDB(myDB.name, myDB.version)

let students = [
  {
    id: 1,
    name: 'one',
    age: 23
  },
  {
    id: 2,
    name: 'two',
    age: 20
  },
  {
    id: 3,
    name: 'three',
    age: 43
  }
]

let student1 = {
  id: 5,
  name: 'five',
  age: 56
}
function getDate(db, name, value) {
  let store = db.transaction(name, 'readwrite').objectStore(name)
  let request = store.get(value)
  request.onsuccess = e => {
    let s = e.target.result
    console.log(s)
  }
}

function updateDate(db, name, value) {
  let store = db.transaction(name, 'readwrite').objectStore(name)
  let request = store.get(value.id)
  request.onsuccess = e => {
    store.put(value)
  }
}

function addDate(db, name) {
  let store = db.transaction(name, 'readwrite').objectStore(name)
  for (let i = 0; i < students.length; i++) {
    store.add(students[i])
  }
}

setTimeout(() => {
  addDate(myDB.db, 'students')
  getDate(myDB.db, 'students', 2)
  updateDate(myDB.db, 'students', student1)
}, 1000)
