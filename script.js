/* 
Last name not the first name chosen?

How can I use OOP?
 */

let users = []

async function myFetch() {
  const response = await fetch(
    'https://devpipeline-mock-api.herokuapp.com/api/auth/login',
    {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email: 'marioem@live.com',
        password: 'Peaches02!',
      }),
      headers: {
        'content-type': 'application/json',
        // accepts: 'application/json',
      },
    }
  )
  const data = await response.json()
  const userArray = await data.users.map((user) => users.push(user.first_name))
  return users
}

myFetch()
  .then((users) => populateList(users))
  .catch((err) => console.log(err))

const leftSideList = document.getElementById('left-side-list')
const studentContainer = document.getElementById('student-container')

async function populateList(users) {
  for (let user of users) {
    let fname = user
    let weight = 1

    const nameWeight = document.createElement('p')
    const btnContainer = document.createElement('div')
    const add = document.createElement('button')
    const minus = document.createElement('button')

    nameWeight.innerText = `${fname} : ${weight}`
    btnContainer.classList.add('btn-container')
    add.classList.add('add')
    add.innerText = '+'
    minus.classList.add('minus')
    minus.innerText = '-'

    btnContainer.appendChild(add)
    btnContainer.appendChild(minus)
    studentContainer.appendChild(nameWeight)
    studentContainer.appendChild(btnContainer)
    leftSideList.appendChild(studentContainer)

    add.addEventListener('click', (e) => {
      e.target.parentElement.previousElementSibling.innerText = `${fname} : ${
        weight + 1
      }`
      weight++
      users.push(fname)
    })

    minus.addEventListener('click', (e) => {
      if (weight > 0) {
        e.target.parentElement.previousElementSibling.innerText = `${fname} : ${
          weight - 1
        }`
        weight--
        users.splice(users.lastIndexOf(fname), 1)
      }
    })
  }
}

const h1 = document.querySelector('h1')
const selectBtn = document.getElementById('select-btn')

generateIndex = () => {
  while (users.length > 0) {
    let random = Math.floor(Math.random() * users.length - 1) + 1
    return random
  }
}

const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

const doSomething = async () => {
  for (let i = 0; i < users.length; i++) {
    await sleep(50)
    h1.innerText = users[i]
  }
}

let temp = []
const listChildren = studentContainer.children

const selectUser = async () => {
  await doSomething()
  const userIndex = generateIndex()
  h1.innerText = users[userIndex]
  h1.classList.add('animatedH1')

  for (child of listChildren) {
    child.classList.remove('highlightedUser')
    if (child.innerText.includes(users[userIndex])) {
      child.classList.add('highlightedUser')
    }
  }

  user = users.splice(userIndex, 1)
  temp.push(...user)

  if (users.length == 0) {
    users = temp
    temp = []
  }
}

selectBtn.addEventListener('click', (e) => {
  doSomething()
  selectUser()
  h1.classList.remove('animatedH1')
})
