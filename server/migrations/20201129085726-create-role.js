'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      }
      ,
      createdAt: {
        allowNull: false,
        type:
        Sequelize.DATEONLY,
      }
      ,
      updatedAt: {
        allowNull: false,
        type:
        Sequelize.DATEONLY,
      },
    })

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Roles')
  },
}
