const users = require('./users')
const {roles, getRoleById} = require('./roles')
const {statuses, getStatusById} = require('./statuses')
const {instractions, getInstractionById} = require('./instractions')
const {tasks, getTaskById} = require('./tasks')

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
    task: (_, {id}) => getTaskById({taskid: id})
  },
  User: {
    role: role => getRoleById({ roleId: role.id }),
    status: status => getStatusById({statusId : status.id})
  },
}

module.exports = resolvers
