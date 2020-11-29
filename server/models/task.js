'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    theme: DataTypes.STRING,
    date: DataTypes.DATE,
    text: DataTypes.STRING
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.StatusTasks, {
      foreignKey: 'status',
    })
    Task.belongsTo(models.User, {
      foreignKey: 'responsible',
    })
    Task.belongsTo(models.User, {
      foreignKey: 'author',
    })
  };
  return Task;
};
