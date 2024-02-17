'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      limite: {
        type: Sequelize.INTEGER,
        validate: {
          isInt: true
        }
      },
      saldo: {
        type: Sequelize.INTEGER,
        validate: {
          isInt: true
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clientes');
  }
};