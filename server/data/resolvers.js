const {users, getUserById} = require('./users')
const {roles, getRoleById} = require('./roles')
const {statuses, getStatusById} = require('./statuses')
const {instractions, getInstractionById} = require('./instractions')
const {tasks, getTaskById} = require('./tasks')
const {statusTasks, getStatusTasksById} = require('./statusTasks')

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
  User: {
    role: role => getRoleById({ roleId: role.id }),
    status: status => getStatusById({statusId : status.id})
  },
  Tasks:{
    responsible: responsible => getUserById({userId: responsible.id}),
    author: author => getUserById({userId: author.id}),
    status: status => getStatusTasksById({statusId : status.id})
  }
}

module.exports = resolvers
