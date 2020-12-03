'use strict'
const {
  Model,
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.StatusUsers, {
        foreignKey: 'statusId',
      })
      User.belongsTo(models.Roles, {
        foreignKey: 'roleId',
      })
    }
  }

  User.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    patronymic: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    tab_number: DataTypes.STRING,
    avatar: DataTypes.STRING('MAX')
  }, {
    sequelize,
    modelName: 'User',
  })
  return User
}
