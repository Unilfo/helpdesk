'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    theme: DataTypes.STRING,
    date: DataTypes.DATE,
    text: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    answer: DataTypes.STRING,
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.Priority, {
      foreignKey: 'priority',
    })
    Task.belongsTo(models.User, {
      foreignKey: 'responsible',
    })
    Task.belongsTo(models.User, {
      foreignKey: 'author',
    })
    Task.hasMany(models.File, {
      foreignKey: 'task_id',
    })
  };
  return Task;
};
