'use strict';

const { NOW, DATE } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('descriptionrps', [{
      description: 'Une description aleatoire on s\'en fou',
      pseudo: 'nom1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'la deuxieme description',
      pseudo: 'nom2',
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
    await queryInterface.bulkDelete('descriptionrps', null, {});
  }
};