const {users, getUserById, addUser} = require('./users')
const {roles, getRoleById, addRole} = require('./roles')
const {statuses, getStatusById, addStatuses} = require('./statuses')
const {instractions, getInstractionById, addInstraction} = require('./instractions')
const {tasks, getTaskById, addTask} = require('./tasks')
const {statusTasks, getStatusTasksById, addStatusTasks} = require('./statusTasks')

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
