const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const USER_ADDED = 'USER_ADDED'

const resolvers = {
  Subscription: {
    UserCreated: {
      subscribe: (_, __, {pubsub}) => pubsub.asyncIterator(USER_ADDED),
    },
  },
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
    async loginUser(root, args, {models}, info){
      const {login, password, token} = args
      if (token) {
        return jwt.verify(token, 'nottake', function (err, decoded) {
          if (err) {
            return {
              message: 'Не коректный токен',
              error: true,
              user: null,
              token: null,
            }
          }
          if (decoded) {
            return {
              message: 'ok',
              error: false,
              user: decoded,
              token: token,
            }
          }
        })
      } else {
        const theUser = await models.User.findOne({where: {login: login}})
        if (!theUser) {
          return {
            message: 'user not found',
            error: true,
            user: null,
            token: null,
          }
        }
        const isMatch = bcrypt.compareSync(password, theUser.password)
        if (!isMatch) {
          return {
            message: 'Incorrect password',
            error: true,
            user: null,
            token: null,
          }
        }
        return {
          message: 'ok',
          error: false,
          user: theUser,
          token: jwt.sign(theUser.toJSON(), 'nottake'),
        }
      }
    },
  },
  Mutation: {
    async createRole(root, {title}, {models}) {
      return models.Roles.create({
        title,
      })
    },
    async createStatusTask(root, {title}, {models}) {
      return models.StatusTasks.create({
        title,
      })
    },
    async createStatusUser(root, {title}, {models}) {
      return models.StatusUsers.create({
        title,
      })
    },
    async createInstraction(root, {title, path, belongs, group, name}, {models}) {
      return models.Instraction.create({
        title,
        path,
        belongs,
        group,
        name,
      })
    },
    async createTask(root, {theme, date, text, status, responsible, author}, {models}) {
      return models.Task.create({
        theme,
        date,
        text,
        status,
        responsible,
        author,
      })
    },
    async createUser(root, {name, patronymic, surname, statusId, tab_number, roleId, login, password, avatar}, {models, pubsub}) {
      const user = {name, patronymic, surname, statusId, tab_number, roleId, login, password, avatar}
      pubsub.publish(USER_ADDED, {UserCreated: user})
      return models.User.create({
        name,
        patronymic,
        surname,
        statusId,
        tab_number,
        roleId,
        login,
        password: bcrypt.hashSync(password, 3),
        avatar,
      })
    },
    async deleteUser(root, {id}, {models}) {
      return models.User.destroy({
        where: {
          id: id,
        },
      })
    },
    async deleteTask(root, {id}, {models}) {
      return models.Task.destroy({
        where: {
          id: id,
        },
      })
    },
    async updateInstraction(root, {id, title, path, belongs, group, name}, {models}) {
      models.Instraction.update({
          title: title,
          path: path,
          belongs: belongs,
          group: group,
          name: name,
        },
        {
          where: {
            id: id,
          },
        })
      return 'OK'
    },
    async updateStatusUser(root, {id, title}, {models}) {
      models.StatusUsers.update({title: title},
        {
          where: {
            id: id,
          },
        })
      return 'OK'
    },
    async updateStatusTask(root, {id, title}, {models}) {
      models.StatusTasks.update({title: title},
        {
          where: {
            id: id,
          },
        })
      return 'OK'
    },
    async updateRole(root, {id, title}, {models}) {
      models.Roles.update({title: title},
        {
          where: {
            id: id,
          },
        })
      return 'OK'
    },
    async updateUser(root, {id, name, patronymic, surname, statusId, tab_number, roleId, login, password, avatar}, {models}) {
      models.User.update({
          name: name,
          patronymic: patronymic,
          surname: surname,
          statusId: statusId,
          tab_number: tab_number,
          roleId: roleId,
          login: login,
          password: bcrypt.hashSync(password, 3),
          avatar,
        },
        {
          where: {
            id: id,
          },
        })
      return 'OK'
    },
    async updateTask(root, {id, theme, date, text, status, responsible, author}, {models}) {
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
            id: id,
          },
        })
      return 'OK'
    },
  },
  User: {
    async statusId(status) {
      // ,_, {models}
      //  let findedStatus = models.StatusUsers.findByPk(status.statusId)
      // return  findedStatus
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
