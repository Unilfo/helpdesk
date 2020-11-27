const users = [
  {
    id: 1,
    name: 'name 1',
    patronymic: 'patronymic 1',
    surname: 'surname 1',
    statusId: 1,
    roleId: 1,
    tab_number: 'tab_number 1',
    date: '2020-01-01',
    login: 'login 1',
    password: 'password 1',
  },
  {
    id: 2,
    name: 'name 2',
    patronymic: 'patronymic 2',
    surname: 'surname 2',
    statusId: 2,
    roleId: 2,
    tab_number: 'tab_number 2',
    date: '2020-01-01',
    login: 'login 2',
    password: 'password 2',
  },
]

const getUserById = ({userId}) => {
  return users.find(el => el.id == userId)
}

const addUser = (
  id,
  name,
  patronymic,
  surname,
  status,
  role,
  tab_number,
  date,
  login,
  password
) => {
  const item = {
    id: id,
    name: name,
    patronymic: patronymic,
    surname: surname,
    statusId: status,
    roleId: role,
    tab_number: tab_number,
    date: date,
    login: login,
    password: password,
  }
  users.push(item)
  return item
}

const deleteUser = (id) => {
  return users.filter(el => el.id != id)
}

const updateUser = (id, name, patronymic, surname, status, role, tab_number, date, login, password) => {
  let newUser = getUserById({userId: id})

  newUser.name = name
  newUser.patronymic = patronymic
  newUser.surname = surname
  newUser.statusId = status
  newUser.roleId = role
  newUser.tab_number = tab_number
  newUser.date = date
  newUser.login = login
  newUser.password = password

  return newUser
}

module.exports = {users, getUserById, addUser, deleteUser, updateUser}
