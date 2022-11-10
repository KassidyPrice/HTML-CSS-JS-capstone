/* 
add/minus btns: pushes name to array, pops name from array. How do I make sure it's the right name? lastIndexOf()
display weight +1
select btn: loops through array, flip animation, randomly selects an index. Displays that element as an H1. color change animation the name that was selected.
To make sure indexes of array are not used twice, add conditional or use temp array, slice and push? 
When Array is empty assign temp array to it, unhighlight each name, start loop over,
Can you decrease weight in the middle of a round? yes
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
    add.onclick = handleAdd

    minus.classList.add('minus')
    minus.innerText = '-'

    btnContainer.appendChild(add)
    btnContainer.appendChild(minus)
    studentContainer.appendChild(nameWeight)
    studentContainer.appendChild(btnContainer)
    leftSideList.appendChild(studentContainer)

    function handleAdd(e) {
      add.addEventListener('click', () => {
        e.target.parentElement.previousElementSibling.innerText = `${fname} : ${
          weight + 1
        }`
        console.log('added')
      })
    }
  }
}

// const forLoop = async (users) => {
//   for (let i = 0; i < users.length; i++) {
//     console.log(users[i])
//   }
// }

// .then((res) => {
//   res = res.json()
//   // console.log(res)
//   return res // JSON data parsed by `data.json()` or JSON.parse(data) call
// })
// // .then((data) => console.log(data.users[1].first_name))
// .then((data) => {
//   data.users.map((user) => users.push(user.first_name))
//   return users
// })
