'use strict'
const {
  Model,
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    static associate(models) {
      File.belongsTo(models.Task,{
        foreignKey: 'id'
      })
    }
  }

  File.init({
      name: DataTypes.STRING,
      data: DataTypes.STRING('MAX'),
    },
    {
      sequelize,
      tableName: 'File',
      modelName: 'File',
    })
  return File
}
