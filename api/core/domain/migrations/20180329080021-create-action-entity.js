'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ActionEntities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      whiteScreenTime: {
        type: Sequelize.STRING
      },
      readyTime: {
        type: Sequelize.STRING
      },
      allLoadTime: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      nowTime: {
        type: Sequelize.DATE
      },
      country: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ActionEntities');
  }
};