'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transacaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clienteid: {
        type: Sequelize.INTEGER,
        validate: {
          isInt: true
        }

      },
      valor: {
        type: Sequelize.INTEGER,
        validate: {
          isInt: true
        }
      },
      tipo: {
        type: Sequelize.STRING,
        validate: {
          len: [1, 1],
          isIn: [['c', 'd']]
        }
      },
      descricao: {
        type: Sequelize.STRING,
        validate: {
          len: [1, 10]
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transacaos');
  }
};