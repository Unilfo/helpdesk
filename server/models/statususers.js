'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StatusUsers extends Model {
    static associate(models) {

    }
  };
  StatusUsers.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StatusUsers',
  });
  return StatusUsers;
};
