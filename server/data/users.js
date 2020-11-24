const users = [
  {
    id: 1,
    name: 'name 1',
    patronymic: 'patronymic 1',
    surname: 'surname 1',
    statusId:2,
    roleId: 2,
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
    statusId:1,
    roleId: 1,
    tab_number: 'tab_number 2',
    date: '2020-01-01',
    login: 'login 2',
    password: 'password 2',
  },
]

const getUserById = ({userId}) => {
  return users.find(el => el.id === userId)
}

module.exports = {users, getUserById}
