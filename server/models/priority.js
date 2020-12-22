'use strict'
module.exports = (sequelize, DataTypes) => {
  const Priority = sequelize.define('Priority', {
    title: DataTypes.STRING,
  }, {
    tableName: 'Priority',
  })
  Priority.associate = function (models) {

  }
  return Priority
}
