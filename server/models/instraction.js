'use strict'
const {
  Model,
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Instraction extends Model {
    static associate(models) {
      // define association here
    }
  }
  Instraction.init({
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    path: DataTypes.STRING('MAX'),
    belongs: DataTypes.INTEGER,
    group: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Instraction',
  })
  return Instraction
}
