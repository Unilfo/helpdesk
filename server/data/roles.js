const roles = [
  {
    id: 1,
    title: 'admin',
  },
  {
    id: 2,
    title: 'user',
  },
]

const getRoleById = ({ roleId }) => {
  return roles.find(el => el.id == roleId)
}

module.exports = {roles, getRoleById}
