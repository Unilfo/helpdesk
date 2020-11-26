const {users, getUserById, addUser} = require('./users')
const {roles, getRoleById, addRole} = require('./roles')
const {statuses, getStatusById, addStatuses} = require('./statuses')
const {instractions, getInstractionById, addInstraction} = require('./instractions')
const {tasks, getTaskById} = require('./tasks')
const {statusTasks, getStatusTasksById, addStatusTasks} = require('./statusTasks')

const resolvers = {
  Query: {
    users: () => users,
    roles: () => roles,
    statuses: () => statuses,
    instractions: () => instractions,
    tasks: () => tasks,
    role: (_, { id }) => getRoleById({ roleId: id }),
    status: (_, {id}) => getStatusById({statusId: id}),
    instraction: (_,{id}) => getInstractionById({instractionId: id}),
    task: (_, {id}) => getTaskById({userId: id}),
    user: (_, {id}) => getUserById({userId: id}),
    statusTask: (_, {id}) => getStatusTasksById({statusId: id}),
    statusTasks: () => statusTasks
  },
  Mutation: {
    addRoles(_,{id, title}){
      return addRole(id, title)
    },
    addStatuses(_,{id, title}){
      return addStatuses(id, title)
    },
    addStatusTasks(_,{id, title}){
      return addStatusTasks(id, title)
    },
    addInstraction(_,{id, title, path}){
      return addInstraction(id, title, path)
    },
    addUser(parent,{id,name,patronymic,surname,status,role,tab_number,date,login,password}){
      return addUser(id,name,patronymic,surname,status,role,tab_number,date,login,password)
    }
  },
  User: {
    status: ({statusId}) => getStatusById({statusId : statusId}),
    role: ({roleId}) => getRoleById({ roleId: roleId}),
  },
  Tasks:{
    responsible: responsible => getUserById({userId: responsible.id}),
    author: author => getUserById({userId: author.id}),
    status: status => getStatusTasksById({statusId : status.id})
  }
}

module.exports = resolvers
