'use strict';
module.exports = (sequelize, DataTypes) => {
  const StatusTasks = sequelize.define('StatusTasks', {
    title: DataTypes.STRING
  }, {});
  StatusTasks.associate = function(models) {

  };
  return StatusTasks;
};
