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
  Mutation: {
    async createRole(root, {title}, {models}) {
      return models.Roles.create({
        title
      })
    },
    async createStatusTask(root, {title}, {models}) {
      return models.StatusTasks.create({
        title
      })
    },
    async createStatusUser(root, {title}, {models}) {
      return models.StatusUsers.create({
        title
      })
    },
    async createInstraction(root, {title, path}, {models}) {
      return models.Instraction.create({
        title,
        path
      })
    },
    async createTask(root, {theme, date, text, status, responsible, author}, {models}) {
      return models.Task.create({
        theme,
        date,
        text,
        status,
        responsible,
        author
      })
    },
    async createUser(root, {name, patronymic, surname, statusId, tab_number, roleId, login, password,}, {models}) {
      return models.User.create({
        name,
        patronymic,
        surname,
        statusId,
        tab_number,
        roleId,
        login,
        password,
      })
    },
    async deleteUser(root, {id}, {models}) {
      return models.User.destroy({
        where: {
          id: id
        }
      })
    },
    async deleteTask(root, {id}, {models}) {
      return models.Task.destroy({
        where: {
          id: id
        }
      })
    },
    async updateInstraction(root, {id, title, path}, {models}) {
      models.Instraction.update({
          title: title,
          path: path
        },
        {
          where: {
            id: id
          }
        })
      return 'OK'
    },
    async updateStatusUser(root, {id, title}, {models}) {
      models.StatusUsers.update({title: title},
        {
          where: {
            id: id
          }
        })
      return 'OK'
    },
    async updateStatusTask(root, {id, title}, {models}) {
      models.StatusTasks.update({title: title},
        {
          where: {
            id: id
          }
        })
      return 'OK'
    },
    async updateRole(root, {id, title}, {models}) {
      models.Roles.update({title: title},
        {
          where: {
            id: id
          }
        })
      return 'OK'
    },
    async updateUser(root, {id,name, patronymic, surname, statusId, tab_number, roleId, login, password }, {models}) {
      models.User.update({
          name:name,
          patronymic:patronymic,
          surname:surname,
          statusId:statusId,
          tab_number:tab_number,
          roleId:roleId,
          login:login,
          password:password,
        },
        {
          where: {
            id: id
          }
        })
      return 'OK'
    },
    async updateTask(root, {id,theme, date, text, status, responsible, author }, {models}) {
      models.Task.update({
          theme: theme,
          date: date,
          text: text,
          status: status,
          responsible: responsible,
          author: author,
        },
        {
          where: {
            id: id
          }
        })
      return 'OK'
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
    async responsible(root, args, {models}) {
      return models.User.findByPk(root.responsible)
    },
    async author(root, args, {models}) {
      return models.User.findByPk(root.author)
    },
    async status(statusTask) {
      return statusTask.getStatusTask()
    },
  },
}

module.exports = resolvers
