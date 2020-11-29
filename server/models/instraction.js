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
    path: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Instraction',
  })
  return Instraction
}
