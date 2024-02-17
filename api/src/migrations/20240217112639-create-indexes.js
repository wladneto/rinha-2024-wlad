'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex(
      'Clientes',
      ['id'],
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.RemoveIndex(
      'Clientes',
      ['id'],
    );
  }
};