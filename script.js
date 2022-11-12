/* 
select btn: color change the name that was selected.

To make sure indexes of array are not used twice, slice and push to a temp array.
When Array is empty assign temp array to it, start loop over.

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

async function populateList(users) {
  for (let user of users) {
    let fname = user
    // console.log(fname)
    let weight = 1

    const studentContainer = document.createElement('div')
    const nameWeight = document.createElement('p')
    const btnContainer = document.createElement('div')
    const add = document.createElement('button')
    const minus = document.createElement('button')

    studentContainer.classList.add('student-container')
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
      console.log(users)
    })

    minus.addEventListener('click', (e) => {
      if (weight > 0) {
        e.target.parentElement.previousElementSibling.innerText = `${fname} : ${
          weight - 1
        }`
        weight--
        users.splice(users.lastIndexOf(fname), 1)
        console.log(users)
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

const selectUser = async () => {
  await doSomething()
  const userIndex = generateIndex()
  console.log(userIndex)
  console.log(users)
  h1.innerText = users[userIndex]
  // user = users.splice(users[userIndex], 1)
  // temp.push(user)
  h1.classList.add('animatedH1')
  console.log(temp)
}

selectBtn.addEventListener('click', (e) => {
  doSomething()
  selectUser()
  h1.classList.remove('animatedH1')
})
