'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('File', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      task_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tasks',
          key: 'id',
        },
      },
      name: {
        type: Sequelize.STRING,
      },
      data: {
        type: Sequelize.STRING('MAX'),
        allowNull: false,
      },
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
    await queryInterface.dropTable('File')
  },
}
