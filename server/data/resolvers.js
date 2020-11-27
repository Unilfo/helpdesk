const {users, getUserById, addUser, deleteUser, updateUser} = require('./users')
const {roles, getRoleById, addRole, deleteRole, updateRole} = require('./roles')
const {statuses, getStatusById, addStatuses, deleteStatuses, updateStatuses} = require('./statuses')
const {instractions, getInstractionById, addInstraction, deleteInstraction, updateInstraction} = require('./instractions')
const {tasks, getTaskById, addTask, deleteTask, updateTask} = require('./tasks')
const {statusTasks, getStatusTasksById, addStatusTasks, deleteStatusTask, updateStatusTask} = require('./statusTasks')

const resolvers = {
  Query: {
    users: () => users,
    roles: () => roles,
    statuses: () => statuses,
    instractions: () => instractions,
    tasks: () => tasks,
    role: (_, {id}) => getRoleById({roleId: id}),
    status: (_, {id}) => getStatusById({statusId: id}),
    instraction: (_, {id}) => getInstractionById({instractionId: id}),
    task: (_, {id}) => getTaskById({userId: id}),
    user: (_, {id}) => getUserById({userId: id}),
    statusTask: (_, {id}) => getStatusTasksById({statusId: id}),
    statusTasks: () => statusTasks,
  },
  Mutation: {
    addRoles(_, {id, title}) {
      return addRole(id, title)
    },
    addStatuses(_, {id, title}) {
      return addStatuses(id, title)
    },
    addStatusTasks(_, {id, title}) {
      return addStatusTasks(id, title)
    },
    addInstraction(_, {id, title, path}) {
      return addInstraction(id, title, path)
    },
    addUser(_, {id, name, patronymic, surname, status, role, tab_number, date, login, password}) {
      return addUser(id, name, patronymic, surname, status, role, tab_number, date, login, password)
    },
    addTask(parent, {
      id,
      theme,
      responsible,
      data,
      status,
      author,
      text,
    }) {
      return addTask(
        id,
        theme,
        responsible,
        data,
        status,
        author,
        text,
      )
    },
    deleteInstraction(_,{id}){
      return deleteInstraction(id)
    },
    updateInstraction(prev,{id, title, path}){
      return updateInstraction(id, title, path)
    },
    deleteRole(prev,{id}){
      return deleteRole(id)
    },
    updateRole(prev, {id, title}){
      return updateRole(id, title)
    },
    deleteStatuses(prev,{id}){
      return deleteStatuses(id)
    },
    updateStatuses(prev, {id, title}){
      return updateStatuses(id, title)
    },
    deleteStatusTask(prev,{id}){
      return deleteStatusTask(id)
    },
    updateStatusTask(prev, {id, title}){
      return updateStatusTask(id, title)
    },
    deleteTask(prev,{id}){
      return deleteTask(id)
    },
    updateTask(prev, {id, theme, responsible, data, status, author, text}){
      return updateTask(id, theme, responsible, data, status, author, text)
    },
    deleteUser(prev,{id}){
      return deleteUser(id)
    },
    updateUser(prev, {id, name, patronymic, surname, status, role, tab_number, date, login, password}){
      return updateUser(id, name, patronymic, surname, status, role, tab_number, date, login, password)
    },
  },
  User: {
    status: ({statusId}) => getStatusById({statusId: statusId}),
    role: ({roleId}) => getRoleById({roleId: roleId}),
  },
  Tasks: {
    responsible: ({responsible}) => getUserById({userId:responsible}),
    author: ({author}) => getUserById({userId: author}),
    status: ({status}) => getStatusTasksById({statusId: status}),
  },
}

module.exports = resolvers
