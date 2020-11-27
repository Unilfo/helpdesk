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

const addRole = (id, title) => {
  const item = {
    id:id,
    title:title
  }
  roles.push(item)
  return item
}

const deleteRole = (id) => {
  return roles.filter(el => el.id != id)
}

const updateRole = (id, title) => {
  let newRole = getRoleById({roleId: id})
  newRole.title = title
  return newRole
}

module.exports = {roles, getRoleById, addRole, deleteRole, updateRole}
