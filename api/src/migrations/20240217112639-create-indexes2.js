'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex(
      'Transacaos',
      ['id', 'clienteid'],
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.RemoveIndex(
      'Transacaos',
      ['id', 'clienteid'],
    );
  }
};