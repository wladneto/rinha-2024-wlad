'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Clientes', [
      {
        limite: 100000,
        saldo: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        limite: 80000,
        saldo: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        limite: 1000000,
        saldo: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        limite: 10000000,
        saldo: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        limite: 500000,
        saldo: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};


