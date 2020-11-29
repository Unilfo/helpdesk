const resolvers = {
  Query: {
    async users(root, args, {models}) {
      return models.User.findAll()
    },
    async getUserById(root, {id}, {models}) {
      return models.User.findByPk(id)
    },
    async roles(root, args, {models}) {
      return models.Roles.findAll()
    },
    async getRole(root, {id}, {models}) {
      return models.Roles.findByPk(id)
    },
    async statusUser(root, args, {models}) {
      return models.StatusUsers.findAll()
    },
    async getStatusUser(root, {id}, {models}) {
      return models.StatusUsers.findByPk(id)
    },
    async instraction(root, args, {models}) {
      return models.Instraction.findAll()
    },
    async getInstraction(root, {id}, {models}) {
      return models.Instraction.findByPk(id)
    },
    async statusTask(root, args, {models}) {
      return models.StatusTasks.findAll()
    },
    async getStatusTask(root, {id}, {models}) {
      return models.StatusTasks.findByPk(id)
    },
    async tasks(root, args, {models}) {
      return models.Task.findAll()
    },
    async getTask(root, {id}, {models}) {
      return models.Task.findByPk(id)
    },
  },
  User: {
    async statusId(status) {
      return status.getStatusUser()
    },
    async roleId(roles) {
      return roles.getRole()
    },
  },
  Tasks: {
    async responsible(root, args, { models }) {
      return models.User.findByPk(root.responsible)
    },
    async author(root, args, { models }) {
      return models.User.findByPk(root.author)
    },
    async status(statusTask) {
      return statusTask.getStatusTask()
    },
  },
}

module.exports = resolvers
